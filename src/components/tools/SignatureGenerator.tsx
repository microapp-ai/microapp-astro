import { useState } from "react";
import { type RelatedTool } from "../../lib/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
const faqs: FAQItem[] = [
  { question: "What is a signature generator?", answer: "It creates stylish Unicode text versions of your name for emails, forums, or social profiles." },
  { question: "Can I use these in emails?", answer: "Yes — copy the result and paste it into your email client signature settings." },
  { question: "Is my text stored?", answer: "No. Everything runs in your browser." },
  { question: "What styles are available?", answer: "Bold, Italic, Script, Double-Struck, and Monospace Unicode styles." },
  { question: "Will these display on all devices?", answer: "Most Unicode styles display on modern devices." },
];
const relatedTools: RelatedTool[] = [
  { title: "Case Converter", slug: "/case-converter", emoji: "🔡" },
  { title: "Tiny Text Generator", slug: "/tiny-text-generator", emoji: "🔤" },
  { title: "Word Counter", slug: "/word-counter", emoji: "📝" },
];
const toCP = (base: number, offset: number) => String.fromCodePoint(base + offset);
const STYLES = [
  { name: "Bold", fn: (s: string) => Array.from(s).map(c => { const n=c.charCodeAt(0); if(n>=65&&n<=90) return toCP(0x1D400,n-65); if(n>=97&&n<=122) return toCP(0x1D41A,n-97); if(n>=48&&n<=57) return toCP(0x1D7CE,n-48); return c; }).join("") },
  { name: "Italic", fn: (s: string) => Array.from(s).map(c => { const n=c.charCodeAt(0); if(n>=65&&n<=90) return toCP(0x1D434,n-65); if(n>=97&&n<=122) return toCP(0x1D44E,n-97); return c; }).join("") },
  { name: "Script", fn: (s: string) => Array.from(s).map(c => { const n=c.charCodeAt(0); if(n>=65&&n<=90) return toCP(0x1D49C,n-65); if(n>=97&&n<=122) return toCP(0x1D4B6,n-97); return c; }).join("") },
  { name: "Double-Struck", fn: (s: string) => Array.from(s).map(c => { const n=c.charCodeAt(0); if(n>=65&&n<=90) return toCP(0x1D538,n-65); if(n>=97&&n<=122) return toCP(0x1D552,n-97); if(n>=48&&n<=57) return toCP(0x1D7D8,n-48); return c; }).join("") },
  { name: "Monospace", fn: (s: string) => Array.from(s).map(c => { const n=c.charCodeAt(0); if(n>=65&&n<=90) return toCP(0x1D670,n-65); if(n>=97&&n<=122) return toCP(0x1D68A,n-97); if(n>=48&&n<=57) return toCP(0x1D7F6,n-48); return c; }).join("") },
];
export default function SignatureGenerator() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState<string|null>(null);
  const copy = (text: string, name: string) => { navigator.clipboard.writeText(text); setCopied(name); setTimeout(()=>setCopied(null),1500); };
  return (
    <div className="tool-widget-content">
    <div className="space-y-4">
      <Input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type your name or phrase..." className="text-lg font-semibold"/>
      {input && (<div className="space-y-3">
        {STYLES.map(style => { const result=style.fn(input); return (
          <div key={style.name} className="flex items-center justify-between bg-muted/40 rounded-lg px-4 py-3 border">
            <div><p className="text-xs text-muted-foreground mb-1">{style.name}</p><p className="text-xl break-all">{result}</p></div>
            <Button size="sm" variant="outline" onClick={()=>copy(result,style.name)} className="ml-4 shrink-0">{copied===style.name?"Copied!":"Copy"}</Button>
          </div>
        );})}
      </div>)}
    </div>
    </div>
  );
}
