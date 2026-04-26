/*
 * MICROAPP Home Page — Basecamp-inspired Friendly Editorial
 * White + Cream sections, forest green CTAs, yellow accents
 * Heavy Plus Jakarta Sans headings, Inter body text
 */
import { useState, useEffect } from "react";

import {
  Type, Hash, AlignLeft, Percent, Ruler, Receipt,
  Calendar, Clock, Key, Code2, Braces, Palette,
  ArrowRight, Search, Zap, Wifi, Cpu, FileText,
  BarChart2, Radio, Scissors, Mail, Sigma, Dumbbell,
  Fuel, TrendingUp, QrCode, Smile, Shuffle,
  Binary, Globe, Layers, Timer, Dice5, Coins,
  Calculator, FlaskConical, Thermometer, Weight,
  Link2, Lock, Hash as HashIcon, BookOpen, PenLine,
  Sparkles, MessageSquare, Briefcase, ShoppingBag,
  Maximize2, Users, Gauge, Divide
} from "lucide-react";

const tools = [
  // Text Tools
  { icon: Type, label: "Word Counter", desc: "Count words, characters & reading time", href: "/word-counter", color: "#E8F5EE", iconColor: "#1B6B45", category: "text" },
  { icon: AlignLeft, label: "Case Converter", desc: "UPPER, lower, Title, camelCase & more", href: "/case-converter", color: "#FFF9E0", iconColor: "#B8860B", category: "text" },
  { icon: Hash, label: "Lorem Ipsum", desc: "Generate placeholder text instantly", href: "/lorem-ipsum", color: "#F0F4FF", iconColor: "#4F6EF7", category: "text" },
  { icon: FileText, label: "Sentence Counter", desc: "Count sentences, paragraphs & more", href: "/sentence-counter", color: "#FFF0F0", iconColor: "#E05252", category: "text" },
  { icon: Scissors, label: "Line Break Remover", desc: "Remove or clean up line breaks in text", href: "/line-break-removal-tool", color: "#F5F0FF", iconColor: "#7C3AED", category: "text" },
  { icon: Shuffle, label: "Reverse Text", desc: "Reverse, flip, or mirror any text", href: "/reverse-text-generator", color: "#F0FFF4", iconColor: "#22863A", category: "text" },
  { icon: Hash, label: "Acronym Generator", desc: "Turn any phrase into an acronym", href: "/acronym-generator", color: "#FFF5F0", iconColor: "#D4622A", category: "text" },
  { icon: Radio, label: "Morse Code", desc: "Translate text to/from Morse code", href: "/morse-code", color: "#F0F8FF", iconColor: "#2563EB", category: "text" },
  { icon: Type, label: "Tiny Text Generator", desc: "Generate tiny Unicode text styles", href: "/tiny-text-generator", color: "#FFF9E0", iconColor: "#B8860B", category: "text" },
  { icon: AlignLeft, label: "Merge Words", desc: "Combine word lists in bulk", href: "/merge-words", color: "#E8F5EE", iconColor: "#1B6B45", category: "text" },

  // Numbers
  { icon: Percent, label: "Percentage Calc", desc: "X% of Y, percent change & more", href: "/percentage-calculator", color: "#FFF0F0", iconColor: "#E05252", category: "numbers" },
  { icon: Ruler, label: "Unit Converter", desc: "Length, weight, temperature & area", href: "/unit-converter", color: "#F0FFF4", iconColor: "#22863A", category: "numbers" },
  { icon: Receipt, label: "Tip Calculator", desc: "Split bills & calculate tips easily", href: "/tip-calculator", color: "#FFF5F0", iconColor: "#D4622A", category: "numbers" },
  { icon: Sigma, label: "Geometric Mean", desc: "Calculate geometric, arithmetic & harmonic means", href: "/geometric-mean-calculator", color: "#F0F4FF", iconColor: "#4F6EF7", category: "numbers" },
  { icon: BarChart2, label: "Histogram Maker", desc: "Visualize number distributions instantly", href: "/histogram-maker", color: "#E8F5EE", iconColor: "#1B6B45", category: "numbers" },
  { icon: Dumbbell, label: "Mass Calculator", desc: "Calculate mass from density and volume", href: "/mass-calculator", color: "#FFF9E0", iconColor: "#B8860B", category: "numbers" },
  { icon: Fuel, label: "Fuel Cost Calculator", desc: "Calculate trip fuel costs & compare vehicles", href: "/fuel-cost-calculator", color: "#FFF0F0", iconColor: "#E05252", category: "numbers" },
  { icon: Dumbbell, label: "Army Body Fat Calc", desc: "US Army circumference body fat method", href: "/army-body-fat-calculator", color: "#F5F0FF", iconColor: "#7C3AED", category: "numbers" },

  // Time & Date
  { icon: Calendar, label: "Age Calculator", desc: "Find your exact age from birthdate", href: "/age-calculator", color: "#F5F0FF", iconColor: "#7C3AED", category: "time" },
  { icon: Clock, label: "Days Between", desc: "Count days between any two dates", href: "/days-between", color: "#F0F8FF", iconColor: "#2563EB", category: "time" },
  { icon: Calendar, label: "Age Difference", desc: "Calculate the age gap between two people", href: "/age-difference-calculator", color: "#E8F5EE", iconColor: "#1B6B45", category: "time" },

  // Generators
  { icon: Key, label: "Password Generator", desc: "Strong, secure passwords on demand", href: "/password-generator", color: "#FFF9E0", iconColor: "#B8860B", category: "generators" },
  { icon: Mail, label: "Email Generator", desc: "Generate random emails for testing", href: "/email-generator", color: "#F0F4FF", iconColor: "#4F6EF7", category: "generators" },
  { icon: Smile, label: "Joke Generator", desc: "Get a random joke — reveal the punchline", href: "/ai-joke-generator", color: "#FFF9E0", iconColor: "#B8860B", category: "generators" },
  { icon: Hash, label: "Lorem Ipsum", desc: "Generate placeholder text instantly", href: "/lorem-ipsum", color: "#E8F5EE", iconColor: "#1B6B45", category: "generators" },
  { icon: Shuffle, label: "Goofy Ahh Names", desc: "Generate hilariously goofy names", href: "/goofy-ahh-names-generator", color: "#FFF0F0", iconColor: "#E05252", category: "generators" },
  { icon: Shuffle, label: "Random State", desc: "Pick a random US state", href: "/random-state-generator", color: "#F5F0FF", iconColor: "#7C3AED", category: "generators" },

  // Dev Tools
  { icon: Code2, label: "Base64 Tool", desc: "Encode and decode Base64 strings", href: "/base64", color: "#F0F4FF", iconColor: "#4F6EF7", category: "dev" },
  { icon: Braces, label: "JSON Formatter", desc: "Prettify and validate JSON data", href: "/json-formatter", color: "#E8F5EE", iconColor: "#1B6B45", category: "dev" },
  { icon: Wifi, label: "Random IP Generator", desc: "Generate IPv4 and IPv6 addresses", href: "/generate-random-ip", color: "#FFF9E0", iconColor: "#B8860B", category: "dev" },
  { icon: Ruler, label: "REM to PX", desc: "Convert between REM and PX units", href: "/rem-to-px-converter", color: "#F0F8FF", iconColor: "#2563EB", category: "dev" },
  { icon: QrCode, label: "QR Code Reader", desc: "Decode QR codes from uploaded images", href: "/qr-code-reader", color: "#F5F0FF", iconColor: "#7C3AED", category: "dev" },
  { icon: Cpu, label: "cURL Builder", desc: "Build cURL commands visually", href: "/curl-builder", color: "#FFF0F0", iconColor: "#E05252", category: "dev" },
  { icon: Code2, label: "CSS Animation", desc: "Generate CSS animation keyframes", href: "/css-animation-generator", color: "#E8F5EE", iconColor: "#1B6B45", category: "dev" },

  // Colors & Design
  { icon: Palette, label: "Color Converter", desc: "HEX, RGB, HSL — convert any color", href: "/color-converter", color: "#FFF0F8", iconColor: "#C026D3", category: "design" },

  // Writing / AI
  { icon: FileText, label: "Thank You Note", desc: "Generate heartfelt thank-you notes", href: "/thank-you-note", color: "#E8F5EE", iconColor: "#1B6B45", category: "writing" },
  { icon: FileText, label: "AI Poem Writer", desc: "Write poems on any topic", href: "/ai-poem-writer", color: "#F0F4FF", iconColor: "#4F6EF7", category: "writing" },
  { icon: FileText, label: "Outline Generator", desc: "Generate structured outlines for any topic", href: "/outline-generator-ai", color: "#FFF9E0", iconColor: "#B8860B", category: "writing" },

  // Tier 1 — Easy Rank (Converters & Checkers)
  { icon: Binary, label: "Roman Numeral Converter", desc: "Convert numbers to/from Roman numerals", href: "/roman-numeral-converter", color: "#FFF5F0", iconColor: "#D4622A", category: "numbers" },
  { icon: Binary, label: "Binary to Decimal", desc: "Convert binary, decimal, hex & octal", href: "/binary-to-decimal", color: "#F0F4FF", iconColor: "#4F6EF7", category: "dev" },
  { icon: Binary, label: "Text to Binary", desc: "Convert text to binary and back", href: "/text-to-binary", color: "#E8F5EE", iconColor: "#1B6B45", category: "dev" },
  { icon: Palette, label: "Hex to RGB", desc: "Convert HEX colors to RGB and HSL", href: "/hex-to-rgb", color: "#FFF0F8", iconColor: "#C026D3", category: "design" },
  { icon: Link2, label: "Slug Generator", desc: "Turn any title into a clean URL slug", href: "/slug-generator", color: "#F0F8FF", iconColor: "#2563EB", category: "dev" },
  { icon: Hash, label: "Character Counter", desc: "Count characters with/without spaces", href: "/character-counter", color: "#FFF9E0", iconColor: "#B8860B", category: "text" },
  { icon: Shuffle, label: "Palindrome Checker", desc: "Check if a word or phrase is a palindrome", href: "/palindrome-checker", color: "#F5F0FF", iconColor: "#7C3AED", category: "text" },
  { icon: Hash, label: "Number to Words", desc: "Convert numbers to written English words", href: "/number-to-words", color: "#FFF0F0", iconColor: "#E05252", category: "numbers" },
  { icon: Type, label: "Vowel Counter", desc: "Count vowels and consonants in text", href: "/vowel-counter", color: "#E8F5EE", iconColor: "#1B6B45", category: "text" },
  { icon: Globe, label: "URL Encoder/Decoder", desc: "Encode and decode URL strings", href: "/url-encoder-decoder", color: "#F0F4FF", iconColor: "#4F6EF7", category: "dev" },

  // Tier 2 — High Volume
  { icon: Timer, label: "Pomodoro Timer", desc: "Focus timer with work/break intervals", href: "/pomodoro-timer", color: "#FFF0F0", iconColor: "#E05252", category: "time" },
  { icon: Timer, label: "Stopwatch", desc: "Precise online stopwatch with laps", href: "/stopwatch", color: "#F0F8FF", iconColor: "#2563EB", category: "time" },
  { icon: Timer, label: "Countdown Timer", desc: "Set a countdown to any future moment", href: "/countdown-timer", color: "#E8F5EE", iconColor: "#1B6B45", category: "time" },
  { icon: Calculator, label: "BMI Calculator", desc: "Calculate Body Mass Index instantly", href: "/bmi-calculator", color: "#FFF9E0", iconColor: "#B8860B", category: "numbers" },
  { icon: Calculator, label: "Calorie Calculator", desc: "Estimate daily calorie needs (TDEE)", href: "/calorie-calculator", color: "#FFF5F0", iconColor: "#D4622A", category: "numbers" },
  { icon: Calculator, label: "GPA Calculator", desc: "Calculate GPA from grades & credit hours", href: "/gpa-calculator", color: "#F5F0FF", iconColor: "#7C3AED", category: "numbers" },
  { icon: Dice5, label: "Random Number Generator", desc: "Generate random numbers in any range", href: "/random-number-generator", color: "#F0F4FF", iconColor: "#4F6EF7", category: "generators" },
  { icon: Coins, label: "Coin Flip", desc: "Flip a virtual coin — heads or tails", href: "/coin-flip", color: "#FFF9E0", iconColor: "#B8860B", category: "generators" },
  { icon: Dice5, label: "Dice Roller", desc: "Roll any number of dice (D4–D20)", href: "/dice-roller", color: "#FFF0F0", iconColor: "#E05252", category: "generators" },
  { icon: Shuffle, label: "Random Word Generator", desc: "Generate random words for games & writing", href: "/random-word-generator", isNew: true, color: "#E8F5EE", iconColor: "#1B6B45", category: "generators" },
  { icon: Shuffle, label: "Random Name Generator", desc: "Generate random names for characters", href: "/random-name-generator", color: "#F5F0FF", iconColor: "#7C3AED", category: "generators" },
  { icon: Thermometer, label: "Temperature Converter", desc: "Convert Celsius, Fahrenheit & Kelvin", href: "/temperature-converter", isNew: true, color: "#FFF0F8", iconColor: "#C026D3", category: "numbers" },
  { icon: Weight, label: "Weight Converter", desc: "Convert kg, lbs, oz, stone & more", href: "/weight-converter", isNew: true, color: "#F0F8FF", iconColor: "#2563EB", category: "numbers" },
  { icon: Ruler, label: "Length Converter", desc: "Convert meters, feet, inches, miles & more", href: "/length-converter", isNew: true, color: "#FFF5F0", iconColor: "#D4622A", category: "numbers" },

  // Tier 3 — Dev & Text Tools
  { icon: Lock, label: "SHA-256 Generator", desc: "Generate SHA-256 hashes client-side", href: "/sha256-generator", color: "#E8F5EE", iconColor: "#1B6B45", category: "dev" },
  { icon: Lock, label: "MD5 Hash Generator", desc: "Generate MD5 hashes from any text", href: "/md5-hash-generator", color: "#F0F4FF", iconColor: "#4F6EF7", category: "dev" },
  { icon: Code2, label: "HTML Encoder/Decoder", desc: "Encode and decode HTML entities", href: "/html-encoder-decoder", color: "#FFF9E0", iconColor: "#B8860B", category: "dev" },
  { icon: Code2, label: "Markdown to HTML", desc: "Convert Markdown to clean HTML", href: "/markdown-to-html", color: "#FFF0F0", iconColor: "#E05252", category: "dev" },
  { icon: Layers, label: "Text Diff Checker", desc: "Compare two texts and highlight differences", href: "/text-diff-checker", isNew: true, color: "#F5F0FF", iconColor: "#7C3AED", category: "text" },
  { icon: Type, label: "Text Repeater", desc: "Repeat any text N times instantly", href: "/text-repeater", color: "#F0F8FF", iconColor: "#2563EB", category: "text" },
  { icon: AlignLeft, label: "Remove Duplicate Lines", desc: "Remove duplicate lines from any text", href: "/remove-duplicate-lines", color: "#E8F5EE", iconColor: "#1B6B45", category: "text" },
  { icon: AlignLeft, label: "Sort Lines", desc: "Sort lines alphabetically or numerically", href: "/sort-lines", color: "#FFF9E0", iconColor: "#B8860B", category: "text" },
  { icon: FlaskConical, label: "Color Palette Generator", desc: "Generate harmonious color palettes", href: "/color-palette-generator", isNew: true, color: "#FFF0F8", iconColor: "#C026D3", category: "design" },
  { icon: Palette, label: "Gradient Generator", desc: "Create CSS gradients visually", href: "/gradient-generator", isNew: true, color: "#F5F0FF", iconColor: "#7C3AED", category: "design" },
  { icon: Calculator, label: "Loan Calculator", desc: "Calculate monthly payments & total interest", href: "/loan-calculator", color: "#FFF0F0", iconColor: "#E05252", category: "numbers" },
  { icon: TrendingUp, label: "Compound Interest Calc", desc: "See how your money grows over time", href: "/compound-interest-calculator", color: "#E8F5EE", iconColor: "#1B6B45", category: "numbers" },
  { icon: Calculator, label: "Discount Calculator", desc: "Calculate sale prices and savings", href: "/discount-calculator", color: "#FFF9E0", iconColor: "#B8860B", category: "numbers" },
  { icon: BookOpen, label: "Reading Time Calculator", desc: "Estimate reading time for any text", href: "/reading-time-calculator", isNew: true, color: "#F0F4FF", iconColor: "#4F6EF7", category: "text" },
  { icon: PenLine, label: "Signature Generator", desc: "Create stylish text-based signatures", href: "/signature-generator", isNew: true, color: "#FFF5F0", iconColor: "#D4622A", category: "text" },

  // Tier 4 — AI Writing Tools
  { icon: Sparkles, label: "AI Bio Generator", desc: "Generate professional bios for LinkedIn", href: "/ai-bio-generator", color: "#E8F5EE", iconColor: "#1B6B45", category: "writing" },
  { icon: Mail, label: "Email Subject Generator", desc: "Generate high-open-rate email subject lines", href: "/email-subject-line-generator", color: "#F0F4FF", iconColor: "#4F6EF7", category: "writing" },
  { icon: HashIcon, label: "Hashtag Generator", desc: "Generate trending hashtags for social media", href: "/hashtag-generator", color: "#FFF9E0", iconColor: "#B8860B", category: "writing" },
  { icon: MessageSquare, label: "Caption Generator", desc: "Generate engaging captions for Instagram", href: "/caption-generator", color: "#FFF0F8", iconColor: "#C026D3", category: "writing" },
  { icon: Briefcase, label: "Cover Letter Generator", desc: "Generate tailored cover letters fast", href: "/cover-letter-generator", color: "#F5F0FF", iconColor: "#7C3AED", category: "writing" },
  { icon: ShoppingBag, label: "Product Description Gen", desc: "Generate compelling product descriptions", href: "/product-description-generator", color: "#FFF0F0", iconColor: "#E05252", category: "writing" },
  { icon: FileText, label: "Paraphrasing Tool", desc: "Rewrite text in your own words", href: "/paraphrasing-tool", color: "#E8F5EE", iconColor: "#1B6B45", category: "writing" },
  { icon: Layers, label: "Text Summarizer", desc: "Summarize long text into key points", href: "/summarizer", color: "#FFF9E0", iconColor: "#B8860B", category: "writing" },
  { icon: AlignLeft, label: "Text to Bullet Points", desc: "Convert paragraphs to bullet points", href: "/text-to-bullet-points", color: "#F0F4FF", iconColor: "#4F6EF7", category: "writing" },
   { icon: Calendar, label: "Meeting Agenda Generator", desc: "Generate structured meeting agendas", href: "/meeting-agenda-generator", color: "#FFF5F0", iconColor: "#D4622A", category: "writing" },
  { icon: Binary, label: "Scientific Notation Converter", desc: "Convert numbers to/from scientific notation", href: "/scientific-notation-converter", isNew: true, color: "#F0F4FF", iconColor: "#4F6EF7", category: "numbers" },
  { icon: Divide, label: "Fraction Simplifier", desc: "Simplify fractions to their lowest terms", href: "/fraction-simplifier", isNew: true, color: "#FFF0F0", iconColor: "#E05252", category: "numbers" },
  { icon: BarChart2, label: "Average Calculator", desc: "Calculate mean, median, mode & range", href: "/average-calculator", isNew: true, color: "#E8F5EE", iconColor: "#1B6B45", category: "numbers" },
  { icon: Sigma, label: "Square Root Calculator", desc: "Calculate square roots and nth roots", href: "/square-root-calculator", color: "#FFF9E0", iconColor: "#B8860B", category: "numbers" },
  { icon: Hash, label: "Prime Number Checker", desc: "Check if a number is prime instantly", href: "/prime-number-checker", color: "#F5F0FF", iconColor: "#7C3AED", category: "numbers" },
  { icon: Gauge, label: "Speed Distance Time Calc", desc: "Calculate speed, distance, or time", href: "/speed-distance-time-calculator", color: "#FFF0F0", iconColor: "#E05252", category: "numbers" },
  { icon: Globe, label: "Time Zone Converter", desc: "Convert time between world time zones", href: "/time-zone-converter", color: "#F0F8FF", iconColor: "#2563EB", category: "time" },
  { icon: Clock, label: "Unix Timestamp Converter", desc: "Convert Unix timestamps to readable dates", href: "/unix-timestamp-converter", color: "#F5F0FF", iconColor: "#7C3AED", category: "time" },
  { icon: Palette, label: "Color Name Finder", desc: "Find the name of any HEX or RGB color", href: "/color-name-finder", isNew: true, color: "#FFF0F8", iconColor: "#C026D3", category: "design" },
  { icon: Maximize2, label: "Aspect Ratio Calculator", desc: "Calculate and convert image aspect ratios", href: "/aspect-ratio-calculator", isNew: true, color: "#FFF0F8", iconColor: "#C026D3", category: "design" },
  { icon: Code2, label: "Regex Tester", desc: "Test and debug regular expressions", href: "/regex-tester", color: "#F0F4FF", iconColor: "#4F6EF7", category: "dev" },
  { icon: Ruler, label: "CSS Unit Converter", desc: "Convert px, rem, em, vw, vh, pt, pc", href: "/css-unit-converter", color: "#F0F4FF", iconColor: "#4F6EF7", category: "dev" },
  { icon: Code2, label: "HTML to Markdown", desc: "Convert HTML markup to Markdown syntax", href: "/html-to-markdown", isNew: true, color: "#E8F5EE", iconColor: "#1B6B45", category: "dev" },
  { icon: Binary, label: "Number Base Converter", desc: "Convert between binary, decimal, hex, octal", href: "/number-base-converter", color: "#F0F4FF", iconColor: "#4F6EF7", category: "dev" },
  { icon: Shuffle, label: "List Randomizer", desc: "Shuffle and randomize any list of items", href: "/list-randomizer", color: "#FFF9E0", iconColor: "#B8860B", category: "generators" },
  { icon: Dice5, label: "Name Picker", desc: "Pick a random name from a list", href: "/name-picker", color: "#FFF0F0", iconColor: "#E05252", category: "generators" },
  { icon: Users, label: "Team Generator", desc: "Split a list into random equal teams", href: "/team-generator", isNew: true, color: "#E8F5EE", iconColor: "#1B6B45", category: "generators" },
  { icon: Smile, label: "Emoji Picker", desc: "Search and copy any emoji instantly", href: "/emoji-picker", isNew: true, color: "#FFF9E0", iconColor: "#B8860B", category: "text" },
  { icon: Type, label: "Text Case Converter", desc: "Convert text to snake_case, kebab-case, PascalCase", href: "/text-case-converter", isNew: true, color: "#FFF9E0", iconColor: "#B8860B", category: "text" },
  { icon: BarChart2, label: "Word Frequency Analyzer", desc: "Analyze word frequency in any text", href: "/word-frequency-analyzer", isNew: true, color: "#E8F5EE", iconColor: "#1B6B45", category: "text" },
];

// Deduplicate by href
const uniqueTools = tools.filter((t, i, arr) => arr.findIndex(x => x.href === t.href) === i);

const categories = [
  { id: "text", label: "Text Tools", icon: Type },
  { id: "numbers", label: "Numbers", icon: Percent },
  { id: "time", label: "Time & Date", icon: Clock },
  { id: "design", label: "Colors & Design", icon: Palette },
  { id: "dev", label: "Dev Tools", icon: Braces },
  { id: "generators", label: "Generators", icon: Key },
  { id: "writing", label: "Writing / AI", icon: FileText },
];

const testimonials = [
  "Incredibly fast", "No signup needed", "Actually useful", "Saves me daily",
  "Clean and simple", "My go-to toolkit", "Bookmark worthy", "Love this site",
  "Works perfectly", "Totally free!", "Super reliable", "Best utility site",
];

const HOME_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "Microapp",
      "url": "https://microapp.io",
      "logo": "https://microapp.io/logo.png",
      "description": "The #1 collection of free online utility tools — word counters, calculators, converters, generators and more."
    },
    {
      "@type": "WebSite",
      "name": "Microapp",
      "url": "https://microapp.io",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://microapp.io/?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

export default function Home() {
   // Auth state available for future use (e.g. save favourites)

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(24);
  // Reset pagination when user changes search or category filter
  useEffect(() => {
    setVisibleCount(24);
  }, [search, activeCategory]);

  const filtered = uniqueTools.filter((t) => {
    const matchSearch = t.label.toLowerCase().includes(search.toLowerCase()) ||
      t.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory ? t.category === activeCategory : true;
    return matchSearch && matchCat;
  });
  // Reset visible count when filter/search changes so users see fresh results
  const visibleTools = filtered.slice(0, search || activeCategory ? filtered.length : visibleCount);

  const catCounts = Object.fromEntries(categories.map(c => [c.id, uniqueTools.filter(t => t.category === c.id).length]));

  return (
      <>
      {/* ── Hero ── */}
      <section className="bg-white pt-14 pb-0 overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#E8F5EE] rounded-full px-4 py-1.5 mb-6">
                <Zap size={13} className="text-[#1B6B45]" fill="#1B6B45" />
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#1B6B45" }}>
                  {uniqueTools.length}+ free tools — no account needed
                </span>
              </div>

              <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(2.4rem, 5vw, 3.8rem)", color: "#1A1A1A", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.25rem" }}>
                Every tool you need,{" "}
                <span style={{ position: "relative", display: "inline-block" }}>
                  <span className="highlight-yellow">right here.</span>
                </span>
              </h1>

              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.15rem", color: "#4B5563", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "480px" }}>
                Microapp is the #1 collection of free online utility tools. Word counters, calculators, converters — instant results, zero friction.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <a href="/word-counter" className="btn-primary">
                  Try Word Counter <ArrowRight size={15} />
                </a>
                <a href="/password-generator" className="btn-outline">
                  Generate Password
                </a>
              </div>

              {/* Search */}
              <div className="relative max-w-md">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                <input
                  type="text"
                  placeholder="Search tools…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="tool-input pl-10"
                  style={{ borderRadius: "9999px" }}
                />
              </div>
            </div>

            {/* Hero illustration */}
            <div className="hidden lg:flex justify-end items-end">
              <img
                src="/images/microapp-hero-cartoon.webp"
                alt="Microapp tools illustration with cartoon characters"
                width={560}
                height={480}
                fetchPriority="high"
                decoding="sync"
                style={{ width: "100%", maxWidth: "560px" }}
              />
            </div>
          </div>
        </div>

        {/* Testimonial ticker */}
        <div className="mt-12 bg-[#1B6B45] py-3 overflow-hidden">
          <div style={{ display: "flex", gap: "2.5rem", animation: "ticker 28s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
            {[...testimonials, ...testimonials].map((t, i) => (
              <span key={i} style={{ fontFamily: "'Caveat', cursive", fontWeight: 700, fontSize: "1.1rem", color: "white", display: "inline-flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ color: "#FFE234" }}>★</span> {t}
              </span>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* Ad: Leaderboard — between hero and tools grid (high viewability, above the fold) */}
      <div className="bg-white py-4">
        <div className="container">
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "#9CA3AF", textAlign: "center", marginBottom: "0.4rem" }}>Advertisement</p>
          
        </div>
      </div>

      {/* ── Category Filter ── */}
      <section className="section-cream py-12" id="categories">
        <div className="container">
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#1A1A1A", letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
            Browse by category
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveCategory(null)}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem",
                padding: "0.5rem 1.1rem", borderRadius: "9999px", border: "2px solid",
                borderColor: activeCategory === null ? "#1B6B45" : "#E8E6DE",
                background: activeCategory === null ? "#1B6B45" : "white",
                color: activeCategory === null ? "white" : "#4B5563",
                transition: "all 0.15s ease",
                cursor: "pointer",
              }}
            >
              All Tools ({uniqueTools.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem",
                  padding: "0.5rem 1.1rem", borderRadius: "9999px", border: "2px solid",
                  borderColor: activeCategory === cat.id ? "#1B6B45" : "#E8E6DE",
                  background: activeCategory === cat.id ? "#1B6B45" : "white",
                  color: activeCategory === cat.id ? "white" : "#4B5563",
                  transition: "all 0.15s ease",
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  cursor: "pointer",
                }}
              >
                <cat.icon size={13} />
                {cat.label} ({catCounts[cat.id] || 0})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools Grid ── */}
      <section className="bg-white py-12" id="tools">
        <div className="container">
          {search && (
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#6B7280", marginBottom: "1.5rem" }}>
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "<strong>{search}</strong>"
            </p>
          )}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "#6B7280" }}>
                No tools match your search.
              </p>
              <button onClick={() => { setSearch(""); setActiveCategory(null); }} className="btn-outline mt-4">
                Clear filters
              </button>
            </div>
          ) : (
            <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleTools.map((tool) => (
                <a key={tool.href + tool.label} href={tool.href} className="tool-card group" style={{ textDecoration: "none" }}>
                  <div className="flex items-start gap-4">
                    <div style={{ width: "44px", height: "44px", borderRadius: "0.75rem", background: tool.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <tool.icon size={20} style={{ color: tool.iconColor }} />
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#1A1A1A", margin: 0 }}>
                          {tool.label}
                        </h3>
                        {(tool as any).isNew && (
                          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.65rem", color: "white", background: "#1B6B45", borderRadius: "9999px", padding: "0.1rem 0.45rem", letterSpacing: "0.04em", flexShrink: 0 }}>NEW</span>
                        )}
                      </div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.5 }}>
                        {tool.desc}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#1B6B45" }}>
                    Use tool <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
            {/* Load more — only shown when not searching/filtering and more tools exist */}
            {!search && !activeCategory && visibleCount < filtered.length && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setVisibleCount((n) => n + 24)}
                  className="btn-outline"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
                >
                  Load more tools ({filtered.length - visibleCount} remaining)
                </button>
              </div>
            )}
            </>
          )}
        </div>
      </section>
      {/* ── Why Microapp ── */}
      <section className="section-cream py-16" id="why">
        <div className="container">
          <div className="max-w-xl mb-10">
            <span className="badge-handwritten mb-4 inline-block">Why Microapp?</span>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#1A1A1A", letterSpacing: "-0.025em", lineHeight: 1.2 }}>
              Tools that just work. No nonsense.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: "⚡", title: "Instant results", desc: "Every tool runs in your browser — no waiting, no servers, no loading spinners." },
              { emoji: "🔒", title: "Private by default", desc: "Your data never leaves your device. We don't store, track, or sell anything you type." },
              { emoji: "🎯", title: "One tool, one job", desc: "No bloat, no upsells, no dark patterns. Each tool does exactly what it says." },
            ].map((item) => (
              <div key={item.title} style={{ background: "white", borderRadius: "1rem", padding: "1.75rem", border: "1.5px solid #E8E6DE" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{item.emoji}</div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#1A1A1A", marginBottom: "0.5rem" }}>{item.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#6B7280", lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section className="bg-[#1A1A1A] py-14">
        <div className="container">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { value: `${uniqueTools.length}+`, label: "Free tools" },
              { value: "0", label: "Signups required" },
              { value: "100%", label: "Browser-based" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "3rem", color: "#FFE234", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "#9CA3AF", marginTop: "0.5rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Tool ── */}
      <section className="bg-white py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge-handwritten mb-4 inline-block">Featured tool</span>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#1A1A1A", letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: "1rem" }}>
                Word Counter — done right.
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "#4B5563", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Paste any text and instantly see word count, character count, sentence count, paragraph count, and estimated reading time. No ads, no signup, no fluff.
              </p>
              <a href="/word-counter" className="btn-primary" style={{ display: "inline-flex" }}>
                Try Word Counter <ArrowRight size={15} />
              </a>
            </div>
            <div>
              <img
                src="/images/microapp-tools-cartoon.webp"
                alt="Tool cards illustration"
                width={600}
                height={450}
                loading="lazy"
                decoding="async"
                style={{ width: "100%", borderRadius: "1rem" }}
              />
            </div>
          </div>
        </div>
      </section>
    
  </>
  );
}
