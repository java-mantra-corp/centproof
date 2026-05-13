import type { Metadata } from "next";
import Link from "next/link";
import { FeatureCard, SectionIntro } from "@/components/cards";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How CentProof keeps your bank statements on your Mac: Apple Developer ID signing, Apple notarization, SHA-256 release verification, and a short list of third parties we use only for checkout, license, and support email.",
  alternates: { canonical: "/security" },
  openGraph: {
    title: "CentProof security",
    description:
      "Signed, notarized, locally-stored, locally-AI'd. The full list of what we use, what stays on your Mac, and how to verify.",
    url: "/security",
    type: "website",
  },
};

// What network calls CentProof can make.  Kept short and concrete so a
// reader can audit the claim against their own network traffic.
const networkBehavior: Array<[string, string]> = [
  [
    "Normal app use",
    "Zero outbound network requests. Importing PDFs, searching, exporting, and using local AI never call the network.",
  ],
  [
    "Update check (every 6 hours, throttled)",
    "GET https://centproof.com/updates/darwin/<currentVersion>. The response is a small JSON manifest plus an ed25519 signature; binaries are downloaded only when an update is actually available.",
  ],
  [
    "License activation / re-validation",
    "Only when you paste a license key or once per app launch after that. Calls api.lemonsqueezy.com directly — never proxied through CentProof.",
  ],
  [
    "Support email link",
    "Opens your default mail client to support@centproof.com. CentProof never silently sends mail.",
  ],
  [
    "Custom AI endpoint (External mode only, off by default)",
    "If you opt into External AI mode in Preferences, the app calls the URL you typed in. Bundled (default) mode keeps everything on-device.",
  ],
];

// Customer-data services CentProof depends on.  Limited to the two
// vendors whose involvement a buyer would reasonably want to know
// about: LemonSqueezy (handles payment + license) and GitHub Releases
// (hosts the download).  Pure infrastructure (CDN/hosting,
// transactional email, legal-policy generation) isn't listed here —
// those don't see customer data in a way that's distinct from any
// other hosted web app.
const processors: Array<{
  name: string;
  role: string;
  data: string;
  link?: string;
}> = [
  {
    name: "LemonSqueezy",
    role: "Merchant of record for Pro Lifetime and Pro Monthly purchases. Handles checkout, payment, tax, and license-key issuance.",
    data: "Whatever you provide at checkout — name, email, billing address, payment method. After purchase, the app calls LemonSqueezy directly to activate and re-validate your license. We never see your card number; LemonSqueezy never sees your statements.",
    link: "https://www.lemonsqueezy.com",
  },
  {
    name: "GitHub Releases",
    role: "Hosts the signed .dmg and update payloads for download.",
    data: "Standard download-request metadata. The .dmg itself is signed by Java Mantra Corp's Apple Developer ID and notarized by Apple — those signatures verify the binary regardless of where it was downloaded from.",
    link: "https://github.com/java-mantra-corp/centproof-releases",
  },
];

const trustClaims: Array<[string, string]> = [
  [
    "Apple Developer ID signed",
    "Every release is code-signed with Java Mantra Corp's Developer ID before Apple sees it. Gatekeeper verifies the signature on first launch and on every relaunch.",
  ],
  [
    "Apple notarized + stapled",
    "Each release is submitted to Apple's notarization service. The notarization ticket is stapled into the .dmg, so verification works even when you're offline.",
  ],
  [
    "ed25519-signed updates",
    "Auto-updates are signed with an ed25519 key Java Mantra Corp controls. The CentProof binary embeds the matching public key and refuses any update that doesn't verify.",
  ],
  [
    "SHA-256 published on every release",
    "Each GitHub Release page lists the SHA-256 of the .dmg. You can verify the download with shasum -a 256 before mounting.",
  ],
  [
    "No bank password, no Plaid, no aggregator",
    "CentProof never asks for, stores, or sees bank login credentials. Statements come in as PDFs you already have.",
  ],
  [
    "No telemetry, no analytics, no cookies",
    "centproof.com sets no cookies and runs no analytics. The desktop app makes no telemetry calls. The 4 network behaviors listed below are the entire surface.",
  ],
];

export default function SecurityPage() {
  return (
    <PageShell>
      {/* Hero ---------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-[#0F766E]">Security</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight text-[#0F172A] sm:text-6xl">
            How CentProof keeps your data on your Mac.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#475569]">
            CentProof is signed, notarized, locally-stored, and locally-AI'd by
            default. This page lists the exact third parties we use, the four
            network calls the app can make, and how to verify any of it
            independently.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/download"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0F766E] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#115E59]"
            >
              Download for Mac
            </Link>
            <Link
              href="/privacy"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-5 text-sm font-semibold text-[#0F172A] hover:border-[#0F766E] hover:text-[#0F766E]"
            >
              Privacy model →
            </Link>
          </div>
        </div>
      </section>

      {/* Trust claims --------------------------------------------------- */}
      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionIntro
            eyebrow="Distribution + integrity"
            title="The release pipeline is audit-friendly."
            body="CentProof is distributed as a signed, notarized macOS .dmg. Auto-updates carry an additional ed25519 signature. Every release publishes its SHA-256 so you can verify the bytes you downloaded match the bytes we built."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {trustClaims.map(([title, body]) => (
              <FeatureCard key={title} title={title} body={body} />
            ))}
          </div>
        </div>
      </section>

      {/* Verify-it-yourself block --------------------------------------- */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <SectionIntro
          eyebrow="Verify it yourself"
          title="Three commands. Two minutes."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <article className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-[#0F172A]">
              1. SHA-256 of the .dmg
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#475569]">
              Compare your local download against the value published on the
              GitHub Release page for that version.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-lg bg-[#0F172A] p-4 text-xs leading-5 text-[#CBD5E1]">
{`shasum -a 256 ~/Downloads/CentProof_*.dmg`}
            </pre>
          </article>

          <article className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-[#0F172A]">
              2. Apple Developer ID signature
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#475569]">
              Confirm the .app was signed by Java Mantra Corp and the signature
              is valid.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-lg bg-[#0F172A] p-4 text-xs leading-5 text-[#CBD5E1]">
{`codesign --verify --verbose=2 \\
  /Applications/CentProof.app`}
            </pre>
          </article>

          <article className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-[#0F172A]">
              3. Apple notarization (offline-checkable)
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#475569]">
              The notarization ticket is stapled into the bundle. spctl will
              confirm the app is "accepted" by Gatekeeper.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-lg bg-[#0F172A] p-4 text-xs leading-5 text-[#CBD5E1]">
{`spctl --assess --type execute --verbose \\
  /Applications/CentProof.app`}
            </pre>
          </article>
        </div>
      </section>

      {/* Network behavior ----------------------------------------------- */}
      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionIntro
            eyebrow="Network behavior"
            title="The four calls the app can make. That's it."
            body="Everything else — parsing, search, AI, reports, exports — is local."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {networkBehavior.map(([title, body]) => (
              <FeatureCard key={title} title={title} body={body} />
            ))}
          </div>
        </div>
      </section>

      {/* Payment + download partners ------------------------------------ */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <SectionIntro
          eyebrow="Payment and download"
          title="The two services that touch customer data."
          body="Both are needed for any web-distributed Mac app to function. Bank-statement contents do not flow through either; they stay on your Mac."
        />
        <div className="mt-10 space-y-4">
          {processors.map((p) => (
            <article
              key={p.name}
              className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-7"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold text-[#0F172A]">
                  {p.name}
                </h3>
                {p.link ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#0F766E] hover:underline"
                  >
                    Visit site ↗
                  </a>
                ) : null}
              </div>
              <p className="mt-3 text-sm leading-6 text-[#475569]">
                <span className="font-semibold text-[#0F172A]">Role:</span>{" "}
                {p.role}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#475569]">
                <span className="font-semibold text-[#0F172A]">
                  What they see:
                </span>{" "}
                {p.data}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Data-flow summary --------------------------------------------- */}
      <section className="border-y border-[#E2E8F0] bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionIntro
            eyebrow="Data flow"
            title="Where every piece of data lives."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold text-[#0F172A]">
                On your Mac
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#475569]">
                <li>• PDF statements you import — copied into local app data, encrypted at rest with a key in your macOS Keychain.</li>
                <li>• Parsed transactions, accounts, entities, categories, notes — stored in a local SQLite database.</li>
                <li>• AI suggestions and embeddings — computed locally by the bundled model unless you switch to External AI mode.</li>
                <li>• Settings, preferences, license cache — local app data.</li>
              </ul>
            </article>
            <article className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold text-[#0F172A]">
                Off your Mac (only the items below)
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#475569]">
                <li>• Update-check requests to <span className="font-mono text-xs">centproof.com</span> (no contents, just version).</li>
                <li>• License activation/re-validation requests to LemonSqueezy.</li>
                <li>• The purchase itself (handled entirely by LemonSqueezy at their checkout page).</li>
                <li>• A receipt email to the address you used at checkout.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* CTA / further reading ----------------------------------------- */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="flex flex-col items-start gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold text-[#0F172A]">
              Have a security question we didn't answer?
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#475569]">
              Email{" "}
              <a
                href="mailto:support@centproof.com"
                className="font-semibold text-[#0F766E] hover:underline"
              >
                support@centproof.com
              </a>
              . We respond within one business day and we're happy to walk
              through code-signing, network behavior, or anything else
              specific.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/legal/privacy-policy"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#0F172A] hover:border-[#0F766E] hover:text-[#0F766E]"
            >
              Privacy Policy →
            </Link>
            <Link
              href="/legal/data-request"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#0F172A] hover:border-[#0F766E] hover:text-[#0F766E]"
            >
              Data request →
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
