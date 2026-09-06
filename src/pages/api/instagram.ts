import type { APIRoute } from "astro";
import { fetchInstagramMedia } from "@/lib/instagram";

export const prerender = false;

/**
 * GET /api/instagram
 * Devuelve el feed normalizado y cacheado en el edge.
 * `fallback: true` indica al frontend que use la galería manual del CMS.
 */
export const GET: APIRoute = async () => {
  try {
    const items = await fetchInstagramMedia(12);
    return new Response(JSON.stringify({ items, fallback: items.length === 0 }), {
      headers: {
        "content-type": "application/json",
        // Cache 1h en el edge, sirve stale hasta 24h mientras revalida.
        "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    console.error("[api/instagram]", (err as Error).message);
    return new Response(
      JSON.stringify({ items: [], fallback: true, error: "instagram_unavailable" }),
      {
        status: 200,
        headers: {
          "content-type": "application/json",
          "cache-control": "public, s-maxage=300",
        },
      },
    );
  }
};
