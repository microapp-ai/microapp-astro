import React, { useState } from 'react';
import type { FAQItem } from '../../hooks/useSEO'
import type { RelatedTool } from '../../lib/types';

const HashtagGenerator: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [generatedHashtags, setGeneratedHashtags] = useState<string>('');

  const generateHashtags = () => {
    if (!inputText.trim()) {
      setGeneratedHashtags('Please enter some text to generate hashtags.');
      return;
    }

    const words = inputText
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(word => word.length > 2 && !['the', 'a', 'an', 'is', 'are', 'and', 'or', 'for', 'with', 'in', 'on', 'at', 'to', 'of', 'it', 'by', 'from', 'as', 'but', 'not', 'we', 'you', 'he', 'she', 'they', 'i', 'me', 'him', 'her', 'us', 'them'].includes(word));

    const uniqueWords = Array.from(new Set(words));

    let hashtags = uniqueWords.map(word => `#${word}`).join(' ');

    if (hashtags.length === 0) {
      hashtags = 'No relevant keywords found to generate hashtags. Try different text.';
    }

    setGeneratedHashtags(hashtags);
  };

  const faqs: FAQItem[] = [
    {
      question: 'What is a hashtag generator?',
      answer: 'A hashtag generator is a tool that helps you find relevant hashtags for your social media posts. By analyzing your input text, it suggests popular and niche hashtags to increase your content\'s visibility and reach on platforms like Instagram, TikTok, and Twitter.',
    },
    {
      question: 'How do I use the Hashtag Generator?',
      answer: 'Simply type or paste your text (e.g., a caption, a product description, or a topic) into the input box and click the \'Generate Hashtags\' button. The tool will then process your text and provide a list of suggested hashtags.',
    },
    {
      question: 'Why are hashtags important for social media?',
      answer: 'Hashtags act as keywords that categorize your content, making it discoverable to users interested in specific topics. Using relevant hashtags can significantly boost your post\'s visibility, attract new followers, and drive engagement.',
    },
    {
      question: 'Can I use these hashtags on all social media platforms?',
      answer: 'While hashtags are widely used across platforms like Instagram, TikTok, and Twitter, their effectiveness and optimal usage can vary. Always consider the best practices for each platform. This tool provides general suggestions that are broadly applicable.',
    },
    {
      question: 'How can I get the best results from this generator?',
      answer: 'For the most accurate and relevant hashtags, provide clear and descriptive text. Include key terms and concepts related to your content. The more context you give, the better the suggestions will be.',
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: 'Caption Generator', slug: '/caption-generator', emoji: '✍️' },
    { title: 'AI Bio Generator', slug: '/ai-bio-generator', emoji: '🤖' },
    { title: 'Paraphrasing Tool', slug: '/paraphrasing-tool', emoji: '📝' },
  ];

  return (
    <div className="tool-widget-content">
      <div className="p-4 md:p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="inputText" className="block text-gray-700 text-sm font-bold mb-2">
            Enter your text or topic:
          </label>
          <textarea
            id="inputText"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            placeholder="e.g., 'A beautiful sunset over the mountains, perfect for a relaxing evening.'"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-6">
          <button
            onClick={generateHashtags}
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
          >
            Generate Hashtags
          </button>
        </div>
        <div>
          <label htmlFor="generatedHashtags" className="block text-gray-700 text-sm font-bold mb-2">
            Generated Hashtags:
          </label>
          <textarea
            id="generatedHashtags"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:shadow-outline h-32"
            readOnly
            value={generatedHashtags}
            placeholder="Your generated hashtags will appear here."
          ></textarea>
          {generatedHashtags && generatedHashtags !== 'Please enter some text to generate hashtags.' && generatedHashtags !== 'No relevant keywords found to generate hashtags. Try different text.' && (
            <button
              onClick={() => navigator.clipboard.writeText(generatedHashtags)}
              className="mt-2 bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            >
              Copy Hashtags
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HashtagGenerator;