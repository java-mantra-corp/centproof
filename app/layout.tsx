import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://centproof.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // Page-level metadata uses the title template; this is the
    // home/fallback title.
    default: "CentProof | Private finance, proved to the cent.",
    template: "%s | CentProof",
  },
  description:
    "CentProof is a privacy-first Mac app for importing bank and credit-card PDF statements, reconciling balances, searching history, running local AI, and generating auditable reports.",
  applicationName: "CentProof",
  authors: [{ name: "Java Mantra Corp", url: "https://javamantra.com" }],
  creator: "Java Mantra Corp",
  publisher: "Java Mantra Corp",
  keywords: [
    "personal finance",
    "Mac app",
    "PDF statements",
    "bank reconciliation",
    "local AI",
    "privacy",
    "macOS",
    "CentProof",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "CentProof",
    locale: "en_US",
    url: SITE_URL,
    title: "CentProof | Private finance, proved to the cent.",
    description:
      "Local-first Mac app for bank PDF statements, reconciliation, search, and local AI. No bank password. No cloud sync.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CentProof | Private finance, proved to the cent.",
    description:
      "Local-first Mac app for bank PDF statements, reconciliation, search, and local AI.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/brand/centproof-logo.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="flex min-h-full flex-col">
        {/* Skip-to-content link for keyboard / screen-reader users. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#0F766E] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow"
        >
          Skip to main content
        </a>
        {children}
        <StructuredData />
        <Analytics />
      </body>
    </html>
  );
}

/**
 * Schema.org SoftwareApplication structured data — improves Google's
 * understanding of CentProof and powers the rich-result card you sometimes
 * see on the right-hand side of search.  Single emit at the layout level
 * so it's on every page.
 */
function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CentProof",
    operatingSystem: "macOS 13+",
    applicationCategory: "FinanceApplication",
    description:
      "Privacy-first Mac app for bank PDF import, reconciliation, search, local AI, and auditable reports.",
    url: SITE_URL,
    image: `${SITE_URL}/brand/centproof-logo.svg`,
    publisher: {
      "@type": "Organization",
      name: "Java Mantra Corp",
      url: "https://javamantra.com",
    },
    offers: [
      {
        "@type": "Offer",
        name: "CentProof Pro Lifetime",
        price: "59",
        priceCurrency: "USD",
        category: "OneTime",
      },
      {
        "@type": "Offer",
        name: "CentProof Pro Monthly",
        price: "5",
        priceCurrency: "USD",
        category: "Subscription",
      },
      {
        "@type": "Offer",
        name: "CentProof Free Test Mode",
        price: "0",
        priceCurrency: "USD",
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
