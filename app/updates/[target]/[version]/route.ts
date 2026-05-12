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

  // ── Manifest shape Tauri 2 expects ──────────────────────────────
  //
  // Two pieces of Tauri 2 indirection worth understanding before
  // touching this:
  //
  // 1. URL `{{target}}` substitution → bare OS only.
  //    The plugin replaces `{{target}}` in the configured endpoint
  //    URL with one of `darwin` / `linux` / `windows` (NO arch).
  //    The OS+arch lookup happens client-side AFTER the manifest is
  //    received.
  //
  // 2. Manifest `platforms` dict → OS-arch keys.
  //    The plugin's deserialiser expects:
  //
  //      {
  //        "version": "0.1.1",
  //        "notes": "...",
  //        "pub_date": "...",
  //        "platforms": {
  //          "darwin-aarch64": { "url": "...", "signature": "..." },
  //          "darwin-x86_64":  { "url": "...", "signature": "..." }, // when we ship Intel
  //          "linux-x86_64":   { ... },
  //          "windows-x86_64": { ... }
  //        }
  //      }
  //
  //    On each client, the plugin reads `platforms[osDashArch]` for
  //    its own compiled-in osDashArch (e.g. `darwin-aarch64` for
  //    Apple Silicon).
  //
  // So this route should:
  //   • Accept bare OS in the URL `target` param (validated above)
  //   • Pass through the FULL platforms dict from the upstream
  //     manifest, NOT filter to one platform.  Filtering breaks the
  //     client-side OS-arch lookup because the URL `target` doesn't
  //     contain arch info.
  //
  // History (worth keeping in commit-comment archaeology):
  //
  //   v0.1.1 launch attempt 1: route returned `platforms: { [target]: ... }`
  //     keyed by the URL's bare `target` ("darwin").  Tauri's client
  //     looked for `platforms["darwin-aarch64"]`, didn't find it, no
  //     update applied.  → THIS rewrite passes through the OS-arch
  //     keys unchanged.
  //
  //   v0.1.1 launch attempt 2: route returned flat top-level
  //     `url` + `signature`.  Tauri 2 silently rejected it (legacy
  //     Tauri 1 format).  → Fixed by switching to platforms-keyed.
  //
  // The Vercel route now does ONE job: fetch the upstream
  // latest.json, version-compare, and return it (with a normalised
  // platforms-keyed wrap for legacy flat inputs).

  let platforms: Record<string, { url: string; signature: string }>;

  if (
    latest.platforms &&
    typeof latest.platforms === "object" &&
    Object.keys(latest.platforms).length > 0
  ) {
    // Modern platforms-keyed input → pass through verbatim.
    platforms = latest.platforms;
  } else if (latest.url && latest.signature) {
    // Legacy flat input → wrap as darwin-aarch64.  We only ship
    // Apple Silicon today; when we add Intel / Windows / Linux,
    // adjust the upstream latest.json to use platforms-keyed
    // format directly (publish-release.sh already does this for
    // new releases).
    platforms = {
      "darwin-aarch64": { url: latest.url, signature: latest.signature },
    };
  } else {
    console.warn("[updates] manifest has neither platforms nor url/signature", {
      target,
      manifestKeys: Object.keys(latest),
    });
    return new NextResponse(null, { status: 204 });
  }

  return NextResponse.json(
    {
      version: latest.version,
      pub_date: latest.pub_date,
      notes: latest.notes,
      platforms,
    },
    {
      headers: {
        "Cache-Control": "no-store, must-revalidate",
      },
    },
  );
}

// ───────────────────────────────────────────────────────────────────────
// Helpers
// ───────────────────────────────────────────────────────────────────────

/**
 * Validate the {{target}} value Tauri's updater plugin substitutes
 * into our endpoint URL.
 *
 * Tauri 2 quirk worth documenting: the docs example show the manifest
 * `platforms` dict keyed by `darwin-aarch64` / `darwin-x86_64` / etc.
 * (OS-arch).  That led me to assume the same OS-arch string lands in
 * the URL.  It does NOT.  The plugin substitutes `{{target}}` with
 * just the OS name (`darwin`, `linux`, `windows`); the OS+arch lookup
 * happens client-side AFTER the manifest is received.
 *
 *   tauri.conf.json endpoint:    /updates/{{target}}/{{current_version}}
 *   What Tauri actually fetches: /updates/darwin/0.1.0
 *   What the manifest contains:  platforms.darwin-aarch64.{url, sig}
 *                                platforms.darwin-x86_64.{url, sig}
 *                                ...
 *
 * The plugin's deserialiser picks `platforms[currentOs-currentArch]`
 * from the response.
 *
 * History: v0.1.1 launch — v0.1.0 users hit this route as
 * /updates/darwin/0.1.0 (per Vercel logs), our regex required
 * `<os>-<arch>` and rejected it as invalid → silent 204 → in-app
 * "you're on the latest version" even though v0.1.1 was published.
 * Fixed by accepting both forms (bare OS and full OS-arch).
 */
function isValidTarget(t: string): boolean {
  // Bare OS — what Tauri 2's updater plugin actually sends.
  if (/^(darwin|linux|windows)$/.test(t)) return true;
  // OS-arch — accept too in case a future Tauri version changes the
  // substitution, or someone tests the endpoint manually with the full
  // triple.  Doesn't change response behaviour: we always emit the full
  // platforms dict and let the client filter.
  if (/^(darwin|linux|windows)-(aarch64|x86_64|i686)$/.test(t)) return true;
  return false;
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
