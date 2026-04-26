import React, { useState } from 'react';
import type { FAQItem } from '../../hooks/useSEO'
import type { RelatedTool } from '../../lib/types';

const AiBioGenerator: React.FC = () => {
  const [role, setRole] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState('professional');
  const [bio, setBio] = useState('');

  const generateBio = () => {
    let generatedBio = `As a ${role}, I specialize in ${keywords}. My approach is ${tone}.`;
    if (role && keywords && tone) {
      generatedBio = `As a highly skilled and dedicated ${role}, I bring expertise in ${keywords}. My work is characterized by a ${tone} approach, ensuring impactful and effective outcomes.`;
    } else if (role && keywords) {
      generatedBio = `Experienced ${role} with a strong background in ${keywords}.`;
    } else if (role) {
      generatedBio = `A dedicated ${role}.`;
    } else {
      generatedBio = 'Please provide some details to generate your bio.';
    }
    setBio(generatedBio);
  };

  const faqs: FAQItem[] = [
    {
      question: 'What is an AI Bio Generator?',
      answer: 'An AI Bio Generator is a tool that uses artificial intelligence to help you create professional and engaging biographical descriptions for various platforms like LinkedIn, Twitter, or personal websites. It takes your input, such as your role, keywords, and desired tone, and crafts a suitable bio.'
    },
    {
      question: 'How can I make my AI-generated bio more effective?',
      answer: 'To make your bio more effective, provide specific and impactful keywords related to your skills and achievements. Choose a tone that aligns with your personal brand and the platform you\'re using. Always review and refine the generated bio to ensure it accurately reflects your unique professional identity.'
    },
    {
      question: 'Is the AI Bio Generator suitable for all social media platforms?',
      answer: 'Yes, the AI Bio Generator can be adapted for various platforms. For LinkedIn, aim for a professional and detailed summary. For Twitter, keep it concise and engaging. For personal websites, you can be more expansive and showcase your personality. Always tailor the generated content to the platform\'s specific requirements and character limits.'
    },
    {
      question: 'Can I customize the tone of my bio?',
      answer: 'Absolutely! This AI Bio Generator allows you to select a desired tone, such as professional, friendly, or creative. Choosing the right tone helps ensure your bio resonates with your target audience and accurately represents your personal brand.'
    },
    {
      question: 'What kind of information should I provide to the generator?',
      answer: 'To get the best results, provide your current or desired professional role, key skills or areas of expertise, notable achievements, and any specific keywords you want to include. The more relevant details you provide, the more tailored and effective your generated bio will be.'
    }
  ];

  const relatedTools: RelatedTool[] = [
    { title: 'Paraphrasing Tool', slug: '/paraphrasing-tool', emoji: '✍️' },
    { title: 'Summarizer', slug: '/summarizer', emoji: '📝' },
    { title: 'Text to Bullet Points', slug: '/text-to-bullet-points', emoji: '📋' },
  ];

  return (
    <div className="tool-widget-content">
      <div className="flex flex-col space-y-4">
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Your Role/Title</label>
          <input
            type="text"
            id="role"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g., Software Engineer, Marketing Manager"
          />
        </div>
        <div>
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">Keywords/Expertise (comma-separated)</label>
          <input
            type="text"
            id="keywords"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g., React, Node.js, Cloud Computing"
          />
        </div>
        <div>
          <label htmlFor="tone" className="block text-sm font-medium text-gray-700">Tone</label>
          <select
            id="tone"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="professional">Professional</option>
            <option value="friendly">Friendly</option>
            <option value="creative">Creative</option>
            <option value="concise">Concise</option>
          </select>
        </div>
        <button
          onClick={generateBio}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Generate Bio
        </button>
        {bio && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded-md">
            <h3 className="text-lg font-medium text-yellow-800">Your Generated Bio:</h3>
            <p className="mt-2 text-yellow-700 whitespace-pre-wrap">{bio}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiBioGenerator;