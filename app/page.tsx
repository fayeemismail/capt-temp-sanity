import HeroSection from "@/components/home/HeroSection";
import HomeAbout from "@/components/home/HomeAbout";
import Image from "next/image";
import HomeProjectSection from "../components/home/HomeProjectSection";

export default function Home() {
  return (
    <>
      <main >
        <HeroSection />
        <HomeAbout />
        {/* <HomeProjectSection /> */}
      </main>
    </>
  );
}
