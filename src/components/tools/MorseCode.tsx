import { useState } from "react";

const morseMap: Record<string, string> = {
  A:".-",B:"-...",C:"-.-.",D:"-..",E:".",F:"..-.",G:"--.",H:"....",I:"..",J:".---",
  K:"-.-",L:".-..",M:"--",N:"-.",O:"---",P:".--.",Q:"--.-",R:".-.",S:"...",T:"-",
  U:"..-",V:"...-",W:".--",X:"-..-",Y:"-.--",Z:"--..",
  "0":"-----","1":".----","2":"..---","3":"...--","4":"....-","5":".....",
  "6":"-....","7":"--...","8":"---..","9":"----.",
  ".":".-.-.-",",":"--..--","?":"..--..","!":"-.-.--","/":"-..-.",
  "(":"-.--.",")":"-.--.-","&":".-...",":":"---...",";":"-.-.-.","=":"-...-",
  "+":".-.-.","-":"-....-","_":"..--.-","\"":".-..-.","$":"...-..-","@":".--.-.",
};
const reverseMorse: Record<string, string> = Object.fromEntries(Object.entries(morseMap).map(([k, v]) => [v, k]));

function textToMorse(text: string): string {
  return text.toUpperCase().split("").map(c => {
    if (c === " ") return "/";
    return morseMap[c] || c;
  }).join(" ");
}

function morseToText(morse: string): string {
  return morse.split(" / ").map(word =>
    word.split(" ").map(code => reverseMorse[code] || "?").join("")
  ).join(" ");
}

const reference = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

export default function MorseCode() {
  const [tab, setTab] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const output = tab === "encode" ? textToMorse(input) : morseToText(input);

  function copy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        {/* Tab switcher */}
        <div className="flex gap-2">
          {(["encode", "decode"] as const).map(t => (
            <button key={t} onClick={() => { setTab(t); setInput(""); }} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", padding: "0.4rem 1.1rem", borderRadius: "9999px", border: "2px solid", borderColor: tab === t ? "#1B6B45" : "#E8E6DE", background: tab === t ? "#1B6B45" : "white", color: tab === t ? "white" : "#4B5563", cursor: "pointer" }}>
              {t === "encode" ? "Text → Morse" : "Morse → Text"}
            </button>
          ))}
        </div>

        <div>
          <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>
            {tab === "encode" ? "Enter text" : "Enter Morse code (use spaces between letters, / between words)"}
          </label>
          <textarea
            className="tool-input w-full"
            rows={3}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={tab === "encode" ? "Type your message here…" : "e.g. .... . .-.. .-.. --- / .-- --- .-. .-.. -.."}
            style={{ resize: "vertical", fontFamily: tab === "decode" ? "monospace" : "inherit" }}
          />
        </div>

        {input && (
          <div style={{ background: "#1A1A1A", borderRadius: "0.875rem", padding: "1.25rem" }}>
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {tab === "encode" ? "Morse Code" : "Decoded Text"}
              </span>
              <button onClick={copy} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: copied ? "#4ADE80" : "#FFE234", background: "transparent", border: "1.5px solid", borderColor: copied ? "#4ADE80" : "#FFE234", borderRadius: "9999px", padding: "0.25rem 0.75rem", cursor: "pointer" }}>
                {copied ? "✓ Copied!" : "Copy"}
              </button>
            </div>
            <p style={{ fontFamily: "monospace", fontSize: "0.95rem", color: "#E5E7EB", wordBreak: "break-all", lineHeight: 1.7, margin: 0 }}>{output}</p>
          </div>
        )}

        {/* Reference table */}
        <details style={{ borderRadius: "0.875rem", border: "1.5px solid #E8E6DE", overflow: "hidden" }}>
          <summary style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#1A1A1A", padding: "0.875rem 1.25rem", cursor: "pointer", background: "#F7F6F1" }}>
            Morse Code Reference (A–Z, 0–9)
          </summary>
          <div style={{ padding: "1rem 1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: "0.5rem" }}>
              {reference.map(c => (
                <div key={c} style={{ background: "#F7F6F1", borderRadius: "0.5rem", padding: "0.4rem 0.6rem", textAlign: "center", border: "1px solid #E8E6DE" }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "0.9rem", color: "#1A1A1A" }}>{c}</div>
                  <div style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#1B6B45", marginTop: "0.1rem" }}>{morseMap[c]}</div>
                </div>
              ))}
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
