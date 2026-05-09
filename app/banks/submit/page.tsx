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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.kind === "submitting") return;
    setState({ kind: "submitting" });

    const form = new FormData(e.currentTarget);
    const payload = {
      bank: String(form.get("bank") ?? ""),
      email: String(form.get("email") ?? ""),
      notes: String(form.get("notes") ?? ""),
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
            "We couldn't submit your request. Please try again or email info@javamantra.com directly.",
        });
        return;
      }
      router.push("/banks/submit/thanks");
    } catch {
      setState({
        kind: "error",
        message:
          "Network error. Please try again, or email info@javamantra.com directly.",
      });
    }
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        <p className="text-sm font-semibold text-[#0F766E]">Banks</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#0F172A] sm:text-5xl">
          Request a new bank.
        </h1>
        <p className="mt-5 text-base leading-7 text-[#475569]">
          Tell us which bank or credit-card statement format you would like
          CentProof to support next. We prioritize parsers by demand. If we
          want a sample PDF we will reply asking you to email a redacted one
          directly — never paste real statements into a web form.
        </p>

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
          />

          <Field
            id="email"
            label="Your email"
            type="email"
            placeholder="you@example.com"
            required
            help="We'll only use this to follow up on this request."
          />

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-semibold text-[#0F172A]"
            >
              Notes (optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={5}
              maxLength={1500}
              placeholder="Anything that would help — statement frequency, account types, what fields matter to you, sample availability."
              className="mt-2 block w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] shadow-sm placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30"
            />
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
              Cancel
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
