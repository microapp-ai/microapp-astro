import { useState } from "react";

const contentTypes = ["Blog Post", "Essay", "Research Paper", "Presentation", "YouTube Video"];

function generateOutline(topic: string, type: string): string {
  const t = topic || "Your Topic";
  const templates: Record<string, string> = {
    "Blog Post": `# ${t}\n\n## Introduction\n- Hook: Why this matters\n- Brief overview of what readers will learn\n- Thesis statement\n\n## Section 1: Background & Context\n- What is ${t}?\n- Why it's relevant today\n- Key statistics or facts\n\n## Section 2: Core Concepts\n- Main idea A\n- Main idea B\n- Main idea C\n\n## Section 3: Practical Application\n- Step-by-step guide\n- Real-world examples\n- Common mistakes to avoid\n\n## Section 4: Tips & Best Practices\n- Pro tip 1\n- Pro tip 2\n- Tools and resources\n\n## Conclusion\n- Recap of key points\n- Call to action\n- Final thought`,
    "Essay": `# ${t}\n\n## Introduction\n- Opening hook\n- Background information\n- Thesis statement\n\n## Body Paragraph 1: First Argument\n- Topic sentence\n- Supporting evidence\n- Analysis\n- Transition\n
## Body Paragraph 2: Second Argument\n- Topic sentence\n- Supporting evidence\n- Analysis\n- Transition\n
## Body Paragraph 3: Third Argument\n- Topic sentence\n- Supporting evidence\n- Counterargument & rebuttal\n- Transition\n
## Conclusion\n- Restate thesis\n- Summarize main points\n- Broader implications`,
    "Research Paper": `# ${t}\n\n## Abstract\n- Research question\n- Methodology summary\n- Key findings\n
## 1. Introduction\n- Problem statement\n- Research objectives\n- Scope and limitations\n
## 2. Literature Review\n- Existing research overview\n- Gaps in current knowledge\n- Theoretical framework\n
## 3. Methodology\n- Research design\n- Data collection methods\n- Analysis approach\n
## 4. Results\n- Key finding 1\n- Key finding 2\n- Key finding 3\n
## 5. Discussion\n- Interpretation of results\n- Comparison with prior research\n- Implications\n
## 6. Conclusion\n- Summary\n- Recommendations\n- Future research directions\n
## References`,
    "Presentation": `# ${t}\n\n## Slide 1: Title Slide\n- Title, subtitle, presenter name\n
## Slide 2: Agenda\n- Overview of what will be covered\n
## Slide 3-4: The Problem / Opportunity\n- Current situation\n- Why this matters\n
## Slide 5-6: Key Insights\n- Data point 1\n- Data point 2\n- Visual chart or graph\n
## Slide 7-8: Solution / Approach\n- Main proposal\n- How it works\n- Benefits\n
## Slide 9: Case Study / Example\n- Real-world application\n- Results achieved\n
## Slide 10: Next Steps & Call to Action\n- Recommended actions\n- Timeline\n- Contact information`,
    "YouTube Video": `# ${t}\n\n## Hook (0:00 – 0:30)\n- Attention-grabbing opening line\n- Preview of what viewers will learn\n- "Stay until the end for…"\n
## Intro (0:30 – 1:00)\n- Channel intro / branding\n- Brief personal credibility\n
## Section 1: The Problem (1:00 – 3:00)\n- Relatable scenario\n- Why this is a common struggle\n
## Section 2: The Solution (3:00 – 7:00)\n- Step 1 with demonstration\n- Step 2 with demonstration\n- Step 3 with demonstration\n
## Section 3: Tips & Mistakes (7:00 – 9:00)\n- Common mistake to avoid\n- Pro tip\n- Tool or resource recommendation\n
## Outro (9:00 – 10:00)\n- Recap of key takeaways\n- Like, subscribe, comment CTA\n- Teaser for next video`,
  };
  return templates[type] || templates["Blog Post"];
}

export default function OutlineGeneratorAi() {
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("Blog Post");
  const [outline, setOutline] = useState("");
  const [copied, setCopied] = useState(false);

  function generate() {
    setOutline(generateOutline(topic, type));
  }

  function copy() {
    navigator.clipboard.writeText(outline);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="tool-widget-content">
      <div className="space-y-4">
        <div>
          <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>Topic or title</label>
          <input type="text" value={topic} onChange={e => setTopic(e.target.value)} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#1A1A1A", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "0.5rem", padding: "0.5rem 0.75rem", width: "100%", outline: "none" }} placeholder="e.g. How to Start a Podcast, Climate Change Effects" />
        </div>
        <div>
          <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#1A1A1A", display: "block", marginBottom: "0.4rem" }}>Content type</label>
          <div className="flex flex-wrap gap-2">
            {contentTypes.map(ct => (
              <button key={ct} onClick={() => setType(ct)} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", padding: "0.35rem 0.85rem", borderRadius: "9999px", border: "2px solid", borderColor: type === ct ? "#1B6B45" : "#E8E6DE", background: type === ct ? "#1B6B45" : "white", color: type === ct ? "white" : "#4B5563", cursor: "pointer" }}>
                {ct}
              </button>
            ))}
          </div>
        </div>
        <button onClick={generate} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1rem", color: "#1A1A1A", background: "#FFE234", border: "2px solid #1A1A1A", borderRadius: "9999px", padding: "0.65rem 1.75rem", cursor: "pointer" }}>
          Generate Outline
        </button>

        {outline && (
          <div style={{ background: "#F7F6F1", borderRadius: "0.875rem", padding: "1.5rem", border: "1.5px solid #E8E6DE" }}>
            <div className="flex justify-between items-center mb-4">
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>{type} Outline</span>
              <button onClick={copy} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: copied ? "#1B6B45" : "#4B5563", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "9999px", padding: "0.25rem 0.75rem", cursor: "pointer" }}>
                {copied ? "✓ Copied!" : "Copy"}
              </button>
            </div>
            <pre style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#1A1A1A", whiteSpace: "pre-wrap", lineHeight: 1.75, margin: 0 }}>{outline}</pre>
          </div>
        )}
      </div>
    </div>
  );
}