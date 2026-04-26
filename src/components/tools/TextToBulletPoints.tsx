import React, { useState, useCallback } from "react";
import type { FAQItem } from "../../hooks/useSEO"
import type { RelatedTool } from "../../lib/types";

const TextToBulletPoints: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [bulletPoints, setBulletPoints] = useState<string>("");

  const convertToBulletPoints = useCallback(() => {
    if (!inputText.trim()) {
      setBulletPoints("");
      return;
    }

    const lines = inputText.split(/\n\s*\n|\n\s*-\s*|\n\s*\*\s*|\n\s*\d+\.\s*/);
    const filteredLines = lines.map(line => line.trim()).filter(line => line.length > 0);
    const bulletedText = filteredLines.map(line => `- ${line}`).join("\n");
    setBulletPoints(bulletedText);
  }, [inputText]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(bulletPoints);
  };

  const faqs: FAQItem[] = [
    {
      question: "What is the 'Text to Bullet Points' tool?",
      answer: "This tool helps you quickly convert any block of text, paragraph, or article into a clear and concise list of bullet points. It's designed to make information more digestible and easier to read.",
    },
    {
      question: "How does it work?",
      answer: "Simply paste your text into the input area, and the tool will automatically process it, identifying distinct ideas or sentences and formatting them into a bulleted list. It intelligently handles various line breaks and common list indicators.",
    },
    {
      question: "Can I use it for long articles?",
      answer: "Yes, the tool is designed to handle text of varying lengths, from short paragraphs to longer articles. However, for very extensive documents, you might want to process it in sections for better control over the output.",
    },
    {
      question: "Is my data safe and private?",
      answer: "Absolutely. All processing is done client-side in your browser, meaning your text never leaves your device. We do not store or transmit any of the content you input into the tool.",
    },
    {
      question: "What are the benefits of using bullet points?",
      answer: "Bullet points enhance readability by breaking down complex information into smaller, manageable chunks. They help highlight key information, improve comprehension, and make content more scannable, which is especially useful for presentations, summaries, and web content.",
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: "Summarizer", slug: "summarizer", emoji: "📝" },
    { title: "Paraphrasing Tool", slug: "paraphrasing-tool", emoji: "✍️" },
    { title: "Sentence Counter", slug: "sentence-counter", emoji: "🔢" },
  ];

  return (
    <div className="tool-widget-content">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 mb-2">Input Text</label>
          <textarea
            id="inputText"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 h-64 resize-y"
            placeholder="Paste your text here..."
            value={inputText}
            onChange={handleInputChange}
          ></textarea>
          <button
            onClick={convertToBulletPoints}
            className="mt-4 w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Convert to Bullet Points
          </button>
        </div>
        <div className="flex-1">
          <label htmlFor="bulletPoints" className="block text-sm font-medium text-gray-700 mb-2">Bullet Points</label>
          <textarea
            id="bulletPoints"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-50 h-64 resize-y"
            readOnly
            value={bulletPoints}
          ></textarea>
          <button
            onClick={handleCopy}
            disabled={!bulletPoints}
            className="mt-4 w-full bg-yellow-300 text-gray-800 py-2 px-4 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextToBulletPoints;