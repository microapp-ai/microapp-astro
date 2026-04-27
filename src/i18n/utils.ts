/**
 * i18n/utils.ts — Translation helpers used across Astro pages and React islands.
 *
 * Key functions:
 *   getLocaleFromUrl(url)   — extract locale from a URL pathname
 *   localizeUrl(path, locale) — prepend locale prefix to a path
 *   useTranslations(locale) — return a t() function for a given locale
 *   getTranslations(locale) — load all translation namespaces for a locale
 */

import { DEFAULT_LOCALE, isValidLocale, type Locale } from "./config";
import type { Translations } from "./types";
import { getLocalSlug } from "./slug-mappings";

// ─── Dynamic locale loader ────────────────────────────────────────────────────
// We use a cache so each locale is only loaded once per build.
const cache = new Map<Locale, Translations>();

export async function getTranslations(locale: Locale): Promise<Translations> {
  if (cache.has(locale)) return cache.get(locale)!;

  const [common, home, tool, ratings] = await Promise.all([
    import(`./locales/${locale}/common.ts`).then(m => m.default),
    import(`./locales/${locale}/home.ts`).then(m => m.default),
    import(`./locales/${locale}/tool.ts`).then(m => m.default),
    import(`./locales/${locale}/ratings.ts`).then(m => m.default),
  ]);

  const translations: Translations = { common, home, tool, ratings };
  cache.set(locale, translations);
  return translations;
}

/**
 * Returns a typed t() function for the given locale.
 * Falls back to English for any missing key.
 *
 * Usage (Astro):
 *   const t = await useTranslations(locale);
 *   t("common.nav.allTools")  // → "All Tools" or translated equivalent
 */
export async function useTranslations(locale: Locale) {
  const translations = await getTranslations(locale);
  const fallback = locale !== DEFAULT_LOCALE ? await getTranslations(DEFAULT_LOCALE) : null;

  return function t(key: string): string {
    const parts = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = translations;
    for (const part of parts) {
      value = value?.[part];
      if (value === undefined) break;
    }
    if (typeof value === "string") return value;

    // Fallback to English
    if (fallback) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let fb: any = fallback;
      for (const part of parts) {
        fb = fb?.[part];
        if (fb === undefined) break;
      }
      if (typeof fb === "string") return fb;
    }

    // Last resort: return the key itself
    return key;
  };
}

// ─── URL helpers ─────────────────────────────────────────────────────────────

/**
 * Extract the locale from a URL pathname.
 * /es/word-counter → "es"
 * /word-counter    → "en" (default)
 */
export function getLocaleFromUrl(url: URL | string): Locale {
  const pathname = typeof url === "string" ? url : url.pathname;
  const [, maybeLocale] = pathname.split("/");
  if (maybeLocale && isValidLocale(maybeLocale)) return maybeLocale;
  return DEFAULT_LOCALE;
}

/**
 * Strip the locale prefix from a pathname.
 * /es/word-counter → /word-counter
 * /word-counter    → /word-counter
 */
export function stripLocale(pathname: string): string {
  const [, maybeLocale, ...rest] = pathname.split("/");
  if (maybeLocale && isValidLocale(maybeLocale)) {
    return "/" + rest.join("/");
  }
  return pathname;
}

/**
 * Prepend a locale prefix to a path, translating tool slugs when applicable.
 * localizeUrl("/word-counter", "es") → "/es/contador-palabras"
 * localizeUrl("/word-counter", "en") → "/word-counter"  (no prefix for default)
 * localizeUrl("/categories/text-tools", "es") → "/es/categories/text-tools" (non-tool paths unchanged)
 */
export function localizeUrl(path: string, locale: Locale): string {
  // Strip any existing locale prefix first
  const cleanPath = stripLocale(path);
  if (locale === DEFAULT_LOCALE) return cleanPath;

  // Translate tool slugs: only for top-level paths like /word-counter
  // (not /categories/..., /about, /privacy-policy, etc.)
  const segments = cleanPath.replace(/^\//, '').split('/');
  if (segments.length === 1 && segments[0] && !segments[0].includes('.')) {
    const engSlug = segments[0];
    const localSlug = getLocalSlug(engSlug, locale);
    return `/${locale}/${localSlug}`;
  }

  return `/${locale}${cleanPath.startsWith("/") ? cleanPath : "/" + cleanPath}`;
}

/**
 * Get the canonical (English) URL for a given path.
 */
export function getCanonicalUrl(pathname: string, siteUrl = "https://microapp.io"): string {
  const clean = stripLocale(pathname);
  return `${siteUrl}${clean}`;
}

/**
 * Build the full set of hreflang alternate URLs for a given path.
 */
export function getHreflangAlternates(
  pathname: string,
  siteUrl = "https://microapp.io",
  localeCodes?: Locale[]
): { hreflang: string; href: string }[] {
  // Import LOCALE_CODES lazily to avoid circular dependency issues
  const codes: Locale[] = localeCodes ?? ([] as Locale[]);
  const clean = stripLocale(pathname);

  return [
    // x-default always points to the English (default) URL
    { hreflang: "x-default", href: `${siteUrl}${clean}` },
    ...codes.map(locale => ({
      hreflang: locale,
      href: `${siteUrl}${localizeUrl(clean, locale)}`,
    })),
  ];
}
