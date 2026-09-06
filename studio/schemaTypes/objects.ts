import { defineType, defineField } from "sanity";

/** Texto corto bilingüe. */
export const localeString = defineType({
  name: "localeString",
  title: "Texto (ES / EN)",
  type: "object",
  fields: [
    defineField({ name: "es", title: "Español", type: "string" }),
    defineField({ name: "en", title: "English", type: "string" }),
  ],
});

/** Texto largo bilingüe (párrafos, se admiten saltos de línea). */
export const localeText = defineType({
  name: "localeText",
  title: "Texto largo (ES / EN)",
  type: "object",
  fields: [
    defineField({ name: "es", title: "Español", type: "text", rows: 5 }),
    defineField({ name: "en", title: "English", type: "text", rows: 5 }),
  ],
});

/** Imagen con texto alternativo bilingüe. */
export const localizedImage = defineType({
  name: "localizedImage",
  title: "Imagen",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Texto alternativo (accesibilidad)",
      type: "localeString",
    }),
  ],
});
