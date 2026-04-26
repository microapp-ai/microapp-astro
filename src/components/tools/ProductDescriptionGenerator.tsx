import type { FAQItem } from '../../hooks/useSEO'
import type { RelatedTool } from '../../lib/types';
import React, { useState } from 'react';

const ProductDescriptionGenerator: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [features, setFeatures] = useState('');
  const [tone, setTone] = useState('professional');
  const [keywords, setKeywords] = useState('');
  const [generatedDescription, setGeneratedDescription] = useState('');

  const generateDescription = () => {
    let description = '';
    const featureList = features.split(/\n|,/).filter(f => f.trim() !== '');
    const keywordList = keywords.split(/\n|,/).filter(k => k.trim() !== '');

    let opening = '';
    let closing = '';

    switch (tone) {
      case 'professional':
        opening = `Elevate your experience with the new ${productName}. Designed for peak performance and reliability, this product seamlessly integrates into your workflow.`;
        closing = `Discover the difference quality engineering makes.`;
        break;
      case 'casual':
        opening = `Check out the awesome new ${productName}! It's super easy to use and will make your life so much better.`;
        closing = `What are you waiting for? Grab yours today!`;
        break;
      case 'enthusiastic':
        opening = `Get ready to be amazed by the incredible ${productName}! Experience unparalleled innovation and excitement with every use.`;
        closing = `Don't miss out on this game-changing product!`;
        break;
      case 'luxury':
        opening = `Indulge in the exquisite craftsmanship of the ${productName}. A testament to refined taste and superior design, it redefines elegance.`;
        closing = `Experience true sophistication.`;
        break;
      default:
        opening = `Introducing the ${productName}.`;
        closing = `Learn more today.`;
    }

    description += opening;

    if (featureList.length > 0) {
      description += `\n\nKey Features:\n`;
      featureList.forEach(feature => {
        description += `- ${feature.trim()}\n`;
      });
    }

    if (keywordList.length > 0) {
      description += `\nPerfect for those seeking ${keywordList.join(', ')}.`;
    }

    description += `\n\n${closing}`;

    setGeneratedDescription(description.trim());
  };

  const faqs: FAQItem[] = [
    {
      question: 'What is a product description generator?',
      answer:
        'A product description generator is an online tool that helps e-commerce businesses and marketers create compelling and informative descriptions for their products. By inputting key details like product name, features, and desired tone, the tool automatically generates text designed to attract customers and drive sales.',
    },
    {
      question: 'How can I write an effective product description?',
      answer:
        'To write an effective product description, focus on your target audience, highlight benefits over features, use sensory words, tell a story, and optimize for search engines. Keep it concise, engaging, and persuasive, encouraging potential buyers to make a purchase.',
    },
    {
      question: 'What information should I include in my product description?',
      answer:
        'A good product description should include the product name, its main features and benefits, how it solves a problem or improves the customer\'s life, and any unique selling propositions. Consider adding details about materials, dimensions, and care instructions if relevant.',
    },
    {
      question: 'Can this tool help with SEO for my product listings?',
      answer:
        'Yes, by allowing you to incorporate relevant keywords into your product descriptions, this generator can assist with SEO. Well-optimized descriptions help your products rank higher in search engine results, making them more discoverable to potential customers.',
    },
    {
      question: 'How often should I update my product descriptions?',
      answer:
        'It\'s a good practice to review and update your product descriptions periodically, especially when new features are added, product specifications change, or market trends shift. Regularly refreshing your descriptions can keep your listings relevant and engaging.',
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: 'AI Bio Generator', slug: '/ai-bio-generator', emoji: '✍️' },
    { title: 'Email Subject Line Generator', slug: '/email-subject-line-generator', emoji: '📧' },
    { title: 'Caption Generator', slug: '/caption-generator', emoji: '📝' },
  ];

  return (
    <div className="tool-widget-content">
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            id="productName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700 sm:text-sm p-2"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="e.g., Smartwatch Pro, Organic Coffee Beans"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="features" className="block text-sm font-medium text-gray-700">Key Features & Benefits (comma or new line separated)</label>
          <textarea
            id="features"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700 sm:text-sm p-2"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            placeholder="e.g., Long battery life, Waterproof, Heart rate monitor, Rich aroma, Sustainable sourcing"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">Keywords (comma or new line separated)</label>
          <input
            type="text"
            id="keywords"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700 sm:text-sm p-2"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g., fitness, health, productivity, gourmet, ethical"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="tone" className="block text-sm font-medium text-gray-700">Tone</label>
          <select
            id="tone"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700 sm:text-sm p-2"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="enthusiastic">Enthusiastic</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>

        <button
          onClick={generateDescription}
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Generate Description
        </button>

        {generatedDescription && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Generated Product Description:</h3>
            <p className="text-gray-800 whitespace-pre-wrap">{generatedDescription}</p>
            <button
              onClick={() => navigator.clipboard.writeText(generatedDescription)}
              className="mt-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-gray-700 bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescriptionGenerator;