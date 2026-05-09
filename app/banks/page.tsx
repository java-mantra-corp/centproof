import type { Metadata } from "next";
import { BankBadge, SectionIntro } from "@/components/cards";
import { PageShell } from "@/components/page-shell";
import { comingSoonBanks, supportedBanks } from "@/components/site-content";

export const metadata: Metadata = {
  title: "Supported banks and cards",
  description:
    "Bank of America, Capital One, Apple Card, American Express, Discover, Citi, US Bank, Chase, Wells Fargo. Schwab, Fidelity, USAA, and Navy Federal coming soon. Send a redacted sample to prioritize yours.",
  alternates: { canonical: "/banks" },
  openGraph: {
    title: "CentProof supported banks",
    description:
      "Major US bank and credit-card statement formats supported. More parsers prioritized from real redacted samples.",
    url: "/banks",
    type: "website",
  },
};

export default function BanksPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-[#0F766E]">Banks</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight text-[#0F172A] sm:text-6xl">
            Bank support starts with PDF statements.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#475569]">
            CentProof starts with bank and credit-card PDF statements. It reads
            statement formats directly, then adds parser support from real
            redacted samples.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionIntro
            eyebrow="Supported"
            title="Current bank and card formats"
            body="These are the initial supported statement formats."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {supportedBanks.map((bank) => (
              <BankBadge key={bank} name={bank} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:py-20">
        <SectionIntro
          eyebrow="Coming soon"
          title="More parsers are planned."
          body="If your bank is missing, send a redacted sample statement and we’ll prioritize it."
        />
        <div>
          <div className="grid gap-3 sm:grid-cols-2">
            {comingSoonBanks.map((bank) => (
              <BankBadge key={bank} name={bank} muted />
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-dashed border-[#CBD5E1] bg-white p-6 text-sm font-semibold text-[#475569]">
            Sample upload/request form coming soon.
          </div>
        </div>
      </section>
    </PageShell>
  );
}
