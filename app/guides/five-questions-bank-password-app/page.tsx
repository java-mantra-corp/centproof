import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title:
    "Five questions to ask before you give an app your bank password",
  description:
    "A plain-English checklist for evaluating any personal-finance app that wants to log into your bank. Five questions about data storage, shutdown scenarios, and your ability to walk away — useful even if you decide to keep using the apps you already have.",
  alternates: {
    canonical: "/guides/five-questions-bank-password-app",
  },
  openGraph: {
    title:
      "Five questions to ask before you give an app your bank password",
    description:
      "A short, opinionated checklist for evaluating finance apps — written by the team behind CentProof.",
    url: "/guides/five-questions-bank-password-app",
    type: "article",
  },
};

export default function GuideFiveQuestions() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        {/* Crumb -------------------------------------------------------- */}
        <nav className="text-xs text-[#64748B]">
          <Link href="/guides" className="hover:text-[#0F766E]">
            Guides
          </Link>{" "}
          <span aria-hidden>›</span>{" "}
          <span>Five questions before you give an app your bank password</span>
        </nav>

        {/* Header -------------------------------------------------------- */}
        <header className="mt-6">
          <h1 className="text-4xl font-semibold tracking-tight text-[#0F172A] sm:text-5xl">
            Five questions to ask before you give an app your bank password.
          </h1>
          <p className="mt-4 text-sm text-[#64748B]">
            ~7 min read · Useful even if you decide to stick with the apps
            you already have
          </p>
        </header>

        {/* TL;DR --------------------------------------------------------- */}
        <aside className="mt-8 rounded-2xl border border-[#0F766E]/30 bg-[#ECFDF5] p-5 text-sm leading-6 text-[#0F172A]">
          <strong className="font-semibold">TL;DR.</strong> Most
          personal-finance apps that &quot;connect to your bank&quot; do one
          of two things: they store an OAuth token, or they store your
          actual username and password. Either way, your transaction
          history then lives on someone else&apos;s servers for as long
          as they exist. Before you click Connect, it&apos;s worth
          knowing exactly what you&apos;re agreeing to. Five questions
          worth answering — for any app, ours included.
        </aside>

        {/* Body ---------------------------------------------------------- */}
        <div className="prose-like mt-12 space-y-7 text-base leading-7 text-[#334155]">
          <p>
            Personal-finance apps are competing hard for your data right
            now, and most of them ask for the same thing: your bank
            login. The pitch is usually some version of &quot;connect
            your accounts and we&apos;ll handle the rest.&quot; Often
            that&apos;s fine. Sometimes it isn&apos;t. The hard part is
            that the trade-offs are buried inside terms-of-service
            documents most of us never read and aggregator agreements
            we don&apos;t see at all.
          </p>
          <p>
            We build a competing product (
            <Link href="/" className="text-[#0F766E] underline">
              CentProof
            </Link>
            ) that deliberately doesn&apos;t do bank-login at all — it
            works from PDF statements you already download. So we have
            an obvious bias here. But the five questions below are
            worth asking regardless of which app wins your business,
            including ours. If a vendor can&apos;t give clean answers,
            that&apos;s worth knowing.
          </p>

          {/* Q1 ---------------------------------------------------------- */}
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            1. Where does my actual bank password go?
          </h2>
          <p>
            There are really only three answers, and they have very
            different implications:
          </p>
          <ul className="ml-5 list-disc space-y-3">
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Stored in the app&apos;s database.
              </strong>{" "}
              Some apps still do this, especially when they integrate
              with banks that don&apos;t support OAuth. Your literal
              bank username and password sit encrypted on the
              vendor&apos;s servers, and the app logs into your bank
              website as if it were you. This is the worst-case
              scenario and the one most people assume is illegal — it
              isn&apos;t, but it does shift legal liability for
              unauthorised access to you in a way most people
              don&apos;t realise.
            </li>
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Sent to a third-party data aggregator.
              </strong>{" "}
              You enter your bank credentials into a popup, the popup
              is hosted by a data-aggregator service (the same handful
              of companies power most consumer finance apps), and the
              aggregator stores either a token or your password,
              depending on whether your bank supports modern OAuth
              flows. Roughly half of US banks still don&apos;t.
            </li>
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Stored in your bank&apos;s OAuth system, never in the
                app.
              </strong>{" "}
              When this works, it works the way Google Sign-In does:
              the app gets a revocable token, your password never
              leaves the bank&apos;s domain, and you can disconnect
              from your bank&apos;s side. This is the best case. It
              also requires both your bank and your app to support it,
              which is far from universal.
            </li>
          </ul>
          <p>
            The honest question to ask: <em>which of these three is
            actually happening for my bank, today?</em> The app&apos;s
            marketing page rarely says.
          </p>

          {/* Q2 ---------------------------------------------------------- */}
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            2. What does the &quot;you authorised this&quot; page in
            my bank&apos;s online portal say?
          </h2>
          <p>
            Most US banks have a page deep inside online banking that
            lists every third party currently authorised to read your
            account. It&apos;s usually called something like Connected
            Apps, Data Access, or Linked Services. It&apos;s worth
            finding, and it&apos;s often eye-opening — many people are
            surprised to discover an app they signed up for years ago
            still has read access to their account.
          </p>
          <p>
            More interestingly: read what the bank actually says about
            that access. Most of them spell out, in plain language,
            that giving an aggregator your credentials shifts liability
            for unauthorised transactions in ways that go beyond what
            Regulation E protects. That&apos;s not legal advice — it&apos;s
            just what your own bank tells you when you read past the
            second paragraph.
          </p>

          {/* Q3 ---------------------------------------------------------- */}
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            3. Where does my transaction history actually live?
          </h2>
          <p>
            Cloud-sync apps need a place to store all the transactions
            they fetch on your behalf. That place is the vendor&apos;s
            servers — typically AWS, GCP, or Azure regions of their
            choosing — for as long as you have an account. Some store
            it in plaintext, some encrypted at rest, some claim
            client-side encryption with keys only you hold (read those
            architecture pages carefully).
          </p>
          <p>
            The relevant question isn&apos;t which cloud they use.
            It&apos;s this: if their database were leaked tomorrow,
            would your financial history be inside it? For most cloud-
            sync apps the answer is yes, simply because the whole point
            of the service is fetching and storing that data for you.
            A breach affects every customer at once. Local-first apps
            move the data — and the breach risk — back to your own
            machine; the trade-off is that backups become your own
            problem.
          </p>

          {/* Q4 ---------------------------------------------------------- */}
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            4. What happens to my data if the app shuts down or gets
            acquired?
          </h2>
          <p>
            Consumer finance software has a long history of shutdowns,
            acquisitions, and pivots. A friend&apos;s favourite tool
            from 2018 may not exist in 2026. The relevant questions for
            you, the user, are practical:
          </p>
          <ul className="ml-5 list-disc space-y-3">
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Can you export everything?
              </strong>{" "}
              Look for a real export — CSV, OFX, QFX, JSON — not just
              a printable summary report. The export should include
              every transaction, your categorisation work, and any
              notes you&apos;ve added.
            </li>
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Will the export still be available after the shutdown
                date?
              </strong>{" "}
              Most companies give 30-60 days. After that, the data
              goes to whoever bought the assets, or to deletion if the
              shutdown was clean.
            </li>
            <li>
              <strong className="font-semibold text-[#0F172A]">
                Does the export include your bank-credential tokens?
              </strong>{" "}
              Of course not — and that&apos;s the bigger issue. Even
              if you save your CSV, you have to start over with a
              different tool, re-connect your banks, and re-do your
              categorisation work from scratch.
            </li>
          </ul>

          {/* Q5 ---------------------------------------------------------- */}
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            5. Can I walk away with my data — including my work — at
            any time?
          </h2>
          <p>
            This is question 4 phrased as a present-tense, ongoing
            promise instead of a hypothetical. The good vendors let
            you export your data at any time, in standard formats, no
            customer-service ticket required. That export should
            preserve your <em>work</em>, not just your raw transactions
            — the merchant cleanup, the categories you built, the
            notes you attached, the rules you wrote.
          </p>
          <p>
            If walking away from a finance app means losing years of
            categorisation work, you&apos;re not really a customer —
            you&apos;re locked in. The simplest test: download the
            export today, open it, and see if you could rebuild your
            current workflow somewhere else if you had to. If you
            can&apos;t, that&apos;s worth knowing while you&apos;re
            still happy.
          </p>

          {/* Closing ----------------------------------------------------- */}
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            What if you don&apos;t want to answer these at all?
          </h2>
          <p>
            One way to make all five questions go away is to use a
            finance tool that never asks for your bank credentials in
            the first place. We built{" "}
            <Link href="/" className="text-[#0F766E] underline">
              CentProof
            </Link>{" "}
            because we wanted exactly that — a Mac app that reads the
            PDF statements your bank already emails you, reconciles
            them to the cent, and keeps everything in a local SQLite
            database. No bank password. No cloud sync. Local AI for
            questions and merchant cleanup. The trade-off is that you
            have to drag in a PDF once a month instead of waiting for
            a cloud sync to fetch it. For a lot of people, that
            trade-off is worth it.
          </p>
          <p>
            Whether you end up using CentProof or not, the five
            questions still apply to every finance app you use. The
            ones that can answer them cleanly are the ones worth
            trusting with your money.
          </p>
        </div>

        {/* CTA ----------------------------------------------------------- */}
        <aside className="mt-16 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#0F172A]">
              CentProof: a Mac app that reads your bank PDFs, not your
              bank password.
            </p>
            <p className="mt-1 text-sm text-[#475569]">
              Free Test Mode, no signup required. Pro Lifetime $49.
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
