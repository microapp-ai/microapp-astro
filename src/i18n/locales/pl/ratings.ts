/**
 * en/ratings.ts — Ratings & reviews widget strings.
 */
const ratings = {
  title: "Oceny i recenzje",
  averageLabel: "na 5",
  ratingCount: "{count} ocena",
  ratingCountPlural: "{count} oceny",
  noRatings: "Brak ocen. Bądź pierwszy!",
  yourRating: "Twoja ocena",
  reviewPlaceholder: "Napisz recenzję (opcjonalnie)…",
  submitButton: "Prześlij ocenę",
  updateButton: "Zaktualizuj ocenę",
  submitting: "Zapisywanie…",
  successMessage: "Dziękujemy za Twoją ocenę!",
  errorMessage: "Nie udało się zapisać oceny. Spróbuj ponownie.",
  signInPrompt: "Zaloguj się, aby ocenić to narzędzie",
  signInButton: "Zaloguj się",
  signUpButton: "Zarejestruj się za darmo",
  reviewsTitle: "Recenzje",
  noReviews: "Brak recenzji.",
  anonymous: "Anonimowy",
  editButton: "Edytuj swoją recenzję",
  stars: {
    1: "Słabo",
    2: "Dostatecznie",
    3: "Dobrze",
    4: "Bardzo dobrze",
    5: "Doskonale",
  },
} as const;

export default ratings;
