/**
 * en/home.ts — Home page specific strings.
 */
const home = {
  hero: {
    badge: "Ponad 106 darmowych narzędzi — bez konta",
    headline1: "Wszystkie narzędzia, których potrzebujesz,",
    headline2: "właśnie tutaj.",
    subheadline: "Microapp to kolekcja darmowych narzędzi online numer 1. Liczniki słów, kalkulatory, konwertery, generatory — wszystko natychmiastowo, wszystko za darmo.",
    ctaPrimary: "Przeglądaj wszystkie narzędzia",
    ctaSecondary: "Najpopularniejsze →",
  },
  search: {
    placeholder: "Szukaj {count} narzędzi…",
    noResults: "Nie znaleziono narzędzi dla „{query}\"",

    noResultsHint: "Spróbuj innego słowa kluczowego lub przeglądaj według kategorii.",
    resultsCount: "Znaleziono {count} narzędzie",
    resultsCountPlural: "Znaleziono {count} narzędzi",
  },
  categories: {
    all: "Wszystkie",
    text: "Narzędzia tekstowe",
    numbers: "Liczby",
    time: "Czas i data",
    generators: "Generatory",
    dev: "Narzędzia dla programistów",
    writing: "Pisanie i AI",
    design: "Kolory i projektowanie",
    browseByCategory: "Przeglądaj według kategorii",
  },
  grid: {
    useTool: "Użyj narzędzia",
    loadMore: "Załaduj więcej ({count} pozostałych)",
    noMatch: "Brak narzędzi pasujących do wyszukiwania.",
    clearFilters: "Wyczyść filtry",
  },
  ticker: [
    "Niesamowicie szybkie", "Bez rejestracji", "Naprawdę przydatne", "Oszczędza czas",
    "Czyste i proste", "Mój zestaw narzędzi", "Warte zakładki", "Uwielbiam tę stronę",
    "Działa świetnie", "Całkowicie darmowe!", "Super niezawodne", "Najlepsza strona narzędzi",
  ],
  social: {
    title: "Ukochane przez tysiące",
    subtitle: "Prawdziwe opinie od prawdziwych użytkowników",
  },
  whySection: {
    title: "Dlaczego Microapp?",
    subtitle: "Stworzyliśmy narzędzia, które chcieliśmy, żeby istniały.",
    items: {
      fast: {
        title: "Natychmiastowe wyniki",
        desc: "Każde narzędzie działa w całości w Twojej przeglądarce. Bez podróży na serwer, bez czekania.",
      },
      free: {
        title: "Zawsze za darmo",
        desc: "Bez płatnych ścian, bez poziomów premium, bez „uaktualnij, aby odblokować\". Każde narzędzie, zawsze za darmo.",

      },
      private: {
        title: "Prywatność przede wszystkim",
        desc: "Twoje dane nigdy nie opuszczają Twojego urządzenia. Nie logujemy danych wejściowych, nie przechowujemy wyników ani nie sprzedajemy danych.",
      },
      noSignup: {
        title: "Nie wymaga konta",
        desc: "Po prostu otwórz narzędzie i użyj go. Bez e-maila, bez hasła, bez tarcia.",
      },
      oneJob: {
        title: "Jedno narzędzie, jedno zadanie",
        desc: "Bez zbędnych rzeczy, bez upsellów, bez ciemnych wzorców. Każde narzędzie robi dokładnie to, co mówi.",
      },
    },
  },
  stats: {
    tools: "Ponad {count} darmowych narzędzi",
    signups: "0 Wymaganych rejestracji",
    browserBased: "100% Oparte na przeglądarce",
  },
  featured: {
    badge: "Polecane narzędzie",
    title: "Licznik słów — zrobiony jak należy.",
    desc: "Wklej dowolny tekst i natychmiast zobacz liczbę słów, znaków, zdań, akapitów oraz szacowany czas czytania. Bez reklam, bez rejestracji, bez zbędnych dodatków.",
    cta: "Wypróbuj Licznik Słów",
  },
} as const;

export default home;
