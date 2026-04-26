import { useState } from "react";
import { type RelatedTool } from "../../lib/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
const faqs: FAQItem[] = [
  { question: "What is a random word generator?", answer: "It picks words at random from a vocabulary list, useful for games, writing prompts, and brainstorming." },
  { question: "How many words can I generate?", answer: "Up to 20 random words at a time." },
  { question: "What are random words used for?", answer: "Word games, creative writing prompts, Scrabble practice, and brainstorming sessions." },
  { question: "Are the words truly random?", answer: "Yes, the tool uses a random selection algorithm each time." },
  { question: "Can I copy all words at once?", answer: "Yes, click Copy All to copy the full list to your clipboard." },
];
const relatedTools: RelatedTool[] = [
  { title: "Random Name Generator", slug: "/random-name-generator", emoji: "👤" },
  { title: "Lorem Ipsum", slug: "/lorem-ipsum", emoji: "📄" },
  { title: "Password Generator", slug: "/password-generator", emoji: "🔐" },
];
const WORDS = ["apple","brave","cloud","dance","eagle","flame","grace","honey","ivory","jewel","knack","lemon","maple","noble","ocean","pearl","quest","river","stone","tiger","ultra","vivid","water","xenon","yacht","zebra","amber","bliss","crisp","delta","ember","frost","gleam","haven","ideal","jolly","karma","lunar","magic","nexus","orbit","prism","quirk","radiant","solar","tempo","unity","valor","whirl","zeal","azure","bloom","cedar","drift","echo","flair","glade","haze","iris","jade","keen","loft","mist","nova","opal","pine","quartz","realm","sage","thorn","umber","veil","wren","yonder","zephyr","acorn","birch","coral","dusk","elm","fern","gust","heron","isle","juniper","kite","lark","moss","nook","oak","pond","quill","reed","swift","tide","vale","willow","yew","zenith"];
export default function RandomWordGenerator() {
  const [count, setCount] = useState("5");
  const [words, setWords] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const generate = () => { const n=Math.min(20,Math.max(1,parseInt(count)||5)); const r:string[]=[]; for(let i=0;i<n;i++) r.push(WORDS[Math.floor(Math.random()*WORDS.length)]); setWords(r); };
  const copyAll = () => { navigator.clipboard.writeText(words.join(", ")); setCopied(true); setTimeout(()=>setCopied(false),1500); };
  return (
    <div className="tool-widget-content">
    <div className="space-y-4">
      <div className="flex gap-3 items-end">
        <div className="w-32"><label className="block text-sm font-semibold mb-1">Count</label>
          <Input type="number" min={1} max={20} value={count} onChange={e=>setCount(e.target.value)}/></div>
        <Button onClick={generate} className="bg-green-800 hover:bg-green-700 text-white font-bold">Generate</Button>
        {words.length>0 && <Button variant="outline" onClick={copyAll}>{copied?"Copied!":"Copy All"}</Button>}
      </div>
      {words.length>0 && (<div className="flex flex-wrap gap-2">
        {words.map((w,i)=>(
          <button key={i} onClick={()=>navigator.clipboard.writeText(w)}
            className="px-4 py-2 bg-yellow-100 border border-yellow-300 rounded-full text-sm font-semibold hover:bg-yellow-200 transition-colors capitalize">{w}</button>
        ))}
      </div>)}
    </div>
    </div>
  );
}
