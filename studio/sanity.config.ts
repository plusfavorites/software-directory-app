import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "../sanity/schema";
import { projectId, dataset, apiVersion } from "../sanity/env";

export default defineConfig({
  name: "filewave-studio",
  title: "FileWave Studio",
  projectId: projectId || "your-project-id",
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
