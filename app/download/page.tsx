import type { Metadata } from "next";
import Link from "next/link";
import { ProductImagePlaceholder, SectionIntro, TrustBadge } from "@/components/cards";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Download CentProof for Mac",
  description:
    "Install the signed and notarized macOS app. Direct download from centproof.com. Apple Silicon (M1, M2, M3, M4) on macOS 13 or later.",
  alternates: { canonical: "/download" },
  openGraph: {
    title: "Download CentProof for Mac",
    description:
      "Direct download for macOS. Signed with Apple Developer ID and notarized by Apple. Apple Silicon required.",
    url: "/download",
    type: "website",
  },
};

/**
 * Resolve the download URL.
 *
 * Set `NEXT_PUBLIC_DOWNLOAD_URL` in `.env.local` (dev) or your hosting
 * provider's env panel (prod) to a stable URL that always points at the
 * latest signed/notarized .dmg.  Recommended values:
 *
 *   • https://github.com/javamantra/centproof/releases/latest/download/CentProof_universal.dmg
 *     (whenever you cut a tagged release the URL keeps working)
 *   • or a centproof.com redirect we own (e.g. via Cloudflare Pages/Workers)
 *
 * If the var is unset the page renders "Download coming soon" with a
 * disabled button — this is the right pre-launch state.
 */
const DOWNLOAD_URL = process.env.NEXT_PUBLIC_DOWNLOAD_URL?.trim() ?? "";
/** Optional human-readable build label (e.g. "v1.0.0 — May 2026"). */
const DOWNLOAD_VERSION_LABEL =
  process.env.NEXT_PUBLIC_DOWNLOAD_VERSION_LABEL?.trim() ?? "";

export default function DownloadPage() {
  return (
    <PageShell>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:py-20">
        <div>
          <p className="text-sm font-semibold text-[#0F766E]">Download</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight text-[#0F172A] sm:text-6xl">
            Download CentProof for Mac.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#475569]">
            Install the signed and notarized macOS app, import your own bank
            and credit-card PDFs, and see how local-first finance feels.
          </p>
          <div className="mt-8 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#0F172A]">
              Download for macOS
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-[#475569]">
              <li>macOS 13 Ventura or later</li>
              <li>Apple Silicon — M1, M2, M3, or M4</li>
              <li>
                Intel Macs and Windows are not supported in this release
              </li>
            </ul>
            {DOWNLOAD_URL ? (
              <>
                <a
                  href={DOWNLOAD_URL}
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-[#0F766E] px-4 text-sm font-semibold text-white hover:bg-[#115E59]"
                  data-cta="download-dmg"
                >
                  Download CentProof.dmg
                </a>
                {DOWNLOAD_VERSION_LABEL ? (
                  <p className="mt-3 text-xs text-[#64748B]">
                    {DOWNLOAD_VERSION_LABEL} · Apple Developer ID signed ·
                    notarized
                  </p>
                ) : null}
              </>
            ) : (
              <>
                <button
                  disabled
                  className="mt-6 inline-flex h-11 cursor-not-allowed items-center justify-center rounded-lg bg-[#CBD5E1] px-4 text-sm font-semibold text-white"
                >
                  Download coming soon
                </button>
                <p className="mt-3 text-xs text-[#64748B]">
                  Java Mantra Corp is finishing the launch build. Email{" "}
                  <a
                    href="mailto:support@centproof.com"
                    className="font-semibold text-[#0F766E] hover:underline"
                  >
                    support@centproof.com
                  </a>{" "}
                  to be notified at launch.
                </p>
              </>
            )}
          </div>
        </div>
        <ProductImagePlaceholder
          title="CentProof — Statements view"
          dimensions="1600×1000"
          description="What you'll see right after installing: imported statements, balance reconciliation, and source-row provenance — all on your Mac."
          imagePath="/images/product/statementImport.png"
        />
      </section>

      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:py-20">
          <SectionIntro
            eyebrow="Install"
            title="A normal Mac install."
            body="CentProof is distributed as a macOS .dmg from centproof.com."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Download CentProof.dmg",
              "Open the DMG",
              "Drag CentProof to Applications",
              "Launch CentProof",
              "Import your first statement",
            ].map((step, index) => (
              <article
                key={step}
                className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5"
              >
                <p className="text-sm font-semibold text-[#0F766E]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-3 text-lg font-semibold text-[#0F172A]">
                  {step}
                </h2>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <SectionIntro
          eyebrow="Security"
          title="Built for macOS trust checks."
          body="Direct download still means a professional Mac distribution flow."
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Signed with Apple Developer ID",
            "Notarized by Apple",
            "Runs locally",
            "No bank password required",
          ].map((item) => (
            <TrustBadge key={item}>{item}</TrustBadge>
          ))}
        </div>

        {/* Verify-the-download block: easy trust signal for users who
            audit binaries.  Concrete commands live on /security so we
            don't duplicate them; this section just signposts them. */}
        <div className="mt-10 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-[#0F172A]">
            Verify the download yourself
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#475569]">
            Every release publishes a SHA-256 of the .dmg on its GitHub
            release page. The Security page walks through three short
            commands to confirm the SHA-256, the Apple Developer ID
            signature, and Apple notarization — works offline.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/security"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-[#0F766E] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#115E59]"
            >
              How to verify →
            </Link>
            <a
              href="https://github.com/java-mantra-corp/centproof-releases/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#0F172A] hover:border-[#0F766E] hover:text-[#0F766E]"
            >
              GitHub Releases ↗
            </a>
            <Link
              href="/changelog"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#0F172A] hover:border-[#0F766E] hover:text-[#0F766E]"
            >
              Release notes →
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
