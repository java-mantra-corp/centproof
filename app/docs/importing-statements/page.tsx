import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Importing statements",
  description:
    "How CentProof imports bank and credit-card PDFs: supported banks, multi-account combined statements, the best-effort fallback for unsupported banks, and how to send us a sample so we can add your bank.",
  alternates: { canonical: "/docs/importing-statements" },
  openGraph: {
    title: "CentProof — Importing statements",
    description:
      "Everything that happens between dropping a PDF and seeing your transactions.",
    url: "/docs/importing-statements",
    type: "article",
  },
};

export default function DocImporting() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        <nav className="text-xs text-[#64748B]">
          <Link href="/docs" className="hover:text-[#0F766E]">
            Docs
          </Link>{" "}
          <span aria-hidden>›</span>{" "}
          <span>Importing statements</span>
        </nav>

        <header className="mt-6">
          <h1 className="text-4xl font-semibold tracking-tight text-[#0F172A] sm:text-5xl">
            Importing statements.
          </h1>
          <p className="mt-4 text-sm text-[#64748B]">
            ~7 min read · For anyone bringing PDF statements into CentProof
          </p>
        </header>

        <aside className="mt-8 rounded-2xl border border-[#0F766E]/30 bg-[#ECFDF5] p-5 text-sm leading-6 text-[#0F172A]">
          <strong className="font-semibold">TL;DR.</strong> Drag a PDF
          onto CentProof. The app detects which bank it&apos;s from,
          extracts every transaction, runs the math to the cent, and
          shows you a Review screen. If your bank is one of the nine
          supported, you&apos;re done in ten seconds. If it&apos;s not,
          CentProof offers you a best-effort generic extraction and a
          one-click path to send us a redacted sample so a verified
          parser ships in the next release (~1-2 weeks).
        </aside>

        <div className="prose-like mt-12 space-y-7 text-base leading-7 text-[#334155]">
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Why PDFs (and not a bank login)
          </h2>
          <p>
            CentProof reads the PDF statements your bank already
            generates for you each month. There is no aggregator
            (Plaid, Yodlee, Finicity), no bank-password login, no API
            connection of any kind. The trade-off is explicit: you
            download your statements manually each month, and in
            exchange, no third party — including CentProof itself —
            has read access to your bank.
          </p>
          <p>
            For a longer explanation of why this matters, see{" "}
            <Link
              href="/guides/five-questions-bank-password-app"
              className="font-semibold text-[#0F766E] hover:underline"
            >
              the password-app guide
            </Link>
            . For the rest of this doc, we&apos;ll assume you&apos;re
            on board with the PDF model and want to know how to
            actually use it.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Supported banks
          </h2>
          <p>
            As of v0.1.7, CentProof has verified parsers for:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Bank of America (checking, savings, combined statements)</li>
            <li>
              Chase (personal checking, business checking, credit card)
            </li>
            <li>Wells Fargo (checking, savings, combined statements)</li>
            <li>Capital One (credit card)</li>
            <li>Apple Card (credit card)</li>
            <li>American Express (credit card)</li>
            <li>Discover (credit card)</li>
            <li>Citi (credit card, including Costco Visa)</li>
            <li>US Bank (checking)</li>
          </ul>
          <p>
            See the{" "}
            <Link
              href="/banks"
              className="font-semibold text-[#0F766E] hover:underline"
            >
              full bank list
            </Link>{" "}
            for the up-to-date status. New parsers ship in maintenance
            releases as users send in redacted samples (see{" "}
            <em>What if my bank isn&apos;t supported</em> below).
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            How to import
          </h2>
          <p>
            Three equivalent ways to get a PDF into CentProof:
          </p>
          <ol className="list-decimal space-y-2 pl-6">
            <li>
              <strong>Drag and drop.</strong> Drag the file from
              Finder onto any part of the CentProof window.
            </li>
            <li>
              <strong>Add Statement button.</strong> Top-left button
              opens the standard Mac file picker.
            </li>
            <li>
              <strong>Keyboard shortcut.</strong>{" "}
              <code className="rounded bg-[#F1F5F9] px-1.5 py-0.5 text-[0.92em]">⌘ N</code>{" "}
              opens the same file picker.
            </li>
          </ol>
          <p>
            CentProof processes one statement at a time. If you have a
            backlog of twelve months to import, drop them in one by
            one — most parsers run in under a second per statement, so
            the bottleneck is your clicking speed on Commit.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            What CentProof does to the PDF
          </h2>
          <p>
            Inside CentProof, the import pipeline is:
          </p>
          <ol className="list-decimal space-y-2 pl-6">
            <li>
              <strong>Hash the file.</strong> SHA-256 of the bytes —
              used later to detect if you accidentally try to import
              the same statement twice.
            </li>
            <li>
              <strong>Extract text + positions.</strong> Using pdf.js
              locally to pull every text character and its X/Y
              coordinates on each page.
            </li>
            <li>
              <strong>Fingerprint the bank.</strong> Look for
              signatures like &quot;JPMorgan Chase Bank&quot; or
              &quot;Bank of America&quot;.
            </li>
            <li>
              <strong>Pick the right parser.</strong> Each bank has a
              dedicated parser that knows its specific layout
              (column positions, summary block wording, period
              format).
            </li>
            <li>
              <strong>Reconcile.</strong> Opening balance + credits −
              debits should equal the closing balance the statement
              prints. If it does, you see a green ✓.
            </li>
            <li>
              <strong>Show the Review screen.</strong> You confirm
              before anything is committed to the database.
            </li>
          </ol>
          <p>
            Everything above happens locally on your Mac. No network
            calls, no upload, no telemetry.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Combined statements (multiple accounts in one PDF)
          </h2>
          <p>
            Some banks (Bank of America Advantage Plus + Regular
            Savings, Wells Fargo Checking + Way2Save) print TWO or
            more accounts in a single PDF. CentProof detects this and
            walks you through them one at a time on the Review screen
            — &quot;Account 1 of 2 / Account 2 of 2&quot; — so you can
            confirm each one independently.
          </p>
          <p>
            Each account becomes its own statement row in CentProof
            after commit. They share the same source PDF (encrypted
            once, referenced by both rows) but are otherwise independent
            for search, reports, and reconciliation.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Duplicate detection
          </h2>
          <p>
            If you try to import a PDF you&apos;ve already imported,
            CentProof catches it two ways:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Same file (SHA match).</strong> Identical bytes
              to a previous import — the duplicate is detected
              instantly and you&apos;re told which existing statement
              it matches.
            </li>
            <li>
              <strong>Same period (account + dates match).</strong>{" "}
              Different file but same account, same period start/end —
              also flagged. Catches the case where your bank re-issued
              a corrected version of the same month.
            </li>
          </ul>
          <p>
            For combined statements where some accounts are duplicates
            and others aren&apos;t, CentProof walks you through only
            the new ones.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            What if my bank isn&apos;t supported
          </h2>
          <p>
            When CentProof can&apos;t identify the bank, you see this
            dialog instead of an error:
          </p>
          <pre className="overflow-x-auto rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-sm leading-6 text-[#0F172A]">
            <code>{`We don't recognize this PDF yet
─────────────────────────────────
What would you like to do?

  • Try best-effort extraction
      Run a generic heuristic parser and see what
      rows we can pull from the PDF. Read-only —
      nothing saved to your imports.

  • Send us a sample
      Open centproof.com in your browser. Walk
      through redacting personal fields, then
      email us the PDF. New parsers ship within
      1-2 weeks in the next maintenance release.

  • Cancel
      Close the dialog. No import happens.`}</code>
          </pre>
          <p>
            <strong>Best-effort extraction</strong> uses a generic
            parser that looks for date + description + amount patterns
            anywhere in the PDF. It doesn&apos;t know your bank&apos;s
            specific layout, so it can miss multi-line descriptions
            or grab the wrong column on statements with side-by-side
            amount + balance layouts. The result is shown read-only
            on a preview screen with a clear &quot;NOT verified&quot;
            warning — nothing saves to your imports. Useful for
            getting a feel for what&apos;s in the statement before
            deciding whether to send a sample.
          </p>
          <p>
            <strong>Send us a sample</strong> is the path to a real
            verified parser. The link opens{" "}
            <Link
              href="/banks/share-sample"
              className="font-semibold text-[#0F766E] hover:underline"
            >
              centproof.com/banks/share-sample
            </Link>{" "}
            with the redaction guide pre-loaded. You mask account
            number, name, and address (keeping amounts and dates
            intact so we can verify reconciliation), then email the
            redacted PDF directly to support@centproof.com. New
            parsers typically ship within 1-2 weeks.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Free Test Mode limits
          </h2>
          <p>
            Free Test Mode caps imports at 2 active statements and 5
            lifetime imports total — enough to verify CentProof works
            on your bank before deciding whether to upgrade to Pro.
            Existing imported data remains accessible after hitting
            the cap; only new imports are gated.
          </p>
          <p>
            When you hit a cap, CentProof shows a clear dialog with
            the upgrade path. Pro Lifetime is $49 one-time for
            unlimited statements on up to 2 Macs. Full details on{" "}
            <Link
              href="/pricing"
              className="font-semibold text-[#0F766E] hover:underline"
            >
              the pricing page
            </Link>
            .
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Where the imported PDF lives
          </h2>
          <p>
            After you click Commit, CentProof encrypts a copy of the
            PDF and stores it at{" "}
            <code className="rounded bg-[#F1F5F9] px-1.5 py-0.5 text-[0.92em]">~/Library/Application Support/com.javamantra.pdfapp/pdfs/&lt;sha&gt;.bin</code>.
            The encryption key lives in macOS Keychain — only the
            production CentProof binary can read it. Even file-system
            access to the .bin file doesn&apos;t reveal the PDF
            contents.
          </p>
          <p>
            The Review screen and any later &quot;view source PDF&quot;
            clicks decrypt the file in memory on demand. The plaintext
            PDF never sits on disk inside CentProof&apos;s storage.
            For more detail, see{" "}
            <Link
              href="/docs/backup-and-recovery"
              className="font-semibold text-[#0F766E] hover:underline"
            >
              Backup and recovery
            </Link>
            .
          </p>

          <div className="mt-12 flex flex-wrap gap-3 rounded-2xl border border-[#0F766E]/30 bg-[#ECFDF5] p-6">
            <div className="flex-1 min-w-[240px]">
              <p className="text-sm font-semibold text-[#0F172A]">
                Next: what to do on the Review screen
              </p>
              <p className="mt-1 text-sm leading-6 text-[#475569]">
                Reconciliation, manual override, and the Account
                Summary breakdown — explained.
              </p>
            </div>
            <Link
              href="/docs/reviewing-reconciling"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0F766E] px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#115E59]"
            >
              Reviewing and reconciling →
            </Link>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
