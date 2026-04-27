/**
 * en/home.ts — Home page specific strings.
 */
const home = {
  hero: {
    badge: "{count}+ free tools — no account needed",
    headline1: "Every tool you need,",
    headline2: "right here.",
    subheadline: "Microapp is the #1 collection of free online utility tools. Word counters, calculators, converters — instant results, zero friction.",
    ctaPrimary: "Try Word Counter",
    ctaSecondary: "Generate Password",
  },
  search: {
    placeholder: "Search tools…",
    noResults: "No tools found for '{query}'",
    noResultsHint: "Try a different keyword or browse by category.",
    resultsCount: "{count} result for",
    resultsCountPlural: "{count} results for",
  },
  categories: {
    all: "All Tools ({count})",
    text: "Text Tools",
    numbers: "Numbers",
    time: "Time & Date",
    generators: "Generators",
    dev: "Dev Tools",
    writing: "Writing / AI",
    design: "Colors & Design",
    browseByCategory: "Browse by category",
  },
  grid: {
    useTool: "Use tool",
    loadMore: "Load more tools ({count} remaining)",
    noMatch: "No tools match your search.",
    clearFilters: "Clear filters",
  },
  ticker: [
    "Incredibly fast", "No signup needed", "Actually useful", "Saves me daily",
    "Clean and simple", "My go-to toolkit", "Bookmark worthy", "Love this site",
    "Works perfectly", "Totally free!", "Super reliable", "Best utility site",
  ],
  social: {
    title: "Loved by thousands",
    subtitle: "Real feedback from real users",
  },
  whySection: {
    title: "Why Microapp?",
    subtitle: "Tools that just work. No nonsense.",
    items: {
      fast: {
        title: "Instant results",
        desc: "Every tool runs in your browser — no waiting, no servers, no loading spinners.",
      },
      private: {
        title: "Private by default",
        desc: "Your data never leaves your device. We don't store, track, or sell anything you type.",
      },
      oneJob: {
        title: "One tool, one job",
        desc: "No bloat, no upsells, no dark patterns. Each tool does exactly what it says.",
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
