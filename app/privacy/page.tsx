import type { Metadata } from "next";
import Link from "next/link";
import { FeatureCard, SectionIntro } from "@/components/cards";
import { PageShell } from "@/components/page-shell";
import { privacySections } from "@/components/site-content";

export const metadata: Metadata = {
  title: "Privacy model",
  description:
    "How CentProof keeps your data on your Mac: no bank password, no cloud sync, no telemetry, no tracking, no ads, local AI by default.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "CentProof privacy model",
    description:
      "Local-first Mac app: no bank password, no cloud sync, no telemetry, no ads, local AI by default.",
    url: "/privacy",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-[#0F766E]">Privacy</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight text-[#0F172A] sm:text-6xl">
            Your bank statements stay on your Mac.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#475569]">
            CentProof is a direct-download Mac app built around local PDF
            statements, local storage, and local AI by default.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionIntro
            eyebrow="Privacy model"
            title="Local-first by design."
            body="The app works from PDF statements, local storage, and local AI by default."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {privacySections.map(([title, body]) => (
              <FeatureCard key={title} title={title} body={body} />
            ))}
          </div>
          <div className="mt-12 flex flex-col items-start gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-6 text-[#475569]">
              Looking for the formal legal text? The full Privacy Policy and
              Terms of Service describe data handling, refunds, and
              jurisdiction in detail.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/legal/privacy-policy"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#0F172A] hover:border-[#0F766E] hover:text-[#0F766E]"
              >
                Privacy Policy →
              </Link>
              <Link
                href="/legal/terms"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#0F172A] hover:border-[#0F766E] hover:text-[#0F766E]"
              >
                Terms of Service →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
