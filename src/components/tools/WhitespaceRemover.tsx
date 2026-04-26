import React, { useState } from "react";
import type { FAQItem } from "../../hooks/useSEO"
import type { RelatedTool } from "../../lib/types";

const WhitespaceRemover: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");

  const removeWhitespace = () => {
    // Remove extra spaces: replace multiple spaces with a single space
    let cleanedText = inputText.replace(/ +/g, " ");
    // Remove tabs: replace tabs with a single space
    cleanedText = cleanedText.replace(/\t+/g, " ");
    // Remove blank lines: replace multiple newlines with a single newline, then trim leading/trailing newlines
    cleanedText = cleanedText.replace(/\n\s*\n/g, "\n").trim();
    setOutputText(cleanedText);
  };

  const faqs: FAQItem[] = [
    {
      question: "What is whitespace and why should I remove it?",
      answer:
        "Whitespace refers to any non-printing characters that create blank space in text, such as spaces, tabs, and newlines. Removing excess whitespace can improve readability, reduce file size, and ensure consistent formatting, especially in code, data files, or web content.",
    },
    {
      question: "How does this Whitespace Remover tool work?",
      answer:
        "This tool processes your input text to identify and eliminate redundant whitespace. It converts multiple consecutive spaces or tabs into a single space and removes entirely blank lines, leaving your text clean and well-formatted.",
    },
    {
      question: "Will this tool remove all spaces from my text?",
      answer:
        "No, this tool is designed to remove *excess* whitespace, not all spaces. It ensures that there is only a single space between words and removes blank lines, preserving the essential structure and readability of your text.",
    },
    {
      question: "Is my text safe and private when using this tool?",
      answer:
        "Yes, absolutely. All processing is done client-side within your browser. Your text is never sent to any server, ensuring complete privacy and security of your data.",
    },
    {
      question: "Can I use this tool for code or data formatting?",
      answer:
        "While primarily designed for general text, this tool can be useful for preliminary cleaning of code snippets or data entries by removing inconsistent spacing and blank lines. However, for specific code formatting, dedicated linters or formatters are often more suitable.",
    },
  ];

  const relatedTools: RelatedTool[] = [
    {
      title: "Case Converter",
      slug: "case-converter",
      emoji: "🔡",
    },
    {
      title: "Duplicate Line Remover",
      slug: "duplicate-line-remover",
      emoji: "✂️",
    },
    {
      title: "Line Break Removal Tool",
      slug: "line-break-removal-tool",
      emoji: "↩️",
    },
  ];

  return (
    <div className="tool-widget-content">
      <div className="flex flex-col space-y-4">
        <textarea
          className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 bg-gray-800 text-white"
          rows={10}
          placeholder="Enter your text here with extra spaces, tabs, or blank lines..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>
        <button
          className="w-full px-6 py-3 bg-green-700 text-white font-semibold rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 transition-colors duration-200"
          onClick={removeWhitespace}
        >
          Remove Whitespace
        </button>
        <textarea
          className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-gray-800 text-white"
          rows={10}
          placeholder="Cleaned text will appear here..."
          value={outputText}
          readOnly
        ></textarea>
      </div>
    </div>
  );
};

export default WhitespaceRemover;