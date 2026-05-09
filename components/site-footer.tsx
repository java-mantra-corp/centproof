import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

const productLinks = [
  ["Product", "/product"],
  ["Pricing", "/pricing"],
  ["Banks", "/banks"],
  ["Download", "/download"],
] as const;

const companyLinks = [
  ["FAQ", "/faq"],
  ["Privacy", "/privacy"],
  ["Support", "/support"],
] as const;

const legalLinks = [
  ["Privacy Policy", "/legal/privacy-policy"],
  ["Terms of Service", "/legal/terms"],
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E2E8F0] bg-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_0.85fr_0.85fr_0.85fr]">
          <div>
            <div className="flex items-center gap-3">
              <BrandMark size={32} />
              <span className="font-semibold text-[#0F172A]">CentProof</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#475569]">
              Private finance, proved to the cent. A local-first Mac app from
              Java Mantra Corp.
            </p>
            <p className="mt-3 max-w-md text-xs leading-5 text-[#64748B]">
              Direct download for macOS. Purchases handled by LemonSqueezy.
              CentProof is not a bank, financial advisor, or tax advisor.
            </p>
          </div>

          <FooterColumn heading="Product" links={productLinks} />
          <FooterColumn heading="Company" links={companyLinks} />
          <FooterColumn heading="Legal" links={legalLinks} />
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[#E2E8F0] pt-6 text-xs leading-5 text-[#64748B] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Java Mantra Corp. CentProof
            <sup className="ml-0.5">™</sup> is a trademark of Java Mantra Corp.
            All rights reserved.
          </p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <a
              href="mailto:support@centproof.com"
              className="hover:text-[#0F766E]"
            >
              support@centproof.com
            </a>
            <span aria-hidden>·</span>
            <a
              href="https://javamantra.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0F766E]"
            >
              javamantra.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: ReadonlyArray<readonly [string, string]>;
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0F172A]">
        {heading}
      </h3>
      <ul className="mt-4 space-y-2 text-sm text-[#475569]">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link href={href} className="hover:text-[#0F766E]">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
