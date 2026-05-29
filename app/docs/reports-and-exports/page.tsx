import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Reports and exports",
  description:
    "How to use saved reports, trip reports, settlement reports, and which export format (CSV, OFX, QFX, JSON, PDF) to use for which downstream tool — accountant, tax software, spreadsheet, or audit.",
  alternates: { canonical: "/docs/reports-and-exports" },
  openGraph: {
    title: "CentProof — Reports and exports",
    description:
      "Saved reports, settlement reports, export formats, and the workflows that take you from CentProof to your accountant or tax software.",
    url: "/docs/reports-and-exports",
    type: "article",
  },
};

export default function DocReports() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        <nav className="text-xs text-[#64748B]">
          <Link href="/docs" className="hover:text-[#0F766E]">
            Docs
          </Link>{" "}
          <span aria-hidden>›</span>{" "}
          <span>Reports and exports</span>
        </nav>

        <header className="mt-6">
          <h1 className="text-4xl font-semibold tracking-tight text-[#0F172A] sm:text-5xl">
            Reports and exports.
          </h1>
          <p className="mt-4 text-sm text-[#64748B]">
            ~5 min read · From CentProof to your accountant / tax software / spreadsheet
          </p>
        </header>

        <aside className="mt-8 rounded-2xl border border-[#0F766E]/30 bg-[#ECFDF5] p-5 text-sm leading-6 text-[#0F172A]">
          <strong className="font-semibold">TL;DR.</strong> Set up a
          search filter once, save it as a Saved Report, and re-run
          it any time. Or pick a more specialized report type — Trip
          Report (per-trip P&amp;L), Settlement Report (per-client /
          per-entity P&amp;L). Export to CSV for spreadsheets, OFX /
          QFX for Quicken-style accounting tools, JSON for engineers,
          PDF for accountants or audit trails. Export formats are
          available on Pro; Free Test Mode exports are watermarked
          and capped at 50 rows.
        </aside>

        <div className="prose-like mt-12 space-y-7 text-base leading-7 text-[#334155]">
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Saved Reports — &quot;remember this filter&quot;
          </h2>
          <p>
            The most common report workflow is also the simplest:
            you have a search filter you keep re-typing every month
            (e.g. &quot;Business + Software + this quarter&quot;) —
            save it as a Saved Report so it&apos;s one click next
            time.
          </p>
          <ol className="list-decimal space-y-2 pl-6">
            <li>
              Open the Search tab. Set up your filter (entity,
              category, date range, free text, account, etc.).
            </li>
            <li>
              Click <em>Save report</em> at the top of the results.
            </li>
            <li>
              Give it a name (e.g. &quot;Software expenses, current
              quarter&quot;).
            </li>
            <li>
              The report appears in the Saved Reports tab. Click it
              to re-run the SAME filter against your current data —
              new transactions included.
            </li>
          </ol>
          <p>
            What gets saved is the FILTER, not the data. A saved
            report named &quot;Software expenses, current
            quarter&quot; always shows whatever&apos;s currently in
            this quarter — no stale snapshot.
          </p>
          <p>
            Free Test Mode caps saved reports at 1. Pro Lifetime and
            Pro Monthly both unlock unlimited.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Trip Reports — per-trip P&amp;L
          </h2>
          <p>
            A Trip Report is a saved-report variant designed for
            travel. You set up a date range (the trip&apos;s dates),
            an optional location filter (entities tagged with that
            city), and CentProof shows:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              Total spend during the trip
            </li>
            <li>
              Breakdown by category (lodging, food, transit,
              attractions)
            </li>
            <li>
              Day-by-day spending
            </li>
            <li>
              All source transactions in a table
            </li>
          </ul>
          <p>
            Useful for &quot;what did our two-week Japan trip cost
            us?&quot;, or for re-billing a client trip&apos;s
            expenses. Trip Reports can be exported to PDF for clean
            handoff.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Settlement Reports — per-client / per-entity P&amp;L
          </h2>
          <p>
            A Settlement Report sums everything for a single entity
            over a date range. The intended use case is solo
            freelancers / consultants doing per-client billing or
            per-client profitability analysis.
          </p>
          <p>
            Typical workflow: tag re-billable expenses with the
            client&apos;s Entity (&quot;Client Acme&quot;,
            &quot;Client Beta&quot;) as you import. At billing time,
            open the Settlement Report for that client + the billing
            period — you get a clean per-line itemized list ready
            to attach to your invoice.
          </p>
          <p>
            The same report works for non-billable analysis: filter
            by Client Acme entity, see total spend on that client
            year-to-date, decide whether to raise their rate at
            renewal.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Search exports — one-off CSVs from any filter
          </h2>
          <p>
            Any search filter can be exported directly without
            saving it as a Saved Report. Set up the filter, click
            <em>Export</em>, pick a format. Useful for one-off
            handoffs to an accountant or a quick spreadsheet
            check.
          </p>
          <p>
            Search exports include columns for date, description,
            entity, category, amount, direction, account, and
            source statement reference. The accountant can match any
            row back to the source PDF if they have access to your
            CentProof database.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Which export format to use
          </h2>
          <p>
            CentProof supports five export formats. Picking the right
            one depends on where the data is going.
          </p>
          <ul className="list-disc space-y-3 pl-6">
            <li>
              <strong>CSV</strong> — the universal one. Opens in
              Excel, Numbers, Google Sheets, Python pandas, or any
              text editor. Use this for accountant handoffs (most
              accountants prefer CSV), for ad-hoc spreadsheet
              analysis, or as a backup format. One column per field,
              one row per transaction.
            </li>
            <li>
              <strong>OFX</strong> — &quot;Open Financial Exchange.&quot;
              Industry-standard format used by most personal-finance
              and accounting software (Quicken, GnuCash, Banktivity,
              Moneydance, etc.). Use this if you&apos;re importing
              from CentProof into another finance app.
            </li>
            <li>
              <strong>QFX</strong> — Quicken&apos;s flavor of OFX,
              with a few extra fields Quicken expects. Use this for
              Quicken specifically. Other apps accept it too but
              treat it as OFX.
            </li>
            <li>
              <strong>JSON</strong> — structured machine-readable
              export. Useful if you&apos;re writing a script against
              your data (Python, Node, whatever) or feeding into a
              custom dashboard. One JSON object per transaction with
              every field.
            </li>
            <li>
              <strong>PDF</strong> — a printable / shareable report
              with header, summary, and the transactions table. Best
              for accountant deliverables, audit responses, or
              attaching to client invoices.
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Free Test Mode export limits
          </h2>
          <p>
            Free Test Mode exports are watermarked and capped at 50
            rows. Enough to verify the export format works with your
            downstream tool before deciding to upgrade. Pro Lifetime
            and Pro Monthly both unlock full unwatermarked exports
            of any size.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Schedule C tax workflow
          </h2>
          <p>
            For 1099 freelancers or anyone filing Schedule C, the
            workflow at tax time:
          </p>
          <ol className="list-decimal space-y-2 pl-6">
            <li>
              Make sure all 12 months are imported and reconciled.
            </li>
            <li>
              Filter Search by Entity = Business (or per-client if
              you re-bill), Category = one Schedule C line at a time
              (Software, Office Expenses, Travel, etc.), date range
              = the tax year.
            </li>
            <li>
              The Total at the bottom of the search results is the
              number that goes on that Schedule C line.
            </li>
            <li>
              Export to CSV per category and hand to your accountant
              — or import the OFX into TurboTax Self-Employed.
            </li>
            <li>
              Sanity-check with Anomaly Detection before submitting.
            </li>
          </ol>
          <p>
            For a full walkthrough of this workflow, see{" "}
            <Link
              href="/guides/tracking-freelancer-expenses-on-a-mac"
              className="font-semibold text-[#0F766E] hover:underline"
            >
              the 1099 freelancer playbook
            </Link>
            .
          </p>

          <div className="mt-12 flex flex-wrap gap-3 rounded-2xl border border-[#0F766E]/30 bg-[#ECFDF5] p-6">
            <div className="flex-1 min-w-[240px]">
              <p className="text-sm font-semibold text-[#0F172A]">
                Next: protect your data
              </p>
              <p className="mt-1 text-sm leading-6 text-[#475569]">
                Where files live, what&apos;s encrypted, and how Time
                Machine works with CentProof.
              </p>
            </div>
            <Link
              href="/docs/backup-and-recovery"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0F766E] px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#115E59]"
            >
              Backup and recovery →
            </Link>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
