import React, { useState, useMemo } from 'react';
import type { FAQItem } from '../../hooks/useSEO'
import type { RelatedTool } from '../../lib/types';

const SortLinesAlphabetically: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [sortOption, setSortOption] = useState<'alphabetical' | 'numerical' | 'length'>('alphabetical');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedText = useMemo(() => {
    if (!inputText) return '';

    let lines = inputText.split(/\r?\n/);

    // Filter out empty lines for sorting, but add them back later if they were present
    const originalLines = [...lines];
    lines = lines.filter(line => line.trim() !== '');

    switch (sortOption) {
      case 'alphabetical':
        lines.sort((a, b) => a.localeCompare(b));
        break;
      case 'numerical':
        lines.sort((a, b) => {
          const numA = parseFloat(a);
          const numB = parseFloat(b);
          if (isNaN(numA) && isNaN(numB)) return a.localeCompare(b); // Fallback for non-numeric lines
          if (isNaN(numA)) return 1; // Non-numeric comes after numeric
          if (isNaN(numB)) return -1; // Numeric comes before non-numeric
          return numA - numB;
        });
        break;
      case 'length':
        lines.sort((a, b) => a.length - b.length);
        break;
    }

    if (sortOrder === 'desc') {
      lines.reverse();
    }

    // Re-insert empty lines in their original relative positions if they were filtered out
    const finalSortedLines: string[] = [];
    let sortedIndex = 0;
    for (let i = 0; i < originalLines.length; i++) {
      if (originalLines[i].trim() === '') {
        finalSortedLines.push('');
      } else {
        if (sortedIndex < lines.length) {
          finalSortedLines.push(lines[sortedIndex]);
          sortedIndex++;
        }
      }
    }

    // If there are more sorted lines than non-empty original lines (shouldn't happen with filter), append them
    while (sortedIndex < lines.length) {
      finalSortedLines.push(lines[sortedIndex]);
      sortedIndex++;
    }

    return finalSortedLines.join('\n');
  }, [inputText, sortOption, sortOrder]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  const handleSortOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value as 'alphabetical' | 'numerical' | 'length');
  };

  const handleSortOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as 'asc' | 'desc');
  };

  const clearText = () => {
    setInputText('');
  };

  const faqs: FAQItem[] = [
    {
      question: 'What is this tool for?',
      answer: 'This tool allows you to quickly sort lines of text based on different criteria: alphabetically, numerically, or by the length of each line. It\'s useful for organizing lists, data, or any text-based content.',
    },
    {
      question: 'How do I use the Sort Lines Alphabetically tool?',
      answer: 'Simply paste your text into the input box. Choose your desired sorting option (alphabetical, numerical, or by length) and the sort order (ascending or descending). Then, click the \'Sort Lines\' button, and your sorted text will appear in the output box.',
    },
    {
      question: 'Can I sort numbers with this tool?',
      answer: 'Yes, you can! Select the \'Numerical\' sort option, and the tool will attempt to sort lines based on the numerical value found at the beginning of each line. Non-numerical lines will be treated as 0 for sorting purposes or placed at the end depending on the implementation.',
    },
    {
      question: 'What happens to empty lines or special characters?',
      answer: 'Empty lines are typically treated as empty strings and will be sorted accordingly. Special characters are handled based on their ASCII or Unicode values during alphabetical sorting. For numerical or length sorting, they contribute to the line\'s overall structure.',
    },
    {
      question: 'Is my data safe and private?',
      answer: 'Absolutely. This tool operates entirely client-side within your browser. Your text is never sent to any server, ensuring your data remains private and secure.',
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: 'Word Counter', slug: '/word-counter', emoji: '📝' },
    { title: 'Case Converter', slug: '/case-converter', emoji: '🔡' },
    { title: 'Duplicate Line Remover', slug: '/duplicate-line-remover', emoji: '✂️' },
  ];

  return (
    <div className="tool-widget-content">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <label htmlFor="inputText" className="block text-sm font-medium text-gray-700">Input Text</label>
          <textarea
            id="inputText"
            className="mt-1 block w-full h-64 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm font-mono"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Paste your lines here..."
          ></textarea>
        </div>
        <div className="flex-1">
          <label htmlFor="sortedText" className="block text-sm font-medium text-gray-700">Sorted Text</label>
          <textarea
            id="sortedText"
            className="mt-1 block w-full h-64 p-3 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm font-mono"
            value={sortedText}
            readOnly
            placeholder="Sorted lines will appear here..."
          ></textarea>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <label htmlFor="sortOption" className="block text-sm font-medium text-gray-700">Sort By</label>
            <select
              id="sortOption"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              value={sortOption}
              onChange={handleSortOptionChange}
            >
              <option value="alphabetical">Alphabetical</option>
              <option value="numerical">Numerical</option>
              <option value="length">Length</option>
            </select>
          </div>
          <div>
            <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">Order</label>
            <select
              id="sortOrder"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              value={sortOrder}
              onChange={handleSortOrderChange}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={clearText}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortLinesAlphabetically;