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
    { path: "/product", priority: 0.85, changeFrequency: "monthly" },
    { path: "/banks", priority: 0.7, changeFrequency: "weekly" },
    { path: "/privacy", priority: 0.6, changeFrequency: "monthly" },
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
