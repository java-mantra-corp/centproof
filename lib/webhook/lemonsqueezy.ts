/**
 * LemonSqueezy webhook handling (Phase 5.11).
 *
 * Two responsibilities:
 *   1. verifySignature — HMAC-SHA256 the raw body against the shared
 *      secret and compare to X-Signature.  Reject anything that
 *      doesn't match (constant-time compare).
 *   2. parseEvent     — pull the bits we care about out of the payload.
 *
 * LemonSqueezy webhook events we handle:
 *   - order_created                  one-time purchase (Pro Lifetime)
 *   - subscription_created           first-time subscription start
 *   - subscription_payment_success   recurring renewal
 *   - subscription_cancelled         user cancelled (license keeps
 *                                    working until exp; no immediate
 *                                    revocation)
 *   - subscription_payment_failed    retry pending; no action needed
 *                                    (we already issued; if they don't
 *                                    pay, exp lapses naturally)
 *   - order_refunded                 refund issued (rare; logged only —
 *                                    a true revocation system would
 *                                    require an online check, which
 *                                    we deliberately avoid)
 *
 * What we deliberately DO NOT do here:
 *   - Maintain our own customer database.  LemonSqueezy IS the source
 *     of truth for who paid and when.  We just turn their events into
 *     signed license payloads.
 *   - Phone home from the desktop app.  Verification is local and
 *     offline.
 *
 * The webhook is stateless — every event is a self-contained
 * (payload, signature) pair that we sign and forward.  No DB, no KV
 * store, no per-customer record.
 */

import type { LicenseType } from "./license";

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

  // Constant-time compare to avoid timing leaks.  WebCrypto doesn't
  // ship a built-in compare, so we do it manually with XOR-fold.
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

/**
 * Actionable webhook event — one of issue / renew / cancel / refund.
 * Sparse — most fields in the original payload are useless to us
 * (analytics, currency conversions, etc.).
 */
export interface ActionableWebhookEvent {
  kind: "issue" | "renew" | "cancel" | "refund";
  /** Buyer email — license `sub` field + email recipient. */
  email: string;
  /** Buyer's display name — license `name` field + email greeting. */
  name: string;
  /** Stable LemonSqueezy ID for this purchase / subscription.
   *  Stored in license `purchase_id` for support lookups. */
  purchaseId: string;
  /** Did the buyer pay for monthly or lifetime?
   *  Driven by which LemonSqueezy product variant they bought,
   *  passed through unchanged. */
  type: LicenseType;
  /** ISO YYYY-MM-DD when this license should expire.  Lifetime
   *  licenses set this to null (the license verifier reads null as
   *  "never expires"). */
  exp: string | null;
}

/** Returned for events we don't need to act on (unknown event_name,
 *  payload missing required fields, etc.).  The webhook always
 *  returns 200 OK on these — we never want LemonSqueezy retrying a
 *  no-op event. */
export interface IgnoredWebhookEvent {
  kind: "ignore";
  reason: string;
}

export type ParsedWebhookEvent = ActionableWebhookEvent | IgnoredWebhookEvent;

/**
 * Map raw LemonSqueezy events to our domain.  Returns `kind: "ignore"`
 * for event types we don't care about (subscription_payment_failed,
 * etc.) so the webhook always returns 200 — we never want LemonSqueezy
 * to retry a "no-op" event repeatedly.
 *
 * The exact LemonSqueezy event shape isn't fully typed here on purpose:
 * we pluck out the few fields we need and ignore the rest, so changes
 * upstream (new fields, deprecations) don't break us.
 */
export function parseLemonSqueezyEvent(
  payload: unknown,
  /** Map of LemonSqueezy variant_id → "monthly" | "lifetime".  Set in
   *  the webhook config; this is how we know which product the buyer
   *  paid for. */
  variantMap: Record<string, LicenseType>,
  /** When true, reject LemonSqueezy `test_mode: true` events with
   *  `kind: "ignore"`.  Set this in production so a publicly-visible
   *  test-mode checkout URL can't be used to mint free licenses while
   *  the store is still pending KYC activation.  Default false so dev
   *  / preview environments can keep using the 4242 test card to
   *  exercise the full flow. */
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

  // Test-mode safety gate.  Before the LS store is activated (KYC +
  // banking), every purchase is a test-mode purchase with the
  // `4242 4242 4242 4242` card — which means anyone visiting the
  // public checkout URL could mint a free Pro license.  Reject those
  // in production so the only way to get a license is a real card
  // post-activation.  The dev / preview deploys keep test mode on so
  // we can continue exercising the full sign + email + activate flow.
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

  // Common fields shared between order_* and subscription_* events.
  const email = String(a.user_email ?? a.email ?? "");
  const name = String(a.user_name ?? a.name ?? "");
  const purchaseId = String(data.id ?? "");

  if (!email || !purchaseId) {
    return { kind: "ignore", reason: "missing email or id" };
  }

  switch (eventName) {
    case "order_created": {
      // One-time purchase — Pro Lifetime per pricing-strategy.md §4.
      const variantId = String(
        a.first_order_item ? (a.first_order_item as { variant_id?: number }).variant_id ?? "" : "",
      );
      const type = variantMap[variantId] ?? "lifetime";
      return {
        kind: "issue",
        email,
        name: name || email,
        purchaseId,
        type,
        exp: null, // lifetime never expires
      };
    }

    case "subscription_created":
    case "subscription_payment_success": {
      // Subscription start OR renewal — recompute exp from
      // attributes.renews_at (ISO) which LemonSqueezy includes.
      const renewsAt = String(a.renews_at ?? a.ends_at ?? "");
      if (!renewsAt) {
        return { kind: "ignore", reason: "no renews_at on subscription" };
      }
      const variantId = String(a.variant_id ?? "");
      const type = variantMap[variantId] ?? "monthly";
      return {
        kind: eventName === "subscription_created" ? "issue" : "renew",
        email,
        name: name || email,
        purchaseId,
        type,
        exp: renewsAt.slice(0, 10), // ISO YYYY-MM-DD
      };
    }

    case "subscription_cancelled":
      return {
        kind: "cancel",
        email,
        name: name || email,
        purchaseId,
        type: "monthly",
        exp: null,
      };

    case "order_refunded":
      return {
        kind: "refund",
        email,
        name: name || email,
        purchaseId,
        type: "lifetime",
        exp: null,
      };

    default:
      return { kind: "ignore", reason: `unhandled event_name: ${eventName}` };
  }
}
