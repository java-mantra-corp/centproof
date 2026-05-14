/**
 * Email body templates (Phase 5.11).
 *
 * Plain text is the primary; HTML is a light wrapper for clients
 * that prefer it.  Both are sent in the multipart message.  We
 * deliberately keep these short and free of marketing fluff —
 * users opening the license email want the key, not a sales pitch.
 */

import type { LicenseType } from "./lemonsqueezy";

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
      : vars.exp
        ? `Subscription renews on ${vars.exp}.  License will refresh automatically.`
        : // LS keeps `expires_at: null` on subscription license keys —
          // the subscription state lives separately — so we never get
          // a concrete renewal date on license_key_created.  Use a
          // cleaner generic wording instead of "renews on —".
          "Your monthly subscription is active.  The license refreshes automatically with each billing cycle.";

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

On an older CentProof version (0.1.0)?  If you see "malformed
license key" when pasting, your app needs the v0.1.1 update first.
Go to CentProof menu → About CentProof → Check for Updates…, install
the update, then paste the key again.

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

  <div style="background: #fef3c7; border-left: 3px solid #f59e0b; padding: 10px 14px; margin: 12px 0; font-size: 13px; color: #78350f; border-radius: 4px;">
    <strong>On an older CentProof (v0.1.0)?</strong>  If you see
    <em>"malformed license key"</em> when pasting, your app needs
    the v0.1.1 update first.  Open <strong>CentProof menu → About
    CentProof → Check for Updates…</strong>, install the update,
    then paste the key again.
  </div>

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

interface PaymentFailedEmailVars {
  name: string;
  /** Next-retry date from LS's `renews_at` (ISO YYYY-MM-DD).  When LS
   *  doesn't ship one, we soften the wording to "in a few days". */
  exp: string | null;
  /** Direct link to LS customer portal where the user can update
   *  their card.  Falls back to /pricing if the LS event omitted it. */
  portalUrl: string;
  accountUrl: string;
  supportEmail: string;
}

/**
 * Branded follow-up to LS's generic dunning email.  LS retries failed
 * charges a few times over ~7 days; if the user does nothing, their
 * license becomes inactive and the next time they open CentProof
 * they're dropped to Free Tier with a "Subscription expired" banner.
 *
 * We send this so the user sees a recognisable CentProof email
 * specifically — LS's own dunning emails look generic and get
 * spam-foldered too often.  Subject line is deliberately calm:
 * "couldn't process your latest payment", not "ACTION REQUIRED" —
 * LS will keep retrying and most card failures are recoverable
 * (expired card, momentary network issue) without any user panic.
 */
export function renderPaymentFailedEmail(
  vars: PaymentFailedEmailVars,
): { subject: string; text: string; html: string } {
  const subject = "We couldn't process your latest CentProof payment";
  const greetingName = vars.name.split(/\s+/)[0] || vars.name;
  const deadlinePhrase = vars.exp
    ? `If we can't process the payment by ${vars.exp}`
    : "If we can't process the payment after a few retries";

  const text = `Hi ${greetingName},

LemonSqueezy (our payment processor) couldn't charge your card for the latest CentProof Pro Monthly renewal.  Most often this is an expired card, a temporary bank decline, or a saved card that needs re-authorising.

We'll retry the charge automatically a few times over the next few days.  ${deadlinePhrase}, your Pro features will pause and CentProof will drop back to Free Test Mode (your imported data stays exactly where it is — only new imports / Ask CentProof / full exports get gated).

To fix it now:
  1. Open the customer portal:
     ${vars.portalUrl}
  2. Update or re-add your payment method
  3. The next retry will succeed and Pro stays active

If you'd rather cancel, the customer portal has a cancel link too — no charge, no questions.

Need help?  Reply to this email or write to ${vars.supportEmail}.  We answer every message ourselves.

— Java Mantra Corp
   centproof.com
`;

  const html = `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, system-ui, 'Helvetica Neue', sans-serif; max-width: 580px; margin: 0 auto; padding: 24px; color: #1e293b; line-height: 1.55;">
  <p>Hi ${escapeHtml(greetingName)},</p>

  <p>LemonSqueezy (our payment processor) couldn't charge your card for the latest CentProof Pro Monthly renewal.  Most often this is an expired card, a temporary bank decline, or a saved card that needs re-authorising.</p>

  <p>We'll retry the charge automatically a few times over the next few days.  <strong>${escapeHtml(deadlinePhrase)}</strong>, your Pro features will pause and CentProof will drop back to Free Test Mode (your imported data stays exactly where it is — only new imports / Ask CentProof / full exports get gated).</p>

  <p style="text-align: center; margin: 28px 0;">
    <a href="${escapeAttr(vars.portalUrl)}" style="display: inline-block; background: #0ea5e9; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600;">Update payment method</a>
  </p>

  <p style="color: #64748b; font-size: 13px;">If you'd rather cancel, the customer portal has a cancel link too — no charge, no questions.</p>

  <p style="color: #64748b; font-size: 13px;">Need help?  Reply to this email or write to <a href="mailto:${escapeAttr(vars.supportEmail)}" style="color: #0ea5e9;">${escapeHtml(vars.supportEmail)}</a>.  We answer every message ourselves.</p>

  <p style="color: #94a3b8; font-size: 11px; margin-top: 32px;">— Java Mantra Corp · <a href="https://centproof.com" style="color: #94a3b8;">centproof.com</a></p>
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
