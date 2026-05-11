/**
 * Email sending via Resend (Phase 5.11).
 *
 * Resend's HTTP API works in any modern fetch-capable runtime —
 * Cloudflare Workers, Vercel Edge, plain Node 18+.  No SDK
 * dependency; one POST call.
 *
 * The from-address must be on a verified Resend sending domain.
 * Until centproof.com is set up in Resend, set RESEND_FROM_EMAIL to
 * an existing verified address (your @javamantra.com domain works
 * if MindSpire Focus already had Resend set up).
 *
 * We send TWO email types:
 *   - "license"          fresh license issuance / renewal
 *   - "subscription_end" subscription cancelled or expired (no key
 *                        included; just a polite note)
 *
 * No email is sent on payment_failed / refund — the user already
 * gets those from LemonSqueezy directly, and we don't want to add
 * to the noise.
 */

export interface SendEmailArgs {
  to: string;
  fromEmail: string;
  subject: string;
  text: string;
  html: string;
  /** Optional reply-to.  Defaults to the from-address. */
  replyTo?: string;
}

export async function sendEmail(
  args: SendEmailArgs,
  resendApiKey: string,
): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from: args.fromEmail,
      to: [args.to],
      subject: args.subject,
      text: args.text,
      html: args.html,
      reply_to: args.replyTo ?? args.fromEmail,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend API ${res.status}: ${body}`);
  }
}
