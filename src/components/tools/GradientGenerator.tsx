import { useState } from "react";
import { type RelatedTool } from "../../lib/types";
import { Button } from "../ui/button";
const faqs: FAQItem[] = [
  { question: "What is a CSS gradient generator?", answer: "It creates CSS code for smooth color transitions between two colors, ready to paste into your stylesheet." },
  { question: "What gradient types are supported?", answer: "Linear (directional) and radial (circular) gradients." },
  { question: "How do I use the generated CSS?", answer: "Copy the CSS value and use it as a background property: background: linear-gradient(...);" },
  { question: "What does the angle control do?", answer: "For linear gradients, the angle controls direction. 0deg is bottom to top, 90deg is left to right." },
  { question: "Can I add more than two colors?", answer: "You can manually add more color stops to the copied CSS code." },
];
const relatedTools: RelatedTool[] = [
  { title: "Color Palette Generator", slug: "/color-palette-generator", emoji: "🎨" },
  { title: "Color Converter", slug: "/color-converter", emoji: "🔄" },
  { title: "Hex to RGB", slug: "/hex-to-rgb", emoji: "🔢" },
];
export default function GradientGenerator() {
  const[color1,setColor1]=useState("#1B6B45");
  const[color2,setColor2]=useState("#FFE234");
  const[type,setType]=useState<"linear"|"radial">("linear");
  const[angle,setAngle]=useState(135);
  const[copied,setCopied]=useState(false);
  const css=type==="linear"?`linear-gradient(${angle}deg, ${color1}, ${color2})`:`radial-gradient(circle, ${color1}, ${color2})`;
  const fullCss=`background: ${css};`;
  const copy=()=>{navigator.clipboard.writeText(fullCss);setCopied(true);setTimeout(()=>setCopied(false),1500);};
  return(
    <div className="tool-widget-content">
    <div className="space-y-5">
      <div className="w-full h-40 rounded-xl border shadow-inner" style={{background:css}}/>
      <div className="flex flex-wrap gap-4 items-end">
        <div><label className="block text-sm font-semibold mb-1">Color 1</label>
          <input type="color" value={color1} onChange={e=>setColor1(e.target.value)} className="w-16 h-10 rounded cursor-pointer border"/></div>
        <div><label className="block text-sm font-semibold mb-1">Color 2</label>
          <input type="color" value={color2} onChange={e=>setColor2(e.target.value)} className="w-16 h-10 rounded cursor-pointer border"/></div>
        <div><label className="block text-sm font-semibold mb-1">Type</label>
          <select value={type} onChange={e=>setType(e.target.value as "linear"|"radial")} className="border rounded-lg px-3 py-2 text-sm bg-background">
            <option value="linear">Linear</option><option value="radial">Radial</option>
          </select></div>
        {type==="linear"&&<div><label className="block text-sm font-semibold mb-1">Angle: {angle}deg</label>
          <input type="range" min={0} max={360} value={angle} onChange={e=>setAngle(Number(e.target.value))} className="w-32"/></div>}
      </div>
      <div className="bg-muted/40 rounded-lg border px-4 py-3 font-mono text-sm break-all">{fullCss}</div>
      <Button onClick={copy} className="bg-green-800 hover:bg-green-700 text-white font-bold">{copied?"Copied!":"Copy CSS"}</Button>
    </div>
    </div>
  );
}
