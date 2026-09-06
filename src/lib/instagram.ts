import type { GalleryItem } from "@/types";

const GRAPH = "https://graph.instagram.com";
const FIELDS = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";

interface RawMedia {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Portada de una publicación a partir de su URL — SIN token, sin API.
// https://www.instagram.com/p/<code>/media/?size=l  redirige a la imagen (1080px).
// Funciona para posts y reels (convirtiendo /reel/ → /p/). Se usa en la fuente "posts".
// ─────────────────────────────────────────────────────────────────────────────
export function instagramShortcode(url: string): string | null {
  const m = url.match(/instagram\.com\/(?:[^/]+\/)?(?:p|reel|tv)\/([A-Za-z0-9_-]+)/i);
  return m ? m[1] : null;
}

export function instagramCoverImage(shortcode: string): string {
  return `https://www.instagram.com/p/${shortcode}/media/?size=l`;
}

export function postUrlsToItems(urls: string[]): GalleryItem[] {
  return urls
    .map((url) => {
      const code = instagramShortcode(url);
      if (!code) return null;
      return {
        permalink: `https://www.instagram.com/p/${code}/`,
        image: instagramCoverImage(code),
        alt: "Publicación de @academyglider en Instagram",
      } satisfies GalleryItem;
    })
    .filter((x): x is GalleryItem => x !== null);
}

// ─────────────────────────────────────────────────────────────────────────────
// Behold.so — feed JSON automático (sin token, se refresca 1 vez al día en el
// plan gratuito). El equipo conecta @academyglider en behold.so y pega la URL
// del feed en el CMS. Behold se encarga del cumplimiento con Meta.
// ─────────────────────────────────────────────────────────────────────────────
interface BeholdPost {
  permalink?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  caption?: string;
  sizes?: { medium?: { mediaUrl?: string }; small?: { mediaUrl?: string } };
}

export async function fetchBeholdFeed(feedUrl: string, limit = 6): Promise<GalleryItem[]> {
  const res = await fetch(feedUrl, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`Behold ${res.status}: ${await res.text()}`);
  const json = (await res.json()) as BeholdPost[] | { posts?: BeholdPost[] };
  const posts = Array.isArray(json) ? json : (json.posts ?? []);
  return posts.slice(0, limit).map((p) => ({
    permalink: p.permalink || "https://www.instagram.com/academyglider/",
    image: p.sizes?.medium?.mediaUrl || p.thumbnailUrl || p.mediaUrl || "",
    alt: (p.caption || "Publicación de @academyglider en Instagram").slice(0, 160),
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
// Instagram Graph API — feed automático oficial (requiere cuenta Business/Creator
// + INSTAGRAM_USER_ID + INSTAGRAM_LONG_LIVED_TOKEN, con rotación cada 60 días).
// ─────────────────────────────────────────────────────────────────────────────
export async function fetchInstagramMedia(limit = 6): Promise<GalleryItem[]> {
  const userId = process.env.INSTAGRAM_USER_ID;
  const token = process.env.INSTAGRAM_LONG_LIVED_TOKEN;
  if (!userId || !token) return [];

  const url = `${GRAPH}/${userId}/media?fields=${FIELDS}&limit=${limit}&access_token=${token}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`Instagram API ${res.status}: ${await res.text()}`);
  const json = (await res.json()) as { data?: RawMedia[] };
  return (json.data ?? []).slice(0, limit).map((m) => ({
    permalink: m.permalink,
    image: m.media_type === "VIDEO" ? m.thumbnail_url || m.media_url : m.media_url,
    alt: (m.caption || "Publicación de @academyglider en Instagram").slice(0, 160),
  }));
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
