import { useState } from "react";
import { type RelatedTool } from "../../lib/types";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
const faqs: FAQItem[] = [
  { question: "What is a text diff checker?", answer: "It compares two texts and highlights additions, deletions, and unchanged lines." },
  { question: "Does it work for code?", answer: "Yes — it works for source code, JSON, config files, and prose." },
  { question: "Is my text sent to a server?", answer: "No. All comparison happens in your browser." },
  { question: "What do the colors mean?", answer: "Green = added, Red = removed, White = unchanged." },
  { question: "Can I compare large texts?", answer: "Yes — the tool handles large texts efficiently in the browser." },
];
const relatedTools: RelatedTool[] = [
  { title: "Word Counter", slug: "/word-counter", emoji: "📝" },
  { title: "Remove Duplicate Lines", slug: "/remove-duplicate-lines", emoji: "🗑️" },
  { title: "Sort Lines", slug: "/sort-lines", emoji: "🔤" },
];
function diffLines(a: string, b: string) {
  const aLines = a.split("\n"), bLines = b.split("\n");
  const bSet = new Set(bLines), aSet = new Set(aLines);
  const result: { type: "same"|"removed"|"added"; text: string }[] = [];
  for (const line of aLines) result.push({ type: bSet.has(line) ? "same" : "removed", text: line });
  for (const line of bLines) if (!aSet.has(line)) result.push({ type: "added", text: line });
  return result;
}
export default function TextDiffChecker() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [diff, setDiff] = useState<{ type: "same"|"removed"|"added"; text: string }[]|null>(null);
  const added = diff?.filter(d=>d.type==="added").length??0;
  const removed = diff?.filter(d=>d.type==="removed").length??0;
  const same = diff?.filter(d=>d.type==="same").length??0;
  return (
    <div className="tool-widget-content">
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-sm font-semibold mb-1">Original</label>
          <Textarea value={textA} onChange={e=>setTextA(e.target.value)} placeholder="Paste original text..." className="min-h-[180px] font-mono text-sm"/></div>
        <div><label className="block text-sm font-semibold mb-1">Revised</label>
          <Textarea value={textB} onChange={e=>setTextB(e.target.value)} placeholder="Paste revised text..." className="min-h-[180px] font-mono text-sm"/></div>
      </div>
      <div className="flex gap-3">
        <Button onClick={()=>setDiff(diffLines(textA,textB))} className="bg-green-800 hover:bg-green-700 text-white font-bold">Compare</Button>
        <Button onClick={()=>{setTextA("");setTextB("");setDiff(null);}} variant="outline">Clear</Button>
      </div>
      {diff && (<div className="space-y-3">
        <div className="flex gap-4 text-sm font-semibold">
          <span className="text-green-700">+{added} added</span>
          <span className="text-red-600">-{removed} removed</span>
          <span className="text-muted-foreground">{same} unchanged</span>
        </div>
        <div className="border rounded-lg overflow-hidden font-mono text-sm">
          {diff.map((line,i)=>(
            <div key={i} className={`px-4 py-1 whitespace-pre-wrap break-all ${line.type==="added"?"bg-green-50 text-green-800 border-l-4 border-green-500":line.type==="removed"?"bg-red-50 text-red-800 border-l-4 border-red-400":"bg-white text-foreground"}`}>
              {line.type==="added"?"+ ":line.type==="removed"?"- ":"  "}{line.text||" "}
            </div>
          ))}
        </div>
      </div>)}
    </div>
    </div>
  );
}
