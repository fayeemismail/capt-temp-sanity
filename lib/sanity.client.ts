
import { projectId } from "@/env";
import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: projectId,
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});
