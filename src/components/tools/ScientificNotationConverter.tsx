import { useState } from "react";

export default function ScientificNotationConverter() {

  const [input, setInput] = useState("45000");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState<"toSci" | "toStd">("toSci");

  const convert = () => {
    try {
      const num = parseFloat(input.replace(/[eE]/, "e"));
      if (isNaN(num)) { setResult("Invalid number"); return; }
      if (mode === "toSci") {
        const exp = Math.floor(Math.log10(Math.abs(num)));
        const coeff = num / Math.pow(10, exp);
        setResult(`${coeff.toPrecision(6).replace(/\.?0+$/, "")} × 10^${exp}`);
      } else {
        setResult(num.toLocaleString("en-US", { maximumFractionDigits: 20 }));
      }
    } catch { setResult("Error"); }
  };

  const faqs: FAQItem[] = [
    {
      question: "What is scientific notation?",
      answer: "Scientific notation expresses numbers as a × 10^b, where 1 ≤ |a| < 10. For example, 45,000 = 4.5 × 10^4 and 0.0032 = 3.2 × 10^-3.",
    },
    {
      question: "What is the difference between scientific and engineering notation?",
      answer: "Engineering notation restricts the exponent to multiples of 3 (e.g., 4.5 × 10^3 instead of 45 × 10^2), aligning with SI unit prefixes like kilo, mega, and milli.",
    },
    {
      question: "How do I convert 0.000056 to scientific notation?",
      answer: "Move the decimal right until you have one non-zero digit before it: 5.6. Count the moves: 5. Since you moved right, the exponent is negative: 5.6 × 10^-5.",
    },
  ];

  return (
    <div className="tool-widget-content">

      <div className="space-y-4">
        <div className="flex gap-3">
          <button onClick={() => setMode("toSci")} className={mode === "toSci" ? "btn-primary" : "btn-outline"}>Number → Scientific</button>
          <button onClick={() => setMode("toStd")} className={mode === "toStd" ? "btn-primary" : "btn-outline"}>Scientific → Number</button>
        </div>
        <input className="tool-input" value={input} onChange={e => setInput(e.target.value)} placeholder={mode === "toSci" ? "e.g. 45000" : "e.g. 4.5e4"} />
        <button className="btn-primary" onClick={convert}>Convert</button>
        {result && <div className="result-box"><span className="result-value">{result}</span></div>}
      </div>
    </div>
  );
}
