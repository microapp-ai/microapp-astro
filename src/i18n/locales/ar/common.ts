const common = {
  nav: {
    home: "الرئيسية",
    logoAlt: "تطبيق مصغر",
    allTools: "جميع الأدوات",
    popular: "شائع",
    aiTools: "أدوات الذكاء الاصطناعي",
    searchPlaceholder: "البحث عن أدوات…",
    browseAll: "تصفح جميع الأدوات {count}",
    categories: "تصفح حسب الفئة",
    selectLanguage: "اختر اللغة",
    login: "تسجيل الدخول",
    signup: "التسجيل",
    logout: "تسجيل الخروج",
    myAccount: "حسابي",
    viewAll: "عرض جميع الأدوات {count} ←",
    closeMenu: "إغلاق القائمة",
    megaMenu: {
      categories: {
        textTools: "أدوات النصوص",
        numbers: "الأرقام",
        timeDate: "الوقت والتاريخ",
        generators: "المولّدات",
        devTools: "أدوات المطورين",
        writingAI: "الكتابة والذكاء الاصطناعي",
        colorsDesign: "الألوان والتصميم",
      },
      tools: {
        wordCounter: "عداد الكلمات",
        characterCounter: "عداد الأحرف",
        textRepeater: "مكرر النص",
        sortLines: "ترتيب الأسطر",
        textDiff: "مقارنة النصوص",
        removeDuplicates: "إزالة التكرار",
        percentageCalc: "حاسبة النسبة",
        unitConverter: "محوّل الوحدات",
        tipCalculator: "حاسبة الإكرامية",
        loanCalculator: "حاسبة القرض",
        discountCalc: "حاسبة الخصم",
        gpaCalculator: "حاسبة المعدل",
        ageCalculator: "حاسبة العمر",
        daysBetween: "الأيام بين تاريخين",
        ageDifference: "فارق العمر",
        passwordGen: "مولّد كلمات المرور",
        loremIpsum: "Lorem Ipsum",
        randomNumber: "رقم عشوائي",
        coinFlip: "رمي العملة",
        diceRoller: "رمي النرد",
        randomName: "اسم عشوائي",
        jsonFormatter: "منسّق JSON",
        base64Tool: "أداة Base64",
        qrCodeReader: "قارئ QR",
        curlBuilder: "منشئ cURL",
        sha256Gen: "مولّد SHA-256",
        markdownToHtml: "Markdown إلى HTML",
        aiBioGen: "مولّد السيرة الذاتية بالذكاء الاصطناعي",
        paraphrasingTool: "أداة إعادة الصياغة",
        textSummarizer: "ملخّص النصوص",
        coverLetterGen: "مولّد خطاب التقديم",
        hashtagGen: "مولّد الهاشتاق",
        captionGen: "مولّد التعليقات",
        colorConverter: "محوّل الألوان",
        hexToRgb: "Hex إلى RGB",
        colorPaletteGen: "مولّد لوحة الألوان",
        gradientGen: "مولّد التدرج",
        colorNameFinder: "باحث اسم اللون",
        aspectRatioCalc: "حاسبة نسبة العرض",
      },
      viewAll: "عرض جميع الأدوات الـ 136 →",
      browseAll: "تصفح {cat} →",
    },
    openMenu: "فتح القائمة",
  },
  footer: {
    tagline: "أكثر من 136 أداة مساعدة مجانية عبر الإنترنت — لا يلزم حساب، لا إعلانات على الأدوات، لا تتبع لمدخلاتك.",
    trustPrivacy: "الخصوصية أولاً",
    trustSpeed: "نتائج فورية",
    trustFree: "مجاني دائمًا",
    ctaTitle: "تتم إضافة أدوات جديدة كل أسبوع",
    ctaDesc: "تصفح جميع الفئات وقم بوضع إشارة مرجعية على مفضلاتك — لا يلزم بريد إلكتروني.",
    ctaBrowse: "تصفح جميع الأدوات الـ 136",
    categories: "الفئات",
    popularTools: "الأدوات الشائعة",
    company: "الشركة",
    byTheNumbers: "بالأرقام",
    statTools: "أدوات مجانية",
    statSignups: "التسجيلات المطلوبة",
    statAds: "إعلانات على الأدوات",
    statBrowser: "يعتمد على المتصفح",
    copyright: "© {year} تطبيق مصغر. جميع الحقوق محفوظة.",
    madeWith: "صنع بـ ♥ للويب",
    links: {
      about: "حول",
      privacy: "سياسة الخصوصية",
      terms: "شروط الخدمة",
    },
  },
  auth: {
    loginTitle: "مرحباً بعودتك",
    loginSubtitle: "سجل الدخول إلى حسابك في Microapp",
    signupTitle: "أنشئ حسابك",
    signupSubtitle: "انضم إلى Microapp — إنه مجاني",
    forgotTitle: "إعادة تعيين كلمة المرور الخاصة بك",
    forgotSubtitle: "أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين",
    emailLabel: "عنوان البريد الإلكتروني",
    emailPlaceholder: "you@example.com",
    passwordLabel: "كلمة المرور",
    passwordPlaceholder: "••••••••",
    loginButton: "تسجيل الدخول",
    signupButton: "إنشاء حساب",
    sendResetButton: "إرسال رابط إعادة التعيين",
    forgotPassword: "هل نسيت كلمة المرور؟",
    noAccount: "ليس لديك حساب؟",
    haveAccount: "هل لديك حساب بالفعل؟",
    signupLink: "التسجيل مجاناً",
    loginLink: "تسجيل الدخول",
    backToLogin: "← العودة إلى تسجيل الدخول",
    resetSent: "تحقق من بريدك الإلكتروني للحصول على رابط إعادة التعيين.",
    loggingIn: "جارٍ تسجيل الدخول…",
    signingUp: "جارٍ إنشاء الحساب…",
    sendingReset: "جارٍ الإرسال…",
    errorInvalidCredentials: "بريد إلكتروني أو كلمة مرور غير صالحة.",
    errorEmailInUse: "يوجد حساب بهذا البريد الإلكتروني بالفعل.",
    errorGeneric: "حدث خطأ ما. الرجاء المحاولة مرة أخرى.",
  },
  errors: {
    notFound: "الصفحة غير موجودة",
    notFoundDesc: "الصفحة التي تبحث عنها غير موجودة.",
    backHome: "العودة إلى الصفحة الرئيسية",
  },
  categories: {
    pageTitle: "تصفح حسب الفئة",
    pageDesc: "{count}+ أداة مجانية في {cats} فئات. لا حساب مطلوب، لا إعلانات.",
    breadcrumb: "الفئات",
    toolCount: "{count} أدوات",
    browseCta: "تصفح {label}",
    freeToolsCount: "{count} أداة مجانية — لا حساب مطلوب",
    useFree: "استخدم مجاناً",
    allCategories: "جميع الفئات",
    browseAllTools: "تصفح جميع الأدوات",
  },
  categoryList: {
    "text-tools": {
      label: "أدوات النصوص",
      description: "عدادات الكلمات والأحرف، منسّقات النصوص، محوّلات الحالة، أدوات مقارنة النصوص والمزيد — كلها مجانية وفورية.",
    },
    "number-calculators": {
      label: "الحاسبات الرقمية",
      description: "حاسبات النسبة المئوية، محوّلات الوحدات، حاسبات القروض، مؤشر كتلة الجسم، المعدل، الإكرامية وعشرات الأدوات الرياضية الأخرى.",
    },
    "time-date-tools": {
      label: "أدوات الوقت والتاريخ",
      description: "حاسبات العمر، أدوات فارق التاريخ، مؤقتات العدّ التنازلي، ساعة إيقاف، مؤقت بومودورو والمزيد.",
    },
    "generators": {
      label: "المولّدات",
      description: "مولّدات كلمات المرور، Lorem Ipsum، الأرقام العشوائية، رمي العملة، رمي النرد، مولّدات الأسماء والمزيد.",
    },
    "dev-tools": {
      label: "أدوات المطورين",
      description: "منسّق JSON، مشفّر Base64، قارئ QR، اختبار regex، منشئ cURL، Markdown إلى HTML والمزيد.",
    },
    "writing-ai": {
      label: "الكتابة والذكاء الاصطناعي",
      description: "مولّد السيرة الذاتية بالذكاء الاصطناعي، أداة إعادة الصياغة، ملخّص النصوص، مولّد خطاب التقديم، مولّد الهاشتاق والمزيد.",
    },
    "color-design-tools": {
      label: "الألوان والتصميم",
      description: "محوّل الألوان، Hex إلى RGB، مولّد لوحة الألوان، مولّد التدرج، باحث اسم اللون والمزيد.",
    },
  },
    toolList: {
      "word-counter": {
        label: "عداد الكلمات",
        desc: "عد الكلمات والأحرف ووقت القراءة",
      },
      "case-converter": {
        label: "محول حالة الأحرف",
        desc: "UPPER, lower, Title, camelCase والمزيد",
      },
      "lorem-ipsum": {
        label: "Lorem Ipsum",
        desc: "توليد نص وهمي على الفور",
      },
      "sentence-counter": {
        label: "عداد الجمل",
        desc: "عد الجمل والفقرات والمزيد",
      },
      "line-break-removal-tool": {
        label: "مزيل فواصل الأسطر",
        desc: "إزالة أو تنظيف فواصل الأسطر في النص",
      },
      "character-counter": {
        label: "عداد الأحرف",
        desc: "عد الأحرف بمسافات وبدونها",
      },
      "palindrome-checker": {
        label: "مدقق Palindrome",
        desc: "تحقق مما إذا كانت الكلمة أو العبارة Palindrome",
      },
      "vowel-counter": {
        label: "عداد أحرف العلة",
        desc: "عد أحرف العلة والحروف الساكنة في أي نص",
      },
      "text-repeater": {
        label: "مكرر النصوص",
        desc: "تكرار أي نص N مرة فوراً",
      },
      "remove-duplicate-lines": {
        label: "إزالة الأسطر المكررة",
        desc: "إزالة الأسطر المكررة من أي نص",
      },
      "sort-lines": {
        label: "فرز الأسطر",
        desc: "فرز الأسطر أبجدياً أو رقمياً",
      },
      "whitespace-remover": {
        label: "مزيل المسافات البيضاء",
        desc: "إزالة المسافات الزائدة وعلامات الجدولة والأسطر الفارغة",
      },
      "reverse-text-generator": {
        label: "عكس النص",
        desc: "عكس أي نص أو جملة فوراً",
      },
      "tiny-text-generator": {
        label: "مولد النص الصغير",
        desc: "تحويل النص إلى أحرف Unicode صغيرة",
      },
      "text-diff-checker": {
        label: "مدقق فرق النص",
        desc: "مقارنة نصين وإبراز الاختلافات",
      },
      "reading-time-calculator": {
        label: "حاسبة وقت القراءة",
        desc: "تقدير الوقت المستغرق لقراءة أي نص",
      },
      "readability-checker": {
        label: "مدقق سهولة القراءة",
        desc: "تحقق من نتيجة Flesch-Kincaid لسهولة القراءة",
      },
      "merge-words": {
        label: "دمج الكلمات",
        desc: "دمج قائمتين من الكلمات معاً",
      },
      "word-frequency-counter": {
        label: "عداد تكرار الكلمات",
        desc: "عد عدد مرات ظهور كل كلمة",
      },
      "morse-code": {
        label: "محول شفرة مورس",
        desc: "تحويل النص إلى شفرة مورس والعكس",
      },
      "signature-generator": {
        label: "مولد التوقيعات",
        desc: "إنشاء توقيعات نصية أنيقة",
      },
      "percentage-calculator": {
        label: "حاسبة النسبة المئوية",
        desc: "حساب النسب المئوية والخصومات والمزيد",
      },
      "unit-converter": {
        label: "محول الوحدات",
        desc: "التحويل بين أي وحدات قياس",
      },
      "tip-calculator": {
        label: "حاسبة الإكرامية",
        desc: "حساب الإكراميات وتقسيم الفواتير",
      },
      "bmi-calculator": {
        label: "حاسبة BMI",
        desc: "حساب مؤشر كتلة الجسم الخاص بك",
      },
      "calorie-calculator": {
        label: "حاسبة السعرات الحرارية",
        desc: "تقدير احتياجات السعرات الحرارية اليومية",
      },
      "gpa-calculator": {
        label: "حاسبة GPA",
        desc: "حساب المعدل التراكمي الخاص بك",
      },
      "salary-to-hourly": {
        label: "الراتب إلى الأجر بالساعة",
        desc: "تحويل الراتب السنوي إلى معدل الساعة",
      },
      "loan-calculator": {
        label: "حاسبة القروض",
        desc: "حساب الدفعات الشهرية وإجمالي الفائدة",
      },
      "compound-interest-calculator": {
        label: "حاسبة الفائدة المركبة",
        desc: "حساب الفائدة المركبة بمرور الوقت",
      },
      "discount-calculator": {
        label: "حاسبة الخصم",
        desc: "إيجاد سعر البيع بعد الخصم",
      },
      "random-number-generator": {
        label: "مولد الأرقام العشوائية",
        desc: "توليد أرقام عشوائية في أي نطاق",
      },
      "number-to-words": {
        label: "الأرقام إلى كلمات",
        desc: "تحويل الأرقام إلى كلمات مكتوبة",
      },
      "roman-numeral-converter": {
        label: "محول الأرقام الرومانية",
        desc: "التحويل بين الأرقام والأرقام الرومانية",
      },
      "binary-to-decimal": {
        label: "ثنائي إلى عشري",
        desc: "تحويل ثنائي، عشري، سداسي، وثماني",
      },
      "geometric-mean-calculator": {
        label: "حاسبة المتوسط الهندسي",
        desc: "حساب المتوسط الهندسي للأرقام",
      },
      "mass-calculator": {
        label: "حاسبة الكتلة",
        desc: "حساب الكتلة من الكثافة والحجم",
      },
      "fuel-cost-calculator": {
        label: "حاسبة تكلفة الوقود",
        desc: "تقدير تكاليف وقود الرحلة",
      },
      "army-body-fat-calculator": {
        label: "حاسبة دهون الجسم للجيش",
        desc: "حساب دهون الجسم باستخدام طريقة الجيش",
      },
      "histogram-maker": {
        label: "صانع الرسوم البيانية",
        desc: "إنشاء رسوم بيانية من بياناتك",
      },
      "temperature-converter": {
        label: "محول الحرارة",
        desc: "تحويل بين مئوية، فهرنهايت وكلفن",
      },
      "weight-converter": {
        label: "محول الأوزان",
        desc: "تحويل بين وحدات الوزن المختلفة",
      },
      "length-converter": {
        label: "محول الأطوال",
        desc: "تحويل بين وحدات الطول والمسافة",
      },
      "date-time-calculator": {
        label: "حاسبة التاريخ والوقت",
        desc: "إضافة أو طرح التواريخ والأوقات",
      },
      "age-calculator": {
        label: "حاسبة العمر",
        desc: "احسب العمر بالضبط بالسنوات والأشهر والأيام",
      },
      "days-between": {
        label: "الأيام بين التواريخ",
        desc: "عد الأيام بين تاريخين",
      },
      "age-difference-calculator": {
        label: "حاسبة فرق العمر",
        desc: "اكتشف فرق العمر بين شخصين",
      },
      "countdown-timer": {
        label: "مؤقت العد التنازلي",
        desc: "العد التنازلي لأي تاريخ أو حدث",
      },
      "stopwatch": {
        label: "ساعة الإيقاف",
        desc: "ساعة إيقاف دقيقة مع أوقات اللفات",
      },
      "pomodoro-timer": {
        label: "مؤقت Pomodoro",
        desc: "مؤقت تركيز باستخدام تقنية Pomodoro",
      },
      "color-converter": {
        label: "محول الألوان",
        desc: "تحويل بين HEX, RGB, HSL والمزيد",
      },
      "hex-to-rgb": {
        label: "HEX إلى RGB",
        desc: "تحويل رموز ألوان HEX إلى قيم RGB",
      },
      "hex-color-picker": {
        label: "منتقي ألوان HEX",
        desc: "اختيار واستكشاف رموز ألوان HEX",
      },
      "color-palette-generator": {
        label: "مولد لوحات الألوان",
        desc: "توليد لوحات ألوان جميلة",
      },
      "gradient-generator": {
        label: "مولد التدرجات",
        desc: "إنشاء خلفيات تدرج CSS",
      },
      "base64": {
        label: "مشفّر/فك تشفير Base64",
        desc: "تشفير وفك تشفير سلاسل Base64",
      },
      "json-formatter": {
        label: "منسّق JSON",
        desc: "تنسيق، التحقق وتصغير JSON",
      },
      "url-encoder-decoder": {
        label: "مشفّر/فك تشفير URL",
        desc: "تشفير وفك تشفير سلاسل URL",
      },
      "password-generator": {
        label: "مولد كلمات المرور",
        desc: "توليد كلمات مرور عشوائية آمنة",
      },
      "uuid-generator": {
        label: "مولد UUID",
        desc: "توليد UUIDs عشوائية فوراً",
      },
      "md5-hash-generator": {
        label: "مولد تجزئة MD5",
        desc: "توليد تجزئة MD5 من النص",
      },
      "sha256-generator": {
        label: "مولد SHA-256",
        desc: "توليد تجزئة SHA-256 من النص",
      },
      "html-encoder-decoder": {
        label: "مشفّر/فك تشفير HTML",
        desc: "تشفير وفك تشفير كيانات HTML",
      },
      "markdown-to-html": {
        label: "Markdown إلى HTML",
        desc: "تحويل Markdown إلى HTML فوراً",
      },
      "text-to-binary": {
        label: "نص إلى ثنائي",
        desc: "تحويل النص إلى رمز ثنائي",
      },
      "regex-tester": {
        label: "مختبر Regex",
        desc: "اختبار وتصحيح التعبيرات العادية",
      },
      "slug-generator": {
        label: "مولد Slug",
        desc: "توليد سلاسل URL-friendly من النص",
      },
      "curl-builder": {
        label: "منشئ cURL",
        desc: "إنشاء أوامر cURL بصرياً",
      },
      "csv-to-json": {
        label: "CSV إلى JSON",
        desc: "تحويل بيانات CSV إلى تنسيق JSON",
      },
      "json-to-csv": {
        label: "JSON إلى CSV",
        desc: "تحويل بيانات JSON إلى تنسيق CSV",
      },
      "rem-to-px-converter": {
        label: "محول REM إلى PX",
        desc: "تحويل وحدات REM إلى بكسل",
      },
      "css-animation-generator": {
        label: "مولد رسوم CSS المتحركة",
        desc: "توليد رسوم CSS المتحركة بالkeyframes",
      },
      "generate-random-ip": {
        label: "مولد IP عشوائي",
        desc: "توليد عناوين IP عشوائية",
      },
      "qr-code-reader": {
        label: "قارئ QR Code",
        desc: "قراءة وفك تشفير رموز QR",
      },
      "coin-flip": {
        label: "قلب العملة",
        desc: "اقلب عملة افتراضية عبر الإنترنت",
      },
      "dice-roller": {
        label: "رمي النرد",
        desc: "رمي نرد افتراضي من أي نوع",
      },
      "random-name-generator": {
        label: "مولد الأسماء العشوائية",
        desc: "توليد أسماء عشوائية فوراً",
      },
      "random-state-generator": {
        label: "مولد الولايات العشوائية",
        desc: "اختر ولاية أمريكية عشوائية",
      },
      "random-word-generator": {
        label: "مولد الكلمات العشوائية",
        desc: "توليد كلمات عشوائية فوراً",
      },
      "goofy-ahh-names-generator": {
        label: "مولد الأسماء الغريبة",
        desc: "توليد أسماء مضحكة وغريبة",
      },
      "acronym-generator": {
        label: "مولد الاختصارات",
        desc: "أنشئ اختصارات من أي عبارة",
      },
      "outline-generator-ai": {
        label: "مولد المخططات AI",
        desc: "أنشئ مخططات باستخدام AI",
      },
      "thank-you-note": {
        label: "مولد رسائل الشكر",
        desc: "اكتب رسائل شكر باستخدام AI",
      },
      "ai-joke-generator": {
        label: "مولد النكات AI",
        desc: "أنشئ نكاتًا باستخدام AI",
      },
      "ai-poem-writer": {
        label: "كاتب القصائد AI",
        desc: "اكتب قصائد باستخدام AI",
      },
      "ai-bio-generator": {
        label: "مولد السير الذاتية AI",
        desc: "أنشئ سيرًا ذاتية احترافية باستخدام AI",
      },
      "email-subject-line-generator": {
        label: "مولد سطور موضوع البريد",
        desc: "أنشئ سطور موضوع البريد باستخدام AI",
      },
      "hashtag-generator": {
        label: "مولد الهاشتاجات",
        desc: "أنشئ هاشتاجات لوسائل التواصل الاجتماعي",
      },
      "caption-generator": {
        label: "مولد التسميات التوضيحية",
        desc: "أنشئ تسميات توضيحية باستخدام AI",
      },
      "cover-letter-generator": {
        label: "مولد رسائل التغطية",
        desc: "اكتب رسائل تغطية باستخدام AI",
      },
      "product-description-generator": {
        label: "مولد وصف المنتجات",
        desc: "أنشئ أوصاف منتجات باستخدام AI",
      },
      "paraphrasing-tool": {
        label: "أداة إعادة الصياغة",
        desc: "أعد صياغة النص بكلمات مختلفة",
      },
      "summarizer": {
        label: "ملخص النصوص",
        desc: "لخص النصوص الطويلة باستخدام AI",
      },
      "text-to-bullet-points": {
        label: "نص إلى نقاط",
        desc: "حول النص إلى نقاط",
      },
      "meeting-agenda-generator": {
        label: "مولد جدول الاجتماعات",
        desc: "أنشئ جداول اجتماعات باستخدام AI",
      },
      "email-generator": {
        label: "مولد البريد الإلكتروني",
        desc: "اكتب رسائل بريد إلكتروني احترافية باستخدام AI",
      },
    },
} as const;
export default common;