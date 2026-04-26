/**
 * en/tool.ts — Tool page chrome strings.
 * These wrap the dynamic tool metadata (title, intro, faqs) which come from Supabase.
 */
const tool = {
  breadcrumb: {
    home: "Strona główna",
    tools: "Narzędzia",
  },
  howTo: {
    title: "Jak używać",
    step: "Krok {n}",
  },
  faq: {
    title: "Często zadawane pytania",
  },
  related: {
    title: "Powiązane narzędzia",
  },
  meta: {
    freeBadge: "Darmowe",
    noSignupBadge: "Bez rejestracji",
    instantBadge: "Natychmiastowe",
  },
  share: {
    button: "Udostępnij",
    copied: "Link skopiowany!",
  },
  feedback: {
    helpful: "Czy to narzędzie było pomocne?",
    yes: "Tak",
    no: "Nie",
    thanks: "Dziękujemy za Twoją opinię!",
  },
} as const;

export default tool;
