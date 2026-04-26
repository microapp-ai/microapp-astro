import React, { useState } from 'react';
import type { FAQItem } from '../../hooks/useSEO'
import type { RelatedTool } from '../../lib/types';

const DuplicateLineRemover: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');

  const handleRemoveDuplicates = () => {
    const lines = inputText.split('\n');
    const uniqueLines = Array.from(new Set(lines.map(line => line.trim()))).filter(line => line !== '');
    setOutputText(uniqueLines.join('\n'));
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  const faqs: FAQItem[] = [
    {
      question: 'What is a duplicate line remover?',
      answer: 'A duplicate line remover is a tool that processes a block of text or a list, identifies lines that are identical, and then outputs the text with only one instance of each unique line, effectively eliminating all repetitions.'
    },
    {
      question: 'How does this tool identify duplicate lines?',
      answer: 'This tool identifies duplicate lines by comparing each line in the input text. It treats lines with the same content (after trimming leading/trailing whitespace) as duplicates. The order of unique lines in the output is preserved based on their first appearance in the input.'
    },
    {
      question: 'Can I remove duplicate lines while preserving their original order?',
      answer: 'Yes, this tool is designed to preserve the original order of the unique lines. The first occurrence of each unique line will be kept, and subsequent duplicates will be removed, maintaining the sequence from the original input.'
    },
    {
      question: 'What happens to empty lines or lines with only whitespace?',
      answer: 'Before processing, each line is trimmed of leading and trailing whitespace. Empty lines or lines that become empty after trimming are generally filtered out, ensuring that the output contains only meaningful unique content.'
    },
    {
      question: 'In what scenarios is a duplicate line remover useful?',
      answer: 'This tool is highly useful for data cleaning, list management, and text processing. For example, it can be used to clean up mailing lists, remove redundant entries from code snippets, consolidate data from multiple sources, or prepare unique keyword lists for SEO.'
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: 'Sort Lines', slug: '/sort-lines', emoji: '🔠' },
    { title: 'Whitespace Remover', slug: '/whitespace-remover', emoji: '🧼' },
    { title: 'Line Break Removal Tool', slug: '/line-break-removal-tool', emoji: '✂️' },
  ];

  return (
    <div className="tool-widget-content">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="inputText" className="block text-lg font-medium text-gray-700 mb-2">
            Input Text
          </label>
          <textarea
            id="inputText"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 h-64 resize-y"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your text or list here, with each item on a new line."
          ></textarea>
          <div className="flex space-x-2 mt-4">
            <button
              onClick={handleRemoveDuplicates}
              className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
            >
              Remove Duplicates
            </button>
            <button
              onClick={handleClear}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition-colors duration-200"
            >
              Clear
            </button>
          </div>
        </div>
        <div className="flex-1">
          <label htmlFor="outputText" className="block text-lg font-medium text-gray-700 mb-2">
            Output Text
          </label>
          <textarea
            id="outputText"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-300 focus:border-yellow-300 h-64 resize-y"
            value={outputText}
            readOnly
            placeholder="Unique lines will appear here."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default DuplicateLineRemover;