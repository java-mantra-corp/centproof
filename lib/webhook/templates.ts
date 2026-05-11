/**
 * Email body templates (Phase 5.11).
 *
 * Plain text is the primary; HTML is a light wrapper for clients
 * that prefer it.  Both are sent in the multipart message.  We
 * deliberately keep these short and free of marketing fluff —
 * users opening the license email want the key, not a sales pitch.
 */

import type { LicenseType } from "./license";

interface LicenseEmailVars {
  name: string;
  licenseKey: string;
  type: LicenseType;
  exp: string | null;
  purchaseId: string;
  accountUrl: string;
  supportEmail: string;
}

export function renderLicenseEmail(
  vars: LicenseEmailVars,
  isRenewal: boolean,
): { subject: string; text: string; html: string } {
  const tierLabel = vars.type === "lifetime" ? "Pro Lifetime" : "Pro Monthly";
  const subject = isRenewal
    ? `Your CentProof license has been renewed`
    : `Your CentProof ${tierLabel} license`;

  const greetingName = vars.name.split(/\s+/)[0] || vars.name; // first name

  const expLine =
    vars.type === "lifetime"
      ? "This is a lifetime license — no expiry, includes 1 year of updates."
      : `Subscription renews on ${vars.exp ?? "—"}.  License will refresh automatically.`;

  // Lifetime purchases have nothing to "manage" — no recurring billing,
  // no subscription portal.  Monthly purchases get an explicit pointer
  // to LemonSqueezy's customer-portal link, which arrives in the
  // separate receipt email LS sends (we deliberately don't try to
  // mint our own portal URL — LS owns the magic-link auth flow and
  // any URL we hard-code here would be guesswork).
  const manageLine =
    vars.type === "lifetime"
      ? "" // nothing to manage for lifetime licenses
      : `To update billing or cancel: open the receipt email from LemonSqueezy and click "Manage subscription" — that link logs you into your customer portal.\n\n`;

  const text = `Hi ${greetingName},

${
  isRenewal
    ? `Your CentProof Pro Monthly subscription has renewed.  Below is your refreshed license key — paste it into the app to extend your access:`
    : `Thanks for buying CentProof ${tierLabel}.  Your license key is below.  Paste it into the app to activate Pro features:`
}

------ BEGIN LICENSE ------
${vars.licenseKey}
------ END LICENSE ------

To activate:
  1. Open CentProof on your Mac
  2. ⌘, → License
  3. Paste the key above
  4. Click Activate

${expLine}

${manageLine}Need help?  Reply to this email or write to ${vars.supportEmail}.
We answer every message ourselves.

Purchase ID: ${vars.purchaseId}

— Java Mantra Corp
   centproof.com
`;

  const html = `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, system-ui, 'Helvetica Neue', sans-serif; max-width: 580px; margin: 0 auto; padding: 24px; color: #1e293b; line-height: 1.55;">
  <p>Hi ${escapeHtml(greetingName)},</p>

  <p>${
    isRenewal
      ? "Your CentProof Pro Monthly subscription has renewed.  Below is your refreshed license key — paste it into the app to extend your access:"
      : `Thanks for buying CentProof <strong>${escapeHtml(tierLabel)}</strong>.  Your license key is below.  Paste it into the app to activate Pro features:`
  }</p>

  <pre style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; font-family: 'SF Mono', Menlo, monospace; font-size: 12px; word-break: break-all; white-space: pre-wrap; overflow-x: auto;">${escapeHtml(vars.licenseKey)}</pre>

  <p><strong>To activate:</strong></p>
  <ol>
    <li>Open CentProof on your Mac</li>
    <li>Press <kbd style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: monospace;">⌘,</kbd> → <strong>License</strong></li>
    <li>Paste the key above</li>
    <li>Click <strong>Activate</strong></li>
  </ol>

  <p style="color: #64748b; font-size: 13px;">${escapeHtml(expLine)}</p>

  <p style="color: #64748b; font-size: 13px;">
    ${
      vars.type === "lifetime"
        ? ""
        : `To update billing or cancel: open the receipt email from LemonSqueezy and click "Manage subscription" — that link logs you into your customer portal.<br/>`
    }
    Need help?  Reply to this email or write to <a href="mailto:${escapeAttr(vars.supportEmail)}" style="color: #0ea5e9;">${escapeHtml(vars.supportEmail)}</a>.  We answer every message ourselves.
  </p>

  <p style="color: #94a3b8; font-size: 11px; margin-top: 32px;">
    Purchase ID: <code>${escapeHtml(vars.purchaseId)}</code><br/>
    — Java Mantra Corp · <a href="https://centproof.com" style="color: #94a3b8;">centproof.com</a>
  </p>
</body>
</html>`;

  return { subject, text, html };
}

interface CancelEmailVars {
  name: string;
  exp: string | null;
  accountUrl: string;
  supportEmail: string;
}

export function renderCancelEmail(
  vars: CancelEmailVars,
): { subject: string; text: string; html: string } {
  const subject = "Your CentProof subscription has been cancelled";
  const greetingName = vars.name.split(/\s+/)[0] || vars.name;

  // accountUrl env points at the marketing-site pricing page — that's
  // where a cancelled subscriber would go to come back.  We don't have
  // (and don't want) a "manage your account" page since we don't run a
  // user database — LemonSqueezy is the source of truth for billing.
  const text = `Hi ${greetingName},

Your CentProof Pro Monthly subscription has been cancelled.

You'll keep Pro access through ${vars.exp ?? "the end of your current billing period"}.  After that, CentProof drops back to Free Test Mode — your existing data stays accessible exactly as it is, only new imports / Ask CentProof / full exports get gated.

Want to come back?  Resubscribe any time at ${vars.accountUrl}.

If something pushed you out, we'd love to hear what.  Just reply to this email — your feedback shapes the next version.

— Java Mantra Corp
   ${vars.supportEmail}
   centproof.com
`;

  const html = `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, system-ui, 'Helvetica Neue', sans-serif; max-width: 580px; margin: 0 auto; padding: 24px; color: #1e293b; line-height: 1.55;">
  <p>Hi ${escapeHtml(greetingName)},</p>
  <p>Your CentProof Pro Monthly subscription has been cancelled.</p>
  <p>You'll keep Pro access through <strong>${escapeHtml(vars.exp ?? "the end of your current billing period")}</strong>.  After that, CentProof drops back to Free Test Mode — your existing data stays accessible exactly as it is, only new imports / Ask CentProof / full exports get gated.</p>
  <p>Want to come back?  Resubscribe any time at <a href="${escapeAttr(vars.accountUrl)}" style="color: #0ea5e9;">${escapeHtml(vars.accountUrl)}</a>.</p>
  <p style="color: #64748b; font-size: 13px;">If something pushed you out, we'd love to hear what.  Just reply to this email — your feedback shapes the next version.</p>
  <p style="color: #94a3b8; font-size: 11px; margin-top: 32px;">— Java Mantra Corp · <a href="mailto:${escapeAttr(vars.supportEmail)}" style="color: #94a3b8;">${escapeHtml(vars.supportEmail)}</a> · <a href="https://centproof.com" style="color: #94a3b8;">centproof.com</a></p>
</body>
</html>`;

  return { subject, text, html };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(s: string): string {
  return escapeHtml(s);
}
