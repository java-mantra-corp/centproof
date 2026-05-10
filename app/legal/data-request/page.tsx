import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc, P, Section } from "@/components/legal-doc";

export const metadata: Metadata = {
  title: "Submit a Data Request",
  description:
    "Submit a privacy-rights request — view, download, correct, or delete the personal information Java Mantra Corp holds about you under GDPR, CCPA/CPRA, and other privacy laws.",
  alternates: { canonical: "/legal/data-request" },
  robots: { index: true, follow: true },
};

/**
 * The DSAR (Data Subject Access Request) form is hosted by Termly so
 * that we don't have to build our own request-routing + identity
 * verification flow.  This page just frames the form and links into it.
 *
 * The URL below is the form Termly provisioned for our Privacy Policy
 * — it appears in the policy itself wherever the text says
 * "submit a data subject access request."  Keep these in sync.
 */
const TERMLY_DSAR_URL =
  "https://app.termly.io/dsar/834f49b3-8a4f-44f5-8d0c-d2340f85cd52";

export default function DataRequestPage() {
  return (
    <LegalDoc
      title="Submit a Data Request"
      effective="May 10, 2026"
      intro="If you live in the European Economic Area, the United Kingdom, Switzerland, Canada, California, or one of the other US states with a privacy law, you have the right to view, correct, export, or delete the personal information Java Mantra Corp holds about you. Use the form linked below to submit a request — it goes directly to our privacy inbox and is verified through Termly."
    >
      <Section number="1" title="Use the secure request form">
        <P>
          The fastest and most reliable way to exercise your privacy rights
          is to submit a data subject access request through the secure form
          our privacy provider, Termly, hosts on our behalf:
        </P>
        <div className="mt-4">
          <a
            href={TERMLY_DSAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0F766E] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#115E59]"
          >
            Open the data request form →
          </a>
        </div>
        <P>
          The form lets you choose the type of request — access, deletion,
          correction, portability, opt-out of sale, opt-out of profiling —
          and verify your identity by email so we can be sure the request is
          really from you.
        </P>
      </Section>

      <Section number="2" title="Or email us directly">
        <P>
          If you would rather not use the form, you can email{" "}
          <a
            href="mailto:privacy@centproof.com"
            className="font-semibold text-[#0F766E] hover:underline"
          >
            privacy@centproof.com
          </a>{" "}
          with the subject line &ldquo;Data Request&rdquo; and tell us:
        </P>
        <ul className="ml-5 list-disc space-y-2 leading-7 text-[#475569]">
          <li>What right you are exercising (access / deletion / correction / portability / opt-out)</li>
          <li>The email address you used at checkout (if applicable)</li>
          <li>The country, state, or province you reside in</li>
          <li>Any reference number or order ID that helps us locate your records</li>
        </ul>
        <P>
          We will reply within 30 days as required by applicable law, often
          much sooner. If we need to verify your identity beyond the email
          itself we will tell you what is needed.
        </P>
      </Section>

      <Section number="3" title="What we will need from you">
        <P>
          To act on a request we need to be confident the requester is
          actually you. For most rights, the email address you used to buy
          a CentProof license is enough — we send a confirmation link to
          that address before processing the request.
        </P>
        <P>
          We never charge a fee to process a privacy request. We may need to
          decline or delay a request only when the law expressly allows
          (for example, where granting deletion would interfere with our
          ongoing legal obligations or another customer&apos;s rights). If
          we decline, we will explain why and how to appeal.
        </P>
      </Section>

      <Section number="4" title="Right to appeal">
        <P>
          Under some US state privacy laws (Virginia, Colorado, Connecticut,
          and others), you may appeal our decision if we decline a request.
          To appeal, reply to our decision email or write to{" "}
          <a
            href="mailto:privacy@centproof.com"
            className="font-semibold text-[#0F766E] hover:underline"
          >
            privacy@centproof.com
          </a>{" "}
          with &ldquo;Appeal&rdquo; in the subject line. We will respond
          within 60 days with a written explanation. If your appeal is
          denied, you may submit a complaint to your state&apos;s attorney
          general.
        </P>
      </Section>

      <Section number="5" title="See also">
        <P>
          The full description of what data we hold and how we process it
          lives in the{" "}
          <Link
            href="/legal/privacy-policy"
            className="font-semibold text-[#0F766E] hover:underline"
          >
            Privacy Policy
          </Link>
          . If you just want a plain-English summary of our privacy posture,
          read the{" "}
          <Link
            href="/privacy"
            className="font-semibold text-[#0F766E] hover:underline"
          >
            privacy overview
          </Link>
          .
        </P>
      </Section>
    </LegalDoc>
  );
}
