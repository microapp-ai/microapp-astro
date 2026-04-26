import React, { useState } from "react";
import type { FAQItem } from "../../hooks/useSEO"
import type { RelatedTool } from "../../lib/types";

const PalindromeChecker: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [isPalindrome, setIsPalindrome] = useState<boolean | null>(null);

  const checkPalindrome = () => {
    if (!inputText.trim()) {
      setIsPalindrome(null);
      return;
    }
    const cleanedText = inputText.toLowerCase().replace(/[^a-z0-9]/g, "");
    const reversedText = cleanedText.split("").reverse().join("");
    setIsPalindrome(cleanedText === reversedText);
  };

  const faqs: FAQItem[] = [
    {
      question: "What is a palindrome?",
      answer:
        "A palindrome is a word, phrase, number, or other sequence of characters which reads the same backward as forward. Punctuation, capitalization, and spacing are usually ignored when determining if something is a palindrome.",
    },
    {
      question: "How does this Palindrome Checker work?",
      answer:
        "Our tool takes your input text, converts it to lowercase, and removes all non-alphanumeric characters (like spaces, punctuation, and symbols). Then, it compares the cleaned text with its reversed version. If they are identical, the input is a palindrome!",
    },
    {
      question: "Are numbers considered palindromes?",
      answer:
        "Yes, numbers can also be palindromes. For example, 121, 1331, and 9009 are all numerical palindromes. Our tool handles numbers within phrases correctly.",
    },
    {
      question: "Does capitalization matter for palindromes?",
      answer:
        "No, capitalization does not matter. Our Palindrome Checker converts all input text to lowercase before performing the check to ensure that \"Racecar\" and \"racecar\" are both correctly identified as palindromes.",
    },
    {
      question: "Can phrases with spaces and punctuation be palindromes?",
      answer:
        "Absolutely! Phrases like \"A man, a plan, a canal: Panama\" are classic examples of palindromes. Our tool automatically ignores spaces, punctuation, and other special characters to focus solely on the alphanumeric sequence.",
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: "Word Counter", slug: "word-counter", emoji: "📝" },
    { title: "Case Converter", slug: "case-converter", emoji: "🔡" },
    { title: "Text Repeater", slug: "text-repeater", emoji: "🔁" },
  ];

  return (
    <div className="tool-widget-content">
      <div className="p-4">
        <textarea
          className="w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
          rows={5}
          placeholder="Enter a word or phrase..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>
        <button
          className="mt-4 w-full bg-green-700 text-white py-3 rounded-md text-lg font-semibold hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 transition-colors"
          onClick={checkPalindrome}
        >
          Check Palindrome
        </button>

        {isPalindrome !== null && (
          <div
            className={`mt-6 p-4 rounded-md text-center text-xl font-bold ${isPalindrome
              ? "bg-yellow-300 text-green-900"
              : "bg-red-300 text-red-900"
              }`}
          >
            {isPalindrome ? "Yes, it's a palindrome!" : "No, it's not a palindrome."}
          </div>
        )}
      </div>
    </div>
  );
};

export default PalindromeChecker;