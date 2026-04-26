import { useState } from "react";

export default function SpeedDistanceTimeCalculator() {

  const [solve, setSolve] = useState<"speed"|"distance"|"time">("speed");
  const [a, setA] = useState(""); const [b, setB] = useState(""); const [result, setResult] = useState("");

  const calculate = () => {
    const x = parseFloat(a), y = parseFloat(b);
    if (isNaN(x) || isNaN(y) || y === 0) { setResult("Invalid input"); return; }
    if (solve === "speed") setResult(`${(x/y).toFixed(4).replace(/\.?0+$/,"")} (same units)`);
    else if (solve === "distance") setResult(`${(x*y).toFixed(4).replace(/\.?0+$/,"")} (same units)`);
    else setResult(`${(x/y).toFixed(4).replace(/\.?0+$/,"")} (same units)`);
  };

  const labels: Record<string,[string,string]> = {
    speed: ["Distance","Time"],
    distance: ["Speed","Time"],
    time: ["Distance","Speed"],
  };

  const faqs: FAQItem[] = [
    {
      question: "What is the speed-distance-time formula?",
      answer: "Speed = Distance ÷ Time. Rearranged: Distance = Speed × Time, and Time = Distance ÷ Speed. All three are interchangeable.",
    },
    {
      question: "How do I convert km/h to mph?",
      answer: "Multiply km/h by 0.621371 to get mph. For example, 100 km/h × 0.621371 = 62.14 mph.",
    },
    {
      question: "What is average speed?",
      answer: "Average speed is total distance divided by total time. It does not account for direction — that would be average velocity.",
    },
  ];

  return (
    <div className="tool-widget-content">

      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          {(["speed","distance","time"] as const).map(s => (
            <button key={s} onClick={() => setSolve(s)} className={solve===s?"btn-primary":"btn-outline"} style={{textTransform:"capitalize"}}>{s}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{labels[solve][0]}</label>
            <input className="tool-input" value={a} onChange={e => setA(e.target.value)} placeholder="e.g. 100" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{labels[solve][1]}</label>
            <input className="tool-input" value={b} onChange={e => setB(e.target.value)} placeholder="e.g. 2" />
          </div>
        </div>
        <button className="btn-primary" onClick={calculate}>Calculate</button>
        {result && <div className="result-box"><span className="result-label" style={{textTransform:"capitalize"}}>{solve}:</span><span className="result-value">{result}</span></div>}
      </div>
    </div>
  );
}
