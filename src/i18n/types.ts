/**
 * i18n/types.ts — TypeScript types for all translation namespaces.
 *
 * These types are derived from the English locale files.
 * All other locales must satisfy these types (or TypeScript will error at build time).
 */

import type en_common  from "./locales/en/common";
import type en_home    from "./locales/en/home";
import type en_tool    from "./locales/en/tool";
import type en_ratings from "./locales/en/ratings";

export type CommonTranslations  = typeof en_common;
export type HomeTranslations    = typeof en_home;
export type ToolTranslations    = typeof en_tool;
export type RatingsTranslations = typeof en_ratings;

export interface Translations {
  common:  CommonTranslations;
  home:    HomeTranslations;
  tool:    ToolTranslations;
  ratings: RatingsTranslations;
}
