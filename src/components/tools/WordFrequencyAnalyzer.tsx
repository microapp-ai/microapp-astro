import { useState } from "react";

export default function WordFrequencyAnalyzer() {

  const [text, setText] = useState("The quick brown fox jumps over the lazy dog. The dog barked at the fox. The fox ran away quickly.");
  const [filterStops, setFilterStops] = useState(true);
  const [freq, setFreq] = useState<[string,number,string][]>([]);

  const STOP_WORDS = new Set(["the","a","an","and","or","but","in","on","at","to","for","of","with","by","from","is","are","was","were","be","been","being","have","has","had","do","does","did","will","would","could","should","may","might","it","its","this","that","these","those","i","you","he","she","we","they","me","him","her","us","them","my","your","his","our","their","what","which","who","when","where","why","how","not","no","so","if","as","up","out","about","over","after","before","into","than","then","there","here","just","also","very","too","more","most","some","any","all","each","both","few","many","much","other","such","own","same","new","old","first","last","long","great","little","good","bad","well","right","left","back","down","still","even","now","only","just","never","always","often","again","away","off","through","under","around","between","against","without","within","during","since","until","while","although","because","though","unless","whether","however","therefore","moreover","furthermore","nevertheless","meanwhile","otherwise","instead","indeed","certainly","perhaps","probably","possibly","usually","generally","recently","currently","already","yet","soon","later","early","quickly","slowly","easily","clearly","simply","exactly","especially","particularly","specifically","basically","actually","really","quite","rather","fairly","nearly","almost","enough","else","together","along","across","behind","above","below","inside","outside","near","far","next","last","every","several","another","either","neither","both"]);

  const analyze = () => {
    const words = text.toLowerCase().replace(/[^a-z\s]/g,"").split(/\s+/).filter(Boolean);
    const total = words.length;
    const counts: Record<string,number> = {};
    words.forEach(w => { if (!filterStops || !STOP_WORDS.has(w)) counts[w] = (counts[w]||0)+1; });
    const sorted = Object.entries(counts).sort((a,b) => b[1]-a[1]).slice(0,20);
    setFreq(sorted.map(([w,c]) => [w, c, ((c/total)*100).toFixed(1)+"%"]));
  };

  const faqs: FAQItem[] = [
    {
      question: "What are stop words?",
      answer: "Stop words are common words like 'the', 'and', 'is', 'in' that carry little meaning. This analyzer optionally filters them out to focus on meaningful content words.",
    },
    {
      question: "How is keyword density calculated?",
      answer: "Keyword density = (number of times keyword appears ÷ total word count) × 100. For SEO, a density of 1–2% is generally recommended for the primary keyword.",
    },
    {
      question: "What is the ideal keyword density for SEO?",
      answer: "Google does not have an official keyword density guideline. Most SEO experts recommend 1–2% for the primary keyword. Over-optimization (keyword stuffing) can actually harm rankings.",
    },
  ];

  return (
    <div className="tool-widget-content">

      <div className="space-y-4">
        <textarea className="tool-textarea" rows={6} value={text} onChange={e => setText(e.target.value)} placeholder="Paste your text here..." />
        <div className="flex gap-4 items-center flex-wrap">
          <button className="btn-primary" onClick={analyze}>Analyze</button>
          <label style={{display:"flex",alignItems:"center",gap:"0.5rem",fontFamily:"'Inter',sans-serif",fontSize:"0.875rem",color:"#374151",cursor:"pointer"}}>
            <input type="checkbox" checked={filterStops} onChange={e => setFilterStops(e.target.checked)} />
            Filter common stop words
          </label>
        </div>
        {freq.length > 0 && (
          <div style={{overflowX:"auto",borderRadius:"0.875rem",border:"1.5px solid #E8E6DE"}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead style={{background:"#F7F6F1"}}>
                <tr>
                  {["Rank","Word","Count","Density"].map(h => <th key={h} style={{padding:"0.75rem 1rem",textAlign:"left",fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"0.85rem",color:"#1A1A1A",borderBottom:"2px solid #E8E6DE"}}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {freq.map(([word,count,pct],i) => (
                  <tr key={word} style={{background: i%2===0 ? "#FAFAF7" : "white"}}>
                    <td style={{padding:"0.6rem 1rem",fontFamily:"'Inter',sans-serif",fontSize:"0.875rem",color:"#9CA3AF"}}>{i+1}</td>
                    <td style={{padding:"0.6rem 1rem",fontFamily:"monospace",fontSize:"0.9rem",color:"#1A1A1A",fontWeight:600}}>{word}</td>
                    <td style={{padding:"0.6rem 1rem",fontFamily:"'Inter',sans-serif",fontSize:"0.875rem",color:"#374151"}}>{count}</td>
                    <td style={{padding:"0.6rem 1rem",fontFamily:"'Inter',sans-serif",fontSize:"0.875rem",color:"#1B6B45",fontWeight:600}}>{pct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
