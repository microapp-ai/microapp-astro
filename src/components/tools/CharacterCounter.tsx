import React, { useState, useMemo } from "react";
import type { FAQItem } from "../../hooks/useSEO"
import type { RelatedTool } from "../../lib/types";

const CharacterCounter = () => {
  const [text, setText] = useState("");

  const counts = useMemo(() => {
    const charCount = text.length;
    const charCountNoSpaces = text.replace(/\s/g, "").length;
    const words = text.match(/\b\w+\b/g);
    const wordCount = words ? words.length : 0;

    // Simple sentence counting: splits by . ! ? followed by whitespace or end of string
    const sentences = text.split(/[.!?]+\s*|\n+/).filter(s => s.trim().length > 0);
    const sentenceCount = sentences.length;

    // Paragraph counting: splits by two or more newline characters
    const paragraphs = text.split(/\n\s*\n+/).filter(p => p.trim().length > 0);
    const paragraphCount = paragraphs.length;

    return {
      charCount,
      charCountNoSpaces,
      wordCount,
      sentenceCount,
      paragraphCount,
    };
  }, [text]);

  const faqs: FAQItem[] = [
    {
      question: "What is a character counter?",
      answer:
        "A character counter is an online tool that helps you count the number of characters, words, sentences, and paragraphs in a given text. It's useful for writers, students, and professionals who need to adhere to specific length requirements.",
    },
    {
      question: "How does the character counter work?",
      answer:
        "Simply type or paste your text into the input box. The tool automatically calculates and displays the counts for characters (with and without spaces), words, sentences, and paragraphs in real-time as you type.",
    },
    {
      question: "Why would I need to count characters or words?",
      answer:
        "Counting characters and words is essential for various tasks, such as writing essays with word limits, crafting social media posts with character restrictions, optimizing website content for SEO, or preparing documents for publication that require specific formatting.",
    },
    {
      question: "Does it count spaces as characters?",
      answer:
        "Yes, the tool provides two character counts: one that includes spaces and another that excludes them. This gives you flexibility depending on your specific requirements.",
    },
    {
      question: "Is my text saved or stored when I use this tool?",
      answer:
        "No, your text is processed entirely on your device using client-side JavaScript. We do not store, save, or transmit any of the text you enter into this tool, ensuring your privacy and data security.",
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: "Word Counter", slug: "word-counter", emoji: "📝" },
    { title: "Sentence Counter", slug: "sentence-counter", emoji: "✍️" },
    { title: "Reading Time Calculator", slug: "reading-time-calculator", emoji: "⏱️" },
  ];

  const howToSteps = [
    "Paste or type your text into the input area.",
    "Observe the real-time updates for character, word, sentence, and paragraph counts.",
    "Use the counts to meet your writing requirements or analyze your text.",
  ];

  return (
    <div className="tool-widget-content">
      <div className="w-full max-w-4xl mx-auto p-4">
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-green-700 focus:border-green-700 transition-all duration-200 ease-in-out text-gray-800 bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          rows={10}
          placeholder="Start typing or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Characters (with spaces)</h3>
            <p className="text-4xl font-bold text-green-700 dark:text-green-500 mt-2">{counts.charCount}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Characters (no spaces)</h3>
            <p className="text-4xl font-bold text-green-700 dark:text-green-500 mt-2">{counts.charCountNoSpaces}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Words</h3>
            <p className="text-4xl font-bold text-green-700 dark:text-green-500 mt-2">{counts.wordCount}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Sentences</h3>
            <p className="text-4xl font-bold text-green-700 dark:text-green-500 mt-2">{counts.sentenceCount}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Paragraphs</h3>
            <p className="text-4xl font-bold text-green-700 dark:text-green-500 mt-2">{counts.paragraphCount}</p>
          </div>
        </div>

        <button
          onClick={() => setText("")}
          className="mt-6 px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition-all duration-200 ease-in-out dark:bg-green-600 dark:hover:bg-green-700"
        >
          Clear Text
        </button>
      </div>
    </div>
  );
};

export default CharacterCounter;