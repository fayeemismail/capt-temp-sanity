// app/components/ProjectSectionSkeleton.tsx
"use client";

import { motion } from "framer-motion";

export default function ProjectSectionSkeleton() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-7 w-full max-w-7xl mx-auto">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-gray-800 animate-pulse"
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-gray-700 border-t-gray-400 rounded-full animate-spin" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}