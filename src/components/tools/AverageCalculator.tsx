import { useState } from "react";

export default function AverageCalculator() {

  const [input, setInput] = useState("4, 7, 13, 2, 7, 1");
  const [stats, setStats] = useState<{mean:string,median:string,mode:string,range:string} | null>(null);

  const calculate = () => {
    const nums = input.split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
    if (nums.length === 0) return;
    const sorted = [...nums].sort((a,b) => a-b);
    const mean = nums.reduce((a,b) => a+b, 0) / nums.length;
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 === 0 ? (sorted[mid-1]+sorted[mid])/2 : sorted[mid];
    const freq: Record<number,number> = {};
    nums.forEach(n => freq[n] = (freq[n]||0)+1);
    const maxFreq = Math.max(...Object.values(freq));
    const modes = Object.keys(freq).filter(k => freq[Number(k)] === maxFreq).map(Number);
    const range = sorted[sorted.length-1] - sorted[0];
    setStats({
      mean: mean.toFixed(4).replace(/\.?0+$/,""),
      median: String(median),
      mode: maxFreq === 1 ? "No mode" : modes.join(", "),
      range: String(range),
    });
  };

  const faqs: FAQItem[] = [
    {
      question: "What is the difference between mean and median?",
      answer: "The mean is the sum of all values divided by the count. The median is the middle value when sorted. The median is more robust to outliers — for example, in salary data, a few very high earners skew the mean upward but not the median.",
    },
    {
      question: "What is the mode?",
      answer: "The mode is the value that appears most frequently. A data set can have no mode (all values unique), one mode, or multiple modes (bimodal, trimodal, etc.).",
    },
    {
      question: "What does range tell you?",
      answer: "The range is the difference between the maximum and minimum values. It measures the spread of the data but is sensitive to outliers.",
    },
  ];

  return (
    <div className="tool-widget-content">

      <div className="space-y-4">
        <textarea className="tool-textarea" rows={3} value={input} onChange={e => setInput(e.target.value)} placeholder="Enter numbers separated by commas: 4, 7, 13, 2, 7, 1" />
        <button className="btn-primary" onClick={calculate}>Calculate</button>
        {stats && (
          <div className="grid grid-cols-2 gap-3">
            {[["Mean", stats.mean],["Median", stats.median],["Mode", stats.mode],["Range", stats.range]].map(([label, val]) => (
              <div key={label} style={{background:"#F7F6F1",border:"1.5px solid #E8E6DE",borderRadius:"0.875rem",padding:"1rem 1.25rem"}}>
                <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"1.4rem",color:"#1B6B45"}}>{val}</div>
                <div style={{fontFamily:"'Inter',sans-serif",fontSize:"0.8rem",color:"#6B7280",marginTop:"0.2rem"}}>{label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
