import { createClient } from "@sanity/client";

const PROJECT_ID = "ullgaoyt";
const DATASET = "production";
export const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  useCdn: true,
  apiVersion: "2024-01-11",
});
