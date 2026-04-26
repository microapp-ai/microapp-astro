import { useState } from "react";

const flipMap: Record<string, string> = {
  a:"ɐ",b:"q",c:"ɔ",d:"p",e:"ǝ",f:"ɟ",g:"ƃ",h:"ɥ",i:"ᴉ",j:"ɾ",k:"ʞ",l:"l",m:"ɯ",
  n:"u",o:"o",p:"d",q:"b",r:"ɹ",s:"s",t:"ʇ",u:"n",v:"ʌ",w:"ʍ",x:"x",y:"ʎ",z:"z",
  A:"∀",B:"ᗺ",C:"Ɔ",D:"ᗡ",E:"Ǝ",F:"Ⅎ",G:"פ",H:"H",I:"I",J:"ɾ",K:"ʞ",L:"˥",M:"W",
  N:"N",O:"O",P:"Ԁ",Q:"Q",R:"ᴚ",S:"S",T:"┴",U:"∩",V:"Λ",W:"M",X:"X",Y:"⅄",Z:"Z",
  "0":"0","1":"Ɩ","2":"ᄅ","3":"Ɛ","4":"ㄣ","5":"ϛ","6":"9","7":"ㄥ","8":"8","9":"6",
  ".":"˙",",":"´","?":"¿","!":"¡","(":")",")":"(","[":"]","]":"[","{":"}","}":"{",
  " ":" ","''":",,"
};

export default function ReverseTextGenerator() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const reversed = input.split("").reverse().join("");
  const reversedWords = input.split(" ").reverse().join(" ");
  const upsideDown = input.split("").map(c => flipMap[c] ?? c).reverse().join("");
  const mirror = input.split("").reverse().map(c => flipMap[c] ?? c).join("");

  const variants = [
    { label: "Reversed Text", value: reversed },
    { label: "Reversed Word Order", value: reversedWords },
    { label: "Upside Down", value: upsideDown },
    { label: "Mirror Text", value: mirror },
  ];

  function copy(val: string, label: string) {
    navigator.clipboard.writeText(val);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        <div>
          <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#1A1A1A", display: "block", marginBottom: "0.5rem" }}>Your text</label>
          <textarea
            className="tool-input w-full"
            rows={3}
            placeholder="Type something here…"
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{ resize: "vertical" }}
          />
        </div>

        {input && (
          <div className="space-y-3">
            {variants.map(v => (
              <div key={v.label} style={{ background: "#F7F6F1", borderRadius: "0.875rem", padding: "1rem 1.25rem", border: "1.5px solid #E8E6DE" }}>
                <div className="flex items-center justify-between mb-2">
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em" }}>{v.label}</span>
                  <button onClick={() => copy(v.value, v.label)} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: copied === v.label ? "#1B6B45" : "#4B5563", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "9999px", padding: "0.25rem 0.75rem", cursor: "pointer" }}>
                    {copied === v.label ? "✓ Copied!" : "Copy"}
                  </button>
                </div>
                <p style={{ fontFamily: "monospace", fontSize: "1rem", color: "#1A1A1A", wordBreak: "break-all", lineHeight: 1.6, margin: 0 }}>{v.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}