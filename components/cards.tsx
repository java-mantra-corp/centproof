import Image from "next/image";
import Link from "next/link";
import { CheckIcon } from "@/components/icons";
import { CheckoutLink } from "@/components/CheckoutLink";

export function SectionIntro({
  eyebrow,
  title,
  body,
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  invert?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p
          className={`text-sm font-semibold ${
            invert ? "text-[#2DD4BF]" : "text-[#0F766E]"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`mt-3 text-4xl font-semibold tracking-tight sm:text-5xl ${
          invert ? "text-white" : "text-[#0F172A]"
        }`}
      >
        {title}
      </h2>
      {body ? (
        <p
          className={`mt-5 text-base leading-7 ${
            invert ? "text-[#CBD5E1]" : "text-[#475569]"
          }`}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}

export function FeatureCard({
  title,
  body,
  icon,
}: {
  title: string;
  body: string;
  icon?: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
      {icon ? (
        <div className="grid size-11 place-items-center rounded-xl bg-[#CCFBF1] text-[#0F766E]">
          {icon}
        </div>
      ) : null}
      <h2 className="mt-5 text-lg font-semibold text-[#0F172A]">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-[#475569]">{body}</p>
    </article>
  );
}

export function PricingCard({
  name,
  price,
  subtitle,
  cta,
  ctaUrl,
  ctaExternal,
  bullets,
  note,
  badge,
  launchPriceNote,
  featured,
}: {
  name: string;
  price: string;
  subtitle: string;
  cta: string;
  /** Where the CTA points.  External (LemonSqueezy) URLs open in a new
   *  tab and get rel="noopener"; internal (/download, /support) routes
   *  use Next's <Link> for client-side nav. */
  ctaUrl: string;
  ctaExternal?: boolean;
  bullets: string[];
  note?: string;
  badge?: string;
  launchPriceNote?: string;
  featured?: boolean;
}) {
  const ctaClass = `mt-7 inline-flex h-11 w-full items-center justify-center rounded-lg text-sm font-semibold transition ${
    featured
      ? "bg-white text-[#0F766E] hover:bg-[#F0FDFA]"
      : "border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] hover:border-[#0F766E] hover:text-[#0F766E]"
  }`;

  return (
    <article
      className={`relative rounded-2xl border p-6 shadow-sm ${
        featured
          ? "border-[#0F766E] bg-[#0F766E] text-white shadow-[0_24px_60px_rgba(15,118,110,0.22)]"
          : "border-[#E2E8F0] bg-white text-[#0F172A]"
      }`}
    >
      {badge ? (
        <span
          className={`absolute right-5 top-5 rounded-full px-3 py-1 text-xs font-semibold ${
            featured ? "bg-white text-[#0F766E]" : "bg-[#CCFBF1] text-[#0F766E]"
          }`}
        >
          {badge}
        </span>
      ) : null}
      <h2 className="pr-24 text-xl font-semibold">{name}</h2>
      <p
        className={`mt-3 text-sm leading-6 ${
          featured ? "text-[#CCFBF1]" : "text-[#475569]"
        }`}
      >
        {subtitle}
      </p>
      <div className="mt-6 text-4xl font-semibold tracking-tight">{price}</div>
      {launchPriceNote ? (
        <p
          className={`mt-2 text-sm font-semibold ${
            featured ? "text-white" : "text-[#0F766E]"
          }`}
        >
          {launchPriceNote}
        </p>
      ) : null}
      {ctaExternal ? (
        <CheckoutLink href={ctaUrl} className={ctaClass} dataPlan={name}>
          {cta}
        </CheckoutLink>
      ) : (
        <Link href={ctaUrl} className={ctaClass} data-plan={name}>
          {cta}
        </Link>
      )}
      <ul className="mt-6 space-y-3 text-sm">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3">
            <CheckIcon
              className={`mt-0.5 size-4 shrink-0 ${
                featured ? "text-[#BBF7D0]" : "text-[#16A34A]"
              }`}
            />
            <span className={featured ? "text-white" : "text-[#475569]"}>
              {bullet}
            </span>
          </li>
        ))}
      </ul>
      {note ? (
        <p
          className={`mt-6 border-t pt-4 text-xs leading-5 ${
            featured
              ? "border-white/20 text-[#CCFBF1]"
              : "border-[#E2E8F0] text-[#64748B]"
          }`}
        >
          {note}
        </p>
      ) : null}
    </article>
  );
}

export function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="group rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-[#0F172A]">
        {question}
        <span className="grid size-7 shrink-0 place-items-center rounded-lg border border-[#E2E8F0] text-sm text-[#0F766E] group-open:bg-[#0F766E] group-open:text-white">
          +
        </span>
      </summary>
      <p className="mt-4 text-sm leading-6 text-[#475569]">{answer}</p>
    </details>
  );
}

export function BankBadge({
  name,
  muted = false,
}: {
  name: string;
  muted?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
        muted
          ? "border-dashed border-[#CBD5E1] bg-white text-[#475569]"
          : "border-[#E2E8F0] bg-white text-[#0F172A] shadow-sm"
      }`}
    >
      {name}
    </div>
  );
}

export function TrustBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-white p-4 text-sm font-semibold text-[#0F172A] shadow-sm">
      <CheckIcon className="size-4 shrink-0 text-[#16A34A]" />
      <span>{children}</span>
    </div>
  );
}

/**
 * Renders a product screenshot.  Kept the historical name
 * "ProductImagePlaceholder" so the existing call sites don't have to
 * change, but as of v0.1.3 the placeholder card is the FALLBACK
 * (imagePath missing), not the default.
 *
 * v0.1.3 fix: the previous existsSync check ran at render time and
 * relied on process.cwd() pointing at the project root.  On Vercel's
 * serverless runtime that's not always true (the build output's cwd
 * differs from the project root), so the existsSync returned false
 * in production and every call site rendered the placeholder card
 * even though the screenshot files were deployed to /public.  We
 * now trust imagePath unconditionally — next/image handles missing
 * assets with its own 404 fallback at request time.
 */
export function ProductImagePlaceholder({
  title,
  dimensions,
  description,
  imagePath,
}: {
  title: string;
  dimensions: string;
  description: string;
  imagePath?: string;
}) {
  if (imagePath) {
    return (
      <div className="overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-sm">
        <Image
          src={imagePath}
          alt={title}
          width={1600}
          height={1000}
          className="h-auto w-full object-contain"
        />
      </div>
    );
  }

  // No imagePath → render the design-time placeholder card.  Production
  // code shouldn't hit this branch; it's a safety net for new feature
  // sections that get added before the screenshot is taken.
  return (
    <div className="rounded-3xl border border-dashed border-[#CBD5E1] bg-white p-4 shadow-sm">
      <div className="flex aspect-[16/10] w-full flex-col items-center justify-center rounded-2xl bg-[#F8FAFC] px-6 text-center">
        <p className="text-sm font-semibold text-[#0F766E]">
          {title} placeholder — {dimensions}
        </p>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[#475569]">
          {description}
        </p>
      </div>
    </div>
  );
}
