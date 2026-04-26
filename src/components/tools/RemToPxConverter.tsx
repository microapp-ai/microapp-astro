import { useState } from "react";

export default function RemToPxConverter() {
  const [baseFontSize, setBaseFontSize] = useState(16);
  const [remInput, setRemInput] = useState("");
  const [pxInput, setPxInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const remToPx = remInput ? (parseFloat(remInput) * baseFontSize).toFixed(4) : "";
  const pxToRem = pxInput ? (parseFloat(pxInput) / baseFontSize).toFixed(6) : "";

  function copy(val: string, key: string) {
    navigator.clipboard.writeText(val);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  const commonSizes = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6];

  const labelStyle: React.CSSProperties = { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" };
  const inputStyle: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#1A1A1A", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "0.5rem", padding: "0.5rem 0.75rem", outline: "none", width: "100%" };

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        <div>
          <label style={labelStyle}>Base font size: {baseFontSize}px</label>
          <input type="range" min={8} max={32} value={baseFontSize} onChange={e => setBaseFontSize(parseInt(e.target.value))} style={{ width: "100%", accentColor: "#1B6B45" }} />
          <div className="flex gap-2 mt-2">
            {[12, 14, 16, 18, 20].map(s => (
              <button key={s} onClick={() => setBaseFontSize(s)} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.75rem", padding: "0.25rem 0.6rem", borderRadius: "9999px", border: "1.5px solid", borderColor: baseFontSize === s ? "#1B6B45" : "#E8E6DE", background: baseFontSize === s ? "#1B6B45" : "white", color: baseFontSize === s ? "white" : "#4B5563", cursor: "pointer" }}>
                {s}px
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div style={{ background: "#F7F6F1", borderRadius: "0.875rem", padding: "1.25rem", border: "1.5px solid #E8E6DE" }}>
            <label style={labelStyle}>REM → PX</label>
            <input type="number" value={remInput} onChange={e => setRemInput(e.target.value)} style={inputStyle} placeholder="e.g. 1.5" step="0.01" />
            {remToPx && (
              <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#1B6B45" }}>{remToPx}px</span>
                <button onClick={() => copy(remToPx + "px", "rem")} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: copied === "rem" ? "#1B6B45" : "#4B5563", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "9999px", padding: "0.25rem 0.75rem", cursor: "pointer" }}>
                  {copied === "rem" ? "✓" : "Copy"}
                </button>
              </div>
            )}
          </div>

          <div style={{ background: "#F7F6F1", borderRadius: "0.875rem", padding: "1.25rem", border: "1.5px solid #E8E6DE" }}>
            <label style={labelStyle}>PX → REM</label>
            <input type="number" value={pxInput} onChange={e => setPxInput(e.target.value)} style={inputStyle} placeholder="e.g. 24" step="1" />
            {pxToRem && (
              <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#1B6B45" }}>{pxToRem}rem</span>
                <button onClick={() => copy(pxToRem + "rem", "px")} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: copied === "px" ? "#1B6B45" : "#4B5563", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "9999px", padding: "0.25rem 0.75rem", cursor: "pointer" }}>
                  {copied === "px" ? "✓" : "Copy"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Reference table */}
        <div style={{ background: "#F7F6F1", borderRadius: "0.875rem", padding: "1.25rem", border: "1.5px solid #E8E6DE" }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>
            Common sizes at {baseFontSize}px base
          </p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "0.4rem 0.75rem", color: "#9CA3AF", fontWeight: 600, borderBottom: "1.5px solid #E8E6DE" }}>REM</th>
                  <th style={{ textAlign: "left", padding: "0.4rem 0.75rem", color: "#9CA3AF", fontWeight: 600, borderBottom: "1.5px solid #E8E6DE" }}>PX</th>
                  <th style={{ textAlign: "left", padding: "0.4rem 0.75rem", color: "#9CA3AF", fontWeight: 600, borderBottom: "1.5px solid #E8E6DE" }}>Tailwind approx.</th>
                </tr>
              </thead>
              <tbody>
                {commonSizes.map(rem => {
                  const px = rem * baseFontSize;
                  const tw = px <= 4 ? "1" : px <= 8 ? "2" : px <= 12 ? "3" : px <= 16 ? "4" : px <= 20 ? "5" : px <= 24 ? "6" : px <= 32 ? "8" : px <= 40 ? "10" : px <= 48 ? "12" : px <= 64 ? "16" : px <= 80 ? "20" : px <= 96 ? "24" : "—";
                  return (
                    <tr key={rem} style={{ borderBottom: "1px solid #F0EEE8" }}>
                      <td style={{ padding: "0.4rem 0.75rem", fontFamily: "monospace", color: "#1B6B45", fontWeight: 600 }}>{rem}rem</td>
                      <td style={{ padding: "0.4rem 0.75rem", color: "#1A1A1A" }}>{px}px</td>
                      <td style={{ padding: "0.4rem 0.75rem", color: "#6B7280" }}>tw-{tw}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}