import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal-doc";
import { readTermlyPolicy } from "@/lib/termly";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing your use of CentProof — the local-first macOS application published by Java Mantra Corp. Includes license, payment, refund, dispute resolution, and governing-law clauses.",
  alternates: { canonical: "/legal/terms" },
  robots: { index: true, follow: true },
};

const html = readTermlyPolicy("terms-of-service");

export default function TermsPage() {
  return (
    <LegalDoc
      title="Terms of Service"
      effective="May 10, 2026"
      intro="These Terms of Service govern your use of the CentProof macOS application, the centproof.com website, and any related services Java Mantra Corp provides. By installing or using CentProof you agree to these terms. Please read them carefully."
      html={html}
    />
  );
}
