/**
 * tool-registry.ts — Single source of truth for every Microapp tool.
 *
 * Architecture tiers:
 *  - Tier 1 "engine"  : Simple tools fully rendered by ToolEngine from config.
 *                       No separate .tsx file needed. Add a new tool = add one entry here.
 *  - Tier 2 "hybrid"  : Config provides metadata + SEO; a widget component provides the UI.
 *  - Tier 3 "custom"  : Complex tools (AI, charts, file I/O) keep their existing .tsx files.
 *                       Config entry provides metadata for search, sitemap, and routing.
 */

import type { FAQItem } from "@/hooks/useSEO";
import type { RelatedTool } from "@/components/ToolPage";

// ─── Tier 1 engine config types ──────────────────────────────────────────────

export interface ConversionUnit {
  label: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

export interface ConverterConfig {
  type: "converter";
  units: ConversionUnit[];
  defaultFromIndex?: number;
  precision?: number;
}

export interface CalcField {
  id: string;
  label: string;
  placeholder?: string;
  type?: "number" | "text" | "select";
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
  step?: number;
}

export interface CalculatorConfig {
  type: "calculator";
  fields: CalcField[];
  compute: (values: Record<string, string>) => { label: string; value: string }[];
}

export interface TextTransformerConfig {
  type: "text-transformer";
  inputLabel?: string;
  inputPlaceholder?: string;
  transforms: { label: string; fn: (input: string) => string }[];
}

export interface TextCheckerConfig {
  type: "text-checker";
  inputLabel?: string;
  inputPlaceholder?: string;
  stats: (input: string) => { label: string; value: string | number }[];
}

export interface DateTimeCalcConfig {
  type: "datetime-calculator";
}

export type EngineConfig =
  | ConverterConfig
  | CalculatorConfig
  | TextTransformerConfig
  | TextCheckerConfig
  | DateTimeCalcConfig;

// ─── Shared ToolConfig (all tiers) ───────────────────────────────────────────

export type ToolTier = 1 | 2 | 3;

export interface ToolConfig {
  slug: string;
  label: string;
  desc: string;
  category: "text" | "numbers" | "time" | "design" | "dev" | "generators" | "writing";
  categoryLabel: string;
  categoryHref: string;
  title: string;
  description: string;
  intro: string;
  howTo: string[];
  faqs: FAQItem[];
  relatedTools: RelatedTool[];
  keywords: string[];
  schemaCategory?: string;
  badge?: string;
  tier: ToolTier;
  engineConfig?: EngineConfig;
}

// ─── Category metadata ────────────────────────────────────────────────────────

const CAT: Record<string, { categoryLabel: string; categoryHref: string }> = {
  text:       { categoryLabel: "Text Tools",       categoryHref: "/#text" },
  numbers:    { categoryLabel: "Numbers",           categoryHref: "/#numbers" },
  time:       { categoryLabel: "Time & Date",       categoryHref: "/#time" },
  design:     { categoryLabel: "Colors & Design",   categoryHref: "/#design" },
  dev:        { categoryLabel: "Developer Tools",   categoryHref: "/#dev" },
  generators: { categoryLabel: "Random Generators", categoryHref: "/#generators" },
  writing:    { categoryLabel: "AI Writing Tools",  categoryHref: "/#writing" },
};

// ─── Tier 1 engine configs ────────────────────────────────────────────────────

// Temperature converter
const temperatureEngine: ConverterConfig = {
  type: "converter",
  precision: 4,
  units: [
    { label: "Celsius (°C)",    toBase: v => v,                  fromBase: v => v },
    { label: "Fahrenheit (°F)", toBase: v => (v - 32) * 5 / 9,  fromBase: v => v * 9 / 5 + 32 },
    { label: "Kelvin (K)",      toBase: v => v - 273.15,         fromBase: v => v + 273.15 },
    { label: "Rankine (°R)",    toBase: v => (v - 491.67) * 5 / 9, fromBase: v => (v + 273.15) * 9 / 5 },
  ],
};

// Weight converter
const weightEngine: ConverterConfig = {
  type: "converter",
  precision: 6,
  units: [
    { label: "Kilograms (kg)", toBase: v => v,          fromBase: v => v },
    { label: "Grams (g)",      toBase: v => v / 1000,   fromBase: v => v * 1000 },
    { label: "Pounds (lb)",    toBase: v => v * 0.453592, fromBase: v => v / 0.453592 },
    { label: "Ounces (oz)",    toBase: v => v * 0.0283495, fromBase: v => v / 0.0283495 },
    { label: "Stone (st)",     toBase: v => v * 6.35029, fromBase: v => v / 6.35029 },
    { label: "Tonnes (t)",     toBase: v => v * 1000,   fromBase: v => v / 1000 },
  ],
};

// Length converter
const lengthEngine: ConverterConfig = {
  type: "converter",
  precision: 6,
  units: [
    { label: "Meters (m)",      toBase: v => v,           fromBase: v => v },
    { label: "Kilometers (km)", toBase: v => v * 1000,    fromBase: v => v / 1000 },
    { label: "Centimeters (cm)",toBase: v => v / 100,     fromBase: v => v * 100 },
    { label: "Millimeters (mm)",toBase: v => v / 1000,    fromBase: v => v * 1000 },
    { label: "Miles (mi)",      toBase: v => v * 1609.34, fromBase: v => v / 1609.34 },
    { label: "Yards (yd)",      toBase: v => v * 0.9144,  fromBase: v => v / 0.9144 },
    { label: "Feet (ft)",       toBase: v => v * 0.3048,  fromBase: v => v / 0.3048 },
    { label: "Inches (in)",     toBase: v => v * 0.0254,  fromBase: v => v / 0.0254 },
  ],
};

// Speed converter
const speedEngine: ConverterConfig = {
  type: "converter",
  precision: 4,
  units: [
    { label: "km/h",  toBase: v => v,           fromBase: v => v },
    { label: "m/s",   toBase: v => v * 3.6,     fromBase: v => v / 3.6 },
    { label: "mph",   toBase: v => v * 1.60934, fromBase: v => v / 1.60934 },
    { label: "knots", toBase: v => v * 1.852,   fromBase: v => v / 1.852 },
    { label: "ft/s",  toBase: v => v * 1.09728, fromBase: v => v / 1.09728 },
  ],
};

// Area converter
const areaEngine: ConverterConfig = {
  type: "converter",
  precision: 6,
  units: [
    { label: "Square Meters (m²)",     toBase: v => v,            fromBase: v => v },
    { label: "Square Kilometers (km²)",toBase: v => v * 1e6,      fromBase: v => v / 1e6 },
    { label: "Square Feet (ft²)",      toBase: v => v * 0.092903, fromBase: v => v / 0.092903 },
    { label: "Square Yards (yd²)",     toBase: v => v * 0.836127, fromBase: v => v / 0.836127 },
    { label: "Acres",                  toBase: v => v * 4046.86,  fromBase: v => v / 4046.86 },
    { label: "Hectares (ha)",          toBase: v => v * 10000,    fromBase: v => v / 10000 },
    { label: "Square Miles (mi²)",     toBase: v => v * 2.59e6,   fromBase: v => v / 2.59e6 },
  ],
};

// Volume converter
const volumeEngine: ConverterConfig = {
  type: "converter",
  precision: 6,
  units: [
    { label: "Liters (L)",        toBase: v => v,           fromBase: v => v },
    { label: "Milliliters (mL)",  toBase: v => v / 1000,    fromBase: v => v * 1000 },
    { label: "Cubic Meters (m³)", toBase: v => v * 1000,    fromBase: v => v / 1000 },
    { label: "Gallons (US)",      toBase: v => v * 3.78541, fromBase: v => v / 3.78541 },
    { label: "Quarts (US)",       toBase: v => v * 0.946353,fromBase: v => v / 0.946353 },
    { label: "Pints (US)",        toBase: v => v * 0.473176,fromBase: v => v / 0.473176 },
    { label: "Fluid Ounces (US)", toBase: v => v * 0.0295735,fromBase: v => v / 0.0295735 },
    { label: "Cups (US)",         toBase: v => v * 0.236588,fromBase: v => v / 0.236588 },
  ],
};

// Pressure converter
const pressureEngine: ConverterConfig = {
  type: "converter",
  precision: 6,
  units: [
    { label: "Pascal (Pa)",          toBase: v => v,          fromBase: v => v },
    { label: "Kilopascal (kPa)",     toBase: v => v * 1000,   fromBase: v => v / 1000 },
    { label: "Bar",                  toBase: v => v * 100000, fromBase: v => v / 100000 },
    { label: "PSI",                  toBase: v => v * 6894.76,fromBase: v => v / 6894.76 },
    { label: "Atmosphere (atm)",     toBase: v => v * 101325, fromBase: v => v / 101325 },
    { label: "mmHg (Torr)",          toBase: v => v * 133.322,fromBase: v => v / 133.322 },
  ],
};

// Data storage converter
const dataStorageEngine: ConverterConfig = {
  type: "converter",
  precision: 6,
  units: [
    { label: "Bytes (B)",      toBase: v => v,          fromBase: v => v },
    { label: "Kilobytes (KB)", toBase: v => v * 1024,   fromBase: v => v / 1024 },
    { label: "Megabytes (MB)", toBase: v => v * 1048576,fromBase: v => v / 1048576 },
    { label: "Gigabytes (GB)", toBase: v => v * 1073741824, fromBase: v => v / 1073741824 },
    { label: "Terabytes (TB)", toBase: v => v * 1099511627776, fromBase: v => v / 1099511627776 },
    { label: "Bits",           toBase: v => v / 8,      fromBase: v => v * 8 },
  ],
};

// Energy converter
const energyEngine: ConverterConfig = {
  type: "converter",
  precision: 6,
  units: [
    { label: "Joules (J)",         toBase: v => v,           fromBase: v => v },
    { label: "Kilojoules (kJ)",    toBase: v => v * 1000,    fromBase: v => v / 1000 },
    { label: "Calories (cal)",     toBase: v => v * 4.184,   fromBase: v => v / 4.184 },
    { label: "Kilocalories (kcal)",toBase: v => v * 4184,    fromBase: v => v / 4184 },
    { label: "Watt-hours (Wh)",    toBase: v => v * 3600,    fromBase: v => v / 3600 },
    { label: "BTU",                toBase: v => v * 1055.06, fromBase: v => v / 1055.06 },
  ],
};

// Angle converter
const angleEngine: ConverterConfig = {
  type: "converter",
  precision: 6,
  units: [
    { label: "Degrees (°)",  toBase: v => v,                  fromBase: v => v },
    { label: "Radians (rad)",toBase: v => v * (180 / Math.PI),fromBase: v => v * (Math.PI / 180) },
    { label: "Gradians (gon)",toBase: v => v * 0.9,           fromBase: v => v / 0.9 },
    { label: "Turns",        toBase: v => v * 360,            fromBase: v => v / 360 },
  ],
};

// Percentage calculator
const percentageEngine: CalculatorConfig = {
  type: "calculator",
  fields: [
    { id: "value", label: "Value", placeholder: "e.g. 75", type: "number" },
    { id: "total", label: "Total", placeholder: "e.g. 200", type: "number" },
  ],
  compute: ({ value, total }) => {
    const v = parseFloat(value);
    const t = parseFloat(total);
    if (isNaN(v) || isNaN(t) || t === 0) return [];
    const pct = (v / t) * 100;
    return [
      { label: "Percentage", value: `${pct.toFixed(2)}%` },
      { label: "Remaining", value: `${(100 - pct).toFixed(2)}%` },
      { label: "Remaining value", value: `${(t - v).toFixed(4)}` },
    ];
  },
};

// Tip calculator
const tipEngine: CalculatorConfig = {
  type: "calculator",
  fields: [
    { id: "bill",    label: "Bill Amount ($)", placeholder: "e.g. 45.00", type: "number", min: 0 },
    { id: "tip",     label: "Tip %",           placeholder: "e.g. 18",    type: "number", min: 0, max: 100 },
    { id: "people",  label: "Split between",   placeholder: "e.g. 3",     type: "number", min: 1 },
  ],
  compute: ({ bill, tip, people }) => {
    const b = parseFloat(bill);
    const t = parseFloat(tip) / 100;
    const p = parseInt(people) || 1;
    if (isNaN(b) || isNaN(t)) return [];
    const tipAmt = b * t;
    const total = b + tipAmt;
    return [
      { label: "Tip amount",    value: `$${tipAmt.toFixed(2)}` },
      { label: "Total bill",    value: `$${total.toFixed(2)}` },
      { label: "Per person",    value: `$${(total / p).toFixed(2)}` },
      { label: "Tip per person",value: `$${(tipAmt / p).toFixed(2)}` },
    ];
  },
};

// Discount calculator
const discountEngine: CalculatorConfig = {
  type: "calculator",
  fields: [
    { id: "original", label: "Original Price ($)", placeholder: "e.g. 120.00", type: "number", min: 0 },
    { id: "discount", label: "Discount (%)",        placeholder: "e.g. 25",     type: "number", min: 0, max: 100 },
  ],
  compute: ({ original, discount }) => {
    const o = parseFloat(original);
    const d = parseFloat(discount) / 100;
    if (isNaN(o) || isNaN(d)) return [];
    const saved = o * d;
    const final = o - saved;
    return [
      { label: "Sale price",  value: `$${final.toFixed(2)}` },
      { label: "You save",    value: `$${saved.toFixed(2)}` },
      { label: "Savings",     value: `${(d * 100).toFixed(1)}%` },
    ];
  },
};

// Average calculator
const averageEngine: CalculatorConfig = {
  type: "calculator",
  fields: [
    { id: "numbers", label: "Numbers (comma-separated)", placeholder: "e.g. 4, 8, 15, 16, 23, 42", type: "text" },
  ],
  compute: ({ numbers }) => {
    const nums = numbers.split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
    if (nums.length === 0) return [];
    const sum = nums.reduce((a, b) => a + b, 0);
    const avg = sum / nums.length;
    const sorted = [...nums].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    const freq: Record<number, number> = {};
    nums.forEach(n => { freq[n] = (freq[n] || 0) + 1; });
    const maxFreq = Math.max(...Object.values(freq));
    const modes = Object.entries(freq).filter(([, f]) => f === maxFreq).map(([n]) => n);
    return [
      { label: "Count",   value: String(nums.length) },
      { label: "Sum",     value: String(sum) },
      { label: "Average", value: avg.toFixed(4) },
      { label: "Median",  value: String(median) },
      { label: "Min",     value: String(sorted[0]) },
      { label: "Max",     value: String(sorted[sorted.length - 1]) },
      { label: "Mode",    value: modes.join(", ") },
    ];
  },
};

// Square root calculator
const sqrtEngine: CalculatorConfig = {
  type: "calculator",
  fields: [
    { id: "num", label: "Number", placeholder: "e.g. 144", type: "number", min: 0 },
  ],
  compute: ({ num }) => {
    const n = parseFloat(num);
    if (isNaN(n) || n < 0) return [];
    return [
      { label: "Square root",  value: Math.sqrt(n).toFixed(6) },
      { label: "Cube root",    value: Math.cbrt(n).toFixed(6) },
      { label: "Square (n²)",  value: (n * n).toFixed(4) },
      { label: "Cube (n³)",    value: (n * n * n).toFixed(4) },
    ] as { label: string; value: string }[];
  },
};

// Prime number checker
const primeEngine: CalculatorConfig = {
  type: "calculator",
  fields: [
    { id: "num", label: "Number", placeholder: "e.g. 97", type: "number", min: 2 },
  ],
  compute: ({ num }) => {
    const n = parseInt(num);
    if (isNaN(n) || n < 2) return [];
    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) { isPrime = false; break; }
    }
    const factors: number[] = [];
    let temp = n;
    for (let i = 2; i <= temp; i++) {
      while (temp % i === 0) { factors.push(i); temp /= i; }
    }
    return [
      { label: "Is prime?",      value: isPrime ? "Yes ✓" : "No ✗" },
      { label: "Prime factors",  value: factors.join(" × ") || String(n) },
      { label: "Factor count",   value: String(factors.length) },
    ];
  },
};

// Fraction simplifier
const fractionEngine: CalculatorConfig = {
  type: "calculator",
  fields: [
    { id: "numerator",   label: "Numerator",   placeholder: "e.g. 12", type: "number" },
    { id: "denominator", label: "Denominator", placeholder: "e.g. 18", type: "number" },
  ],
  compute: ({ numerator, denominator }) => {
    const n = parseInt(numerator);
    const d = parseInt(denominator);
    if (isNaN(n) || isNaN(d) || d === 0) return [];
    const gcd = (a: number, b: number): number => b === 0 ? Math.abs(a) : gcd(b, a % b);
    const g = gcd(n, d);
    const sn = n / g;
    const sd = d / g;
    return [
      { label: "Simplified",  value: `${sn} / ${sd}` },
      { label: "Decimal",     value: (n / d).toFixed(6) },
      { label: "GCD",         value: String(g) },
      { label: "Percentage",  value: `${((n / d) * 100).toFixed(2)}%` },
    ];
  },
};

// REM to PX
const remToPxEngine: CalculatorConfig = {
  type: "calculator",
  fields: [
    { id: "rem",  label: "REM value",           placeholder: "e.g. 1.5",  type: "number", min: 0 },
    { id: "base", label: "Base font size (px)", placeholder: "e.g. 16",   type: "number", min: 1, step: 1 },
  ],
  compute: ({ rem, base }) => {
    const r = parseFloat(rem);
    const b = parseFloat(base) || 16;
    if (isNaN(r)) return [];
    return [
      { label: "Pixels (px)",  value: `${(r * b).toFixed(2)}px` },
      { label: "Em equivalent",value: `${r}em` },
      { label: "Base font",    value: `${b}px` },
    ];
  },
};

// Salary to hourly
const salaryEngine: CalculatorConfig = {
  type: "calculator",
  fields: [
    { id: "salary",    label: "Annual Salary ($)",  placeholder: "e.g. 65000",  type: "number", min: 0 },
    { id: "hoursWeek", label: "Hours per week",     placeholder: "e.g. 40",     type: "number", min: 1, max: 168 },
    { id: "weeksYear", label: "Weeks per year",     placeholder: "e.g. 52",     type: "number", min: 1, max: 52 },
  ],
  compute: ({ salary, hoursWeek, weeksYear }) => {
    const s = parseFloat(salary);
    const h = parseFloat(hoursWeek) || 40;
    const w = parseFloat(weeksYear) || 52;
    if (isNaN(s)) return [];
    const hourly = s / (h * w);
    return [
      { label: "Hourly rate",  value: `$${hourly.toFixed(2)}` },
      { label: "Daily (8h)",   value: `$${(hourly * 8).toFixed(2)}` },
      { label: "Weekly",       value: `$${(s / w).toFixed(2)}` },
      { label: "Monthly",      value: `$${(s / 12).toFixed(2)}` },
      { label: "Annual",       value: `$${s.toLocaleString()}` },
    ];
  },
};

// Geometric mean
const geoMeanEngine: CalculatorConfig = {
  type: "calculator",
  fields: [
    { id: "numbers", label: "Numbers (comma-separated)", placeholder: "e.g. 2, 8, 32", type: "text" },
  ],
  compute: ({ numbers }) => {
    const nums = numbers.split(/[,\s]+/).map(Number).filter(n => !isNaN(n) && n > 0);
    if (nums.length === 0) return [];
    const logSum = nums.reduce((acc, n) => acc + Math.log(n), 0);
    const geoMean = Math.exp(logSum / nums.length);
    const arith = nums.reduce((a, b) => a + b, 0) / nums.length;
    return [
      { label: "Geometric mean",  value: geoMean.toFixed(6) },
      { label: "Arithmetic mean", value: arith.toFixed(6) },
      { label: "Count",           value: String(nums.length) },
    ];
  },
};

// Scientific notation converter
const sciNotationEngine: CalculatorConfig = {
  type: "calculator",
  fields: [
    { id: "num", label: "Number", placeholder: "e.g. 0.000045 or 4.5e-5", type: "text" },
  ],
  compute: ({ num }) => {
    const n = parseFloat(num);
    if (isNaN(n)) return [];
    const sci = n.toExponential();
    const [coeff, exp] = sci.split("e");
    return [
      { label: "Scientific notation", value: `${parseFloat(coeff).toFixed(4)} × 10^${exp}` },
      { label: "Standard form",       value: n.toLocaleString("fullwide") },
      { label: "Engineering notation",value: n.toExponential(2) },
    ];
  },
};

// Text transformer: Case Converter
const caseConverterEngine: TextTransformerConfig = {
  type: "text-transformer",
  inputPlaceholder: "Type or paste your text here…",
  transforms: [
    { label: "UPPER CASE",  fn: s => s.toUpperCase() },
    { label: "lower case",  fn: s => s.toLowerCase() },
    { label: "Title Case",  fn: s => s.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()) },
    { label: "Sentence case", fn: s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() },
    { label: "camelCase",   fn: s => s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()) },
    { label: "snake_case",  fn: s => s.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "") },
    { label: "kebab-case",  fn: s => s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") },
    { label: "Reverse",     fn: s => s.split("").reverse().join("") },
  ],
};

// Text transformer: Reverse Text
const reverseTextEngine: TextTransformerConfig = {
  type: "text-transformer",
  inputPlaceholder: "Enter text to reverse…",
  transforms: [
    { label: "Reverse characters", fn: s => s.split("").reverse().join("") },
    { label: "Reverse words",      fn: s => s.split(" ").reverse().join(" ") },
    { label: "Reverse lines",      fn: s => s.split("\n").reverse().join("\n") },
  ],
};

// Text transformer: Whitespace Remover
const whitespaceEngine: TextTransformerConfig = {
  type: "text-transformer",
  inputPlaceholder: "Paste text with extra whitespace…",
  transforms: [
    { label: "Remove extra spaces",    fn: s => s.replace(/[ \t]+/g, " ").trim() },
    { label: "Remove all spaces",      fn: s => s.replace(/\s/g, "") },
    { label: "Remove blank lines",     fn: s => s.split("\n").filter(l => l.trim()).join("\n") },
    { label: "Trim each line",         fn: s => s.split("\n").map(l => l.trim()).join("\n") },
    { label: "Remove tabs",            fn: s => s.replace(/\t/g, " ") },
  ],
};

// Text transformer: Duplicate Line Remover
const dedupLinesEngine: TextTransformerConfig = {
  type: "text-transformer",
  inputPlaceholder: "Paste lines to deduplicate…",
  transforms: [
    { label: "Remove duplicates",          fn: s => Array.from(new Set(s.split("\n"))).join("\n") },
    { label: "Remove duplicates (sorted)", fn: s => Array.from(new Set(s.split("\n"))).sort().join("\n") },
    { label: "Keep only duplicates",       fn: s => {
        const lines = s.split("\n");
        const seen = new Set<string>(), dupes = new Set<string>();
        lines.forEach(l => { if (seen.has(l)) dupes.add(l); else seen.add(l); });
        return Array.from(dupes).join("\n");
      }
    },
  ],
};

// Text transformer: Sort Lines
const sortLinesEngine: TextTransformerConfig = {
  type: "text-transformer",
  inputPlaceholder: "Paste lines to sort…",
  transforms: [
    { label: "Sort A → Z",    fn: s => s.split("\n").sort().join("\n") },
    { label: "Sort Z → A",    fn: s => s.split("\n").sort().reverse().join("\n") },
    { label: "Sort by length", fn: s => s.split("\n").sort((a, b) => a.length - b.length).join("\n") },
    { label: "Shuffle",        fn: s => {
        const a = s.split("\n");
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a.join("\n");
      }
    },
  ],
};

// Text checker: Word Counter
const wordCounterEngine: TextCheckerConfig = {
  type: "text-checker",
  inputPlaceholder: "Type or paste your text here…",
  stats: (text) => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length;
    const readingTime = Math.ceil(words / 200);
    return [
      { label: "Words",             value: words },
      { label: "Characters",        value: chars },
      { label: "Chars (no spaces)", value: charsNoSpaces },
      { label: "Sentences",         value: sentences },
      { label: "Paragraphs",        value: paragraphs || 1 },
      { label: "Reading time",      value: `~${readingTime} min` },
    ];
  },
};

// Text checker: Character Counter
const charCounterEngine: TextCheckerConfig = {
  type: "text-checker",
  inputPlaceholder: "Type or paste text…",
  stats: (text) => {
    const letters = (text.match(/[a-zA-Z]/g) || []).length;
    const digits = (text.match(/\d/g) || []).length;
    const spaces = (text.match(/\s/g) || []).length;
    const special = text.length - letters - digits - spaces;
    const upper = (text.match(/[A-Z]/g) || []).length;
    const lower = (text.match(/[a-z]/g) || []).length;
    return [
      { label: "Total characters", value: text.length },
      { label: "Letters",          value: letters },
      { label: "Uppercase",        value: upper },
      { label: "Lowercase",        value: lower },
      { label: "Digits",           value: digits },
      { label: "Spaces",           value: spaces },
      { label: "Special chars",    value: special },
    ];
  },
};

// Text checker: Vowel Counter
const vowelCounterEngine: TextCheckerConfig = {
  type: "text-checker",
  inputPlaceholder: "Enter text to count vowels…",
  stats: (text) => {
    const vowels = (text.match(/[aeiouAEIOU]/g) || []).length;
    const consonants = (text.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g) || []).length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    return [
      { label: "Vowels",     value: vowels },
      { label: "Consonants", value: consonants },
      { label: "Letters",    value: vowels + consonants },
      { label: "Words",      value: words },
      { label: "Vowel ratio",value: vowels + consonants > 0 ? `${((vowels / (vowels + consonants)) * 100).toFixed(1)}%` : "0%" },
    ];
  },
};

// Text checker: Palindrome Checker
const palindromeEngine: TextCheckerConfig = {
  type: "text-checker",
  inputPlaceholder: "Enter a word or phrase…",
  stats: (text) => {
    const clean = text.toLowerCase().replace(/[^a-z0-9]/g, "");
    const reversed = clean.split("").reverse().join("");
    const isPalin = clean === reversed && clean.length > 0;
    return [
      { label: "Is palindrome?", value: isPalin ? "Yes ✓" : "No ✗" },
      { label: "Cleaned input",  value: clean },
      { label: "Reversed",       value: reversed },
      { label: "Length",         value: clean.length },
    ];
  },
};

// Date/Time Calculator engine (logic lives in ToolEngine's DateTimeWidget)
const dateTimeCalcEngine: DateTimeCalcConfig = { type: "datetime-calculator" };

// ─── TOOL REGISTRY ────────────────────────────────────────────────────────────

export const TOOL_REGISTRY: ToolConfig[] = [

  // ── Text Tools ──────────────────────────────────────────────────────────────

  {
    slug: "word-counter", label: "Word Counter", tier: 1,
    desc: "Count words, characters & reading time",
    category: "text", ...CAT.text,
    title: "Free Word Counter Online | Microapp",
    description: "Count words, characters, sentences, paragraphs, and reading time instantly. Free online word counter with live stats.",
    intro: "The Word Counter gives you instant stats on any text — words, characters, sentences, paragraphs, and estimated reading time. Paste your essay, article, or message and get accurate counts in real time.",
    howTo: ["Paste or type your text in the box.", "Stats update instantly as you type.", "Use the reading time estimate for blog posts or presentations."],
    keywords: ["word counter", "character counter", "word count tool", "count words online", "reading time calculator"],
    faqs: [
      { question: "How does the word counter work?", answer: "It splits your text on whitespace to count words, counts every character for the character count, and splits on punctuation for sentences." },
      { question: "Does it count spaces?", answer: "Yes — the character count includes spaces. The 'Chars (no spaces)' stat excludes them." },
      { question: "How is reading time calculated?", answer: "Based on an average reading speed of 200 words per minute, rounded up to the nearest minute." },
      { question: "Is my text stored anywhere?", answer: "No. All processing happens in your browser. Nothing is sent to any server." },
    ],
    relatedTools: [{ title: "Character Counter", slug: "/character-counter", emoji: "🔤" }, { title: "Sentence Counter", slug: "/sentence-counter", emoji: "📝" }, { title: "Reading Time Calculator", slug: "/reading-time-calculator", emoji: "⏱️" }],
    engineConfig: wordCounterEngine,
  },

  {
    slug: "character-counter", label: "Character Counter", tier: 1,
    desc: "Count characters, letters, digits, and spaces",
    category: "text", ...CAT.text,
    title: "Free Character Counter Online | Microapp",
    description: "Count characters, letters, uppercase, lowercase, digits, spaces, and special characters instantly. Free online character counter.",
    intro: "The Character Counter breaks down your text into detailed character statistics — total characters, letters, uppercase, lowercase, digits, spaces, and special characters — all updated live as you type.",
    howTo: ["Type or paste your text.", "All character stats update instantly.", "Use the breakdown to meet character limits for social media or forms."],
    keywords: ["character counter", "count characters online", "letter counter", "char count", "text length counter"],
    faqs: [
      { question: "Does it count spaces as characters?", answer: "Yes. The 'Total characters' count includes spaces. 'Letters' only counts alphabetic characters." },
      { question: "What counts as a special character?", answer: "Any character that is not a letter, digit, or whitespace — such as punctuation marks, symbols, and emoji." },
      { question: "Is my text stored?", answer: "No. Everything runs in your browser with no server communication." },
    ],
    relatedTools: [{ title: "Word Counter", slug: "/word-counter", emoji: "📊" }, { title: "Vowel Counter", slug: "/vowel-counter", emoji: "🔤" }, { title: "Sentence Counter", slug: "/sentence-counter", emoji: "📝" }],
    engineConfig: charCounterEngine,
  },

  {
    slug: "vowel-counter", label: "Vowel Counter", tier: 1,
    desc: "Count vowels and consonants in any text",
    category: "text", ...CAT.text,
    title: "Free Vowel Counter Online | Microapp",
    description: "Count vowels, consonants, and letters in any text instantly. Free online vowel counter with vowel ratio.",
    intro: "The Vowel Counter instantly counts vowels (A, E, I, O, U) and consonants in any text, and shows the vowel-to-consonant ratio. Useful for linguistics exercises, poetry analysis, and language learning.",
    howTo: ["Type or paste your text.", "Vowel and consonant counts update instantly.", "Check the vowel ratio for linguistic analysis."],
    keywords: ["vowel counter", "count vowels online", "consonant counter", "vowel consonant ratio", "letter counter"],
    faqs: [
      { question: "Which letters count as vowels?", answer: "A, E, I, O, U (both uppercase and lowercase). Y is not counted as a vowel in this tool." },
      { question: "Does it count numbers?", answer: "No. Only alphabetic characters (letters) are counted as vowels or consonants." },
      { question: "Is my text stored?", answer: "No. All processing is done locally in your browser." },
    ],
    relatedTools: [{ title: "Word Counter", slug: "/word-counter", emoji: "📊" }, { title: "Character Counter", slug: "/character-counter", emoji: "🔤" }, { title: "Palindrome Checker", slug: "/palindrome-checker", emoji: "🔁" }],
    engineConfig: vowelCounterEngine,
  },

  {
    slug: "palindrome-checker", label: "Palindrome Checker", tier: 1,
    desc: "Check if a word or phrase is a palindrome",
    category: "text", ...CAT.text,
    title: "Free Palindrome Checker Online | Microapp",
    description: "Check if any word or phrase is a palindrome instantly. Ignores spaces and punctuation. Free online palindrome checker.",
    intro: "The Palindrome Checker tells you instantly whether a word or phrase reads the same forwards and backwards. It ignores spaces, punctuation, and capitalisation — so 'A man a plan a canal Panama' correctly registers as a palindrome.",
    howTo: ["Enter a word or phrase.", "The checker instantly tells you if it's a palindrome.", "Spaces and punctuation are ignored automatically."],
    keywords: ["palindrome checker", "is it a palindrome", "palindrome detector", "check palindrome online", "palindrome words"],
    faqs: [
      { question: "What is a palindrome?", answer: "A word, phrase, or sequence that reads the same forwards and backwards, such as 'racecar' or 'level'." },
      { question: "Does it ignore spaces and punctuation?", answer: "Yes. The checker strips all non-alphanumeric characters and converts to lowercase before comparing." },
      { question: "Can I check a whole sentence?", answer: "Yes. Classic examples like 'A man a plan a canal Panama' are correctly identified as palindromes." },
    ],
    relatedTools: [{ title: "Word Counter", slug: "/word-counter", emoji: "📊" }, { title: "Reverse Text", slug: "/reverse-text-generator", emoji: "🔄" }, { title: "Character Counter", slug: "/character-counter", emoji: "🔤" }],
    engineConfig: palindromeEngine,
  },

  {
    slug: "case-converter", label: "Case Converter", tier: 1,
    desc: "UPPER, lower, Title, camelCase & more",
    category: "text", ...CAT.text,
    title: "Free Case Converter Online | Microapp",
    description: "Convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and kebab-case instantly. Free online case converter.",
    intro: "The Case Converter transforms your text into any capitalisation style in one click — UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and kebab-case. Perfect for developers, writers, and anyone who needs consistent text formatting.",
    howTo: ["Type or paste your text.", "Click any case button to transform instantly.", "Copy the result with one click."],
    keywords: ["case converter", "uppercase converter", "lowercase converter", "title case converter", "camelcase converter", "snake case"],
    faqs: [
      { question: "What is camelCase?", answer: "camelCase joins words without spaces, capitalising each word after the first — e.g. 'myVariableName'." },
      { question: "What is snake_case?", answer: "snake_case uses underscores between words, all lowercase — e.g. 'my_variable_name'. Common in Python." },
      { question: "What is kebab-case?", answer: "kebab-case uses hyphens between words, all lowercase — e.g. 'my-variable-name'. Common in CSS and URLs." },
      { question: "Is my text stored?", answer: "No. All transformations happen in your browser." },
    ],
    relatedTools: [{ title: "Word Counter", slug: "/word-counter", emoji: "📊" }, { title: "Reverse Text", slug: "/reverse-text-generator", emoji: "🔄" }, { title: "Text Repeater", slug: "/text-repeater", emoji: "🔁" }],
    engineConfig: caseConverterEngine,
  },

  {
    slug: "reverse-text-generator", label: "Reverse Text Generator", tier: 1,
    desc: "Reverse any text, words, or lines instantly",
    category: "text", ...CAT.text,
    title: "Free Reverse Text Generator Online | Microapp",
    description: "Reverse any text by characters, words, or lines instantly. Free online reverse text generator.",
    intro: "The Reverse Text Generator flips your text in three ways: reverse all characters, reverse the order of words, or reverse the order of lines. Useful for puzzles, ciphers, creative writing, and testing.",
    howTo: ["Type or paste your text.", "Choose a reversal mode.", "Copy the reversed result."],
    keywords: ["reverse text generator", "reverse text online", "flip text", "backwards text", "reverse words"],
    faqs: [
      { question: "What does 'Reverse characters' do?", answer: "It flips the entire string so the last character becomes the first — e.g. 'hello' becomes 'olleh'." },
      { question: "What does 'Reverse words' do?", answer: "It reverses the order of words while keeping each word intact — e.g. 'hello world' becomes 'world hello'." },
      { question: "Is my text stored?", answer: "No. All processing happens locally in your browser." },
    ],
    relatedTools: [{ title: "Case Converter", slug: "/case-converter", emoji: "🔡" }, { title: "Palindrome Checker", slug: "/palindrome-checker", emoji: "🔁" }, { title: "Word Counter", slug: "/word-counter", emoji: "📊" }],
    engineConfig: reverseTextEngine,
  },

  {
    slug: "whitespace-remover", label: "Whitespace Remover", tier: 1,
    desc: "Remove extra spaces, tabs, and blank lines",
    category: "text", ...CAT.text,
    title: "Free Whitespace Remover Online | Microapp",
    description: "Remove extra spaces, tabs, blank lines, and leading/trailing whitespace from any text. Free online whitespace remover.",
    intro: "The Whitespace Remover cleans up messy text by removing extra spaces, tabs, blank lines, and leading/trailing whitespace. Choose from five cleaning modes to get exactly the output you need.",
    howTo: ["Paste your text with unwanted whitespace.", "Click the cleaning mode you need.", "Copy the cleaned result."],
    keywords: ["whitespace remover", "remove extra spaces", "trim whitespace", "remove blank lines", "clean text online"],
    faqs: [
      { question: "What does 'Remove extra spaces' do?", answer: "It collapses multiple consecutive spaces or tabs into a single space and trims leading/trailing whitespace." },
      { question: "What does 'Remove blank lines' do?", answer: "It removes lines that contain only whitespace, keeping all lines with actual content." },
      { question: "Is my text stored?", answer: "No. All processing is done locally in your browser." },
    ],
    relatedTools: [{ title: "Duplicate Line Remover", slug: "/remove-duplicate-lines", emoji: "📋" }, { title: "Sort Lines", slug: "/sort-lines", emoji: "🔤" }, { title: "Word Counter", slug: "/word-counter", emoji: "📊" }],
    engineConfig: whitespaceEngine,
  },

  {
    slug: "remove-duplicate-lines", label: "Duplicate Line Remover", tier: 1,
    desc: "Remove duplicate lines from any text",
    category: "text", ...CAT.text,
    title: "Free Duplicate Line Remover Online | Microapp",
    description: "Remove duplicate lines from any text instantly. Keep unique lines, sort them, or find only the duplicates. Free online tool.",
    intro: "The Duplicate Line Remover strips repeated lines from any text in seconds. Choose to keep only unique lines, sort them alphabetically, or extract only the duplicates for inspection.",
    howTo: ["Paste your text with duplicate lines.", "Choose a deduplication mode.", "Copy the cleaned result."],
    keywords: ["duplicate line remover", "remove duplicate lines", "unique lines", "deduplicate text", "remove repeated lines"],
    faqs: [
      { question: "Is the comparison case-sensitive?", answer: "Yes. 'Hello' and 'hello' are treated as different lines." },
      { question: "Does it preserve line order?", answer: "The 'Remove duplicates' mode preserves the original order, keeping the first occurrence of each line." },
      { question: "Is my text stored?", answer: "No. All processing is done locally in your browser." },
    ],
    relatedTools: [{ title: "Sort Lines", slug: "/sort-lines", emoji: "🔤" }, { title: "Whitespace Remover", slug: "/whitespace-remover", emoji: "✂️" }, { title: "Word Counter", slug: "/word-counter", emoji: "📊" }],
    engineConfig: dedupLinesEngine,
  },

  {
    slug: "sort-lines", label: "Sort Lines", tier: 1,
    desc: "Sort lines alphabetically, by length, or shuffle",
    category: "text", ...CAT.text,
    title: "Free Sort Lines Tool Online | Microapp",
    description: "Sort lines alphabetically (A–Z or Z–A), by length, or shuffle randomly. Free online line sorter.",
    intro: "The Sort Lines tool reorders lines in your text alphabetically, reverse alphabetically, by line length, or randomly. Useful for organising lists, data, and code.",
    howTo: ["Paste your lines of text.", "Choose a sort mode.", "Copy the sorted result."],
    keywords: ["sort lines alphabetically", "sort text lines online", "line sorter", "alphabetical sort tool", "shuffle lines"],
    faqs: [
      { question: "Is the sort case-sensitive?", answer: "The alphabetical sort is case-sensitive by default — uppercase letters sort before lowercase." },
      { question: "What does 'Sort by length' do?", answer: "It orders lines from shortest to longest." },
      { question: "Is my text stored?", answer: "No. All processing is done locally in your browser." },
    ],
    relatedTools: [{ title: "Duplicate Line Remover", slug: "/remove-duplicate-lines", emoji: "📋" }, { title: "Whitespace Remover", slug: "/whitespace-remover", emoji: "✂️" }, { title: "Word Counter", slug: "/word-counter", emoji: "📊" }],
    engineConfig: sortLinesEngine,
  },

  // ── Numbers ──────────────────────────────────────────────────────────────────

  {
    slug: "temperature-converter", label: "Temperature Converter", tier: 1,
    desc: "Convert Celsius, Fahrenheit, Kelvin, Rankine",
    category: "numbers", ...CAT.numbers,
    title: "Free Temperature Converter Online | Microapp",
    description: "Convert temperatures between Celsius, Fahrenheit, Kelvin, and Rankine instantly. Free online temperature converter with real-time results.",
    intro: "The Temperature Converter instantly converts between Celsius, Fahrenheit, Kelvin, and Rankine. Enter any value and all other units update in real time — no button press needed.",
    howTo: ["Select the unit you're converting from.", "Enter the temperature value.", "All other units update instantly."],
    keywords: ["temperature converter", "celsius to fahrenheit", "fahrenheit to celsius", "kelvin converter", "temperature unit converter"],
    faqs: [
      { question: "How do I convert Celsius to Fahrenheit?", answer: "Multiply by 9/5 then add 32. For example, 100°C = 212°F." },
      { question: "What is absolute zero?", answer: "Absolute zero is -273.15°C, 0 K, or -459.67°F — the coldest possible temperature." },
      { question: "What temperature is the same in Celsius and Fahrenheit?", answer: "-40 degrees is the same in both Celsius and Fahrenheit." },
      { question: "Is my data stored?", answer: "No. All conversions happen in your browser." },
    ],
    relatedTools: [{ title: "Weight Converter", slug: "/weight-converter", emoji: "⚖️" }, { title: "Length Converter", slug: "/length-converter", emoji: "📏" }, { title: "Unit Converter", slug: "/unit-converter", emoji: "📐" }],
    engineConfig: temperatureEngine,
  },

  {
    slug: "weight-converter", label: "Weight Converter", tier: 1,
    desc: "Convert kg, lbs, oz, stone, grams, tonnes",
    category: "numbers", ...CAT.numbers,
    title: "Free Weight Converter Online | Microapp",
    description: "Convert weight between kilograms, pounds, ounces, stone, grams, and tonnes instantly. Free online weight converter.",
    intro: "The Weight Converter converts between all common weight units — kilograms, pounds, ounces, stone, grams, and tonnes — in real time. Select your source unit, enter a value, and see all conversions at once.",
    howTo: ["Select the unit you're converting from.", "Enter the weight value.", "All other units update instantly."],
    keywords: ["weight converter", "kg to lbs", "pounds to kilograms", "ounces to grams", "stone to kg", "weight unit converter"],
    faqs: [
      { question: "How many pounds are in a kilogram?", answer: "1 kilogram = 2.20462 pounds." },
      { question: "How many ounces are in a pound?", answer: "1 pound = 16 ounces." },
      { question: "What is a stone in kg?", answer: "1 stone = 6.35029 kilograms." },
    ],
    relatedTools: [{ title: "Temperature Converter", slug: "/temperature-converter", emoji: "🌡️" }, { title: "Length Converter", slug: "/length-converter", emoji: "📏" }, { title: "Unit Converter", slug: "/unit-converter", emoji: "📐" }],
    engineConfig: weightEngine,
  },

  {
    slug: "length-converter", label: "Length Converter", tier: 1,
    desc: "Convert meters, feet, inches, miles, km",
    category: "numbers", ...CAT.numbers,
    title: "Free Length Converter Online | Microapp",
    description: "Convert length between meters, kilometers, feet, inches, miles, yards, and millimeters instantly. Free online length converter.",
    intro: "The Length Converter handles all common length and distance units — meters, kilometers, feet, inches, miles, yards, and millimeters. Enter any value and see all conversions simultaneously.",
    howTo: ["Select the unit you're converting from.", "Enter the length value.", "All other units update instantly."],
    keywords: ["length converter", "meters to feet", "feet to meters", "miles to km", "inches to cm", "distance converter"],
    faqs: [
      { question: "How many feet are in a meter?", answer: "1 meter = 3.28084 feet." },
      { question: "How many kilometers are in a mile?", answer: "1 mile = 1.60934 kilometers." },
      { question: "How many centimeters are in an inch?", answer: "1 inch = 2.54 centimeters." },
    ],
    relatedTools: [{ title: "Weight Converter", slug: "/weight-converter", emoji: "⚖️" }, { title: "Temperature Converter", slug: "/temperature-converter", emoji: "🌡️" }, { title: "Unit Converter", slug: "/unit-converter", emoji: "📐" }],
    engineConfig: lengthEngine,
  },

  {
    slug: "speed-converter", label: "Speed Converter", tier: 1, badge: "New",
    desc: "Convert km/h, mph, m/s, knots, ft/s",
    category: "numbers", ...CAT.numbers,
    title: "Free Speed Converter Online | Microapp",
    description: "Convert speed between km/h, mph, m/s, knots, and ft/s instantly. Free online speed unit converter.",
    intro: "The Speed Converter converts between all common speed units — km/h, mph, m/s, knots, and ft/s — in real time. Useful for travel planning, physics problems, and aviation.",
    howTo: ["Select the unit you're converting from.", "Enter the speed value.", "All other units update instantly."],
    keywords: ["speed converter", "km/h to mph", "mph to km/h", "knots to mph", "m/s converter", "speed unit converter"],
    faqs: [
      { question: "How many km/h is 60 mph?", answer: "60 mph = 96.56 km/h." },
      { question: "What is a knot?", answer: "A knot is one nautical mile per hour, equal to 1.852 km/h. Used in aviation and maritime navigation." },
      { question: "How do I convert m/s to km/h?", answer: "Multiply m/s by 3.6. For example, 10 m/s = 36 km/h." },
    ],
    relatedTools: [{ title: "Length Converter", slug: "/length-converter", emoji: "📏" }, { title: "Unit Converter", slug: "/unit-converter", emoji: "📐" }, { title: "Temperature Converter", slug: "/temperature-converter", emoji: "🌡️" }],
    engineConfig: speedEngine,
  },

  {
    slug: "area-converter", label: "Area Converter", tier: 1, badge: "New",
    desc: "Convert m², km², ft², acres, hectares",
    category: "numbers", ...CAT.numbers,
    title: "Free Area Converter Online | Microapp",
    description: "Convert area between square meters, square feet, acres, hectares, square miles, and more. Free online area converter.",
    intro: "The Area Converter converts between all common area units — square meters, square kilometers, square feet, square yards, acres, hectares, and square miles — instantly.",
    howTo: ["Select the unit you're converting from.", "Enter the area value.", "All other units update instantly."],
    keywords: ["area converter", "acres to hectares", "square meters to square feet", "hectares to acres", "area unit converter"],
    faqs: [
      { question: "How many square feet are in an acre?", answer: "1 acre = 43,560 square feet." },
      { question: "How many hectares are in a square kilometer?", answer: "1 km² = 100 hectares." },
      { question: "How many acres are in a hectare?", answer: "1 hectare = 2.47105 acres." },
    ],
    relatedTools: [{ title: "Length Converter", slug: "/length-converter", emoji: "📏" }, { title: "Volume Converter", slug: "/volume-converter", emoji: "🧪" }, { title: "Unit Converter", slug: "/unit-converter", emoji: "📐" }],
    engineConfig: areaEngine,
  },

  {
    slug: "volume-converter", label: "Volume Converter", tier: 1, badge: "New",
    desc: "Convert liters, gallons, cups, pints, ml",
    category: "numbers", ...CAT.numbers,
    title: "Free Volume Converter Online | Microapp",
    description: "Convert volume between liters, milliliters, gallons, quarts, pints, cups, and fluid ounces. Free online volume converter.",
    intro: "The Volume Converter handles all common liquid and volume measurements — liters, milliliters, gallons, quarts, pints, cups, and fluid ounces — with instant real-time conversion.",
    howTo: ["Select the unit you're converting from.", "Enter the volume value.", "All other units update instantly."],
    keywords: ["volume converter", "liters to gallons", "gallons to liters", "cups to ml", "fluid ounces converter", "volume unit converter"],
    faqs: [
      { question: "How many liters are in a gallon?", answer: "1 US gallon = 3.78541 liters." },
      { question: "How many ml are in a cup?", answer: "1 US cup = 236.588 ml." },
      { question: "How many fluid ounces are in a liter?", answer: "1 liter ≈ 33.814 US fluid ounces." },
    ],
    relatedTools: [{ title: "Weight Converter", slug: "/weight-converter", emoji: "⚖️" }, { title: "Area Converter", slug: "/area-converter", emoji: "📐" }, { title: "Unit Converter", slug: "/unit-converter", emoji: "📐" }],
    engineConfig: volumeEngine,
  },

  {
    slug: "pressure-converter", label: "Pressure Converter", tier: 1, badge: "New",
    desc: "Convert Pascal, Bar, PSI, atm, mmHg",
    category: "numbers", ...CAT.numbers,
    title: "Free Pressure Converter Online | Microapp",
    description: "Convert pressure between Pascal, kPa, Bar, PSI, atmospheres, and mmHg. Free online pressure unit converter.",
    intro: "The Pressure Converter converts between Pascal, kilopascal, bar, PSI, atmospheres, and mmHg (Torr) instantly. Useful for physics, engineering, meteorology, and medical contexts.",
    howTo: ["Select the unit you're converting from.", "Enter the pressure value.", "All other units update instantly."],
    keywords: ["pressure converter", "psi to bar", "bar to psi", "pascal to atm", "pressure unit converter", "mmhg converter"],
    faqs: [
      { question: "How many PSI is 1 bar?", answer: "1 bar = 14.5038 PSI." },
      { question: "What is standard atmospheric pressure?", answer: "1 atmosphere (atm) = 101,325 Pa = 14.696 PSI = 1.01325 bar." },
      { question: "What is mmHg used for?", answer: "mmHg (millimeters of mercury) is used in medicine for blood pressure and in meteorology for barometric pressure." },
    ],
    relatedTools: [{ title: "Temperature Converter", slug: "/temperature-converter", emoji: "🌡️" }, { title: "Unit Converter", slug: "/unit-converter", emoji: "📐" }, { title: "Speed Converter", slug: "/speed-converter", emoji: "💨" }],
    engineConfig: pressureEngine,
  },

  {
    slug: "data-storage-converter", label: "Data Storage Converter", tier: 1, badge: "New",
    desc: "Convert bytes, KB, MB, GB, TB, bits",
    category: "numbers", ...CAT.numbers,
    title: "Free Data Storage Converter Online | Microapp",
    description: "Convert data storage units between bytes, kilobytes, megabytes, gigabytes, terabytes, and bits. Free online data size converter.",
    intro: "The Data Storage Converter converts between bytes, KB, MB, GB, TB, and bits instantly. Perfect for understanding file sizes, storage capacity, and data transfer rates.",
    howTo: ["Select the unit you're converting from.", "Enter the data size value.", "All other units update instantly."],
    keywords: ["data storage converter", "bytes to mb", "gb to tb", "kb to mb", "file size converter", "data unit converter"],
    faqs: [
      { question: "How many bytes are in a kilobyte?", answer: "1 kilobyte (KB) = 1,024 bytes." },
      { question: "How many MB are in a GB?", answer: "1 gigabyte (GB) = 1,024 megabytes (MB)." },
      { question: "What is the difference between bits and bytes?", answer: "1 byte = 8 bits. Internet speeds are often measured in bits per second (Mbps), while file sizes are in bytes (MB)." },
    ],
    relatedTools: [{ title: "Unit Converter", slug: "/unit-converter", emoji: "📐" }, { title: "REM to PX Converter", slug: "/rem-to-px-converter", emoji: "🖥️" }, { title: "Number Base Converter", slug: "/number-base-converter", emoji: "🔢" }],
    engineConfig: dataStorageEngine,
  },

  {
    slug: "energy-converter", label: "Energy Converter", tier: 1, badge: "New",
    desc: "Convert Joules, calories, kWh, BTU",
    category: "numbers", ...CAT.numbers,
    title: "Free Energy Converter Online | Microapp",
    description: "Convert energy between Joules, kilojoules, calories, kilocalories, watt-hours, and BTU. Free online energy unit converter.",
    intro: "The Energy Converter converts between Joules, kilojoules, calories, kilocalories, watt-hours, and BTU in real time. Useful for physics, nutrition, and engineering calculations.",
    howTo: ["Select the unit you're converting from.", "Enter the energy value.", "All other units update instantly."],
    keywords: ["energy converter", "joules to calories", "calories to joules", "btu converter", "kwh converter", "energy unit converter"],
    faqs: [
      { question: "How many calories are in a joule?", answer: "1 calorie (cal) = 4.184 joules." },
      { question: "What is a kilocalorie?", answer: "1 kilocalorie (kcal) = 1,000 calories = 4,184 joules. Food calories are actually kilocalories." },
      { question: "What is a BTU?", answer: "A British Thermal Unit (BTU) is the amount of energy needed to raise 1 pound of water by 1°F. 1 BTU ≈ 1,055 joules." },
    ],
    relatedTools: [{ title: "Temperature Converter", slug: "/temperature-converter", emoji: "🌡️" }, { title: "Unit Converter", slug: "/unit-converter", emoji: "📐" }, { title: "Calorie Calculator", slug: "/calorie-calculator", emoji: "🥗" }],
    engineConfig: energyEngine,
  },

  {
    slug: "angle-converter", label: "Angle Converter", tier: 1, badge: "New",
    desc: "Convert degrees, radians, gradians, turns",
    category: "numbers", ...CAT.numbers,
    title: "Free Angle Converter Online | Microapp",
    description: "Convert angles between degrees, radians, gradians, and turns instantly. Free online angle unit converter.",
    intro: "The Angle Converter converts between degrees, radians, gradians, and turns in real time. Essential for mathematics, physics, engineering, and programming.",
    howTo: ["Select the unit you're converting from.", "Enter the angle value.", "All other units update instantly."],
    keywords: ["angle converter", "degrees to radians", "radians to degrees", "gradians converter", "angle unit converter"],
    faqs: [
      { question: "How many radians are in 180 degrees?", answer: "180 degrees = π radians ≈ 3.14159 radians." },
      { question: "What is a gradian?", answer: "A gradian (also called a gon) divides a right angle into 100 parts. A full circle = 400 gradians." },
      { question: "What is a turn?", answer: "One turn = 360 degrees = 2π radians = 400 gradians. It represents one full rotation." },
    ],
    relatedTools: [{ title: "Unit Converter", slug: "/unit-converter", emoji: "📐" }, { title: "Scientific Notation Converter", slug: "/scientific-notation-converter", emoji: "🔬" }, { title: "Square Root Calculator", slug: "/square-root-calculator", emoji: "√" }],
    engineConfig: angleEngine,
  },

  {
    slug: "percentage-calculator", label: "Percentage Calculator", tier: 1,
    desc: "Calculate percentages, discounts & more",
    category: "numbers", ...CAT.numbers,
    title: "Free Percentage Calculator Online | Microapp",
    description: "Calculate what percentage one number is of another, plus the remaining percentage and value. Free online percentage calculator.",
    intro: "The Percentage Calculator tells you what percentage a value is of a total, the remaining percentage, and the remaining value. Enter any two numbers and get instant results.",
    howTo: ["Enter the value.", "Enter the total.", "See the percentage, remaining %, and remaining value instantly."],
    keywords: ["percentage calculator", "percent calculator", "calculate percentage", "what percent of", "percentage of a number"],
    faqs: [
      { question: "How do I calculate a percentage?", answer: "Divide the value by the total, then multiply by 100. For example, 75 out of 200 = 37.5%." },
      { question: "How do I find what percentage one number is of another?", answer: "Use this tool: enter the first number as 'Value' and the second as 'Total'." },
      { question: "Is my data stored?", answer: "No. All calculations happen in your browser." },
    ],
    relatedTools: [{ title: "Discount Calculator", slug: "/discount-calculator", emoji: "🏷️" }, { title: "Tip Calculator", slug: "/tip-calculator", emoji: "💰" }, { title: "Average Calculator", slug: "/average-calculator", emoji: "📊" }],
    engineConfig: percentageEngine,
  },

  {
    slug: "tip-calculator", label: "Tip Calculator", tier: 1,
    desc: "Calculate tips and split bills",
    category: "numbers", ...CAT.numbers,
    title: "Free Tip Calculator Online | Microapp",
    description: "Calculate tip amount, total bill, and per-person split instantly. Free online tip calculator for restaurants and dining.",
    intro: "The Tip Calculator computes the tip amount, total bill, and per-person cost for any dining situation. Enter the bill amount, tip percentage, and number of people for an instant breakdown.",
    howTo: ["Enter the bill amount.", "Enter the tip percentage.", "Enter how many people are splitting the bill.", "See tip amount, total, and per-person cost instantly."],
    keywords: ["tip calculator", "restaurant tip calculator", "bill split calculator", "how much to tip", "gratuity calculator"],
    faqs: [
      { question: "What is the standard tip percentage?", answer: "In the US, 15–20% is standard for restaurant service. 18% is common for average service, 20%+ for excellent service." },
      { question: "How do I split the bill evenly?", answer: "Enter the number of people in the 'Split between' field. The tool calculates each person's share including tip." },
    ],
    relatedTools: [{ title: "Percentage Calculator", slug: "/percentage-calculator", emoji: "%" }, { title: "Discount Calculator", slug: "/discount-calculator", emoji: "🏷️" }, { title: "Loan Calculator", slug: "/loan-calculator", emoji: "🏦" }],
    engineConfig: tipEngine,
  },

  {
    slug: "discount-calculator", label: "Discount Calculator", tier: 1,
    desc: "Calculate sale prices and savings",
    category: "numbers", ...CAT.numbers,
    title: "Free Discount Calculator Online | Microapp",
    description: "Calculate the sale price, amount saved, and discount percentage for any item. Free online discount calculator.",
    intro: "The Discount Calculator instantly shows you the sale price and how much you save for any discount percentage. Enter the original price and discount to see your savings.",
    howTo: ["Enter the original price.", "Enter the discount percentage.", "See the sale price and savings instantly."],
    keywords: ["discount calculator", "sale price calculator", "percent off calculator", "how much do I save", "price after discount"],
    faqs: [
      { question: "How do I calculate 20% off?", answer: "Multiply the original price by 0.20 to get the discount amount, then subtract from the original price. This tool does it automatically." },
      { question: "What is the formula for discount?", answer: "Sale price = Original price × (1 - discount%). Savings = Original price × discount%." },
    ],
    relatedTools: [{ title: "Percentage Calculator", slug: "/percentage-calculator", emoji: "%" }, { title: "Tip Calculator", slug: "/tip-calculator", emoji: "💰" }, { title: "Compound Interest Calculator", slug: "/compound-interest-calculator", emoji: "📈" }],
    engineConfig: discountEngine,
  },

  {
    slug: "average-calculator", label: "Average Calculator", tier: 1,
    desc: "Calculate mean, median, mode, min, max",
    category: "numbers", ...CAT.numbers,
    title: "Free Average Calculator Online | Microapp",
    description: "Calculate mean, median, mode, min, max, and sum for any set of numbers. Free online average calculator with full statistics.",
    intro: "The Average Calculator computes the arithmetic mean, median, mode, minimum, maximum, and sum for any set of numbers. Enter comma-separated values and get a full statistical summary instantly.",
    howTo: ["Enter your numbers separated by commas.", "See mean, median, mode, min, max, and sum instantly.", "Use the results for statistics, grades, or data analysis."],
    keywords: ["average calculator", "mean calculator", "median calculator", "mode calculator", "statistics calculator online"],
    faqs: [
      { question: "What is the difference between mean and median?", answer: "The mean is the sum divided by the count. The median is the middle value when sorted. The median is less affected by outliers." },
      { question: "What is the mode?", answer: "The mode is the most frequently occurring value in the dataset. There can be multiple modes." },
    ],
    relatedTools: [{ title: "Percentage Calculator", slug: "/percentage-calculator", emoji: "%" }, { title: "Square Root Calculator", slug: "/square-root-calculator", emoji: "√" }, { title: "Geometric Mean Calculator", slug: "/geometric-mean-calculator", emoji: "📊" }],
    engineConfig: averageEngine,
  },

  {
    slug: "square-root-calculator", label: "Square Root Calculator", tier: 1,
    desc: "Calculate square root, cube root, and powers",
    category: "numbers", ...CAT.numbers,
    title: "Free Square Root Calculator Online | Microapp",
    description: "Calculate the square root, cube root, square, and cube of any number instantly. Free online square root calculator.",
    intro: "The Square Root Calculator computes the square root, cube root, square (n²), and cube (n³) of any non-negative number in one step.",
    howTo: ["Enter a number.", "See square root, cube root, square, and cube instantly."],
    keywords: ["square root calculator", "cube root calculator", "sqrt online", "calculate square root", "nth root calculator"],
    faqs: [
      { question: "What is a square root?", answer: "The square root of a number n is the value x such that x² = n. For example, √144 = 12." },
      { question: "Can I calculate the square root of a negative number?", answer: "No — square roots of negative numbers are imaginary (complex numbers). This tool only supports non-negative inputs." },
    ],
    relatedTools: [{ title: "Average Calculator", slug: "/average-calculator", emoji: "📊" }, { title: "Prime Number Checker", slug: "/prime-number-checker", emoji: "🔢" }, { title: "Fraction Simplifier", slug: "/fraction-simplifier", emoji: "½" }],
    engineConfig: sqrtEngine,
  },

  {
    slug: "prime-number-checker", label: "Prime Number Checker", tier: 1,
    desc: "Check if a number is prime and find factors",
    category: "numbers", ...CAT.numbers,
    title: "Free Prime Number Checker Online | Microapp",
    description: "Check if any number is prime and find its prime factors instantly. Free online prime number checker and factorizer.",
    intro: "The Prime Number Checker instantly tells you whether any integer is prime and lists its prime factors. Useful for mathematics, cryptography, and number theory.",
    howTo: ["Enter a whole number (≥ 2).", "See instantly if it's prime.", "View the prime factorization."],
    keywords: ["prime number checker", "is it prime", "prime factorization", "prime number calculator", "factor finder"],
    faqs: [
      { question: "What is a prime number?", answer: "A prime number is a natural number greater than 1 that has no divisors other than 1 and itself. Examples: 2, 3, 5, 7, 11, 13." },
      { question: "Is 1 a prime number?", answer: "No. By definition, prime numbers must be greater than 1." },
      { question: "What is prime factorization?", answer: "Prime factorization expresses a number as a product of its prime factors. For example, 12 = 2 × 2 × 3." },
    ],
    relatedTools: [{ title: "Square Root Calculator", slug: "/square-root-calculator", emoji: "√" }, { title: "Fraction Simplifier", slug: "/fraction-simplifier", emoji: "½" }, { title: "Average Calculator", slug: "/average-calculator", emoji: "📊" }],
    engineConfig: primeEngine,
  },

  {
    slug: "fraction-simplifier", label: "Fraction Simplifier", tier: 1,
    desc: "Simplify fractions to their lowest terms",
    category: "numbers", ...CAT.numbers,
    title: "Free Fraction Simplifier Online | Microapp",
    description: "Simplify any fraction to its lowest terms instantly. Shows GCD, decimal, and percentage. Free online fraction simplifier.",
    intro: "The Fraction Simplifier reduces any fraction to its simplest form using the Greatest Common Divisor (GCD). It also shows the decimal equivalent and percentage.",
    howTo: ["Enter the numerator.", "Enter the denominator.", "See the simplified fraction, decimal, and percentage instantly."],
    keywords: ["fraction simplifier", "simplify fractions", "reduce fractions", "lowest terms calculator", "gcd calculator"],
    faqs: [
      { question: "How do you simplify a fraction?", answer: "Divide both the numerator and denominator by their Greatest Common Divisor (GCD). For example, 12/18 ÷ GCD(12,18)=6 = 2/3." },
      { question: "What is the GCD?", answer: "The Greatest Common Divisor is the largest number that divides both the numerator and denominator without a remainder." },
    ],
    relatedTools: [{ title: "Average Calculator", slug: "/average-calculator", emoji: "📊" }, { title: "Prime Number Checker", slug: "/prime-number-checker", emoji: "🔢" }, { title: "Percentage Calculator", slug: "/percentage-calculator", emoji: "%" }],
    engineConfig: fractionEngine,
  },

  {
    slug: "rem-to-px-converter", label: "REM to PX Converter", tier: 1,
    desc: "Convert REM units to pixels and back",
    category: "numbers", ...CAT.numbers,
    title: "Free REM to PX Converter Online | Microapp",
    description: "Convert REM units to pixels (px) based on any base font size. Free online REM to PX converter for CSS developers.",
    intro: "The REM to PX Converter calculates the pixel equivalent of any REM value based on a configurable base font size (default 16px). Essential for CSS and responsive web design.",
    howTo: ["Enter the REM value.", "Set the base font size (default 16px).", "See the pixel equivalent instantly."],
    keywords: ["rem to px", "rem to pixels", "px to rem", "css rem converter", "rem calculator"],
    faqs: [
      { question: "What is a REM unit in CSS?", answer: "REM (root em) is a CSS unit relative to the root element's font size. If the root font size is 16px, 1rem = 16px." },
      { question: "What is the default base font size?", answer: "Most browsers default to 16px, so 1rem = 16px by default." },
      { question: "Why use REM instead of pixels?", answer: "REM units scale with the user's browser font size preference, making layouts more accessible." },
    ],
    relatedTools: [{ title: "CSS Unit Converter", slug: "/css-unit-converter", emoji: "🖥️" }, { title: "Aspect Ratio Calculator", slug: "/aspect-ratio-calculator", emoji: "📐" }, { title: "Unit Converter", slug: "/unit-converter", emoji: "📐" }],
    engineConfig: remToPxEngine,
  },

  {
    slug: "salary-to-hourly", label: "Salary to Hourly Calculator", tier: 1,
    desc: "Convert annual salary to hourly, daily, weekly",
    category: "numbers", ...CAT.numbers,
    title: "Free Salary to Hourly Calculator Online | Microapp",
    description: "Convert annual salary to hourly, daily, weekly, and monthly rates. Free online salary to hourly calculator.",
    intro: "The Salary to Hourly Calculator converts an annual salary into hourly, daily, weekly, and monthly rates. Configure hours per week and weeks per year for accurate results.",
    howTo: ["Enter your annual salary.", "Set hours per week (default 40).", "Set weeks per year (default 52).", "See all rate breakdowns instantly."],
    keywords: ["salary to hourly", "annual salary to hourly rate", "hourly wage calculator", "salary calculator", "pay rate converter"],
    faqs: [
      { question: "How do I convert salary to hourly?", answer: "Divide annual salary by (hours per week × weeks per year). For $65,000 at 40h/week: $65,000 ÷ 2,080 = $31.25/hour." },
      { question: "How many working hours are in a year?", answer: "A standard full-time year is 2,080 hours (40 hours × 52 weeks)." },
    ],
    relatedTools: [{ title: "Tip Calculator", slug: "/tip-calculator", emoji: "💰" }, { title: "Percentage Calculator", slug: "/percentage-calculator", emoji: "%" }, { title: "Compound Interest Calculator", slug: "/compound-interest-calculator", emoji: "📈" }],
    engineConfig: salaryEngine,
  },

  {
    slug: "geometric-mean-calculator", label: "Geometric Mean Calculator", tier: 1,
    desc: "Calculate geometric mean of a dataset",
    category: "numbers", ...CAT.numbers,
    title: "Free Geometric Mean Calculator Online | Microapp",
    description: "Calculate the geometric mean and arithmetic mean of any set of positive numbers. Free online geometric mean calculator.",
    intro: "The Geometric Mean Calculator computes the geometric mean (the nth root of the product of n numbers) alongside the arithmetic mean. Useful for finance, biology, and statistics.",
    howTo: ["Enter comma-separated positive numbers.", "See geometric mean and arithmetic mean instantly."],
    keywords: ["geometric mean calculator", "geometric average", "calculate geometric mean", "mean calculator", "statistics calculator"],
    faqs: [
      { question: "What is the geometric mean?", answer: "The geometric mean of n numbers is the nth root of their product. For 2, 8, 32: ∛(2×8×32) = ∛512 = 8." },
      { question: "When should I use geometric mean vs arithmetic mean?", answer: "Use geometric mean for rates of change, growth rates, and ratios. Use arithmetic mean for additive quantities." },
    ],
    relatedTools: [{ title: "Average Calculator", slug: "/average-calculator", emoji: "📊" }, { title: "Square Root Calculator", slug: "/square-root-calculator", emoji: "√" }, { title: "Percentage Calculator", slug: "/percentage-calculator", emoji: "%" }],
    engineConfig: geoMeanEngine,
  },

  {
    slug: "scientific-notation-converter", label: "Scientific Notation Converter", tier: 1,
    desc: "Convert numbers to and from scientific notation",
    category: "numbers", ...CAT.numbers,
    title: "Free Scientific Notation Converter Online | Microapp",
    description: "Convert any number to scientific notation and engineering notation. Free online scientific notation converter.",
    intro: "The Scientific Notation Converter converts any number to standard scientific notation (e.g. 4.5 × 10⁻⁵) and engineering notation. Supports both very large and very small numbers.",
    howTo: ["Enter a number in standard or scientific notation (e.g. 0.000045 or 4.5e-5).", "See scientific and engineering notation instantly."],
    keywords: ["scientific notation converter", "standard form converter", "scientific notation calculator", "engineering notation", "e notation"],
    faqs: [
      { question: "What is scientific notation?", answer: "Scientific notation expresses numbers as a × 10^b, where 1 ≤ |a| < 10. For example, 45,000 = 4.5 × 10⁴." },
      { question: "What is engineering notation?", answer: "Engineering notation is like scientific notation but the exponent is always a multiple of 3, making it easier to use with SI prefixes (kilo, mega, milli, etc.)." },
    ],
    relatedTools: [{ title: "Number Base Converter", slug: "/number-base-converter", emoji: "🔢" }, { title: "Square Root Calculator", slug: "/square-root-calculator", emoji: "√" }, { title: "Fraction Simplifier", slug: "/fraction-simplifier", emoji: "½" }],
    engineConfig: sciNotationEngine,
  },

  // ── Time & Date Tools ────────────────────────────────────────────────────────

  {
    slug: "date-time-calculator", label: "Date/Time Calculator", tier: 1, badge: "New",
    desc: "Calculate durations between dates or add/subtract time from any date",
    category: "time", ...CAT.time,
    title: "Date/Time Calculator — Duration & Date Math | Microapp",
    description: "Calculate the exact duration between two dates in years, months, weeks, days, hours, minutes, and seconds. Or add and subtract days, weeks, months, and years from any date. Free online date calculator.",
    intro: "The Date/Time Calculator handles two essential date-math tasks in one place. Use **Duration mode** to find the exact time between any two dates — broken down into years, months, weeks, days, hours, minutes, and seconds. Use **Add/Subtract mode** to shift any date forward or backward by any combination of years, months, weeks, and days, and see the resulting date instantly.",
    howTo: [
      "Choose a mode: 'Duration between dates' or 'Add / Subtract time'.",
      "In Duration mode, pick a start date and an end date — the breakdown appears instantly.",
      "In Add/Subtract mode, pick a base date, choose Add or Subtract, fill in the time amounts, and read the result.",
      "Use the copy buttons to grab individual values or the full summary.",
    ],
    keywords: [
      "date calculator", "date duration calculator", "days between dates", "add days to date",
      "subtract days from date", "date difference calculator", "time between dates",
      "date math", "date arithmetic", "how many days between",
    ],
    schemaCategory: "Date & Time",
    faqs: [
      { question: "How do I calculate the number of days between two dates?", answer: "Select 'Duration between dates', set your start and end dates, and the calculator shows the exact number of days (and the breakdown in years, months, weeks, hours, minutes, and seconds) instantly." },
      { question: "Can I add or subtract months and years, not just days?", answer: "Yes. Switch to 'Add / Subtract time' mode and fill in any combination of years, months, weeks, and days. The calculator handles month-length and leap-year differences automatically." },
      { question: "Does the calculator account for leap years?", answer: "Yes. All calculations use JavaScript's native Date object, which correctly accounts for leap years and varying month lengths." },
      { question: "What is the maximum date range supported?", answer: "The calculator supports any date range that JavaScript's Date object can represent — from year 100 to year 275,760, which covers all practical use cases." },
      { question: "Can I use this to find someone's age?", answer: "Yes. Set the start date to the person's birthday and the end date to today. The Duration result gives the exact age in years, months, and days." },
    ],
    relatedTools: [
      { title: "Days Between Dates", slug: "/days-between", emoji: "📅" },
      { title: "Age Calculator", slug: "/age-calculator", emoji: "🎂" },
      { title: "Countdown Timer", slug: "/countdown-timer", emoji: "⏱️" },
    ],
    engineConfig: dateTimeCalcEngine,
  },

];

// ─── Registry lookup helpers ──────────────────────────────────────────────────

/** Get a tool config by slug (without leading slash) */
export function getToolConfig(slug: string): ToolConfig | undefined {
  return TOOL_REGISTRY.find(t => t.slug === slug);
}

/** Get all Tier 1 (engine-rendered) tools */
export function getTier1Tools(): ToolConfig[] {
  return TOOL_REGISTRY.filter(t => t.tier === 1);
}

/** Get all tools in a category */
export function getToolsByCategory(category: string): ToolConfig[] {
  return TOOL_REGISTRY.filter(t => t.category === category);
}

/** Get new/badge tools */
export function getNewTools(): ToolConfig[] {
  return TOOL_REGISTRY.filter(t => t.badge);
}
