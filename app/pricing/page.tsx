import type { Metadata } from "next";
import { FAQItem, PricingCard, SectionIntro } from "@/components/cards";
import { PageShell } from "@/components/page-shell";
import { pricingFaqs, pricingPlans } from "@/components/site-content";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Free Test Mode, Pro Lifetime $59 one-time, or Pro Monthly $5/mo. Launch lifetime $39 for the first 30 days. Direct purchase via LemonSqueezy.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "CentProof Pricing",
    description:
      "Try free with your own statements. Pay once for Pro Lifetime, or subscribe monthly. 30-day refund policy.",
    url: "/pricing",
    type: "website",
  },
};

export default function PricingPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-[#0F766E]">Pricing</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight text-[#0F172A] sm:text-6xl">
            Simple pricing for a private Mac app.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#475569]">
            Try CentProof with your own statements before buying. Upgrade when
            you’re ready for unlimited imports, exports, and local AI.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-[#0F766E]/20 bg-[#ECFDF5] px-5 py-4 text-sm font-semibold text-[#0F766E]">
          Launch price: $39 lifetime for the first 30 days. Then $59 one-time.
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
      </section>

      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionIntro
            eyebrow="Pricing FAQ"
            title="Straight answers before you buy."
            body="CentProof uses direct checkout, license keys, and local data. The pricing model should be as clear as the product."
          />
          <div className="mt-10 grid gap-3 lg:grid-cols-2">
            {pricingFaqs.map((faq) => (
              <FAQItem key={faq.question} {...faq} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
