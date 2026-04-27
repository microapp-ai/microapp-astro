/**
 * translate-tools.mjs
 *
 * Translates tool metadata from English into one or more locales
 * and upserts the results into the `tool_metadata_translations` table in Supabase.
 *
 * Also generates a translated seo_article HTML string for each tool/locale.
 * The English seo_article is read from the `tool_metadata` table (seo_article column)
 * and translated into the target locale, then stored in tool_metadata_translations.
 *
 * Usage:
 *   node scripts/translate-tools.mjs --locale es
 *   node scripts/translate-tools.mjs --locale es --slug word-counter
 *   node scripts/translate-tools.mjs --locale es,ru,de --limit 10
 *
 * Env vars required (set in .env or shell):
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   BUILT_IN_FORGE_API_URL   (Manus LLM API base URL)
 *   BUILT_IN_FORGE_API_KEY   (Manus LLM API key)
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// ── Load .env manually (no dotenv dependency needed) ──────────────────────────
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

// ── Parse CLI args ─────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const getArg = (flag) => {
  const idx = args.indexOf(flag);
  return idx !== -1 ? args[idx + 1] : null;
};

const localeArg = getArg("--locale") || "es";
const locales = localeArg.split(",").map((l) => l.trim());
const slugFilter = getArg("--slug") || null;
const limit = parseInt(getArg("--limit") || "0", 10);

// ── Locale display names for the LLM prompt ───────────────────────────────────
const LOCALE_NAMES = {
  es: "Spanish",
  ru: "Russian",
  hi: "Hindi",
  ar: "Arabic",
  de: "German",
  pl: "Polish",
};

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

// ── LLM helper ────────────────────────────────────────────────────────────────
const forgeUrl = (process.env.BUILT_IN_FORGE_API_URL || "").replace(/\/+$/, "");
const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;

if (!forgeUrl || !forgeKey) {
  console.error("❌ Missing BUILT_IN_FORGE_API_URL or BUILT_IN_FORGE_API_KEY");
  process.exit(1);
}

async function callLLM(messages, responseFormat) {
  const body = { messages };
  if (responseFormat) body.response_format = responseFormat;

  const res = await fetch(`${forgeUrl}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${forgeKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`LLM API error ${res.status}: ${text}`);
  }

  const json = await res.json();
  return json.choices?.[0]?.message?.content || "";
}

// ── Translation function (metadata fields) ───────────────────────────────────
async function translateTool(tool, locale) {
  const langName = LOCALE_NAMES[locale] || locale;

  const prompt = `You are a professional translator for a web utility tools website called Microapp.
Translate the following tool metadata from English into ${langName}.

Rules:
- Keep the tool name recognizable but natural in ${langName} (you may transliterate or adapt)
- Keep translations concise and natural — not word-for-word literal
- For "how_to" steps, keep them short and action-oriented
- For "faqs", keep questions and answers helpful and natural
- For "keywords", translate them and add locale-relevant search terms
- Do NOT translate the "slug" field
- Return ONLY valid JSON, no markdown, no explanation

English source:
${JSON.stringify({
  label: tool.label,
  short_desc: tool.desc,
  title: tool.title,
  description: tool.description,
  intro: tool.intro,
  how_to: tool.howTo || tool.how_to,
  faqs: tool.faqs,
  keywords: tool.keywords,
}, null, 2)}`;

  const schema = {
    type: "json_schema",
    json_schema: {
      name: "tool_translation",
      strict: true,
      schema: {
        type: "object",
        properties: {
          label: { type: "string", description: "Translated tool name" },
          short_desc: { type: "string", description: "Translated short description (1 sentence)" },
          title: { type: "string", description: "Translated meta title (50-60 chars)" },
          description: { type: "string", description: "Translated meta description (120-160 chars)" },
          intro: { type: "string", description: "Translated intro paragraph (2-3 sentences)" },
          how_to: {
            type: "array",
            items: { type: "string" },
            description: "Translated how-to steps",
          },
          faqs: {
            type: "array",
            items: {
              type: "object",
              properties: {
                question: { type: "string" },
                answer: { type: "string" },
              },
              required: ["question", "answer"],
              additionalProperties: false,
            },
            description: "Translated FAQ items",
          },
          keywords: {
            type: "array",
            items: { type: "string" },
            description: "Translated + locale-relevant keywords",
          },
        },
        required: ["label", "short_desc", "title", "description", "intro", "how_to", "faqs", "keywords"],
        additionalProperties: false,
      },
    },
  };

  const content = await callLLM(
    [
      { role: "system", content: `You are a professional translator. Always respond with valid JSON only.` },
      { role: "user", content: prompt },
    ],
    schema
  );

  return JSON.parse(content);
}

// ── SEO Article translation function ─────────────────────────────────────────
/**
 * Translates the English seo_article HTML into the target locale.
 * Returns the translated HTML string, or null if no English article exists.
 *
 * The HTML uses these CSS classes (styled in global.css):
 *   .callout  — highlighted info box
 *   .table-wrap — scrollable table wrapper
 * Standard tags: h2, h3, p, table, thead, tbody, tr, th, td
 */
async function translateSeoArticle(englishHtml, locale) {
  if (!englishHtml) return null;

  const langName = LOCALE_NAMES[locale] || locale;

  const prompt = `You are a professional web content translator for a utility tools website called Microapp.

Translate the following HTML article from English into ${langName}.

CRITICAL RULES:
1. Return ONLY the translated HTML — no markdown, no code fences, no explanation
2. Keep ALL HTML tags, attributes, and CSS class names EXACTLY as-is (do not translate class names)
3. Only translate the visible text content inside tags
4. Keep numbers, units, and technical terms accurate
5. Preserve the exact HTML structure — do not add or remove tags
6. The HTML uses these CSS classes: .callout (info box), .table-wrap (table wrapper)
7. Make the translation natural and fluent in ${langName}, not word-for-word literal

English HTML to translate:
${englishHtml}`;

  const content = await callLLM([
    {
      role: "system",
      content: `You are a professional HTML content translator. Return only the translated HTML, preserving all tags and attributes exactly.`,
    },
    { role: "user", content: prompt },
  ]);

  // Strip any accidental markdown code fences
  return content
    .replace(/^```html\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

// ── Main ───────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🌐 Translating tools into: ${locales.join(", ")}`);
  if (slugFilter) console.log(`   Filter: slug = ${slugFilter}`);
  if (limit) console.log(`   Limit: ${limit} tools`);

  // Fetch tools from Supabase
  let query = supabase.from("tool_metadata").select("*").order("slug");
  if (slugFilter) query = query.eq("slug", slugFilter);
  if (limit) query = query.limit(limit);

  const { data: tools, error } = await query;
  if (error) {
    console.error("❌ Failed to fetch tools:", error.message);
    process.exit(1);
  }

  console.log(`📦 Found ${tools.length} tool(s) to translate\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const tool of tools) {
    for (const locale of locales) {
      process.stdout.write(`  [${locale}] ${tool.slug} ... `);
      try {
        // Translate metadata fields
        const translated = await translateTool(tool, locale);

        // Translate seo_article if it exists in the English tool_metadata
        let translatedSeoArticle = null;
        if (tool.seo_article) {
          process.stdout.write(`(translating article) `);
          translatedSeoArticle = await translateSeoArticle(tool.seo_article, locale);
        }

        const upsertData = {
          slug: tool.slug,
          locale,
          label: translated.label,
          short_desc: translated.short_desc,
          title: translated.title,
          description: translated.description,
          intro: translated.intro,
          how_to: translated.how_to,
          faqs: translated.faqs,
          keywords: translated.keywords,
          updated_at: new Date().toISOString(),
        };

        // Only include seo_article if we have a translation
        if (translatedSeoArticle) {
          upsertData.seo_article = translatedSeoArticle;
        }

        const { error: upsertError } = await supabase
          .from("tool_metadata_translations")
          .upsert(upsertData, { onConflict: "slug,locale" });

        if (upsertError) {
          console.log(`❌ DB error: ${upsertError.message}`);
          errorCount++;
        } else {
          console.log(`✅ done`);
          successCount++;
        }
      } catch (err) {
        console.log(`❌ ${err.message}`);
        errorCount++;
      }

      // Small delay to avoid rate limiting
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  console.log(`\n✨ Done: ${successCount} translated, ${errorCount} errors`);
  console.log(`\nNext step: run 'pnpm build' to regenerate static pages with translations.\n`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
