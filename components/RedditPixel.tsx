import Script from "next/script";

/**
 * Reddit Pixel loader for Reddit Ads conversion tracking.
 *
 * Same privacy stance + reasoning as components/GoogleTag.tsx:
 * the marketing website needs to measure which paid-acquisition
 * channels actually produce customers, and Reddit Ads (like Google
 * Ads) needs a first-party pixel on the site to attribute clicks to
 * downstream conversions.  Without it, the $12/day Reddit pilot
 * spends blind.
 *
 * We deliberately do NOT enable Reddit's "Auto-advanced matching"
 * feature — that would hash and send visitor email/phone to Reddit
 * for cross-device matching.  Conflicts with the homepage's "no
 * tracking" pitch.  Standard pixel only; aggregate counts.
 *
 * Empty-state: when NEXT_PUBLIC_REDDIT_PIXEL_ID is unset, this
 * component renders nothing.  Local dev + Preview deploys run
 * identically to before; only Production needs the env var set.
 *
 * Wire-up:
 *   1. In Reddit Ads Manager → Events Manager → create a pixel,
 *      copy the `a2_xxxxxxxx` pixel ID
 *   2. Vercel → centproof-website → Settings → Environment Variables:
 *        NEXT_PUBLIC_REDDIT_PIXEL_ID=a2_j0ye0sdcqye8
 *      Apply to Production (and optionally Preview).
 *   3. Redeploy (uncheck "use existing build cache").
 *   4. Pixel starts firing PageVisit on every page load within minutes.
 *
 * Conversion event firing (the "did this visitor buy?" half) lives
 * in components/CheckoutLink.tsx and activates separately when the
 * env var is set.  Pixel alone tracks page visits + remarketing
 * audiences; pixel + Purchase event tracks actual checkout-click
 * conversions attributable to Reddit ad clicks.
 */
export function RedditPixel() {
  const pixelId = (process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID ?? "").trim();
  if (!pixelId) return null;

  return (
    <Script id="reddit-pixel-init" strategy="afterInteractive">
      {`
        !function(w,d){
          if(!w.rdt){
            var p=w.rdt=function(){
              p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)
            };
            p.callQueue=[];
            var t=d.createElement("script");
            t.src="https://www.redditstatic.com/ads/pixel.js";
            t.async=!0;
            var s=d.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(t,s)
          }
        }(window,document);
        rdt('init','${pixelId}', {
          // Don't send hashed user data (email/phone/IP) to Reddit.
          // We're optimizing for first-party conversion measurement,
          // not for Reddit to enrich its general audience profiles.
          optOut: false,
          useDecimalCurrencyValues: true
        });
        rdt('track', 'PageVisit');
      `}
    </Script>
  );
}
