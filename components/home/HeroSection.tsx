"use client";

import { Hero } from "@/lib/queries/heroData";
import Image from "next/image";
import { motion } from "framer-motion";

interface HeroSectionProps {
  data: Hero | null;
}

const HeroSection = ({ data }: HeroSectionProps) => {
  if (!data) return null;

  return (
    <section className="pt-32 pb-32 px-4 lg:px-27.5">
      {/* Logo */}
      {data.logo && (
        <div className="flex justify-center mb-10">
          <Image
            alt="logo"
            src={data.logo}
            width={400}
            height={400}
            priority
            className="hidden lg:block w-55 h-auto"
          />
        </div>
      )}

      {/* Hero Image */}
      {data.backgroundImage && (
        <div className="flex justify-center mb-12">
          <Image
            alt="background"
            src={data.backgroundImage}
            width={1920}
            height={600}
            priority
            className="w-full max-w-full h-auto"
          />
        </div>
      )}

      {/* Text + Stats: stacked on mobile, side-by-side on lg */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-20 mt-4 lg:mt-40">

        {/* Left: Heading + Text */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <p className="text-white font-bold mb-5 text-3xl">
            {data.heading}
          </p>
          <p className="text-white text-[clamp(6px,5vw,22px)] mx-auto lg:mx-0">
            {data.text}
          </p>
        </div>

        {/* Right: Stats */}
        {data.stats && data.stats.length > 0 && (
          <div className="lg:w-1/2 flex flex-col mt-12 lg:mt-0">
            {data.stats.map((stat, index) => {
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
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="text-[15px] lg:text-[18px] font-normal"
                      style={{ color: theme.textColor || "#FFFFFF" }}
                    >
                      {stat.label}
                    </div>

                    <div
                      className="text-4xl lg:text-5xl font-semibold tracking-tighter"
                      style={{ color: theme.valueColor || "#FFFFFF" }}
                    >
                      {stat.value}
                    </div>
                  </div>

                  {/* Animated divider */}
                  <div className="relative h-0.5 w-full bg-gray-800 overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      transition={{
                        duration: 1,
                        delay: index * 0.2 + 0.3,
                        ease: "easeOut",
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
        )}

      </div>
    </section>
  );
};

export default HeroSection;