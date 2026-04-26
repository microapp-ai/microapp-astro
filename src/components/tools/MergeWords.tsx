import { useState } from "react";

export default function MergeWords() {
  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const w1 = word1.trim();
  const w2 = word2.trim();

  const blends = w1 && w2 ? [
    { label: "Portmanteau (1→2)", value: w1.slice(0, Math.ceil(w1.length / 2)) + w2.slice(Math.floor(w2.length / 2)) },
    { label: "Portmanteau (2→1)", value: w2.slice(0, Math.ceil(w2.length / 2)) + w1.slice(Math.floor(w1.length / 2)) },
    { label: "Interleaved", value: w1.split("").map((c, i) => c + (w2[i] || "")).join("") },
    { label: "Concatenated", value: w1 + w2 },
    { label: "Reversed concat", value: w2 + w1 },
  ] : [];

  function copy(val: string, label: string) {
    navigator.clipboard.writeText(val);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  }

  const inputStyle: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#1A1A1A", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "0.5rem", padding: "0.5rem 0.75rem", width: "100%", outline: "none" };

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>First word</label>
            <input type="text" value={word1} onChange={e => setWord1(e.target.value)} style={inputStyle} placeholder="e.g. smoke" />
          </div>
          <div>
            <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>Second word</label>
            <input type="text" value={word2} onChange={e => setWord2(e.target.value)} style={inputStyle} placeholder="e.g. fog" />
          </div>
        </div>

        {blends.length > 0 && (
          <div className="space-y-3">
            {blends.map(b => (
              <div key={b.label} style={{ background: "#F7F6F1", borderRadius: "0.875rem", padding: "1rem 1.25rem", border: "1.5px solid #E8E6DE", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.2rem" }}>{b.label}</div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "#1A1A1A" }}>{b.value}</div>
                </div>
                <button onClick={() => copy(b.value, b.label)} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: copied === b.label ? "#1B6B45" : "#4B5563", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "9999px", padding: "0.3rem 0.85rem", cursor: "pointer", flexShrink: 0 }}>
                  {copied === b.label ? "✓ Copied!" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}