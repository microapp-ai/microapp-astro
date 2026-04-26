import React, { useState, useCallback } from "react";
import type { FAQItem } from "../../hooks/useSEO"
import type { RelatedTool } from "../../lib/types";

const MeetingAgendaGenerator: React.FC = () => {
  const [topic, setTopic] = useState<string>("");
  const [generatedAgenda, setGeneratedAgenda] = useState<string>("");

  const generateAgenda = useCallback(() => {
    if (!topic.trim()) {
      setGeneratedAgenda("Please enter a topic or goal to generate an agenda.");
      return;
    }

    const agendaSections = [
      "1. Call to Order",
      "2. Roll Call/Attendance",
      "3. Review and Approval of Previous Meeting Minutes",
      "4. Action Items from Previous Meeting",
      `5. Discussion: ${topic}`,
      "6. New Business",
      "7. Open Discussion/Q&A",
      "8. Next Steps and Action Items",
      "9. Adjournment",
    ];

    setGeneratedAgenda(agendaSections.join("\n"));
  }, [topic]);

  const faqs: FAQItem[] = [
    {
      question: "What is a meeting agenda?",
      answer: "A meeting agenda is a list of topics or activities that will be discussed or performed during a meeting. It serves as a roadmap to keep the discussion focused and productive.",
    },
    {
      question: "Why is a meeting agenda important?",
      answer: "An agenda is crucial for effective meetings. It helps participants prepare, ensures all key topics are covered, keeps the meeting on track, and provides a clear structure for discussions and decision-making.",
    },
    {
      question: "How do I use this Meeting Agenda Generator?",
      answer: "Simply enter the main topic or goal of your meeting into the input field and click 'Generate Agenda'. The tool will provide a structured agenda that you can then customize.",
    },
    {
      question: "Can I customize the generated agenda?",
      answer: "Yes, the generated agenda provides a standard framework. You can easily copy the text and modify it to add specific discussion points, allocate time slots, or assign presenters for each section.",
    },
    {
      question: "What are the key components of an effective meeting agenda?",
      answer: "An effective agenda typically includes a clear objective, a list of topics with estimated timeframes, assigned presenters, and a section for new business or action items. It should also include administrative details like date, time, and location.",
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: "Summarizer", slug: "summarizer", emoji: "📝" },
    { title: "Text to Bullet Points", slug: "text-to-bullet-points", emoji: "•" },
    { title: "Email Subject Line Generator", slug: "email-subject-line-generator", emoji: "📧" },
  ];

  return (
    <div className="tool-widget-content">
      <div className="flex flex-col space-y-4">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-700 focus:border-green-700 shadow-sm"
          rows={4}
          placeholder="Enter your meeting topic or goal (e.g., 'Quarterly Sales Review', 'Project X Kick-off')"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        ></textarea>
        <button
          className="px-6 py-3 bg-green-700 text-white font-semibold rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 transition-colors duration-200 shadow-md"
          onClick={generateAgenda}
        >
          Generate Agenda
        </button>
        {generatedAgenda && (
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 shadow-inner">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Generated Meeting Agenda:</h3>
            <pre className="whitespace-pre-wrap font-mono text-gray-700 text-sm bg-white p-3 rounded-md border border-gray-300">
              {generatedAgenda}
            </pre>
            <button
              className="mt-4 px-4 py-2 bg-yellow-300 text-gray-800 font-semibold rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 transition-colors duration-200 shadow-sm"
              onClick={() => navigator.clipboard.writeText(generatedAgenda)}
            >
              Copy Agenda
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingAgendaGenerator;