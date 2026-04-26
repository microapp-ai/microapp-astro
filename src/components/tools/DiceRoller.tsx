/**
 * DiceRoller.tsx — 3D animated dice roller
 *
 * D6 renders as a true CSS 3D cube with pip dot patterns.
 * Other die types (D4, D8, D10, D12, D20, D100) render as stylised
 * polygon faces with the rolled number, since they aren't cubes.
 *
 * Animation: each die tumbles through a random multi-axis rotation
 * before landing on the correct face.
 */

import React, { useState, useRef, useCallback } from "react";
import type { RelatedTool } from "../../lib/types";

// ─── Pip layouts for D6 faces 1–6 ────────────────────────────────────────────
// Each face is a 3×3 grid; true = pip present
const PIPS: Record<number, boolean[][]> = {
  1: [
    [false, false, false],
    [false, true,  false],
    [false, false, false],
  ],
  2: [
    [true,  false, false],
    [false, false, false],
    [false, false, true ],
  ],
  3: [
    [true,  false, false],
    [false, true,  false],
    [false, false, true ],
  ],
  4: [
    [true,  false, true ],
    [false, false, false],
    [true,  false, true ],
  ],
  5: [
    [true,  false, true ],
    [false, true,  false],
    [true,  false, true ],
  ],
  6: [
    [true,  false, true ],
    [true,  false, true ],
    [true,  false, true ],
  ],
};

// ─── CSS rotations that land each D6 face on top ─────────────────────────────
// Face 1 = top, 2 = front, 3 = right, 4 = left, 5 = back, 6 = bottom
const FACE_ROTATIONS: Record<number, string> = {
  1: "rotateX(0deg)   rotateY(0deg)",
  2: "rotateX(-90deg) rotateY(0deg)",
  3: "rotateX(0deg)   rotateY(-90deg)",
  4: "rotateX(0deg)   rotateY(90deg)",
  5: "rotateX(90deg)  rotateY(0deg)",
  6: "rotateX(180deg) rotateY(0deg)",
};

// ─── PipFace component ────────────────────────────────────────────────────────
function PipFace({ value, isTop }: { value: number; isTop: boolean }) {
  const grid = PIPS[value] ?? PIPS[1];
  return (
    <div
      className="grid gap-[6px] p-[10px]"
      style={{ gridTemplateColumns: "repeat(3, 1fr)", width: "100%", height: "100%" }}
    >
      {grid.flat().map((show, i) => (
        <div key={i} className="flex items-center justify-center">
          {show && (
            <div
              className="rounded-full"
              style={{
                width: "22%",
                aspectRatio: "1",
                background: isTop ? "#1B6B45" : "#374151",
                boxShadow: isTop
                  ? "inset 0 1px 2px rgba(0,0,0,0.4)"
                  : "inset 0 1px 2px rgba(0,0,0,0.3)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── D6Cube component ─────────────────────────────────────────────────────────
interface D6CubeProps {
  value: number;       // 1–6
  rolling: boolean;
  rollId: number;      // increments each roll to restart animation
}

function D6Cube({ value, rolling, rollId }: D6CubeProps) {
  // Random tumble offset so each die looks different
  const tumbleRef = useRef(`rotateX(${Math.floor(Math.random() * 4) * 90 + 360}deg) rotateY(${Math.floor(Math.random() * 4) * 90 + 360}deg) rotateZ(${Math.floor(Math.random() * 4) * 90}deg)`);

  // Recompute tumble on each new roll
  if (!rolling) {
    // keep last tumble
  }

  const finalRotation = FACE_ROTATIONS[value] ?? FACE_ROTATIONS[1];
  const size = 100; // px

  const faceStyle = (transform: string): React.CSSProperties => ({
    position: "absolute",
    width: size,
    height: size,
    border: "2px solid rgba(0,0,0,0.12)",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
    transform,
  });

  const faces = [
    // face 1 — top
    { v: 1, transform: `rotateX(90deg) translateZ(${size / 2}px)`,  bg: "#FAFAF7" },
    // face 2 — front
    { v: 2, transform: `translateZ(${size / 2}px)`,                  bg: "#F5F3EE" },
    // face 3 — right
    { v: 3, transform: `rotateY(90deg) translateZ(${size / 2}px)`,   bg: "#F5F3EE" },
    // face 4 — left
    { v: 4, transform: `rotateY(-90deg) translateZ(${size / 2}px)`,  bg: "#F5F3EE" },
    // face 5 — back
    { v: 5, transform: `rotateY(180deg) translateZ(${size / 2}px)`,  bg: "#F5F3EE" },
    // face 6 — bottom
    { v: 6, transform: `rotateX(-90deg) translateZ(${size / 2}px)`,  bg: "#F5F3EE" },
  ];

  return (
    <div
      style={{
        width: size,
        height: size,
        perspective: 400,
        perspectiveOrigin: "50% 50%",
      }}
    >
      <div
        key={rollId}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transform: rolling ? tumbleRef.current : finalRotation,
          transition: rolling
            ? "transform 0.15s ease-in"
            : "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
          animation: rolling ? `diceRoll 0.6s ease-in-out` : "none",
        }}
      >
        {faces.map(({ v, transform, bg }) => (
          <div
            key={v}
            style={{
              ...faceStyle(transform),
              background: bg,
              boxShadow:
                v === 1
                  ? "0 4px 16px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.9)"
                  : "inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
          >
            <PipFace value={v} isTop={v === value} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes diceRoll {
          0%   { transform: rotateX(0deg) rotateY(0deg); }
          25%  { transform: rotateX(180deg) rotateY(90deg) rotateZ(45deg); }
          50%  { transform: rotateX(360deg) rotateY(180deg) rotateZ(90deg); }
          75%  { transform: rotateX(540deg) rotateY(270deg) rotateZ(135deg); }
          100% { transform: ${finalRotation}; }
        }
      `}</style>
    </div>
  );
}

// ─── PolygonDie — for non-cube dice (D4, D8, D10, D12, D20, D100) ─────────────
const POLYGON_SHAPES: Record<number, { sides: number; label: string; color: string; textColor: string }> = {
  4:   { sides: 3,  label: "D4",   color: "#7C3AED", textColor: "#fff" },
  8:   { sides: 8,  label: "D8",   color: "#2563EB", textColor: "#fff" },
  10:  { sides: 10, label: "D10",  color: "#0891B2", textColor: "#fff" },
  12:  { sides: 12, label: "D12",  color: "#D97706", textColor: "#fff" },
  20:  { sides: 20, label: "D20",  color: "#DC2626", textColor: "#fff" },
  100: { sides: 10, label: "D100", color: "#374151", textColor: "#fff" },
};

function polygonPoints(sides: number, cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
    pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
  }
  return pts.join(" ");
}

interface PolygonDieProps {
  die: number;
  value: number;
  rolling: boolean;
  rollId: number;
}

function PolygonDie({ die, value, rolling, rollId }: PolygonDieProps) {
  const shape = POLYGON_SHAPES[die] ?? POLYGON_SHAPES[20];
  const size = 100;
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.44;

  return (
    <div
      style={{ width: size, height: size, position: "relative" }}
      key={rollId}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.18))",
          animation: rolling ? "polygonRoll 0.6s ease-in-out" : "none",
        }}
      >
        <defs>
          <radialGradient id={`grad-${die}`} cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
          </radialGradient>
        </defs>
        <polygon
          points={polygonPoints(shape.sides, cx, cy, r)}
          fill={shape.color}
          stroke="rgba(0,0,0,0.2)"
          strokeWidth="1.5"
        />
        <polygon
          points={polygonPoints(shape.sides, cx, cy, r)}
          fill={`url(#grad-${die})`}
        />
        <text
          x={cx}
          y={cy + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={shape.textColor}
          fontSize={value >= 100 ? 18 : value >= 10 ? 22 : 28}
          fontWeight="800"
          fontFamily="system-ui, sans-serif"
          style={{ userSelect: "none" }}
        >
          {rolling ? "?" : value}
        </text>
      </svg>

      {/* Die label badge */}
      <div
        style={{
          position: "absolute",
          bottom: -6,
          left: "50%",
          transform: "translateX(-50%)",
          background: shape.color,
          color: shape.textColor,
          fontSize: 10,
          fontWeight: 700,
          padding: "1px 6px",
          borderRadius: 99,
          letterSpacing: "0.05em",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}
      >
        {shape.label}
      </div>

      <style>{`
        @keyframes polygonRoll {
          0%   { transform: rotate(0deg) scale(1); }
          20%  { transform: rotate(72deg) scale(0.85); }
          40%  { transform: rotate(144deg) scale(1.1); }
          60%  { transform: rotate(216deg) scale(0.9); }
          80%  { transform: rotate(288deg) scale(1.05); }
          100% { transform: rotate(360deg) scale(1); }
        }
      `}</style>
    </div>
  );
}

// ─── DiceEntry — one die slot with quantity ───────────────────────────────────
interface DiceEntry {
  die: number;
  qty: number;
}

// ─── DiceRoller page ──────────────────────────────────────────────────────────
interface RollResult {
  die: number;
  values: number[];
  rollId: number;
}

const AVAILABLE_DICE = [4, 6, 8, 10, 12, 20, 100];

const DiceRoller: React.FC = () => {
  const [diceEntries, setDiceEntries] = useState<DiceEntry[]>([{ die: 6, qty: 1 }]);
  const [results, setResults] = useState<RollResult[]>([]);
  const [rolling, setRolling] = useState(false);
  const [rollCounter, setRollCounter] = useState(0);

  const addDie = (die: number) => {
    setDiceEntries((prev) => {
      const existing = prev.find((e) => e.die === die);
      if (existing) {
        return prev.map((e) => (e.die === die ? { ...e, qty: Math.min(e.qty + 1, 10) } : e));
      }
      return [...prev, { die, qty: 1 }];
    });
  };

  const setQty = (die: number, qty: number) => {
    if (qty <= 0) {
      setDiceEntries((prev) => prev.filter((e) => e.die !== die));
    } else {
      setDiceEntries((prev) =>
        prev.map((e) => (e.die === die ? { ...e, qty: Math.min(qty, 10) } : e))
      );
    }
  };

  const rollAll = useCallback(() => {
    if (rolling || diceEntries.length === 0) return;
    setRolling(true);
    setRollCounter((c) => c + 1);

    setTimeout(() => {
      const newResults: RollResult[] = diceEntries.map((entry) => ({
        die: entry.die,
        values: Array.from({ length: entry.qty }, () => Math.floor(Math.random() * entry.die) + 1),
        rollId: Date.now() + entry.die,
      }));
      setResults(newResults);
      setRolling(false);
    }, 700);
  }, [rolling, diceEntries]);

  const total = results.flatMap((r) => r.values).reduce((s, v) => s + v, 0);
  const hasResults = results.length > 0;

  const faqs: FAQItem[] = [
    {
      question: "What is a virtual dice roller?",
      answer:
        "A virtual dice roller simulates the rolling of physical dice. It's useful for board games, tabletop RPGs, or any situation where you need random numbers without physical dice.",
    },
    {
      question: "How do I roll multiple dice at once?",
      answer:
        "Click any die button to add it to your roll. Use the + / − buttons to set the quantity (up to 10 of each type). Then click Roll to throw them all simultaneously.",
    },
    {
      question: "What dice types are supported?",
      answer:
        "D4, D6, D8, D10, D12, D20, and D100 (percentile). The D6 renders as a realistic 3D cube with pip dots; other types show a stylised polygon face.",
    },
    {
      question: "Is the roll truly random?",
      answer:
        "Each roll uses JavaScript's Math.random(), which is a pseudo-random number generator — sufficiently random for all gaming and casual use.",
    },
    {
      question: "Can I roll different dice types together?",
      answer:
        "Yes. Add any combination of dice types and quantities. The total across all dice is shown at the bottom.",
    },
  ];

  const relatedTools: RelatedTool[] = [
    { title: "Random Number Generator", slug: "/random-number-generator", emoji: "🔢" },
    { title: "Coin Flip",               slug: "/coin-flip",               emoji: "🪙" },
    { title: "Random Name Picker",      slug: "/random-state-generator",  emoji: "👤" },
  ];

  return (
    <div className="tool-widget-content">
      <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">

        {/* ── Die selector ── */}
        <div className="w-full p-5 bg-white rounded-2xl shadow-sm border border-[#E8E6DE]">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Add dice to your roll
          </p>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_DICE.map((die) => {
              const entry = diceEntries.find((e) => e.die === die);
              const active = !!entry;
              return (
                <button
                  key={die}
                  onClick={() => addDie(die)}
                  className={`px-4 py-2 rounded-xl font-bold text-sm border-2 transition-all duration-150 select-none ${
                    active
                      ? "bg-[#1B6B45] text-white border-[#1B6B45] shadow-md scale-105"
                      : "bg-white text-gray-700 border-gray-300 hover:border-[#1B6B45] hover:text-[#1B6B45]"
                  }`}
                >
                  D{die}
                </button>
              );
            })}
          </div>

          {/* Qty controls for selected dice */}
          {diceEntries.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {diceEntries.map((entry) => (
                <div
                  key={entry.die}
                  className="flex items-center gap-1.5 bg-[#F5F3EE] border border-[#E8E6DE] rounded-xl px-3 py-1.5"
                >
                  <span className="text-sm font-bold text-[#1B6B45] w-10">D{entry.die}</span>
                  <button
                    onClick={() => setQty(entry.die, entry.qty - 1)}
                    className="w-6 h-6 rounded-full bg-white border border-gray-300 text-gray-600 font-bold text-base leading-none flex items-center justify-center hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
                  >
                    −
                  </button>
                  <span className="text-sm font-bold text-gray-800 w-5 text-center">{entry.qty}</span>
                  <button
                    onClick={() => setQty(entry.die, entry.qty + 1)}
                    disabled={entry.qty >= 10}
                    className="w-6 h-6 rounded-full bg-white border border-gray-300 text-gray-600 font-bold text-base leading-none flex items-center justify-center hover:bg-green-50 hover:border-green-400 hover:text-green-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Roll button ── */}
        <button
          onClick={rollAll}
          disabled={diceEntries.length === 0 || rolling}
          className={`w-full py-4 rounded-2xl text-lg font-extrabold tracking-wide transition-all duration-200 shadow-md ${
            diceEntries.length === 0 || rolling
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[#F5C518] hover:bg-[#EDB800] text-gray-900 hover:scale-[1.02] active:scale-[0.98]"
          }`}
        >
          {rolling ? "Rolling…" : "🎲 Roll Dice"}
        </button>

        {/* ── Dice display ── */}
        {(hasResults || rolling) && (
          <div className="w-full p-6 bg-white rounded-2xl shadow-sm border border-[#E8E6DE]">
            <div className="flex flex-wrap gap-10 justify-center">
              {(hasResults ? results : diceEntries.map((e) => ({ die: e.die, values: Array(e.qty).fill(1), rollId: 0 }))).map(
                (group) =>
                  group.values.map((val, idx) => (
                    <div key={`${group.die}-${idx}`} className="flex flex-col items-center gap-3 pt-2">
                      {group.die === 6 ? (
                        <D6Cube
                          value={val}
                          rolling={rolling}
                          rollId={rollCounter * 100 + idx}
                        />
                      ) : (
                        <PolygonDie
                          die={group.die}
                          value={val}
                          rolling={rolling}
                          rollId={rollCounter * 100 + idx}
                        />
                      )}
                      {!rolling && (
                        <span className="text-2xl font-extrabold text-[#1B6B45]">{val}</span>
                      )}
                    </div>
                  ))
              )}
            </div>

            {/* Total */}
            {hasResults && !rolling && (
              <div className="mt-6 pt-4 border-t border-[#E8E6DE] text-center">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total</span>
                <div className="text-4xl font-extrabold text-[#1B6B45] mt-1">{total}</div>
                {results.length > 1 && (
                  <div className="text-xs text-gray-400 mt-1">
                    {results.map((r) => `D${r.die}: ${r.values.join(", ")}`).join(" · ")}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiceRoller;
