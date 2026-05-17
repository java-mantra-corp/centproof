"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Privacy-respecting click-to-load YouTube embed.
 *
 * Why this pattern instead of a default `<iframe>`:
 *   1. Plain YouTube iframes drop ~600 KB of YouTube JavaScript + a
 *      tracking cookie on every visitor on the FIRST paint, even
 *      visitors who never click play.  That contradicts CentProof's
 *      "no cloud sync, no tracking" pitch — it's the kind of
 *      embarrassing analytics leak that gets called out on /r/privacy.
 *   2. The first paint stays a fast static <Image>.  Visitor clicks the
 *      poster, we swap in the iframe (autoplay=1 so it starts
 *      immediately), and ONLY THEN does YouTube get a request from
 *      this browser.
 *   3. We use the `youtube-nocookie.com` domain (YouTube's official
 *      privacy-enhanced mode) so even the click-through doesn't drop a
 *      tracking cookie until a user actually starts watching.
 *
 * Empty-state behavior: when `videoId` is missing / empty (no video
 * uploaded yet, or env var not configured on Vercel), this renders the
 * static poster only — no play button.  That means we can ship this
 * component before the YouTube upload exists and the homepage looks
 * exactly like today; flipping it on later is one env-var flip in
 * Vercel.
 *
 * Wire-up:
 *   1. Upload product_Video_CentProof.mp4 to YouTube (unlisted while
 *      testing, public on launch).
 *   2. Copy the 11-char video ID from the URL
 *      (e.g. `dQw4w9WgXcQ` from
 *      https://www.youtube.com/watch?v=dQw4w9WgXcQ).
 *   3. Vercel project → Settings → Environment Variables:
 *        NEXT_PUBLIC_DEMO_VIDEO_ID=dQw4w9WgXcQ
 *      Apply to Production + Preview.  Redeploy.
 *   4. Click-to-play overlay appears on the homepage hero.
 */
export function DemoVideo({
  videoId,
  title,
  posterPath,
}: {
  /** YouTube video ID (the part after `?v=`).  Empty / undefined →
   *  static poster only, no play overlay. */
  videoId: string;
  /** Accessible title for the iframe + visually-hidden button label. */
  title: string;
  /** Path under /public for the poster image (e.g. /images/product/hero-app.png).
   *  Serving our own poster instead of YouTube's i.ytimg.com thumbnail
   *  keeps YouTube from learning about visitors who never click play. */
  posterPath: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const enabled = videoId.trim().length > 0;

  if (loaded && enabled) {
    return (
      <div className="aspect-video overflow-hidden rounded-3xl border border-[#E2E8F0] bg-black shadow-sm">
        <iframe
          // youtube-nocookie.com = YouTube's "privacy-enhanced mode" —
          // no tracking cookie until the user actually starts watching.
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="size-full"
        />
      </div>
    );
  }

  // Poster-only mode: either the env var isn't set yet, or the user
  // hasn't clicked play.  Both render the same static image; the
  // play overlay only renders when a videoId is available.
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-sm">
      <Image
        src={posterPath}
        alt={title}
        width={1600}
        height={1000}
        className="h-auto w-full object-contain"
        priority
      />
      {enabled ? (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          aria-label={`Play: ${title}`}
          className="group absolute inset-0 flex items-center justify-center bg-[#0F172A]/0 transition hover:bg-[#0F172A]/20 focus-visible:bg-[#0F172A]/20 focus-visible:outline-none"
        >
          <span className="flex size-20 items-center justify-center rounded-full bg-white/95 shadow-2xl transition group-hover:scale-110 group-hover:bg-white">
            {/* Play triangle.  pl-1 nudges the visual center because a
                triangle's optical center sits left of its geometric one. */}
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-9 pl-1 text-[#0F766E]"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
          </span>
          <span className="sr-only">{title}</span>
        </button>
      ) : null}
    </div>
  );
}
