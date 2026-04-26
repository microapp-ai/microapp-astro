/*
 * MICROAPP — Case Converter Tool
 */
import { useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const conversions = [
  { label: "UPPERCASE", fn: (s: string) => s.toUpperCase() },
  { label: "lowercase", fn: (s: string) => s.toLowerCase() },
  { label: "Title Case", fn: (s: string) => s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()) },
  { label: "Sentence case", fn: (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() },
  { label: "camelCase", fn: (s: string) => s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()) },
  { label: "PascalCase", fn: (s: string) => s.replace(/(?:^|\W+)(\w)/g, (_, c) => c.toUpperCase()).replace(/\W/g, "") },
  { label: "snake_case", fn: (s: string) => s.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "") },
  { label: "kebab-case", fn: (s: string) => s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") },
];

export default function CaseConverter() {
  const [text, setText] = useState("");
  const [active, setActive] = useState(0);

  const result = text ? conversions[active].fn(text) : "";

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        <textarea
          className="tool-textarea"
          placeholder="Type or paste your text here…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
        />

        <div className="flex flex-wrap gap-2">
          {conversions.map((c, i) => (
            <button
              key={c.label}
              onClick={() => setActive(i)}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem",
                padding: "0.4rem 0.9rem", borderRadius: "9999px", border: "2px solid",
                borderColor: active === i ? "#1B6B45" : "#E8E6DE",
                background: active === i ? "#1B6B45" : "white",
                color: active === i ? "white" : "#4B5563",
                transition: "all 0.15s ease",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {text && (
          <div>
            <div className="result-box" style={{ fontFamily: "'Inter', sans-serif", wordBreak: "break-all" }}>
              {result}
            </div>
            <button
              className="btn-primary mt-3"
              onClick={() => { navigator.clipboard.writeText(result); toast.success("Copied!"); }}
            >
              <Copy size={14} /> Copy result
            </button>
          </div>
        )}
      </div>
    </div>
  );
}