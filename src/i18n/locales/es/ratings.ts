/**
 * en/ratings.ts — Ratings & reviews widget strings.
 */
const ratings = {
  title: "Calificaciones y Reseñas",
  averageLabel: "de 5",
  ratingCount: "{count} calificación",
  ratingCountPlural: "{count} calificaciones",
  noRatings: "Aún no hay calificaciones. ¡Sé el primero!",
  yourRating: "Tu calificación",
  reviewPlaceholder: "Escribe una reseña (opcional)…",
  submitButton: "Enviar calificación",
  updateButton: "Actualizar calificación",
  submitting: "Guardando…",
  successMessage: "¡Gracias por tu calificación!",
  errorMessage: "No se pudo guardar la calificación. Por favor, inténtalo de nuevo.",
  signInPrompt: "Inicia sesión para calificar esta herramienta",
  signInButton: "Iniciar sesión",
  signUpButton: "Registrarse gratis",
  reviewsTitle: "Reseñas",
  noReviews: "Aún no hay reseñas.",
  anonymous: "Anónimo",
  editButton: "Editar tu reseña",
  stars: {
    1: "Pobre",
    2: "Regular",
    3: "Bueno",
    4: "Muy bueno",
    5: "Excelente",
  },
} as const;

export default ratings;
