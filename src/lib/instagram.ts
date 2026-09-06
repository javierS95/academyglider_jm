import type { InstagramMediaItem, OembedResult } from "@/types";

const GRAPH = "https://graph.instagram.com";
/** Versión de la Graph API para oEmbed. Bump ~cada 2 años (Meta deprecia versiones). */
const OEMBED_VERSION = "v21.0";
const FIELDS = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";

interface RawMedia {
  id: string;
  caption?: string;
  media_type: InstagramMediaItem["mediaType"];
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

export function normalize(raw: RawMedia): InstagramMediaItem {
  return {
    id: raw.id,
    caption: raw.caption ?? "",
    mediaType: raw.media_type,
    mediaUrl: raw.media_url,
    thumbnailUrl: raw.thumbnail_url || raw.media_url,
    permalink: raw.permalink,
    timestamp: raw.timestamp,
  };
}

/**
 * Obtiene las últimas publicaciones vía Instagram Graph API (Instagram API with Instagram Login).
 * Requiere cuenta Business/Creator + INSTAGRAM_USER_ID + INSTAGRAM_LONG_LIVED_TOKEN.
 * Devuelve [] si no está configurado o si la API falla (el frontend usa el fallback manual del CMS).
 */
export async function fetchInstagramMedia(limit = 12): Promise<InstagramMediaItem[]> {
  const userId = process.env.INSTAGRAM_USER_ID;
  const token = process.env.INSTAGRAM_LONG_LIVED_TOKEN;
  if (!userId || !token) return [];

  const url = `${GRAPH}/${userId}/media?fields=${FIELDS}&limit=${limit}&access_token=${token}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) {
    throw new Error(`Instagram API ${res.status}: ${await res.text()}`);
  }
  const json = (await res.json()) as { data?: RawMedia[] };
  return (json.data ?? []).map(normalize);
}

/**
 * Instagram oEmbed — SIN token ni App Review (Meta, jun-2026).
 * Incrusta una publicación concreta a partir de su URL. Devuelve el HTML oficial
 * de incrustación (sin <script>: cargamos embed.js aparte).
 * OJO: el límite sin token es bajo y compartido ("(#4) Application request limit reached").
 * Por eso se llama SOLO desde /api/gallery, que cachea el resultado 1 día en el edge.
 * Los fallos se ignoran (se omite ese post).
 */
export async function fetchInstagramOembed(
  postUrl: string,
  maxwidth = 540,
): Promise<OembedResult | null> {
  const api =
    `https://graph.facebook.com/${OEMBED_VERSION}/instagram_oembed` +
    `?omitscript=true&maxwidth=${maxwidth}&url=${encodeURIComponent(postUrl)}`;
  try {
    const res = await fetch(api, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) {
      console.warn(`[oembed] ${res.status} para ${postUrl}`);
      return null;
    }
    const json = (await res.json()) as { html?: string };
    return json.html ? { url: postUrl, html: json.html } : null;
  } catch (err) {
    console.warn(`[oembed] error para ${postUrl}:`, (err as Error).message);
    return null;
  }
}

/** Resuelve varias URLs en paralelo, conservando el orden y descartando las que fallen. */
export async function fetchInstagramOembeds(
  postUrls: string[],
  maxwidth = 540,
): Promise<OembedResult[]> {
  const results = await Promise.all(postUrls.map((u) => fetchInstagramOembed(u, maxwidth)));
  return results.filter((r): r is OembedResult => r !== null);
}

/**
 * Renueva el token de larga duración (válido ~60 días).
 * Se invoca desde el cron /api/cron/refresh-instagram-token.
 */
export async function refreshLongLivedToken(
  currentToken: string,
): Promise<{ token: string; expiresIn: number }> {
  const url = `${GRAPH}/refresh_access_token?grant_type=ig_refresh_token&access_token=${currentToken}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`refresh_access_token ${res.status}: ${await res.text()}`);
  const json = (await res.json()) as { access_token: string; expires_in: number };
  return { token: json.access_token, expiresIn: json.expires_in };
}
