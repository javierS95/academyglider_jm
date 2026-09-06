import type { StructureResolver } from "sanity/structure";

const SINGLETONS: { id: string; title: string; icon?: string }[] = [
  { id: "siteSettings", title: "⚙️ Configuración del sitio" },
  { id: "homeSection", title: "🏔️ Home / Portada" },
  { id: "aboutSection", title: "👤 Quiénes somos" },
  { id: "gallerySettings", title: "📷 Galería (Instagram)" },
  { id: "locationSection", title: "📍 Ubicación" },
  { id: "ctaFinalSection", title: "✨ CTA final" },
  { id: "footerSettings", title: "🔻 Footer" },
  { id: "sectionHeaders", title: "🔤 Títulos de secciones" },
];

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Contenido")
    .items([
      ...SINGLETONS.map((s) =>
        S.listItem()
          .title(s.title)
          .id(s.id)
          .child(S.document().schemaType(s.id).documentId(s.id))
      ),
      S.divider(),
      S.documentTypeListItem("course").title("🎓 Cursos"),
      S.documentTypeListItem("review").title("💬 Reseñas"),
      S.documentTypeListItem("faqCategory").title("🗂️ FAQ · Categorías"),
      S.documentTypeListItem("faqItem").title("❓ FAQ · Preguntas"),
    ]);
