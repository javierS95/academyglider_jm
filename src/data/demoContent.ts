/**
 * CONTENIDO DEL SITIO (fallback local + fuente del seed de Sanity).
 *
 *  1. Fallback cuando NO hay Sanity configurado (PUBLIC_SANITY_PROJECT_ID vacío).
 *  2. Fuente para `scripts/export-demo-ndjson.mjs` → `seed/demo.ndjson`.
 *
 * REAL (confirmado o rescatado del borrador de julio 2026 del propio cliente):
 *  - about  → texto de Javier Martínez (del prompt, sin alterar)
 *  - courses → 3 cursos con descripciones ES/EN (borrador de julio, revisar con Javier)
 *  - reviews[0] → reseña real de Javier Serrano
 *  - faqCategories / faqItems → 6 preguntas con respuestas (borrador de julio)
 *  - home hero → textos del borrador de julio
 *  - settings.whatsapp / instagram · location.placeName + attentionNote
 *  - public/photos/*.jpg → fotos reales de AcademyGlider (hero + CTA)
 *
 * DEMO (marcado, reemplazar desde el CMS): complementaryText del Home, CTA final,
 * reviews[1..2], imágenes de cursos y de "Quiénes somos", dirección/mapa exactos.
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
    isDemo: false,
    title: { es: "Bienvenid@ a AcademyGlider", en: "Welcome to AcademyGlider" },
    subtitle: {
      es: "Disfruta el sentimiento de libertad al volar.",
      en: "Enjoy the feeling of freedom while flying.",
    },
    ctaLabel: { es: "Escríbenos por WhatsApp", en: "Message us on WhatsApp" },
    secondaryCtaLabel: {
      es: "Comienza tu camino y conviértete en piloto",
      en: "Start your journey and become a pilot",
    },
    complementaryText: {
      es: `${DEMO} Frase complementaria del Home (metodología, seguridad, la experiencia de volar al atardecer). Reemplazar desde el CMS.`,
      en: `${DEMO} Supporting line for the Home section (methodology, safety, the experience of flying at sunset). Replace from the CMS.`,
    },
    heroMedia: {
      url: "/photos/pilot-coastal-launch.jpg",
      alt: {
        es: "Piloto de AcademyGlider despegando en parapente frente a la costa",
        en: "AcademyGlider pilot launching a paraglider by the coast",
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
        es: `${DEMO} Foto de Javier Martínez (pendiente)`,
        en: `${DEMO} Photo of Javier Martínez (pending)`,
      },
    },
  },

  courses: [
    {
      _id: "course-principiantes",
      slug: "curso-para-principiantes",
      isDemo: false,
      active: true,
      order: 1,
      title: { es: "Curso para principiantes", en: "Course for beginners" },
      shortDescription: {
        es: "Aprende desde cero con acompañamiento personalizado y grupos reducidos. Da tu primer paso con confianza.",
        en: "Learn from scratch with personalized support and small groups. Take your first step with confidence.",
      },
      longDescription: {
        es: "Este curso para principiantes está diseñado para quienes quieren aprender desde cero, sin conocimientos previos. A través de clases prácticas y contenido claro, irás construyendo una base sólida que te preparará para seguir avanzando con confianza.\n\nLo que aprenderás:\n- Conceptos fundamentales explicados de forma simple\n- Ejercicios prácticos guiados paso a paso\n- Acompañamiento personalizado durante todo el proceso\n\nIdeal si estás recién comenzando y quieres dar el primer paso de forma segura y guiada. Escríbenos por WhatsApp si tienes dudas antes de inscribirte.",
        en: "This beginner course is designed for those who want to learn from scratch, with no prior experience required. Through hands-on classes and clear content, you'll build a solid foundation that prepares you to keep advancing with confidence.\n\nWhat you'll learn:\n- Core concepts explained in simple terms\n- Guided, step-by-step practical exercises\n- Personalized support throughout the process\n\nPerfect if you're just getting started and want to take your first step in a safe, guided way. Message us on WhatsApp if you have questions before enrolling.",
      },
      duration: { es: "Consúltanos", en: "Ask us" },
      price: 0,
      currency: "CLP",
      priceDisplayMode: "consultar",
      features: [
        { es: "Sin experiencia previa", en: "No prior experience needed" },
        { es: "Grupos reducidos", en: "Small groups" },
        { es: "Acompañamiento personalizado", en: "Personalized support" },
        { es: "Clases prácticas paso a paso", en: "Hands-on, step-by-step classes" },
      ],
      level: "principiante",
      image: {
        url: "/demo/course-1.svg",
        alt: {
          es: `${DEMO} Foto del curso para principiantes (pendiente)`,
          en: `${DEMO} Beginner course photo (pending)`,
        },
      },
      pagoHabilitado: false,
    },
    {
      _id: "course-ppg2",
      slug: "curso-perfeccionamiento-ppg2",
      isDemo: false,
      active: true,
      order: 2,
      title: {
        es: "Curso de Perfeccionamiento (PPG2)",
        en: "Advanced Course (PPG2)",
      },
      shortDescription: {
        es: "Para pilotos con brevet PPG1 que quieren volar con más autonomía: térmica, distancia y toma de decisiones en el aire.",
        en: "For pilots who already hold a PPG1 license and want to fly with more autonomy: thermalling, cross-country flying and in-air decision making.",
      },
      longDescription: {
        es: "Este curso está pensado para pilotos brevetados que quieren dar el siguiente paso: volar con más autonomía, entender mejor el clima y empezar a aprovechar térmicas para ganar altura y distancia.\n\nLo que aprenderás:\n- Lectura de condiciones y meteorología básica\n- Vuelo térmico y ganancia de altura\n- Toma de decisiones y gestión de riesgo en el aire\n- Introducción al vuelo de distancia\n\n¿Ya tienes tu PPG1 y quieres seguir avanzando? Escríbenos por WhatsApp para coordinar tu cupo.",
        en: "This course is designed for licensed pilots who want to take the next step: flying with more autonomy, better understanding weather conditions, and starting to use thermals to gain altitude and distance.\n\nWhat you'll learn:\n- Reading conditions and basic weather patterns\n- Thermal flying and altitude gain\n- In-air decision making and risk management\n- Introduction to cross-country flying\n\nAlready have your PPG1? Message us on WhatsApp to coordinate your spot.",
      },
      duration: { es: "4 fines de semana", en: "4 weekends" },
      price: 0,
      currency: "CLP",
      priceDisplayMode: "consultar",
      features: [
        { es: "Requiere brevet PPG1", en: "PPG1 license required" },
        { es: "Vuelo térmico y ganancia de altura", en: "Thermal flying and altitude gain" },
        { es: "Meteorología aplicada", en: "Applied meteorology" },
        { es: "Introducción al vuelo de distancia", en: "Intro to cross-country flying" },
      ],
      level: "avanzado",
      image: {
        url: "/demo/course-2.svg",
        alt: {
          es: `${DEMO} Foto del curso PPG2 (pendiente)`,
          en: `${DEMO} PPG2 course photo (pending)`,
        },
      },
      pagoHabilitado: false,
    },
    {
      _id: "course-biplaza",
      slug: "vuelo-biplaza",
      isDemo: false,
      active: true,
      order: 3,
      title: {
        es: "Vuelo Biplaza (Bautismo de Vuelo)",
        en: "Tandem Flight (Discovery Flight)",
      },
      shortDescription: {
        es: "Vuela junto a un piloto instructor, sin conocimientos previos. Ideal como primer acercamiento antes de un curso.",
        en: "Fly together with an instructor pilot, no prior knowledge needed. A perfect first taste before a full course.",
      },
      longDescription: {
        es: "El vuelo biplaza es la forma más simple de descubrir qué se siente volar en parapente. Vuelas acompañado en todo momento por un piloto instructor, sin necesidad de experiencia ni preparación previa.\n\nIdeal si:\n- Quieres regalar o regalarte una experiencia distinta\n- Estás evaluando si te gustaría hacer el curso completo\n- Simplemente quieres vivir la sensación de volar al menos una vez\n\nAgenda tu vuelo biplaza por WhatsApp y vive la experiencia.",
        en: "A tandem flight is the simplest way to discover what paragliding feels like. You fly the whole time alongside an instructor pilot, with no experience or preparation required.\n\nPerfect if:\n- You want to give (or treat yourself to) a unique experience\n- You're deciding whether to take the full course\n- You simply want to feel what flying is like, at least once\n\nBook your tandem flight on WhatsApp and live the experience.",
      },
      duration: {
        es: "Aprox. 20-30 minutos de vuelo",
        en: "Approx. 20-30 minute flight",
      },
      price: 0,
      currency: "CLP",
      priceDisplayMode: "consultar",
      features: [
        { es: "Sin experiencia previa", en: "No prior experience needed" },
        { es: "Vuelas con un piloto instructor", en: "You fly with an instructor pilot" },
        { es: "Ideal para regalar", en: "A great gift" },
      ],
      level: "otro",
      image: {
        url: "/photos/sunset-flight.jpg",
        alt: {
          es: "Parapente en vuelo al atardecer sobre el valle",
          en: "Paraglider in flight at sunset over the valley",
        },
      },
      pagoHabilitado: false,
    },
  ],

  reviews: [
    {
      _id: "review-javier-serrano",
      isDemo: false,
      active: true,
      order: 1,
      authorName: "Javier Serrano",
      rating: 5,
      text: {
        es: "Increíble el curso y la academia, Javier se da el tiempo de responder cada pregunta antes, durante y después del curso. Ya lo terminé y hasta el día de hoy sigue súper abierto a seguir enseñando cosas más avanzadas poco a poco. Te orientan súper bien qué equipo comprar según también tu presupuesto. Recomendado 10 de 10.",
        en: "Amazing course and academy. Javier takes the time to answer every question before, during and after the course. I already finished it, and to this day he's still very open to keep teaching more advanced things little by little. They guide you really well on what equipment to buy according to your budget too. 10 out of 10, highly recommended.",
      },
      courseName: { es: "Curso para principiantes", en: "Course for beginners" },
    },
    {
      _id: "review-demo-2",
      isDemo: true,
      active: true,
      order: 2,
      authorName: "[REVIEW DEMO] Matías P.",
      rating: 5,
      text: {
        es: `${DEMO} Testimonio de demostración. Reemplazar con una reseña real desde el CMS.`,
        en: `${DEMO} Demonstration testimonial. Replace with a real review from the CMS.`,
      },
    },
    {
      _id: "review-demo-3",
      isDemo: true,
      active: true,
      order: 3,
      authorName: "[REVIEW DEMO] Antonia L.",
      rating: 4,
      text: {
        es: `${DEMO} Testimonio de demostración. Reemplazar con una reseña real desde el CMS.`,
        en: `${DEMO} Demonstration testimonial. Replace with a real review from the CMS.`,
      },
      courseName: { es: "Curso de Perfeccionamiento (PPG2)", en: "Advanced Course (PPG2)" },
    },
  ],

  faqCategories: [
    {
      _id: "faqcat-cursos",
      active: true,
      order: 1,
      name: { es: "Sobre los cursos", en: "About the courses" },
    },
    { _id: "faqcat-seguridad", active: true, order: 2, name: { es: "Seguridad", en: "Safety" } },
    {
      _id: "faqcat-reservas",
      active: true,
      order: 3,
      name: { es: "Reservas y contacto", en: "Booking & contact" },
    },
  ],

  faqItems: [
    {
      _id: "faq-experiencia-previa",
      isDemo: false,
      active: true,
      order: 1,
      categoryId: "faqcat-cursos",
      question: {
        es: "¿Necesito experiencia previa para tomar el curso?",
        en: "Do I need prior experience to take the course?",
      },
      answer: {
        es: "No, nuestros cursos están diseñados para personas sin experiencia previa. Empezamos desde cero y avanzamos a tu ritmo.",
        en: "No, our courses are designed for people with no prior experience. We start from scratch and move at your own pace.",
      },
    },
    {
      _id: "faq-edad-minima",
      isDemo: false,
      active: true,
      order: 2,
      categoryId: "faqcat-cursos",
      question: {
        es: "¿Qué edad mínima se requiere para volar en parapente?",
        en: "What is the minimum age to fly paragliding?",
      },
      answer: {
        es: "En general se recomienda desde los 14-16 años con autorización de un adulto responsable. Escríbenos y te confirmamos según el curso que te interesa.",
        en: "Generally recommended from age 14-16 with authorization from a responsible adult. Message us and we'll confirm based on the course you're interested in.",
      },
    },
    {
      _id: "faq-duracion-curso",
      isDemo: false,
      active: true,
      order: 3,
      categoryId: "faqcat-cursos",
      question: {
        es: "¿Cuánto dura el curso completo?",
        en: "How long does the full course take?",
      },
      answer: {
        es: "Depende del curso: el curso para principiantes y el de perfeccionamiento (PPG2) tienen distintas duraciones. Revisa el detalle en la sección Cursos o escríbenos.",
        en: "It depends on the course: the beginner course and the advanced course (PPG2) have different durations. Check the details in the Courses section or message us.",
      },
    },
    {
      _id: "faq-que-llevar",
      isDemo: false,
      active: true,
      order: 4,
      categoryId: "faqcat-cursos",
      question: {
        es: "¿Qué debo llevar el primer día de clases?",
        en: "What should I bring on my first day of class?",
      },
      answer: {
        es: "Ropa cómoda y abrigada, zapatillas o botas cerradas, protector solar y muchas ganas de aprender. Nosotros ponemos el equipo durante el curso.",
        en: "Comfortable, warm clothing, closed shoes or boots, sunscreen, and lots of enthusiasm to learn. We provide the gear during the course.",
      },
    },
    {
      _id: "faq-peligroso",
      isDemo: false,
      active: true,
      order: 1,
      categoryId: "faqcat-seguridad",
      question: { es: "¿Es peligroso el parapente?", en: "Is paragliding dangerous?" },
      answer: {
        es: "Como todo deporte aéreo tiene riesgos, pero se gestionan activamente con instrucción adecuada, equipo certificado y buenas decisiones sobre las condiciones climáticas.",
        en: "Like any air sport it carries risk, but it's actively managed through proper instruction, certified gear, and good decisions about weather conditions.",
      },
    },
    {
      _id: "faq-inscripcion",
      isDemo: false,
      active: true,
      order: 1,
      categoryId: "faqcat-reservas",
      question: {
        es: "¿Cómo me inscribo o agendo una clase?",
        en: "How do I enroll or book a class?",
      },
      answer: {
        es: "Escríbenos por WhatsApp y coordinamos tu cupo según disponibilidad.",
        en: "Message us on WhatsApp and we'll coordinate your spot based on availability.",
      },
    },
  ],

  gallery: {
    // Fuente "posts": lista de URLs de publicaciones. La portada de cada una se
    // sirve por nuestro proxy /api/ig-image (sin token, sin servicios externos).
    // Editable desde el CMS. Son las 6 publicaciones más recientes del perfil de
    // @academyglider (2026-09), SIN filtrar (incluye colaboraciones).
    source: "posts",
    maxItems: 6,
    instagramCtaLabel: { es: "Ver más en Instagram", en: "See more on Instagram" },
    instagramPostUrls: [
      "https://www.instagram.com/academyglider/reel/DWMHaF3u_sx/",
      "https://www.instagram.com/academyglider/reel/DWG25QEBDMX/",
      "https://www.instagram.com/javmartinezt/reel/DN6YB9wAR4-/",
      "https://www.instagram.com/academyglider/reel/Dc7OuJOtXV4/",
      "https://www.instagram.com/javmartinezt/reel/DcXkwEgteME/",
      "https://www.instagram.com/academyglider/reel/DcNUBfDNYMD/",
    ],
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
    // Coordenadas confirmadas por el cliente (sector Las Vizcachas). Falta la
    // dirección de calle exacta -> se mantiene "coordina por WhatsApp".
    addressPending: true,
    address: { es: "", en: "" },
    mapEmbedUrl: "https://maps.google.com/maps?q=-33.5964885,-70.5044263&z=15&output=embed",
    latitude: -33.5964885,
    longitude: -70.5044263,
    navigationUrl: "https://www.google.com/maps/dir/?api=1&destination=-33.5964885,-70.5044263",
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
      url: "/photos/sunset-flight.jpg",
      alt: {
        es: "Parapente al atardecer sobre el valle",
        en: "Paraglider at sunset over the valley",
      },
    },
  },

  footer: {
    tagline: { es: "Escuela de parapente", en: "Paragliding school" },
    showLegal: false,
    legalLinks: [],
  },

  headers: {
    courses: {
      isDemo: false,
      title: { es: "Cursos", en: "Courses" },
      intro: {
        es: "Cursos y experiencias para empezar en el parapente o llevar tu vuelo al siguiente nivel.",
        en: "Courses and experiences to start paragliding or take your flying to the next level.",
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
      isDemo: false,
      title: { es: "Reseñas", en: "Reviews" },
      intro: {
        es: "Lo que dicen quienes ya volaron con nosotros.",
        en: "What people who have already flown with us say.",
      },
    },
    faq: {
      isDemo: false,
      title: { es: "Preguntas frecuentes", en: "FAQ" },
      intro: {
        es: "Elige una categoría y una pregunta para ver la respuesta.",
        en: "Choose a category and a question to see the answer.",
      },
      welcome: {
        es: "¡Hola! ¿Sobre qué te gustaría saber?",
        en: "Hi! What would you like to know about?",
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
