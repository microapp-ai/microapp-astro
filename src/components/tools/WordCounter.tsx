/*
 * MICROAPP — Word Counter Tool
 * Basecamp-inspired: clean white, forest green accents, friendly UX
 * NOTE: The SEO article section has been moved to ToolLayout.astro (rendered server-side
 * from the seo_article field in Supabase) so it can be translated per locale.
 */
import { useState } from "react";
import { Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export default function WordCounter() {
  const [text, setText] = useState("");

  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  const paragraphs = text.trim() === "" ? 0 : text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  const stats = [
    { label: "Words", value: words },
    { label: "Characters", value: chars },
    { label: "Chars (no spaces)", value: charsNoSpaces },
    { label: "Sentences", value: sentences },
    { label: "Paragraphs", value: paragraphs },
    { label: "Reading time", value: `~${readingTime} min` },
  ];

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        <div className="relative">
          <textarea
            className="tool-textarea"
            placeholder="Start typing or paste your text here…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
          />
          {text && (
            <button
              onClick={() => setText("")}
              className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-[#F7F6F1] transition-colors"
              title="Clear text"
            >
              <RotateCcw size={15} style={{ color: "#9CA3AF" }} />
            </button>
          )}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              style={{ background: "#F7F6F1", border: "1.5px solid #E8E6DE", borderRadius: "0.875rem", padding: "1rem 1.25rem" }}
            >
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "#1B6B45", lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#6B7280", marginTop: "0.25rem" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {text && (
          <button
            className="btn-outline"
            onClick={() => { navigator.clipboard.writeText(text); toast.success("Text copied!"); }}
          >
            <Copy size={14} /> Copy text
          </button>
        )}
      </div>
    </div>
  );
}
