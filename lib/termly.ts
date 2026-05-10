import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Read a Termly-cleaned HTML file at build time and return its contents
 * as a string.  Used by `/legal/*` pages to embed the authoritative
 * Termly text via `<LegalDoc html={...} />`.
 *
 * Files must live at `docs/cleaned/<slug>.html` (produced by
 * `scripts/clean-termly.mjs`).  The page is a server component, so
 * `node:fs` is fine here — Next.js inlines the HTML at build time and
 * never ships fs to the browser.
 */
export function readTermlyPolicy(slug: string): string {
  const path = join(process.cwd(), "docs", "cleaned", `${slug}.html`);
  try {
    return readFileSync(path, "utf8");
  } catch (err) {
    // Fail loud during build — a missing policy file is a real problem.
    throw new Error(
      `Could not read Termly policy at ${path}. ` +
        `Run \`node scripts/clean-termly.mjs\` to regenerate cleaned HTML. ` +
        `Original error: ${(err as Error).message}`,
    );
  }
}
