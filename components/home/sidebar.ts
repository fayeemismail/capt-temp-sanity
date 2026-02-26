// import { sanityClient } from "@/lib/sanity.client";

// const SIDEBAR_QUERY = `
//   *[_type == "globalSettings"][0].sidebar{
//     leftSidebar,
//     rightSidebar
//   }
// `;

// type SidebarResult = {
//   leftSidebar: unknown;
//   rightSidebar: unknown;
// };

// async function fetchSidebar(): Promise<SidebarResult | null> {
//   try {
//     return await sanityClient.fetch<SidebarResult>(SIDEBAR_QUERY);
//   } catch (error) {
//     console.error("Failed to fetch sidebar:", error);
//     return null;
//   }
// }

// export async function getLeftSidebar() {
//   const data = await fetchSidebar();
//   return data?.leftSidebar ?? null;
// }

// export async function getRightSidebar() {
//   const data = await fetchSidebar();
//   return data?.rightSidebar ?? null;
// }



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
  const data = await sanityClient.fetch<SidebarLink[]>(SIDEBAR_QUERY);
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