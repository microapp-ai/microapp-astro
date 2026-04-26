import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

type Header = { key: string; value: string };

export default function CurlBuilder() {
  const [url, setUrl] = useState("https://api.example.com/endpoint");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState<Header[]>([{ key: "Content-Type", value: "application/json" }]);
  const [body, setBody] = useState('{\n  "key": "value"\n}');
  const [followRedirects, setFollowRedirects] = useState(false);
  const [insecure, setInsecure] = useState(false);
  const [verbose, setVerbose] = useState(false);
  const [silent, setSilent] = useState(false);
  const [copied, setCopied] = useState(false);

  const hasBody = ["POST", "PUT", "PATCH"].includes(method);

  function buildCurl() {
    const parts = ["curl"];
    if (followRedirects) parts.push("-L");
    if (insecure) parts.push("-k");
    if (verbose) parts.push("-v");
    if (silent) parts.push("-s");
    if (method !== "GET") parts.push(`-X ${method}`);
    headers.filter(h => h.key.trim()).forEach(h => {
      parts.push(`-H "${h.key}: ${h.value}"`);
    });
    if (hasBody && body.trim()) {
      parts.push(`-d '${body.replace(/\'/g, "\\'")}'`);
    }
    parts.push(`"${url}"`);
    return parts.join(" \\\n  ");
  }

  function addHeader() {
    setHeaders([...headers, { key: "", value: "" }]);
  }

  function removeHeader(i: number) {
    setHeaders(headers.filter((_, idx) => idx !== i));
  }

  function updateHeader(i: number, field: "key" | "value", val: string) {
    setHeaders(headers.map((h, idx) => idx === i ? { ...h, [field]: val } : h));
  }

  function copy() {
    navigator.clipboard.writeText(buildCurl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const inputStyle = { fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#1A1A1A", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "0.5rem", padding: "0.5rem 0.75rem", width: "100%", outline: "none" };
  const labelStyle = { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", display: "block", marginBottom: "0.35rem" };

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        {/* URL + Method */}
        <div className="flex gap-3">
          <div style={{ width: "120px", flexShrink: 0 }}>
            <label style={labelStyle}>Method</label>
            <select value={method} onChange={e => setMethod(e.target.value)} style={{ ...inputStyle, width: "100%" }}>
              {["GET","POST","PUT","PATCH","DELETE","HEAD","OPTIONS"].map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>URL</label>
            <input type="text" value={url} onChange={e => setUrl(e.target.value)} style={inputStyle} placeholder="https://api.example.com/endpoint" />
          </div>
        </div>

        {/* Headers */}
        <div>
          <label style={labelStyle}>Headers</label>
          <div className="space-y-2">
            {headers.map((h, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input type="text" placeholder="Header name" value={h.key} onChange={e => updateHeader(i, "key", e.target.value)} style={{ ...inputStyle, flex: 1 }} />
                <input type="text" placeholder="Value" value={h.value} onChange={e => updateHeader(i, "value", e.target.value)} style={{ ...inputStyle, flex: 1 }} />
                <button onClick={() => removeHeader(i)} style={{ color: "#E05252", background: "none", border: "none", cursor: "pointer", padding: "0.25rem" }}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <button onClick={addHeader} style={{ marginTop: "0.5rem", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#1B6B45", background: "#E8F5EE", border: "1.5px solid #C6E6D4", borderRadius: "9999px", padding: "0.3rem 0.85rem", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
            <Plus size={13} /> Add header
          </button>
        </div>

        {/* Body */}
        {hasBody && (
          <div>
            <label style={labelStyle}>Request Body</label>
            <textarea value={body} onChange={e => setBody(e.target.value)} rows={5} style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace", fontSize: "0.85rem" }} />
          </div>
        )}

        {/* Flags */}
        <div>
          <label style={labelStyle}>Options</label>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "-L Follow redirects", val: followRedirects, set: setFollowRedirects },
              { label: "-k Insecure (skip SSL)", val: insecure, set: setInsecure },
              { label: "-v Verbose", val: verbose, set: setVerbose },
              { label: "-s Silent", val: silent, set: setSilent },
            ].map(opt => (
              <label key={opt.label} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#4B5563", cursor: "pointer" }}>
                <input type="checkbox" checked={opt.val} onChange={e => opt.set(e.target.checked)} style={{ accentColor: "#1B6B45" }} />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        {/* Output */}
        <div style={{ background: "#1A1A1A", borderRadius: "0.875rem", padding: "1.25rem" }}>
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em" }}>Generated cURL Command</span>
            <button onClick={copy} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: copied ? "#4ADE80" : "#FFE234", background: "transparent", border: "1.5px solid", borderColor: copied ? "#4ADE80" : "#FFE234", borderRadius: "9999px", padding: "0.25rem 0.75rem", cursor: "pointer" }}>
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <pre style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "#E5E7EB", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0 }}>{buildCurl()}</pre>
        </div>
      </div>
    </div>
  );
}