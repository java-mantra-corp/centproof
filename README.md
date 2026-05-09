# centproof.com

Marketing site for [CentProof](https://centproof.com), a privacy-first Mac
app for bank PDF statement reconciliation, search, and local AI. Published
by Java Mantra Corp.

Built with **Next.js 16** + **Tailwind v4**.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in any values you want to test against
npm run dev                   # http://localhost:3000
npm run build                 # production build sanity-check
npm run lint
```

> The bundled Next.js docs live at `node_modules/next/dist/docs/`. Read
> the relevant guide before adding server actions, route handlers, or
> metadata changes — Next 16 has API changes vs. earlier versions.

## File map

```
app/
  layout.tsx                          Root layout, full Metadata + Schema.org JSON-LD
  page.tsx                            Home (hero, pillars, workflow, features, banks, pricing)
  pricing/page.tsx                    Pricing tiers + pricing FAQ
  product/page.tsx                    Long-form feature tour
  banks/page.tsx                      Supported + coming-soon banks
  privacy/page.tsx                    Plain-English privacy model
  faq/page.tsx                        General FAQ
  support/page.tsx                    Support topics + contact
  download/page.tsx                   .dmg download (env-gated)
  legal/
    privacy-policy/page.tsx           Formal Privacy Policy (draft until counsel review)
    terms/page.tsx                    Formal Terms of Service (draft until counsel review)
  updates/[target]/[version]/route.ts Tauri auto-updater manifest endpoint
  sitemap.ts, robots.ts               SEO files
  opengraph-image.tsx                 Dynamic 1200×630 OG image (next/og)
  not-found.tsx                       Branded 404
components/
  page-shell.tsx                      Header + <main id="main"> + footer wrapper
  site-header.tsx, site-footer.tsx    Navigation
  brand-mark.tsx                      Logo with SVG-or-CP-tile fallback
  cards.tsx                           SectionIntro, FeatureCard, PricingCard, FAQItem, BankBadge, TrustBadge, ProductImagePlaceholder
  legal-doc.tsx                       Shared layout for legal pages
  site-content.tsx                    All copy (nav, pillars, features, banks, pricing plans, FAQs)
  icons.tsx                           Inline SVG icons
public/
  brand/centproof-logo.svg            Brand logo (auto-detected by BrandMark)
  images/product/*.png                Product screenshots (placeholders shown if missing)
```

## Environment variables

See `.env.example`. The site degrades gracefully when these are unset:

| Variable | Effect when unset |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Defaults to `https://centproof.com` |
| `NEXT_PUBLIC_LEMONSQUEEZY_LIFETIME_URL` | Pricing CTA falls back to `/support` |
| `NEXT_PUBLIC_LEMONSQUEEZY_MONTHLY_URL` | Pricing CTA falls back to `/support` |
| `NEXT_PUBLIC_LEMONSQUEEZY_LAUNCH_COUPON` | "Launch lifetime" note hides; lifetime URL has no coupon param |
| `NEXT_PUBLIC_DOWNLOAD_URL` | `/download` shows a disabled "Download coming soon" button |
| `NEXT_PUBLIC_DOWNLOAD_VERSION_LABEL` | Version line below the button hides |
| `NEXT_PUBLIC_LATEST_MANIFEST_URL` | `/updates/...` route returns 204 (no update) |

## Adding product screenshots

Drop PNGs into `public/images/product/` using the paths referenced in
`components/site-content.tsx` (e.g. `hero-app.png`, `statements.png`,
`ask-centproof.png`, `reports.png`, `license-screen.png`). Once the file
exists, `ProductImagePlaceholder` renders the real image instead of the
dashed placeholder. No code change needed.

## Editing copy

Almost every word users see lives in `components/site-content.tsx`:
nav labels, pillar headings, workflow steps, feature cards, supported
banks, coming-soon banks, pricing plans, pricing FAQs, general FAQs,
privacy-model bullets, hero trust pills. Edit there — pages re-render
from the same source of truth.

## Deploy

The site is pure server-side rendered Next.js. Recommended hosts:

- **Cloudflare Pages** with the `@cloudflare/next-on-pages` adapter — same
  account as the `webhook/` Worker, single dashboard.
- **Vercel** — zero-config Next.js, free tier covers v1 traffic.

Either way, set the env vars listed above in the dashboard. Push to
`main` triggers a deploy.

## Related repos / docs

- Desktop app + sidecar live in `pdfApplication/` (this is the marketing
  site only).
- LemonSqueezy webhook + license key issuance: `pdfApplication/webhook/`.
- Master marketing copy: `pdfApplication/marketing/centproof-product-overview.md`.
- Pricing source of truth: `pdfApplication/marketing/pricing-strategy.md`.

## License

Source code in this repository is © Java Mantra Corp. CentProof™ is a
trademark of Java Mantra Corp. All rights reserved.
