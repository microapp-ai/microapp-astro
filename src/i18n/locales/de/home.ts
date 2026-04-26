/**
 * en/home.ts — Home page specific strings.
 */
const home = {
  hero: {
    badge: "106+ kostenlose Tools – kein Konto erforderlich",
    headline1: "Jedes Tool, das Sie brauchen,",
    headline2: "genau hier.",
    subheadline: "Microapp ist die führende Sammlung kostenloser Online-Dienstprogramme. Wortzähler, Rechner, Konverter, Generatoren – alles sofort, alles kostenlos.",
    ctaPrimary: "Alle Tools entdecken",
    ctaSecondary: "Am beliebtesten →",
  },
  search: {
    placeholder: "{count} Tools durchsuchen…",
    noResults: "Keine Tools gefunden für „{query}\"",

    noResultsHint: "Versuchen Sie ein anderes Stichwort oder stöbern Sie nach Kategorie.",
    resultsCount: "{count} Tool gefunden",
    resultsCountPlural: "{count} Tools gefunden",
  },
  categories: {
    all: "Alle",
    text: "Text-Tools",
    numbers: "Zahlen",
    time: "Zeit & Datum",
    generators: "Generatoren",
    dev: "Entwickler-Tools",
    writing: "Schreiben & KI",
    design: "Farben & Design",
  },
  social: {
    title: "Von Tausenden geliebt",
    subtitle: "Echtes Feedback von echten Benutzern",
  },
  whySection: {
    title: "Warum Microapp?",
    subtitle: "Wir haben die Tools gebaut, die wir uns gewünscht haben.",
    items: {
      fast: {
        title: "Sofortige Ergebnisse",
        desc: "Jedes Tool läuft vollständig in Ihrem Browser. Keine Server-Roundtrips, kein Warten.",
      },
      free: {
        title: "Immer kostenlos",
        desc: "Keine Paywalls, keine Premium-Stufen, kein „Upgrade zum Freischalten\". Jedes Tool, für immer kostenlos.",

      },
      private: {
        title: "Datenschutz zuerst",
        desc: "Ihre Daten verlassen niemals Ihr Gerät. Wir protokollieren keine Eingaben, speichern keine Ergebnisse und verkaufen keine Daten.",
      },
      noSignup: {
        title: "Kein Konto erforderlich",
        desc: "Öffnen Sie einfach ein Tool und verwenden Sie es. Keine E-Mail, kein Passwort, keine Reibung.",
      },
    },
  },
  stats: {
    tools: "{count}+ kostenlose Tools",
    signups: "0 Anmeldungen erforderlich",
    browserBased: "100% Browser-basiert",
  },
  featured: {
    badge: "Empfohlenes Tool",
    title: "Wortzähler – richtig gemacht.",
    desc: "Fügen Sie beliebigen Text ein und sehen Sie sofort Wortanzahl, Zeichenanzahl, Satzanzahl, Absatzanzahl und geschätzte Lesezeit. Keine Werbung, keine Anmeldung, kein Schnickschnack.",
    cta: "Wortzähler ausprobieren",
  },
} as const;

export default home;
