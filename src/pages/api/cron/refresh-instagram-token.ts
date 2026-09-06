import type { APIRoute } from "astro";
import { refreshLongLivedToken } from "@/lib/instagram";

export const prerender = false;

/**
 * Cron de Vercel (ver vercel.json) — rota el token de larga duración de Instagram.
 *
 * IMPORTANTE: la Graph API devuelve un token nuevo, pero este endpoint NO puede
 * persistirlo por sí solo en las variables de entorno de Vercel. Opciones:
 *   a) Usar la API de Vercel (VERCEL_TOKEN + PATCH env var) para guardarlo — recomendado.
 *   b) Guardarlo en Sanity (documento `secrets`) y leerlo desde ahí en fetchInstagramMedia.
 * Mientras tanto, este cron mantiene el token "vivo" (cada refresh extiende otros 60 días)
 * y registra el nuevo valor en los logs para rotación manual si hiciera falta.
 * Ver README §"Integración con Instagram → Rotación del token".
 */
export const GET: APIRoute = async ({ request }) => {
  const auth = request.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const current = process.env.INSTAGRAM_LONG_LIVED_TOKEN;
  if (!current) {
    return new Response(JSON.stringify({ ok: false, reason: "no_token_configured" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const { token, expiresIn } = await refreshLongLivedToken(current);
    console.log(
      `[cron/instagram] token refrescado, expira en ~${Math.round(expiresIn / 86400)} días`,
    );
    // TODO: persistir `token` (Vercel API o Sanity). Ver nota arriba.
    return new Response(JSON.stringify({ ok: true, rotated: token !== current, expiresIn }), {
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    console.error("[cron/instagram]", (err as Error).message);
    return new Response(JSON.stringify({ ok: false, error: (err as Error).message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
};
