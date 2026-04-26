/**
 * i18n/config.ts — Single source of truth for all supported locales.
 *
 * To add a new language:
 *   1. Add an entry to LOCALES below.
 *   2. Create src/i18n/locales/<code>/ with common.ts, home.ts, tool.ts, ratings.ts.
 *   3. Run `pnpm build` — the LLM auto-translator will fill in any missing keys.
 */

export const DEFAULT_LOCALE = "en" as const;

export const LOCALES = {
  en: { label: "English",    nativeName: "English",    dir: "ltr", flag: "🇺🇸" },
  ru: { label: "Russian",    nativeName: "Русский",    dir: "ltr", flag: "🇷🇺" },
  es: { label: "Spanish",    nativeName: "Español",    dir: "ltr", flag: "🇪🇸" },
  hi: { label: "Hindi",      nativeName: "हिन्दी",      dir: "ltr", flag: "🇮🇳" },
  ar: { label: "Arabic",     nativeName: "العربية",    dir: "rtl", flag: "🇦🇪" },
  de: { label: "German",     nativeName: "Deutsch",    dir: "ltr", flag: "🇩🇪" },
  pl: { label: "Polish",     nativeName: "Polski",     dir: "ltr", flag: "🇵🇱" },
} as const;

export type Locale = keyof typeof LOCALES;
export const LOCALE_CODES = Object.keys(LOCALES) as Locale[];
export const NON_DEFAULT_LOCALES = LOCALE_CODES.filter(l => l !== DEFAULT_LOCALE) as Exclude<Locale, "en">[];

/** Returns true if the given string is a valid locale code. */
export function isValidLocale(code: string): code is Locale {
  return code in LOCALES;
}

/** Returns the text direction for a locale (ltr or rtl). */
export function getDir(locale: Locale): "ltr" | "rtl" {
  return LOCALES[locale].dir;
}
