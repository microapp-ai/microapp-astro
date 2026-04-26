/**
 * en/home.ts — Home page specific strings.
 */
const home = {
  hero: {
    badge: "106+ free tools — no account needed",
    headline1: "Every tool you need,",
    headline2: "right here.",
    subheadline: "Microapp is the #1 collection of free online utility tools. Word counters, calculators, converters, generators — all instant, all free.",
    ctaPrimary: "Explore all tools",
    ctaSecondary: "Most popular →",
  },
  search: {
    placeholder: "Search {count} tools…",
    noResults: "No tools found for '{query}'",
    noResultsHint: "Try a different keyword or browse by category.",
    resultsCount: "{count} tool found",
    resultsCountPlural: "{count} tools found",
  },
  categories: {
    all: "All",
    text: "Text Tools",
    numbers: "Numbers",
    time: "Time & Date",
    generators: "Generators",
    dev: "Dev Tools",
    writing: "Writing & AI",
    design: "Colors & Design",
  },
  social: {
    title: "Loved by thousands",
    subtitle: "Real feedback from real users",
  },
  whySection: {
    title: "Why Microapp?",
    subtitle: "We built the tools we wished existed.",
    items: {
      fast: {
        title: "Instant results",
        desc: "Every tool runs entirely in your browser. No server round-trips, no waiting.",
      },
      free: {
        title: "Always free",
        desc: "No paywalls, no premium tiers, no \"upgrade to unlock\". Every tool, forever free.",
      },
      private: {
        title: "Privacy-first",
        desc: "Your data never leaves your device. We don't log inputs, store results, or sell data.",
      },
      noSignup: {
        title: "No account needed",
        desc: "Just open a tool and use it. No email, no password, no friction.",
      },
    },
  },
  stats: {
    tools: "{count}+ Free tools",
    signups: "0 Signups required",
    browserBased: "100% Browser-based",
  },
  featured: {
    badge: "Featured tool",
    title: "Word Counter — done right.",
    desc: "Paste any text and instantly see word count, character count, sentence count, paragraph count, and estimated reading time. No ads, no signup, no fluff.",
    cta: "Try Word Counter",
  },
} as const;

export default home;
