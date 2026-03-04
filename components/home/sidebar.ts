import { sanityClient } from "@/lib/sanity.client";
import type { SidebarLink } from "@/types/sidebar";

const SIDEBAR_QUERY = `
  *[_type == "globalSettings"][0].sidebar.leftSidebar[]{
    _key,
    _type,
    text,
    url,
    "imageUrl": image.asset->url
  }
`;

export async function getLeftSidebar(): Promise<SidebarLink[]> {
  const data = await sanityClient.fetch<SidebarLink[]>(SIDEBAR_QUERY, {}, { cache: "no-store" });
  return data ?? [];
}

const RIGHT_SIDEBAR_QUERY = `
  *[_type == "globalSettings"][0].sidebar.rightSidebar[]{
    _key,
    _type,
    text,
    url,
    "imageUrl": image.asset->url
  }
`;

export async function getRightSidebar(): Promise<SidebarLink[]> {
  const data = await sanityClient.fetch<SidebarLink[]>(RIGHT_SIDEBAR_QUERY);
  return data ?? [];
}