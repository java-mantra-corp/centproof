import {
  BalanceIcon,
  FileTextIcon,
  ReportIcon,
  SparkIcon,
  TagIcon,
  VaultIcon,
} from "@/components/icons";

export const navItems = [
  ["Product", "/product"],
  // Business-edition landing page — placed right after Product so the
  // bookkeeper/accountant audience can self-select immediately instead
  // of inferring it from the Pricing page.
  ["For Business", "/business"],
  ["Privacy", "/privacy"],
  ["Security", "/security"],
  ["Banks", "/banks"],
  ["Pricing", "/pricing"],
  // Docs is product reference — placed before Guides (which is
  // banking-concept content).  When a user clicks Help → Docs from
  // the in-app menu, they land here.
  ["Docs", "/docs"],
  ["Guides", "/guides"],
  ["About", "/about"],
  ["FAQ", "/faq"],
  ["Changelog", "/changelog"],
  // Download lives in the prominent right-aligned button in site-header
  // (not the nav row), so it isn't duplicated here.
];

export const heroTrust = [
  "No bank password",
  "No cloud sync",
  "Local AI by default",
];

export const directDistributionTrust = [
  "Download directly from centproof.com",
  "Signed with Apple Developer ID",
  "Notarized by Apple for macOS Gatekeeper",
  "Purchases handled by LemonSqueezy",
  "Your financial data stays on your Mac",
  "No bank password",
  "No cloud sync",
  "Local AI by default",
];

export const pillars = [
  {
    title: "Local-first, period",
    body: "Your statements, database, and AI questions stay on your Mac.",
  },
  {
    title: "Local AI by default",
    body: "Ask questions, clean up merchants, and summarize patterns without sending financial data off your Mac.",
  },
  {
    title: "Reconciled to the cent",
    body: "Statement math is verified before you trust the data.",
  },
  {
    title: "Direct Mac app",
    body: "Downloaded from centproof.com, signed and notarized for macOS.",
  },
];

export const workflowSteps = [
  ["Download CentProof", "Install the signed and notarized Mac app."],
  ["Drag in PDF statements", "Use the statements you already download from your bank."],
  ["Verify reconciliation", "CentProof checks statement math down to the cent."],
  ["Search, tag, and organize", "Clean up merchants, entities, categories, and notes."],
  ["Ask CentProof questions", "Run local AI queries with source rows shown underneath."],
  ["Export reports", "Create CSV and PDF reports from local data."],
];

/**
 * Buyer personas surfaced on the homepage between the workflow and
 * features sections.  Pulled from the v0.1.5 product deck (slide 11
 * "Built for the privacy-conscious and the unsyncable").
 *
 * Why these five specifically: each one represents a real reason
 * someone abandons mainstream bank-aggregator finance apps —
 * privacy stance, tax/contractor complexity, latency intolerance,
 * a bank that simply can't be synced via Plaid, or a couple
 * splitting expenses without paying per-seat SaaS fees.  When a
 * visitor sees their own situation reflected back, they have
 * permission to keep reading; without that mirror, generic-feature
 * marketing slides past them.
 *
 * The icons are intentionally not 1:1 with the deck — the deck uses
 * full-bleed illustrated icons that don't have web-quality SVG
 * sources we can ship.  We map to the closest existing icons in
 * components/icons.tsx so the section stays visually consistent
 * with the rest of the site (FeatureCard, etc.) without a separate
 * asset pipeline.
 */
export const personas = [
  {
    eyebrow: "The Privacy Pro",
    title: "Engineers, lawyers, and anyone who refuses to hand a bank password to a third-party aggregator.",
    body: "If a 'connect your bank' button is a hard no for you, CentProof never asks. It works from the same PDF statements you already download for taxes.",
    icon: "shield" as const,
  },
  {
    eyebrow: "The 1099 Freelancer",
    title: "Solo workers stitching multiple clients, business and personal cards into one searchable history.",
    body: "Drop in statements from every account, tag once with Smart Tagging, and search across years of activity. No cloud sync, no per-seat pricing.",
    icon: "report" as const,
    // Direct link to the long-form workflow guide — turns the
    // abstract persona promise ("we support freelancers") into a
    // concrete playbook the visitor can read, lowering the
    // commitment to install for evaluation.
    link: {
      href: "/guides/tracking-freelancer-expenses-on-a-mac",
      label: "Read the freelancer playbook",
    },
  },
  {
    eyebrow: "The Mac Power User",
    title: "Native speed, keyboard shortcuts, and zero web-wrapper latency.",
    body: "Not Electron. Not a browser tab pretending to be a Mac app. CentProof is a Tauri-built Apple Silicon native binary that respects your machine.",
    icon: "spark" as const,
  },
  {
    eyebrow: "The Unsyncable Bank",
    title: "Credit union members and foreign account holders whose banks constantly break Plaid integrations.",
    body: "If your bank doesn't sync reliably with mainstream finance apps, CentProof works directly from the PDF — and you keep the same workflow whether your bank is Chase or a regional credit union.",
    icon: "vault" as const,
  },
  {
    eyebrow: "The Co-Mingled Couple",
    title: "Partners splitting expenses across joint and individual accounts without per-seat SaaS bills.",
    body: "Import statements from both partners' accounts on one Mac. Tag transactions by entity (Joint / Mine / Partner's) and run settlement reports without paying for every member separately.",
    icon: "tag" as const,
  },
];

/**
 * Homepage features grid.  v0.1.5 marketing refresh: trimmed from 14
 * generic cards (read like a spec sheet, the eye glazes over after 6)
 * to 6 outcome-focused cards (each one names a concrete result the
 * buyer cares about).  The deeper feature-by-feature walkthrough still
 * lives on /product via `productSections` below — this list is the
 * homepage taste-test, not the catalog.
 *
 * Editing rules:
 *   - Keep this list at 4-6 items.  Less than 4 feels sparse, more
 *     than 6 brings back the dump-truck-of-features problem.
 *   - Title should be a HOOK, not a category name ("Tag once, applies
 *     forever" beats "Smart Tagging").
 *   - Body should name a concrete outcome the visitor can imagine
 *     themselves doing — a specific merchant, a specific question,
 *     a specific dollar figure.
 *   - Move full feature explanations to productSections (the
 *     /product page).  Don't add screenshots here — the hero already
 *     has the demo video; adding more imagery makes this section
 *     compete for attention.
 */
export const homepageFeatures = [
  {
    title: "PDF in, verified data out",
    body: "Drop in the same PDF statements you already download for taxes. CentProof reads BofA, Chase, Citi, Apple Card, Amex, Discover, Capital One, US Bank, and Wells Fargo — then reconciles each statement against its own opening and closing balance. Math is verified before you trust the data.",
    icon: <FileTextIcon />,
  },
  {
    title: "Tag once, applies forever",
    body: "Raw bank descriptions like 'AMZN MKTP US*4F8H2' are hostile to humans. CentProof's Smart Tagging learns 'AMZN MKTP' means Amazon — and applies it to next month's slightly-different string automatically. You stay in control of the final approval.",
    icon: <TagIcon />,
  },
  {
    title: "Ask plain-English questions. Answers stay on your Mac.",
    body: "A 3-billion-parameter AI runs natively on Apple Silicon. Zero cloud calls to OpenAI or Anthropic. Ask 'how much did I spend on groceries last quarter' and CentProof returns the answer with source rows so you can check the math.",
    icon: <SparkIcon />,
  },
  {
    title: "Catch the subscriptions you forgot you had.",
    body: "Detect repeating charges across imported statement history — merchant, cadence, and amount changes. Spot subscription price hikes, annual-fee bumps, and that one streaming service you've been paying for since 2022.",
    icon: <BalanceIcon />,
  },
  {
    title: "See exactly what changed since last month.",
    body: "Compare any two periods and CentProof shows which merchants or categories drove the difference — with source rows. Useful for catching new subscriptions, unusual spending, and the 'wait, why was the credit card bill higher this month' moment.",
    icon: <ReportIcon />,
  },
  {
    title: "Standard exports. Zero lock-in.",
    body: "Trip reports, settlement reports, search exports — plus CSV and PDF outputs. Your data lives in a local SQLite database. If CentProof goes away tomorrow, your history is yours forever.",
    icon: <VaultIcon />,
  },
];

export const directDistributionBullets = [
  "Signed with Apple Developer ID",
  "Notarized for macOS Gatekeeper",
  "Same-day parser updates",
  "Direct support from Java Mantra Corp",
  "LemonSqueezy handles secure checkout, tax, receipts, and license delivery",
];

export const productSections = [
  {
    title: "Statement Import & Parsing",
    imageTitle: "Statement Import & Parsing — CentProof screenshot",
    imagePath: "/images/product/statementImport.png",
    body: "CentProof reads bank and credit-card PDF statements directly on your Mac. It extracts rows, dates, descriptions, amounts, and balances from supported formats, then keeps the original statement relationship visible.",
  },
  {
    title: "Reconciliation",
    // No dedicated screenshot yet — reuse the import screenshot since
    // the reconciliation gate happens inside the import flow.
    imageTitle: "Statement reconciliation — CentProof screenshot",
    imagePath: "/images/product/statementImport.png",
    body: "Imported statements are checked against their own opening and closing balances. If the math does not reconcile, CentProof flags the import before you rely on the data.",
  },
  {
    title: "Transactions View",
    imageTitle: "Transactions View — CentProof screenshot",
    imagePath: "/images/product/transactionView.png",
    body: "The transactions view gives you fast search and filtering across statement-backed history. Filter by account, entity, category, amount, direction, source, and free text.",
  },
  {
    title: "Smart Tagging",
    imageTitle: "Smart Tagging — CentProof screenshot",
    imagePath: "/images/product/smartTagging.png",
    body: "Clean up raw bank descriptions into entities, categories, and notes. Local suggestions stay reviewable, and your accepted tags can be applied across matching history.",
  },
  {
    title: "Ask CentProof",
    imageTitle: "Ask CentProof — natural-language query screenshot",
    imagePath: "/images/product/ask-centproof.png",
    body: "Ask a plain-English question and CentProof turns it into a safe local query. The answer comes back with supporting source rows so you can check the math.",
  },
  {
    title: "Recurring Subscriptions",
    imageTitle: "Recurring Subscriptions — CentProof screenshot",
    imagePath: "/images/product/recurringSubscriptions.png",
    body: "CentProof detects repeating charges from imported statements, including merchant, cadence, and amount changes. It works from statement history you control.",
  },
  {
    title: "Cleanup Inbox",
    imageTitle: "Cleanup Inbox — CentProof screenshot",
    imagePath: "/images/product/cleanupInbox.png",
    body: "The cleanup inbox is a focused workspace for messy statement descriptions. Review one merchant pattern at a time and keep control of every accepted change.",
  },
  {
    title: "Cash-Flow Calendar",
    imageTitle: "Cash-Flow Calendar — CentProof screenshot",
    imagePath: "/images/product/cash-FlowCalendar.png",
    body: "Cash-flow views summarize actual imported activity by day and month. The goal is clarity from verified statement data.",
  },
  {
    title: "Anomaly Detection",
    imageTitle: "Anomaly Detection — CentProof screenshot",
    imagePath: "/images/product/anomaly.png",
    body: "CentProof flags unusual charges based on your history. Local AI can explain why a row looks different, while the amount and source remain unchanged.",
  },
  {
    title: "What Changed",
    imageTitle: "What Changed — month-over-month diff screenshot",
    imagePath: "/images/product/whatChanged.png",
    body: "Compare imported periods and see which merchants or categories drove the difference. Summaries are useful because they stay tied to source rows.",
  },
  {
    title: "Tax Summary",
    // No dedicated screenshot yet — reuse the reports image; the tax
    // summary lives under the same Reports section in the app.  TODO:
    // capture a real screenshot once the in-app feature is stable.
    imageTitle: "Tax Summary — income, outgoing, and net for a date range",
    imagePath: "/images/product/reports.png",
    body: "Pick a date range (Tax year, Year-to-date, Last 3 months, Last 90, Last 30, or custom) and CentProof sums every credit and debit across one account or all of them. The outgoing breakdown groups by kind so credit-card payments and account transfers stay visually separate from real expenses. Save as a one-page PDF for your CPA, or pick the Detailed PDF to include every transaction listed with a cropped snapshot of its source bank-statement row in an appendix.",
  },
  {
    title: "Price Watch",
    imageTitle: "Price Watch — CentProof screenshot",
    imagePath: "/images/product/priceWatch.png",
    body: "Track merchant prices over time from statement history. Use it to catch subscription increases, annual fees, or recurring cost changes.",
  },
  {
    title: "Reports and Exports",
    imageTitle: "Reports and Exports — CentProof screenshot",
    imagePath: "/images/product/reports.png",
    body: "Trip reports, settlement reports, the Tax Summary, search exports, and PDF previews — all built from reconciled, source-linked data. Settlement and Tax Summary both export a clean one-page PDF or a detailed PDF that includes a cropped snapshot of every transaction's source bank-statement row, so anyone reading the report can verify the numbers without opening the original PDFs. Off-statement cash flows (contractor cash payments, owner draws, tax-year adjustments) can be added as manual entries that show up clearly tagged as user-recorded throughout.",
  },
  {
    title: "Local Backup",
    imageTitle: "Local Backup — CentProof screenshot",
    imagePath: "/images/product/license-screen.png",
    body: "Your data lives locally, so it can be backed up with the Mac tools you already use. Export formats keep your history readable outside CentProof.",
  },
];

export const privacySections = [
  ["No bank password", "CentProof imports bank and credit-card PDF statements. No bank password is needed."],
  ["No cloud sync", "Your statements and database stay on your Mac, not on Java Mantra Corp servers."],
  ["No telemetry", "Normal app use does not send anonymous usage stats, diagnostics, or behavior data."],
  ["No tracking", "No app analytics, tracking pixels, or ad-tech hooks are part of the product experience."],
  ["No ads", "CentProof is paid software. Your spending history is not an advertising profile."],
  ["Local AI by default", "Questions, merchant cleanup, and pattern summaries use local AI on your Mac by default."],
  ["Local storage and exports", "Back up the local folder yourself and export standard formats whenever needed."],
  ["Optional update checks", "Update checks are explicit network activity for keeping the signed app current."],
  ["Optional custom AI endpoint", "You can configure an external OpenAI-compatible endpoint only if you intentionally choose that trade-off."],
];

export const supportedBanks = [
  "Bank of America",
  "Capital One",
  "Apple Card",
  "American Express",
  "Discover",
  "Citi",
  "US Bank",
  "Chase",
  "Wells Fargo",
];

export const comingSoonBanks = [
  "Schwab",
  "Fidelity",
  "USAA",
  "Navy Federal Credit Union",
];

/**
 * Checkout URLs for paid plans.
 *
 * Each LemonSqueezy product variant gets its own checkout URL.  We read
 * them from public env vars so the same build can be deployed to staging
 * (test-mode LemonSqueezy store) vs production (live store) without
 * a code change.
 *
 * Variables (set in `.env.local` for dev, in your hosting provider's
 * env panel for production):
 *   NEXT_PUBLIC_LEMONSQUEEZY_LIFETIME_URL
 *   NEXT_PUBLIC_LEMONSQUEEZY_MONTHLY_URL
 *   NEXT_PUBLIC_LEMONSQUEEZY_LAUNCH_COUPON   (optional, e.g. "LAUNCH2026")
 *
 * If a URL is unset we fall back to /support so a buyer never lands on
 * a 404 — they reach Java Mantra Corp directly and we can resolve the
 * checkout config asap.
 */
const SUPPORT_FALLBACK = "/support";

/** Treat an env value of `undefined`, `""`, or whitespace-only as
 *  "unset" → fall back to the support URL.  Why this matters: Vercel
 *  "Sensitive" env vars can't easily have their environment-membership
 *  changed after creation, but you CAN edit their VALUE per-environment.
 *  Setting the Production value to "" lets us hide a CTA without
 *  deleting and re-creating the var.  Plain `??` only triggers on
 *  null/undefined, so we'd render an empty `href=""` link — defending
 *  against that here.
 *
 *  Note: these reads MUST use the literal `process.env.NEXT_PUBLIC_*`
 *  syntax (not bracket-notation) so Next.js's build-time DefinePlugin
 *  inlines the value into the client bundle. */
function presentOrFallback(
  v: string | undefined,
  fallback: string,
): string {
  return v && v.trim().length > 0 ? v : fallback;
}

const lifetimeBase = presentOrFallback(
  process.env.NEXT_PUBLIC_LEMONSQUEEZY_LIFETIME_URL,
  SUPPORT_FALLBACK,
);
const monthlyUrl = presentOrFallback(
  process.env.NEXT_PUBLIC_LEMONSQUEEZY_MONTHLY_URL,
  SUPPORT_FALLBACK,
);
const launchCoupon = presentOrFallback(
  process.env.NEXT_PUBLIC_LEMONSQUEEZY_LAUNCH_COUPON,
  "",
);

/** Append the launch coupon to the lifetime URL when configured.  This
 *  is what powers the "$29 launch lifetime" link during the first 30
 *  days after public launch. */
const lifetimeUrl =
  lifetimeBase !== SUPPORT_FALLBACK && launchCoupon
    ? `${lifetimeBase}${lifetimeBase.includes("?") ? "&" : "?"}checkout[discount_code]=${encodeURIComponent(launchCoupon)}`
    : lifetimeBase;

/**
 * Business-edition checkout URLs.  Same env-var pattern as the Pro
 * URLs above: paste each LemonSqueezy variant's public checkout URL
 * into these vars (Vercel for prod, .env.local for dev).  Unset →
 * /support fallback, so a missing config never 404s a buyer.
 *
 *   NEXT_PUBLIC_LEMONSQUEEZY_BUSINESS_LIFETIME_URL  ($299 one-time)
 *   NEXT_PUBLIC_LEMONSQUEEZY_BUSINESS_MONTHLY_URL   ($29/mo, 14-day trial)
 *
 * The 14-day free trial lives on the LemonSqueezy product itself, so
 * no URL parameter is needed here — the trial just applies at checkout.
 */
const businessLifetimeUrl = presentOrFallback(
  process.env.NEXT_PUBLIC_LEMONSQUEEZY_BUSINESS_LIFETIME_URL,
  SUPPORT_FALLBACK,
);
const businessMonthlyUrl = presentOrFallback(
  process.env.NEXT_PUBLIC_LEMONSQUEEZY_BUSINESS_MONTHLY_URL,
  SUPPORT_FALLBACK,
);

export const pricingPlans = [
  {
    name: "Free Test Mode",
    price: "$0",
    subtitle: "Try with your own statements.",
    cta: "Download for Mac",
    ctaUrl: "/download",
    bullets: [
      "2 active statements",
      "5 lifetime imports",
      "5 Ask CentProof questions, then 1/day",
      "Full search on imported data",
      "Watermarked CSV export, first 50 rows",
      "PDF report preview with watermark",
      "1 saved report",
    ],
    note: "Existing imported data stays accessible. We do not hold your data hostage.",
  },
  {
    name: "Pro Lifetime",
    price: "$49 one-time",
    subtitle: "Pay once. Use CentProof forever.",
    cta: "Buy Lifetime",
    ctaUrl: lifetimeUrl,
    ctaExternal: lifetimeUrl !== SUPPORT_FALLBACK,
    badge: "Best value",
    launchPriceNote: launchCoupon
      ? "$29 launch lifetime for the first 30 days"
      : undefined,
    featured: true,
    bullets: [
      "Unlimited statements, accounts, and transactions",
      "Unlimited Ask CentProof questions",
      "Full local AI features",
      "CSV and PDF exports",
      "Tax Summary with manual entries + Detailed PDF (source-PDF snapshots)",
      "Up to 2 Macs",
      "One year of updates and support",
      "Major upgrades may be optional paid upgrades later",
    ],
    note: "Best for privacy-conscious Mac users who prefer owning software.",
  },
  {
    name: "Pro Monthly",
    price: "$5/month",
    subtitle: "Flexible access.",
    cta: "Subscribe Monthly",
    ctaUrl: monthlyUrl,
    ctaExternal: monthlyUrl !== SUPPORT_FALLBACK,
    bullets: [
      "Unlimited statements, accounts, and transactions",
      "Unlimited Ask CentProof questions",
      "Full local AI features",
      "All export formats",
      "Tax Summary with manual entries + Detailed PDF (source-PDF snapshots)",
      "Updates and support while subscribed",
      "1 Mac",
      "Cancel anytime",
    ],
    note: "Great if you want to try Pro without the one-time purchase.",
  },
];

/**
 * Business-edition plans (v0.2.0).  Shown in their own section on
 * /pricing and on the /business landing page.  Business is a SUPERSET
 * of Pro — everything Pro does, plus multi-client workspaces and batch
 * import — so the bullets lead with "Everything in Pro" and then name
 * the two things only Business adds (isolated client workspaces +
 * folder batch import).  Exports (CSV/OFX/QuickBooks) are a Pro-level
 * feature too, listed here because they matter most to bookkeepers.
 */
export const businessPlans = [
  {
    name: "Business Lifetime",
    price: "$299 one-time",
    subtitle: "Own it. One payment for your whole practice.",
    cta: "Buy Business Lifetime",
    ctaUrl: businessLifetimeUrl,
    ctaExternal: businessLifetimeUrl !== SUPPORT_FALLBACK,
    badge: "Best value",
    featured: true,
    bullets: [
      "Everything in Pro, for unlimited clients",
      "A separate, fully isolated workspace per client",
      "Batch import — drop a whole folder, auto-reconciled to the cent",
      "CSV, OFX, and QuickBooks (QBO/QFX) exports",
      "Tax Summary with manual entries + Detailed PDF (source-PDF snapshots)",
      "Up to 2 Macs",
      "One year of updates and support",
      "Then optional $10–20/yr to keep updating — never a forced subscription",
    ],
    note: "Best for established bookkeepers and accountants who prefer owning their tools.",
  },
  {
    name: "Business Monthly",
    price: "$29/month",
    subtitle: "Full Business access. Starts with a free trial.",
    cta: "Start 14-day free trial",
    ctaUrl: businessMonthlyUrl,
    ctaExternal: businessMonthlyUrl !== SUPPORT_FALLBACK,
    launchPriceNote: "14-day free trial, then $29/month",
    bullets: [
      "Everything in Pro, for unlimited clients",
      "A separate, fully isolated workspace per client",
      "Batch import — drop a whole folder, auto-reconciled to the cent",
      "CSV, OFX, and QuickBooks (QBO/QFX) exports",
      "Tax Summary with manual entries + Detailed PDF (source-PDF snapshots)",
      "Updates and support while subscribed",
      "1 Mac",
      "Cancel anytime",
    ],
    note: "Great for trying Business risk-free, or for seasonal and growing practices.",
  },
];

/**
 * The four things that distinguish the Business edition.  Used as the
 * pillar row at the top of /business.  Kept to plain data (no JSX) so
 * the page can render them in a simple grid.
 */
export const businessPillars = [
  {
    title: "A workspace per client",
    body: "Each client gets isolated accounts, statements, tags, and reports. Switch clients and you see only their data — never a mix.",
  },
  {
    title: "Batch import a whole folder",
    body: "Drop a client's entire stack of PDFs at once. CentProof reconciles each to the cent and files the clean ones automatically.",
  },
  {
    title: "Export to QuickBooks",
    body: "Send reconciled transactions to CSV, OFX, or QuickBooks QBO/QFX — ready to bring straight into your accounting workflow.",
  },
  {
    title: "Private by design",
    body: "Every client's data stays on your Mac. No cloud sync, no bank passwords, no client data leaving your machine.",
  },
];

/**
 * How a bookkeeper actually uses the Business edition end-to-end.
 * Mirrors the personal `workflowSteps` shape ([title, body]) so the
 * /business page can reuse the same numbered-step layout.
 */
export const businessWorkflow = [
  ["Add a client", "Create an isolated workspace for each client you keep books for."],
  ["Batch import statements", "Drag in a whole folder of a client's PDFs; CentProof reconciles each to the cent."],
  ["Review only what needs it", "Clean statements file themselves. Anything that doesn't reconcile is queued for review."],
  ["Tag and categorize once", "Smart Tagging learns each client's merchants and applies across their history."],
  ["Export to your books", "Send the client's reconciled data to CSV, OFX, or QuickBooks QBO/QFX."],
  ["Switch clients, repeat", "Each client's data stays fully separate. Pick the next client and go."],
];

/**
 * Business-edition feature grid for /business.  Same `{title, body,
 * icon}` shape as `homepageFeatures`, so it renders through the
 * existing FeatureCard component.
 */
export const businessFeatures = [
  {
    title: "Isolated client workspaces",
    body: "Every client is a separate workspace — accounts, statements, transactions, tags, categories, and reports never cross between clients. There's no combined all-clients view by design, so one client's numbers can't leak into another's.",
    icon: <VaultIcon />,
  },
  {
    title: "Batch import, auto-reconciled",
    body: "Drop a whole folder of a client's statements. CentProof imports each, reconciles it against its own opening and closing balance, auto-files the ones that balance to the cent, and queues anything that doesn't for a quick review.",
    icon: <FileTextIcon />,
  },
  {
    title: "QuickBooks, OFX & CSV exports",
    body: "Export a client's reconciled transactions to CSV, OFX, or QuickBooks-compatible QBO/QFX (Web Connect) files — so statement data flows straight into the books instead of being re-keyed by hand.",
    icon: <ReportIcon />,
  },
  {
    title: "Smart Tagging per client",
    body: "Raw descriptions like 'AMZN MKTP US*4F8H2' become 'Amazon'. Tags are learned and applied per client, so each client's merchant vocabulary stays their own and improves every month.",
    icon: <TagIcon />,
  },
  {
    title: "Local AI, never the cloud",
    body: "Ask plain-English questions about a client's spending and get answers with source rows. The 3-billion-parameter model runs natively on your Mac — no client financial data is ever sent to OpenAI, Anthropic, or anyone else.",
    icon: <SparkIcon />,
  },
  {
    title: "Reconciled to the cent",
    body: "Every imported statement is checked against its own balances before you trust it. When a client asks how you know the numbers are right, you can show the reconciliation and the source bank-statement row behind each line.",
    icon: <BalanceIcon />,
  },
];

export const pricingFaqs = [
  {
    question: "What happens when I hit the Free Test Mode limits?",
    answer: "When a Free cap is reached, existing data stays accessible. New imports, full exports, and unlimited AI require Pro.",
  },
  {
    question: "Do I lose access to my data if I do not upgrade?",
    answer: "No. Existing imported data stays accessible. CentProof does not hold your local data hostage.",
  },
  {
    question: "Why is Pro Lifetime the best value?",
    answer: "It is the simplest fit for a private Mac app: pay once, use CentProof forever, and avoid an ongoing subscription for local software.",
  },
  {
    question: "What does lifetime mean?",
    answer: "Pro Lifetime lets you keep using the version you bought. It includes one year of updates and support. Future major upgrades may be optional paid upgrades, but your existing version keeps working.",
  },
  {
    question: "What happens after one year of updates and support?",
    answer: "Your purchased version keeps working. Renewal options for additional updates and support can be offered later without turning your existing license into a subscription.",
  },
  {
    question: "Can I use it on multiple Macs?",
    answer: "Pro Lifetime includes up to 2 Macs. Pro Monthly includes 1 Mac.",
  },
  {
    question: "How are purchases handled?",
    answer: "Purchases are handled by LemonSqueezy. After purchase, you receive a license key by email.",
  },
  {
    question: "Can I get a refund?",
    answer: "CentProof will offer a 30-day no-questions-asked refund policy through LemonSqueezy.",
  },
  {
    question: "What happens if my Pro Monthly subscription ends?",
    answer: "Your previously imported data stays fully accessible — you can keep searching, viewing, and browsing all of it. Auto-updates keep working too. You drop back to Free Test Mode caps for new imports, full exports, and unlimited Ask CentProof. Re-subscribe anytime and Pro features reactivate instantly. Your data is never deleted.",
  },
  {
    question: "Will Pro Lifetime stop getting updates after one year?",
    answer: "Your purchased version keeps working forever, and bug-fix updates we choose to ship will still install. The 'one year of updates and support' covers new feature work and direct support replies. After year one, major new feature releases may be offered as optional paid upgrades — but you are never forced to pay again to keep using what you bought.",
  },
];

/**
 * Business-edition FAQ.  Shown on /business and surfaced in that page's
 * FAQPage JSON-LD.  Answers the questions a bookkeeper asks before
 * buying: how it differs from Pro, client isolation, the free trial,
 * the $299 one-time terms, QuickBooks export, and privacy.
 */
export const businessFaqs = [
  {
    question: "What makes the Business edition different from Pro?",
    answer: "Business adds multi-client support on top of everything Pro does. Every client gets its own fully isolated workspace — separate accounts, statements, transactions, tags, and reports — and you can batch-import a whole folder of a client's statements at once, with the ones that reconcile to the cent filed automatically.",
  },
  {
    question: "Is each client's data kept separate?",
    answer: "Yes. CentProof scopes every view, search, report, and AI answer to the client you have selected. Switch clients and you see only that client's data. There is no combined all-clients view, by design, so you never mix one client's numbers into another's.",
  },
  {
    question: "Do you offer a free trial?",
    answer: "Yes. Business Monthly starts with a 14-day free trial so you can run your real client workflow before paying. You can also try the core PDF-to-data engine for free in Free Test Mode on any download.",
  },
  {
    question: "What does the $299 one-time include?",
    answer: "Permanent use of the Business version you buy, plus one year of feature updates and support. After that first year your app keeps working forever; continuing to receive new updates is an optional $10–20/year — never a forced subscription.",
  },
  {
    question: "Can I export to QuickBooks?",
    answer: "Yes. CentProof exports reconciled transactions to CSV, OFX, and QuickBooks-compatible QBO/QFX (Web Connect) files, so a client's statement data flows straight into your accounting workflow instead of being re-keyed by hand.",
  },
  {
    question: "How many clients can I manage?",
    answer: "Unlimited. There is no per-client or per-seat fee — one Business license covers your whole client roster on your Mac.",
  },
  {
    question: "Does my client data stay private?",
    answer: "Yes — the same local-first guarantee as the personal edition. Every client's statements, database, and AI questions stay on your Mac. No cloud sync, no bank passwords, and no client data sent to anyone.",
  },
];

export const faqs = [
  {
    question: "Where do I download CentProof?",
    answer: "CentProof is a direct download from centproof.com. Launch builds are signed and notarized for macOS.",
  },
  {
    question: "Why is CentProof distributed directly?",
    answer: "Direct download supports local AI, same-day bank-parser updates, LemonSqueezy checkout, license key activation, and direct support from Java Mantra Corp.",
  },
  {
    question: "Is the app signed and notarized?",
    answer: "Yes. Launch builds are signed with Apple Developer ID and notarized by Apple for macOS Gatekeeper.",
  },
  {
    question: "Does CentProof need my bank password?",
    answer: "No. CentProof works from bank and credit-card PDF statements you import yourself. No bank password is needed.",
  },
  {
    question: "How does local AI work?",
    answer: "Local AI is the default. Financial questions, merchant cleanup, and summaries are designed to run on your Mac unless you explicitly configure an external endpoint.",
  },
  {
    question: "What happens if I hit Free Test Mode limits?",
    answer: "Existing data stays accessible. New imports, full exports, and unlimited Ask CentProof questions require Pro.",
  },
  {
    question: "What does Pro Lifetime include?",
    answer: "Pro Lifetime includes unlimited statements, accounts, transactions, Ask CentProof questions, local AI features, exports, up to 2 Macs, and one year of updates and support.",
  },
  {
    question: "How do license keys work?",
    answer: "Purchases are handled by LemonSqueezy. After purchase, you receive a license key by email and use it to unlock Pro features in the app.",
  },
  {
    question: "Can I use CentProof offline?",
    answer: "Yes. Normal app use is local. License validation is designed to support offline use after activation.",
  },
  {
    question: "What if LemonSqueezy is unavailable?",
    answer: "Your local data remains on your Mac. Purchase and license delivery may wait for LemonSqueezy availability, but imported data is not stored by LemonSqueezy.",
  },
  {
    question: "What if CentProof goes out of business?",
    answer: "Your data is local and exportable. You can export to standard formats and keep using the version you bought.",
  },
  {
    question: "Can I export my data?",
    answer: "Yes. CentProof supports CSV and PDF exports depending on your plan.",
  },
  {
    question: "Does CentProof give tax advice?",
    answer: "No. CentProof can organize records for tax review, but it is not a bank, financial advisor, or tax advisor.",
  },
];
