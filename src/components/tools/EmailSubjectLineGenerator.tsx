import React, { useState } from "react";
import type { FAQItem } from "../../hooks/useSEO"
import type { RelatedTool } from "../../lib/types";

const EmailSubjectLineGenerator: React.FC = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [generatedLines, setGeneratedLines] = useState<string[]>([]);

  const generateSubjectLines = () => {
    if (!keyword.trim()) {
      setGeneratedLines(["Please enter a keyword to generate subject lines."]);
      return;
    }

    const lines = [
      `🚀 Boost Your Opens: ${keyword} Inside!`,
      `🔔 New Update: Don\'t Miss Out on ${keyword}!`, 
      `💡 Quick Tip: Master ${keyword} Today`,
      `🔥 Exclusive: Unlock the Power of ${keyword}`,
      `✅ Your Guide to ${keyword} Success`, 
      `🤫 Secret to ${keyword} Revealed!`, 
      `📈 Skyrocket Your ${keyword} Results`, 
      `🎁 Free Gift: All About ${keyword}`, 
      `⏰ Last Chance for ${keyword} Insights`, 
      `👋 Hey, Check Out Our Latest ${keyword}`,
    ];
    setGeneratedLines(lines);
  };

  const faqs: FAQItem[] = [
    {
      question: "What is an Email Subject Line Generator?",
      answer: "An Email Subject Line Generator is a tool designed to help users create engaging and effective subject lines for their emails. It often uses AI or predefined templates to suggest subject lines that can improve open rates and overall email campaign performance.",
    },
    {
      question: "Why are good email subject lines important?",
      answer: "Good email subject lines are crucial because they are the first impression recipients have of your email. A compelling subject line can significantly increase the likelihood of your email being opened, read, and acted upon, directly impacting the success of your marketing or communication efforts.",
    },
    {
      question: "How does this generator work?",
      answer: "Our Email Subject Line Generator works by taking keywords or a brief description of your email content, and then suggesting various subject line options. These suggestions are crafted to be attention-grabbing, clear, and relevant to your message, helping you achieve higher open rates.",
    },
    {
      question: "Can I customize the generated subject lines?",
      answer: "Absolutely! The generated subject lines serve as a starting point. You are encouraged to customize them to better fit your brand voice, target audience, and specific campaign goals. Experiment with different words, emojis, and personalization to find what resonates best with your subscribers.",
    },
    {
      question: "Is this tool suitable for all types of emails?",
      answer: "Yes, this tool is versatile and can be used for various types of emails, including marketing newsletters, promotional offers, transactional emails, outreach campaigns, and personal communications. While the suggestions are broadly applicable, always consider your specific email\'s purpose and audience when selecting and refining a subject line.",
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: "Hashtag Generator", slug: "hashtag-generator", emoji: "#️⃣" },
    { title: "Caption Generator", slug: "caption-generator", emoji: "📝" },
    { title: "AI Bio Generator", slug: "ai-bio-generator", emoji: "👤" },
  ];

  return (
    <div className="tool-widget-content">
      <div className="flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
            rows={4}
            placeholder="Enter keywords or a brief description of your email content..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          ></textarea>
          <button
            className="mt-4 w-full bg-green-700 text-white py-3 px-6 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 transition-colors"
            onClick={generateSubjectLines}
          >
            Generate Subject Lines
          </button>

          {generatedLines.length > 0 && (
            <div className="mt-8 p-4 bg-gray-50 rounded-md shadow-inner">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Generated Subject Lines:</h3>
              <ul className="list-disc list-inside space-y-2">
                {generatedLines.map((line, index) => (
                  <li key={index} className="text-gray-700 bg-yellow-300 p-2 rounded-md">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailSubjectLineGenerator;