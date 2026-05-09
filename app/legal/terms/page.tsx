import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc, P, Section, UL } from "@/components/legal-doc";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing your use of CentProof, the local-first Mac app published by Java Mantra Corp.",
  alternates: { canonical: "/legal/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalDoc
      title="Terms of Service"
      effective="May 9, 2026"
      draft
      intro="These terms govern your use of the CentProof desktop application, the centproof.com website, and any related services Java Mantra Corp provides. By installing or using CentProof you agree to these terms."
    >
      <Section number="1" title="The product">
        <P>
          CentProof is a downloadable macOS application that imports bank and
          credit-card PDF statements you supply, parses them, runs local AI
          features against the parsed data, and produces reports and exports.
          Java Mantra Corp (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
          &ldquo;our&rdquo;) publishes CentProof. You (&ldquo;you&rdquo;) are
          the person installing or using it.
        </P>
        <P>
          CentProof is <strong>not</strong> a bank, broker-dealer, money
          transmitter, financial advisor, or tax advisor. It does not access
          your bank accounts, hold money, or transact on your behalf.
        </P>
      </Section>

      <Section number="2" title="Plans, pricing, and license keys">
        <UL>
          <li>
            <strong>Free Test Mode</strong> lets you try CentProof with caps
            on imports, exports, and Ask CentProof questions. Free Test Mode
            does not require a license key.
          </li>
          <li>
            <strong>Pro Lifetime</strong> is a one-time purchase that unlocks
            unlimited imports, exports, and AI questions, includes activation
            on up to three Macs, and includes one year of updates and support.
            &ldquo;Lifetime&rdquo; means the version you purchased keeps
            working — major upgrades may be offered as optional paid upgrades
            later.
          </li>
          <li>
            <strong>Pro Monthly</strong> is a recurring subscription that
            unlocks the same features on a single Mac while the subscription
            is active. You may cancel at any time; access continues through
            the end of the paid period.
          </li>
        </UL>
        <P>
          Purchases are processed by LemonSqueezy as our merchant of record.
          After purchase you receive a signed license key by email. Your
          license is personal and non-transferable. You may not resell,
          sublicense, or share license keys.
        </P>
      </Section>

      <Section number="3" title="Refund policy">
        <P>
          We offer a 30-day no-questions-asked refund through LemonSqueezy.
          Email{" "}
          <a
            href="mailto:support@centproof.com"
            className="font-semibold text-[#0F766E] hover:underline"
          >
            support@centproof.com
          </a>{" "}
          within 30 days of purchase to request a refund. After 30 days,
          refunds are at our discretion.
        </P>
      </Section>

      <Section number="4" title="Permitted use">
        <P>You may install and use CentProof for personal or business finance work, subject to your active plan. You agree not to:</P>
        <UL>
          <li>Reverse-engineer, decompile, or disassemble the application except as expressly permitted by law.</li>
          <li>Bypass, remove, or modify license-validation, rate-limit, or watermarking features.</li>
          <li>Use CentProof to violate any law or to process data you do not have the right to process.</li>
          <li>Run CentProof on more Macs than your plan permits.</li>
        </UL>
      </Section>

      <Section number="5" title="Your data is yours">
        <P>
          CentProof stores parsed transactions, the original PDFs (encrypted
          at rest), tags, categories, and reports on your Mac. We do not host
          a copy. You are responsible for backing up the local data folder.
        </P>
        <P>
          If you stop using CentProof or your subscription ends, your existing
          imported data stays accessible. You can export your data at any
          time using the formats listed on the{" "}
          <Link
            href="/product"
            className="font-semibold text-[#0F766E] hover:underline"
          >
            product page
          </Link>
          .
        </P>
      </Section>

      <Section number="6" title="Updates and support">
        <P>
          The application includes an opt-in updater that fetches signed
          updates from centproof.com or our release host. We provide product
          support by email at{" "}
          <a
            href="mailto:support@centproof.com"
            className="font-semibold text-[#0F766E] hover:underline"
          >
            support@centproof.com
          </a>{" "}
          on a reasonable-effort basis during normal business hours.
        </P>
        <P>
          Pro Lifetime includes one year of updates and support from the date
          of purchase. After that, your purchased version keeps working;
          renewing for additional updates and support is optional.
        </P>
      </Section>

      <Section number="7" title="Third-party services">
        <P>
          We use LemonSqueezy for checkout and tax handling and Resend for
          license email delivery. The websites and apps you choose to share
          exports with are governed by their own terms. We are not
          responsible for third-party services&apos; availability or behavior.
        </P>
      </Section>

      <Section number="8" title="No financial advice">
        <P>
          CentProof helps you organize and inspect your financial history.
          Its AI features generate text based on your local data and may be
          incorrect. Nothing the application produces is investment, legal,
          tax, or accounting advice. Consult a qualified professional before
          making decisions based on what CentProof tells you.
        </P>
      </Section>

      <Section number="9" title="Disclaimer of warranties">
        <P>
          To the maximum extent permitted by law, CentProof is provided
          &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
          warranties of any kind, whether
          express, implied, or statutory, including warranties of
          merchantability, fitness for a particular purpose, accuracy,
          non-infringement, and uninterrupted operation. Some jurisdictions
          do not allow the exclusion of certain warranties, in which case
          this section applies to the maximum extent permitted by law.
        </P>
      </Section>

      <Section number="10" title="Limitation of liability">
        <P>
          To the maximum extent permitted by law, Java Mantra Corp will not
          be liable for any indirect, incidental, special, consequential, or
          punitive damages, or any loss of profits, revenues, data, or
          goodwill, arising out of or related to your use of CentProof. Our
          aggregate liability for any claim arising out of these terms or
          your use of CentProof will not exceed the greater of $50 USD and
          the amount you paid us in the twelve months preceding the claim.
        </P>
      </Section>

      <Section number="11" title="Indemnification">
        <P>
          You agree to indemnify and hold harmless Java Mantra Corp from any
          claims, damages, or expenses (including reasonable legal fees)
          arising from your misuse of CentProof or your violation of these
          terms.
        </P>
      </Section>

      <Section number="12" title="Termination">
        <P>
          We may suspend or terminate your license if you materially breach
          these terms. You may stop using CentProof at any time. Termination
          does not entitle you to a refund of fees already paid except as
          required by the refund policy in section 3.
        </P>
      </Section>

      <Section number="13" title="Governing law">
        <P>
          These terms are governed by the laws of the State of Florida,
          USA, without regard to its conflict-of-laws principles. Any dispute
          will be resolved in the state or federal courts located in Florida,
          unless a binding consumer-protection law in your jurisdiction
          provides otherwise.
        </P>
      </Section>

      <Section number="14" title="Changes to these terms">
        <P>
          We may update these terms as the product evolves. The
          &ldquo;effective&rdquo; date at the top reflects the latest
          version. Material changes will
          be highlighted on this page. Continued use of CentProof after a
          change constitutes acceptance of the updated terms.
        </P>
      </Section>

      <Section number="15" title="Contact">
        <P>
          Questions about these terms? Email{" "}
          <a
            href="mailto:support@centproof.com"
            className="font-semibold text-[#0F766E] hover:underline"
          >
            support@centproof.com
          </a>
          .
        </P>
      </Section>
    </LegalDoc>
  );
}
