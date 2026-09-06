import { localeString, localeText, localizedImage } from "./objects";
import {
  siteSettings,
  homeSection,
  aboutSection,
  gallerySettings,
  locationSection,
  ctaFinalSection,
  footerSettings,
  sectionHeaders,
} from "./singletons";
import { course, review, faqCategory, faqItem } from "./documents";

export const schemaTypes = [
  // objetos
  localeString,
  localeText,
  localizedImage,
  // singletons
  siteSettings,
  homeSection,
  aboutSection,
  gallerySettings,
  locationSection,
  ctaFinalSection,
  footerSettings,
  sectionHeaders,
  // colecciones
  course,
  review,
  faqCategory,
  faqItem,
];
