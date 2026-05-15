"use client";

import { trackEvent } from "@/components/AnalyticsTracker";

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
