import type { APIRoute } from "astro";
import { instagramShortcode } from "@/lib/instagram";

export const prerender = false;

/**
 * GET /api/ig-image?code=<shortcode>   (o ?url=<url del post>)
 *
 * Proxy de la portada pública de una publicación de Instagram.
 * Necesario porque la imagen del CDN de Instagram viene con
 * `Cross-Origin-Resource-Policy: same-origin` y el navegador la bloquea si se
 * carga directamente desde otro dominio. Aquí la pedimos desde el servidor
 * (sin esa restricción) y la reservimos desde nuestro propio origen.
 *
 * Sin token. Se cachea fuerte en el edge (7 días) — la URL del CDN dura ~14.
 */
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36";

export const GET: APIRoute = async ({ url }) => {
  const raw = url.searchParams.get("code") || url.searchParams.get("url") || "";
  const code = /^[A-Za-z0-9_-]+$/.test(raw) ? raw : instagramShortcode(raw);
  if (!code) return new Response("bad request", { status: 400 });

  const src = `https://www.instagram.com/p/${code}/media/?size=l`;
  // El endpoint de Instagram es algo inestable bajo ráfagas: reintentamos una vez.
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(src, {
        redirect: "follow",
        headers: { "user-agent": UA, accept: "image/avif,image/webp,image/*,*/*;q=0.8" },
        signal: AbortSignal.timeout(9000),
      });
      const type = res.headers.get("content-type") || "";
      if (res.ok && type.startsWith("image/")) {
        return new Response(res.body, {
          headers: {
            "content-type": type,
            "cache-control": "public, s-maxage=604800, stale-while-revalidate=2592000",
          },
        });
      }
      if (res.status === 404) break;
    } catch {
      /* reintenta */
    }
    if (attempt === 0) await new Promise((r) => setTimeout(r, 600));
  }
  return new Response("unavailable", {
    status: 502,
    headers: { "cache-control": "public, s-maxage=300" },
  });
};
