import { useState } from "react";

export default function HtmlToMarkdown() {

  const [html, setHtml] = useState('<h1>Hello World</h1>\n<p>This is <strong>bold</strong> and <em>italic</em> text.</p>\n<ul>\n  <li>Item one</li>\n  <li>Item two</li>\n</ul>');
  const [md, setMd] = useState("");

  const convert = () => {
    let result = html
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n")
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n")
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n")
      .replace(/<h4[^>]*>(.*?)<\/h4>/gi, "#### $1\n")
      .replace(/<h5[^>]*>(.*?)<\/h5>/gi, "##### $1\n")
      .replace(/<h6[^>]*>(.*?)<\/h6>/gi, "###### $1\n")
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**")
      .replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**")
      .replace(/<em[^>]*>(.*?)<\/em>/gi, "_$1_")
      .replace(/<i[^>]*>(.*?)<\/i>/gi, "_$1_")
      .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)")
      .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, "![$2]($1)")
      .replace(/<code[^>]*>(.*?)<\/code>/gi, "\`$1\`")
      .replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, "`\`\`\n$1\n\`\`\`")
      .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, p) => p.split("\n").map((l: string) => "> "+l).join("\n"))
      .replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1")
      .replace(/<[uo]l[^>]*>/gi, "").replace(/<\/[uo]l>/gi, "\n")
      .replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<hr\s*\/?>/gi, "---\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ")
      .replace(/\n{3,}/g, "\n\n").trim();
    setMd(result);
  };

  const faqs: FAQItem[] = [
    {
      question: "What HTML elements are supported?",
      answer: "This converter handles: headings (h1–h6), bold/strong, italic/em, links (a), images (img), unordered and ordered lists, code and pre blocks, blockquotes, horizontal rules, and paragraphs.",
    },
    {
      question: "What is Markdown used for?",
      answer: "Markdown is used in GitHub READMEs, documentation sites (like Notion and Confluence), blog platforms, and comment systems. It is the standard format for developer documentation.",
    },
    {
      question: "Does it preserve inline code?",
      answer: "Yes. Inline code (<code>) is converted to backtick syntax (`code`), and code blocks (<pre><code>) are converted to fenced code blocks (``` ``` ```) with optional language hints.",
    },
  ];

  return (
    <div className="tool-widget-content">

      <div className="space-y-4">
        <textarea className="tool-textarea font-mono" rows={8} value={html} onChange={e => setHtml(e.target.value)} placeholder="Paste HTML here..." />
        <button className="btn-primary" onClick={convert}>Convert to Markdown</button>
        {md && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"0.9rem",color:"#1A1A1A"}}>Markdown output</span>
              <button className="btn-outline" style={{fontSize:"0.8rem",padding:"0.3rem 0.75rem"}} onClick={() => navigator.clipboard.writeText(md)}>Copy</button>
            </div>
            <textarea className="tool-textarea font-mono" rows={8} value={md} readOnly />
          </div>
        )}
      </div>
    </div>
  );
}
