// app/components/ProjectCards.tsx
"use client";

import { poppins } from "@/public/assets/css/font";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface Project {
    _key: string;
    name: string;
    videoFile?: string;
    image?: string;
    videoUrl?: string;
    // ... other fields if needed
}

export default function ProjectCards({ items }: { items: Project[] }) {
    return (
        <>
            {items.map((project, index) => (
                <ProjectCard key={project._key || index} project={project} index={index} />
            ))}
        </>
    );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const [showName, setShowName] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const clickCount = useRef(0);

    const hasVideo = !!project.videoFile;
    const hasImage = !!project.image;
    const hasLink = !!project.videoUrl;

    const bgStyle =
        index % 2 === 0
            ? "bg-gradient-to-b from-[#f5e8d3] to-[#d2b48c]"
            : "bg-[#a3c537]";

    const handlePointerDown = () => {
        clickCount.current += 1;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            if (clickCount.current === 1) {
                // Single tap → toggle name + zoom pulse
                setShowName((prev) => !prev);
                setIsZoomed(true);
                setTimeout(() => setIsZoomed(false), 600);
            }
            clickCount.current = 0;
        }, 320); // 320ms is a good balance for single vs double tap
    };

    const handleDoubleClick = () => {
        if (hasLink) {
            window.open(project.videoUrl, "_blank", "noopener,noreferrer");
        }
    };

    // Desktop hover behavior
    const handleMouseEnter = () => {
        setShowName(true);
        setIsZoomed(true);
    };

    const handleMouseLeave = () => {
        setShowName(false);
        setIsZoomed(false);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div
            className={`group relative aspect-square bg-red-700! rounded-xl md:rounded-2xl overflow-hidden shadow-2xl ${bgStyle} cursor-pointer select-none touch-manipulation`}
            onPointerDown={handlePointerDown}
            onDoubleClick={handleDoubleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Media container with zoom */}
            <div
                className={`absolute inset-0 transition-transform duration-500 ease-out ${isZoomed ? "scale-[1.06]" : "scale-100"
                    } group-hover:scale-[1.06]`}
            >
                {hasVideo ? (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        src={project.videoFile}
                    >
                        <source src={project.videoFile} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : hasImage ? (
                    <Image
                        src={project.image!}
                        alt={project.name || "Project"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                        priority={index < 4}
                        quality={85}
                    />
                ) : (
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center text-gray-400 text-md md:text-2xl font-medium">
                        {project.name || "No media"}
                    </div>
                )}
            </div>

            {/* Name overlay */}
            <div
                className={`absolute bottom-0 left-0 right-0 p-3 sm:p-6 md:p-8 bg-black/80 pointer-events-none transition-all duration-400
                    ${showName ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0"
                    }`}
            >
                <p className={`${poppins.className} text-sm md:text-2xl  lg:text-xl font-semibold text-white drop-shadow-lg translate-y-1 group-hover:translate-y-0 transition-transform duration-500 ease-out`}>
                    {project.name}
                </p>
            </div>
        </div>
    );
}