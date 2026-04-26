import { useState } from "react";

export default function TextCaseConverter() {

  const [input, setInput] = useState("hello world foo bar");

  const words = input.trim().split(/[\s_\-./]+/).filter(Boolean);

  const cases = [
    { label: "snake_case", value: words.map(w => w.toLowerCase()).join("_") },
    { label: "kebab-case", value: words.map(w => w.toLowerCase()).join("-") },
    { label: "camelCase", value: words.map((w,i) => i===0 ? w.toLowerCase() : w[0].toUpperCase()+w.slice(1).toLowerCase()).join("") },
    { label: "PascalCase", value: words.map(w => w[0].toUpperCase()+w.slice(1).toLowerCase()).join("") },
    { label: "SCREAMING_SNAKE", value: words.map(w => w.toUpperCase()).join("_") },
    { label: "dot.case", value: words.map(w => w.toLowerCase()).join(".") },
    { label: "Title Case", value: words.map(w => w[0].toUpperCase()+w.slice(1).toLowerCase()).join(" ") },
    { label: "UPPER CASE", value: input.toUpperCase() },
    { label: "lower case", value: input.toLowerCase() },
  ];

  const faqs: FAQItem[] = [
    {
      question: "What is snake_case?",
      answer: "snake_case uses lowercase letters with words separated by underscores. It is the standard convention in Python, Ruby, and SQL. Example: my_variable_name.",
    },
    {
      question: "What is camelCase?",
      answer: "camelCase starts with a lowercase letter and capitalizes the first letter of each subsequent word. It is standard in JavaScript, Java, and Swift. Example: myVariableName.",
    },
    {
      question: "What is PascalCase?",
      answer: "PascalCase (also called UpperCamelCase) capitalizes the first letter of every word. It is used for class names in most languages and component names in React. Example: MyVariableName.",
    },
  ];

  return (
    <div className="tool-widget-content">

      <div className="space-y-4">
        <textarea className="tool-textarea" rows={3} value={input} onChange={e => setInput(e.target.value)} placeholder="hello world foo bar" />
        <div className="space-y-2">
          {cases.map(({label, value}) => (
            <div key={label} style={{background:"#F7F6F1",border:"1.5px solid #E8E6DE",borderRadius:"0.875rem",padding:"0.875rem 1.25rem",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"1rem"}}>
              <div>
                <div style={{fontFamily:"'Inter',sans-serif",fontSize:"0.75rem",color:"#9CA3AF",marginBottom:"0.15rem"}}>{label}</div>
                <div style={{fontFamily:"monospace",fontSize:"0.95rem",color:"#1A1A1A",wordBreak:"break-all"}}>{value}</div>
              </div>
              <button onClick={() => navigator.clipboard.writeText(value)} style={{flexShrink:0,background:"white",border:"1.5px solid #E8E6DE",borderRadius:"0.5rem",padding:"0.35rem 0.75rem",fontFamily:"'Inter',sans-serif",fontSize:"0.75rem",cursor:"pointer",color:"#6B7280"}}>Copy</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
