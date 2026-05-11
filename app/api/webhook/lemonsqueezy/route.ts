/**
 * CentProof license webhook — Next.js Route Handler (Phase 5.11.x).
 *
 * Lives at https://centproof.com/api/webhook/lemonsqueezy.  Configure
 * this URL in LemonSqueezy's Webhooks page.
 *
 * Flow for v0.1.1 (LS API switch):
 *
 *   1. LS fires `license_key_created` after each Pro purchase
 *      (Lifetime one-time or Monthly subscription start).  The
 *      generated license key is in the webhook payload — we just
 *      relay it via email.  No more ed25519 signing.
 *   2. LS fires `subscription_cancelled` when a Monthly user cancels —
 *      we send a polite "we're sorry to see you go" email.  No
 *      revocation needed; LS marks the license inactive when `exp`
 *      passes, and the desktop app's nightly validate picks that up.
 *   3. Everything else (order_created, subscription_payment_success,
 *      refunds) → kind: "ignore" → 200 OK so LS doesn't retry.
 *
 * Required Vercel env vars (Settings → Environment Variables):
 *
 *   LEMONSQUEEZY_WEBHOOK_SECRET
 *     Signing secret LemonSqueezy generates when you create the
 *     webhook.  We HMAC-SHA256 the raw POST body against this.
 *
 *   RESEND_API_KEY
 *     Resend.com API key (re_…) used to send license emails.  The
 *     from-address must be on a verified Resend sending domain.
 *
 *   LEMONSQUEEZY_VARIANT_MAP   default: {}
 *     JSON like {"1636910":"lifetime","1637082":"monthly"} — maps LS
 *     variant IDs to our license types.  Falls back to inferring from
 *     expires_at (null → lifetime, ISO → monthly) when missing.
 *
 *   RESEND_FROM_EMAIL   default "licenses@centproof.com"
 *   SUPPORT_EMAIL       default "support@centproof.com"
 *   ACCOUNT_URL         default "https://centproof.com/pricing"
 *
 * Notably ABSENT from v0.1.1: CENTPROOF_LICENSE_PRIVATE_KEY_PEM —
 * we no longer sign licenses ourselves.  Safe to delete from the
 * Vercel env panel after this deploy goes live (the route handler
 * doesn't reference it anymore).
 */

import {
  parseLemonSqueezyEvent,
  verifyLemonsqueezySignature,
  type LicenseType,
} from "@/lib/webhook/lemonsqueezy";
import { sendEmail } from "@/lib/webhook/email";
import {
  renderCancelEmail,
  renderLicenseEmail,
} from "@/lib/webhook/templates";

// Node runtime gives us nicer error traces in Vercel logs than Edge.
// Either works since we only use fetch + Web Crypto (no Node-only APIs).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  // ── 1. Read raw body for HMAC verification ───────────────────────
  // Signature is over the EXACT bytes LS sent.  JSON.parse →
  // JSON.stringify changes whitespace / key order and breaks the
  // HMAC, so we verify the raw text first, then parse for use.
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

  // ── 2. Parse payload + variant map ───────────────────────────────
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
    // Continue with empty map; parseLemonSqueezyEvent has a sensible
    // fallback (infer from expires_at).
  }

  // Test-mode safety gate.  Pre-activation, every LS purchase is
  // test-mode using the 4242 card — refuse to issue licenses in
  // production for those (preview deploys keep test mode on so we
  // can keep exercising the full flow).
  const rejectTestMode = process.env.VERCEL_ENV === "production";
  const event = parseLemonSqueezyEvent(payload, variantMap, rejectTestMode);

  if (event.kind === "ignore") {
    console.log("[webhook] ignored event:", event.reason);
    return new Response("ok (ignored)\n");
  }

  // ── 3. Resolve mailing env ───────────────────────────────────────
  const resendApiKey = process.env.RESEND_API_KEY ?? "";
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "licenses@centproof.com";
  const supportEmail = process.env.SUPPORT_EMAIL ?? "support@centproof.com";
  const accountUrl =
    process.env.ACCOUNT_URL ?? "https://centproof.com/pricing";

  if (!resendApiKey) {
    console.error("[webhook] missing RESEND_API_KEY env");
    return new Response("server misconfigured", { status: 500 });
  }

  // ── 4. Issue (license_key_created) → email the LS-generated key ──
  if (event.kind === "issue" && event.licenseKey) {
    const { subject, text, html } = renderLicenseEmail(
      {
        name: event.name,
        licenseKey: event.licenseKey,
        type: event.type,
        exp: event.exp,
        purchaseId: event.purchaseId,
        accountUrl,
        supportEmail,
      },
      false, // isRenewal — LS doesn't re-issue keys on renewals in our
              // config (we set "Reissue license key on each payment"
              // OFF), so we never see a "renewal" license_key_created
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

    console.log("[webhook] license email sent", {
      type: event.type,
      email: event.email,
      purchaseId: event.purchaseId,
    });
    return new Response("ok\n");
  }

  // ── 5. Cancel → polite goodbye email ─────────────────────────────
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
    console.log("[webhook] cancel email sent", { email: event.email });
    return new Response("ok\n");
  }

  // TS exhaustiveness — unreachable; `issue` without licenseKey was
  // filtered out by parseLemonSqueezyEvent.
  return new Response("ok\n");
}

// GET probe — visit the URL in a browser to confirm the route exists.
export async function GET(): Promise<Response> {
  return new Response("ok\n");
}
