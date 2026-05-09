/**
 * Tauri auto-updater manifest endpoint.
 *
 * The desktop app's `src-tauri/tauri.conf.json` is configured with:
 *
 *   "plugins": {
 *     "updater": {
 *       "endpoints": [
 *         "https://centproof.com/updates/{{target}}/{{current_version}}"
 *       ],
 *       "pubkey": "<ed25519 public key of the UPDATER keypair>"
 *     }
 *   }
 *
 * Tauri replaces `{{target}}` with one of `darwin-aarch64`, `darwin-x86_64`,
 * etc. and `{{current_version}}` with the running build's semver.  The
 * client expects:
 *
 *   • HTTP 204 No Content      → up to date, no manifest, no body
 *   • HTTP 200 + JSON manifest → an update is available
 *
 * The JSON shape (see https://v2.tauri.app/plugin/updater/):
 *
 *   {
 *     "version": "1.0.1",
 *     "pub_date": "2026-05-09T00:00:00Z",
 *     "url": "https://github.com/javamantra/centproof/releases/download/v1.0.1/CentProof_1.0.1_aarch64.app.tar.gz",
 *     "signature": "<base64 detached ed25519 signature over the .tar.gz>",
 *     "notes": "What's new in 1.0.1"
 *   }
 *
 * The `signature` is produced by `tauri signer sign` in CI using the
 * private half of the updater keypair (kept in CI secrets, never
 * committed).  The desktop app verifies the download against the public
 * key embedded in `tauri.conf.json` before applying the update — that's
 * the trust anchor; this endpoint is just metadata delivery.
 *
 * Production strategy: this route reads the latest manifest from a
 * static JSON file we ship with each release (`/public/updates/latest.json`)
 * or — better — proxies to the latest GitHub Release's `manifest.json`
 * asset.  Either way, the signing happens in CI and this server never
 * needs the private key.
 *
 * The current implementation returns 204 (no update) until we point the
 * resolver at a real source.  Set `NEXT_PUBLIC_LATEST_MANIFEST_URL` to
 * a URL that returns a manifest in the shape above and this route will
 * forward it after applying the standard semver-newer check.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface TauriUpdateManifest {
  version: string;
  pub_date: string;
  url: string;
  signature: string;
  notes?: string;
  /** Optional per-target overrides:
   *  { "darwin-aarch64": { url, signature }, ... } */
  platforms?: Record<string, { url: string; signature: string }>;
}

const MANIFEST_URL = process.env.NEXT_PUBLIC_LATEST_MANIFEST_URL?.trim() ?? "";

/** Disable Next's response cache — manifest must be fresh after a
 *  release ships.  Tauri itself throttles checks client-side. */
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ target: string; version: string }> },
) {
  const { target, version } = await params;

  // Sanity check inputs — Tauri always sends valid values, so anything
  // unusual is either a probe or a misconfiguration.  Refuse silently.
  if (!isValidTarget(target) || !isValidSemver(version)) {
    return new NextResponse(null, { status: 204 });
  }

  if (!MANIFEST_URL) {
    // Pre-launch: no published build to update to.
    return new NextResponse(null, { status: 204 });
  }

  let latest: TauriUpdateManifest;
  try {
    const r = await fetch(MANIFEST_URL, { cache: "no-store" });
    if (!r.ok) {
      console.warn("[updates] manifest fetch non-200", { status: r.status });
      return new NextResponse(null, { status: 204 });
    }
    latest = (await r.json()) as TauriUpdateManifest;
  } catch (e) {
    console.warn("[updates] manifest fetch failed", e);
    return new NextResponse(null, { status: 204 });
  }

  // If the running version is already at-or-ahead, no update.
  if (compareSemver(latest.version, version) <= 0) {
    return new NextResponse(null, { status: 204 });
  }

  // Per-target overrides: prefer { url, signature } scoped to this
  // platform, fall back to the manifest-level url + signature.
  const platform = latest.platforms?.[target];
  const out: TauriUpdateManifest = {
    version: latest.version,
    pub_date: latest.pub_date,
    url: platform?.url ?? latest.url,
    signature: platform?.signature ?? latest.signature,
    notes: latest.notes,
  };

  return NextResponse.json(out, {
    headers: {
      "Cache-Control": "no-store, must-revalidate",
    },
  });
}

// ───────────────────────────────────────────────────────────────────────
// Helpers
// ───────────────────────────────────────────────────────────────────────

/** Tauri target triples we expect to see for a Mac-only app.  Extend
 *  if you ever ship Windows / Linux. */
function isValidTarget(t: string): boolean {
  return /^(darwin|linux|windows)-(aarch64|x86_64|i686)$/.test(t);
}

function isValidSemver(v: string): boolean {
  return /^\d+\.\d+\.\d+(?:-[\w.-]+)?$/.test(v);
}

/** Returns negative if a < b, zero if equal, positive if a > b.  Pre-
 *  release tags are treated as older than the same numeric version. */
function compareSemver(a: string, b: string): number {
  const parse = (s: string) => {
    const [core, pre = ""] = s.split("-", 2);
    const [maj, min, patch] = core.split(".").map((n) => parseInt(n, 10));
    return { maj, min, patch, pre };
  };
  const A = parse(a);
  const B = parse(b);
  if (A.maj !== B.maj) return A.maj - B.maj;
  if (A.min !== B.min) return A.min - B.min;
  if (A.patch !== B.patch) return A.patch - B.patch;
  if (A.pre === B.pre) return 0;
  if (A.pre === "") return 1; // 1.0.0 > 1.0.0-rc.1
  if (B.pre === "") return -1;
  return A.pre.localeCompare(B.pre);
}
