/*
 * MICROAPP — Unit Converter Tool
 */
import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";

type Category = "length" | "weight" | "temperature" | "area";

const units: Record<Category, { label: string; toBase: (v: number) => number; fromBase: (v: number) => number }[]> = {
  length: [
    { label: "Meters (m)", toBase: (v) => v, fromBase: (v) => v },
    { label: "Kilometers (km)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { label: "Centimeters (cm)", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    { label: "Millimeters (mm)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { label: "Miles (mi)", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
    { label: "Yards (yd)", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
    { label: "Feet (ft)", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    { label: "Inches (in)", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
  ],
  weight: [
    { label: "Kilograms (kg)", toBase: (v) => v, fromBase: (v) => v },
    { label: "Grams (g)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { label: "Milligrams (mg)", toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
    { label: "Pounds (lb)", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
    { label: "Ounces (oz)", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
    { label: "Metric Tons (t)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  ],
  temperature: [
    { label: "Celsius (°C)", toBase: (v) => v, fromBase: (v) => v },
    { label: "Fahrenheit (°F)", toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
    { label: "Kelvin (K)", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
  ],
  area: [
    { label: "Square Meters (m²)", toBase: (v) => v, fromBase: (v) => v },
    { label: "Square Kilometers (km²)", toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
    { label: "Square Feet (ft²)", toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
    { label: "Square Miles (mi²)", toBase: (v) => v * 2.59e6, fromBase: (v) => v / 2.59e6 },
    { label: "Acres", toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
    { label: "Hectares (ha)", toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
  ],
};

const categories: { id: Category; label: string }[] = [
  { id: "length", label: "Length" },
  { id: "weight", label: "Weight" },
  { id: "temperature", label: "Temperature" },
  { id: "area", label: "Area" },
];

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>("length");
  const [fromIdx, setFromIdx] = useState(0);
  const [toIdx, setToIdx] = useState(4);
  const [value, setValue] = useState("");

  const list = units[category];

  function convert(): string {
    const v = parseFloat(value);
    if (isNaN(v)) return "";
    const base = list[fromIdx].toBase(v);
    const result = list[toIdx].fromBase(base);
    return result.toPrecision(8).replace(/\.?0+$/, "");
  }

  const result = convert();

  function swap() {
    setFromIdx(toIdx);
    setToIdx(fromIdx);
  }

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => { setCategory(c.id); setFromIdx(0); setToIdx(1); setValue(""); }}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem",
                padding: "0.45rem 1rem", borderRadius: "9999px", border: "2px solid",
                borderColor: category === c.id ? "#1B6B45" : "#E8E6DE",
                background: category === c.id ? "#1B6B45" : "white",
                color: category === c.id ? "white" : "#4B5563",
                transition: "all 0.15s ease",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-3 items-end">
          <div>
            <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>From</label>
            <select className="tool-input" value={fromIdx} onChange={(e) => setFromIdx(Number(e.target.value))}>
              {list.map((u, i) => <option key={i} value={i}>{u.label}</option>)}
            </select>
          </div>
          <button onClick={swap} style={{ padding: "0.65rem", borderRadius: "0.75rem", background: "#E8F5EE", border: "1.5px solid #B7DFC8", color: "#1B6B45", marginBottom: "2px" }}>
            <ArrowLeftRight size={18} />
          </button>
          <div>
            <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>To</label>
            <select className="tool-input" value={toIdx} onChange={(e) => setToIdx(Number(e.target.value))}>
              {list.map((u, i) => <option key={i} value={i}>{u.label}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>Value</label>
          <input type="number" className="tool-input" placeholder="Enter a value…" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>

        {result && (
          <div style={{ background: "#E8F5EE", border: "1.5px solid #B7DFC8", borderRadius: "0.875rem", padding: "1.25rem 1.5rem" }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#1B6B45", marginBottom: "0.2rem" }}>Result</div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.8rem", color: "#1B6B45" }}>
              {result} <span style={{ fontSize: "1rem", fontWeight: 600 }}>{list[toIdx].label.split(" ")[0]}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
