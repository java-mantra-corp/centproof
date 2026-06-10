import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "How to use CentProof — step-by-step guides for importing statements, reconciling, tagging transactions, asking questions, running reports, exporting, and backing up your data.",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "CentProof docs",
    description:
      "Step-by-step guides for every feature in CentProof — from your first import to backups.",
    url: "/docs",
    type: "website",
  },
};

/**
 * Docs index.  Each entry is a separate Next.js route under
 * /app/docs/<slug>/page.tsx.  When a new doc page ships, add it
 * here, ship the route, and add the slug to sitemap.ts.
 *
 * Why docs is separate from /guides:
 *   - /guides is for long-form educational content about BANKING
 *     concepts (reconciliation, PDF formats, freelancer workflow,
 *     password-app evaluation) — useful regardless of whether the
 *     reader uses CentProof.
 *   - /docs is for how-to-use-CentProof content — feature reference
 *     keyed to actual UI screens and workflows.
 */
const docs = [
  {
    slug: "quick-start",
    title: "Quick start",
    description:
      "From install to your first reconciled statement in five minutes. The path every CentProof user takes on day one.",
    readTime: "5 min read",
  },
  {
    slug: "importing-statements",
    title: "Importing statements",
    description:
      "How CentProof handles bank and credit-card PDFs, multi-account combined statements, and what to do when your bank isn't supported yet.",
    readTime: "7 min read",
  },
  {
    slug: "reviewing-reconciling",
    title: "Reviewing and reconciling",
    description:
      "What the Review screen is showing you, what reconciliation means in plain English, and how to handle a statement that won't balance.",
    readTime: "6 min read",
  },
  {
    slug: "tagging-entities-categories",
    title: "Tagging entities and categories",
    description:
      "The difference between Entity and Category, how to tag once and have it apply forever, and the workflows that save the most time.",
    readTime: "8 min read",
  },
  {
    slug: "ask-centproof",
    title: "Ask CentProof",
    description:
      "Plain-English questions about your money, answered by a 3-billion-parameter AI running entirely on your Mac. What it can do, what data it sees, and the questions that work best.",
    readTime: "5 min read",
  },
  {
    slug: "reports-and-exports",
    title: "Reports and exports",
    description:
      "Saved reports, trip reports, settlement reports, and which export format (CSV, PDF) to use for which downstream tool.",
    readTime: "5 min read",
  },
  {
    slug: "backup-and-recovery",
    title: "Backup and recovery",
    description:
      "Where your data lives, what's encrypted, how Time Machine works with CentProof, and what happens if you lose the Keychain key.",
    readTime: "4 min read",
  },
] as const;

export default function DocsIndexPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-[#0F766E]">Docs</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight text-[#0F172A] sm:text-6xl">
            How to use CentProof.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#475569]">
            Step-by-step guides for every screen and feature, written
            assuming you know nothing about CentProof and would like
            to fix that in the next twenty minutes. Start with{" "}
            <Link
              href="/docs/quick-start"
              className="font-semibold text-[#0F766E] hover:underline"
            >
              Quick start
            </Link>{" "}
            if you&apos;ve just installed; jump to any feature page if
            you&apos;re already up and running.
          </p>
        </div>

        <div className="mt-12 grid gap-4">
          {docs.map((d) => (
            <Link
              key={d.slug}
              href={`/docs/${d.slug}`}
              className="group rounded-2xl border border-[#E2E8F0] bg-white p-6 transition hover:border-[#0F766E] sm:p-7"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] group-hover:text-[#0F766E]">
                  {d.title}
                </h2>
                <span className="text-xs font-medium text-[#64748B]">
                  {d.readTime}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#475569]">
                {d.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 text-sm leading-6 text-[#475569] sm:p-8">
          <p className="font-semibold text-[#0F172A]">
            Looking for something else?
          </p>
          <ul className="mt-3 space-y-1.5">
            <li>
              <Link
                href="/guides"
                className="font-semibold text-[#0F766E] hover:underline"
              >
                Guides
              </Link>{" "}
              — long-form explainers about banking concepts (useful
              regardless of whether you use CentProof).
            </li>
            <li>
              <Link
                href="/faq"
                className="font-semibold text-[#0F766E] hover:underline"
              >
                FAQ
              </Link>{" "}
              — pricing, licensing, and common pre-purchase questions.
            </li>
            <li>
              <Link
                href="/support"
                className="font-semibold text-[#0F766E] hover:underline"
              >
                Support
              </Link>{" "}
              — email Java Mantra Corp directly for bugs, license help,
              or bank-parser requests.
            </li>
            <li>
              <Link
                href="/changelog"
                className="font-semibold text-[#0F766E] hover:underline"
              >
                Changelog
              </Link>{" "}
              — release notes for every CentProof version.
            </li>
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
