import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "What's actually in a bank PDF statement",
  description:
    "Inside the document every bank sends you each month: the four sections that always appear, the two reconciliation formulas that make 'reconciliation to the cent' possible, and what varies between banks. Useful even if you never touch CentProof.",
  alternates: { canonical: "/guides/anatomy-of-a-bank-pdf-statement" },
  openGraph: {
    title: "What's actually in a bank PDF statement",
    description:
      "The structure, the math, and what varies between banks — explained without jargon.",
    url: "/guides/anatomy-of-a-bank-pdf-statement",
    type: "article",
  },
};

export default function GuideAnatomyBankStatement() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        {/* Crumb + hero ------------------------------------------------ */}
        <nav className="text-xs text-[#64748B]">
          <Link href="/guides" className="hover:text-[#0F766E]">
            Guides
          </Link>{" "}
          <span aria-hidden>›</span>{" "}
          <span>Anatomy of a bank PDF statement</span>
        </nav>

        <header className="mt-6">
          <h1 className="text-4xl font-semibold tracking-tight text-[#0F172A] sm:text-5xl">
            What's actually in a bank PDF statement
          </h1>
          <p className="mt-4 text-sm text-[#64748B]">
            ~8 min read · Useful even if you never touch CentProof
          </p>
        </header>

        {/* TL;DR --------------------------------------------------------- */}
        <aside className="mt-8 rounded-2xl border border-[#0F766E]/30 bg-[#ECFDF5] p-5 text-sm leading-6 text-[#0F172A]">
          <strong className="font-semibold">TL;DR.</strong> Every monthly
          bank or credit-card PDF statement has the same four parts: a
          header, a balance summary, a transactions table, and a footer.
          The balance summary obeys a strict arithmetic identity. The
          transactions table follows a small set of column conventions
          that vary a little between banks but rarely between months at
          the same bank. Once you can see the document this way, building
          a private, local-first finance tool around it becomes a
          tractable engineering problem instead of a guessing game.
        </aside>

        {/* Body ---------------------------------------------------------- */}
        <div className="prose-like mt-12 space-y-7 text-base leading-7 text-[#334155]">
          <p>
            Most people never look closely at the document their bank
            emails them every month. It shows up, it has the right
            balance on it, you file it. But if you sit with one for ten
            minutes, you find that it's structured, machine-readable,
            and surprisingly consistent across banks. That structure is
            the entire reason a Mac app like CentProof can take a stack
            of PDFs and turn them into a reconciled, searchable, locally
            stored ledger — without ever asking for your bank password.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            The four parts that always appear
          </h2>
          <p>
            Pick any monthly statement — Chase, Wells Fargo, Bank of
            America, Apple Card, Capital One, Citi, Discover, US Bank.
            You'll find the same four sections, in the same order:
          </p>
          <ol className="ml-5 list-decimal space-y-3">
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Header.
              </strong>{" "}
              Bank name and address, your name and address, the account
              identifier (usually the last four digits), and the
              statement period (e.g.{" "}
              <em>June 1, 2026 — June 30, 2026</em>).
            </li>
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Balance summary.
              </strong>{" "}
              For checking and savings: opening balance, total credits,
              total debits, closing balance. For credit cards: previous
              balance, payments and credits, purchases and adjustments,
              fees, interest, new balance.
            </li>
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Transactions table.
              </strong>{" "}
              The bulk of the document. One row per transaction, with
              columns that vary slightly between banks but always
              include at least date, description, and amount.
            </li>
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Footer.
              </strong>{" "}
              Disclaimers, dispute instructions, contact info,
              regulatory legalese. Useful for legal context, mostly
              irrelevant to the data inside.
            </li>
          </ol>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            The reconciliation identity
          </h2>
          <p>
            The balance summary isn't decorative. It's a mathematical
            identity that the transactions table has to satisfy exactly,
            to the cent. There are two variants depending on account
            type.
          </p>
          <p className="font-semibold text-[#0F172A]">
            Checking / savings:
          </p>
          <pre className="overflow-x-auto rounded-xl bg-[#0F172A] p-4 font-mono text-sm leading-6 text-[#CBD5E1]">
{`opening_balance
  + sum(credits)
  - sum(debits)
= closing_balance`}
          </pre>
          <p className="font-semibold text-[#0F172A]">Credit card:</p>
          <pre className="overflow-x-auto rounded-xl bg-[#0F172A] p-4 font-mono text-sm leading-6 text-[#CBD5E1]">
{`previous_balance
  + purchases
  + cash_advances
  + balance_transfers
  + fees
  + interest
  - payments
  - refunds
= new_balance`}
          </pre>
          <p>
            If your sum of transactions doesn't match the printed
            closing balance to the cent, either the bank made an error
            (rare) or you parsed something wrong (common). For a finance
            tool, that's a free correctness check: refuse to commit any
            statement to the database unless the math reconciles. CentProof
            calls this the <em>reconciliation gate</em>, and we treat any
            penny of difference as a hard failure.
          </p>
          <p>
            It's also why "to the cent" matters as a product claim — you
            either match the bank's printed total exactly, or you don't.
            There's no spectrum.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            What's in a single transaction row
          </h2>
          <p>
            Every transaction row carries the same few facts, dressed up
            slightly differently per bank:
          </p>
          <ul className="ml-5 list-disc space-y-2">
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Transaction date
              </strong>{" "}
              — when the transaction occurred. For credit cards, you'll
              often also see a <em>posting date</em>, which is when the
              bank actually applied it. The two can differ by a few
              days.
            </li>
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Raw description
              </strong>{" "}
              — the merchant string the bank received from the payment
              network, often messy. Real examples:{" "}
              <code className="rounded bg-[#F1F5F9] px-1.5 py-0.5 font-mono text-xs">
                AMZN MKTP US*RT5R86Z01
              </code>{" "}
              ·{" "}
              <code className="rounded bg-[#F1F5F9] px-1.5 py-0.5 font-mono text-xs">
                STARBUCKS #1234 SEATTLE WA
              </code>{" "}
              ·{" "}
              <code className="rounded bg-[#F1F5F9] px-1.5 py-0.5 font-mono text-xs">
                Goodleap 14 Agnt Pymnt xxxxx0352
              </code>
              . This is the field every finance app has to clean up
              before showing it to a human.
            </li>
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Amount
              </strong>{" "}
              — usually printed as a positive number in the column it
              belongs in. The sign comes from <em>which column</em> it's
              in, not from a minus symbol.
            </li>
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Direction
              </strong>{" "}
              — debit (money out) or credit (money in). Inferred from
              the column for checking; inferred from the row's position
              (purchases vs payments) for credit cards.
            </li>
            <li>
              Optional, depending on bank:{" "}
              <strong>check number</strong> (for written checks),{" "}
              <strong>merchant city/state</strong>, and{" "}
              <strong>reference number</strong>.
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            What varies between banks
          </h2>
          <p>
            Banks all use the same{" "}
            <em>structure</em>, but the surface differs. This is why
            generic "import any statement" tools usually disappoint:
          </p>
          <ul className="ml-5 list-disc space-y-2">
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Column order
              </strong>{" "}
              — date first, or amount first, or description in the
              middle. No standard.
            </li>
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Date format
              </strong>{" "}
              —{" "}
              <code className="rounded bg-[#F1F5F9] px-1 font-mono text-xs">
                MM/DD
              </code>
              ,{" "}
              <code className="rounded bg-[#F1F5F9] px-1 font-mono text-xs">
                MM/DD/YY
              </code>
              ,{" "}
              <code className="rounded bg-[#F1F5F9] px-1 font-mono text-xs">
                MM/DD/YYYY
              </code>
              , or "June 14". Same data, four conventions.
            </li>
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Multi-account statements
              </strong>{" "}
              — Bank of America and Wells Fargo combine checking +
              savings (sometimes credit) in a single statement file.
              Chase and Capital One usually don't.
            </li>
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Page boundaries
              </strong>{" "}
              — long statements wrap transactions across pages. Some
              banks repeat the column headers on every page; others
              don't.
            </li>
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Year inference at year-end
              </strong>{" "}
              — a statement covering Dec 28 → Jan 26 has transactions
              with two different years. The PDF only prints{" "}
              <code className="rounded bg-[#F1F5F9] px-1 font-mono text-xs">
                MM/DD
              </code>{" "}
              on each row; the parser has to decide which year each row
              belongs to.
            </li>
          </ul>
          <p>
            That's why a serious finance tool keeps a parser per bank,
            updates them when banks change format, and uses
            reconciliation as the correctness check rather than hoping
            the parse "looks right."
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Why this format makes a local-first app possible
          </h2>
          <p>
            Three properties of the PDF statement combine to make a
            privacy-led design viable:
          </p>
          <ul className="ml-5 list-disc space-y-2">
            <li>
              <strong className="font-semibold text-[#0F172A]">
                It's durable.
              </strong>{" "}
              The bank already gave it to you. There's no API call to
              expire, no token to refresh, no agreement to renegotiate.
              You can re-import the same statement on a new machine ten
              years from now.
            </li>
            <li>
              <strong className="font-semibold text-[#0F172A]">
                It carries its own provenance.
              </strong>{" "}
              The file itself is the evidence. Every row in a parsed
              ledger can be linked back to{" "}
              <em>this file, this page, this position on the page</em> —
              auditable without any external service.
            </li>
            <li>
              <strong className="font-semibold text-[#0F172A]">
                It doesn't require credentials.
              </strong>{" "}
              You can analyze every dollar of your financial history
              without sharing a bank password with anyone, including the
              software you're using.
            </li>
          </ul>
          <p>
            Bank-sync workflows (the kind that connect to your account
            through a service like Plaid) are faster and require less
            user action. But they're cloud-shaped: someone other than
            you holds read-only credentials, your transactions live on
            their servers, and you depend on them staying in business
            and staying competent. PDF imports are slower per month, but
            they put the file — and therefore the data — in your
            possession permanently.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            How CentProof works against this structure
          </h2>
          <p>
            CentProof is just a careful application of the patterns
            above. When you drag in a statement:
          </p>
          <ol className="ml-5 list-decimal space-y-2">
            <li>
              The app detects the bank by fingerprinting the document.
            </li>
            <li>
              The matching parser reads the header, summary, and
              transactions.
            </li>
            <li>
              Reconciliation runs the appropriate identity above. If
              there's a one-cent difference, the import is held for
              review rather than committed silently.
            </li>
            <li>
              If reconciliation passes, the transactions go into a local
              SQLite database. The original PDF is encrypted and stored
              alongside it.
            </li>
            <li>
              From there, search, tagging, recurring detection, and the
              local-AI "Ask CentProof" feature all run on this local
              data. Nothing about the statement contents ever leaves
              your Mac.
            </li>
          </ol>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            One concrete takeaway
          </h2>
          <p>
            Even if you never use CentProof: when you open a bank PDF
            next month, look at the balance summary at the top and try
            to add the transactions yourself. It will work out to the
            penny. That property is what makes the document a viable
            data source. It's why "private finance, proved to the cent"
            isn't a slogan — it's a description of what the document
            already does.
          </p>
        </div>

        {/* Bottom CTA --------------------------------------------------- */}
        <div className="mt-16 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 sm:p-8">
          <h3 className="text-xl font-semibold tracking-tight text-[#0F172A]">
            Want to try this on your own statements?
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#475569]">
            CentProof runs locally on your Mac. Free Test Mode imports
            two statements without an account, login, or credit card.
            The reconciliation gate either passes or it doesn't — you
            decide what to do with the result.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/download"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0F766E] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#115E59]"
            >
              Download for Mac
            </Link>
            <Link
              href="/security"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-5 text-sm font-semibold text-[#0F172A] hover:border-[#0F766E] hover:text-[#0F766E]"
            >
              How CentProof handles your data →
            </Link>
            <Link
              href="/product"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-5 text-sm font-semibold text-[#0F172A] hover:border-[#0F766E] hover:text-[#0F766E]"
            >
              See features →
            </Link>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
