import type { Metadata } from "next";
import Link from "next/link";
import { FeatureCard, SectionIntro, TrustBadge } from "@/components/cards";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Direct support from Java Mantra Corp. Email support@centproof.com for license help, bug reports, bank parser requests, refunds, and privacy/security questions. Same-day reply on purchases; 2 business days otherwise.",
  alternates: { canonical: "/support" },
  openGraph: {
    title: "CentProof support",
    description:
      "License help, bug reports, bank parser requests, and refunds — handled directly by Java Mantra Corp.",
    url: "/support",
    type: "website",
  },
};

const SUPPORT_PROMISE = [
  {
    title: "License & purchase issues",
    body: "Same-day reply, US business days. Pre-paid problems are first in the queue.",
  },
  {
    title: "Bug reports & questions",
    body: "Reply within 2 US business days. Reproducible bugs are tracked and shipped in the next maintenance release.",
  },
  {
    title: "Bank parser requests",
    body: "Queued by demand and prioritized monthly. Submit a redacted PDF sample to bump your bank up the list.",
  },
  {
    title: "Refunds",
    body: "30-day no-questions-asked through LemonSqueezy. Just email us your order ID.",
  },
  {
    title: "Privacy & security questions",
    body: "Ask before you import real statements. We're happy to walk you through Apple notarization, local AI, encryption, and exactly what does and does not leave your Mac.",
  },
  {
    title: "Hours",
    body: "Monday through Friday, 9am–6pm Pacific Time. We do not promise weekend or holiday coverage today; we'd rather be honest than over-promise.",
  },
];

const supportSections = [
  {
    title: "License key didn't arrive",
    body: "Check spam, then email us your order ID and the email you used at checkout. We re-issue from LemonSqueezy on the same day.",
  },
  {
    title: "License key not accepting",
    body: "Open Preferences → License, paste the full string between the dashes (BEGIN/END style or one-liner). If verification fails, send us a screenshot and the version of CentProof.",
  },
  {
    title: "Bank parser request",
    body: "Use the bank-request form on our /banks page. We accept your bank name and email there; if we want a sample PDF we'll reply asking you to email a redacted one directly. Never paste statements into a web form.",
  },
  {
    title: "Refund request",
    body: "Email us your order ID within 30 days of purchase. We approve refunds the same business day; LemonSqueezy then returns the money to the original card in 5–10 days.",
  },
];

export default function SupportPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-[#0F766E]">Support</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight text-[#0F172A] sm:text-6xl">
            Support directly from Java Mantra Corp.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#475569]">
            CentProof is built and supported by a small, focused team. We
            choose to be reachable rather than hide behind phone trees.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:support@centproof.com?subject=CentProof%20support"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0F766E] px-4 text-sm font-semibold text-white hover:bg-[#115E59]"
            >
              support@centproof.com
            </a>
            <Link
              href="/banks#request"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#0F172A] hover:border-[#0F766E] hover:text-[#0F766E]"
            >
              Request a new bank →
            </Link>
            <Link
              href="/faq"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#0F172A] hover:border-[#0F766E] hover:text-[#0F766E]"
            >
              Read the FAQ
            </Link>
          </div>
          <p className="mt-6 text-xs text-[#64748B]">
            <strong>support@centproof.com</strong> is the single place to reach
            a human at Java Mantra Corp. We aim to acknowledge every email
            within one business day.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionIntro
            eyebrow="Our support promise"
            title="Honest commitments, not over-promises."
            body="Indie Mac apps in this price range typically promise email support on a best-effort basis. We do better than that on anything tied to a paid license, and we are upfront about what we can't promise."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SUPPORT_PROMISE.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <SectionIntro
          eyebrow="What we can help with"
          title="Common help topics."
          body="The fastest path is email with your CentProof version, a short reproduction, and any screenshots that show the problem."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {supportSections.map((section) => (
            <FeatureCard key={section.title} {...section} />
          ))}
        </div>
      </section>

      <section className="border-t border-[#FDE68A] bg-[#FFFBEB]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-14">
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#92400E]">
                AI disclaimer
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#92400E]">
                AI can make mistakes — please verify.
              </h2>
            </div>
            <div className="space-y-4 text-sm leading-7 text-[#92400E]">
              <p>
                CentProof uses local AI to power Ask CentProof, merchant
                cleanup suggestions, anomaly explanations, and
                what-changed summaries. These features are designed to
                surface patterns and accelerate your review — they are{" "}
                <strong>
                  not a substitute for checking the underlying source rows
                </strong>
                .
              </p>
              <p>
                AI output can be incorrect, incomplete, or out of date. Every
                Ask CentProof answer is shown alongside the transaction rows
                it draws from; please open those rows and verify before
                acting on a result, especially for tax filings, audits,
                disputes, financial decisions, or anything that leaves
                CentProof and goes to a third party.
              </p>
              <p>
                CentProof is not a bank, broker-dealer, financial advisor,
                or tax advisor. Nothing the application produces is
                investment, legal, tax, or accounting advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <SectionIntro
          eyebrow="What we don't promise"
          title="Honest limits."
          body="A small company has to draw realistic lines. These are ours."
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "No phone or live-chat support",
            "No 24/7 coverage",
            "No custom integrations",
            "No onboarding for individual users",
          ].map((item) => (
            <TrustBadge key={item}>{item}</TrustBadge>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-6 text-[#475569]">
          As CentProof grows we will hire support team members and update this
          page with new commitments. Until then, the best way to get a fast
          reply is a clear, reproducible email with your CentProof version
          number and a screenshot.
        </p>
      </section>
    </PageShell>
  );
}
