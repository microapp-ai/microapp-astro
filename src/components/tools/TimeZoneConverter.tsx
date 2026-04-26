import { useState } from "react";

export default function TimeZoneConverter() {

  const [time, setTime] = useState("12:00");
  const [fromTz, setFromTz] = useState("America/New_York");
  const [toTz, setToTz] = useState("Europe/London");
  const [result, setResult] = useState("");

  const ZONES = [
    "UTC","America/New_York","America/Chicago","America/Denver","America/Los_Angeles",
    "America/Sao_Paulo","Europe/London","Europe/Paris","Europe/Berlin","Africa/Cairo",
    "Asia/Dubai","Asia/Kolkata","Asia/Bangkok","Asia/Singapore","Asia/Tokyo",
    "Australia/Sydney","Pacific/Auckland","Pacific/Honolulu",
  ];

  const convert = () => {
    try {
      const [h,m] = time.split(":").map(Number);
      const now = new Date();
      now.setHours(h,m,0,0);
      const fromStr = now.toLocaleString("en-US",{timeZone:fromTz,hour:"2-digit",minute:"2-digit",hour12:false});
      const toStr = now.toLocaleString("en-US",{timeZone:toTz,hour:"2-digit",minute:"2-digit",hour12:false});
      setResult(`${fromStr} ${fromTz.split("/").pop()?.replace("_"," ")} = ${toStr} ${toTz.split("/").pop()?.replace("_"," ")}`);
    } catch { setResult("Conversion error"); }
  };

  const faqs: FAQItem[] = [
    {
      question: "What is UTC?",
      answer: "UTC (Coordinated Universal Time) is the primary time standard by which the world regulates clocks. It does not observe daylight saving time. All other time zones are expressed as UTC offsets (e.g., EST = UTC−5).",
    },
    {
      question: "What is the difference between GMT and UTC?",
      answer: "GMT (Greenwich Mean Time) and UTC are nearly identical for practical purposes. The key difference is that UTC is an atomic time standard, while GMT is based on Earth's rotation. UTC is the modern standard.",
    },
    {
      question: "How does daylight saving time affect conversions?",
      answer: "Daylight saving time (DST) shifts clocks forward by 1 hour in spring and back in autumn. This tool automatically accounts for DST based on the selected date.",
    },
  ];

  return (
    <div className="tool-widget-content">

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Time</label>
            <input type="time" className="tool-input" value={time} onChange={e => setTime(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">From</label>
            <select className="tool-input" value={fromTz} onChange={e => setFromTz(e.target.value)}>
              {ZONES.map(z => <option key={z} value={z}>{z.replace("_"," ")}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">To</label>
            <select className="tool-input" value={toTz} onChange={e => setToTz(e.target.value)}>
              {ZONES.map(z => <option key={z} value={z}>{z.replace("_"," ")}</option>)}
            </select>
          </div>
        </div>
        <button className="btn-primary" onClick={convert}>Convert</button>
        {result && <div className="result-box"><span className="result-value">{result}</span></div>}
      </div>
    </div>
  );
}
