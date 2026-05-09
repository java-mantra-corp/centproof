import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Request received",
  description: "Thanks — we received your bank-parser request.",
  alternates: { canonical: "/banks/submit/thanks" },
  // Prevent search engines from indexing this — it has no SEO value.
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:py-28">
        <p className="text-sm font-semibold text-[#0F766E]">Banks</p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight text-[#0F172A] sm:text-6xl">
          Got it — thanks!
        </h1>
        <p className="mt-6 text-lg leading-8 text-[#475569]">
          Your bank-parser request is on its way to Java Mantra Corp. We
          read every submission and will reply by email if we have follow-up
          questions or want a redacted sample statement.
        </p>
        <p className="mt-4 text-sm leading-6 text-[#475569]">
          Parsers are prioritized by demand and ship in the next maintenance
          release once a clean sample lets us verify the format. While you
          wait, you can keep using CentProof with any of the supported banks
          on{" "}
          <Link
            href="/banks"
            className="font-semibold text-[#0F766E] hover:underline"
          >
            the banks page
          </Link>
          .
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0F766E] px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#115E59]"
          >
            Back to home
          </Link>
          <Link
            href="/banks"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#0F172A] hover:border-[#0F766E] hover:text-[#0F766E]"
          >
            See supported banks
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
