/**
 * add-footer-i18n.mjs
 * Adds footer translation keys to all 7 locale common.ts files.
 * Usage: node scripts/add-footer-i18n.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const LOCALES_DIR = resolve(ROOT, "src/i18n/locales");

const forgeUrl = (process.env.BUILT_IN_FORGE_API_URL || "").replace(/\/+$/, "");
const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;

async function callLLM(messages) {
  const res = await fetch(`${forgeUrl}/v1/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${forgeKey}` },
    body: JSON.stringify({ messages, response_format: { type: "json_object" } }),
  });
  if (!res.ok) throw new Error(`LLM ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return JSON.parse(data.choices[0].message.content);
}

// English footer strings
const EN = {
  tagline: "136+ free online utility tools — no account needed, no ads on tools, no tracking of your inputs.",
  newTools: "New tools added every week",
  newToolsDesc: "Browse all categories and bookmark your favourites — no email required.",
  browseAll: "Browse all 136 tools",
  categories: "Categories",
  popularTools: "Popular Tools",
  company: "Company",
  byTheNumbers: "By the numbers",
  freeTools: "Free tools",
  signupsRequired: "Signups required",
  adsOnTools: "Ads on tools",
  browserBased: "Browser-based",
  allRightsReserved: "All rights reserved.",
  madeWith: "Made with ♥ for the web",
  privacy: "Privacy",
  terms: "Terms",
  about: "About",
  privacyFirst: "Privacy-first",
  instantResults: "Instant results",
  alwaysFree: "Always free",
  // Category labels in footer
  catText: "Text Tools",
  catNumbers: "Numbers",
  catTime: "Time & Date",
  catGenerators: "Generators",
  catDev: "Dev Tools",
  catWriting: "Writing & AI",
  catColors: "Colors & Design",
  // Popular tool labels in footer
  toolWordCounter: "Word Counter",
  toolAgeCalculator: "Age Calculator",
  toolPasswordGenerator: "Password Generator",
  toolJsonFormatter: "JSON Formatter",
  toolUnitConverter: "Unit Converter",
  toolPercentageCalc: "Percentage Calc",
  toolQrCodeReader: "QR Code Reader",
  toolColorConverter: "Color Converter",
  // Company links
  companyAbout: "About",
  companyPrivacy: "Privacy Policy",
  companyTerms: "Terms of Service",
};

const LOCALES = {
  es: "Spanish",
  de: "German",
  ru: "Russian",
  hi: "Hindi",
  ar: "Arabic",
  pl: "Polish",
};

function buildBlock(t) {
  return `    footer: {
      tagline: "${t.tagline.replace(/"/g, '\\"')}",
      newTools: "${t.newTools.replace(/"/g, '\\"')}",
      newToolsDesc: "${t.newToolsDesc.replace(/"/g, '\\"')}",
      browseAll: "${t.browseAll.replace(/"/g, '\\"')}",
      categories: "${t.categories.replace(/"/g, '\\"')}",
      popularTools: "${t.popularTools.replace(/"/g, '\\"')}",
      company: "${t.company.replace(/"/g, '\\"')}",
      byTheNumbers: "${t.byTheNumbers.replace(/"/g, '\\"')}",
      freeTools: "${t.freeTools.replace(/"/g, '\\"')}",
      signupsRequired: "${t.signupsRequired.replace(/"/g, '\\"')}",
      adsOnTools: "${t.adsOnTools.replace(/"/g, '\\"')}",
      browserBased: "${t.browserBased.replace(/"/g, '\\"')}",
      allRightsReserved: "${t.allRightsReserved.replace(/"/g, '\\"')}",
      madeWith: "${t.madeWith.replace(/"/g, '\\"')}",
      privacy: "${t.privacy.replace(/"/g, '\\"')}",
      terms: "${t.terms.replace(/"/g, '\\"')}",
      about: "${t.about.replace(/"/g, '\\"')}",
      privacyFirst: "${t.privacyFirst.replace(/"/g, '\\"')}",
      instantResults: "${t.instantResults.replace(/"/g, '\\"')}",
      alwaysFree: "${t.alwaysFree.replace(/"/g, '\\"')}",
      catText: "${t.catText.replace(/"/g, '\\"')}",
      catNumbers: "${t.catNumbers.replace(/"/g, '\\"')}",
      catTime: "${t.catTime.replace(/"/g, '\\"')}",
      catGenerators: "${t.catGenerators.replace(/"/g, '\\"')}",
      catDev: "${t.catDev.replace(/"/g, '\\"')}",
      catWriting: "${t.catWriting.replace(/"/g, '\\"')}",
      catColors: "${t.catColors.replace(/"/g, '\\"')}",
      toolWordCounter: "${t.toolWordCounter.replace(/"/g, '\\"')}",
      toolAgeCalculator: "${t.toolAgeCalculator.replace(/"/g, '\\"')}",
      toolPasswordGenerator: "${t.toolPasswordGenerator.replace(/"/g, '\\"')}",
      toolJsonFormatter: "${t.toolJsonFormatter.replace(/"/g, '\\"')}",
      toolUnitConverter: "${t.toolUnitConverter.replace(/"/g, '\\"')}",
      toolPercentageCalc: "${t.toolPercentageCalc.replace(/"/g, '\\"')}",
      toolQrCodeReader: "${t.toolQrCodeReader.replace(/"/g, '\\"')}",
      toolColorConverter: "${t.toolColorConverter.replace(/"/g, '\\"')}",
      companyAbout: "${t.companyAbout.replace(/"/g, '\\"')}",
      companyPrivacy: "${t.companyPrivacy.replace(/"/g, '\\"')}",
      companyTerms: "${t.companyTerms.replace(/"/g, '\\"')}",
    },`;
}

function insertBlock(filepath, block) {
  let content = readFileSync(filepath, "utf-8");
  // Remove existing footer block
  content = content.replace(/\n    footer: \{[\s\S]*?\n    \},\n/g, "\n");
  const marker = "} as const;";
  const idx = content.lastIndexOf(marker);
  if (idx === -1) { console.warn("  marker not found in", filepath); return; }
  const insertPos = content.lastIndexOf("\n", idx) + 1;
  writeFileSync(filepath, content.slice(0, insertPos) + block + "\n" + content.slice(insertPos), "utf-8");
}

// English (no translation needed)
insertBlock(resolve(LOCALES_DIR, "en/common.ts"), buildBlock(EN));
console.log("OK: en");

// Other locales
for (const [locale, langName] of Object.entries(LOCALES)) {
  process.stdout.write(`Translating ${langName} (${locale})... `);
  try {
    const keys = JSON.stringify(EN, null, 2);
    const result = await callLLM([{
      role: "user",
      content: `Translate all values in this JSON object into ${langName}. Keep proper nouns (Microapp, HTML, JSON, QR, BMI, etc.) unchanged. Return a JSON object with the same keys.\n\n${keys}`
    }]);
    insertBlock(resolve(LOCALES_DIR, `${locale}/common.ts`), buildBlock({ ...EN, ...result }));
    console.log("OK");
  } catch (e) {
    console.log(`ERROR: ${e.message.slice(0, 80)}`);
  }
  await new Promise(r => setTimeout(r, 500));
}

console.log("\nDone!");
