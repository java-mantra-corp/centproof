import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export default function NotFound() {
  return (
    <PageShell>
      <section className="mx-auto flex max-w-3xl flex-col items-start px-5 py-24 sm:px-8 lg:py-32">
        <p className="text-sm font-semibold text-[#0F766E]">404</p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight text-[#0F172A] sm:text-6xl">
          That page is off the books.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#475569]">
          The link is broken or the page has moved. Try one of the routes
          below — or send us the URL you came from and we&apos;ll fix it.
        </p>
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0F766E] px-4 text-sm font-semibold text-white hover:bg-[#115E59]"
          >
            Back to home
          </Link>
          <Link
            href="/product"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#0F172A] hover:border-[#0F766E] hover:text-[#0F766E]"
          >
            Tour the product
          </Link>
          <Link
            href="/pricing"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#0F172A] hover:border-[#0F766E] hover:text-[#0F766E]"
          >
            See pricing
          </Link>
          <Link
            href="/support"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#0F172A] hover:border-[#0F766E] hover:text-[#0F766E]"
          >
            Contact support
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
