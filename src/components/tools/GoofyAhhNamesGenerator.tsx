import { useState } from "react";

const adjectives = ["Slimy","Wobbly","Crusty","Goofy","Wiggly","Blobby","Floppy","Zesty","Chunky","Squishy","Drippy","Funky","Lumpy","Jiggly","Soggy","Wacky","Dizzy","Fuzzy","Bumpy","Slurpy","Gloppy","Twisty","Snappy","Droopy","Flappy"];
const middles = ["Mc","Von","De","Le","O\'"];
const nouns = ["Fluffins","Bingleborp","Snorkelsworth","Wobblekins","Noodleface","Blorpington","Squiggleton","Derpsworth","Gooberton","Flibberwick","Blorpkins","Snufflebum","Waddlesworth","Jigglepants","Noodlebrain","Blorpface","Squishington","Derpkins","Goobernoodle","Flibbersnatch","Wobbleston","Snorkelkins","Bingledorf","Squiggleface","Derpnoodle"];

function generateName() {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const mid = Math.random() > 0.5 ? middles[Math.floor(Math.random() * middles.length)] : "";
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj} ${mid}${noun}`.trim();
}

export default function GoofyAhhNamesGenerator() {
  const [names, setNames] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  function generate() {
    setNames(Array.from({ length: 5 }, generateName));
  }

  function copy(name: string, i: number) {
    navigator.clipboard.writeText(name);
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  }

  const faqs: FAQItem[] = [
    {
      question: "What is a \"Goofy Ahh\" name?",
      answer: "A \"Goofy Ahh\" name is a humorous, often nonsensical name inspired by internet meme culture, designed to sound silly and memorable.",
    },
    {
      question: "How does the Goofy Ahh Names Generator work?",
      answer: "The generator combines a random adjective, an optional middle component, and a quirky noun from its internal lists to create unique and funny names.",
    },
    {
      question: "Can I use these names for my online profiles or characters?",
      answer: "Yes, these names are perfect for social media handles, gaming characters, fictional stories, or any situation where a lighthearted and distinctive name is desired.",
    },
    {
      question: "Are the generated names truly unique?",
      answer: "While the generator uses a combination of predefined parts, the vast number of possible combinations makes it highly likely that each generated name will be unique.",
    },
    {
      question: "Is there a limit to how many names I can generate?",
      answer: "No, you can generate as many batches of 5 goofy names as you like, providing an endless supply of humorous options.",
    },
  ];

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        <button
          onClick={generate}
          className="btn-primary"
        >
          Generate 5 Goofy Names
        </button>

        {names.length > 0 && (
          <div className="space-y-3">
            {names.map((name, i) => (
              <div key={i} style={{ background: "#FFF9E0", borderRadius: "0.875rem", padding: "1rem 1.25rem", border: "1.5px solid #E8E6DE", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                <span style={{ fontFamily: "\'Plus Jakarta Sans\', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1A1A1A" }}>{name}</span>
                <button
                  onClick={() => copy(name, i)}
                  style={{ fontFamily: "\'Plus Jakarta Sans\', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: copied === i ? "#1B6B45" : "#4B5563", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "9999px", padding: "0.3rem 0.85rem", cursor: "pointer", flexShrink: 0 }}
                >
                  {copied === i ? "✓ Copied!" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}