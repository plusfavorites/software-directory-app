import { defineCliConfig } from "sanity/cli";
import { projectId, dataset } from "../sanity/env";

export default defineCliConfig({
  api: {
    projectId: projectId || "tq2oqx4a",
    dataset: dataset || "production",
  },
});
