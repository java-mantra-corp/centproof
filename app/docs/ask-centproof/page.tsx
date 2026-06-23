import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Ask CentProof (local AI)",
  description:
    "How to ask plain-English questions about your money via the local AI in CentProof. What data the AI sees (only your local DB), what data it doesn't (nothing leaves your Mac), example queries that work well, and how to disable it.",
  alternates: { canonical: "/docs/ask-centproof" },
  openGraph: {
    title: "CentProof — Ask CentProof",
    description:
      "Plain-English questions about your transactions, answered by a local 3-billion-parameter AI running on your Mac.",
    url: "/docs/ask-centproof",
    type: "article",
  },
};

export default function DocAsk() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        <nav className="text-xs text-[#64748B]">
          <Link href="/docs" className="hover:text-[#0F766E]">
            Docs
          </Link>{" "}
          <span aria-hidden>›</span>{" "}
          <span>Ask CentProof</span>
        </nav>

        <header className="mt-6">
          <h1 className="text-4xl font-semibold tracking-tight text-[#0F172A] sm:text-5xl">
            Ask CentProof.
          </h1>
          <p className="mt-4 text-sm text-[#64748B]">
            ~5 min read · The local-AI feature, explained
          </p>
        </header>

        <aside className="mt-8 rounded-2xl border border-[#0F766E]/30 bg-[#ECFDF5] p-5 text-sm leading-6 text-[#0F172A]">
          <strong className="font-semibold">TL;DR.</strong> Ask
          CentProof in plain English — &quot;How much did I spend on
          groceries last quarter?&quot; — and a local 3-billion-
          parameter AI translates your question into a safe local
          database query, runs it, and shows the answer with the
          source rows underneath. No cloud calls, no OpenAI, no
          Anthropic, no third party. The model runs in a sandboxed
          process on your Mac.
        </aside>

        <div className="prose-like mt-12 space-y-7 text-base leading-7 text-[#334155]">
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            What &quot;local&quot; actually means
          </h2>
          <p>
            When you click Ask CentProof and type a question, here is
            EXACTLY what happens:
          </p>
          <ol className="list-decimal space-y-2 pl-6">
            <li>
              The question goes to a local{" "}
              <code className="rounded bg-[#F1F5F9] px-1.5 py-0.5 text-[0.92em]">llama-server</code>{" "}
              process running on{" "}
              <code className="rounded bg-[#F1F5F9] px-1.5 py-0.5 text-[0.92em]">127.0.0.1</code>{" "}
              (your loopback interface — packets never leave your
              Mac).
            </li>
            <li>
              The server runs Qwen 2.5 3B Instruct, a 3-billion-
              parameter open-source language model. The model file is
              ~1.9 GB and lives in your CentProof app data directory.
            </li>
            <li>
              The model translates your question into a structured
              query (date range, category filter, entity filter, etc.)
              against your local SQLite database.
            </li>
            <li>
              CentProof executes that query — read-only, no writes —
              and returns the matching rows.
            </li>
            <li>
              The model writes a one-paragraph natural-language
              answer summarizing the results.
            </li>
            <li>
              You see the answer at the top of the screen with the
              source rows in a table below.
            </li>
          </ol>
          <p>
            Steps 1-5 all happen on your Mac. Network traffic during
            an Ask CentProof call: zero. You can verify this with
            Little Snitch or by inspecting the process tree.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            What the AI sees vs. what it doesn&apos;t
          </h2>
          <p>
            The model sees the SQL-style query results — the actual
            transaction rows that match your filter. So if you ask
            &quot;how much did I spend at Whole Foods?&quot;, the
            model sees the rows tagged with Whole Foods as their
            entity along with their dates and amounts.
          </p>
          <p>
            The model does NOT see:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              Transactions outside your query&apos;s filter — if
              you&apos;re asking about Q3, the model never sees Q1.
            </li>
            <li>
              Account numbers, holder names, or other PII.
            </li>
            <li>
              Source PDFs themselves.
            </li>
            <li>
              Anything from your other apps, Keychain, browser
              history, etc.
            </li>
          </ul>
          <p>
            The model can&apos;t mutate your data. The query layer
            CentProof passes its output through is read-only. The
            model can&apos;t accidentally delete a transaction or
            change a category by suggesting weird SQL.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Questions that work well
          </h2>
          <p>
            Some examples that translate cleanly to queries:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <em>&quot;How much did I spend on groceries last
              quarter?&quot;</em> — filters by Groceries category,
              quarter, sums.
            </li>
            <li>
              <em>&quot;What did I pay to State Farm in 2025?&quot;</em>{" "}
              — filters by State Farm entity, year, sums.
            </li>
            <li>
              <em>&quot;Show me transactions over $500 last
              month.&quot;</em> — filters by amount + date.
            </li>
            <li>
              <em>&quot;How much did Client Acme cost me this
              year?&quot;</em> — filters by client entity, year,
              sums (assumes you tagged client-related expenses).
            </li>
            <li>
              <em>&quot;What was my biggest expense in November?&quot;</em>{" "}
              — filters by month, sorts by amount descending,
              returns top row.
            </li>
            <li>
              <em>&quot;Find the AT&amp;T payment from last
              September.&quot;</em> — filters by entity + month.
            </li>
          </ul>
          <p>
            The model is a 3B parameter model — small by modern
            standards. It works well for queries with a clear filter
            + aggregation. Side-by-side comparisons (e.g.{" "}
            <em>&quot;Costco vs Whole Foods this year&quot;</em>) used
            to be where it struggled — the new multi-step beta below
            now handles those by running each part as its own query.
            For open-ended analysis (&quot;…and tell me why&quot;) the
            answer can still be partial — but you always get the
            source rows underneath and can re-ask more specifically.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Smarter answers — the AI Search beta
          </h2>
          <p>
            CentProof 0.2.1 adds three opt-in upgrades to Ask
            CentProof, all running on your Mac with the same local
            model. Turn them on in Preferences (
            <code className="rounded bg-[#F1F5F9] px-1.5 py-0.5 text-[0.92em]">⌘ ,</code>
            ) → AI → &quot;AI Search (beta)&quot;:
          </p>
          <ul className="list-disc space-y-3 pl-6">
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Smart merchant &amp; category matching.
              </strong>{" "}
              Phrasing like <em>&quot;warehouse club&quot;</em> or{" "}
              <em>&quot;the streaming service&quot;</em> is matched to a
              real name in your data (&quot;Costco&quot;,
              &quot;Netflix&quot;) using on-device similarity — so you
              don&apos;t have to remember exactly how a merchant is
              spelled. CentProof shows you what it matched, and the
              figures stay exact; only the matching gets fuzzier.
            </li>
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Conversational follow-ups.
              </strong>{" "}
              Ask a question, then refine it:{" "}
              <em>&quot;top 5 merchants this year&quot;</em> →{" "}
              <em>&quot;just the Apple Card&quot;</em>. The follow-up
              builds on your previous question instead of starting from
              scratch.
            </li>
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Multi-step questions.
              </strong>{" "}
              Comparisons like{" "}
              <em>&quot;Costco vs Whole Foods this year&quot;</em> or{" "}
              <em>
                &quot;did I spend more on groceries this month or last
                month?&quot;
              </em>{" "}
              are broken into separate queries, each run on your data,
              and the results are combined — with every number still
              computed locally.
            </li>
          </ul>
          <p>
            These are off by default while in beta. With the flags off,
            Ask CentProof behaves exactly as it did before — the model
            still plans and explains, but every number always comes
            from your data, never invented.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Source rows — &quot;show your work&quot;
          </h2>
          <p>
            Every Ask CentProof answer is backed by the actual rows
            from your database that informed it. The rows appear in a
            table directly below the answer text, with date,
            description, entity, category, amount, and source
            statement.
          </p>
          <p>
            This matters because:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              You can verify the answer against your data without
              trusting the model.
            </li>
            <li>
              If the answer feels wrong, you can scan the rows and
              spot why (e.g. &quot;oh, I forgot I have one row
              mis-tagged that&apos;s skewing the total&quot;).
            </li>
            <li>
              Click any row to jump to the original PDF page with
              the transaction line highlighted — full audit trail.
            </li>
          </ul>
          <p>
            A{" "}
            <strong className="font-semibold text-[#0F172A]">
              View transactions
            </strong>{" "}
            button opens the exact rows behind any answer in a pop-up —
            including grouped answers like &quot;top 5 merchants&quot;
            and each step of a multi-step comparison — every row linked
            to its source PDF page, without leaving Ask CentProof.
          </p>
          <p>
            CentProof is built around the principle that any number
            you see should be traceable to its source. Ask CentProof
            answers are no exception.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            AI suggestions during import
          </h2>
          <p>
            Ask CentProof is the same local AI that runs suggestion
            generation in the background after each statement import.
            On commit, CentProof asks the model to propose an entity
            and category for any new transaction that wasn&apos;t
            already auto-tagged by a correction rule or the curated
            merchant dictionary.
          </p>
          <p>
            Suggestions appear as ghost badges (visually distinct
            from confirmed tags). You accept or reject each one as
            you scroll through transactions. Accepting a suggestion
            optionally creates a correction rule for future imports
            via the same dialog flow described in{" "}
            <Link
              href="/docs/tagging-entities-categories"
              className="font-semibold text-[#0F766E] hover:underline"
            >
              Tagging entities and categories
            </Link>
            .
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Free tier limits on Ask CentProof
          </h2>
          <p>
            Free Test Mode caps Ask CentProof at 5 questions lifetime
            and then 1 per day after that — enough to evaluate
            whether the AI is useful for your data before deciding
            to upgrade. Pro Lifetime ($49 one-time) and Pro Monthly
            ($5/mo) both unlock unlimited questions.
          </p>
          <p>
            Because the model runs locally, there&apos;s no
            per-query cost to us — the caps exist only as a
            free-tier limit, not as a backend throttle. After
            upgrading to Pro, you can ask as many questions as you
            want without affecting anyone&apos;s bill.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Disabling AI entirely
          </h2>
          <p>
            If you don&apos;t want any AI involvement — even local —
            you can turn off both the suggestion pass and Ask
            CentProof in Preferences:
          </p>
          <ol className="list-decimal space-y-2 pl-6">
            <li>
              Open Preferences (<code className="rounded bg-[#F1F5F9] px-1.5 py-0.5 text-[0.92em]">⌘ ,</code>) → AI tab.
            </li>
            <li>
              Uncheck &quot;Enable AI suggestions on import&quot; to
              skip the background suggestion pass.
            </li>
            <li>
              Uncheck &quot;Enable Ask CentProof&quot; to hide the
              feature from the sidebar entirely.
            </li>
          </ol>
          <p>
            With both off, no AI ever runs in CentProof. Imports
            still work via the verified parsers, correction rules
            still auto-apply, and the curated merchant dictionary
            still suggests entities/categories on import (the
            dictionary is pure regex, no AI). You just lose the
            long-tail suggestions and natural-language querying.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Optional: pointing at an external LLM endpoint
          </h2>
          <p>
            If you want a smarter model and are willing to send your
            query + the matching transaction rows to an external
            service, Preferences → AI lets you configure a custom
            OpenAI-compatible endpoint. You provide the URL and
            optional API key.
          </p>
          <p>
            Recommended only for advanced users who know what
            they&apos;re trading off. CentProof does NOT default to
            this — the local model is the default. The external
            option exists because some users want it; it&apos;s not
            promoted in the UI as the &quot;better&quot; choice.
          </p>

          <div className="mt-12 flex flex-wrap gap-3 rounded-2xl border border-[#0F766E]/30 bg-[#ECFDF5] p-6">
            <div className="flex-1 min-w-[240px]">
              <p className="text-sm font-semibold text-[#0F172A]">
                Next: turn your data into reports + exports
              </p>
              <p className="mt-1 text-sm leading-6 text-[#475569]">
                Saved reports, settlement reports, and which export
                format works for which downstream tool.
              </p>
            </div>
            <Link
              href="/docs/reports-and-exports"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0F766E] px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#115E59]"
            >
              Reports and exports →
            </Link>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
