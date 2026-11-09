/**
 * Microcopy de INTERFAZ (no comercial).
 *
 * Frontera de contenido (ver README §i18n):
 *  - Aquí SÓLO van etiquetas de interfaz: navegación, botones genéricos, aria-labels, estados.
 *  - TODO texto comercial/editorial (títulos, descripciones, CTAs de marketing, respuestas de FAQ...)
 *    vive en el CMS con campos { es, en } y NUNCA en este archivo.
 */
import type { Locale } from "@/types";

export const LOCALES: Locale[] = ["es", "en"];
export const DEFAULT_LOCALE: Locale = "es";

export const ui = {
  es: {
    "nav.home": "Inicio",
    "nav.courses": "Cursos",
    "nav.about": "Quiénes somos",
    "nav.gallery": "Galería",
    "nav.reviews": "Reseñas",
    "nav.faq": "FAQ",
    "nav.location": "Ubicación",
    "nav.contact": "Contacto",
    "nav.openMenu": "Abrir menú",
    "nav.closeMenu": "Cerrar menú",
    "lang.switch": "Cambiar idioma",
    "lang.es": "Español",
    "lang.en": "English",
    "wa.aria": "Contactar por WhatsApp",
    "wa.float": "WhatsApp",
    "ig.aria": "Abrir Instagram de AcademyGlider",
    "scroll.hint": "Desliza",
    "course.from": "Desde",
    "course.consult": "Consultar precio",
    "course.cta": "Consultar por WhatsApp",
    "course.duration": "Duración",
    "gallery.loading": "Cargando fotos…",
    "gallery.error": "No pudimos cargar Instagram ahora. Mostrando una selección.",
    "gallery.openPost": "Ver publicación en Instagram",
    "reviews.prev": "Anterior",
    "reviews.next": "Siguiente",
    "faq.pickCategory": "Elige un tema",
    "faq.backToCategories": "Ver otros temas",
    "faq.questionOne": "pregunta",
    "faq.questionMany": "preguntas",
    "faq.typing": "AcademyGlider está escribiendo…",
    "faq.pickQuestion": "Pregunta",
    "faq.another": "Hacer otra pregunta",
    "faq.toWhatsapp": "Hablar por WhatsApp",
    "faq.you": "Tú",
    "faq.bot": "AcademyGlider",
    "location.directions": "Cómo llegar",
    "location.addressPending": "Dirección exacta a confirmar — coordina tu visita por WhatsApp.",
    "location.mapPending": "Mapa disponible cuando confirmemos la dirección exacta.",
    "demo.badge": "CONTENIDO DEMO — REEMPLAZAR",
    "footer.rights": "Todos los derechos reservados.",
  },
  en: {
    "nav.home": "Home",
    "nav.courses": "Courses",
    "nav.about": "About us",
    "nav.gallery": "Gallery",
    "nav.reviews": "Reviews",
    "nav.faq": "FAQ",
    "nav.location": "Location",
    "nav.contact": "Contact",
    "nav.openMenu": "Open menu",
    "nav.closeMenu": "Close menu",
    "lang.switch": "Change language",
    "lang.es": "Español",
    "lang.en": "English",
    "wa.aria": "Contact via WhatsApp",
    "wa.float": "WhatsApp",
    "ig.aria": "Open AcademyGlider's Instagram",
    "scroll.hint": "Scroll",
    "course.from": "From",
    "course.consult": "Ask for price",
    "course.cta": "Ask on WhatsApp",
    "course.duration": "Duration",
    "gallery.loading": "Loading photos…",
    "gallery.error": "We couldn't load Instagram right now. Showing a selection.",
    "gallery.openPost": "View post on Instagram",
    "reviews.prev": "Previous",
    "reviews.next": "Next",
    "faq.pickCategory": "Pick a topic",
    "faq.backToCategories": "See other topics",
    "faq.questionOne": "question",
    "faq.questionMany": "questions",
    "faq.typing": "AcademyGlider is typing…",
    "faq.pickQuestion": "Question",
    "faq.another": "Ask another question",
    "faq.toWhatsapp": "Chat on WhatsApp",
    "faq.you": "You",
    "faq.bot": "AcademyGlider",
    "location.directions": "Get directions",
    "location.addressPending":
      "Exact address to be confirmed — coordinate your visit via WhatsApp.",
    "location.mapPending": "Map available once we confirm the exact address.",
    "demo.badge": "DEMO CONTENT — REPLACE",
    "footer.rights": "All rights reserved.",
  },
} as const;

export type UiKey = keyof (typeof ui)["es"];

export function useTranslations(locale: Locale) {
  return function t(key: UiKey): string {
    return ui[locale][key] ?? ui[DEFAULT_LOCALE][key] ?? key;
  };
}
