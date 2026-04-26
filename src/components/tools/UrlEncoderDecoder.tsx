import React, { useState } from 'react';
import type { FAQItem } from "../../hooks/useSEO"
import type { RelatedTool } from "../../lib/types";

export default function UrlEncoderDecoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  const handleProcess = () => {
    setError('');
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (err) {
      setError('Invalid input for decoding. Please ensure the URL is properly encoded.');
      setOutput('');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
    }
  };

  const faqs: FAQItem[] = [
    {
      question: "What is URL encoding?",
      answer: "URL encoding, also known as percent-encoding, is a mechanism for encoding information in a Uniform Resource Identifier (URI). It replaces unsafe ASCII characters with a '%' followed by two hexadecimal digits."
    },
    {
      question: "Why do I need to encode URLs?",
      answer: "URLs can only be sent over the Internet using the ASCII character-set. Since URLs often contain characters outside the ASCII set, the URL has to be converted into a valid ASCII format. URL encoding replaces unsafe characters with a '%' followed by two hexadecimal digits."
    },
    {
      question: "What characters are encoded?",
      answer: "Characters like spaces, punctuation marks, and special symbols (e.g., &, =, ?, /, #) are encoded. For example, a space becomes '%20', and an ampersand '&' becomes '%26'."
    },
    {
      question: "What is URL decoding?",
      answer: "URL decoding is the reverse process of URL encoding. It converts the percent-encoded characters back to their original form, making the URL readable and usable by applications."
    },
    {
      question: "Is this tool safe to use?",
      answer: "Yes, this tool is completely safe. All encoding and decoding processes happen locally in your browser. No data is sent to our servers, ensuring your information remains private and secure."
    }
  ];

  const relatedTools: RelatedTool[] = [
    { title: "Base64 Tool", slug: "base64-tool", emoji: "🔐" },
    { title: "HTML Encoder Decoder", slug: "html-encoder-decoder", emoji: "🌐" },
    { title: "JSON Formatter", slug: "json-formatter", emoji: "📋" }
  ];

  return (
    <div className="tool-widget-content">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-3xl mx-auto">
        <div className="mb-6 flex space-x-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value="encode"
              checked={mode === 'encode'}
              onChange={() => setMode('encode')}
              className="w-4 h-4 text-green-700 focus:ring-green-700 border-gray-300"
            />
            <span className="text-gray-700 font-medium">Encode</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value="decode"
              checked={mode === 'decode'}
              onChange={() => setMode('decode')}
              className="w-4 h-4 text-green-700 focus:ring-green-700 border-gray-300"
            />
            <span className="text-gray-700 font-medium">Decode</span>
          </label>
        </div>

        <div className="mb-4">
          <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
            Input String
          </label>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none resize-y"
            placeholder={mode === 'encode' ? "Enter text to encode (e.g., Hello World!)" : "Enter text to decode (e.g., Hello%20World!)"}
          />
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={handleProcess}
            className="px-6 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors"
          >
            {mode === 'encode' ? 'Encode' : 'Decode'}
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-2 bg-yellow-300 text-gray-800 font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Clear
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="output" className="block text-sm font-medium text-gray-700">
              Result
            </label>
            {output && (
              <button
                onClick={handleCopy}
                className="text-sm text-green-700 hover:text-green-800 font-medium flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
            )}
          </div>
          <textarea
            id="output"
            value={output}
            readOnly
            className="w-full h-32 p-3 bg-gray-50 border border-gray-300 rounded-lg outline-none resize-y text-gray-800"
            placeholder="Result will appear here..."
          />
        </div>
      </div>
      {/* ── Long-form content ── */}
      <section style={{ marginTop: "2rem", borderTop: "1.5px solid #E8E6DE", paddingTop: "1.5rem" }}>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          What is URL encoding and why is it needed?
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1rem" }}>
          URLs can only contain a limited set of ASCII characters. Special characters like spaces, ampersands, and non-ASCII letters must be <strong>percent-encoded</strong> — replaced with a <code style={{ background: "#F7F6F1", padding: "0.1rem 0.4rem", borderRadius: "0.3rem", fontSize: "0.875rem" }}>%</code> followed by the two-digit hexadecimal UTF-8 byte value. For example, a space becomes <code style={{ background: "#F7F6F1", padding: "0.1rem 0.4rem", borderRadius: "0.3rem", fontSize: "0.875rem" }}>%20</code> and an ampersand becomes <code style={{ background: "#F7F6F1", padding: "0.1rem 0.4rem", borderRadius: "0.3rem", fontSize: "0.875rem" }}>%26</code>.
        </p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", marginTop: "0.75rem" }}>
          <thead>
            <tr style={{ background: "#F7F6F1" }}>
              <th style={{ padding: "0.6rem 0.875rem", textAlign: "left", borderBottom: "1.5px solid #E8E6DE", fontWeight: 700, color: "#1A1A1A" }}>Character</th>
              <th style={{ padding: "0.6rem 0.875rem", textAlign: "left", borderBottom: "1.5px solid #E8E6DE", fontWeight: 700, color: "#1A1A1A" }}>Encoded</th>
            </tr>
          </thead>
          <tbody>
            {[["Space","%20"],["!","%21"],["#","%23"],["&","%26"],["=","%3D"],["/","%2F"],["?","%3F"],["@","%40"],["[","%5B"],["]","%5D"]].map(([c,e]) => (
              <tr key={c} style={{ borderBottom: "1px solid #F0EDE6" }}>
                <td style={{ padding: "0.55rem 0.875rem", color: "#374151", fontFamily: "monospace", fontWeight: 600 }}>{c}</td>
                <td style={{ padding: "0.55rem 0.875rem", color: "#374151", fontFamily: "monospace" }}>{e}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

    </div>
  );
}