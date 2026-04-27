/**
 * generate-slug-mappings.mjs
 * 
 * Generates translated URL slugs for all 96 tools in 6 non-English locales.
 * Output: src/i18n/slug-mappings.ts
 * 
 * Format:
 *   export const SLUG_MAPPINGS: Record<Locale, Record<string, string>> = {
 *     es: { "word-counter": "contador-de-palabras", ... },
 *     de: { "word-counter": "wortzahler", ... },
 *     ...
 *   }
 *   export const REVERSE_SLUG_MAPPINGS: Record<Locale, Record<string, string>> = {
 *     es: { "contador-de-palabras": "word-counter", ... },
 *     ...
 *   }
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const FORGE_URL = process.env.BUILT_IN_FORGE_API_URL?.replace(/\/+$/, '');
const FORGE_KEY = process.env.BUILT_IN_FORGE_API_KEY;

if (!FORGE_URL || !FORGE_KEY) {
  console.error('Missing BUILT_IN_FORGE_API_URL or BUILT_IN_FORGE_API_KEY');
  process.exit(1);
}

const ALL_SLUGS = ["acronym-generator","age-calculator","age-difference-calculator","ai-bio-generator","ai-joke-generator","ai-poem-writer","army-body-fat-calculator","base64","binary-to-decimal","bmi-calculator","calorie-calculator","caption-generator","case-converter","character-counter","coin-flip","color-converter","color-palette-generator","compound-interest-calculator","countdown-timer","cover-letter-generator","css-animation-generator","csv-to-json","curl-builder","date-time-calculator","days-between","dice-roller","discount-calculator","email-generator","email-subject-line-generator","fuel-cost-calculator","generate-random-ip","geometric-mean-calculator","goofy-ahh-names-generator","gpa-calculator","gradient-generator","hashtag-generator","hex-color-picker","hex-to-rgb","histogram-maker","html-encoder-decoder","json-formatter","json-to-csv","length-converter","line-break-removal-tool","loan-calculator","lorem-ipsum","markdown-to-html","mass-calculator","md5-hash-generator","meeting-agenda-generator","merge-words","morse-code","number-to-words","outline-generator-ai","palindrome-checker","paraphrasing-tool","password-generator","percentage-calculator","pomodoro-timer","product-description-generator","qr-code-reader","random-name-generator","random-number-generator","random-state-generator","random-word-generator","readability-checker","reading-time-calculator","regex-tester","rem-to-px-converter","remove-duplicate-lines","reverse-text-generator","roman-numeral-converter","salary-to-hourly","sentence-counter","sha256-generator","signature-generator","slug-generator","sort-lines","stopwatch","summarizer","temperature-converter","text-diff-checker","text-repeater","text-to-binary","text-to-bullet-points","thank-you-note","tiny-text-generator","tip-calculator","unit-converter","url-encoder-decoder","uuid-generator","vowel-counter","weight-converter","whitespace-remover","word-counter","word-frequency-counter"];

const LOCALES = {
  es: 'Spanish',
  de: 'German',
  ru: 'Russian',
  hi: 'Hindi',
  ar: 'Arabic',
  pl: 'Polish',
};

async function callLLM(prompt) {
  const res = await fetch(`${FORGE_URL}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${FORGE_KEY}`,
    },
    body: JSON.stringify({
      model: 'claude-3-7-sonnet',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!res.ok) throw new Error(`LLM error: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.choices[0].message.content.trim();
}

function toSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics for latin scripts
    .replace(/[^a-z0-9\u0400-\u04ff\u0900-\u097f\u0600-\u06ff]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function generateSlugsForLocale(locale, langName, slugBatch) {
  const prompt = `You are a URL slug translator. Generate ${langName} URL slugs for these English tool slugs.

Rules:
- Use lowercase only
- Use hyphens as word separators (no underscores, no spaces)
- For Latin-script languages (Spanish, German, Polish): use only a-z and hyphens, remove accents/diacritics
- For non-Latin scripts (Russian, Hindi, Arabic): use the native script characters with hyphens
- Keep technical terms in English if they are universally known (e.g., "base64", "json", "md5", "sha256", "uuid", "css", "html", "regex", "csv", "qr", "ip", "rem", "px", "gpa", "bmi")
- Make slugs concise (2-4 words max)
- The slug should be a natural translation of the tool name, not a literal word-for-word translation

English slugs to translate:
${slugBatch.map(s => `"${s}"`).join('\n')}

Return ONLY a valid JSON object mapping each English slug to its ${langName} slug. No explanation, no markdown, just the JSON object.
Example format: {"word-counter": "contador-de-palabras", "age-calculator": "calculadora-edad"}`;

  let raw = await callLLM(prompt);
  
  // Extract JSON from response
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error(`No JSON found in response for ${locale}: ${raw.slice(0, 200)}`);
  
  try {
    return JSON.parse(jsonMatch[0]);
  } catch (e) {
    // Try to fix common JSON issues
    const fixed = jsonMatch[0]
      .replace(/,\s*}/g, '}')
      .replace(/,\s*]/g, ']');
    return JSON.parse(fixed);
  }
}

async function main() {
  const outputPath = resolve(ROOT, 'src/i18n/slug-mappings.ts');
  
  // Load existing mappings if any
  let existing = {};
  if (existsSync(outputPath)) {
    console.log('Loading existing mappings...');
    const content = readFileSync(outputPath, 'utf8');
    // Parse existing SLUG_MAPPINGS from the file
    try {
      const match = content.match(/export const SLUG_MAPPINGS[^=]+=\s*(\{[\s\S]*?\}) as const/);
      if (match) {
        existing = JSON.parse(match[1].replace(/(\w+):/g, '"$1":').replace(/'/g, '"'));
      }
    } catch {}
  }

  const allMappings = { ...existing };

  for (const [locale, langName] of Object.entries(LOCALES)) {
    console.log(`\n=== Generating slugs for ${langName} (${locale}) ===`);
    
    if (!allMappings[locale]) allMappings[locale] = {};
    
    // Find slugs that still need translation
    const remaining = ALL_SLUGS.filter(s => !allMappings[locale][s]);
    
    if (remaining.length === 0) {
      console.log(`  All ${ALL_SLUGS.length} slugs already translated, skipping.`);
      continue;
    }
    
    console.log(`  Translating ${remaining.length} slugs...`);
    
    // Process in batches of 48
    const BATCH = 48;
    for (let i = 0; i < remaining.length; i += BATCH) {
      const batch = remaining.slice(i, i + BATCH);
      console.log(`  Batch ${Math.floor(i/BATCH)+1}: ${batch.length} slugs`);
      
      let result;
      let attempts = 0;
      while (attempts < 3) {
        try {
          result = await generateSlugsForLocale(locale, langName, batch);
          break;
        } catch (e) {
          attempts++;
          console.warn(`  Attempt ${attempts} failed: ${e.message}`);
          if (attempts >= 3) throw e;
          await new Promise(r => setTimeout(r, 2000));
        }
      }
      
      // Merge results
      for (const [eng, local] of Object.entries(result)) {
        if (ALL_SLUGS.includes(eng)) {
          allMappings[locale][eng] = local;
        }
      }
      
      console.log(`  Got ${Object.keys(result).length} translations`);
      
      // Small delay between batches
      if (i + BATCH < remaining.length) {
        await new Promise(r => setTimeout(r, 1000));
      }
    }
    
    console.log(`  Total for ${locale}: ${Object.keys(allMappings[locale]).length}/${ALL_SLUGS.length}`);
  }

  // Build the reverse mappings (localSlug -> englishSlug)
  const reverseMappings = {};
  for (const [locale, mapping] of Object.entries(allMappings)) {
    reverseMappings[locale] = {};
    for (const [eng, local] of Object.entries(mapping)) {
      reverseMappings[locale][local] = eng;
    }
  }

  // Write the TypeScript file
  const lines = [
    `/**`,
    ` * slug-mappings.ts — Auto-generated translated URL slugs`,
    ` * Generated by scripts/generate-slug-mappings.mjs`,
    ` * DO NOT EDIT MANUALLY`,
    ` */`,
    ``,
    `export type LocaleSlug = 'es' | 'de' | 'ru' | 'hi' | 'ar' | 'pl';`,
    ``,
    `/** Maps English slug → locale slug for each non-English locale */`,
    `export const SLUG_MAPPINGS: Record<LocaleSlug, Record<string, string>> = ${JSON.stringify(allMappings, null, 2)} as const;`,
    ``,
    `/** Maps locale slug → English slug for each non-English locale (for routing) */`,
    `export const REVERSE_SLUG_MAPPINGS: Record<LocaleSlug, Record<string, string>> = ${JSON.stringify(reverseMappings, null, 2)} as const;`,
    ``,
    `/** Get the localized slug for a tool in a given locale */`,
    `export function getLocalSlug(engSlug: string, locale: string): string {`,
    `  if (locale === 'en') return engSlug;`,
    `  return (SLUG_MAPPINGS as any)[locale]?.[engSlug] ?? engSlug;`,
    `}`,
    ``,
    `/** Get the English slug from a localized slug */`,
    `export function getEngSlug(localSlug: string, locale: string): string | null {`,
    `  if (locale === 'en') return localSlug;`,
    `  return (REVERSE_SLUG_MAPPINGS as any)[locale]?.[localSlug] ?? null;`,
    `}`,
  ];

  writeFileSync(outputPath, lines.join('\n') + '\n');
  console.log(`\n✅ Written to ${outputPath}`);
  
  // Print a sample
  console.log('\nSample (word-counter):');
  for (const locale of Object.keys(LOCALES)) {
    console.log(`  ${locale}: ${allMappings[locale]?.['word-counter']}`);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
