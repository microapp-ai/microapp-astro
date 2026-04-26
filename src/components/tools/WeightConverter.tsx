import { useState } from "react";
import { type RelatedTool } from "../../lib/types";
import { Input } from "../ui/input";
const faqs: FAQItem[] = [
  { question: "How many pounds in a kilogram?", answer: "1 kilogram equals approximately 2.20462 pounds." },
  { question: "How many grams in an ounce?", answer: "1 ounce equals approximately 28.3495 grams." },
  { question: "What is a stone in pounds?", answer: "1 stone equals 14 pounds." },
  { question: "How do I convert kg to lbs?", answer: "Multiply kilograms by 2.20462 to get pounds." },
  { question: "What is a metric ton?", answer: "A metric ton equals 1,000 kilograms or approximately 2,204.62 pounds." },
];
const relatedTools: RelatedTool[] = [
  { title: "Unit Converter", slug: "/unit-converter", emoji: "📐" },
  { title: "Length Converter", slug: "/length-converter", emoji: "📏" },
  { title: "BMI Calculator", slug: "/bmi-calculator", emoji: "⚖️" },
];
const UNITS = [
  { label: "Kilogram (kg)", toKg: 1 },
  { label: "Gram (g)", toKg: 0.001 },
  { label: "Milligram (mg)", toKg: 0.000001 },
  { label: "Pound (lb)", toKg: 0.453592 },
  { label: "Ounce (oz)", toKg: 0.0283495 },
  { label: "Stone (st)", toKg: 6.35029 },
  { label: "Metric Ton (t)", toKg: 1000 },
];
export default function WeightConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState(0);
  const v = parseFloat(value);
  const inKg = isNaN(v) ? null : v * UNITS[fromUnit].toKg;
  return (
    <div className="tool-widget-content">
    <div className="space-y-4 max-w-sm">
      <div><label className="block text-sm font-semibold mb-1">Value</label>
        <Input type="number" value={value} onChange={e=>setValue(e.target.value)} placeholder="e.g. 70"/></div>
      <div><label className="block text-sm font-semibold mb-1">From Unit</label>
        <select value={fromUnit} onChange={e=>setFromUnit(Number(e.target.value))} className="w-full border rounded-lg px-3 py-2 text-sm bg-background">
          {UNITS.map((u,i)=><option key={u.label} value={i}>{u.label}</option>)}
        </select></div>
      {inKg !== null && (<div className="space-y-2">
        {UNITS.map((u,i)=> i===fromUnit ? null : (
          <div key={u.label} className="flex justify-between items-center bg-muted/40 rounded-lg px-4 py-3 border">
            <span className="text-sm font-medium text-muted-foreground">{u.label}</span>
            <span className="text-lg font-bold text-green-800">{(inKg/u.toKg).toLocaleString(undefined,{maximumFractionDigits:6})}</span>
          </div>
        ))}
      </div>)}
    </div>
    </div>
  );
}
