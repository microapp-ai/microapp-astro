/*
 * MICROAPP — Age Calculator Tool
 */
import { useState } from "react";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [asOf, setAsOf] = useState(new Date().toISOString().split("T")[0]);

  function calcAge() {
    if (!dob || !asOf) return null;
    const birth = new Date(dob);
    const target = new Date(asOf);
    if (isNaN(birth.getTime()) || isNaN(target.getTime()) || birth > target) return null;

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) { years--; months += 12; }

    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    return { years, months, days, totalDays, totalWeeks, totalMonths };
  }

  const age = calcAge();

  const faqs: FAQItem[] = [
    {
      question: "How does an age calculator determine my age?",
      answer: "An age calculator determines your age by calculating the difference between your date of birth and a specified \"as of\" date, typically the current date. It breaks down the difference into years, months, and days.",
    },
    {
      question: "Can I calculate my age as of a future date?",
      answer: "Yes, most age calculators allow you to specify a future date as the \"as of\" date. This can be useful for planning or estimating your age at a particular event.",
    },
    {
      question: "Why might my age in months or days vary slightly from other calculators?",
      answer: "Differences can arise due to how leap years are handled, or how the number of days in a month is accounted for. Some calculators might use average month lengths, while others use exact calendar days.",
    },
    {
      question: "Is this tool useful for more than just personal age calculation?",
      answer: "Absolutely. It can be used for various purposes, such as calculating the age of pets, historical events, or even the duration between two non-birth related dates for project management or legal contexts.",
    },
    {
      question: "What is the significance of knowing my age in total days or weeks?",
      answer: "Knowing your age in total days or weeks provides a more granular perspective on your life's duration. It can be a fun fact, or useful for specific calculations in fields like health or insurance.",
    },
  ];

  const labelStyle = { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" } as const;

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="dob" style={labelStyle}>Date of Birth</label>
            <input
              id="dob"
              type="date"
              className="tool-input"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              max={asOf}
              aria-label="Date of Birth"
            />
          </div>
          <div>
            <label htmlFor="asof" style={labelStyle}>Age as of</label>
            <input
              id="asof"
              type="date"
              className="tool-input"
              value={asOf}
              onChange={(e) => setAsOf(e.target.value)}
              aria-label="Age as of date"
            />
          </div>
        </div>

        {age && (
          <div className="space-y-3">
            {/* Primary result */}
            <div style={{ background: "#1B6B45", borderRadius: "1rem", padding: "1.5rem 2rem" }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", marginBottom: "0.4rem" }}>Your age</div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "2.2rem", color: "white", lineHeight: 1 }}>
                {age.years} <span style={{ fontSize: "1rem", fontWeight: 600 }}>yrs</span>{" "}
                {age.months} <span style={{ fontSize: "1rem", fontWeight: 600 }}>mos</span>{" "}
                {age.days} <span style={{ fontSize: "1rem", fontWeight: 600 }}>days</span>
              </div>
            </div>

            {/* Secondary stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Total days", value: age.totalDays.toLocaleString() },
                { label: "Total weeks", value: age.totalWeeks.toLocaleString() },
                { label: "Total months", value: age.totalMonths.toLocaleString() },
              ].map((s) => (
                <div key={s.label} style={{ background: "#F7F6F1", border: "1.5px solid #E8E6DE", borderRadius: "0.875rem", padding: "1rem", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#1B6B45" }}>{s.value}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#6B7280", marginTop: "0.2rem" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {dob && !age && (
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#E05252" }}>
            Please enter a valid date of birth that is before the &quot;as of&quot; date.
          </p>
        )}
      </div>

      {/* ── Long-Form Content ── */}
      <div className="max-w-3xl mt-14 pt-10 border-t border-[#E8E6DE]">
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#1A1A1A", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
          How Age Is Calculated — and Why It Is More Complex Than It Seems
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1.5rem" }}>
          Age calculation seems simple — subtract the birth year from the current year — but accurate age calculation must account for whether the birthday has occurred yet in the current year, leap years (February 29 birthdays), and time zones. In most Western countries, age is expressed as the number of complete years lived. In some East Asian cultures, a person is considered 1 year old at birth and gains a year on New Year&apos;s Day rather than their birthday.
        </p>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          Worked Example
        </h3>
        <div style={{ background: "#F7F6F1", border: "1.5px solid #E8E6DE", borderRadius: "0.875rem", padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#374151", lineHeight: 1.75, margin: 0 }}>
            Someone born on March 15, 1990, calculating their age on April 24, 2026: Years: 2026 − 1990 = 36. Since March 15 has already passed in 2026, no adjustment needed. Exact age: 36 years, 1 month, 9 days. Days lived: approximately 13,189 days. If the same person calculated their age on February 10, 2026 (before their birthday), the result would be 35 years, 10 months, 26 days.
          </p>
        </div>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          Age Milestones and Their Significance
        </h3>
        <div style={{ overflowX: "auto", borderRadius: "0.875rem", border: "1.5px solid #E8E6DE" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#F7F6F1" }}>
              <tr>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>Age</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>Milestone</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>Context</th>
              </tr>
            </thead>
            <tbody>
              {[
                { age: "16", milestone: "Driving age", context: "Most US states", bg: "#FAFAF7" },
                { age: "18", milestone: "Legal adult", context: "US, UK, most countries", bg: "white" },
                { age: "21", milestone: "Legal drinking age", context: "United States", bg: "#FAFAF7" },
                { age: "25", milestone: "Car rental without surcharge", context: "Most rental companies", bg: "white" },
                { age: "35", milestone: "US Presidential eligibility", context: "US Constitution", bg: "#FAFAF7" },
                { age: "65", milestone: "Traditional retirement age", context: "US, UK, many countries", bg: "white" },
                { age: "67", milestone: "Full Social Security benefits", context: "United States (born 1960+)", bg: "#FAFAF7" },
              ].map((row) => (
                <tr key={row.age} style={{ background: row.bg }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>{row.age}</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>{row.milestone}</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>{row.context}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
