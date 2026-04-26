/**
 * en/ratings.ts — Ratings & reviews widget strings.
 */
const ratings = {
  title: "Ratings & Reviews",
  averageLabel: "out of 5",
  ratingCount: "{count} rating",
  ratingCountPlural: "{count} ratings",
  noRatings: "No ratings yet. Be the first!",
  yourRating: "Your rating",
  reviewPlaceholder: "Write a review (optional)…",
  submitButton: "Submit rating",
  updateButton: "Update rating",
  submitting: "Saving…",
  successMessage: "Thanks for your rating!",
  errorMessage: "Failed to save rating. Please try again.",
  signInPrompt: "Sign in to rate this tool",
  signInButton: "Sign in",
  signUpButton: "Sign up free",
  reviewsTitle: "Reviews",
  noReviews: "No reviews yet.",
  anonymous: "Anonymous",
  editButton: "Edit your review",
  stars: {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very good",
    5: "Excellent",
  },
} as const;

export default ratings;
