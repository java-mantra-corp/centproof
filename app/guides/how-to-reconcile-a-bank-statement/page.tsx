import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title:
    "How to reconcile a bank statement (without spreadsheets)",
  description:
    "A plain-English walkthrough of bank-statement reconciliation: what it is, why it matters, the only formula you actually need to remember, and three different ways to do it depending on how much you want to do by hand.",
  alternates: {
    canonical: "/guides/how-to-reconcile-a-bank-statement",
  },
  openGraph: {
    title:
      "How to reconcile a bank statement (without spreadsheets)",
    description:
      "The plain-English version: what reconciliation actually means, the one formula you need, and the three workflows people use.",
    url: "/guides/how-to-reconcile-a-bank-statement",
    type: "article",
  },
};

export default function GuideReconcile() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        {/* Crumb -------------------------------------------------------- */}
        <nav className="text-xs text-[#64748B]">
          <Link href="/guides" className="hover:text-[#0F766E]">
            Guides
          </Link>{" "}
          <span aria-hidden>›</span>{" "}
          <span>How to reconcile a bank statement</span>
        </nav>

        {/* Header ------------------------------------------------------- */}
        <header className="mt-6">
          <h1 className="text-4xl font-semibold tracking-tight text-[#0F172A] sm:text-5xl">
            How to reconcile a bank statement (without spreadsheets).
          </h1>
          <p className="mt-4 text-sm text-[#64748B]">
            ~8 min read · For anyone who wants the receipts to actually
            match
          </p>
        </header>

        {/* TL;DR -------------------------------------------------------- */}
        <aside className="mt-8 rounded-2xl border border-[#0F766E]/30 bg-[#ECFDF5] p-5 text-sm leading-6 text-[#0F172A]">
          <strong className="font-semibold">TL;DR.</strong>{" "}
          Reconciliation is checking that your records of money in and
          out match what your bank says. The formula is exactly:{" "}
          <em>
            opening balance + all credits − all debits = closing
            balance
          </em>
          . If those two numbers don&apos;t agree to the cent,
          something is missing or duplicated. You can do this by hand,
          in a spreadsheet, or with software. All three approaches use
          the same arithmetic. The difference is how much typing
          you&apos;re willing to do.
        </aside>

        {/* Body --------------------------------------------------------- */}
        <div className="prose-like mt-12 space-y-7 text-base leading-7 text-[#334155]">
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            What &quot;reconciliation&quot; actually means
          </h2>
          <p>
            Reconciliation is the boring word for a fairly important
            thing: do your records and your bank&apos;s records
            describe the same set of transactions? It&apos;s the
            financial-software equivalent of double-checking that the
            numbers you read out loud match the numbers on the page.
          </p>
          <p>
            For a checking or savings account, the question is whether
            every deposit and withdrawal you know about appears on the
            statement, and whether every transaction on the statement
            matches something you remember. For a credit card,
            it&apos;s the same question framed differently: did your
            purchases and payments produce the new balance the bank is
            claiming?
          </p>
          <p>
            The reason this matters even if you trust your bank: banks
            occasionally get things wrong (returned payments that
            never get unposted, duplicate Zelle pulls, paper-check
            posting delays, ATM withdrawals that net out incorrectly).
            More commonly, <em>you</em> remember a transaction
            differently than it landed (you split a restaurant bill
            and forgot the Venmo received hasn&apos;t come through
            yet). Reconciliation makes the discrepancy visible while
            it&apos;s still small.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            The only formula you need
          </h2>
          <p>For a checking or savings account:</p>
          <pre className="overflow-x-auto rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-sm leading-6 text-[#0F172A]">
            <code>
              {`opening balance
+ sum of all credits (deposits, transfers in, interest)
− sum of all debits  (checks, withdrawals, fees, transfers out)
= closing balance`}
            </code>
          </pre>
          <p>For a credit card:</p>
          <pre className="overflow-x-auto rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-sm leading-6 text-[#0F172A]">
            <code>
              {`previous balance
+ purchases + cash advances + fees + interest
− payments − credits (refunds, statement credits)
= new balance`}
            </code>
          </pre>
          <p>
            If both sides agree to the cent, you&apos;re reconciled.
            If they don&apos;t, something is missing or duplicated —
            and the gap is exactly the amount you need to track down.
            Even a $0.01 difference matters; it almost always points
            to a transaction you typed in twice, an amount you got
            backwards, or a transaction your bank posted in a
            different period than you thought.
          </p>

          {/* Method 1 ---------------------------------------------------- */}
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Method 1: by hand (the calculator-and-statement approach)
          </h2>
          <p>This is the oldest and most reliable method:</p>
          <ol className="ml-5 list-decimal space-y-3">
            <li>
              Print or open the statement PDF. Find the opening
              balance and the closing balance — they&apos;re usually
              labelled and bolded at the top.
            </li>
            <li>
              Pick one column to be your &quot;credits&quot; column
              and another to be &quot;debits.&quot; Highlight every
              transaction on the statement, classifying each one.
            </li>
            <li>
              Add up the credits. Add up the debits. Take{" "}
              <em>opening + credits − debits</em>.
            </li>
            <li>
              If the result matches the closing balance, you&apos;re
              done. If not, look for: transactions split across
              statement-period boundaries, sign errors (debits typed
              as credits), or fees you didn&apos;t know about.
            </li>
          </ol>
          <p>
            This method takes 15-30 minutes per statement and is
            tedious enough that almost no one does it monthly. But it
            teaches you what the math looks like, which is useful
            context when software disagrees with you later.
          </p>

          {/* Method 2 ---------------------------------------------------- */}
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Method 2: spreadsheet (the patient-person approach)
          </h2>
          <p>
            The middle-ground method. You type every transaction into
            a spreadsheet — one row per transaction with a Date,
            Description, Credit, Debit, and a running Balance column.
            Set a formula at the bottom that computes opening +
            sum(credits) − sum(debits) and compares it to the closing
            balance.
          </p>
          <p>The catch: data entry is brittle.</p>
          <ul className="ml-5 list-disc space-y-3">
            <li>
              One mistyped digit and the spreadsheet says everything
              checks out but the real reconciliation is off.
            </li>
            <li>
              Bank-provided CSV exports (if your bank offers them) help
              but rarely use the same column layout as your spreadsheet
              — you spend more time importing than reconciling.
            </li>
            <li>
              Quarterly summaries require copy-pasting across three
              monthly tabs and the formulas tend to break when you
              move rows.
            </li>
          </ul>
          <p>
            For a single account checked once a year (tax time),
            spreadsheets are fine. For multiple accounts checked every
            month, the friction adds up fast.
          </p>

          {/* Method 3 ---------------------------------------------------- */}
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Method 3: software (the read-the-PDF approach)
          </h2>
          <p>
            The third way is to use software that reads the same PDF
            your bank already sends you, extracts every transaction
            automatically, runs the reconciliation formula, and only
            shows you a problem when one exists.
          </p>
          <p>
            This is what{" "}
            <Link href="/" className="text-[#0F766E] underline">
              CentProof
            </Link>{" "}
            does. Drop in a PDF, get a reconciliation pass or fail
            within seconds. If the formula doesn&apos;t balance,
            CentProof shows you the discrepancy by name (purchases
            differ from the row sum by $51.22, or payments are missing
            $4,364.50) and lets you decide whether to commit the
            statement with a manual-override note for your own
            records.
          </p>
          <p>
            There are other tools that do this too — most of the
            mainstream personal-finance apps reconcile silently as
            part of their bank-sync process. The trade-off is that
            those tools want you to give them your bank password and
            store your transaction history on their servers, which is
            the topic of{" "}
            <Link
              href="/guides/five-questions-bank-password-app"
              className="text-[#0F766E] underline"
            >
              this other guide
            </Link>
            . CentProof skips that side of the trade entirely by
            reading the PDFs locally on your Mac.
          </p>

          {/* When reconciliation finds a problem ------------------------- */}
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            What to do when reconciliation fails
          </h2>
          <p>
            A failed reconciliation isn&apos;t a disaster — it&apos;s
            information. The math is telling you that something is
            inconsistent between the statement and your records (or,
            occasionally, that the statement&apos;s own internal math
            disagrees with itself; this happens more often than you
            might think, usually around posting-date edge cases).
          </p>
          <p>The diagnostic order that works:</p>
          <ol className="ml-5 list-decimal space-y-3">
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Confirm the period boundaries.
              </strong>{" "}
              The most common cause of a small failed reconciliation
              is a transaction your bank posted on the first or last
              day of the statement period that you remembered as
              belonging to the previous or next month.
            </li>
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Look for sign errors.
              </strong>{" "}
              A debit typed as a credit (or vice versa) shows up as a
              gap equal to <em>twice</em> the transaction amount,
              which is suspicious-looking and usually leads you right
              to the row.
            </li>
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Search for the exact gap amount.
              </strong>{" "}
              If reconciliation says you&apos;re off by $145.32,
              there&apos;s usually a single transaction for $145.32
              that&apos;s either missing or duplicated. Search your
              statement for that string.
            </li>
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Check for fees you didn&apos;t know about.
              </strong>{" "}
              Foreign-transaction fees, ATM fees, and monthly account
              maintenance fees often appear on a separate line that
              the casual reader misses.
            </li>
          </ol>
          <p>
            If you genuinely can&apos;t close the gap and the
            statement&apos;s own math doesn&apos;t add up, that&apos;s
            a real bank-side error. Call the number on the statement
            and have them walk through the period with you. It happens.
          </p>

          {/* Why bother --------------------------------------------------- */}
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Why bother at all
          </h2>
          <p>
            If you&apos;re curious why anyone reconciles when their
            bank already has a closing balance they trust: the point
            isn&apos;t to find the closing balance. The point is to
            verify the <em>composition</em> of how you got there.
            Reconciliation is what makes &quot;I spent $130 on
            groceries last month&quot; a number you can stand behind
            instead of an estimate.
          </p>
          <p>
            For freelancers and 1099 workers, this matters at tax
            time: every deductible expense needs a transaction-level
            receipt, and reconciliation is the audit trail that
            connects the deduction to the bank record. For couples
            splitting expenses, reconciliation is the difference
            between an honest settlement and a passive-aggressive
            spreadsheet argument. For people who just want to know
            where their money actually went, it&apos;s the only way to
            be sure.
          </p>
        </div>

        {/* CTA ----------------------------------------------------------- */}
        <aside className="mt-16 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#0F172A]">
              CentProof reconciles every PDF you import — automatically,
              locally, to the cent.
            </p>
            <p className="mt-1 text-sm text-[#475569]">
              Free Test Mode, no signup. Pro Lifetime $49.
            </p>
          </div>
          <Link
            href="/download"
            className="mt-4 inline-flex h-11 items-center justify-center rounded-lg bg-[#0F766E] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#115E59] sm:mt-0"
          >
            Download for Mac
          </Link>
        </aside>

        {/* Related ------------------------------------------------------- */}
        <nav className="mt-10 flex flex-wrap items-center gap-4 text-sm">
          <Link
            href="/guides/five-questions-bank-password-app"
            className="text-[#0F766E] hover:underline"
          >
            ← Five questions before you give an app your bank password
          </Link>
          <span className="text-[#CBD5E1]">·</span>
          <Link href="/guides" className="text-[#0F766E] hover:underline">
            All guides
          </Link>
        </nav>
      </article>
    </PageShell>
  );
}
