import type { Metadata } from "next";
import { ProductImagePlaceholder, SectionIntro } from "@/components/cards";
import { PageShell } from "@/components/page-shell";
import { PodcastEmbed } from "@/components/podcast-embed";
import { productSections } from "@/components/site-content";

// Podcast metadata — populated when NEXT_PUBLIC_PODCAST_SPOTIFY_URL
// is set on Vercel.  The env var accepts either a show URL
// (https://open.spotify.com/show/<id>) or an episode URL
// (https://open.spotify.com/episode/<id>) — paste whichever URL
// Spotify gives you on the Share menu.  Until then PodcastEmbed
// renders nothing and the "Go deeper" section just shows the PDF
// download card.
const PODCAST_SPOTIFY_URL = (
  process.env.NEXT_PUBLIC_PODCAST_SPOTIFY_URL ?? ""
).trim();
const PODCAST_TITLE =
  (process.env.NEXT_PUBLIC_PODCAST_TITLE ?? "").trim() ||
  "Why we built CentProof";
const PODCAST_DURATION =
  (process.env.NEXT_PUBLIC_PODCAST_DURATION ?? "").trim() || undefined;

export const metadata: Metadata = {
  title: "Product tour",
  description:
    "Statement import, reconciliation, transactions view, smart tagging, Ask CentProof, recurring detection, cleanup inbox, cash-flow, anomaly detection, what-changed, price watch, reports, and local backup.",
  alternates: { canonical: "/product" },
  openGraph: {
    title: "CentProof product tour",
    description:
      "A Mac-native workspace for statement-backed finance. Every feature starts with local PDF statements.",
    url: "/product",
    type: "website",
  },
};

export default function ProductPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-[#0F766E]">Product tour</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight text-[#0F172A] sm:text-6xl">
            A Mac-native workspace for statement-backed finance.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#475569]">
            CentProof imports bank and credit-card PDF statements, reconciles
            the math, organizes financial history, and answers questions with
            source rows you can inspect.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionIntro
            eyebrow="Tour"
            title="Every feature starts with local statements."
            body="Import statements, reconcile to the cent, search and ask questions, all locally on your Mac."
          />
          <div className="mt-12 space-y-16">
            {productSections.map((section, index) => (
              <article
                key={section.title}
                className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <p className="text-sm font-semibold text-[#0F766E]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0F172A]">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-[#475569]">
                    {section.body}
                  </p>
                </div>
                <ProductImagePlaceholder
                  title={section.imageTitle}
                  dimensions="1600×1000"
                  description={`${section.title} on CentProof for Mac.`}
                  imagePath={section.imagePath}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* "Go deeper" — the natural closer for visitors who scrolled
          through the entire product tour and want longer-form content.
          The grid is responsive so the layout stays balanced whether
          PodcastEmbed renders (env var set) or returns null (default
          state, only PDF card visible). */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <SectionIntro
          eyebrow="Go deeper"
          title="Hear the story. Read the brief."
          body="Two longer-form ways to evaluate CentProof — a founder podcast covering why we built it and what's deliberately not in it, plus a 13-page product brief in PDF so you can read offline or send it around."
        />
        <div
          className={`mt-10 grid gap-6 ${
            PODCAST_SPOTIFY_URL ? "lg:grid-cols-2" : ""
          }`}
        >
          <PodcastEmbed
            spotifyUrl={PODCAST_SPOTIFY_URL}
            title={PODCAST_TITLE}
            duration={PODCAST_DURATION}
          />
          {/* PDF download card.  No email gate — gating a privacy-
              product's collateral behind an email form contradicts the
              brand.  We can add an optional newsletter signup later
              when there's actual list-management infrastructure for it. */}
          <a
            href="/CentProof_Private_Finance.pdf"
            download
            className="group flex items-start gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition hover:border-[#0F766E] hover:shadow-md"
          >
            <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#CCFBF1] text-[#0F766E] transition group-hover:bg-[#5EEAD4]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6"
                aria-hidden="true"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <polyline points="9 15 12 18 15 15" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#0F766E]">
                Read the product brief
              </p>
              <h3 className="mt-1 text-lg font-semibold text-[#0F172A] group-hover:text-[#0F766E]">
                CentProof — Private Finance
              </h3>
              <p className="mt-1 text-sm text-[#475569]">
                13 pages · PDF · 6.5 MB
              </p>
              <p className="mt-3 text-sm leading-6 text-[#475569]">
                The full positioning, architecture, and feature deep-dive
                in one downloadable document. Useful for sharing internally
                or reading away from the browser.
              </p>
            </div>
          </a>
        </div>
      </section>
    </PageShell>
  );
}
