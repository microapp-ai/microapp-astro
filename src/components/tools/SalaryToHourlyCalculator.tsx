import React, { useState } from 'react';
import type { FAQItem } from '../../hooks/useSEO'
import type { RelatedTool } from '../../lib/types';

const SalaryToHourlyCalculator: React.FC = () => {
  const [annualSalary, setAnnualSalary] = useState<number | ''>('');
  const [hourlyRate, setHourlyRate] = useState<number | null>(null);
  const [weeklyRate, setWeeklyRate] = useState<number | null>(null);
  const [monthlyRate, setMonthlyRate] = useState<number | null>(null);

  const calculateRates = () => {
    if (annualSalary && annualSalary > 0) {
      const salary = annualSalary;
      const calculatedHourly = salary / 2080; // Assuming 40 hours/week * 52 weeks/year
      const calculatedWeekly = salary / 52;
      const calculatedMonthly = salary / 12;

      setHourlyRate(calculatedHourly);
      setWeeklyRate(calculatedWeekly);
      setMonthlyRate(calculatedMonthly);
    } else {
      setHourlyRate(null);
      setWeeklyRate(null);
      setMonthlyRate(null);
    }
  };

  const faqs: FAQItem[] = [
    {
      question: 'How is the hourly rate calculated?',
      answer: 'The hourly rate is calculated by dividing your annual salary by the total number of working hours in a year. Assuming a standard 40-hour work week and 52 weeks in a year, this totals 2080 working hours (40 * 52).'
    },
    {
      question: 'What assumptions are made for the calculations?',
      answer: 'Our calculator assumes a standard 40-hour work week and 52 weeks in a year. It does not account for holidays, sick leave, or unpaid time off, which could affect your actual working hours.'
    },
    {
      question: 'Can I use this for part-time salaries?',
      answer: 'Yes, you can use this calculator for part-time salaries. However, the calculated hourly rate will still be based on the assumption of 2080 annual working hours. For a more accurate part-time hourly rate, you would need to adjust the total annual working hours accordingly.'
    },
    {
      question: 'Why is my monthly rate not exactly weekly rate times four?',
      answer: 'A common misconception is that there are exactly four weeks in every month. However, most months have slightly more than four weeks. Our calculator divides the annual salary by 12 to get an accurate average monthly rate, and by 52 for the weekly rate.'
    },
    {
      question: 'Does this calculator account for taxes or deductions?',
      answer: 'No, this calculator provides gross salary conversions. It does not account for taxes, insurance premiums, retirement contributions, or any other deductions that may be taken from your paycheck. Your net pay will be lower than the calculated figures.'
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: 'Loan Calculator', slug: '/loan-calculator', emoji: '💰' },
    { title: 'Compound Interest Calculator', slug: '/compound-interest-calculator', emoji: '📈' },
    { title: 'BMI Calculator', slug: '/bmi-calculator', emoji: '⚖️' },
  ];

  return (
    <div className="tool-widget-content">
      <div className="p-4 md:p-6 bg-white shadow-md rounded-lg">
        <div className="mb-4">
          <label htmlFor="annualSalary" className="block text-gray-700 text-sm font-bold mb-2">
            Annual Salary ($)
          </label>
          <input
            type="number"
            id="annualSalary"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="e.g., 50000"
            value={annualSalary}
            onChange={(e) => setAnnualSalary(parseFloat(e.target.value) || '')}
          />
        </div>
        <button
          onClick={calculateRates}
          className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Calculate
        </button>

        {hourlyRate !== null && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Calculated Rates:</h3>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <span className="text-gray-600">Hourly Rate:</span>
              <span className="font-bold text-green-700">${hourlyRate.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <span className="text-gray-600">Weekly Rate:</span>
              <span className="font-bold text-green-700">${weeklyRate?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <span className="text-gray-600">Monthly Rate:</span>
              <span className="font-bold text-green-700">${monthlyRate?.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalaryToHourlyCalculator;