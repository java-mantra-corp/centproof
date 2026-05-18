"use client";

/**
 * AnalyticsTracker — fires custom events to MindSpire's analytics
 * endpoint (Pass 5.0).  Pairs with Vercel Analytics (page-view
 * counts) but captures the events Vercel doesn't: download_click,
 * buy_click, and any future product-specific signals.
 *
 * Three responsibilities:
 *
 *   1. Auto-fire `page_view` on every route change.  Uses Next.js's
 *      usePathname hook so SPA navigations register.
 *
 *   2. Generate + persist a `session_id` (localStorage, 30-min idle
 *      expiry) and a `visitor_id` (cookie, daily-rotating salt).
 *      Visitor IDs are daily salt + UA + UA hash → SHA-256.  Same
 *      visitor on different days produces different visitor_ids,
 *      which means we can count daily uniques without a persistent
 *      identifier (no GDPR cookie banner needed).
 *
 *   3. Expose a `track(eventName, props?)` helper for click handlers
 *      to fire `download_click`, `buy_click`, etc.  Exported via
 *      module-level function so server components / non-React code
 *      can also call it.
 *
 * Endpoint: NEXT_PUBLIC_ANALYTICS_ENDPOINT (defaults to
 * https://r.convoproof.com/api/analytics/event).  Override via env
 * for dev or alternate cluster.
 *
 * Fire-and-forget: failures are silently swallowed.  An analytics
 * outage MUST NOT degrade user experience on the site.
 */

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const ENDPOINT =
  process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT?.trim() ||
  "https://r.convoproof.com/api/analytics/event";
const PRODUCT = "centproof";

const SESSION_STORAGE_KEY = "cp_session_id";
const SESSION_LAST_SEEN_KEY = "cp_session_last_seen";
const VISITOR_COOKIE_KEY = "cp_v";
const SESSION_IDLE_MS = 30 * 60 * 1000; // 30 minutes

/** Module-level event helper — usable from any client component.
 *  Named `trackEvent` rather than `track` so it doesn't clash with
 *  Vercel Analytics's own `track` export when both are imported. */
export function trackEvent(
  eventName: string,
  properties?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return; // SSR no-op
  const sessionId = getOrCreateSessionId();
  const visitorId = getOrCreateVisitorId();
  const body = JSON.stringify({
    product: PRODUCT,
    event_name: eventName,
    page_path: window.location.pathname || "/",
    session_id: sessionId,
    visitor_id: visitorId,
    properties: properties ?? null,
  });

  // Prefer sendBeacon for fire-and-forget on navigation events
  // (the user might click Download and leave the page before
  // fetch resolves).  sendBeacon is queued by the browser even
  // if the page is unloading.
  //
  // Pass 5.0b: Blob type is "text/plain" instead of "application/json".
  // Reason: sendBeacon CAN NOT issue CORS preflight requests.  Sending
  // a Blob with a non-CORS-safelisted Content-Type (like
  // application/json) triggers preflight requirements that sendBeacon
  // can't satisfy, so the browser blocks the request entirely — DevTools
  // shows "CORS error" on a "ping" type request.  text/plain IS
  // CORS-safelisted (the spec calls these "CORS-safelisted request
  // headers"), so the browser sends the request as a simple POST
  // without preflight.  The server still parses the body as JSON;
  // we just lie about the Content-Type header.  This is the same
  // pattern Plausible, Fathom, and Google Analytics all use.
  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "text/plain;charset=UTF-8" });
      const queued = navigator.sendBeacon(ENDPOINT, blob);
      if (queued) return;
      // sendBeacon returned false = queue full / browser refused.
      // Fall through to fetch as a last resort.
    }
  } catch {
    /* fall through to fetch */
  }
  // Fallback path — full fetch with keepalive.  Same Content-Type
  // change here for consistency; the server accepts either.
  void fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "text/plain;charset=UTF-8" },
    body,
    keepalive: true,
    credentials: "omit",
  }).catch(() => {
    /* swallow — fire and forget */
  });
}

/**
 * Mount once at the app root (via app/layout.tsx).  Auto-fires
 * page_view on every route change.  No props.
 *
 * Pass 5.0a: guards against double-fires of the SAME path within
 * a single mount cycle.  Real-world observation showed pairs of
 * page_view events 26-150 ms apart in the analytics DB — most
 * plausible cause is React Strict Mode in dev OR Next.js
 * hydration re-running the effect with a transiently-changed
 * pathname identity.  The ref-based guard catches both: if the
 * tracker has already fired for the current path, it skips.
 * Navigation to a NEW path always fires (ref-stored value differs).
 */
export function AnalyticsTracker() {
  const pathname = usePathname();
  const lastFiredFor = useRef<string | null>(null);

  useEffect(() => {
    // Skip if we've already fired for this exact pathname during
    // this mount lifecycle.  Prevents double-fires from Strict Mode
    // double-invocation, hydration-time re-renders, and any future
    // Next.js quirk that re-runs the effect without an actual
    // navigation.
    if (lastFiredFor.current === pathname) {
      return;
    }
    lastFiredFor.current = pathname;

    // Defer to next tick — gives Next.js a moment to settle the
    // route + meta tags before we capture the path.
    const timer = window.setTimeout(() => {
      // Diagnostic console log — left in production deliberately.
      // It's a single low-noise line that lets the founder verify
      // tracking is firing for the expected path when debugging
      // the analytics dashboard.  console.debug doesn't show by
      // default in DevTools (need to enable "Verbose" filter), so
      // it stays out of the way for ordinary users.
      console.debug("[centproof:analytics] page_view fired for", pathname);
      trackEvent("page_view");
    }, 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}

// ─── Identity helpers ────────────────────────────────────────────

/**
 * Session ID — localStorage UUID with 30-min idle expiry.  A new
 * session starts when there's been no activity for 30 minutes.
 * Lets us compute "how many sessions converted" rather than "how
 * many distinct browser fingerprints."
 */
function getOrCreateSessionId(): string {
  try {
    const lastSeenRaw = localStorage.getItem(SESSION_LAST_SEEN_KEY);
    const lastSeen = lastSeenRaw ? Number(lastSeenRaw) : 0;
    const now = Date.now();
    const existing = localStorage.getItem(SESSION_STORAGE_KEY);

    if (existing && now - lastSeen < SESSION_IDLE_MS) {
      localStorage.setItem(SESSION_LAST_SEEN_KEY, String(now));
      return existing;
    }
    // New session — either no prior, or idle expired.
    const fresh = crypto.randomUUID();
    localStorage.setItem(SESSION_STORAGE_KEY, fresh);
    localStorage.setItem(SESSION_LAST_SEEN_KEY, String(now));
    return fresh;
  } catch {
    // Safari private mode / localStorage disabled — fall back to
    // an in-memory random ID (won't persist but at least the event
    // gets fired with a session_id).
    return crypto.randomUUID();
  }
}

/**
 * Visitor ID — cookie that rotates daily.  We bake the date into
 * the value so the same browser produces a different visitor_id
 * each calendar day.  This gives us "daily uniques" without
 * persistent cross-day tracking — the Plausible/Fathom posture.
 *
 * Cookie is `cp_v=<random-uuid-for-today>` with max-age until
 * midnight UTC.  Re-rolls automatically when the day ticks over.
 */
function getOrCreateVisitorId(): string {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const cookieValue = readCookie(VISITOR_COOKIE_KEY);
  // Cookie format: "<date>:<uuid>"; if the date prefix matches
  // today we reuse, otherwise we mint a new ID.
  if (cookieValue) {
    const [date, uuid] = cookieValue.split(":");
    if (date === today && uuid) {
      return uuid;
    }
  }
  const fresh = crypto.randomUUID();
  setCookie(VISITOR_COOKIE_KEY, `${today}:${fresh}`, secondsUntilMidnightUtc());
  return fresh;
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]!) : null;
}

function setCookie(name: string, value: string, maxAgeSeconds: number): void {
  if (typeof document === "undefined") return;
  document.cookie =
    `${name}=${encodeURIComponent(value)}; ` +
    `max-age=${maxAgeSeconds}; path=/; samesite=lax`;
}

function secondsUntilMidnightUtc(): number {
  const now = new Date();
  const tomorrow = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1),
  );
  return Math.max(60, Math.floor((tomorrow.getTime() - now.getTime()) / 1000));
}
