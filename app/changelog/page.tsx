import type { Metadata } from "next";
import Link from "next/link";
import { SectionIntro } from "@/components/cards";
import { PageShell } from "@/components/page-shell";
import { readChangelog, type ChangelogEntry } from "@/lib/changelog";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Every CentProof release: signed and notarized macOS builds, parser additions, AI improvements, and bug fixes. Updated each release.",
  alternates: { canonical: "/changelog" },
  openGraph: {
    title: "CentProof Changelog",
    description:
      "Release notes for every CentProof version. What we added, changed, and fixed.",
    url: "/changelog",
    type: "website",
  },
};

export default function ChangelogPage() {
  const entries = readChangelog();
  const latest = entries[0];

  return (
    <PageShell>
      {/* Hero ---------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-[#0F766E]">Changelog</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight text-[#0F172A] sm:text-6xl">
            What's new in CentProof.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#475569]">
            Every release is signed by Java Mantra Corp's Apple Developer ID
            and notarized by Apple.{" "}
            {latest ? (
              <>
                Latest:{" "}
                <span className="font-semibold text-[#0F172A]">
                  {latest.version}
                  {latest.date && latest.date !== "unreleased"
                    ? ` — ${formatDate(latest.date)}`
                    : ""}
                </span>
                .
              </>
            ) : null}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/download"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0F766E] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#115E59]"
            >
              Download for Mac
            </Link>
            <a
              href="https://github.com/java-mantra-corp/centproof-releases/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-5 text-sm font-semibold text-[#0F172A] hover:border-[#0F766E] hover:text-[#0F766E]"
            >
              GitHub Releases ↗
            </a>
            <Link
              href="/security"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-5 text-sm font-semibold text-[#0F172A] hover:border-[#0F766E] hover:text-[#0F766E]"
            >
              Verify a release →
            </Link>
          </div>
        </div>
      </section>

      {/* Release entries ----------------------------------------------- */}
      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionIntro
            eyebrow="Release notes"
            title="Newest on top."
            body="Each version below is also published as a signed GitHub Release with the .dmg, the auto-updater payload, and the SHA-256 checksum."
          />
          <div className="mt-12 space-y-12">
            {entries.map((entry) => (
              <ReleaseBlock key={entry.version} entry={entry} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function ReleaseBlock({ entry }: { entry: ChangelogEntry }) {
  const isUnreleased =
    entry.date === "unreleased" || entry.date.toLowerCase().includes("unreleased");

  return (
    <article className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
      <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[#E2E8F0] pb-5">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-[#0F172A]">
            {entry.version}
          </h2>
          {entry.date && (
            <p className="mt-1 text-sm text-[#64748B]">
              {isUnreleased ? "Unreleased" : formatDate(entry.date)}
            </p>
          )}
        </div>
        {isUnreleased ? (
          <span className="rounded-full bg-[#FEF3C7] px-3 py-1 text-xs font-semibold text-[#92400E]">
            Unreleased
          </span>
        ) : (
          <a
            href={`https://github.com/java-mantra-corp/centproof-releases/releases/tag/${entry.version}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#0F766E] hover:underline"
          >
            GitHub Release ↗
          </a>
        )}
      </header>

      {entry.intro.length > 0 && (
        <div className="mt-5 space-y-3 text-sm leading-6 text-[#475569]">
          {entry.intro.map((p, i) => (
            <p key={i}>{renderInline(p)}</p>
          ))}
        </div>
      )}

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {entry.sections.map((section) => (
          <div key={section.heading}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0F766E]">
              {section.heading}
            </h3>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-[#475569]">
              {section.items.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 inline-block size-1 shrink-0 rounded-full bg-[#0F766E]" />
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}

/**
 * Renders a CHANGELOG line preserving single-backtick `inline code`
 * spans.  Anything else is plain text — bold/italic/links are not
 * currently used in the file so we don't pull in a markdown library.
 */
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded bg-[#F1F5F9] px-1.5 py-0.5 font-mono text-xs text-[#0F172A]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/** "2026-05-12" → "May 12, 2026". */
function formatDate(iso: string): string {
  // Be permissive: if the date isn't ISO, return as-is.
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return iso;
  const [, y, mm, dd] = m;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = months[parseInt(mm!, 10) - 1] ?? mm;
  return `${monthName} ${parseInt(dd!, 10)}, ${y}`;
}
