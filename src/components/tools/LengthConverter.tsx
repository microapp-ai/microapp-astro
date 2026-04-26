import { useState } from "react";
import { type RelatedTool } from "../../lib/types";
import { Input } from "../ui/input";
const faqs: FAQItem[] = [
  { question: "How many centimeters in an inch?", answer: "1 inch equals 2.54 centimeters." },
  { question: "How many feet in a meter?", answer: "1 meter equals approximately 3.28084 feet." },
  { question: "How many kilometers in a mile?", answer: "1 mile equals approximately 1.60934 kilometers." },
  { question: "What is a nautical mile?", answer: "A nautical mile is 1,852 meters, used in aviation and maritime navigation." },
  { question: "How many millimeters in an inch?", answer: "1 inch equals exactly 25.4 millimeters." },
];
const relatedTools: RelatedTool[] = [
  { title: "Unit Converter", slug: "/unit-converter", emoji: "📐" },
  { title: "Weight Converter", slug: "/weight-converter", emoji: "⚖️" },
  { title: "Temperature Converter", slug: "/temperature-converter", emoji: "🌡️" },
];
const UNITS = [
  { label: "Meter (m)", toM: 1 },
  { label: "Kilometer (km)", toM: 1000 },
  { label: "Centimeter (cm)", toM: 0.01 },
  { label: "Millimeter (mm)", toM: 0.001 },
  { label: "Mile (mi)", toM: 1609.34 },
  { label: "Yard (yd)", toM: 0.9144 },
  { label: "Foot (ft)", toM: 0.3048 },
  { label: "Inch (in)", toM: 0.0254 },
  { label: "Nautical Mile (nmi)", toM: 1852 },
];
export default function LengthConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState(0);
  const v = parseFloat(value);
  const inM = isNaN(v) ? null : v * UNITS[fromUnit].toM;
  return (
    <div className="tool-widget-content">
    <div className="space-y-4 max-w-sm">
      <div><label className="block text-sm font-semibold mb-1">Value</label>
        <Input type="number" value={value} onChange={e=>setValue(e.target.value)} placeholder="e.g. 100"/></div>
      <div><label className="block text-sm font-semibold mb-1">From Unit</label>
        <select value={fromUnit} onChange={e=>setFromUnit(Number(e.target.value))} className="w-full border rounded-lg px-3 py-2 text-sm bg-background">
          {UNITS.map((u,i)=><option key={u.label} value={i}>{u.label}</option>)}
        </select></div>
      {inM !== null && (<div className="space-y-2">
        {UNITS.map((u,i)=> i===fromUnit ? null : (
          <div key={u.label} className="flex justify-between items-center bg-muted/40 rounded-lg px-4 py-3 border">
            <span className="text-sm font-medium text-muted-foreground">{u.label}</span>
            <span className="text-lg font-bold text-green-800">{(inM/u.toM).toLocaleString(undefined,{maximumFractionDigits:6})}</span>
          </div>
        ))}
      </div>)}
    </div>
    </div>
  );
}
