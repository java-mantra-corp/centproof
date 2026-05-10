import { PageShell } from "@/components/page-shell";

/**
 * Shared layout for legal pages — Privacy Policy, Terms of Service,
 * Refund Policy, Disclaimer, Cookie Policy.
 *
 * Two rendering modes:
 *
 *  1. **`children`** — pass JSX (using the `Section` / `P` / `UL` helpers
 *     below) when you're hand-writing the policy.  Used for short pages
 *     like /legal/data-request.
 *
 *  2. **`html`** — pass a string of cleaned Termly HTML when the
 *     authoritative source is Termly.  The HTML is rendered with
 *     dangerouslySetInnerHTML inside a `.legal-prose` container, so the
 *     existing typography in `app/globals.css` matches the rest of the
 *     site (Inter font, slate text, teal links) without the Termly
 *     rendering looking out of place.
 *
 * The `intro` prop is rendered above the body in both modes — useful for
 * a one-paragraph plain-English summary before the formal text begins.
 *
 * The `draft` flag (default false) shows a yellow advisory banner
 * marking the document as pre-launch.  Once Termly content is in place
 * we leave this off everywhere.
 */
export function LegalDoc({
  title,
  effective,
  intro,
  draft = false,
  preface,
  html,
  children,
}: {
  title: string;
  effective: string;
  intro?: string;
  draft?: boolean;
  /** Optional content rendered between the intro and the policy body —
   *  useful for product-specific notes (e.g. "CentProof is a digital
   *  download, no physical return is required"). */
  preface?: React.ReactNode;
  /** Termly-cleaned HTML to embed.  Mutually exclusive with `children`. */
  html?: string;
  children?: React.ReactNode;
}) {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 pb-20 pt-12 sm:px-8 lg:pt-16">
        <p className="text-sm font-semibold text-[#0F766E]">Legal</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#0F172A] sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-sm text-[#64748B]">Effective {effective}.</p>
        {intro ? (
          <p className="mt-6 text-base leading-7 text-[#475569]">{intro}</p>
        ) : null}
        {draft ? (
          <div
            role="note"
            className="mt-6 rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] px-5 py-4 text-sm leading-6 text-[#92400E]"
          >
            <strong className="font-semibold">Pre-launch draft.</strong> This
            document reflects how CentProof is intended to operate and is
            being reviewed before public launch. If you have questions, email{" "}
            <a
              className="underline hover:no-underline"
              href="mailto:support@centproof.com"
            >
              support@centproof.com
            </a>
            .
          </div>
        ) : null}
        {preface ? <div className="mt-6">{preface}</div> : null}
        {html ? (
          <div
            className="legal-prose mt-10"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : null}
        {children ? (
          <div className="mt-10 space-y-10 text-base leading-7 text-[#334155]">
            {children}
          </div>
        ) : null}
      </article>
    </PageShell>
  );
}

export function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight text-[#0F172A]">
        {number}. {title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="leading-7 text-[#475569]">{children}</p>;
}

export function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="ml-5 list-disc space-y-2 leading-7 text-[#475569]">
      {children}
    </ul>
  );
}
