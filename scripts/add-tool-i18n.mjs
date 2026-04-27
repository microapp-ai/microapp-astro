/**
 * add-tool-i18n.mjs
 * Generates toolList translations for all 96 tools in all 6 non-English locales
 * and inserts them into each locale's common.ts file.
 *
 * Usage:
 *   node scripts/add-tool-i18n.mjs
 *   node scripts/add-tool-i18n.mjs --locale es   (single locale)
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// Load .env
try {
  const envContent = readFileSync(resolve(ROOT, ".env"), "utf-8");
  for (const line of envContent.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const k = t.slice(0, eq).trim();
    const v = t.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[k]) process.env[k] = v;
  }
} catch {}

const forgeUrl = (process.env.BUILT_IN_FORGE_API_URL || "").replace(/\/+$/, "");
const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;
if (!forgeUrl || !forgeKey) {
  console.error("❌ Missing BUILT_IN_FORGE_API_URL or BUILT_IN_FORGE_API_KEY");
  process.exit(1);
}

// All 96 tools
const TOOLS = [
  ["word-counter", "Word Counter", "Count words, characters & reading time"],
  ["case-converter", "Case Converter", "UPPER, lower, Title, camelCase & more"],
  ["lorem-ipsum", "Lorem Ipsum", "Generate placeholder text instantly"],
  ["sentence-counter", "Sentence Counter", "Count sentences, paragraphs & more"],
  ["line-break-removal-tool", "Line Break Remover", "Remove or clean up line breaks in text"],
  ["character-counter", "Character Counter", "Count characters with and without spaces"],
  ["palindrome-checker", "Palindrome Checker", "Check if a word or phrase is a palindrome"],
  ["vowel-counter", "Vowel Counter", "Count vowels and consonants in any text"],
  ["text-repeater", "Text Repeater", "Repeat any text N times instantly"],
  ["remove-duplicate-lines", "Remove Duplicate Lines", "Remove duplicate lines from any text"],
  ["sort-lines", "Sort Lines", "Sort lines alphabetically or numerically"],
  ["whitespace-remover", "Whitespace Remover", "Remove extra spaces, tabs, and blank lines"],
  ["reverse-text-generator", "Reverse Text", "Reverse any text or sentence instantly"],
  ["tiny-text-generator", "Tiny Text Generator", "Convert text to tiny Unicode characters"],
  ["text-diff-checker", "Text Diff Checker", "Compare two texts and highlight differences"],
  ["reading-time-calculator", "Reading Time Calculator", "Estimate how long it takes to read any text"],
  ["readability-checker", "Readability Checker", "Check Flesch-Kincaid readability score"],
  ["merge-words", "Merge Words", "Combine two lists of words together"],
  ["word-frequency-counter", "Word Frequency Counter", "Count how often each word appears"],
  ["morse-code", "Morse Code Converter", "Convert text to Morse code and back"],
  ["signature-generator", "Signature Generator", "Create stylish text-based signatures"],
  ["percentage-calculator", "Percentage Calculator", "Calculate percentages, discounts & more"],
  ["unit-converter", "Unit Converter", "Convert between any units of measurement"],
  ["tip-calculator", "Tip Calculator", "Calculate tips and split bills"],
  ["bmi-calculator", "BMI Calculator", "Calculate your Body Mass Index"],
  ["calorie-calculator", "Calorie Calculator", "Estimate daily calorie needs"],
  ["gpa-calculator", "GPA Calculator", "Calculate your Grade Point Average"],
  ["salary-to-hourly", "Salary to Hourly", "Convert annual salary to hourly rate"],
  ["loan-calculator", "Loan Calculator", "Calculate monthly payments and total interest"],
  ["compound-interest-calculator", "Compound Interest Calculator", "Calculate compound interest over time"],
  ["discount-calculator", "Discount Calculator", "Find sale price after discount"],
  ["random-number-generator", "Random Number Generator", "Generate random numbers in any range"],
  ["number-to-words", "Number to Words", "Convert numbers to written words"],
  ["roman-numeral-converter", "Roman Numeral Converter", "Convert between numbers and Roman numerals"],
  ["binary-to-decimal", "Binary to Decimal", "Convert binary, decimal, hex & octal"],
  ["geometric-mean-calculator", "Geometric Mean Calculator", "Calculate the geometric mean of numbers"],
  ["mass-calculator", "Mass Calculator", "Calculate mass from density and volume"],
  ["fuel-cost-calculator", "Fuel Cost Calculator", "Estimate trip fuel costs"],
  ["army-body-fat-calculator", "Army Body Fat Calculator", "Calculate body fat using Army method"],
  ["histogram-maker", "Histogram Maker", "Create histograms from your data"],
  ["temperature-converter", "Temperature Converter", "Convert between Celsius, Fahrenheit & Kelvin"],
  ["weight-converter", "Weight Converter", "Convert between weight units"],
  ["length-converter", "Length Converter", "Convert between length and distance units"],
  ["date-time-calculator", "Date & Time Calculator", "Add or subtract dates and times"],
  ["age-calculator", "Age Calculator", "Calculate exact age in years, months & days"],
  ["days-between", "Days Between Dates", "Count days between two dates"],
  ["age-difference-calculator", "Age Difference Calculator", "Find the age difference between two people"],
  ["countdown-timer", "Countdown Timer", "Count down to any date or event"],
  ["stopwatch", "Stopwatch", "Precise online stopwatch with lap times"],
  ["pomodoro-timer", "Pomodoro Timer", "Focus timer using the Pomodoro technique"],
  ["color-converter", "Color Converter", "Convert between HEX, RGB, HSL & more"],
  ["hex-to-rgb", "HEX to RGB", "Convert HEX color codes to RGB values"],
  ["hex-color-picker", "HEX Color Picker", "Pick and explore hex color codes"],
  ["color-palette-generator", "Color Palette Generator", "Generate beautiful color palettes"],
  ["gradient-generator", "Gradient Generator", "Create CSS gradient backgrounds"],
  ["base64", "Base64 Encoder/Decoder", "Encode and decode Base64 strings"],
  ["json-formatter", "JSON Formatter", "Format, validate and minify JSON"],
  ["url-encoder-decoder", "URL Encoder/Decoder", "Encode and decode URL strings"],
  ["password-generator", "Password Generator", "Generate secure random passwords"],
  ["uuid-generator", "UUID Generator", "Generate random UUIDs instantly"],
  ["md5-hash-generator", "MD5 Hash Generator", "Generate MD5 hashes from text"],
  ["sha256-generator", "SHA-256 Generator", "Generate SHA-256 hashes from text"],
  ["html-encoder-decoder", "HTML Encoder/Decoder", "Encode and decode HTML entities"],
  ["markdown-to-html", "Markdown to HTML", "Convert Markdown to HTML instantly"],
  ["text-to-binary", "Text to Binary", "Convert text to binary code"],
  ["regex-tester", "Regex Tester", "Test and debug regular expressions"],
  ["slug-generator", "Slug Generator", "Generate URL-friendly slugs from text"],
  ["curl-builder", "cURL Builder", "Build cURL commands visually"],
  ["csv-to-json", "CSV to JSON", "Convert CSV data to JSON format"],
  ["json-to-csv", "JSON to CSV", "Convert JSON data to CSV format"],
  ["rem-to-px-converter", "REM to PX Converter", "Convert REM units to pixels"],
  ["css-animation-generator", "CSS Animation Generator", "Generate CSS keyframe animations"],
  ["generate-random-ip", "Random IP Generator", "Generate random IP addresses"],
  ["qr-code-reader", "QR Code Reader", "Read and decode QR codes"],
  ["coin-flip", "Coin Flip", "Flip a virtual coin online"],
  ["dice-roller", "Dice Roller", "Roll virtual dice of any type"],
  ["random-name-generator", "Random Name Generator", "Generate random names instantly"],
  ["random-state-generator", "Random State Generator", "Pick a random US state"],
  ["random-word-generator", "Random Word Generator", "Generate random words instantly"],
  ["goofy-ahh-names-generator", "Goofy Name Generator", "Generate funny goofy names"],
  ["acronym-generator", "Acronym Generator", "Create acronyms from any phrase"],
  ["outline-generator-ai", "AI Outline Generator", "Generate outlines with AI"],
  ["thank-you-note", "Thank You Note Generator", "Write thank you notes with AI"],
  ["ai-joke-generator", "AI Joke Generator", "Generate jokes with AI"],
  ["ai-poem-writer", "AI Poem Writer", "Write poems with AI"],
  ["ai-bio-generator", "AI Bio Generator", "Generate professional bios with AI"],
  ["email-subject-line-generator", "Email Subject Line Generator", "Generate email subject lines with AI"],
  ["hashtag-generator", "Hashtag Generator", "Generate hashtags for social media"],
  ["caption-generator", "Caption Generator", "Generate captions with AI"],
  ["cover-letter-generator", "Cover Letter Generator", "Write cover letters with AI"],
  ["product-description-generator", "Product Description Generator", "Generate product descriptions with AI"],
  ["paraphrasing-tool", "Paraphrasing Tool", "Rewrite text in different words"],
  ["summarizer", "Text Summarizer", "Summarize long text with AI"],
  ["text-to-bullet-points", "Text to Bullet Points", "Convert text to bullet points"],
  ["meeting-agenda-generator", "Meeting Agenda Generator", "Generate meeting agendas with AI"],
  ["email-generator", "Email Generator", "Write professional emails with AI"],
];

const LOCALES = {
  es: "Spanish",
  de: "German",
  ru: "Russian",
  hi: "Hindi",
  ar: "Arabic",
  pl: "Polish",
};

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
  const data = await res.json();
  return data.choices[0].message.content;
}

async function translateBatch(batch, locale, langName) {
  const toolsJson = JSON.stringify(
    batch.map(([slug, label, desc]) => ({ slug, label, desc })),
    null, 2
  );
  const prompt = `Translate the following tool names and short descriptions into ${langName}.
Keep translations concise — labels should be 2-5 words, descriptions 5-10 words.
Preserve technical terms (HTML, CSS, JSON, Base64, MD5, SHA-256, UUID, BMI, GPA, URL, AI, QR, cURL, REM, PX, Pomodoro, Flesch-Kincaid, etc.) in their original form.
Return a JSON object with slug as key and an object with "label" and "desc" as value.

Tools to translate:
${toolsJson}

Return ONLY valid JSON like:
{
  "word-counter": {"label": "...", "desc": "..."},
  "case-converter": {"label": "...", "desc": "..."}
}`;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const result = await callLLM(
        [{ role: "user", content: prompt }],
        { type: "json_object" }
      );
      return JSON.parse(result);
    } catch (e) {
      if (attempt === 3) throw e;
      console.log(`  Retry ${attempt}/3 (${e.message.slice(0,50)})...`);
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

async function translateTools(locale, langName) {
  const BATCH_SIZE = 40;
  const results = {};
  for (let i = 0; i < TOOLS.length; i += BATCH_SIZE) {
    const batch = TOOLS.slice(i, i + BATCH_SIZE);
    process.stdout.write(`  batch ${Math.floor(i/BATCH_SIZE)+1}/${Math.ceil(TOOLS.length/BATCH_SIZE)}... `);
    const batchResult = await translateBatch(batch, locale, langName);
    Object.assign(results, batchResult);
    console.log(`${Object.keys(batchResult).length} tools`);
    if (i + BATCH_SIZE < TOOLS.length) await new Promise(r => setTimeout(r, 500));
  }
  return results;
}

function buildBlock(translations) {
  const lines = ["    toolList: {"];
  for (const [slug, label, desc] of TOOLS) {
    const t = translations?.[slug] ?? {};
    const tl = (t.label || label).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    const td = (t.desc || desc).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    lines.push(`      "${slug}": {`);
    lines.push(`        label: "${tl}",`);
    lines.push(`        desc: "${td}",`);
    lines.push(`      },`);
  }
  lines.push("    },");
  return lines.join("\n");
}

function insertBlock(filepath, block) {
  let content = readFileSync(filepath, "utf-8");
  // Remove existing toolList block if present
  content = content.replace(/\n    toolList: \{[\s\S]*?\n    \},\n/g, "\n");
  // Insert before closing marker
  const marker = "} as const;";
  const idx = content.lastIndexOf(marker);
  if (idx === -1) {
    console.warn(`  WARNING: marker not found in ${filepath}`);
    return;
  }
  const insertPos = content.lastIndexOf("\n", idx) + 1;
  const newContent = content.slice(0, insertPos) + block + "\n" + content.slice(insertPos);
  writeFileSync(filepath, newContent, "utf-8");
}

// Parse --locale flag
const localeArg = process.argv.find(a => a.startsWith("--locale="))?.split("=")[1]
  || process.argv[process.argv.indexOf("--locale") + 1];
const targetLocales = localeArg
  ? Object.fromEntries(localeArg.split(",").map(l => [l, LOCALES[l]]).filter(([,v]) => v))
  : LOCALES;

// English first (no LLM)
const enPath = resolve(ROOT, "src/i18n/locales/en/common.ts");
insertBlock(enPath, buildBlock(null));
console.log("OK: en — toolList block added");

// Non-English locales
for (const [locale, langName] of Object.entries(targetLocales)) {
  process.stdout.write(`Translating ${langName} (${locale})... `);
  try {
    const translations = await translateTools(locale, langName);
    const block = buildBlock(translations);
    const filepath = resolve(ROOT, `src/i18n/locales/${locale}/common.ts`);
    insertBlock(filepath, block);
    console.log(`OK (${Object.keys(translations).length} tools)`);
  } catch (e) {
    console.log(`ERROR: ${e.message}`);
  }
  await new Promise(r => setTimeout(r, 500));
}

console.log("\nDone!");
