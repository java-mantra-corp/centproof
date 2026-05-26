import type { Metadata } from "next";
import { Suspense } from "react";
import { PageShell } from "@/components/page-shell";
import { ShareSampleClient } from "./share-sample-client";

/**
 * /banks/share-sample
 *
 * Landing page the CentProof desktop app opens in the user's default
 * browser when an import either fails entirely OR succeeds in
 * "best-effort" mode (generic heuristic parser, NOT reconciled).
 *
 * URL params (both optional, sanitized client-side):
 *   ?bank=Schwab%20Checking   — bank name the app couldn't parse
 *   ?version=v0.1.6            — app version that triggered the share
 *
 * The page has two paths to the same destination (support inbox):
 *
 *   PRIMARY: mailto: handoff
 *     Opens Mail.app with a pre-filled subject/body.  User redacts
 *     the PDF in Preview themselves, then attaches and sends.  File
 *     never touches centproof.com infrastructure.  Matches the
 *     brand's "your data stays on your Mac" promise.
 *
 *   FALLBACK: web upload form (POST /api/sample-upload)
 *     For visitors without a configured mail client.  File passes
 *     through our Node runtime briefly (in memory) before leaving as
 *     an SMTP attachment.  Disclosed explicitly on the form.
 *
 * This page is a server component that exports `metadata` and wraps
 * the interactive client child in <Suspense> so useSearchParams()
 * is allowed.  The Suspense fallback is a blank PageShell so layout
 * shift on hydration is minimal.
 */

export const metadata: Metadata = {
  title: "Share a redacted statement",
  description:
    "CentProof writes a verified bank parser from one redacted sample. Mask account number and identity, leave amounts and balances intact, send via Mail.app or upload directly.",
  alternates: { canonical: "/banks/share-sample" },
  // No SEO value — this page is for app-triggered visits, not search
  // traffic.  Noindex so the long-tail URLs with ?bank= and ?version=
  // params don't pollute search results.
  robots: { index: false, follow: false },
};

export default function ShareSamplePage() {
  return (
    <Suspense
      fallback={
        <PageShell>
          <div className="mx-auto max-w-3xl px-5 py-16" />
        </PageShell>
      }
    >
      <ShareSampleClient />
    </Suspense>
  );
}
