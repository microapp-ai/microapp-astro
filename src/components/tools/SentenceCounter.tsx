import { useState } from "react";

export default function SentenceCounter() {
  const [text, setText] = useState("");

  const sentences = text.trim() ? (text.match(/[^.!?]+[.!?]+/g) || []).length : 0;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0;
  const avgWordsPerSentence = sentences > 0 ? Math.round(words / sentences) : 0;

  const stats = [
    { label: "Sentences", value: sentences, color: "#E8F5EE", accent: "#1B6B45" },
    { label: "Words", value: words, color: "#FFF9E0", accent: "#B8860B" },
    { label: "Characters", value: chars, color: "#F0F4FF", accent: "#4F6EF7" },
    { label: "Paragraphs", value: paragraphs, color: "#FFF0F0", accent: "#E05252" },
    { label: "Avg words/sentence", value: avgWordsPerSentence, color: "#F5F0FF", accent: "#7C3AED" },
  ];

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        <div>
          <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#1A1A1A", display: "block", marginBottom: "0.5rem" }}>
            Paste or type your text
          </label>
          <textarea
            className="tool-input w-full"
            rows={7}
            placeholder="Start typing or paste your text here…"
            value={text}
            onChange={e => setText(e.target.value)}
            style={{ resize: "vertical" }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {stats.map(s => (
            <div key={s.label} style={{ background: s.color, borderRadius: "0.875rem", padding: "1rem 1.25rem", border: "1.5px solid #E8E6DE" }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.8rem", color: s.accent, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#6B7280", marginTop: "0.25rem" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {text && (
          <button
            onClick={() => setText("")}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#6B7280", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "9999px", padding: "0.4rem 1rem", cursor: "pointer" }}
          >
            Clear text
          </button>
        )}
      </div>
    </div>
  );
}