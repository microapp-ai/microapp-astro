/**
 * en/home.ts — Home page specific strings.
 */
const home = {
  hero: {
    badge: "Más de 106 herramientas gratuitas — no se necesita cuenta",
    headline1: "Todas las herramientas que necesitas,",
    headline2: "aquí mismo.",
    subheadline: "Microapp es la colección #1 de herramientas de utilidad en línea gratuitas. Contadores de palabras, calculadoras, convertidores, generadores — todo instantáneo, todo gratis.",
    ctaPrimary: "Explorar todas las herramientas",
    ctaSecondary: "Más populares →",
  },
  search: {
    placeholder: "Buscar {count} herramientas…",
    noResults: "No se encontraron herramientas para '{query}'",

    noResultsHint: "Intenta con una palabra clave diferente o busca por categoría.",
    resultsCount: "{count} herramienta encontrada",
    resultsCountPlural: "{count} herramientas encontradas",
  },
  categories: {
    all: "Todas",
    text: "Herramientas de texto",
    numbers: "Números",
    time: "Hora y fecha",
    generators: "Generadores",
    dev: "Herramientas de desarrollo",
    writing: "Escritura e IA",
    design: "Colores y diseño",
  },
  social: {
    title: "Amado por miles",
    subtitle: "Comentarios reales de usuarios reales",
  },
  whySection: {
    title: "¿Por qué Microapp?",
    subtitle: "Construimos las herramientas que deseábamos que existieran.",
    items: {
      fast: {
        title: "Resultados instantáneos",
        desc: "Cada herramienta se ejecuta completamente en tu navegador. Sin viajes de ida y vuelta al servidor, sin esperas.",
      },
      free: {
        title: "Siempre gratis",
        desc: "Sin muros de pago, sin niveles premium, sin \"actualizar para desbloquear\". Todas las herramientas, gratis para siempre.",
      },
      private: {
        title: "Privacidad primero",
        desc: "Tus datos nunca salen de tu dispositivo. No registramos entradas, almacenamos resultados ni vendemos datos.",
      },
      noSignup: {
        title: "No se necesita cuenta",
        desc: "Simplemente abre una herramienta y úsala. Sin correo electrónico, sin contraseña, sin fricción.",
      },
    },
  },
  stats: {
    tools: "{count}+ Herramientas gratuitas",
    signups: "0 Registros requeridos",
    browserBased: "100% Basado en navegador",
  },
  featured: {
    badge: "Herramienta destacada",
    title: "Contador de palabras — bien hecho.",
    desc: "Pega cualquier texto y ve instantáneamente el recuento de palabras, caracteres, oraciones, párrafos y el tiempo estimado de lectura. Sin anuncios, sin registro, sin tonterías.",
    cta: "Probar Contador de palabras",
  },
} as const;

export default home;
