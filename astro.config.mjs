// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

// El sitio es mayormente estático; sólo las rutas /api/* se renderizan on-demand
// (marcadas con `export const prerender = false`).
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || "https://academyglider.vercel.app",
  output: "static",
  adapter: vercel(),
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    // @ts-expect-error — desajuste de tipos de Vite entre astro y @tailwindcss/vite (no afecta al build)
    plugins: [tailwindcss()],
  },
});
