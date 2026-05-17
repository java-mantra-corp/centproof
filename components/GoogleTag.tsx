import Script from "next/script";

/**
 * Google Tag (gtag.js) loader for Google Ads conversion tracking.
 *
 * Why this is on the site despite our "no tracking" homepage pitch:
 *
 *   The homepage promise is that the CentProof APP doesn't sync,
 *   track, or share your financial data — that's the product
 *   integrity statement and it stands.  The marketing website is a
 *   different surface: like every business website, it needs to
 *   measure which paid-acquisition channels actually produce
 *   customers.  Without conversion tracking, a paid-ads pilot is
 *   guessing instead of measuring, and we end up either over-
 *   investing in channels that don't work or under-investing in
 *   ones that do.
 *
 *   We disclose Google Ads conversion tracking on /privacy alongside
 *   Vercel Analytics, and we deliberately do NOT turn on Google's
 *   "Enhanced Conversions" feature (which would send hashed buyer
 *   emails to Google for cross-device attribution).  Standard tag
 *   only.  Aggregate counts.
 *
 * Empty-state: when NEXT_PUBLIC_GOOGLE_TAG_ID is unset, this
 * component renders nothing.  Local dev + Preview deploys can run
 * without it; only Production needs the env var set.
 *
 * Wire-up:
 *   1. In Google Ads → gear → Setup → Google Tag → copy the AW-... ID
 *   2. Vercel → centproof-website → Settings → Environment Variables:
 *        NEXT_PUBLIC_GOOGLE_TAG_ID=AW-18170298871
 *      Apply to Production (and optionally Preview).
 *   3. Redeploy.  The tag starts loading on every page.
 *
 * Conversion event firing (the second half — "did this visitor buy?")
 * lives in components/CheckoutLink.tsx and activates separately when
 * NEXT_PUBLIC_GADS_CONVERSION_LABEL is also set.  Tag alone tracks
 * page views / remarketing audiences; tag + label tracks actual
 * checkout-click conversions.
 */
export function GoogleTag() {
  const tagId = (process.env.NEXT_PUBLIC_GOOGLE_TAG_ID ?? "").trim();
  if (!tagId) return null;

  return (
    <>
      {/* gtag.js loader — afterInteractive avoids blocking initial paint.
          Next/Script de-dupes; safe to render once per page. */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${tagId}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${tagId}', {
            // Anonymize IP at the Google-collection layer.  Doesn't
            // affect conversion attribution; reduces what Google
            // stores about the visitor.
            'anonymize_ip': true,
            // Don't share data signals back to Google for
            // remarketing/audience-building beyond our own ads
            // account.  We're optimizing for first-party conversion
            // measurement, not for Google to enrich its general
            // audience profiles.
            'allow_google_signals': false,
            'allow_ad_personalization_signals': false
          });
        `}
      </Script>
    </>
  );
}
