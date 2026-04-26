import { useState } from "react";

export default function GeometricMeanCalculator() {
  const [input, setInput] = useState("");

  const numbers = input.split(/[\s,\n]+/).map(Number).filter(n => !isNaN(n) && isFinite(n) && n > 0);

  const n = numbers.length;
  const geoMean = n > 0 ? Math.pow(numbers.reduce((a, b) => a * b, 1), 1 / n) : null;
  const arithMean = n > 0 ? numbers.reduce((a, b) => a + b, 0) / n : null;
  const harmMean = n > 0 ? n / numbers.reduce((a, b) => a + 1 / b, 0) : null;
  const sorted = [...numbers].sort((a, b) => a - b);
  const median = n > 0 ? (n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)]) : null;

  const stats = [
    { label: "Geometric Mean", value: geoMean, color: "#E8F5EE", accent: "#1B6B45" },
    { label: "Arithmetic Mean", value: arithMean, color: "#FFF9E0", accent: "#B8860B" },
    { label: "Harmonic Mean", value: harmMean, color: "#F0F4FF", accent: "#4F6EF7" },
    { label: "Median", value: median, color: "#FFF0F0", accent: "#E05252" },
  ];

  const faqs: FAQItem[] = [
    {
      question: "What is the geometric mean?",
      answer: "The geometric mean is a type of mean or average, which indicates the central tendency or typical value of a set of numbers by using the product of their values. It is particularly useful for sets of positive numbers that are averaged over time, such as growth rates.",
    },
    {
      question: "When should I use the geometric mean instead of the arithmetic mean?",
      answer: "The geometric mean is best used when dealing with percentages, growth rates, or values that are multiplied together, as it provides a more accurate average for these types of data. The arithmetic mean is suitable for additive data.",
    },
    {
      question: "Can the geometric mean be calculated with negative numbers or zero?",
      answer: "No, the geometric mean is typically defined only for sets of positive numbers. If any number in the set is zero, the geometric mean becomes zero. If there are negative numbers, the geometric mean can become undefined or complex.",
    },
    {
      question: "How is the geometric mean calculated?",
      answer: "To calculate the geometric mean, you multiply all the numbers in the set together and then take the nth root of the product, where 'n' is the count of numbers in the set.",
    },
    {
      question: "What is the relationship between geometric, arithmetic, and harmonic means?",
      answer: "For a set of positive numbers, the harmonic mean is always less than or equal to the geometric mean, which is always less than or equal to the arithmetic mean (HM ≤ GM ≤ AM). This relationship is known as the AM-GM-HM inequality.",
    },
  ];

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        <div>
          <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>
            Enter numbers (comma, space, or newline separated — must be positive)
          </label>
          <textarea
            className="tool-input w-full"
            rows={4}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="e.g. 2, 8, 4, 16, 32"
            style={{ resize: "vertical", fontFamily: "monospace", fontSize: "0.875rem" }}
          />
        </div>

        {n > 0 && (
          <>
            <div className="grid grid-cols-2 gap-3">
              {stats.map(s => (
                <div key={s.label} style={{ background: s.color, borderRadius: "0.875rem", padding: "1rem 1.25rem", border: "1.5px solid #E8E6DE" }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.6rem", color: s.accent, lineHeight: 1 }}>
                    {s.value !== null ? s.value.toFixed(4) : "—"}
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#6B7280", marginTop: "0.25rem" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {geoMean !== null && (
              <div style={{ background: "#F7F6F1", borderRadius: "0.875rem", padding: "1.25rem", border: "1.5px solid #E8E6DE" }}>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1B6B45", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Step-by-step: Geometric Mean
                </p>
                <div style={{ fontFamily: "monospace", fontSize: "0.875rem", color: "#374151", lineHeight: 1.8 }}>
                  <div>1. Multiply all {n} values: {numbers.join(" × ")} = {numbers.reduce((a, b) => a * b, 1).toExponential(4)}</div>
                  <div>2. Take the {n}th root: ({numbers.reduce((a, b) => a * b, 1).toExponential(4)})^(1/{n})</div>
                  <div style={{ color: "#1B6B45", fontWeight: 700 }}>3. Result = {geoMean.toFixed(6)}</div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}