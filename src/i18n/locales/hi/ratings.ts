/**
 * en/ratings.ts — Ratings & reviews widget strings.
 */
const ratings = {
  title: "रेटिंग और समीक्षाएं",
  averageLabel: "5 में से",
  ratingCount: "{count} रेटिंग",
  ratingCountPlural: "{count} रेटिंग",
  noRatings: "अभी तक कोई रेटिंग नहीं है। पहले आप बनें!",
  yourRating: "आपकी रेटिंग",
  reviewPlaceholder: "एक समीक्षा लिखें (वैकल्पिक)…",
  submitButton: "रेटिंग सबमिट करें",
  updateButton: "रेटिंग अपडेट करें",
  submitting: "सहेजा जा रहा है…",
  successMessage: "आपकी रेटिंग के लिए धन्यवाद!",
  errorMessage: "रेटिंग सहेजने में विफल। कृपया पुनः प्रयास करें।",
  signInPrompt: "इस टूल को रेट करने के लिए साइन इन करें",
  signInButton: "साइन इन करें",
  signUpButton: "मुफ्त में साइन अप करें",
  reviewsTitle: "समीक्षाएं",
  noReviews: "अभी तक कोई समीक्षा नहीं है।",
  anonymous: "गुमनाम",
  editButton: "अपनी समीक्षा संपादित करें",
  stars: {
    1: "खराब",
    2: "ठीक",
    3: "अच्छा",
    4: "बहुत अच्छा",
    5: "उत्कृष्ट",
  },
} as const;

export default ratings;
