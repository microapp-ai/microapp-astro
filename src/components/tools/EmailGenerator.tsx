import { useState } from "react";

const firstNames = ["alex","jordan","taylor","morgan","casey","riley","avery","quinn","blake","drew","jamie","skyler","reese","finley","sage"];
const lastNames = ["smith","jones","chen","patel","garcia","kim","nguyen","brown","davis","wilson","moore","taylor","anderson","thomas","jackson"];
const words = ["blue","fast","cool","bright","swift","sharp","clear","bold","fresh","smart","calm","wild","pure","keen","warm"];
const domains = ["gmail.com","yahoo.com","outlook.com","proton.me","icloud.com"];

function randomFrom<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function randomNum(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function generateEmail(domain: string, style: string, customDomain: string): string {
  const d = domain === "custom" ? (customDomain || "example.com") : domain;
  if (style === "random") {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    const len = randomNum(6, 12);
    const username = Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    return `${username}@${d}`;
  }
  if (style === "first.last") {
    const sep = randomFrom([".", "_", ""]);
    return `${randomFrom(firstNames)}${sep}${randomFrom(lastNames)}${randomNum(0, 1) ? randomNum(1, 99) : ""}@${d}`;
  }
  // word+number
  return `${randomFrom(words)}${randomFrom(words)}${randomNum(10, 9999)}@${d}`;
}

export default function EmailGenerator() {
  const [count, setCount] = useState(5);
  const [domain, setDomain] = useState("gmail.com");
  const [customDomain, setCustomDomain] = useState("");
  const [style, setStyle] = useState("first.last");
  const [emails, setEmails] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | "all" | null>(null);

  function generate() {
    setEmails(Array.from({ length: count }, () => generateEmail(domain, style, customDomain)));
  }

  function copy(email: string, i: number) {
    navigator.clipboard.writeText(email);
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  }

  function copyAll() {
    navigator.clipboard.writeText(emails.join("\n"));
    setCopied("all");
    setTimeout(() => setCopied(null), 2000);
  }

  const inputStyle: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#1A1A1A", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "0.5rem", padding: "0.45rem 0.75rem", outline: "none", width: "100%" };
  const labelStyle: React.CSSProperties = { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" };

  return (
    <div className="tool-widget-content">
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>Count: {count}</label>
            <input type="range" min={1} max={20} value={count} onChange={e => setCount(parseInt(e.target.value))} style={{ width: "100%", accentColor: "#1B6B45" }} />
          </div>
          <div>
            <label style={labelStyle}>Domain</label>
            <select value={domain} onChange={e => setDomain(e.target.value)} style={inputStyle}>
              {domains.map(d => <option key={d}>{d}</option>)}
              <option value="custom">Custom…</option>
            </select>
          </div>
          {domain === "custom" && (
            <div>
              <label style={labelStyle}>Custom domain</label>
              <input type="text" value={customDomain} onChange={e => setCustomDomain(e.target.value)} style={inputStyle} placeholder="e.g. mycompany.com" />
            </div>
          )}
          <div>
            <label style={labelStyle}>Username style</label>
            <select value={style} onChange={e => setStyle(e.target.value)} style={inputStyle}>
              <option value="first.last">first.last</option>
              <option value="word+number">word+number</option>
              <option value="random">random</option>
            </select>
          </div>
        </div>

        <button onClick={generate} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1rem", color: "#1A1A1A", background: "#FFE234", border: "2px solid #1A1A1A", borderRadius: "9999px", padding: "0.65rem 1.75rem", cursor: "pointer" }}>
          Generate
        </button>

        {emails.length > 0 && (
          <div style={{ background: "#F7F6F1", borderRadius: "0.875rem", padding: "1.25rem", border: "1.5px solid #E8E6DE" }}>
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>{emails.length} emails</span>
              <button onClick={copyAll} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: copied === "all" ? "#1B6B45" : "#4B5563", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "9999px", padding: "0.25rem 0.75rem", cursor: "pointer" }}>
                {copied === "all" ? "✓ All Copied!" : "Copy All"}
              </button>
            </div>
            <div className="space-y-2">
              {emails.map((email, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", padding: "0.5rem 0.75rem", background: "white", borderRadius: "0.5rem", border: "1px solid #E8E6DE" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "0.9rem", color: "#1A1A1A" }}>{email}</span>
                  <button onClick={() => copy(email, i)} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.75rem", color: copied === i ? "#1B6B45" : "#4B5563", background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}>
                    {copied === i ? "✓" : "Copy"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}