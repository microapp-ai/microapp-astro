/*
 * MICROAPP — Days Between Dates Tool
 */
import { useState } from "react";

export default function DaysBetween() {
  const today = new Date().toISOString().split("T")[0];
  const [start, setStart] = useState(today);
  const [end, setEnd] = useState(today);

  function calc() {
    if (!start || !end) return null;
    const s = new Date(start);
    const e = new Date(end);
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return null;
    const diff = Math.abs(e.getTime() - s.getTime());
    const days = Math.round(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const remainDays = days % 7;
    const months = Math.floor(days / 30.4375);
    const years = Math.floor(days / 365.25);
    return { days, weeks, remainDays, months, years, future: e > s };
  }

  const result = calc();

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>
              Start Date
            </label>
            <input type="date" className="tool-input" value={start} onChange={(e) => setStart(e.target.value)} />
          </div>
          <div>
            <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>
              End Date
            </label>
            <input type="date" className="tool-input" value={end} onChange={(e) => setEnd(e.target.value)} />
          </div>
        </div>

        {result !== null && (
          <div className="space-y-3">
            <div style={{ background: "#1B6B45", borderRadius: "1rem", padding: "1.5rem 2rem" }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", marginBottom: "0.4rem" }}>
                {result.future ? "Days until" : result.days === 0 ? "Same day" : "Days since"}
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "2.8rem", color: "white", lineHeight: 1 }}>
                {result.days.toLocaleString()}
                <span style={{ fontSize: "1.1rem", fontWeight: 600, marginLeft: "0.4rem" }}>days</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Weeks + days", value: `${result.weeks}w ${result.remainDays}d` },
                { label: "Approx. months", value: `~${result.months}` },
                { label: "Approx. years", value: result.years > 0 ? `~${result.years}` : "< 1" },
              ].map((s) => (
                <div key={s.label} style={{ background: "#F7F6F1", border: "1.5px solid #E8E6DE", borderRadius: "0.875rem", padding: "1rem", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#1B6B45" }}>{s.value}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#6B7280", marginTop: "0.2rem" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}