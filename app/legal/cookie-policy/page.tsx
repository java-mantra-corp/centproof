import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal-doc";
import { readTermlyPolicy } from "@/lib/termly";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "CentProof's website does not use cookies, tracking pixels, web beacons, or analytics. This Cookie Policy formalizes that posture.",
  alternates: { canonical: "/legal/cookie-policy" },
  robots: { index: true, follow: true },
};

const html = readTermlyPolicy("cookie-policy");

export default function CookiePolicyPage() {
  return (
    <LegalDoc
      title="Cookie Policy"
      effective="May 10, 2026"
      intro="centproof.com does not currently set any cookies, web beacons, tracking pixels, or third-party tracking scripts. We do not run analytics tools, ad-tech, retargeting platforms, or social-media plugins. This Cookie Policy formalizes that posture and describes what would change if we ever begin using cookies in the future."
      html={html}
    />
  );
}
