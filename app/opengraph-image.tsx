/**
 * Dynamic Open Graph image for centproof.com.
 *
 * Next.js auto-detects this file and emits the appropriate <meta>
 * tags so that links shared on iMessage / Slack / Twitter / LinkedIn /
 * etc. all render with this image.  No static asset needed — the image
 * is generated at build time using @vercel/og and cached.
 *
 * Sized to 1200×630, the canonical OG dimension all major networks use.
 */

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "CentProof — Private finance, proved to the cent. Local-first Mac app for bank PDF statements.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 88px",
          background:
            "linear-gradient(135deg, #0F766E 0%, #0F172A 60%, #0F172A 100%)",
          color: "white",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "white",
              color: "#0F766E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 800,
              letterSpacing: -0.5,
            }}
          >
            CP
          </div>
          <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>
            CentProof
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            Private finance, proved to the cent.
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 500,
              color: "#CCFBF1",
              maxWidth: 900,
              lineHeight: 1.3,
            }}
          >
            Local-first Mac app for bank PDF statements, reconciliation, and
            local AI.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "center",
            fontSize: 22,
            fontWeight: 600,
            color: "#CBD5E1",
          }}
        >
          <Pill>No bank password</Pill>
          <Pill>No cloud sync</Pill>
          <Pill>Local AI by default</Pill>
        </div>
      </div>
    ),
    { ...size },
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.18)",
        borderRadius: 999,
        padding: "10px 22px",
      }}
    >
      {children}
    </span>
  );
}
