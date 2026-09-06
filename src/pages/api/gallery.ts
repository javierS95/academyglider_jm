import type { APIRoute } from "astro";
import { getSiteContent } from "@/lib/sanity";
import { fetchInstagramMedia } from "@/lib/instagram";

export const prerender = false;

/**
 * GET /api/gallery — solo para la fuente "instagram" (Graph API con token).
 * Las fuentes "posts" y "manual" se resuelven en el build (no llegan aquí).
 * Respuesta: { items: GalleryItem[] }  ·  [] = usar el respaldo ya renderizado.
 */
export const GET: APIRoute = async () => {
  try {
    const { gallery } = await getSiteContent();
    if (gallery.source !== "instagram") return json({ items: [] }, "public, s-maxage=3600");

    const items = await fetchInstagramMedia(gallery.maxItems || 6);
    return json({ items }, "public, s-maxage=86400, stale-while-revalidate=604800");
  } catch (err) {
    console.error("[api/gallery]", (err as Error).message);
    return json({ items: [], error: "gallery_unavailable" }, "public, s-maxage=600");
  }
};

function json(body: unknown, cache: string) {
  return new Response(JSON.stringify(body), {
    headers: { "content-type": "application/json", "cache-control": cache },
  });
}
