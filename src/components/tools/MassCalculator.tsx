import { useState } from "react";

const densityUnits = ["kg/m³", "g/cm³", "lb/ft³"];
const volumeUnits = ["m³", "cm³", "liters", "gallons", "ft³"];

function toDensityKgM3(val: number, unit: string) {
  if (unit === "g/cm³") return val * 1000;
  if (unit === "lb/ft³") return val * 16.0185;
  return val;
}
function toVolumeM3(val: number, unit: string) {
  if (unit === "cm³") return val * 1e-6;
  if (unit === "liters") return val * 0.001;
  if (unit === "gallons") return val * 0.00378541;
  if (unit === "ft³") return val * 0.0283168;
  return val;
}

export default function MassCalculator() {
  const [mode, setMode] = useState<"mass" | "volume">("mass");
  const [density, setDensity] = useState("");
  const [densityUnit, setDensityUnit] = useState("kg/m³");
  const [volume, setVolume] = useState("");
  const [volumeUnit, setVolumeUnit] = useState("m³");
  const [massKg, setMassKg] = useState("");
  const [massUnit, setMassUnit] = useState("kg");

  const selectStyle: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#1A1A1A", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "0.5rem", padding: "0.45rem 0.6rem", outline: "none" };
  const inputStyle: React.CSSProperties = { ...selectStyle, flex: 1, width: "100%" };
  const labelStyle: React.CSSProperties = { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" };

  let result: { label: string; value: string }[] = [];

  if (mode === "mass" && density && volume) {
    const d = toDensityKgM3(parseFloat(density), densityUnit);
    const v = toVolumeM3(parseFloat(volume), volumeUnit);
    const kg = d * v;
    result = [
      { label: "Kilograms (kg)", value: kg.toFixed(4) },
      { label: "Grams (g)", value: (kg * 1000).toFixed(2) },
      { label: "Pounds (lb)", value: (kg * 2.20462).toFixed(4) },
      { label: "Ounces (oz)", value: (kg * 35.274).toFixed(3) },
    ];
  } else if (mode === "volume" && density && massKg) {
    const d = toDensityKgM3(parseFloat(density), densityUnit);
    const mkg = massUnit === "kg" ? parseFloat(massKg) : massUnit === "g" ? parseFloat(massKg) / 1000 : parseFloat(massKg) / 2.20462;
    const v = d > 0 ? mkg / d : 0;
    result = [
      { label: "Cubic meters (m³)", value: v.toFixed(6) },
      { label: "Liters", value: (v * 1000).toFixed(4) },
      { label: "Gallons", value: (v / 0.00378541).toFixed(4) },
      { label: "Cubic feet (ft³)", value: (v / 0.0283168).toFixed(4) },
    ];
  }

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        <div className="flex gap-2">
          {(["mass", "volume"] as const).map(m => (
            <button key={m} onClick={() => setMode(m)} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", padding: "0.4rem 1.1rem", borderRadius: "9999px", border: "2px solid", borderColor: mode === m ? "#1B6B45" : "#E8E6DE", background: mode === m ? "#1B6B45" : "white", color: mode === m ? "white" : "#4B5563", cursor: "pointer" }}>
              {m === "mass" ? "Find Mass" : "Find Volume"}
            </button>
          ))}
        </div>

        <div>
          <label style={labelStyle}>Density</label>
          <div className="flex gap-2">
            <input type="number" value={density} onChange={e => setDensity(e.target.value)} style={inputStyle} placeholder="e.g. 1000" />
            <select value={densityUnit} onChange={e => setDensityUnit(e.target.value)} style={selectStyle}>
              {densityUnits.map(u => <option key={u}>{u}</option>)}
            </select>
          </div>
        </div>

        {mode === "mass" ? (
          <div>
            <label style={labelStyle}>Volume</label>
            <div className="flex gap-2">
              <input type="number" value={volume} onChange={e => setVolume(e.target.value)} style={inputStyle} placeholder="e.g. 2" />
              <select value={volumeUnit} onChange={e => setVolumeUnit(e.target.value)} style={selectStyle}>
                {volumeUnits.map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>
        ) : (
          <div>
            <label style={labelStyle}>Mass</label>
            <div className="flex gap-2">
              <input type="number" value={massKg} onChange={e => setMassKg(e.target.value)} style={inputStyle} placeholder="e.g. 500" />
              <select value={massUnit} onChange={e => setMassUnit(e.target.value)} style={selectStyle}>
                {["kg", "g", "lb"].map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>
        )}

        {result.length > 0 && (
          <div style={{ background: "#E8F5EE", borderRadius: "1rem", padding: "1.25rem", border: "1.5px solid #C6E6D4" }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#1B6B45", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>Result</p>
            <div className="grid grid-cols-2 gap-3">
              {result.map(r => (
                <div key={r.label} style={{ background: "white", borderRadius: "0.75rem", padding: "0.875rem", border: "1.5px solid #E8E6DE" }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#1B6B45" }}>{r.value}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#6B7280" }}>{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}