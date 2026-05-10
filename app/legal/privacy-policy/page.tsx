import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal-doc";
import { readTermlyPolicy } from "@/lib/termly";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Java Mantra Corp collects, uses, and protects your personal information when you use CentProof. Local-first by design — your bank statements stay on your Mac.",
  alternates: { canonical: "/legal/privacy-policy" },
  robots: { index: true, follow: true },
};

const html = readTermlyPolicy("privacy-policy");

export default function PrivacyPolicyPage() {
  return (
    <LegalDoc
      title="Privacy Policy"
      effective="May 10, 2026"
      intro="Java Mantra Corp publishes CentProof, a privacy-first macOS application that processes your bank and credit-card PDF statements locally on your Mac. This Privacy Policy explains what limited personal information we collect through the centproof.com website and the license-issuance flow, how we use it, and the choices and rights you have."
      html={html}
    />
  );
}
