import { useState } from "react";

function randomOctet(min = 0, max = 255) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateIPv4(type: string): string {
  if (type === "public") {
    // Avoid reserved ranges
    let ip = "";
    while (true) {
      const a = randomOctet(1, 254);
      if (a === 10 || a === 127 || a === 169 || a === 172 || a === 192 || a === 0) continue;
      ip = `${a}.${randomOctet()}.${randomOctet()}.${randomOctet(1, 254)}`;
      break;
    }
    return ip;
  }
  if (type === "private-a") return `10.${randomOctet()}.${randomOctet()}.${randomOctet(1, 254)}`;
  if (type === "private-b") return `172.${randomOctet(16, 31)}.${randomOctet()}.${randomOctet(1, 254)}`;
  if (type === "private-c") return `192.168.${randomOctet()}.${randomOctet(1, 254)}`;
  if (type === "loopback") return `127.0.0.${randomOctet(1, 254)}`;
  return `${randomOctet(1, 254)}.${randomOctet()}.${randomOctet()}.${randomOctet(1, 254)}`;
}

function generateIPv6(): string {
  return Array.from({ length: 8 }, () =>
    Math.floor(Math.random() * 65536).toString(16).padStart(4, "0")
  ).join(":");
}

const ipTypes = [
  { key: "public", label: "Public IPv4" },
  { key: "private-a", label: "Private Class A (10.x)" },
  { key: "private-b", label: "Private Class B (172.16–31.x)" },
  { key: "private-c", label: "Private Class C (192.168.x)" },
  { key: "loopback", label: "Loopback (127.x)" },
  { key: "ipv6", label: "IPv6" },
];

export default function GenerateRandomIp() {
  const [type, setType] = useState("public");
  const [count, setCount] = useState(5);
  const [ips, setIps] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | "all" | null>(null);

  function generate() {
    const result = Array.from({ length: count }, () =>
      type === "ipv6" ? generateIPv6() : generateIPv4(type)
    );
    setIps(result);
  }

  function copy(ip: string, i: number) {
    navigator.clipboard.writeText(ip);
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  }

  function copyAll() {
    navigator.clipboard.writeText(ips.join("\n"));
    setCopied("all");
    setTimeout(() => setCopied(null), 2000);
  }

  const labelStyle: React.CSSProperties = { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" };

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        <div>
          <label style={labelStyle}>IP Type</label>
          <div className="flex flex-wrap gap-2">
            {ipTypes.map(t => (
              <button key={t.key} onClick={() => setType(t.key)} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", padding: "0.35rem 0.85rem", borderRadius: "9999px", border: "2px solid", borderColor: type === t.key ? "#1B6B45" : "#E8E6DE", background: type === t.key ? "#1B6B45" : "white", color: type === t.key ? "white" : "#4B5563", cursor: "pointer" }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={labelStyle}>Count: {count}</label>
          <input type="range" min={1} max={20} value={count} onChange={e => setCount(parseInt(e.target.value))} style={{ width: "100%", accentColor: "#1B6B45" }} />
        </div>

        <button onClick={generate} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1rem", color: "#1A1A1A", background: "#FFE234", border: "2px solid #1A1A1A", borderRadius: "9999px", padding: "0.65rem 1.75rem", cursor: "pointer" }}>
          Generate IPs
        </button>

        {ips.length > 0 && (
          <div style={{ background: "#F7F6F1", borderRadius: "0.875rem", padding: "1.25rem", border: "1.5px solid #E8E6DE" }}>
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>{ips.length} addresses</span>
              <button onClick={copyAll} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: copied === "all" ? "#1B6B45" : "#4B5563", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "9999px", padding: "0.25rem 0.75rem", cursor: "pointer" }}>
                {copied === "all" ? "✓ Copied!" : "Copy All"}
              </button>
            </div>
            <div className="space-y-2">
              {ips.map((ip, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", padding: "0.5rem 0.75rem", background: "white", borderRadius: "0.5rem", border: "1px solid #E8E6DE" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "0.9rem", color: "#1A1A1A" }}>{ip}</span>
                  <button onClick={() => copy(ip, i)} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.75rem", color: copied === i ? "#1B6B45" : "#4B5563", background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}>
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