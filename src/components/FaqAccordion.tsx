/**
 * FaqAccordion.tsx — React island for interactive FAQ accordion
 * 
 * Loaded with client:visible (only hydrates when scrolled into view).
 * The static HTML fallback in ToolLayout.astro handles no-JS / crawlers.
 */
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { FAQItem } from "../lib/types";

interface Props {
  faqs: FAQItem[];
}

export default function FaqAccordion({ faqs }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {faqs.map((faq, i) => (
        <div
          key={i}
          style={{
            border: "1.5px solid",
            borderColor: openFaq === i ? "#1B6B45" : "#E8E6DE",
            borderRadius: "0.875rem",
            overflow: "hidden",
            transition: "border-color 0.15s",
            background: openFaq === i ? "#F7FBF9" : "white",
          }}
        >
          <button
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
            aria-expanded={openFaq === i}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem 1.25rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              gap: "1rem",
            }}
          >
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "0.95rem",
                color: "#1A1A1A",
                lineHeight: 1.4,
              }}
            >
              {faq.question}
            </span>
            <span style={{ flexShrink: 0, color: openFaq === i ? "#1B6B45" : "#9CA3AF" }}>
              {openFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </span>
          </button>
          {openFaq === i && (
            <div
              style={{
                padding: "0 1.25rem 1rem",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9rem",
                color: "#374151",
                lineHeight: 1.7,
                borderTop: "1px solid #E8F5EE",
                marginTop: "-0.25rem",
              }}
            >
              <p style={{ margin: "0.75rem 0 0" }}>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
