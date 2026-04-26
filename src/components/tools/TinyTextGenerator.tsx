import { useState } from "react";

const superscriptMap: Record<string, string> = {
  a:"ᵃ",b:"ᵇ",c:"ᶜ",d:"ᵈ",e:"ᵉ",f:"ᶠ",g:"ᵍ",h:"ʰ",i:"ⁱ",j:"ʲ",k:"ᵏ",l:"ˡ",m:"ᵐ",
  n:"ⁿ",o:"ᵒ",p:"ᵖ",q:"q",r:"ʳ",s:"ˢ",t:"ᵗ",u:"ᵘ",v:"ᵛ",w:"ʷ",x:"ˣ",y:"ʸ",z:"ᶻ",
  A:"ᴬ",B:"ᴮ",C:"ᶜ",D:"ᴰ",E:"ᴱ",F:"ᶠ",G:"ᴳ",H:"ᴴ",I:"ᴵ",J:"ᴶ",K:"ᴷ",L:"ᴸ",M:"ᴹ",
  N:"ᴺ",O:"ᴼ",P:"ᴾ",Q:"Q",R:"ᴿ",S:"ˢ",T:"ᵀ",U:"ᵁ",V:"ⱽ",W:"ᵂ",X:"ˣ",Y:"ʸ",Z:"ᶻ",
  "0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹"," ":" "
};
const subscriptMap: Record<string, string> = {
  a:"ₐ",b:"b",c:"c",d:"d",e:"ₑ",f:"f",g:"g",h:"ₕ",i:"ᵢ",j:"ⱼ",k:"ₖ",l:"ₗ",m:"ₘ",
  n:"ₙ",o:"ₒ",p:"ₚ",q:"q",r:"ᵣ",s:"ₛ",t:"ₜ",u:"ᵤ",v:"ᵥ",w:"w",x:"ₓ",y:"y",z:"z",
  "0":"₀","1":"₁","2":"₂","3":"₃","4":"₄","5":"₅","6":"₆","7":"₇","8":"₈","9":"₉"," ":" "
};
const smallCapsMap: Record<string, string> = {
  a:"ᴀ",b:"ʙ",c:"ᴄ",d:"ᴅ",e:"ᴇ",f:"ꜰ",g:"ɢ",h:"ʜ",i:"ɪ",j:"ᴊ",k:"ᴋ",l:"ʟ",m:"ᴍ",
  n:"ɴ",o:"ᴏ",p:"ᴘ",q:"q",r:"ʀ",s:"ꜱ",t:"ᴛ",u:"ᴜ",v:"ᴠ",w:"ᴡ",x:"x",y:"ʏ",z:"ᴢ"," ":" "
};

function convert(text: string, map: Record<string, string>) {
  return text.split("").map(c => map[c] ?? map[c.toLowerCase()] ?? c).join("");
}

export default function TinyTextGenerator() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const variants = [
    { label: "Superscript", value: convert(input, superscriptMap) },
    { label: "Subscript", value: convert(input, subscriptMap) },
    { label: "Small Caps", value: convert(input.toLowerCase(), smallCapsMap) },
  ];

  function copy(text: string, label: string) {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        <div>
          <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#1A1A1A", display: "block", marginBottom: "0.5rem" }}>
            Your text
          </label>
          <textarea
            className="tool-input w-full"
            rows={4}
            placeholder="Type or paste your text here…"
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{ resize: "vertical" }}
          />
        </div>

        {input && (
          <div className="space-y-3">
            {variants.map(v => (
              <div key={v.label} style={{ background: "#F7F6F1", borderRadius: "0.75rem", padding: "1rem 1.25rem", border: "1.5px solid #E8E6DE" }}>
                <div className="flex items-center justify-between mb-2">
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>{v.label}</span>
                  <button
                    onClick={() => copy(v.value, v.label)}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: copied === v.label ? "#1B6B45" : "#4B5563", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "9999px", padding: "0.25rem 0.75rem", cursor: "pointer" }}
                  >
                    {copied === v.label ? "✓ Copied!" : "Copy"}
                  </button>
                </div>
                <p style={{ fontFamily: "monospace", fontSize: "1.1rem", color: "#1A1A1A", wordBreak: "break-all", lineHeight: 1.6 }}>{v.value || <span style={{ color: "#9CA3AF" }}>—</span>}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}