import { useState } from "react";

const backronymWords: Record<string, string[]> = {
  A:["Advanced","Automated","Adaptive","Agile","Awesome"],
  B:["Bold","Brilliant","Blazing","Balanced","Broad"],
  C:["Creative","Core","Connected","Comprehensive","Cutting-edge"],
  D:["Dynamic","Driven","Digital","Distributed","Deep"],
  E:["Enhanced","Efficient","Elastic","Empowered","Evolving"],
  F:["Fast","Flexible","Focused","Forward","Functional"],
  G:["Global","Guided","Generative","Groundbreaking","Growing"],
  H:["High-performance","Hybrid","Holistic","Human","Helpful"],
  I:["Intelligent","Integrated","Innovative","Inclusive","Instant"],
  J:["Joint","Just-in-time","Joyful","Journeyed","Judicious"],
  K:["Knowledge","Key","Kinetic","Known","Keen"],
  L:["Lightweight","Layered","Lean","Learning","Linked"],
  M:["Modular","Modern","Multi-platform","Managed","Meaningful"],
  N:["Next-gen","Native","Neural","Networked","Nimble"],
  O:["Open","Optimized","Orchestrated","Outcome-driven","Omnichannel"],
  P:["Powerful","Predictive","Proactive","Parallel","Portable"],
  Q:["Quality","Quantified","Quick","Queryable","Quiet"],
  R:["Robust","Real-time","Reliable","Resilient","Responsive"],
  S:["Scalable","Secure","Smart","Streamlined","Sustainable"],
  T:["Trusted","Transparent","Transformative","Targeted","Tested"],
  U:["Unified","Universal","User-centric","Upgradeable","Utility"],
  V:["Versatile","Visual","Value-driven","Validated","Virtualized"],
  W:["Web-native","Workflow","Well-architected","Worldwide","Wired"],
  X:["eXtensible","eXperimental","eXpert","eXpress","eXclusive"],
  Y:["Yield-optimized","Year-round","Youthful","Yet-scalable","Yielding"],
  Z:["Zero-latency","Zone-aware","Zeal-driven","Zenith","Zero-trust"],
};

const funnyWords: Record<string, string[]> = {
  A:["Absolutely","Aggressively","Awkwardly"],B:["Bravely","Boldly","Bizarrely"],
  C:["Chaotically","Casually","Confusingly"],D:["Dramatically","Desperately","Dizzily"],
  E:["Enthusiastically","Extremely","Endlessly"],F:["Frantically","Fabulously","Fuzzily"],
  G:["Gloriously","Grumpily","Giddily"],H:["Heroically","Hilariously","Hastily"],
  I:["Impressively","Ironically","Inexplicably"],J:["Joyfully","Jauntily","Jokingly"],
  K:["Knowingly","Kindly","Kookily"],L:["Lazily","Loudly","Lovingly"],
  M:["Magnificently","Mysteriously","Madly"],N:["Nervously","Noisily","Nonchalantly"],
  O:["Obsessively","Oddly","Optimistically"],P:["Passionately","Politely","Peculiarly"],
  Q:["Quietly","Quirkily","Quizzically"],R:["Recklessly","Randomly","Ridiculously"],
  S:["Sneakily","Suspiciously","Sarcastically"],T:["Triumphantly","Timidly","Tirelessly"],
  U:["Unexpectedly","Urgently","Uselessly"],V:["Valiantly","Vigorously","Vaguely"],
  W:["Wildly","Weirdly","Wonderfully"],X:["eXuberantly","eXcessively","eXtraordinarily"],
  Y:["Yearningly","Youthfully","Yappily"],Z:["Zealously","Zestfully","Zanily"],
};

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export default function AcronymGenerator() {
  const [phrase, setPhrase] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const words = phrase.trim().split(/\s+/).filter(Boolean);
  const acronym = words.map(w => w[0].toUpperCase()).join("");

  const backronym = acronym.split("").map(l => {
    const opts = backronymWords[l] || [l + "…"];
    return pick(opts);
  }).join(" ");

  const funny = acronym.split("").map(l => {
    const opts = funnyWords[l] || [l + "…"];
    return pick(opts);
  }).join(" ");

  function copy(val: string, key: string) {
    navigator.clipboard.writeText(val);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  const results = acronym ? [
    { label: "Standard Acronym", value: acronym, bg: "#E8F5EE", accent: "#1B6B45" },
    { label: "Tech Backronym", value: backronym, bg: "#F0F4FF", accent: "#4F6EF7" },
    { label: "Funny Backronym", value: funny, bg: "#FFF9E0", accent: "#B8860B" },
  ] : [];

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        <div>
          <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>
            Enter a phrase or sentence
          </label>
          <input
            type="text"
            value={phrase}
            onChange={e => setPhrase(e.target.value)}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#1A1A1A", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "0.5rem", padding: "0.5rem 0.75rem", width: "100%", outline: "none" }}
            placeholder="e.g. Search Engine Optimization"
          />
        </div>

        {results.map(r => (
          <div key={r.label} style={{ background: r.bg, borderRadius: "0.875rem", padding: "1rem 1.25rem", border: "1.5px solid #E8E6DE" }}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.3rem" }}>{r.label}</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: r.label === "Standard Acronym" ? "2rem" : "1rem", color: r.accent, lineHeight: 1.4 }}>{r.value}</div>
              </div>
              <button onClick={() => copy(r.value, r.label)} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: copied === r.label ? "#1B6B45" : "#4B5563", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "9999px", padding: "0.3rem 0.85rem", cursor: "pointer", flexShrink: 0 }}>
                {copied === r.label ? "✓ Copied!" : "Copy"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}