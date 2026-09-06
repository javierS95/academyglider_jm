import type { Locale, LocaleString } from "@/types";
import { pick } from "@/i18n/utils";

/**
 * Construye un enlace wa.me con el mensaje pre-cargado y correctamente codificado.
 *
 * @param number  E.164 sin "+", p.ej. "56952559138"
 * @param message campo { es, en } (mensaje por defecto o un override de sección)
 * @param locale  idioma actual
 */
export function whatsappLink(
  number: string,
  message: LocaleString,
  locale: Locale,
  fallback?: LocaleString,
): string {
  const clean = number.replace(/[^\d]/g, "");
  const text = pick(message, locale) || pick(fallback ?? { es: "", en: "" }, locale);
  const query = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${clean}${query}`;
}
