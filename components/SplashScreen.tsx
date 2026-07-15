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
      const timer = setTimeout(() => {
        setIsRevealing(true);
        // Wait for the curtain animation to finish (stagger total ~1.5s) before unmounting
        setTimeout(() => {
          onComplete();
        }, 1600);
      }, 0);
      return () => clearTimeout(timer);
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
          
          {/* Top Row: System Info (pr-36 on mobile to avoid overlapping the switch button) */}
          <div className="flex justify-between items-start text-black/40 text-[10px] font-bold tracking-widest uppercase pr-36 md:pr-0 w-full z-40">
            <span>SYS.BOOT SEQUENCE</span>
            <span>EDITION_2026</span>
          </div>

          {/* Chatbot Teaser (Right Middle) - Hidden on mobile to avoid covering ear/hair */}
          <div className="absolute right-6 md:right-12 lg:right-20 top-1/2 -translate-y-1/2 flex flex-col items-center text-center gap-3 z-40 hidden md:flex">
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

          {/* Bottom Row: Content (Soft glass backdrop on mobile for readability, compressed & pushed down) */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-3 md:gap-12 w-full mt-auto mb-2 md:mb-12 bg-white/45 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 md:p-0 md:bg-transparent md:backdrop-blur-none md:border-0 md:shadow-none z-40">
            
            {/* Left Side: Loading & Messages */}
            <div className="flex flex-col gap-2 md:gap-6 w-full md:w-1/2">
              <div className="flex flex-row items-center justify-between md:justify-start gap-4 md:gap-6 w-full">
                <span className="text-4xl md:text-8xl font-black text-[#111] tracking-tighter leading-none shrink-0">
                  {Math.round(progress * 100)}<span className="text-xl md:text-5xl text-blue-600">%</span>
                </span>
                
                <div className="flex flex-col justify-center gap-1 mt-0 w-full max-w-[130px] sm:max-w-[200px] shrink-0">
                  <span className="text-black/40 text-[8px] md:text-[10px] font-bold uppercase tracking-widest leading-none">System Status</span>
                  <div className="w-full h-[3px] bg-black/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-blue-600"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="h-6 md:h-8 relative overflow-hidden mt-1">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={messageIndex}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-[#111] text-[9px] md:text-sm font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase"
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
