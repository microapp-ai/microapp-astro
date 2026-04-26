import React, { useState, useMemo } from 'react';
import type { FAQItem } from '../../hooks/useSEO'
import type { RelatedTool } from '../../lib/types';

const commonEnglishWords = new Set([
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
  'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over',
  'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these',
  'give', 'day', 'most', 'us', 'is', 'are', 'was', 'were'
]);

const WordFrequencyCounter: React.FC = () => {
  const [textInput, setTextInput] = useState<string>('');
  const [minWordLength, setMinWordLength] = useState<number>(1);
  const [ignoreCase, setIgnoreCase] = useState<boolean>(true);
  const [ignoreCommonWords, setIgnoreCommonWords] = useState<boolean>(false);

  const wordFrequencies = useMemo(() => {
    if (!textInput.trim()) {
      return [];
    }

    let processedText = textInput;
    if (ignoreCase) {
      processedText = processedText.toLowerCase();
    }

    // Remove punctuation and split into words
    const words = processedText.match(/\b\w+\b/g) || [];

    const frequencyMap = new Map<string, number>();
    for (const word of words) {
      if (word.length >= minWordLength) {
        if (ignoreCommonWords && commonEnglishWords.has(word)) {
          continue;
        }
        frequencyMap.set(word, (frequencyMap.get(word) || 0) + 1);
      }
    }

    const sortedFrequencies = Array.from(frequencyMap.entries())
      .sort((a, b) => b[1] - a[1]); // Sort by frequency descending

    return sortedFrequencies;
  }, [textInput, minWordLength, ignoreCase, ignoreCommonWords]);

  const faqs: FAQItem[] = [
    {
      question: "What is a Word Frequency Counter?",
      answer: "A Word Frequency Counter is a tool that analyzes a given text and calculates how many times each unique word appears. It helps identify the most common words, which can be useful for various linguistic analyses, SEO, or content creation."
    },
    {
      question: "How do I use this Word Frequency Counter?",
      answer: "Simply paste or type your text into the input box. The tool will automatically process the text and display a list of words along with their respective counts. You can adjust settings like minimum word length, case sensitivity, and whether to ignore common words."
    },
    {
      question: "Can I ignore common words like 'the' or 'and'?",
      answer: "Yes, you can! There's an option to 'Ignore Common Words' which, when checked, will filter out a predefined list of frequently used English words from your frequency count. This helps you focus on more significant or unique vocabulary."
    },
    {
      question: "Is this tool case-sensitive?",
      answer: "By default, the tool is not case-sensitive, meaning 'Word' and 'word' are counted as the same. However, you can toggle the 'Ignore Case' option to make the analysis case-sensitive if you need to differentiate between capitalized and uncapitalized instances of words."
    },
    {
      question: "What are the practical applications of word frequency analysis?",
      answer: "Word frequency analysis has many uses, including: improving SEO by identifying keywords, analyzing writing style, detecting plagiarism, studying linguistic patterns, creating word clouds, and even learning new languages by focusing on high-frequency vocabulary."
    }
  ];

  const relatedTools: RelatedTool[] = [
    { title: "Character Counter", slug: "character-counter", emoji: "🔠" },
    { title: "Sentence Counter", slug: "sentence-counter", emoji: "✍️" },
    { title: "Readability Checker", slug: "readability-checker", emoji: "📖" }
  ];

  return (
    <div className="tool-widget-content">
      <div className="space-y-6">
        <div>
          <label htmlFor="text-input" className="block text-sm font-medium text-gray-700">Enter your text here:</label>
          <textarea
            id="text-input"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-700 focus:border-green-700 sm:text-sm"
            rows={10}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Paste your text here to count word frequencies..."
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div>
            <label htmlFor="min-word-length" className="block text-sm font-medium text-gray-700">Minimum Word Length: {minWordLength}</label>
            <input
              type="range"
              id="min-word-length"
              min="1"
              max="15"
              value={minWordLength}
              onChange={(e) => setMinWordLength(Number(e.target.value))}
              className="mt-1 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-700"
            />
          </div>
          <div className="flex items-center">
            <input
              id="ignore-case"
              type="checkbox"
              checked={ignoreCase}
              onChange={(e) => setIgnoreCase(e.target.checked)}
              className="h-4 w-4 text-green-700 focus:ring-green-700 border-gray-300 rounded"
            />
            <label htmlFor="ignore-case" className="ml-2 block text-sm text-gray-900">Ignore Case</label>
          </div>
          <div className="flex items-center">
            <input
              id="ignore-common-words"
              type="checkbox"
              checked={ignoreCommonWords}
              onChange={(e) => setIgnoreCommonWords(e.target.checked)}
              className="h-4 w-4 text-green-700 focus:ring-green-700 border-gray-300 rounded"
            />
            <label htmlFor="ignore-common-words" className="ml-2 block text-sm text-gray-900">Ignore Common Words</label>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Word Frequencies:</h3>
          {wordFrequencies.length === 0 ? (
            <p className="text-gray-500">No words to display or text input is empty.</p>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200">
                {wordFrequencies.map(([word, count]) => (
                  <li key={word} className="px-4 py-3 flex items-center justify-between sm:px-6">
                    <span className="text-gray-900 font-medium">{word}</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-yellow-300 text-gray-800">
                      {count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordFrequencyCounter;