import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { navItems } from "@/components/site-content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#E2E8F0]/80 bg-[#F8FAFC]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <BrandMark size={40} />
          <span className="text-lg font-semibold tracking-tight text-[#0F172A]">
            CentProof
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-[#475569] lg:flex">
          {navItems.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="transition hover:text-[#0F766E]"
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link
          href="/download"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-[#0F766E] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#115E59]"
        >
          Download for Mac
        </Link>
      </div>
    </header>
  );
}
