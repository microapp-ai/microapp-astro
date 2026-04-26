/*
 * MICROAPP — Tip Calculator Tool
 */
import { useState } from "react";

const TIP_PRESETS = [10, 15, 18, 20, 25];

export default function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState(18);
  const [people, setPeople] = useState(2);

  const billNum = parseFloat(bill) || 0;
  const tipAmount = (billNum * tip) / 100;
  const total = billNum + tipAmount;
  const perPerson = people > 0 ? total / people : 0;
  const tipPerPerson = people > 0 ? tipAmount / people : 0;

  const fmt = (n: number) => n.toFixed(2);

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        <div>
          <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>
            Bill Amount ($)
          </label>
          <input
            type="number"
            className="tool-input"
            placeholder="0.00"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            min="0"
          />
        </div>

        <div>
          <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", display: "block", marginBottom: "0.6rem" }}>
            Tip Percentage — <span style={{ color: "#1B6B45" }}>{tip}%</span>
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {TIP_PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => setTip(p)}
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem",
                  padding: "0.4rem 0.9rem", borderRadius: "9999px", border: "2px solid",
                  borderColor: tip === p ? "#1B6B45" : "#E8E6DE",
                  background: tip === p ? "#1B6B45" : "white",
                  color: tip === p ? "white" : "#4B5563",
                  transition: "all 0.15s ease",
                }}
              >
                {p}%
              </button>
            ))}
          </div>
          <input
            type="range"
            min={0}
            max={50}
            value={tip}
            onChange={(e) => setTip(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#1B6B45" }}
          />
        </div>

        <div>
          <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>
            Number of People
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPeople(Math.max(1, people - 1))}
              style={{ width: "36px", height: "36px", borderRadius: "50%", border: "2px solid #E8E6DE", background: "white", fontWeight: 700, fontSize: "1.1rem", color: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center" }}
            >−</button>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#1A1A1A", minWidth: "2rem", textAlign: "center" }}>{people}</span>
            <button
              onClick={() => setPeople(people + 1)}
              style={{ width: "36px", height: "36px", borderRadius: "50%", border: "2px solid #E8E6DE", background: "white", fontWeight: 700, fontSize: "1.1rem", color: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center" }}
            >+</button>
          </div>
        </div>

        {billNum > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Tip amount", value: `$${fmt(tipAmount)}` },
              { label: "Total bill", value: `$${fmt(total)}` },
              { label: "Tip per person", value: `$${fmt(tipPerPerson)}` },
              { label: "Each person pays", value: `$${fmt(perPerson)}`, highlight: true },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: item.highlight ? "#1B6B45" : "#F7F6F1",
                  border: `1.5px solid ${item.highlight ? "#1B6B45" : "#E8E6DE"}`,
                  borderRadius: "0.875rem",
                  padding: "1rem 1.25rem",
                }}
              >
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.5rem", color: item.highlight ? "white" : "#1B6B45", lineHeight: 1 }}>
                  {item.value}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: item.highlight ? "rgba(255,255,255,0.75)" : "#6B7280", marginTop: "0.25rem" }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    
      {/* ── Long-Form Content ── */}
      <div className="max-w-3xl mt-14 pt-10 border-t border-[#E8E6DE]">
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#1A1A1A", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
          How to Calculate a Tip — and What to Tip
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1.5rem" }}>
          Tipping is a voluntary payment added to a bill to reward good service. In the United States, tipping is a cultural norm at restaurants, bars, salons, and with delivery drivers. The standard tip at a sit-down restaurant is 15–20% of the pre-tax bill. For exceptional service, 25% or more is appropriate. When splitting a bill, it is courteous to calculate the tip on the full bill first, then divide the total equally.
        </p>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          Worked Example
        </h3>
        <div style={{ background: "#F7F6F1", border: "1.5px solid #E8E6DE", borderRadius: "0.875rem", padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#374151", lineHeight: 1.75, margin: 0 }}>
            A dinner bill is $87.50 for a table of 4. You want to tip 20%. Tip = $87.50 × 0.20 = $17.50. Total = $87.50 + $17.50 = $105.00. Per person = $105.00 ÷ 4 = $26.25. Quick mental math trick: find 10% ($8.75) and double it ($17.50) for a 20% tip.
          </p>
        </div>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          Standard Tipping Guide by Service Type
        </h3>
        <div style={{ overflowX: "auto", borderRadius: "0.875rem", border: "1.5px solid #E8E6DE" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#F7F6F1" }}>
              <tr>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>Service</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>Minimum</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>Standard</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>Excellent</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: "#FAFAF7" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Sit-down restaurant</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>15%</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>18–20%</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>25%+</td>
              </tr>
              <tr style={{ background: "white" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Takeout / delivery</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>0–10%</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>10–15%</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>20%</td>
              </tr>
              <tr style={{ background: "#FAFAF7" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Bartender</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>15%</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>18–20%</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$1/drink</td>
              </tr>
              <tr style={{ background: "white" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Hair salon / spa</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>15%</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>20%</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>25%</td>
              </tr>
              <tr style={{ background: "#FAFAF7" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Taxi / rideshare</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>10%</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>15–20%</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>25%</td>
              </tr>
              <tr style={{ background: "white" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Hotel housekeeping</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$2/night</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$3–5/night</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$5+/night</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* ── Long-form content ── */}
      <section style={{ marginTop: "2rem", borderTop: "1.5px solid #E8E6DE", paddingTop: "1.5rem" }}>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          How to calculate a tip — and how much to leave
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1rem" }}>
          Tipping customs vary by country and service type, but the math is always the same: <strong>Tip = Bill × (Tip % ÷ 100)</strong>. To split the total evenly, add the tip to the bill and divide by the number of people: <strong>Per person = (Bill + Tip) ÷ People</strong>.
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1rem" }}>
          <strong>Worked example:</strong> A $85 dinner for 4 people with a 20% tip: Tip = $85 × 0.20 = $17. Total = $102. Per person = $102 ÷ 4 = <strong>$25.50</strong>.
        </p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", marginTop: "0.75rem" }}>
          <thead>
            <tr style={{ background: "#F7F6F1" }}>
              <th style={{ padding: "0.6rem 0.875rem", textAlign: "left", borderBottom: "1.5px solid #E8E6DE", fontWeight: 700, color: "#1A1A1A" }}>Service Quality</th>
              <th style={{ padding: "0.6rem 0.875rem", textAlign: "left", borderBottom: "1.5px solid #E8E6DE", fontWeight: 700, color: "#1A1A1A" }}>Typical Tip (US)</th>
            </tr>
          </thead>
          <tbody>
            {[["Poor","10%"],["Average","15%"],["Good","18–20%"],["Excellent","20–25%+"]].map(([q, t]) => (
              <tr key={q} style={{ borderBottom: "1px solid #F0EDE6" }}>
                <td style={{ padding: "0.55rem 0.875rem", color: "#374151" }}>{q}</td>
                <td style={{ padding: "0.55rem 0.875rem", color: "#374151" }}>{t}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

    </div>
  );
}