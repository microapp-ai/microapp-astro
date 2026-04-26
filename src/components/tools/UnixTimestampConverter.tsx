import { useState } from "react";

export default function UnixTimestampConverter() {

  const [tsInput, setTsInput] = useState(String(Math.floor(Date.now()/1000)));
  const [dateInput, setDateInput] = useState(new Date().toISOString().slice(0,16));
  const [tsResult, setTsResult] = useState("");
  const [dateResult, setDateResult] = useState("");

  const tsToDate = () => {
    const ts = parseInt(tsInput);
    const ms = tsInput.length >= 13 ? ts : ts * 1000;
    const d = new Date(ms);
    setDateResult(isNaN(d.getTime()) ? "Invalid timestamp" : d.toUTCString() + " (UTC)");
  };

  const dateToTs = () => {
    const d = new Date(dateInput);
    setTsResult(isNaN(d.getTime()) ? "Invalid date" : String(Math.floor(d.getTime()/1000)));
  };

  const faqs: FAQItem[] = [
    {
      question: "What is a Unix timestamp?",
      answer: "A Unix timestamp is the number of seconds (or milliseconds) that have elapsed since January 1, 1970 00:00:00 UTC, known as the Unix epoch. It is timezone-independent.",
    },
    {
      question: "What is the difference between seconds and milliseconds timestamps?",
      answer: "Unix timestamps in seconds are 10 digits (e.g., 1745000000). Millisecond timestamps are 13 digits (e.g., 1745000000000). JavaScript's Date.now() returns milliseconds.",
    },
    {
      question: "When does Unix time overflow?",
      answer: "32-bit Unix timestamps overflow on January 19, 2038 (the Year 2038 problem). Modern systems use 64-bit timestamps which won't overflow for billions of years.",
    },
  ];

  return (
    <div className="tool-widget-content">

      <div className="space-y-6">
        <div className="space-y-3">
          <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"1rem",color:"#1A1A1A"}}>Timestamp → Date</h3>
          <input className="tool-input" value={tsInput} onChange={e => setTsInput(e.target.value)} placeholder="e.g. 1745000000" />
          <button className="btn-primary" onClick={tsToDate}>Convert</button>
          {dateResult && <div className="result-box"><span className="result-value">{dateResult}</span></div>}
        </div>
        <div className="border-t border-[#E8E6DE] pt-6 space-y-3">
          <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"1rem",color:"#1A1A1A"}}>Date → Timestamp</h3>
          <input type="datetime-local" className="tool-input" value={dateInput} onChange={e => setDateInput(e.target.value)} />
          <button className="btn-primary" onClick={dateToTs}>Convert</button>
          {tsResult && <div className="result-box"><span className="result-label">Unix timestamp:</span><span className="result-value">{tsResult}</span></div>}
        </div>
      </div>
    </div>
  );
}
