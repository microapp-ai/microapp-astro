import React, { useState } from 'react';
import type { FAQItem } from '../../hooks/useSEO'
import type { RelatedTool } from '../../lib/types';

const HtmlEncoderDecoder: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const encodeHtml = (text: string): string => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const decodeHtml = (text: string): string => {
    const doc = new DOMParser().parseFromString(text, 'text/html');
    return doc.documentElement.textContent || '';
  };

  const handleEncode = () => {
    setOutputText(encodeHtml(inputText));
  };

  const handleDecode = () => {
    setOutputText(decodeHtml(inputText));
  };

  const faqs: FAQItem[] = [
    {
      question: 'What is HTML encoding?',
      answer: 'HTML encoding (also known as HTML escaping) is the process of replacing characters that have special meaning in HTML (like <, >, &, ", \') with their corresponding HTML entities (e.g., < becomes &lt;). This prevents browsers from misinterpreting these characters as part of the HTML structure, ensuring they are displayed literally.',
    },
    {
      question: 'Why do I need to encode HTML?',
      answer: 'Encoding HTML is crucial for security and proper rendering. It prevents cross-site scripting (XSS) attacks by neutralizing malicious scripts embedded in user input. It also ensures that special characters are displayed correctly in a web browser, rather than being parsed as HTML tags or attributes.',
    },
    {
      question: 'What is HTML decoding?',
      answer: 'HTML decoding is the reverse process of HTML encoding. It converts HTML entities (e.g., &lt;, &amp;) back into their original characters (<, &). This is often necessary when you need to process or display the raw text content that was previously HTML encoded.',
    },
    {
      question: 'When should I use this tool?',
      answer: 'You should use this tool when you need to prepare text for safe inclusion in an HTML document, especially if the text comes from user input and might contain characters that could break the HTML structure or pose a security risk. Conversely, use it to convert HTML entities back to their original characters for readability or further processing.',
    },
    {
      question: 'Are there different types of HTML entities?',
      answer: 'Yes, there are several types. Named entities (like &lt; for less than) are easier to read. Numeric entities can be decimal (e.g., &#60;) or hexadecimal (e.g., &#x3C;). All serve the same purpose of representing special characters in HTML.',
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: 'URL Encoder Decoder', slug: '/url-encoder-decoder', emoji: '🔗' },
    { title: 'Base64 Tool', slug: '/base64-tool', emoji: '🔒' },
    { title: 'JSON Formatter', slug: '/json-formatter', emoji: '📄' },
  ];

  return (
    <div className="tool-widget-content">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="inputText" className="block text-lg font-medium text-gray-700 mb-2">Input Text</label>
          <textarea
            id="inputText"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 shadow-sm h-48"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to encode or decode..."
          ></textarea>
        </div>
        <div className="flex-1">
          <label htmlFor="outputText" className="block text-lg font-medium text-gray-700 mb-2">Output Text</label>
          <textarea
            id="outputText"
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 h-48 resize-none"
            value={outputText}
            readOnly
            placeholder="Encoded or decoded text will appear here..."
          ></textarea>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handleEncode}
          className="px-6 py-3 bg-green-700 text-white font-semibold rounded-md shadow-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
        >
          Encode HTML
        </button>
        <button
          onClick={handleDecode}
          className="px-6 py-3 bg-yellow-300 text-gray-800 font-semibold rounded-md shadow-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors"
        >
          Decode HTML
        </button>
      </div>
    </div>
  );
};

export default HtmlEncoderDecoder;