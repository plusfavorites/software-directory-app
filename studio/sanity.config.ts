import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "../sanity/schema";
import { projectId, dataset, apiVersion } from "../sanity/env";

export default defineConfig({
  name: "Ridnt-studio",
  title: "Ridnt Studio",
  projectId: projectId || "tq2oqx4a",
  dataset: dataset || "production",
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool(),
    visionTool({
      defaultApiVersion: apiVersion,
    }),
  ],
});
