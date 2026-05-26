"use client";

import Link from "next/link";
import { useState } from "react";
import { track } from "@vercel/analytics";
import { trackEvent } from "@/components/AnalyticsTracker";

/**
 * Client-side wrapper around the .dmg download anchor + an OPTIONAL
 * "tell us your bank" opt-in panel that reveals beneath the button
 * the moment the visitor clicks Download.
 *
 * Why it lives here and not on a separate /download/thanks page:
 *
 *   - Browsers intercept .dmg responses as downloads, NOT page
 *     navigations.  So a normal `<a href="file.dmg">` keeps the user
 *     on /download.  Showing the opt-in inline below the button
 *     captures the moment of highest intent without redirecting,
 *     without a modal, and without interrupting the file download.
 *
 *   - "Skip" is just hiding the panel — no nav, no nag.  Visitor who
 *     doesn't want to share anything is one click away from forgetting
 *     this UI exists.
 *
 *   - No database.  Submissions POST to /api/bank-request which SMTPs
 *     to support@centproof.com (same pipeline /banks/submit uses).
 *     The Hostinger mailbox IS the storage layer.  We tell the visitor
 *     this explicitly so the privacy promise stays honest.
 *
 * The opt-in form is intentionally a 2-field minimum (bank + email +
 * one checkbox).  Visitors who want to write a longer note get a link
 * to the full /banks/submit page.
 *
 * `[SOURCE: download-thanks]` is prepended to the notes field so the
 * support inbox can distinguish submissions that came from this entry
 * point vs the explicit /banks/submit form.  Useful for measuring
 * which surface actually produces samples.
 */
export function DownloadDmgButton({
  href,
  versionLabel,
}: {
  href: string;
  versionLabel: string;
}) {
  const [downloadStarted, setDownloadStarted] = useState(false);

  return (
    <>
      <a
        href={href}
        className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-[#0F766E] px-4 text-sm font-semibold text-white hover:bg-[#115E59]"
        data-cta="download-dmg"
        onClick={() => {
          track("dmg_download_clicked", {
            version: versionLabel || "unknown",
          });
          // Fire to MindSpire's analytics endpoint too (Pass 5.0).
          // Two destinations is intentional: Vercel Analytics for
          // free dashboards, our own table for queryable funnels +
          // cross-product correlation later.
          trackEvent("download_click", {
            version: versionLabel || "unknown",
          });
          // Reveal the opt-in panel.  We do NOT preventDefault — the
          // browser keeps handling the .dmg download as a normal
          // anchor click.  setState fires while the download begins
          // in the background.
          setDownloadStarted(true);
        }}
      >
        Download CentProof.dmg
      </a>

      {downloadStarted ? (
        <DownloadStartedPanel versionLabel={versionLabel} />
      ) : null}
    </>
  );
}

type FormState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string }
  | { kind: "success"; bank: string; email: string };

/**
 * Inline "did your bank work?" opt-in.  Shows beneath the Download
 * button immediately after click.  Designed to be one of three
 * destinations from this moment:
 *
 *   1. Fill it out  → POST /api/bank-request → SMTP to support
 *   2. Skip          → component unmounts, no further nagging
 *   3. Want more?   → link to full /banks/submit form
 */
function DownloadStartedPanel({ versionLabel }: { versionLabel: string }) {
  const [dismissed, setDismissed] = useState(false);
  const [canShareSample, setCanShareSample] = useState(false);
  const [state, setState] = useState<FormState>({ kind: "idle" });

  if (dismissed) return null;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.kind === "submitting") return;

    const form = new FormData(e.currentTarget);
    const bank = String(form.get("bank") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();

    if (!bank || !email) {
      setState({
        kind: "error",
        message: "Please add both your bank name and email.",
      });
      return;
    }

    setState({ kind: "submitting" });

    // Notes payload carries provenance + sample willingness so the
    // support inbox can route + prioritize without a separate API.
    const noteLines = [
      `[SOURCE: download-thanks]`,
      versionLabel ? `[VERSION: ${versionLabel}]` : null,
      canShareSample ? `[CAN SHARE REDACTED SAMPLE]` : null,
    ].filter((line): line is string => line !== null);

    const payload = {
      bank,
      email,
      notes: noteLines.join("\n"),
      // Honeypot stays empty for real submissions.
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
            "We couldn't send that. Try again, or email support@centproof.com directly.",
        });
        return;
      }
      // Fire-and-forget analytics — useful to know how many download
      // clicks convert into bank opt-ins.
      trackEvent("download_optin_submitted", { bank });
      setState({ kind: "success", bank, email });
    } catch {
      setState({
        kind: "error",
        message:
          "Network error. Try again, or email support@centproof.com directly.",
      });
    }
  }

  if (state.kind === "success") {
    return (
      <div className="mt-6 rounded-2xl border border-[#0F766E]/30 bg-[#F0FDFA] p-5">
        <p className="text-sm font-semibold text-[#0F766E]">✓ Got it.</p>
        <p className="mt-2 text-sm leading-6 text-[#0F172A]">
          We&apos;ll email <strong>{state.email}</strong> when we add a parser
          for <strong>{state.bank}</strong>. If we need a redacted sample
          first, you&apos;ll hear from us within 1&ndash;2 business days.
        </p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="mt-3 text-xs font-semibold text-[#0F766E] hover:underline"
        >
          Dismiss
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl border border-[#0F766E]/20 bg-[#F0FDFA] p-5">
      <p className="text-sm font-semibold text-[#0F766E]">
        ✓ Download started — check your Downloads folder.
      </p>

      <div className="mt-4 border-t border-[#0F766E]/15 pt-4">
        <p className="text-sm font-semibold text-[#0F172A]">
          Optional: don&apos;t see your bank in our list?
        </p>
        <p className="mt-2 text-sm leading-6 text-[#475569]">
          CentProof writes a new parser from one redacted sample statement.
          Tell us once and we&apos;ll email when yours ships. Skip if
          you&apos;d rather just explore the app first.
        </p>

        <form onSubmit={onSubmit} className="mt-4 space-y-3" noValidate>
          {/* Honeypot — same pattern as /banks/submit.  Real users
              never see it.  Bots fill every input they find. */}
          <div
            aria-hidden="true"
            className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
          >
            <label htmlFor="download-optin-website">
              Website (do not fill)
            </label>
            <input
              id="download-optin-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div>
            <label
              htmlFor="download-optin-bank"
              className="sr-only"
            >
              Bank or card name
            </label>
            <input
              id="download-optin-bank"
              name="bank"
              type="text"
              required
              maxLength={80}
              placeholder="Bank or card name (e.g. Schwab Checking)"
              autoComplete="off"
              className="block w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] shadow-sm placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30"
            />
          </div>

          <div>
            <label htmlFor="download-optin-email" className="sr-only">
              Your email
            </label>
            <input
              id="download-optin-email"
              name="email"
              type="email"
              required
              placeholder="Your email"
              autoComplete="email"
              className="block w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] shadow-sm placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30"
            />
          </div>

          <label
            htmlFor="download-optin-sample"
            className="flex cursor-pointer items-start gap-2 text-xs leading-5 text-[#475569]"
          >
            <input
              id="download-optin-sample"
              type="checkbox"
              checked={canShareSample}
              onChange={(e) => setCanShareSample(e.target.checked)}
              className="mt-0.5 size-3.5 cursor-pointer rounded border-[#CBD5E1] text-[#0F766E] focus:ring-[#0F766E]/40"
            />
            <span>
              I can email a redacted sample statement if it helps. (We&apos;ll
              reply with redaction instructions before you send anything.)
            </span>
          </label>

          {state.kind === "error" ? (
            <div
              role="alert"
              className="rounded-lg border border-[#FCA5A5] bg-[#FEF2F2] px-3 py-2 text-xs text-[#991B1B]"
            >
              {state.message}
            </div>
          ) : null}

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="submit"
              disabled={state.kind === "submitting"}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-[#0F766E] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#115E59] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {state.kind === "submitting" ? "Sending…" : "Tell us"}
            </button>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="text-sm font-semibold text-[#475569] hover:text-[#0F172A]"
            >
              Skip — I&apos;ll explore on my own
            </button>
          </div>
        </form>

        <p className="mt-4 text-xs leading-5 text-[#64748B]">
          Want to write a longer note?{" "}
          <Link
            href="/banks/submit"
            className="font-semibold text-[#0F766E] hover:underline"
          >
            Use the full request form →
          </Link>
        </p>

        <p className="mt-3 border-t border-[#0F766E]/15 pt-3 text-xs leading-5 text-[#64748B]">
          <strong className="font-semibold text-[#0F172A]">
            How this is stored:
          </strong>{" "}
          we don&apos;t have a customer database. Your message goes straight
          to our team inbox at{" "}
          <a
            href="mailto:support@centproof.com"
            className="font-semibold text-[#0F766E] hover:underline"
          >
            support@centproof.com
          </a>
          . Reply STOP and we delete it.
        </p>
      </div>
    </div>
  );
}
