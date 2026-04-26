import { useState } from "react";

export default function SquareRootCalculator() {

  const [num, setNum] = useState("144");
  const [n, setN] = useState("2");
  const [result, setResult] = useState("");

  const calculate = () => {
    const x = parseFloat(num), nth = parseFloat(n);
    if (isNaN(x) || isNaN(nth) || nth === 0) { setResult("Invalid input"); return; }
    if (x < 0 && nth % 2 === 0) { setResult("Cannot take even root of negative number"); return; }
    const sign = x < 0 ? -1 : 1;
    const val = sign * Math.pow(Math.abs(x), 1/nth);
    const isExact = Math.abs(Math.round(val) - val) < 1e-10;
    setResult(isExact ? String(Math.round(val)) : val.toFixed(8).replace(/0+$/,""));
  };

  const faqs: FAQItem[] = [
    {
      question: "What is a perfect square?",
      answer: "A perfect square is a number whose square root is a whole integer. Examples: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100. √25 = 5 exactly.",
    },
    {
      question: "What is an irrational square root?",
      answer: "Most square roots are irrational — they cannot be expressed as a simple fraction. For example, √2 = 1.41421356… and the digits never repeat or terminate.",
    },
    {
      question: "How do I calculate a cube root?",
      answer: "The cube root of n is the value x such that x³ = n. For example, ∛27 = 3 because 3³ = 27. Use the nth root option and set n=3.",
    },
  ];

  return (
    <div className="tool-widget-content">

      <div className="space-y-4">
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Number</label>
            <input className="tool-input" value={num} onChange={e => setNum(e.target.value)} placeholder="144" />
          </div>
          <div style={{width:"100px"}}>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Root (n)</label>
            <input className="tool-input" value={n} onChange={e => setN(e.target.value)} placeholder="2" />
          </div>
        </div>
        <button className="btn-primary" onClick={calculate}>Calculate</button>
        {result && <div className="result-box"><span className="result-label">{n === "2" ? "√" : `${n}√`}{num} =</span><span className="result-value">{result}</span></div>}
      </div>
    </div>
  );
}
