/**
 * LemonSqueezy webhook handling (Phase 5.11.x — LS API switch for v0.1.1).
 *
 * Two responsibilities:
 *   1. verifySignature — HMAC-SHA256 the raw body against the shared
 *      secret and compare to X-Signature.  Reject anything that
 *      doesn't match (constant-time compare).
 *   2. parseEvent     — pull the bits we care about out of the payload.
 *
 * Events we ACT on (the rest are ignored with kind: "ignore"):
 *
 *   license_key_created     The big one.  Fires every time LS generates
 *                           a license key — once per Pro Lifetime
 *                           purchase, once per Pro Monthly subscription
 *                           start.  The key string itself is in the
 *                           payload (data.attributes.key), so we just
 *                           email it to the buyer.
 *
 *   subscription_cancelled  Send a polite "we're sorry to see you go"
 *                           email.  The desktop app already knows about
 *                           the cancellation via the lastValidatedAt
 *                           pull — when the user's `exp` expires LS
 *                           reports the license as inactive and the
 *                           app drops to free.
 *
 * Events we EXPLICITLY ignore (LS sends them but we don't need to
 * act):
 *
 *   order_created                    — license_key_created follows; act there
 *   subscription_created             — same
 *   subscription_payment_success     — renewal, LS extends exp on
 *                                       existing key, no new email
 *   subscription_payment_failed      — user already gets LS's dunning
 *                                       email; we'd just add noise
 *   order_refunded                   — refunds are rare; LS handles
 *                                       customer-side notification, we
 *                                       log for audit
 *
 * Why no maintaining our own customer DB: LemonSqueezy IS the source of
 * truth for who paid and when.  We turn their `license_key_created`
 * events into emails; everything else (renewals, validation, device
 * tracking) is handled by LS's License API which the desktop app calls
 * directly.
 */

/**
 * Verify a LemonSqueezy webhook payload's HMAC-SHA256 signature
 * using the Web Crypto API (native to Cloudflare Workers / modern
 * browsers / Node 19+).  Constant-time compare via crypto.subtle.
 */
export async function verifyLemonsqueezySignature(
  rawBody: string,
  receivedSig: string,
  secret: string,
): Promise<boolean> {
  if (!receivedSig || receivedSig.length === 0) return false;

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sigBytes = await crypto.subtle.sign("HMAC", key, enc.encode(rawBody));
  const expectedHex = bufferToHex(sigBytes);

  // Constant-time compare to avoid timing leaks.
  return constantTimeEqual(expectedHex, receivedSig.toLowerCase());
}

function bufferToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

// ============================================================================
// Event parsing
// ============================================================================

export type LicenseType = "monthly" | "lifetime";

/**
 * Actionable event — we either email a license, or email a cancel
 * notification.  No more "issue" / "renew" / "refund" — LS handles
 * renewals itself (the key stays valid; we don't reissue) and refunds
 * are silent-log.
 */
export interface ActionableWebhookEvent {
  kind: "issue" | "cancel" | "payment_failed";
  /** Buyer email — destination of our email + identity for the
   *  license_key activation in the desktop app.  Comes from the
   *  license_key's customer_email / user_email field on
   *  license_key_created, or the subscription's user_email on
   *  cancellation / payment_failed. */
  email: string;
  /** Buyer's display name — email greeting. */
  name: string;
  /** Stable LemonSqueezy ID for support lookups. */
  purchaseId: string;
  /** Pro Monthly vs Pro Lifetime — set on `issue`, defaulted on `cancel`
   *  and `payment_failed` (always monthly for those). */
  type: LicenseType;
  /** The actual license key string LS generated.  Only present on
   *  `kind: "issue"` — the buyer pastes this exact string into
   *  Preferences > License in the desktop app. */
  licenseKey?: string;
  /** ISO YYYY-MM-DD expiry.  null for lifetime; the cancellation flow
   *  uses LS's `ends_at` so the user knows when access drops.  On
   *  `payment_failed` this is the date the next retry attempt happens
   *  (LS's `renews_at`) so the email can quote a concrete deadline. */
  exp: string | null;
  /** Customer-portal URL for updating billing.  Only set on
   *  `payment_failed` — the user clicks this to fix their card. */
  portalUrl?: string;
}

export interface IgnoredWebhookEvent {
  kind: "ignore";
  reason: string;
}

export type ParsedWebhookEvent = ActionableWebhookEvent | IgnoredWebhookEvent;

/**
 * Map raw LemonSqueezy events to our domain.  Returns `kind: "ignore"`
 * for anything other than license_key_created or subscription_cancelled
 * — the webhook always responds 200 OK on those, so LS doesn't retry.
 *
 * The exact LemonSqueezy event shape isn't fully typed here on
 * purpose: we pluck the few fields we use and accept the rest as
 * unknown, so LS schema additions don't break us.
 */
export function parseLemonSqueezyEvent(
  payload: unknown,
  /** Map of LS variant_id → "monthly" | "lifetime".  Some webhook
   *  payloads (license_key_created in particular) don't include the
   *  variant directly — we resolve via this lookup. */
  variantMap: Record<string, LicenseType>,
  /** When true, reject `test_mode: true` events with kind: "ignore".
   *  Wire this to VERCEL_ENV === "production" so the public webhook
   *  can't be used to mint free licenses while LS is still in test
   *  mode (pre-activation). */
  rejectTestMode: boolean = false,
): ParsedWebhookEvent {
  if (!payload || typeof payload !== "object") {
    return { kind: "ignore", reason: "payload not an object" };
  }
  const p = payload as {
    meta?: { event_name?: string; test_mode?: boolean };
    data?: {
      type?: string;
      id?: string;
      attributes?: Record<string, unknown>;
    };
  };
  const eventName = p.meta?.event_name;
  if (!eventName) {
    return { kind: "ignore", reason: "no event_name in meta" };
  }

  // Test-mode safety gate (see comment on rejectTestMode above).
  if (rejectTestMode && p.meta?.test_mode === true) {
    return {
      kind: "ignore",
      reason:
        "test_mode purchase ignored on production deploy (store not yet activated, or test webhook fired against prod)",
    };
  }

  const data = p.data;
  if (!data || !data.attributes) {
    return { kind: "ignore", reason: "no data.attributes" };
  }
  const a = data.attributes;
  const purchaseId = String(data.id ?? "");

  switch (eventName) {
    case "license_key_created": {
      // The license key string LIVES on the event payload — LS
      // generated it server-side when the order / subscription was
      // created.  We just email it to the buyer.  No ed25519 signing,
      // no payload schema of our own.
      const licenseKey = String(a.key ?? "");
      const email = String(a.user_email ?? a.customer_email ?? "");
      const name = String(a.user_name ?? a.customer_name ?? "");
      // LS quirk: license_key_created events expose `product_id` but
      // not `variant_id` (verified empirically against the v0.1.1 test
      // purchase — see the payload archive in /docs/lemonsqueezy/).
      // Other events (order_created) DO include variant_id.  Look up
      // both so the same env-var map handles either id type — callers
      // just put their product IDs and/or variant IDs in
      // LEMONSQUEEZY_VARIANT_MAP.  The kept-as-fallback name "variant"
      // is a v0.1.1 holdover; functionally it's now an id-map.
      const variantId = String(a.variant_id ?? "");
      const productId = String(a.product_id ?? "");
      // Resolve via the id map first.  Default to lifetime when
      // expires_at is null (LS's convention for one-time keys) — but
      // this fallback is unreliable for subscriptions (LS keeps
      // subscription license expires_at null too), so the map should
      // always cover the live product/variant ids.
      const expiresAt = a.expires_at ?? null;
      const type: LicenseType =
        variantMap[variantId] ??
        variantMap[productId] ??
        (expiresAt === null || expiresAt === "" ? "lifetime" : "monthly");
      const exp =
        typeof expiresAt === "string" && expiresAt.length > 0
          ? expiresAt.slice(0, 10)
          : null;

      if (!licenseKey || !email) {
        return {
          kind: "ignore",
          reason: `license_key_created missing key or email (key=${!!licenseKey}, email=${!!email})`,
        };
      }
      return {
        kind: "issue",
        email,
        name: name || email,
        purchaseId,
        type,
        licenseKey,
        exp,
      };
    }

    case "subscription_cancelled": {
      const email = String(a.user_email ?? "");
      const name = String(a.user_name ?? "");
      const endsAt = a.ends_at ?? a.renews_at ?? null;
      const exp =
        typeof endsAt === "string" && endsAt.length > 0
          ? endsAt.slice(0, 10)
          : null;
      if (!email) {
        return { kind: "ignore", reason: "subscription_cancelled missing email" };
      }
      return {
        kind: "cancel",
        email,
        name: name || email,
        purchaseId,
        type: "monthly",
        exp,
      };
    }

    case "subscription_payment_failed": {
      // LS retries failed payments a few times over ~7 days, sending
      // its own generic dunning emails.  Those land in spam too often
      // to rely on alone — we send a branded follow-up pointing at
      // the LS customer portal so the user can update their card
      // before they lose Pro access.
      const email = String(a.user_email ?? "");
      const name = String(a.user_name ?? "");
      // LS includes `renews_at` for the next retry attempt — quote
      // that date so the email has a concrete deadline ("If we can't
      // process the payment by <date>, Pro features will pause").
      const renewsAt = a.renews_at ?? null;
      const exp =
        typeof renewsAt === "string" && renewsAt.length > 0
          ? renewsAt.slice(0, 10)
          : null;
      // LS embeds the customer-portal URL under `urls.customer_portal`
      // on subscription events — that's the link the user clicks to
      // update their card.  Fall back to /pricing if absent so the
      // email still has a useful CTA.
      const urls = (a.urls ?? {}) as { customer_portal?: string };
      const portalUrl = urls.customer_portal;
      if (!email) {
        return {
          kind: "ignore",
          reason: "subscription_payment_failed missing email",
        };
      }
      return {
        kind: "payment_failed",
        email,
        name: name || email,
        purchaseId,
        type: "monthly",
        exp,
        portalUrl,
      };
    }

    default:
      return { kind: "ignore", reason: `unhandled event_name: ${eventName}` };
  }
}
