import React, { useState, useEffect } from 'react';
import type { FAQItem } from '../../hooks/useSEO'
import type { RelatedTool } from '../../lib/types';

const CompoundInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(1000);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [compoundingFrequency, setCompoundingFrequency] = useState<number>(12); // Monthly
  const [years, setYears] = useState<number>(10);
  const [futureValue, setFutureValue] = useState<number>(0);

  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, interestRate, compoundingFrequency, years]);

  const calculateCompoundInterest = () => {
    const P = principal;
    const r = interestRate / 100; // Convert percentage to decimal
    const n = compoundingFrequency;
    const t = years;

    if (P > 0 && r >= 0 && n > 0 && t >= 0) {
      const A = P * Math.pow((1 + r / n), (n * t));
      setFutureValue(A);
    } else {
      setFutureValue(0);
    }
  };

  const faqs: FAQItem[] = [
    {
      question: 'What is compound interest?',
      answer: 'Compound interest is the interest on a loan or deposit calculated based on both the initial principal and the accumulated interest from previous periods. It\u2019s often referred to as \u201Cinterest on interest,\u201D and it makes a deposit or loan grow faster than simple interest, which is calculated only on the principal amount.'
    },
    {
      question: 'How does compounding frequency affect returns?',
      answer: 'The more frequently interest is compounded (e.g., daily vs. annually), the faster your investment or debt will grow. This is because interest is added to the principal more often, and subsequent interest calculations are then based on a larger sum. Even small differences in compounding frequency can lead to significant differences over long periods.'
    },
    {
      question: 'What is the difference between simple and compound interest?',
      answer: 'Simple interest is calculated only on the principal amount of a loan or deposit. Compound interest, on the other hand, is calculated on the principal amount and also on the accumulated interest of previous periods. Compound interest leads to exponential growth, while simple interest leads to linear growth.'
    },
    {
      question: 'Why is compound interest considered powerful?',
      answer: 'Compound interest is often called the \u201Ceighth wonder of the world\u201D because of its ability to generate substantial wealth over time. The longer the money is invested, the more time the interest has to earn interest, leading to exponential growth. This \u201Csnowball effect\u201D is particularly beneficial for long-term investments like retirement savings.'
    },
    {
      question: 'What factors influence compound interest calculations?',
      answer: 'The main factors influencing compound interest are the principal amount (initial investment), the annual interest rate, the compounding frequency (how often interest is added), and the number of years the money is invested or borrowed. Increasing any of these factors generally leads to a higher future value.'
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: 'Percentage Calculator', slug: '/percentage-calc', emoji: '➗' },
    { title: 'Loan Calculator', slug: '/loan-calculator', emoji: '💰' },
    { title: 'Discount Calculator', slug: '/discount-calculator', emoji: '🏷️' },
  ];

  return (
    <div className="tool-widget-content">
      <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="principal" className="block text-gray-700 text-sm font-bold mb-2">Principal Amount ($):</label>
          <input
            type="number"
            id="principal"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={principal}
            onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
            min="0"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="interestRate" className="block text-gray-700 text-sm font-bold mb-2">Annual Interest Rate (%):</label>
          <input
            type="number"
            id="interestRate"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={interestRate}
            onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
            min="0"
            step="0.1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="compoundingFrequency" className="block text-gray-700 text-sm font-bold mb-2">Compounding Frequency (per year):</label>
          <select
            id="compoundingFrequency"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={compoundingFrequency}
            onChange={(e) => setCompoundingFrequency(parseInt(e.target.value) || 1)}
          >
            <option value="1">Annually</option>
            <option value="2">Semi-annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="52">Weekly</option>
            <option value="365">Daily</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="years" className="block text-gray-700 text-sm font-bold mb-2">Number of Years:</label>
          <input
            type="number"
            id="years"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={years}
            onChange={(e) => setYears(parseFloat(e.target.value) || 0)}
            min="0"
          />
        </div>

        <div className="bg-green-100 border-l-4 border-green-700 text-green-800 p-4 mb-4" role="alert">
          <p className="font-bold">Future Value:</p>
          <p className="text-2xl font-semibold">${futureValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>

        <button
          onClick={calculateCompoundInterest}
          className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Calculate
        </button>
      </div>
    
      {/* ── Long-Form Content ── */}
      <div className="max-w-3xl mt-14 pt-10 border-t border-[#E8E6DE]">
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#1A1A1A", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
          What Is Compound Interest — and Why Does It Matter?
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1.5rem" }}>
          Compound interest is the process of earning interest on both your original principal and the interest that has already accumulated. Unlike simple interest, which grows linearly, compound interest grows exponentially — meaning the longer you leave money invested, the faster it grows. This is why financial advisors consistently call it the most powerful force in personal finance.
        </p>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          Worked Example
        </h3>
        <div style={{ background: "#F7F6F1", border: "1.5px solid #E8E6DE", borderRadius: "0.875rem", padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#374151", lineHeight: 1.75, margin: 0 }}>
            Suppose you invest $5,000 at a 7% annual interest rate, compounded monthly, for 20 years. Using the formula A = P(1 + r/n)^(nt): A = 5000 × (1 + 0.07/12)^(12×20) = $19,898.60. Your $5,000 grew by nearly $15,000 — without adding a single extra dollar. If you had used simple interest instead, you would have earned only $7,000 in interest ($12,000 total).
          </p>
        </div>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          Compounding Frequency Comparison ($10,000 at 6% for 10 years)
        </h3>
        <div style={{ overflowX: "auto", borderRadius: "0.875rem", border: "1.5px solid #E8E6DE" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#F7F6F1" }}>
              <tr>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>Frequency</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>Final Value</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>Interest Earned</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: "#FAFAF7" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Annually (1×/year)</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$17,908.48</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$7,908.48</td>
              </tr>
              <tr style={{ background: "white" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Semi-annually (2×/year)</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$18,061.11</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$8,061.11</td>
              </tr>
              <tr style={{ background: "#FAFAF7" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Quarterly (4×/year)</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$18,140.18</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$8,140.18</td>
              </tr>
              <tr style={{ background: "white" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Monthly (12×/year)</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$18,193.97</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$8,193.97</td>
              </tr>
              <tr style={{ background: "#FAFAF7" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Daily (365×/year)</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$18,220.40</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$8,220.40</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;