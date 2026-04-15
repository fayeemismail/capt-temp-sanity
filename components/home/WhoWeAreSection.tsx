// components/home/WhoWeAreSection.tsx

"use client";

import type { WhoWeAreSection } from "@/lib/queries/whoWeAreData";
import { motion } from "framer-motion";

interface WhoWeAreProps {
  data: WhoWeAreSection;
}

export default function WhoWeAreSection({ data }: WhoWeAreProps) {
  const { title, description,  sectionTheme } = data;

  const titleColor = sectionTheme?.titleColor || "#FFFFFF";
  const descColor = sectionTheme?.descriptionColor || "#FFFFFF";

  return (
    <section className="pt-12 pb-16 lg:pt-16 lg:pb-24 px-6 lg:px-27.5 bg-black">
      <div className="container mx-auto">
        <div className="flex flex-col  items-start">
          
          {/* Left Side - Title + Description */}
          <div className="lg:w-full text-center ">
            <h2 
              className="text-3xl lg:text-4xl font-bold tracking-tight mb-6"
              style={{ color: titleColor }}
            >
              {title}
            </h2>
            
            <p 
              className="text-[16px] lg:text-[17px] leading-relaxed  mx-auto lg:mx-0"
              style={{ color: descColor }}
            >
              {description}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}