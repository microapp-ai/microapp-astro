import React, { useState, useEffect } from "react";
import type { FAQItem } from "../../hooks/useSEO"
import type { RelatedTool } from "../../lib/types";

const ReadingTimeCalculator: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [readingTime, setReadingTime] = useState<string>("0 minutes, 0 seconds");

  const WORDS_PER_MINUTE = 200; // Average reading speed

  useEffect(() => {
    const calculateReadingTime = () => {
      if (!text) {
        setReadingTime("0 minutes, 0 seconds");
        return;
      }

      // Split text by spaces and filter out empty strings to get word count
      const words = text.trim().split(/\s+/).filter(word => word.length > 0);
      const wordCount = words.length;

      const totalMinutes = wordCount / WORDS_PER_MINUTE;
      const minutes = Math.floor(totalMinutes);
      const seconds = Math.round((totalMinutes - minutes) * 60);

      setReadingTime(`${minutes} minutes, ${seconds} seconds`);
    };

    calculateReadingTime();
  }, [text]);

  const faqs: FAQItem[] = [
    {
      question: "How is reading time calculated?",
      answer:
        "Reading time is calculated by dividing the total number of words in a text by an average reading speed. Our calculator uses an average of 200 words per minute.",
    },
    {
      question: "What is the average reading speed?",
      answer:
        "The average reading speed for most adults is around 200 to 250 words per minute. This can vary based on the complexity of the text and the reader's proficiency.",
    },
    {
      question: "Does punctuation affect word count?",
      answer:
        "No, punctuation typically does not affect the word count in our calculator. We focus on counting actual words, ignoring punctuation marks and extra spaces.",
    },
    {
      question: "Can I use this for any language?",
      answer:
        "While the calculator will count words in any language, the accuracy of the reading time estimate depends on the average reading speed for that specific language. The default 200 WPM is based on English.",
    },
    {
      question: "Why is knowing reading time useful?",
      answer:
        "Knowing the reading time can help content creators optimize their articles, bloggers set expectations for their readers, and students manage their study time more effectively.",
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: "Word Counter", slug: "word-counter", emoji: "📝" },
    { title: "Character Counter", slug: "character-counter", emoji: "🔠" },
    { title: "Summarizer", slug: "summarizer", emoji: "📄" },
  ];

  return (
    <div className="tool-widget-content">
      <div className="flex flex-col items-center justify-center p-4">
        <textarea
          className="w-full p-4 text-lg border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-700 resize-y min-h-[200px]"
          placeholder="Paste your text here to calculate reading time..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div className="mt-6 text-2xl font-semibold text-green-700">
          Estimated Reading Time: <span className="text-yellow-300">{readingTime}</span>
        </div>
      </div>
    </div>
  );
};

export default ReadingTimeCalculator;