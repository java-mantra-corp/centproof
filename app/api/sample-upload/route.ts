/**
 * Sample-statement upload endpoint (Phase 5.20).
 *
 * The /banks/share-sample page POSTs a multipart/form-data body here
 * as a fallback for visitors who don't have a configured mail client
 * (the primary path is a mailto: link that opens Mail.app with a
 * pre-filled message — see /banks/share-sample/page.tsx).
 *
 * Fields (multipart):
 *   - `bank`     — required, the bank name
 *   - `email`    — required, where we will reply
 *   - `version`  — optional, app version that triggered the share
 *                  (best-effort import surfaces this from the desktop
 *                  app via URL param)
 *   - `notes`    — optional free-text
 *   - `file`     — required, a PDF, ≤ 10 MB
 *   - `website`  — honeypot
 *
 * The handler validates inputs, enforces a strict 10 MB / PDF-only
 * cap, rate-limits per IP, and forwards the file to the support
 * inbox via SMTP attachment.
 *
 * Why a fallback API instead of website upload as the primary path:
 *
 *   We deliberately prefer the mailto: handoff because it keeps the
 *   sensitive PDF off our servers entirely — the file goes Mail.app
 *   → Hostinger inbox, never centproof.com.  This API exists for the
 *   ~5% of macOS users without a configured mail client.  When they
 *   use it, the file passes through this Node runtime briefly (in
 *   memory only, never written to disk), then leaves as an SMTP
 *   attachment.  We tell the visitor this on the page.
 *
 * No secrets in this file: SMTP config comes from the same env vars
 * as /api/bank-request:
 *
 *   MAIL_HOST       e.g. smtp.hostinger.com
 *   MAIL_PORT       e.g. 587
 *   MAIL_USERNAME   the mailbox to authenticate as
 *   MAIL_PASSWORD   that mailbox's app password
 *   SUPPORT_INBOX   where to deliver (defaults to MAIL_USERNAME)
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

// nodemailer needs the Node runtime — `edge` would fail.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BANK_LEN = 80;
const MAX_NOTES_LEN = 1500;
const MAX_VERSION_LEN = 40;
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PDF_MAGIC = Buffer.from("%PDF-", "utf8"); // every PDF starts with this

// In-memory rate limiter: max 3 uploads / IP / 60 minutes.
// Tighter than /api/bank-request because each upload is up to 10 MB.
// Resets when the server restarts (good enough for low-volume use).
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const recentSubmissions = new Map<string, number[]>();

export async function POST(request: NextRequest) {
  // ── Parse multipart ──────────────────────────────────────────────
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return jsonError("Couldn't read the upload. Please try again.", 400);
  }

  // ── Honeypot ─────────────────────────────────────────────────────
  const honeypot = String(form.get("website") ?? "").trim();
  if (honeypot.length > 0) {
    // Silently 200 so the bot doesn't learn it tripped.
    return NextResponse.json({ ok: true });
  }

  // ── Field validation ─────────────────────────────────────────────
  const bank = String(form.get("bank") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const version = String(form.get("version") ?? "").trim();
  const notes = String(form.get("notes") ?? "").trim();

  if (!bank) return jsonError("Bank name is required.", 400);
  if (bank.length > MAX_BANK_LEN)
    return jsonError(`Bank name must be ${MAX_BANK_LEN} characters or fewer.`, 400);
  if (!email) return jsonError("Email is required.", 400);
  if (!EMAIL_RE.test(email))
    return jsonError("Please enter a valid email.", 400);
  if (version.length > MAX_VERSION_LEN)
    return jsonError(`Version label is too long.`, 400);
  if (notes.length > MAX_NOTES_LEN)
    return jsonError(`Notes must be ${MAX_NOTES_LEN} characters or fewer.`, 400);

  // ── File validation ──────────────────────────────────────────────
  const fileField = form.get("file");
  if (!(fileField instanceof File)) {
    return jsonError("Please attach a PDF file.", 400);
  }
  if (fileField.size === 0) {
    return jsonError("The uploaded file is empty.", 400);
  }
  if (fileField.size > MAX_FILE_BYTES) {
    return jsonError(
      `File too large. Maximum size is ${MAX_FILE_BYTES / (1024 * 1024)} MB.`,
      413,
    );
  }
  // Trust the magic bytes, not the client-provided mimetype — the
  // mimetype is trivially forgeable.  Every PDF starts with `%PDF-`.
  const fileBuffer = Buffer.from(await fileField.arrayBuffer());
  if (
    fileBuffer.length < PDF_MAGIC.length ||
    !fileBuffer.subarray(0, PDF_MAGIC.length).equals(PDF_MAGIC)
  ) {
    return jsonError(
      "That doesn't look like a PDF. Please upload a .pdf file.",
      415,
    );
  }

  // ── Rate limit ───────────────────────────────────────────────────
  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  const now = Date.now();
  const recent = (recentSubmissions.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  if (recent.length >= RATE_LIMIT_MAX) {
    return jsonError(
      "Too many uploads from this IP. Please try again in an hour, or email support@centproof.com directly with the file attached.",
      429,
    );
  }
  recent.push(now);
  recentSubmissions.set(ip, recent);

  // ── SMTP config ──────────────────────────────────────────────────
  const host = process.env.MAIL_HOST;
  const port = parseInt(process.env.MAIL_PORT ?? "587", 10);
  const user = process.env.MAIL_USERNAME;
  const pass = process.env.MAIL_PASSWORD;
  const inbox = process.env.SUPPORT_INBOX ?? user ?? "";

  if (!host || !user || !pass || !inbox) {
    console.error(
      "[sample-upload] SMTP env not configured — aborting send",
      { hasHost: !!host, hasUser: !!user, hasPass: !!pass },
    );
    return jsonError(
      "Email is not configured on the server. Please email us directly with the attachment.",
      503,
    );
  }

  // ── Send ─────────────────────────────────────────────────────────
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user, pass },
  });

  // Sanitize the filename: keep it readable in the inbox but strip
  // anything weird the client might have set.  We default to a
  // bank-name-based fallback if the original is missing or unsafe.
  const safeBank = bank.replace(/[^A-Za-z0-9 _-]/g, "").slice(0, 60).trim() || "sample";
  const originalName =
    typeof fileField.name === "string" ? fileField.name : "";
  const safeName =
    originalName
      .replace(/[^A-Za-z0-9._ -]/g, "_")
      .replace(/\s+/g, " ")
      .slice(0, 120) || `${safeBank}.pdf`;

  const subject = `[CentProof] Sample upload: ${bank}`;
  const text = [
    "A new sample statement upload from centproof.com/banks/share-sample:",
    "",
    `Bank    : ${bank}`,
    `From    : ${email}`,
    `Version : ${version || "(not provided)"}`,
    `IP      : ${ip}`,
    `File    : ${safeName} (${(fileField.size / 1024).toFixed(1)} KB)`,
    "",
    "Notes:",
    notes || "(none)",
    "",
    "──",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `"CentProof samples" <${user}>`,
      to: inbox,
      replyTo: email,
      subject,
      text,
      attachments: [
        {
          filename: safeName,
          content: fileBuffer,
          contentType: "application/pdf",
        },
      ],
    });
  } catch (err) {
    console.error("[sample-upload] sendMail failed", err);
    return jsonError(
      "We couldn't deliver the upload right now. Please email support@centproof.com directly with the file attached.",
      502,
    );
  }

  return NextResponse.json({ ok: true });
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ ok: false, error: message }, { status });
}
