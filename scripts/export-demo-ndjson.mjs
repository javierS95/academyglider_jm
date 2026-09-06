/**
 * Genera `seed/demo.ndjson` a partir de src/data/demoContent.ts para importar
 * el contenido inicial (DEMO + real) en un dataset de Sanity vacío:
 *
 *   npm run seed                       # genera seed/demo.ndjson
 *   cd studio && npm run seed          # sanity dataset import ../seed/demo.ndjson production --replace
 *
 * Imágenes: sólo se incluyen las fotos reales de `public/photos/*` (se suben con
 * `_sanityAsset`). Los marcadores `/demo/*` NO se suben (el editor pone la imagen real).
 */
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Node 22.6+/24 elimina los tipos al vuelo; el import type de "@/types" desaparece.
const { demoContent } = await import(pathToFileURL(join(root, "src/data/demoContent.ts")).href);

const ls = (v) => (v ? { _type: "localeString", es: v.es ?? "", en: v.en ?? "" } : undefined);
const lt = (v) => (v ? { _type: "localeText", es: v.es ?? "", en: v.en ?? "" } : undefined);
const clean = (o) => JSON.parse(JSON.stringify(o, (_, x) => (x === undefined ? undefined : x)));

/** Imagen -> objeto `localizedImage` con asset a subir, sólo si es una foto real de /photos/. */
const img = (im) => {
  if (!im?.url?.startsWith("/photos/")) return undefined;
  const file = join(root, "public", im.url);
  if (!existsSync(file)) return undefined;
  return {
    _type: "localizedImage",
    _sanityAsset: `image@${pathToFileURL(file).href}`,
    alt: ls(im.alt),
  };
};

const c = demoContent;
const docs = [];

docs.push(
  clean({
    _id: "siteSettings",
    _type: "siteSettings",
    demoMode: c.settings.demoMode,
    whatsappNumber: c.settings.whatsappNumber,
    whatsappDefaultMessage: ls(c.settings.whatsappDefaultMessage),
    instagramHandle: c.settings.instagramHandle,
    instagramUrl: c.settings.instagramUrl,
  }),
);

docs.push(
  clean({
    _id: "homeSection",
    _type: "homeSection",
    isDemo: c.home.isDemo,
    title: ls(c.home.title),
    subtitle: ls(c.home.subtitle),
    ctaLabel: ls(c.home.ctaLabel),
    secondaryCtaLabel: ls(c.home.secondaryCtaLabel),
    complementaryText: lt(c.home.complementaryText),
    heroMedia: img(c.home.heroMedia),
  }),
);

docs.push(
  clean({
    _id: "aboutSection",
    _type: "aboutSection",
    isDemo: c.about.isDemo,
    heading: ls(c.about.heading),
    body: lt(c.about.body),
    highlightNumber: ls(c.about.highlightNumber),
    highlightLabel: ls(c.about.highlightLabel),
  }),
);

docs.push(
  clean({
    _id: "gallerySettings",
    _type: "gallerySettings",
    source: c.gallery.source,
    maxItems: c.gallery.maxItems,
    instagramCtaLabel: ls(c.gallery.instagramCtaLabel),
    instagramPostUrls: c.gallery.instagramPostUrls ?? [],
  }),
);

docs.push(
  clean({
    _id: "locationSection",
    _type: "locationSection",
    placeName: c.location.placeName,
    addressPending: c.location.addressPending,
    address: ls(c.location.address),
    mapEmbedUrl: c.location.mapEmbedUrl || undefined,
    latitude: c.location.latitude,
    longitude: c.location.longitude,
    navigationUrl: c.location.navigationUrl || undefined,
    attentionNote: lt(c.location.attentionNote),
  }),
);

docs.push(
  clean({
    _id: "ctaFinalSection",
    _type: "ctaFinalSection",
    isDemo: c.ctaFinal.isDemo,
    title: ls(c.ctaFinal.title),
    text: lt(c.ctaFinal.text),
    buttonLabel: ls(c.ctaFinal.buttonLabel),
    backgroundMedia: img(c.ctaFinal.backgroundMedia),
  }),
);

docs.push(
  clean({
    _id: "footerSettings",
    _type: "footerSettings",
    tagline: ls(c.footer.tagline),
    showLegal: c.footer.showLegal,
    legalLinks: [],
  }),
);

const hg = (h, extra = {}) =>
  clean({ isDemo: h.isDemo, title: ls(h.title), intro: ls(h.intro), ...extra });
docs.push(
  clean({
    _id: "sectionHeaders",
    _type: "sectionHeaders",
    courses: hg(c.headers.courses),
    gallery: hg(c.headers.gallery),
    reviews: hg(c.headers.reviews),
    faq: hg(c.headers.faq, { welcome: ls(c.headers.faq.welcome) }),
    location: hg(c.headers.location),
  }),
);

for (const co of c.courses) {
  docs.push(
    clean({
      _id: co._id,
      _type: "course",
      title: ls(co.title),
      slug: { _type: "slug", current: co.slug },
      isDemo: co.isDemo,
      active: co.active,
      order: co.order,
      shortDescription: ls(co.shortDescription),
      longDescription: lt(co.longDescription),
      duration: ls(co.duration),
      priceDisplayMode: co.priceDisplayMode,
      price: co.price,
      currency: co.currency,
      features: co.features.map(ls),
      level: co.level,
      image: img(co.image),
      pagoHabilitado: co.pagoHabilitado,
    }),
  );
}

for (const r of c.reviews) {
  docs.push(
    clean({
      _id: r._id,
      _type: "review",
      authorName: r.authorName,
      isDemo: r.isDemo,
      active: r.active,
      order: r.order,
      text: lt(r.text),
      rating: r.rating,
      courseName: ls(r.courseName),
    }),
  );
}

for (const cat of c.faqCategories) {
  docs.push(
    clean({
      _id: cat._id,
      _type: "faqCategory",
      name: ls(cat.name),
      active: cat.active,
      order: cat.order,
    }),
  );
}
for (const it of c.faqItems) {
  docs.push(
    clean({
      _id: it._id,
      _type: "faqItem",
      category: { _type: "reference", _ref: it.categoryId },
      question: ls(it.question),
      answer: lt(it.answer),
      isDemo: it.isDemo,
      active: it.active,
      order: it.order,
    }),
  );
}

mkdirSync(join(root, "seed"), { recursive: true });
const out = docs.map((d) => JSON.stringify(d)).join("\n") + "\n";
writeFileSync(join(root, "seed/demo.ndjson"), out);
console.log(`seed/demo.ndjson — ${docs.length} documentos`);
