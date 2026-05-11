/**
 * License-key signing for the webhook (Phase 5.11).
 *
 * Produces wire-format license keys that the desktop sidecar's
 * verify.ts will accept.  Mirror of src-sidecar/src/license/
 * format.ts + sign.ts but using @noble/ed25519 for Cloudflare
 * Workers compatibility (Node's crypto.sign isn't available in
 * Workers).
 *
 * Wire format and payload schema must EXACTLY match the desktop
 * side — any drift breaks every license issued.  See
 * src-sidecar/src/license/schema.ts as the source of truth.
 *
 * The signing private key is provided as a PKCS8 PEM string (env
 * var CENTPROOF_LICENSE_PRIVATE_KEY_PEM).  We decode it to the
 * 32-byte raw seed at boot and pass that to noble's sign().
 */

import * as ed from "@noble/ed25519";

export type LicenseTier = "pro";
export type LicenseType = "monthly" | "lifetime";

export interface LicensePayload {
  v: 1;
  iss: "java-mantra-corp";
  sub: string;
  name: string;
  tier: LicenseTier;
  type: LicenseType;
  iat: string; // ISO YYYY-MM-DD
  exp: string | null;
  update_window_exp?: string;
  max_devices: number;
  purchase_id: string;
}

const SEPARATOR = ".";

/**
 * Sign a license payload with the ed25519 private key.  Returns the
 * single-line wire-format string the buyer pastes into Preferences.
 *
 * @param payload  fully-formed LicensePayload (caller fills every
 *                 field — see issueLicense for the standard shapes)
 * @param privateKeyBytes  the 32-byte raw ed25519 seed
 */
export async function signLicense(
  payload: LicensePayload,
  privateKeyBytes: Uint8Array,
): Promise<string> {
  // JSON.stringify with no key sorting — bytes signed are exactly the
  // bytes that go on the wire, so no canonicalization step that could
  // drift between sign and verify.
  const payloadBytes = new TextEncoder().encode(JSON.stringify(payload));
  const sig = await ed.signAsync(payloadBytes, privateKeyBytes);
  return `${toBase64Url(payloadBytes)}${SEPARATOR}${toBase64Url(sig)}`;
}

/**
 * High-level license-issuance helper — wraps signLicense with the
 * pricing-strategy.md §3/§4 defaults so the webhook handler doesn't
 * have to remember "lifetime = exp:null + update_window 1y / monthly
 * = max_devices 1" rules.
 */
export async function issueLicense(args: {
  email: string;
  name: string;
  type: LicenseType;
  /** ISO YYYY-MM-DD.  null for lifetime (verify.ts requires this). */
  exp: string | null;
  purchaseId: string;
  privateKeyBytes: Uint8Array;
  /** "Now" override for tests; defaults to current Date. */
  now?: Date;
}): Promise<string> {
  const now = args.now ?? new Date();
  const iatIso = now.toISOString().slice(0, 10);

  // Cross-field consistency rules per src-sidecar/src/license/verify.ts.
  if (args.type === "lifetime" && args.exp !== null) {
    throw new Error("lifetime licenses must have exp=null");
  }
  if (args.type === "monthly" && !args.exp) {
    throw new Error("monthly licenses must have exp set");
  }

  const payload: LicensePayload = {
    v: 1,
    iss: "java-mantra-corp",
    sub: args.email,
    name: args.name,
    tier: "pro",
    type: args.type,
    iat: iatIso,
    exp: args.exp,
    max_devices: args.type === "lifetime" ? 3 : 1,
    purchase_id: args.purchaseId,
  };

  // Lifetime gets a 1-year "free updates" window per pricing-strategy.md §4.
  if (args.type === "lifetime") {
    const oneYear = new Date(now);
    oneYear.setUTCFullYear(oneYear.getUTCFullYear() + 1);
    payload.update_window_exp = oneYear.toISOString().slice(0, 10);
  }

  return signLicense(payload, args.privateKeyBytes);
}

/**
 * Decode a PKCS8 PEM private key into the 32-byte raw seed that
 * @noble/ed25519 signs with.  Caller passes in the env var content.
 *
 * The PEM format is:
 *   -----BEGIN PRIVATE KEY-----
 *   <base64-encoded PKCS8 DER>
 *   -----END PRIVATE KEY-----
 *
 * Inside the PKCS8 DER, the actual ed25519 seed is the LAST 32 bytes —
 * the surrounding bytes are ASN.1 metadata (algorithm OID + length
 * tags) that's the same for every ed25519 PKCS8 key.  We exploit this
 * to skip a full ASN.1 parser dependency.
 */
export function loadPrivateKeySeed(pem: string): Uint8Array {
  const cleaned = pem
    .replace(/-----BEGIN [A-Z ]+-----/g, "")
    .replace(/-----END [A-Z ]+-----/g, "")
    .replace(/\s+/g, "");
  const der = base64Decode(cleaned);
  // Standard PKCS8-encoded ed25519 private key is 48 bytes total:
  //   16 bytes ASN.1 framing + 32 bytes raw seed.
  // Be defensive: just take the last 32 bytes.  Confirms the input
  // length is plausible.
  if (der.length < 32) {
    throw new Error(
      `PKCS8 PEM too short: ${der.length} bytes (expected at least 32 + framing)`,
    );
  }
  if (der.length !== 48) {
    // Not fatal but unusual; warn so we can spot mis-encoded keys.
    console.warn(
      `[license] private key DER length ${der.length} (expected 48 for ed25519 PKCS8)`,
    );
  }
  return der.slice(der.length - 32);
}

// ----------------------------------------------------------------------------
// base64url helpers
// ----------------------------------------------------------------------------

function toBase64Url(buf: Uint8Array): string {
  return btoa(String.fromCharCode(...buf))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64Decode(s: string): Uint8Array {
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
