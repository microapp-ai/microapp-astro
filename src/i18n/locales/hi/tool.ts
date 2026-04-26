/**
 * en/tool.ts — Tool page chrome strings.
 * These wrap the dynamic tool metadata (title, intro, faqs) which come from Supabase.
 */
const tool = {
  breadcrumb: {
    home: "होम",
    tools: "टूल्स",
  },
  howTo: {
    title: "कैसे उपयोग करें",
    step: "चरण {n}",
  },
  faq: {
    title: "अक्सर पूछे जाने वाले प्रश्न",
  },
  related: {
    title: "संबंधित टूल्स",
  },
  meta: {
    freeBadge: "मुफ़्त",
    noSignupBadge: "कोई साइनअप नहीं",
    instantBadge: "तत्काल",
  },
  share: {
    button: "शेयर करें",
    copied: "लिंक कॉपी हो गया!",
  },
  feedback: {
    helpful: "क्या यह टूल मददगार था?",
    yes: "हाँ",
    no: "नहीं",
    thanks: "आपकी प्रतिक्रिया के लिए धन्यवाद!",
  },
} as const;

export default tool;
