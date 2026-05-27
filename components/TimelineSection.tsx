'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const EXP1_FRAMES = 168;
const EXP2_FRAMES = 184;
const TOTAL_FRAMES = EXP1_FRAMES + EXP2_FRAMES;

export default function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Scroll logic
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map scroll progress to frame index
  const frameIndex = useTransform(smoothProgress, [0, 1], [1, TOTAL_FRAMES]);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const preload = () => {
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        let folder = 'exp1';
        let frameNum = i;

        if (i > EXP1_FRAMES) {
          folder = 'exp2';
          frameNum = i - EXP1_FRAMES;
        }

        const formattedNum = String(frameNum).padStart(3, '0');
        img.src = `/` + folder + `/ezgif-frame-` + formattedNum + `.jpg`;
        
        img.onload = () => {
          loadedCount++;
          if (loadedCount === TOTAL_FRAMES) {
            setIsLoading(false);
          }
        };
        loadedImages[i] = img;
      }
      setImages(loadedImages);
    };

    preload();
  }, []);

  // Draw to canvas
  useEffect(() => {
    const render = () => {
      const idx = Math.floor(frameIndex.get());
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      const img = images[idx];

      if (ctx && canvas && img && img.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
      requestAnimationFrame(render);
    };

    if (!isLoading) {
      const animId = requestAnimationFrame(render);
      return () => cancelAnimationFrame(animId);
    }
  }, [images, isLoading, frameIndex]);

  return (
    <section 
      ref={sectionRef}
      id="experience"
      className="relative w-full bg-[#FAFAFA]" 
      style={{ height: '400vh' }}
      aria-label="Work Experience of Abhay Mallick"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] z-0"
        style={{ 
          backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", 
          backgroundSize: "32px 32px" 
        }}
      />

      {/* Sticky Header */}
      <div className="sticky top-0 z-50 pt-8 pb-6 bg-[#FAFAFA]/80 backdrop-blur-lg border-b border-black/5">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="flex items-center gap-6">
            <div className="text-sm font-bold tracking-widest uppercase text-blue-600 flex items-center gap-4">
              <span>04</span>
              <div className="w-8 h-[2px] bg-blue-600" />
              <span>Work Experience</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-3xl md:text-4xl font-black tracking-tighter text-blue-600">2+</span>
            <span className="text-xs uppercase tracking-widest text-black/30 font-bold">Years</span>
          </div>
        </div>
      </div>

      {/* Main Content: Laptop Panel */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-6xl px-4 md:px-8">
          
          {/* Laptop Mockup */}
          <div className="relative mx-auto w-full group">
            {/* Screen Bezel */}
            <div className="relative bg-[#0a0a0a] rounded-[2rem] md:rounded-[3rem] p-3 md:p-4 shadow-[0_50px_100px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.05)] border-t border-white/10">
              
              {/* Camera Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#0a0a0a] rounded-b-xl z-20 hidden md:block" />

              {/* Screen Content */}
              <div className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden bg-black">
                {isLoading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black">
                    <div className="w-12 h-12 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Initializing Experience...</span>
                  </div>
                ) : (
                  <canvas 
                    ref={canvasRef}
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover"
                  />
                )}
                
                {/* Reflection/Glow Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-50" />
              </div>
            </div>

            {/* Laptop Base (Minimalist) */}
            <div className="relative -mt-2 h-4 w-[90%] mx-auto bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-b-3xl shadow-xl border-t border-white/5" />
            <div className="relative -mt-1 h-2 w-[30%] mx-auto bg-black/40 rounded-full blur-sm" />

            {/* Float Effect */}
            <motion.div 
              className="absolute -inset-10 bg-blue-600/5 blur-[100px] -z-10 rounded-full"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/20">Scroll to Explore Flow</span>
            <div className="w-[1px] h-12 bg-black/10 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 w-full bg-blue-600"
                animate={{ top: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                style={{ height: '50%' }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
