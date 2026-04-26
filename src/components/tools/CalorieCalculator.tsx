import React, { useState } from "react";
import type { FAQItem } from "../../hooks/useSEO"
import type { RelatedTool } from "../../lib/types";

const CalorieCalculator: React.FC = () => {
  const [age, setAge] = useState<number | string>("");
  const [weight, setWeight] = useState<number | string>(""); // in kg
  const [height, setHeight] = useState<number | string>(""); // in cm
  const [gender, setGender] = useState<"male" | "female">("male");
  const [activityLevel, setActivityLevel] = useState<number>(1.2);
  const [result, setResult] = useState<number | null>(null);

  const calculateCalories = () => {
    const numAge = Number(age);
    const numWeight = Number(weight);
    const numHeight = Number(height);

    if (numAge <= 0 || numWeight <= 0 || numHeight <= 0) {
      setResult(null);
      alert("Please enter valid positive numbers for age, weight, and height.");
      return;
    }

    let bmr: number;
    if (gender === "male") {
      bmr = 10 * numWeight + 6.25 * numHeight - 5 * numAge + 5;
    } else {
      bmr = 10 * numWeight + 6.25 * numHeight - 5 * numAge - 161;
    }

    const tdee = bmr * activityLevel;
    setResult(Math.round(tdee));
  };

  const faqs: FAQItem[] = [
    {
      question: "What is a calorie calculator?",
      answer:
        "A calorie calculator is a tool that estimates the number of calories your body needs daily to maintain, lose, or gain weight. It takes into account factors like age, gender, weight, height, and activity level to provide a personalized estimate.",
    },
    {
      question: "How does the calorie calculator work?",
      answer:
        "This calculator uses the Mifflin-St Jeor equation, which is a widely accepted formula for estimating Basal Metabolic Rate (BMR). Your BMR is then multiplied by an activity factor to determine your Total Daily Energy Expenditure (TDEE), which is the estimated number of calories you burn in a day.",
    },
    {
      question: "What is BMR and TDEE?",
      answer:
        "**BMR (Basal Metabolic Rate)** is the number of calories your body burns at rest to maintain basic bodily functions like breathing, circulation, and cell production. **TDEE (Total Daily Energy Expenditure)** is the total number of calories you burn in a 24-hour period, including your BMR and the calories burned through physical activity.",
    },
    {
      question: "How accurate is this calorie calculator?",
      answer:
        "While the Mifflin-St Jeor equation is one of the most accurate predictive equations, all calorie calculators provide estimates. Individual metabolic rates can vary due to genetics, body composition, and other factors. For precise dietary advice, it\'s always best to consult with a healthcare professional or a registered dietitian.",
    },
    {
      question: "Can I use this calculator for weight loss or gain?",
      answer:
        "Yes, once you have your estimated daily calorie needs (TDEE), you can adjust your intake for weight management. To lose weight, you typically need to consume fewer calories than your TDEE. To gain weight, you would consume more. A common guideline is a deficit or surplus of 500 calories per day to lose or gain about 1 pound (0.45 kg) per week.",
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: "BMI Calculator", slug: "bmi-calculator", emoji: "⚖️" },
    { title: "Mass Calculator", slug: "mass-calculator", emoji: "🏋️" },
    { title: "Age Calculator", slug: "age-calculator", emoji: "🎂" },
  ];

  return (
    <div className="tool-widget-content">
      <div className="p-4 md:p-6 bg-white shadow-lg rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="age" className="block text-gray-700 font-medium mb-2">
              Age (years)
            </label>
            <input
              type="number"
              id="age"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-700 focus:border-green-700"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g., 30"
              min="1"
            />
          </div>
          <div>
            <label htmlFor="weight" className="block text-gray-700 font-medium mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-700 focus:border-green-700"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g., 70"
              min="1"
            />
          </div>
          <div>
            <label htmlFor="height" className="block text-gray-700 font-medium mb-2">
              Height (cm)
            </label>
            <input
              type="number"
              id="height"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-700 focus:border-green-700"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g., 175"
              min="1"
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">
              Gender
            </label>
            <select
              id="gender"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-700 focus:border-green-700"
              value={gender}
              onChange={(e) => setGender(e.target.value as "male" | "female")}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="activity" className="block text-gray-700 font-medium mb-2">
              Activity Level
            </label>
            <select
              id="activity"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-700 focus:border-green-700"
              value={activityLevel}
              onChange={(e) => setActivityLevel(Number(e.target.value))}
            >
              <option value={1.2}>Sedentary (little or no exercise)</option>
              <option value={1.375}>Lightly active (light exercise/sports 1-3 days/week)</option>
              <option value={1.55}>Moderately active (moderate exercise/sports 3-5 days/week)</option>
              <option value={1.725}>Very active (hard exercise/sports 6-7 days a week)</option>
              <option value={1.9}>Extra active (very hard exercise/physical job)</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateCalories}
          className="w-full bg-green-700 text-white py-3 px-4 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 transition duration-300 ease-in-out"
        >
          Calculate Calories
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-yellow-300 text-gray-800 rounded-md text-center text-lg font-semibold">
            Your estimated daily calorie needs: <span className="text-green-800">{result}</span> calories
          </div>
        )}
      </div>
    
      {/* ── Long-Form Content ── */}
      <div className="max-w-3xl mt-14 pt-10 border-t border-[#E8E6DE]">
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#1A1A1A", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
          How Daily Calorie Needs Are Calculated
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1.5rem" }}>
          Your Total Daily Energy Expenditure (TDEE) is the number of calories your body burns in a day, accounting for your basal metabolic rate (BMR) — the energy needed just to stay alive — plus the calories burned through physical activity. The Mifflin-St Jeor equation, developed in 1990, is the most accurate formula for estimating BMR and is used by most registered dietitians today.
        </p>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          Worked Example
        </h3>
        <div style={{ background: "#F7F6F1", border: "1.5px solid #E8E6DE", borderRadius: "0.875rem", padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#374151", lineHeight: 1.75, margin: 0 }}>
            A 35-year-old woman, 5'5" (165 cm), 140 lbs (63.5 kg), moderately active: BMR = (10 × 63.5) + (6.25 × 165) − (5 × 35) − 161 = 635 + 1031.25 − 175 − 161 = 1,330 calories/day. Multiply by the moderate activity factor (1.55): TDEE = 1,330 × 1.55 = 2,062 calories/day. To lose 1 lb per week, she would eat 2,062 − 500 = 1,562 calories/day.
          </p>
        </div>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          Activity Multipliers (Mifflin-St Jeor)
        </h3>
        <div style={{ overflowX: "auto", borderRadius: "0.875rem", border: "1.5px solid #E8E6DE" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#F7F6F1" }}>
              <tr>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>Activity Level</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>Multiplier</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: "#FAFAF7" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Sedentary</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>1.2</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Desk job, little or no exercise</td>
              </tr>
              <tr style={{ background: "white" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Lightly active</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>1.375</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Light exercise 1–3 days/week</td>
              </tr>
              <tr style={{ background: "#FAFAF7" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Moderately active</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>1.55</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Moderate exercise 3–5 days/week</td>
              </tr>
              <tr style={{ background: "white" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Very active</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>1.725</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Hard exercise 6–7 days/week</td>
              </tr>
              <tr style={{ background: "#FAFAF7" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Extra active</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>1.9</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Physical job + hard daily exercise</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* ── Long-form content ── */}
      <section style={{ marginTop: "2rem", borderTop: "1.5px solid #E8E6DE", paddingTop: "1.5rem" }}>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          How daily calorie needs are calculated
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1rem" }}>
          The most widely used formula is the <strong>Mifflin-St Jeor equation</strong>, which estimates Basal Metabolic Rate (BMR) — the calories your body burns at rest. BMR is then multiplied by an activity factor to get Total Daily Energy Expenditure (TDEE). For weight loss, eat 500 kcal below TDEE; for weight gain, eat 500 kcal above.
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1rem" }}>
          <strong>Worked example (male, 30 years, 80 kg, 178 cm, moderately active):</strong> BMR = (10 × 80) + (6.25 × 178) − (5 × 30) + 5 = 800 + 1112.5 − 150 + 5 = 1767.5 kcal. TDEE = 1767.5 × 1.55 = <strong>2,740 kcal/day</strong>.
        </p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", marginTop: "0.75rem" }}>
          <thead>
            <tr style={{ background: "#F7F6F1" }}>
              <th style={{ padding: "0.6rem 0.875rem", textAlign: "left", borderBottom: "1.5px solid #E8E6DE", fontWeight: 700, color: "#1A1A1A" }}>Activity Level</th>
              <th style={{ padding: "0.6rem 0.875rem", textAlign: "left", borderBottom: "1.5px solid #E8E6DE", fontWeight: 700, color: "#1A1A1A" }}>Multiplier</th>
            </tr>
          </thead>
          <tbody>
            {[["Sedentary (desk job, no exercise)","× 1.2"],["Lightly active (1–3 days/week)","× 1.375"],["Moderately active (3–5 days/week)","× 1.55"],["Very active (6–7 days/week)","× 1.725"],["Extra active (physical job + training)","× 1.9"]].map(([a,m]) => (
              <tr key={a} style={{ borderBottom: "1px solid #F0EDE6" }}>
                <td style={{ padding: "0.55rem 0.875rem", color: "#374151" }}>{a}</td>
                <td style={{ padding: "0.55rem 0.875rem", color: "#374151", fontWeight: 600 }}>{m}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

    </div>
  );
};

export default CalorieCalculator;