import React, { useState, useEffect } from 'react';
import type { FAQItem } from '../../hooks/useSEO'
import type { RelatedTool } from '../../lib/types';

const BMICalculator: React.FC = () => {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateBMI = () => {
    setError(null);
    setBmi(null);
    setCategory(null);

    const parsedWeight = parseFloat(weight);
    const parsedHeight = parseFloat(height);

    if (isNaN(parsedWeight) || isNaN(parsedHeight) || parsedWeight <= 0 || parsedHeight <= 0) {
      setError('Please enter valid positive numbers for weight and height.');
      return;
    }

    let calculatedBmi: number;
    if (unitSystem === 'metric') {
      // BMI = weight (kg) / (height (m))^2
      calculatedBmi = parsedWeight / (parsedHeight * parsedHeight);
    } else {
      // BMI = (weight (lbs) / (height (in))^2) * 703
      calculatedBmi = (parsedWeight / (parsedHeight * parsedHeight)) * 703;
    }

    setBmi(parseFloat(calculatedBmi.toFixed(2)));
    determineBMICategory(calculatedBmi);
  };

  const determineBMICategory = (bmiValue: number) => {
    if (bmiValue < 18.5) {
      setCategory('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setCategory('Normal weight');
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setCategory('Overweight');
    } else if (bmiValue >= 30) {
      setCategory('Obesity');
    } else {
      setCategory('Unknown');
    }
  };

  const handleUnitSystemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnitSystem(e.target.value as 'metric' | 'imperial');
    setWeight('');
    setHeight('');
    setBmi(null);
    setCategory(null);
    setError(null);
  };

  const faqs: FAQItem[] = [
    {
      question: "What is BMI and how is it calculated?",
      answer: "BMI stands for Body Mass Index. It is a measure that uses your height and weight to work out if your weight is healthy. It's calculated by dividing an adult's weight in kilograms by the square of their height in meters (kg/m²). For imperial units, the formula is weight (lbs) / [height (in)]² * 703.",
    },
    {
      question: "What do the different BMI categories mean?",
      answer: "BMI categories are generally defined as: Underweight (BMI < 18.5), Normal weight (BMI 18.5–24.9), Overweight (BMI 25–29.9), and Obesity (BMI ≥ 30). These categories help assess potential health risks associated with weight.",
    },
    {
      question: "Is BMI an accurate measure of health for everyone?",
      answer: "While BMI is a widely used screening tool, it has limitations. It may not accurately reflect body fat percentage for certain groups, such as athletes with high muscle mass, elderly individuals who have lost muscle, or pregnant women. It's a general indicator and should be considered alongside other health assessments.",
    },
    {
      question: "Can children use the BMI Calculator?",
      answer: "This BMI calculator is primarily designed for adults. For children and teenagers, BMI is calculated differently and interpreted using age- and sex-specific growth charts, as their body composition changes significantly during growth. Consult a pediatrician for accurate assessment of children's BMI.",
    },
    {
      question: "What are the health risks associated with high or low BMI?",
      answer: "Both a high and a low BMI can be associated with health risks. A high BMI (overweight or obese) increases the risk of heart disease, type 2 diabetes, high blood pressure, and certain cancers. A low BMI (underweight) can lead to weakened immune function, nutrient deficiencies, osteoporosis, and other health problems.",
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: "Calorie Calculator", slug: "calorie-calculator", emoji: "🔥" },
    { title: "Mass Calculator", slug: "mass-calculator", emoji: "⚖️" },
    { title: "Age Calculator", slug: "age-calculator", emoji: "🎂" },
  ];

  return (
    <div className="tool-widget-content">
      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setUnitSystem('metric')}
            className={`px-6 py-2 rounded-lg text-white font-semibold transition-colors duration-200\n              ${unitSystem === 'metric' ? 'bg-green-700 hover:bg-green-800' : 'bg-gray-400 hover:bg-gray-500'}`}
          >
            Metric (kg, m)
          </button>
          <button
            onClick={() => setUnitSystem('imperial')}
            className={`px-6 py-2 rounded-lg text-white font-semibold transition-colors duration-200\n              ${unitSystem === 'imperial' ? 'bg-green-700 hover:bg-green-800' : 'bg-gray-400 hover:bg-gray-500'}`}
          >
            Imperial (lbs, in)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="weight" className="block text-lg font-medium text-gray-700 mb-2">
              Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              type="number"
              id="weight"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-lg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={unitSystem === 'metric' ? 'e.g., 70' : 'e.g., 150'}
            />
          </div>
          <div>
            <label htmlFor="height" className="block text-lg font-medium text-gray-700 mb-2">
              Height ({unitSystem === 'metric' ? 'm' : 'in'})
            </label>
            <input
              type="number"
              id="height"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-lg"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={unitSystem === 'metric' ? 'e.g., 1.75' : 'e.g., 68'}
            />
          </div>
        </div>

        {error && <p className="text-red-600 text-center mt-4 text-lg font-medium">{error}</p>}

        <div className="flex justify-center mt-6">
          <button
            onClick={calculateBMI}
            className="px-8 py-3 bg-green-700 text-white font-bold text-xl rounded-lg shadow-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Calculate BMI
          </button>
        </div>

        {bmi !== null && category !== null && (
          <div className="mt-8 p-6 bg-yellow-300 rounded-lg shadow-lg text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-3">Your BMI: {bmi}</h3>
            <p className="text-2xl text-gray-700">Category: <span className="font-semibold">{category}</span></p>
            <div className="mt-4 text-gray-600">
              <p>BMI Categories:</p>
              <ul className="list-disc list-inside mx-auto w-fit">
                <li>Underweight: &lt; 18.5</li>
                <li>Normal weight: 18.5 – 24.9</li>
                <li>Overweight: 25 – 29.9</li>
                <li>Obesity: &ge; 30</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    
      {/* ── Long-Form Content ── */}
      <div className="max-w-3xl mt-14 pt-10 border-t border-[#E8E6DE]">
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#1A1A1A", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
          What Is BMI and What Do the Numbers Mean?
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1.5rem" }}>
          Body Mass Index (BMI) is a simple screening tool that estimates body fat based on height and weight. It was developed by Belgian mathematician Adolphe Quetelet in the 1830s and is still used by the World Health Organization as a population-level health indicator. While BMI does not directly measure body fat percentage, it provides a quick, cost-free way to identify potential weight-related health risks.
        </p>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          Worked Example
        </h3>
        <div style={{ background: "#F7F6F1", border: "1.5px solid #E8E6DE", borderRadius: "0.875rem", padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#374151", lineHeight: 1.75, margin: 0 }}>
            A person who is 5'9" (175 cm) and weighs 170 lbs (77 kg): BMI = 77 ÷ (1.75)² = 77 ÷ 3.0625 = 25.1. This falls in the 'Overweight' range by a narrow margin. To reach the top of the 'Normal' range (BMI 24.9), this person would need to weigh approximately 168 lbs (76.2 kg) — a difference of just 1.8 lbs.
          </p>
        </div>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          BMI Classification (WHO Standard)
        </h3>
        <div style={{ overflowX: "auto", borderRadius: "0.875rem", border: "1.5px solid #E8E6DE" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#F7F6F1" }}>
              <tr>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>BMI Range</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>Category</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>Health Risk</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: "#FAFAF7" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Below 18.5</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Underweight</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Nutritional deficiency, osteoporosis</td>
              </tr>
              <tr style={{ background: "white" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>18.5 – 24.9</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Normal weight</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Lowest risk</td>
              </tr>
              <tr style={{ background: "#FAFAF7" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>25.0 – 29.9</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Overweight</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Moderate risk of heart disease, diabetes</td>
              </tr>
              <tr style={{ background: "white" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>30.0 – 34.9</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Obese (Class I)</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>High risk</td>
              </tr>
              <tr style={{ background: "#FAFAF7" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>35.0 – 39.9</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Obese (Class II)</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Very high risk</td>
              </tr>
              <tr style={{ background: "white" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>40.0 and above</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Obese (Class III)</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Extremely high risk</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* ── Long-form content ── */}
      <section style={{ marginTop: "2rem", borderTop: "1.5px solid #E8E6DE", paddingTop: "1.5rem" }}>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          What is BMI and how is it calculated?
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1rem" }}>
          Body Mass Index (BMI) is a screening tool that estimates body fat based on height and weight. It was developed by Belgian mathematician Adolphe Quetelet in the 1830s and is still the most widely used population-level health metric today. BMI is calculated by dividing your weight in kilograms by the square of your height in metres: <strong>BMI = kg / m²</strong>. In imperial units the formula becomes weight (lbs) × 703 ÷ height (inches)².
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1rem" }}>
          <strong>Worked example:</strong> A person who weighs 75 kg and is 1.75 m tall has a BMI of 75 ÷ (1.75 × 1.75) = 75 ÷ 3.0625 ≈ <strong>24.5</strong> — squarely in the "Normal weight" range.
        </p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", marginTop: "0.75rem" }}>
          <thead>
            <tr style={{ background: "#F7F6F1" }}>
              <th style={{ padding: "0.6rem 0.875rem", textAlign: "left", borderBottom: "1.5px solid #E8E6DE", fontWeight: 700, color: "#1A1A1A" }}>BMI Range</th>
              <th style={{ padding: "0.6rem 0.875rem", textAlign: "left", borderBottom: "1.5px solid #E8E6DE", fontWeight: 700, color: "#1A1A1A" }}>Category</th>
            </tr>
          </thead>
          <tbody>
            {[["Below 18.5","Underweight"],["18.5 – 24.9","Normal weight"],["25.0 – 29.9","Overweight"],["30.0 and above","Obese"]].map(([range, cat]) => (
              <tr key={range} style={{ borderBottom: "1px solid #F0EDE6" }}>
                <td style={{ padding: "0.55rem 0.875rem", color: "#374151" }}>{range}</td>
                <td style={{ padding: "0.55rem 0.875rem", color: "#374151" }}>{cat}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#9CA3AF", marginTop: "0.75rem" }}>
          Note: BMI is a screening tool, not a diagnostic measure. It does not account for muscle mass, bone density, or fat distribution. Consult a healthcare professional for a full assessment.
        </p>
      </section>

    </div>
  );
};

export default BMICalculator;