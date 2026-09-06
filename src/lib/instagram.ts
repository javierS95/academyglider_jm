import type { InstagramMediaItem } from "@/types";

const GRAPH = "https://graph.instagram.com";
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
