/**
 * en/common.ts — Shared UI strings: nav, footer, auth modal, global CTAs.
 * This is the canonical English source. All other locales mirror this shape.
 */
const common = {
  nav: {
    home: "Inicio",
    logoAlt: "Microapp",
    allTools: "Todas las herramientas",
    popular: "Populares",
    aiTools: "Herramientas de IA",
    searchPlaceholder: "Buscar herramientas...",
    browseAll: "Explorar las {count} herramientas",
    categories: "Explorar por categoría",
    selectLanguage: "Seleccionar idioma",
    login: "Iniciar sesión",
    signup: "Registrarse",
    logout: "Cerrar sesión",
    myAccount: "Mi cuenta",
    viewAll: "Ver las {count} herramientas →",
    closeMenu: "Cerrar menú",
    megaMenu: {
      categories: {
        textTools: "Herramientas de texto",
        numbers: "Números",
        timeDate: "Tiempo y fecha",
        generators: "Generadores",
        devTools: "Herramientas dev",
        writingAI: "Escritura e IA",
        colorsDesign: "Colores y diseño",
      },
      tools: {
        wordCounter: "Contador de palabras",
        characterCounter: "Contador de caracteres",
        textRepeater: "Repetidor de texto",
        sortLines: "Ordenar líneas",
        textDiff: "Comparador de texto",
        removeDuplicates: "Eliminar duplicados",
        percentageCalc: "Calculadora de %",
        unitConverter: "Conversor de unidades",
        tipCalculator: "Calculadora de propina",
        loanCalculator: "Calculadora de préstamo",
        discountCalc: "Calculadora de descuento",
        gpaCalculator: "Calculadora GPA",
        ageCalculator: "Calculadora de edad",
        daysBetween: "Días entre fechas",
        ageDifference: "Diferencia de edad",
        passwordGen: "Generador de contraseñas",
        loremIpsum: "Lorem Ipsum",
        randomNumber: "Número aleatorio",
        coinFlip: "Lanzar moneda",
        diceRoller: "Lanzar dado",
        randomName: "Nombre aleatorio",
        jsonFormatter: "Formateador JSON",
        base64Tool: "Herramienta Base64",
        qrCodeReader: "Lector de QR",
        curlBuilder: "Constructor cURL",
        sha256Gen: "Generador SHA-256",
        markdownToHtml: "Markdown a HTML",
        aiBioGen: "Generador de bio IA",
        paraphrasingTool: "Parafraseador",
        textSummarizer: "Resumidor de texto",
        coverLetterGen: "Generador de carta",
        hashtagGen: "Generador de hashtags",
        captionGen: "Generador de subtítulos",
        colorConverter: "Conversor de color",
        hexToRgb: "Hex a RGB",
        colorPaletteGen: "Generador de paleta",
        gradientGen: "Generador de gradiente",
        colorNameFinder: "Buscador de color",
        aspectRatioCalc: "Calc. relación aspecto",
      },
      viewAll: "Ver las 136 herramientas →",
      browseAll: "Explorar {cat} →",
    },
    openMenu: "Abrir menú",
  },
  footer: {
    tagline: "Más de 136 herramientas gratuitas en línea — no se necesita cuenta, sin anuncios en las herramientas, sin seguimiento de tus entradas.",
    trustPrivacy: "Privacidad primero",
    trustSpeed: "Resultados instantáneos",
    trustFree: "Siempre gratis",
    ctaTitle: "Nuevas herramientas añadidas cada semana",
    ctaDesc: "Explora todas las categorías y marca tus favoritas — no se requiere correo electrónico.",
    ctaBrowse: "Explorar las 136 herramientas",
    categories: "Categorías",
    popularTools: "Herramientas populares",
    company: "Empresa",
    byTheNumbers: "Por los números",
    statTools: "Herramientas gratuitas",
    statSignups: "Registros requeridos",
    statAds: "Anuncios en herramientas",
    statBrowser: "Basado en navegador",
    copyright: "© {year} Microapp. Todos los derechos reservados.",
    madeWith: "Hecho con ♥ para la web",
    links: {
      about: "Acerca de",
      privacy: "Política de privacidad",
      terms: "Términos de servicio",
    },
  },
  auth: {
    loginTitle: "Bienvenido de nuevo",
    loginSubtitle: "Inicia sesión en tu cuenta de Microapp",
    signupTitle: "Crea tu cuenta",
    signupSubtitle: "Únete a Microapp — es gratis",
    forgotTitle: "Restablece tu contraseña",
    forgotSubtitle: "Introduce tu correo electrónico y te enviaremos un enlace de restablecimiento",
    emailLabel: "Dirección de correo electrónico",
    emailPlaceholder: "tu@ejemplo.com",
    passwordLabel: "Contraseña",
    passwordPlaceholder: "••••••••",
    loginButton: "Iniciar sesión",
    signupButton: "Crear cuenta",
    sendResetButton: "Enviar enlace de restablecimiento",
    forgotPassword: "¿Olvidaste tu contraseña?",
    noAccount: "¿No tienes una cuenta?",
    haveAccount: "¿Ya tienes una cuenta?",
    signupLink: "Registrarse gratis",
    loginLink: "Iniciar sesión",
    backToLogin: "← Volver a iniciar sesión",
    resetSent: "Revisa tu correo electrónico para un enlace de restablecimiento.",
    loggingIn: "Iniciando sesión...",
    signingUp: "Creando cuenta...",
    sendingReset: "Enviando...",
    errorInvalidCredentials: "Correo electrónico o contraseña inválidos.",
    errorEmailInUse: "Ya existe una cuenta con este correo electrónico.",
    errorGeneric: "Algo salió mal. Por favor, inténtalo de nuevo.",
  },
  errors: {
    notFound: "Página no encontrada",
    notFoundDesc: "La página que buscas no existe.",
    backHome: "Volver a inicio",
  },
  categories: {
    pageTitle: "Explorar por categoría",
    pageDesc: "{count}+ herramientas gratuitas organizadas en {cats} categorías. Sin cuenta, sin anuncios.",
    breadcrumb: "Categorías",
    toolCount: "{count} herramientas",
    browseCta: "Explorar {label}",
    freeToolsCount: "{count} herramientas gratuitas — sin cuenta necesaria",
    useFree: "Usar gratis",
    allCategories: "Todas las categorías",
    browseAllTools: "Explorar todas las herramientas",
  },
  categoryList: {
    "text-tools": {
      label: "Herramientas de texto",
      description: "Contadores de palabras, caracteres, formateadores de texto, conversores de mayúsculas, comparadores de diferencias y más — todos gratis e instantáneos.",
    },
    "number-calculators": {
      label: "Calculadoras numéricas",
      description: "Calculadoras de porcentaje, conversores de unidades, calculadoras de préstamo, IMC, GPA, propina y docenas de herramientas matemáticas más.",
    },
    "time-date-tools": {
      label: "Herramientas de tiempo",
      description: "Calculadoras de edad, diferencia de fechas, temporizadores de cuenta regresiva, cronómetro, temporizador Pomodoro y más.",
    },
    "generators": {
      label: "Generadores",
      description: "Generadores de contraseñas, lorem ipsum, números aleatorios, lanzamiento de moneda, dado, nombres y más.",
    },
    "dev-tools": {
      label: "Herramientas dev",
      description: "Formateador JSON, codificador Base64, lector de QR, probador de regex, constructor cURL, Markdown a HTML y más.",
    },
    "writing-ai": {
      label: "Escritura e IA",
      description: "Generador de bio con IA, parafraseador, resumidor de texto, generador de carta de presentación, generador de hashtags y más.",
    },
    "color-design-tools": {
      label: "Colores y diseño",
      description: "Conversor de color, hex a RGB, generador de paleta, generador de gradiente, buscador de nombres de color y más.",
    },
  },
    toolList: {
      "word-counter": {
        label: "Contador de Palabras",
        desc: "Cuenta palabras, caracteres y tiempo de lectura",
      },
      "case-converter": {
        label: "Convertidor de Mayúsculas/Minúsculas",
        desc: "MAYÚSCULAS, minúsculas, Título, camelCase y más",
      },
      "lorem-ipsum": {
        label: "Lorem Ipsum",
        desc: "Genera texto de marcador de posición al instante",
      },
      "sentence-counter": {
        label: "Contador de Oraciones",
        desc: "Cuenta oraciones, párrafos y más",
      },
      "line-break-removal-tool": {
        label: "Eliminador de Saltos de Línea",
        desc: "Elimina o limpia saltos de línea en texto",
      },
      "character-counter": {
        label: "Contador de Caracteres",
        desc: "Cuenta caracteres con y sin espacios",
      },
      "palindrome-checker": {
        label: "Verificador de Palíndromos",
        desc: "Comprueba si una palabra o frase es un palíndromo",
      },
      "vowel-counter": {
        label: "Contador de Vocales",
        desc: "Cuenta vocales y consonantes en cualquier texto",
      },
      "text-repeater": {
        label: "Repetidor de Texto",
        desc: "Repite cualquier texto N veces al instante",
      },
      "remove-duplicate-lines": {
        label: "Eliminar Líneas Duplicadas",
        desc: "Elimina líneas duplicadas de cualquier texto",
      },
      "sort-lines": {
        label: "Ordenar Líneas",
        desc: "Ordena líneas alfabética o numéricamente",
      },
      "whitespace-remover": {
        label: "Eliminador de Espacios en Blanco",
        desc: "Elimina espacios extra, tabulaciones, líneas en blanco",
      },
      "reverse-text-generator": {
        label: "Texto Invertido",
        desc: "Invierte cualquier texto u oración al instante",
      },
      "tiny-text-generator": {
        label: "Generador de Texto Diminuto",
        desc: "Convierte texto a caracteres Unicode diminutos",
      },
      "text-diff-checker": {
        label: "Comparador de Texto",
        desc: "Compara dos textos y resalta diferencias",
      },
      "reading-time-calculator": {
        label: "Calculadora de Tiempo de Lectura",
        desc: "Estima cuánto tiempo toma leer un texto",
      },
      "readability-checker": {
        label: "Verificador de Legibilidad",
        desc: "Comprueba la puntuación de legibilidad Flesch-Kincaid",
      },
      "merge-words": {
        label: "Fusionar Palabras",
        desc: "Combina dos listas de palabras",
      },
      "word-frequency-counter": {
        label: "Contador de Frecuencia de Palabras",
        desc: "Cuenta la frecuencia de cada palabra",
      },
      "morse-code": {
        label: "Convertidor Código Morse",
        desc: "Convierte texto a Código Morse y viceversa",
      },
      "signature-generator": {
        label: "Generador de Firmas",
        desc: "Crea firmas elegantes basadas en texto",
      },
      "percentage-calculator": {
        label: "Calculadora de Porcentajes",
        desc: "Calcula porcentajes, descuentos y más",
      },
      "unit-converter": {
        label: "Convertidor de Unidades",
        desc: "Convierte entre cualquier unidad de medida",
      },
      "tip-calculator": {
        label: "Calculadora de Propinas",
        desc: "Calcula propinas y divide cuentas",
      },
      "bmi-calculator": {
        label: "Calculadora de IMC",
        desc: "Calcula tu Índice de Masa Corporal",
      },
      "calorie-calculator": {
        label: "Calculadora de Calorías",
        desc: "Estima las necesidades calóricas diarias",
      },
      "gpa-calculator": {
        label: "Calculadora de GPA",
        desc: "Calcula tu Promedio de Calificaciones",
      },
      "salary-to-hourly": {
        label: "Salario a Por Hora",
        desc: "Convierte salario anual a tarifa por hora",
      },
      "loan-calculator": {
        label: "Calculadora de Préstamos",
        desc: "Calcula pagos mensuales e interés total",
      },
      "compound-interest-calculator": {
        label: "Calculadora Interés Compuesto",
        desc: "Calcula interés compuesto a lo largo del tiempo",
      },
      "discount-calculator": {
        label: "Calculadora de Descuentos",
        desc: "Encuentra el precio de venta después del descuento",
      },
      "random-number-generator": {
        label: "Generador de Números Aleatorios",
        desc: "Genera números aleatorios en cualquier rango",
      },
      "number-to-words": {
        label: "Número a Palabras",
        desc: "Convierte números a palabras escritas",
      },
      "roman-numeral-converter": {
        label: "Convertidor Números Romanos",
        desc: "Convierte entre números y números romanos",
      },
      "binary-to-decimal": {
        label: "Binario a Decimal",
        desc: "Convierte binario, decimal, hexadecimal y octal",
      },
      "geometric-mean-calculator": {
        label: "Calculadora Media Geométrica",
        desc: "Calcula la media geométrica de números",
      },
      "mass-calculator": {
        label: "Calculadora de Masa",
        desc: "Calcula la masa a partir de densidad y volumen",
      },
      "fuel-cost-calculator": {
        label: "Calculadora Costo Combustible",
        desc: "Estima los costos de combustible del viaje",
      },
      "army-body-fat-calculator": {
        label: "Calculadora Grasa Corporal Militar",
        desc: "Calcula la grasa corporal con método militar",
      },
      "histogram-maker": {
        label: "Creador de Histogramas",
        desc: "Crea histogramas a partir de tus datos",
      },
      "temperature-converter": {
        label: "Conversor de Temperatura",
        desc: "Convierte entre Celsius, Fahrenheit y Kelvin",
      },
      "weight-converter": {
        label: "Conversor de Peso",
        desc: "Convierte entre unidades de peso",
      },
      "length-converter": {
        label: "Conversor de Longitud",
        desc: "Convierte entre unidades de longitud y distancia",
      },
      "date-time-calculator": {
        label: "Calculadora de Fecha y Hora",
        desc: "Suma o resta fechas y horas",
      },
      "age-calculator": {
        label: "Calculadora de Edad",
        desc: "Calcula edad exacta en años, meses y días",
      },
      "days-between": {
        label: "Días entre Fechas",
        desc: "Cuenta días entre dos fechas",
      },
      "age-difference-calculator": {
        label: "Calculadora Diferencia de Edad",
        desc: "Encuentra la diferencia de edad entre dos personas",
      },
      "countdown-timer": {
        label: "Temporizador de Cuenta Regresiva",
        desc: "Cuenta regresiva para cualquier fecha o evento",
      },
      "stopwatch": {
        label: "Cronómetro",
        desc: "Cronómetro online preciso con tiempos de vuelta",
      },
      "pomodoro-timer": {
        label: "Temporizador Pomodoro",
        desc: "Temporizador de enfoque con técnica Pomodoro",
      },
      "color-converter": {
        label: "Conversor de Color",
        desc: "Convierte entre HEX, RGB, HSL y más",
      },
      "hex-to-rgb": {
        label: "HEX a RGB",
        desc: "Convierte códigos de color HEX a valores RGB",
      },
      "hex-color-picker": {
        label: "Selector de Color HEX",
        desc: "Selecciona y explora códigos de color HEX",
      },
      "color-palette-generator": {
        label: "Generador de Paleta de Colores",
        desc: "Genera hermosas paletas de colores",
      },
      "gradient-generator": {
        label: "Generador de Degradados",
        desc: "Crea fondos de degradado CSS",
      },
      "base64": {
        label: "Codificador/Decodificador Base64",
        desc: "Codifica y decodifica cadenas Base64",
      },
      "json-formatter": {
        label: "Formateador JSON",
        desc: "Formatea, valida y minifica JSON",
      },
      "url-encoder-decoder": {
        label: "Codificador/Decodificador URL",
        desc: "Codifica y decodifica cadenas URL",
      },
      "password-generator": {
        label: "Generador de Contraseñas",
        desc: "Genera contraseñas seguras aleatorias",
      },
      "uuid-generator": {
        label: "Generador UUID",
        desc: "Genera UUIDs aleatorios al instante",
      },
      "md5-hash-generator": {
        label: "Generador Hash MD5",
        desc: "Genera hashes MD5 a partir de texto",
      },
      "sha256-generator": {
        label: "Generador SHA-256",
        desc: "Genera hashes SHA-256 a partir de texto",
      },
      "html-encoder-decoder": {
        label: "Codificador/Decodificador HTML",
        desc: "Codifica y decodifica entidades HTML",
      },
      "markdown-to-html": {
        label: "Markdown a HTML",
        desc: "Convierte Markdown a HTML al instante",
      },
      "text-to-binary": {
        label: "Texto a Binario",
        desc: "Convierte texto a código binario",
      },
      "regex-tester": {
        label: "Probador Regex",
        desc: "Prueba y depura expresiones regulares",
      },
      "slug-generator": {
        label: "Generador de Slugs",
        desc: "Genera slugs URL amigables desde texto",
      },
      "curl-builder": {
        label: "Constructor cURL",
        desc: "Construye comandos cURL visualmente",
      },
      "csv-to-json": {
        label: "CSV a JSON",
        desc: "Convierte datos CSV a formato JSON",
      },
      "json-to-csv": {
        label: "JSON a CSV",
        desc: "Convierte datos JSON a formato CSV",
      },
      "rem-to-px-converter": {
        label: "Conversor REM a PX",
        desc: "Convierte unidades REM a píxeles",
      },
      "css-animation-generator": {
        label: "Generador Animación CSS",
        desc: "Genera animaciones CSS keyframe",
      },
      "generate-random-ip": {
        label: "Generador IP Aleatoria",
        desc: "Genera direcciones IP aleatorias",
      },
      "qr-code-reader": {
        label: "Lector Código QR",
        desc: "Lee y decodifica códigos QR",
      },
      "coin-flip": {
        label: "Lanzar Moneda",
        desc: "Lanza una moneda virtual online",
      },
      "dice-roller": {
        label: "Lanzador de Dados",
        desc: "Lanza dados virtuales de cualquier tipo",
      },
      "random-name-generator": {
        label: "Generador Nombres Aleatorios",
        desc: "Genera nombres aleatorios al instante",
      },
      "random-state-generator": {
        label: "Generador Estado Aleatorio",
        desc: "Elige un estado de EE. UU. al azar",
      },
      "random-word-generator": {
        label: "Generador Palabras Aleatorias",
        desc: "Genera palabras aleatorias al instante",
      },
      "goofy-ahh-names-generator": {
        label: "Generador Nombres Goofy",
        desc: "Genera nombres divertidos y tontos",
      },
      "acronym-generator": {
        label: "Generador de acrónimos",
        desc: "Crea acrónimos de cualquier frase",
      },
      "outline-generator-ai": {
        label: "Generador de esquemas AI",
        desc: "Genera esquemas con IA",
      },
      "thank-you-note": {
        label: "Generador de notas de agradecimiento",
        desc: "Escribe notas de agradecimiento con IA",
      },
      "ai-joke-generator": {
        label: "Generador de chistes AI",
        desc: "Genera chistes con IA",
      },
      "ai-poem-writer": {
        label: "Escritor de poemas AI",
        desc: "Escribe poemas con IA",
      },
      "ai-bio-generator": {
        label: "Generador de biografía AI",
        desc: "Genera biografías profesionales con IA",
      },
      "email-subject-line-generator": {
        label: "Generador de asuntos de email",
        desc: "Genera asuntos de email con IA",
      },
      "hashtag-generator": {
        label: "Generador de hashtags",
        desc: "Genera hashtags para redes sociales",
      },
      "caption-generator": {
        label: "Generador de subtítulos",
        desc: "Genera subtítulos con IA",
      },
      "cover-letter-generator": {
        label: "Generador de cartas de presentación",
        desc: "Escribe cartas de presentación con IA",
      },
      "product-description-generator": {
        label: "Generador de descripción de producto",
        desc: "Genera descripciones de productos con IA",
      },
      "paraphrasing-tool": {
        label: "Herramienta de parafraseo",
        desc: "Reescribe texto con diferentes palabras",
      },
      "summarizer": {
        label: "Resumidor de texto",
        desc: "Resume texto largo con IA",
      },
      "text-to-bullet-points": {
        label: "Texto a viñetas",
        desc: "Convierte texto a viñetas",
      },
      "meeting-agenda-generator": {
        label: "Generador de agenda de reunión",
        desc: "Genera agendas de reuniones con IA",
      },
      "email-generator": {
        label: "Generador de emails",
        desc: "Escribe emails profesionales con IA",
      },
    },
} as const;

export default common;