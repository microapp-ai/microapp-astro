import { useState } from "react";

function calcAge(dob: string) {
  const birth = new Date(dob);
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();
  if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
  if (months < 0) { years--; months += 12; }
  return { years, months, days };
}

export default function AgeDifferenceCalculator() {
  const [dob1, setDob1] = useState("");
  const [dob2, setDob2] = useState("");

  const canCalc = dob1 && dob2;
  const age1 = dob1 ? calcAge(dob1) : null;
  const age2 = dob2 ? calcAge(dob2) : null;

  let diff = null;
  let olderLabel = "";
  if (canCalc) {
    const d1 = new Date(dob1), d2 = new Date(dob2);
    const older = d1 < d2 ? d1 : d2;
    const younger = d1 < d2 ? d2 : d1;
    olderLabel = d1 < d2 ? "Person 1" : "Person 2";
    let y = younger.getFullYear() - older.getFullYear();
    let m = younger.getMonth() - older.getMonth();
    let d = younger.getDate() - older.getDate();
    if (d < 0) { m--; d += new Date(younger.getFullYear(), younger.getMonth(), 0).getDate(); }
    if (m < 0) { y--; m += 12; }
    const totalDays = Math.round(Math.abs(d2.getTime() - d1.getTime()) / 86400000);
    diff = { years: y, months: m, days: d, totalDays };
  }

  const inputStyle: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#1A1A1A", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "0.5rem", padding: "0.5rem 0.75rem", width: "100%", outline: "none" };
  const labelStyle: React.CSSProperties = { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" };

  const faqs: FAQItem[] = [
    {
      question: "How is age difference calculated?",
      answer: "The age difference is calculated by subtracting the earlier date of birth from the later date of birth, providing the difference in years, months, and days.",
    },
    {
      question: "Can this tool calculate age difference for future dates?",
      answer: "No, this tool is designed to calculate the age difference between two past or current dates of birth. It does not support future date calculations.",
    },
    {
      question: "What if one person's birthday hasn't occurred yet this year?",
      answer: "The calculator accurately accounts for whether a person's birthday has passed in the current year, ensuring precise month and day differences are displayed.",
    },
    {
      question: "Is the age difference always symmetrical?",
      answer: "Yes, the numerical age difference in years, months, and days will be the same regardless of which person's birth date is entered first.",
    },
    {
      question: "Why is the total days count useful?",
      answer: "The total days count provides a precise measure of the time span between the two birth dates, which can be useful for various applications beyond just years, months, and days.",
    },
  ];

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>Person 1 — Date of Birth</label>
            <input type="date" value={dob1} onChange={e => setDob1(e.target.value)} style={inputStyle} max={new Date().toISOString().split("T")[0]} />
            {age1 && (
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "#6B7280", marginTop: "0.4rem" }}>
                Age: <strong>{age1.years}y {age1.months}m {age1.days}d</strong>
              </p>
            )}
          </div>
          <div>
            <label style={labelStyle}>Person 2 — Date of Birth</label>
            <input type="date" value={dob2} onChange={e => setDob2(e.target.value)} style={inputStyle} max={new Date().toISOString().split("T")[0]} />
            {age2 && (
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "#6B7280", marginTop: "0.4rem" }}>
                Age: <strong>{age2.years}y {age2.months}m {age2.days}d</strong>
              </p>
            )}
          </div>
        </div>

        {diff && (
          <div style={{ background: "#E8F5EE", borderRadius: "1rem", padding: "1.5rem", border: "1.5px solid #C6E6D4" }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1B6B45", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Age Difference
            </p>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "Years", value: diff.years },
                { label: "Months", value: diff.months },
                { label: "Days", value: diff.days },
              ].map(s => (
                <div key={s.label} style={{ background: "white", borderRadius: "0.75rem", padding: "0.875rem", textAlign: "center", border: "1.5px solid #E8E6DE" }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "2rem", color: "#1B6B45", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#6B7280", marginTop: "0.25rem" }}>{s.label}</div>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#374151" }}>
              <strong>{olderLabel}</strong> is older by <strong>{diff.years} year{diff.years !== 1 ? "s" : ""}, {diff.months} month{diff.months !== 1 ? "s" : ""}, and {diff.days} day{diff.days !== 1 ? "s" : ""}</strong> ({diff.totalDays.toLocaleString()} total days).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}