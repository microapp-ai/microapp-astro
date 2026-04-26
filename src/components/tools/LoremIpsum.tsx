/*
 * MICROAPP — Lorem Ipsum Generator Tool
 */
import { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const WORDS = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate", "velit", "esse", "cillum", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum", "perspiciatis", "unde", "omnis", "iste", "natus", "error", "voluptatem", "accusantium", "doloremque", "laudantium", "totam", "rem", "aperiam", "eaque", "ipsa", "quae", "ab", "illo", "inventore", "veritatis", "quasi", "architecto", "beatae", "vitae", "dicta", "explicabo", "nemo", "ipsam", "quia", "voluptas", "aspernatur", "odit", "fugit", "consequuntur", "magni", "dolores", "eos", "ratione", "sequi", "nesciunt", "neque", "porro", "quisquam", "dolorem", "adipisci", "numquam", "eius", "modi", "tempora", "incidunt", "quaerat"];

function randomWord() { return WORDS[Math.floor(Math.random() * WORDS.length)]; }
function randomSentence() {
  const len = 8 + Math.floor(Math.random() * 12);
  const words = Array.from({ length: len }, randomWord);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}
function randomParagraph() {
  const count = 4 + Math.floor(Math.random() * 4);
  return Array.from({ length: count }, randomSentence).join(" ");
}

export default function LoremIpsum() {
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");

  function generate() {
    let result = "";
    if (type === "paragraphs") result = Array.from({ length: count }, randomParagraph).join("\n\n");
    else if (type === "sentences") result = Array.from({ length: count }, randomSentence).join(" ");
    else result = Array.from({ length: count }, randomWord).join(" ");
    setOutput(result);
  }

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>
              Generate
            </label>
            <div className="flex gap-2">
              {(["paragraphs", "sentences", "words"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem",
                    padding: "0.45rem 0.9rem", borderRadius: "9999px", border: "2px solid",
                    borderColor: type === t ? "#1B6B45" : "#E8E6DE",
                    background: type === t ? "#1B6B45" : "white",
                    color: type === t ? "white" : "#4B5563",
                    transition: "all 0.15s ease", textTransform: "capitalize",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>
              Count
            </label>
            <input
              type="number"
              min={1}
              max={50}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(50, Number(e.target.value))))}
              className="tool-input"
              style={{ width: "80px" }}
            />
          </div>
          <button className="btn-primary" onClick={generate}>
            <RefreshCw size={14} /> Generate
          </button>
        </div>

        {output && (
          <div>
            <div className="result-box" style={{ whiteSpace: "pre-wrap", lineHeight: 1.7, maxHeight: "360px", overflowY: "auto" }}>
              {output}
            </div>
            <button
              className="btn-primary mt-3"
              onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied!"); }}
            >
              <Copy size={14} /> Copy text
            </button>
          </div>
        )}
      </div>
    </div>
  );
}