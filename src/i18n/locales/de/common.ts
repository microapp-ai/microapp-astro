const common = {
  nav: {
    home: "Startseite",
    logoAlt: "Microapp",
    allTools: "Alle Tools",
    popular: "Beliebt",
    aiTools: "KI-Tools",
    searchPlaceholder: "Tools suchen…",
    browseAll: "Alle {count} Tools durchsuchen",
    categories: "Nach Kategorie durchsuchen",
    selectLanguage: "Sprache auswählen",
    login: "Anmelden",
    signup: "Registrieren",
    logout: "Abmelden",
    myAccount: "Mein Konto",
    viewAll: "Alle {count} Tools ansehen →",
    closeMenu: "Menü schließen",
    megaMenu: {
      categories: {
        textTools: "Textwerkzeuge",
        numbers: "Zahlen",
        timeDate: "Zeit & Datum",
        generators: "Generatoren",
        devTools: "Entwicklertools",
        writingAI: "Schreiben & KI",
        colorsDesign: "Farben & Design",
      },
      tools: {
        wordCounter: "Wortzähler",
        characterCounter: "Zeichenzähler",
        textRepeater: "Textwiederholer",
        sortLines: "Zeilen sortieren",
        textDiff: "Textvergleich",
        removeDuplicates: "Duplikate entfernen",
        percentageCalc: "Prozentrechner",
        unitConverter: "Einheitenumrechner",
        tipCalculator: "Trinkgeldrechner",
        loanCalculator: "Kreditrechner",
        discountCalc: "Rabattrechner",
        gpaCalculator: "GPA-Rechner",
        ageCalculator: "Altersrechner",
        daysBetween: "Tage zwischen",
        ageDifference: "Altersunterschied",
        passwordGen: "Passwortgenerator",
        loremIpsum: "Lorem Ipsum",
        randomNumber: "Zufallszahl",
        coinFlip: "Münzwurf",
        diceRoller: "Würfeln",
        randomName: "Zufälliger Name",
        jsonFormatter: "JSON-Formatierer",
        base64Tool: "Base64-Tool",
        qrCodeReader: "QR-Code-Leser",
        curlBuilder: "cURL-Builder",
        sha256Gen: "SHA-256-Generator",
        markdownToHtml: "Markdown zu HTML",
        aiBioGen: "KI-Bio-Generator",
        paraphrasingTool: "Paraphrasierungstool",
        textSummarizer: "Textzusammenfassung",
        coverLetterGen: "Anschreiben-Generator",
        hashtagGen: "Hashtag-Generator",
        captionGen: "Untertitel-Generator",
        colorConverter: "Farbkonverter",
        hexToRgb: "Hex zu RGB",
        colorPaletteGen: "Farbpaletten-Generator",
        gradientGen: "Farbverlauf-Generator",
        colorNameFinder: "Farbname-Finder",
        aspectRatioCalc: "Seitenverhältnis-Rechner",
      },
      viewAll: "Alle 136 Tools anzeigen →",
      browseAll: "Alle {cat} durchsuchen →",
    },
    openMenu: "Menü öffnen",
  },
  footer: {
    tagline: "Über 136 kostenlose Online-Dienstprogramme – kein Konto erforderlich, keine Werbung auf Tools, keine Verfolgung Ihrer Eingaben.",
    trustPrivacy: "Datenschutz zuerst",
    trustSpeed: "Sofortige Ergebnisse",
    trustFree: "Immer kostenlos",
    ctaTitle: "Jede Woche neue Tools",
    ctaDesc: "Durchsuchen Sie alle Kategorien und speichern Sie Ihre Favoriten – keine E-Mail erforderlich.",
    ctaBrowse: "Alle 136 Tools durchsuchen",
    categories: "Kategorien",
    popularTools: "Beliebte Tools",
    company: "Unternehmen",
    byTheNumbers: "In Zahlen",
    statTools: "Kostenlose Tools",
    statSignups: "Anmeldungen erforderlich",
    statAds: "Werbung auf Tools",
    statBrowser: "Browserbasiert",
    copyright: "© {year} Microapp. Alle Rechte vorbehalten.",
    madeWith: "Mit ♥ für das Web gemacht",
    links: {
      about: "Über uns",
      privacy: "Datenschutzrichtlinie",
      terms: "Nutzungsbedingungen",
    },
  },
  auth: {
    loginTitle: "Willkommen zurück",
    loginSubtitle: "Melden Sie sich bei Ihrem Microapp-Konto an",
    signupTitle: "Erstellen Sie Ihr Konto",
    signupSubtitle: "Treten Sie Microapp bei – es ist kostenlos",
    forgotTitle: "Setzen Sie Ihr Passwort zurück",
    forgotSubtitle: "Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Reset-Link",
    emailLabel: "E-Mail-Adresse",
    emailPlaceholder: "Sie@example.com",
    passwordLabel: "Passwort",
    passwordPlaceholder: "••••••••",
    loginButton: "Anmelden",
    signupButton: "Konto erstellen",
    sendResetButton: "Reset-Link senden",
    forgotPassword: "Passwort vergessen?",
    noAccount: "Sie haben noch kein Konto?",
    haveAccount: "Sie haben bereits ein Konto?",
    signupLink: "Kostenlos registrieren",
    loginLink: "Anmelden",
    backToLogin: "← Zurück zur Anmeldung",
    resetSent: "Überprüfen Sie Ihre E-Mail auf einen Reset-Link.",
    loggingIn: "Melde mich an…",
    signingUp: "Konto wird erstellt…",
    sendingReset: "Senden…",
    errorInvalidCredentials: "Ungültige E-Mail oder Passwort.",
    errorEmailInUse: "Ein Konto mit dieser E-Mail existiert bereits.",
    errorGeneric: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
  },
  errors: {
    notFound: "Seite nicht gefunden",
    notFoundDesc: "Die gesuchte Seite existiert nicht.",
    backHome: "Zurück zur Startseite",
  },
  categories: {
    pageTitle: "Nach Kategorie durchsuchen",
    pageDesc: "{count}+ kostenlose Tools in {cats} Kategorien. Kein Konto erforderlich, keine Werbung.",
    breadcrumb: "Kategorien",
    toolCount: "{count} Tools",
    browseCta: "{label} durchsuchen",
    freeToolsCount: "{count} kostenlose Tools — kein Konto erforderlich",
    useFree: "Kostenlos nutzen",
    allCategories: "Alle Kategorien",
    browseAllTools: "Alle Tools durchsuchen",
  },
  categoryList: {
    "text-tools": {
      label: "Textwerkzeuge",
      description: "Wortzähler, Zeichenzähler, Textformatierer, Groß-/Kleinschreibungskonverter, Diff-Checker und mehr — alles kostenlos und sofort.",
    },
    "number-calculators": {
      label: "Zahlenrechner",
      description: "Prozentrechner, Einheitenumrechner, Kreditrechner, BMI, GPA, Trinkgeldrechner und Dutzende weiterer Mathe-Tools.",
    },
    "time-date-tools": {
      label: "Zeit- und Datumswerkzeuge",
      description: "Altersrechner, Datumsdifferenz-Tools, Countdown-Timer, Stoppuhr, Pomodoro-Timer und mehr.",
    },
    "generators": {
      label: "Generatoren",
      description: "Passwortgeneratoren, Lorem Ipsum, Zufallszahlengeneratoren, Münzwurf, Würfeln, Namensgeneratoren und mehr.",
    },
    "dev-tools": {
      label: "Entwicklertools",
      description: "JSON-Formatierer, Base64-Encoder, QR-Code-Leser, Regex-Tester, cURL-Builder, Markdown zu HTML und mehr.",
    },
    "writing-ai": {
      label: "Schreiben & KI",
      description: "KI-Bio-Generator, Paraphrasierungstool, Textzusammenfassung, Anschreiben-Generator, Hashtag-Generator und mehr.",
    },
    "color-design-tools": {
      label: "Farben & Design",
      description: "Farbkonverter, Hex zu RGB, Farbpaletten-Generator, Farbverlauf-Generator, Farbname-Finder und mehr.",
    },
  },
    toolList: {
      "word-counter": {
        label: "Wortzähler",
        desc: "Wörter, Zeichen & Lesezeit zählen",
      },
      "case-converter": {
        label: "Groß-/Kleinschreibung Konverter",
        desc: "UPPER, lower, Title, camelCase & mehr",
      },
      "lorem-ipsum": {
        label: "Lorem Ipsum",
        desc: "Platzhaltertext sofort generieren",
      },
      "sentence-counter": {
        label: "Satz Zähler",
        desc: "Sätze, Absätze & mehr zählen",
      },
      "line-break-removal-tool": {
        label: "Zeilenumbruch Entferner",
        desc: "Zeilenumbrüche entfernen oder bereinigen",
      },
      "character-counter": {
        label: "Zeichenzähler",
        desc: "Zeichen mit und ohne Leerzeichen zählen",
      },
      "palindrome-checker": {
        label: "Palindrom Prüfer",
        desc: "Prüfen, ob Wort/Phrase ein Palindrom ist",
      },
      "vowel-counter": {
        label: "Vokalzähler",
        desc: "Vokale und Konsonanten zählen",
      },
      "text-repeater": {
        label: "Text Repeater",
        desc: "Text N-mal sofort wiederholen",
      },
      "remove-duplicate-lines": {
        label: "Doppelte Zeilen entfernen",
        desc: "Doppelte Zeilen aus Text entfernen",
      },
      "sort-lines": {
        label: "Zeilen sortieren",
        desc: "Zeilen alphabetisch oder numerisch sortieren",
      },
      "whitespace-remover": {
        label: "Leerzeichen Entferner",
        desc: "Extra Leerzeichen, Tabs, Leerzeilen entfernen",
      },
      "reverse-text-generator": {
        label: "Text umkehren",
        desc: "Text oder Satz sofort umkehren",
      },
      "tiny-text-generator": {
        label: "Tiny Text Generator",
        desc: "Text in winzige Unicode-Zeichen umwandeln",
      },
      "text-diff-checker": {
        label: "Text Diff Checker",
        desc: "Zwei Texte vergleichen, Unterschiede hervorheben",
      },
      "reading-time-calculator": {
        label: "Lesezeit Rechner",
        desc: "Geschätzte Lesezeit für Text",
      },
      "readability-checker": {
        label: "Lesbarkeitsprüfer",
        desc: "Flesch-Kincaid Lesbarkeitswert prüfen",
      },
      "merge-words": {
        label: "Wörter zusammenführen",
        desc: "Zwei Wortlisten zusammenführen",
      },
      "word-frequency-counter": {
        label: "Wortfrequenz Zähler",
        desc: "Häufigkeit jedes Wortes zählen",
      },
      "morse-code": {
        label: "Morse Code Konverter",
        desc: "Text in Morsecode umwandeln und zurück",
      },
      "signature-generator": {
        label: "Signatur Generator",
        desc: "Stilvolle textbasierte Signaturen erstellen",
      },
      "percentage-calculator": {
        label: "Prozentrechner",
        desc: "Prozentsätze, Rabatte & mehr berechnen",
      },
      "unit-converter": {
        label: "Einheitenumrechner",
        desc: "Zwischen Maßeinheiten umrechnen",
      },
      "tip-calculator": {
        label: "Trinkgeld Rechner",
        desc: "Trinkgelder berechnen, Rechnungen teilen",
      },
      "bmi-calculator": {
        label: "BMI Rechner",
        desc: "Body Mass Index berechnen",
      },
      "calorie-calculator": {
        label: "Kalorienrechner",
        desc: "Täglichen Kalorienbedarf schätzen",
      },
      "gpa-calculator": {
        label: "GPA Rechner",
        desc: "Ihren Notendurchschnitt berechnen",
      },
      "salary-to-hourly": {
        label: "Gehalt zu Stundenlohn",
        desc: "Jahresgehalt in Stundenlohn umrechnen",
      },
      "loan-calculator": {
        label: "Darlehensrechner",
        desc: "Monatliche Zahlungen, Gesamtzinsen berechnen",
      },
      "compound-interest-calculator": {
        label: "Zinseszinsrechner",
        desc: "Zinseszinsen über Zeit berechnen",
      },
      "discount-calculator": {
        label: "Rabattrechner",
        desc: "Verkaufspreis nach Rabatt finden",
      },
      "random-number-generator": {
        label: "Zufallszahlengenerator",
        desc: "Zufallszahlen in jedem Bereich generieren",
      },
      "number-to-words": {
        label: "Zahl zu Wörtern",
        desc: "Zahlen in geschriebene Wörter umwandeln",
      },
      "roman-numeral-converter": {
        label: "Römische Zahlen Konverter",
        desc: "Zwischen Zahlen und römischen Ziffern umrechnen",
      },
      "binary-to-decimal": {
        label: "Binär zu Dezimal",
        desc: "Binär, Dezimal, Hex & Oktal umrechnen",
      },
      "geometric-mean-calculator": {
        label: "Geometrischer Mittelwert Rechner",
        desc: "Geometrischen Mittelwert von Zahlen berechnen",
      },
      "mass-calculator": {
        label: "Massenrechner",
        desc: "Masse aus Dichte und Volumen berechnen",
      },
      "fuel-cost-calculator": {
        label: "Kraftstoffkosten Rechner",
        desc: "Reise-Kraftstoffkosten schätzen",
      },
      "army-body-fat-calculator": {
        label: "Armee Körperfett Rechner",
        desc: "Körperfett mit Armeemethode berechnen",
      },
      "histogram-maker": {
        label: "Histogramm Ersteller",
        desc: "Histogramme aus Daten erstellen",
      },
      "temperature-converter": {
        label: "Temperaturumrechner",
        desc: "Zwischen Celsius, Fahrenheit & Kelvin umrechnen",
      },
      "weight-converter": {
        label: "Gewichtsumrechner",
        desc: "Zwischen Gewichtseinheiten umrechnen",
      },
      "length-converter": {
        label: "Längenumrechner",
        desc: "Zwischen Längen- und Distanzeinheiten umrechnen",
      },
      "date-time-calculator": {
        label: "Datums- & Uhrzeitrechner",
        desc: "Datum und Uhrzeit addieren oder subtrahieren",
      },
      "age-calculator": {
        label: "Altersrechner",
        desc: "Exaktes Alter in Jahren, Monaten & Tagen berechnen",
      },
      "days-between": {
        label: "Tage zwischen Daten",
        desc: "Tage zwischen zwei Daten zählen",
      },
      "age-difference-calculator": {
        label: "Altersdifferenz-Rechner",
        desc: "Altersunterschied zweier Personen finden",
      },
      "countdown-timer": {
        label: "Countdown-Timer",
        desc: "Countdown zu jedem Datum oder Ereignis",
      },
      "stopwatch": {
        label: "Stoppuhr",
        desc: "Präzise Online-Stoppuhr mit Rundenzeiten",
      },
      "pomodoro-timer": {
        label: "Pomodoro Timer",
        desc: "Fokus-Timer mit der Pomodoro-Technik",
      },
      "color-converter": {
        label: "Farbkonverter",
        desc: "Zwischen HEX, RGB, HSL & mehr umrechnen",
      },
      "hex-to-rgb": {
        label: "HEX zu RGB",
        desc: "HEX Farbcodes in RGB-Werte umwandeln",
      },
      "hex-color-picker": {
        label: "HEX Farbwähler",
        desc: "HEX Farbcodes auswählen und erkunden",
      },
      "color-palette-generator": {
        label: "Farbpaletten-Generator",
        desc: "Schöne Farbpaletten generieren",
      },
      "gradient-generator": {
        label: "Farbverlauf-Generator",
        desc: "CSS Farbverlauf-Hintergründe erstellen",
      },
      "base64": {
        label: "Base64 Encoder/Decoder",
        desc: "Base64 Zeichenketten kodieren und dekodieren",
      },
      "json-formatter": {
        label: "JSON Formatierer",
        desc: "JSON formatieren, validieren und minimieren",
      },
      "url-encoder-decoder": {
        label: "URL Encoder/Decoder",
        desc: "URL Zeichenketten kodieren und dekodieren",
      },
      "password-generator": {
        label: "Passwort-Generator",
        desc: "Sichere Zufallspasswörter generieren",
      },
      "uuid-generator": {
        label: "UUID Generator",
        desc: "Zufällige UUIDs sofort generieren",
      },
      "md5-hash-generator": {
        label: "MD5 Hash Generator",
        desc: "MD5 Hashes aus Text generieren",
      },
      "sha256-generator": {
        label: "SHA-256 Generator",
        desc: "SHA-256 Hashes aus Text generieren",
      },
      "html-encoder-decoder": {
        label: "HTML Encoder/Decoder",
        desc: "HTML Entitäten kodieren und dekodieren",
      },
      "markdown-to-html": {
        label: "Markdown zu HTML",
        desc: "Markdown sofort in HTML umwandeln",
      },
      "text-to-binary": {
        label: "Text zu Binär",
        desc: "Text in Binärcode umwandeln",
      },
      "regex-tester": {
        label: "Regex Tester",
        desc: "Reguläre Ausdrücke testen und debuggen",
      },
      "slug-generator": {
        label: "Slug Generator",
        desc: "URL-freundliche Slugs aus Text generieren",
      },
      "curl-builder": {
        label: "cURL Builder",
        desc: "cURL Befehle visuell erstellen",
      },
      "csv-to-json": {
        label: "CSV zu JSON",
        desc: "CSV-Daten in JSON-Format umwandeln",
      },
      "json-to-csv": {
        label: "JSON zu CSV",
        desc: "JSON-Daten in CSV-Format umwandeln",
      },
      "rem-to-px-converter": {
        label: "REM zu PX Konverter",
        desc: "REM-Einheiten in Pixel umwandeln",
      },
      "css-animation-generator": {
        label: "CSS Animationsgenerator",
        desc: "CSS Keyframe-Animationen generieren",
      },
      "generate-random-ip": {
        label: "Zufälliger IP Generator",
        desc: "Zufällige IP-Adressen generieren",
      },
      "qr-code-reader": {
        label: "QR Code Leser",
        desc: "QR-Codes lesen und dekodieren",
      },
      "coin-flip": {
        label: "Münzwurf",
        desc: "Eine virtuelle Münze online werfen",
      },
      "dice-roller": {
        label: "Würfelwerfer",
        desc: "Virtuelle Würfel jeder Art werfen",
      },
      "random-name-generator": {
        label: "Zufälliger Namensgenerator",
        desc: "Zufällige Namen sofort generieren",
      },
      "random-state-generator": {
        label: "Zufälliger Bundesstaat Generator",
        desc: "Einen zufälligen US-Bundesstaat auswählen",
      },
      "random-word-generator": {
        label: "Zufälliger Wortgenerator",
        desc: "Zufällige Wörter sofort generieren",
      },
      "goofy-ahh-names-generator": {
        label: "Goofy Namensgenerator",
        desc: "Lustige Goofy-Namen generieren",
      },
      "acronym-generator": {
        label: "Akronym-Generator",
        desc: "Erstellt Akronyme aus beliebigen Phrasen",
      },
      "outline-generator-ai": {
        label: "AI Gliederungs-Generator",
        desc: "Generiert Gliederungen mit AI",
      },
      "thank-you-note": {
        label: "Dankesnotiz-Generator",
        desc: "Schreibt Dankesnotizen mit AI",
      },
      "ai-joke-generator": {
        label: "AI Witz-Generator",
        desc: "Generiert Witze mit AI",
      },
      "ai-poem-writer": {
        label: "AI Gedicht-Autor",
        desc: "Schreibt Gedichte mit AI",
      },
      "ai-bio-generator": {
        label: "AI Bio-Generator",
        desc: "Generiert professionelle Biografien mit AI",
      },
      "email-subject-line-generator": {
        label: "E-Mail Betreffzeilen-Generator",
        desc: "Generiert E-Mail Betreffzeilen mit AI",
      },
      "hashtag-generator": {
        label: "Hashtag-Generator",
        desc: "Generiert Hashtags für soziale Medien",
      },
      "caption-generator": {
        label: "Bildunterschrift-Generator",
        desc: "Generiert Bildunterschriften mit AI",
      },
      "cover-letter-generator": {
        label: "Anschreiben-Generator",
        desc: "Schreibt Anschreiben mit AI",
      },
      "product-description-generator": {
        label: "Produktbeschreibungs-Generator",
        desc: "Generiert Produktbeschreibungen mit AI",
      },
      "paraphrasing-tool": {
        label: "Paraphrasierungs-Tool",
        desc: "Schreibt Text in anderen Worten um",
      },
      "summarizer": {
        label: "Text-Zusammenfasser",
        desc: "Fasst lange Texte mit AI zusammen",
      },
      "text-to-bullet-points": {
        label: "Text zu Stichpunkten",
        desc: "Wandelt Text in Stichpunkte um",
      },
      "meeting-agenda-generator": {
        label: "Besprechungsagenda-Generator",
        desc: "Generiert Besprechungsagenden mit AI",
      },
      "email-generator": {
        label: "E-Mail-Generator",
        desc: "Schreibt professionelle E-Mails mit AI",
      },
    },
} as const;

export default common;