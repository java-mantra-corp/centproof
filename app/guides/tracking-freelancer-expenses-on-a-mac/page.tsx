import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title:
    "Tracking 1099 business expenses on your Mac, without the cloud",
  description:
    "A plain-English walkthrough for solo freelancers, consultants, and contractors who want to keep clean tax-ready books without giving an app their bank password, paying per-seat SaaS pricing, or storing their client list in someone else's cloud.",
  alternates: {
    canonical: "/guides/tracking-freelancer-expenses-on-a-mac",
  },
  openGraph: {
    title:
      "Tracking 1099 business expenses on your Mac, without the cloud",
    description:
      "The 30-minute setup, the 15-minute monthly workflow, and the 1-hour tax-time workflow for solo workers who want bookkeeping that stays on their own machine.",
    url: "/guides/tracking-freelancer-expenses-on-a-mac",
    type: "article",
  },
};

export default function GuideFreelancer() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        {/* Crumb -------------------------------------------------------- */}
        <nav className="text-xs text-[#64748B]">
          <Link href="/guides" className="hover:text-[#0F766E]">
            Guides
          </Link>{" "}
          <span aria-hidden>›</span>{" "}
          <span>Tracking 1099 business expenses on a Mac</span>
        </nav>

        {/* Header ------------------------------------------------------- */}
        <header className="mt-6">
          <h1 className="text-4xl font-semibold tracking-tight text-[#0F172A] sm:text-5xl">
            Tracking 1099 business expenses on your Mac, without the
            cloud.
          </h1>
          <p className="mt-4 text-sm text-[#64748B]">
            ~9 min read · For solo workers who want tax-ready books and
            don&apos;t want a SaaS to own them
          </p>
        </header>

        {/* TL;DR -------------------------------------------------------- */}
        <aside className="mt-8 rounded-2xl border border-[#0F766E]/30 bg-[#ECFDF5] p-5 text-sm leading-6 text-[#0F172A]">
          <strong className="font-semibold">TL;DR.</strong> A solo
          freelancer can run clean Schedule C-ready books on a Mac in
          about 30 minutes of one-time setup plus 15 minutes a month.
          The trick is to use the PDF statements you already download
          from each bank, tag each transaction once with a stable
          Entity + Category, and let the same tags auto-apply to next
          month&apos;s imports. CentProof is built for this workflow;
          this guide is the playbook regardless of which tool you use.
        </aside>

        {/* Body --------------------------------------------------------- */}
        <div className="prose-like mt-12 space-y-7 text-base leading-7 text-[#334155]">
          {/* ── Section 1 ──────────────────────────────────────────── */}
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Why freelancer bookkeeping is harder than it should be
          </h2>
          <p>
            If you&apos;re a solo consultant, designer, developer,
            therapist, photographer, or any other 1099-issuing
            independent worker, your bookkeeping problem looks like
            this: between January and April you need to sort roughly
            12 months of transactions across two or three accounts
            (business checking, business credit card, sometimes a
            personal card that has a few business expenses mixed in)
            into Schedule C categories you can hand to a tax preparer
            or type into TurboTax Self-Employed.
          </p>
          <p>
            The job isn&apos;t conceptually hard. Sort, tag, total,
            export. But three things about how mainstream tools have
            evolved make it more painful than it has any right to be:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>They want your bank password.</strong> Most
              modern personal-finance apps log into your bank on your
              behalf via an aggregator (Plaid, Yodlee, Finicity). That
              means handing your bank credentials to a third party,
              and accepting that the aggregator now has read access to
              every account you connect. For a 1099 worker whose
              client list is partially deducible from their banking
              history, that&apos;s a meaningful disclosure.
            </li>
            <li>
              <strong>They charge per seat.</strong> Solo workers
              don&apos;t need five seats. Per-seat SaaS pricing is
              built for teams; for one person it&apos;s a tax on
              existing.
            </li>
            <li>
              <strong>They store the answer in someone else&apos;s
              cloud.</strong> The structured record of which client
              paid you what, when, and what you spent on whom now
              lives on a vendor&apos;s servers. That&apos;s a vendor
              you trust to keep your books, and a vendor with whom
              you&apos;ve effectively shared your client roster.
            </li>
          </ul>
          <p>
            None of these are deal-breakers on their own. Combined,
            they make the actually-simple bookkeeping job feel like a
            big surveillance commitment. Plenty of freelancers handle
            this by keeping a spreadsheet, which works but doesn&apos;t
            scale past 200-or-so transactions a year.
          </p>

          {/* ── Section 2 ──────────────────────────────────────────── */}
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            What you actually need
          </h2>
          <p>
            Reduced to the minimum set of capabilities, a freelancer
            needs:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Multi-account import + reconciliation.</strong>{" "}
              You should be able to drop in statements from every
              account you used for business — checking, credit card,
              the occasional personal card — and confirm each one
              reconciles to the cent. If something is missing or
              duplicated, you want to find that in May, not in
              April&apos;s last week.
            </li>
            <li>
              <strong>Per-client and per-category tagging.</strong> Two
              tag axes, used together. Entity tells you{" "}
              <em>who</em> the transaction was for (Client Acme, Client
              Beta, Personal, or just &quot;Business&quot;).{" "}
              Category tells you <em>what kind</em> of expense it was
              (Software, Travel, Meals, Office Supplies — typically
              aligned with Schedule C lines).
            </li>
            <li>
              <strong>Tags that stick.</strong> If you tag the AWS
              monthly bill as <em>Business / Software</em> in February,
              you don&apos;t want to do it again in March, April, or
              for the next three years. Mature personal-finance apps
              learn that.
            </li>
            <li>
              <strong>Search across years.</strong> The most common
              tax-time question is &quot;what did I spend on{" "}
              <em>X</em>?&quot; — across a year, sometimes across
              multiple years. Search needs to span everything you
              imported.
            </li>
            <li>
              <strong>Export.</strong> Whatever you build needs to
              hand off cleanly to your accountant, your tax software,
              or your spreadsheet. CSV is the lingua franca.
            </li>
            <li>
              <strong>Privacy you can verify.</strong> No bank
              passwords. No phoning home. No vendor lock-in. If the
              software vanishes tomorrow, your data is still readable
              and exportable.
            </li>
          </ul>
          <p>
            That&apos;s it. Six capabilities. Notice what isn&apos;t
            on the list: receipt-photo OCR, mileage tracking, invoice
            generation, full general-ledger double-entry. Those are
            real needs — they just aren&apos;t the
            transactions-into-tax-categories problem this guide is
            about. We&apos;ll cover what to do about them at the end.
          </p>

          {/* ── Section 3 ──────────────────────────────────────────── */}
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            The 30-minute one-time setup
          </h2>
          <p>
            Done once, this is the foundation. Set aside a
            distraction-free half-hour.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-[#0F172A]">
            Step 1: Pull last 12 months of statements
          </h3>
          <p>
            From each account&apos;s online portal, download the
            monthly PDFs for the last 12 calendar months. Most banks
            keep them under a section called <em>Statements &amp;
            Documents</em> or similar. Save them somewhere you can
            find them (e.g. a single folder called{" "}
            <code className="rounded bg-[#F1F5F9] px-1.5 py-0.5 text-[0.92em]">
              ~/Documents/Bookkeeping/2026/
            </code>
            ).
          </p>
          <p>
            Pulling 12 months gives you a full annual cycle for tax
            time. If you&apos;ve been freelancing longer, pull
            whatever feels reasonable — there&apos;s no penalty for
            more.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-[#0F172A]">
            Step 2: Import each statement and verify reconciliation
          </h3>
          <p>
            Drop the PDFs into CentProof one at a time. Each statement
            gets parsed and reconciled — that is, the opening balance
            plus the parsed transactions should equal the closing
            balance the bank prints, to the cent.
          </p>
          <p>
            If a statement reconciles cleanly, commit it. If it
            doesn&apos;t, look at the diff. The two common causes:
            (a) the parser missed a row (rare on supported banks but
            possible on unusual layouts), and (b) the statement has a
            credit or adjustment that landed in a category the parser
            didn&apos;t recognize. Either way, you want to know <em>
              now</em> rather than in April.
          </p>
          <p>
            This is the step that&apos;s easy to skip and is the most
            valuable. The whole point of doing bookkeeping is that the
            numbers add up. If they don&apos;t add up, the
            categorization that follows is built on sand.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-[#0F172A]">
            Step 3: Define your Entities
          </h3>
          <p>
            An Entity in this workflow is &quot;who is this for.&quot;
            Solo freelancers typically need a small, stable list:
          </p>
          <pre className="overflow-x-auto rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-sm leading-6 text-[#0F172A]">
            <code>
              {`Business        ← all general business expenses
Personal        ← personal spending you don't want mixed in
Client: Acme    ← billable-or-deductible expense for Client Acme
Client: Beta    ← same, for Client Beta
…`}
            </code>
          </pre>
          <p>
            You only need per-client Entities if you (a) re-bill
            expenses to clients, or (b) want to know how much each
            client cost you to serve. If neither, two entities —{" "}
            <em>Business</em> and <em>Personal</em> — are enough.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-[#0F172A]">
            Step 4: Define your Categories (Schedule C-aligned)
          </h3>
          <p>
            Categories in this workflow should match the buckets your
            tax form uses. For 1099 freelancers, that&apos;s typically
            Schedule C&apos;s expense lines. A workable starter list:
          </p>
          <pre className="overflow-x-auto rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-sm leading-6 text-[#0F172A]">
            <code>
              {`Advertising
Bank & Card Fees
Contractor Labor       (1099 issued)
Insurance              (business insurance only)
Legal & Professional
Meals (50%)
Office Expenses
Rent & Lease
Repairs & Maintenance
Software & Subscriptions
Supplies
Taxes & Licenses
Telephone & Internet
Travel
Utilities
Vehicle / Mileage      (if not using mileage method)`}
            </code>
          </pre>
          <p>
            Don&apos;t over-engineer this. Fifteen categories is
            usually plenty. If you find yourself wanting a 16th, ask
            whether it would change anything on your tax return — if
            not, fold it into <em>Office Expenses</em> or{" "}
            <em>Supplies</em> and move on.
          </p>
          <p>
            CentProof doesn&apos;t ship a pre-built Schedule C
            taxonomy (yet). You add categories yourself — the list
            above is a reasonable starting point. Copy it into the
            Categories screen, edit to your situation.
          </p>

          {/* ── Section 4 ──────────────────────────────────────────── */}
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            The 15-minute monthly workflow
          </h2>
          <p>
            Once setup is done, the monthly loop is simple. Do it on
            the same day every month — the 15th of the following
            month works well (statements are usually available by
            then).
          </p>
          <ol className="list-decimal space-y-3 pl-6">
            <li>
              <strong>Download last month&apos;s statements</strong>{" "}
              from each account. Save into the same folder.
            </li>
            <li>
              <strong>Import into CentProof.</strong> Each statement
              parses and reconciles. If anything fails to reconcile,
              spend the five minutes to figure out why <em>now</em>.
            </li>
            <li>
              <strong>Review Smart Tagging suggestions.</strong> The
              app auto-applies tags it learned from past corrections
              (your AWS monthly bill auto-categorizes as Business /
              Software because you told it that two months ago).
              Confirm or correct.
            </li>
            <li>
              <strong>Tag the new merchants.</strong> Anything the app
              hasn&apos;t seen before lands in the Cleanup Inbox with
              no Entity / Category. Tag each one. Next month&apos;s
              same merchant will inherit.
            </li>
            <li>
              <strong>Skim Recurring Subscriptions.</strong> CentProof
              flags repeating charges; this is where you catch a
              software subscription that just bumped from $19 to $29
              without telling you.
            </li>
          </ol>
          <p>
            With practice, this is 10-15 minutes a month. Compare to
            the alternative (a 6-hour weekend in March staring at 12
            months of transactions trying to remember what they were
            for).
          </p>

          {/* ── Section 5 ──────────────────────────────────────────── */}
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            The 1-hour tax-time workflow
          </h2>
          <p>
            Once a year, in January or February (after December
            statements are available), assemble what your tax
            preparer or tax software needs.
          </p>
          <ol className="list-decimal space-y-3 pl-6">
            <li>
              <strong>Confirm all 12 months are imported and
              reconciled.</strong> A quick check; if you&apos;ve done
              the monthly loop, this is just a sanity pass.
            </li>
            <li>
              <strong>Run a search per category, for the tax
              year.</strong> Filter by Entity = Business, Category =
              Software, date range = the whole year. The total at the
              bottom is your Schedule C Line 22 (or wherever Software
              lives on your form).
            </li>
            <li>
              <strong>Export to CSV.</strong> One export per category,
              or one combined export with the category column
              included — whichever your accountant or tax software
              prefers.
            </li>
            <li>
              <strong>Skim Anomaly Detection.</strong> The app flags
              unusual charges. This is the &quot;wait, is this really
              business?&quot; moment that catches mis-tagged personal
              spending before it becomes a deduction you can&apos;t
              defend in an audit.
            </li>
            <li>
              <strong>Hand off.</strong> The CSVs go to your tax
              preparer or into TurboTax Self-Employed&apos;s import
              flow.
            </li>
          </ol>
          <p>
            If your preparer wants a single PDF report instead, run
            an export to PDF — the rows are source-linked back to the
            original statements so an auditor can trace any number
            back to its bank statement of origin.
          </p>

          {/* ── Section 6 ──────────────────────────────────────────── */}
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Client billing and per-client P&amp;L
          </h2>
          <p>
            If you re-bill expenses to clients, or want to know which
            clients are most profitable to serve, the per-client
            Entity tagging from Step 3 pays off here.
          </p>
          <p>
            Filter by Entity = &quot;Client: Acme&quot; for the
            billing period. Run a Settlement Report — that&apos;s a
            report formatted for handing to the client as an itemized
            invoice of re-billable expenses. Export to PDF, attach to
            the invoice, send.
          </p>
          <p>
            For a per-client profitability view, filter by Entity =
            &quot;Client: Acme&quot;, group by Category, and total.
            You now know that Client Acme cost you $480 in Software
            attribution and $320 in Meals over the year — useful for
            deciding whether to raise their rate at renewal.
          </p>

          {/* ── Section 7 ──────────────────────────────────────────── */}
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            What CentProof doesn&apos;t do (and what to use instead)
          </h2>
          <p>
            Being honest about the boundaries matters. CentProof is
            the cash-flow and tax-categorization layer of a
            freelancer&apos;s books. It is not a complete accounting
            suite. Here&apos;s the gap list and reasonable
            alternatives:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Receipt-photo OCR.</strong> CentProof reads
              bank/card PDFs, not photos of receipts. For receipts,
              keep a folder per year and shoot a quick photo at the
              point of sale (the iPhone Notes app or a paid tool
              like Hubdoc works). The PDF statements remain your
              source of truth for amount + merchant + date;
              receipts back up the &quot;what was it for&quot;
              question if the IRS ever asks.
            </li>
            <li>
              <strong>Mileage tracking.</strong> Use MileIQ, the
              built-in iPhone Activity log, or a paper notebook.
              Mileage is a separate IRS line and a separate
              workflow.
            </li>
            <li>
              <strong>Invoice generation.</strong> CentProof reads
              statements; it doesn&apos;t send invoices. Pair with
              Stripe Invoicing, Wave (free), or a Google Doc
              template — whatever you already use.
            </li>
            <li>
              <strong>Direct QuickBooks / Xero sync.</strong>{" "}
              CentProof exports to CSV, OFX, QFX, JSON, and PDF. If
              your accountant insists on QuickBooks Online,
              CentProof can be your privacy-preserving working copy
              and you sync to QBO at year end.
            </li>
            <li>
              <strong>Double-entry general-ledger
              accounting.</strong> If you have employees, multiple
              revenue streams, inventory, or accrual accounting
              needs, you&apos;ve outgrown the
              statements-into-categories workflow. Move to
              FreshBooks, QuickBooks Online, or hire a bookkeeper.
              CentProof is built for the solo-worker phase.
            </li>
          </ul>
          <p>
            For most 1099 freelancers — the &quot;I have one or two
            clients, a business checking, a business card&quot;
            phase that lasts years for a lot of people — this stack
            is sufficient. When your business outgrows it, you&apos;ll
            know.
          </p>

          {/* ── Closing ────────────────────────────────────────────── */}
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            What to do next
          </h2>
          <p>
            If you want to try this workflow with CentProof, the
            commitment is small: a Free Test Mode download, last
            month&apos;s statement from one of your accounts, and 10
            minutes to confirm reconciliation works. If the
            reconciliation is clean and the parser handles your bank,
            the rest of the playbook above scales from there.
          </p>
          <p>
            If you already have a workflow that works, the part of
            this guide that&apos;s most worth borrowing is the
            Entity + Category discipline: tag once, with stable
            names, and let the same tags ride forward. That single
            habit replaces the most painful part of tax-time
            bookkeeping no matter what tool you use.
          </p>

          {/* CTA ---------------------------------------------------------- */}
          <div className="mt-12 flex flex-wrap gap-3 rounded-2xl border border-[#0F766E]/30 bg-[#ECFDF5] p-6">
            <div className="flex-1 min-w-[240px]">
              <p className="text-sm font-semibold text-[#0F172A]">
                Try the workflow for free
              </p>
              <p className="mt-1 text-sm leading-6 text-[#475569]">
                Free Test Mode handles 2 active statements + 5
                lifetime imports — enough to verify reconciliation
                works on your bank before you commit to the workflow.
              </p>
            </div>
            <Link
              href="/download"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0F766E] px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#115E59]"
            >
              Download for Mac
            </Link>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
