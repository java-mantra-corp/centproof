/**
 * CentProof license webhook — Next.js Route Handler version.
 *
 * Lives at https://centproof.com/api/webhook/lemonsqueezy.  Configure
 * this URL on LemonSqueezy's Webhooks page (Settings → Webhooks).
 *
 * This is a port of webhook/src/index.ts (Phase 5.11) from Cloudflare
 * Workers + Hono to a Vercel-hosted Next.js Route Handler.  All the
 * business logic (signature verification, license signing, email
 * rendering) lives in @/lib/webhook/* and was lifted unchanged — that
 * code uses only Web-standard APIs (crypto.subtle, fetch, TextEncoder,
 * btoa/atob, @noble/ed25519) so it ports cleanly between runtimes.
 *
 * Why on Vercel instead of Cloudflare:
 *   - Same vendor as the marketing site → one account, one dashboard
 *   - Webhook URL on our own domain (centproof.com) rather than
 *     centproof-webhook.<user>.workers.dev — cleaner branding for the
 *     LemonSqueezy dashboard's webhook config screen
 *   - Same env-var panel as NEXT_PUBLIC_DOWNLOAD_URL + Resend keys
 *
 * Required Vercel env vars (set in dashboard → Settings → Environment
 * Variables, NOT NEXT_PUBLIC_ prefixed since these are secrets the
 * client must never see):
 *
 *   LEMONSQUEEZY_WEBHOOK_SECRET
 *     Signing secret LemonSqueezy generates when you create the
 *     webhook.  We HMAC-SHA256 the raw POST body against this.
 *
 *   CENTPROOF_LICENSE_PRIVATE_KEY_PEM
 *     ed25519 private key (PKCS8 PEM, multi-line) used to sign
 *     license payloads.  Matching public key is embedded in the
 *     desktop app at src-sidecar/src/license/publicKey.ts.
 *
 *   RESEND_API_KEY
 *     Resend.com API key (re_…) used to send license emails.
 *     The from-address must be on a verified Resend sending domain.
 *
 *   LEMONSQUEEZY_VARIANT_MAP
 *     JSON like {"1636910":"lifetime","1637082":"monthly"} — maps LS
 *     variant IDs to our license types.  IDs come from the LS
 *     dashboard's product variant page.
 *
 *   RESEND_FROM_EMAIL   default "licenses@centproof.com"
 *   SUPPORT_EMAIL       default "support@centproof.com"
 *   ACCOUNT_URL         default "https://centproof.com/account"
 */

import {
  issueLicense,
  loadPrivateKeySeed,
  type LicenseType,
} from "@/lib/webhook/license";
import {
  parseLemonSqueezyEvent,
  verifyLemonsqueezySignature,
} from "@/lib/webhook/lemonsqueezy";
import { sendEmail } from "@/lib/webhook/email";
import {
  renderCancelEmail,
  renderLicenseEmail,
} from "@/lib/webhook/templates";

// Force the Node.js runtime — @noble/ed25519 works on Edge too, but
// Node is more predictable for the PKCS8 PEM parsing we do at boot
// and gives us more debuggable error traces in Vercel logs.
export const runtime = "nodejs";

// Webhook handlers must not be cached.  Vercel caches GET responses
// by default; POST isn't cached but the marker is good documentation.
export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  // ── 1. Read raw body for HMAC verification ───────────────────────
  // The signature is over the EXACT bytes LemonSqueezy sent.  Any
  // re-serialisation (e.g. JSON.parse → JSON.stringify) would change
  // whitespace / key order and break the HMAC.  So we read the body
  // as text, verify, THEN parse for use.
  const rawBody = await request.text();
  const sigHeader = request.headers.get("x-signature") ?? "";

  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET ?? "";
  if (!secret) {
    console.error("[webhook] LEMONSQUEEZY_WEBHOOK_SECRET env var unset");
    return new Response("server misconfigured", { status: 500 });
  }

  const valid = await verifyLemonsqueezySignature(rawBody, sigHeader, secret);
  if (!valid) {
    console.warn("[webhook] signature verification failed", {
      sigPrefix: sigHeader.slice(0, 8),
      bodyLen: rawBody.length,
    });
    return new Response("invalid signature", { status: 401 });
  }

  // ── 2. Parse the payload + the variant map ───────────────────────
  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return new Response("invalid json", { status: 400 });
  }

  let variantMap: Record<string, LicenseType> = {};
  try {
    variantMap = JSON.parse(process.env.LEMONSQUEEZY_VARIANT_MAP ?? "{}") as Record<
      string,
      LicenseType
    >;
  } catch {
    console.error("[webhook] LEMONSQUEEZY_VARIANT_MAP is not valid JSON");
    // Continue with empty map; parseLemonSqueezyEvent has defaults
    // ("order_created" → lifetime, "subscription_*" → monthly).
  }

  const event = parseLemonSqueezyEvent(payload, variantMap);

  if (event.kind === "ignore") {
    console.log("[webhook] ignored event:", event.reason);
    return new Response("ok (ignored)\n");
  }

  // ── 3. Resolve env vars used by license + email ──────────────────
  const privateKeyPem = process.env.CENTPROOF_LICENSE_PRIVATE_KEY_PEM ?? "";
  const resendApiKey = process.env.RESEND_API_KEY ?? "";
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "licenses@centproof.com";
  const supportEmail = process.env.SUPPORT_EMAIL ?? "support@centproof.com";
  const accountUrl =
    process.env.ACCOUNT_URL ?? "https://centproof.com/account";

  if (!privateKeyPem || !resendApiKey) {
    console.error("[webhook] missing required env: PRIVATE_KEY_PEM or RESEND_API_KEY");
    return new Response("server misconfigured", { status: 500 });
  }

  // ── 4. Issue / renew → sign + email license ──────────────────────
  if (event.kind === "issue" || event.kind === "renew") {
    const seed = loadPrivateKeySeed(privateKeyPem);
    const wire = await issueLicense({
      email: event.email,
      name: event.name,
      type: event.type,
      exp: event.exp,
      purchaseId: event.purchaseId,
      privateKeyBytes: seed,
    });

    const { subject, text, html } = renderLicenseEmail(
      {
        name: event.name,
        licenseKey: wire,
        type: event.type,
        exp: event.exp,
        purchaseId: event.purchaseId,
        accountUrl,
        supportEmail,
      },
      event.kind === "renew",
    );

    await sendEmail(
      {
        to: event.email,
        fromEmail,
        subject,
        text,
        html,
        replyTo: supportEmail,
      },
      resendApiKey,
    );

    console.log("[webhook] license issued", {
      kind: event.kind,
      type: event.type,
      email: event.email,
      purchaseId: event.purchaseId,
    });
    return new Response("ok\n");
  }

  // ── 5. Cancel → polite "subscription ending" email ───────────────
  // No revocation — desktop app downgrades automatically when the
  // existing license's exp lapses (which LS already set when the
  // subscription was active).
  if (event.kind === "cancel") {
    const { subject, text, html } = renderCancelEmail({
      name: event.name,
      exp: event.exp,
      accountUrl,
      supportEmail,
    });
    await sendEmail(
      {
        to: event.email,
        fromEmail,
        subject,
        text,
        html,
        replyTo: supportEmail,
      },
      resendApiKey,
    );
    console.log("[webhook] cancel", { email: event.email });
    return new Response("ok\n");
  }

  // ── 6. Refund → just log ─────────────────────────────────────────
  // We deliberately don't auto-revoke — that would require online
  // verification (which contradicts our local-first promise).  Refund
  // volume is tiny and abuse can be handled manually if it ever
  // becomes a real problem.
  if (event.kind === "refund") {
    console.log("[webhook] refund", {
      email: event.email,
      purchaseId: event.purchaseId,
    });
    return new Response("ok (refund logged)\n");
  }

  // TypeScript exhaustiveness — unreachable.
  return new Response("ok\n");
}

// GET probe so you can visit the URL in a browser and confirm the
// route exists (returns "ok").  Vercel's health checks also like
// having a non-POST endpoint that doesn't 405.
export async function GET(): Promise<Response> {
  return new Response("ok\n");
}
