import { useState } from "react";

const states = [
  { name: "Alabama", abbr: "AL", capital: "Montgomery", region: "South" },
  { name: "Alaska", abbr: "AK", capital: "Juneau", region: "West" },
  { name: "Arizona", abbr: "AZ", capital: "Phoenix", region: "West" },
  { name: "Arkansas", abbr: "AR", capital: "Little Rock", region: "South" },
  { name: "California", abbr: "CA", capital: "Sacramento", region: "West" },
  { name: "Colorado", abbr: "CO", capital: "Denver", region: "West" },
  { name: "Connecticut", abbr: "CT", capital: "Hartford", region: "Northeast" },
  { name: "Delaware", abbr: "DE", capital: "Dover", region: "Northeast" },
  { name: "Florida", abbr: "FL", capital: "Tallahassee", region: "South" },
  { name: "Georgia", abbr: "GA", capital: "Atlanta", region: "South" },
  { name: "Hawaii", abbr: "HI", capital: "Honolulu", region: "West" },
  { name: "Idaho", abbr: "ID", capital: "Boise", region: "West" },
  { name: "Illinois", abbr: "IL", capital: "Springfield", region: "Midwest" },
  { name: "Indiana", abbr: "IN", capital: "Indianapolis", region: "Midwest" },
  { name: "Iowa", abbr: "IA", capital: "Des Moines", region: "Midwest" },
  { name: "Kansas", abbr: "KS", capital: "Topeka", region: "Midwest" },
  { name: "Kentucky", abbr: "KY", capital: "Frankfort", region: "South" },
  { name: "Louisiana", abbr: "LA", capital: "Baton Rouge", region: "South" },
  { name: "Maine", abbr: "ME", capital: "Augusta", region: "Northeast" },
  { name: "Maryland", abbr: "MD", capital: "Annapolis", region: "Northeast" },
  { name: "Massachusetts", abbr: "MA", capital: "Boston", region: "Northeast" },
  { name: "Michigan", abbr: "MI", capital: "Lansing", region: "Midwest" },
  { name: "Minnesota", abbr: "MN", capital: "Saint Paul", region: "Midwest" },
  { name: "Mississippi", abbr: "MS", capital: "Jackson", region: "South" },
  { name: "Missouri", abbr: "MO", capital: "Jefferson City", region: "Midwest" },
  { name: "Montana", abbr: "MT", capital: "Helena", region: "West" },
  { name: "Nebraska", abbr: "NE", capital: "Lincoln", region: "Midwest" },
  { name: "Nevada", abbr: "NV", capital: "Carson City", region: "West" },
  { name: "New Hampshire", abbr: "NH", capital: "Concord", region: "Northeast" },
  { name: "New Jersey", abbr: "NJ", capital: "Trenton", region: "Northeast" },
  { name: "New Mexico", abbr: "NM", capital: "Santa Fe", region: "West" },
  { name: "New York", abbr: "NY", capital: "Albany", region: "Northeast" },
  { name: "North Carolina", abbr: "NC", capital: "Raleigh", region: "South" },
  { name: "North Dakota", abbr: "ND", capital: "Bismarck", region: "Midwest" },
  { name: "Ohio", abbr: "OH", capital: "Columbus", region: "Midwest" },
  { name: "Oklahoma", abbr: "OK", capital: "Oklahoma City", region: "South" },
  { name: "Oregon", abbr: "OR", capital: "Salem", region: "West" },
  { name: "Pennsylvania", abbr: "PA", capital: "Harrisburg", region: "Northeast" },
  { name: "Rhode Island", abbr: "RI", capital: "Providence", region: "Northeast" },
  { name: "South Carolina", abbr: "SC", capital: "Columbia", region: "South" },
  { name: "South Dakota", abbr: "SD", capital: "Pierre", region: "Midwest" },
  { name: "Tennessee", abbr: "TN", capital: "Nashville", region: "South" },
  { name: "Texas", abbr: "TX", capital: "Austin", region: "South" },
  { name: "Utah", abbr: "UT", capital: "Salt Lake City", region: "West" },
  { name: "Vermont", abbr: "VT", capital: "Montpelier", region: "Northeast" },
  { name: "Virginia", abbr: "VA", capital: "Richmond", region: "South" },
  { name: "Washington", abbr: "WA", capital: "Olympia", region: "West" },
  { name: "West Virginia", abbr: "WV", capital: "Charleston", region: "South" },
  { name: "Wisconsin", abbr: "WI", capital: "Madison", region: "Midwest" },
  { name: "Wyoming", abbr: "WY", capital: "Cheyenne", region: "West" },
];

const regionColors: Record<string, string> = {
  Northeast: "#E8F5EE", South: "#FFF9E0", Midwest: "#F0F4FF", West: "#FFF0F0"
};
const regionAccents: Record<string, string> = {
  Northeast: "#1B6B45", South: "#B8860B", Midwest: "#4F6EF7", West: "#E05252"
};

export default function RandomStateGenerator() {
  const [count, setCount] = useState(1);
  const [results, setResults] = useState<typeof states>([]);
  const [copied, setCopied] = useState<number | null>(null);

  function generate() {
    const shuffled = [...states].sort(() => Math.random() - 0.5);
    setResults(shuffled.slice(0, count));
  }

  function copy(s: typeof states[0], i: number) {
    navigator.clipboard.writeText(`${s.name} (${s.abbr}) — Capital: ${s.capital} — Region: ${s.region}`);
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        <div className="flex items-center gap-4 flex-wrap">
          <div>
            <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>
              How many states?
            </label>
            <div className="flex gap-2">
              {[1, 5, 10].map(n => (
                <button key={n} onClick={() => setCount(n)} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", padding: "0.4rem 1rem", borderRadius: "9999px", border: "2px solid", borderColor: count === n ? "#1B6B45" : "#E8E6DE", background: count === n ? "#1B6B45" : "white", color: count === n ? "white" : "#4B5563", cursor: "pointer" }}>
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div style={{ paddingTop: "1.5rem" }}>
            <button onClick={generate} className="btn-primary">Generate</button>
          </div>
        </div>

        {results.length > 0 && (
          <div className="space-y-3">
            {results.map((s, i) => (
              <div key={i} style={{ background: regionColors[s.region] || "#F7F6F1", borderRadius: "0.875rem", padding: "1rem 1.25rem", border: "1.5px solid #E8E6DE", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.15rem", color: "#1A1A1A" }}>
                    {s.name} <span style={{ fontWeight: 600, color: "#6B7280", fontSize: "0.9rem" }}>({s.abbr})</span>
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#6B7280", marginTop: "0.2rem" }}>
                    Capital: <strong>{s.capital}</strong> &nbsp;·&nbsp;
                    <span style={{ color: regionAccents[s.region], fontWeight: 700 }}>{s.region}</span>
                  </div>
                </div>
                <button onClick={() => copy(s, i)} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: copied === i ? "#1B6B45" : "#4B5563", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "9999px", padding: "0.3rem 0.85rem", cursor: "pointer", flexShrink: 0 }}>
                  {copied === i ? "✓ Copied!" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}