import type { Metadata } from "next";
import Link from "next/link";
import { FAQItem, PricingCard, SectionIntro } from "@/components/cards";
import { PageShell } from "@/components/page-shell";
import { pricingFaqs, pricingPlans } from "@/components/site-content";
import {
  faqPageSchema,
  softwareApplicationSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Free Test Mode, Pro Lifetime $49 one-time, or Pro Monthly $5/mo. Launch lifetime $30 for the first 30 days. Direct purchase via LemonSqueezy.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "CentProof Pricing",
    description:
      "Try free with your own statements. Pay once for Pro Lifetime, or subscribe monthly. 30-day refund policy.",
    url: "/pricing",
    type: "website",
  },
};

/**
 * Optional launch-coupon end date — when set (e.g. "June 10, 2026"),
 * the launch banner shows a concrete deadline instead of the vaguer
 * "first 30 days" wording.  Update via Vercel env vars when the
 * launch window shifts; safe to leave unset.
 */
const LAUNCH_COUPON_ENDS =
  process.env.NEXT_PUBLIC_LAUNCH_COUPON_ENDS?.trim() ?? "";

export default function PricingPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageSchema(pricingFaqs)),
        }}
      />
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-[#0F766E]">Pricing</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight text-[#0F172A] sm:text-6xl">
            Try it free. Own it for $49.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#475569]">
            Use CentProof with your own PDF statements right now. Upgrade only
            when you want unlimited imports, exports, and local AI — and pay
            once instead of monthly.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-[#0F766E]/20 bg-[#ECFDF5] px-5 py-4 text-sm font-semibold text-[#0F766E]">
          Launch price: $30 lifetime
          {LAUNCH_COUPON_ENDS ? ` through ${LAUNCH_COUPON_ENDS}` : " for the first 30 days"}.
          Then $49 one-time.
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>

        {/* Trust row — concentrates buying-decision reassurance directly
            below the plan cards.  Each item links to the page where
            users can verify the claim, so it isn't just marketing copy. */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Link
            href="/legal/refund-policy"
            className="group rounded-2xl border border-[#E2E8F0] bg-white p-5 transition hover:border-[#0F766E]"
          >
            <p className="text-sm font-semibold text-[#0F172A] group-hover:text-[#0F766E]">
              30-day refund →
            </p>
            <p className="mt-2 text-xs leading-5 text-[#475569]">
              No-questions-asked refund on digital purchases through LemonSqueezy.
            </p>
          </Link>
          <Link
            href="/security"
            className="group rounded-2xl border border-[#E2E8F0] bg-white p-5 transition hover:border-[#0F766E]"
          >
            <p className="text-sm font-semibold text-[#0F172A] group-hover:text-[#0F766E]">
              Signed + notarized →
            </p>
            <p className="mt-2 text-xs leading-5 text-[#475569]">
              Apple Developer ID signed, Apple notarized, SHA-256 published every release.
            </p>
          </Link>
          <Link
            href="/privacy"
            className="group rounded-2xl border border-[#E2E8F0] bg-white p-5 transition hover:border-[#0F766E]"
          >
            <p className="text-sm font-semibold text-[#0F172A] group-hover:text-[#0F766E]">
              Your data stays accessible →
            </p>
            <p className="mt-2 text-xs leading-5 text-[#475569]">
              Up to 3 Macs on Pro Lifetime. Existing imports stay readable even if you never upgrade.
            </p>
          </Link>
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
