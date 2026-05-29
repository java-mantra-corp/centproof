import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Reviewing and reconciling",
  description:
    "What the Review screen is showing you, what reconciliation means in plain English, what each line in the Account Summary means, and what to do when a statement doesn't balance to the cent.",
  alternates: { canonical: "/docs/reviewing-reconciling" },
  openGraph: {
    title: "CentProof — Reviewing and reconciling",
    description:
      "Every screen, every status code, every recovery path on the Review screen.",
    url: "/docs/reviewing-reconciling",
    type: "article",
  },
};

export default function DocReviewing() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        <nav className="text-xs text-[#64748B]">
          <Link href="/docs" className="hover:text-[#0F766E]">
            Docs
          </Link>{" "}
          <span aria-hidden>›</span>{" "}
          <span>Reviewing and reconciling</span>
        </nav>

        <header className="mt-6">
          <h1 className="text-4xl font-semibold tracking-tight text-[#0F172A] sm:text-5xl">
            Reviewing and reconciling.
          </h1>
          <p className="mt-4 text-sm text-[#64748B]">
            ~6 min read · For anyone confirming an import before commit
          </p>
        </header>

        <aside className="mt-8 rounded-2xl border border-[#0F766E]/30 bg-[#ECFDF5] p-5 text-sm leading-6 text-[#0F172A]">
          <strong className="font-semibold">TL;DR.</strong> The Review
          screen shows you the original PDF on the left and what
          CentProof extracted on the right. The big green ✓ at the
          top of the right panel means{" "}
          <em>opening + credits − debits = closing balance</em>, to
          the cent, against what your bank printed. If you see ✓,
          click Commit. If you see ✗, the parser missed or double-
          counted something — usually a manual override with a one-
          line reason is the right move, and the discrepancy is worth
          a 30-second look.
        </aside>

        <div className="prose-like mt-12 space-y-7 text-base leading-7 text-[#334155]">
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            What &quot;reconciliation&quot; means here
          </h2>
          <p>
            Reconciliation is a boring word for an important question:{" "}
            <em>do the numbers I extracted match what the bank
            printed?</em>{" "}
            For a checking account, the formula is:
          </p>
          <pre className="overflow-x-auto rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-sm leading-6 text-[#0F172A]">
            <code>{`opening balance
+ sum of all credits  (deposits, transfers in, interest)
− sum of all debits   (withdrawals, checks, fees, card purchases)
= closing balance`}</code>
          </pre>
          <p>For a credit card:</p>
          <pre className="overflow-x-auto rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-sm leading-6 text-[#0F172A]">
            <code>{`previous balance
+ purchases + cash advances + fees + interest
− payments − credits  (refunds, statement credits)
= new balance`}</code>
          </pre>
          <p>
            If the math works out to the cent against the closing /
            new balance the bank prints on the statement,{" "}
            <strong>reconciliation is OK</strong>. If it doesn&apos;t,
            something was missed, double-counted, or mis-signed.
          </p>
          <p>
            For a longer explanation of why this matters, see{" "}
            <Link
              href="/guides/how-to-reconcile-a-bank-statement"
              className="font-semibold text-[#0F766E] hover:underline"
            >
              the reconciliation guide
            </Link>
            .
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            The Review screen layout
          </h2>
          <p>
            Two panels side by side:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Left — Source PDF.</strong> The original PDF the
              bank gave you, rendered page-by-page. Source bbox
              highlights show CentProof which row each extracted
              transaction came from when you hover a transaction on
              the right.
            </li>
            <li>
              <strong>Right — Extracted data.</strong> Account
              Summary panel at the top, Transactions table below.
              Reconciliation status at the top right.
            </li>
          </ul>
          <p>
            At the bottom: <em>Cancel</em>, <em>Commit</em>, and (if
            reconciliation failed) <em>Override &amp; commit</em>{" "}
            buttons.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            The Account Summary panel
          </h2>
          <p>
            CentProof mirrors your bank&apos;s own summary block
            line-for-line, so the panel reads top-to-bottom the same
            way the PDF does. For Chase Total Checking that looks
            like:
          </p>
          <pre className="overflow-x-auto rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-sm leading-6 text-[#0F172A]">
            <code>{`Beginning Balance                $142,646.55
Deposits and Additions            +$6,532.56
Checks Paid                          −$0.00   (omitted when zero)
ATM & Debit Card Withdrawals      −$1,100.00
Electronic Withdrawals            −$4,019.79
Other Withdrawals                 −$3,000.00
Fees                                 −$0.00   (omitted when zero)
Ending Balance                   $145,159.32`}</code>
          </pre>
          <p>
            For a credit card, the panel shows Previous Balance,
            Payments, Credits, Purchases, Cash Advances, Balance
            Transfers, Fees, Interest, and New Balance — whichever
            subset your bank prints that period. Lines with zero
            activity are omitted so the panel stays tight.
          </p>
          <p>
            <strong>What this is FOR:</strong> auditing. The panel
            lets you check the totals against the printed statement
            without scrolling through every transaction. If the
            Deposits and Additions total matches your bank&apos;s
            number to the cent, you know CentProof extracted every
            deposit correctly. Same for each row.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Reconciliation status: OK / Failed / Pending
          </h2>
          <p>
            One of three states appears at the top right:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>✓ OK</strong> — opening + credits − debits =
              closing balance, to the cent. The data CentProof
              extracted is internally consistent with the math your
              bank printed. Click Commit.
            </li>
            <li>
              <strong>✗ Failed</strong> — the math is off. The
              status line shows the diff in dollars and cents (e.g.{" "}
              <em>off by −$42.99</em>). See the next section for what
              to do.
            </li>
            <li>
              <strong>… Pending</strong> — temporary state while the
              parser is still running. You shouldn&apos;t see this
              for more than a second or two.
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            What to do when reconciliation fails
          </h2>
          <p>
            A failed reconciliation almost always means one of three
            things:
          </p>
          <ol className="list-decimal space-y-2 pl-6">
            <li>
              <strong>A row got missed.</strong> The parser skipped a
              transaction (often because it was on the boundary
              between two pages or had unusual formatting). The diff
              equals the missing amount.
            </li>
            <li>
              <strong>A row got duplicated.</strong> The parser
              double-counted a row (rare — usually a column-bleed
              issue on tricky layouts). The diff equals the extra
              amount.
            </li>
            <li>
              <strong>A sign flip.</strong> A credit got read as a
              debit or vice versa. The diff is twice the affected
              amount.
            </li>
          </ol>
          <p>
            Compare the Transactions table on the right to the
            statement on the left. Scroll through and look for the
            row that&apos;s missing or extra. If you find it: that&apos;s
            a parser bug worth reporting (email support@centproof.com
            with the redacted PDF; we&apos;ll ship a fix in the next
            maintenance release).
          </p>
          <p>
            <strong>If you need to commit anyway</strong> (e.g.
            you&apos;ve verified the data is good enough for your
            workflow even with a small unreconciled gap), click{" "}
            <em>Override &amp; commit</em>. You&apos;ll be asked for
            a one-line reason — &quot;parser missed 1 row of $42.99,
            reported to support&quot; is a fine reason. The override
            and its reason are stored on the statement so you have an
            audit trail later.
          </p>
          <p>
            <strong>Don&apos;t override blindly.</strong> The whole
            point of reconciliation is that you can trust the data
            downstream. If you override every time without
            investigating, the Search and Reports features build on
            data that might be wrong. Better to spend the 30 seconds
            finding the discrepancy.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Combined statements (multiple accounts)
          </h2>
          <p>
            Some banks (BoA Advantage Plus + Regular Savings, Wells
            Fargo combined) print multiple accounts in one PDF. The
            Review screen walks through them one at a time:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              Top of the panel shows <em>Account 1 of 2 → Account 2
              of 2</em> progress.
            </li>
            <li>
              Each account reconciles independently and gets its own
              Commit / Override action.
            </li>
            <li>
              Duplicates are auto-skipped within the same PDF — if
              you already imported account 1 from a prior session,
              CentProof skips to account 2.
            </li>
            <li>
              Cancel at any point and nothing is committed for that
              PDF.
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Source-row highlighting
          </h2>
          <p>
            Hover any transaction row in the right-side table and
            CentProof highlights the exact line in the left-side PDF
            where it came from. The bbox highlight has a yellow tint
            with an orange border — easy to find at a glance even
            when the PDF page is small.
          </p>
          <p>
            This is the &quot;show your work&quot; feature. Every
            transaction in CentProof can be traced back to the exact
            line on the exact page of the exact PDF it was extracted
            from. That trail survives commit and is reproducible
            forever via the encrypted PDF stored in the app data
            directory.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            What happens when you click Commit
          </h2>
          <p>
            After Commit:
          </p>
          <ol className="list-decimal space-y-2 pl-6">
            <li>
              CentProof writes the statement + all transactions to the
              local SQLite database.
            </li>
            <li>
              The PDF gets encrypted (AES-256-GCM with a key stored
              in macOS Keychain) and saved as a <code className="rounded bg-[#F1F5F9] px-1.5 py-0.5 text-[0.92em]">.bin</code> blob in the
              app data directory.
            </li>
            <li>
              Existing correction rules (from any previous tagging
              you&apos;ve done) auto-apply to the new rows. If you tagged
              &quot;STARBUCKS&quot; as a Coffee entity two months ago,
              every STARBUCKS row in this new statement is now tagged
              automatically.
            </li>
            <li>
              The AI suggestion phase runs in the background on any
              rows that aren&apos;t yet covered by a correction rule.
              (See{" "}
              <Link
                href="/docs/ask-centproof"
                className="font-semibold text-[#0F766E] hover:underline"
              >
                Ask CentProof
              </Link>
              .)
            </li>
            <li>
              The Review screen closes and you land on the Transactions
              tab with the new rows visible.
            </li>
          </ol>

          <div className="mt-12 flex flex-wrap gap-3 rounded-2xl border border-[#0F766E]/30 bg-[#ECFDF5] p-6">
            <div className="flex-1 min-w-[240px]">
              <p className="text-sm font-semibold text-[#0F172A]">
                Next: tag your first merchant
              </p>
              <p className="mt-1 text-sm leading-6 text-[#475569]">
                Entities, categories, and the &quot;tag once, applies
                forever&quot; workflow.
              </p>
            </div>
            <Link
              href="/docs/tagging-entities-categories"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0F766E] px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#115E59]"
            >
              Tagging entities and categories →
            </Link>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
