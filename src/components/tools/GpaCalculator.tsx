import React, { useState } from "react";
import type { FAQItem } from "../../hooks/useSEO"
import type { RelatedTool } from "../../lib/types";

interface Course {
  id: number;
  grade: string;
  credits: number;
}

const gradeToPoints: { [key: string]: number } = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,
  F: 0.0,
};

const GpaCalculator: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, grade: "A", credits: 3 },
  ]);
  const [nextId, setNextId] = useState(2);

  const handleGradeChange = (id: number, newGrade: string) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id ? { ...course, grade: newGrade } : course
      )
    );
  };

  const handleCreditsChange = (id: number, newCredits: number) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id ? { ...course, credits: newCredits } : course
      )
    );
  };

  const addCourse = () => {
    setCourses((prevCourses) => [
      ...prevCourses,
      { id: nextId, grade: "A", credits: 3 },
    ]);
    setNextId((prevId) => prevId + 1);
  };

  const removeCourse = (id: number) => {
    setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
  };

  const calculateGpa = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
      const points = gradeToPoints[course.grade];
      if (points !== undefined) {
        totalPoints += points * course.credits;
        totalCredits += course.credits;
      }
    });

    return totalCredits === 0 ? 0 : totalPoints / totalCredits;
  };

  const gpa = calculateGpa();

  const faqs: FAQItem[] = [
    {
      question: "What is GPA?",
      answer:
        "GPA stands for Grade Point Average. It is a commonly used indicator of academic achievement in schools and universities. It is calculated by dividing the total number of grade points earned by the total number of credit hours attempted.",
    },
    {
      question: "How is GPA calculated?",
      answer:
        "GPA is calculated by assigning a numerical value to each letter grade (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0), multiplying by credit hours, summing all points, then dividing by total credit hours.",
    },
    {
      question: 'What is a good GPA?',
      answer:
        'A GPA of 3.5 or higher is generally considered good. A 4.0 is a perfect GPA. Most graduate schools require a minimum GPA of 3.0 for admission.',
    },
    {
      question: 'Does GPA matter after college?',
      answer:
        'GPA matters most for graduate school applications and first jobs. After a few years of work experience, employers typically focus more on skills and accomplishments than GPA.',
    },
    {
      question: 'Can I raise my GPA?',
      answer:
        'Yes. Retaking courses with low grades, taking additional credit hours with high grades, and focusing on high-credit courses can all help raise your cumulative GPA over time.',
    },
  ];

  const relatedTools = [
    { title: 'Age Calculator', slug: '/age-calculator', emoji: '🎂' },
    { title: 'Percentage Calculator', slug: '/percentage-calc', emoji: '%' },
    { title: 'Salary to Hourly', slug: '/salary-to-hourly', emoji: '💰' },
  ];

  return (
    <div className="tool-widget-content">
      <div className="space-y-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <div className="text-5xl font-bold text-green-700">{gpa.toFixed(2)}</div>
          <div className="text-sm text-gray-500 mt-1">Cumulative GPA (4.0 scale)</div>
        </div>
        <div className="space-y-3">
          {courses.map((course) => (
            <div key={course.id} className="flex gap-2 items-center">
              <select
                value={course.grade}
                onChange={(e) => handleGradeChange(course.id, e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {Object.keys(gradeToPoints).map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                max="6"
                value={course.credits}
                onChange={(e) => handleCreditsChange(course.id, parseInt(e.target.value) || 3)}
                className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Credits"
              />
              <span className="text-sm text-gray-500 flex-1">credit hours</span>
              <button
                onClick={() => removeCourse(course.id)}
                className="text-red-400 hover:text-red-600 px-2 py-2 text-lg"
              >✕</button>
            </div>
          ))}
        </div>
        <button
          onClick={addCourse}
          className="w-full bg-green-700 text-white rounded-xl py-3 font-semibold hover:bg-green-800 transition-colors"
        >
          + Add Course
        </button>
      </div>
    
      {/* ── Long-Form Content ── */}
      <div className="max-w-3xl mt-14 pt-10 border-t border-[#E8E6DE]">
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#1A1A1A", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
          How GPA Is Calculated — and What Counts as a Good GPA
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1.5rem" }}>
          Grade Point Average (GPA) is a standardized way of measuring academic performance on a 4.0 scale. It is calculated as the weighted average of your grade points, where each course's grade is multiplied by its credit hours. Courses worth more credits have a proportionally larger impact on your GPA. Most US universities use the 4.0 scale, though some use a 5.0 scale for weighted or honors courses.
        </p>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          Worked Example
        </h3>
        <div style={{ background: "#F7F6F1", border: "1.5px solid #E8E6DE", borderRadius: "0.875rem", padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#374151", lineHeight: 1.75, margin: 0 }}>
            A student takes four courses: English (3 credits, A = 4.0), Math (4 credits, B+ = 3.3), History (3 credits, A− = 3.7), Chemistry (4 credits, C+ = 2.3). Quality points: (3×4.0) + (4×3.3) + (3×3.7) + (4×2.3) = 12 + 13.2 + 11.1 + 9.2 = 45.5. Total credits: 3+4+3+4 = 14. GPA = 45.5 ÷ 14 = 3.25.
          </p>
        </div>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          Standard Letter Grade to GPA Conversion (4.0 Scale)
        </h3>
        <div style={{ overflowX: "auto", borderRadius: "0.875rem", border: "1.5px solid #E8E6DE" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#F7F6F1" }}>
              <tr>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>Letter Grade</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>Percentage</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>GPA Points</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: "#FAFAF7" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>A+</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>97–100%</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>4.0</td>
              </tr>
              <tr style={{ background: "white" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>A</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>93–96%</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>4.0</td>
              </tr>
              <tr style={{ background: "#FAFAF7" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>A−</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>90–92%</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>3.7</td>
              </tr>
              <tr style={{ background: "white" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>B+</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>87–89%</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>3.3</td>
              </tr>
              <tr style={{ background: "#FAFAF7" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>B</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>83–86%</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>3.0</td>
              </tr>
              <tr style={{ background: "white" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>B−</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>80–82%</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>2.7</td>
              </tr>
              <tr style={{ background: "#FAFAF7" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>C+</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>77–79%</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>2.3</td>
              </tr>
              <tr style={{ background: "white" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>C</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>73–76%</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>2.0</td>
              </tr>
              <tr style={{ background: "#FAFAF7" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>D</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>60–69%</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>1.0</td>
              </tr>
              <tr style={{ background: "white" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>F</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Below 60%</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>0.0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* ── Long-form content ── */}
      <section style={{ marginTop: "2rem", borderTop: "1.5px solid #E8E6DE", paddingTop: "1.5rem" }}>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          How GPA is calculated
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1rem" }}>
          GPA (Grade Point Average) is the weighted average of your grade points across all courses. Each letter grade maps to a point value (e.g. A = 4.0), which is multiplied by the course's credit hours. The sum of all (grade points × credits) is divided by the total credits attempted: <strong>GPA = Σ(grade points × credits) ÷ Σ(credits)</strong>.
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1rem" }}>
          <strong>Worked example:</strong> English (A, 3 credits) + Math (B+, 4 credits) + History (A−, 3 credits) = (4.0×3) + (3.3×4) + (3.7×3) = 12 + 13.2 + 11.1 = 36.3 ÷ 10 = <strong>GPA 3.63</strong>.
        </p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", marginTop: "0.75rem" }}>
          <thead>
            <tr style={{ background: "#F7F6F1" }}>
              <th style={{ padding: "0.6rem 0.875rem", textAlign: "left", borderBottom: "1.5px solid #E8E6DE", fontWeight: 700, color: "#1A1A1A" }}>Letter Grade</th>
              <th style={{ padding: "0.6rem 0.875rem", textAlign: "left", borderBottom: "1.5px solid #E8E6DE", fontWeight: 700, color: "#1A1A1A" }}>4.0 Scale</th>
              <th style={{ padding: "0.6rem 0.875rem", textAlign: "left", borderBottom: "1.5px solid #E8E6DE", fontWeight: 700, color: "#1A1A1A" }}>Typical %</th>
            </tr>
          </thead>
          <tbody>
            {[["A","4.0","93–100"],["A−","3.7","90–92"],["B+","3.3","87–89"],["B","3.0","83–86"],["B−","2.7","80–82"],["C+","2.3","77–79"],["C","2.0","73–76"],["D","1.0","60–69"],["F","0.0","Below 60"]].map(([g,p,pct]) => (
              <tr key={g} style={{ borderBottom: "1px solid #F0EDE6" }}>
                <td style={{ padding: "0.55rem 0.875rem", color: "#374151", fontWeight: 600 }}>{g}</td>
                <td style={{ padding: "0.55rem 0.875rem", color: "#374151" }}>{p}</td>
                <td style={{ padding: "0.55rem 0.875rem", color: "#374151" }}>{pct}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

    </div>
  );
}

export default GpaCalculator;
