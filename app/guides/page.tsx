import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Plain-English explainers about bank PDF statements, local-first finance, macOS app distribution, and how CentProof works under the hood.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "CentProof guides",
    description:
      "How bank statements work, why local-first matters, and how to verify a Mac app before installing.",
    url: "/guides",
    type: "website",
  },
};

/**
 * Guide index.  Each entry is a separate Next.js route under
 * /app/guides/<slug>/page.tsx.  When a new guide ships, add it
 * here, ship the route, and add the slug to sitemap.ts.
 */
const guides = [
  {
    slug: "pdf-statement-formats-by-bank",
    title: "PDF statement formats by bank — why every one looks different",
    description:
      "A field guide to how seven major US banks lay out their monthly PDFs. The historical reasons each one diverged, what's the same underneath, and the parsing quirks each one ships with.",
    readTime: "9 min read",
  },
  {
    slug: "how-to-reconcile-a-bank-statement",
    title: "How to reconcile a bank statement (without spreadsheets)",
    description:
      "What reconciliation actually means, the only formula you need to remember, and three different ways to do it depending on how much typing you want to do.",
    readTime: "8 min read",
  },
  {
    slug: "five-questions-bank-password-app",
    title: "Five questions to ask before you give an app your bank password",
    description:
      "A plain-English checklist for evaluating any personal-finance app that wants to log into your bank. Useful even if you decide to keep using what you have.",
    readTime: "7 min read",
  },
  {
    slug: "anatomy-of-a-bank-pdf-statement",
    title: "What's actually in a bank PDF statement",
    description:
      "Inside the document every bank sends you each month: structure, reconciliation math, and why this format is the basis for CentProof.",
    readTime: "8 min read",
  },
] as const;

export default function GuidesIndexPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-[#0F766E]">Guides</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight text-[#0F172A] sm:text-6xl">
            Plain-English explainers.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#475569]">
            Useful regardless of whether you use CentProof. We write these to
            be the page we wish we'd read first when researching this
            problem — not as marketing dressed up as content.
          </p>
        </div>

        <div className="mt-12 grid gap-4">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="group rounded-2xl border border-[#E2E8F0] bg-white p-6 transition hover:border-[#0F766E] sm:p-7"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] group-hover:text-[#0F766E]">
                  {g.title}
                </h2>
                <span className="text-xs text-[#64748B]">{g.readTime}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#475569]">
                {g.description}
              </p>
              <p className="mt-4 text-sm font-semibold text-[#0F766E]">
                Read the guide →
              </p>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
