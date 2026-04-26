import { useState } from "react";

const jokeData: Record<string, { setup: string; punchline: string }[]> = {
  "Dad Jokes": [
    { setup: "Why don't scientists trust atoms?", punchline: "Because they make up everything!" },
    { setup: "I'm reading a book about anti-gravity.", punchline: "It's impossible to put down." },
    { setup: "Did you hear about the mathematician who's afraid of negative numbers?", punchline: "He'll stop at nothing to avoid them." },
    { setup: "Why did the scarecrow win an award?", punchline: "Because he was outstanding in his field." },
    { setup: "I used to hate facial hair.", punchline: "But then it grew on me." },
    { setup: "What do you call cheese that isn't yours?", punchline: "Nacho cheese." },
    { setup: "Why can't you give Elsa a balloon?", punchline: "Because she'll let it go." },
    { setup: "I only know 25 letters of the alphabet.", punchline: "I don't know why." },
    { setup: "What do you call a fake noodle?", punchline: "An impasta." },
    { setup: "How do you organize a space party?", punchline: "You planet." },
  ],
  "Puns": [
    { setup: "I'm on a seafood diet.", punchline: "I see food and I eat it." },
    { setup: "Time flies like an arrow.", punchline: "Fruit flies like a banana." },
    { setup: "I used to be a banker.", punchline: "But I lost interest." },
    { setup: "The bicycle couldn't stand on its own.", punchline: "It was two-tired." },
    { setup: "I'm friends with all electricians.", punchline: "We have good current connections." },
    { setup: "A skeleton walks into a bar.", punchline: "Orders a beer and a mop." },
    { setup: "What do you call a sleeping dinosaur?", punchline: "A dino-snore." },
    { setup: "I tried to write a joke about clocks.", punchline: "But it was too time-consuming." },
    { setup: "Why do cows wear bells?", punchline: "Because their horns don't work." },
    { setup: "I got a job at a bakery.", punchline: "I kneaded the dough." },
  ],
  "Tech Jokes": [
    { setup: "Why do programmers prefer dark mode?", punchline: "Because light attracts bugs." },
    { setup: "A SQL query walks into a bar.", punchline: "It walks up to two tables and asks: 'Can I join you?'" },
    { setup: "Why did the developer go broke?", punchline: "Because he used up all his cache." },
    { setup: "How many programmers does it take to change a lightbulb?", punchline: "None — that's a hardware problem." },
    { setup: "Why do Java developers wear glasses?", punchline: "Because they don't C#." },
    { setup: "What's a computer's favorite snack?", punchline: "Microchips." },
    { setup: "Why was the JavaScript developer sad?", punchline: "Because he didn't Node how to Express himself." },
    { setup: "What do you call 8 hobbits?", punchline: "A hobbyte." },
    { setup: "Why did the developer quit his job?", punchline: "He didn't get arrays." },
  ],
  "Animal Jokes": [
    { setup: "What do you call a sleeping bull?", punchline: "A bulldozer." },
    { setup: "Why don't elephants use computers?", punchline: "Because they're afraid of the mouse." },
    { setup: "What do you call a fish without eyes?", punchline: "A fsh." },
    { setup: "Why did the cat sit on the computer?", punchline: "To keep an eye on the mouse." },
    { setup: "What do you call a bear with no teeth?", punchline: "A gummy bear." },
    { setup: "Why do cows go to New York?", punchline: "To see the moo-sicals." },
    { setup: "What do you call a dog magician?", punchline: "A labracadabrador." },
    { setup: "Why don't oysters share?", punchline: "Because they're shellfish." },
    { setup: "What do you call a lazy kangaroo?", punchline: "A pouch potato." },
    { setup: "Why did the duck cross the road?", punchline: "To prove he wasn't chicken." },
  ],
  "Food Jokes": [
    { setup: "Why did the tomato turn red?", punchline: "Because it saw the salad dressing." },
    { setup: "What do you call a stolen yam?", punchline: "A hot potato." },
    { setup: "Why did the banana go to the doctor?", punchline: "Because it wasn't peeling well." },
    { setup: "Why did the cookie go to the doctor?", punchline: "Because it was feeling crummy." },
    { setup: "What do you call a sad strawberry?", punchline: "A blueberry." },
    { setup: "Why did the chef get arrested?", punchline: "For beating an egg." },
    { setup: "What do elves make sandwiches with?", punchline: "Shortbread." },
    { setup: "Why did the pie go to the dentist?", punchline: "To get its filling replaced." },
    { setup: "What's a ghost's favorite dessert?", punchline: "I scream." },
  ],
};

const categories = Object.keys(jokeData);

const faqs: FAQItem[] = [
  { question: "What categories of jokes are available?", answer: "The generator includes Dad Jokes, Puns, Tech Jokes, Animal Jokes, and Food Jokes. Select a category before generating to get jokes from that specific style." },
  { question: "How is the joke selected each time?", answer: "Each click picks a random joke from the selected category's pool. The punchline is hidden until you choose to reveal it, keeping the surprise intact." },
  { question: "Can I copy a joke to share it?", answer: "Yes — after revealing the punchline, a 'Copy joke' button appears that copies both the setup and punchline to your clipboard in one click." },
  { question: "Why is the punchline hidden by default?", answer: "Hiding the punchline lets you read the setup first and guess the answer, which makes the joke funnier. Click 'Reveal punchline' when you're ready." },
  { question: "Are the jokes appropriate for all ages?", answer: "The jokes are family-friendly and suitable for all ages. They are clean, light-hearted, and free of offensive content." },
];

export default function AiJokeGenerator() {
  const [category, setCategory] = useState("Dad Jokes");
  const [joke, setJoke] = useState<{ setup: string; punchline: string } | null>(null);
  const [showPunchline, setShowPunchline] = useState(false);
  const [copied, setCopied] = useState(false);

  function generate() {
    const jokes = jokeData[category];
    const pick = jokes[Math.floor(Math.random() * jokes.length)];
    setJoke(pick);
    setShowPunchline(false);
  }

  function copy() {
    if (!joke) return;
    navigator.clipboard.writeText(`${joke.setup}\n\n${joke.punchline}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="tool-widget-content">
      <div className="space-y-5">
        <div>
          <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#1A1A1A", display: "block", marginBottom: "0.5rem" }}>Category</label>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button key={c} onClick={() => setCategory(c)} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", padding: "0.35rem 0.85rem", borderRadius: "9999px", border: "2px solid", borderColor: category === c ? "#1B6B45" : "#E8E6DE", background: category === c ? "#1B6B45" : "white", color: category === c ? "white" : "#4B5563", cursor: "pointer" }}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <button onClick={generate} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1rem", color: "#1A1A1A", background: "#FFE234", border: "2px solid #1A1A1A", borderRadius: "9999px", padding: "0.65rem 1.75rem", cursor: "pointer" }}>
          Tell me a joke!
        </button>
        {joke && (
          <div style={{ background: "#FFF9E0", borderRadius: "1rem", padding: "1.5rem", border: "2px solid #FFE234" }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#1A1A1A", marginBottom: "1rem", lineHeight: 1.5 }}>{joke.setup}</p>
            {!showPunchline ? (
              <button onClick={() => setShowPunchline(true)} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#B8860B", background: "white", border: "1.5px solid #FFE234", borderRadius: "9999px", padding: "0.4rem 1rem", cursor: "pointer" }}>
                Reveal punchline 👀
              </button>
            ) : (
              <div>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.05rem", color: "#1B6B45", lineHeight: 1.5, marginBottom: "0.75rem" }}>{joke.punchline}</p>
                <div className="flex gap-2">
                  <button onClick={generate} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#4B5563", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "9999px", padding: "0.35rem 0.9rem", cursor: "pointer" }}>
                    Another joke
                  </button>
                  <button onClick={copy} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: copied ? "#1B6B45" : "#4B5563", background: "white", border: "1.5px solid #E8E6DE", borderRadius: "9999px", padding: "0.35rem 0.9rem", cursor: "pointer" }}>
                    {copied ? "✓ Copied!" : "Copy joke"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
