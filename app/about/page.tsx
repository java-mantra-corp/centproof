import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { PodcastEmbed } from "@/components/podcast-embed";

// Reuse the same env vars as /product so a single value flip on Vercel
// updates both surfaces.  See app/product/page.tsx for the docstring on
// what these accept.
const PODCAST_SPOTIFY_URL = (
  process.env.NEXT_PUBLIC_PODCAST_SPOTIFY_URL ?? ""
).trim();
const PODCAST_TITLE =
  (process.env.NEXT_PUBLIC_PODCAST_TITLE ?? "").trim() ||
  "Why we built CentProof";
const PODCAST_DURATION =
  (process.env.NEXT_PUBLIC_PODCAST_DURATION ?? "").trim() || undefined;

export const metadata: Metadata = {
  title: "About CentProof",
  description:
    "Why we built CentProof: a local-first Mac app for bank PDF statements. Made by Java Mantra Corp. Listen to the founder podcast, read the principles we operate by, and see what's on the roadmap.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About CentProof",
    description:
      "Why we built CentProof and the principles we operate by.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <PageShell>
      {/* Hero -------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-16 sm:px-8 lg:pt-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-[#0F766E]">About</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight text-[#0F172A] sm:text-6xl">
            We built CentProof because we got tired of handing apps our
            bank password.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#475569]">
            CentProof is a Mac app made by Java Mantra Corp, a small
            independent software studio in California. We make tools we
            wanted to use ourselves — and put them in front of other
            people only after we&apos;ve been using them for months.
          </p>
        </div>
      </section>

      {/* Podcast hero card --------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <div className="rounded-3xl border border-[#E2E8F0] bg-gradient-to-br from-[#F8FAFC] to-white p-6 sm:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#0F766E]">
              Hear it directly
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0F172A] sm:text-4xl">
              The founder podcast.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#475569]">
              A ~30 minute conversation about why CentProof exists,
              what we deliberately left out (no bank login, no cloud
              sync, no recurring subscription required), and the
              engineering bet underneath it all — that a serious
              finance tool can live entirely on your own Mac, including
              the AI.
            </p>
          </div>
          <div className="mt-6">
            {PODCAST_SPOTIFY_URL ? (
              <PodcastEmbed
                spotifyUrl={PODCAST_SPOTIFY_URL}
                title={PODCAST_TITLE}
                duration={PODCAST_DURATION}
              />
            ) : (
              // Empty-state card — keeps the section from collapsing
              // visually before the env var is set on Vercel.  Disappears
              // automatically when PodcastEmbed has something to render.
              <div className="rounded-2xl border border-dashed border-[#CBD5E1] bg-white p-6 text-sm text-[#64748B]">
                Podcast episode publishing soon. In the meantime, the{" "}
                <Link
                  href="/CentProof_Private_Finance.pdf"
                  className="font-semibold text-[#0F766E] underline"
                >
                  product brief PDF
                </Link>{" "}
                covers the same ground in writing.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why this exists ----------------------------------------------- */}
      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold text-[#0F766E]">
                Why this exists
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0F172A] sm:text-4xl">
                The thing we wanted to use.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-7 text-[#334155]">
              <p>
                We&apos;d been through three or four mainstream
                personal-finance apps over a decade. Each one asked for
                a bank password. Each one stored years of transaction
                history on someone else&apos;s servers. Each one
                eventually got bought, pivoted, raised prices, or
                quietly added a data-sharing partner we&apos;d never
                heard of.
              </p>
              <p>
                The strange part: the source-of-truth document already
                existed and we already had it. Our banks emailed a PDF
                every month. The PDFs reconciled to the cent. They
                were structured. They were OUR copies — already on our
                Macs.
              </p>
              <p>
                CentProof is the app we wished existed: drop in the
                PDFs, reconcile to the cent, search across years,
                answer questions with a local AI, export anything in
                standard formats. No bank password. No cloud sync.
                Pay once or subscribe — your call. Your data is yours
                whether you&apos;re a customer or not.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles ----------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-[#0F766E]">
            Principles
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0F172A] sm:text-4xl">
            How we make decisions.
          </h2>
          <p className="mt-5 text-base leading-7 text-[#475569]">
            When a product question is hard, these are the principles
            that decide it. They explain why CentProof has a Free Test
            Mode you can use forever, why we&apos;re not on the App
            Store, and why the AI runs on your Mac instead of in a
            data center.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {principles.map((p) => (
            <article
              key={p.title}
              className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-semibold text-[#0F766E]">
                {p.number}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-[#0F172A]">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#475569]">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Where things stand --------------------------------------------- */}
      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold text-[#0F766E]">
                Today
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0F172A] sm:text-4xl">
                Where things stand.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-7 text-[#334155]">
              <p>
                CentProof is shipping public releases. Build numbers,
                what changed, and the full release history live on the{" "}
                <Link
                  href="/changelog"
                  className="font-semibold text-[#0F766E] hover:underline"
                >
                  changelog page
                </Link>
                . We update parser support and bug fixes regularly;
                anything material lands as a signed and notarized
                public release through the in-app updater.
              </p>
              <p>
                Bank coverage: nine major US banks today
                (Bank of America, Chase, Citi, Capital One, Apple Card,
                American Express, Discover, US Bank, Wells Fargo). More
                banks ship when{" "}
                <Link
                  href="/banks"
                  className="font-semibold text-[#0F766E] hover:underline"
                >
                  redacted sample statements
                </Link>{" "}
                arrive in our inbox — a credit union with two reliable
                samples gets ahead of a megabank with none.
              </p>
              <p>
                What&apos;s next on the roadmap (in rough order):
                receipt attachments, tax-period exports, broader bank
                coverage, and eventually a Windows build. We share
                progress on the changelog when work is far enough
                along to land in the next release.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA ----------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="rounded-3xl bg-[#0F172A] p-8 text-white sm:p-12">
          <div className="grid gap-6 sm:grid-cols-[1.4fr_0.6fr] sm:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Try CentProof with your own PDFs.
              </h2>
              <p className="mt-3 text-base leading-7 text-[#CBD5E1]">
                Free Test Mode runs forever. No signup, no bank
                password, no cloud account. If it&apos;s the right
                tool for you, Pro Lifetime is a $49 one-time purchase.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:items-end">
              <Link
                href="/download"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-5 text-sm font-semibold text-[#0F172A] shadow-sm transition hover:bg-[#F0FDFA]"
              >
                Download for Mac
              </Link>
              <Link
                href="/pricing"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/20 bg-transparent px-5 text-sm font-semibold text-white transition hover:border-white/40"
              >
                View pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

/**
 * The four principles surfaced on /about.  Order matters — they're
 * roughly stacked from product-philosophy at the top to
 * business-philosophy at the bottom.
 *
 * Editing rule: any change here should also be reflected in product
 * decisions.  These aren't marketing copy — they're the lens we use
 * for design reviews ("does this proposal honor #2?").
 */
const principles = [
  {
    number: "01",
    title: "Local-first is non-negotiable.",
    body: "Your financial history belongs on your Mac. Any feature that requires sending statement data to a server is a feature we won't ship.",
  },
  {
    number: "02",
    title: "Verifiable beats automatic.",
    body: "If CentProof says you spent $130 on groceries, you can click through to the exact receipts — every aggregate is backed by source rows. We'd rather be slow to add a feature than ship one whose math you can't audit.",
  },
  {
    number: "03",
    title: "Pay once should still be possible.",
    body: "Most modern software is subscription by default. We offer one because some people want it, but Pro Lifetime exists because owning your tools is a reasonable thing to want. Your data is yours either way.",
  },
  {
    number: "04",
    title: "Walk-away rights are real, not theoretical.",
    body: "Standard exports for every plan. Your data lives in a local SQLite database you can open with anything. If CentProof disappears tomorrow, your years of categorization work don't.",
  },
];
