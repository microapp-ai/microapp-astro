/*
 * MICROAPP — Password Generator Tool
 */
import { useState, useCallback } from "react";
import { Copy, RefreshCw, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(true);

  const generate = useCallback(() => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    let charset = "";
    if (useUpper) charset += upper;
    if (useLower) charset += lower;
    if (useNumbers) charset += numbers;
    if (useSymbols) charset += symbols;
    if (!charset) { toast.error("Select at least one character type."); return; }
    let pwd = "";
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    for (let i = 0; i < length; i++) pwd += charset[arr[i] % charset.length];
    setPassword(pwd);
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  function strength(): { label: string; color: string; width: string } {
    if (!password) return { label: "", color: "#E8E6DE", width: "0%" };
    let score = 0;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (useUpper && useLower) score++;
    if (useNumbers) score++;
    if (useSymbols) score++;
    if (score <= 2) return { label: "Weak", color: "#E05252", width: "25%" };
    if (score === 3) return { label: "Fair", color: "#F59E0B", width: "50%" };
    if (score === 4) return { label: "Strong", color: "#1B6B45", width: "75%" };
    return { label: "Very Strong", color: "#1B6B45", width: "100%" };
  }

  const s = strength();

  const ToggleOption = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem",
        padding: "0.5rem 1rem", borderRadius: "9999px", border: "2px solid",
        borderColor: checked ? "#1B6B45" : "#E8E6DE",
        background: checked ? "#E8F5EE" : "white",
        color: checked ? "#1B6B45" : "#6B7280",
        transition: "all 0.15s ease",
        display: "flex", alignItems: "center", gap: "0.4rem",
      }}
    >
      <span style={{ width: "14px", height: "14px", borderRadius: "3px", border: `2px solid ${checked ? "#1B6B45" : "#D1D5DB"}`, background: checked ? "#1B6B45" : "white", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {checked && <span style={{ color: "white", fontSize: "9px", fontWeight: 900 }}>✓</span>}
      </span>
      {label}
    </button>
  );

  const faqs: FAQItem[] = [
    {
      question: "What makes a password strong?",
      answer: "A strong password typically includes a mix of uppercase and lowercase letters, numbers, and symbols. Its length is also a critical factor, with longer passwords being more secure.",
    },
    {
      question: "Is it safe to generate passwords online?",
      answer: "Yes, this tool generates passwords locally in your browser, meaning your generated passwords are never sent to any server, ensuring your privacy and security.",
    },
    {
      question: "How often should I change my passwords?",
      answer: "It's recommended to change your passwords regularly, especially for important accounts. Using a unique, strong password for each service is more crucial than frequent changes.",
    },
    {
      question: "Can I customize the characters used in my password?",
      answer: "Absolutely. This tool allows you to select whether to include uppercase letters, lowercase letters, numbers, and symbols, giving you full control over your password's complexity.",
    },
    {
      question: "What is the ideal length for a password?",
      answer: "While longer passwords are generally more secure, a length of 12-16 characters with a mix of character types is a good balance for most online accounts.",
    },
  ];

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        {/* Length slider */}
        <div>
          <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
            <span>Password Length</span>
            <span style={{ color: "#1B6B45" }}>{length} characters</span>
          </label>
          <input type="range" min={6} max={64} value={length} onChange={(e) => setLength(Number(e.target.value))} style={{ width: "100%", accentColor: "#1B6B45" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#9CA3AF", marginTop: "0.25rem" }}>
            <span>6</span><span>64</span>
          </div>
        </div>

        {/* Options */}
        <div>
          <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", display: "block", marginBottom: "0.6rem" }}>
            Include
          </label>
          <div className="flex flex-wrap gap-2">
            <ToggleOption label="Uppercase (A-Z)" checked={useUpper} onChange={() => setUseUpper(!useUpper)} />
            <ToggleOption label="Lowercase (a-z)" checked={useLower} onChange={() => setUseLower(!useLower)} />
            <ToggleOption label="Numbers (0-9)" checked={useNumbers} onChange={() => setUseNumbers(!useNumbers)} />
            <ToggleOption label="Symbols (!@#…)" checked={useSymbols} onChange={() => setUseSymbols(!useSymbols)} />
          </div>
        </div>

        <button className="btn-primary" onClick={generate}>
          <RefreshCw size={14} /> Generate Password
        </button>

        {password && (
          <div className="space-y-3">
            {/* Password display */}
            <div style={{ background: "#F7F6F1", border: "1.5px solid #E8E6DE", borderRadius: "0.875rem", padding: "1rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
              <span style={{ fontFamily: "'Courier New', monospace", fontSize: "1.05rem", color: "#1A1A1A", wordBreak: "break-all", flex: 1, letterSpacing: "0.05em" }}>
                {visible ? password : "•".repeat(password.length)}
              </span>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => setVisible(!visible)} style={{ padding: "0.4rem", borderRadius: "0.5rem", background: "white", border: "1.5px solid #E8E6DE", color: "#6B7280" }}>
                  {visible ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
                <button onClick={() => { navigator.clipboard.writeText(password); toast.success("Password copied!"); }} style={{ padding: "0.4rem", borderRadius: "0.5rem", background: "white", border: "1.5px solid #E8E6DE", color: "#6B7280" }}>
                  <Copy size={15} />
                </button>
              </div>
            </div>

            {/* Strength meter */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: s.color, marginBottom: "0.4rem" }}>
                <span>Strength</span><span>{s.label}</span>
              </div>
              <div style={{ height: "6px", background: "#E8E6DE", borderRadius: "9999px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: s.width, background: s.color, borderRadius: "9999px", transition: "width 0.3s ease" }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
