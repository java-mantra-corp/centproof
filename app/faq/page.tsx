import type { Metadata } from "next";
import { FAQItem } from "@/components/cards";
import { PageShell } from "@/components/page-shell";
import { faqs } from "@/components/site-content";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Direct download, license keys, local AI, exports, refunds, and what CentProof does not do. Plain answers about a privacy-first Mac finance app.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "CentProof FAQ",
    description:
      "Direct download, local data, clear terms. Answers about distribution, license keys, local AI, and exports.",
    url: "/faq",
    type: "website",
  },
};

export default function FAQPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-[#0F766E]">FAQ</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight text-[#0F172A] sm:text-6xl">
            Direct download, local data, clear terms.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#475569]">
            Answers about direct distribution, license keys, local AI, exports,
            and what CentProof does not do.
          </p>
        </div>
        <div className="mt-12 grid gap-3 lg:grid-cols-2">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
