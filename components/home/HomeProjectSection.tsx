// app/components/HomeProjectSection.tsx  (or wherever you place it)
import { sanityClient } from "@/lib/sanity.client";
import ProjectCards from "./ProjectCards"; // Import the client part

const query = `
*[_type == "page" && slug.current == "home"][0].projects{
  _type,
  heading,
  items[]{
    _key,
    name,
    "mediaType": media.mediaType,
    "image": media.image.asset->url,
    "videoFile": media.videoFile.asset->url,
    "videoUrl": media.videoUrl
  }
}
`;

export default async function HomeProjectSection() {
  let data;

  try {
    data = await sanityClient.fetch(query);
    // console.log(data)
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-2xl">Failed to load projects</p>
      </div>
    );
  }

  if (!data || !data.items || !Array.isArray(data.items) || data.items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-2xl">No projects available at the moment</p>
      </div>
    );
  }

  const { heading, items } = data;

  return (
    <section className=" pt-40 lg:mx-27.5 lg:pt-24 pb-40">
      <div className="container">
        <div className="relative z-10 flex flex-col items-center justify-center lg:justify-start lg:items-start min-h-screen px-5  md:px-12 lg:px-16 py-16 md:py-20">
        <h1 className="text-5xl md:text-7xl lg:text-8xl  font-bold tracking-tight mb-2 md:mb-16 lg:mb-20 text-center ">
          {heading || "Beyond the Brief"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6  md:gap-10 lg:gap-7  w-full max-w-7xl ">
          <ProjectCards items={items} />
        </div>
      </div>
      </div>
      
    </section>
  );
}