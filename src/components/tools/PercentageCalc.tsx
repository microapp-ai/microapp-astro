/*
 * MICROAPP — Percentage Calculator Tool
 */
import { useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";

type Mode = "of" | "is" | "change";

export default function PercentageCalc() {
  const [mode, setMode] = useState<Mode>("of");
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  function compute(): string {
    const x = parseFloat(a);
    const y = parseFloat(b);
    if (isNaN(x) || isNaN(y)) return "";
    if (mode === "of") return `${((x / 100) * y).toFixed(4).replace(/\.?0+$/, "")}`;
    if (mode === "is") return `${((x / y) * 100).toFixed(4).replace(/\.?0+$/, "")}%`;
    if (mode === "change") return `${(((y - x) / Math.abs(x)) * 100).toFixed(4).replace(/\.?0+$/, "")}%`;
    return "";
  }

  const result = compute();

  const modes: { id: Mode; label: string; aLabel: string; bLabel: string; question: string }[] = [
    { id: "of", label: "X% of Y", aLabel: "Percentage (%)", bLabel: "Of what number?", question: "What is X% of Y?" },
    { id: "is", label: "X (the part)", aLabel: "X (the part)", bLabel: "Y (the whole)", question: "X is what percent of Y?" },
    { id: "change", label: "% change", aLabel: "Original value", bLabel: "New value", question: "Percentage change from X to Y?" },
  ];

  const current = modes.find((m) => m.id === mode)!;

  const faqs: FAQItem[] = [
    {
      question: "How do I calculate a percentage of a number?",
      answer: "To find X% of Y, select the 'X% of Y' mode. Enter the percentage in the first field and the total number in the second field. The tool will then display the calculated part.",
    },
    {
      question: "What does 'X is what % of Y' mean?",
      answer: "This mode helps you determine what percentage one number (X) represents of another number (Y). For example, if you want to know what percentage 20 is of 100, you would use this mode.",
    },
    {
      question: "Can I calculate percentage change with this tool?",
      answer: "Yes, the 'Percentage change' mode allows you to calculate the percentage increase or decrease between an original value and a new value. Input the original value first, followed by the new value.",
    },
    {
      question: "Is this calculator suitable for financial calculations?",
      answer: "Absolutely. This percentage calculator is ideal for various financial calculations, such as interest rates, discounts, markups, and profit margins, by providing accurate percentage results.",
    },
    {
      question: "Why is percentage calculation important?",
      answer: "Percentage calculations are crucial for understanding proportions, growth, and decline in many real-world scenarios, including finance, statistics, and everyday shopping discounts.",
    },
  ];

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        {/* Mode selector */}
        <div className="flex flex-wrap gap-2">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => { setMode(m.id); setA(""); setB(""); }}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem",
                padding: "0.45rem 1rem", borderRadius: "9999px", border: "2px solid",
                borderColor: mode === m.id ? "#1B6B45" : "#E8E6DE",
                background: mode === m.id ? "#1B6B45" : "white",
                color: mode === m.id ? "white" : "#4B5563",
                transition: "all 0.15s ease",
              }}
            >
              {m.label}
            </button>
          ))}
        </div>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#6B7280" }}>
          {current.question}
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>
              {current.aLabel}
            </label>
            <input type="number" className="tool-input" placeholder="0" value={a} onChange={(e) => setA(e.target.value)} />
          </div>
          <div>
            <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>
              {current.bLabel}
            </label>
            <input type="number" className="tool-input" placeholder="0" value={b} onChange={(e) => setB(e.target.value)} />
          </div>
        </div>

        {result && (
          <div style={{ background: "#E8F5EE", border: "1.5px solid #B7DFC8", borderRadius: "0.875rem", padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#1B6B45", marginBottom: "0.2rem" }}>Result</div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "2rem", color: "#1B6B45" }}>{result}</div>
            </div>
            <button
              onClick={() => { navigator.clipboard.writeText(result); toast.success("Copied!"); }}
              style={{ padding: "0.5rem", borderRadius: "0.5rem", background: "white", border: "1.5px solid #B7DFC8", color: "#1B6B45" }}
            >
              <Copy size={16} />
            </button>
          </div>
        )}
      </div>
    
      {/* ── Long-Form Content ── */}
      <div className="max-w-3xl mt-14 pt-10 border-t border-[#E8E6DE]">
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#1A1A1A", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
          How Percentage Calculations Work
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1.5rem" }}>
          A percentage is a way of expressing a number as a fraction of 100. The word comes from the Latin 'per centum', meaning 'by the hundred'. Percentages are used everywhere — from calculating discounts and tax rates to expressing test scores and investment returns. There are three core percentage problems: finding X% of Y, finding what percentage X is of Y, and finding the percentage change between two values.
        </p>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          Three Core Calculations Explained
        </h3>
        <div style={{ background: "#F7F6F1", border: "1.5px solid #E8E6DE", borderRadius: "0.875rem", padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#374151", lineHeight: 1.75, margin: 0 }}>
            1. What is 15% of $85? → 85 × 0.15 = $12.75. 2. 45 is what percent of 180? → (45 ÷ 180) × 100 = 25%. 3. A price went from $40 to $52 — what is the percentage increase? → ((52 − 40) ÷ 40) × 100 = 30%.
          </p>
        </div>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          Common Percentage Quick Reference
        </h3>
        <div style={{ overflowX: "auto", borderRadius: "0.875rem", border: "1.5px solid #E8E6DE" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#F7F6F1" }}>
              <tr>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>Percentage</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>Fraction</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>Decimal</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>Quick Trick</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: "#FAFAF7" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>10%</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>1/10</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>0.10</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Divide by 10</td>
              </tr>
              <tr style={{ background: "white" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>20%</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>1/5</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>0.20</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Divide by 5</td>
              </tr>
              <tr style={{ background: "#FAFAF7" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>25%</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>1/4</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>0.25</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Divide by 4</td>
              </tr>
              <tr style={{ background: "white" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>33.3%</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>1/3</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>0.333</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Divide by 3</td>
              </tr>
              <tr style={{ background: "#FAFAF7" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>50%</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>1/2</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>0.50</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Divide by 2</td>
              </tr>
              <tr style={{ background: "white" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>75%</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>3/4</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>0.75</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Multiply by 0.75</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}