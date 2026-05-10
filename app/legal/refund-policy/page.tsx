import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal-doc";
import { readTermlyPolicy } from "@/lib/termly";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "30-day no-questions-asked refund policy for CentProof Pro Lifetime and Pro Monthly purchases, processed through LemonSqueezy.",
  alternates: { canonical: "/legal/refund-policy" },
  robots: { index: true, follow: true },
};

const html = readTermlyPolicy("return-policy");

export default function RefundPolicyPage() {
  return (
    <LegalDoc
      title="Refund Policy"
      effective="May 10, 2026"
      intro="CentProof offers a 30-day no-questions-asked refund through LemonSqueezy on every paid plan — Pro Lifetime and Pro Monthly. This page explains how to request a refund and how long the process takes."
      preface={
        <div className="rounded-2xl border border-[#0F766E]/20 bg-[#ECFDF5] px-5 py-4 text-sm leading-6 text-[#0F766E]">
          <strong className="font-semibold">CentProof is a digital download.</strong>{" "}
          No physical item needs to be shipped or returned. Refund requests
          should be submitted by email to{" "}
          <a
            href="mailto:support@centproof.com"
            className="font-semibold underline hover:no-underline"
          >
            support@centproof.com
          </a>{" "}
          from the email address used at checkout, including the order ID.
          The mailing address listed in the policy below is for legal
          correspondence only — you do not need to mail anything to obtain
          a refund. References to &ldquo;return packages&rdquo; or
          &ldquo;postmark&rdquo; in the formal text below do not apply to
          digital purchases.
        </div>
      }
      html={html}
    />
  );
}
