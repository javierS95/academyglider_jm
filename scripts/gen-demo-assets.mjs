/**
 * Genera imágenes SVG de marcador de posición para el contenido DEMO.
 * Todas llevan la etiqueta "CONTENIDO DEMO" para que nunca se confundan con material real.
 *
 *   node scripts/gen-demo-assets.mjs
 *
 * Salida: public/demo/*.svg  (versionadas en el repo; regénéralas si cambias la paleta)
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "demo");
mkdirSync(outDir, { recursive: true });

const PALETTES = {
  sunset: ["#f7b267", "#f4845f", "#e15554"],
  sky: ["#2d4a7c", "#3d5a98", "#6b7fb3"],
  forest: ["#3a5a40", "#588157", "#a3b18a"],
  dusk: ["#4a3f6b", "#c9698f", "#f2a65a"],
};

function svg({ w, h, palette, label, sublabel, kind = "scene" }) {
  const [c1, c2, c3] = PALETTES[palette];
  const id = Math.random().toString(36).slice(2, 8);
  const hill =
    kind === "scene"
      ? `<path d="M0 ${h} L0 ${h * 0.72} Q ${w * 0.3} ${h * 0.55} ${w * 0.55} ${h * 0.7} T ${w} ${h * 0.6} L ${w} ${h} Z" fill="${c3}" opacity="0.55"/>
         <circle cx="${w * 0.72}" cy="${h * 0.34}" r="${Math.min(w, h) * 0.12}" fill="#fff" opacity="0.85"/>
         <path d="M${w * 0.16} ${h * 0.3} q 22 -26 44 0 q 22 -20 40 0" stroke="#fff" stroke-width="3" fill="none" opacity="0.7"/>`
      : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label} (contenido demo)">
  <defs>
    <linearGradient id="g${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="0.55" stop-color="${c2}"/>
      <stop offset="1" stop-color="${c3}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g${id})"/>
  ${hill}
  <rect x="10" y="10" width="${w - 20}" height="26" rx="6" fill="rgba(0,0,0,0.45)"/>
  <text x="22" y="28" font-family="system-ui,Segoe UI,sans-serif" font-size="13" font-weight="700" fill="#fff" letter-spacing="1">CONTENIDO DEMO — REEMPLAZAR</text>
  <text x="${w / 2}" y="${h / 2}" text-anchor="middle" font-family="system-ui,Segoe UI,sans-serif" font-size="${Math.max(14, Math.min(w, h) / 14)}" font-weight="800" fill="rgba(255,255,255,0.92)">${label}</text>
  ${sublabel ? `<text x="${w / 2}" y="${h / 2 + 24}" text-anchor="middle" font-family="system-ui,Segoe UI,sans-serif" font-size="12" fill="rgba(255,255,255,0.8)">${sublabel}</text>` : ""}
</svg>`;
}

const files = {
  "hero.svg": {
    w: 1600,
    h: 1000,
    palette: "dusk",
    label: "Vuelo al atardecer",
    sublabel: "Imagen principal — reemplazar desde el CMS",
  },
  "cta.svg": {
    w: 1600,
    h: 900,
    palette: "sunset",
    label: "Llamada final a la aventura",
    sublabel: "Fondo CTA — reemplazar desde el CMS",
  },
  "about.svg": {
    w: 1000,
    h: 1200,
    palette: "forest",
    label: "Javier Martínez",
    sublabel: "Foto del instructor — pendiente",
    kind: "flat",
  },
  "map.svg": {
    w: 1200,
    h: 700,
    palette: "sky",
    label: "Geopark Vizcachaz",
    sublabel: "Mapa — pendiente dirección exacta",
    kind: "flat",
  },
  "course-1.svg": { w: 1000, h: 750, palette: "sky", label: "Curso 1" },
  "course-2.svg": { w: 1000, h: 750, palette: "forest", label: "Curso 2" },
};
for (let i = 1; i <= 6; i++) {
  files[`gallery-${i}.svg`] = {
    w: 900,
    h: 900,
    palette: ["sunset", "sky", "forest", "dusk"][i % 4],
    label: `Instagram ${i}`,
  };
}
for (let i = 1; i <= 3; i++) {
  files[`review-${i}.svg`] = {
    w: 200,
    h: 200,
    palette: ["dusk", "forest", "sky"][i - 1],
    label: `A${i}`,
    kind: "flat",
  };
}

for (const [name, cfg] of Object.entries(files)) {
  writeFileSync(join(outDir, name), svg(cfg));
}
console.log(`Generados ${Object.keys(files).length} SVG en public/demo/`);
