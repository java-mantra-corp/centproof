import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Tagging entities and categories",
  description:
    "The difference between Entity (who) and Category (what), how to tag once and have it apply forever, the combined entity+category workflow in v0.1.7, renaming entities and categories, and the workflows that save the most time.",
  alternates: { canonical: "/docs/tagging-entities-categories" },
  openGraph: {
    title: "CentProof — Tagging entities and categories",
    description:
      "The two-axis tagging system, correction rules, and the workflows that scale.",
    url: "/docs/tagging-entities-categories",
    type: "article",
  },
};

export default function DocTagging() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        <nav className="text-xs text-[#64748B]">
          <Link href="/docs" className="hover:text-[#0F766E]">
            Docs
          </Link>{" "}
          <span aria-hidden>›</span>{" "}
          <span>Tagging entities and categories</span>
        </nav>

        <header className="mt-6">
          <h1 className="text-4xl font-semibold tracking-tight text-[#0F172A] sm:text-5xl">
            Tagging entities and categories.
          </h1>
          <p className="mt-4 text-sm text-[#64748B]">
            ~8 min read · The most important workflow in the app
          </p>
        </header>

        <aside className="mt-8 rounded-2xl border border-[#0F766E]/30 bg-[#ECFDF5] p-5 text-sm leading-6 text-[#0F172A]">
          <strong className="font-semibold">TL;DR.</strong> An{" "}
          <strong>Entity</strong> is WHO the transaction was with
          (Amazon, your landlord, a client). A{" "}
          <strong>Category</strong> is WHAT kind of expense it was
          (Software, Rent, Travel). Tag a transaction once with both
          and check &quot;Apply to all matching descriptions&quot; —
          CentProof creates a rule that auto-tags every existing AND
          every future matching row. As of v0.1.7, you can set both
          in a single dialog without opening two separate ones.
        </aside>

        <div className="prose-like mt-12 space-y-7 text-base leading-7 text-[#334155]">
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Entity vs. Category — the mental model
          </h2>
          <p>
            CentProof tags every transaction along two independent
            axes:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Entity = WHO.</strong> The merchant, person, or
              business on the other end of the transaction. Examples:
              &quot;Amazon&quot;, &quot;Starbucks&quot;, &quot;State
              Farm&quot;, &quot;Client Acme&quot;, &quot;Mom&quot;.
              Entities are nouns.
            </li>
            <li>
              <strong>Category = WHAT.</strong> The kind of expense
              it was. Examples: &quot;Software&quot;, &quot;Coffee&quot;,
              &quot;Insurance&quot;, &quot;Travel&quot;,
              &quot;Groceries&quot;. Categories are buckets — typically
              aligned with the tax-form lines that matter to you (e.g.
              Schedule C for 1099 freelancers).
            </li>
          </ul>
          <p>
            The two are independent because one entity can have
            transactions in multiple categories. Amazon transactions
            could be Software (AWS bill), Office Supplies (printer ink),
            or Groceries (Whole Foods). Categorizing only by entity
            (e.g. just &quot;Amazon&quot;) hides that distinction.
            Categorizing only by category (e.g. just &quot;Software&quot;)
            hides which vendor you&apos;re paying.
          </p>
          <p>
            Both axes are optional. You can tag entity but not
            category, or vice versa, or neither. Search and reports
            work on whatever you&apos;ve tagged.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            The three ways to tag
          </h2>
          <p>
            Click any transaction in the Transactions tab to expose
            three different tagging UIs:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Click the Entity column</strong> on a single
              row → opens <em>Set entity</em> dialog. Pick from the
              list or type a new name. Optional &quot;Apply to all
              matching&quot; toggle creates a correction rule.
            </li>
            <li>
              <strong>Click the Category column</strong> on a single
              row → opens <em>Set category</em> dialog. Same shape,
              for the category axis.
            </li>
            <li>
              <strong>Select multiple rows (checkbox) → Bulk Action
              Bar</strong> appears at the top of the Transactions
              view. Pick an entity or category to apply to all
              selected rows at once.
            </li>
          </ul>
          <p>
            The single-row dialogs and the Bulk Action Bar behave
            differently in one important way: the dialogs can create
            a correction rule that applies to FUTURE imports too,
            while the Bulk Action Bar only updates the rows you
            explicitly selected. See <em>Correction rules</em> below.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Correction rules — &quot;tag once, applies forever&quot;
          </h2>
          <p>
            The single most valuable feature in CentProof is the
            correction-rule system. Here&apos;s the workflow:
          </p>
          <ol className="list-decimal space-y-2 pl-6">
            <li>
              Click the Entity column on a STARBUCKS row → dialog
              opens.
            </li>
            <li>
              Pick &quot;Starbucks&quot; from the entity list (or type
              it to create new).
            </li>
            <li>
              The dialog auto-fills a <strong>Match pattern</strong>{" "}
              based on the row&apos;s description (e.g.{" "}
              <code className="rounded bg-[#F1F5F9] px-1.5 py-0.5 text-[0.92em]">STARBUCKS</code>).
              You can edit it.
            </li>
            <li>
              The <strong>Apply to all matching</strong> checkbox is
              checked by default. Leave it checked.
            </li>
            <li>
              Click Save. CentProof:
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  Tags every existing transaction whose description
                  contains &quot;STARBUCKS&quot; with the Starbucks
                  entity (could be 50+ rows).
                </li>
                <li>
                  Saves a correction rule. Every FUTURE statement you
                  import will auto-tag matching rows with Starbucks
                  on commit — no manual action needed.
                </li>
              </ul>
            </li>
          </ol>
          <p>
            Do this for your top 20-30 recurring merchants over the
            course of a few imports and 80% of your transactions will
            auto-tag themselves going forward.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            The combined &quot;Also set category&quot; workflow (v0.1.7)
          </h2>
          <p>
            Before v0.1.7, you had to open the Set entity dialog,
            save (creating the entity rule), then open the Set
            category dialog separately to save the category rule. It
            was easy to forget the second step — and a real user
            reported exactly this: their AUTOMATIC PAYMENT rows
            auto-tagged the entity on future imports, but the
            category stayed empty.
          </p>
          <p>
            v0.1.7 adds an inline <strong>Also set a category for
            this pattern</strong> checkbox at the bottom of the Set
            entity dialog. When you check it, an inline category
            picker appears in the same dialog. On save, BOTH rules
            are created with the same match pattern. Future imports
            auto-tag both axes in one shot.
          </p>
          <p>
            This is opt-in via the checkbox so the previous
            entity-only flow stays unchanged for users who want it.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Smart Tagging — what runs automatically on commit
          </h2>
          <p>
            When you commit a new statement, CentProof runs two
            passes on each new transaction:
          </p>
          <ol className="list-decimal space-y-2 pl-6">
            <li>
              <strong>Deterministic correction sweep.</strong> Every
              correction rule you&apos;ve created (entity rules AND
              category rules) is matched against the new
              transactions. Rules match on case-insensitive substring
              of the raw description; if you&apos;ve also enabled
              fuzzy match on a rule, embedding-based semantic
              similarity catches near-matches too.
            </li>
            <li>
              <strong>Curated merchant dictionary (v0.1.7).</strong>{" "}
              CentProof ships with 286 hand-curated regex patterns
              for common US merchants (Amazon, Walmart, all major gas
              brands, Netflix, Spotify, Claude.ai, AWS, GitHub,
              etc.). Any row not covered by your rules but matching
              a dictionary pattern gets a suggestion instantly with
              no LLM call.
            </li>
            <li>
              <strong>AI suggestion pass (only when needed).</strong>{" "}
              For rows that aren&apos;t covered by your rules OR the
              dictionary, CentProof asks its local 3-billion-parameter
              language model to propose entity + category. Suggestions
              are stored as ghost badges (visually distinct from
              confirmed tags) until you accept them. See{" "}
              <Link
                href="/docs/ask-centproof"
                className="font-semibold text-[#0F766E] hover:underline"
              >
                Ask CentProof
              </Link>{" "}
              for what the AI sees and what it doesn&apos;t.
            </li>
          </ol>
          <p>
            The AI pass is skipped entirely on rows where both entity
            AND category were already set by a rule or the dictionary.
            That means after a few imports&apos; worth of tagging, the
            AI suggestion phase on a new statement completes almost
            instantly — most rows have rules.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Renaming entities or categories (v0.1.7)
          </h2>
          <p>
            Sometimes you tag an entity quickly and want to clean up
            the name later — &quot;amazon&quot; → &quot;Amazon&quot;
            for capitalization, or &quot;AT&amp;T Wireless&quot; →
            just &quot;AT&amp;T&quot;. The Entities tab (and
            Categories tab) has an <em>Edit</em> button on each row:
          </p>
          <ol className="list-decimal space-y-2 pl-6">
            <li>
              Open the Entities or Categories tab from the left sidebar.
            </li>
            <li>
              Click <em>Edit</em> on the row you want to rename.
            </li>
            <li>
              A small dialog opens with the current name pre-filled
              and selected. Type the new name. Press Enter or click
              Save.
            </li>
            <li>
              Every transaction tagged with that entity / category
              immediately shows the new name. Correction rules
              continue to reference the same internal ID, so future
              imports work normally.
            </li>
          </ol>
          <p>
            If the new name collides with an existing entity /
            category (e.g. you already have a separate &quot;Amazon&quot;
            and you&apos;re trying to rename &quot;Amazon Inc&quot; to
            &quot;Amazon&quot;), the dialog rejects the rename with a
            clear error. To merge two entities, delete the duplicate
            first, then rename. (Auto-merge with reassignment is
            planned for a future release.)
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Removing a correction rule (Stop Rule)
          </h2>
          <p>
            Sometimes a rule turns out to be too broad — e.g.
            <code className="rounded bg-[#F1F5F9] px-1.5 py-0.5 text-[0.92em]">AMAZON</code>{" "}
            matches both your Amazon Marketplace purchases AND your
            Amazon Web Services bill, and you&apos;d rather they be
            tagged differently.
          </p>
          <p>
            On the Entities or Categories tab, the Rules panel shows
            every saved correction rule. Each one has a <em>Stop
            rule</em> button. Clicking it:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              Stops the rule from auto-tagging on future imports.
            </li>
            <li>
              Does NOT untag any past transactions. Once tagged, they
              stay tagged — only future imports stop matching.
            </li>
          </ul>
          <p>
            If you also want to clear the tag from past matching
            transactions, use the dialog&apos;s <em>Clear and stop
            rule</em> flow (opens via the Entity / Category cell click
            with empty selection).
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Cleanup Inbox — bulk-tag in focused mode
          </h2>
          <p>
            The Cleanup Inbox is a dedicated view that surfaces
            untagged transactions one merchant at a time. It groups
            transactions by their cleaned-up merchant identifier and
            shows you: 47 untagged STARBUCKS rows, 23 untagged AWS
            rows, 12 untagged ARCO rows, etc.
          </p>
          <p>
            You walk through merchant by merchant, picking an entity
            and category for each. Each acceptance creates a
            correction rule and clears all 47 / 23 / 12 rows at once.
            For an end-of-year cleanup where you have hundreds of
            untagged rows, the Cleanup Inbox is dramatically faster
            than tagging one row at a time.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Suggested practice: a tagging schedule
          </h2>
          <p>
            Best practice for a freelancer or anyone doing tax-time
            categorization:
          </p>
          <ol className="list-decimal space-y-2 pl-6">
            <li>
              <strong>First import:</strong> tag the obvious top-20
              merchants right after commit. Use &quot;Apply to all
              matching&quot; for each. Spend 10-15 minutes.
            </li>
            <li>
              <strong>Each monthly import:</strong> the Cleanup Inbox
              will surface any new merchants from this month. Tag
              them. Usually 5-10 minutes per month after the first
              import.
            </li>
            <li>
              <strong>Year-end cleanup:</strong> open the Cleanup
              Inbox in December and walk through anything that&apos;s
              still untagged. Set aside 30 minutes.
            </li>
            <li>
              <strong>Tax time:</strong> filter by category, export
              to CSV per Schedule C line. See{" "}
              <Link
                href="/docs/reports-and-exports"
                className="font-semibold text-[#0F766E] hover:underline"
              >
                Reports and exports
              </Link>
              .
            </li>
          </ol>

          <div className="mt-12 flex flex-wrap gap-3 rounded-2xl border border-[#0F766E]/30 bg-[#ECFDF5] p-6">
            <div className="flex-1 min-w-[240px]">
              <p className="text-sm font-semibold text-[#0F172A]">
                Next: ask plain-English questions about your money
              </p>
              <p className="mt-1 text-sm leading-6 text-[#475569]">
                The local AI feature explained — what it does, what
                data it sees, and the questions that work best.
              </p>
            </div>
            <Link
              href="/docs/ask-centproof"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0F766E] px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#115E59]"
            >
              Ask CentProof →
            </Link>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
