import { useState } from "react";

export default function HistogramMaker() {
  const [input, setInput] = useState("5,12,8,23,15,9,18,7,22,11,16,4,19,13,25,6,14,20,10,17");
  const [bins, setBins] = useState(5);

  const faqs: FAQItem[] = [
    {
      question: "What is a histogram and how does it work?",
      answer: "A histogram is a graphical representation of the distribution of numerical data. It works by dividing the entire range of values into a series of intervals (bins) and then counting how many values fall into each bin.",
    },
    {
      question: "How do I use the Histogram Maker?",
      answer: "Simply paste your numerical data (comma or space-separated) into the input box. The tool will automatically generate a histogram. You can adjust the number of bins using the slider to change the granularity of the distribution.",
    },
    {
      question: "What is the 'number of bins' and why is it important?",
      answer: "The 'number of bins' determines how many intervals the data range is divided into. It's important because it affects the appearance and interpretation of the histogram; too few bins can hide important features, while too many can make the distribution look noisy.",
    },
    {
      question: "Can I use this tool for large datasets?",
      answer: "Yes, the Histogram Maker can process a reasonable amount of numerical data. For extremely large datasets, performance might vary, but it's designed to handle typical data analysis needs efficiently.",
    },
    {
      question: "What kind of insights can I gain from a histogram?",
      answer: "Histograms help you understand the central tendency, variability, skewness, and modality of your data. You can identify patterns like normal distribution, bimodal distribution, or outliers at a glance.",
    },
  ];

  const numbers = input.split(/[\s,]+/).map(Number).filter(n => !isNaN(n) && isFinite(n));
  const min = numbers.length ? Math.min(...numbers) : 0;
  const max = numbers.length ? Math.max(...numbers) : 0;
  const range = max - min || 1;
  const binWidth = range / bins;

  const buckets = Array.from({ length: bins }, (_, i) => {
    const lo = min + i * binWidth;
    const hi = lo + binWidth;
    const count = numbers.filter(n => i === bins - 1 ? n >= lo && n <= hi : n >= lo && n < hi).length;
    return { lo, hi, count, label: `${lo.toFixed(1)}–${hi.toFixed(1)}` };
  });

  const maxCount = Math.max(...buckets.map(b => b.count), 1);

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        <div>
          <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>
            Numbers (comma or space separated)
          </label>
          <textarea
            className="tool-input w-full"
            rows={3}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="e.g. 5, 12, 8, 23, 15, 9, 18"
            style={{ resize: "vertical", fontFamily: "monospace", fontSize: "0.875rem" }}
          />
        </div>

        <div>
          <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>
            Number of bins: {bins}
          </label>
          <input type="range" min={2} max={20} value={bins} onChange={e => setBins(parseInt(e.target.value))} style={{ width: "100%", accentColor: "#1B6B45" }} />
        </div>

        {numbers.length > 1 && (
          <div style={{ background: "#F7F6F1", borderRadius: "0.875rem", padding: "1.5rem", border: "1.5px solid #E8E6DE" }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "1rem" }}>
              Distribution — {numbers.length} values, range {min}–{max}
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "160px" }}>
              {buckets.map((b, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
                  <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
                    <div
                      style={{
                        width: "100%",
                        height: `${(b.count / maxCount) * 100}%`,
                        minHeight: b.count > 0 ? "4px" : "0",
                        background: "linear-gradient(180deg, #1B6B45, #4ADE80)",
                        borderRadius: "4px 4px 0 0",
                        transition: "height 0.3s ease",
                        position: "relative",
                      }}
                    >
                      {b.count > 0 && (
                        <div style={{ position: "absolute", top: "-20px", left: "50%", transform: "translateX(-50%)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.7rem", color: "#1B6B45", whiteSpace: "nowrap" }}>
                          {b.count}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "4px", marginTop: "6px" }}>
              {buckets.map((b, i) => (
                <div key={i} style={{ flex: 1, fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: "#9CA3AF", textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {b.label}
                </div>
              ))}
            </div>
          </div>
        )}

        {numbers.length > 1 && (
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Count", value: numbers.length },
              { label: "Min", value: min },
              { label: "Max", value: max },
              { label: "Mean", value: (numbers.reduce((a, b) => a + b, 0) / numbers.length).toFixed(2) },
              { label: "Range", value: (max - min).toFixed(2) },
              { label: "Bins", value: bins },
            ].map(s => (
              <div key={s.label} style={{ background: "#E8F5EE", borderRadius: "0.75rem", padding: "0.75rem 1rem", border: "1.5px solid #C6E6D4" }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.25rem", color: "#1B6B45" }}>{s.value}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#6B7280" }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}