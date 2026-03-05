// app/components/ProjectCards.tsx
"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Project {
  _key: string;
  name: string;
  videoFile?: string | null;
  image?: string | null;
  imageMetadata?: {
    metadata?: {
      dimensions?: {
        width: number;
        height: number;
      };
    };
  };
  videoUrl?: string | null;
}

interface ProjectCardsProps {
  items: Project[];
}

// Optimized image loader with Sanity CDN transformations
const sanityImageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  // Check if it's a Sanity CDN URL
  if (src.includes('cdn.sanity.io')) {
    // Add width and quality parameters for optimized images
    const baseUrl = src.split('?')[0];
    return `${baseUrl}?w=${width}&q=${quality || 85}&auto=format`;
  }
  return src;
};

export default function ProjectCards({ items }: ProjectCardsProps) {
  const [showAll, setShowAll] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  
  const displayedItems = useMemo(() => 
    showAll ? items : items.slice(0, 6),
    [items, showAll]
  );
  
  const hasMore = items.length > 6;

  const handleImageLoad = useCallback((key: string) => {
    setLoadedImages(prev => new Set(prev).add(key));
  }, []);

  return (
    <div className="w-full">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-7 w-full max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="popLayout">
          {displayedItems.map((project, index) => (
            <motion.div
              key={project._key || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.4, 
                delay: Math.min(index * 0.05, 0.3) 
              }}
            >
              <ProjectCard 
                project={project} 
                index={index}
                onImageLoad={handleImageLoad}
                isImageLoaded={loadedImages.has(project._key)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {hasMore && (
        <motion.div 
          className="flex justify-center mt-12 md:mt-16 lg:mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => setShowAll(!showAll)}
            className={`
              px-8 py-4 font-medium text-base sm:text-lg lg:text-xl
              rounded-full transition-all duration-300
              shadow-lg hover:shadow-xl focus:outline-none
              ${showAll ? "border text-white" : "text-white border"}
              hover:scale-105 active:scale-95
            `}
          >
            {showAll ? "Show Less" : `View More `}
          </button>
        </motion.div>
      )}
    </div>
  );
}

function ProjectCard({ 
  project, 
  index, 
  onImageLoad,
  isImageLoaded 
}: { 
  project: Project; 
  index: number;
  onImageLoad: (key: string) => void;
  isImageLoaded: boolean;
}) {
  const [showName, setIsShowName] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [localImageLoaded, setLocalImageLoaded] = useState(false);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const clickCount = useRef(0);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: "50px"
  });

  const hasVideo = !!project.videoFile;
  const hasImage = !!project.image;
  const hasLink = !!project.videoUrl;

  const bgStyle = useMemo(() => 
    index % 2 === 0
      ? "bg-gradient-to-b from-[#f5e8d3] to-[#d2b48c]"
      : "bg-[#a3c537]",
    [index]
  );

  // Optimized click handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    clickCount.current += 1;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (clickCount.current === 1) {
        setIsShowName(prev => !prev);
        setIsZoomed(true);
        setTimeout(() => setIsZoomed(false), 600);
      }
      clickCount.current = 0;
    }, 300);
  }, []);

  const handleDoubleClick = useCallback(() => {
    if (hasLink) {
      window.open(project.videoUrl!, "_blank", "noopener,noreferrer");
    }
  }, [hasLink, project.videoUrl]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    setIsShowName(true);
    setIsZoomed(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIsShowName(false);
    setIsZoomed(false);
  }, []);

  const handleLocalImageLoad = useCallback(() => {
    setLocalImageLoaded(true);
    onImageLoad(project._key);
  }, [project._key, onImageLoad]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Get image dimensions for better optimization
  const imageWidth = project.imageMetadata?.metadata?.dimensions?.width || 1200;
  const imageHeight = project.imageMetadata?.metadata?.dimensions?.height || 800;

  return (
    <div
      ref={ref}
      className={`group relative aspect-square rounded-xl md:rounded-2xl overflow-hidden shadow-2xl ${bgStyle} cursor-pointer select-none touch-manipulation`}
      onPointerDown={handlePointerDown}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Loading Skeleton */}
      {(!localImageLoaded && hasImage) && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Media with optimized loading */}
      {(inView || localImageLoaded) && (
        <motion.div
          className={`absolute inset-0 transition-transform duration-500 ease-out ${
            isZoomed ? "scale-[1.06]" : "scale-100"
          }`}
          animate={{ scale: isZoomed ? 1.06 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {hasVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              poster={project.image || undefined}
            >
              <source src={project.videoFile!} type="video/mp4" />
            </video>
          ) : hasImage ? (
            <Image
              src={project.image!}
              alt={project.name || "Project"}
              fill
              className={`object-cover transition-opacity duration-500 ${
                localImageLoaded ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index < 2} // Only prioritize first 2 images
              quality={100} // Reduced quality for faster loading
              loader={sanityImageLoader}
              onLoad={handleLocalImageLoad}
              loading={index < 4 ? "eager" : "lazy"}
            />
          ) : (
            <div className="w-full h-full bg-gray-900 flex items-center justify-center text-gray-400 text-md md:text-2xl font-medium">
              {project.name || "No media"}
            </div>
          )}
        </motion.div>
      )}

      {/* Name overlay with animation */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 md:p-8 bg-black/80 pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: showName ? 1 : 0,
          y: showName ? 0 : 20
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.p 
          className="text-sm md:text-2xl lg:text-xl font-extrabold text-white drop-shadow-lg"
          animate={{ y: showName ? 0 : 10 }}
          transition={{ duration: 0.5 }}
        >
          {project.name}
        </motion.p>
      </motion.div>

      {/* Optional: Add a subtle gradient overlay on hover */}
      <motion.div 
        className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}