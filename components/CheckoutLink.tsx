"use client";

import { trackEvent } from "@/components/AnalyticsTracker";

// Google Ads conversion-event configuration — both env vars must be
// set for the conversion event to fire.  See components/GoogleTag.tsx
// for the base-tag loader (which can be installed independently to
// track page views / remarketing audiences without needing the
// conversion label).
const GADS_TAG_ID = (process.env.NEXT_PUBLIC_GOOGLE_TAG_ID ?? "").trim();
const GADS_CONVERSION_LABEL = (
  process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL ?? ""
).trim();

// Pre-compose the send_to value once at module load so the click
// handler doesn't do work on every click.  Empty string when either
// env var is missing → fireGoogleAdsConversion no-ops.
const GADS_SEND_TO =
  GADS_TAG_ID && GADS_CONVERSION_LABEL
    ? `${GADS_TAG_ID}/${GADS_CONVERSION_LABEL}`
    : "";

// Minimal window.gtag type declaration so we can call it without
// pulling in @types/gtag.js as a dep.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fire a Google Ads conversion event for a checkout-button click.
 * Wrapped in a function (not inlined into the onClick handler) so
 * the conditional logic — "only fire when both env vars set AND
 * window.gtag actually loaded" — lives in one place.
 *
 * `plan` is the dataPlan string ("Pro Lifetime" / "Pro Monthly").
 * `value` is the price in USD.  Google Ads attributes ALL clicks
 * against the same Conversion Action (by design, since the user
 * hasn't actually bought yet — we're tracking checkout intent, not
 * completed purchase).  Passing distinct values per plan lets us
 * see in Google Ads' Value column whether high-CAC keywords are
 * pulling lifetime or monthly buyers.
 */
function fireGoogleAdsConversion(plan: string, value: number) {
  if (!GADS_SEND_TO) return; // env vars not set yet
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return; // gtag.js not loaded
  window.gtag("event", "conversion", {
    send_to: GADS_SEND_TO,
    value,
    currency: "USD",
    transaction_id: `${plan}-${Date.now()}`,
  });
}

/**
 * Drop-in replacement for the external "Buy" anchor on the pricing
 * cards.  At click time it reads the current URL's `?opp=...` query
 * param (set when a buyer arrives via a ConvoProof tracking link),
 * and appends `&checkout[custom][opp]=...` to the LemonSqueezy
 * checkout URL so it lands in `meta.custom_data.opp` on the
 * `order_created` webhook event.
 *
 * That closes the loop:
 *
 *     HN/GitHub reply with /r/abc123
 *       → r.convoproof.com 302
 *           → centproof.com/?opp=opp_xxx (this page)
 *               → click Buy Lifetime  (here)
 *                   → buy.lemonsqueezy.com/...&checkout[custom][opp]=opp_xxx
 *                       → LS fires order_created webhook to
 *                           r.convoproof.com/api/cp/webhook/lemonsqueezy
 *                               → MindSpire writes attribution row
 *                                   → ConvoProof Tracking tab shows the sale
 *
 * No `opp` in the URL → behaves identically to the previous static
 * anchor.  Organic non-ConvoProof buyers see exactly what they
 * always have.
 *
 * We URL-encode the value but keep the bracket syntax literal — LS's
 * checkout-URL parser expects unencoded brackets (matches the
 * existing `checkout[discount_code]=...` launch-coupon pattern in
 * site-content.tsx).
 */
export function CheckoutLink({
  href,
  className,
  dataPlan,
  children,
}: {
  href: string;
  className: string;
  dataPlan: string;
  children: React.ReactNode;
}) {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only enhance on real clicks in the browser — Cmd-click /
    // middle-click / right-click all fall through to the static
    // href, which is fine (those don't make sense for a checkout
    // anyway).
    if (e.defaultPrevented) return;
    if (e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const params = new URLSearchParams(window.location.search);
    const opp = params.get("opp");

    // Fire buy_click to MindSpire analytics (Pass 5.0).  Captured
    // BEFORE we early-return for the no-opp case — we want to track
    // EVERY checkout-button click for the conversion funnel, not
    // just ConvoProof-attributed ones.
    trackEvent("buy_click", {
      plan: dataPlan,                       // "Pro Lifetime" | "Pro Monthly"
      attributed: opp ? true : false,       // came via ConvoProof tracking link
      opp: opp ?? undefined,                // opportunity id if attributed
    });

    // Fire Google Ads conversion event so Ads can attribute this
    // checkout click to the originating keyword / ad / campaign.
    // No-ops gracefully when env vars aren't configured (local dev
    // + Preview deploys, or before the Google Ads Conversion Action
    // is created).  $49 for Pro Lifetime, $5 for Pro Monthly —
    // tracked as conversion VALUE, not actual revenue (the visitor
    // hasn't bought yet, just initiated checkout).
    const conversionValue = dataPlan === "Pro Lifetime" ? 49 : 5;
    fireGoogleAdsConversion(dataPlan, conversionValue);

    if (!opp) return; // no tracking link — leave href as-is

    e.preventDefault();
    const sep = href.includes("?") ? "&" : "?";
    const enhanced = `${href}${sep}checkout[custom][opp]=${encodeURIComponent(opp)}`;
    // Match the static anchor's target="_blank" behaviour by opening
    // in a new tab.  Falls back to same-tab nav if the popup blocker
    // intervenes (extremely rare on a user-initiated click).
    const win = window.open(enhanced, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = enhanced;
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={className}
      data-plan={dataPlan}
    >
      {children}
    </a>
  );
}
