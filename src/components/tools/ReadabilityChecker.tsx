import React, { useState, useEffect } from 'react';
import type { FAQItem } from '../../hooks/useSEO'
import type { RelatedTool } from '../../lib/types';

const ReadabilityChecker: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [fleschReadingEase, setFleschReadingEase] = useState<string | null>(null);
  const [fleschKincaidGradeLevel, setFleschKincaidGradeLevel] = useState<string | null>(null);

  const calculateReadability = (text: string) => {
    if (!text.trim()) {
      setFleschReadingEase(null);
      setFleschKincaidGradeLevel(null);
      return;
    }

    const sentences = text.split(/[.!?]+/g).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/g).filter(w => w.trim().length > 0);

    let totalSyllables = 0;

    const countSyllables = (word: string): number => {
      word = word.toLowerCase().replace(/[^a-z]/g, '');
      if (word.length === 0) return 0;

      let count = 0;
      const vowels = 'aeiouy';
      let prevCharWasVowel = false;

      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        const isVowel = vowels.includes(char);

        if (isVowel && !prevCharWasVowel) {
          count++;
        }
        prevCharWasVowel = isVowel;
      }

      // Adjust for silent 'e' at the end of words
      if (word.endsWith('e') && count > 1 && !vowels.includes(word[word.length - 2])) {
        count--;
      }
      // Adjust for common suffixes
      if (word.endsWith('es') || word.endsWith('ed')) {
        count--;
      }

      return Math.max(1, count); // Ensure at least one syllable
    };

    words.forEach(word => {
      totalSyllables += countSyllables(word);
    });

    const numSentences = sentences.length;
    const numWords = words.length;
    const numSyllables = totalSyllables;

    if (numWords === 0 || numSentences === 0) {
      setFleschReadingEase('N/A');
      setFleschKincaidGradeLevel('N/A');
      return;
    }

    // Flesch Reading Ease formula
    const fre = 206.835 - 1.015 * (numWords / numSentences) - 84.6 * (numSyllables / numWords);
    setFleschReadingEase(fre.toFixed(2));

    // Flesch-Kincaid Grade Level formula
    const fkgl = 0.39 * (numWords / numSentences) + 11.8 * (numSyllables / numWords) - 15.59;
    setFleschKincaidGradeLevel(fkgl.toFixed(2));
  };

  useEffect(() => {
    calculateReadability(inputText);
  }, [inputText]);

  const faqs: FAQItem[] = [
    {
      question: 'What is the Flesch-Kincaid Readability Test?',
      answer: 'The Flesch-Kincaid Readability Test is a set of two readability tests: the Flesch Reading Ease and the Flesch-Kincaid Grade Level. These tests assess the approximate difficulty of reading a passage of English prose. They are widely used in education, government, and publishing to ensure content is appropriate for its intended audience.',
    },
    {
      question: 'How is the Flesch-Kincaid score calculated?',
      answer: 'Both scores are calculated based on the average number of words per sentence and the average number of syllables per word. The Flesch Reading Ease score uses the formula: 206.835 - 1.015 * (words/sentences) - 84.6 * (syllables/words). The Flesch-Kincaid Grade Level uses: 0.39 * (words/sentences) + 11.8 * (syllables/words) - 15.59.',
    },
    {
      question: 'What is a good Flesch Reading Ease score?',
      answer: 'A higher Flesch Reading Ease score indicates easier readability. Scores between 90-100 are easily understood by an average 5th grader. Scores between 60-70 are generally considered easily understood by 13-to-15-year-olds, and scores between 0-30 are best understood by university graduates.',
    },
    {
      question: 'What is a good Flesch-Kincaid Grade Level score?',
      answer: 'The Flesch-Kincaid Grade Level score indicates the U.S. grade level required to understand the text. For example, a score of 8.0 means that an eighth grader can understand the document. Most documents aim for a grade level between 7 and 9 to be accessible to a broad audience.',
    },
    {
      question: 'Why is readability important?',
      answer: 'Readability is crucial for effective communication. Clear and concise writing ensures that your message is understood by your target audience, whether it\'s for educational materials, marketing content, technical documentation, or general communication. Improving readability can increase engagement, comprehension, and the overall impact of your writing.',
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: 'Word Counter', slug: '/word-counter', emoji: '📝' },
    { title: 'Sentence Counter', slug: '/sentence-counter', emoji: '📄' },
    { title: 'Summarizer', slug: '/summarizer', emoji: '📚' },
  ];

  return (
    <div className="tool-widget-content">
      <div className="flex flex-col space-y-4">
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-green-700 focus:border-green-700 transition-all duration-200 min-h-[200px]"
          placeholder="Enter your text here to check its readability..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Flesch Reading Ease</h3>
            <p className="text-3xl font-bold text-green-700">{fleschReadingEase || '—'}</p>
            <p className="text-sm text-gray-600 mt-1">
              {fleschReadingEase && fleschReadingEase !== 'N/A' && (
                parseFloat(fleschReadingEase) >= 90 ? 'Very Easy (5th Grade)' :
                parseFloat(fleschReadingEase) >= 80 ? 'Easy (6th Grade)' :
                parseFloat(fleschReadingEase) >= 70 ? 'Fairly Easy (7th Grade)' :
                parseFloat(fleschReadingEase) >= 60 ? 'Standard (8th-9th Grade)' :
                parseFloat(fleschReadingEase) >= 50 ? 'Fairly Difficult (10th-12th Grade)' :
                parseFloat(fleschReadingEase) >= 30 ? 'Difficult (College Graduate)' :
                'Very Difficult (University Graduate)'
              )}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Flesch-Kincaid Grade Level</h3>
            <p className="text-3xl font-bold text-green-700">{fleschKincaidGradeLevel || '—'}</p>
            <p className="text-sm text-gray-600 mt-1">
              {fleschKincaidGradeLevel && fleschKincaidGradeLevel !== 'N/A' && (
                `Requires a ${fleschKincaidGradeLevel}th grade education to understand.`
              )}
            </p>
          </div>
        </div>

        <button
          onClick={() => setInputText('')}
          className="w-full bg-yellow-300 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
        >
          Clear Text
        </button>
      </div>
    </div>
  );
};

export default ReadabilityChecker;