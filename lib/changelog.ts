import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Build-time parser for centproof-releases/CHANGELOG.md.
 *
 * The file structure is predictable enough that we don't need a full
 * markdown library — we hand-parse the known shape:
 *
 *   ## vX.Y.Z — YYYY-MM-DD   (or "_unreleased_")
 *
 *   Optional intro paragraph(s)
 *
 *   ### Added | Changed | Fixed | Removed | Known limitations
 *
 *   - Bullet (may wrap to next indented lines)
 *   - Bullet ...
 *
 *   ---
 *
 * Single backtick `inline code` is preserved as <code>.  Other
 * markdown (links, bold, etc.) isn't currently used in the file, so we
 * leave it as plain text — keeps the parser tight.
 *
 * Sync workflow: when a new release publishes in centproof-releases,
 * copy `CHANGELOG.md` into `docs/changelog.md` here.  TODO: add a
 * step to scripts/release.sh in the pdfApplication repo to do this
 * automatically.
 */

export interface ChangelogSection {
  heading: string;
  items: string[];
}

export interface ChangelogEntry {
  /** e.g. "v0.1.2". */
  version: string;
  /** e.g. "2026-05-12" or "unreleased". */
  date: string;
  /** Free-form intro paragraph(s) that appear before any ###
   *  section.  Empty for most entries; v0.1.0 uses it. */
  intro: string[];
  /** Added / Changed / Fixed / Removed / Known limitations etc. */
  sections: ChangelogSection[];
}

const CHANGELOG_PATH = join(process.cwd(), "docs", "changelog.md");

export function readChangelog(): ChangelogEntry[] {
  let raw: string;
  try {
    raw = readFileSync(CHANGELOG_PATH, "utf8");
  } catch (e) {
    throw new Error(
      `Could not read changelog at ${CHANGELOG_PATH}. Copy CHANGELOG.md ` +
        `from the centproof-releases repo into docs/changelog.md. ` +
        `Original error: ${(e as Error).message}`,
    );
  }

  return parseChangelog(raw);
}

/** Pure parser — exported for unit-testing without filesystem. */
export function parseChangelog(raw: string): ChangelogEntry[] {
  const lines = raw.split(/\r?\n/);
  const entries: ChangelogEntry[] = [];
  let current: ChangelogEntry | null = null;
  let currentSection: ChangelogSection | null = null;
  let pendingBullet: string | null = null;

  function flushBullet() {
    if (pendingBullet !== null && currentSection) {
      currentSection.items.push(pendingBullet.trim());
    }
    pendingBullet = null;
  }

  function flushSection() {
    flushBullet();
    currentSection = null;
  }

  for (const rawLine of lines) {
    const line = rawLine.replace(/\s+$/, "");

    // Version header: "## v0.1.2 — 2026-05-12" or "_unreleased_"
    const versionMatch = line.match(
      /^##\s+(v[\d.]+)\s+[—–-]\s+(.+?)\s*$/,
    );
    if (versionMatch) {
      flushSection();
      if (current) entries.push(current);
      const datePart = versionMatch[2]!;
      const date = datePart.replace(/^_+|_+$/g, "");
      current = {
        version: versionMatch[1]!,
        date,
        intro: [],
        sections: [],
      };
      continue;
    }

    // Section header inside a version: "### Added"
    const sectionMatch = line.match(/^###\s+(.+?)\s*$/);
    if (sectionMatch && current) {
      flushSection();
      currentSection = { heading: sectionMatch[1]!, items: [] };
      current.sections.push(currentSection);
      continue;
    }

    // Bullet start: "- something"
    const bulletMatch = line.match(/^-\s+(.*)$/);
    if (bulletMatch && currentSection) {
      flushBullet();
      pendingBullet = bulletMatch[1]!;
      continue;
    }

    // Continuation of a bullet (indented or just continuation).  In our
    // CHANGELOG, bullet continuations are indented with two spaces.
    if (pendingBullet !== null && /^\s+\S/.test(line)) {
      pendingBullet += " " + line.trim();
      continue;
    }

    // Inside a version block but before any section: intro paragraph.
    if (current && !currentSection && line.trim().length > 0 && !line.startsWith("---")) {
      // Skip top-of-file boilerplate "[releases]: ..." reference links
      if (/^\[[^\]]+\]:\s/.test(line)) continue;
      current.intro.push(line.trim());
      continue;
    }

    // Anything else (blank line, ---, top-of-file boilerplate before
    // any version header): use as a flush boundary.
    if (line.trim().length === 0) {
      flushBullet();
    }
  }

  flushSection();
  if (current) entries.push(current);

  return entries;
}
