import { PageShell } from "@/components/page-shell";

/**
 * Shared layout for legal pages — Privacy Policy, Terms of Service, etc.
 *
 * Renders a centered, readable body column with a header showing the
 * document title, "last updated" date, and a clear "this is the current
 * draft, review with counsel before public launch" notice.  Pass the
 * actual content as children using the `Section` and `P` helpers below.
 */
export function LegalDoc({
  title,
  effective,
  intro,
  draft = false,
  children,
}: {
  title: string;
  effective: string;
  intro?: string;
  /** When true, renders a yellow advisory banner stating the document is
   *  awaiting legal review.  Set to `false` once a lawyer has signed off. */
  draft?: boolean;
  children: React.ReactNode;
}) {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 pb-20 pt-12 sm:px-8 lg:pt-16">
        <p className="text-sm font-semibold text-[#0F766E]">Legal</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#0F172A] sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-sm text-[#64748B]">
          Effective {effective}.
        </p>
        {intro ? (
          <p className="mt-6 text-base leading-7 text-[#475569]">{intro}</p>
        ) : null}
        {draft ? (
          <div
            role="note"
            className="mt-6 rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] px-5 py-4 text-sm leading-6 text-[#92400E]"
          >
            <strong className="font-semibold">Pre-launch draft.</strong> This
            document reflects how CentProof is intended to operate. It is being
            reviewed by counsel before public launch. If you have questions,
            email{" "}
            <a
              className="underline hover:no-underline"
              href="mailto:support@centproof.com"
            >
              support@centproof.com
            </a>
            .
          </div>
        ) : null}
        <div className="mt-10 space-y-10 text-base leading-7 text-[#334155]">
          {children}
        </div>
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
