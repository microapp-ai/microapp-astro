import React, { useState, useRef } from 'react';

const FACE_SHAPES = ['Oval', 'Round', 'Square', 'Heart', 'Diamond', 'Oblong'];
const HAIR_TYPES = ['Straight', 'Wavy', 'Curly', 'Coily'];

interface HaircutSuggestion {
  name: string;
  rating: '⭐ Top Pick' | '✅ Great' | '👍 Good' | '⚠️ Okay' | '❌ Avoid';
  reason: string;
}

const SUGGESTIONS: Record<string, Record<string, HaircutSuggestion[]>> = {
  Oval: {
    Straight: [
      { name: 'Blunt Bob', rating: '⭐ Top Pick', reason: 'Oval faces suit almost any cut — a blunt bob highlights your balanced proportions.' },
      { name: 'Long Layers', rating: '✅ Great', reason: 'Long layers add movement and frame the face beautifully.' },
      { name: 'Pixie Cut', rating: '✅ Great', reason: 'Oval faces carry short cuts effortlessly.' },
      { name: 'Curtain Bangs', rating: '👍 Good', reason: 'Soft curtain bangs add a trendy touch without disrupting balance.' },
      { name: 'Buzz Cut', rating: '⚠️ Okay', reason: 'Works but may feel too minimal for some styles.' },
    ],
    Wavy: [
      { name: 'Shag Cut', rating: '⭐ Top Pick', reason: 'Wavy texture + shag layers = effortless, lived-in style.' },
      { name: 'Lob (Long Bob)', rating: '✅ Great', reason: 'The lob lets waves shine without overwhelming the face.' },
      { name: 'Curtain Bangs', rating: '✅ Great', reason: 'Wavy curtain bangs are extremely flattering on oval faces.' },
      { name: 'Blunt Bob', rating: '👍 Good', reason: 'Blunt ends with waves add structure.' },
      { name: 'Pixie Cut', rating: '⚠️ Okay', reason: 'Wavy pixies can be tricky to style daily.' },
    ],
    Curly: [
      { name: 'Curly Lob', rating: '⭐ Top Pick', reason: 'Curls at lob length frame oval faces perfectly.' },
      { name: 'Wash-and-Go Natural', rating: '✅ Great', reason: 'Embrace your natural curl pattern — oval faces handle volume well.' },
      { name: 'Tapered Cut', rating: '✅ Great', reason: 'Tapered sides with curly top create a modern, polished look.' },
      { name: 'Afro', rating: '👍 Good', reason: 'Full afro adds dramatic volume that oval faces can carry.' },
      { name: 'Tight Ringlet Bob', rating: '👍 Good', reason: 'Defined ringlets at bob length look chic.' },
    ],
    Coily: [
      { name: 'TWA (Teeny Weeny Afro)', rating: '⭐ Top Pick', reason: 'Showcases coil texture beautifully on oval faces.' },
      { name: 'Faux Locs', rating: '✅ Great', reason: 'Length and texture that flatters oval proportions.' },
      { name: 'High Puff', rating: '✅ Great', reason: 'Adds height and frames the face elegantly.' },
      { name: 'Bantu Knots', rating: '👍 Good', reason: 'Stylish and protective, works well on oval faces.' },
      { name: 'Box Braids', rating: '👍 Good', reason: 'Versatile and elongating.' },
    ],
  },
  Round: {
    Straight: [
      { name: 'Long Layers with Side Part', rating: '⭐ Top Pick', reason: 'Length and a side part create the illusion of a slimmer, longer face.' },
      { name: 'High Ponytail', rating: '✅ Great', reason: 'Pulls hair up to elongate the face visually.' },
      { name: 'Lob with Volume on Top', rating: '✅ Great', reason: 'Volume at the crown elongates round faces.' },
      { name: 'Blunt Bob', rating: '⚠️ Okay', reason: 'Can emphasize roundness — add layers to soften.' },
      { name: 'Chin-Length Bob', rating: '❌ Avoid', reason: 'Ends at the widest point of a round face, making it appear wider.' },
    ],
    Wavy: [
      { name: 'Long Waves with Center Part', rating: '⭐ Top Pick', reason: 'Length and waves elongate and slim a round face.' },
      { name: 'Asymmetrical Lob', rating: '✅ Great', reason: 'Asymmetry breaks the roundness and adds visual interest.' },
      { name: 'Layered Shag', rating: '✅ Great', reason: 'Layers add height and reduce width perception.' },
      { name: 'Blunt Bob', rating: '⚠️ Okay', reason: 'Adds width — use only with strong cheekbones.' },
      { name: 'Chin Bob', rating: '❌ Avoid', reason: 'Emphasizes the widest part of a round face.' },
    ],
    Curly: [
      { name: 'High-Volume Curls (Crown Focus)', rating: '⭐ Top Pick', reason: 'Volume at the top elongates; keep sides tighter.' },
      { name: 'Long Curly Layers', rating: '✅ Great', reason: 'Length and layers slim the face.' },
      { name: 'Side-Swept Curls', rating: '✅ Great', reason: 'Asymmetry and movement reduce roundness.' },
      { name: 'Full Round Afro', rating: '⚠️ Okay', reason: 'Adds width on all sides — works best with very defined features.' },
      { name: 'Tight Chin-Length Curls', rating: '❌ Avoid', reason: 'Ends at the widest point and adds width.' },
    ],
    Coily: [
      { name: 'Elongated Puff with Height', rating: '⭐ Top Pick', reason: 'Vertical volume elongates round faces.' },
      { name: 'Stretched Twist-Out', rating: '✅ Great', reason: 'Stretched styles add length and reduce width.' },
      { name: 'Long Box Braids', rating: '✅ Great', reason: 'Length creates an elongating effect.' },
      { name: 'Wide Afro', rating: '⚠️ Okay', reason: 'Adds horizontal volume — pair with strong makeup.' },
      { name: 'Short Coily Bob', rating: '❌ Avoid', reason: 'Emphasizes roundness.' },
    ],
  },
  Square: {
    Straight: [
      { name: 'Soft Layers with Side-Swept Bangs', rating: '⭐ Top Pick', reason: 'Softens the angular jawline and adds femininity.' },
      { name: 'Long Waves', rating: '✅ Great', reason: 'Length and movement soften square angles.' },
      { name: 'Curtain Bangs', rating: '✅ Great', reason: 'Curved bangs contrast with angular features.' },
      { name: 'Blunt Bob', rating: '⚠️ Okay', reason: 'Can emphasize the jaw — add texture to soften.' },
      { name: 'Jaw-Length Blunt Bob', rating: '❌ Avoid', reason: 'Ends exactly at the jaw, making it appear more square.' },
    ],
    Wavy: [
      { name: 'Long Wavy Layers', rating: '⭐ Top Pick', reason: 'Waves soften square angles beautifully.' },
      { name: 'Wavy Shag with Curtain Bangs', rating: '✅ Great', reason: 'Soft texture and curved bangs balance a strong jaw.' },
      { name: 'Lob with Waves', rating: '✅ Great', reason: 'Movement at the ends softens the jawline.' },
      { name: 'Straight Blunt Bob', rating: '⚠️ Okay', reason: 'Too structured for square faces without softening elements.' },
      { name: 'Jaw Bob', rating: '❌ Avoid', reason: 'Highlights the jaw angle.' },
    ],
    Curly: [
      { name: 'Soft Curly Layers', rating: '⭐ Top Pick', reason: 'Curls naturally soften angular features.' },
      { name: 'Curly Lob', rating: '✅ Great', reason: 'Length past the jaw with curls reduces squareness.' },
      { name: 'Loose Curls with Volume on Top', rating: '✅ Great', reason: 'Draws attention upward, away from the jaw.' },
      { name: 'Tight Jaw-Length Curls', rating: '⚠️ Okay', reason: 'Can work but may emphasize jaw width.' },
      { name: 'Blunt Chin Bob', rating: '❌ Avoid', reason: 'Ends at the jaw and adds width.' },
    ],
    Coily: [
      { name: 'Tapered Fade with Coily Top', rating: '⭐ Top Pick', reason: 'Height on top and tapered sides soften a square jaw.' },
      { name: 'Twist-Out with Volume on Top', rating: '✅ Great', reason: 'Vertical volume balances square proportions.' },
      { name: 'Long Locs', rating: '✅ Great', reason: 'Length past the jaw softens angular features.' },
      { name: 'Wide Afro', rating: '⚠️ Okay', reason: 'Adds width — use with strong facial features.' },
      { name: 'Short Flat Top', rating: '❌ Avoid', reason: 'Emphasizes the square shape.' },
    ],
  },
  Heart: {
    Straight: [
      { name: 'Chin-Length Bob', rating: '⭐ Top Pick', reason: 'Adds width at the chin to balance a wider forehead.' },
      { name: 'Side-Swept Bangs', rating: '✅ Great', reason: 'Minimizes a wide forehead while adding softness.' },
      { name: 'Lob with Waves', rating: '✅ Great', reason: 'Length and movement balance the face.' },
      { name: 'Short Pixie', rating: '⚠️ Okay', reason: 'Can emphasize a wide forehead without the right styling.' },
      { name: 'Heavy Straight Bangs', rating: '❌ Avoid', reason: 'Draws attention to the wide forehead.' },
    ],
    Wavy: [
      { name: 'Wavy Bob at Chin Length', rating: '⭐ Top Pick', reason: 'Adds width at the chin to balance a heart face.' },
      { name: 'Long Wavy Layers', rating: '✅ Great', reason: 'Length and waves balance the pointed chin.' },
      { name: 'Side-Swept Wavy Bangs', rating: '✅ Great', reason: 'Softens the forehead without adding width there.' },
      { name: 'Blunt Straight Bangs', rating: '❌ Avoid', reason: 'Emphasizes the wide forehead.' },
    ],
    Curly: [
      { name: 'Curly Bob at Chin', rating: '⭐ Top Pick', reason: 'Curls at chin level add width where heart faces need it most.' },
      { name: 'Long Curly Layers', rating: '✅ Great', reason: 'Length and volume at the bottom balance the face.' },
      { name: 'Side Part with Curls', rating: '✅ Great', reason: 'Reduces forehead width visually.' },
      { name: 'Full Curly Bangs', rating: '❌ Avoid', reason: 'Adds volume to the already-wide forehead.' },
    ],
    Coily: [
      { name: 'Puff at Chin Level', rating: '⭐ Top Pick', reason: 'Volume at the chin balances a heart-shaped face.' },
      { name: 'Long Box Braids', rating: '✅ Great', reason: 'Length and volume at the bottom create balance.' },
      { name: 'Low Puff', rating: '✅ Great', reason: 'Keeps volume low to balance the wider forehead.' },
      { name: 'High Puff', rating: '⚠️ Okay', reason: 'Adds height to the forehead — use carefully.' },
      { name: 'Flat Top', rating: '❌ Avoid', reason: 'Widens the already-wide forehead area.' },
    ],
  },
  Diamond: {
    Straight: [
      { name: 'Chin-Length Bob with Volume', rating: '⭐ Top Pick', reason: 'Adds width at the chin to balance narrow jaw and forehead.' },
      { name: 'Side-Swept Bangs', rating: '✅ Great', reason: 'Adds width to the forehead area.' },
      { name: 'Lob', rating: '✅ Great', reason: 'Length and layers balance diamond proportions.' },
      { name: 'Tight Updo', rating: '⚠️ Okay', reason: 'Can emphasize the narrow forehead.' },
      { name: 'Center Part with Slicked Back', rating: '❌ Avoid', reason: 'Exposes narrow forehead and jaw.' },
    ],
    Wavy: [
      { name: 'Wavy Lob with Side Part', rating: '⭐ Top Pick', reason: 'Adds width at the forehead and chin to balance diamond shape.' },
      { name: 'Wavy Shag', rating: '✅ Great', reason: 'Texture and layers add fullness at the forehead and chin.' },
      { name: 'Side-Swept Waves', rating: '✅ Great', reason: 'Adds width where diamond faces need it.' },
      { name: 'Slicked-Back Waves', rating: '❌ Avoid', reason: 'Exposes the narrow forehead.' },
    ],
    Curly: [
      { name: 'Curly Lob with Volume', rating: '⭐ Top Pick', reason: 'Curls add width at forehead and chin to balance diamond shape.' },
      { name: 'Side-Parted Curls', rating: '✅ Great', reason: 'Adds volume to the narrower areas.' },
      { name: 'Full Curly Bob', rating: '✅ Great', reason: 'Volume at chin balances the face.' },
      { name: 'Tight Center-Parted Curls', rating: '⚠️ Okay', reason: 'Can emphasize the narrow forehead.' },
    ],
    Coily: [
      { name: 'Full Afro', rating: '⭐ Top Pick', reason: 'Adds width at forehead and chin, perfectly balancing diamond faces.' },
      { name: 'Twist-Out with Volume', rating: '✅ Great', reason: 'Volume at the sides balances the narrow forehead and jaw.' },
      { name: 'Puff with Bangs', rating: '✅ Great', reason: 'Bangs add width to the forehead.' },
      { name: 'Tight Updo', rating: '⚠️ Okay', reason: 'Exposes the narrow forehead.' },
    ],
  },
  Oblong: {
    Straight: [
      { name: 'Blunt Bob with Bangs', rating: '⭐ Top Pick', reason: 'Bangs reduce face length; bob adds width — perfect for oblong faces.' },
      { name: 'Curtain Bangs', rating: '✅ Great', reason: 'Breaks up the length of an oblong face.' },
      { name: 'Shoulder-Length with Layers', rating: '✅ Great', reason: 'Adds width and reduces the appearance of length.' },
      { name: 'Very Long Straight Hair', rating: '❌ Avoid', reason: 'Elongates an already long face further.' },
    ],
    Wavy: [
      { name: 'Wavy Bob with Bangs', rating: '⭐ Top Pick', reason: 'Width and bangs shorten an oblong face.' },
      { name: 'Shoulder-Length Waves', rating: '✅ Great', reason: 'Waves add width and reduce length perception.' },
      { name: 'Wavy Curtain Bangs', rating: '✅ Great', reason: 'Soft bangs break up the length.' },
      { name: 'Long Straight Waves', rating: '❌ Avoid', reason: 'Elongates the face.' },
    ],
    Curly: [
      { name: 'Curly Bob with Bangs', rating: '⭐ Top Pick', reason: 'Volume at the sides and bangs balance an oblong face.' },
      { name: 'Full Curly Bangs', rating: '✅ Great', reason: 'Reduces the appearance of face length.' },
      { name: 'Shoulder-Length Curls', rating: '✅ Great', reason: 'Width from curls balances oblong proportions.' },
      { name: 'Long Stretched Curls', rating: '❌ Avoid', reason: 'Elongates the face.' },
    ],
    Coily: [
      { name: 'Wide Afro with Bangs', rating: '⭐ Top Pick', reason: 'Width and bangs perfectly balance an oblong face.' },
      { name: 'Puff with Fringe', rating: '✅ Great', reason: 'Fringe reduces face length visually.' },
      { name: 'Flat Top', rating: '✅ Great', reason: 'Adds width without adding height.' },
      { name: 'Long Locs', rating: '⚠️ Okay', reason: 'Can elongate — keep them styled to the sides.' },
      { name: 'High Puff', rating: '❌ Avoid', reason: 'Adds height to an already long face.' },
    ],
  },
};

const RATING_COLORS: Record<string, string> = {
  '⭐ Top Pick': '#15803d',
  '✅ Great': '#16a34a',
  '👍 Good': '#2563eb',
  '⚠️ Okay': '#d97706',
  '❌ Avoid': '#dc2626',
};

const AiHairstyleAnalyzer: React.FC = () => {
  const [faceShape, setFaceShape] = useState('');
  const [hairType, setHairType] = useState('');
  const [results, setResults] = useState<HaircutSuggestion[] | null>(null);
  const [analyzed, setAnalyzed] = useState(false);

  const analyze = () => {
    if (!faceShape || !hairType) return;
    const suggestions = SUGGESTIONS[faceShape]?.[hairType] ?? [];
    setResults(suggestions);
    setAnalyzed(true);
  };

  const reset = () => {
    setFaceShape('');
    setHairType('');
    setResults(null);
    setAnalyzed(false);
  };

  return (
    <div className="tool-widget-content">
      <div className="flex flex-col space-y-5">
        {!analyzed ? (
          <>
            <p className="text-sm text-gray-600">
              Select your face shape and hair type to get personalized haircut and hairstyle recommendations.
            </p>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Face Shape</label>
              <div className="grid grid-cols-3 gap-2">
                {FACE_SHAPES.map((shape) => (
                  <button
                    key={shape}
                    onClick={() => setFaceShape(shape)}
                    className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                      faceShape === shape
                        ? 'bg-green-700 text-white border-green-700'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Hair Type</label>
              <div className="grid grid-cols-2 gap-2">
                {HAIR_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => setHairType(type)}
                    className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                      hairType === type
                        ? 'bg-green-700 text-white border-green-700'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={analyze}
              disabled={!faceShape || !hairType}
              className="w-full py-3 px-4 rounded-lg bg-green-700 text-white font-semibold text-base hover:bg-green-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Analyze My Hairstyle Options
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-800">
                  Results for <span className="text-green-700">{faceShape} Face</span> · <span className="text-green-700">{hairType} Hair</span>
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">Haircuts ranked from best to avoid</p>
              </div>
              <button
                onClick={reset}
                className="text-sm text-green-700 hover:underline font-medium"
              >
                ← Start Over
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {results && results.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-white"
                  style={{ borderColor: '#E8E6DE' }}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <span
                      className="inline-block text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: RATING_COLORS[item.rating] + '18',
                        color: RATING_COLORS[item.rating],
                        border: `1px solid ${RATING_COLORS[item.rating]}40`,
                      }}
                    >
                      {item.rating}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.reason}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-xs text-gray-400 text-center pt-1">
              These are general style guidelines. Your unique features may suit different cuts — consult a stylist for personalized advice.
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AiHairstyleAnalyzer;
