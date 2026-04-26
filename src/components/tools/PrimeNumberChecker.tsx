import { useState } from "react";

export default function PrimeNumberChecker() {

  const [input, setInput] = useState("97");
  const [result, setResult] = useState<{isPrime:boolean,factors:string,nearest:string} | null>(null);

  const isPrime = (n: number) => {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(n); i += 2) if (n % i === 0) return false;
    return true;
  };

  const factorize = (n: number): number[] => {
    const factors: number[] = [];
    let d = 2;
    while (d * d <= n) { while (n % d === 0) { factors.push(d); n = n/d; } d++; }
    if (n > 1) factors.push(n);
    return factors;
  };

  const check = () => {
    const n = parseInt(input);
    if (isNaN(n) || n < 2) { setResult(null); return; }
    const prime = isPrime(n);
    const factors = prime ? [n] : factorize(n);
    let prev = n-1; while (prev > 1 && !isPrime(prev)) prev--;
    let next = n+1; while (!isPrime(next)) next++;
    setResult({
      isPrime: prime,
      factors: prime ? "Prime (no factors)" : factors.join(" × "),
      nearest: `Previous: ${prev < 2 ? "none" : prev} | Next: ${next}`,
    });
  };

  const faqs: FAQItem[] = [
    {
      question: "What is a prime number?",
      answer: "A prime number is a number greater than 1 that can only be divided evenly by 1 and itself. Examples: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29.",
    },
    {
      question: "Is 1 a prime number?",
      answer: "No. By definition, prime numbers must be greater than 1. The number 1 is neither prime nor composite — it is a unit.",
    },
    {
      question: "What is prime factorization?",
      answer: "Prime factorization expresses a number as a product of its prime factors. For example, 60 = 2 × 2 × 3 × 5 = 2² × 3 × 5.",
    },
  ];

  return (
    <div className="tool-widget-content">

      <div className="space-y-4">
        <input className="tool-input" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter a number, e.g. 97" />
        <button className="btn-primary" onClick={check}>Check</button>
        {result && (
          <div className="space-y-3">
            <div className="result-box" style={{borderColor: result.isPrime ? "#1B6B45" : "#E05252"}}>
              <span className="result-value" style={{color: result.isPrime ? "#1B6B45" : "#E05252"}}>
                {input} is {result.isPrime ? "✓ Prime" : "✗ Not Prime"}
              </span>
            </div>
            <div style={{background:"#F7F6F1",borderRadius:"0.875rem",padding:"1rem 1.25rem",border:"1.5px solid #E8E6DE"}}>
              <p style={{fontFamily:"'Inter',sans-serif",fontSize:"0.875rem",color:"#374151",margin:0}}>
                <strong>Factors:</strong> {result.factors}<br/>
                <strong>Nearest primes:</strong> {result.nearest}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
