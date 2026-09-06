/**
 * CONTENIDO DEMO + CONTENIDO REAL (fallback local).
 *
 * Este módulo cumple dos funciones:
 *  1. Fallback de desarrollo cuando NO hay Sanity configurado (PUBLIC_SANITY_PROJECT_ID vacío).
 *  2. Fuente para el seed inicial de Sanity (scripts/export-demo-ndjson.mjs).
 *
 * REGLA: sólo es "real" lo confirmado en el prompt del cliente. Todo lo demás lleva
 * isDemo: true y se muestra con el badge "CONTENIDO DEMO — REEMPLAZAR".
 *
 * Contenido REAL incluido aquí:
 *  - about  (texto de Javier Martínez, tal cual; traducción EN pendiente de su revisión)
 *  - settings.whatsapp / settings.instagram
 *  - location.placeName + location.attentionNote  (dirección aún pendiente)
 */
import type { SiteContent } from "@/types";

const DEMO = "[CONTENIDO DEMO — REEMPLAZAR]";

export const demoContent: SiteContent = {
  usingLocalDemo: true,

  settings: {
    whatsappNumber: "56952559138",
    whatsappDefaultMessage: {
      es: "Hola! me gustaría tener más información sobre los cursos...",
      en: "Hi! I'd like more information about the courses...",
    },
    instagramHandle: "academyglider",
    instagramUrl: "https://www.instagram.com/academyglider/",
    demoMode: true,
    logo: {
      url: "/logo-academyglider.jpg",
      alt: { es: "AcademyGlider", en: "AcademyGlider" },
    },
  },

  home: {
    isDemo: true,
    title: {
      es: `${DEMO} Aprende a volar en parapente`,
      en: `${DEMO} Learn to fly a paraglider`,
    },
    subtitle: {
      es: `${DEMO} Formación progresiva, segura y conectada con la naturaleza de Chile.`,
      en: `${DEMO} Progressive, safe training, connected with the nature of Chile.`,
    },
    ctaLabel: { es: "Escríbenos por WhatsApp", en: "Message us on WhatsApp" },
    secondaryCtaLabel: { es: "Ver los cursos", en: "See the courses" },
    complementaryText: {
      es: `${DEMO} Texto complementario provisional del Home. Aquí irá una frase breve sobre la escuela, la metodología y la experiencia de volar al atardecer. Se reemplazará desde el CMS.`,
      en: `${DEMO} Provisional supporting text for the Home section. A short line about the school, the methodology and the experience of flying at sunset will go here. To be replaced from the CMS.`,
    },
    heroMedia: {
      url: "/demo/hero.svg",
      alt: {
        es: `${DEMO} Parapente volando sobre montañas al atardecer`,
        en: `${DEMO} Paraglider flying over mountains at sunset`,
      },
    },
  },

  about: {
    isDemo: false,
    heading: { es: "Quiénes somos", en: "About us" },
    highlightNumber: { es: "+20", en: "+20" },
    highlightLabel: { es: "años dedicado al parapente", en: "years dedicated to paragliding" },
    body: {
      es: [
        "Soy Javier Martínez, instructor de parapente, y llevo más de 20 años dedicado a este deporte. A lo largo de este tiempo he desarrollado experiencia en distintas modalidades de vuelo, formando pilotos con una metodología de enseñanza basada en la seguridad, la técnica y el aprendizaje progresivo.",
        "Mi mayor motivación es compartir el vuelo de una forma responsable, entregando a cada alumno las herramientas necesarias para que pueda desarrollar autonomía y confianza en cada etapa de su formación.",
        "Además de enseñar, disfruto explorando Chile desde el aire y la montaña. El vuelo me ha permitido descubrir lugares únicos, recorrer distintos paisajes y vivir experiencias que hoy forman parte de mi forma de enseñar y entender este deporte.",
        "Creo que el parapente no solo consiste en despegar, sino en comprender el entorno, tomar buenas decisiones y disfrutar cada vuelo con respeto por la naturaleza y por la seguridad. Esa es la filosofía que transmito en cada curso y en cada salida a la montaña.",
      ].join("\n\n"),
      en: [
        "I'm Javier Martínez, a paragliding instructor, and I have spent more than 20 years dedicated to this sport. Over this time I have developed experience in different flying disciplines, training pilots with a teaching methodology based on safety, technique and progressive learning.",
        "My greatest motivation is to share flight in a responsible way, giving each student the tools they need to develop autonomy and confidence at every stage of their training.",
        "Besides teaching, I enjoy exploring Chile from the air and the mountains. Flying has allowed me to discover unique places, travel through different landscapes and live experiences that are now part of how I teach and understand this sport.",
        "I believe paragliding is not only about taking off, but about understanding the environment, making good decisions and enjoying every flight with respect for nature and for safety. That is the philosophy I pass on in every course and every trip to the mountains.",
      ].join("\n\n"),
    },
    photo: {
      url: "/demo/about.svg",
      alt: {
        es: "Javier Martínez, instructor de AcademyGlider",
        en: "Javier Martínez, AcademyGlider instructor",
      },
    },
  },

  courses: [
    {
      _id: "course-demo-1",
      slug: "curso-iniciacion-demo",
      isDemo: true,
      active: true,
      order: 1,
      title: { es: `${DEMO} Curso de Iniciación`, en: `${DEMO} Beginner Course` },
      shortDescription: {
        es: "Tu primer contacto con el parapente: teoría básica, manejo de vela en tierra y primeros vuelos.",
        en: "Your first contact with paragliding: basic theory, ground handling and first flights.",
      },
      longDescription: {
        es: `${DEMO} Descripción larga provisional del curso de iniciación. Se detallará el temario, la progresión y lo que incluye. Reemplazar con información real desde el CMS.`,
        en: `${DEMO} Provisional long description of the beginner course. Syllabus, progression and what's included will be detailed here. Replace with real information from the CMS.`,
      },
      duration: { es: "8 días (ejemplo)", en: "8 days (example)" },
      price: 690000,
      currency: "CLP",
      priceDisplayMode: "mostrar",
      features: [
        { es: "Equipo incluido durante el curso", en: "Equipment included during the course" },
        { es: "Grupos reducidos", en: "Small groups" },
        { es: "Teoría + práctica en ladera", en: "Theory + slope practice" },
        { es: "Seguro de accidentes (ejemplo)", en: "Accident insurance (example)" },
      ],
      level: "principiante",
      image: {
        url: "/demo/course-1.svg",
        alt: { es: `${DEMO} Curso de iniciación`, en: `${DEMO} Beginner course` },
      },
      pagoHabilitado: false,
    },
    {
      _id: "course-demo-2",
      slug: "curso-perfeccionamiento-demo",
      isDemo: true,
      active: true,
      order: 2,
      title: { es: `${DEMO} Curso de Perfeccionamiento`, en: `${DEMO} Advanced Course` },
      shortDescription: {
        es: "Para pilotos con base previa que quieren dar el siguiente paso: autonomía, térmica y toma de decisiones.",
        en: "For pilots with a prior base who want the next step: autonomy, thermalling and decision-making.",
      },
      longDescription: {
        es: `${DEMO} Descripción larga provisional del curso de perfeccionamiento. Reemplazar con información real desde el CMS.`,
        en: `${DEMO} Provisional long description of the advanced course. Replace with real information from the CMS.`,
      },
      duration: { es: "5 días (ejemplo)", en: "5 days (example)" },
      price: 0,
      currency: "CLP",
      priceDisplayMode: "consultar",
      features: [
        { es: "Análisis de vuelo con video", en: "Video flight analysis" },
        { es: "Vuelos guiados por radio", en: "Radio-guided flights" },
        { es: "Meteorología aplicada", en: "Applied meteorology" },
      ],
      level: "avanzado",
      image: {
        url: "/demo/course-2.svg",
        alt: { es: `${DEMO} Curso de perfeccionamiento`, en: `${DEMO} Advanced course` },
      },
      pagoHabilitado: false,
    },
  ],

  reviews: [
    {
      _id: "review-demo-1",
      isDemo: true,
      active: true,
      order: 1,
      authorName: "[REVIEW DEMO] Camila R.",
      rating: 5,
      text: {
        es: `${DEMO} Testimonio de demostración. Aquí aparecerá una reseña real de un alumno o alumna, ingresada desde el CMS.`,
        en: `${DEMO} Demonstration testimonial. A real student review, entered from the CMS, will appear here.`,
      },
      courseName: { es: "Curso de Iniciación", en: "Beginner Course" },
      photo: { url: "/demo/review-1.svg", alt: { es: "[REVIEW DEMO]", en: "[REVIEW DEMO]" } },
    },
    {
      _id: "review-demo-2",
      isDemo: true,
      active: true,
      order: 2,
      authorName: "[REVIEW DEMO] Matías P.",
      rating: 5,
      text: {
        es: `${DEMO} Testimonio de demostración número dos. Reemplazar con contenido real desde el CMS.`,
        en: `${DEMO} Demonstration testimonial number two. Replace with real content from the CMS.`,
      },
      photo: { url: "/demo/review-2.svg", alt: { es: "[REVIEW DEMO]", en: "[REVIEW DEMO]" } },
    },
    {
      _id: "review-demo-3",
      isDemo: true,
      active: true,
      order: 3,
      authorName: "[REVIEW DEMO] Antonia L.",
      rating: 4,
      text: {
        es: `${DEMO} Testimonio de demostración número tres. Reemplazar con contenido real desde el CMS.`,
        en: `${DEMO} Demonstration testimonial number three. Replace with real content from the CMS.`,
      },
      courseName: { es: "Curso de Perfeccionamiento", en: "Advanced Course" },
      photo: { url: "/demo/review-3.svg", alt: { es: "[REVIEW DEMO]", en: "[REVIEW DEMO]" } },
    },
  ],

  faqCategories: [
    {
      _id: "faqcat-1",
      active: true,
      order: 1,
      name: { es: "Antes de empezar", en: "Before you start" },
    },
    {
      _id: "faqcat-2",
      active: true,
      order: 2,
      name: { es: "Durante el curso", en: "During the course" },
    },
    { _id: "faqcat-3", active: true, order: 3, name: { es: "Seguridad", en: "Safety" } },
    {
      _id: "faqcat-4",
      active: true,
      order: 4,
      name: { es: "Reservas y pagos", en: "Booking & payments" },
    },
  ],

  faqItems: [
    {
      _id: "faq-1",
      isDemo: true,
      active: true,
      order: 1,
      categoryId: "faqcat-1",
      question: {
        es: "[FAQ DEMO] ¿Necesito experiencia previa?",
        en: "[FAQ DEMO] Do I need previous experience?",
      },
      answer: {
        es: `${DEMO} Respuesta provisional. La respuesta real se configurará desde el CMS.`,
        en: `${DEMO} Provisional answer. The real answer will be configured from the CMS.`,
      },
    },
    {
      _id: "faq-2",
      isDemo: true,
      active: true,
      order: 2,
      categoryId: "faqcat-1",
      question: {
        es: "[FAQ DEMO] ¿Qué ropa y calzado llevo?",
        en: "[FAQ DEMO] What clothing and footwear should I bring?",
      },
      answer: {
        es: `${DEMO} Respuesta provisional sobre indumentaria. Reemplazar desde el CMS.`,
        en: `${DEMO} Provisional answer about clothing. Replace from the CMS.`,
      },
    },
    {
      _id: "faq-3",
      isDemo: true,
      active: true,
      order: 1,
      categoryId: "faqcat-2",
      question: {
        es: "[FAQ DEMO] ¿Cuántas personas hay por grupo?",
        en: "[FAQ DEMO] How many people are in each group?",
      },
      answer: {
        es: `${DEMO} Respuesta provisional sobre el tamaño de los grupos. Reemplazar desde el CMS.`,
        en: `${DEMO} Provisional answer about group size. Replace from the CMS.`,
      },
    },
    {
      _id: "faq-4",
      isDemo: true,
      active: true,
      order: 1,
      categoryId: "faqcat-3",
      question: {
        es: "[FAQ DEMO] ¿Qué pasa si las condiciones no son buenas?",
        en: "[FAQ DEMO] What happens if conditions aren't good?",
      },
      answer: {
        es: `${DEMO} Respuesta provisional sobre meteorología y reprogramación. Reemplazar desde el CMS.`,
        en: `${DEMO} Provisional answer about weather and rescheduling. Replace from the CMS.`,
      },
    },
    {
      _id: "faq-5",
      isDemo: true,
      active: true,
      order: 1,
      categoryId: "faqcat-4",
      question: {
        es: "[FAQ DEMO] ¿Cómo reservo mi cupo?",
        en: "[FAQ DEMO] How do I book my spot?",
      },
      answer: {
        es: `${DEMO} Por ahora la coordinación es por WhatsApp. Respuesta real pendiente de configurar en el CMS.`,
        en: `${DEMO} For now, coordination is via WhatsApp. Real answer pending configuration in the CMS.`,
      },
    },
  ],

  gallery: {
    source: "instagram",
    maxItems: 9,
    instagramCtaLabel: { es: "Ver más en Instagram", en: "See more on Instagram" },
    manualImages: Array.from({ length: 6 }, (_, i) => ({
      image: {
        url: `/demo/gallery-${i + 1}.svg`,
        alt: {
          es: `${DEMO} Fotografía de Instagram ${i + 1}`,
          en: `${DEMO} Instagram photo ${i + 1}`,
        },
      },
      link: "https://www.instagram.com/academyglider/",
    })),
  },

  location: {
    placeName: "Geopark Vizcachaz",
    addressPending: true,
    address: { es: "", en: "" },
    mapEmbedUrl: "",
    navigationUrl: "",
    attentionNote: {
      es: "Atención con agenda previa. Coordina tu visita por WhatsApp. No hay un horario fijo.",
      en: "By appointment only. Coordinate your visit via WhatsApp. There are no fixed hours.",
    },
  },

  ctaFinal: {
    isDemo: true,
    title: {
      es: `${DEMO} Tu próximo vuelo empieza hoy`,
      en: `${DEMO} Your next flight starts today`,
    },
    text: {
      es: `${DEMO} Texto provisional de la llamada a la acción final. Aventura, libertad y atardecer. Reemplazar desde el CMS.`,
      en: `${DEMO} Provisional text for the final call to action. Adventure, freedom and sunset. Replace from the CMS.`,
    },
    buttonLabel: { es: "Coordinar por WhatsApp", en: "Coordinate on WhatsApp" },
    backgroundMedia: {
      url: "/demo/cta.svg",
      alt: { es: `${DEMO} Atardecer desde el aire`, en: `${DEMO} Sunset from the air` },
    },
  },

  footer: {
    tagline: { es: "Escuela de parapente", en: "Paragliding school" },
    showLegal: false,
    legalLinks: [],
  },

  headers: {
    courses: {
      isDemo: true,
      title: { es: "Cursos", en: "Courses" },
      intro: {
        es: `${DEMO} Introducción provisional a los cursos. Reemplazar desde el CMS.`,
        en: `${DEMO} Provisional intro to the courses. Replace from the CMS.`,
      },
    },
    gallery: {
      isDemo: false,
      title: { es: "Galería", en: "Gallery" },
      intro: {
        es: "Fotografías directamente desde nuestro Instagram @academyglider.",
        en: "Photos straight from our Instagram @academyglider.",
      },
    },
    reviews: {
      isDemo: true,
      title: { es: "Reseñas", en: "Reviews" },
      intro: {
        es: `${DEMO} Introducción provisional a las reseñas. Reemplazar desde el CMS.`,
        en: `${DEMO} Provisional intro to the reviews. Replace from the CMS.`,
      },
    },
    faq: {
      isDemo: true,
      title: { es: "Preguntas frecuentes", en: "FAQ" },
      intro: {
        es: `${DEMO} Elige una categoría y una pregunta para ver la respuesta.`,
        en: `${DEMO} Choose a category and a question to see the answer.`,
      },
      welcome: {
        es: `${DEMO} ¡Hola! ¿Sobre qué te gustaría saber?`,
        en: `${DEMO} Hi! What would you like to know about?`,
      },
    },
    location: {
      isDemo: false,
      title: { es: "Ubicación", en: "Location" },
      intro: {
        es: "Volamos en Geopark Vizcachaz.",
        en: "We fly at Geopark Vizcachaz.",
      },
    },
  },
};
