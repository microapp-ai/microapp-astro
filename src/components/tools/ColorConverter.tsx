/*
 * MICROAPP — Color Converter Tool
 */
import { useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return null;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
    else if (max === gn) h = ((bn - rn) / d + 2) / 6;
    else h = ((rn - gn) / d + 4) / 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function isValidHex(hex: string): boolean {
  return /^#?([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(hex);
}

export default function ColorConverter() {
  const [hex, setHex] = useState("#1B6B45");
  const [pickerColor, setPickerColor] = useState("#1B6B45");

  function normalizeHex(h: string): string {
    const c = h.startsWith("#") ? h : "#" + h;
    if (/^#[0-9A-Fa-f]{3}$/.test(c)) {
      return "#" + c[1] + c[1] + c[2] + c[2] + c[3] + c[3];
    }
    return c;
  }

  const normalized = normalizeHex(hex);
  const rgb = isValidHex(hex) ? hexToRgb(normalized) : null;
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  function handlePickerChange(val: string) {
    setPickerColor(val);
    setHex(val);
  }

  const outputs = rgb && hsl ? [
    { label: "HEX", value: normalized.toUpperCase(), mono: true },
    { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, mono: true },
    { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, mono: true },
    { label: "CSS var", value: `--color: ${normalized.toUpperCase()};`, mono: true },
  ] : [];

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        {/* Color picker + hex input */}
        <div className="flex items-center gap-4">
          <div style={{ position: "relative" }}>
            <input
              type="color"
              value={pickerColor}
              onChange={(e) => handlePickerChange(e.target.value)}
              style={{ width: "64px", height: "64px", borderRadius: "0.875rem", border: "1.5px solid #E8E6DE", cursor: "pointer", padding: "4px", background: "white" }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>
              HEX Value
            </label>
            <input
              type="text"
              className="tool-input"
              placeholder="#1B6B45"
              value={hex}
              onChange={(e) => {
                setHex(e.target.value);
                if (isValidHex(e.target.value)) setPickerColor(normalizeHex(e.target.value));
              }}
              maxLength={7}
              style={{ fontFamily: "'Courier New', monospace", textTransform: "uppercase" }}
            />
          </div>
        </div>

        {/* Color preview swatch */}
        {rgb && (
          <div style={{ height: "80px", borderRadius: "1rem", background: normalized, border: "1.5px solid #E8E6DE", transition: "background 0.2s ease" }} />
        )}

        {/* Converted outputs */}
        {outputs.length > 0 && (
          <div className="space-y-2">
            {outputs.map((o) => (
              <div key={o.label} style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "#F7F6F1", border: "1.5px solid #E8E6DE", borderRadius: "0.875rem", padding: "0.75rem 1rem" }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#6B7280", minWidth: "52px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {o.label}
                </span>
                <span style={{ fontFamily: "'Courier New', monospace", fontSize: "0.9rem", color: "#1A1A1A", flex: 1 }}>
                  {o.value}
                </span>
                <button
                  onClick={() => { navigator.clipboard.writeText(o.value); toast.success(`${o.label} copied!`); }}
                  style={{ padding: "0.35rem", borderRadius: "0.5rem", background: "white", border: "1.5px solid #E8E6DE", color: "#6B7280", flexShrink: 0 }}
                >
                  <Copy size={13} />
                </button>
              </div>
            ))}
          </div>
        )}

        {!rgb && hex.length > 1 && (
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#E05252" }}>
            Please enter a valid HEX color (e.g. #1B6B45 or #FFF).
          </p>
        )}
      </div>
    </div>
  );
}
