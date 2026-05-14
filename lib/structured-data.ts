/**
 * JSON-LD structured data builders.
 *
 * Schema.org structured data lets Google surface rich results
 * (expandable FAQ snippets, app price/category cards, etc.).  Each
 * builder returns a plain object that callers stringify and embed via:
 *
 *   <script type="application/ld+json"
 *           dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
 *
 * Keep entries minimal — Google's quality team penalizes inflated
 * markup ("review schema with no visible reviews", "price not actually
 * shown to users"), so we mirror only facts that visibly appear on the
 * page.
 */

const SITE_URL = "https://centproof.com";

/**
 * SoftwareApplication + three Offers, for the /pricing page.  Mirrors
 * the visible price points exactly so Google's validators stay happy.
 */
export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CentProof",
    applicationCategory: "FinanceApplication",
    operatingSystem: "macOS 13 Ventura or later (Apple Silicon)",
    url: SITE_URL,
    description:
      "Local-first Mac app for importing PDF bank and credit-card statements, reconciling to the cent, and searching financial history with local AI. No bank password, no cloud sync.",
    offers: [
      {
        "@type": "Offer",
        name: "Free Test Mode",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`,
      },
      {
        "@type": "Offer",
        name: "Pro Lifetime",
        price: "49",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`,
        description:
          "Permanent use of the version you buy. Includes 12 months of feature updates and support. Up to 2 Macs.",
      },
      {
        "@type": "Offer",
        name: "Pro Monthly",
        price: "5",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`,
        description:
          "Monthly subscription with full Pro features. Cancel anytime. 1 Mac.",
      },
    ],
  };
}

interface QA {
  question: string;
  answer: string;
}

/**
 * FAQPage schema — used on /faq and on /pricing's FAQ section.  Pass
 * the question/answer array directly; the schema captures EXACTLY
 * what the page displays, no extras.
 */
export function faqPageSchema(items: ReadonlyArray<QA>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
