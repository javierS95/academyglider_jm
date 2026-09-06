import type { Locale, LocaleString } from "@/types";
import { DEFAULT_LOCALE, LOCALES } from "./ui";

/** Extrae el idioma del pathname de Astro. "/" -> es, "/en/..." -> en */
export function getLocaleFromUrl(url: URL): Locale {
  const [, seg] = url.pathname.split("/");
  return (LOCALES as string[]).includes(seg) ? (seg as Locale) : DEFAULT_LOCALE;
}

/** Prefijo de ruta para un idioma. es -> "", en -> "/en" */
export function localePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

/** Devuelve el valor localizado de un campo { es, en } con fallback. */
export function pick(field: LocaleString | undefined, locale: Locale): string {
  if (!field) return "";
  return field[locale] || field[DEFAULT_LOCALE] || "";
}

/** Ruta equivalente en el otro idioma, preservando el hash. */
export function alternatePath(url: URL, target: Locale): string {
  return `${localePrefix(target) || "/"}${url.hash || ""}`.replace("//", "/");
}
