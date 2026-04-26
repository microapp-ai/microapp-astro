import { useState, useRef } from "react";

export default function QrCodeReader() {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function processFile(file: File) {
    setResult(null);
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (PNG, JPG, GIF, WebP).");
      return;
    }
    try {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.src = url;
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      // Use BarcodeDetector if available
      if ("BarcodeDetector" in window) {
        // @ts-ignore
        const detector = new BarcodeDetector({ formats: ["qr_code"] });
        const barcodes = await detector.detect(img);
        if (barcodes.length > 0) {
          setResult(barcodes[0].rawValue);
        } else {
          setError("No QR code detected in this image. Try a clearer, higher-contrast image.");
        }
      } else {
        // Fallback: use a free API
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("https://api.qrserver.com/v1/read-qr-code/", { method: "POST", body: formData });
        const data = await res.json();
        const decoded = data?.[0]?.symbol?.[0]?.data;
        if (decoded) {
          setResult(decoded);
        } else {
          setError("No QR code detected. Make sure the image is clear and well-lit.");
        }
      }
      URL.revokeObjectURL(url);
    } catch {
      setError("Failed to read the image. Please try another file.");
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }

  function copy() {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const isUrl = result && (result.startsWith("http://") || result.startsWith("https://"));

  const faqs: FAQItem[] = [
    {
      question: "What is a QR code reader?",
      answer: "A QR code reader is an application or device that can scan and interpret Quick Response (QR) codes, which are two-dimensional barcodes containing various types of information.",
    },
    {
      question: "How do I use this online QR code reader?",
      answer: "Simply upload an image file containing a QR code (PNG, JPG, GIF, or WebP) by dragging and dropping it or clicking to browse. The tool will automatically decode the QR code's content.",
    },
    {
      question: "What types of information can a QR code contain?",
      answer: "QR codes can store a wide range of data, including website URLs, text messages, contact information (vCards), Wi-Fi network credentials, calendar events, and more.",
    },
    {
      question: "Is it safe to scan any QR code?",
      answer: "While most QR codes are safe, it's advisable to be cautious when scanning codes from unknown sources, as they could potentially lead to malicious websites or unwanted actions.",
    },
    {
      question: "Why is my QR code not being detected?",
      answer: "Ensure the QR code image is clear, well-lit, and not blurry or heavily compressed. The entire QR code should be visible and not cropped for successful decoding.",
    },
  ];

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          style={{
            border: `2px dashed ${dragging ? "#1B6B45" : "#C8C4B8"}`,
            borderRadius: "1rem",
            padding: "2.5rem 1.5rem",
            textAlign: "center",
            cursor: "pointer",
            background: dragging ? "#E8F5EE" : "#F7F6F1",
            transition: "all 0.2s ease",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>📷</div>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#1A1A1A", margin: "0 0 0.4rem" }}>
            Drop a QR code image here
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#6B7280", margin: 0 }}>
            or click to browse — PNG, JPG, GIF, WebP
          </p>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
        </div>

        {error && (
          <div style={{ background: "#FFF0F0", borderRadius: "0.875rem", padding: "1rem 1.25rem", border: "1.5px solid #FECACA" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#E05252", margin: 0 }}>{error}</p>
          </div>
        )}

        {result && (
          <div style={{ background: "#E8F5EE", borderRadius: "0.875rem", padding: "1.25rem", border: "1.5px solid #C6E6D4" }}>
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#1B6B45", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                QR Code Decoded
              </span>
              <button onClick={copy} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: copied ? "#1B6B45" : "#4B5563", background: "white", border: "1.5px solid #C6E6D4", borderRadius: "9999px", padding: "0.25rem 0.75rem", cursor: "pointer" }}>
                {copied ? "✓ Copied!" : "Copy"}
              </button>
            </div>
            <p style={{ fontFamily: "monospace", fontSize: "0.95rem", color: "#1A1A1A", wordBreak: "break-all", lineHeight: 1.6, margin: 0 }}>{result}</p>
            {isUrl && (
              <a href={result} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: "0.75rem", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#1B6B45", textDecoration: "underline" }}>
                Open URL →
              </a>
            )}
          </div>
        )}

        <div style={{ background: "#F7F6F1", borderRadius: "0.875rem", padding: "1rem 1.25rem", border: "1.5px solid #E8E6DE" }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>Tips</p>
          <ul style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#4B5563", lineHeight: 1.7, paddingLeft: "1.25rem", margin: 0 }}>
            <li>Use high-resolution, well-lit images for best results</li>
            <li>Ensure the QR code is fully visible and not cropped</li>
            <li>Avoid blurry or heavily compressed images</li>
            <li>Works with screenshots, photos, and downloaded QR images</li>
          </ul>
        </div>
      </div>
    </div>
  );
}