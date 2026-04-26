/**
 * categories.ts — Canonical category definitions for Microapp.
 * Used by the /categories hub, individual /[category] pages, and nav.
 */
import { ALL_TOOLS, type ToolEntry } from "./tools-data";

export interface CategoryMeta {
  /** URL slug, e.g. "text-tools" */
  slug: string;
  /** Internal category key matching ToolEntry.category */
  id: string;
  /** Display name */
  label: string;
  /** Short description for SEO and hub page */
  description: string;
  /** Emoji icon */
  icon: string;
  /** Background color (light) */
  color: string;
  /** Icon/accent color */
  iconColor: string;
  /** Homepage anchor */
  anchor: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: "text-tools",
    id: "text",
    label: "Text Tools",
    description: "Word counters, character counters, text formatters, case converters, diff checkers, and more — all free, all instant.",
    icon: "T",
    color: "#E8F5EE",
    iconColor: "#1B6B45",
    anchor: "/#text",
  },
  {
    slug: "number-calculators",
    id: "numbers",
    label: "Number Calculators",
    description: "Percentage calculators, unit converters, loan calculators, BMI, GPA, tip calculator, and dozens more math tools.",
    icon: "#",
    color: "#FFF0F0",
    iconColor: "#E05252",
    anchor: "/#numbers",
  },
  {
    slug: "time-date-tools",
    id: "time",
    label: "Time & Date Tools",
    description: "Age calculators, date difference tools, countdown timers, stopwatch, Pomodoro timer, and more.",
    icon: "⏱",
    color: "#F5F0FF",
    iconColor: "#7C3AED",
    anchor: "/#time",
  },
  {
    slug: "generators",
    id: "generators",
    label: "Generators",
    description: "Password generators, lorem ipsum, random number generators, coin flip, dice roller, name generators, and more.",
    icon: "⚡",
    color: "#FFF9E0",
    iconColor: "#B8860B",
    anchor: "/#generators",
  },
  {
    slug: "dev-tools",
    id: "dev",
    label: "Dev Tools",
    description: "JSON formatter, Base64 encoder, QR code reader, regex tester, cURL builder, Markdown to HTML, and more.",
    icon: "</>",
    color: "#F0F4FF",
    iconColor: "#4F6EF7",
    anchor: "/#dev",
  },
  {
    slug: "writing-ai",
    id: "writing",
    label: "Writing & AI",
    description: "AI bio generator, paraphrasing tool, text summarizer, cover letter generator, hashtag generator, and more.",
    icon: "✍",
    color: "#F0F8FF",
    iconColor: "#2563EB",
    anchor: "/#writing",
  },
  {
    slug: "color-design-tools",
    id: "design",
    label: "Colors & Design",
    description: "Color converter, hex to RGB, color palette generator, gradient generator, color name finder, and more.",
    icon: "🎨",
    color: "#FFF0F8",
    iconColor: "#C026D3",
    anchor: "/#design",
  },
];

/** Map from category slug → CategoryMeta */
export const CATEGORY_BY_SLUG = Object.fromEntries(
  CATEGORIES.map(c => [c.slug, c])
) as Record<string, CategoryMeta>;

/** Map from category id → CategoryMeta */
export const CATEGORY_BY_ID = Object.fromEntries(
  CATEGORIES.map(c => [c.id, c])
) as Record<string, CategoryMeta>;

/** Get all tools for a given category id */
export function getToolsByCategory(categoryId: string): ToolEntry[] {
  return ALL_TOOLS.filter(t => t.category === categoryId);
}
