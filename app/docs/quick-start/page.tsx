import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Quick start",
  description:
    "From install to your first reconciled bank statement in five minutes. The path every CentProof user takes on day one — install, drop a PDF, verify the math, commit.",
  alternates: { canonical: "/docs/quick-start" },
  openGraph: {
    title: "CentProof — Quick start",
    description:
      "Install CentProof, import your first statement, and confirm reconciliation in five minutes.",
    url: "/docs/quick-start",
    type: "article",
  },
};

export default function DocQuickStart() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        <nav className="text-xs text-[#64748B]">
          <Link href="/docs" className="hover:text-[#0F766E]">
            Docs
          </Link>{" "}
          <span aria-hidden>›</span>{" "}
          <span>Quick start</span>
        </nav>

        <header className="mt-6">
          <h1 className="text-4xl font-semibold tracking-tight text-[#0F172A] sm:text-5xl">
            Quick start.
          </h1>
          <p className="mt-4 text-sm text-[#64748B]">
            ~5 min read · For first-time users
          </p>
        </header>

        <aside className="mt-8 rounded-2xl border border-[#0F766E]/30 bg-[#ECFDF5] p-5 text-sm leading-6 text-[#0F172A]">
          <strong className="font-semibold">TL;DR.</strong> Download
          CentProof from <Link href="/download" className="font-semibold text-[#0F766E] hover:underline">centproof.com/download</Link>, drag it into Applications, launch it,
          drag any bank or credit-card PDF onto the window, and CentProof
          parses it, reconciles the math to the cent, and asks you to
          confirm. That&apos;s the whole loop. Five minutes from install
          to your first reconciled statement.
        </aside>

        <div className="prose-like mt-12 space-y-7 text-base leading-7 text-[#334155]">
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            1. Install
          </h2>
          <p>
            Go to{" "}
            <Link
              href="/download"
              className="font-semibold text-[#0F766E] hover:underline"
            >
              centproof.com/download
            </Link>{" "}
            and click <em>Download CentProof.dmg</em>. The file is
            ~80 MB; the download takes 20-60 seconds on most
            connections.
          </p>
          <p>
            Open the .dmg, drag the CentProof icon to the Applications
            folder, then eject the disk image. Launch CentProof from
            Applications (or Spotlight: <code className="rounded bg-[#F1F5F9] px-1.5 py-0.5 text-[0.92em]">⌘ Space → CentProof</code>).
          </p>
          <p>
            The first launch shows macOS&apos;s standard Gatekeeper
            confirmation because the app is from outside the App Store
            — click Open. CentProof is signed with Apple&apos;s
            Developer ID and notarized by Apple, so this is a one-time
            prompt, not a security warning. If you want to verify the
            signature yourself before opening, the{" "}
            <Link
              href="/security"
              className="font-semibold text-[#0F766E] hover:underline"
            >
              Security page
            </Link>{" "}
            shows you three short Terminal commands.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            2. Get a statement
          </h2>
          <p>
            CentProof reads PDF statements that you download from your
            bank&apos;s online portal — there&apos;s no aggregator, no
            bank-password login, no Plaid. Anything you can already
            download from your bank works.
          </p>
          <p>
            Sign in to your bank or credit-card portal, find the{" "}
            <em>Statements &amp; Documents</em> section (or similar),
            and download one month&apos;s PDF. Save it anywhere you can
            find — Downloads is fine. For a complete first try, pick a
            recent month that has both deposits and withdrawals so you
            see the full picture.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            3. Drop it into CentProof
          </h2>
          <p>
            Two ways:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Drag and drop.</strong> Drag the PDF from Finder
              onto the CentProof window. Anywhere on the window works.
            </li>
            <li>
              <strong>Add Statement button.</strong> Click the{" "}
              <em>Add Statement</em> button (top-left) or press{" "}
              <code className="rounded bg-[#F1F5F9] px-1.5 py-0.5 text-[0.92em]">⌘ N</code>{" "}
              and pick the file from the standard Mac file picker.
            </li>
          </ul>
          <p>
            CentProof reads the PDF&apos;s text, identifies which bank
            it&apos;s from, extracts every transaction, and runs the
            math against the opening and closing balance the statement
            prints. All of this happens locally on your Mac in a few
            seconds — no upload, no network call, no aggregator
            involved.
          </p>
          <p>
            <strong>If your bank isn&apos;t supported yet</strong>{" "}
            (CentProof launched with nine major US banks; more are
            added in maintenance releases), you&apos;ll see a dialog
            with three choices: cancel, try a generic best-effort
            extraction, or send us a redacted sample so we can add a
            verified parser. See{" "}
            <Link
              href="/docs/importing-statements"
              className="font-semibold text-[#0F766E] hover:underline"
            >
              Importing statements
            </Link>{" "}
            for the full walkthrough.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            4. Review the import
          </h2>
          <p>
            After parsing, CentProof opens the Review screen. The left
            half shows the original PDF; the right half shows what
            CentProof extracted:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Account Summary panel</strong> — opening balance,
              closing balance, and a line-by-line breakdown that
              mirrors the statement&apos;s own summary block (e.g. for
              Chase Total Checking: <em>Deposits and Additions</em>,{" "}
              <em>ATM &amp; Debit Card Withdrawals</em>, etc.).
            </li>
            <li>
              <strong>Transactions table</strong> — every row CentProof
              extracted, with date, description, amount, and direction
              (debit/credit).
            </li>
            <li>
              <strong>Reconciliation status</strong> — green ✓ if the
              math works to the cent, red ✗ otherwise.
            </li>
          </ul>
          <p>
            The big green ✓ is the key signal. It means: opening
            balance + credits − debits = closing balance, exactly. If
            you see it, the data CentProof extracted matches what your
            bank printed. You can trust the rest.
          </p>
          <p>
            If you see a red ✗ instead, the math is off — usually
            because the parser missed a row or grabbed an extra one.
            See{" "}
            <Link
              href="/docs/reviewing-reconciling"
              className="font-semibold text-[#0F766E] hover:underline"
            >
              Reviewing and reconciling
            </Link>{" "}
            for what to do.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            5. Commit
          </h2>
          <p>
            Click <em>Commit</em> at the bottom of the Review screen.
            CentProof saves the statement and its transactions to a
            local SQLite database (in{" "}
            <code className="rounded bg-[#F1F5F9] px-1.5 py-0.5 text-[0.92em]">~/Library/Application Support/com.javamantra.pdfapp/</code>),
            encrypts a copy of the PDF for offline reference, and
            takes you to the Transactions tab.
          </p>
          <p>
            That&apos;s the loop. The next month&apos;s statement
            follows the same five steps — except by then, CentProof
            has learned your merchants and most rows auto-categorize.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            What to do next
          </h2>
          <p>
            Once you have a few statements imported, the most
            valuable next move is to tag a few transactions so future
            imports auto-categorize them. See{" "}
            <Link
              href="/docs/tagging-entities-categories"
              className="font-semibold text-[#0F766E] hover:underline"
            >
              Tagging entities and categories
            </Link>
            .
          </p>
          <p>
            Then try{" "}
            <Link
              href="/docs/ask-centproof"
              className="font-semibold text-[#0F766E] hover:underline"
            >
              Ask CentProof
            </Link>{" "}
            with a plain-English question about your spending. The
            answer comes back with source rows, all computed locally on
            your Mac — no cloud calls.
          </p>

          <div className="mt-12 flex flex-wrap gap-3 rounded-2xl border border-[#0F766E]/30 bg-[#ECFDF5] p-6">
            <div className="flex-1 min-w-[240px]">
              <p className="text-sm font-semibold text-[#0F172A]">
                Ready to start?
              </p>
              <p className="mt-1 text-sm leading-6 text-[#475569]">
                Download is free. Free Test Mode handles 2 active
                statements and 5 lifetime imports — enough to verify
                CentProof works on your bank before deciding whether to
                upgrade.
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
