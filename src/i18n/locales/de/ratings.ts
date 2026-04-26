/**
 * en/ratings.ts — Ratings & reviews widget strings.
 */
const ratings = {
  title: "Bewertungen & Rezensionen",
  averageLabel: "von 5",
  ratingCount: "{count} Bewertung",
  ratingCountPlural: "{count} Bewertungen",
  noRatings: "Noch keine Bewertungen. Sei der Erste!",
  yourRating: "Ihre Bewertung",
  reviewPlaceholder: "Eine Rezension schreiben (optional)…",
  submitButton: "Bewertung abschicken",
  updateButton: "Bewertung aktualisieren",
  submitting: "Speichern…",
  successMessage: "Vielen Dank für Ihre Bewertung!",
  errorMessage: "Bewertung konnte nicht gespeichert werden. Bitte versuchen Sie es erneut.",
  signInPrompt: "Melden Sie sich an, um dieses Tool zu bewerten",
  signInButton: "Anmelden",
  signUpButton: "Kostenlos registrieren",
  reviewsTitle: "Rezensionen",
  noReviews: "Noch keine Rezensionen.",
  anonymous: "Anonym",
  editButton: "Ihre Rezension bearbeiten",
  stars: {
    1: "Schlecht",
    2: "Mäßig",
    3: "Gut",
    4: "Sehr gut",
    5: "Ausgezeichnet",
  },
} as const;

export default ratings;
