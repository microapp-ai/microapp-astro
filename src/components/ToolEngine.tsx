/**
 * ToolEngine.tsx — Renders Tier 1 tools from ToolConfig without a dedicated .tsx file.
 *
 * Supported engine types:
 *  - "converter"        : Multi-unit converter with live bidirectional conversion
 *  - "calculator"       : Form-based calculator with a compute() function
 *  - "text-transformer" : Text-in → multiple transform buttons → text-out
 *  - "text-checker"     : Text-in → live stat cards
 *
 * Copy-to-clipboard is available on every result surface:
 *  - Converter: primary output field + each row in the all-conversions table + "Copy All" button
 *  - Calculator: each result card + "Copy All Results" button
 *  - Text transformer: output textarea header + large "Copy Output" button
 *  - Text checker: each stat card has a copy icon on hover
 */

import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw, ClipboardList } from "lucide-react";
import { toast } from "sonner";
import ToolPage from "./ToolPageShim";
import type {
  ToolConfig,
  ConverterConfig,
  CalculatorConfig,
  TextTransformerConfig,
  TextCheckerConfig,
  DateTimeCalcConfig,
} from "../lib/tool-registry";

// ─── Shared helpers ───────────────────────────────────────────────────────────

/** Copies `text` to clipboard, shows a toast, and flips the `copied` state for 2 s. */
function useCopy(): [boolean, (text: string) => Promise<void>] {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Copy failed — please copy manually.");
    }
  }, []);
  return [copied, copy];
}

// ─── CopyButton — inline icon + label ────────────────────────────────────────

interface CopyButtonProps {
  text: string;
  /** When true renders a larger pill-shaped button instead of the compact inline variant */
  pill?: boolean;
  label?: string;
}

function CopyButton({ text, pill = false, label }: CopyButtonProps) {
  const [copied, copy] = useCopy();
  if (!text) return null;

  if (pill) {
    return (
      <button
        onClick={() => copy(text)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
          copied
            ? "bg-[#E6F4EE] text-[#1B6B45] border-[#1B6B45]"
            : "bg-white text-[#1B6B45] border-[#1B6B45] hover:bg-[#F0FAF5]"
        }`}
        title="Copy to clipboard"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copied!" : (label ?? "Copy")}
      </button>
    );
  }

  return (
    <button
      onClick={() => copy(text)}
      className="inline-flex items-center gap-1 text-xs text-[#1B6B45] hover:text-[#145235] transition-colors shrink-0"
      title="Copy to clipboard"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

// ─── CopyAllButton — copies multiple results as formatted text ────────────────

function CopyAllButton({ results }: { results: { label: string; value: string }[] }) {
  const [copied, copy] = useCopy();
  if (results.length === 0) return null;

  const allText = results.map((r) => `${r.label}: ${r.value}`).join("\n");

  return (
    <button
      onClick={() => copy(allText)}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
        copied
          ? "bg-[#E6F4EE] text-[#1B6B45] border-[#1B6B45]"
          : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
      }`}
      title="Copy all results"
    >
      {copied ? <Check size={14} /> : <ClipboardList size={14} />}
      {copied ? "Copied!" : "Copy All"}
    </button>
  );
}

// ─── Result card grid (calculator results) ────────────────────────────────────

function ResultGrid({ results }: { results: { label: string; value: string }[] }) {
  if (results.length === 0) return null;
  return (
    <div className="mt-4 space-y-3">
      {/* Header row with Copy All */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Results
        </span>
        <CopyAllButton results={results} />
      </div>

      {/* Individual result cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {results.map((r) => (
          <div
            key={r.label}
            className="group flex items-center justify-between p-3 bg-[#F5F3EE] rounded-lg border border-[#E8E6DE] hover:border-[#C8E6D4] transition-colors"
          >
            <span className="text-sm text-gray-600">{r.label}</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#1B1B1B]">{r.value}</span>
              {/* Always visible on mobile, visible on hover on desktop */}
              <span className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <CopyButton text={r.value} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Converter engine ─────────────────────────────────────────────────────────

function ConverterWidget({ config }: { config: ConverterConfig }) {
  const { units, defaultFromIndex = 0, precision = 6 } = config;
  const [fromIdx, setFromIdx] = useState(defaultFromIndex);
  const [toIdx, setToIdx] = useState(fromIdx === 0 ? 1 : 0);
  const [inputVal, setInputVal] = useState("");

  const convert = useCallback(
    (val: string, from: number, to: number): string => {
      const n = parseFloat(val);
      if (isNaN(n)) return "";
      const base = units[from].toBase(n);
      const result = units[to].fromBase(base);
      return parseFloat(result.toFixed(precision)).toString();
    },
    [units, precision]
  );

  const outputVal = convert(inputVal, fromIdx, toIdx);

  // All conversions from current input (excluding the "from" unit itself)
  const allConversions = units
    .map((u, i) => ({
      label: u.label,
      value: i === fromIdx ? inputVal : convert(inputVal, fromIdx, i),
    }))
    .filter((_, i) => i !== fromIdx);

  // "Copy All" text for the conversions table
  const allConversionsText =
    inputVal && allConversions.length > 0
      ? `${parseFloat(inputVal)} ${units[fromIdx].label} =\n` +
        allConversions.map((c) => `  ${c.value || "—"} ${c.label}`).join("\n")
      : "";

  const swap = () => {
    const newFrom = toIdx;
    const newTo = fromIdx;
    const newInput = outputVal;
    setFromIdx(newFrom);
    setToIdx(newTo);
    setInputVal(newInput);
  };

  return (
    <div className="space-y-6">
      {/* Primary converter */}
      <div className="p-6 bg-white rounded-xl shadow-sm border border-[#E8E6DE]">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
          {/* From */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">From</label>
            <select
              value={fromIdx}
              onChange={(e) => {
                const idx = Number(e.target.value);
                setFromIdx(idx);
                if (idx === toIdx) setToIdx(idx === 0 ? 1 : 0);
              }}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1B6B45] focus:border-[#1B6B45] outline-none"
            >
              {units.map((u, i) => (
                <option key={u.label} value={i}>
                  {u.label}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Enter value…"
              className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-[#1B6B45] focus:border-[#1B6B45] outline-none"
            />
          </div>

          {/* Swap button */}
          <div className="flex justify-center pb-1">
            <button
              onClick={swap}
              className="p-2 rounded-full bg-[#F5F3EE] hover:bg-[#E8E6DE] border border-[#E8E6DE] transition-colors"
              title="Swap units"
            >
              <RefreshCw size={18} className="text-[#1B6B45]" />
            </button>
          </div>

          {/* To — result field with prominent copy button */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">To</label>
            <select
              value={toIdx}
              onChange={(e) => {
                const idx = Number(e.target.value);
                setToIdx(idx);
                if (idx === fromIdx) setFromIdx(idx === 0 ? 1 : 0);
              }}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1B6B45] focus:border-[#1B6B45] outline-none"
            >
              {units.map((u, i) => (
                <option key={u.label} value={i}>
                  {u.label}
                </option>
              ))}
            </select>
            <div className="relative">
              <input
                type="text"
                readOnly
                value={outputVal}
                placeholder="Result"
                className="w-full p-3 pr-24 border border-gray-200 rounded-lg text-lg bg-[#F5F3EE] text-[#1B6B45] font-semibold cursor-default"
              />
              {outputVal && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <CopyButton text={outputVal} pill />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* All conversions table */}
      {inputVal && allConversions.length > 0 && (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-[#E8E6DE]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              All conversions from {parseFloat(inputVal)} {units[fromIdx].label}
            </h3>
            <CopyButton text={allConversionsText} pill label="Copy All" />
          </div>
          <div className="divide-y divide-[#E8E6DE]">
            {allConversions.map((c) => (
              <div
                key={c.label}
                className="group flex items-center justify-between py-2.5"
              >
                <span className="text-sm text-gray-600">{c.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#1B1B1B]">{c.value || "—"}</span>
                  {c.value && (
                    <span className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <CopyButton text={c.value} />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Calculator engine ────────────────────────────────────────────────────────

function CalculatorWidget({ config }: { config: CalculatorConfig }) {
  const { fields, compute } = config;
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.id, ""]))
  );

  const results = compute(values);

  const handleChange = (id: string, val: string) => {
    setValues((prev) => ({ ...prev, [id]: val }));
  };

  const reset = () => {
    setValues(Object.fromEntries(fields.map((f) => [f.id, ""])));
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-xl shadow-sm border border-[#E8E6DE]">
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.id} className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              {field.type === "select" ? (
                <select
                  value={values[field.id]}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1B6B45] focus:border-[#1B6B45] outline-none"
                >
                  <option value="">Select…</option>
                  {field.options?.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || "number"}
                  value={values[field.id]}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B6B45] focus:border-[#1B6B45] outline-none"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={reset}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <RefreshCw size={13} /> Reset
          </button>
        </div>

        {/* Results with per-card copy + Copy All */}
        <ResultGrid results={results} />
      </div>
    </div>
  );
}

// ─── Text transformer engine ──────────────────────────────────────────────────

function TextTransformerWidget({ config }: { config: TextTransformerConfig }) {
  const { transforms, inputLabel, inputPlaceholder } = config;
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [activeTransform, setActiveTransform] = useState<string | null>(null);

  const apply = (label: string, fn: (s: string) => string) => {
    const result = fn(input);
    setOutput(result);
    setActiveTransform(label);
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setActiveTransform(null);
  };

  return (
    <div className="space-y-4">
      <div className="p-6 bg-white rounded-xl shadow-sm border border-[#E8E6DE]">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {inputLabel || "Input text"}
        </label>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            // Re-apply active transform on input change
            if (activeTransform) {
              const t = transforms.find((t) => t.label === activeTransform);
              if (t) setOutput(t.fn(e.target.value));
            }
          }}
          placeholder={inputPlaceholder || "Type or paste your text here…"}
          rows={6}
          className="w-full p-3 border border-gray-300 rounded-lg resize-y focus:ring-2 focus:ring-[#1B6B45] focus:border-[#1B6B45] outline-none text-sm font-mono"
        />

        {/* Transform buttons */}
        <div className="flex flex-wrap gap-2 mt-3">
          {transforms.map((t) => (
            <button
              key={t.label}
              onClick={() => apply(t.label, t.fn)}
              disabled={!input}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                activeTransform === t.label
                  ? "bg-[#1B6B45] text-white border-[#1B6B45]"
                  : "bg-white text-[#1B6B45] border-[#1B6B45] hover:bg-[#F0FAF5]"
              }`}
            >
              {t.label}
            </button>
          ))}
          {input && (
            <button
              onClick={clear}
              className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-300 text-gray-500 hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Output — header copy button + large pill copy button below textarea */}
      {output && (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-[#E8E6DE]">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              Result{activeTransform ? ` — ${activeTransform}` : ""}
            </label>
            {/* Compact inline copy in the header */}
            <CopyButton text={output} />
          </div>
          <textarea
            readOnly
            value={output}
            rows={6}
            className="w-full p-3 border border-gray-200 rounded-lg resize-y bg-[#F5F3EE] text-sm font-mono text-[#1B1B1B] cursor-default"
          />
          {/* Prominent pill copy button below the textarea */}
          <div className="mt-3 flex justify-end">
            <CopyButton text={output} pill label="Copy Output" />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Text checker engine ──────────────────────────────────────────────────────

function TextCheckerWidget({ config }: { config: TextCheckerConfig }) {
  const { stats, inputLabel, inputPlaceholder } = config;
  const [input, setInput] = useState("");

  const results = stats(input);

  // Build "Copy All Stats" text
  const allStatsText =
    results.length > 0 ? results.map((r) => `${r.label}: ${r.value}`).join("\n") : "";

  return (
    <div className="space-y-4">
      <div className="p-6 bg-white rounded-xl shadow-sm border border-[#E8E6DE]">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {inputLabel || "Input text"}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={inputPlaceholder || "Type or paste your text here…"}
          rows={8}
          className="w-full p-3 border border-gray-300 rounded-lg resize-y focus:ring-2 focus:ring-[#1B6B45] focus:border-[#1B6B45] outline-none text-sm"
        />
      </div>

      {/* Live stat cards — each card has a copy icon on hover, plus a "Copy All Stats" button */}
      {results.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Stats
            </span>
            <CopyButton text={allStatsText} pill label="Copy All Stats" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {results.map((r) => (
              <div
                key={r.label}
                className="group relative p-4 bg-white rounded-xl shadow-sm border border-[#E8E6DE] hover:border-[#C8E6D4] text-center transition-colors"
              >
                <div className="text-2xl font-bold text-[#1B6B45]">{r.value}</div>
                <div className="text-xs text-gray-500 mt-1">{r.label}</div>
                {/* Copy icon — bottom-right, visible on hover */}
                <span className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <CopyButton text={String(r.value)} />
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Date/Time Calculator engine ─────────────────────────────────────────────

type DtMode = "duration" | "add-subtract";
type AddSubOp = "add" | "subtract";

interface DurationResult {
  years: number;
  months: number;
  weeks: number;
  days: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
}

function calcDuration(start: Date, end: Date): DurationResult {
  const [a, b] = start <= end ? [start, end] : [end, start];
  const totalMs = b.getTime() - a.getTime();
  const totalSeconds = Math.floor(totalMs / 1000);
  const totalMinutes = Math.floor(totalMs / 60_000);
  const totalHours   = Math.floor(totalMs / 3_600_000);
  const totalDays    = Math.floor(totalMs / 86_400_000);

  // Calendar-accurate years/months/days
  let years  = b.getFullYear() - a.getFullYear();
  let months = b.getMonth()    - a.getMonth();
  let days   = b.getDate()     - a.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(b.getFullYear(), b.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) { years -= 1; months += 12; }

  const weeks = Math.floor(days / 7);
  const remainDays = days % 7;

  return { years, months, weeks, days: remainDays, totalDays, totalHours, totalMinutes, totalSeconds };
}

function addSubtractDate(base: Date, op: AddSubOp, y: number, mo: number, w: number, d: number): Date {
  const sign = op === "add" ? 1 : -1;
  const result = new Date(base);
  result.setFullYear(result.getFullYear() + sign * y);
  result.setMonth(result.getMonth() + sign * mo);
  result.setDate(result.getDate() + sign * (w * 7 + d));
  return result;
}

function toDateInputValue(d: Date): string {
  const y = d.getFullYear().toString().padStart(4, "0");
  const m = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function DateTimeWidget({ config: _config }: { config: DateTimeCalcConfig }) {
  const today = toDateInputValue(new Date());

  // ── Duration mode state ──
  const [startDate, setStartDate] = useState(today);
  const [endDate,   setEndDate]   = useState(today);

  // ── Add/Subtract mode state ──
  const [baseDate, setBaseDate] = useState(today);
  const [op,       setOp]       = useState<AddSubOp>("add");
  const [addYears, setAddYears] = useState("");
  const [addMonths,setAddMonths]= useState("");
  const [addWeeks, setAddWeeks] = useState("");
  const [addDays,  setAddDays]  = useState("");

  // ── Mode tab ──
  const [mode, setMode] = useState<DtMode>("duration");

  // ── Duration results ──
  const durationResult: DurationResult | null = (() => {
    if (!startDate || !endDate) return null;
    const s = new Date(startDate + "T00:00:00");
    const e = new Date(endDate   + "T00:00:00");
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return null;
    return calcDuration(s, e);
  })();

  const durationRows: { label: string; value: string }[] = durationResult
    ? [
        { label: "Years",          value: durationResult.years.toString() },
        { label: "Months",         value: durationResult.months.toString() },
        { label: "Weeks",          value: durationResult.weeks.toString() },
        { label: "Days (remainder)",value: durationResult.days.toString() },
        { label: "Total days",     value: durationResult.totalDays.toLocaleString() },
        { label: "Total hours",    value: durationResult.totalHours.toLocaleString() },
        { label: "Total minutes",  value: durationResult.totalMinutes.toLocaleString() },
        { label: "Total seconds",  value: durationResult.totalSeconds.toLocaleString() },
      ]
    : [];

  const durationSummary = durationResult
    ? `${durationResult.years}y ${durationResult.months}mo ${durationResult.weeks}w ${durationResult.days}d (${durationResult.totalDays.toLocaleString()} total days)`
    : "";

  // ── Add/Subtract results ──
  const addSubResult: Date | null = (() => {
    if (!baseDate) return null;
    const b = new Date(baseDate + "T00:00:00");
    if (isNaN(b.getTime())) return null;
    const y  = parseInt(addYears  || "0", 10) || 0;
    const mo = parseInt(addMonths || "0", 10) || 0;
    const w  = parseInt(addWeeks  || "0", 10) || 0;
    const d  = parseInt(addDays   || "0", 10) || 0;
    if (y === 0 && mo === 0 && w === 0 && d === 0) return null;
    return addSubtractDate(b, op, y, mo, w, d);
  })();

  const inputClass =
    "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B6B45] focus:border-[#1B6B45] outline-none text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="space-y-4">
      {/* Mode tabs */}
      <div className="flex gap-2">
        {(["duration", "add-subtract"] as DtMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
              mode === m
                ? "bg-[#1B6B45] text-white border-[#1B6B45]"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {m === "duration" ? "Duration between dates" : "Add / Subtract time"}
          </button>
        ))}
      </div>

      {/* ── Duration mode ── */}
      {mode === "duration" && (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-[#E8E6DE] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Start date</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>End date</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className={inputClass} />
            </div>
          </div>

          {durationResult && (
            <>
              {/* Summary banner */}
              <div className="flex items-center justify-between p-3 bg-[#F0FAF5] rounded-lg border border-[#C8E6D4]">
                <span className="text-sm font-semibold text-[#1B6B45]">{durationSummary}</span>
                <CopyButton text={durationSummary} pill label="Copy Summary" />
              </div>

              {/* Detailed breakdown */}
              <div className="mt-2 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Breakdown</span>
                  <CopyAllButton results={durationRows} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {durationRows.map((r) => (
                    <div
                      key={r.label}
                      className="group flex flex-col items-center p-3 bg-[#F5F3EE] rounded-lg border border-[#E8E6DE] hover:border-[#C8E6D4] text-center transition-colors"
                    >
                      <span className="text-xl font-bold text-[#1B6B45]">{r.value}</span>
                      <span className="text-xs text-gray-500 mt-0.5">{r.label}</span>
                      <span className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <CopyButton text={r.value} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Add/Subtract mode ── */}
      {mode === "add-subtract" && (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-[#E8E6DE] space-y-4">
          {/* Base date + operation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Base date</label>
              <input type="date" value={baseDate} onChange={(e) => setBaseDate(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Operation</label>
              <div className="flex gap-2 mt-1">
                {(["add", "subtract"] as AddSubOp[]).map((o) => (
                  <button
                    key={o}
                    onClick={() => setOp(o)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                      op === o
                        ? "bg-[#1B6B45] text-white border-[#1B6B45]"
                        : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {o === "add" ? "+ Add" : "− Subtract"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Amount fields */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Years",  value: addYears,  set: setAddYears },
              { label: "Months", value: addMonths, set: setAddMonths },
              { label: "Weeks",  value: addWeeks,  set: setAddWeeks },
              { label: "Days",   value: addDays,   set: setAddDays },
            ].map(({ label, value, set }) => (
              <div key={label}>
                <label className={labelClass}>{label}</label>
                <input
                  type="number"
                  min="0"
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  placeholder="0"
                  className={inputClass}
                />
              </div>
            ))}
          </div>

          {/* Result */}
          {addSubResult && (
            <div className="flex items-center justify-between p-4 bg-[#F0FAF5] rounded-lg border border-[#C8E6D4]">
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Result date</div>
                <div className="text-lg font-bold text-[#1B6B45]">{formatDate(addSubResult)}</div>
                <div className="text-xs text-gray-400 mt-0.5">{toDateInputValue(addSubResult)}</div>
              </div>
              <div className="flex flex-col gap-1.5 items-end">
                <CopyButton text={formatDate(addSubResult)} pill label="Copy date" />
                <CopyButton text={toDateInputValue(addSubResult)} pill label="Copy ISO" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── ToolEngine (main export) ─────────────────────────────────────────────────

interface ToolEngineProps {
  config: ToolConfig;
}

export default function ToolEngine({ config }: ToolEngineProps) {
  const {
    title,
    description,
    intro,
    howTo,
    categoryLabel,
    categoryHref,
    badge,
    slug,
    schemaCategory,
    faqs,
    relatedTools,
    keywords,
    engineConfig,
  } = config;

  if (!engineConfig) {
    return (
      <div className="p-8 text-center text-gray-500">
        No engine config found for this tool.
      </div>
    );
  }

  const widget = (() => {
    switch (engineConfig.type) {
      case "converter":
        return <ConverterWidget config={engineConfig} />;
      case "calculator":
        return <CalculatorWidget config={engineConfig} />;
      case "text-transformer":
        return <TextTransformerWidget config={engineConfig} />;
      case "text-checker":
        return <TextCheckerWidget config={engineConfig} />;
      case "datetime-calculator":
        return <DateTimeWidget config={engineConfig} />;
    }
  })();

  return (
    <ToolPage
      title={title}
      description={description}
      intro={intro}
      howTo={howTo}
      category={categoryLabel}
      categoryHref={categoryHref}
      badge={badge}
      slug={slug}
      schemaCategory={schemaCategory}
      faqs={faqs}
      relatedTools={relatedTools}
      keywords={keywords}
    >
      {widget}
    </ToolPage>
  );
}
