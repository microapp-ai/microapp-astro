import { useState } from "react";

export default function LineBreakRemovalTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"all" | "extra" | "trim">("all");
  const [copied, setCopied] = useState(false);

  function process(text: string): string {
    if (mode === "all") return text.replace(/\r?\n/g, " ").replace(/  +/g, " ").trim();
    if (mode === "extra") return text.replace(/(\r?\n){2,}/g, "\n\n").trim();
    if (mode === "trim") return text.split(/\r?\n/).map(l => l.trim()).join("\n").trim();
    return text;
  }

  const output = process(input);

  function copy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const modes = [
    { key: "all", label: "Remove all line breaks" },
    { key: "extra", label: "Remove extra blank lines" },
    { key: "trim", label: "Trim whitespace per line" },
  ] as const;

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        <div>
          <label style={{ fontFamily: "\'Plus Jakarta Sans\', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>Mode</label>
          <div className="flex flex-col gap-2">
            {modes.map(m => (
              <label key={m.key} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontFamily: "\'Inter\', sans-serif", fontSize: "0.9rem", color: "#374151", cursor: "pointer" }}>
                <input type="radio" name="mode" value={m.key} checked={mode === m.key} onChange={() => setMode(m.key)} style={{ accentColor: "#1B6B45" }} />
                {m.label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label style={{ fontFamily: "\'Plus Jakarta Sans\', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>Input text</label>
          <textarea className="tool-input w-full" rows={6} value={input} onChange={e => setInput(e.target.value)} placeholder="Paste your text here…" style={{ resize: "vertical" }} />
        </div>

        {input && (
          <div style={{ background: "#F7F6F1", borderRadius: "0.875rem", padding: "1.25rem", border: "1.5px solid #E8E6DE" }}>
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontFamily: "\'Plus Jakarta Sans\', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>Result</span>
              <button onClick={copy} style={{ fontFamily: "\'Plus Jakarta Sans\', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: copied ? "#1B6B45" : "#4B5563", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "9999px", padding: "0.25rem 0.75rem", cursor: "pointer" }}>
                {copied ? "✓ Copied!" : "Copy"}
              </button>
            </div>
            <pre style={{ fontFamily: "\'Inter\', sans-serif", fontSize: "0.875rem", color: "#1A1A1A", whiteSpace: "pre-wrap", lineHeight: 1.65, margin: 0 }}>{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
