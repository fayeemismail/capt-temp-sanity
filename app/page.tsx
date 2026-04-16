//app/page.tsx
import HeroSection from "@/components/home/HeroSection";
import HomeAbout from "@/components/home/HomeAbout";
import Image from "next/image";
import HomeProjectSection from "../components/home/HomeProjectSection";
import { getWhoWeAre } from "@/lib/queries/whoWeAreData";
import WhoWeAreSection from '../components/home/WhoWeAreSection'
import { getHomeHero } from "@/lib/queries/heroData";

export async function generateMetadata() {
  return {
    title: "Font Creative Studio",
    description:
      "Font is a brand positioning company that helps businesses build powerful brands through decisive strategies and growth-driven tactics rooted in customer-centric insights.",
  };
}

export default async function Home() {

  const data = await getWhoWeAre();
  const hero = await getHomeHero();

  return (
    <>
      <main >
        {hero &&  <HeroSection data={hero} />}
        <HomeAbout />
        {data && <WhoWeAreSection data={data} />}
        <HomeProjectSection />
      </main>
    </>
  );
}
