import { sanityClient } from "@/lib/sanity.client"
import Image from "next/image";

const query = `
  *[_type == "page" && slug.current == "home"][0].about{
    "image": image.asset->url,
    text 
  }
`

const HomeAbout = async () => {
  const aboutData = await sanityClient.fetch(query, {}, { cache: "no-store" });

  return (
    <section className="pt-10 pb-17.5 md:pb-40 lg:pt-24 lg:pb-40 px-6 lg:px-27.5">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:justify-between lg:gap-16">

          {/* Image */}
          <div className="flex justify-center lg:justify-center lg:items-center mb-12.5 lg:mb-0 lg:shrink-0">
            <Image
              alt="about_image"
              src={aboutData.image}
              width={267}
              height={264}
              className="w-55 md:w-65 lg:w-66.75 h-auto"
            />
          </div>

          {/* Text */}
          <div className="w-full lg:max-w-158.75 text-center lg:text-left">
            <p className="text-white text-[18px] leading-relaxed">
              {aboutData.text}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeAbout;   