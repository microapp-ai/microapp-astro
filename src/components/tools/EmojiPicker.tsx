import { useState } from "react";

export default function EmojiPicker() {

  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState("");

  const EMOJIS = [
    {e:"😀",n:"grinning face"},  {e:"😂",n:"face with tears of joy"}, {e:"🤣",n:"rolling on the floor laughing"},
    {e:"😍",n:"smiling face with heart eyes"}, {e:"🥰",n:"smiling face with hearts"}, {e:"😎",n:"smiling face with sunglasses"},
    {e:"🤔",n:"thinking face"}, {e:"😴",n:"sleeping face"}, {e:"😭",n:"loudly crying face"}, {e:"😡",n:"pouting face"},
    {e:"👍",n:"thumbs up"}, {e:"👎",n:"thumbs down"}, {e:"👏",n:"clapping hands"}, {e:"🙌",n:"raising hands"},
    {e:"🔥",n:"fire"}, {e:"💯",n:"hundred points"}, {e:"✅",n:"check mark"}, {e:"❌",n:"cross mark"},
    {e:"⭐",n:"star"}, {e:"🌟",n:"glowing star"}, {e:"💡",n:"light bulb"}, {e:"🎉",n:"party popper"},
    {e:"🎊",n:"confetti ball"}, {e:"🏆",n:"trophy"}, {e:"🥇",n:"first place medal"}, {e:"🎯",n:"bullseye"},
    {e:"❤️",n:"red heart"}, {e:"💙",n:"blue heart"}, {e:"💚",n:"green heart"}, {e:"💛",n:"yellow heart"},
    {e:"🐶",n:"dog"}, {e:"🐱",n:"cat"}, {e:"🐭",n:"mouse"}, {e:"🐸",n:"frog"}, {e:"🦊",n:"fox"},
    {e:"🍕",n:"pizza"}, {e:"🍔",n:"hamburger"}, {e:"🍟",n:"fries"}, {e:"🌮",n:"taco"}, {e:"🍣",n:"sushi"},
    {e:"☕",n:"coffee"}, {e:"🍺",n:"beer"}, {e:"🍷",n:"wine"}, {e:"🥂",n:"champagne"},
    {e:"✈️",n:"airplane"}, {e:"🚀",n:"rocket"}, {e:"🚗",n:"car"}, {e:"🚂",n:"train"}, {e:"🏠",n:"house"},
    {e:"💻",n:"laptop"}, {e:"📱",n:"phone"}, {e:"⌨️",n:"keyboard"}, {e:"🖥️",n:"desktop computer"},
    {e:"📚",n:"books"}, {e:"📝",n:"memo"}, {e:"✏️",n:"pencil"}, {e:"🔍",n:"magnifying glass"},
    {e:"💰",n:"money bag"}, {e:"💳",n:"credit card"}, {e:"📈",n:"chart increasing"}, {e:"📉",n:"chart decreasing"},
    {e:"🌍",n:"earth globe europe africa"}, {e:"🌎",n:"earth globe americas"}, {e:"🌏",n:"earth globe asia australia"},
    {e:"☀️",n:"sun"}, {e:"🌙",n:"crescent moon"}, {e:"⛅",n:"partly cloudy"}, {e:"🌈",n:"rainbow"}, {e:"❄️",n:"snowflake"},
  ];

  const filtered = search ? EMOJIS.filter(e => e.n.includes(search.toLowerCase())) : EMOJIS;

  const copy = (emoji: string) => {
    navigator.clipboard.writeText(emoji);
    setCopied(emoji);
    setTimeout(() => setCopied(""), 1500);
  };

  const faqs: FAQItem[] = [
    {
      question: "How do I search for an emoji?",
      answer: "Type any keyword in the search box — for example 'heart', 'fire', 'laugh', or 'pizza'. The picker filters in real time and shows all matching emojis.",
    },
    {
      question: "Can I use emojis in all apps?",
      answer: "Modern emojis are Unicode characters and work in virtually all apps, websites, and operating systems. Some older systems may show a box instead of the emoji if the font does not include it.",
    },
    {
      question: "What is the difference between 😂 and 🤣?",
      answer: "😂 (Face with Tears of Joy) is the most-used emoji globally. 🤣 (Rolling on the Floor Laughing) conveys even more intense laughter. Both are widely understood.",
    },
  ];

  return (
    <div className="tool-widget-content">

      <div className="space-y-4">
        <input className="tool-input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search emojis... e.g. fire, heart, laugh" />
        <div style={{display:"flex",flexWrap:"wrap",gap:"0.5rem"}}>
          {filtered.map(({e,n}) => (
            <button key={e} onClick={() => copy(e)} title={n}
              style={{fontSize:"1.75rem",background: copied===e ? "#E8F5EE" : "#F7F6F1",border: copied===e ? "1.5px solid #1B6B45" : "1.5px solid #E8E6DE",borderRadius:"0.625rem",width:"52px",height:"52px",cursor:"pointer",transition:"all 0.1s",display:"flex",alignItems:"center",justifyContent:"center"}}>
              {e}
            </button>
          ))}
        </div>
        {filtered.length === 0 && <p style={{color:"#9CA3AF",fontFamily:"'Inter',sans-serif",fontSize:"0.875rem"}}>No emojis found for "{search}"</p>}
        {copied && <div style={{fontFamily:"'Inter',sans-serif",fontSize:"0.875rem",color:"#1B6B45"}}>✓ {copied} copied to clipboard!</div>}
      </div>
    </div>
  );
}
