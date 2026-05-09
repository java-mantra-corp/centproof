import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc, P, Section, UL } from "@/components/legal-doc";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Java Mantra Corp handles data for CentProof — a local-first Mac app that keeps your bank statements on your Mac.",
  alternates: { canonical: "/legal/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalDoc
      title="Privacy Policy"
      effective="May 9, 2026"
      draft
      intro="CentProof is a privacy-first Mac app published by Java Mantra Corp. This policy explains what information CentProof and the centproof.com website handle, where it lives, and what we will and will not do with it."
    >
      <Section number="1" title="Plain-English summary">
        <P>
          CentProof is a local-first Mac app. Your imported bank and
          credit-card PDF statements, the SQLite database that stores parsed
          transactions, and the local AI model all live on your Mac. They are
          not uploaded to Java Mantra Corp servers, are not synchronized to
          any cloud service we operate, and are not used for advertising.
        </P>
        <P>
          The only personal data we receive is what is needed to deliver
          purchases and provide support: your email address, billing details
          handled by LemonSqueezy on our behalf, and any messages you send to{" "}
          <a
            href="mailto:support@centproof.com"
            className="font-semibold text-[#0F766E] hover:underline"
          >
            support@centproof.com
          </a>
          .
        </P>
      </Section>

      <Section number="2" title="Who we are">
        <P>
          The data controller for CentProof is <strong>Java Mantra Corp</strong>
          , a Florida corporation, contactable at{" "}
          <a
            href="mailto:support@centproof.com"
            className="font-semibold text-[#0F766E] hover:underline"
          >
            support@centproof.com
          </a>
          .
        </P>
      </Section>

      <Section number="3" title="What stays on your Mac">
        <UL>
          <li>The PDF statements you import.</li>
          <li>
            The local SQLite database CentProof creates when parsing those
            PDFs (transactions, balances, tags, categories, notes).
          </li>
          <li>
            The local AI model files, prompt history, and any AI-generated
            text used in Ask CentProof, merchant cleanup, and summarization.
          </li>
          <li>Your saved reports and exports, until you choose to share them.</li>
        </UL>
        <P>
          None of the above is transmitted to Java Mantra Corp under normal
          operation. We have no copy and cannot retrieve any of it for you.
        </P>
      </Section>

      <Section number="4" title="What we do receive">
        <P>The website and the purchase / license flow handle a small amount of personal data:</P>
        <UL>
          <li>
            <strong>Purchase data via LemonSqueezy.</strong> When you buy a
            CentProof license, LemonSqueezy (our merchant of record) collects
            your name, email, billing address, payment method, and tax
            information. They share with us only the order details we need to
            issue the license: name, email, plan purchased, and an order ID.
            Their privacy policy applies to their handling of this data.
          </li>
          <li>
            <strong>License email delivery.</strong> We use Resend to email
            the signed license key to the address LemonSqueezy gives us.
            Resend processes the email envelope and message contents to
            deliver mail; Resend&apos;s privacy policy applies to that processing.
          </li>
          <li>
            <strong>Support email.</strong> If you email us we will store the
            message and our reply for as long as needed to provide support
            and meet our legal obligations.
          </li>
          <li>
            <strong>Update checks.</strong> When the desktop app checks for a
            new release it makes a request to{" "}
            <code className="rounded bg-[#F1F5F9] px-1 py-0.5 text-xs">
              centproof.com/updates/...
            </code>
            . That request reveals your IP address, the running version, and
            the platform target (e.g.{" "}
            <code className="rounded bg-[#F1F5F9] px-1 py-0.5 text-xs">
              darwin-aarch64
            </code>
            ) to us. We use this only to serve the right manifest; we do not
            associate it with a customer record.
          </li>
        </UL>
      </Section>

      <Section number="5" title="What we do NOT do">
        <UL>
          <li>We do not need or store your bank password.</li>
          <li>
            We do not sync your bank statements, transactions, or AI prompts
            to Java Mantra Corp or any third party.
          </li>
          <li>
            We do not use telemetry, behavioral analytics, ad-tech pixels, or
            session-replay tools on the desktop app.
          </li>
          <li>
            We do not sell, rent, or share your personal information with
            advertisers or data brokers.
          </li>
          <li>We do not run ads inside the product.</li>
          <li>
            We do not access &ldquo;saved passwords&rdquo;,
            &ldquo;autofill data&rdquo;, or other macOS Keychain items
            belonging to other apps.
          </li>
        </UL>
      </Section>

      <Section number="6" title="Cookies and the website">
        <P>
          centproof.com is a marketing site. We do not set advertising
          cookies. We do not run third-party analytics scripts. If we add
          aggregate, privacy-respecting analytics in the future (for example,
          Plausible or a self-hosted equivalent that does not use cookies and
          does not identify individuals) we will update this policy.
        </P>
      </Section>

      <Section number="7" title="Your rights">
        <P>
          Depending on where you live (for example, the EU/UK under GDPR or
          California under the CCPA/CPRA) you may have the right to access,
          correct, export, or delete personal data we hold about you, and to
          object to or restrict its processing. Because the only personal
          data we typically hold is your purchase email and any support
          conversation, fulfilling these requests usually means a single
          email exchange. Send requests to{" "}
          <a
            href="mailto:support@centproof.com"
            className="font-semibold text-[#0F766E] hover:underline"
          >
            support@centproof.com
          </a>
          .
        </P>
      </Section>

      <Section number="8" title="Children">
        <P>
          CentProof is not directed at children under 13 and we do not
          knowingly collect personal data from children.
        </P>
      </Section>

      <Section number="9" title="Security">
        <P>
          The desktop app encrypts imported PDFs at rest with AES-256-GCM
          using a per-install key stored in the macOS Keychain. License keys
          are signed with ed25519 and verified offline, so we never need to
          phone home to validate your license. The website is served over
          HTTPS.
        </P>
      </Section>

      <Section number="10" title="Changes to this policy">
        <P>
          We will update this policy as the product evolves. Material changes
          will be highlighted on this page and reflected in the
          &ldquo;effective&rdquo; date at the top.
        </P>
      </Section>

      <Section number="11" title="See also">
        <P>
          The plain-English overview of how CentProof handles data lives at{" "}
          <Link
            href="/privacy"
            className="font-semibold text-[#0F766E] hover:underline"
          >
            /privacy
          </Link>
          . The Terms of Service are at{" "}
          <Link
            href="/legal/terms"
            className="font-semibold text-[#0F766E] hover:underline"
          >
            /legal/terms
          </Link>
          .
        </P>
      </Section>
    </LegalDoc>
  );
}
