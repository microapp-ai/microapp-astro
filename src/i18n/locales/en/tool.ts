/**
 * en/tool.ts — Tool page chrome strings.
 * These wrap the dynamic tool metadata (title, intro, faqs) which come from Supabase.
 */
const tool = {
  breadcrumb: {
    home: "Home",
    tools: "Tools",
  },
  howTo: {
    title: "How to use",
    step: "Step {n}",
  },
  faq: {
    title: "Frequently asked questions",
  },
  related: {
    title: "Related tools",
  },
  meta: {
    freeBadge: "Free",
    noSignupBadge: "No signup",
    instantBadge: "Instant",
  },
  share: {
    button: "Share",
    copied: "Link copied!",
  },
  feedback: {
    helpful: "Was this tool helpful?",
    yes: "Yes",
    no: "No",
    thanks: "Thanks for your feedback!",
  },
} as const;

export default tool;
