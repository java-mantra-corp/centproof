"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/page-shell";

/**
 * Client-side interactive shell for /banks/share-sample.  See the
 * server `page.tsx` in this directory for the route-level docstring.
 */
export function ShareSampleClient() {
  const search = useSearchParams();
  // Sanitize URL params on read.  These are user-controllable so we
  // strip anything weird before rendering or sending them off.
  const bankParam = (search.get("bank") ?? "").trim().slice(0, 80);
  const versionParam = (search.get("version") ?? "").trim().slice(0, 40);

  // Bank name is editable on the page in case the URL had it wrong.
  const [bank, setBank] = useState(bankParam);
  const [showUploadFallback, setShowUploadFallback] = useState(false);

  // mailto: URL composed from the (live) bank field so editing
  // updates the link instantly.
  const mailtoUrl = useMemo(() => {
    const subject = `Sample statement for ${bank || "[bank name]"}${
      versionParam ? ` (${versionParam})` : ""
    }`;
    const body = [
      `Hi CentProof team,`,
      ``,
      `I'm sharing a redacted statement so you can add a verified parser for ${
        bank || "[bank name]"
      }.`,
      ``,
      versionParam ? `App version: ${versionParam}` : null,
      ``,
      `What I masked:`,
      `  • Account number`,
      `  • Full name`,
      `  • Mailing address`,
      ``,
      `What I left intact (so reconciliation works):`,
      `  • All transaction dates and amounts`,
      `  • Opening and closing balance`,
      `  • Statement period`,
      `  • Merchant descriptions`,
      ``,
      `Thanks,`,
    ]
      .filter((line): line is string => line !== null)
      .join("\n");

    return `mailto:support@centproof.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }, [bank, versionParam]);

  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        <p className="text-sm font-semibold text-[#0F766E]">Banks</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#0F172A] sm:text-5xl">
          Share a redacted statement so we can add{" "}
          <span className="text-[#0F766E]">{bank || "your bank"}</span>.
        </h1>
        <p className="mt-5 text-base leading-7 text-[#475569]">
          CentProof writes a verified parser from one clean sample. Mask the
          personal stuff, leave the math intact, and we&apos;ll ship support
          in the next maintenance release — usually 1&ndash;2 weeks.
        </p>

        {/* Confirm/edit bank name before sending — URL had a guess
            but the user is the source of truth. */}
        <div className="mt-8 rounded-2xl border border-[#E2E8F0] bg-white p-5">
          <label
            htmlFor="bank"
            className="block text-sm font-semibold text-[#0F172A]"
          >
            Bank or card name
          </label>
          <input
            id="bank"
            type="text"
            value={bank}
            onChange={(e) => setBank(e.target.value.slice(0, 80))}
            placeholder="e.g. Schwab High Yield Investor Checking"
            className="mt-2 block w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] shadow-sm placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30"
          />
          {versionParam ? (
            <p className="mt-2 text-xs text-[#64748B]">
              CentProof <strong>{versionParam}</strong> sent you here from
              the app.
            </p>
          ) : null}
        </div>

        {/* ── REDACTION TUTORIAL ──────────────────────────────────── */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-[#0F172A]">
            How to redact before you send
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#475569]">
            Open the PDF in <strong>Preview</strong> (the macOS default).
            Use <strong>Tools → Annotate → Rectangle</strong> with a black
            fill to mask the personal fields below. Then{" "}
            <strong>File → Export as PDF</strong> to save a redacted copy
            (don&apos;t overwrite your original).
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <RedactBox
              kind="mask"
              title="Mask these"
              items={[
                "Account number (full or last 4)",
                "Full name on statement",
                "Mailing address",
                "SSN, tax ID, or routing number",
                "Anything that identifies you personally",
              ]}
            />
            <RedactBox
              kind="keep"
              title="Keep intact"
              items={[
                "All transaction dates",
                "All transaction amounts",
                "Opening and closing balance",
                "Statement period dates",
                "Merchant descriptions",
                "Bank name and statement type",
              ]}
            />
          </div>

          <p className="mt-5 rounded-xl border border-[#FCD34D]/40 bg-[#FFFBEB] p-4 text-xs leading-5 text-[#78350F]">
            <strong>Why we need the math intact:</strong> the parser is only
            useful if it reconciles to the cent. If you mask amounts or
            balances we can&apos;t verify the new parser works — and
            you&apos;ll still see &quot;NOT reconciled&quot; warnings on
            future imports. Mask identity, not the numbers.
          </p>
        </div>

        {/* ── PRIMARY: MAILTO ─────────────────────────────────────── */}
        <div className="mt-10 rounded-2xl border border-[#0F766E]/30 bg-[#F0FDFA] p-6">
          <p className="text-sm font-semibold text-[#0F766E]">Recommended</p>
          <h2 className="mt-1 text-2xl font-semibold text-[#0F172A]">
            Email us the redacted PDF directly.
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#475569]">
            This opens your Mac&apos;s mail app with the subject and body
            already written. Just attach the redacted PDF and click Send.
            The file goes straight from your machine to our support inbox
            — it never touches our website.
          </p>
          <a
            href={mailtoUrl}
            className="mt-5 inline-flex h-11 items-center justify-center rounded-lg bg-[#0F766E] px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#115E59]"
          >
            Open Mail.app with pre-filled message →
          </a>
          <p className="mt-3 text-xs leading-5 text-[#64748B]">
            Sends to{" "}
            <a
              href="mailto:support@centproof.com"
              className="font-semibold text-[#0F766E] hover:underline"
            >
              support@centproof.com
            </a>
            . We reply within 1&ndash;2 business days.
          </p>
        </div>

        {/* ── FALLBACK: UPLOAD FORM ───────────────────────────────── */}
        <div className="mt-8 rounded-2xl border border-[#E2E8F0] bg-white p-6">
          <button
            type="button"
            onClick={() => setShowUploadFallback((v) => !v)}
            className="flex w-full items-center justify-between text-left"
            aria-expanded={showUploadFallback}
          >
            <span className="text-sm font-semibold text-[#0F172A]">
              No mail client configured? Upload here instead.
            </span>
            <span className="text-[#0F766E]" aria-hidden="true">
              {showUploadFallback ? "−" : "+"}
            </span>
          </button>
          {showUploadFallback ? (
            <UploadFallbackForm bankName={bank} versionLabel={versionParam} />
          ) : null}
        </div>

        <p className="mt-8 text-xs leading-5 text-[#64748B]">
          We don&apos;t have a customer database. Your message goes to our
          team inbox and we read every one. Read our{" "}
          <Link
            href="/legal/privacy-policy"
            className="font-semibold text-[#0F766E] hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </section>
    </PageShell>
  );
}

/** Two-column "mask these / keep these" callout. */
function RedactBox({
  kind,
  title,
  items,
}: {
  kind: "mask" | "keep";
  title: string;
  items: string[];
}) {
  const styles =
    kind === "mask"
      ? "border-[#FCA5A5] bg-[#FEF2F2] text-[#7F1D1D]"
      : "border-[#86EFAC] bg-[#F0FDF4] text-[#14532D]";
  const titleStyles =
    kind === "mask" ? "text-[#991B1B]" : "text-[#166534]";
  const icon = kind === "mask" ? "✕" : "✓";
  return (
    <div className={`rounded-2xl border p-5 text-sm leading-6 ${styles}`}>
      <h3
        className={`flex items-center gap-2 text-base font-semibold ${titleStyles}`}
      >
        <span aria-hidden="true">{icon}</span>
        <span>{title}</span>
      </h3>
      <ul className="mt-3 list-disc space-y-1 pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

type FallbackState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string }
  | { kind: "success" };

function UploadFallbackForm({
  bankName,
  versionLabel,
}: {
  bankName: string;
  versionLabel: string;
}) {
  const [state, setState] = useState<FallbackState>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.kind === "submitting") return;

    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    // Inject the bank + version we already know from the URL/page
    // state so the user doesn't have to re-type them.
    form.set("bank", bankName);
    if (versionLabel) form.set("version", versionLabel);

    const file = form.get("file");
    if (!(file instanceof File) || file.size === 0) {
      setState({
        kind: "error",
        message: "Please choose a redacted PDF file to upload.",
      });
      return;
    }

    setState({ kind: "submitting" });
    try {
      const r = await fetch("/api/sample-upload", {
        method: "POST",
        body: form,
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
            "Upload failed. Please try again or email support@centproof.com directly.",
        });
        return;
      }
      setState({ kind: "success" });
      formEl.reset();
    } catch {
      setState({
        kind: "error",
        message:
          "Network error. Please try again or email support@centproof.com directly with the attachment.",
      });
    }
  }

  if (state.kind === "success") {
    return (
      <div className="mt-4 rounded-xl border border-[#86EFAC] bg-[#F0FDF4] p-4 text-sm text-[#14532D]">
        ✓ Upload received. We&apos;ll reply within 1&ndash;2 business
        days. Thanks for helping us add support for{" "}
        <strong>{bankName || "your bank"}</strong>.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-4" noValidate>
      <p className="text-xs leading-5 text-[#64748B]">
        Heads up: when you upload here, the file passes briefly through our
        web server (in memory only, never saved to disk) before it leaves
        as an SMTP attachment to{" "}
        <a
          href="mailto:support@centproof.com"
          className="font-semibold text-[#0F766E] hover:underline"
        >
          support@centproof.com
        </a>
        . If you have Mail.app set up, the option above is cleaner — the
        file never touches our server at all.
      </p>

      {/* Honeypot */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="upload-honeypot">Website (do not fill)</label>
        <input
          id="upload-honeypot"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label
          htmlFor="upload-email"
          className="block text-sm font-semibold text-[#0F172A]"
        >
          Your email <span className="text-[#0F766E]">*</span>
        </label>
        <input
          id="upload-email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          autoComplete="email"
          className="mt-2 block w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] shadow-sm placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30"
        />
      </div>

      <div>
        <label
          htmlFor="upload-file"
          className="block text-sm font-semibold text-[#0F172A]"
        >
          Redacted PDF <span className="text-[#0F766E]">*</span>
        </label>
        <input
          id="upload-file"
          name="file"
          type="file"
          accept="application/pdf,.pdf"
          required
          className="mt-2 block w-full text-sm text-[#475569] file:mr-4 file:rounded-lg file:border-0 file:bg-[#0F766E] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#115E59]"
        />
        <p className="mt-2 text-xs text-[#64748B]">
          PDF only, up to 10 MB. Please redact identifiable fields first —
          see the guide above.
        </p>
      </div>

      <div>
        <label
          htmlFor="upload-notes"
          className="block text-sm font-semibold text-[#0F172A]"
        >
          Notes (optional)
        </label>
        <textarea
          id="upload-notes"
          name="notes"
          rows={3}
          maxLength={1500}
          placeholder="Anything we should know — account type, statement frequency, fields that matter most to you."
          className="mt-2 block w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] shadow-sm placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30"
        />
      </div>

      {state.kind === "error" ? (
        <div
          role="alert"
          className="rounded-lg border border-[#FCA5A5] bg-[#FEF2F2] px-3 py-2 text-sm text-[#991B1B]"
        >
          {state.message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={state.kind === "submitting"}
        className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0F766E] px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#115E59] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state.kind === "submitting" ? "Uploading…" : "Upload sample"}
      </button>
    </form>
  );
}
