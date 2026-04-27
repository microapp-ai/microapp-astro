/**
 * en/common.ts — Shared UI strings: nav, footer, auth modal, global CTAs.
 * This is the canonical English source. All other locales mirror this shape.
 */
const common = {
  nav: {
    logoAlt: "Microapp",
    home: "Home",
    allTools: "All Tools",
    popular: "Popular",
    aiTools: "AI Tools",
    searchPlaceholder: "Search tools…",
    browseAll: "Browse all {count} tools",
    categories: "Browse by category",
    selectLanguage: "Select language",
    login: "Log in",
    signup: "Sign up",
    logout: "Log out",
    myAccount: "My account",
    viewAll: "View all {count} tools →",
    closeMenu: "Close menu",
    megaMenu: {
      categories: {
        textTools: "Text Tools",
        numbers: "Numbers",
        timeDate: "Time & Date",
        generators: "Generators",
        devTools: "Dev Tools",
        writingAI: "Writing & AI",
        colorsDesign: "Colors & Design",
      },
      tools: {
        wordCounter: "Word Counter",
        characterCounter: "Character Counter",
        textRepeater: "Text Repeater",
        sortLines: "Sort Lines",
        textDiff: "Text Diff Checker",
        removeDuplicates: "Remove Duplicates",
        percentageCalc: "Percentage Calc",
        unitConverter: "Unit Converter",
        tipCalculator: "Tip Calculator",
        loanCalculator: "Loan Calculator",
        discountCalc: "Discount Calculator",
        gpaCalculator: "GPA Calculator",
        ageCalculator: "Age Calculator",
        daysBetween: "Days Between",
        ageDifference: "Age Difference",
        passwordGen: "Password Generator",
        loremIpsum: "Lorem Ipsum",
        randomNumber: "Random Number",
        coinFlip: "Coin Flip",
        diceRoller: "Dice Roller",
        randomName: "Random Name",
        jsonFormatter: "JSON Formatter",
        base64Tool: "Base64 Tool",
        qrCodeReader: "QR Code Reader",
        curlBuilder: "cURL Builder",
        sha256Gen: "SHA-256 Generator",
        markdownToHtml: "Markdown to HTML",
        aiBioGen: "AI Bio Generator",
        paraphrasingTool: "Paraphrasing Tool",
        textSummarizer: "Text Summarizer",
        coverLetterGen: "Cover Letter Gen",
        hashtagGen: "Hashtag Generator",
        captionGen: "Caption Generator",
        colorConverter: "Color Converter",
        hexToRgb: "Hex to RGB",
        colorPaletteGen: "Color Palette Gen",
        gradientGen: "Gradient Generator",
        colorNameFinder: "Color Name Finder",
        aspectRatioCalc: "Aspect Ratio Calc",
      },
      viewAll: "View all 136 tools →",
      browseAll: "Browse all {cat} →",
    },
    openMenu: "Open menu",
  },
  footer: {
    tagline: "136+ free online utility tools — no account needed, no ads on tools, no tracking of your inputs.",
    trustPrivacy: "Privacy-first",
    trustSpeed: "Instant results",
    trustFree: "Always free",
    ctaTitle: "New tools added every week",
    ctaDesc: "Browse all categories and bookmark your favourites — no email required.",
    ctaBrowse: "Browse all 136 tools",
    categories: "Categories",
    popularTools: "Popular Tools",
    company: "Company",
    byTheNumbers: "By the numbers",
    statTools: "Free tools",
    statSignups: "Signups required",
    statAds: "Ads on tools",
    statBrowser: "Browser-based",
    copyright: "© {year} Microapp. All rights reserved.",
    madeWith: "Made with ♥ for the web",
    links: {
      about: "About",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
  },
  auth: {
    loginTitle: "Welcome back",
    loginSubtitle: "Sign in to your Microapp account",
    signupTitle: "Create your account",
    signupSubtitle: "Join Microapp — it's free",
    forgotTitle: "Reset your password",
    forgotSubtitle: "Enter your email and we'll send a reset link",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "••••••••",
    loginButton: "Log in",
    signupButton: "Create account",
    sendResetButton: "Send reset link",
    forgotPassword: "Forgot password?",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    signupLink: "Sign up free",
    loginLink: "Log in",
    backToLogin: "← Back to log in",
    resetSent: "Check your email for a reset link.",
    loggingIn: "Logging in…",
    signingUp: "Creating account…",
    sendingReset: "Sending…",
    errorInvalidCredentials: "Invalid email or password.",
    errorEmailInUse: "An account with this email already exists.",
    errorGeneric: "Something went wrong. Please try again.",
  },
  errors: {
    notFound: "Page not found",
    notFoundDesc: "The page you're looking for doesn't exist.",
    backHome: "Back to home",
  },
  categories: {
    pageTitle: "Browse by Category",
    pageDesc: "{count}+ free tools organised into {cats} categories. No account needed, no ads.",
    breadcrumb: "Categories",
    toolCount: "{count} tools",
    browseCta: "Browse {label}",
    freeToolsCount: "{count} free tools — no account needed",
    useFree: "Use free",
    allCategories: "All categories",
    browseAllTools: "Browse all tools",
  },
  categoryList: {
    "text-tools": {
      label: "Text Tools",
      description: "Word counters, character counters, text formatters, case converters, diff checkers, and more — all free, all instant.",
    },
    "number-calculators": {
      label: "Number Calculators",
      description: "Percentage calculators, unit converters, loan calculators, BMI, GPA, tip calculator, and dozens more math tools.",
    },
    "time-date-tools": {
      label: "Time & Date Tools",
      description: "Age calculators, date difference tools, countdown timers, stopwatch, Pomodoro timer, and more.",
    },
    "generators": {
      label: "Generators",
      description: "Password generators, lorem ipsum, random number generators, coin flip, dice roller, name generators, and more.",
    },
    "dev-tools": {
      label: "Dev Tools",
      description: "JSON formatter, Base64 encoder, QR code reader, regex tester, cURL builder, Markdown to HTML, and more.",
    },
    "writing-ai": {
      label: "Writing & AI",
      description: "AI bio generator, paraphrasing tool, text summarizer, cover letter generator, hashtag generator, and more.",
    },
    "color-design-tools": {
      label: "Colors & Design",
      description: "Color converter, hex to RGB, color palette generator, gradient generator, color name finder, and more.",
    },
  },
    toolList: {
      "word-counter": {
        label: "Word Counter",
        desc: "Count words, characters & reading time",
      },
      "case-converter": {
        label: "Case Converter",
        desc: "UPPER, lower, Title, camelCase & more",
      },
      "lorem-ipsum": {
        label: "Lorem Ipsum",
        desc: "Generate placeholder text instantly",
      },
      "sentence-counter": {
        label: "Sentence Counter",
        desc: "Count sentences, paragraphs & more",
      },
      "line-break-removal-tool": {
        label: "Line Break Remover",
        desc: "Remove or clean up line breaks in text",
      },
      "character-counter": {
        label: "Character Counter",
        desc: "Count characters with and without spaces",
      },
      "palindrome-checker": {
        label: "Palindrome Checker",
        desc: "Check if a word or phrase is a palindrome",
      },
      "vowel-counter": {
        label: "Vowel Counter",
        desc: "Count vowels and consonants in any text",
      },
      "text-repeater": {
        label: "Text Repeater",
        desc: "Repeat any text N times instantly",
      },
      "remove-duplicate-lines": {
        label: "Remove Duplicate Lines",
        desc: "Remove duplicate lines from any text",
      },
      "sort-lines": {
        label: "Sort Lines",
        desc: "Sort lines alphabetically or numerically",
      },
      "whitespace-remover": {
        label: "Whitespace Remover",
        desc: "Remove extra spaces, tabs, and blank lines",
      },
      "reverse-text-generator": {
        label: "Reverse Text",
        desc: "Reverse any text or sentence instantly",
      },
      "tiny-text-generator": {
        label: "Tiny Text Generator",
        desc: "Convert text to tiny Unicode characters",
      },
      "text-diff-checker": {
        label: "Text Diff Checker",
        desc: "Compare two texts and highlight differences",
      },
      "reading-time-calculator": {
        label: "Reading Time Calculator",
        desc: "Estimate how long it takes to read any text",
      },
      "readability-checker": {
        label: "Readability Checker",
        desc: "Check Flesch-Kincaid readability score",
      },
      "merge-words": {
        label: "Merge Words",
        desc: "Combine two lists of words together",
      },
      "word-frequency-counter": {
        label: "Word Frequency Counter",
        desc: "Count how often each word appears",
      },
      "morse-code": {
        label: "Morse Code Converter",
        desc: "Convert text to Morse code and back",
      },
      "signature-generator": {
        label: "Signature Generator",
        desc: "Create stylish text-based signatures",
      },
      "percentage-calculator": {
        label: "Percentage Calculator",
        desc: "Calculate percentages, discounts & more",
      },
      "unit-converter": {
        label: "Unit Converter",
        desc: "Convert between any units of measurement",
      },
      "tip-calculator": {
        label: "Tip Calculator",
        desc: "Calculate tips and split bills",
      },
      "bmi-calculator": {
        label: "BMI Calculator",
        desc: "Calculate your Body Mass Index",
      },
      "calorie-calculator": {
        label: "Calorie Calculator",
        desc: "Estimate daily calorie needs",
      },
      "gpa-calculator": {
        label: "GPA Calculator",
        desc: "Calculate your Grade Point Average",
      },
      "salary-to-hourly": {
        label: "Salary to Hourly",
        desc: "Convert annual salary to hourly rate",
      },
      "loan-calculator": {
        label: "Loan Calculator",
        desc: "Calculate monthly payments and total interest",
      },
      "compound-interest-calculator": {
        label: "Compound Interest Calculator",
        desc: "Calculate compound interest over time",
      },
      "discount-calculator": {
        label: "Discount Calculator",
        desc: "Find sale price after discount",
      },
      "random-number-generator": {
        label: "Random Number Generator",
        desc: "Generate random numbers in any range",
      },
      "number-to-words": {
        label: "Number to Words",
        desc: "Convert numbers to written words",
      },
      "roman-numeral-converter": {
        label: "Roman Numeral Converter",
        desc: "Convert between numbers and Roman numerals",
      },
      "binary-to-decimal": {
        label: "Binary to Decimal",
        desc: "Convert binary, decimal, hex & octal",
      },
      "geometric-mean-calculator": {
        label: "Geometric Mean Calculator",
        desc: "Calculate the geometric mean of numbers",
      },
      "mass-calculator": {
        label: "Mass Calculator",
        desc: "Calculate mass from density and volume",
      },
      "fuel-cost-calculator": {
        label: "Fuel Cost Calculator",
        desc: "Estimate trip fuel costs",
      },
      "army-body-fat-calculator": {
        label: "Army Body Fat Calculator",
        desc: "Calculate body fat using Army method",
      },
      "histogram-maker": {
        label: "Histogram Maker",
        desc: "Create histograms from your data",
      },
      "temperature-converter": {
        label: "Temperature Converter",
        desc: "Convert between Celsius, Fahrenheit & Kelvin",
      },
      "weight-converter": {
        label: "Weight Converter",
        desc: "Convert between weight units",
      },
      "length-converter": {
        label: "Length Converter",
        desc: "Convert between length and distance units",
      },
      "date-time-calculator": {
        label: "Date & Time Calculator",
        desc: "Add or subtract dates and times",
      },
      "age-calculator": {
        label: "Age Calculator",
        desc: "Calculate exact age in years, months & days",
      },
      "days-between": {
        label: "Days Between Dates",
        desc: "Count days between two dates",
      },
      "age-difference-calculator": {
        label: "Age Difference Calculator",
        desc: "Find the age difference between two people",
      },
      "countdown-timer": {
        label: "Countdown Timer",
        desc: "Count down to any date or event",
      },
      "stopwatch": {
        label: "Stopwatch",
        desc: "Precise online stopwatch with lap times",
      },
      "pomodoro-timer": {
        label: "Pomodoro Timer",
        desc: "Focus timer using the Pomodoro technique",
      },
      "color-converter": {
        label: "Color Converter",
        desc: "Convert between HEX, RGB, HSL & more",
      },
      "hex-to-rgb": {
        label: "HEX to RGB",
        desc: "Convert HEX color codes to RGB values",
      },
      "hex-color-picker": {
        label: "HEX Color Picker",
        desc: "Pick and explore hex color codes",
      },
      "color-palette-generator": {
        label: "Color Palette Generator",
        desc: "Generate beautiful color palettes",
      },
      "gradient-generator": {
        label: "Gradient Generator",
        desc: "Create CSS gradient backgrounds",
      },
      "base64": {
        label: "Base64 Encoder/Decoder",
        desc: "Encode and decode Base64 strings",
      },
      "json-formatter": {
        label: "JSON Formatter",
        desc: "Format, validate and minify JSON",
      },
      "url-encoder-decoder": {
        label: "URL Encoder/Decoder",
        desc: "Encode and decode URL strings",
      },
      "password-generator": {
        label: "Password Generator",
        desc: "Generate secure random passwords",
      },
      "uuid-generator": {
        label: "UUID Generator",
        desc: "Generate random UUIDs instantly",
      },
      "md5-hash-generator": {
        label: "MD5 Hash Generator",
        desc: "Generate MD5 hashes from text",
      },
      "sha256-generator": {
        label: "SHA-256 Generator",
        desc: "Generate SHA-256 hashes from text",
      },
      "html-encoder-decoder": {
        label: "HTML Encoder/Decoder",
        desc: "Encode and decode HTML entities",
      },
      "markdown-to-html": {
        label: "Markdown to HTML",
        desc: "Convert Markdown to HTML instantly",
      },
      "text-to-binary": {
        label: "Text to Binary",
        desc: "Convert text to binary code",
      },
      "regex-tester": {
        label: "Regex Tester",
        desc: "Test and debug regular expressions",
      },
      "slug-generator": {
        label: "Slug Generator",
        desc: "Generate URL-friendly slugs from text",
      },
      "curl-builder": {
        label: "cURL Builder",
        desc: "Build cURL commands visually",
      },
      "csv-to-json": {
        label: "CSV to JSON",
        desc: "Convert CSV data to JSON format",
      },
      "json-to-csv": {
        label: "JSON to CSV",
        desc: "Convert JSON data to CSV format",
      },
      "rem-to-px-converter": {
        label: "REM to PX Converter",
        desc: "Convert REM units to pixels",
      },
      "css-animation-generator": {
        label: "CSS Animation Generator",
        desc: "Generate CSS keyframe animations",
      },
      "generate-random-ip": {
        label: "Random IP Generator",
        desc: "Generate random IP addresses",
      },
      "qr-code-reader": {
        label: "QR Code Reader",
        desc: "Read and decode QR codes",
      },
      "coin-flip": {
        label: "Coin Flip",
        desc: "Flip a virtual coin online",
      },
      "dice-roller": {
        label: "Dice Roller",
        desc: "Roll virtual dice of any type",
      },
      "random-name-generator": {
        label: "Random Name Generator",
        desc: "Generate random names instantly",
      },
      "random-state-generator": {
        label: "Random State Generator",
        desc: "Pick a random US state",
      },
      "random-word-generator": {
        label: "Random Word Generator",
        desc: "Generate random words instantly",
      },
      "goofy-ahh-names-generator": {
        label: "Goofy Name Generator",
        desc: "Generate funny goofy names",
      },
      "acronym-generator": {
        label: "Acronym Generator",
        desc: "Create acronyms from any phrase",
      },
      "outline-generator-ai": {
        label: "AI Outline Generator",
        desc: "Generate outlines with AI",
      },
      "thank-you-note": {
        label: "Thank You Note Generator",
        desc: "Write thank you notes with AI",
      },
      "ai-joke-generator": {
        label: "AI Joke Generator",
        desc: "Generate jokes with AI",
      },
      "ai-poem-writer": {
        label: "AI Poem Writer",
        desc: "Write poems with AI",
      },
      "ai-bio-generator": {
        label: "AI Bio Generator",
        desc: "Generate professional bios with AI",
      },
      "email-subject-line-generator": {
        label: "Email Subject Line Generator",
        desc: "Generate email subject lines with AI",
      },
      "hashtag-generator": {
        label: "Hashtag Generator",
        desc: "Generate hashtags for social media",
      },
      "caption-generator": {
        label: "Caption Generator",
        desc: "Generate captions with AI",
      },
      "cover-letter-generator": {
        label: "Cover Letter Generator",
        desc: "Write cover letters with AI",
      },
      "product-description-generator": {
        label: "Product Description Generator",
        desc: "Generate product descriptions with AI",
      },
      "paraphrasing-tool": {
        label: "Paraphrasing Tool",
        desc: "Rewrite text in different words",
      },
      "summarizer": {
        label: "Text Summarizer",
        desc: "Summarize long text with AI",
      },
      "text-to-bullet-points": {
        label: "Text to Bullet Points",
        desc: "Convert text to bullet points",
      },
      "meeting-agenda-generator": {
        label: "Meeting Agenda Generator",
        desc: "Generate meeting agendas with AI",
      },
      "email-generator": {
        label: "Email Generator",
        desc: "Write professional emails with AI",
      },
    },
    footer: {
      tagline: "136+ free online utility tools — no account needed, no ads on tools, no tracking of your inputs.",
      newTools: "New tools added every week",
      newToolsDesc: "Browse all categories and bookmark your favourites — no email required.",
      browseAll: "Browse all 136 tools",
      categories: "Categories",
      popularTools: "Popular Tools",
      company: "Company",
      byTheNumbers: "By the numbers",
      freeTools: "Free tools",
      signupsRequired: "Signups required",
      adsOnTools: "Ads on tools",
      browserBased: "Browser-based",
      allRightsReserved: "All rights reserved.",
      madeWith: "Made with ♥ for the web",
      privacy: "Privacy",
      terms: "Terms",
      about: "About",
      privacyFirst: "Privacy-first",
      instantResults: "Instant results",
      alwaysFree: "Always free",
      catText: "Text Tools",
      catNumbers: "Numbers",
      catTime: "Time & Date",
      catGenerators: "Generators",
      catDev: "Dev Tools",
      catWriting: "Writing & AI",
      catColors: "Colors & Design",
      toolWordCounter: "Word Counter",
      toolAgeCalculator: "Age Calculator",
      toolPasswordGenerator: "Password Generator",
      toolJsonFormatter: "JSON Formatter",
      toolUnitConverter: "Unit Converter",
      toolPercentageCalc: "Percentage Calc",
      toolQrCodeReader: "QR Code Reader",
      toolColorConverter: "Color Converter",
      companyAbout: "About",
      companyPrivacy: "Privacy Policy",
      companyTerms: "Terms of Service",
    },
} as const;

export default common;