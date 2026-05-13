import type { Metadata } from "next";
import { ProductImagePlaceholder, SectionIntro } from "@/components/cards";
import { PageShell } from "@/components/page-shell";
import { productSections } from "@/components/site-content";

export const metadata: Metadata = {
  title: "Product tour",
  description:
    "Statement import, reconciliation, transactions view, smart tagging, Ask CentProof, recurring detection, cleanup inbox, cash-flow, anomaly detection, what-changed, price watch, reports, and local backup.",
  alternates: { canonical: "/product" },
  openGraph: {
    title: "CentProof product tour",
    description:
      "A Mac-native workspace for statement-backed finance. Every feature starts with local PDF statements.",
    url: "/product",
    type: "website",
  },
};

export default function ProductPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-[#0F766E]">Product tour</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight text-[#0F172A] sm:text-6xl">
            A Mac-native workspace for statement-backed finance.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#475569]">
            CentProof imports bank and credit-card PDF statements, reconciles
            the math, organizes financial history, and answers questions with
            source rows you can inspect.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionIntro
            eyebrow="Tour"
            title="Every feature starts with local statements."
            body="Import statements, reconcile to the cent, search and ask questions, all locally on your Mac."
          />
          <div className="mt-12 space-y-16">
            {productSections.map((section, index) => (
              <article
                key={section.title}
                className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <p className="text-sm font-semibold text-[#0F766E]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0F172A]">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-[#475569]">
                    {section.body}
                  </p>
                </div>
                <ProductImagePlaceholder
                  title={section.imageTitle}
                  dimensions="1600×1000"
                  description={`${section.title} on CentProof for Mac.`}
                  imagePath={section.imagePath}
                />
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
