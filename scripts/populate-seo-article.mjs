/**
 * populate-seo-article.mjs
 *
 * Populates the English seo_article HTML for specific tools in the tool_metadata table.
 * Run this once to seed the English content; then use translate-tools.mjs to generate
 * translated versions for other locales.
 *
 * Usage:
 *   node scripts/populate-seo-article.mjs
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// ── Load .env manually ────────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
try {
  const envPath = resolve(__dirname, "../.env");
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
} catch {
  // .env not found — rely on shell env vars
}

// ── Supabase client ────────────────────────────────────────────────────────────
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// ── SEO Article HTML content for each tool ────────────────────────────────────
// These are the English originals extracted from the React components before migration.
// HTML uses .callout and .table-wrap CSS classes (styled in global.css).

const SEO_ARTICLES = {
  "word-counter": `<h2>Why Word Count Matters — and How It Is Calculated</h2>
<p>Word count is one of the most fundamental metrics in writing. It determines whether your content meets submission requirements, whether your article is long enough to rank on Google, and how long it will take a reader to finish. A 'word' is typically defined as any sequence of characters separated by whitespace. Reading time is estimated at 200–250 words per minute for average adult readers, which is the standard used by Medium, Substack, and most publishing platforms.</p>
<h3>Content Length Guide for SEO</h3>
<div class="callout">
<p>Google's top-ranking pages for competitive keywords average 1,400–1,800 words. For informational queries ('how to calculate BMI'), 800–1,200 words is typically sufficient. For transactional queries ('best password manager'), 1,500–2,500 words with comparison tables tends to dominate. Short-form content (under 300 words) rarely ranks for competitive queries but can rank for highly specific long-tail keywords.</p>
</div>
<h3>Word Count Benchmarks by Content Type</h3>
<div class="table-wrap">
<table>
<thead>
<tr>
<th>Content Type</th>
<th>Recommended Length</th>
<th>Reading Time</th>
</tr>
</thead>
<tbody>
<tr><td>Social media post</td><td>50–150 words</td><td>&lt; 1 min</td></tr>
<tr><td>Email newsletter</td><td>200–500 words</td><td>1–2 min</td></tr>
<tr><td>Blog post (basic)</td><td>600–900 words</td><td>3–4 min</td></tr>
<tr><td>SEO article</td><td>1,200–2,000 words</td><td>5–8 min</td></tr>
<tr><td>Long-form guide</td><td>2,500–5,000 words</td><td>10–20 min</td></tr>
<tr><td>Academic paper</td><td>5,000–10,000 words</td><td>20–40 min</td></tr>
</tbody>
</table>
</div>`,
};

// ── Main ───────────────────────────────────────────────────────────────────────
async function main() {
  console.log("\n📝 Populating English seo_article for tools...\n");

  for (const [slug, html] of Object.entries(SEO_ARTICLES)) {
    process.stdout.write(`  ${slug} ... `);

    const { error } = await supabase
      .from("tool_metadata")
      .update({ seo_article: html })
      .eq("slug", slug);

    if (error) {
      console.log(`❌ DB error: ${error.message}`);
    } else {
      console.log(`✅ done (${html.length} chars)`);
    }
  }

  console.log("\n✨ Done! Now run the translation script to generate locale versions:");
  console.log("   node scripts/translate-tools.mjs --locale es --slug word-counter\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
