import { useState } from "react";
import { type RelatedTool } from "../../lib/types";
const faqs: FAQItem[] = [
  { question: "What is a color palette generator?", answer: "It creates harmonious color sets based on a seed color using color theory rules." },
  { question: "How do I use the palette?", answer: "Click any color swatch to copy its HEX code for use in CSS or design tools." },
  { question: "What harmony modes are available?", answer: "Complementary, Analogous, Triadic, Split-Complementary, and Monochromatic." },
  { question: "Can I start from any color?", answer: "Yes, use the color picker to choose any starting color." },
  { question: "How many colors are in each palette?", answer: "Each palette contains 5 harmonious colors." },
];
const relatedTools: RelatedTool[] = [
  { title: "Color Converter", slug: "/color-converter", emoji: "🎨" },
  { title: "Hex to RGB", slug: "/hex-to-rgb", emoji: "🔢" },
  { title: "Gradient Generator", slug: "/gradient-generator", emoji: "🌈" },
];
function hslToHex(h: number, s: number, l: number): string {
  s/=100; l/=100;
  const a=s*Math.min(l,1-l);
  const f=(n: number)=>{const k=(n+h/30)%12;const color=l-a*Math.max(Math.min(k-3,9-k,1),-1);return Math.round(255*color).toString(16).padStart(2,"0");};
  return "#"+f(0)+f(8)+f(4);
}
function hexToHsl(hex: string):[number,number,number]{
  const r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255;
  const max=Math.max(r,g,b),min=Math.min(r,g,b);let h=0,s=0;const l=(max+min)/2;
  if(max!==min){const d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);if(max===r)h=((g-b)/d+(g<b?6:0))/6;else if(max===g)h=((b-r)/d+2)/6;else h=((r-g)/d+4)/6;}
  return[Math.round(h*360),Math.round(s*100),Math.round(l*100)];
}
const MODES=["Complementary","Analogous","Triadic","Split-Complementary","Monochromatic"];
function generatePalette(hex: string,mode: string):string[]{
  const[h,s,l]=hexToHsl(hex);
  if(mode==="Complementary") return[hex,hslToHex((h+180)%360,s,l),hslToHex(h,s,Math.min(l+20,90)),hslToHex((h+180)%360,s,Math.min(l+20,90)),hslToHex(h,s,Math.max(l-20,10))];
  if(mode==="Analogous") return[hslToHex((h-30+360)%360,s,l),hslToHex((h-15+360)%360,s,l),hex,hslToHex((h+15)%360,s,l),hslToHex((h+30)%360,s,l)];
  if(mode==="Triadic") return[hex,hslToHex((h+120)%360,s,l),hslToHex((h+240)%360,s,l),hslToHex(h,s,Math.min(l+15,90)),hslToHex(h,s,Math.max(l-15,10))];
  if(mode==="Split-Complementary") return[hex,hslToHex((h+150)%360,s,l),hslToHex((h+210)%360,s,l),hslToHex(h,Math.max(s-20,0),l),hslToHex(h,s,Math.min(l+25,90))];
  return[hslToHex(h,s,Math.max(l-30,5)),hslToHex(h,s,Math.max(l-15,5)),hex,hslToHex(h,s,Math.min(l+15,95)),hslToHex(h,s,Math.min(l+30,95))];
}
export default function ColorPaletteGenerator() {
  const[seed,setSeed]=useState("#1B6B45");
  const[mode,setMode]=useState("Analogous");
  const[copied,setCopied]=useState<string|null>(null);
  const palette=generatePalette(seed,mode);
  const copy=(hex:string)=>{navigator.clipboard.writeText(hex);setCopied(hex);setTimeout(()=>setCopied(null),1200);};
  return(
    <div className="tool-widget-content">
    <div className="space-y-5">
      <div className="flex flex-wrap gap-4 items-end">
        <div><label className="block text-sm font-semibold mb-1">Seed Color</label>
          <input type="color" value={seed} onChange={e=>setSeed(e.target.value)} className="w-16 h-10 rounded cursor-pointer border"/></div>
        <div><label className="block text-sm font-semibold mb-1">Harmony Mode</label>
          <select value={mode} onChange={e=>setMode(e.target.value)} className="border rounded-lg px-3 py-2 text-sm bg-background">
            {MODES.map(m=><option key={m}>{m}</option>)}
          </select></div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {palette.map((hex,i)=>(
          <button key={i} onClick={()=>copy(hex)} title={"Copy "+hex} className="flex flex-col items-center gap-1 group">
            <div className="w-20 h-20 rounded-xl border shadow-sm transition-transform group-hover:scale-105" style={{backgroundColor:hex}}/>
            <span className="text-xs font-mono font-semibold text-muted-foreground">{copied===hex?"Copied!":hex.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
    </div>
  );
}
