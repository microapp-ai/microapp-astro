/**
 * en/tool.ts — Tool page chrome strings.
 * These wrap the dynamic tool metadata (title, intro, faqs) which come from Supabase.
 */
const tool = {
  breadcrumb: {
    home: "Inicio",
    tools: "Herramientas",
  },
  howTo: {
    title: "Cómo usar",
    step: "Paso {n}",
  },
  faq: {
    title: "Preguntas frecuentes",
  },
  related: {
    title: "Herramientas relacionadas",
  },
  meta: {
    freeBadge: "Gratis",
    noSignupBadge: "Sin registro",
    instantBadge: "Instantáneo",
  },
  share: {
    button: "Compartir",
    copied: "¡Enlace copiado!",
  },
  feedback: {
    helpful: "¿Fue útil esta herramienta?",
    yes: "Sí",
    no: "No",
    thanks: "¡Gracias por tus comentarios!",
  },
} as const;

export default tool;
