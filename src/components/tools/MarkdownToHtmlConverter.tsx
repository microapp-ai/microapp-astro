import React, { useState } from 'react';
import type { RelatedTool } from '../../lib/types';

function simpleMarkdownToHtml(md: string): string {
  return md
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/^#{6}\s+(.+)$/gm, '<h6>$1</h6>')
    .replace(/^#{5}\s+(.+)$/gm, '<h5>$1</h5>')
    .replace(/^#{4}\s+(.+)$/gm, '<h4>$1</h4>')
    .replace(/^#{3}\s+(.+)$/gm, '<h3>$1</h3>')
    .replace(/^#{2}\s+(.+)$/gm, '<h2>$1</h2>')
    .replace(/^#{1}\s+(.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/^---$/gm, '<hr />')
    .replace(/^(?!<[a-z]).+$/gm, '<p>$&</p>')
    .replace(/<\/p>\n<p>/g, '</p>\n<p>');
}

const MarkdownToHtmlConverter: React.FC = () => {
  const [markdown, setMarkdown] = useState('# Hello World\n\nThis is **bold** and *italic* text.\n\n- Item one\n- Item two\n\n[Link](https://example.com)');
  const [copied, setCopied] = useState(false);

  const html = simpleMarkdownToHtml(markdown);

  const copy = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs: FAQItem[] = [
    { question: 'What Markdown syntax is supported?', answer: 'This tool supports headings (# to ######), bold (**text**), italic (*text*), inline code (`code`), links ([text](url)), unordered lists (- item), and horizontal rules (---).' },
    { question: 'Is my content sent to a server?', answer: 'No. All conversion happens entirely in your browser using JavaScript. Your text never leaves your device.' },
    { question: 'Can I use this for blog posts?', answer: 'Yes. Write your post in Markdown, convert it here, then paste the HTML into your CMS or website editor.' },
    { question: 'Does it support tables?', answer: 'Basic table support is not included in this lightweight converter. For full GFM (GitHub Flavored Markdown) support, consider using a dedicated library.' },
    { question: 'What is Markdown?', answer: 'Markdown is a lightweight markup language created by John Gruber in 2004. It uses plain text formatting syntax that converts to HTML, making it popular for documentation, README files, and blog posts.' },
  ];

  const relatedTools: RelatedTool[] = [
    { title: 'HTML Encoder/Decoder', slug: '/html-encoder-decoder', emoji: '🔤' },
    { title: 'JSON Formatter', slug: '/json-formatter', emoji: '{}' },
    { title: 'Base64 Tool', slug: '/base64-tool', emoji: '📦' },
  ];

  return (
    <div className="tool-widget-content">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Markdown Input</label>
          <textarea
            value={markdown}
            onChange={e => setMarkdown(e.target.value)}
            rows={14}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-semibold text-gray-700">HTML Output</label>
            <button onClick={copy}
              className="text-xs bg-green-700 text-white px-3 py-1.5 rounded-lg hover:bg-green-800 transition-colors">
              {copied ? 'Copied!' : 'Copy HTML'}
            </button>
          </div>
          <pre className="w-full h-[336px] overflow-auto bg-gray-900 text-green-400 rounded-xl px-4 py-3 font-mono text-xs whitespace-pre-wrap">
            {html}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default MarkdownToHtmlConverter;
