import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;

const sb = createClient(url, key, { auth: { persistSession: false } });

const tool = {
  slug: "ai-hairstyle-analyzer",
  label: "AI Hairstyle Analyzer",
  desc: "Find your best haircuts and hair colors by face shape",
  category: "writing",
  categoryLabel: "AI Writing",
  categoryHref: "/#writing",
  schemaCategory: "UtilitiesApplication",
  emoji: "💇",
  badge: "New",
  title: "Free AI Hairstyle Analyzer — Best Haircuts & Colors for Your Face Shape",
  description:
    "Upload your photo and get a personalized AI-generated hairstyle report: best haircuts, hair lengths, and hair colors rated for your face shape and hair type.",
  intro:
    "Discover your most flattering hairstyles with our AI Hairstyle Analyzer. Upload a single photo and receive a detailed visual infographic showing the best haircuts, hair lengths, and hair colors for your face shape — complete with ratings from Top Pick to Not Recommended. Powered by advanced AI image generation.",
  howTo: [
    "Upload a clear, front-facing photo with your hair down.",
    "Click \"Generate Hairstyle Analysis\" and wait 30–60 seconds.",
    "View your personalized infographic with rated haircut and hair color options.",
    "Download the report to save or share your hairstyle guide.",
  ],
  keywords: [
    "ai hairstyle analyzer",
    "best haircut for face shape",
    "hair color recommendations ai",
    "face shape hair guide",
    "hairstyle analysis tool",
    "ai hair recommendations",
    "haircut ideas ai",
  ],
  faqs: [
    {
      question: "How does the AI Hairstyle Analyzer work?",
      answer:
        "You upload a photo of yourself and our AI analyzes your face shape and hair type to generate a personalized hairstyle infographic. It shows multiple haircut and hair color options with ratings — from Top Pick to Not Recommended — all tailored to your unique face structure.",
    },
    {
      question: "What hairstyle options will the report show?",
      answer:
        "The report includes a Best Overall hairstyle, several top-rated cuts and lengths, bold or experimental options, and styles to avoid. It also covers hair color variations (highlights, balayage, solid colors) and styling approaches like sleek, waves, and updos — all matched to your face shape.",
    },
    {
      question: "What kind of photo should I upload?",
      answer:
        "Use a clear, well-lit front-facing photo with your hair down and face fully visible. Natural lighting works best. A plain or simple background helps the AI focus on your face and hair. Avoid heavy filters, sunglasses, or extreme angles.",
    },
    {
      question: "How long does it take?",
      answer:
        "The AI typically takes 30–60 seconds to analyze your photo and generate the full visual hairstyle infographic.",
    },
    {
      question: "Is my photo stored or shared?",
      answer:
        "Your photo is processed securely to generate the analysis and is not stored permanently or shared with third parties. The generated report image is saved temporarily so you can download it.",
    },
  ],
  relatedTools: [
    { title: "Color Palette Generator", slug: "/color-palette-generator", emoji: "🎨" },
    { title: "AI Bio Generator", slug: "/ai-bio-generator", emoji: "✍️" },
    { title: "Gradient Generator", slug: "/gradient-generator", emoji: "🌈" },
  ],
  tier: 3,
  isActive: true,
};

const { data, error } = await sb
  .from("tool_metadata")
  .upsert(tool, { onConflict: "slug" })
  .select();

if (error) {
  console.error("❌ Insert failed:", error.message);
  process.exit(1);
} else {
  console.log("✅ Tool inserted/updated:", data?.[0]?.slug);
}
