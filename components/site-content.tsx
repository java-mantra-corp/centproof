import {
  BalanceIcon,
  FileTextIcon,
  ReportIcon,
  RestoreIcon,
  SearchIcon,
  ShieldIcon,
  SparkIcon,
  TagIcon,
  VaultIcon,
} from "@/components/icons";

export const navItems = [
  ["Product", "/product"],
  ["Privacy", "/privacy"],
  ["Banks", "/banks"],
  ["Pricing", "/pricing"],
  ["FAQ", "/faq"],
  ["Download", "/download"],
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
  ["Export reports", "Create CSV, JSON, OFX, QFX, and PDF reports from local data."],
];

export const homepageFeatures = [
  {
    title: "Statement Import & Parsing",
    body: "Import bank and credit-card PDFs, then extract transactions, dates, descriptions, amounts, and balances.",
    icon: <FileTextIcon />,
  },
  {
    title: "Reconciliation",
    body: "Opening and closing balances are checked before imported data becomes trusted.",
    icon: <BalanceIcon />,
  },
  {
    title: "Transactions View",
    body: "Search and filter by date, account, entity, category, amount, direction, and source.",
    icon: <SearchIcon />,
  },
  {
    title: "Ask CentProof",
    body: "Ask plain-English money questions and verify answers against source rows.",
    icon: <SparkIcon />,
  },
  {
    title: "Recurring Subscriptions",
    body: "Find recurring charges across imported statement history.",
    icon: <ReportIcon />,
  },
  {
    title: "Price Watch",
    body: "Spot merchant price changes, annual fees, and subscription increases.",
    icon: <BalanceIcon />,
  },
  {
    title: "Anomaly Detection",
    body: "Flag charges that look unusual for your own merchants and categories.",
    icon: <ShieldIcon />,
  },
  {
    title: "What Changed",
    body: "Compare month to month and see the rows behind the change.",
    icon: <ReportIcon />,
  },
  {
    title: "Cash Flow",
    body: "View actual daily income and spending from imported statement data.",
    icon: <ReportIcon />,
  },
  {
    title: "Trip Report",
    body: "Group travel transactions and supporting rows into exportable reports.",
    icon: <ReportIcon />,
  },
  {
    title: "Settlement Report",
    body: "Build shareable settlement exports from reconciled transactions.",
    icon: <ReportIcon />,
  },
  {
    title: "Cleanup Inbox",
    body: "Review raw merchant names and apply clean tags in batches.",
    icon: <RestoreIcon />,
  },
  {
    title: "Entities and Categories",
    body: "Normalize merchants, people, accounts, and spending categories.",
    icon: <TagIcon />,
  },
  {
    title: "Local Backup & Export",
    body: "Keep local files, back them up yourself, and export standard formats anytime.",
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
    title: "Price Watch",
    imageTitle: "Price Watch — CentProof screenshot",
    imagePath: "/images/product/priceWatch.png",
    body: "Track merchant prices over time from statement history. Use it to catch subscription increases, annual fees, or recurring cost changes.",
  },
  {
    title: "Reports and Exports",
    imageTitle: "Reports and Exports — CentProof screenshot",
    imagePath: "/images/product/reports.png",
    body: "Create trip reports, settlement reports, search exports, and PDF previews from reconciled data. Exports are built around source-linked transactions.",
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

const lifetimeBase =
  process.env.NEXT_PUBLIC_LEMONSQUEEZY_LIFETIME_URL ?? SUPPORT_FALLBACK;
const monthlyUrl =
  process.env.NEXT_PUBLIC_LEMONSQUEEZY_MONTHLY_URL ?? SUPPORT_FALLBACK;
const launchCoupon = process.env.NEXT_PUBLIC_LEMONSQUEEZY_LAUNCH_COUPON ?? "";

/** Append the launch coupon to the lifetime URL when configured.  This
 *  is what powers the "$39 launch lifetime" link during the first 30
 *  days after public launch. */
const lifetimeUrl =
  lifetimeBase !== SUPPORT_FALLBACK && launchCoupon
    ? `${lifetimeBase}${lifetimeBase.includes("?") ? "&" : "?"}checkout[discount_code]=${encodeURIComponent(launchCoupon)}`
    : lifetimeBase;

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
      "Watermarked CSV/JSON export, first 50 rows",
      "PDF report preview with watermark",
      "1 saved report",
    ],
    note: "Existing imported data stays accessible. We do not hold your data hostage.",
  },
  {
    name: "Pro Lifetime",
    price: "$59 one-time",
    subtitle: "Pay once. Use CentProof forever.",
    cta: "Buy Lifetime",
    ctaUrl: lifetimeUrl,
    ctaExternal: lifetimeUrl !== SUPPORT_FALLBACK,
    badge: "Best value",
    launchPriceNote: launchCoupon
      ? "$39 launch lifetime for the first 30 days"
      : undefined,
    featured: true,
    bullets: [
      "Unlimited statements, accounts, and transactions",
      "Unlimited Ask CentProof questions",
      "Full local AI features",
      "CSV / OFX / QFX / JSON / PDF exports",
      "Up to 3 Macs",
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
      "Updates and support while subscribed",
      "1 Mac",
      "Cancel anytime",
    ],
    note: "Great if you want to try Pro without the one-time purchase.",
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
    answer: "Pro Lifetime includes up to 3 Macs. Pro Monthly includes 1 Mac.",
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
    answer: "Pro Lifetime includes unlimited statements, accounts, transactions, Ask CentProof questions, local AI features, exports, up to 3 Macs, and one year of updates and support.",
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
    answer: "Yes. CentProof supports exports such as CSV, OFX, QFX, JSON, and PDF reports depending on your plan.",
  },
  {
    question: "Does CentProof give tax advice?",
    answer: "No. CentProof can organize records for tax review, but it is not a bank, financial advisor, or tax advisor.",
  },
];
