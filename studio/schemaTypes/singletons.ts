import { defineType, defineField } from "sanity";

const LS = "localeString";
const LT = "localeText";
const IMG = { type: "localizedImage" as const };

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configuración del sitio",
  type: "document",
  fields: [
    defineField({
      name: "demoMode",
      title: "Modo demostración (muestra los avisos “CONTENIDO DEMO”)",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "logo", title: "Logo", ...IMG }),
    defineField({
      name: "whatsappNumber",
      title: "Número de WhatsApp (formato internacional sin +, ej. 56952559138)",
      type: "string",
      validation: (r) => r.required().regex(/^\d{8,15}$/, { name: "solo dígitos" }),
    }),
    defineField({
      name: "whatsappDefaultMessage",
      title: "Mensaje de WhatsApp por defecto",
      type: LS,
    }),
    defineField({ name: "instagramHandle", title: "Usuario de Instagram (sin @)", type: "string" }),
    defineField({ name: "instagramUrl", title: "URL de Instagram", type: "url" }),
    defineField({
      name: "brandColors",
      title: "Colores de marca (opcional)",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "sunset", type: "string", title: "Atardecer (hex)" }),
        defineField({ name: "sky", type: "string", title: "Cielo (hex)" }),
        defineField({ name: "forest", type: "string", title: "Montaña (hex)" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Configuración del sitio" }) },
});

export const homeSection = defineType({
  name: "homeSection",
  title: "Home / Portada",
  type: "document",
  fields: [
    defineField({
      name: "isDemo",
      title: "Contenido de demostración",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "title", title: "Título principal", type: LS }),
    defineField({ name: "subtitle", title: "Subtítulo", type: LS }),
    defineField({ name: "ctaLabel", title: "Texto del botón principal (WhatsApp)", type: LS }),
    defineField({ name: "secondaryCtaLabel", title: "Texto del botón secundario", type: LS }),
    defineField({ name: "complementaryText", title: "Texto complementario", type: LT }),
    defineField({
      name: "heroMedia",
      title: "Foto de portada (computador y celular)",
      description:
        "Se usa en computador y también en celular si no subes una foto para celular. Se muestra horizontal 16:9 en computador y vertical 2:3 en celular. El sitio la recorta solo (nunca la estira). Para elegir qué parte se ve: haz clic en la foto → ícono de recorte → arrastra el círculo sobre el piloto o la vela.",
      ...IMG,
    }),
    defineField({
      name: "heroMediaMobile",
      title: "Foto de portada SOLO para celular (opcional)",
      description:
        "Déjala vacía para usar la misma foto de arriba. Súbela sólo si quieres otra foto en celulares. Se muestra vertical 2:3; idealmente una foto vertical.",
      ...IMG,
    }),
    defineField({
      name: "whatsappMessageOverride",
      title: "Mensaje de WhatsApp específico (opcional)",
      type: LS,
    }),
  ],
  preview: { prepare: () => ({ title: "Home / Portada" }) },
});

export const aboutSection = defineType({
  name: "aboutSection",
  title: "Quiénes somos",
  type: "document",
  fields: [
    defineField({
      name: "isDemo",
      title: "Contenido de demostración",
      type: "boolean",
      initialValue: false,
      description: "Debe quedar en FALSO: el texto de Javier es real.",
    }),
    defineField({ name: "heading", title: "Título", type: LS }),
    defineField({ name: "body", title: "Texto (separar párrafos con línea en blanco)", type: LT }),
    defineField({ name: "highlightNumber", title: "Cifra destacada (ej. +20)", type: LS }),
    defineField({ name: "highlightLabel", title: "Etiqueta de la cifra", type: LS }),
    defineField({ name: "photo", title: "Foto", ...IMG }),
  ],
  preview: { prepare: () => ({ title: "Quiénes somos" }) },
});

export const gallerySettings = defineType({
  name: "gallerySettings",
  title: "Galería (Instagram)",
  type: "document",
  fields: [
    defineField({
      name: "source",
      title: "Fuente",
      type: "string",
      options: {
        list: [
          { title: "Publicaciones por enlace (sin token) — recomendado", value: "posts" },
          { title: "Feed automático — Instagram Graph API (requiere token)", value: "instagram" },
          { title: "Manual (imágenes de abajo)", value: "manual" },
        ],
        layout: "radio",
      },
      initialValue: "posts",
    }),
    defineField({
      name: "maxItems",
      title: "Máximo de publicaciones a mostrar",
      type: "number",
      initialValue: 6,
      validation: (r) => r.min(1).max(12),
    }),
    defineField({ name: "instagramCtaLabel", title: "Texto del botón “Ver más”", type: LS }),
    defineField({
      name: "instagramPostUrls",
      title: "Publicaciones de Instagram",
      description:
        "El orden aquí es el orden en la galería (arriba = primero). En Instagram: abre el post → «···» → «Copiar enlace». Vale /p/XXXX/ y /reel/XXXX/.",
      type: "array",
      of: [{ type: "url" }],
      validation: (r) => r.unique(),
      hidden: ({ document }) => document?.source !== "posts",
    }),
    defineField({
      name: "manualImages",
      title: "Imágenes manuales (respaldo si la fuente elegida no devuelve nada)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "image", title: "Imagen", ...IMG }),
            defineField({ name: "caption", title: "Descripción", type: LS }),
            defineField({ name: "link", title: "Enlace (opcional)", type: "url" }),
          ],
          preview: { select: { media: "image", title: "caption.es" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Galería (Instagram)" }) },
});

export const locationSection = defineType({
  name: "locationSection",
  title: "Ubicación",
  type: "document",
  fields: [
    defineField({
      name: "placeName",
      title: "Nombre del lugar",
      type: "string",
      initialValue: "Geopark Vizcachaz",
    }),
    defineField({
      name: "addressPending",
      title: "Dirección exacta pendiente",
      type: "boolean",
      initialValue: true,
      description:
        "Mientras esté activo se muestra “coordina por WhatsApp” en vez de la dirección y el mapa.",
    }),
    defineField({ name: "address", title: "Dirección exacta", type: LS }),
    defineField({
      name: "mapEmbedUrl",
      title: "URL de inserción de Google Maps (iframe src)",
      type: "url",
    }),
    defineField({ name: "latitude", title: "Latitud", type: "number" }),
    defineField({ name: "longitude", title: "Longitud", type: "number" }),
    defineField({ name: "navigationUrl", title: "Enlace “Cómo llegar”", type: "url" }),
    defineField({ name: "attentionNote", title: "Nota de atención", type: LT }),
  ],
  preview: { prepare: () => ({ title: "Ubicación" }) },
});

export const ctaFinalSection = defineType({
  name: "ctaFinalSection",
  title: "CTA final",
  type: "document",
  fields: [
    defineField({
      name: "isDemo",
      title: "Contenido de demostración",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "title", title: "Título", type: LS }),
    defineField({ name: "text", title: "Texto", type: LT }),
    defineField({ name: "buttonLabel", title: "Texto del botón", type: LS }),
    defineField({
      name: "backgroundMedia",
      title: "Foto de fondo (computador y celular)",
      description:
        "Se usa en computador y también en celular si no subes una foto para celular. Se muestra muy horizontal 21:9 en computador y vertical 4:5 en celular. El sitio la recorta solo (nunca la estira). Para elegir qué parte se ve: haz clic en la foto → ícono de recorte → arrastra el círculo sobre el piloto o la vela.",
      ...IMG,
    }),
    defineField({
      name: "backgroundMediaMobile",
      title: "Foto de fondo SOLO para celular (opcional)",
      description:
        "Déjala vacía para usar la misma foto de arriba. Súbela sólo si quieres otra foto en celulares. Se muestra vertical 4:5.",
      ...IMG,
    }),
    defineField({
      name: "whatsappMessageOverride",
      title: "Mensaje de WhatsApp específico (opcional)",
      type: LS,
    }),
  ],
  preview: { prepare: () => ({ title: "CTA final" }) },
});

export const footerSettings = defineType({
  name: "footerSettings",
  title: "Footer",
  type: "document",
  fields: [
    defineField({ name: "tagline", title: "Frase corta bajo el nombre", type: LS }),
    defineField({
      name: "showLegal",
      title: "Mostrar enlaces legales",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "legalLinks",
      title: "Enlaces legales",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Texto", type: LS }),
            defineField({ name: "url", title: "URL", type: "string" }),
          ],
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Footer" }) },
});

const headerGroup = (name: string, title: string, extra: string[] = []) =>
  defineField({
    name,
    title,
    type: "object",
    options: { collapsible: true },
    fields: [
      defineField({ name: "isDemo", title: "Demo", type: "boolean", initialValue: true }),
      defineField({ name: "title", title: "Título", type: LS }),
      defineField({ name: "intro", title: "Introducción", type: LS }),
      ...extra.map((f) => defineField({ name: f, title: f, type: LS })),
    ],
  });

export const sectionHeaders = defineType({
  name: "sectionHeaders",
  title: "Títulos de secciones",
  type: "document",
  fields: [
    headerGroup("courses", "Cursos"),
    headerGroup("gallery", "Galería"),
    headerGroup("reviews", "Reseñas"),
    headerGroup("faq", "FAQ", ["welcome"]),
    headerGroup("location", "Ubicación"),
  ],
  preview: { prepare: () => ({ title: "Títulos de secciones" }) },
});
