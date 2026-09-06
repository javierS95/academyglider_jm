import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { deskStructure } from "./deskStructure";

export default defineConfig({
  name: "academyglider",
  title: "AcademyGlider",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "REEMPLAZAR_PROJECT_ID",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [structureTool({ structure: deskStructure }), visionTool()],
  schema: { types: schemaTypes },
});
