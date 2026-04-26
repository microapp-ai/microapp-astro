import { useState } from "react";

const standards: Record<string, Record<string, number>> = {
  male: { "17-20": 20, "21-27": 22, "28-39": 24, "40+": 26 },
  female: { "17-20": 30, "21-27": 32, "28-39": 34, "40+": 36 },
};

function calcBodyFat(gender: string, heightIn: number, neckIn: number, waistIn: number, hipIn: number) {
  if (gender === "male") {
    return 86.010 * Math.log10(waistIn - neckIn) - 70.041 * Math.log10(heightIn) + 36.76;
  } else {
    return 163.205 * Math.log10(waistIn + hipIn - neckIn) - 97.684 * Math.log10(heightIn) - 78.387;
  }
}

function toInches(val: number, unit: string) {
  return unit === "cm" ? val / 2.54 : val;
}

function getCategory(bf: number, gender: string) {
  if (gender === "male") {
    if (bf < 6) return { label: "Essential Fat", color: "#4F6EF7" };
    if (bf < 14) return { label: "Lean / Athletic", color: "#1B6B45" };
    if (bf < 18) return { label: "Fit", color: "#4ADE80" };
    if (bf < 25) return { label: "Acceptable", color: "#B8860B" };
    return { label: "Overweight", color: "#E05252" };
  } else {
    if (bf < 14) return { label: "Essential Fat", color: "#4F6EF7" };
    if (bf < 21) return { label: "Lean / Athletic", color: "#1B6B45" };
    if (bf < 25) return { label: "Fit", color: "#4ADE80" };
    if (bf < 32) return { label: "Acceptable", color: "#B8860B" };
    return { label: "Overweight", color: "#E05252" };
  }
}

export default function ArmyBodyFatCalculator() {
  const [gender, setGender] = useState("male");
  const [unit, setUnit] = useState<"in" | "cm">("in");
  const [ageGroup, setAgeGroup] = useState("21-27");
  const [height, setHeight] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");

  const inputStyle: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#1A1A1A", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "0.5rem", padding: "0.5rem 0.75rem", outline: "none", width: "100%" };
  const labelStyle: React.CSSProperties = { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" };

  let result: { bf: number; pass: boolean; category: { label: string; color: string } } | null = null;
  const h = parseFloat(height), n = parseFloat(neck), w = parseFloat(waist), hp = parseFloat(hip);
  if (h && n && w && (gender === "male" || hp)) {
    const hIn = toInches(h, unit), nIn = toInches(n, unit), wIn = toInches(w, unit), hpIn = toInches(hp || 0, unit);
    const bf = calcBodyFat(gender, hIn, nIn, wIn, hpIn);
    if (bf > 0 && bf < 100) {
      const standard = standards[gender][ageGroup];
      result = { bf, pass: bf <= standard, category: getCategory(bf, gender) };
    }
  }

  const faqs: FAQItem[] = [
    {
      question: "How does the Army Body Fat Calculator work?",
      answer: "This calculator uses the U.S. Army's circumference method, which involves measuring specific body parts like height, neck, waist, and hip (for females) to estimate body fat percentage.",
    },
    {
      question: "Why does the Army use a circumference method instead of other body fat tests?",
      answer: "The Army's circumference method is a practical and cost-effective way to assess body fat percentage in a field environment, requiring minimal equipment compared to methods like DEXA scans or hydrostatic weighing.",
    },
    {
      question: "Can I use this calculator if I'm not in the military?",
      answer: "Yes, while based on Army standards, anyone can use this calculator to estimate their body fat percentage. However, the 'pass/fail' result is specifically against Army regulations.",
    },
    {
      question: "What are the Army's body fat standards?",
      answer: "The Army's body fat standards vary by age and gender. This calculator compares your estimated body fat percentage against these specific standards to determine if you meet the requirements for your age group.",
    },
    {
      question: "Is the Army Body Fat Calculator accurate?",
      answer: "The Army's circumference method provides a reasonable estimate of body fat percentage. While not as precise as laboratory methods, it is a widely accepted and practical screening tool for fitness assessments.",
    },
  ];

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        <div className="flex flex-wrap gap-4">
          <div>
            <label style={labelStyle}>Gender</label>
            <div className="flex gap-2">
              {["male", "female"].map(g => (
                <button key={g} onClick={() => setGender(g)} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", padding: "0.4rem 1rem", borderRadius: "9999px", border: "2px solid", borderColor: gender === g ? "#1B6B45" : "#E8E6DE", background: gender === g ? "#1B6B45" : "white", color: gender === g ? "white" : "#4B5563", cursor: "pointer", textTransform: "capitalize" }}>
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={labelStyle}>Measurement unit</label>
            <div className="flex gap-2">
              {(["in", "cm"] as const).map(u => (
                <button key={u} onClick={() => setUnit(u)} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", padding: "0.4rem 1rem", borderRadius: "9999px", border: "2px solid", borderColor: unit === u ? "#1B6B45" : "#E8E6DE", background: unit === u ? "#1B6B45" : "white", color: unit === u ? "white" : "#4B5563", cursor: "pointer" }}>
                  {u}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={labelStyle}>Age group</label>
            <select value={ageGroup} onChange={e => setAgeGroup(e.target.value)} style={{ ...inputStyle, width: "auto" }}>
              {["17-20", "21-27", "28-39", "40+"].map(a => <option key={a}>{a}</option>)}
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>Height ({unit})</label>
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} style={inputStyle} placeholder={unit === "in" ? "e.g. 70" : "e.g. 178"} />
          </div>
          <div>
            <label style={labelStyle}>Neck circumference ({unit})</label>
            <input type="number" value={neck} onChange={e => setNeck(e.target.value)} style={inputStyle} placeholder={unit === "in" ? "e.g. 15" : "e.g. 38"} />
          </div>
          <div>
            <label style={labelStyle}>Waist circumference ({unit})</label>
            <input type="number" value={waist} onChange={e => setWaist(e.target.value)} style={inputStyle} placeholder={unit === "in" ? "e.g. 32" : "e.g. 81"} />
          </div>
          {gender === "female" && (
            <div>
              <label style={labelStyle}>Hip circumference ({unit})</label>
              <input type="number" value={hip} onChange={e => setHip(e.target.value)} style={inputStyle} placeholder={unit === "in" ? "e.g. 38" : "e.g. 97"} />
            </div>
          )}
        </div>

        {result && (
          <div style={{ background: result.pass ? "#E8F5EE" : "#FFF0F0", borderRadius: "1rem", padding: "1.5rem", border: `2px solid ${result.pass ? "#C6E6D4" : "#FECACA"}` }}>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div style={{ background: "white", borderRadius: "0.75rem", padding: "1rem", textAlign: "center", border: "1.5px solid #E8E6DE" }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "2rem", color: result.category.color, lineHeight: 1 }}>{result.bf.toFixed(1)}%</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#6B7280", marginTop: "0.25rem" }}>Body Fat</div>
              </div>
              <div style={{ background: "white", borderRadius: "0.75rem", padding: "1rem", textAlign: "center", border: "1.5px solid #E8E6DE" }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.5rem", color: result.pass ? "#1B6B45" : "#E05252", lineHeight: 1 }}>{result.pass ? "PASS" : "FAIL"}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#6B7280", marginTop: "0.25rem" }}>Army Standard</div>
              </div>
              <div style={{ background: "white", borderRadius: "0.75rem", padding: "1rem", textAlign: "center", border: "1.5px solid #E8E6DE" }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1rem", color: result.category.color, lineHeight: 1.3 }}>{result.category.label}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#6B7280", marginTop: "0.25rem" }}>Category</div>
              </div>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", margin: 0 }}>
              Army standard for {gender}s aged {ageGroup}: <strong>≤ {standards[gender][ageGroup]}%</strong>. Your result is <strong>{result.bf.toFixed(1)}%</strong> — {result.pass ? "within" : "above"} the limit by <strong>{Math.abs(result.bf - standards[gender][ageGroup]).toFixed(1)}%</strong>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}