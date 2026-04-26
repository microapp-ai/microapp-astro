/**
 * ToolIsland.tsx — React island that loads the correct interactive tool widget
 * 
 * This is the ONLY JavaScript that runs on tool pages.
 * It lazy-loads the specific tool component by slug, so each tool page
 * only downloads the code for that specific tool.
 * 
 * The static HTML shell (H1, breadcrumb, intro, FAQ, related tools) is
 * already visible before this component loads.
 */
import { lazy, Suspense } from "react";
import { getToolConfig } from "../lib/tool-registry";
import ToolEngine from "./ToolEngine";

interface Props {
  slug: string;
}

// Lazy load map — each tool is a separate chunk
// This means visiting /age-calculator only downloads AgeCalculator.tsx code
const toolComponents: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  "acronym-generator": lazy(() => import("./tools/AcronymGenerator")),
  "age-calculator": lazy(() => import("./tools/AgeCalculator")),
  "age-difference-calculator": lazy(() => import("./tools/AgeDifferenceCalculator")),
  "ai-bio-generator": lazy(() => import("./tools/AiBioGenerator")),
  "ai-joke-generator": lazy(() => import("./tools/AiJokeGenerator")),
  "ai-poem-writer": lazy(() => import("./tools/AiPoemWriter")),
  "army-body-fat-calculator": lazy(() => import("./tools/ArmyBodyFatCalculator")),
  "aspect-ratio-calculator": lazy(() => import("./tools/AspectRatioCalculator")),
  "average-calculator": lazy(() => import("./tools/AverageCalculator")),
  "b-m-i-calculator": lazy(() => import("./tools/BMICalculator")),
  "base64-tool": lazy(() => import("./tools/Base64Tool")),
  "binary-to-decimal-converter": lazy(() => import("./tools/BinaryToDecimalConverter")),
  "c-s-s-unit-converter": lazy(() => import("./tools/CSSUnitConverter")),
  "calorie-calculator": lazy(() => import("./tools/CalorieCalculator")),
  "caption-generator": lazy(() => import("./tools/CaptionGenerator")),
  "case-converter": lazy(() => import("./tools/CaseConverter")),
  "character-counter": lazy(() => import("./tools/CharacterCounter")),
  "coin-flip": lazy(() => import("./tools/CoinFlip")),
  "color-converter": lazy(() => import("./tools/ColorConverter")),
  "color-name-finder": lazy(() => import("./tools/ColorNameFinder")),
  "color-palette-generator": lazy(() => import("./tools/ColorPaletteGenerator")),
  "compound-interest-calculator": lazy(() => import("./tools/CompoundInterestCalculator")),
  "countdown-timer": lazy(() => import("./tools/CountdownTimer")),
  "cover-letter-generator": lazy(() => import("./tools/CoverLetterGenerator")),
  "css-animation-generator": lazy(() => import("./tools/CssAnimationGenerator")),
  "csv-to-json-converter": lazy(() => import("./tools/CsvToJsonConverter")),
  "curl-builder": lazy(() => import("./tools/CurlBuilder")),
  "days-between": lazy(() => import("./tools/DaysBetween")),
  "dice-roller": lazy(() => import("./tools/DiceRoller")),
  "discount-calculator": lazy(() => import("./tools/DiscountCalculator")),
  "duplicate-line-remover": lazy(() => import("./tools/DuplicateLineRemover")),
  "email-generator": lazy(() => import("./tools/EmailGenerator")),
  "email-subject-line-generator": lazy(() => import("./tools/EmailSubjectLineGenerator")),
  "emoji-picker": lazy(() => import("./tools/EmojiPicker")),
  "fraction-simplifier": lazy(() => import("./tools/FractionSimplifier")),
  "fuel-cost-calculator": lazy(() => import("./tools/FuelCostCalculator")),
  "generate-random-ip": lazy(() => import("./tools/GenerateRandomIp")),
  "geometric-mean-calculator": lazy(() => import("./tools/GeometricMeanCalculator")),
  "goofy-ahh-names-generator": lazy(() => import("./tools/GoofyAhhNamesGenerator")),
  "gpa-calculator": lazy(() => import("./tools/GpaCalculator")),
  "gradient-generator": lazy(() => import("./tools/GradientGenerator")),
  "hashtag-generator": lazy(() => import("./tools/HashtagGenerator")),
  "hex-color-picker-page": lazy(() => import("./tools/HexColorPickerPage")),
  "hex-to-rgb-converter": lazy(() => import("./tools/HexToRgbConverter")),
  "histogram-maker": lazy(() => import("./tools/HistogramMaker")),
  "html-encoder-decoder": lazy(() => import("./tools/HtmlEncoderDecoder")),
  "html-to-markdown": lazy(() => import("./tools/HtmlToMarkdown")),
  "json-formatter": lazy(() => import("./tools/JsonFormatter")),
  "json-to-csv-converter": lazy(() => import("./tools/JsonToCsvConverter")),
  "length-converter": lazy(() => import("./tools/LengthConverter")),
  "line-break-removal-tool": lazy(() => import("./tools/LineBreakRemovalTool")),
  "list-randomizer": lazy(() => import("./tools/ListRandomizer")),
  "loan-calculator": lazy(() => import("./tools/LoanCalculator")),
  "lorem-ipsum": lazy(() => import("./tools/LoremIpsum")),
  "m-d5-hash-generator": lazy(() => import("./tools/MD5HashGenerator")),
  "markdown-to-html-converter": lazy(() => import("./tools/MarkdownToHtmlConverter")),
  "mass-calculator": lazy(() => import("./tools/MassCalculator")),
  "meeting-agenda-generator": lazy(() => import("./tools/MeetingAgendaGenerator")),
  "merge-words": lazy(() => import("./tools/MergeWords")),
  "morse-code": lazy(() => import("./tools/MorseCode")),
  "name-picker-wheel": lazy(() => import("./tools/NamePickerWheel")),
  "number-base-converter": lazy(() => import("./tools/NumberBaseConverter")),
  "number-to-words-converter": lazy(() => import("./tools/NumberToWordsConverter")),
  "outline-generator-ai": lazy(() => import("./tools/OutlineGeneratorAi")),
  "palindrome-checker": lazy(() => import("./tools/PalindromeChecker")),
  "paraphrasing-tool": lazy(() => import("./tools/ParaphrasingTool")),
  "password-generator": lazy(() => import("./tools/PasswordGenerator")),
  "percentage-calc": lazy(() => import("./tools/PercentageCalc")),
  // Alias: percentage-calculator -> PercentageCalc
  "percentage-calculator": lazy(() => import("./tools/PercentageCalc")),
  "pomodoro-timer": lazy(() => import("./tools/PomodoroTimer")),
  "prime-number-checker": lazy(() => import("./tools/PrimeNumberChecker")),
  "product-description-generator": lazy(() => import("./tools/ProductDescriptionGenerator")),
  "qr-code-reader": lazy(() => import("./tools/QrCodeReader")),
  "random-name-picker": lazy(() => import("./tools/RandomNamePicker")),
  "random-number-generator": lazy(() => import("./tools/RandomNumberGenerator")),
  "random-state-generator": lazy(() => import("./tools/RandomStateGenerator")),
  "random-word-generator": lazy(() => import("./tools/RandomWordGenerator")),
  "readability-checker": lazy(() => import("./tools/ReadabilityChecker")),
  "reading-time-calculator": lazy(() => import("./tools/ReadingTimeCalculator")),
  "regex-tester": lazy(() => import("./tools/RegexTester")),
  "rem-to-px-converter": lazy(() => import("./tools/RemToPxConverter")),
  // Alias: remove-duplicate-lines -> DuplicateLineRemover
  "remove-duplicate-lines": lazy(() => import("./tools/DuplicateLineRemover")),
  "reverse-text-generator": lazy(() => import("./tools/ReverseTextGenerator")),
  "roman-numeral-converter": lazy(() => import("./tools/RomanNumeralConverter")),
  // Alias: salary-to-hourly -> SalaryToHourlyCalculator
  "salary-to-hourly": lazy(() => import("./tools/SalaryToHourlyCalculator")),
  "salary-to-hourly-calculator": lazy(() => import("./tools/SalaryToHourlyCalculator")),
  "scientific-notation-converter": lazy(() => import("./tools/ScientificNotationConverter")),
  "sentence-counter": lazy(() => import("./tools/SentenceCounter")),
  "sha256-generator": lazy(() => import("./tools/Sha256Generator")),
  "signature-generator": lazy(() => import("./tools/SignatureGenerator")),
  "slug-generator": lazy(() => import("./tools/SlugGenerator")),
  // Alias: sort-lines -> SortLinesAlphabetically
  "sort-lines": lazy(() => import("./tools/SortLinesAlphabetically")),
  "sort-lines-alphabetically": lazy(() => import("./tools/SortLinesAlphabetically")),
  "speed-distance-time-calculator": lazy(() => import("./tools/SpeedDistanceTimeCalculator")),
  "square-root-calculator": lazy(() => import("./tools/SquareRootCalculator")),
  "stopwatch-online": lazy(() => import("./tools/StopwatchOnline")),
  "summarizer": lazy(() => import("./tools/Summarizer")),
  "team-generator": lazy(() => import("./tools/TeamGenerator")),
  "temperature-converter": lazy(() => import("./tools/TemperatureConverter")),
  "text-case-converter": lazy(() => import("./tools/TextCaseConverter")),
  "text-diff-checker": lazy(() => import("./tools/TextDiffChecker")),
  "text-repeater": lazy(() => import("./tools/TextRepeater")),
  "text-to-binary-converter": lazy(() => import("./tools/TextToBinaryConverter")),
  "text-to-bullet-points": lazy(() => import("./tools/TextToBulletPoints")),
  "thank-you-note": lazy(() => import("./tools/ThankYouNote")),
  "time-zone-converter": lazy(() => import("./tools/TimeZoneConverter")),
  "tiny-text-generator": lazy(() => import("./tools/TinyTextGenerator")),
  "tip-calculator": lazy(() => import("./tools/TipCalculator")),
  "u-u-i-d-generator": lazy(() => import("./tools/UUIDGenerator")),
  "unit-converter": lazy(() => import("./tools/UnitConverter")),
  "unix-timestamp-converter": lazy(() => import("./tools/UnixTimestampConverter")),
  "url-encoder-decoder": lazy(() => import("./tools/UrlEncoderDecoder")),
  "vowel-counter": lazy(() => import("./tools/VowelCounter")),
  "weight-converter": lazy(() => import("./tools/WeightConverter")),
  "whitespace-remover": lazy(() => import("./tools/WhitespaceRemover")),
  "word-counter": lazy(() => import("./tools/WordCounter")),
  "word-frequency-analyzer": lazy(() => import("./tools/WordFrequencyAnalyzer")),
  "word-frequency-counter": lazy(() => import("./tools/WordFrequencyCounter")),
};

// ToolEngine-based tools (Tier 1 — use the config-driven engine)
const toolEngineSlugSet = new Set([
  "angle-converter",
  "area-converter",
  "data-storage-converter",
  "date-time-calculator",
  "energy-converter",
  "pressure-converter",
  "speed-converter",
  "volume-converter",
]);

const ToolLoadingFallback = () => (
  <div
    style={{
      background: "#F7F6F1",
      borderRadius: "1rem",
      padding: "2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "200px",
      border: "1.5px solid #E8E6DE",
    }}
  >
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: "2rem",
          height: "2rem",
          border: "3px solid #E8E6DE",
          borderTopColor: "#1B6B45",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
          margin: "0 auto 0.75rem",
        }}
      />
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.875rem",
          color: "#9CA3AF",
          margin: 0,
        }}
      >
        Loading tool...
      </p>
    </div>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// ToolEngine wrapper component
function ToolEngineIsland({ slug }: { slug: string }) {
  const config = getToolConfig(slug);
  if (!config) {
    return (
      <div style={{ padding: "1rem", color: "#92400E", background: "#FFF8F0", borderRadius: "0.75rem" }}>
        Tool configuration not found for: {slug}
      </div>
    );
  }
  return <ToolEngine config={config} />;
}

export default function ToolIsland({ slug }: Props) {
  // Check if this is a ToolEngine-based tool
  if (toolEngineSlugSet.has(slug)) {
    return (
      <Suspense fallback={<ToolLoadingFallback />}>
        <ToolEngineIsland slug={slug} />
      </Suspense>
    );
  }

  const ToolComponent = toolComponents[slug];

  if (!ToolComponent) {
    return (
      <div
        style={{
          background: "#FFF8F0",
          border: "1.5px solid #FFE4B5",
          borderRadius: "1rem",
          padding: "1.5rem",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.9rem",
          color: "#92400E",
        }}
      >
        <strong>Tool widget not found for slug: {slug}</strong>
        <p style={{ margin: "0.5rem 0 0" }}>
          The tool content is available above. The interactive widget will be added soon.
        </p>
      </div>
    );
  }

  return (
    <Suspense fallback={<ToolLoadingFallback />}>
      <ToolComponent />
    </Suspense>
  );
}
