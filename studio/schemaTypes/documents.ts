import { defineType, defineField } from "sanity";

const LS = "localeString";
const LT = "localeText";

export const course = defineType({
  name: "course",
  title: "Curso",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Nombre", type: LS, validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug (identificador en la URL)",
      type: "slug",
      options: { source: "title.es" },
    }),
    defineField({ name: "isDemo", title: "Contenido de demostración", type: "boolean", initialValue: true }),
    defineField({ name: "active", title: "Activo (visible en el sitio)", type: "boolean", initialValue: true }),
    defineField({ name: "order", title: "Orden", type: "number", initialValue: 10 }),
    defineField({ name: "shortDescription", title: "Descripción corta", type: LS }),
    defineField({ name: "longDescription", title: "Descripción larga", type: LT }),
    defineField({ name: "duration", title: "Duración", type: LS }),
    defineField({
      name: "priceDisplayMode",
      title: "Mostrar precio",
      type: "string",
      options: {
        list: [
          { title: "Mostrar el precio", value: "mostrar" },
          { title: "Mostrar “Consultar”", value: "consultar" },
        ],
        layout: "radio",
      },
      initialValue: "mostrar",
    }),
    defineField({ name: "price", title: "Precio (número, sin separadores)", type: "number" }),
    defineField({ name: "currency", title: "Moneda", type: "string", initialValue: "CLP" }),
    defineField({
      name: "features",
      title: "Características",
      type: "array",
      of: [{ type: LS }],
    }),
    defineField({
      name: "level",
      title: "Nivel",
      type: "string",
      options: {
        list: [
          { title: "Principiante", value: "principiante" },
          { title: "Avanzado", value: "avanzado" },
          { title: "Otro", value: "otro" },
        ],
      },
      initialValue: "principiante",
    }),
    defineField({ name: "image", title: "Imagen", type: "localizedImage" }),
    defineField({ name: "whatsappMessageOverride", title: "Mensaje de WhatsApp específico (opcional)", type: LS }),
    defineField({
      name: "pagoHabilitado",
      title: "Pago online habilitado (RESERVADO — Mercado Pago, aún no operativo)",
      type: "boolean",
      initialValue: false,
      readOnly: true,
    }),
  ],
  orderings: [{ title: "Orden", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title.es", subtitle: "level", media: "image", active: "active" },
    prepare: ({ title, subtitle, media, active }) => ({
      title: `${active ? "" : "🚫 "}${title || "Curso"}`,
      subtitle,
      media,
    }),
  },
});

export const review = defineType({
  name: "review",
  title: "Reseña",
  type: "document",
  fields: [
    defineField({ name: "authorName", title: "Nombre de quien la escribe", type: "string", validation: (r) => r.required() }),
    defineField({ name: "isDemo", title: "Contenido de demostración", type: "boolean", initialValue: true }),
    defineField({ name: "active", title: "Activa (visible en el sitio)", type: "boolean", initialValue: true }),
    defineField({ name: "order", title: "Orden", type: "number", initialValue: 10 }),
    defineField({ name: "text", title: "Texto de la reseña", type: LT }),
    defineField({
      name: "rating",
      title: "Estrellas (1 a 5, opcional)",
      type: "number",
      validation: (r) => r.min(1).max(5),
    }),
    defineField({ name: "courseName", title: "Curso relacionado (opcional)", type: LS }),
    defineField({ name: "photo", title: "Foto (opcional)", type: "localizedImage" }),
  ],
  orderings: [{ title: "Orden", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "authorName", subtitle: "text.es", active: "active" },
    prepare: ({ title, subtitle, active }) => ({
      title: `${active ? "" : "🚫 "}${title}`,
      subtitle,
    }),
  },
});

export const faqCategory = defineType({
  name: "faqCategory",
  title: "FAQ · Categoría",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nombre", type: LS, validation: (r) => r.required() }),
    defineField({ name: "active", title: "Activa", type: "boolean", initialValue: true }),
    defineField({ name: "order", title: "Orden", type: "number", initialValue: 10 }),
  ],
  orderings: [{ title: "Orden", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name.es", active: "active" }, prepare: ({ title, active }) => ({ title: `${active ? "" : "🚫 "}${title}` }) },
});

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ · Pregunta",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Categoría",
      type: "reference",
      to: [{ type: "faqCategory" }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "question", title: "Pregunta", type: LS, validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Respuesta", type: LT }),
    defineField({ name: "isDemo", title: "Contenido de demostración", type: "boolean", initialValue: true }),
    defineField({ name: "active", title: "Activa", type: "boolean", initialValue: true }),
    defineField({ name: "order", title: "Orden dentro de la categoría", type: "number", initialValue: 10 }),
  ],
  orderings: [{ title: "Orden", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "question.es", subtitle: "category.name.es", active: "active" },
    prepare: ({ title, subtitle, active }) => ({ title: `${active ? "" : "🚫 "}${title}`, subtitle }),
  },
});
