/**
 * en/common.ts — Shared UI strings: nav, footer, auth modal, global CTAs.
 * This is the canonical English source. All other locales mirror this shape.
 */
const common = {
  nav: {
    home: "Главная",
    logoAlt: "Microapp",
    allTools: "Все инструменты",
    popular: "Популярные",
    aiTools: "Инструменты ИИ",
    searchPlaceholder: "Поиск инструментов…",
    browseAll: "Просмотреть все {count} инструментов",
    categories: "Просмотр по категориям",
    selectLanguage: "Выбрать язык",
    login: "Войти",
    signup: "Зарегистрироваться",
    logout: "Выйти",
    myAccount: "Мой аккаунт",
    viewAll: "Посмотреть все {count} инструментов →",
    closeMenu: "Закрыть меню",
    megaMenu: {
      categories: {
        textTools: "Текстовые инструменты",
        numbers: "Числа",
        timeDate: "Время и дата",
        generators: "Генераторы",
        devTools: "Инструменты разработчика",
        writingAI: "Написание и ИИ",
        colorsDesign: "Цвета и дизайн",
      },
      tools: {
        wordCounter: "Счётчик слов",
        characterCounter: "Счётчик символов",
        textRepeater: "Повторитель текста",
        sortLines: "Сортировка строк",
        textDiff: "Сравнение текста",
        removeDuplicates: "Удалить дубликаты",
        percentageCalc: "Калькулятор %",
        unitConverter: "Конвертер единиц",
        tipCalculator: "Калькулятор чаевых",
        loanCalculator: "Калькулятор кредита",
        discountCalc: "Калькулятор скидки",
        gpaCalculator: "Калькулятор GPA",
        ageCalculator: "Калькулятор возраста",
        daysBetween: "Дни между датами",
        ageDifference: "Разница в возрасте",
        passwordGen: "Генератор паролей",
        loremIpsum: "Lorem Ipsum",
        randomNumber: "Случайное число",
        coinFlip: "Подбросить монету",
        diceRoller: "Бросить кубик",
        randomName: "Случайное имя",
        jsonFormatter: "Форматтер JSON",
        base64Tool: "Инструмент Base64",
        qrCodeReader: "Читатель QR-кода",
        curlBuilder: "Конструктор cURL",
        sha256Gen: "Генератор SHA-256",
        markdownToHtml: "Markdown в HTML",
        aiBioGen: "ИИ-генератор биографий",
        paraphrasingTool: "Инструмент перефразирования",
        textSummarizer: "Краткое изложение",
        coverLetterGen: "Генератор сопроводительного письма",
        hashtagGen: "Генератор хэштегов",
        captionGen: "Генератор подписей",
        colorConverter: "Конвертер цветов",
        hexToRgb: "Hex в RGB",
        colorPaletteGen: "Генератор палитры",
        gradientGen: "Генератор градиента",
        colorNameFinder: "Поиск названия цвета",
        aspectRatioCalc: "Калькулятор соотношения",
      },
      viewAll: "Все 136 инструментов →",
      browseAll: "Все {cat} →",
    },
    openMenu: "Открыть меню",
  },
  footer: {
    tagline: "Более 136 бесплатных онлайн-утилит — не требуется учетная запись, нет рекламы на инструментах, нет отслеживания ваших данных.",
    trustPrivacy: "Приватность прежде всего",
    trustSpeed: "Мгновенные результаты",
    trustFree: "Всегда бесплатно",
    ctaTitle: "Новые инструменты добавляются каждую неделю",
    ctaDesc: "Просматривайте все категории и добавляйте избранное в закладки — электронная почта не требуется.",
    ctaBrowse: "Просмотреть все 136 инструментов",
    categories: "Категории",
    popularTools: "Популярные инструменты",
    company: "Компания",
    byTheNumbers: "В цифрах",
    statTools: "Бесплатные инструменты",
    statSignups: "Требуется регистрация",
    statAds: "Реклама на инструментах",
    statBrowser: "На основе браузера",
    copyright: "© {year} Microapp. Все права защищены.",
    madeWith: "Сделано с ♥ для интернета",
    links: {
      about: "О нас",
      privacy: "Политика конфиденциальности",
      terms: "Условия использования",
    },
  },
  auth: {
    loginTitle: "С возвращением",
    loginSubtitle: "Войдите в свою учетную запись Microapp",
    signupTitle: "Создайте свою учетную запись",
    signupSubtitle: "Присоединяйтесь к Microapp — это бесплатно",
    forgotTitle: "Сбросить пароль",
    forgotSubtitle: "Введите свой адрес электронной почты, и мы вышлем ссылку для сброса",
    emailLabel: "Адрес электронной почты",
    emailPlaceholder: "you@example.com",
    passwordLabel: "Пароль",
    passwordPlaceholder: "••••••••",
    loginButton: "Войти",
    signupButton: "Создать аккаунт",
    sendResetButton: "Отправить ссылку для сброса",
    forgotPassword: "Забыли пароль?",
    noAccount: "Нет учетной записи?",
    haveAccount: "Уже есть учетная запись?",
    signupLink: "Зарегистрироваться бесплатно",
    loginLink: "Войти",
    backToLogin: "← Назад к входу",
    resetSent: "Проверьте свою электронную почту на наличие ссылки для сброса.",
    loggingIn: "Вход…",
    signingUp: "Создание учетной записи…",
    sendingReset: "Отправка…",
    errorInvalidCredentials: "Неверный адрес электронной почты или пароль.",
    errorEmailInUse: "Учетная запись с этим адресом электронной почты уже существует.",
    errorGeneric: "Что-то пошло не так. Пожалуйста, попробуйте еще раз.",
  },
  errors: {
    notFound: "Страница не найдена",
    notFoundDesc: "Страница, которую вы ищете, не существует.",
    backHome: "Вернуться на главную",
  },
  categories: {
    pageTitle: "Просмотр по категориям",
    pageDesc: "{count}+ бесплатных инструментов в {cats} категориях. Без регистрации, без рекламы.",
    breadcrumb: "Категории",
    toolCount: "{count} инструментов",
    browseCta: "Открыть {label}",
    freeToolsCount: "{count} бесплатных инструментов — без регистрации",
    useFree: "Использовать бесплатно",
    allCategories: "Все категории",
    browseAllTools: "Все инструменты",
  },
  categoryList: {
    "text-tools": {
      label: "Текстовые инструменты",
      description: "Счётчики слов, символов, форматировщики текста, конвертеры регистра, инструменты сравнения и многое другое — бесплатно и мгновенно.",
    },
    "number-calculators": {
      label: "Числовые калькуляторы",
      description: "Калькуляторы процентов, конвертеры единиц, кредитные калькуляторы, ИМТ, GPA, чаевые и десятки других математических инструментов.",
    },
    "time-date-tools": {
      label: "Инструменты времени и дат",
      description: "Калькуляторы возраста, разницы дат, таймеры обратного отсчёта, секундомер, таймер Помодоро и многое другое.",
    },
    "generators": {
      label: "Генераторы",
      description: "Генераторы паролей, Lorem Ipsum, случайных чисел, подбрасывание монеты, бросок кубика, генераторы имён и многое другое.",
    },
    "dev-tools": {
      label: "Инструменты разработчика",
      description: "Форматтер JSON, кодировщик Base64, читатель QR-кодов, тестер regex, конструктор cURL, Markdown в HTML и многое другое.",
    },
    "writing-ai": {
      label: "Написание и ИИ",
      description: "ИИ-генератор биографий, инструмент перефразирования, краткое изложение, генератор сопроводительного письма, генератор хэштегов и многое другое.",
    },
    "color-design-tools": {
      label: "Цвета и дизайн",
      description: "Конвертер цветов, Hex в RGB, генератор палитры, генератор градиента, поиск названия цвета и многое другое.",
    },
  },
    toolList: {
      "word-counter": {
        label: "Счетчик слов",
        desc: "Подсчет слов, символов и времени чтения",
      },
      "case-converter": {
        label: "Изменение регистра",
        desc: "UPPER, lower, Title, camelCase и другое",
      },
      "lorem-ipsum": {
        label: "Lorem Ipsum",
        desc: "Мгновенная генерация текста-заполнителя",
      },
      "sentence-counter": {
        label: "Счетчик предложений",
        desc: "Подсчет предложений, абзацев и прочего",
      },
      "line-break-removal-tool": {
        label: "Удаление разрывов строк",
        desc: "Удаление или очистка разрывов строк",
      },
      "character-counter": {
        label: "Счетчик символов",
        desc: "Подсчет символов с пробелами и без",
      },
      "palindrome-checker": {
        label: "Проверка палиндрома",
        desc: "Проверка слова или фразы на палиндром",
      },
      "vowel-counter": {
        label: "Счетчик гласных",
        desc: "Подсчет гласных и согласных в тексте",
      },
      "text-repeater": {
        label: "Повторитель текста",
        desc: "Мгновенное повторение текста N раз",
      },
      "remove-duplicate-lines": {
        label: "Удаление дубликатов строк",
        desc: "Удаление повторяющихся строк из текста",
      },
      "sort-lines": {
        label: "Сортировка строк",
        desc: "Сортировка строк по алфавиту или числам",
      },
      "whitespace-remover": {
        label: "Удаление пробелов",
        desc: "Удаление лишних пробелов, табуляций, пустых строк",
      },
      "reverse-text-generator": {
        label: "Обратный текст",
        desc: "Мгновенное обратное написание текста или предложения",
      },
      "tiny-text-generator": {
        label: "Генератор крошечного текста",
        desc: "Преобразование текста в крошечные символы Unicode",
      },
      "text-diff-checker": {
        label: "Сравнение текстов",
        desc: "Сравнение двух текстов, выделение различий",
      },
      "reading-time-calculator": {
        label: "Калькулятор времени чтения",
        desc: "Оценка времени, необходимого для чтения",
      },
      "readability-checker": {
        label: "Проверка читабельности",
        desc: "Проверка оценки читабельности Flesch-Kincaid",
      },
      "merge-words": {
        label: "Объединение слов",
        desc: "Объединение двух списков слов",
      },
      "word-frequency-counter": {
        label: "Счетчик частоты слов",
        desc: "Подсчет частоты появления каждого слова",
      },
      "morse-code": {
        label: "Конвертер азбуки Морзе",
        desc: "Преобразование текста в азбуку Морзе и обратно",
      },
      "signature-generator": {
        label: "Генератор подписей",
        desc: "Создание стильных текстовых подписей",
      },
      "percentage-calculator": {
        label: "Калькулятор процентов",
        desc: "Расчет процентов, скидок и прочего",
      },
      "unit-converter": {
        label: "Конвертер единиц",
        desc: "Конвертация между любыми единицами измерения",
      },
      "tip-calculator": {
        label: "Калькулятор чаевых",
        desc: "Расчет чаевых и разделение счета",
      },
      "bmi-calculator": {
        label: "Калькулятор BMI",
        desc: "Расчет индекса массы тела",
      },
      "calorie-calculator": {
        label: "Калькулятор калорий",
        desc: "Оценка ежедневной потребности в калориях",
      },
      "gpa-calculator": {
        label: "Калькулятор GPA",
        desc: "Расчет среднего балла",
      },
      "salary-to-hourly": {
        label: "Зарплата в час",
        desc: "Перевод годовой зарплаты в почасовую ставку",
      },
      "loan-calculator": {
        label: "Кредитный калькулятор",
        desc: "Расчет ежемесячных платежей и общей суммы процентов",
      },
      "compound-interest-calculator": {
        label: "Калькулятор сложных процентов",
        desc: "Расчет сложных процентов за период",
      },
      "discount-calculator": {
        label: "Калькулятор скидок",
        desc: "Нахождение цены со скидкой",
      },
      "random-number-generator": {
        label: "Генератор случайных чисел",
        desc: "Генерация случайных чисел в заданном диапазоне",
      },
      "number-to-words": {
        label: "Число прописью",
        desc: "Преобразование чисел в слова",
      },
      "roman-numeral-converter": {
        label: "Конвертер римских цифр",
        desc: "Преобразование между числами и римскими цифрами",
      },
      "binary-to-decimal": {
        label: "Двоичный в десятичный",
        desc: "Конвертация двоичных, десятичных, шестнадцатеричных и восьмеричных чисел",
      },
      "geometric-mean-calculator": {
        label: "Калькулятор среднего геометрического",
        desc: "Расчет среднего геометрического чисел",
      },
      "mass-calculator": {
        label: "Калькулятор массы",
        desc: "Расчет массы по плотности и объему",
      },
      "fuel-cost-calculator": {
        label: "Калькулятор стоимости топлива",
        desc: "Оценка стоимости топлива для поездки",
      },
      "army-body-fat-calculator": {
        label: "Калькулятор жира в армии",
        desc: "Расчет жира по армейской методике",
      },
      "histogram-maker": {
        label: "Создатель гистограмм",
        desc: "Создание гистограмм из ваших данных",
      },
      "temperature-converter": {
        label: "Конвертер Температур",
        desc: "Конвертируйте Celsius, Fahrenheit, Kelvin",
      },
      "weight-converter": {
        label: "Конвертер Веса",
        desc: "Конвертируйте единицы веса",
      },
      "length-converter": {
        label: "Конвертер Длины",
        desc: "Конвертируйте единицы длины и расстояния",
      },
      "date-time-calculator": {
        label: "Калькулятор Даты и Времени",
        desc: "Складывайте или вычитайте даты и время",
      },
      "age-calculator": {
        label: "Калькулятор Возраста",
        desc: "Рассчитайте точный возраст",
      },
      "days-between": {
        label: "Дни Между Датами",
        desc: "Подсчитайте дни между двумя датами",
      },
      "age-difference-calculator": {
        label: "Калькулятор Разницы в Возрасте",
        desc: "Найдите разницу в возрасте",
      },
      "countdown-timer": {
        label: "Таймер Обратного Отсчета",
        desc: "Отсчет до любой даты или события",
      },
      "stopwatch": {
        label: "Секундомер",
        desc: "Точный онлайн секундомер с кругами",
      },
      "pomodoro-timer": {
        label: "Таймер Pomodoro",
        desc: "Таймер для фокусировки Pomodoro",
      },
      "color-converter": {
        label: "Конвертер Цвета",
        desc: "Конвертируйте HEX, RGB, HSL и другие",
      },
      "hex-to-rgb": {
        label: "HEX в RGB",
        desc: "Конвертируйте HEX в значения RGB",
      },
      "hex-color-picker": {
        label: "Выбор Цвета HEX",
        desc: "Выбирайте и исследуйте HEX цвета",
      },
      "color-palette-generator": {
        label: "Генератор Цветовых Палитр",
        desc: "Генерируйте красивые цветовые палитры",
      },
      "gradient-generator": {
        label: "Генератор Градиентов",
        desc: "Создавайте CSS градиентные фоны",
      },
      "base64": {
        label: "Base64 Кодировщик/Декодировщик",
        desc: "Кодируйте и декодируйте строки Base64",
      },
      "json-formatter": {
        label: "JSON Formatter",
        desc: "Форматируйте, проверяйте и минифицируйте JSON",
      },
      "url-encoder-decoder": {
        label: "URL Кодировщик/Декодировщик",
        desc: "Кодируйте и декодируйте URL строки",
      },
      "password-generator": {
        label: "Генератор Паролей",
        desc: "Генерируйте надежные случайные пароли",
      },
      "uuid-generator": {
        label: "Генератор UUID",
        desc: "Мгновенно генерируйте случайные UUID",
      },
      "md5-hash-generator": {
        label: "Генератор MD5 Хэшей",
        desc: "Генерируйте MD5 хэши из текста",
      },
      "sha256-generator": {
        label: "Генератор SHA-256",
        desc: "Генерируйте SHA-256 хэши из текста",
      },
      "html-encoder-decoder": {
        label: "HTML Кодировщик/Декодировщик",
        desc: "Кодируйте и декодируйте HTML сущности",
      },
      "markdown-to-html": {
        label: "Markdown в HTML",
        desc: "Конвертируйте Markdown в HTML",
      },
      "text-to-binary": {
        label: "Текст в Двоичный Код",
        desc: "Конвертируйте текст в двоичный код",
      },
      "regex-tester": {
        label: "Тестер Regex",
        desc: "Тестируйте и отлаживайте регулярные выражения",
      },
      "slug-generator": {
        label: "Генератор Slug",
        desc: "Генерируйте URL-дружественные slug из текста",
      },
      "curl-builder": {
        label: "cURL Builder",
        desc: "Визуально создавайте cURL команды",
      },
      "csv-to-json": {
        label: "CSV в JSON",
        desc: "Конвертируйте CSV данные в JSON",
      },
      "json-to-csv": {
        label: "JSON в CSV",
        desc: "Конвертируйте JSON данные в CSV",
      },
      "rem-to-px-converter": {
        label: "REM в PX Конвертер",
        desc: "Конвертируйте REM единицы в PX",
      },
      "css-animation-generator": {
        label: "Генератор CSS Анимаций",
        desc: "Генерируйте CSS keyframe анимации",
      },
      "generate-random-ip": {
        label: "Генератор Случайных IP",
        desc: "Генерируйте случайные IP адреса",
      },
      "qr-code-reader": {
        label: "QR Code Reader",
        desc: "Читайте и декодируйте QR коды",
      },
      "coin-flip": {
        label: "Подбросить Монету",
        desc: "Подбросьте виртуальную монету онлайн",
      },
      "dice-roller": {
        label: "Бросок Кубиков",
        desc: "Бросайте виртуальные кубики любого типа",
      },
      "random-name-generator": {
        label: "Генератор Случайных Имен",
        desc: "Мгновенно генерируйте случайные имена",
      },
      "random-state-generator": {
        label: "Генератор Случайных Штатов",
        desc: "Выберите случайный штат США",
      },
      "random-word-generator": {
        label: "Генератор Случайных Слов",
        desc: "Мгновенно генерируйте случайные слова",
      },
      "goofy-ahh-names-generator": {
        label: "Генератор Забавных Имен",
        desc: "Генерируйте забавные имена",
      },
      "acronym-generator": {
        label: "Генератор акронимов",
        desc: "Создавайте акронимы из любой фразы",
      },
      "outline-generator-ai": {
        label: "AI Генератор планов",
        desc: "Создавайте планы с помощью AI",
      },
      "thank-you-note": {
        label: "Генератор благодарностей",
        desc: "Пишите благодарности с помощью AI",
      },
      "ai-joke-generator": {
        label: "AI Генератор шуток",
        desc: "Генерируйте шутки с помощью AI",
      },
      "ai-poem-writer": {
        label: "AI Писатель стихов",
        desc: "Пишите стихи с помощью AI",
      },
      "ai-bio-generator": {
        label: "AI Генератор биографий",
        desc: "Создавайте профессиональные биографии с AI",
      },
      "email-subject-line-generator": {
        label: "Генератор тем писем",
        desc: "Создавайте темы писем с AI",
      },
      "hashtag-generator": {
        label: "Генератор хэштегов",
        desc: "Генерируйте хэштеги для соцсетей",
      },
      "caption-generator": {
        label: "Генератор подписей",
        desc: "Создавайте подписи с помощью AI",
      },
      "cover-letter-generator": {
        label: "Генератор сопроводительных писем",
        desc: "Пишите сопроводительные письма с AI",
      },
      "product-description-generator": {
        label: "Генератор описаний товаров",
        desc: "Создавайте описания товаров с AI",
      },
      "paraphrasing-tool": {
        label: "Инструмент для перефразирования",
        desc: "Переписывайте текст другими словами",
      },
      "summarizer": {
        label: "Суммаризатор текста",
        desc: "Суммируйте длинный текст с AI",
      },
      "text-to-bullet-points": {
        label: "Текст в маркированный список",
        desc: "Преобразуйте текст в маркированный список",
      },
      "meeting-agenda-generator": {
        label: "Генератор повестки дня",
        desc: "Создавайте повестки дня с AI",
      },
      "email-generator": {
        label: "Генератор электронной почты",
        desc: "Пишите профессиональные письма с AI",
      },
    },
    footer: {
      tagline: "Более 136 бесплатных онлайн-утилит — аккаунт не требуется, без рекламы на инструментах, без отслеживания ваших данных.",
      newTools: "Новые инструменты добавляются каждую неделю",
      newToolsDesc: "Просматривайте все категории и добавляйте в закладки свои любимые — электронная почта не требуется.",
      browseAll: "Просмотреть все 136 инструментов",
      categories: "Категории",
      popularTools: "Популярные инструменты",
      company: "Компания",
      byTheNumbers: "В цифрах",
      freeTools: "Бесплатные инструменты",
      signupsRequired: "Требуется регистрация",
      adsOnTools: "Реклама на инструментах",
      browserBased: "На основе браузера",
      allRightsReserved: "Все права защищены.",
      madeWith: "Сделано с ♥ для интернета",
      privacy: "Конфиденциальность",
      terms: "Условия",
      about: "О нас",
      privacyFirst: "Приватность прежде всего",
      instantResults: "Мгновенные результаты",
      alwaysFree: "Всегда бесплатно",
      catText: "Текстовые инструменты",
      catNumbers: "Числа",
      catTime: "Время и дата",
      catGenerators: "Генераторы",
      catDev: "Инструменты разработчика",
      catWriting: "Письмо и ИИ",
      catColors: "Цвета и дизайн",
      toolWordCounter: "Счетчик слов",
      toolAgeCalculator: "Калькулятор возраста",
      toolPasswordGenerator: "Генератор паролей",
      toolJsonFormatter: "Форматировщик JSON",
      toolUnitConverter: "Конвертер единиц измерения",
      toolPercentageCalc: "Калькулятор процентов",
      toolQrCodeReader: "Считыватель QR-кодов",
      toolColorConverter: "Конвертер цветов",
      companyAbout: "О компании",
      companyPrivacy: "Политика конфиденциальности",
      companyTerms: "Условия обслуживания",
    },
} as const;
export default common;