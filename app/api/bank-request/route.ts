/**
 * Bank-parser request endpoint (Phase 5.14).
 *
 * The /banks/submit form POSTs here with:
 *   { bank, email, notes, website }
 *
 *   - `bank`     — required, the bank name the user wants supported
 *   - `email`    — required, where we will reply
 *   - `notes`    — optional free-text
 *   - `website`  — honeypot.  Real users leave it empty; bots fill it in.
 *
 * The handler validates inputs, rejects spam (honeypot, basic rate
 * limiting via the Cloudflare/Vercel `cf-connecting-ip` header), and
 * emails the request to the support inbox via SMTP.
 *
 * Why SMTP and not Resend?  The desktop license webhook uses Resend
 * because Cloudflare Workers can't open arbitrary TCP sockets.  This
 * route runs on the Next.js Node server, where SMTP is straightforward
 * and reuses the Hostinger mailbox Java Mantra Corp already operates.
 *
 * No secrets in this file: the mailbox host, port, username, and
 * password come from environment variables set in the hosting
 * provider's panel (NEVER committed to git):
 *
 *   MAIL_HOST       e.g. smtp.hostinger.com
 *   MAIL_PORT       e.g. 587
 *   MAIL_USERNAME   the mailbox to authenticate as
 *   MAIL_PASSWORD   that mailbox's app password
 *   SUPPORT_INBOX   where to deliver the request (defaults to MAIL_USERNAME)
 *
 * If any required value is missing the route returns 503 — better to
 * fail loud than silently swallow a real customer.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

// nodemailer needs the Node runtime — `edge` would fail at build time.
export const runtime = "nodejs";
// Don't cache POST responses.
export const dynamic = "force-dynamic";

interface RequestPayload {
  bank: string;
  email: string;
  notes?: string;
  website?: string; // honeypot
}

const MAX_BANK_LEN = 80;
const MAX_NOTES_LEN = 1500;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// In-memory rate limiter: max 5 submissions / IP / 10 minutes.
// Resets when the server restarts (good enough for a low-volume form).
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const recentSubmissions = new Map<string, number[]>();

export async function POST(request: NextRequest) {
  let payload: RequestPayload;
  try {
    payload = (await request.json()) as RequestPayload;
  } catch {
    return jsonError("Invalid JSON.", 400);
  }

  // ── Honeypot ─────────────────────────────────────────────────────
  // Real users never see the `website` field.  Bots auto-fill every
  // input they find.  Silently 200 on a populated honeypot so the bot
  // doesn't learn it triggered a check.
  if (payload.website && payload.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  // ── Validation ───────────────────────────────────────────────────
  const bank = (payload.bank ?? "").trim();
  const email = (payload.email ?? "").trim();
  const notes = (payload.notes ?? "").trim();

  if (!bank) return jsonError("Bank name is required.", 400);
  if (bank.length > MAX_BANK_LEN)
    return jsonError(`Bank name must be ${MAX_BANK_LEN} characters or fewer.`, 400);
  if (!email) return jsonError("Email is required.", 400);
  if (!EMAIL_RE.test(email)) return jsonError("Please enter a valid email.", 400);
  if (notes.length > MAX_NOTES_LEN)
    return jsonError(`Notes must be ${MAX_NOTES_LEN} characters or fewer.`, 400);

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
      "Too many requests. Please try again in a few minutes.",
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
      "[bank-request] SMTP env not configured — aborting send",
      { hasHost: !!host, hasUser: !!user, hasPass: !!pass },
    );
    return jsonError(
      "Email is not configured on the server. Please email us directly.",
      503,
    );
  }

  // ── Send ─────────────────────────────────────────────────────────
  const transporter = nodemailer.createTransport({
    host,
    port,
    // For port 587 we use STARTTLS (secure: false + requireTLS).
    // For port 465 we use implicit TLS (secure: true).
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user, pass },
  });

  const subject = `[CentProof] Bank request: ${bank}`;
  const text = [
    "A new bank-parser request from centproof.com:",
    "",
    `Bank   : ${bank}`,
    `From   : ${email}`,
    `IP     : ${ip}`,
    "",
    "Notes:",
    notes || "(none)",
    "",
    "──",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `"CentProof requests" <${user}>`,
      to: inbox,
      replyTo: email,
      subject,
      text,
    });
  } catch (err) {
    console.error("[bank-request] sendMail failed", err);
    return jsonError(
      "We couldn't deliver the request right now. Please email us directly.",
      502,
    );
  }

  return NextResponse.json({ ok: true });
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ ok: false, error: message }, { status });
}
