import type { APIRoute } from "astro";
import { getSiteContent } from "@/lib/sanity";
import { fetchInstagramOembeds, fetchInstagramMedia } from "@/lib/instagram";

export const prerender = false;

const CACHE_OK = "public, s-maxage=86400, stale-while-revalidate=604800"; // 1 día / 7 días
const CACHE_FALLBACK = "public, s-maxage=600";

/**
 * GET /api/gallery
 * Resuelve la galería server-side y la cachea fuerte en el edge, para NO golpear
 * Instagram oEmbed (límite bajo, sin token) en cada build ni en cada visita.
 *
 *  - mode "oembed": items = [{ url, html }]  (incrustaciones oficiales)
 *  - mode "feed":   items = InstagramMediaItem[]  (Graph API con token)
 *  - mode "manual": el cliente usa las imágenes embebidas en la página
 */
export const GET: APIRoute = async () => {
  try {
    const { gallery } = await getSiteContent();
    const max = gallery.maxItems || 9;

    if (gallery.source === "oembed" && gallery.instagramPostUrls?.length) {
      const items = await fetchInstagramOembeds(gallery.instagramPostUrls.slice(0, max));
      if (items.length) {
        return json({ mode: "oembed", items }, CACHE_OK);
      }
    }

    if (gallery.source === "instagram") {
      const items = await fetchInstagramMedia(max);
      if (items.length) {
        return json({ mode: "feed", items }, CACHE_OK);
      }
    }

    return json({ mode: "manual" }, CACHE_FALLBACK);
  } catch (err) {
    console.error("[api/gallery]", (err as Error).message);
    return json({ mode: "manual", error: "gallery_unavailable" }, CACHE_FALLBACK);
  }
};

function json(body: unknown, cache: string) {
  return new Response(JSON.stringify(body), {
    headers: { "content-type": "application/json", "cache-control": cache },
  });
}
