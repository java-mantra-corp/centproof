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
 *      render a static card with podcast metadata + a "Show player"
 *      button.  The iframe only loads when the visitor opts in.
 *
 *   2. ALWAYS-AVAILABLE EXTERNAL LINK:
 *      Even before clicking "Show player", the visitor can hit
 *      "Open on Spotify" in a new tab and listen there.  We don't
 *      gate the content behind our embed — that would just push
 *      listeners away if they prefer the Spotify app.
 *
 * Accepts EITHER a show URL or an episode URL:
 *   https://open.spotify.com/show/033iocr9eOOM7mRcSp0YmQ
 *   https://open.spotify.com/episode/<22-char-ID>
 *
 * For a podcast with only one (or just a few) episodes, the show URL
 * is usually what you want — it always shows the newest episode and
 * doesn't require updating the env var when you publish another
 * episode.  For a back-catalog with a specific "this is the one to
 * play here" pick, use the episode URL.
 *
 * Wire-up (the user sets these on Vercel):
 *   NEXT_PUBLIC_PODCAST_SPOTIFY_URL  — full Spotify URL, show or episode
 *   NEXT_PUBLIC_PODCAST_TITLE        — optional, e.g. "Why we built CentProof"
 *   NEXT_PUBLIC_PODCAST_DURATION     — optional, e.g. "28 min"
 *
 * Empty-state: when the URL isn't set / doesn't parse as a Spotify
 * show or episode URL, this component renders nothing.  That lets us
 * ship the /product page integration before the podcast is uploaded
 * — the section it lives in just hides itself until there's
 * something to play.
 */
export function PodcastEmbed({
  spotifyUrl,
  title,
  duration,
}: {
  /** Full Spotify URL of either a show or an episode.  Empty /
   *  unparseable → component renders nothing. */
  spotifyUrl: string;
  title: string;
  duration?: string;
}) {
  const [showPlayer, setShowPlayer] = useState(false);
  const parsed = parseSpotifyUrl(spotifyUrl);
  if (!parsed) return null;

  // Spotify's official embed endpoint.  Same path-shape for both
  // show and episode embeds — the player UI adapts itself.
  const embedUrl = `https://open.spotify.com/embed/${parsed.type}/${parsed.id}?utm_source=oembed`;
  const externalUrl = `https://open.spotify.com/${parsed.type}/${parsed.id}`;

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#1DB954]/10 text-[#1DB954]">
          {/* Generic waveform glyph — not Spotify's logo (we don't have
              brand permission to render that) but reads as audio at a
              glance. */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="size-6"
            aria-hidden="true"
          >
            <path d="M9 4v16M5 8v8M13 6v12M17 9v6M21 11v2" />
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
            // Spotify's recommended sizes: 232 for episode (single-track
            // player), 352 for show (with episode list).  Pick the
            // taller one when embedding a show so the latest episode
            // and the episode list both show.
            height={parsed.type === "show" ? 352 : 232}
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
            href={externalUrl}
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

/**
 * Pulls the (type, id) tuple out of a Spotify show or episode URL.
 * Returns null for anything we can't recognize — letting the caller
 * render nothing rather than break the iframe with garbage.
 *
 * Examples:
 *   https://open.spotify.com/show/033iocr9eOOM7mRcSp0YmQ      → {type: "show", id: "033iocr9eOOM7mRcSp0YmQ"}
 *   https://open.spotify.com/episode/4rOoJ6Egrf8K2IrywzwOMk   → {type: "episode", id: "4rOoJ6Egrf8K2IrywzwOMk"}
 *   https://open.spotify.com/show/X?si=abc&utm=def            → {type: "show", id: "X"}   (query string stripped)
 *
 * Intentionally lenient: tolerates http/https, optional `www.`, and
 * trailing query strings (Spotify share URLs ship with a `?si=...`
 * tracker that we don't want polluting the embed URL).
 */
function parseSpotifyUrl(
  raw: string,
): { type: "show" | "episode"; id: string } | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const m = trimmed.match(
    /^https?:\/\/(?:www\.)?open\.spotify\.com\/(show|episode)\/([A-Za-z0-9]{16,})/i,
  );
  if (!m) return null;
  return { type: m[1]!.toLowerCase() as "show" | "episode", id: m[2]! };
}
