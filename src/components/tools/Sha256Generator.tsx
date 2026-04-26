import React, { useState, useCallback } from "react";
import type { FAQItem } from "../../hooks/useSEO"
import type { RelatedTool } from "../../lib/types";

const Sha256Generator: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [hashedText, setHashedText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const generateHash = useCallback(async () => {
    setError(null);
    if (!inputText) {
      setHashedText("");
      return;
    }

    try {
      const textEncoder = new TextEncoder();
      const data = textEncoder.encode(inputText);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hexHash = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      setHashedText(hexHash);
    } catch (e) {
      console.error("Error generating SHA-256 hash:", e);
      setError("Failed to generate hash. Please try again.");
      setHashedText("");
    }
  }, [inputText]);

  const faqs: FAQItem[] = [
    {
      question: "What is SHA-256?",
      answer: "SHA-256 (Secure Hash Algorithm 256-bit) is a cryptographic hash function that generates a fixed-size 256-bit (32-byte) hash value. It\'s a one-way function, meaning it\'s computationally infeasible to reverse the hash to find the original input data.",
    },
    {
      question: "How does SHA-256 work?",
      answer: "SHA-256 takes an input (message) of any length and produces a fixed-size output (hash value). It processes the input in blocks, applying a series of bitwise operations, modular additions, and compression functions to generate the final hash. Even a small change in the input will result in a drastically different hash.",
    },
    {
      question: "What are common uses for SHA-256?",
      answer: "SHA-256 is widely used for data integrity verification, digital signatures, password storage (by hashing passwords before storing them), blockchain technology (e.g., Bitcoin mining), and generating unique identifiers for data.",
    },
    {
      question: "Is SHA-256 secure?",
      answer: "SHA-256 is considered very secure for most applications. While theoretical attacks exist, they are not practically feasible with current technology. It\'s resistant to collision attacks (finding two different inputs that produce the same hash) and preimage attacks (finding an input that produces a given hash).",
    },
    {
      question: "Can I decrypt a SHA-256 hash?",
      answer: "No, SHA-256 is a one-way cryptographic hash function. It\'s designed to be irreversible, meaning you cannot decrypt or reverse-engineer a SHA-256 hash to obtain the original input text. This property is crucial for its security applications, such as password storage.",
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: "MD5 Generator", slug: "md5-generator", emoji: "🔢" },
    { title: "UUID Generator", slug: "uuid-generator", emoji: "🆔" },
    { title: "Base64 Encoder/Decoder", slug: "base64-tool", emoji: "🔡" },
  ];

  return (
    <div className="tool-widget-content">
      <div className="flex flex-col space-y-4">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 resize-y min-h-[120px]"
          placeholder="Enter text here to generate SHA-256 hash..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>

        <button
          className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 transition-colors duration-200"
          onClick={generateHash}
        >
          Generate SHA-256 Hash
        </button>

        {error && (
          <div className="text-red-600 bg-red-100 p-3 rounded-md">
            {error}
          </div>
        )}

        <div className="flex flex-col space-y-2">
          <label htmlFor="hashed-output" className="text-lg font-semibold">
            SHA-256 Hash:
          </label>
          <textarea
            id="hashed-output"
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 font-mono text-gray-800 resize-y min-h-[80px]"
            readOnly
            value={hashedText}
            placeholder="Generated hash will appear here..."
          ></textarea>
          {hashedText && (
            <button
              className="w-full bg-yellow-300 text-gray-900 py-2 px-4 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 transition-colors duration-200"
              onClick={() => navigator.clipboard.writeText(hashedText)}
            >
              Copy Hash
            </button>
          )}
        </div>
      </div>
      {/* ── Long-form content ── */}
      <section style={{ marginTop: "2rem", borderTop: "1.5px solid #E8E6DE", paddingTop: "1.5rem" }}>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          What is SHA-256 and when should you use it?
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1rem" }}>
          SHA-256 (Secure Hash Algorithm 256-bit) is a cryptographic hash function that produces a fixed 64-character hexadecimal digest from any input. It is a one-way function — you cannot reverse a hash to recover the original text. SHA-256 is used to verify file integrity, store passwords securely (with salting), generate digital signatures, and power Bitcoin's proof-of-work algorithm.
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1rem" }}>
          <strong>Example:</strong> SHA-256("hello") = <code style={{ background: "#F7F6F1", padding: "0.1rem 0.4rem", borderRadius: "0.3rem", fontSize: "0.8rem", wordBreak: "break-all" }}>2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824</code>. Even changing one character completely changes the hash — this is called the avalanche effect.
        </p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", marginTop: "0.75rem" }}>
          <thead>
            <tr style={{ background: "#F7F6F1" }}>
              <th style={{ padding: "0.6rem 0.875rem", textAlign: "left", borderBottom: "1.5px solid #E8E6DE", fontWeight: 700, color: "#1A1A1A" }}>Algorithm</th>
              <th style={{ padding: "0.6rem 0.875rem", textAlign: "left", borderBottom: "1.5px solid #E8E6DE", fontWeight: 700, color: "#1A1A1A" }}>Output Size</th>
              <th style={{ padding: "0.6rem 0.875rem", textAlign: "left", borderBottom: "1.5px solid #E8E6DE", fontWeight: 700, color: "#1A1A1A" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[["MD5","128-bit (32 hex chars)","Broken — avoid for security"],["SHA-1","160-bit (40 hex chars)","Deprecated"],["SHA-256","256-bit (64 hex chars)","Secure — widely used"],["SHA-512","512-bit (128 hex chars)","Secure — higher strength"]].map(([a,s,st]) => (
              <tr key={a} style={{ borderBottom: "1px solid #F0EDE6" }}>
                <td style={{ padding: "0.55rem 0.875rem", color: "#374151", fontFamily: "monospace", fontWeight: 600 }}>{a}</td>
                <td style={{ padding: "0.55rem 0.875rem", color: "#374151" }}>{s}</td>
                <td style={{ padding: "0.55rem 0.875rem", color: "#374151" }}>{st}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

    </div>
  );
};

export default Sha256Generator;