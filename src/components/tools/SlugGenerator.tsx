import React, { useState, useCallback } from 'react';
import type { FAQItem } from '../../hooks/useSEO'
import type { RelatedTool } from '../../lib/types';

const SlugGenerator: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [generatedSlug, setGeneratedSlug] = useState<string>('');

  const generateSlug = useCallback(() => {
    if (!inputText) {
      setGeneratedSlug('');
      return;
    }

    const slug = inputText
      .toLowerCase() // Convert to lowercase
      .trim() // Trim leading/trailing whitespace
      .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

    setGeneratedSlug(slug);
  }, [inputText]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  const handleCopyClick = () => {
    if (generatedSlug) {
      navigator.clipboard.writeText(generatedSlug);
      // Optionally, add a visual feedback for copying
    }
  };

  const faqs: FAQItem[] = [
    {
      question: 'What is a URL slug?',
      answer: 'A URL slug is the part of a URL that identifies a particular page on a website in a human-readable form. It\'s typically the last part of the URL after the domain name and any subdirectories, and it describes the content of the page using keywords separated by hyphens. For example, in `www.example.com/blog/what-is-a-slug`, `what-is-a-slug` is the slug.',
    },
    {
      question: 'Why are slugs important for SEO?',
      answer: 'Slugs are crucial for Search Engine Optimization (SEO) because they provide search engines and users with a clear indication of a page\'s content. Well-crafted slugs, containing relevant keywords, can improve search engine rankings, increase click-through rates, and enhance user experience by making URLs more understandable and memorable.',
    },
    {
      question: 'How does this slug generator work?',
      answer: 'Our slug generator takes any text input and transforms it into a clean, URL-friendly slug. It automatically converts text to lowercase, replaces spaces and special characters with hyphens, removes redundant hyphens, and trims leading/trailing hyphens to ensure the output is optimized for web use.',
    },
    {
      question: 'What are the best practices for creating effective slugs?',
      answer: 'Effective slugs should be concise, descriptive, and include relevant keywords. Avoid using stop words (like \'a\', \'the\', \'is\') unless absolutely necessary for clarity. Keep them short to improve readability and shareability, and always use hyphens to separate words, not underscores or spaces.',
    },
    {
      question: 'Can I customize the generated slug?',
      answer: 'While the generator provides an automated, optimized slug, you can always manually edit the generated output if you need to make specific adjustments. Simply copy the generated slug and paste it into your desired field, then make any further modifications before use.',
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: 'Case Converter', slug: '/case-converter', emoji: '🔠' },
    { title: 'URL Encoder/Decoder', slug: '/url-encoder-decoder', emoji: '🔗' },
    { title: 'Text to Binary', slug: '/text-to-binary', emoji: '🔢' },
  ];

  return (
    <div className="tool-widget-content">
      <div className="flex flex-col space-y-4">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-700 focus:border-green-700 transition-all duration-200"
          rows={6}
          placeholder="Enter text here to generate a slug..."
          value={inputText}
          onChange={handleInputChange}
        ></textarea>
        <button
          onClick={generateSlug}
          className="w-full px-4 py-2 bg-green-700 text-white font-semibold rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 transition-all duration-200"
        >
          Generate Slug
        </button>
        {generatedSlug && (
          <div className="flex flex-col space-y-2">
            <label htmlFor="generated-slug" className="text-sm font-medium text-gray-700">Generated Slug:</label>
            <div className="flex items-center space-x-2">
              <input
                id="generated-slug"
                type="text"
                readOnly
                className="flex-grow p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-800"
                value={generatedSlug}
              />
              <button
                onClick={handleCopyClick}
                className="px-4 py-2 bg-yellow-300 text-gray-900 font-semibold rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 transition-all duration-200"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlugGenerator;