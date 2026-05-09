import type { Metadata } from "next";
import { FeatureCard, SectionIntro } from "@/components/cards";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Contact Java Mantra Corp for license help, bank parser requests, refunds, and privacy/security questions. Email support@centproof.com.",
  alternates: { canonical: "/support" },
  openGraph: {
    title: "CentProof support",
    description:
      "Direct support from Java Mantra Corp. License help, bank parser requests, refunds, privacy questions.",
    url: "/support",
    type: "website",
  },
};

const supportSections = [
  {
    title: "Contact Java Mantra Corp",
    body: "For general product questions, launch updates, and direct purchase questions, email support@centproof.com. If unsure, use info@javamantra.com.",
  },
  {
    title: "License help",
    body: "Purchases are handled by LemonSqueezy. After purchase, your license key is delivered by email and used to unlock Pro features.",
  },
  {
    title: "Bank parser request",
    body: "If your bank is missing, send a redacted sample statement. Remove names, addresses, account numbers, and any private details before sharing.",
  },
  {
    title: "Refund policy",
    body: "CentProof will offer a 30-day no-questions-asked refund policy through LemonSqueezy.",
  },
  {
    title: "Privacy/security questions",
    body: "Ask about direct download, Apple Developer ID signing, notarization, local AI, network behavior, or data export before importing real statements.",
  },
];

export default function SupportPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-[#0F766E]">Support</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight text-[#0F172A] sm:text-6xl">
            Support from Java Mantra Corp.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#475569]">
            CentProof is distributed directly, so support is direct too.
          </p>
          <a
            href="mailto:support@centproof.com"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-[#0F766E] px-4 text-sm font-semibold text-white hover:bg-[#115E59]"
          >
            support@centproof.com
          </a>
        </div>
      </section>

      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionIntro
            eyebrow="Help topics"
            title="What we can help with."
            body="Use support for license questions, bank parser requests, refunds, and privacy/security review."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {supportSections.map((section) => (
              <FeatureCard key={section.title} {...section} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
