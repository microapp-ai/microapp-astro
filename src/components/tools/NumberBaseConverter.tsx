import { useState } from "react";

export default function NumberBaseConverter() {

  const [input, setInput] = useState("255");
  const [fromBase, setFromBase] = useState(10);
  const [results, setResults] = useState<Record<string,string>>({});

  const BASES = [{label:"Binary (2)",base:2},{label:"Octal (8)",base:8},{label:"Decimal (10)",base:10},{label:"Hex (16)",base:16}];

  const convert = () => {
    try {
      const dec = parseInt(input, fromBase);
      if (isNaN(dec)) { setResults({}); return; }
      const r: Record<string,string> = {};
      BASES.forEach(({label,base}) => { r[label] = dec.toString(base).toUpperCase(); });
      setResults(r);
    } catch { setResults({}); }
  };

  const faqs: FAQItem[] = [
    {
      question: "How do I convert decimal to binary?",
      answer: "Repeatedly divide the decimal number by 2 and record the remainders from bottom to top. For example, 13 ÷ 2 = 6 R1, 6 ÷ 2 = 3 R0, 3 ÷ 2 = 1 R1, 1 ÷ 2 = 0 R1 → binary: 1101.",
    },
    {
      question: "What is hexadecimal used for?",
      answer: "Hexadecimal (base 16) uses digits 0–9 and letters A–F. It is used for CSS color codes (#FF5733), memory addresses (0x1A2B), and binary data representation because each hex digit represents exactly 4 binary bits.",
    },
    {
      question: "What is the maximum base supported?",
      answer: "This converter supports bases 2 through 36, using digits 0–9 and letters A–Z. Base 36 is sometimes used for compact URL shorteners and unique ID generation.",
    },
  ];

  return (
    <div className="tool-widget-content">

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Input value</label>
            <input className="tool-input font-mono" value={input} onChange={e => setInput(e.target.value)} placeholder="255" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">From base</label>
            <select className="tool-input" value={fromBase} onChange={e => setFromBase(parseInt(e.target.value))}>
              {BASES.map(({label,base}) => <option key={base} value={base}>{label}</option>)}
            </select>
          </div>
        </div>
        <button className="btn-primary" onClick={convert}>Convert</button>
        {Object.keys(results).length > 0 && (
          <div className="space-y-2">
            {BASES.map(({label}) => (
              <div key={label} style={{background:"#F7F6F1",border:"1.5px solid #E8E6DE",borderRadius:"0.875rem",padding:"0.875rem 1.25rem",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontFamily:"'Inter',sans-serif",fontSize:"0.875rem",color:"#6B7280"}}>{label}</span>
                <span style={{fontFamily:"monospace",fontWeight:700,fontSize:"1rem",color:"#1B6B45"}}>{results[label]}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
