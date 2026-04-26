/**
 * en/ratings.ts — Ratings & reviews widget strings.
 */
const ratings = {
  title: "Рейтинги и отзывы",
  averageLabel: "из 5",
  ratingCount: "{count} оценка",
  ratingCountPlural: "{count} оценок",
  noRatings: "Пока нет оценок. Будьте первым!",
  yourRating: "Ваша оценка",
  reviewPlaceholder: "Напишите отзыв (необязательно)…",
  submitButton: "Отправить оценку",
  updateButton: "Обновить оценку",
  submitting: "Сохранение…",
  successMessage: "Спасибо за вашу оценку!",
  errorMessage: "Не удалось сохранить оценку. Пожалуйста, попробуйте еще раз.",
  signInPrompt: "Войдите, чтобы оценить этот инструмент",
  signInButton: "Войти",
  signUpButton: "Зарегистрироваться бесплатно",
  reviewsTitle: "Отзывы",
  noReviews: "Пока нет отзывов.",
  anonymous: "Анонимно",
  editButton: "Редактировать ваш отзыв",
  stars: {
    1: "Плохо",
    2: "Удовлетворительно",
    3: "Хорошо",
    4: "Очень хорошо",
    5: "Отлично",
  },
} as const;

export default ratings;
