import React, { useState } from 'react';
import type { FAQItem } from '../../hooks/useSEO'
import type { RelatedTool } from '../../lib/types';

const BinaryToDecimalConverter: React.FC = () => {
  const [binaryInput, setBinaryInput] = useState<string>('');
  const [decimalInput, setDecimalInput] = useState<string>('');
  const [binaryError, setBinaryError] = useState<string>('');
  const [decimalError, setDecimalError] = useState<string>('');

  const handleBinaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBinaryInput(value);
    if (value === '') {
      setDecimalInput('');
      setBinaryError('');
      return;
    }
    if (!/^[01]+$/.test(value)) {
      setBinaryError('Invalid binary number. Please use only 0s and 1s.');
      setDecimalInput('');
      return;
    }
    setBinaryError('');
    try {
      const decimal = parseInt(value, 2);
      setDecimalInput(decimal.toString());
    } catch (error) {
      setBinaryError('Error converting binary to decimal.');
      setDecimalInput('');
    }
  };

  const handleDecimalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDecimalInput(value);
    if (value === '') {
      setBinaryInput('');
      setDecimalError('');
      return;
    }
    if (!/^\d+$/.test(value)) {
      setDecimalError('Invalid decimal number. Please use only digits.');
      setBinaryInput('');
      return;
    }
    const num = parseInt(value, 10);
    if (isNaN(num) || num < 0) {
      setDecimalError('Invalid decimal number. Please enter a non-negative integer.');
      setBinaryInput('');
      return;
    }
    setDecimalError('');
    try {
      const binary = (num >>> 0).toString(2);
      setBinaryInput(binary);
    } catch (error) {
      setDecimalError('Error converting decimal to binary.');
      setBinaryInput('');
    }
  };

  const faqs: FAQItem[] = [
    {
      question: 'What is a binary number?',
      answer: 'A binary number is a number expressed in the base-2 numeral system, which uses only two symbols: 0 (zero) and 1 (one). This system is the fundamental language of computers and digital electronics, where 0 represents an \'off\' state and 1 represents an \'on\' state.'
    },
    {
      question: 'What is a decimal number?',
      answer: 'A decimal number is a number expressed in the base-10 numeral system, which uses ten distinct symbols (0, 1, 2, 3, 4, 5, 6, 7, 8, 9). This is the most common number system used by humans in everyday life.'
    },
    {
      question: 'How do you convert binary to decimal?',
      answer: 'To convert a binary number to decimal, you multiply each digit of the binary number by 2 raised to the power of its position, starting from the rightmost digit at position 0. Then, you sum up all the results. For example, 1011 in binary is (1 * 2^3) + (0 * 2^2) + (1 * 2^1) + (1 * 2^0) = 8 + 0 + 2 + 1 = 11 in decimal.'
    },
    {
      question: 'How do you convert decimal to binary?',
      answer: 'To convert a decimal number to binary, you repeatedly divide the decimal number by 2 and record the remainder. You continue this process until the quotient becomes 0. The binary equivalent is then formed by reading the remainders from bottom to top. For example, converting 11 to binary: 11 / 2 = 5 R 1, 5 / 2 = 2 R 1, 2 / 2 = 1 R 0, 1 / 2 = 0 R 1. Reading remainders from bottom to top gives 1011.'
    },
    {
      question: 'Why are binary numbers important in computing?',
      answer: 'Binary numbers are crucial in computing because digital circuits operate using two voltage levels, which can be represented as 0 and 1. This simplicity makes them ideal for storing and processing information in computers, as it allows for clear distinctions between states and robust error detection.'
    }
  ];

  const relatedTools: RelatedTool[] = [
    { title: 'Text to Binary', slug: '/text-to-binary', emoji: '📝' },
    { title: 'Hex to RGB', slug: '/hex-to-rgb', emoji: '🎨' },
    { title: 'Roman Numeral Converter', slug: '/roman-numeral-converter', emoji: '🏛️' },
  ];

  return (
    <div className="tool-widget-content">
      <div className="p-4 space-y-6">
        <div className="flex flex-col">
          <label htmlFor="binary-input" className="text-lg font-medium text-gray-700 mb-2">Binary Input:</label>
          <input
            id="binary-input"
            type="text"
            className={`w-full p-3 border rounded-md shadow-sm focus:ring-green-700 focus:border-green-700 ${binaryError ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter binary number (e.g., 1011)"
            value={binaryInput}
            onChange={handleBinaryChange}
          />
          {binaryError && <p className="text-red-500 text-sm mt-1">{binaryError}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="decimal-input" className="text-lg font-medium text-gray-700 mb-2">Decimal Input:</label>
          <input
            id="decimal-input"
            type="text"
            className={`w-full p-3 border rounded-md shadow-sm focus:ring-green-700 focus:border-green-700 ${decimalError ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter decimal number (e.g., 11)"
            value={decimalInput}
            onChange={handleDecimalChange}
          />
          {decimalError && <p className="text-red-500 text-sm mt-1">{decimalError}</p>}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => { setBinaryInput(''); setDecimalInput(''); setBinaryError(''); setDecimalError(''); }}
            className="px-6 py-3 bg-yellow-300 text-gray-800 font-semibold rounded-md shadow-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default BinaryToDecimalConverter;