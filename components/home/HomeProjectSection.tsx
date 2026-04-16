// app/components/HomeProjectSection.tsx
import { sanityClient } from "@/lib/sanity.client";
import { Suspense } from "react";
import ProjectCards from "./ProjectCards";
import ProjectSectionSkeleton from "./ProjectSectionSkeleton";

const query = `
*[_type == "page" && slug.current == "home"][0].projects{
  _type,
  heading,
  items[]{
    _key,
    name,
    "mediaType": media.mediaType,
    "image": media.image.asset->url,
    "imageMetadata": media.image.asset->{
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    "videoFile": media.videoFile.asset->url,
    "videoUrl": media.videoUrl
  }
}
`;

export default async function HomeProjectSection() {
  let data;
  
  try {
    data = await sanityClient.fetch(query, {}, { 
      cache: "no-store",
      // Add timeout handling
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-2xl">Failed to load projects</p>
      </div>
    );
  }

  if (!data?.items?.length) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-2xl">No projects available at the moment</p>
      </div>
    );
  }

  return (
    <section className="pt-10 px-4 lg:px-28 lg:pt-24 pb-5">
  <div className="max-w-7xl mx-auto">
    <div className="relative z-10 flex flex-col items-center lg:items-start justify-center lg:justify-start py-16 md:py-20">
      
      <h1 className="text-4xl md:text-7xl lg:text-8xl text-white font-bold tracking-tight mb-8 md:mb-16 lg:mb-20 text-center lg:text-left">
        {data.heading || "Beyond the Brief"}
      </h1>

      <Suspense fallback={<ProjectSectionSkeleton />}>
        <ProjectCards items={data.items} />
      </Suspense>

    </div>
  </div>
</section>
  );
}