// lib/data/footer.ts
import { FooterData, footerDataQuery } from "@/lib/queries/footerData";
import { sanityClient } from "@/lib/sanity.client";

export async function getFooterData(): Promise<FooterData | null> {
  const data = await sanityClient.fetch(footerDataQuery, {}, { cache: "no-store" });

  return data ?? null;
}