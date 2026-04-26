import { useState } from "react";

export default function NamePickerWheel() {

  const [names, setNames] = useState("Alice\nBob\nCharlie\nDiana\nEve");
  const [picked, setPicked] = useState("");
  const [picking, setPicking] = useState(false);

  const pick = () => {
    const arr = names.split("\n").map(s => s.trim()).filter(Boolean);
    if (arr.length === 0) return;
    setPicking(true);
    let count = 0;
    const interval = setInterval(() => {
      setPicked(arr[Math.floor(Math.random() * arr.length)]);
      count++;
      if (count > 15) { clearInterval(interval); setPicking(false); }
    }, 80);
  };

  const faqs: FAQItem[] = [
    {
      question: "Is each name equally likely to be picked?",
      answer: "Yes. The picker uses Math.random() to select a uniformly distributed random index, giving every name an equal 1/n probability of being chosen.",
    },
    {
      question: "Can I remove a name after it is picked?",
      answer: "Yes — after picking, you can delete the name from the list and pick again to ensure no repeats. This is useful for assigning tasks or drawing prizes.",
    },
    {
      question: "How many names can I add?",
      answer: "There is no hard limit. The picker works with any number of names, from 2 to thousands.",
    },
  ];

  return (
    <div className="tool-widget-content">

      <div className="space-y-4">
        <textarea className="tool-textarea" rows={6} value={names} onChange={e => setNames(e.target.value)} placeholder="Enter names, one per line" />
        <button className="btn-primary" onClick={pick} disabled={picking}>
          {picking ? "Picking..." : "Pick a Name"}
        </button>
        {picked && (
          <div className="result-box" style={{textAlign:"center"}}>
            <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"2rem",color:"#1B6B45",lineHeight:1.2}}>{picked}</div>
            <div style={{fontFamily:"'Inter',sans-serif",fontSize:"0.8rem",color:"#6B7280",marginTop:"0.4rem"}}>🎉 Selected!</div>
          </div>
        )}
      </div>
    </div>
  );
}
