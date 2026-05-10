#!/usr/bin/env node
/**
 * Clean Termly-exported HTML into semantic markup we can embed inside our
 * LegalDoc layout.  Strips Termly's template tags, inline styles, and
 * styling-only span wrappers while preserving structure (headings, lists,
 * tables, links, anchors).
 *
 * Usage:
 *   node scripts/clean-termly.mjs
 *
 * Reads each `*.html` file from `docs/` (the raw Termly exports) and writes
 * a cleaned version into `docs/cleaned/<slug>.html`.  The cleaned files are
 * what the React pages embed via dangerouslySetInnerHTML.
 *
 * The cleaner is intentionally conservative — it removes presentational
 * markup but keeps every word of the policy text exactly as Termly
 * generated it.  Legal content is never modified; only HTML noise is.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");
const SOURCE_DIR = join(ROOT, "docs");
const OUT_DIR = join(ROOT, "docs", "cleaned");

mkdirSync(OUT_DIR, { recursive: true });

/** Map raw Termly filenames to clean slugs the website uses. */
const FILENAME_MAP = {
  "Privacy Policy.html": "privacy-policy",
  "Terms and Conditions.html": "terms-of-service",
  "Return Policy.html": "return-policy",
  "Disclaimer.html": "disclaimer",
  "Cookie_Policy.html": "cookie-policy",
};

function cleanTermlyHtml(raw) {
  let html = raw;

  // 1. Strip Termly's <style> + <script> blocks (we use Tailwind prose).
  html = html.replace(/<style[\s\S]*?<\/style>/gi, "");
  html = html.replace(/<script[\s\S]*?<\/script>/gi, "");

  // 2. Termly wraps every clause in <bdt> conditional placeholder tags.
  //    They aren't valid HTML and just clutter the markup — replace with
  //    their inner content, then drop any orphans.
  let prev;
  do {
    prev = html;
    html = html.replace(/<bdt\b[^>]*>([\s\S]*?)<\/bdt>/gi, "$1");
  } while (html !== prev);
  html = html.replace(/<\/?bdt\b[^>]*>/gi, "");

  // 3. Drop presentational attributes that fight our brand.
  html = html.replace(/\s+style="[^"]*"/gi, "");
  html = html.replace(/\s+data-custom-class="[^"]*"/gi, "");
  html = html.replace(/\s+data-empty="[^"]*"/gi, "");
  html = html.replace(/\s+class="[^"]*"/gi, "");

  // 4. Collapse styling-only <span> wrappers (no attributes left after step 3).
  do {
    prev = html;
    html = html.replace(/<span\s*>([\s\S]*?)<\/span>/gi, "$1");
  } while (html !== prev);

  // 5. Some Termly content has stray rgb (...) or "rgb (...)" leaks from
  //    broken tags — clean those.
  html = html.replace(/rgb\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/gi, "");

  // 6. The outer <div> wrapper Termly emits has a data-custom-class — drop it.
  //    After step 3 it'll just be a bare <div> we can remove or keep.
  //    We keep it as a top-level container.

  // 7. Drop empty inline elements and whitespace-only paragraphs/divs.
  html = html.replace(/<(p|div|span)\s*>\s*<\/\1>/gi, "");

  // 8. Normalise whitespace inside text — collapse runs of spaces but keep
  //    newlines after block elements for readability.
  html = html.replace(/\s+/g, " ");
  // Re-add a newline after block-closing tags so the diff is reviewable.
  html = html.replace(
    /(<\/(?:p|div|h[1-6]|ul|ol|li|table|tr|thead|tbody|td|th)>)/gi,
    "$1\n",
  );

  // 9. Collapse multiple <br> in a row.
  html = html.replace(/(<br\s*\/?>\s*){3,}/gi, "<br><br>");

  // 10. Drop legacy <a name="..."> anchors that Termly emits — they have
  //     random IDs we don't need and they break up the document tree.
  html = html.replace(/<a\s+name="[^"]*">\s*<\/a>/gi, "");
  html = html.replace(/<a\s+name="[^"]*">/gi, "");

  // 11. Drop align="center" presentational attribute.
  html = html.replace(/\s+align="center"/gi, "");

  // 12. Clean up orphan closing tags left over from messy nested replacements.
  //     Termly's source has some unbalanced </span></bdt></div> trails.
  html = html.replace(/<\/(span|bdt)>/gi, "");

  // 13. Empty divs again after the orphan-tag pass.
  html = html.replace(/<div\s*>\s*<\/div>/gi, "");
  html = html.replace(/<div\s*>\s*<br\s*\/?>\s*<\/div>/gi, "<br>");

  // 14. Tighten Termly's "table of contents" repeated newlines around bullet items.
  html = html.replace(/(<\/li>)\s*\n\s*(<li)/gi, "$1\n$2");

  // 15. Strip the leading H1 title + (optional) "Last updated DATE" line.
  //     LegalDoc renders these separately with our typography.  This handles
  //     both single-element ("<div>Last updated May 09, 2026</div>") and
  //     multi-element ("<strong>Last updated </strong><strong>DATE</strong>")
  //     date formats by matching the entire enclosing div.
  html = html.replace(
    /^[\s\S]*?<h1\b[^>]*>[\s\S]*?<\/h1>(?:[\s\S]*?Last updated[\s\S]*?<\/div>)?(?:\s*<br\s*\/?>\s*){0,4}/i,
    "",
  );

  // 16. Drop empty <a> tags — Termly emits hidden DSAR re-links at the end
  //     of each policy that we don't need (we already have them inline).
  html = html.replace(/<a[^>]*>\s*<\/a>/gi, "");

  // 17. Empty divs left over from the strip operations above.
  html = html.replace(/<div\s*>\s*<\/div>/gi, "");

  // 18. Trim wrapping <strong> around block-level headings (invalid HTML).
  html = html.replace(/<strong>(\s*<h([1-6])\b[^>]*>[\s\S]*?<\/h\2>\s*)<\/strong>/gi, "$1");

  // 19. After stripping, the doc may start with stray closing tags or
  //     blank wrappers — trim them.
  html = html.replace(/^\s*<\/(?:strong|div|span)>\s*/gi, "");
  html = html.replace(/^\s*(<br\s*\/?>\s*)+/gi, "");

  return html.trim();
}

const files = readdirSync(SOURCE_DIR).filter((f) =>
  Object.prototype.hasOwnProperty.call(FILENAME_MAP, f),
);

let totalIn = 0;
let totalOut = 0;
const summary = [];

for (const filename of files) {
  const raw = readFileSync(join(SOURCE_DIR, filename), "utf8");
  const clean = cleanTermlyHtml(raw);
  const slug = FILENAME_MAP[filename];
  const outPath = join(OUT_DIR, `${slug}.html`);
  writeFileSync(outPath, clean, "utf8");

  totalIn += raw.length;
  totalOut += clean.length;
  summary.push({
    file: filename,
    slug,
    rawKb: (raw.length / 1024).toFixed(1),
    cleanKb: (clean.length / 1024).toFixed(1),
    reduction: `${(((raw.length - clean.length) / raw.length) * 100).toFixed(0)}%`,
  });
}

console.log("\nTermly HTML cleanup\n");
console.table(summary);
console.log(
  `\nTotal: ${(totalIn / 1024).toFixed(1)} KB → ${(totalOut / 1024).toFixed(1)} KB`,
);
console.log(`Cleaned files written to ${OUT_DIR}\n`);
