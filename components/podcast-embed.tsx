"use client";

import { useState } from "react";

/**
 * Spotify podcast embed with click-to-load privacy pattern.
 *
 * Two key product decisions:
 *
 *   1. CLICK-TO-LOAD (same rationale as DemoVideo):
 *      An auto-loaded Spotify iframe drops Spotify cookies on every
 *      visitor on first paint.  CentProof's homepage explicitly
 *      promises "no cloud sync, no tracking" — embedding tracker-
 *      heavy third-party content by default contradicts that.  We
 *      render a static card with episode metadata + a "Show player"
 *      button.  The iframe only loads when the visitor opts in.
 *
 *   2. ALWAYS-AVAILABLE EXTERNAL LINK:
 *      Even before clicking "Show player", the visitor can hit
 *      "Open on Spotify" in a new tab and listen there.  We don't
 *      gate the content behind our embed — that would just push
 *      listeners away if they prefer the Spotify app.
 *
 * Wire-up (the user sets these on Vercel):
 *   NEXT_PUBLIC_PODCAST_EPISODE_ID  — the 22-char Spotify episode ID
 *                                      (from the share URL:
 *                                       open.spotify.com/episode/<ID>)
 *   NEXT_PUBLIC_PODCAST_TITLE       — optional, e.g. "Why we built CentProof"
 *   NEXT_PUBLIC_PODCAST_DURATION    — optional, e.g. "28 min"
 *
 * Empty-state: when episode ID isn't set, this component renders
 * nothing.  That lets us ship the /product page integration before
 * the podcast is uploaded — the section it lives in just hides
 * itself until there's something to play.  See ProductPage for the
 * conditional render.
 */
export function PodcastEmbed({
  episodeId,
  title,
  duration,
}: {
  /** Spotify episode ID — empty / undefined → component renders nothing. */
  episodeId: string;
  title: string;
  duration?: string;
}) {
  const [showPlayer, setShowPlayer] = useState(false);
  if (!episodeId.trim()) return null;

  const spotifyUrl = `https://open.spotify.com/episode/${episodeId}`;
  // Spotify's official embed endpoint.  Theme=0 → dark player, which
  // sits well on both our light and dark sections.  utm params here
  // are Spotify's own attribution — there is no centproof.com
  // tracker.
  const embedUrl = `https://open.spotify.com/embed/episode/${episodeId}?utm_source=oembed`;

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#1DB954]/10 text-[#1DB954]">
          {/* Spotify-style waveform glyph (generic, not their logo). */}
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
            aria-hidden="true"
          >
            <path d="M9 4v16M5 8v8M13 6v12M17 9v6M21 11v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0F766E]">
            Listen to the podcast
          </p>
          <h3 className="mt-1 text-lg font-semibold text-[#0F172A]">{title}</h3>
          {duration ? (
            <p className="mt-1 text-sm text-[#475569]">{duration}</p>
          ) : null}
        </div>
      </div>

      {showPlayer ? (
        <div className="mt-4 overflow-hidden rounded-xl border border-[#E2E8F0]">
          <iframe
            src={embedUrl}
            width="100%"
            height="232"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            title={title}
            className="block"
          />
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => setShowPlayer(true)}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-[#0F766E] px-4 text-sm font-semibold text-white transition hover:bg-[#115E59]"
          >
            ▶ Show player here
          </button>
          <a
            href={spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#0F172A] transition hover:border-[#0F766E] hover:text-[#0F766E]"
          >
            Open on Spotify ↗
          </a>
        </div>
      )}
      <p className="mt-3 text-xs text-[#94A3B8]">
        Embedded player is loaded on click, not page load — your visit
        isn&apos;t shared with Spotify unless you ask for it.
      </p>
    </div>
  );
}
