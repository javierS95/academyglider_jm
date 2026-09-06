import type { APIRoute } from "astro";
import { getSiteContent } from "@/lib/sanity";
import { fetchBeholdFeed, fetchInstagramMedia } from "@/lib/instagram";

export const prerender = false;

const CACHE_OK = "public, s-maxage=86400, stale-while-revalidate=604800"; // 1 día / 7 días
const CACHE_FALLBACK = "public, s-maxage=600";

/**
 * GET /api/gallery
 * Resuelve las fuentes de galería que necesitan red (feed automático) y cachea
 * fuerte en el edge (1 día) para refrescar a diario sin golpear a Instagram/Behold.
 * Las fuentes "posts" y "manual" se resuelven en el build (no llegan aquí).
 *
 * Respuesta: { items: GalleryItem[] }  ·  [] = usar el respaldo ya renderizado.
 */
export const GET: APIRoute = async () => {
  try {
    const { gallery } = await getSiteContent();
    const max = gallery.maxItems || 6;

    if (gallery.source === "behold" && gallery.beholdFeedUrl) {
      const items = await fetchBeholdFeed(gallery.beholdFeedUrl, max);
      if (items.length) return json({ items }, CACHE_OK);
    }

    if (gallery.source === "instagram") {
      const items = await fetchInstagramMedia(max);
      if (items.length) return json({ items }, CACHE_OK);
    }

    return json({ items: [] }, CACHE_FALLBACK);
  } catch (err) {
    console.error("[api/gallery]", (err as Error).message);
    return json({ items: [], error: "gallery_unavailable" }, CACHE_FALLBACK);
  }
};

function json(body: unknown, cache: string) {
  return new Response(JSON.stringify(body), {
    headers: { "content-type": "application/json", "cache-control": cache },
  });
}
