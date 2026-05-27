'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface SplashScreenProps {
  progress: number; // 0 to 1
  onComplete: () => void;
}

const loadingMessages = [
  "INITIALIZING SYS.READY ENVIRONMENT",
  "LOADING HIGH-FIDELITY ASSETS",
  "PREPARING DIGITAL EXPERIENCE",
  "ESTABLISHING SECURE CONNECTION"
];

export default function SplashScreen({ progress, onComplete }: SplashScreenProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  // Cycle messages every 2 seconds
  useEffect(() => {
    if (isRevealing) return;
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isRevealing]);

  // Ensure minimum display time (e.g., 6 seconds) so user can see the intro
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  // Trigger reveal when progress is 100% AND minimum time has elapsed
  useEffect(() => {
    if (progress >= 1 && minTimeElapsed && !isRevealing) {
      setIsRevealing(true);
      // Wait for the curtain animation to finish (stagger total ~1.5s) before unmounting
      setTimeout(() => {
        onComplete();
      }, 1600);
    }
  }, [progress, minTimeElapsed, isRevealing, onComplete]);

  // The 6 layers for the curtain
  const layers = Array.from({ length: 6 });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      
      {/* 6-Layer Curtain (Reveals the background by sliding up) */}
      <div className="absolute inset-0 flex w-full h-full z-20 pointer-events-none">
        {layers.map((_, i) => (
          <motion.div
            key={i}
            className="h-full bg-[#111] border-r border-white/5 last:border-r-0"
            style={{ width: `${100 / 6}%`, transformOrigin: "top" }}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: isRevealing ? 0 : 1 }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1], // Custom cinematic easing
              delay: isRevealing ? i * 0.1 : 0
            }}
          />
        ))}
      </div>

      {/* Main Splash Content (Fades out when reveal starts) */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-30"
        initial={{ opacity: 1 }}
        animate={{ opacity: isRevealing ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Full Background Profile Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image 
            src="/profile.jpg" 
            alt="Abhay Mallick" 
            fill 
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Top-level grid container */}
        <div className="relative w-full h-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-12 flex flex-col justify-between">
          
          {/* Top Row: System Info */}
          <div className="flex justify-between items-start text-black/40 text-[10px] font-bold tracking-widest uppercase">
            <span>SYS.BOOT SEQUENCE</span>
            <span>EDITION_2026</span>
          </div>

          {/* Chatbot Teaser (Right Middle) */}
          <div className="absolute right-6 md:right-12 lg:right-20 top-1/2 -translate-y-1/2 flex flex-col items-center text-center gap-3 z-40">
            <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border border-black/10 bg-white/10 backdrop-blur-md shadow-xl flex items-center justify-center">
              <Image 
                src="/chatbot.gif" 
                alt="AI Chatbot" 
                fill 
                className="object-cover scale-[1.3]"
                unoptimized
              />
            </div>
            <p className="text-[#111] bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-sm">
              Engage AI Assistant
            </p>
          </div>

          {/* Bottom Row: Content */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 w-full mt-auto mb-12">
            
            {/* Left Side: Loading & Messages */}
            <div className="flex flex-col gap-6 w-full md:w-1/2">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                <span className="text-6xl md:text-8xl font-black text-[#111] tracking-tighter leading-none">
                  {Math.round(progress * 100)}<span className="text-3xl md:text-5xl text-blue-600">%</span>
                </span>
                
                <div className="flex flex-col justify-center gap-2 mt-2 md:mt-0 w-full max-w-[200px]">
                  <span className="text-black/40 text-[10px] font-bold uppercase tracking-widest">System Status</span>
                  <div className="w-full h-[3px] bg-black/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-blue-600"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="h-8 relative overflow-hidden mt-2">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={messageIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-[#111] text-xs md:text-sm font-bold tracking-[0.2em] uppercase"
                  >
                    {loadingMessages[messageIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
