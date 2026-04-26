/**
 * tools-data.ts — canonical list of all Microapp tools
 * Used by CommandPalette, search, and any feature that needs the full tool list.
 * Kept icon-free so it can be imported without Lucide overhead.
 */

export interface ToolEntry {
  label: string;
  desc: string;
  href: string;
  category: string;
  keywords?: string[];
}

export const ALL_TOOLS: ToolEntry[] = [
  // ── Text Tools ──────────────────────────────────────────────────────────
  { label: "Word Counter", desc: "Count words, characters & reading time", href: "/word-counter", category: "text", keywords: ["words", "characters", "count"] },
  { label: "Case Converter", desc: "UPPER, lower, Title, camelCase & more", href: "/case-converter", category: "text", keywords: ["uppercase", "lowercase", "title case", "camel"] },
  { label: "Lorem Ipsum", desc: "Generate placeholder text instantly", href: "/lorem-ipsum", category: "text", keywords: ["placeholder", "dummy text", "filler"] },
  { label: "Sentence Counter", desc: "Count sentences, paragraphs & more", href: "/sentence-counter", category: "text" },
  { label: "Line Break Remover", desc: "Remove or clean up line breaks in text", href: "/line-break-removal-tool", category: "text", keywords: ["newline", "line break"] },
  { label: "Character Counter", desc: "Count characters with and without spaces", href: "/character-counter", category: "text" },
  { label: "Palindrome Checker", desc: "Check if a word or phrase is a palindrome", href: "/palindrome-checker", category: "text" },
  { label: "Vowel Counter", desc: "Count vowels and consonants in any text", href: "/vowel-counter", category: "text" },
  { label: "Text Repeater", desc: "Repeat any text N times instantly", href: "/text-repeater", category: "text" },
  { label: "Remove Duplicate Lines", desc: "Remove duplicate lines from any text", href: "/remove-duplicate-lines", category: "text", keywords: ["deduplicate", "unique lines"] },
  { label: "Sort Lines", desc: "Sort lines alphabetically or numerically", href: "/sort-lines", category: "text" },
  { label: "Whitespace Remover", desc: "Remove extra spaces, tabs, and blank lines", href: "/whitespace-remover", category: "text" },
  { label: "Reverse Text", desc: "Reverse any text or sentence instantly", href: "/reverse-text-generator", category: "text" },
  { label: "Tiny Text Generator", desc: "Convert text to tiny Unicode characters", href: "/tiny-text-generator", category: "text" },
  { label: "Text Diff Checker", desc: "Compare two texts and highlight differences", href: "/text-diff-checker", category: "text", keywords: ["compare", "diff", "differences"] },
  { label: "Reading Time Calculator", desc: "Estimate how long it takes to read any text", href: "/reading-time-calculator", category: "text" },
  { label: "Readability Checker", desc: "Check Flesch-Kincaid readability score", href: "/readability-checker", category: "text", keywords: ["flesch", "kincaid", "reading level"] },
  { label: "Merge Words", desc: "Combine two lists of words together", href: "/merge-words", category: "text" },
  { label: "Word Frequency Counter", desc: "Count how often each word appears", href: "/word-frequency-counter", category: "text" },
  { label: "Morse Code Converter", desc: "Convert text to Morse code and back", href: "/morse-code", category: "text", keywords: ["morse", "dots", "dashes"] },
  { label: "Signature Generator", desc: "Create stylish text-based signatures", href: "/signature-generator", category: "text" },

  // ── Numbers ──────────────────────────────────────────────────────────────
  { label: "Percentage Calculator", desc: "Calculate percentages, discounts & more", href: "/percentage-calculator", category: "numbers", keywords: ["percent", "%"] },
  { label: "Unit Converter", desc: "Convert between any units of measurement", href: "/unit-converter", category: "numbers" },
  { label: "Tip Calculator", desc: "Calculate tips and split bills", href: "/tip-calculator", category: "numbers", keywords: ["bill", "split", "restaurant"] },
  { label: "BMI Calculator", desc: "Calculate your Body Mass Index", href: "/bmi-calculator", category: "numbers", keywords: ["body mass", "weight", "height"] },
  { label: "Calorie Calculator", desc: "Estimate daily calorie needs", href: "/calorie-calculator", category: "numbers", keywords: ["calories", "TDEE", "diet"] },
  { label: "GPA Calculator", desc: "Calculate your Grade Point Average", href: "/gpa-calculator", category: "numbers", keywords: ["grade", "gpa", "4.0"] },
  { label: "Salary to Hourly", desc: "Convert annual salary to hourly rate", href: "/salary-to-hourly", category: "numbers", keywords: ["salary", "hourly", "wage"] },
  { label: "Loan Calculator", desc: "Calculate monthly payments & total interest", href: "/loan-calculator", category: "numbers", keywords: ["mortgage", "loan", "interest"] },
  { label: "Compound Interest Calc", desc: "See how your money grows over time", href: "/compound-interest-calculator", category: "numbers", keywords: ["compound", "investment", "interest"] },
  { label: "Discount Calculator", desc: "Calculate sale prices and savings", href: "/discount-calculator", category: "numbers" },
  { label: "Random Number Generator", desc: "Generate random numbers within any range", href: "/random-number-generator", category: "numbers" },
  { label: "Number to Words", desc: "Convert numbers into written word form", href: "/number-to-words", category: "numbers" },
  { label: "Roman Numeral Converter", desc: "Convert numbers to Roman numerals", href: "/roman-numeral-converter", category: "numbers" },
  { label: "Binary to Decimal", desc: "Convert binary to decimal and back", href: "/binary-to-decimal", category: "numbers", keywords: ["binary", "decimal", "convert"] },
  { label: "Geometric Mean Calculator", desc: "Calculate geometric mean of a dataset", href: "/geometric-mean-calculator", category: "numbers" },
  { label: "Mass Calculator", desc: "Convert mass and weight units", href: "/mass-calculator", category: "numbers" },
  { label: "Fuel Cost Calculator", desc: "Estimate fuel costs for any trip", href: "/fuel-cost-calculator", category: "numbers", keywords: ["gas", "petrol", "fuel", "trip"] },
  { label: "Army Body Fat Calculator", desc: "Calculate body fat using the Army method", href: "/army-body-fat-calculator", category: "numbers" },
  { label: "Histogram Maker", desc: "Create a histogram from data values", href: "/histogram-maker", category: "numbers" },
  { label: "Temperature Converter", desc: "Convert Celsius, Fahrenheit, Kelvin", href: "/temperature-converter", category: "numbers", keywords: ["celsius", "fahrenheit", "kelvin"] },
  { label: "Weight Converter", desc: "Convert kg, lbs, oz, stone, grams", href: "/weight-converter", category: "numbers", keywords: ["kg", "lbs", "pounds", "kilograms"] },
  { label: "Length Converter", desc: "Convert meters, feet, inches, miles", href: "/length-converter", category: "numbers", keywords: ["meters", "feet", "inches", "miles"] },

  // ── Time & Date ───────────────────────────────────────────────────────────
  { label: "Date/Time Calculator", desc: "Calculate durations between dates or add/subtract time", href: "/date-time-calculator", category: "time", keywords: ["date calculator", "days between dates", "add days", "date math"] },
  { label: "Age Calculator", desc: "Calculate your exact age in years, months, days", href: "/age-calculator", category: "time", keywords: ["age", "birthday", "born"] },
  { label: "Days Between Dates", desc: "Calculate days between any two dates", href: "/days-between", category: "time", keywords: ["date difference", "days"] },
  { label: "Age Difference Calculator", desc: "Find the age difference between two people", href: "/age-difference-calculator", category: "time" },
  { label: "Countdown Timer", desc: "Set a custom countdown timer", href: "/countdown-timer", category: "time" },
  { label: "Stopwatch", desc: "Precise online stopwatch with lap times", href: "/stopwatch", category: "time" },
  { label: "Pomodoro Timer", desc: "Focus timer using the Pomodoro technique", href: "/pomodoro-timer", category: "time", keywords: ["pomodoro", "focus", "25 minutes"] },

  // ── Colors & Design ───────────────────────────────────────────────────────
  { label: "Color Converter", desc: "Convert HEX, RGB, HSL, HSV colors", href: "/color-converter", category: "design", keywords: ["hex", "rgb", "hsl", "color"] },
  { label: "Hex to RGB", desc: "Convert HEX color codes to RGB values", href: "/hex-to-rgb", category: "design", keywords: ["hex", "rgb"] },
  { label: "Hex Color Picker", desc: "Pick colors visually and get HEX, RGB, HSL", href: "/hex-color-picker", category: "design" },
  { label: "Color Palette Generator", desc: "Generate harmonious color palettes", href: "/color-palette-generator", category: "design", keywords: ["palette", "color scheme"] },
  { label: "Gradient Generator", desc: "Create CSS gradients visually", href: "/gradient-generator", category: "design", keywords: ["css gradient", "linear gradient"] },

  // ── Dev Tools ─────────────────────────────────────────────────────────────
  { label: "Base64 Encoder/Decoder", desc: "Encode and decode Base64 strings", href: "/base64", category: "dev", keywords: ["base64", "encode", "decode"] },
  { label: "JSON Formatter", desc: "Format and validate JSON data", href: "/json-formatter", category: "dev", keywords: ["json", "format", "validate", "pretty print"] },
  { label: "URL Encoder/Decoder", desc: "Encode and decode URLs", href: "/url-encoder-decoder", category: "dev", keywords: ["url", "encode", "percent encoding"] },
  { label: "Password Generator", desc: "Generate secure random passwords", href: "/password-generator", category: "dev", keywords: ["password", "secure", "random"] },
  { label: "UUID Generator", desc: "Generate random UUID v4 identifiers", href: "/uuid-generator", category: "dev", keywords: ["uuid", "guid", "unique id"] },
  { label: "MD5 Hash Generator", desc: "Generate MD5 hashes from any text", href: "/md5-hash-generator", category: "dev", keywords: ["md5", "hash", "checksum"] },
  { label: "SHA-256 Generator", desc: "Generate SHA-256 cryptographic hash", href: "/sha256-generator", category: "dev", keywords: ["sha256", "hash", "crypto"] },
  { label: "HTML Encoder/Decoder", desc: "Encode and decode HTML entities", href: "/html-encoder-decoder", category: "dev", keywords: ["html entities", "encode", "decode"] },
  { label: "Markdown to HTML", desc: "Convert Markdown to clean HTML", href: "/markdown-to-html", category: "dev", keywords: ["markdown", "html", "convert"] },
  { label: "Text to Binary", desc: "Convert text to binary code", href: "/text-to-binary", category: "dev", keywords: ["binary", "ascii", "text"] },
  { label: "Regex Tester", desc: "Test and debug regular expressions", href: "/regex-tester", category: "dev", keywords: ["regex", "regular expression", "pattern"] },
  { label: "Slug Generator", desc: "Convert text to URL-friendly slugs", href: "/slug-generator", category: "dev", keywords: ["slug", "url", "permalink"] },
  { label: "Curl Builder", desc: "Build cURL commands from a URL", href: "/curl-builder", category: "dev", keywords: ["curl", "http", "api"] },
  { label: "CSV to JSON", desc: "Convert CSV to JSON format", href: "/csv-to-json", category: "dev", keywords: ["csv", "json", "convert"] },
  { label: "JSON to CSV", desc: "Convert JSON arrays to CSV format", href: "/json-to-csv", category: "dev", keywords: ["json", "csv", "convert"] },
  { label: "REM to PX Converter", desc: "Convert REM units to pixels", href: "/rem-to-px-converter", category: "dev", keywords: ["rem", "px", "pixels", "css"] },
  { label: "CSS Animation Generator", desc: "Generate CSS keyframe animations", href: "/css-animation-generator", category: "dev", keywords: ["css", "animation", "keyframe"] },
  { label: "Generate Random IP", desc: "Generate random IP addresses", href: "/generate-random-ip", category: "dev", keywords: ["ip", "ipv4", "random"] },
  { label: "QR Code Reader", desc: "Scan and decode QR codes from images", href: "/qr-code-reader", category: "dev", keywords: ["qr code", "scan", "decode"] },

  // ── Generators ────────────────────────────────────────────────────────────
  { label: "Coin Flip", desc: "Flip a virtual coin for heads or tails", href: "/coin-flip", category: "generators" },
  { label: "Dice Roller", desc: "Roll virtual dice — D4, D6, D20 and more", href: "/dice-roller", category: "generators", keywords: ["dice", "d20", "d6", "rpg"] },
  { label: "Random Name Generator", desc: "Generate random first and last names", href: "/random-name-generator", category: "generators" },
  { label: "Random Name Picker", desc: "Pick a random name from a list", href: "/random-state-generator", category: "generators" },
  { label: "Random Word Generator", desc: "Generate random English words", href: "/random-word-generator", category: "generators" },
  { label: "Goofy Name Generator", desc: "Generate funny goofy names", href: "/goofy-ahh-names-generator", category: "generators" },
  { label: "Acronym Generator", desc: "Generate acronyms from any phrase", href: "/acronym-generator", category: "generators" },
  { label: "Outline Generator", desc: "Generate an AI-style outline from a topic", href: "/outline-generator-ai", category: "generators" },
  { label: "Thank You Note Generator", desc: "Generate heartfelt thank you notes", href: "/thank-you-note", category: "generators" },
  { label: "AI Joke Generator", desc: "Generate funny jokes on any topic", href: "/ai-joke-generator", category: "generators" },
  { label: "AI Poem Writer", desc: "Write poems on any topic or style", href: "/ai-poem-writer", category: "generators" },

  // ── Writing / AI ──────────────────────────────────────────────────────────
  { label: "AI Bio Generator", desc: "Generate professional bios for LinkedIn", href: "/ai-bio-generator", category: "writing", keywords: ["bio", "linkedin", "about me"] },
  { label: "Email Subject Generator", desc: "Generate high-open-rate email subject lines", href: "/email-subject-line-generator", category: "writing" },
  { label: "Hashtag Generator", desc: "Generate trending hashtags for social media", href: "/hashtag-generator", category: "writing", keywords: ["hashtag", "instagram", "twitter"] },
  { label: "Caption Generator", desc: "Generate engaging captions for Instagram", href: "/caption-generator", category: "writing", keywords: ["caption", "instagram", "social"] },
  { label: "Cover Letter Generator", desc: "Generate tailored cover letters fast", href: "/cover-letter-generator", category: "writing", keywords: ["cover letter", "job", "resume"] },
  { label: "Product Description Gen", desc: "Generate compelling product descriptions", href: "/product-description-generator", category: "writing" },
  { label: "Paraphrasing Tool", desc: "Rewrite text in your own words", href: "/paraphrasing-tool", category: "writing", keywords: ["paraphrase", "rewrite", "rephrase"] },
  { label: "Text Summarizer", desc: "Summarize long text into key points", href: "/summarizer", category: "writing", keywords: ["summarize", "summary", "tldr"] },
  { label: "Text to Bullet Points", desc: "Convert paragraphs to bullet points", href: "/text-to-bullet-points", category: "writing" },
  { label: "Meeting Agenda Generator", desc: "Generate structured meeting agendas", href: "/meeting-agenda-generator", category: "writing" },
  { label: "Email Generator", desc: "Generate professional emails instantly", href: "/email-generator", category: "writing" },
];

/** Simple fuzzy search: returns tools matching query against label, desc, keywords */
export function searchTools(query: string): ToolEntry[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  const scored: { tool: ToolEntry; score: number }[] = [];

  for (const tool of ALL_TOOLS) {
    let score = 0;
    const label = tool.label.toLowerCase();
    const desc = tool.desc.toLowerCase();
    const keywords = (tool.keywords || []).join(" ").toLowerCase();

    if (label === q) score += 100;
    else if (label.startsWith(q)) score += 60;
    else if (label.includes(q)) score += 40;
    if (desc.includes(q)) score += 20;
    if (keywords.includes(q)) score += 30;

    // Partial word matching
    const words = q.split(/\s+/);
    for (const word of words) {
      if (word.length < 2) continue;
      if (label.includes(word)) score += 10;
      if (desc.includes(word)) score += 5;
      if (keywords.includes(word)) score += 8;
    }

    if (score > 0) scored.push({ tool, score });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((s) => s.tool);
}
