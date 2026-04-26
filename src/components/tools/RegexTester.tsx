import React, { useState } from 'react';
import type { FAQItem } from '../../hooks/useSEO'
import type { RelatedTool } from '../../lib/types';

const RegexTester: React.FC = () => {
  const faqs: FAQItem[] = [
    {
      question: "What is a Regular Expression (Regex)?",
      answer: "A Regular Expression, often shortened to regex or regexp, is a sequence of characters that defines a search pattern. It is primarily used for 'find and replace' operations, validating input, or parsing text in programming languages and text editors. Regex provides a powerful, flexible, and efficient way to process strings."
    },
    {
      question: "How do I use this Regex Tester?",
      answer: "Simply enter your regular expression pattern into the 'Regular Expression' input field and the text you want to test against it into the 'Test String' textarea. The tool will automatically highlight all matches in the test string as you type, and display any errors if your regex pattern is invalid."
    },
    {
      question: "What are common regex metacharacters?",
      answer: "Common metacharacters include: `.` (any character except newline), `*` (zero or more of the preceding character), `+` (one or more), `?` (zero or one), `[]` (character set), `()` (grouping), `|` (OR operator), `\\d` (digit), `\\w` (word character), `\\s` (whitespace character), `^` (start of string), and `$` (end of string)."
    },
    {
      question: "Why is my regex not matching anything?",
      answer: "There could be several reasons: your pattern might be too specific or too general, you might have a typo, or the flags (like 'g' for global or 'i' for case-insensitive) might be missing or incorrect. Ensure your pattern accurately reflects the text you're trying to match and check for common syntax errors."
    },
    {
      question: "Can regex be used for complex parsing tasks?",
      answer: "Yes, regular expressions are incredibly powerful for complex parsing, data extraction, and validation tasks. While simple patterns are easy to grasp, advanced regex features like lookaheads, lookbehinds, and backreferences allow for highly sophisticated pattern matching. However, for very complex or nested structures (like HTML or JSON), dedicated parsers are often more robust and maintainable."
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: "URL Encoder/Decoder", slug: "url-encoder-decoder", emoji: "🔗" },
    { title: "HTML Encoder/Decoder", slug: "html-encoder-decoder", emoji: "< />" },
    { title: "JSON Formatter", slug: "json-formatter", emoji: "{ }" },
  ];
  const [regexPattern, setRegexPattern] = useState('');
  const [testString, setTestString] = useState('');
  const [matchResults, setMatchResults] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleRegexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegexPattern(e.target.value);
    testRegex(e.target.value, testString);
  };

  const handleTestStringChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTestString(e.target.value);
    testRegex(regexPattern, e.target.value);
  };

  const testRegex = (pattern: string, text: string) => {
    if (!pattern) {
      setMatchResults([]);
      setError(null);
      return;
    }
    try {
      const regex = new RegExp(pattern, 'g');
      const matches: string[] = [];
      let match;
      while ((match = regex.exec(text)) !== null) {
        matches.push(match[0]);
      }
      setMatchResults(matches);
      setError(null);
    } catch (e: any) {
      setMatchResults([]);
      setError(e.message);
    }
  };

  return (
    <div className="tool-widget-content">
      <div className="flex flex-col space-y-4">
        <div>
          <label htmlFor="regex-pattern" className="block text-sm font-medium text-gray-700">Regular Expression</label>
          <input
            type="text"
            id="regex-pattern"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700 sm:text-sm"
            value={regexPattern}
            onChange={handleRegexChange}
            placeholder="Enter your regex pattern (e.g., \\d+)"
          />
        </div>
        <div>
          <label htmlFor="test-string" className="block text-sm font-medium text-gray-700">Test String</label>
          <textarea
            id="test-string"
            rows={6}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700 sm:text-sm"
            value={testString}
            onChange={handleTestStringChange}
            placeholder="Enter the string to test against your regex"
          ></textarea>
        </div>
        {error && (
          <div className="text-red-600 text-sm">
            Error: {error}
          </div>
        )}
        {matchResults.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900">Matches:</h3>
            <div className="mt-2 p-3 bg-gray-50 rounded-md">
              {testString.split(new RegExp(regexPattern, 'g')).map((part, index, array) => (
                <React.Fragment key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <span className="bg-yellow-300 px-1 rounded">{matchResults[index]}</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
        {matchResults.length === 0 && regexPattern && !error && testString && (
          <div className="text-gray-600 text-sm">
            No matches found.
          </div>
        )}
      </div>
      {/* ── Long-form content ── */}
      <section style={{ marginTop: "2rem", borderTop: "1.5px solid #E8E6DE", paddingTop: "1.5rem" }}>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          Regular expression quick reference
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1rem" }}>
          A regular expression (regex) is a pattern that describes a set of strings. They are used in search, validation, and text transformation across every programming language. JavaScript regex patterns are written between forward slashes: <code style={{ background: "#F7F6F1", padding: "0.1rem 0.4rem", borderRadius: "0.3rem", fontSize: "0.875rem" }}>/pattern/flags</code>.
        </p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", marginTop: "0.75rem" }}>
          <thead>
            <tr style={{ background: "#F7F6F1" }}>
              <th style={{ padding: "0.6rem 0.875rem", textAlign: "left", borderBottom: "1.5px solid #E8E6DE", fontWeight: 700, color: "#1A1A1A" }}>Token</th>
              <th style={{ padding: "0.6rem 0.875rem", textAlign: "left", borderBottom: "1.5px solid #E8E6DE", fontWeight: 700, color: "#1A1A1A" }}>Meaning</th>
              <th style={{ padding: "0.6rem 0.875rem", textAlign: "left", borderBottom: "1.5px solid #E8E6DE", fontWeight: 700, color: "#1A1A1A" }}>Example</th>
            </tr>
          </thead>
          <tbody>
            {[[".",  "Any character except newline","/h.t/ → hat, hit, hot"],["\\d","Any digit 0–9","/\\d+/ → 42, 100"],["\\w","Word char (a-z, A-Z, 0-9, _)","/\\w+/ → hello_world"],["^","Start of string","/^Hello/ → Hello world"],["$","End of string","/world$/ → Hello world"],["*","0 or more","/ab*c/ → ac, abc, abbc"],["?","0 or 1 (optional)","/colou?r/ → color, colour"],["+","1 or more","/\\d+/ → 1, 42, 999"]].map(([t,m,e]) => (
              <tr key={t} style={{ borderBottom: "1px solid #F0EDE6" }}>
                <td style={{ padding: "0.55rem 0.875rem", color: "#374151", fontFamily: "monospace", fontWeight: 600 }}>{t}</td>
                <td style={{ padding: "0.55rem 0.875rem", color: "#374151" }}>{m}</td>
                <td style={{ padding: "0.55rem 0.875rem", color: "#374151", fontFamily: "monospace", fontSize: "0.8rem" }}>{e}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

    </div>
  );
};

export default RegexTester;