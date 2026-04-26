/**
 * en/tool.ts — Tool page chrome strings.
 * These wrap the dynamic tool metadata (title, intro, faqs) which come from Supabase.
 */
const tool = {
  breadcrumb: {
    home: "Startseite",
    tools: "Tools",
  },
  howTo: {
    title: "Anwendung",
    step: "Schritt {n}",
  },
  faq: {
    title: "Häufig gestellte Fragen",
  },
  related: {
    title: "Verwandte Tools",
  },
  meta: {
    freeBadge: "Kostenlos",
    noSignupBadge: "Keine Anmeldung",
    instantBadge: "Sofort",
  },
  share: {
    button: "Teilen",
    copied: "Link kopiert!",
  },
  feedback: {
    helpful: "War dieses Tool hilfreich?",
    yes: "Ja",
    no: "Nein",
    thanks: "Vielen Dank für Ihr Feedback!",
  },
} as const;

export default tool;
