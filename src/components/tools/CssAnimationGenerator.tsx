import { useState } from "react";

const animTypes = ["fade", "slide-up", "slide-left", "bounce", "spin", "pulse", "shake"];
const timingFns = ["ease", "linear", "ease-in", "ease-out", "ease-in-out"];
const directions = ["normal", "reverse", "alternate", "alternate-reverse"];

function buildKeyframes(type: string): string {
  switch (type) {
    case "fade": return `@keyframes fade {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}`;
    case "slide-up": return `@keyframes slide-up {\n  from { transform: translateY(40px); opacity: 0; }\n  to { transform: translateY(0); opacity: 1; }\n}`;
    case "slide-left": return `@keyframes slide-left {\n  from { transform: translateX(-40px); opacity: 0; }\n  to { transform: translateX(0); opacity: 1; }\n}`;
    case "bounce": return `@keyframes bounce {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-20px); }\n}`;
    case "spin": return `@keyframes spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}`;
    case "pulse": return `@keyframes pulse {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.15); }\n}`;
    case "shake": return `@keyframes shake {\n  0%, 100% { transform: translateX(0); }\n  20%, 60% { transform: translateX(-8px); }\n  40%, 80% { transform: translateX(8px); }\n}`;
    default: return "";
  }
}

export default function CssAnimationGenerator() {
  const [type, setType] = useState("fade");
  const [duration, setDuration] = useState(1);
  const [timing, setTiming] = useState("ease");
  const [iterations, setIterations] = useState("infinite");
  const [direction, setDirection] = useState("normal");
  const [copied, setCopied] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);

  const animProp = `animation: ${type} ${duration}s ${timing} ${iterations} ${direction};`;
  const keyframes = buildKeyframes(type);
  const fullCss = `${keyframes}\n\n.animated-element {\n  ${animProp}\n}`;

  function copy() {
    navigator.clipboard.writeText(fullCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const previewStyle: React.CSSProperties = {
    width: "80px", height: "80px", borderRadius: "1rem",
    background: "linear-gradient(135deg, #1B6B45, #4ADE80)",
    animationName: type, animationDuration: `${duration}s`,
    animationTimingFunction: timing,
    animationIterationCount: iterations === "infinite" ? "infinite" : parseInt(iterations),
    animationDirection: direction as any,
  };

  const labelStyle: React.CSSProperties = { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" };
  const selectStyle: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#1A1A1A", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "0.5rem", padding: "0.45rem 0.75rem", outline: "none" };

  return (
    <div className="tool-widget-content">
      <style>{`
        @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slide-left { from { transform: translateX(-40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.15); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 20%, 60% { transform: translateX(-8px); } 40%, 80% { transform: translateX(8px); } }
      `}</style>

      <div className="space-y-5">
        {/* Controls */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>Animation type</label>
            <select value={type} onChange={e => setType(e.target.value)} style={{ ...selectStyle, width: "100%" }}>
              {animTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Duration: {duration}s</label>
            <input type="range" min={0.1} max={5} step={0.1} value={duration} onChange={e => setDuration(parseFloat(e.target.value))} style={{ width: "100%", accentColor: "#1B6B45" }} />
          </div>
          <div>
            <label style={labelStyle}>Timing function</label>
            <select value={timing} onChange={e => setTiming(e.target.value)} style={{ ...selectStyle, width: "100%" }}>
              {timingFns.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Iterations</label>
            <select value={iterations} onChange={e => setIterations(e.target.value)} style={{ ...selectStyle, width: "100%" }}>
              {["1","2","3","infinite"].map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Direction</label>
            <select value={direction} onChange={e => setDirection(e.target.value)} style={{ ...selectStyle, width: "100%" }}>
              {directions.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
        </div>

        {/* Preview */}
        <div style={{ background: "#F7F6F1", borderRadius: "0.875rem", padding: "2rem", border: "1.5px solid #E8E6DE", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>Live Preview</p>
          <div key={previewKey} style={previewStyle} />
          <button onClick={() => setPreviewKey(k => k + 1)} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#1B6B45", background: "#E8F5EE", border: "1.5px solid #C6E6D4", borderRadius: "9999px", padding: "0.3rem 0.85rem", cursor: "pointer" }}>
            Replay
          </button>
        </div>

        {/* Code output */}
        <div style={{ background: "#1A1A1A", borderRadius: "0.875rem", padding: "1.25rem" }}>
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em" }}>CSS Code</span>
            <button onClick={copy} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: copied ? "#4ADE80" : "#FFE234", background: "transparent", border: "1.5px solid", borderColor: copied ? "#4ADE80" : "#FFE234", borderRadius: "9999px", padding: "0.25rem 0.75rem", cursor: "pointer" }}>
              {copied ? "✓ Copied!" : "Copy CSS"}
            </button>
          </div>
          <pre style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "#E5E7EB", whiteSpace: "pre-wrap", margin: 0 }}>{fullCss}</pre>
        </div>
      </div>
    </div>
  );
}