import React, { useState } from "react";
import type { FAQItem } from "../../hooks/useSEO"
import type { RelatedTool } from "../../lib/types";

const CsvToJsonConverter: React.FC = () => {
  const [csvInput, setCsvInput] = useState<string>("");
  const [jsonOutput, setJsonOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const convertCsvToJson = () => {
    setError(null);
    if (!csvInput.trim()) {
      setJsonOutput("");
      setError("Please enter CSV data to convert.");
      return;
    }

    try {
      const lines = csvInput.trim().split(/\r\n|\n/);
      if (lines.length === 0) {
        setJsonOutput("");
        setError("No data found in CSV.");
        return;
      }

      const headers = lines[0].split(',').map(header => header.trim());
      const result = [];

      for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(',').map(item => item.trim());
        if (currentLine.length !== headers.length) {
          setError("CSV data is malformed. Ensure all rows have the same number of columns as the header.");
          setJsonOutput("");
          return;
        }
        const obj: { [key: string]: string } = {};
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentLine[j];
        }
        result.push(obj);
      }
      setJsonOutput(JSON.stringify(result, null, 2));
    } catch (e: any) {
      setError(`Error converting CSV: ${e.message}`);
      setJsonOutput("");
    }
  };

  const faqs: FAQItem[] = [
    {
      question: "What is CSV to JSON conversion?",
      answer:
        "CSV (Comma Separated Values) is a plain text file format that stores tabular data. JSON (JavaScript Object Notation) is a lightweight data-interchange format. Converting CSV to JSON means transforming the tabular data into a structured, hierarchical format that is easily readable by machines and often used in web applications.",
    },
    {
      question: "How do I use this tool?",
      answer:
        "Simply paste your CSV data into the input text area. Make sure your CSV has a header row. Click the 'Convert to JSON' button, and the resulting JSON will appear in the output textarea. You can then copy the generated JSON.",
    },
    {
      question: "Does this tool handle large CSV files?",
      answer:
        "This tool processes data client-side, meaning the conversion happens directly in your browser. While it can handle moderately sized files, very large CSV files might cause performance issues or browser slowdowns due to memory limitations. For extremely large files, consider using server-side tools or scripting.",
    },
    {
      question: "Is my data safe and private?",
      answer:
        "Yes, your data is completely safe and private. All conversions are performed locally in your browser, and no data is sent to any server. This ensures your information remains confidential.",
    },
    {
      question: "What if my CSV data contains commas within a field?",
      answer:
        "This basic converter assumes that commas are used only as delimiters between fields and that fields do not contain unescaped commas. For CSVs with more complex structures (e.g., fields enclosed in double quotes containing commas), a more robust parsing library would be required. For now, please ensure your CSV is simple or pre-process it to handle such cases.",
    },
  ];

  const relatedTools: RelatedTool[] = [
    {
      title: "JSON Formatter",
      slug: "json-formatter",
      emoji: "📝",
    },
    {
      title: "Case Converter",
      slug: "case-converter",
      emoji: "🔡",
    },
    {
      title: "URL Encoder/Decoder",
      slug: "url-encoder-decoder",
      emoji: "🔗",
    },
  ];

  return (
    <div className="tool-widget-content">
      <div className="flex flex-col space-y-4">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 font-mono"
          rows={10}
          placeholder="Paste your CSV data here..."
          value={csvInput}
          onChange={(e) => setCsvInput(e.target.value)}
        ></textarea>
        <button
          className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 transition-colors"
          onClick={convertCsvToJson}
        >
          Convert to JSON
        </button>
        {error && <p className="text-red-500">{error}</p>}
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300 font-mono"
          rows={10}
          placeholder="JSON output will appear here..."
          value={jsonOutput}
          readOnly
        ></textarea>
      </div>
    </div>
  );
};

export default CsvToJsonConverter;