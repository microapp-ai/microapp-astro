import { useState } from "react";

export default function CSSUnitConverter() {

  const [value, setValue] = useState("16");
  const [from, setFrom] = useState("px");
  const [baseFontSize, setBaseFontSize] = useState("16");
  const [viewportW, setViewportW] = useState("1440");
  const [viewportH, setViewportH] = useState("900");
  const [results, setResults] = useState<Record<string,string>>({});

  const UNITS = ["px","rem","em","vw","vh","pt","pc","cm","mm","in"];

  const toPx = (val: number, unit: string): number => {
    const base = parseFloat(baseFontSize)||16;
    const vw = parseFloat(viewportW)||1440;
    const vh = parseFloat(viewportH)||900;
    switch(unit) {
      case "px": return val;
      case "rem": return val*base;
      case "em": return val*base;
      case "vw": return val*vw/100;
      case "vh": return val*vh/100;
      case "pt": return val*96/72;
      case "pc": return val*96/6;
      case "cm": return val*96/2.54;
      case "mm": return val*96/25.4;
      case "in": return val*96;
      default: return val;
    }
  };

  const fromPx = (px: number, unit: string): number => {
    const base = parseFloat(baseFontSize)||16;
    const vw = parseFloat(viewportW)||1440;
    const vh = parseFloat(viewportH)||900;
    switch(unit) {
      case "px": return px;
      case "rem": return px/base;
      case "em": return px/base;
      case "vw": return px*100/vw;
      case "vh": return px*100/vh;
      case "pt": return px*72/96;
      case "pc": return px*6/96;
      case "cm": return px*2.54/96;
      case "mm": return px*25.4/96;
      case "in": return px/96;
      default: return px;
    }
  };

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) return;
    const px = toPx(val, from);
    const r: Record<string,string> = {};
    UNITS.forEach(u => { r[u] = fromPx(px,u).toFixed(4).replace(/\.?0+$/,""); });
    setResults(r);
  };

  const faqs: FAQItem[] = [
    {
      question: "What is the difference between rem and em?",
      answer: "rem (root em) is relative to the root element's font size (usually 16px). em is relative to the current element's font size, which can cascade and compound. rem is generally more predictable.",
    },
    {
      question: "How many px is 1rem?",
      answer: "By default, browsers set the root font size to 16px, so 1rem = 16px. If you change the root font size (e.g., html { font-size: 18px; }), then 1rem = 18px.",
    },
    {
      question: "What are vw and vh units?",
      answer: "vw (viewport width) and vh (viewport height) are percentages of the browser viewport. 1vw = 1% of viewport width, 100vw = full viewport width. They are useful for responsive layouts.",
    },
  ];

  return (
    <div className="tool-widget-content">

      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="col-span-2 sm:col-span-1"><label className="block text-sm font-semibold text-gray-700 mb-1">Value</label><input className="tool-input" value={value} onChange={e => setValue(e.target.value)} placeholder="16" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">From unit</label><select className="tool-input" value={from} onChange={e => setFrom(e.target.value)}>{UNITS.map(u=><option key={u}>{u}</option>)}</select></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Base font (px)</label><input className="tool-input" value={baseFontSize} onChange={e => setBaseFontSize(e.target.value)} /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Viewport W</label><input className="tool-input" value={viewportW} onChange={e => setViewportW(e.target.value)} /></div>
        </div>
        <button className="btn-primary" onClick={convert}>Convert All Units</button>
        {Object.keys(results).length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {UNITS.map(u => (
              <div key={u} style={{background:"#F7F6F1",border:"1.5px solid #E8E6DE",borderRadius:"0.875rem",padding:"0.875rem 1rem"}}>
                <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"1.1rem",color:"#1B6B45"}}>{results[u]}</div>
                <div style={{fontFamily:"'Inter',sans-serif",fontSize:"0.8rem",color:"#6B7280",marginTop:"0.15rem"}}>{u}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
