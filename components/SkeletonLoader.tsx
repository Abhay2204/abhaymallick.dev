'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function SkeletonLoader() {
  return (
    <div className="absolute inset-0 z-40 bg-white flex flex-col justify-between overflow-hidden">
      {/* CSS custom shimmer styles */}
      <style jsx global>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .laser-line {
          animation: scan 3s linear infinite;
        }
        .shimmer-block {
          background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 37%, #f3f4f6 63%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
      `}</style>

      {/* Grid Overlay to match Hero Section */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute left-[5%] md:left-[8%] top-0 bottom-0 w-[1px] bg-black/[0.04]" />
        <div className="absolute right-[5%] md:right-[8%] top-0 bottom-0 w-[1px] bg-black/[0.04]" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/[0.02] hidden md:block" />
      </div>

      {/* Scanning laser line representing viewport buffering */}
      <div className="absolute left-[5%] md:left-[8%] right-[5%] md:right-[8%] h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-blue-500/0 laser-line z-20" />

      {/* Header Skeleton Block */}
      <div className="pt-8 px-[5%] md:px-[8%] flex justify-between items-start w-full select-none">
        <div className="pl-4 flex flex-col gap-1.5 border-l-2 border-blue-500/30">
          <div className="w-16 h-3 shimmer-block rounded" />
          <div className="w-20 h-2.5 bg-gray-200/60 rounded" />
        </div>
        <div className="pr-4 flex flex-col items-end gap-1.5 border-r-2 border-blue-500/30">
          <div className="w-24 h-3 shimmer-block rounded" />
          <div className="w-14 h-2.5 bg-gray-200/60 rounded" />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex-1 flex items-center justify-between px-[5%] md:px-[8%] py-12 relative w-full h-full">
        {/* Left Side: Mock Text Layout */}
        <div className="w-[320px] md:w-[400px] flex flex-col gap-6 pl-4 z-20">
          {/* Chapter badge skeleton */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-[2px] bg-blue-500/30" />
            <div className="w-16 h-3.5 bg-gray-200 rounded" />
          </div>

          {/* Heading skeleton */}
          <div className="flex flex-col gap-3">
            <div className="w-[85%] h-12 shimmer-block rounded-lg" />
            <div className="w-[60%] h-12 shimmer-block rounded-lg" />
          </div>

          {/* Body description skeleton */}
          <div className="flex flex-col gap-2 mt-4">
            <div className="w-[95%] h-3 bg-gray-200/80 rounded" />
            <div className="w-[90%] h-3 bg-gray-200/80 rounded" />
            <div className="w-[75%] h-3 bg-gray-200/80 rounded" />
          </div>
        </div>

        {/* Center/Right Side: Futuristic 3D Canvas Wireframe Loader */}
        <div className="absolute md:relative right-[5%] md:right-0 top-1/2 -translate-y-1/2 md:translate-y-0 w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full border border-black/[0.03] flex items-center justify-center pointer-events-none z-0">
          {/* Outer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute w-[95%] h-[95%] rounded-full border border-dashed border-black/[0.04]"
          />
          {/* Inner Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute w-[70%] h-[70%] rounded-full border border-dashed border-blue-500/[0.08]"
          />
          {/* Scanning Reticle */}
          <div className="w-3 h-3 bg-blue-500/20 rounded-full animate-ping" />
        </div>
      </div>

      {/* Bottom Info Bar Skeleton */}
      <div className="pb-8 px-[5%] md:px-[8%] flex justify-between items-end w-full select-none">
        <div className="pl-4 flex flex-col gap-1.5">
          <div className="w-12 h-2.5 bg-gray-200 rounded" />
          <div className="w-24 h-3 bg-gray-200 rounded" />
        </div>
        
        {/* Futuristic Status Badge */}
        <div className="pr-4 flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-full backdrop-blur-md">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-[9px] font-sans font-bold text-gray-400 tracking-widest uppercase">
            CALIBRATING DEVICE FRAMES
          </span>
        </div>
      </div>
    </div>
  );
}
