import React, { useState, useCallback } from "react";
import type { FAQItem } from "../../hooks/useSEO"
import type { RelatedTool } from "../../lib/types";

const faqs: FAQItem[] = [
  {
    question: "What is a UUID?",
    answer: "A UUID (Universally Unique Identifier) is a 128-bit number used to uniquely identify information in computer systems. It's designed to be globally unique, meaning the probability of two UUIDs being the same is extremely low.",
  },
  {
    question: "What is UUID v4?",
    answer: "UUID version 4 is a type of UUID that is generated using random or pseudo-random numbers. This randomness ensures a very high degree of uniqueness, making it suitable for most applications where unique identifiers are needed without a central authority.",
  },
  {
    question: "Why would I need a UUID?",
    answer: "UUIDs are commonly used in various scenarios, such as database primary keys, distributed systems to avoid collisions, session identifiers, and file names, where a unique identifier is crucial to prevent conflicts and ensure data integrity.",
  },
  {
    question: "How unique are UUIDs?",
    answer: "The probability of a duplicate UUID v4 being generated is extremely low. To put it in perspective, you would have to generate 1 billion UUIDs per second for 100 years to have a 50% chance of a single collision. For practical purposes, they can be considered unique.",
  },
  {
    question: "Can I generate multiple UUIDs at once?",
    answer: "This specific tool generates one UUID at a time. For generating multiple UUIDs programmatically, you would typically use a library in your chosen programming language (e.g., `uuid` in Python, `crypto.randomUUID` in Node.js, or similar in other languages).",
  },
];

const relatedTools: RelatedTool[] = [
  {
    title: "Password Generator",
    slug: "password-generator",
    emoji: "🔑",
  },
  {
    title: "JSON Formatter",
    slug: "json-formatter",
    emoji: "📝",
  },
  {
    title: "Base64 Tool",
    slug: "base64-tool",
    emoji: "🔠",
  },
];

const UUIDGenerator: React.FC = () => {
  const [uuid, setUuid] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const generateUuid = useCallback(() => {
    const newUuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    setUuid(newUuid);
    setCopySuccess(false); // Reset copy success message on new generation
  }, []);

  const copyToClipboard = useCallback(() => {
    if (uuid) {
      navigator.clipboard.writeText(uuid);
      setCopySuccess(true);
    }
  }, [uuid]);

  // Generate initial UUID on component mount
  React.useEffect(() => {
    generateUuid();
  }, [generateUuid]);

  return (
    <div className="tool-widget-content">
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="uuid-output" className="block text-sm font-medium text-gray-700 mb-2">
            Generated UUID v4:
          </label>
          <textarea
            id="uuid-output"
            readOnly
            value={uuid}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 font-mono text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-700"
            placeholder="Click 'Generate UUID' to get started"
          ></textarea>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={generateUuid}
            className="flex-1 px-5 py-2 bg-green-700 text-white font-semibold rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 transition-colors duration-200"
          >
            Generate UUID
          </button>
          <button
            onClick={copyToClipboard}
            disabled={!uuid}
            className="flex-1 px-5 py-2 bg-yellow-300 text-gray-900 font-semibold rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {copySuccess ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UUIDGenerator;