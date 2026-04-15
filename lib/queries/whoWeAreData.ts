// lib/queries/whoWeAre.ts

import { sanityClient } from "../sanity.client";

// 🔹 TYPE
export interface WhoWeAreSection {
  title: string;
  description: string;
  sectionTheme?: {
    titleColor?: string;
    descriptionColor?: string;
  };
}

// 🔹 QUERY
const whoWeAreQuery = `
  *[_type == "page" && slug.current == "home"][0].whoAreWe{
    title,
    description,
    sectionTheme{
      titleColor,
      descriptionColor
    }
  }
`;

// 🔹 FETCH FUNCTION
export const getWhoWeAre = async (): Promise<WhoWeAreSection> => {
  return await sanityClient.fetch(whoWeAreQuery);
};