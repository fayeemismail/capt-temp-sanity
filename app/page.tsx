import HeroSection from "@/components/home/HeroSection";
import HomeAbout from "@/components/home/HomeAbout";
import Image from "next/image";
import HomeProjectSection from "../components/home/HomeProjectSection";
import { getWhoWeAre } from "@/lib/queries/whoWeAreData";
import WhoWeAreSection from '../components/home/WhoWeAreSection'

export default async function Home() {

  const data = await getWhoWeAre();

  return (
    <>
      <main >
        <HeroSection />
        <HomeAbout />
        {data && <WhoWeAreSection data={data} />}
        <HomeProjectSection />
      </main>
    </>
  );
}
