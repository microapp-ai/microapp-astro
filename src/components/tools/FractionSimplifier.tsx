import { useState } from "react";

export default function FractionSimplifier() {

  const [num, setNum] = useState("12");
  const [den, setDen] = useState("18");
  const [result, setResult] = useState("");

  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

  const simplify = () => {
    const n = parseInt(num), d = parseInt(den);
    if (isNaN(n) || isNaN(d) || d === 0) { setResult("Invalid input"); return; }
    const g = gcd(Math.abs(n), Math.abs(d));
    const sn = n / g, sd = d / g;
    const sign = sd < 0 ? -1 : 1;
    setResult(sd === 1 ? `${sn * sign}` : `${sn * sign}/${Math.abs(sd)}`);
  };

  const faqs: FAQItem[] = [
    {
      question: "How do you simplify a fraction?",
      answer: "Divide both the numerator and denominator by their Greatest Common Divisor (GCD). For example, 12/18: GCD(12,18)=6, so 12÷6=2 and 18÷6=3, giving 2/3.",
    },
    {
      question: "What is the GCD?",
      answer: "The Greatest Common Divisor (GCD) is the largest number that divides both the numerator and denominator without a remainder. It is found using the Euclidean algorithm.",
    },
    {
      question: "Can I simplify improper fractions?",
      answer: "Yes. An improper fraction (where numerator > denominator) is simplified the same way. For example, 15/10 simplifies to 3/2, which can also be written as 1½.",
    },
  ];

  return (
    <div className="tool-widget-content">

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <input className="tool-input text-center text-xl" value={num} onChange={e => setNum(e.target.value)} placeholder="12" style={{width:"120px"}} />
          <span className="text-2xl font-bold text-gray-400">/</span>
          <input className="tool-input text-center text-xl" value={den} onChange={e => setDen(e.target.value)} placeholder="18" style={{width:"120px"}} />
        </div>
        <button className="btn-primary" onClick={simplify}>Simplify</button>
        {result && <div className="result-box"><span className="result-label">Simplified:</span><span className="result-value">{result}</span></div>}
      </div>
    </div>
  );
}
