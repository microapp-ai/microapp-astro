import React, { useState, useCallback } from 'react';
import type { FAQItem } from '../../hooks/useSEO'
import type { RelatedTool } from '../../lib/types';

const JsonToCsvConverter: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [csvOutput, setCsvOutput] = useState<string>('');
  const [error, setError] = useState<string>('');

  const convertJsonToCsv = useCallback(() => {
    setError('');
    setCsvOutput('');

    if (!jsonInput.trim()) {
      setError('Please enter some JSON data.');
      return;
    }

    try {
      const parsedJson = JSON.parse(jsonInput);

      if (!Array.isArray(parsedJson) || parsedJson.length === 0) {
        setError('JSON input must be a non-empty array of objects.');
        return;
      }

      // Get all unique headers from all objects to handle inconsistent keys
      const allKeys = new Set<string>();
      parsedJson.forEach(obj => {
        if (typeof obj !== 'object' || obj === null) {
          throw new Error('Array elements must be objects.');
        }
        Object.keys(obj).forEach(key => allKeys.add(key));
      });

      const headers = Array.from(allKeys);

      const escapeCsvValue = (value: any): string => {
        if (value === null || value === undefined) {
          return '';
        }
        const stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      };

      const csvRows = parsedJson.map(obj => {
        return headers.map(header => escapeCsvValue(obj[header])).join(',');
      });

      setCsvOutput([headers.map(escapeCsvValue).join(','), ...csvRows].join('\n'));

    } catch (e: any) {
      setError(`Invalid JSON input: ${e.message}`);
    }
  }, [jsonInput]);

  const handleCopy = useCallback(() => {
    if (csvOutput) {
      navigator.clipboard.writeText(csvOutput);
      alert('CSV copied to clipboard!');
    }
  }, [csvOutput]);

  const handleDownload = useCallback(() => {
    if (csvOutput) {
      const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'data.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [csvOutput]);

  const faqs: FAQItem[] = [
    {
      question: 'What is JSON?',
      answer: 'JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write and easy for machines to parse and generate. It is often used for transmitting data between a server and web application.'
    },
    {
      question: 'What is CSV?',
      answer: 'CSV (Comma Separated Values) is a plain text file format that uses commas to separate values. Each line in the file is a data record, and each record consists of one or more fields, separated by commas. CSV files are commonly used for importing and exporting data in spreadsheets and databases.'
    },
    {
      question: 'How does this converter handle nested JSON objects or arrays?',
      answer: 'This converter is designed to handle flat JSON arrays of objects. Nested objects or arrays will be stringified or might not be fully represented in the CSV output, depending on the exact structure. For complex nested JSON, consider pre-processing your data.'
    },
    {
      question: 'Can I convert a single JSON object, not an array?',
      answer: 'This tool primarily expects a JSON array of objects. If you provide a single JSON object, it will be treated as an array with one element. For best results, ensure your input is a valid JSON array.'
    },
    {
      question: 'Is my data safe and private?',
      answer: 'Yes, all conversions are performed client-side in your browser. Your data is never sent to any server, ensuring complete privacy and security.'
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: 'JSON Formatter', slug: '/json-formatter', emoji: '📝' },
    { title: 'CSV to JSON Converter', slug: '/csv-to-json', emoji: '🔄' },
    { title: 'Word Counter', slug: '/word-counter', emoji: '🧮' },
  ];

  return (
    <div className="tool-widget-content">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col">
          <label htmlFor="json-input" className="block text-sm font-medium text-gray-700 mb-2">JSON Input</label>
          <textarea
            id="json-input"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 font-mono text-sm"
            rows={15}
            placeholder='Enter your JSON array here, e.g., [{"name": "Alice", "age": 30}, {"name": "Bob", "age": 24}]'
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          ></textarea>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <button
            onClick={convertJsonToCsv}
            className="mt-4 px-6 py-3 bg-green-700 text-white font-semibold rounded-md shadow-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Convert to CSV
          </button>
        </div>

        <div className="flex-1 flex flex-col">
          <label htmlFor="csv-output" className="block text-sm font-medium text-gray-700 mb-2">CSV Output</label>
          <textarea
            id="csv-output"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:ring-green-500 focus:border-green-500 font-mono text-sm"
            rows={15}
            readOnly
            value={csvOutput}
            placeholder="Converted CSV will appear here..."
          ></textarea>
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleCopy}
              disabled={!csvOutput}
              className="flex-1 px-6 py-3 bg-yellow-300 text-gray-900 font-semibold rounded-md shadow-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Copy CSV
            </button>
            <button
              onClick={handleDownload}
              disabled={!csvOutput}
              className="flex-1 px-6 py-3 bg-yellow-300 text-gray-900 font-semibold rounded-md shadow-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Download CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonToCsvConverter;