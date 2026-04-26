import React, { useState, useEffect } from 'react';
import type { FAQItem } from '../../hooks/useSEO'
import type { RelatedTool } from '../../lib/types';

const TextRepeater: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [repetitions, setRepetitions] = useState<number>(5);
  const [separator, setSeparator] = useState<string>(' ');
  const [outputText, setOutputText] = useState<string>('');

  useEffect(() => {
    handleRepeatText();
  }, [inputText, repetitions, separator]);

  const handleRepeatText = () => {
    if (inputText.trim() === '') {
      setOutputText('');
      return;
    }
    const repeatedText = Array(repetitions).fill(inputText).join(separator);
    setOutputText(repeatedText);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    // Optionally, add a visual feedback for copying
  };

  const faqs: FAQItem[] = [
    {
      question: 'What is the Text Repeater tool used for?',
      answer: 'The Text Repeater tool is designed to duplicate any given text or phrase a specified number of times. It\'s useful for various purposes, such as generating placeholder content, creating patterns, testing input fields, or simply repeating a message for emphasis.',
    },
    {
      question: 'Is there a limit to how many times I can repeat text?',
      answer: 'While there isn\'t a strict hardcoded limit within the tool itself, extremely large numbers of repetitions might lead to performance issues or browser limitations due to the sheer volume of text generated. For practical purposes, it handles a wide range of repetitions efficiently.',
    },
    {
      question: 'Can I add a separator between the repeated texts?',
      answer: 'Yes, the Text Repeater tool typically includes an option to add a custom separator (like a space, comma, newline, or any other character/string) between each repetition of the text, giving you more control over the output format.',
    },
    {
      question: 'Does the tool work with special characters and emojis?',
      answer: 'Absolutely! The Text Repeater tool processes text as-is, meaning it will correctly repeat special characters, symbols, emojis, and text from various languages without any issues, preserving their original form.',
    },
    {
      question: 'Is the Text Repeater tool client-side or server-side?',
      answer: 'This Text Repeater tool is entirely client-side, meaning all the processing happens directly in your web browser. Your text is not sent to any server, ensuring privacy and fast performance.',
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: 'Word Counter', slug: '/word-counter', emoji: '📝' },
    { title: 'Case Converter', slug: '/case-converter', emoji: '🔡' },
    { title: 'Reverse Text Generator', slug: '/reverse-text-generator', emoji: '↩️' },
  ];

  return (
    <div className="tool-widget-content">
      <div className="flex flex-col space-y-4">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
          rows={6}
          placeholder="Enter text to repeat..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="number"
            className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
            placeholder="Number of repetitions"
            value={repetitions}
            onChange={(e) => setRepetitions(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
          />
          <input
            type="text"
            className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
            placeholder="Separator (e.g., space, comma, newline)"
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
          />
        </div>

        <div className="flex space-x-4">
          <button
            className="w-full bg-green-700 text-white py-3 px-6 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50"
            onClick={handleRepeatText}
          >
            Repeat Text
          </button>
          <button
            className="w-full bg-yellow-300 text-gray-800 py-3 px-6 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50"
            onClick={handleCopy}
            disabled={!outputText}
          >
            Copy Output
          </button>
        </div>

        <textarea
          className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 font-mono text-gray-800"
          rows={10}
          readOnly
          value={outputText}
          placeholder="Repeated text will appear here..."
        ></textarea>
      </div>
    </div>
  );
};

export default TextRepeater;