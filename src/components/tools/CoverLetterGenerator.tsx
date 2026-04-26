import React, { useState } from "react";
import type { FAQItem } from "../../hooks/useSEO"
import type { RelatedTool } from "../../lib/types";

const CoverLetterGenerator: React.FC = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const generateCoverLetter = () => {
    const generatedText = `Dear Hiring Manager at ${company},

I am writing to express my enthusiastic interest in the ${jobTitle} position, as advertised on [Platform where you saw the ad]. With a proven track record in ${experience} and a strong skill set including ${skills}, I am confident in my ability to contribute significantly to your team.

Throughout my career, I have consistently demonstrated a passion for [mention a relevant aspect of the job or industry]. My experience aligns perfectly with the requirements outlined for this role, and I am particularly excited about [mention something specific about the company or role that interests you].

I am eager to learn more about this opportunity and discuss how my qualifications and enthusiasm can benefit ${company}. Thank you for your time and consideration.

Sincerely,
[Your Name]`;
    setCoverLetter(generatedText);
  };

  const faqs: FAQItem[] = [
    {
      question: "What is a cover letter?",
      answer: "A cover letter is a one-page document that you submit as part of your job application, alongside your resume. It serves as a personal introduction and a way to explain why you are a good fit for the specific job and company.",
    },
    {
      question: "Why is a cover letter important?",
      answer: "A well-written cover letter can significantly enhance your job application by allowing you to highlight specific skills and experiences relevant to the role, express your enthusiasm for the company, and make a strong first impression that sets you apart from other candidates.",
    },
    {
      question: "What should I include in my cover letter?",
      answer: "Your cover letter should include your contact information, the date, the hiring manager\'s contact information (if known), an engaging introduction, paragraphs detailing your relevant skills and experience, a strong closing statement, and a professional sign-off.",
    },
    {
      question: "How long should a cover letter be?",
      answer: "Typically, a cover letter should be no longer than one page, divided into three to four concise paragraphs. Recruiters often spend only a few seconds scanning cover letters, so it\'s crucial to be clear, direct, and impactful.",
    },
    {
      question: "Should I customize each cover letter?",
      answer: "Absolutely! Customizing each cover letter for the specific job and company is crucial. Generic cover letters are often overlooked. Tailor your letter to address the job description\'s requirements and demonstrate your genuine interest in that particular role and organization.",
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: "AI Bio Generator", slug: "ai-bio-generator", emoji: "✍️" },
    { title: "Email Generator", slug: "email-generator", emoji: "📧" },
    { title: "Paraphrasing Tool", slug: "paraphrasing-tool", emoji: "📝" },
  ];

  return (
    <div className="tool-widget-content">
      <div className="p-4 space-y-4">
        <div className="flex flex-col">
          <label htmlFor="jobTitle" className="text-lg font-semibold mb-1">Job Title</label>
          <input
            id="jobTitle"
            type="text"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="e.g., Software Engineer"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="company" className="text-lg font-semibold mb-1">Company Name</label>
          <input
            id="company"
            type="text"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g., Google"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="skills" className="text-lg font-semibold mb-1">Key Skills (comma-separated)</label>
          <input
            id="skills"
            type="text"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="e.g., JavaScript, React, Node.js"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="experience" className="text-lg font-semibold mb-1">Relevant Experience</label>
          <textarea
            id="experience"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 h-32"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="e.g., 5 years in web development, led multiple projects"
          ></textarea>
        </div>

        <button
          onClick={generateCoverLetter}
          className="w-full bg-green-700 text-white py-3 rounded-md text-lg font-bold hover:bg-green-800 transition-colors"
        >
          Generate Cover Letter
        </button>

        {coverLetter && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
            <h3 className="text-xl font-bold mb-2">Your Generated Cover Letter:</h3>
            <textarea
              readOnly
              className="w-full h-96 p-2 border border-gray-300 rounded-md bg-white font-mono text-sm"
              value={coverLetter}
            ></textarea>
            <button
              onClick={() => navigator.clipboard.writeText(coverLetter)}
              className="mt-3 bg-yellow-300 text-gray-900 py-2 px-4 rounded-md font-semibold hover:bg-yellow-400 transition-colors"
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoverLetterGenerator;