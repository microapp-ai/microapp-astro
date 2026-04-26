import { useState } from "react";

export default function AspectRatioCalculator() {

  const [w, setW] = useState("1920"); const [h, setH] = useState("1080");
  const [newW, setNewW] = useState(""); const [newH, setNewH] = useState("");
  const [ratio, setRatio] = useState(""); const [calcH, setCalcH] = useState(""); const [calcW, setCalcW] = useState("");

  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

  const calculate = () => {
    const width = parseInt(w), height = parseInt(h);
    if (isNaN(width) || isNaN(height) || height === 0) return;
    const g = gcd(width, height);
    setRatio(`\${width/g}:\${height/g}`);
    if (newW) setCalcH(String(Math.round(parseInt(newW) * height / width)));
    if (newH) setCalcW(String(Math.round(parseInt(newH) * width / height)));
  };

  const faqs: FAQItem[] = [
    {
      question: "What is the 16:9 aspect ratio?",
      answer: "16:9 is the standard widescreen aspect ratio used for HD and 4K video, YouTube, and most modern monitors. A 1920×1080 pixel display has a 16:9 ratio.",
    },
    {
      question: "How do I maintain aspect ratio when resizing?",
      answer: "Divide the new width by the original width to get the scale factor, then multiply the original height by the same factor. This tool does this automatically.",
    },
    {
      question: "What aspect ratio should I use for social media?",
      answer: "Instagram feed: 1:1 (square) or 4:5 (portrait). Stories/Reels: 9:16. Twitter/X: 16:9. Facebook cover: 205:78. LinkedIn banner: 4:1.",
    },
  ];

  return (
    <div className="tool-widget-content">

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Width (px)</label><input className="tool-input" value={w} onChange={e => setW(e.target.value)} placeholder="1920" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Height (px)</label><input className="tool-input" value={h} onChange={e => setH(e.target.value)} placeholder="1080" /></div>
        </div>
        <button className="btn-primary" onClick={calculate}>Calculate Ratio</button>
        {ratio && <div className="result-box"><span className="result-label">Aspect ratio:</span><span className="result-value">{ratio}</span></div>}
        <div className="border-t border-[#E8E6DE] pt-4">
          <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"0.9rem",color:"#1A1A1A",marginBottom:"0.75rem"}}>Scale to new dimensions</p>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-sm font-semibold text-gray-700 mb-1">New Width</label><input className="tool-input" value={newW} onChange={e => setNewW(e.target.value)} placeholder="1280" /></div>
            <div><label className="block text-sm font-semibold text-gray-700 mb-1">New Height</label><input className="tool-input" value={newH} onChange={e => setNewH(e.target.value)} placeholder="720" /></div>
          </div>
          {(calcH || calcW) && <div className="result-box mt-3"><span className="result-value">{newW ? `Height: \${calcH}px` : `Width: \${calcW}px`}</span></div>}
        </div>
      </div>
    </div>
  );
}
