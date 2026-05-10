import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal-doc";
import { readTermlyPolicy } from "@/lib/termly";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "CentProof outputs — including AI-generated answers, summaries, and reports — are informational only and not financial, tax, or accounting advice. Always verify with a qualified professional.",
  alternates: { canonical: "/legal/disclaimer" },
  robots: { index: true, follow: true },
};

const html = readTermlyPolicy("disclaimer");

export default function DisclaimerPage() {
  return (
    <LegalDoc
      title="Disclaimer"
      effective="May 10, 2026"
      intro="CentProof helps you organize and inspect your own financial history. Its outputs — including AI-generated answers, transaction summaries, anomaly explanations, and reports — are informational only. They are not financial, tax, accounting, legal, or investment advice. Customers must verify any output against their own source records and consult qualified professionals before acting on financial or tax decisions."
      html={html}
    />
  );
}
