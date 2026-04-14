// components/home/WhoWeAreSection.tsx

"use client";

import type { WhoWeAreSection } from "@/lib/queries/whoWeAreData";
import { motion } from "framer-motion";

interface WhoWeAreProps {
  data: WhoWeAreSection;
}

export default function WhoWeAreSection({ data }: WhoWeAreProps) {
  const { title, description, stats, sectionTheme } = data;

  const titleColor = sectionTheme?.titleColor || "#FFFFFF";
  const descColor = sectionTheme?.descriptionColor || "#FFFFFF";

  return (
    <section className="pt-12 pb-16 lg:pt-16 lg:pb-24 px-6 lg:px-27.5 bg-black">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* Left Side - Title + Description */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 
              className="text-3xl lg:text-4xl font-bold tracking-tight mb-6"
              style={{ color: titleColor }}
            >
              {title}
            </h2>
            
            <p 
              className="text-[16px] lg:text-[17px] leading-relaxed max-w-100 mx-auto lg:mx-0"
              style={{ color: descColor }}
            >
              {description}
            </p>
          </div>

          {/* Right Side - Vertical Stats */}
          <div className="lg:w-1/2 flex flex-col justify-center gap-0 w-full">
            {stats.map((stat, index) => {
              const theme = stat.theme || {};

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="flex flex-col py-6"
                >
                  {/* Label + Value on same row */}
                  <div className="flex items-center justify-between mb-3">
                    {/* Label */}
                    <div 
                      className="text-[15px] lg:text-[18px] font-normal"
                      style={{ color: theme.textColor || "#FFFFFF" }}
                    >
                      {stat.label}
                    </div>

                    {/* Number */}
                    <div 
                      className="text-4xl lg:text-5xl font-semibold tracking-tighter"
                      style={{ color: theme.valueColor || "#FFFFFF" }}
                    >
                      {stat.value}
                    </div>
                  </div>

                  {/* Filling Line below the row */}
                  <div className="relative h-0.5 w-full bg-gray-800 overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      transition={{
                        duration: 1,
                        delay: index * 0.2 + 0.3,
                        ease: "easeOut"
                      }}
                      viewport={{ once: true }}
                      className="absolute h-full left-0 top-0"
                      style={{ backgroundColor: theme.dividerColor || "#FFFFFF" }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}