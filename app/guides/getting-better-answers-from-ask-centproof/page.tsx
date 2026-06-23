import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Getting better answers from Ask CentProof",
  description:
    "Three new opt-in upgrades to CentProof's local AI search — smart merchant matching, conversational follow-ups, and multi-step comparisons — plus the pop-up that shows the exact transactions behind any answer, each linked to its source PDF page. Practical examples and how to turn it on.",
  alternates: {
    canonical: "/guides/getting-better-answers-from-ask-centproof",
  },
  openGraph: {
    title: "Getting better answers from Ask CentProof",
    description:
      "Match merchants by how you remember them, ask follow-ups, compare two things in one question — and see the exact receipts behind every number, all on your Mac.",
    url: "/guides/getting-better-answers-from-ask-centproof",
    type: "article",
  },
};

export default function GuideBetterAnswers() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        {/* Crumb -------------------------------------------------------- */}
        <nav className="text-xs text-[#64748B]">
          <Link href="/guides" className="hover:text-[#0F766E]">
            Guides
          </Link>{" "}
          <span aria-hidden>›</span>{" "}
          <span>Getting better answers from Ask CentProof</span>
        </nav>

        {/* Header ------------------------------------------------------- */}
        <header className="mt-6">
          <h1 className="text-4xl font-semibold tracking-tight text-[#0F172A] sm:text-5xl">
            Getting better answers from Ask CentProof.
          </h1>
          <p className="mt-4 text-sm text-[#64748B]">
            ~6 min read · New in CentProof 0.2.1
          </p>
        </header>

        {/* TL;DR -------------------------------------------------------- */}
        <aside className="mt-8 rounded-2xl border border-[#0F766E]/30 bg-[#ECFDF5] p-5 text-sm leading-6 text-[#0F172A]">
          <strong className="font-semibold">TL;DR.</strong> CentProof
          0.2.1 adds three opt-in upgrades to Ask CentProof: match
          merchants by how you remember them, ask follow-up questions
          that build on the last one, and compare two things in a single
          question. A new <em>View transactions</em> pop-up shows the
          exact rows behind any answer, each linked to its source PDF
          page. Everything still runs on your Mac, and every number still
          comes straight from your data.
        </aside>

        <div className="prose-like mt-12 space-y-7 text-base leading-7 text-[#334155]">
          <p>
            Ask CentProof turns a plain-English question into a safe,
            read-only query against your local database and shows you the
            answer with the receipts underneath. The 0.2.1 release makes
            it noticeably better at three things people actually ask for.
            They&apos;re in beta, so they&apos;re off until you switch
            them on.
          </p>

          {/* Turn it on -------------------------------------------------- */}
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            First, turn it on
          </h2>
          <p>
            Open Preferences (
            <code className="rounded bg-[#F1F5F9] px-1.5 py-0.5 text-[0.92em]">
              ⌘ ,
            </code>
            ) → <strong>AI</strong> → the{" "}
            <strong>&quot;AI Search (beta)&quot;</strong> section, and
            flip on whichever of the three you want:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Smart merchant &amp; category matching</li>
            <li>Conversational follow-ups</li>
            <li>Multi-step questions</li>
          </ul>
          <p>
            With them off, Ask CentProof behaves exactly as it did
            before. Nothing else changes, and nothing leaves your Mac
            either way.
          </p>

          {/* Smart matching --------------------------------------------- */}
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Say it how you remember it
          </h2>
          <p>
            You don&apos;t always remember exactly how a merchant shows
            up on a statement. With{" "}
            <strong>smart merchant &amp; category matching</strong> on,
            CentProof matches your phrasing to a real name in your data
            using on-device similarity:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <em>&quot;spending at the warehouse club this year&quot;</em>{" "}
              → matched to <strong>Costco</strong>
            </li>
            <li>
              <em>&quot;how much on the streaming service?&quot;</em> →
              matched to <strong>Netflix</strong>
            </li>
            <li>
              <em>&quot;rideshare last month&quot;</em> → matched to your
              tagged <strong>Uber</strong> / <strong>Lyft</strong>
            </li>
          </ul>
          <p>
            CentProof tells you what it matched (&quot;warehouse club →
            Costco&quot;) so you can trust it — and the dollar figures
            stay exact. Only the <em>matching</em> gets more forgiving;
            the math doesn&apos;t change. This works best when the
            merchant or category already exists in your tagged data.
          </p>

          {/* Follow-ups ------------------------------------------------- */}
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Refine instead of re-typing
          </h2>
          <p>
            Real questions come in layers. With{" "}
            <strong>conversational follow-ups</strong> on, your next
            question builds on the last one instead of starting over:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <em>&quot;top 5 merchants this year&quot;</em>
            </li>
            <li>
              → <em>&quot;just the Apple Card&quot;</em>
            </li>
            <li>
              → <em>&quot;only over $100&quot;</em>
            </li>
          </ul>
          <p>
            A small <em>&quot;Next question refines …&quot;</em> note
            shows what you&apos;re building on, and{" "}
            <strong>New question</strong> clears it whenever you want a
            fresh start.
          </p>

          {/* Multi-step ------------------------------------------------- */}
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Compare two things in one question
          </h2>
          <p>
            This is the big one. Some questions are really two questions
            stitched together — and they used to need two separate
            searches. With <strong>multi-step questions</strong> on,
            CentProof recognizes a comparison, runs each part as its own
            query, and lays the results side by side:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <em>&quot;compare Costco vs Whole Foods this year&quot;</em>
            </li>
            <li>
              <em>
                &quot;did I spend more on groceries this month or last
                month?&quot;
              </em>
            </li>
            <li>
              <em>&quot;dining vs entertainment in 2025&quot;</em>
            </li>
          </ul>
          <p>
            You get a one-line summary at the top (for two-number
            comparisons, it even computes the difference) and a card per
            part underneath, each with its own count and a button to see
            the transactions behind it. Every figure is computed locally
            from your data — the AI decides <em>which</em> queries to
            run, never the numbers themselves.
          </p>

          {/* Receipts pop-up -------------------------------------------- */}
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            See the exact receipts behind any number
          </h2>
          <p>
            Every answer already shows its source rows, but the new{" "}
            <strong>View transactions</strong> button opens them in a
            focused pop-up — including for grouped answers like &quot;top
            5 merchants&quot; and for each part of a comparison. The
            pop-up shows precisely the transactions that produced the
            number (not a loose re-search), and every row links straight
            to its{" "}
            <strong>original PDF page, with the line highlighted</strong>.
          </p>
          <p>
            So when an answer looks surprising, you&apos;re one click from
            the receipt — the same &quot;trace any number to its
            source&quot; principle that runs through the rest of
            CentProof.
          </p>

          {/* What doesn't change ---------------------------------------- */}
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            What doesn&apos;t change
          </h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>It&apos;s still local.</strong> The model and the
              matching both run on your Mac. Nothing about your
              transactions leaves the machine.
            </li>
            <li>
              <strong>The numbers are still exact.</strong> The AI plans
              and explains; the figures always come from a read-only
              query against your own data.
            </li>
            <li>
              <strong>It&apos;s opt-in.</strong> Off by default, on when
              you say so, and reversible any time in Preferences → AI.
            </li>
          </ul>
          <p>
            One honest note: these features lean on the data you&apos;ve
            already tagged. The more you&apos;ve named your merchants and
            categories, the better the matching and comparisons get.
          </p>

          {/* CTA --------------------------------------------------------- */}
          <div className="mt-12 flex flex-wrap gap-3 rounded-2xl border border-[#0F766E]/30 bg-[#ECFDF5] p-6">
            <div className="flex-1 min-w-[240px]">
              <p className="text-sm font-semibold text-[#0F172A]">
                The full reference
              </p>
              <p className="mt-1 text-sm leading-6 text-[#475569]">
                What the local AI sees, what it doesn&apos;t, how to
                disable it, and the privacy details — in the Ask CentProof
                doc.
              </p>
            </div>
            <Link
              href="/docs/ask-centproof"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0F766E] px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#115E59]"
            >
              Read the Ask CentProof doc →
            </Link>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
