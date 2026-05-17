import type { Metadata } from "next";
import Link from "next/link";
import {
  BankBadge,
  FeatureCard,
  PersonaCard,
  PricingCard,
  SectionIntro,
  TrustBadge,
} from "@/components/cards";
import { DemoVideo } from "@/components/demo-video";
import {
  ReportIcon,
  ShieldIcon,
  SparkIcon,
  TagIcon,
  VaultIcon,
} from "@/components/icons";
import { PageShell } from "@/components/page-shell";
import {
  directDistributionBullets,
  directDistributionTrust,
  heroTrust,
  homepageFeatures,
  personas,
  pillars,
  pricingPlans,
  supportedBanks,
  workflowSteps,
} from "@/components/site-content";

// Persona-icon key → JSX node.  Kept in the page (not in site-content)
// because site-content is plain data — importing JSX there forces
// every consumer of site-content to be a client/server boundary
// component too.  This map is tiny and only used here.
const personaIcons = {
  shield: <ShieldIcon className="size-5" />,
  report: <ReportIcon className="size-5" />,
  spark: <SparkIcon className="size-5" />,
  vault: <VaultIcon className="size-5" />,
  tag: <TagIcon className="size-5" />,
} as const;

// Demo video — populated when NEXT_PUBLIC_DEMO_VIDEO_ID is set on
// Vercel.  Until then the hero falls back to the static screenshot
// (same visual as before this refactor).  See components/demo-video.tsx
// for the click-to-load YouTube embed rationale.
const DEMO_VIDEO_ID = (process.env.NEXT_PUBLIC_DEMO_VIDEO_ID ?? "").trim();

export const metadata: Metadata = {
  // Homepage uses the layout's default title (no template).
  title: "CentProof | Private finance software that stays on your Mac.",
  description:
    "CentProof reads your bank PDFs, reconciles to the cent, and answers your money questions — all on your Mac, never in someone else's cloud. No bank password. No cloud sync. Local AI by default.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <PageShell>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:pb-20 lg:pt-16">
        <div>
          <p className="inline-flex rounded-full border border-[#CCFBF1] bg-white px-3 py-1 text-sm font-semibold text-[#0F766E] shadow-sm">
            Direct download for macOS
          </p>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.03] tracking-tight text-[#0F172A] sm:text-6xl lg:text-7xl">
            Personal finance software lost the plot.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#475569]">
            CentProof reads the PDF statements your bank already gives you,
            reconciles to the cent, and answers your money questions — all on
            your Mac, never in someone else&apos;s cloud.
          </p>
          <p className="mt-5 text-sm font-semibold text-[#0F172A]">
            No bank password. No cloud sync. Local AI by default.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/download"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-[#0F766E] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#115E59]"
            >
              Download for Mac
            </Link>
            <Link
              href="/pricing"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-5 text-sm font-semibold text-[#0F172A] shadow-sm transition hover:border-[#0F766E] hover:text-[#0F766E]"
            >
              View pricing
            </Link>
          </div>
          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            {heroTrust.map((point) => (
              <TrustBadge key={point}>{point}</TrustBadge>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <DemoVideo
            videoId={DEMO_VIDEO_ID}
            title="CentProof — 2-minute product demo"
            posterPath="/images/product/hero-app.png"
          />
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              "Signed and notarized for macOS",
              "Purchases handled by LemonSqueezy",
              "Your data stays local",
            ].map((item) => (
              <TrustBadge key={item}>{item}</TrustBadge>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
          <SectionIntro
            eyebrow="The problem"
            title="Personal finance apps got too hungry for your data."
            body="Most personal finance tools keep moving more of your financial history away from your Mac. CentProof takes a quieter path: you import the PDF statements you already download, and the app does the work locally."
          />
          <div className="rounded-3xl bg-[#0F172A] p-6 text-white">
            <p className="text-2xl font-semibold tracking-tight">
              Your bank statements stay on your Mac. So does the AI.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {directDistributionTrust.slice(4).map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-[#CBD5E1]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-[#0F172A]">
                {pillar.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#475569]">
                {pillar.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionIntro
            eyebrow="Workflow"
            title="How it works"
            body="CentProof starts with local PDF statements and ends with searchable, reportable records you can verify."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workflowSteps.map(([title, body], index) => (
              <article
                key={title}
                className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6"
              >
                <span className="text-sm font-semibold text-[#0F766E]">
                  0{index + 1}
                </span>
                <h3 className="mt-5 text-xl font-semibold text-[#0F172A]">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#475569]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <SectionIntro
          eyebrow="Who it's for"
          title="Built for the privacy-conscious and the unsyncable."
          body="If you've ever closed a finance app because it wanted your bank password, broke on your credit union, or felt like an Electron tab pretending to be a Mac app — you're who CentProof is built for."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {personas.map((persona) => (
            <PersonaCard
              key={persona.eyebrow}
              eyebrow={persona.eyebrow}
              title={persona.title}
              body={persona.body}
              icon={personaIcons[persona.icon]}
            />
          ))}
        </div>
      </section>

      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionIntro
            eyebrow="Features"
            title="Statement-based finance, not a cloud feed."
            body="CentProof is built around PDF import, reconciliation, local AI, source rows, and reports you control."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {homepageFeatures.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0F172A] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:py-20">
          <SectionIntro
            eyebrow="Direct distribution"
            title="Why CentProof is downloaded directly."
            body="CentProof is a local-first Mac app with a local AI model, local database, and fast bank-parser updates. Direct distribution lets us ship a private, signed, notarized app with direct support and same-day parser updates."
            invert
          />
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
            <div className="grid gap-3">
              {directDistributionBullets.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-[#CBD5E1]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionIntro
            eyebrow="Supported banks"
            title="Built from real statement formats."
            body="Current support covers major US banks and cards. More parsers are prioritized from redacted sample statements."
          />
          <Link
            href="/banks"
            className="inline-flex h-11 w-fit items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#0F172A] shadow-sm hover:border-[#0F766E] hover:text-[#0F766E]"
          >
            View banks
          </Link>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {supportedBanks.map((bank) => (
            <BankBadge key={bank} name={bank} />
          ))}
        </div>
      </section>

      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionIntro
            eyebrow="Pricing"
            title="Try it free. Buy once when you’re ready."
            body="Launch pricing is built for direct purchase: test with your own statements, then unlock unlimited local use."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.name} {...plan} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
