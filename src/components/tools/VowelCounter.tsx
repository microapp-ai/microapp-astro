import type { FAQItem } from "../../hooks/useSEO"
import type { RelatedTool } from "../../lib/types";
import React, { useState } from "react";

const VowelCounter: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [vowelCount, setVowelCount] = useState<number>(0);
  const [consonantCount, setConsonantCount] = useState<number>(0);
  const [totalLetters, setTotalLetters] = useState<number>(0);

  const countVowelsAndConsonants = (text: string) => {
    const lowerText = text.toLowerCase();
    let vowels = 0;
    let consonants = 0;

    for (let i = 0; i < lowerText.length; i++) {
      const char = lowerText[i];
      if (char >= "a" && char <= "z") {
        if ("aeiou".includes(char)) {
          vowels++;
        } else {
          consonants++;
        }
      }
    }
    setVowelCount(vowels);
    setConsonantCount(consonants);
    setTotalLetters(vowels + consonants);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    setInputText(text);
    countVowelsAndConsonants(text);
  };

  const faqs: FAQItem[] = [
    {
      question: "What is a Vowel Counter?",
      answer:
        "A Vowel Counter is an online tool designed to quickly analyze any given text and determine the total number of vowels (a, e, i, o, u) and consonants present. It helps users get a statistical breakdown of their text content.",
    },
    {
      question: "How does the Vowel Counter work?",
      answer:
        "Simply type or paste your text into the input area. As you type, the tool automatically processes the text, identifies each character as either a vowel or a consonant (ignoring numbers, symbols, and spaces), and displays the real-time counts.",
    },
    {
      question: "Which letters are considered vowels by this tool?",
      answer:
        "This tool counts the standard English vowels: A, E, I, O, U. It performs a case-insensitive count, meaning both uppercase (A, E, I, O, U) and lowercase (a, e, i, o, u) instances of these letters are included in the vowel count.",
    },
    {
      question: "Does the Vowel Counter distinguish between uppercase and lowercase letters?",
      answer:
        "No, the Vowel Counter treats both uppercase and lowercase letters equally. For example, 'A' and 'a' are both counted as one vowel. The same applies to consonants.",
    },
    {
      question: "What are the benefits of using a Vowel Counter?",
      answer:
        "Using a vowel counter can be beneficial for various purposes, including linguistic analysis, educational exercises, or even for writers looking to analyze the phonetic structure of their prose. It provides quick insights into text composition.",
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: "Word Counter", slug: "word-counter", emoji: "📝" },
    { title: "Character Counter", slug: "character-counter", emoji: "🔠" },
    { title: "Sentence Counter", slug: "sentence-counter", emoji: "✍️" },
  ];

  return (
    <div className="tool-widget-content">
      <div className="p-4">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 mb-4 bg-white text-gray-900"
          rows={10}
          placeholder="Enter your text here..."
          value={inputText}
          onChange={handleInputChange}
        ></textarea>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-gray-100 p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">Total Letters</h3>
            <p className="text-3xl font-bold text-green-700">{totalLetters}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">Vowels</h3>
            <p className="text-3xl font-bold text-yellow-300">{vowelCount}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">Consonants</h3>
            <p className="text-3xl font-bold text-green-700">{consonantCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VowelCounter;