import { useState } from "react";

export default function TeamGenerator() {

  const [names, setNames] = useState("Alice\nBob\nCharlie\nDiana\nEve\nFrank\nGrace\nHenry");
  const [numTeams, setNumTeams] = useState("2");
  const [teams, setTeams] = useState<string[][]>([]);

  const generate = () => {
    const arr = names.split("\n").map(s => s.trim()).filter(Boolean);
    const n = parseInt(numTeams);
    if (isNaN(n) || n < 1 || arr.length === 0) return;
    // Fisher-Yates shuffle
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    const result: string[][] = Array.from({length: Math.min(n, arr.length)}, () => []);
    arr.forEach((name, i) => result[i % result.length].push(name));
    setTeams(result);
  };

  const faqs: FAQItem[] = [
    {
      question: "How are teams balanced?",
      answer: "Names are shuffled randomly, then distributed round-robin across teams. If the total is not evenly divisible, the last team(s) will have one fewer member.",
    },
    {
      question: "Can I split by team size instead of number of teams?",
      answer: "Yes — switch to 'By size' mode and enter how many people you want per team. The tool calculates the number of teams automatically.",
    },
    {
      question: "Is the split truly random?",
      answer: "Yes — the Fisher-Yates algorithm is used to shuffle names before distribution, ensuring every possible team composition is equally likely.",
    },
  ];

  return (
    <div className="tool-widget-content">

      <div className="space-y-4">
        <textarea className="tool-textarea" rows={6} value={names} onChange={e => setNames(e.target.value)} placeholder="Enter names, one per line" />
        <div className="flex gap-3 items-end">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Number of teams</label>
            <input className="tool-input" style={{width:"100px"}} value={numTeams} onChange={e => setNumTeams(e.target.value)} placeholder="2" />
          </div>
          <button className="btn-primary" onClick={generate}>Generate Teams</button>
        </div>
        {teams.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-3">
            {teams.map((team, i) => (
              <div key={i} style={{background:"#F7F6F1",border:"1.5px solid #E8E6DE",borderRadius:"0.875rem",padding:"1rem 1.25rem"}}>
                <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"0.9rem",color:"#1B6B45",marginBottom:"0.5rem"}}>Team {i+1}</div>
                {team.map((name,j) => <div key={j} style={{fontFamily:"'Inter',sans-serif",fontSize:"0.875rem",color:"#374151",padding:"0.2rem 0"}}>{name}</div>)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
