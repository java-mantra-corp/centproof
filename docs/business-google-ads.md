# CentProof Business — Google Ads playbook

Reference for the **CentProof Business** Search campaign (bookkeepers / accountants).
Captures the exact setup we shipped, the rationale, and the weekly routine that
keeps spend efficient. Reuse this as the template for any future campaign.

---

## Why this campaign exists (the strategy)

The original **consumer** campaign was structurally unprofitable:

- $606 spend → **4 customers = ~$151 CAC** on a $49 product. Paying ~$151 to make ~$40.
- 1,090 clicks → 4 sales = **0.37% conversion.** The $0.55 CPC was cheap; the *conversion* was the problem.
- Paid search only works when **LTV > CAC**. A $49 one-time consumer product can't support it.

**Business changes the math:**

| | Consumer (Pro) | Business |
|---|---|---|
| Price / LTV | $49 once | $299 once, or $29/mo (~$350+/yr) |
| Intent | "nice to have" | solving a **paid work problem** |
| CAC it sustains | ~$20–30 | **$100–150 and still profitable** |

Higher LTV + higher-intent search keywords = paid search can actually work. **Target CAC: under ~$100.**

---

## Campaign settings (as shipped)

| Setting | Value |
|---|---|
| Campaign name | centProof Business |
| Type | Search (built via "Create a campaign without guidance") |
| Objective | (none / without guidance) — avoids Performance Max default |
| Final URL | `https://centproof.com/business` (message-match is the #1 conversion lever) |
| Networks | **Google search ONLY** — Search partners OFF, Display OFF |
| Locations | United States · **Presence** (not "presence or interest") |
| Languages | English |
| Bidding | **Maximize clicks** + **max CPC cap $4.00** |
| Budget | **$20/day** (~$600/mo) — daily budget type |
| AI Max | **OFF** (no broad expansion, no Final URL expansion, no text customization) |
| Broad match keywords | **OFF** — use keyword match types |
| Auto-created assets | **OFF** — use only assets I provide |
| Dynamic Search Ads | not configured (leave off) |
| Conversion goal | Account-default: Purchases |
| Display path | `centproof.com/Business/QuickBooks` |
| Business name | CentProof |

> ⚠️ **Advertiser verification** must be completed (Admin → account settings → verification),
> or Google pauses ads after a grace period. Advertise as Java Mantra Corp; needs business docs.

---

## Keywords (phrase `"..."` / exact `[...]` only — never broad)

Active workhorses:
```
[bank statement converter]
"bank statement converter"
"bank statement to excel"
"convert bank statement to csv"
"bank statement to quickbooks"
"pdf bank statement to csv"
[bank statement to quickbooks]
[convert bank statement to qbo]
```
Added (currently "Low search volume" — dormant, auto-activate if volume rises; harmless):
```
"convert bank statement to quickbooks"
"bank statement to qbo"
"bank statement converter for bookkeepers"
"bank statement to csv for accountants"
```

**Rule of thumb:** describes *what you sell* (convert/export bank statement) → Search keyword.
Describes *what you're avoiding* (cloud, free, jobs) → Negative keyword.

## Negative keywords (campaign-level)
```
free
freeware
template
sample
jobs
salary
course
hire
"near me"
become
"statement of account"
bookkeeper
bookkeepers
accountant
accountants
"cloud accounting"
```
> Don't add these as *positive* keywords by mistake (we caught that once). They go in the
> **Keywords → Negative keywords** tab, at campaign scope.

---

## Ad copy (Responsive Search Ad → `/business`)

Headlines (≤30 chars each, 15 separate fields — Google rotates ~3 at a time):
```
Bank Statements to QuickBooks
PDF Bank Statements to CSV
Convert Statements on Your Mac
Bank Statement Converter
Built for Bookkeepers
Reconciled to the Cent
Batch-Import Whole Folders
Unlimited Clients, One Price
14-Day Free Trial
No Cloud. All on Your Mac.
Export to QuickBooks & OFX
A Workspace Per Client
No Bank Passwords
Tired of Manual Entry?
Statements to Clean Books
```
Descriptions (≤90 chars each, 4 separate fields):
```
Turn client bank-statement PDFs into reconciled CSV, OFX & QuickBooks files. On your Mac.
A separate workspace per client. Batch-import whole folders. Reconcile to the cent.
No bank passwords, no cloud sync, no per-seat fees. Private by design. 14-day free trial.
Export to QuickBooks (QBO/QFX), OFX, or CSV. Built for bookkeepers & accountants.
```
Callouts: `No bank passwords` · `No cloud sync` · `Reconcile to the cent` · `14-day free trial` · `Unlimited clients`
Sitelinks: Business Pricing → `/pricing#business` · Supported Banks → `/banks` · Privacy → `/privacy`

> ❌ **Never** describe CentProof as "cloud-based" / "cloud software" — it's local-first, no cloud sync.
> Google's AI generated that once; it's false and undermines the core differentiator. Always review AI assets.

---

## Conversion tracking

- **Vercel env vars** (Production): `NEXT_PUBLIC_GOOGLE_TAG_ID` (`AW-…`) and `NEXT_PUBLIC_GADS_CONVERSION_LABEL`.
  The conversion only fires when **both** are set. They're build-time vars → redeploy after changing.
- The conversion fires on the **"Buy" button click** (checkout *intent*) — the visitor then leaves to
  LemonSqueezy, so the site can't see the completed purchase. Set the Google Ads conversion action's
  category to **"Begin checkout"**, value = "use different values for each conversion".
- `components/CheckoutLink.tsx` reports each plan's real value (Business Lifetime 299, Business Monthly 29,
  Pro Lifetime 49, Pro Monthly 5) so value-based bidding optimizes toward the most valuable conversions.
- **Future upgrade:** import true purchases via offline conversions — `app/api/webhook/lemonsqueezy/route.ts`
  already receives `order_created`, so the GCLID→sale loop is buildable when the campaign has traffic.

---

## Weekly routine (the discipline that protects ROI)

**Days 1–7 (and weekly after):**
- [ ] Open the **Search Terms report** → negative-out anything irrelevant. This is the #1 anti-CAC-bloat habit.
- [ ] **Pause any keyword** with ~40+ clicks and **0 trial starts**.
- [ ] Measure **cost-per-trial-start**, not cost-per-click.
- [ ] If impressions are thin on the QuickBooks terms, raise the **CPC cap to $5–6**.

**Scaling / switching gears:**
- After **~15–30 conversions**, switch bidding from **Maximize clicks → Maximize conversions** (smart bidding
  needs that data pool to work; before then it starves or overspends).
- Raise the **daily budget** only on the keywords/searches proving out (budget amount is changeable anytime).
- Consider testing **AI Max** only after the tight campaign has weeks of data to compare against.

**Targets:** CAC under ~$100 · keep match types phrase/exact · networks partners+Display OFF · ads must stay accurate (no "cloud").
