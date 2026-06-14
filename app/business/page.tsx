import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQItem,
  FeatureCard,
  PricingCard,
  SectionIntro,
  TrustBadge,
} from "@/components/cards";
import { PageShell } from "@/components/page-shell";
import {
  businessFaqs,
  businessFeatures,
  businessPillars,
  businessPlans,
  businessWorkflow,
  heroTrust,
} from "@/components/site-content";
import {
  businessApplicationSchema,
  faqPageSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "CentProof Business — for bookkeepers & accountants",
  description:
    "Turn each client's bank and credit-card PDF statements into reconciled, exportable data on your Mac. A fully isolated workspace per client, batch import for whole folders, and exports to CSV, OFX, and QuickBooks (QBO/QFX). Unlimited clients, no per-seat fees, no cloud sync.",
  alternates: { canonical: "/business" },
  openGraph: {
    title: "CentProof Business — bank statements to clean books",
    description:
      "Local-first Mac app for bookkeepers: a workspace per client, batch import, reconcile to the cent, and export to QuickBooks, OFX, and CSV. 14-day free trial.",
    url: "/business",
    type: "website",
  },
};

export default function BusinessPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessApplicationSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageSchema(businessFaqs)),
        }}
      />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="max-w-4xl">
          <p className="inline-flex rounded-full border border-[#CCFBF1] bg-white px-3 py-1 text-sm font-semibold text-[#0F766E] shadow-sm">
            For bookkeepers &amp; accountants
          </p>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.04] tracking-tight text-[#0F172A] sm:text-6xl">
            Client bank statements to clean books — on your Mac.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#475569]">
            CentProof Business turns each client&apos;s PDF statements into
            reconciled, exportable data. A separate workspace per client, batch
            import for whole folders, and exports to CSV, OFX, and QuickBooks —
            with no bank passwords, no cloud sync, and no per-seat fees.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/download"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-[#0F766E] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#115E59]"
            >
              Download for Mac
            </Link>
            <Link
              href="/pricing#business"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-5 text-sm font-semibold text-[#0F172A] shadow-sm transition hover:border-[#0F766E] hover:text-[#0F766E]"
            >
              See Business pricing
            </Link>
          </div>
          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            {heroTrust.map((point) => (
              <TrustBadge key={point}>{point}</TrustBadge>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars — the four things Business adds */}
      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionIntro
            eyebrow="Built for a practice"
            title="Multi-client, without the multi-client mess."
            body="The personal edition is one person's finances. Business is built for the bookkeeper juggling many clients who each need their own clean, defensible records."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {businessPillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6"
              >
                <h2 className="text-lg font-semibold text-[#0F172A]">
                  {pillar.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#475569]">
                  {pillar.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <SectionIntro
          eyebrow="Workflow"
          title="How a month-end close looks in CentProof."
          body="Start with the PDFs your client already has, end with reconciled data in your accounting tool — without re-keying a single row."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {businessWorkflow.map(([title, body], index) => (
            <article
              key={title}
              className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm"
            >
              <span className="text-sm font-semibold text-[#0F766E]">
                0{index + 1}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-[#0F172A]">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#475569]">{body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Feature grid */}
      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionIntro
            eyebrow="What you get"
            title="Everything in Pro, scaled to your client roster."
            body="The same statement import, reconciliation, local AI, and reports as the personal edition — organized so each client stays separate and audit-ready."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {businessFeatures.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Privacy reassurance band */}
      <section className="bg-[#0F172A] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:py-20">
          <SectionIntro
            eyebrow="Client confidentiality"
            title="Your clients' data never leaves your Mac."
            body="No bank passwords, no cloud sync, no third-party aggregator holding your clients' financial history. CentProof works from the PDF statements your clients already download, and the local AI runs on your machine."
            invert
          />
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "No bank passwords collected, ever",
                "No client data sent to the cloud",
                "Local AI — no OpenAI or Anthropic calls",
                "Each client isolated in its own workspace",
                "Signed with Apple Developer ID, notarized",
                "Your data exports to standard formats anytime",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-[#CBD5E1]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionIntro
            eyebrow="Business pricing"
            title="One flat price. Unlimited clients."
            body="No per-client or per-seat fees. Try it risk-free with a 14-day trial on Business Monthly, or own it outright with Business Lifetime."
          />
          <Link
            href="/pricing"
            className="inline-flex h-11 w-fit items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#0F172A] shadow-sm hover:border-[#0F766E] hover:text-[#0F766E]"
          >
            Compare all plans →
          </Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:max-w-3xl">
          {businessPlans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionIntro
            eyebrow="Business FAQ"
            title="Questions bookkeepers ask first."
            body="How it differs from Pro, how client data stays separate, the free trial, and how exports reach your accounting tool."
          />
          <div className="mt-10 grid gap-3 lg:grid-cols-2">
            {businessFaqs.map((faq) => (
              <FAQItem key={faq.question} {...faq} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
