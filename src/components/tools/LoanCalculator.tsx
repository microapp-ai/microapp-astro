import React, { useState, useMemo } from "react";
import type { FAQItem } from "../../hooks/useSEO"
import type { RelatedTool } from "../../lib/types";

const LoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number | string>("");
  const [interestRate, setInterestRate] = useState<number | string>("");
  const [loanTerm, setLoanTerm] = useState<number | string>("");

  const calculateLoan = useMemo(() => {
    const principal = Number(loanAmount);
    const annualRate = Number(interestRate);
    const years = Number(loanTerm);

    if (principal <= 0 || annualRate < 0 || years <= 0) {
      return { monthlyPayment: 0, totalInterest: 0, totalPayment: 0 };
    }

    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = years * 12;

    let monthlyPayment = 0;
    let totalPayment = 0;
    let totalInterest = 0;

    if (monthlyRate === 0) {
      monthlyPayment = principal / numberOfPayments;
    } else {
      monthlyPayment = principal *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    totalPayment = monthlyPayment * numberOfPayments;
    totalInterest = totalPayment - principal;

    return {
      monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2)),
      totalPayment: parseFloat(totalPayment.toFixed(2)),
    };
  }, [loanAmount, interestRate, loanTerm]);

  const faqs: FAQItem[] = [
    {
      question: "What is a loan calculator?",
      answer:
        "A loan calculator is a tool that helps you estimate your monthly loan payments, total interest paid, and the total cost of a loan over its lifetime. By inputting the principal amount, interest rate, and loan term, it provides a clear financial overview.",
    },
    {
      question: "How is the monthly loan payment calculated?",
      answer:
        "The monthly loan payment is calculated using a standard amortization formula that takes into account the principal loan amount, the monthly interest rate (annual rate divided by 12), and the total number of payments (loan term in years multiplied by 12).",
    },
    {
      question: "What factors influence my monthly loan payment?",
      answer:
        "Three primary factors influence your monthly loan payment: the principal amount (how much you borrow), the interest rate (the cost of borrowing), and the loan term (how long you have to repay). Higher principal, higher interest rates, or shorter loan terms generally result in higher monthly payments.",
    },
    {
      question: "What is amortization?",
      answer:
        "Amortization refers to the process of paying off a debt over time through regular, equal payments. Each payment consists of both principal and interest, with the proportion of interest decreasing and principal increasing over the life of the loan.",
    },
    {
      question: "Can this calculator be used for different types of loans?",
      answer:
        "Yes, this calculator can be used for various types of amortizing loans, including mortgages, auto loans, and personal loans, as long as you have the principal amount, annual interest rate, and loan term. It provides a general estimate for fixed-rate loans.",
    },
  ];

  const relatedTools: RelatedTool[] = [
    {
      title: "Compound Interest Calculator",
      slug: "compound-interest-calculator",
      emoji: "📈",
    },
    {
      title: "Discount Calculator",
      slug: "discount-calculator",
      emoji: "🏷️",
    },
    {
      title: "Salary to Hourly",
      slug: "salary-to-hourly",
      emoji: "💰",
    },
  ];

  return (
    <div className="tool-widget-content">
      <div className="mx-auto p-4 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="loanAmount" className="block text-gray-700 text-sm font-bold mb-2">
            Loan Amount ($)
          </label>
          <input
            type="number"
            id="loanAmount"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="e.g., 100000"
            min="0"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="interestRate" className="block text-gray-700 text-sm font-bold mb-2">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            id="interestRate"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="e.g., 5"
            min="0"
            step="0.01"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="loanTerm" className="block text-gray-700 text-sm font-bold mb-2">
            Loan Term (Years)
          </label>
          <input
            type="number"
            id="loanTerm"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            placeholder="e.g., 30"
            min="1"
          />
        </div>

        {(loanAmount && interestRate && loanTerm) ? (
          <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-700 text-green-800">
            <h3 className="text-lg font-bold mb-2">Results</h3>
            <p className="mb-1">
              Monthly Payment: <span className="font-semibold text-green-700">${calculateLoan.monthlyPayment.toLocaleString()}</span>
            </p>
            <p className="mb-1">
              Total Interest Paid: <span className="font-semibold text-yellow-600">${calculateLoan.totalInterest.toLocaleString()}</span>
            </p>
            <p>
              Total Payment: <span className="font-semibold text-green-700">${calculateLoan.totalPayment.toLocaleString()}</span>
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-500 italic">Enter values to calculate your loan details.</p>
        )}
      </div>
    
      {/* ── Long-Form Content ── */}
      <div className="max-w-3xl mt-14 pt-10 border-t border-[#E8E6DE]">
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#1A1A1A", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
          How Loan Repayments Are Calculated
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1.5rem" }}>
          A loan calculator uses the standard amortization formula to determine your fixed monthly payment. Each payment covers both interest (charged on the remaining balance) and principal (reducing what you owe). In the early months, most of your payment goes toward interest. Over time, as the balance shrinks, more of each payment chips away at the principal — this is called an amortizing loan.
        </p>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          Worked Example
        </h3>
        <div style={{ background: "#F7F6F1", border: "1.5px solid #E8E6DE", borderRadius: "0.875rem", padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#374151", lineHeight: 1.75, margin: 0 }}>
            A $25,000 car loan at 6.5% APR over 60 months: Monthly payment = $487.73. Over the life of the loan you pay $29,263.80 total — meaning $4,263.80 in interest. If you shorten the term to 48 months, your monthly payment rises to $594.04 but total interest drops to $3,513.92 — saving you $750 just by paying it off 12 months earlier.
          </p>
        </div>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          Monthly Payment by Loan Amount and Rate (5-year term)
        </h3>
        <div style={{ overflowX: "auto", borderRadius: "0.875rem", border: "1.5px solid #E8E6DE" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#F7F6F1" }}>
              <tr>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>Loan Amount</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>4% APR</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>6% APR</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>8% APR</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: "#FAFAF7" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$10,000</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$184.17</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$193.33</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$202.76</td>
              </tr>
              <tr style={{ background: "white" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$20,000</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$368.33</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$386.66</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$405.53</td>
              </tr>
              <tr style={{ background: "#FAFAF7" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$30,000</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$552.50</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$579.98</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$608.29</td>
              </tr>
              <tr style={{ background: "white" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$50,000</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$920.83</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$966.64</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>$1,013.82</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* ── Long-form content ── */}
      <section style={{ marginTop: "2rem", borderTop: "1.5px solid #E8E6DE", paddingTop: "1.5rem" }}>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          How loan payments are calculated
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1rem" }}>
          Loan repayments use the <strong>amortisation formula</strong>: <code style={{ background: "#F7F6F1", padding: "0.1rem 0.4rem", borderRadius: "0.3rem", fontSize: "0.875rem" }}>M = P × [r(1+r)ⁿ] / [(1+r)ⁿ−1]</code> where M is the monthly payment, P is the principal, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of payments.
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1rem" }}>
          <strong>Worked example:</strong> A $20,000 car loan at 6% APR over 48 months: r = 0.06/12 = 0.005, n = 48. M = 20000 × [0.005 × 1.005⁴⁸] / [1.005⁴⁸ − 1] ≈ <strong>$469.70/month</strong>. Total paid = $22,545.60. Total interest = $2,545.60.
        </p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", marginTop: "0.75rem" }}>
          <thead>
            <tr style={{ background: "#F7F6F1" }}>
              <th style={{ padding: "0.6rem 0.875rem", textAlign: "left", borderBottom: "1.5px solid #E8E6DE", fontWeight: 700, color: "#1A1A1A" }}>Loan Type</th>
              <th style={{ padding: "0.6rem 0.875rem", textAlign: "left", borderBottom: "1.5px solid #E8E6DE", fontWeight: 700, color: "#1A1A1A" }}>Typical APR (US, 2025)</th>
            </tr>
          </thead>
          <tbody>
            {[["30-yr fixed mortgage","6.5 – 7.5%"],["Auto loan (new car)","5 – 8%"],["Personal loan","10 – 20%"],["Student loan (federal)","5 – 8%"],["Credit card","18 – 28%"]].map(([t, r]) => (
              <tr key={t} style={{ borderBottom: "1px solid #F0EDE6" }}>
                <td style={{ padding: "0.55rem 0.875rem", color: "#374151" }}>{t}</td>
                <td style={{ padding: "0.55rem 0.875rem", color: "#374151" }}>{r}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

    </div>
  );
};

export default LoanCalculator;