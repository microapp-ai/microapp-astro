import React, { useState } from 'react';

const romanNumerals: [number, string][] = [
  [1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],
  [50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']
];

function convertToRoman(num: number): string {
  if (num < 1 || num > 3999) return 'Out of range (1–3999)';
  let result = '';
  for (const [value, numeral] of romanNumerals) {
    while (num >= value) { result += numeral; num -= value; }
  }
  return result;
}

function convertFromRoman(str: string): number | string {
  const map: Record<string,number> = {I:1,V:5,X:10,L:50,C:100,D:500,M:1000};
  const s = str.toUpperCase();
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    const curr = map[s[i]];
    const next = map[s[i+1]];
    if (!curr) return 'Invalid roman numeral';
    if (next && curr < next) { result += next - curr; i++; }
    else result += curr;
  }
  return result;
}

import type { FAQItem } from '../../hooks/useSEO'
import type { RelatedTool } from '../../lib/types';

const RomanNumeralConverter: React.FC = () => {
  const [numberInput, setNumberInput] = useState<string>('');
  const [romanInput, setRomanInput] = useState<string>('');
  const [romanOutput, setRomanOutput] = useState<string>('');
  const [numberOutput, setNumberOutput] = useState<string>('');

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumberInput(value);
    if (value === '') {
      setRomanOutput('');
      return;
    }
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      setRomanOutput(convertToRoman(num));
    } else {
      setRomanOutput('Invalid number');
    }
  };

  const handleRomanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRomanInput(value);
    if (value === '') {
      setNumberOutput('');
      return;
    }
    const result = convertFromRoman(value);
    setNumberOutput(result.toString());
  };

  const faqs: FAQItem[] = [
    {
      question: 'What are Roman numerals?',
      answer: 'Roman numerals are a numeral system that originated in ancient Rome and remained the usual way of writing numbers throughout Europe well into the Late Middle Ages. They are based on combinations of letters from the Latin alphabet: I, V, X, L, C, D, and M.',
    },
    {
      question: 'How do I convert a number to a Roman numeral?',
      answer: 'To convert a number to a Roman numeral, you break down the number into its constituent values (e.g., 1994 = 1000 + 900 + 90 + 4) and then represent each value with its corresponding Roman numeral. For example, 1000 is M, 900 is CM, 90 is XC, and 4 is IV, resulting in MCMXCIV.',
    },
    {
      question: 'How do I convert a Roman numeral to a number?',
      answer: 'To convert a Roman numeral to a number, you read the numerals from left to right, adding their values. If a smaller value precedes a larger value (e.g., IV, IX, XL), you subtract the smaller from the larger. For example, in MCMXCIV, M=1000, CM=900 (1000-100), XC=90 (100-10), and IV=4 (5-1). Summing these gives 1994.',
    },
    {
      question: 'What is the range of numbers this converter supports?',
      answer: 'This converter typically supports numbers from 1 to 3999. Roman numeral systems traditionally do not have a standard way to represent zero or larger numbers beyond 3999 without additional conventions.',
    },
    {
      question: 'Are there any special rules for Roman numerals?',
      answer: 'Yes, there are a few key rules: A numeral cannot be repeated more than three times in a row (e.g., III is valid, IIII is not). Only powers of ten (I, X, C, M) can be subtracted, and only from the next two larger values (e.g., I can be subtracted from V and X, X from L and C, C from D and M).',
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: 'Binary to Decimal', slug: '/binary-to-decimal', emoji: '🔢' },
    { title: 'Hex to RGB', slug: '/hex-to-rgb', emoji: '🎨' },
    { title: 'Number to Words', slug: '/number-to-words', emoji: '🔤' },
  ];

  return (
    <div className="tool-widget-content">
      <div className="space-y-6">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Number to Roman Numeral</h2>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-700 focus:border-green-700"
            placeholder="Enter a number (1-3999)"
            value={numberInput}
            onChange={handleNumberChange}
            min="1"
            max="3999"
          />
          <div className="mt-4 p-3 bg-gray-100 rounded-md text-gray-700 font-medium">
            Roman Numeral: <span className="text-green-700 font-bold">{romanOutput}</span>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Roman Numeral to Number</h2>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-700 focus:border-green-700"
            placeholder="Enter a Roman numeral (e.g., MCMXCIV)"
            value={romanInput}
            onChange={handleRomanChange}
          />
          <div className="mt-4 p-3 bg-gray-100 rounded-md text-gray-700 font-medium">
            Number: <span className="text-green-700 font-bold">{numberOutput}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RomanNumeralConverter;