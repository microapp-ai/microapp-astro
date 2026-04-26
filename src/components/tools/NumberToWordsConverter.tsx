import React, { useState, useEffect } from 'react';
import type { FAQItem } from '../../hooks/useSEO'
import type { RelatedTool } from '../../lib/types';

const NumberToWordsConverter: React.FC = () => {
  const [numberInput, setNumberInput] = useState<string>('');
  const [wordsOutput, setWordsOutput] = useState<string>('');

  const units = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
                 "seventeen", "eighteen", "nineteen"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  const thousands = ["", "thousand", "million", "billion", "trillion"];

  const convertChunk = (n: number): string => {
    let chunkWords: string[] = [];
    if (n >= 100) {
      chunkWords.push(units[Math.floor(n / 100)] + " hundred");
      n %= 100;
    }
    if (n >= 20) {
      chunkWords.push(tens[Math.floor(n / 10)]);
      n %= 10;
    }
    if (n >= 10) {
      chunkWords.push(teens[n - 10]);
      n = 0;
    }
    if (n > 0) {
      chunkWords.push(units[n]);
    }
    return chunkWords.join(" ");
  };

  const numberToWords = (num: number): string => {
    if (num === 0) {
      return "zero";
    }

    let words: string[] = [];
    let isNegative = false;
    if (num < 0) {
      isNegative = true;
      num = Math.abs(num);
    }

    let i = 0;
    while (num > 0) {
      if (num % 1000 !== 0) {
        const chunk = num % 1000;
        const chunkStr = convertChunk(chunk);
        if (chunkStr) {
          if (i > 0) {
            words.unshift(chunkStr + " " + thousands[i]);
          } else {
            words.unshift(chunkStr);
          }
        }
      }
      num = Math.floor(num / 1000);
      i += 1;
    }

    if (isNegative) {
      words.unshift("negative");
    }

    return words.join(" ").trim();
  };

  useEffect(() => {
    const num = parseFloat(numberInput);
    if (!isNaN(num)) {
      setWordsOutput(numberToWords(num));
    } else if (numberInput === '') {
      setWordsOutput('');
    } else {
      setWordsOutput('Invalid number input');
    }
  }, [numberInput]);

  const faqs: FAQItem[] = [
    {
      question: "What is a Number to Words Converter?",
      answer: "A Number to Words Converter is a tool that transforms numerical digits into their corresponding English word representations. For example, the number '123' would be converted to 'one hundred twenty-three'."
    },
    {
      question: "How does this converter handle large numbers?",
      answer: "This converter is designed to handle large numbers, including thousands, millions, billions, and even trillions. It breaks down the number into chunks of three digits and converts each chunk, then combines them with the appropriate magnitude (e.g., thousand, million)."
    },
    {
      question: "Can this tool convert decimal numbers?",
      answer: "Currently, this tool primarily focuses on converting whole numbers (integers) to words. While it can parse a number with a decimal point, it will only convert the integer part. Future updates may include full decimal conversion."
    },
    {
      question: "What happens if I enter a negative number?",
      answer: "If you enter a negative number, the converter will prepend 'negative' to the word representation of the absolute value of the number. For instance, '-5' would become 'negative five'."
    },
    {
      question: "Are there any limitations to the numbers it can convert?",
      answer: "The primary limitation is the maximum number that can be safely represented and processed by JavaScript's number type, which is typically up to 2^53 - 1. Beyond this, precision issues might occur. Very large numbers might also result in extremely long word strings."
    }
  ];

  const relatedTools: RelatedTool[] = [
    { title: "Word Counter", slug: "word-counter", emoji: "📝" },
    { title: "Case Converter", slug: "case-converter", emoji: "🔡" },
    { title: "Text Repeater", slug: "text-repeater", emoji: "🔁" }
  ];

  return (
    <div className="tool-widget-content">
      <div className="p-4">
        <div className="mb-4">
          <label htmlFor="numberInput" className="block text-sm font-medium text-gray-700">Enter Number:</label>
          <input
            type="number"
            id="numberInput"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"
            value={numberInput}
            onChange={(e) => setNumberInput(e.target.value)}
            placeholder="e.g., 12345"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="wordsOutput" className="block text-sm font-medium text-gray-700">Words:</label>
          <textarea
            id="wordsOutput"
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"
            value={wordsOutput}
            readOnly
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default NumberToWordsConverter;