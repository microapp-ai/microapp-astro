import React, { useState } from 'react';
import type { FAQItem } from '../../hooks/useSEO'
import type { RelatedTool } from '../../lib/types';

const Summarizer: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [summaryLength, setSummaryLength] = useState<number>(3); // Default to 3 sentences

  const handleSummarize = () => {
    if (!inputText.trim()) {
      setSummary('Please enter some text to summarize.');
      return;
    }

    // A very basic extractive summarization algorithm:
    // 1. Split text into sentences.
    // 2. Filter out very short sentences (e.g., less than 10 characters) to avoid noise.
    // 3. Take the first 'summaryLength' sentences.
    // This is a simple client-side implementation without AI/NLP libraries.
    const sentences = inputText.match(/[^.!?\n]+[.!?\n]*/g) || [];
    const filteredSentences = sentences.filter(s => s.trim().length > 10);
    const generatedSummary = filteredSentences.slice(0, summaryLength).join(' ').trim();

    setSummary(generatedSummary || 'Could not generate a summary. Try a different text or adjust the summary length.');
  };

  const faqs: FAQItem[] = [
    {
      question: 'What is a Text Summarizer?',
      answer: 'A Text Summarizer is a tool that condenses longer pieces of text into shorter, more manageable summaries. It helps you quickly grasp the main points without reading the entire document.'
    },
    {
      question: 'How does this summarizer work?',
      answer: 'This particular summarizer uses a simple extractive method. It identifies and extracts the most relevant sentences from your input text based on their position and length, then presents them as a concise summary. It does not use advanced AI or natural language processing models.'
    },
    {
      question: 'Can I choose the length of the summary?',
      answer: 'Yes, you can adjust the desired summary length by selecting the number of sentences you want in the output. This allows you to control how brief or detailed your summary will be.'
    },
    {
      question: 'Is my text kept private?',
      answer: 'Absolutely. All summarization is performed directly in your browser. Your text is never sent to any server, ensuring complete privacy and security of your data.'
    },
    {
      question: 'What kind of texts can I summarize?',
      answer: 'You can summarize various types of text, including articles, reports, emails, notes, and more. For best results, use well-structured text with clear sentences.'
    }
  ];

  const relatedTools: RelatedTool[] = [
    { title: 'Word Counter', slug: '/word-counter', emoji: '📝' },
    { title: 'Sentence Counter', slug: '/sentence-counter', emoji: '🔢' },
    { title: 'Paraphrasing Tool', slug: '/paraphrasing-tool', emoji: '✍️' }
  ];

  return (
    <div className="tool-widget-content">
      <div className="flex flex-col space-y-6">
        {/* Input Section */}
        <div>
          <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 mb-2">Enter Text to Summarize</label>
          <textarea
            id="inputText"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
            rows={10}
            placeholder="Paste your text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>
        </div>

        {/* Summary Length Selector */}
        <div className="flex items-center space-x-4">
          <label htmlFor="summaryLength" className="block text-sm font-medium text-gray-700">Summary Length (sentences):</label>
          <select
            id="summaryLength"
            className="mt-1 block w-24 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            value={summaryLength}
            onChange={(e) => setSummaryLength(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSummarize}
          className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
        >
          Summarize Text
        </button>

        {/* Output Section */}
        <div>
          <label htmlFor="summaryOutput" className="block text-sm font-medium text-gray-700 mb-2">Summary</label>
          <textarea
            id="summaryOutput"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-800 resize-none"
            rows={8}
            readOnly
            value={summary}
            placeholder="Your summary will appear here..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Summarizer;