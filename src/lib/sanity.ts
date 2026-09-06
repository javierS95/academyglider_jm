/**
 * Cliente de Sanity + resolución del contenido del sitio.
 *
 * Si PUBLIC_SANITY_PROJECT_ID no está definido, se usa el fallback DEMO local
 * (src/data/demoContent.ts) para poder ver la página completa sin CMS.
 */
import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SiteContent } from "@/types";
import { demoContent } from "@/data/demoContent";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID as string | undefined;
const dataset = (import.meta.env.PUBLIC_SANITY_DATASET as string) || "production";
const apiVersion = (import.meta.env.PUBLIC_SANITY_API_VERSION as string) || "2024-10-01";
const token = import.meta.env.SANITY_API_READ_TOKEN as string | undefined;

export const sanityEnabled = Boolean(projectId);

export const sanityClient: SanityClient | null = sanityEnabled
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      token: token || undefined,
      useCdn: !token,
      perspective: "published",
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

/** Proyección GROQ reutilizable para imágenes -> { url, alt, hotspot }. */
const IMG = `{
  "url": asset->url,
  "alt": coalesce(alt, {"es": "", "en": ""}),
  "hotspot": hotspot{ x, y }
}`;

const SITE_QUERY = `{
  "settings": *[_type == "siteSettings"][0]{
    whatsappNumber, whatsappDefaultMessage, instagramHandle, instagramUrl, demoMode,
    "logo": logo${IMG}, brandColors
  },
  "home": *[_type == "homeSection"][0]{
    isDemo, title, subtitle, ctaLabel, secondaryCtaLabel, complementaryText,
    "heroMedia": heroMedia${IMG}, whatsappMessageOverride
  },
  "about": *[_type == "aboutSection"][0]{
    isDemo, heading, body, highlightNumber, highlightLabel, "photo": photo${IMG}
  },
  "courses": *[_type == "course"] | order(order asc){
    "_id": _id, "slug": slug.current, isDemo, active, order, title, shortDescription,
    longDescription, duration, price, currency, priceDisplayMode, features, level,
    "image": image${IMG}, whatsappMessageOverride, pagoHabilitado
  },
  "reviews": *[_type == "review"] | order(order asc){
    "_id": _id, isDemo, active, order, authorName, text, rating, courseName, "photo": photo${IMG}
  },
  "faqCategories": *[_type == "faqCategory"] | order(order asc){
    "_id": _id, active, order, name
  },
  "faqItems": *[_type == "faqItem"] | order(order asc){
    "_id": _id, isDemo, active, order, "categoryId": category._ref, question, answer
  },
  "gallery": *[_type == "gallerySettings"][0]{
    source, maxItems, instagramCtaLabel, beholdFeedUrl, instagramPostUrls,
    "manualImages": manualImages[]{ "image": image${IMG}, caption, link }
  },
  "location": *[_type == "locationSection"][0]{
    placeName, addressPending, address, mapEmbedUrl, latitude, longitude, navigationUrl, attentionNote
  },
  "ctaFinal": *[_type == "ctaFinalSection"][0]{
    isDemo, title, text, buttonLabel, "backgroundMedia": backgroundMedia${IMG}, whatsappMessageOverride
  },
  "footer": *[_type == "footerSettings"][0]{ tagline, showLegal, legalLinks },
  "headers": *[_type == "sectionHeaders"][0]{ courses, gallery, reviews, faq, location }
}`;

export function urlForImage(source: unknown) {
  if (!builder) return { url: () => "" };
  return builder.image(source as never);
}

let cache: SiteContent | null = null;

export async function getSiteContent(): Promise<SiteContent> {
  if (cache) return cache;
  if (!sanityClient) {
    cache = demoContent;
    return cache;
  }
  try {
    const data = await sanityClient.fetch<Partial<SiteContent>>(SITE_QUERY);
    // Fusión defensiva: si a Sanity le falta algún singleton, se completa con el DEMO.
    cache = {
      ...demoContent,
      ...data,
      settings: { ...demoContent.settings, ...data.settings },
      home: { ...demoContent.home, ...data.home },
      about: { ...demoContent.about, ...data.about },
      gallery: { ...demoContent.gallery, ...data.gallery },
      location: { ...demoContent.location, ...data.location },
      ctaFinal: { ...demoContent.ctaFinal, ...data.ctaFinal },
      footer: { ...demoContent.footer, ...data.footer },
      headers: { ...demoContent.headers, ...data.headers },
      courses: data.courses?.length ? data.courses : demoContent.courses,
      reviews: data.reviews?.length ? data.reviews : demoContent.reviews,
      faqCategories: data.faqCategories?.length ? data.faqCategories : demoContent.faqCategories,
      faqItems: data.faqItems?.length ? data.faqItems : demoContent.faqItems,
      usingLocalDemo: false,
    };
    return cache;
  } catch (err) {
    console.warn("[sanity] fetch falló, usando contenido DEMO local:", (err as Error).message);
    cache = demoContent;
    return cache;
  }
}
