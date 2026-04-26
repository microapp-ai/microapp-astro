/*
 * MICROAPP — Base64 Encoder / Decoder Tool
 */
import { useState } from "react";
import { Copy, ArrowDownUp } from "lucide-react";
import { toast } from "sonner";

export default function Base64Tool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");

  function process(): { result: string; error: string | null } {
    if (!input.trim()) return { result: "", error: null };
    try {
      if (mode === "encode") {
        return { result: btoa(unescape(encodeURIComponent(input))), error: null };
      } else {
        return { result: decodeURIComponent(escape(atob(input.trim()))), error: null };
      }
    } catch {
      return { result: "", error: mode === "decode" ? "Invalid Base64 string. Please check your input." : "Encoding failed." };
    }
  }

  const { result, error } = process();

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        {/* Mode toggle */}
        <div className="flex gap-2">
          {(["encode", "decode"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setInput(""); }}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem",
                padding: "0.5rem 1.25rem", borderRadius: "9999px", border: "2px solid",
                borderColor: mode === m ? "#1B6B45" : "#E8E6DE",
                background: mode === m ? "#1B6B45" : "white",
                color: mode === m ? "white" : "#4B5563",
                transition: "all 0.15s ease", textTransform: "capitalize",
              }}
            >
              {m}
            </button>
          ))}
        </div>

        <div>
          <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>
            {mode === "encode" ? "Plain text input" : "Base64 input"}
          </label>
          <textarea
            className="tool-textarea"
            placeholder={mode === "encode" ? "Enter text to encode…" : "Paste Base64 string to decode…"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={6}
            style={{ fontFamily: mode === "decode" ? "'Courier New', monospace" : "'Inter', sans-serif" }}
          />
        </div>

        {error && (
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#E05252", background: "#FFF0F0", padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1.5px solid #FECACA" }}>
            {error}
          </p>
        )}

        {result && !error && (
          <div>
            <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>
              {mode === "encode" ? "Base64 output" : "Decoded text"}
            </label>
            <div className="result-box" style={{ fontFamily: "'Courier New', monospace", wordBreak: "break-all", lineHeight: 1.6 }}>
              {result}
            </div>
            <div className="flex gap-2 mt-3">
              <button
                className="btn-primary"
                onClick={() => { navigator.clipboard.writeText(result); toast.success("Copied!"); }}
              >
                <Copy size={14} /> Copy result
              </button>
              <button
                className="btn-outline"
                onClick={() => { setMode(mode === "encode" ? "decode" : "encode"); setInput(result); }}
              >
                <ArrowDownUp size={14} /> Swap & reverse
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}