/**
 * en/common.ts — Shared UI strings: nav, footer, auth modal, global CTAs.
 * This is the canonical English source. All other locales mirror this shape.
 */
const common = {
  nav: {
    home: "Strona główna",
    logoAlt: "Microapp",
    allTools: "Wszystkie narzędzia",
    popular: "Popularne",
    aiTools: "Narzędzia AI",
    searchPlaceholder: "Szukaj narzędzi…",
    browseAll: "Przeglądaj wszystkie {count} narzędzia",
    categories: "Przeglądaj według kategorii",
    selectLanguage: "Wybierz język",
    login: "Zaloguj się",
    signup: "Zarejestruj się",
    logout: "Wyloguj się",
    myAccount: "Moje konto",
    viewAll: "Zobacz wszystkie {count} narzędzia →",
    closeMenu: "Zamknij menu",
    megaMenu: {
      categories: {
        textTools: "Narzędzia tekstowe",
        numbers: "Liczby",
        timeDate: "Czas i data",
        generators: "Generatory",
        devTools: "Narzędzia deweloperskie",
        writingAI: "Pisanie i AI",
        colorsDesign: "Kolory i design",
      },
      tools: {
        wordCounter: "Licznik słów",
        characterCounter: "Licznik znaków",
        textRepeater: "Powtarzacz tekstu",
        sortLines: "Sortuj linie",
        textDiff: "Porównywarka tekstu",
        removeDuplicates: "Usuń duplikaty",
        percentageCalc: "Kalkulator %",
        unitConverter: "Przelicznik jednostek",
        tipCalculator: "Kalkulator napiwku",
        loanCalculator: "Kalkulator kredytu",
        discountCalc: "Kalkulator rabatu",
        gpaCalculator: "Kalkulator GPA",
        ageCalculator: "Kalkulator wieku",
        daysBetween: "Dni między datami",
        ageDifference: "Różnica wieku",
        passwordGen: "Generator haseł",
        loremIpsum: "Lorem Ipsum",
        randomNumber: "Losowa liczba",
        coinFlip: "Rzut monetą",
        diceRoller: "Rzut kostką",
        randomName: "Losowe imię",
        jsonFormatter: "Formater JSON",
        base64Tool: "Narzędzie Base64",
        qrCodeReader: "Czytnik QR",
        curlBuilder: "Kreator cURL",
        sha256Gen: "Generator SHA-256",
        markdownToHtml: "Markdown do HTML",
        aiBioGen: "Generator bio AI",
        paraphrasingTool: "Narzędzie parafrazy",
        textSummarizer: "Podsumowanie tekstu",
        coverLetterGen: "Generator listu motywacyjnego",
        hashtagGen: "Generator hashtagów",
        captionGen: "Generator podpisów",
        colorConverter: "Konwerter kolorów",
        hexToRgb: "Hex na RGB",
        colorPaletteGen: "Generator palety kolorów",
        gradientGen: "Generator gradientu",
        colorNameFinder: "Wyszukiwarka nazw kolorów",
        aspectRatioCalc: "Kalkulator proporcji",
      },
      viewAll: "Zobacz wszystkie 136 narzędzi →",
      browseAll: "Przeglądaj {cat} →",
    },
    openMenu: "Otwórz menu",
  },
  footer: {
    tagline: "Ponad 136 darmowych narzędzi online — bez konta, bez reklam w narzędziach, bez śledzenia Twoich danych.",
    trustPrivacy: "Prywatność przede wszystkim",
    trustSpeed: "Natychmiastowe wyniki",
    trustFree: "Zawsze za darmo",
    ctaTitle: "Nowe narzędzia dodawane co tydzień",
    ctaDesc: "Przeglądaj wszystkie kategorie i dodawaj ulubione do zakładek — bez konieczności podawania adresu e-mail.",
    ctaBrowse: "Przeglądaj wszystkie 136 narzędzi",
    categories: "Kategorie",
    popularTools: "Popularne narzędzia",
    company: "Firma",
    byTheNumbers: "W liczbach",
    statTools: "Darmowe narzędzia",
    statSignups: "Wymagane rejestracje",
    statAds: "Reklamy w narzędziach",
    statBrowser: "Oparte na przeglądarce",
    copyright: "© {year} Microapp. Wszelkie prawa zastrzeżone.",
    madeWith: "Stworzone z ♥ dla sieci",
    links: {
      about: "O nas",
      privacy: "Polityka prywatności",
      terms: "Warunki korzystania z usługi",
    },
  },
  auth: {
    loginTitle: "Witaj ponownie",
    loginSubtitle: "Zaloguj się do swojego konta Microapp",
    signupTitle: "Utwórz swoje konto",
    signupSubtitle: "Dołącz do Microapp — to nic nie kosztuje",
    forgotTitle: "Zresetuj swoje hasło",
    forgotSubtitle: "Wprowadź swój adres e-mail, a wyślemy link do resetowania",
    emailLabel: "Adres e-mail",
    emailPlaceholder: "ty@example.com",
    passwordLabel: "Hasło",
    passwordPlaceholder: "••••••••",
    loginButton: "Zaloguj się",
    signupButton: "Utwórz konto",
    sendResetButton: "Wyślij link do resetowania",
    forgotPassword: "Zapomniałeś hasła?",
    noAccount: "Nie masz konta?",
    haveAccount: "Masz już konto?",
    signupLink: "Zarejestruj się za darmo",
    loginLink: "Zaloguj się",
    backToLogin: "← Wróć do logowania",
    resetSent: "Sprawdź swoją skrzynkę e-mail w poszukiwaniu linku do resetowania.",
    loggingIn: "Logowanie…",
    signingUp: "Tworzenie konta…",
    sendingReset: "Wysyłanie…",
    errorInvalidCredentials: "Nieprawidłowy adres e-mail lub hasło.",
    errorEmailInUse: "Konto z tym adresem e-mail już istnieje.",
    errorGeneric: "Coś poszło nie tak. Spróbuj ponownie.",
  },
  errors: {
    notFound: "Strona nie znaleziona",
    notFoundDesc: "Strona, której szukasz, nie istnieje.",
    backHome: "Wróć do strony głównej",
  },
  categories: {
    pageTitle: "Przeglądaj według kategorii",
    pageDesc: "{count}+ darmowych narzędzi w {cats} kategoriach. Bez konta, bez reklam.",
    breadcrumb: "Kategorie",
    toolCount: "{count} narzędzi",
    browseCta: "Przeglądaj {label}",
    freeToolsCount: "{count} darmowych narzędzi — bez konta",
    useFree: "Użyj za darmo",
    allCategories: "Wszystkie kategorie",
    browseAllTools: "Przeglądaj wszystkie narzędzia",
  },
  categoryList: {
    "text-tools": {
      label: "Narzędzia tekstowe",
      description: "Liczniki słów, znaków, formatery tekstu, konwertery wielkości liter, narzędzia porównywania i więcej — wszystko bezpłatne i natychmiastowe.",
    },
    "number-calculators": {
      label: "Kalkulatory liczbowe",
      description: "Kalkulatory procentów, przeliczniki jednostek, kalkulatory kredytów, BMI, GPA, napiwku i dziesiątki innych narzędzi matematycznych.",
    },
    "time-date-tools": {
      label: "Narzędzia czasu i daty",
      description: "Kalkulatory wieku, różnicy dat, liczniki odliczania, stoper, timer Pomodoro i więcej.",
    },
    "generators": {
      label: "Generatory",
      description: "Generatory haseł, Lorem Ipsum, losowych liczb, rzut monetą, kostką, generatory imion i więcej.",
    },
    "dev-tools": {
      label: "Narzędzia deweloperskie",
      description: "Formater JSON, koder Base64, czytnik QR, tester regex, kreator cURL, Markdown do HTML i więcej.",
    },
    "writing-ai": {
      label: "Pisanie i AI",
      description: "Generator bio AI, narzędzie parafrazy, podsumowanie tekstu, generator listu motywacyjnego, generator hashtagów i więcej.",
    },
    "color-design-tools": {
      label: "Kolory i design",
      description: "Konwerter kolorów, Hex na RGB, generator palety kolorów, generator gradientu, wyszukiwarka nazw kolorów i więcej.",
    },
  },
    toolList: {
      "word-counter": {
        label: "Licznik Słów",
        desc: "Zlicz słowa, znaki i czas czytania",
      },
      "case-converter": {
        label: "Konwerter Wielkości Liter",
        desc: "UPPER, lower, Title, camelCase i więcej",
      },
      "lorem-ipsum": {
        label: "Lorem Ipsum",
        desc: "Generuj tekst-wypełniacz natychmiast",
      },
      "sentence-counter": {
        label: "Licznik Zdań",
        desc: "Zlicz zdania, akapity i więcej",
      },
      "line-break-removal-tool": {
        label: "Usuwanie Znaków Nowej Linii",
        desc: "Usuń lub oczyść znaki nowej linii",
      },
      "character-counter": {
        label: "Licznik Znaków",
        desc: "Zlicz znaki ze spacjami i bez",
      },
      "palindrome-checker": {
        label: "Sprawdzanie Palindromów",
        desc: "Sprawdź, czy słowo to palindrom",
      },
      "vowel-counter": {
        label: "Licznik Samogłosek",
        desc: "Zlicz samogłoski i spółgłoski w tekście",
      },
      "text-repeater": {
        label: "Powtarzanie Tekstu",
        desc: "Powtórz dowolny tekst N razy",
      },
      "remove-duplicate-lines": {
        label: "Usuń Duplikaty Linii",
        desc: "Usuń zduplikowane linie z tekstu",
      },
      "sort-lines": {
        label: "Sortuj Linie",
        desc: "Sortuj linie alfabetycznie lub numerycznie",
      },
      "whitespace-remover": {
        label: "Usuwanie Białych Znaków",
        desc: "Usuń dodatkowe spacje, tabulatory, puste linie",
      },
      "reverse-text-generator": {
        label: "Odwracanie Tekstu",
        desc: "Odwróć dowolny tekst lub zdanie",
      },
      "tiny-text-generator": {
        label: "Generator Małego Tekstu",
        desc: "Konwertuj tekst na małe znaki Unicode",
      },
      "text-diff-checker": {
        label: "Porównywarka Tekstu",
        desc: "Porównaj dwa teksty, wyróżnij różnice",
      },
      "reading-time-calculator": {
        label: "Kalkulator Czasu Czytania",
        desc: "Oszacuj czas czytania dowolnego tekstu",
      },
      "readability-checker": {
        label: "Sprawdzanie Czytelności",
        desc: "Sprawdź wynik czytelności Flesch-Kincaid",
      },
      "merge-words": {
        label: "Łączenie Słów",
        desc: "Połącz dwie listy słów",
      },
      "word-frequency-counter": {
        label: "Licznik Częstotliwości Słów",
        desc: "Zlicz, jak często pojawia się słowo",
      },
      "morse-code": {
        label: "Konwerter Kodu Morse'a",
        desc: "Konwertuj tekst na kod Morse'a i z powrotem",
      },
      "signature-generator": {
        label: "Generator Podpisów",
        desc: "Twórz stylowe podpisy tekstowe",
      },
      "percentage-calculator": {
        label: "Kalkulator Procentowy",
        desc: "Oblicz procenty, rabaty i więcej",
      },
      "unit-converter": {
        label: "Konwerter Jednostek",
        desc: "Konwertuj między jednostkami miary",
      },
      "tip-calculator": {
        label: "Kalkulator Napiwków",
        desc: "Oblicz napiwki i podziel rachunki",
      },
      "bmi-calculator": {
        label: "Kalkulator BMI",
        desc: "Oblicz swój wskaźnik masy ciała BMI",
      },
      "calorie-calculator": {
        label: "Kalkulator Kalorii",
        desc: "Oszacuj dzienne zapotrzebowanie na kalorie",
      },
      "gpa-calculator": {
        label: "Kalkulator GPA",
        desc: "Oblicz swoją średnią ocen GPA",
      },
      "salary-to-hourly": {
        label: "Pensja na Stawkę Godzinową",
        desc: "Konwertuj roczną pensję na stawkę godzinową",
      },
      "loan-calculator": {
        label: "Kalkulator Kredytowy",
        desc: "Oblicz miesięczne raty i odsetki",
      },
      "compound-interest-calculator": {
        label: "Kalkulator Odsetek Składanych",
        desc: "Oblicz odsetki składane w czasie",
      },
      "discount-calculator": {
        label: "Kalkulator Rabatów",
        desc: "Znajdź cenę sprzedaży po rabacie",
      },
      "random-number-generator": {
        label: "Generator Liczb Losowych",
        desc: "Generuj losowe liczby w dowolnym zakresie",
      },
      "number-to-words": {
        label: "Liczby na Słowa",
        desc: "Konwertuj liczby na słowa",
      },
      "roman-numeral-converter": {
        label: "Konwerter Liczb Rzymskich",
        desc: "Konwertuj liczby na rzymskie i odwrotnie",
      },
      "binary-to-decimal": {
        label: "Binarny na Dziesiętny",
        desc: "Konwertuj binarny, dziesiętny, szesnastkowy, ósemkowy",
      },
      "geometric-mean-calculator": {
        label: "Kalkulator Średniej Geometrycznej",
        desc: "Oblicz średnią geometryczną liczb",
      },
      "mass-calculator": {
        label: "Kalkulator Masy",
        desc: "Oblicz masę z gęstości i objętości",
      },
      "fuel-cost-calculator": {
        label: "Kalkulator Kosztów Paliwa",
        desc: "Oszacuj koszty paliwa podróży",
      },
      "army-body-fat-calculator": {
        label: "Wojskowy Kalkulator Tłuszczu",
        desc: "Oblicz tkankę tłuszczową metodą wojskową",
      },
      "histogram-maker": {
        label: "Tworzenie Histogramów",
        desc: "Twórz histogramy z Twoich danych",
      },
      "temperature-converter": {
        label: "Konwerter temperatury",
        desc: "Konwertuj między Celsjuszem, Fahrenheitem i Kelvinem",
      },
      "weight-converter": {
        label: "Konwerter wagi",
        desc: "Konwertuj między jednostkami wagi",
      },
      "length-converter": {
        label: "Konwerter długości",
        desc: "Konwertuj między jednostkami długości i odległości",
      },
      "date-time-calculator": {
        label: "Kalkulator daty i czasu",
        desc: "Dodawaj lub odejmuj daty i godziny",
      },
      "age-calculator": {
        label: "Kalkulator wieku",
        desc: "Oblicz dokładny wiek w latach, miesiącach i dniach",
      },
      "days-between": {
        label: "Dni między datami",
        desc: "Policz dni między dwiema datami",
      },
      "age-difference-calculator": {
        label: "Kalkulator różnicy wieku",
        desc: "Znajdź różnicę wieku między dwiema osobami",
      },
      "countdown-timer": {
        label: "Minutnik",
        desc: "Odliczaj do dowolnej daty lub wydarzenia",
      },
      "stopwatch": {
        label: "Stoper",
        desc: "Precyzyjny stoper online z czasami okrążeń",
      },
      "pomodoro-timer": {
        label: "Timer Pomodoro",
        desc: "Timer skupienia z techniką Pomodoro",
      },
      "color-converter": {
        label: "Konwerter kolorów",
        desc: "Konwertuj między HEX, RGB, HSL i innymi",
      },
      "hex-to-rgb": {
        label: "HEX na RGB",
        desc: "Konwertuj kody kolorów HEX na wartości RGB",
      },
      "hex-color-picker": {
        label: "Wybierak kolorów HEX",
        desc: "Wybieraj i eksploruj kody kolorów HEX",
      },
      "color-palette-generator": {
        label: "Generator palet kolorów",
        desc: "Generuj piękne palety kolorów",
      },
      "gradient-generator": {
        label: "Generator gradientów",
        desc: "Twórz tła z gradientem CSS",
      },
      "base64": {
        label: "Koder/Dekoder Base64",
        desc: "Koduj i dekoduj ciągi Base64",
      },
      "json-formatter": {
        label: "Formatowanie JSON",
        desc: "Formatuj, waliduj i minimalizuj JSON",
      },
      "url-encoder-decoder": {
        label: "Koder/Dekoder URL",
        desc: "Koduj i dekoduj ciągi URL",
      },
      "password-generator": {
        label: "Generator haseł",
        desc: "Generuj bezpieczne losowe hasła",
      },
      "uuid-generator": {
        label: "Generator UUID",
        desc: "Generuj losowe UUID natychmiast",
      },
      "md5-hash-generator": {
        label: "Generator haszy MD5",
        desc: "Generuj hasze MD5 z tekstu",
      },
      "sha256-generator": {
        label: "Generator SHA-256",
        desc: "Generuj hasze SHA-256 z tekstu",
      },
      "html-encoder-decoder": {
        label: "Koder/Dekoder HTML",
        desc: "Koduj i dekoduj encje HTML",
      },
      "markdown-to-html": {
        label: "Markdown na HTML",
        desc: "Konwertuj Markdown na HTML natychmiast",
      },
      "text-to-binary": {
        label: "Tekst na binarny",
        desc: "Konwertuj tekst na kod binarny",
      },
      "regex-tester": {
        label: "Tester Regex",
        desc: "Testuj i debuguj wyrażenia regularne",
      },
      "slug-generator": {
        label: "Generator slugów",
        desc: "Generuj przyjazne dla URL slugi z tekstu",
      },
      "curl-builder": {
        label: "Kreator cURL",
        desc: "Wizualnie buduj polecenia cURL",
      },
      "csv-to-json": {
        label: "CSV na JSON",
        desc: "Konwertuj dane CSV na format JSON",
      },
      "json-to-csv": {
        label: "JSON na CSV",
        desc: "Konwertuj dane JSON na format CSV",
      },
      "rem-to-px-converter": {
        label: "Konwerter REM na PX",
        desc: "Konwertuj jednostki REM na piksele",
      },
      "css-animation-generator": {
        label: "Generator animacji CSS",
        desc: "Generuj animacje klatek kluczowych CSS",
      },
      "generate-random-ip": {
        label: "Generator losowych IP",
        desc: "Generuj losowe adresy IP",
      },
      "qr-code-reader": {
        label: "Czytnik kodów QR",
        desc: "Czytaj i dekoduj kody QR",
      },
      "coin-flip": {
        label: "Rzut monetą",
        desc: "Rzuć wirtualną monetą online",
      },
      "dice-roller": {
        label: "Rzut kostką",
        desc: "Rzuć wirtualnymi kostkami dowolnego typu",
      },
      "random-name-generator": {
        label: "Generator losowych imion",
        desc: "Generuj losowe imiona natychmiast",
      },
      "random-state-generator": {
        label: "Generator losowych stanów",
        desc: "Wybierz losowy stan USA",
      },
      "random-word-generator": {
        label: "Generator losowych słów",
        desc: "Generuj losowe słowa natychmiast",
      },
      "goofy-ahh-names-generator": {
        label: "Generator śmiesznych imion",
        desc: "Generuj zabawne, głupkowate imiona",
      },
      "acronym-generator": {
        label: "Generator akronimów",
        desc: "Twórz akronimy z dowolnej frazy",
      },
      "outline-generator-ai": {
        label: "Generator konspektów AI",
        desc: "Generuj konspekty za pomocą AI",
      },
      "thank-you-note": {
        label: "Generator podziękowań",
        desc: "Pisz podziękowania za pomocą AI",
      },
      "ai-joke-generator": {
        label: "Generator żartów AI",
        desc: "Generuj żarty za pomocą AI",
      },
      "ai-poem-writer": {
        label: "AI Pisarz wierszy",
        desc: "Pisz wiersze za pomocą AI",
      },
      "ai-bio-generator": {
        label: "Generator biogramów AI",
        desc: "Generuj profesjonalne biogramy za pomocą AI",
      },
      "email-subject-line-generator": {
        label: "Generator tematów e-maili",
        desc: "Generuj tematy e-maili za pomocą AI",
      },
      "hashtag-generator": {
        label: "Generator hashtagów",
        desc: "Generuj hashtagi do mediów społecznościowych",
      },
      "caption-generator": {
        label: "Generator podpisów",
        desc: "Generuj podpisy za pomocą AI",
      },
      "cover-letter-generator": {
        label: "Generator listów motywacyjnych",
        desc: "Pisz listy motywacyjne za pomocą AI",
      },
      "product-description-generator": {
        label: "Generator opisów produktów",
        desc: "Generuj opisy produktów za pomocą AI",
      },
      "paraphrasing-tool": {
        label: "Narzędzie do parafrazy",
        desc: "Przepisz tekst innymi słowami",
      },
      "summarizer": {
        label: "Sumator tekstu",
        desc: "Streszczaj długi tekst za pomocą AI",
      },
      "text-to-bullet-points": {
        label: "Tekst na punkty",
        desc: "Konwertuj tekst na punkty",
      },
      "meeting-agenda-generator": {
        label: "Generator agend spotkań",
        desc: "Generuj agendy spotkań za pomocą AI",
      },
      "email-generator": {
        label: "Generator e-maili",
        desc: "Pisz profesjonalne e-maile za pomocą AI",
      },
    },
    footer: {
      tagline: "136+ darmowych narzędzi online — bez konta, bez reklam na narzędziach, bez śledzenia Twoich danych.",
      newTools: "Nowe narzędzia dodawane co tydzień",
      newToolsDesc: "Przeglądaj wszystkie kategorie i dodawaj swoje ulubione do zakładek — bez konieczności podawania adresu e-mail.",
      browseAll: "Przeglądaj wszystkie 136 narzędzi",
      categories: "Kategorie",
      popularTools: "Popularne narzędzia",
      company: "Firma",
      byTheNumbers: "W liczbach",
      freeTools: "Darmowe narzędzia",
      signupsRequired: "Wymagane rejestracje",
      adsOnTools: "Reklamy na narzędziach",
      browserBased: "Oparte na przeglądarce",
      allRightsReserved: "Wszelkie prawa zastrzeżone.",
      madeWith: "Stworzone z ♥ dla sieci",
      privacy: "Prywatność",
      terms: "Warunki",
      about: "O nas",
      privacyFirst: "Prywatność przede wszystkim",
      instantResults: "Natychmiastowe wyniki",
      alwaysFree: "Zawsze za darmo",
      catText: "Narzędzia tekstowe",
      catNumbers: "Liczby",
      catTime: "Czas i data",
      catGenerators: "Generatory",
      catDev: "Narzędzia deweloperskie",
      catWriting: "Pisanie i AI",
      catColors: "Kolory i design",
      toolWordCounter: "Licznik słów",
      toolAgeCalculator: "Kalkulator wieku",
      toolPasswordGenerator: "Generator haseł",
      toolJsonFormatter: "JSON Formatter",
      toolUnitConverter: "Konwerter jednostek",
      toolPercentageCalc: "Kalkulator procentowy",
      toolQrCodeReader: "Czytnik kodów QR",
      toolColorConverter: "Konwerter kolorów",
      companyAbout: "O nas",
      companyPrivacy: "Polityka prywatności",
      companyTerms: "Warunki świadczenia usług",
    },
} as const;
export default common;