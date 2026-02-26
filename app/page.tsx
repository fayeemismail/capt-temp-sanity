import HeroSection from "@/components/home/HeroSection";
import HomeAbout from "@/components/home/HomeAbout";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main >
        <HeroSection />
        <HomeAbout />
      </main>
    </>
  );
}
