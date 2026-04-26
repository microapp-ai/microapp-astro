import { useState } from "react";
import { type RelatedTool } from "../../lib/types";
import { Input } from "../ui/input";
const faqs: FAQItem[] = [
  { question: "How do I convert Celsius to Fahrenheit?", answer: "Multiply by 9/5 then add 32. For example, 100C = 212F." },
  { question: "How do I convert Fahrenheit to Celsius?", answer: "Subtract 32 then multiply by 5/9. For example, 32F = 0C." },
  { question: "What is absolute zero in Celsius?", answer: "Absolute zero is -273.15C, which equals 0 Kelvin." },
  { question: "What temperature is the same in Celsius and Fahrenheit?", answer: "-40 degrees is the same in both Celsius and Fahrenheit." },
  { question: "What is normal body temperature in Fahrenheit?", answer: "Normal body temperature is approximately 98.6F (37C)." },
];
const relatedTools: RelatedTool[] = [
  { title: "Unit Converter", slug: "/unit-converter", emoji: "📐" },
  { title: "Weight Converter", slug: "/weight-converter", emoji: "⚖️" },
  { title: "Length Converter", slug: "/length-converter", emoji: "📏" },
];
export default function TemperatureConverter() {
  const [celsius, setCelsius] = useState("");
  const c = parseFloat(celsius);
  const f = isNaN(c) ? "" : ((c*9/5)+32).toFixed(2);
  const k = isNaN(c) ? "" : (c+273.15).toFixed(2);
  const r = isNaN(c) ? "" : ((c+273.15)*9/5).toFixed(2);
  return (
    <div className="tool-widget-content">
    <div className="space-y-4 max-w-sm">
      <div><label className="block text-sm font-semibold mb-1">Celsius (C)</label>
        <Input type="number" value={celsius} onChange={e=>setCelsius(e.target.value)} placeholder="e.g. 100"/></div>
      {celsius && !isNaN(c) && (<div className="space-y-2">
        {[["Fahrenheit (F)",f],["Kelvin (K)",k],["Rankine (R)",r]].map(([label,val])=>(
          <div key={label} className="flex justify-between items-center bg-muted/40 rounded-lg px-4 py-3 border">
            <span className="text-sm font-medium text-muted-foreground">{label}</span>
            <span className="text-lg font-bold text-green-800">{val}</span>
          </div>
        ))}
      </div>)}
    </div>
    </div>
  );
}
