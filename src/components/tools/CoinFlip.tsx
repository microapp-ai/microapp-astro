import React, { useState } from 'react';
import type { FAQItem } from '../../hooks/useSEO'
import type { RelatedTool } from '../../lib/types';

const CoinFlip: React.FC = () => {
  const [result, setResult] = useState<'Heads' | 'Tails' | null>(null);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);

  const flipCoin = () => {
    setIsFlipping(true);
    setResult(null);

    setTimeout(() => {
      const newResult = Math.random() < 0.5 ? 'Heads' : 'Tails';
      setResult(newResult);
      setIsFlipping(false);
    }, 1500); // Simulate flip duration
  };

  const faqs: FAQItem[] = [
    {
      question: 'How does the Coin Flip Simulator work?',
      answer: 'The Coin Flip Simulator uses a random number generator to determine the outcome. When you click the "Flip Coin" button, the simulator generates a random number between 0 and 1. If the number is less than 0.5, it\'s considered "Heads"; otherwise, it\'s "Tails". This process mimics the 50/50 probability of a real coin flip.',
    },
    {
      question: 'Is the coin flip truly random?',
      answer: 'While computers cannot generate truly random numbers (they are pseudo-random), the algorithm used in this simulator provides a sufficiently random distribution for practical purposes. The outcomes are unpredictable and follow a nearly even distribution over a large number of flips.',
    },
    {
      question: 'Can I customize the coin or its appearance?',
      answer: 'This particular simulator is designed for simplicity and does not offer customization options for the coin\'s appearance or type. Its primary function is to provide a quick and unbiased heads or tails decision.',
    },
    {
      question: 'What are the odds of getting heads or tails?',
      answer: 'Just like a physical coin, the probability of landing on Heads is 50%, and the probability of landing on Tails is 50%. Each flip is an independent event, meaning the outcome of previous flips does not influence the outcome of the next flip.',
    },
    {
      question: 'Are there any real-world applications for a coin flip simulator?',
      answer: 'Beyond simple decision-making, coin flip simulators can be useful in various scenarios, such as settling minor disputes, making quick choices when options are equally appealing, or even in educational settings to demonstrate probability concepts without needing a physical coin.',
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: 'Dice Roller', slug: '/dice-roller', emoji: '🎲' },
    { title: 'Random Number Generator', slug: '/random-number-generator', emoji: '🔢' },
    { title: 'Random Name Picker', slug: '/random-name-picker', emoji: '👤' },
  ];

  return (
    <div className="tool-widget-content">
      <div className="flex flex-col items-center justify-center p-4">
        <div
          className={`relative w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold text-gray-800 shadow-lg transition-transform duration-300 ease-in-out
            ${isFlipping ? 'animate-spin-fast' : ''}
            ${result === 'Heads' ? 'bg-yellow-300' : result === 'Tails' ? 'bg-green-700 text-white' : ''}
          `}
        >
          {isFlipping ? (
            <span className="text-gray-600">?</span>
          ) : (
            result || <span className="text-gray-600">Flip Me!</span>
          )}
        </div>

        <button
          onClick={flipCoin}
          disabled={isFlipping}
          className={`mt-8 px-8 py-3 rounded-lg text-white font-semibold text-lg transition-all duration-200
            ${isFlipping ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'}
          `}
        >
          {isFlipping ? 'Flipping...' : 'Flip Coin'}
        </button>

        {result && !isFlipping && (
          <p className="mt-6 text-2xl font-semibold text-gray-800">
            Result: <span className={`${result === 'Heads' ? 'text-yellow-600' : 'text-green-800'}`}>{result}</span>
          </p>
        )}
      </div>

      {/* Tailwind CSS animation for fast spin */}
      <style>{`
        @keyframes spin-fast {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-fast {
          animation: spin-fast 0.5s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CoinFlip;