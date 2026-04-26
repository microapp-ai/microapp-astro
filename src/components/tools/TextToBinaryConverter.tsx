import React, { useState } from 'react';
import type { FAQItem } from '../../hooks/useSEO'
import type { RelatedTool } from '../../lib/types';

const TextToBinaryConverter: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');

  const convertToBinary = () => {
    if (!inputText) {
      setOutputText('');
      return;
    }
    const binaryResult = inputText
      .split('')
      .map((char) => {
        const bin = char.charCodeAt(0).toString(2);
        return bin.padStart(8, '0');
      })
      .join(' ');
    setOutputText(binaryResult);
  };

  const convertToText = () => {
    if (!outputText) {
      setInputText('');
      return;
    }
    const textResult = outputText
      .split(' ')
      .map((bin) => {
        // Ensure it's a valid 8-bit binary string before converting
        if (bin.match(/^[01]{8}$/)) {
          return String.fromCharCode(parseInt(bin, 2));
        } else {
          return ''; // Handle invalid binary segments
        }
      })
      .join('');
    setInputText(textResult);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    // Optionally, add a visual feedback for the user
  };

  const clearFields = () => {
    setInputText('');
    setOutputText('');
  };

  const faqs: FAQItem[] = [
    {
      question: 'What is binary code?',
      answer: 'Binary code is a system of representing text or computer processor instructions by using the binary number system\'s two binary digits, 0 and 1. It is the fundamental language of computers.',
    },
    {
      question: 'How does text to binary conversion work?',
      answer: 'Each character in the text is converted into its ASCII (American Standard Code for Information Interchange) value, which is then represented as an 8-bit binary number. For example, the letter \'A\' has an ASCII value of 65, which in binary is 01000001.',
    },
    {
      question: 'Can I convert binary back to text?',
      answer: 'Yes, this tool also supports converting binary code back to text. The process is reversed: each 8-bit binary sequence is converted back to its decimal ASCII value, and then to the corresponding character.',
    },
    {
      question: 'Why is binary important in computing?',
      answer: 'Binary is crucial because computers operate using electrical signals that are either on or off, which can be represented as 1s and 0s. This simple system allows computers to process and store complex information efficiently.',
    },
    {
      question: 'Are there different types of binary codes?',
      answer: 'While the most common form of binary code for text is based on ASCII or Unicode, there are other specialized binary codes used in various applications, such as Gray code or Binary Coded Decimal (BCD), which have different purposes and structures.',
    },
  ];

  const relatedTools: RelatedTool[] = [
    {
      title: 'Binary to Decimal Converter',
      slug: '/binary-to-decimal',
      emoji: '🔢',
    },
    {
      title: 'Hex to RGB Converter',
      slug: '/hex-to-rgb',
      emoji: '🎨',
    },
    {
      title: 'Base64 Encoder/Decoder',
      slug: '/base64-tool',
      emoji: '🔒',
    },
  ];

  return (
    <div className="tool-widget-content">
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <label htmlFor="text-input" className="block text-sm font-medium text-gray-700">Text Input</label>
          <textarea
            id="text-input"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700 sm:text-sm p-2"
            rows={6}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text here..."
          ></textarea>
          <button
            onClick={convertToBinary}
            className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
          >
            Convert to Binary
          </button>
        </div>

        <div className="flex-1">
          <label htmlFor="binary-output" className="block text-sm font-medium text-gray-700">Binary Output</label>
          <textarea
            id="binary-output"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700 sm:text-sm p-2"
            rows={6}
            value={outputText}
            readOnly
            placeholder="Binary output will appear here..."
          ></textarea>
          <button
            onClick={copyToClipboard}
            className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300"
          >
            Copy to Clipboard
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <label htmlFor="binary-input" className="block text-sm font-medium text-gray-700">Binary Input</label>
          <textarea
            id="binary-input"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700 sm:text-sm p-2"
            rows={6}
            value={outputText}
            onChange={(e) => setOutputText(e.target.value)}
            placeholder="Enter binary here..."
          ></textarea>
          <button
            onClick={convertToText}
            className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
          >
            Convert to Text
          </button>
        </div>

        <div className="flex-1">
          <label htmlFor="text-output" className="block text-sm font-medium text-gray-700">Text Output</label>
          <textarea
            id="text-output"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700 sm:text-sm p-2"
            rows={6}
            value={inputText}
            readOnly
            placeholder="Text output will appear here..."
          ></textarea>
          <button
            onClick={clearFields}
            className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300"
          >
            Clear Fields
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextToBinaryConverter;