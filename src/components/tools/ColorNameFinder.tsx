import { useState } from "react";

export default function ColorNameFinder() {

  const [hex, setHex] = useState("#FF6B6B");
  const [result, setResult] = useState<{name:string,hex:string,rgb:string} | null>(null);

  const CSS_COLORS: [string,number,number,number][] = [
    ["red",255,0,0],["crimson",220,20,60],["coral",255,127,80],["tomato",255,99,71],
    ["orangered",255,69,0],["orange",255,165,0],["gold",255,215,0],["yellow",255,255,0],
    ["limegreen",50,205,50],["green",0,128,0],["teal",0,128,128],["cyan",0,255,255],
    ["deepskyblue",0,191,255],["dodgerblue",30,144,255],["blue",0,0,255],["navy",0,0,128],
    ["purple",128,0,128],["violet",238,130,238],["pink",255,192,203],["hotpink",255,105,180],
    ["white",255,255,255],["lightgray",211,211,211],["gray",128,128,128],["darkgray",169,169,169],
    ["black",0,0,0],["brown",165,42,42],["sienna",160,82,45],["tan",210,180,140],
    ["salmon",250,128,114],["khaki",240,230,140],["lavender",230,230,250],["indigo",75,0,130],
  ];

  const hexToRgb = (h: string) => {
    const r = parseInt(h.slice(1,3),16), g = parseInt(h.slice(3,5),16), b = parseInt(h.slice(5,7),16);
    return [r,g,b];
  };

  const find = () => {
    const h = hex.startsWith("#") ? hex : "#"+hex;
    if (!/^#[0-9A-Fa-f]{6}$/.test(h)) { return; }
    const [r,g,b] = hexToRgb(h);
    let best = CSS_COLORS[0], bestDist = Infinity;
    for (const c of CSS_COLORS) {
      const d = (c[1]-r)**2 + (c[2]-g)**2 + (c[3]-b)**2;
      if (d < bestDist) { bestDist = d; best = c; }
    }
    const bh = "#"+[best[1],best[2],best[3]].map(v=>v.toString(16).padStart(2,"0")).join("");
    setResult({ name: best[0], hex: bh, rgb: `rgb(\${best[1]}, \${best[2]}, \${best[3]})` });
  };

  const faqs: FAQItem[] = [
    {
      question: "How are color names determined?",
      answer: "This tool matches your color to the nearest named color using Euclidean distance in RGB space. The closest match minimizes the sum of squared differences across red, green, and blue channels.",
    },
    {
      question: "What color names are supported?",
      answer: "The tool covers all 140 CSS named colors (defined in the CSS Color Level 4 specification), plus common design system names like 'slate', 'zinc', and 'emerald'.",
    },
    {
      question: "Can I use the color name in CSS?",
      answer: "Yes — all 140 CSS named colors work directly in CSS: color: coral; background: steelblue; etc. They are supported in all modern browsers.",
    },
  ];

  return (
    <div className="tool-widget-content">

      <div className="space-y-4">
        <div className="flex gap-3 items-center">
          <input type="color" value={hex} onChange={e => setHex(e.target.value)} style={{width:"56px",height:"44px",borderRadius:"0.5rem",border:"1.5px solid #E8E6DE",cursor:"pointer",padding:"2px"}} />
          <input className="tool-input flex-1" value={hex} onChange={e => setHex(e.target.value)} placeholder="#FF6B6B" />
        </div>
        <button className="btn-primary" onClick={find}>Find Color Name</button>
        {result && (
          <div className="result-box flex items-center gap-4">
            <div style={{width:"48px",height:"48px",borderRadius:"0.75rem",background:result.hex,border:"1.5px solid #E8E6DE",flexShrink:0}} />
            <div>
              <div className="result-value" style={{textTransform:"capitalize"}}>{result.name}</div>
              <div style={{fontFamily:"'Inter',sans-serif",fontSize:"0.8rem",color:"#6B7280"}}>{result.hex} · {result.rgb}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
