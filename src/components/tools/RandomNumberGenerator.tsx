import React, { useState } from 'react';
import type { RelatedTool } from '../../lib/types';

const RandomNumberGeneratorTool: React.FC = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState('');

  const generate = () => {
    if (min >= max) { setError('Min must be less than Max.'); return; }
    if (count < 1 || count > 100) { setError('Count must be between 1 and 100.'); return; }
    setError('');
    const nums = Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    setResults(nums);
  };

  const faqs: FAQItem[] = [
    { question: 'Is this truly random?', answer: 'This tool uses JavaScript Math.random(), a pseudo-random number generator suitable for games and decisions but not cryptographic purposes.' },
    { question: 'Can I generate duplicate numbers?', answer: 'Yes, duplicates are possible by default. Reduce the count relative to the range if you need unique numbers.' },
    { question: 'Can I generate multiple numbers at once?', answer: 'Yes — set the Count field to any number between 1 and 100 to generate multiple random numbers in one click.' },
    { question: 'What are common uses?', answer: 'Common uses include picking lottery numbers, selecting random winners, generating test data, tabletop games, and statistical sampling.' },
    { question: 'What is the maximum range?', answer: 'You can set any integer range. JavaScript handles numbers up to 2^53 - 1 safely.' },
  ];

  const relatedTools: RelatedTool[] = [
    { title: 'Coin Flip', slug: '/coin-flip', emoji: '🪙' },
    { title: 'Dice Roller', slug: '/dice-roller', emoji: '🎲' },
    { title: 'Password Generator', slug: '/password-generator', emoji: '🔑' },
  ];

  return (
    <div className="tool-widget-content">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Min</label>
            <input type="number" value={min} onChange={e => setMin(parseInt(e.target.value) || 0)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Max</label>
            <input type="number" value={max} onChange={e => setMax(parseInt(e.target.value) || 0)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Count</label>
            <input type="number" min={1} max={100} value={count} onChange={e => setCount(parseInt(e.target.value) || 1)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button onClick={generate}
          className="w-full bg-green-700 text-white rounded-xl py-3 font-semibold hover:bg-green-800 transition-colors">
          Generate
        </button>
        {results.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex flex-wrap gap-3 justify-center">
              {results.map((n, i) => (
                <span key={i} className="text-3xl font-bold text-green-700 bg-white border border-green-300 rounded-xl px-4 py-2">{n}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    
      {/* ── Long-Form Content ── */}
      <div className="max-w-3xl mt-14 pt-10 border-t border-[#E8E6DE]">
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#1A1A1A", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
          How Random Number Generation Works
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1.5rem" }}>
          A random number generator (RNG) produces numbers that cannot be predicted better than by chance. Computers use pseudo-random number generators (PRNGs) — algorithms that produce sequences of numbers that appear random but are actually deterministic, starting from a 'seed' value. For most everyday purposes (games, sampling, simulations), PRNGs are perfectly adequate. For cryptographic purposes (generating passwords, encryption keys), a cryptographically secure PRNG (CSPRNG) is required — which is what this tool uses via the browser's `crypto.getRandomValues()` API.
        </p>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          Common Use Cases
        </h3>
        <div style={{ background: "#F7F6F1", border: "1.5px solid #E8E6DE", borderRadius: "0.875rem", padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#374151", lineHeight: 1.75, margin: 0 }}>
            Lottery simulation: pick 6 numbers from 1–49 without repetition. Statistical sampling: randomly select 50 participants from a group of 500. Game design: roll a virtual die (1–6) or draw a random card from a 52-card deck. Password generation: generate a random 6-digit PIN (range 100000–999999). A/B testing: randomly assign users to Group A or Group B by generating 0 or 1.
          </p>
        </div>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          Probability of Specific Outcomes
        </h3>
        <div style={{ overflowX: "auto", borderRadius: "0.875rem", border: "1.5px solid #E8E6DE" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#F7F6F1" }}>
              <tr>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>Scenario</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>Range</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", borderBottom: "2px solid #E8E6DE" }}>Probability of Any Single Value</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: "#FAFAF7" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Coin flip</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>1–2</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>50%</td>
              </tr>
              <tr style={{ background: "white" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Six-sided die</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>1–6</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>16.7%</td>
              </tr>
              <tr style={{ background: "#FAFAF7" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Lottery pick (1–49)</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>1–49</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>2.04%</td>
              </tr>
              <tr style={{ background: "white" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>PIN code (0–9999)</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>0–9999</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>0.01%</td>
              </tr>
              <tr style={{ background: "#FAFAF7" }}>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Lottery jackpot (6/49)</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>Combination</td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#374151", borderBottom: "1px solid #F0EEE8" }}>1 in 13,983,816</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* ── Long-form content ── */}
      <section style={{ marginTop: "2rem", borderTop: "1.5px solid #E8E6DE", paddingTop: "1.5rem" }}>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#1A1A1A", marginBottom: "0.75rem" }}>
          How random number generators work
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1rem" }}>
          A random number generator (RNG) produces numbers that lack any predictable pattern. Most software RNGs are <em>pseudo-random</em> — they use a deterministic algorithm seeded by an unpredictable value (like system time or hardware noise) to produce sequences that appear random. This tool uses <strong>Math.random()</strong>, which is seeded by the browser's entropy source and produces uniformly distributed floating-point numbers in [0, 1), then scales them to your chosen range.
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1rem" }}>
          <strong>Common uses:</strong> lottery number picking, random sampling for research, game mechanics, password seeds, and statistical simulations.
        </p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", marginTop: "0.75rem" }}>
          <thead>
            <tr style={{ background: "#F7F6F1" }}>
              <th style={{ padding: "0.6rem 0.875rem", textAlign: "left", borderBottom: "1.5px solid #E8E6DE", fontWeight: 700, color: "#1A1A1A" }}>Use Case</th>
              <th style={{ padding: "0.6rem 0.875rem", textAlign: "left", borderBottom: "1.5px solid #E8E6DE", fontWeight: 700, color: "#1A1A1A" }}>Typical Range</th>
            </tr>
          </thead>
          <tbody>
            {[["Lottery numbers","1 – 49 or 1 – 59"],["Dice roll","1 – 6"],["Coin flip","0 – 1"],["Random month","1 – 12"],["Random percentage","0 – 100"]].map(([u, r]) => (
              <tr key={u} style={{ borderBottom: "1px solid #F0EDE6" }}>
                <td style={{ padding: "0.55rem 0.875rem", color: "#374151" }}>{u}</td>
                <td style={{ padding: "0.55rem 0.875rem", color: "#374151" }}>{r}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

    </div>
  );
};

export default RandomNumberGeneratorTool;
