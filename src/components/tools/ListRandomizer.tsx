import { useState } from "react";

export default function ListRandomizer() {

  const [items, setItems] = useState("Alice\nBob\nCharlie\nDiana\nEve");
  const [shuffled, setShuffled] = useState("");

  const shuffle = () => {
    const arr = items.split("\n").map(s => s.trim()).filter(Boolean);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setShuffled(arr.join("\n"));
  };

  const faqs: FAQItem[] = [
    {
      question: "How does the Fisher-Yates shuffle work?",
      answer: "Starting from the last element, swap it with a randomly chosen element from the remaining unshuffled portion. Repeat until all elements have been processed. This guarantees each permutation is equally likely.",
    },
    {
      question: "Can I use this to pick a random winner?",
      answer: "Yes — paste your list of names, shuffle, and the first item is your winner. Or shuffle multiple times and take the top N items for multiple winners.",
    },
    {
      question: "Is the randomization truly random?",
      answer: "This tool uses the browser's Math.random() which is a pseudo-random number generator. It is sufficient for games, raffles, and decision-making but not for cryptographic purposes.",
    },
  ];

  return (
    <div className="tool-widget-content">

      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Your list (one item per line)</label>
            <textarea className="tool-textarea" rows={8} value={items} onChange={e => setItems(e.target.value)} placeholder="Alice&#10;Bob&#10;Charlie" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Shuffled result</label>
            <textarea className="tool-textarea" rows={8} value={shuffled} readOnly placeholder="Click Shuffle to see result" />
          </div>
        </div>
        <div className="flex gap-3">
          <button className="btn-primary" onClick={shuffle}>Shuffle</button>
          {shuffled && <button className="btn-outline" onClick={() => navigator.clipboard.writeText(shuffled)}>Copy result</button>}
        </div>
      </div>
    </div>
  );
}
