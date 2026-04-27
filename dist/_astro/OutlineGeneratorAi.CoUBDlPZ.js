import{j as e}from"./jsx-dev-runtime.CRDICgT5.js";import{r}from"./index.-ffUvN8g.js";const d=["Blog Post","Essay","Research Paper","Presentation","YouTube Video"];function h(i,s){const t=i||"Your Topic",n={"Blog Post":`# ${t}

## Introduction
- Hook: Why this matters
- Brief overview of what readers will learn
- Thesis statement

## Section 1: Background & Context
- What is ${t}?
- Why it's relevant today
- Key statistics or facts

## Section 2: Core Concepts
- Main idea A
- Main idea B
- Main idea C

## Section 3: Practical Application
- Step-by-step guide
- Real-world examples
- Common mistakes to avoid

## Section 4: Tips & Best Practices
- Pro tip 1
- Pro tip 2
- Tools and resources

## Conclusion
- Recap of key points
- Call to action
- Final thought`,Essay:`# ${t}

## Introduction
- Opening hook
- Background information
- Thesis statement

## Body Paragraph 1: First Argument
- Topic sentence
- Supporting evidence
- Analysis
- Transition

## Body Paragraph 2: Second Argument
- Topic sentence
- Supporting evidence
- Analysis
- Transition

## Body Paragraph 3: Third Argument
- Topic sentence
- Supporting evidence
- Counterargument & rebuttal
- Transition

## Conclusion
- Restate thesis
- Summarize main points
- Broader implications`,"Research Paper":`# ${t}

## Abstract
- Research question
- Methodology summary
- Key findings

## 1. Introduction
- Problem statement
- Research objectives
- Scope and limitations

## 2. Literature Review
- Existing research overview
- Gaps in current knowledge
- Theoretical framework

## 3. Methodology
- Research design
- Data collection methods
- Analysis approach

## 4. Results
- Key finding 1
- Key finding 2
- Key finding 3

## 5. Discussion
- Interpretation of results
- Comparison with prior research
- Implications

## 6. Conclusion
- Summary
- Recommendations
- Future research directions

## References`,Presentation:`# ${t}

## Slide 1: Title Slide
- Title, subtitle, presenter name

## Slide 2: Agenda
- Overview of what will be covered

## Slide 3-4: The Problem / Opportunity
- Current situation
- Why this matters

## Slide 5-6: Key Insights
- Data point 1
- Data point 2
- Visual chart or graph

## Slide 7-8: Solution / Approach
- Main proposal
- How it works
- Benefits

## Slide 9: Case Study / Example
- Real-world application
- Results achieved

## Slide 10: Next Steps & Call to Action
- Recommended actions
- Timeline
- Contact information`,"YouTube Video":`# ${t}

## Hook (0:00 – 0:30)
- Attention-grabbing opening line
- Preview of what viewers will learn
- "Stay until the end for…"

## Intro (0:30 – 1:00)
- Channel intro / branding
- Brief personal credibility

## Section 1: The Problem (1:00 – 3:00)
- Relatable scenario
- Why this is a common struggle

## Section 2: The Solution (3:00 – 7:00)
- Step 1 with demonstration
- Step 2 with demonstration
- Step 3 with demonstration

## Section 3: Tips & Mistakes (7:00 – 9:00)
- Common mistake to avoid
- Pro tip
- Tool or resource recommendation

## Outro (9:00 – 10:00)
- Recap of key takeaways
- Like, subscribe, comment CTA
- Teaser for next video`};return n[s]||n["Blog Post"]}function g(){const[i,s]=r.useState(""),[t,n]=r.useState("Blog Post"),[a,m]=r.useState(""),[l,u]=r.useState(!1);function c(){m(h(i,t))}function p(){navigator.clipboard.writeText(a),u(!0),setTimeout(()=>u(!1),2e3)}return e.jsxDEV("div",{className:"tool-widget-content",children:e.jsxDEV("div",{className:"space-y-4",children:[e.jsxDEV("div",{children:[e.jsxDEV("label",{style:{fontFamily:"'Plus Jakarta Sans', sans-serif",fontWeight:700,fontSize:"0.875rem",color:"#1A1A1A",display:"block",marginBottom:"0.4rem"},children:"Topic or title"},void 0,!1,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/OutlineGeneratorAi.tsx",lineNumber:58,columnNumber:11},this),e.jsxDEV("input",{type:"text",value:i,onChange:o=>s(o.target.value),style:{fontFamily:"'Inter', sans-serif",fontSize:"0.9rem",color:"#1A1A1A",background:"white",border:"1.5px solid #E8E6DE",borderRadius:"0.5rem",padding:"0.5rem 0.75rem",width:"100%",outline:"none"},placeholder:"e.g. How to Start a Podcast, Climate Change Effects"},void 0,!1,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/OutlineGeneratorAi.tsx",lineNumber:59,columnNumber:11},this)]},void 0,!0,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/OutlineGeneratorAi.tsx",lineNumber:57,columnNumber:9},this),e.jsxDEV("div",{children:[e.jsxDEV("label",{style:{fontFamily:"'Plus Jakarta Sans', sans-serif",fontWeight:700,fontSize:"0.875rem",color:"#1A1A1A",display:"block",marginBottom:"0.4rem"},children:"Content type"},void 0,!1,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/OutlineGeneratorAi.tsx",lineNumber:62,columnNumber:11},this),e.jsxDEV("div",{className:"flex flex-wrap gap-2",children:d.map(o=>e.jsxDEV("button",{onClick:()=>n(o),style:{fontFamily:"'Plus Jakarta Sans', sans-serif",fontWeight:700,fontSize:"0.8rem",padding:"0.35rem 0.85rem",borderRadius:"9999px",border:"2px solid",borderColor:t===o?"#1B6B45":"#E8E6DE",background:t===o?"#1B6B45":"white",color:t===o?"white":"#4B5563",cursor:"pointer"},children:o},o,!1,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/OutlineGeneratorAi.tsx",lineNumber:65,columnNumber:15},this))},void 0,!1,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/OutlineGeneratorAi.tsx",lineNumber:63,columnNumber:11},this)]},void 0,!0,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/OutlineGeneratorAi.tsx",lineNumber:61,columnNumber:9},this),e.jsxDEV("button",{onClick:c,style:{fontFamily:"'Plus Jakarta Sans', sans-serif",fontWeight:800,fontSize:"1rem",color:"#1A1A1A",background:"#FFE234",border:"2px solid #1A1A1A",borderRadius:"9999px",padding:"0.65rem 1.75rem",cursor:"pointer"},children:"Generate Outline"},void 0,!1,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/OutlineGeneratorAi.tsx",lineNumber:71,columnNumber:9},this),a&&e.jsxDEV("div",{style:{background:"#F7F6F1",borderRadius:"0.875rem",padding:"1.5rem",border:"1.5px solid #E8E6DE"},children:[e.jsxDEV("div",{className:"flex justify-between items-center mb-4",children:[e.jsxDEV("span",{style:{fontFamily:"'Plus Jakarta Sans', sans-serif",fontWeight:700,fontSize:"0.8rem",color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.06em"},children:[t," Outline"]},void 0,!0,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/OutlineGeneratorAi.tsx",lineNumber:78,columnNumber:15},this),e.jsxDEV("button",{onClick:p,style:{fontFamily:"'Plus Jakarta Sans', sans-serif",fontWeight:700,fontSize:"0.8rem",color:l?"#1B6B45":"#4B5563",background:"white",border:"1.5px solid #E8E6DE",borderRadius:"9999px",padding:"0.25rem 0.75rem",cursor:"pointer"},children:l?"✓ Copied!":"Copy"},void 0,!1,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/OutlineGeneratorAi.tsx",lineNumber:79,columnNumber:15},this)]},void 0,!0,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/OutlineGeneratorAi.tsx",lineNumber:77,columnNumber:13},this),e.jsxDEV("pre",{style:{fontFamily:"'Inter', sans-serif",fontSize:"0.875rem",color:"#1A1A1A",whiteSpace:"pre-wrap",lineHeight:1.75,margin:0},children:a},void 0,!1,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/OutlineGeneratorAi.tsx",lineNumber:83,columnNumber:13},this)]},void 0,!0,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/OutlineGeneratorAi.tsx",lineNumber:76,columnNumber:11},this)]},void 0,!0,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/OutlineGeneratorAi.tsx",lineNumber:56,columnNumber:7},this)},void 0,!1,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/OutlineGeneratorAi.tsx",lineNumber:55,columnNumber:5},this)}export{g as default};
