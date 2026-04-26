import React, { useState, useEffect } from "react";
import type { FAQItem } from "../../hooks/useSEO"
import type { RelatedTool } from "../../lib/types";

const HexToRgbConverter: React.FC = () => {
  const [hexInput, setHexInput] = useState<string>("");
  const [rgbOutput, setRgbOutput] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (hexInput === "") {
      setRgbOutput("");
      setError("");
      return;
    }

    const hex = hexInput.startsWith("#") ? hexInput.slice(1) : hexInput;

    if (!/^[0-9A-Fa-f]{6}$/.test(hex) && !/^[0-9A-Fa-f]{3}$/.test(hex)) {
      setError("Invalid HEX color format. Please use 3 or 6 hexadecimal characters.");
      setRgbOutput("");
      return;
    }

    setError("");

    let r = 0, g = 0, b = 0;

    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }

    setRgbOutput(`rgb(${r}, ${g}, ${b})`);
  }, [hexInput]);

  const faqs: FAQItem[] = [
    {
      question: "What is a HEX color code?",
      answer: "A HEX color code is a hexadecimal format for representing colors, commonly used in web design and digital graphics. It typically starts with a hash symbol (#) followed by six hexadecimal characters (0-9, A-F). Each pair of characters represents the intensity of red, green, and blue, respectively, ranging from 00 (least intense) to FF (most intense)."
    },
    {
      question: "What is an RGB color value?",
      answer: "RGB stands for Red, Green, Blue. It's a color model where colors are created by mixing varying intensities of these three primary colors. Each color component (red, green, blue) is represented by an integer from 0 to 255, where 0 means no intensity and 255 means full intensity. RGB is widely used in electronic displays like TVs, monitors, and smartphones."
    },
    {
      question: "Why convert between HEX and RGB?",
      answer: "Converting between HEX and RGB is essential for designers and developers to ensure color consistency across different platforms and tools. Some applications prefer HEX codes, while others use RGB values. Understanding both formats allows for precise color specification and reproduction, facilitating seamless workflow between design and development stages."
    },
    {
      question: "How do I use this Hex to RGB Converter?",
      answer: "Simply type or paste your HEX color code (e.g., #1B6B45 or 1B6B45) into the input field. The converter will automatically process the input and display the corresponding RGB values in real-time. You can then copy the RGB output for use in your projects."
    },
    {
      question: "Are there any limitations to HEX or RGB colors?",
      answer: "Both HEX and RGB represent colors within the sRGB color space, which is a standard for digital displays. While they can represent millions of colors, they don't cover the entire spectrum of human vision or specialized color spaces like CMYK (used in printing). For most digital applications, HEX and RGB are more than sufficient, but for print or highly specialized color work, other color models might be necessary."
    }
  ];

  const relatedTools: RelatedTool[] = [
    { title: "Color Converter", slug: "color-converter", emoji: "🎨" },
    { title: "Hex Color Picker", slug: "hex-color-picker", emoji: "🌈" },
    { title: "Slug Generator", slug: "slug-generator", emoji: "🔗" },
  ];

  return (
    <div className="tool-widget-content">
      <div className="flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <label htmlFor="hex-input" className="block text-sm font-medium text-gray-700">HEX Color Code</label>
          <input
            type="text"
            id="hex-input"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"
            placeholder="#1B6B45 or 1B6B45"
            value={hexInput}
            onChange={(e) => setHexInput(e.target.value.toUpperCase())}
            maxLength={7}
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        <div className="mt-6 w-full max-w-md">
          <label htmlFor="rgb-output" className="block text-sm font-medium text-gray-700">RGB Value</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="rgb-output"
              className="block w-full px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 focus:outline-none sm:text-sm"
              value={rgbOutput}
              readOnly
            />
            <button
              onClick={() => navigator.clipboard.writeText(rgbOutput)}
              disabled={!rgbOutput}
              className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-green-700 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Copy
            </button>
          </div>
        </div>

        {rgbOutput && (
          <div className="mt-6 w-full max-w-md flex items-center justify-center">
            <div
              className="w-24 h-24 rounded-full border-2 border-gray-300"
              style={{ backgroundColor: rgbOutput }}
              title={rgbOutput}
            ></div>
          </div>
        )}
      </div>
      {/* ── Long-form content ── */}
      <section style={{ marginTop: "2rem", borderTop: "1.5px solid #E8E6DE", paddingTop: "1.5rem" }}>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          How to convert HEX to RGB
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1rem" }}>
          A HEX color code is a 6-digit hexadecimal number prefixed with <code style={{ background: "#F7F6F1", padding: "0.1rem 0.4rem", borderRadius: "0.3rem", fontSize: "0.875rem" }}>#</code>. Each pair of digits represents the red, green, and blue channel intensity from 0 (00) to 255 (FF). To convert, split the code into three pairs and parse each as a base-16 integer: <strong>#RRGGBB → R=parseInt(RR,16), G=parseInt(GG,16), B=parseInt(BB,16)</strong>.
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1rem" }}>
          <strong>Worked example:</strong> <code style={{ background: "#F7F6F1", padding: "0.1rem 0.4rem", borderRadius: "0.3rem", fontSize: "0.875rem" }}>#1B6B45</code> → R = parseInt("1B",16) = 27, G = parseInt("6B",16) = 107, B = parseInt("45",16) = 69 → <strong>rgb(27, 107, 69)</strong>.
        </p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", marginTop: "0.75rem" }}>
          <thead>
            <tr style={{ background: "#F7F6F1" }}>
              <th style={{ padding: "0.6rem 0.875rem", textAlign: "left", borderBottom: "1.5px solid #E8E6DE", fontWeight: 700, color: "#1A1A1A" }}>Color Name</th>
              <th style={{ padding: "0.6rem 0.875rem", textAlign: "left", borderBottom: "1.5px solid #E8E6DE", fontWeight: 700, color: "#1A1A1A" }}>HEX</th>
              <th style={{ padding: "0.6rem 0.875rem", textAlign: "left", borderBottom: "1.5px solid #E8E6DE", fontWeight: 700, color: "#1A1A1A" }}>RGB</th>
            </tr>
          </thead>
          <tbody>
            {[["Red","#FF0000","rgb(255,0,0)"],["Green","#00FF00","rgb(0,255,0)"],["Blue","#0000FF","rgb(0,0,255)"],["White","#FFFFFF","rgb(255,255,255)"],["Black","#000000","rgb(0,0,0)"]].map(([n,h,r]) => (
              <tr key={n} style={{ borderBottom: "1px solid #F0EDE6" }}>
                <td style={{ padding: "0.55rem 0.875rem", color: "#374151" }}>{n}</td>
                <td style={{ padding: "0.55rem 0.875rem", color: "#374151", fontFamily: "monospace" }}>{h}</td>
                <td style={{ padding: "0.55rem 0.875rem", color: "#374151", fontFamily: "monospace" }}>{r}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

    </div>
  );
};

export default HexToRgbConverter;