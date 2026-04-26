/*
 * MICROAPP — JSON Formatter Tool
 */
import { useState } from "react";
import { Copy, Minimize2, Maximize2 } from "lucide-react";
import { toast } from "sonner";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState(2);

  function format(): { result: string; error: string | null } {
    if (!input.trim()) return { result: "", error: null };
    try {
      const parsed = JSON.parse(input);
      return { result: JSON.stringify(parsed, null, indent), error: null };
    } catch (e: any) {
      return { result: "", error: e.message };
    }
  }

  function minify(): string {
    try {
      return JSON.stringify(JSON.parse(input));
    } catch {
      return "";
    }
  }

  const { result, error } = format();
  const minified = minify();

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A" }}>
            Indent spaces:
          </label>
          {[2, 4].map((n) => (
            <button
              key={n}
              onClick={() => setIndent(n)}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem",
                padding: "0.35rem 0.8rem", borderRadius: "9999px", border: "2px solid",
                borderColor: indent === n ? "#1B6B45" : "#E8E6DE",
                background: indent === n ? "#1B6B45" : "white",
                color: indent === n ? "white" : "#4B5563",
                transition: "all 0.15s ease",
              }}
            >
              {n} spaces
            </button>
          ))}
        </div>

        <div>
          <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>
            JSON Input
          </label>
          <textarea
            className="tool-textarea"
            placeholder={'Paste your JSON here…\n\nExample: {"name":"Microapp","tools":12}'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            style={{ fontFamily: "'Courier New', monospace", fontSize: "0.875rem" }}
          />
        </div>

        {error && (
          <div style={{ background: "#FFF0F0", border: "1.5px solid #FECACA", borderRadius: "0.875rem", padding: "0.875rem 1rem" }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#E05252", marginBottom: "0.2rem" }}>
              Invalid JSON
            </p>
            <p style={{ fontFamily: "'Courier New', monospace", fontSize: "0.8rem", color: "#E05252" }}>{error}</p>
          </div>
        )}

        {result && !error && (
          <div>
            <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>
              Formatted Output
            </label>
            <pre style={{ background: "#F7F6F1", border: "1.5px solid #E8E6DE", borderRadius: "0.875rem", padding: "1rem 1.25rem", fontFamily: "'Courier New', monospace", fontSize: "0.85rem", color: "#1A1A1A", overflowX: "auto", whiteSpace: "pre-wrap", wordBreak: "break-word", maxHeight: "400px", overflowY: "auto", lineHeight: 1.6 }}>
              {result}
            </pre>
            <div className="flex flex-wrap gap-2 mt-3">
              <button className="btn-primary" onClick={() => { navigator.clipboard.writeText(result); toast.success("Formatted JSON copied!"); }}>
                <Copy size={14} /> Copy formatted
              </button>
              {minified && (
                <button className="btn-outline" onClick={() => { navigator.clipboard.writeText(minified); toast.success("Minified JSON copied!"); }}>
                  <Minimize2 size={14} /> Copy minified
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}