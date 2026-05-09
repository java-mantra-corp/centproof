# CentProof — Product Overview

> **Note for the writer:** This document is structured so each section can be lifted directly into either the **homepage** (short, punchy) or the **product details page** (long-form). Sections are tagged with [HOMEPAGE], [DETAILS], or [BOTH] in the headings.

---

## 1. The One-Line Pitch [HOMEPAGE]

**CentProof is a personal finance app that reads your bank statements, finds the patterns, and answers your money questions — entirely on your Mac.**

Three other ways to say the same thing, depending on hero tone:

- **For the privacy-led hero:** *Your bank statements stay on your Mac. So does the AI.*
- **For the accuracy-led hero:** *Every dollar accounted for, down to the cent. Right on your Mac.*
- **For the AI-led hero:** *Ask your money anything. Get answers offline.*

---

## 2. The Three-Paragraph Pitch [HOMEPAGE]

Most personal finance apps want your bank password, sync your transactions to their cloud, and feed your spending data to whoever pays them. We didn't want any of that. So we built CentProof.

You drop in the PDF statements you already download from your bank. CentProof parses them — every transaction, every penny — and gives you a clean, searchable history of your money. Local AI handles the smart parts: cleaning up merchant names, spotting recurring charges, finding anomalies, summarizing the month, even letting you ask plain-English questions like *"how much did I spend on dining last quarter?"*

Nothing leaves your Mac. Not your statements, not your questions, not your account numbers. There's no bank connection, no cloud sync, no telemetry. Just a desktop app that works the way personal finance apps used to work — except smarter, because the AI runs locally.

---

## 3. Why CentProof Exists [DETAILS]

Personal finance software has gotten worse, not better. Mint shut down. The replacements — Monarch, Copilot, Rocket Money, Empower — all ask for the same thing: your bank login, sent through a third-party aggregator, with your transaction history living on someone else's server forever.

For a lot of people, that's a hard no. Either because:

- **Their bank doesn't play nicely with Plaid** (credit unions, business accounts, smaller banks, foreign banks)
- **They had a bad experience** (sync breaking every two weeks, accounts getting locked out, MFA loops)
- **They simply don't want their bank credentials sitting in a third-party vault** they didn't audit
- **They want to use AI** for the smart features but don't want their financial data going to OpenAI or anyone else

CentProof is for those people. It does the same job — reconciliation, categorization, recurring detection, insights, search — without ever touching your bank's website. You give it the same PDF you'd download to do your taxes; it does the rest.

---

## 4. What Makes CentProof Different [BOTH]

Four pillars. Use these as homepage feature cards or detail-page section headers.

### 4.1 Local-first, period

**Your bank statements never leave your Mac.** No cloud sync. No bank connection. No third-party aggregator. The app reads your PDFs, stores everything in a local database on your machine, and that's where it stays. If you delete the app, your data is gone with it. (Export tools are built in, so you're never locked out of your own history.)

### 4.2 Local AI, not cloud AI

CentProof ships with a small, capable AI model that runs on your Mac. It's a Qwen-class model around 3 billion parameters — small enough to run smoothly on Apple Silicon (M1 or newer), big enough to be genuinely useful for finance tasks. It powers:

- Merchant name cleanup ("AMZN MKTP US*4F8H2..." → "Amazon")
- Recurring subscription detection
- Anomaly explanations ("This $890 charge at Costco is 4× larger than your average")
- Monthly summaries written in plain English
- Natural-language queries ("how much on dining this year?")

When you ask a question, **the question never leaves your Mac.** Same for the answer. We don't send anything to OpenAI, Anthropic, or any other cloud AI provider. Ever.

If you'd rather use a cloud model (or your own self-hosted one) you can — Preferences → AI lets you point CentProof at any OpenAI-compatible endpoint — but the bundled local model is the default and works offline.

### 4.3 Accuracy down to the cent

The product is named after the promise: every aggregate, every total, every "you spent $X" answer is backed by the actual transactions that produced it. When CentProof says you spent $130 on dining in 2024, you can click and see the two transactions — the $115 dinner and the $15 lunch — that produced that number. AI answers come with their receipts, literally.

This matters for two reasons:
1. **Trust.** AI gets things wrong. CentProof's UI is built so a wrong answer is one click from being obvious.
2. **Tax season.** Numbers you can prove are numbers you can file.

### 4.4 Mac-native, not a browser tab

CentProof is a real macOS application — not Electron, not a wrapped webpage. It opens fast, uses native macOS conventions (menubar, keyboard shortcuts, file dialogs), and feels like it belongs on your machine. It's small enough to fit in your Applications folder without a fuss and works offline indefinitely.

---

## 5. Features — The Full Tour [DETAILS]

Organized by what you actually do with the app. Each feature notes whether it's **Available now** or **Coming soon**.

### 5.1 Statement Import & Parsing — *Available now*

Drag a PDF in, or use **File → Import**. CentProof recognizes statements from major US banks and credit cards out of the box:

- Bank of America (checking, savings, credit cards)
- Capital One (checking, savings, credit cards)
- Apple Card
- American Express
- Discover
- Citi
- US Bank
- Chase (checking, savings, credit cards)
- Wells Fargo

Each statement is parsed cell-by-cell — dates, descriptions, amounts, running balances. Math is reconciled against the statement's own opening/closing balance, so you'll know immediately if a row got missed or double-counted.

**Coming soon:** Schwab, Fidelity, USAA, Navy Federal Credit Union. *(If your bank isn't on the list, there's a "Share a sample" button in the app — we add new banks regularly.)*

### 5.2 Transactions View — *Available now*

The main workspace. Filter by:
- Date range
- Account
- Category
- Merchant
- Amount range
- Direction (debit/credit)
- Free-text search

Inline editing for category, merchant tag, and notes. Bulk actions for multi-select. Export to CSV, OFX, QFX (for tax software), or plain JSON.

### 5.3 Smart Tagging (Entities + Categories) — *Available now*

Raw bank data is hostile to humans. *"AMZN MKTP US*4F8H2"* doesn't mean anything; *"Amazon"* does. CentProof learns once and applies forever:

- Tag *"AMZN MKTP US*4F8H2"* as **Amazon** → the AI will recognize *"AMZN MKTP US*7K3L8"* as Amazon next time too.
- Same for categories (*Trader Joes* → **Groceries**)
- Same for notes (*"Alice's birthday gift"* against a specific transaction)
- Bulk apply: tag once, retroactively apply to all matching past transactions
- Bulk remove: change your mind, untag everything in one click

Behind the scenes, CentProof uses a combination of exact match, normalized match, and fuzzy AI similarity to apply your tags to new transactions. You stay in control — every auto-tag is shown as "auto" until you confirm it.

### 5.4 Recurring Subscriptions — *Available now*

CentProof scans your full history and surfaces every monthly, weekly, or annual charge automatically. You see:

- Every active subscription (Netflix, Spotify, gym, software tools)
- The exact monthly cost
- The total annual cost
- When the next charge is expected
- A simple "is this still alive?" indicator (was there a charge this month?)

The use case writes itself: most people are surprised when they add up their subscriptions. CentProof does the adding.

### 5.5 Cleanup Inbox — *Available now*

Imported a year of statements? You'll have hundreds of transactions with raw, unfriendly descriptions. The Cleanup Inbox is a focused workspace that walks you through them, one merchant at a time. Tag *"AMZN MKTP US*"* once and clean up 47 transactions in one click. The AI suggests a clean name for each; you accept, edit, or skip.

Designed to make a year of cleanup take 10 minutes instead of 10 hours.

### 5.6 Cash-Flow Calendar — *Available now*

A monthly calendar grid showing actual income and spending per day. Past days show what really happened. Future days show *projected* values based on your recurring charges. Useful for:

- Knowing if you can afford that big purchase next Friday
- Spotting the days when most of your subscriptions hit
- Predicting your bank balance two weeks out

### 5.7 Anomaly Detection — *Available now*

CentProof watches for charges that look unusual *for you specifically* — not generic "is this big?" thresholds, but learned baselines per merchant and category. If you usually spend $40 at Costco and a $400 charge appears, it gets flagged. The local AI explains why ("4× larger than your typical Costco spend") and you decide if it's a mistake, a one-off, or a real change.

### 5.8 Monthly Diff — *Available now*

Side-by-side: what changed between this month and last. The AI writes a plain-English summary ("Spending up 14% — driven by a one-off vet visit and higher gas prices, partially offset by lower dining"). Useful as a monthly check-in or as the source for a personal end-of-month report.

### 5.9 Price Watch — *Available now*

Track specific merchants over time. Useful for:

- Spotting subscription price hikes (Netflix went from $15.99 to $17.99? CentProof tells you exactly when.)
- Watching your grocery spend at one store creep up
- Catching credit card "annual fee" surprises

### 5.10 Ask CentProof — *Available now*

The headline feature. Type a plain-English question, get a real answer:

- *"How much did I spend on dining this year?"*
- *"Top 5 merchants in 2026"*
- *"How many transactions on my Apple Card last month?"*
- *"Income from payroll this quarter"*
- *"Show all transactions over $200"*

Behind the scenes:
1. The local AI translates your question into a structured query
2. The query runs against your local database (sub-second)
3. The local AI phrases the answer in plain English
4. **Every answer is backed by the supporting transactions**, shown right below — so you can verify the math

The whole pipeline runs on your Mac. The AI doesn't see your data over the internet because the AI lives on your machine.

**Trust UX:** before showing an answer, CentProof shows *"Interpreted as: ..."* — a plain-English description of what it understood. If the interpretation is wrong, you see it instantly and can rephrase.

### 5.11 Reconciliation — *Available now*

Every imported statement is reconciled against its own opening/closing balance. If the math doesn't add up — a row was missed, a column was misread — CentProof flags it before you trust the data. No silent errors.

### 5.12 Local Backup & Export — *Available now*

Your data lives in a single local folder. You can back it up with Time Machine, copy it to an external drive, or export everything to CSV/JSON for use elsewhere. There's no vendor lock-in by design.

### 5.13 Tax / Export Workspace — *Coming soon (Pro tier)*

A dedicated workspace for tax season:
- Generate Schedule C-ready reports for freelancers and small business
- Mark transactions as deductible/non-deductible
- Export to TurboTax, H&R Block, FreshBooks formats
- Annual summary report with category breakdowns
- Mileage tracker (manual, not surveillance-based)

### 5.14 Receipt Attachments — *Coming soon*

Attach a photo or PDF of a receipt to any transaction. Useful for:
- Expense reimbursements
- Tax-deductible purchases
- Warranty proof

Stored locally. Searchable by transaction.

### 5.15 Auto-Update — *Coming soon*

Code-signed, notarized macOS app with automatic updates over an encrypted channel. You stay current; we never push anything else.

---

## 6. Who CentProof Is For [BOTH]

Five concrete personas. Use these as homepage testimonial-style sections or as "Who is this for?" expandable cards on the details page.

### 6.1 The Privacy-Conscious Professional

> Software engineer, security researcher, lawyer, doctor, or anyone who got nervous the first time Mint asked for their bank password.

**The pain:** Existing tools want a Plaid connection. You don't trust Plaid. You don't trust the next breach. You don't want your bank statements in someone else's cloud — even an encrypted one.

**Why CentProof:** Nothing leaves your Mac. Including the AI. You can verify this with Little Snitch, an air-gapped Mac, or a packet capture — there's no outbound connection during normal use.

### 6.2 The Freelancer / 1099 Worker

> Designer, developer, consultant, copywriter, anyone whose income is split across multiple clients and expenses are split across multiple cards.

**The pain:** Tax time is a multi-day forensic exercise. QuickBooks Self-Employed wants $20/month forever. Mint is dead. You end up in spreadsheets.

**Why CentProof:** One place to drop every PDF, every card, every account. Smart categorization that learns. Coming Pro tier with Schedule C-ready exports.

### 6.3 The Mac Power User

> Lives in shortcuts, hates web apps, has strong opinions about Spotlight, AppleScript, and Raycast.

**The pain:** Every modern finance app is a web wrapper that takes 8 seconds to load and breaks if your wifi blips. Even the "Mac apps" are Electron browsers in a window.

**Why CentProof:** Native macOS app. Opens in under a second. Works on a plane. Keyboard shortcuts everywhere. Integrates the way Mac apps used to.

### 6.4 The Couple With Combined Finances

> Married, partnered, or co-tenants splitting expenses across multiple shared and individual accounts.

**The pain:** Most finance tools are single-user-per-account, or charge per seat for shared. Combining a joint checking account with two individual credit cards is awkward in everything except spreadsheets.

**Why CentProof:** Add as many accounts as you want. Tag transactions by who paid. Filter by account or person. No per-seat pricing — one license, one Mac, all the data.

### 6.5 The Person Whose Bank Doesn't Sync

> Credit union member, foreign-bank account holder, business-account owner, anyone whose bank breaks Plaid every six weeks.

**The pain:** Every cloud finance tool advertises *"works with 12,000+ banks"* — but yours is the one that drops out, throws MFA loops, or just isn't supported.

**Why CentProof:** No Plaid. No live sync. No "sync broken" emails. If your bank gives you a PDF statement, CentProof works.

---

## 7. The Local AI Story [BOTH]

This section deserves its own page or pull-quote section because it's the strongest differentiator.

### 7.1 What "local AI" means here

CentProof bundles a small but genuinely capable language model — about 3 billion parameters, in the Qwen 2.5 family — that runs entirely on your Mac. It uses Apple Silicon's GPU when available (M1, M2, M3, M4) and falls back to CPU on Intel Macs. The model file is included in the app download (~2 GB) so there's no setup, no API key, no account.

### 7.2 What the local AI actually does

- **Translates your questions into queries.** When you type *"how much on dining last quarter"*, the model converts that to a structured query CentProof can run against your data. The model never sees your actual transactions in this step — only the question.
- **Polishes the answer.** After the query runs, the model is given the result (e.g., *"$1,234 across 47 transactions"*) and asked to phrase it conversationally (*"You spent $1,234 on dining last quarter — averaging $411/month."*).
- **Cleans up merchant names.** Parses raw descriptions like *"AMZN MKTP US*4F8H2"* into *"Amazon"*.
- **Summarizes monthly diffs.** Writes the plain-English narrative for what changed month-over-month.
- **Explains anomalies.** Says *why* a flagged transaction looks unusual.

### 7.3 What the local AI never does

- **Talk to the cloud.** All inference is local. The model is loaded into memory on your machine and never makes a network call.
- **Touch the SQL.** The AI proposes a query in a strict JSON format that we translate to safe, parameterized SQL ourselves. The AI never writes raw SQL against your database.
- **See data it doesn't need.** When phrasing an answer, the model only sees the aggregated result — not your full transaction history.

### 7.4 Why we picked a small local model over a big cloud one

A 70B-parameter cloud model would write nicer prose. But:

1. It would mean sending your financial questions to a third party.
2. It would require an internet connection to use the app at all.
3. It would mean charging you a recurring fee to cover inference costs.
4. It would mean adding a usage cap, because cloud inference isn't free.

A 3B local model is enough for the financial domain. It's not creative writing; it's "translate this question into a structured filter." Small models do that well, run fast on Apple Silicon, and run forever for free.

### 7.5 If you'd rather use your own model

Preferences → AI lets you point CentProof at any OpenAI-compatible endpoint — your own self-hosted Ollama, a private Llama deployment, or even a cloud provider if you accept that trade-off explicitly. The bundled model is the default for a reason, but the choice is yours.

---

## 8. Privacy & Security Promises [BOTH]

Use these as a numbered list on the homepage or as a dedicated "Privacy" page.

1. **No bank connection.** CentProof never asks for your bank password. There's no Plaid, no Yodlee, no Finicity, no aggregator at all.
2. **No cloud sync.** Your data lives in one folder on your Mac. We don't have a server that holds your data because we don't have a server.
3. **No telemetry.** CentProof does not phone home with anonymous usage stats, crash reports, or "diagnostic data". The app makes zero outbound network calls during normal use. *(The exception: when you explicitly check for updates, the app contacts our update server. You can disable this.)*
4. **No tracking.** No Google Analytics. No Mixpanel. No PostHog. No Sentry. No nothing.
5. **No ads.** Ever. We're not in the data business.
6. **The AI is local.** Your questions and your answers stay on your Mac. The AI does not have an internet connection.
7. **Your statements stay in your control.** You can export everything, delete everything, or back everything up — at any time, in standard formats.
8. **Open file formats.** Your data is in standard, well-documented files. If we ever go away, you still own your data and you can read it with anything.

---

## 9. What CentProof Doesn't Do (Yet) [DETAILS]

Honesty is part of the pitch. Here's what we don't ship yet:

- **No live bank sync.** This is by design — we don't want your bank password. You drop in PDFs you already download.
- **No mobile app.** macOS only, by design. iOS/iPadOS may come later.
- **No Windows or Linux build.** Not on the roadmap. We're a Mac-first product.
- **No investment tracking.** Brokerage statements are in scope for a future release; right now we focus on checking, savings, and credit cards.
- **No bill pay.** We're a tracking app, not a banking app.
- **No automatic transfers between accounts.** Same.
- **No budget envelopes (yet).** A simple budgeting workspace is on the roadmap. Today, you can use the search/filter and the cash-flow calendar to track against a mental budget.

---

## 10. Buyer Considerations / FAQ [BOTH]

Use these as the FAQ accordion on either page.

### 10.1 How is CentProof different from Mint, Monarch, Copilot, Rocket Money?

All those tools rely on connecting your bank account through Plaid (or similar). They sync your live transactions to their cloud, where their servers categorize and analyze them. CentProof does none of that. You drop in PDFs you download yourself. Everything runs on your Mac. The AI also runs on your Mac.

The trade-off: CentProof doesn't have "live" data — it's as fresh as your last imported PDF. For most people, that's a feature, not a bug. Statements come monthly. You import once a month. Done.

### 10.2 How is CentProof different from YNAB?

YNAB is excellent at *budgeting* — you tell it what you intend to spend, it holds you to it. CentProof is excellent at *understanding what you actually spent* — across all accounts, with smart categorization, AI insights, and verifiable totals. The two can be complementary; some users export from CentProof into YNAB. YNAB also requires a cloud sync. CentProof does not.

### 10.3 Do I need an internet connection?

Only to download the app and (optionally) check for updates. The app itself runs entirely offline. You can use CentProof on a plane, on a Mac that's never connected to the internet, in airplane mode — same experience.

### 10.4 What if my bank isn't supported?

There's a "Share a sample" button in the app. Send us a redacted PDF and we add support — usually within a release or two. We add new banks based on what users actually have, not on what makes a long marketing list.

### 10.5 What happens if CentProof goes out of business?

Your data is on your Mac, in standard formats. You can export everything to CSV, OFX, or JSON at any time. Even if we vanish, you keep your history. There's no cloud account to lose access to.

### 10.6 What does it cost?

*(Pricing copy lives on the pricing page — but for the FAQ:)*

CentProof is a one-time purchase. No subscription. Pay once, use forever, including all bug fixes and minor updates. A future Pro tier (with tax workspace, advanced exports, and other power features) will be a separate one-time upgrade. We are explicitly not building a SaaS — your relationship with the app should outlive your relationship with us.

### 10.7 Will it work on my Mac?

CentProof runs on macOS 13 (Ventura) or later. It works on both Apple Silicon (M1+) and Intel Macs, though the local AI is noticeably faster on Apple Silicon. RAM: 8 GB minimum, 16 GB recommended for smooth AI performance.

### 10.8 What about my partner's Mac? Family sharing?

One license = one Mac. A "household" license (3 Macs, one household) will be available for a small upgrade. Your data stays on each Mac independently — there's no automatic sync between machines (by design).

### 10.9 Can I use it for my small business?

Yes. CentProof handles multiple accounts, multiple cards, and tagged categorization. The Pro tier (coming) adds Schedule C-ready exports for sole proprietors and freelancers. For larger businesses with payroll and AR/AP, you'll outgrow CentProof — it's built for personal and solo-business finance, not full bookkeeping.

### 10.10 Is the AI accurate?

The AI is good but not perfect. That's why every AI-generated answer in CentProof is *backed by the actual transactions* it used. You see the receipts. If the AI got it wrong, you'll spot the wrong row immediately. The accuracy promise of CentProof isn't "the AI is always right" — it's "you can always check the AI."

### 10.11 What if I have a thousand transactions a month?

CentProof was built to handle a decade of statements without slowing down. Your local database is a single file, indexed for the queries the app actually runs. Search across 50,000 transactions returns in under a second on a base-spec M1.

### 10.12 What if I make a mistake — wrong category, wrong tag?

Everything in CentProof is reversible. Bulk apply, bulk remove, undo, edit, re-import. We treat your data as something you should always be able to fix. There's no "support ticket" required to undo your own edits.

---

## 11. Headline Copy Options [HOMEPAGE]

Pulled out separately because picking the headline is its own decision. Five candidates with different angles:

### Privacy angle
> **Your bank statements never leave your Mac.**
> A personal finance app that runs locally — including the AI.

### Accuracy angle
> **Every cent accounted for. Right on your Mac.**
> CentProof reads your statements, finds the patterns, and answers your money questions — with the receipts to prove it.

### AI angle
> **Ask your money anything. Offline.**
> The AI lives on your Mac. So do your statements. So do your answers.

### Anti-cloud angle
> **Personal finance without the cloud.**
> No bank connection. No sync. No subscription. Just your statements, your Mac, and a smart AI that runs locally.

### Mac-native angle
> **Finally, a finance app built for the Mac.**
> Native, fast, private. Bring your statements; the AI is included.

---

## 12. Three-Word Taglines [HOMEPAGE]

For nav, footer, social previews, etc. Pick one or rotate.

- **Local. Private. Smart.**
- **Statements in. Insights out.**
- **Your money. Your Mac.**
- **AI that stays home.**
- **Cents made sense.** *(plays on the name)*

---

## 13. Section: Why "CentProof"? [DETAILS]

The product is named for the promise: **proof, down to the cent.** Every total has its receipts. Every AI answer has its rows. Every aggregate is one click from being verified against your actual statement.

Other finance tools say *"trust us"*. CentProof says *"check the math"* — and shows it to you.

---

## 14. Call-to-Action Suggestions [HOMEPAGE]

For the bottom-of-page CTA. Three options at different commitment levels:

- **Low commitment:** *"See how it works"* → 2-minute video walkthrough
- **Medium commitment:** *"Try it on a sample statement"* → downloads a redacted demo PDF + the app, no purchase needed
- **High commitment:** *"Buy CentProof — $XX, one-time"*

---

## 15. Comparison Table [DETAILS]

A scannable side-by-side. Use as a section on the details page.

| | CentProof | Cloud sync apps (Mint-style) | Spreadsheet |
|---|---|---|---|
| Bank password required | No | Yes | No |
| Data stays on your Mac | Yes | No | Yes |
| Works offline | Yes | No | Yes |
| Smart categorization | AI, local | AI, cloud | Manual |
| AI Q&A | Yes, local | Maybe (cloud) | No |
| Recurring detection | Automatic | Automatic | Manual |
| Anomaly detection | Yes | Sometimes | No |
| Reconciliation | Built-in | Trust-based | Manual |
| Data ownership | You | Vendor | You |
| Pricing | One-time | Subscription | Free |
| Mac-native | Yes | No (web/Electron) | Yes |
| Telemetry | None | Extensive | None |

---

## 16. The Risk-Reversal / Trust-Building Section [HOMEPAGE]

Three short reassurance blurbs to put near the CTA. People shopping for finance tools have been burned before.

> **Try it without paying.** Download the app, import a sample statement we provide, and see exactly how it works before you spend a dollar.

> **Your data is yours forever.** Export to CSV, OFX, or JSON anytime. There's no vendor lock-in because there's no vendor cloud.

> **Pay once, own it.** No subscription. No recurring fee. Buy CentProof once and own this version forever, including bug fixes and small updates. Major upgrades (like the future Pro tier) are optional, one-time, and clearly separate.

---

## 17. Section: The Six-Step Workflow [DETAILS]

A simple "how it works" section for the details page or onboarding.

1. **Download CentProof** to your Mac. *(Includes the local AI — no separate setup.)*
2. **Drag in your statements.** PDFs from your bank, the same ones you'd download for taxes.
3. **CentProof parses everything.** Cell by cell, dollar by dollar, reconciled against the statement's own balance.
4. **Tag what matters.** First time you see an unfamiliar merchant, tag it once. CentProof learns and applies retroactively.
5. **Use the insights.** Recurring subscriptions, anomalies, monthly summaries, the cash-flow calendar — all populated automatically.
6. **Ask questions.** Type anything in plain English; the local AI answers, with the supporting transactions inline.

---

## 18. What's Coming Next (Roadmap) [DETAILS]

A short, honest roadmap section. Don't promise dates; do indicate sequence.

**Next up:**
- Tax / export workspace (Pro tier)
- Receipt attachments
- More bank parsers (Schwab, Fidelity, USAA, Navy Federal)
- Auto-updater + signed releases

**Further out:**
- Investment / brokerage statement support
- Simple budget envelopes
- Native macOS menu bar widget
- iCloud-encrypted sync between your own Macs *(opt-in, end-to-end, never servers)*

We'll never add: live bank sync, cloud sync to our servers, ads, telemetry. Those aren't on the roadmap because they're against the design.

---

## 19. Closing / Manifesto [HOMEPAGE]

For the bottom of the homepage, in a slightly larger or italicized block:

> *Personal finance software lost the plot. It got hungrier for your data, dependent on someone else's cloud, more expensive every year. CentProof is a quiet correction — a finance app that runs on your Mac, keeps your statements at home, and uses AI that doesn't need the internet to be smart. Buy it once. Own it. Use it for as long as your Mac runs.*

---

## Appendix A — Tone & Voice Guide

For when you're writing more copy and want it to feel consistent.

- **Honest, not breathless.** No "revolutionary", no "game-changing", no rocket emojis.
- **Specific over vague.** Numbers, names, examples. *"$130 across 2 transactions"* beats *"some transactions"*.
- **Privacy as a default, not a feature.** The way Apple talks about it. *"Your data stays on your Mac"* is a fact, not a perk.
- **Show the receipts.** Whenever a claim could sound like marketing, follow it with proof. AI answers come with the transactions; privacy claims come with "verify with Little Snitch".
- **Mac-native voice.** Short sentences. American English. No corporate-speak. Think "Drafts" or "Soulver" or "Bear" — small, polished, opinionated apps.
- **Never anthropomorphize the AI.** It's a tool, not a friend. Don't say *"Centproof thinks you spent..."*; say *"Based on your transactions, you spent..."*.

---

## Appendix B — Words to Avoid

- *"Revolutionary"*, *"game-changing"*, *"disruptive"* — empty
- *"Powered by AI"* — meaningless; everyone says it
- *"Bank-grade encryption"* — clichéd and usually inaccurate
- *"Smart"* without specifying what's smart about it
- *"Sync"* — we don't sync, and the word triggers cloud-app expectations
- *"Cloud"* in a positive sense — we're not in that business
- *"Free"* without context — the app costs money; saying "free" sets the wrong expectation. Say "one-time" or "pay once".
