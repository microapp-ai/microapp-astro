import React, { useState } from "react";
import type { FAQItem } from "../../hooks/useSEO"
import type { RelatedTool } from "../../lib/types";

const RandomNamePicker: React.FC = () => {
  const [namesInput, setNamesInput] = useState<string>("");
  const [pickedName, setPickedName] = useState<string | null>(null);

  const handlePickName = () => {
    const nameList = namesInput
      .split(/\n/)
      .map((name) => name.trim())
      .filter((name) => name !== "");

    if (nameList.length > 0) {
      const randomIndex = Math.floor(Math.random() * nameList.length);
      setPickedName(nameList[randomIndex]);
    } else {
      setPickedName(null);
    }
  };

  const faqs: FAQItem[] = [
    {
      question: "What is a Random Name Picker?",
      answer:
        "A Random Name Picker is an online tool that helps you select one or more names randomly from a list you provide. It\'s useful for raffles, giveaways, team selections, or making unbiased decisions.",
    },
    {
      question: "How do I use the Random Name Picker?",
      answer:
        "Simply enter the names you want to choose from into the input box, one name per line. Then, click the \"Pick a Name\" button, and the tool will randomly select and display one name from your list.",
    },
    {
      question: "Can I pick multiple names?",
      answer:
        "While this basic version picks one name at a time, advanced random name pickers often allow you to specify how many names you want to pick and whether to allow duplicates or remove names after selection.",
    },
    {
      question: "Is the name selection truly random?",
      answer:
        "Yes, the tool uses a client-side JavaScript random number generator to ensure that each name in your list has an equal chance of being selected. The randomness is based on cryptographic pseudo-random number generation provided by the browser.",
    },
    {
      question: "What are some common uses for a Random Name Picker?",
      answer:
        "It\'s great for drawing winners in contests, selecting volunteers, deciding who goes first in a game, assigning tasks, or simply when you can\'t make up your mind and need an unbiased choice.",
    },
  ];

  const relatedTools: RelatedTool[] = [
    {
      title: "Random Number Generator",
      slug: "random-number-generator",
      emoji: "🔢",
    },
    {
      title: "Coin Flip",
      slug: "coin-flip",
      emoji: "🪙",
    },
    {
      title: "Dice Roller",
      slug: "dice-roller",
      emoji: "🎲",
    },
  ];

  return (
    <div className="tool-widget-content">
      <div className="flex flex-col items-center justify-center p-4">
        <textarea
          className="w-full max-w-md p-3 mb-4 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
          rows={10}
          placeholder="Enter names, one per line..."
          value={namesInput}
          onChange={(e) => setNamesInput(e.target.value)}
        ></textarea>
        <button
          onClick={handlePickName}
          className="px-6 py-3 mb-6 text-lg font-semibold text-white bg-green-700 rounded-md shadow-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-75 transition-colors duration-200"
        >
          Pick a Name
        </button>

        {pickedName && (
          <div className="w-full max-w-md p-6 bg-yellow-300 text-gray-900 rounded-lg shadow-lg text-center">
            <p className="text-2xl font-bold">🎉 {pickedName} 🎉</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomNamePicker;