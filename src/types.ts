/**
 * Tipos del contenido administrable.
 * Reflejan 1:1 los schemas de Sanity (ver studio/schemaTypes/).
 * Todo texto editorial es bilingüe: { es, en }.
 */

export type Locale = "es" | "en";

export interface LocaleString {
  es: string;
  en: string;
}

/** Bloque de texto largo (párrafos). Se guarda como string con saltos de línea. */
export type LocaleText = LocaleString;

export interface ImageAsset {
  /** URL lista para usar (Sanity CDN o ruta local en modo DEMO). */
  url: string;
  alt: LocaleString;
  /** Punto focal 0..1 para recortes responsive. */
  hotspot?: { x: number; y: number };
}

export interface SiteSettings {
  whatsappNumber: string; // formato E.164 sin "+", p.ej. "56952559138"
  whatsappDefaultMessage: LocaleString;
  instagramHandle: string; // "academyglider"
  instagramUrl: string;
  demoMode: boolean; // muestra los badges "CONTENIDO DEMO — REEMPLAZAR"
  logo?: ImageAsset;
  brandColors?: { sunset?: string; sky?: string; forest?: string };
}

export interface HomeSection {
  isDemo: boolean;
  title: LocaleString;
  subtitle: LocaleString;
  ctaLabel: LocaleString;
  secondaryCtaLabel: LocaleString;
  complementaryText: LocaleText;
  heroMedia?: ImageAsset;
  whatsappMessageOverride?: LocaleString;
}

export interface AboutSection {
  isDemo: boolean; // false — contenido real de Javier
  heading: LocaleString;
  body: LocaleText;
  highlightNumber: LocaleString; // "+20"
  highlightLabel: LocaleString; // "años volando"
  photo?: ImageAsset;
}

export type PriceDisplayMode = "mostrar" | "consultar";
export type CourseLevel = "principiante" | "avanzado" | "otro";

export interface Course {
  _id: string;
  slug: string;
  isDemo: boolean;
  active: boolean;
  order: number;
  title: LocaleString;
  shortDescription: LocaleString;
  longDescription: LocaleText;
  duration: LocaleString;
  price: number;
  currency: string; // "CLP"
  priceDisplayMode: PriceDisplayMode;
  features: LocaleString[];
  level: CourseLevel;
  image?: ImageAsset;
  whatsappMessageOverride?: LocaleString;
  /** RESERVADO Mercado Pago — no operativo. */
  pagoHabilitado: boolean;
}

export interface Review {
  _id: string;
  isDemo: boolean;
  active: boolean;
  order: number;
  authorName: string;
  text: LocaleText;
  rating?: number; // 1..5
  courseName?: LocaleString;
  photo?: ImageAsset;
}

export interface FaqCategory {
  _id: string;
  active: boolean;
  order: number;
  name: LocaleString;
}

export interface FaqItem {
  _id: string;
  isDemo: boolean;
  active: boolean;
  order: number;
  categoryId: string;
  question: LocaleString;
  answer: LocaleText;
}

export type GallerySource = "instagram" | "manual";

export interface GallerySettings {
  source: GallerySource;
  maxItems: number;
  instagramCtaLabel: LocaleString;
  manualImages: { image: ImageAsset; caption?: LocaleString; link?: string }[];
}

export interface LocationSection {
  placeName: string; // "Geopark Vizcachaz"
  addressPending: boolean;
  address: LocaleString; // vacío mientras addressPending
  mapEmbedUrl: string;
  latitude?: number;
  longitude?: number;
  navigationUrl: string;
  attentionNote: LocaleText; // "Atención con agenda previa..."
}

export interface CtaFinalSection {
  isDemo: boolean;
  title: LocaleString;
  text: LocaleText;
  buttonLabel: LocaleString;
  backgroundMedia?: ImageAsset;
  whatsappMessageOverride?: LocaleString;
}

export interface FooterSettings {
  tagline?: LocaleString;
  showLegal: boolean;
  legalLinks: { label: LocaleString; url: string }[];
}

export interface SectionHeaders {
  courses: { isDemo: boolean; title: LocaleString; intro: LocaleString };
  gallery: { isDemo: boolean; title: LocaleString; intro: LocaleString };
  reviews: { isDemo: boolean; title: LocaleString; intro: LocaleString };
  faq: { isDemo: boolean; title: LocaleString; intro: LocaleString; welcome: LocaleString };
  location: { isDemo: boolean; title: LocaleString; intro: LocaleString };
}

/** Todo el contenido de la página, resuelto para una carga. */
export interface SiteContent {
  settings: SiteSettings;
  home: HomeSection;
  about: AboutSection;
  courses: Course[];
  reviews: Review[];
  faqCategories: FaqCategory[];
  faqItems: FaqItem[];
  gallery: GallerySettings;
  location: LocationSection;
  ctaFinal: CtaFinalSection;
  footer: FooterSettings;
  headers: SectionHeaders;
  /** true cuando el contenido proviene del fallback DEMO local (sin Sanity configurado). */
  usingLocalDemo: boolean;
}

export interface InstagramMediaItem {
  id: string;
  caption: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  thumbnailUrl: string;
  permalink: string;
  timestamp: string;
}
