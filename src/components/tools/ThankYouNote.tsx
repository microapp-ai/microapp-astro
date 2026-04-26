import { useState } from "react";

const tones = ["Formal", "Friendly", "Heartfelt"];

function generateNote(recipient: string, reason: string, detail: string, tone: string) {
  const r = recipient || "friend";
  const re = reason || "your kindness";
  const d = detail ? ` ${detail}.` : ".";
  if (tone === "Formal") {
    return `Dear ${r},\n\nI am writing to express my sincere gratitude for ${re}. Your thoughtfulness and generosity have made a meaningful difference${d}\n\nI truly appreciate everything you have done, and I hope to have the opportunity to return the favor in the future.\n\nWith warm regards,\n[Your Name]`;
  } else if (tone === "Friendly") {
    return `Hey ${r}!\n\nJust wanted to say a huge thank you for ${re}. It really meant a lot to me${d}\n\nYou're awesome and I'm so lucky to have you around. Thanks again — you made my day!\n\nCheers,\n[Your Name]`;
  } else {
    return `Dear ${r},\n\nFrom the bottom of my heart, thank you so much for ${re}. Words can barely express how much it means to me${d}\n\nYour kindness and thoughtfulness remind me of how fortunate I am. I will always remember this.\n\nWith love and gratitude,\n[Your Name]`;
  }
}

export default function ThankYouNote() {
  const [recipient, setRecipient] = useState("");
  const [reason, setReason] = useState("");
  const [detail, setDetail] = useState("");
  const [tone, setTone] = useState("Friendly");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);

  function generate() {
    setNote(generateNote(recipient, reason, detail, tone));
  }

  function copy() {
    navigator.clipboard.writeText(note);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const inputStyle: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#1A1A1A", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "0.5rem", padding: "0.5rem 0.75rem", width: "100%", outline: "none" };
  const labelStyle: React.CSSProperties = { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" };

  return (
    <div className="tool-widget-content">
      <div className="space-y-4">
        <div>
          <label style={labelStyle}>Recipient name</label>
          <input type="text" value={recipient} onChange={e => setRecipient(e.target.value)} style={inputStyle} placeholder="e.g. Sarah, Dr. Johnson, Mom" />
        </div>
        <div>
          <label style={labelStyle}>What are you thanking them for?</label>
          <input type="text" value={reason} onChange={e => setReason(e.target.value)} style={inputStyle} placeholder="e.g. the birthday gift, helping me move, the job referral" />
        </div>
        <div>
          <label style={labelStyle}>Personal detail (optional)</label>
          <input type="text" value={detail} onChange={e => setDetail(e.target.value)} style={inputStyle} placeholder="e.g. It was exactly what I needed" />
        </div>
        <div>
          <label style={labelStyle}>Tone</label>
          <div className="flex gap-2 flex-wrap">
            {tones.map(t => (
              <button key={t} onClick={() => setTone(t)} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", padding: "0.4rem 1rem", borderRadius: "9999px", border: "2px solid", borderColor: tone === t ? "#1B6B45" : "#E8E6DE", background: tone === t ? "#1B6B45" : "white", color: tone === t ? "white" : "#4B5563", cursor: "pointer" }}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <button onClick={generate} className="btn-primary">Generate Note</button>

        {note && (
          <div style={{ background: "#F7F6F1", borderRadius: "0.875rem", padding: "1.25rem", border: "1.5px solid #E8E6DE" }}>
            <div className="flex justify-between items-center mb-3">
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>Your Note</span>
              <button onClick={copy} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: copied ? "#1B6B45" : "#4B5563", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "9999px", padding: "0.25rem 0.75rem", cursor: "pointer" }}>
                {copied ? "✓ Copied!" : "Copy"}
              </button>
            </div>
            <pre style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#1A1A1A", whiteSpace: "pre-wrap", lineHeight: 1.7, margin: 0 }}>{note}</pre>
          </div>
        )}
      </div>
    </div>
  );
}