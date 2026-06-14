import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://centproof.com";

/**
 * The website is content-stable: most pages change rarely.  We weight
 * routes that drive purchases (home, pricing, download) higher and mark
 * the legal pages as the only ones that should refresh frequently when
 * we update them during launch.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.95, changeFrequency: "monthly" },
    { path: "/download", priority: 0.9, changeFrequency: "weekly" },
    // Business-edition landing page (v0.2.0) — high priority because it
    // targets the bookkeeper/accountant buyer and is a primary purchase
    // entry point, on par with /product.
    { path: "/business", priority: 0.85, changeFrequency: "monthly" },
    { path: "/product", priority: 0.85, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/changelog", priority: 0.75, changeFrequency: "weekly" },
    { path: "/banks", priority: 0.7, changeFrequency: "weekly" },
    // Docs section — how-to-use-the-app content (v0.1.7).  Higher
    // priority than /guides because it's primary product reference.
    { path: "/docs", priority: 0.8, changeFrequency: "monthly" },
    { path: "/docs/quick-start", priority: 0.75, changeFrequency: "monthly" },
    { path: "/docs/importing-statements", priority: 0.75, changeFrequency: "monthly" },
    { path: "/docs/reviewing-reconciling", priority: 0.75, changeFrequency: "monthly" },
    { path: "/docs/tagging-entities-categories", priority: 0.75, changeFrequency: "monthly" },
    { path: "/docs/ask-centproof", priority: 0.75, changeFrequency: "monthly" },
    { path: "/docs/reports-and-exports", priority: 0.75, changeFrequency: "monthly" },
    { path: "/docs/backup-and-recovery", priority: 0.75, changeFrequency: "monthly" },
    { path: "/guides", priority: 0.65, changeFrequency: "monthly" },
    {
      // New guides go at this same priority — long-form content earns
      // its position over time via inbound links, not by sitemap weight.
      path: "/guides/tracking-freelancer-expenses-on-a-mac",
      priority: 0.65,
      changeFrequency: "monthly",
    },
    {
      path: "/guides/pdf-statement-formats-by-bank",
      priority: 0.65,
      changeFrequency: "monthly",
    },
    {
      path: "/guides/how-to-reconcile-a-bank-statement",
      priority: 0.65,
      changeFrequency: "monthly",
    },
    {
      path: "/guides/five-questions-bank-password-app",
      priority: 0.65,
      changeFrequency: "monthly",
    },
    {
      path: "/guides/anatomy-of-a-bank-pdf-statement",
      priority: 0.65,
      changeFrequency: "monthly",
    },
    { path: "/privacy", priority: 0.6, changeFrequency: "monthly" },
    { path: "/security", priority: 0.6, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
    { path: "/support", priority: 0.5, changeFrequency: "monthly" },
    { path: "/legal/privacy-policy", priority: 0.4, changeFrequency: "monthly" },
    { path: "/legal/terms", priority: 0.4, changeFrequency: "monthly" },
    { path: "/legal/refund-policy", priority: 0.35, changeFrequency: "monthly" },
    { path: "/legal/cookie-policy", priority: 0.3, changeFrequency: "monthly" },
    { path: "/legal/disclaimer", priority: 0.3, changeFrequency: "monthly" },
    { path: "/legal/data-request", priority: 0.3, changeFrequency: "monthly" },
  ];
  return entries.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
