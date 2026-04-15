// lib/heroData.ts

import { sanityClient } from "../sanity.client";



/* =========================
   Types
========================= */

export interface HeroStatTheme {
  textColor?: string;
  valueColor?: string;
  dividerColor?: string;
}

export interface HeroStat {
  label?: string;
  value?: string;
  theme?: HeroStatTheme;
}

export interface SectionTheme {
  headingColor?: string;
  textColor?: string;
}

export interface Hero {
  backgroundImage?: string;
  logo?: string;
  text?: string;
  heading?: string;
  stats?: HeroStat[];
  sectionTheme?: SectionTheme;
}


/* =========================
   GROQ Query
========================= */

const query = `
  *[_type == "page" && slug.current == "home"][0].hero{
    "backgroundImage": backgroundImage.asset->url,
    "logo": logo.asset->url,
    text,
    heading,

    stats[]{
      label,
      value,
      theme{
        textColor,
        valueColor,
        dividerColor
      }
    },

    sectionTheme{
      headingColor,
      textColor
    }
  }
`;

/* =========================
   Fetch Function
========================= */

export async function getHomeHero(): Promise<Hero | null> {
  try {
    const data = await sanityClient.fetch<Hero>(query);
    return data;
  } catch (error) {
    console.error("Error fetching home hero:", error);
    return null;
  }
}
