"use client";

import { track } from "@vercel/analytics";

/**
 * Client-side wrapper around the .dmg download anchor.  Fires a
 * `dmg_download_clicked` event into Vercel Analytics so we can see
 * (a) how many people actually click Download vs just visit /download,
 * and (b) which version + referrer they came from.
 *
 * Kept as a tiny dedicated component so the rest of /download stays
 * server-rendered.  No tracking pixels, no third-party scripts —
 * Vercel Analytics is cookieless and processes everything anonymised
 * at the edge.
 */
export function DownloadDmgButton({
  href,
  versionLabel,
}: {
  href: string;
  versionLabel: string;
}) {
  return (
    <a
      href={href}
      className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-[#0F766E] px-4 text-sm font-semibold text-white hover:bg-[#115E59]"
      data-cta="download-dmg"
      onClick={() => {
        track("dmg_download_clicked", {
          version: versionLabel || "unknown",
        });
      }}
    >
      Download CentProof.dmg
    </a>
  );
}
