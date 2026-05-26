"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";

type SubmitState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string };

export default function BankRequestPage() {
  const router = useRouter();
  const [state, setState] = useState<SubmitState>({ kind: "idle" });
  const [canShareSample, setCanShareSample] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.kind === "submitting") return;
    setState({ kind: "submitting" });

    const form = new FormData(e.currentTarget);
    const userNotes = String(form.get("notes") ?? "").trim();
    // Prepend a structured marker when the visitor offers a sample so
    // the support inbox immediately sees "this person is willing to
    // help" without us having to add a separate API field.  Keeps the
    // /api/bank-request contract unchanged.
    const notes = canShareSample
      ? `[CAN SHARE REDACTED SAMPLE]\n\n${userNotes}`
      : userNotes;

    const payload = {
      bank: String(form.get("bank") ?? ""),
      email: String(form.get("email") ?? ""),
      notes,
      // Honeypot — must stay empty.  Real users never see it.
      website: String(form.get("website") ?? ""),
    };

    try {
      const r = await fetch("/api/bank-request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await r.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!r.ok || !body.ok) {
        setState({
          kind: "error",
          message:
            body.error ??
            "We couldn't submit your request. Please try again or email support@centproof.com directly.",
        });
        return;
      }
      router.push("/banks/submit/thanks");
    } catch {
      setState({
        kind: "error",
        message:
          "Network error. Please try again, or email support@centproof.com directly.",
      });
    }
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        <p className="text-sm font-semibold text-[#0F766E]">Banks</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#0F172A] sm:text-5xl">
          Help us add your bank.
        </h1>
        <p className="mt-5 text-base leading-7 text-[#475569]">
          CentProof writes a new parser from a single redacted sample
          statement. If your bank is missing, you&apos;re probably not the
          only one — and one email from you is usually enough to move it
          to the top of the queue.
        </p>

        <div className="mt-8 rounded-2xl border border-[#0F766E]/20 bg-[#F0FDFA] p-5 text-sm leading-6 text-[#0F172A]">
          <p className="font-semibold">What happens next</p>
          <ol className="mt-3 space-y-2 pl-5 list-decimal marker:font-semibold marker:text-[#0F766E]">
            <li>
              You send the bank name and your email below — no statement
              attached, no PDF uploaded through the browser.
            </li>
            <li>
              We reply within 1&ndash;2 business days. If we already have
              the format, you&apos;ll get a download link. If not, we
              ask you to email a <strong>redacted</strong> sample
              statement directly — account number masked, balance and
              transaction amounts left intact so we can verify the
              parser reconciles to the cent.
            </li>
            <li>
              The new parser ships in the next maintenance release —
              usually within 1&ndash;2 weeks — and you get an email when
              it&apos;s live. Free Test Mode is enough to verify the
              parser works on your statements before you decide whether
              to upgrade.
            </li>
          </ol>
        </div>

        <form onSubmit={onSubmit} className="mt-10 space-y-6" noValidate>
          {/* Honeypot — visually hidden, screen-reader hidden, never shown
              to humans.  Bots fill every input they discover. */}
          <div
            aria-hidden="true"
            className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
          >
            <label htmlFor="website">Website (do not fill)</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <Field
            id="bank"
            label="Bank or card name"
            placeholder="e.g. Schwab High Yield Investor Checking"
            required
            maxLength={80}
            help="The exact name on the statement helps us pick the right format — credit unions and regional banks especially."
          />

          <Field
            id="email"
            label="Your email"
            type="email"
            placeholder="you@example.com"
            required
            help="We only use this to reply about this request. You're not signing up for any list."
          />

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-semibold text-[#0F172A]"
            >
              Anything else? (optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={5}
              maxLength={1500}
              placeholder="Account type (checking, credit card, brokerage), how often you import, anything unusual about the statement format you've noticed."
              className="mt-2 block w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] shadow-sm placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30"
            />
          </div>

          <div className="rounded-xl border border-[#E2E8F0] bg-white p-4">
            <label
              htmlFor="canShareSample"
              className="flex cursor-pointer items-start gap-3"
            >
              <input
                id="canShareSample"
                type="checkbox"
                checked={canShareSample}
                onChange={(e) => setCanShareSample(e.target.checked)}
                className="mt-0.5 size-4 cursor-pointer rounded border-[#CBD5E1] text-[#0F766E] focus:ring-[#0F766E]/40"
              />
              <span className="text-sm leading-6 text-[#0F172A]">
                <span className="font-semibold">
                  I can email a redacted sample statement if it helps.
                </span>
                <span className="block text-[#475569]">
                  We&apos;ll reply with redaction instructions before you
                  send anything. Nothing is uploaded through this form.
                </span>
              </span>
            </label>
          </div>

          {state.kind === "error" ? (
            <div
              role="alert"
              className="rounded-lg border border-[#FCA5A5] bg-[#FEF2F2] px-4 py-3 text-sm text-[#991B1B]"
            >
              {state.message}
            </div>
          ) : null}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={state.kind === "submitting"}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0F766E] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#115E59] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {state.kind === "submitting" ? "Sending…" : "Send request"}
            </button>
            <Link
              href="/banks"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#0F172A] hover:border-[#0F766E] hover:text-[#0F766E]"
            >
              See supported banks
            </Link>
          </div>

          <p className="text-xs leading-5 text-[#64748B]">
            By submitting you agree to receive a one-off email reply from
            Java Mantra Corp. We don&apos;t add you to any list. Read our{" "}
            <Link
              href="/legal/privacy-policy"
              className="font-semibold text-[#0F766E] hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </form>
      </section>
    </PageShell>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  required,
  maxLength,
  help,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  help?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-[#0F172A]">
        {label}
        {required ? <span className="ml-1 text-[#0F766E]">*</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete={type === "email" ? "email" : "off"}
        className="mt-2 block w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] shadow-sm placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30"
      />
      {help ? (
        <p className="mt-2 text-xs leading-5 text-[#64748B]">{help}</p>
      ) : null}
    </div>
  );
}
