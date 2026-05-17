import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title:
    "PDF statement formats by bank — why every one looks different",
  description:
    "A field guide to how major US banks lay out their monthly PDF statements. Why each bank looks different, what's the same underneath, and which quirks make automated parsing tricky for which banks. Useful for anyone building bank-statement tooling.",
  alternates: {
    canonical: "/guides/pdf-statement-formats-by-bank",
  },
  openGraph: {
    title:
      "PDF statement formats by bank — why every one looks different",
    description:
      "How seven major US banks lay out their PDFs, what's the same underneath, and the parsing quirks each one has.",
    url: "/guides/pdf-statement-formats-by-bank",
    type: "article",
  },
};

export default function GuidePdfFormats() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        {/* Crumb -------------------------------------------------------- */}
        <nav className="text-xs text-[#64748B]">
          <Link href="/guides" className="hover:text-[#0F766E]">
            Guides
          </Link>{" "}
          <span aria-hidden>›</span>{" "}
          <span>PDF statement formats by bank</span>
        </nav>

        {/* Header ------------------------------------------------------- */}
        <header className="mt-6">
          <h1 className="text-4xl font-semibold tracking-tight text-[#0F172A] sm:text-5xl">
            PDF statement formats by bank — why every one looks
            different.
          </h1>
          <p className="mt-4 text-sm text-[#64748B]">
            ~9 min read · A field guide for anyone parsing US bank
            statements
          </p>
        </header>

        {/* TL;DR -------------------------------------------------------- */}
        <aside className="mt-8 rounded-2xl border border-[#0F766E]/30 bg-[#ECFDF5] p-5 text-sm leading-6 text-[#0F172A]">
          <strong className="font-semibold">TL;DR.</strong> All US
          bank statements describe the same four things (header,
          balance summary, transactions table, footer) but the visual
          layout is a brand decision the bank&apos;s marketing team
          made decades ago, frozen into legacy print templates that
          almost no one wants to update. The result: every bank&apos;s
          PDF looks completely different from the others, even though
          the underlying data is nearly identical. If you&apos;re
          building anything that reads these PDFs, the parsing work
          is more layout-archaeology than data engineering. We share
          the quirks we&apos;ve found in seven major US banks.
        </aside>

        {/* Body --------------------------------------------------------- */}
        <div className="prose-like mt-12 space-y-7 text-base leading-7 text-[#334155]">
          <p>
            If you&apos;ve ever opened your statements from different
            banks back-to-back, you&apos;ve probably noticed they look
            nothing alike. Bank of America&apos;s statement feels
            corporate and dense. Apple Card&apos;s reads like a
            consumer product brochure. Citi Costco&apos;s has a
            rewards-tracker column glued to every transaction row.
            Chase puts the summary in a bordered box up top; Discover
            scatters it across two pages.
          </p>
          <p>
            The interesting question is why. The data inside is
            essentially identical — every statement reports the same
            balance arithmetic, the same transaction columns, the
            same opening-and-closing math. So why does each layout
            look hand-drawn by a different designer?
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Why bank statements diverged
          </h2>
          <p>
            A few historical reasons stack on top of each other:
          </p>
          <ul className="ml-5 list-disc space-y-3">
            <li>
              <strong className="font-semibold text-[#0F172A]">
                The print era set the templates.
              </strong>{" "}
              Most bank-statement layouts trace back to the 1980s and
              90s when statements were mailed as paper. The print
              vendor and the bank&apos;s marketing department signed
              off on a layout that fit on letter-size paper with the
              bank&apos;s logo and address block in specific
              positions. PDFs just digitized those existing templates.
            </li>
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Regulation E forced certain disclosures.
              </strong>{" "}
              US federal law requires specific notices on bank and
              credit-card statements (error-resolution rights,
              billing-dispute instructions, late-payment warnings).
              Different banks interpret the layout requirements
              differently, but the legal text has to be there
              somewhere — which is why every statement has a
              fine-print page or two of dense legal language.
            </li>
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Co-branded cards inherit visual identity.
              </strong>{" "}
              Apple Card (issued by Goldman Sachs) looks nothing like
              Goldman&apos;s other products because Apple specified
              the design. Citi Costco Anywhere Visa has a
              Costco-themed rewards column. Most airline and hotel
              cards run their own visual treatment on top of the
              issuer&apos;s base template.
            </li>
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Internal templates rarely get updated.
              </strong>{" "}
              Statements are produced by a back-office system that
              generates millions of them per month. Every layout
              change requires QA across every account type, every
              edge case, every regional variant. The bias is
              overwhelmingly to leave the template alone.
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            What every statement has in common
          </h2>
          <p>
            Under the visual differences, every monthly statement
            obeys the same structure (covered in more depth in our{" "}
            <Link
              href="/guides/anatomy-of-a-bank-pdf-statement"
              className="text-[#0F766E] underline"
            >
              anatomy of a bank PDF statement
            </Link>{" "}
            guide):
          </p>
          <ol className="ml-5 list-decimal space-y-3">
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Header
              </strong>{" "}
              with account number (last 4), statement period, and
              your address.
            </li>
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Balance summary
              </strong>{" "}
              with opening / closing for checking or savings, or
              previous-balance / payments / purchases / new-balance
              for credit cards.
            </li>
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Transactions table
              </strong>{" "}
              with date, description, and amount per row.
            </li>
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Footer
              </strong>{" "}
              with required disclosures, customer-service contact
              info, and bank routing details.
            </li>
          </ol>
          <p>
            The reconciliation arithmetic also doesn&apos;t vary:
            balance summaries follow the same formula at every bank,
            and they always reconcile to the cent against the
            transaction rows. This is the foundation that makes
            statement-based finance tooling possible in the first
            place.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            The quirks that make parsing fun
          </h2>
          <p>
            This is the part of the project that took us most by
            surprise — every bank has its own pdf.js / OCR / regex
            obstacle course. A non-exhaustive tour:
          </p>

          <h3 className="mt-8 text-xl font-semibold text-[#0F172A]">
            Bank of America (checking)
          </h3>
          <p>
            BoA Adv Plus statements bundle multiple accounts (checking
            + savings) into a single PDF. You can&apos;t just parse
            the file — you have to slice it by account first, find
            the right summary block for each, then run the
            reconciliation per account. The account boundaries are
            implicit, signaled by bolded section headers buried in the
            middle of the document.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-[#0F172A]">
            Chase (checking and credit card)
          </h3>
          <p>
            Chase has the cleanest layout of the major banks —
            consistent column positions, predictable summary box at
            the top, dates that always fit a single format. The catch
            is that Chase&apos;s &quot;Checking Summary&quot; may
            include up to six different categories of debit (Checks
            Paid, ATM &amp; Debit Card Withdrawals, Electronic
            Withdrawals, Other Withdrawals, Fees, plus the standard
            Deposits and Additions), only some of which appear on any
            given statement. A parser has to handle the conditional
            presence of each label.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-[#0F172A]">
            Citi (Costco Anywhere Visa specifically)
          </h3>
          <p>
            The Costco Visa is the parser nightmare we wrote{" "}
            <Link
              href="/changelog"
              className="text-[#0F766E] underline"
            >
              a whole release
            </Link>{" "}
            around (v0.1.5 if you&apos;re following the changelog).
            The right-side &quot;Costco Cash Back Rewards Summary&quot;
            column is at the same vertical position as the transaction
            table, so pdf.js extracts items in Y order and glues the
            rewards-column text onto every transaction line. Result:
            an APPLE.COM/BILL $2.99 charge gets the &quot;Year to
            Date : $58.86&quot; rewards balance glued onto it, and a
            naive parser captures $58.86 as the transaction amount.
          </p>
          <p>
            Worse, the page-1 &quot;Account Summary&quot; panel is
            positioned to the right of the &quot;Late Payment
            Warning&quot; paragraph, so the labeled summary lines
            (Payments, Credits, Purchases) get merged into the warning
            text. Anchoring regexes at the start of a line breaks.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-[#0F172A]">
            Apple Card
          </h3>
          <p>
            Apple Card statements are produced by Apple, not Goldman
            Sachs, and they read like a consumer product spec:
            generous whitespace, no per-merchant clutter, transactions
            grouped under category headers. The data is clean and
            well-structured. The trade-off is that the typography is
            non-standard (custom Apple fonts that pdf.js sometimes
            renders as wrong glyphs) and the layout uses tabular
            spaces that look right visually but extract as
            non-breaking characters.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-[#0F172A]">
            American Express
          </h3>
          <p>
            Amex statements are dense and information-rich. They print
            the full merchant name plus a category code on every row,
            which is great for categorization but means transactions
            often span multiple lines in the PDF. A parser has to
            recognize that &quot;AMAZON.COM&quot; on line N and{" "}
            &quot;Seattle WA 98109&quot; on line N+1 belong to the
            same transaction.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-[#0F172A]">
            Discover
          </h3>
          <p>
            Discover&apos;s layout is unusual: the balance summary is
            on page 2, not page 1. Page 1 is a marketing-heavy
            overview with the Cashback rewards balance. A parser
            assuming the summary lives at the top will fail. Once
            you&apos;re past that, the transaction table itself is
            clean and consistent.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-[#0F172A]">
            Capital One
          </h3>
          <p>
            Capital One credit-card statements use a per-cardholder
            grouping that&apos;s standard within the issuer but
            unusual elsewhere: authorized-user transactions are
            listed under a separate sub-header before being rolled
            into the account total. A naive parser will either
            double-count (counting the sub-section AND the rolled-up
            total) or miss the authorized-user rows entirely.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Why this matters for tooling
          </h2>
          <p>
            If you&apos;re building anything that reads bank PDFs
            (we&apos;re biased — we built{" "}
            <Link href="/" className="text-[#0F766E] underline">
              CentProof
            </Link>{" "}
            on top of exactly this kind of layout-archaeology), the
            takeaway is that bank-PDF parsing is bank-specific work,
            not generic PDF work. Every bank you add support for is
            its own engineering project: get real sample statements,
            understand the layout quirks, write a parser that
            tolerates the typography weirdness, write a regression
            test that locks in the behavior, ship, watch for the
            next layout change.
          </p>
          <p>
            This is also why the apps that read bank PDFs tend to
            either (a) support a small number of major banks well,
            or (b) support a long list of banks with mediocre fidelity.
            There&apos;s a real cost to doing it well per-bank, and
            the cost doesn&apos;t amortize across banks.
          </p>
          <p>
            For everyone else (people who just want to understand
            their money): the divergent layouts are the reason
            mainstream finance apps don&apos;t read your PDF and the
            reason they want your bank password instead — it&apos;s
            structurally easier for them to log in as you than to
            parse twenty different statement formats.
          </p>
        </div>

        {/* CTA ----------------------------------------------------------- */}
        <aside className="mt-16 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#0F172A]">
              CentProof reads PDFs from nine major US banks today.
            </p>
            <p className="mt-1 text-sm text-[#475569]">
              No bank password required. Free Test Mode, then $49
              Pro Lifetime.
            </p>
          </div>
          <Link
            href="/banks"
            className="mt-4 inline-flex h-11 items-center justify-center rounded-lg bg-[#0F766E] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#115E59] sm:mt-0"
          >
            See supported banks
          </Link>
        </aside>

        {/* Related ------------------------------------------------------- */}
        <nav className="mt-10 flex flex-wrap items-center gap-4 text-sm">
          <Link
            href="/guides/anatomy-of-a-bank-pdf-statement"
            className="text-[#0F766E] hover:underline"
          >
            ← What&apos;s actually in a bank PDF statement
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
