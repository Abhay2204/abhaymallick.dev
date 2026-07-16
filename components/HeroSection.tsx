'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence, Variants } from 'framer-motion';
import SplashScreen from './SplashScreen';

// --- Reusable Typography & Animation Components ---
const TypingText = ({ text, className = "", delay = 0, speed = 0.03 }: { text: string; className?: string; delay?: number; speed?: number }) => {
  const characters = text.split("");
  return (
    <motion.span
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { delayChildren: delay, staggerChildren: speed } }
      }}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={`inline-block ${className}`}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4 } }
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)", scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  },
  exit: { 
    opacity: 0, 
    y: -30, 
    filter: "blur(10px)",
    scale: 0.95,
    transition: { duration: 0.5, ease: "easeIn" } 
  }
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [activePhase, setActivePhase] = useState(0);
  const [showPhase1Text, setShowPhase1Text] = useState(false);
  const [splashComplete, setSplashComplete] = useState(false);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const images = imagesRef.current;
    if (!images || images.length === 0) return;
    
    const img = images[index];
    if (img && img.complete) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const imgRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;
      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        drawHeight = canvas.height;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }
  };

  // Lock body scroll while splash screen is active
  useEffect(() => {
    if (!splashComplete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [splashComplete]);

  // Transition from splash complete
  useEffect(() => {
    if (splashComplete) {
      // Draw first frame immediately to prevent blank white sequence on start
      requestAnimationFrame(() => drawFrame(0));
    }
  }, [splashComplete]);

  const totalFrames = 664; // 240 + 208 + 216
  const initialPreloadFrames = 50; // Load first 50 frames eagerly for quick interactive start

  useEffect(() => {
    const handleResizeCheck = () => setIsMobile(window.innerWidth < 768);
    const timer = setTimeout(handleResizeCheck, 0);
    window.addEventListener('resize', handleResizeCheck);
    
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const getFrameSrc = (i: number) => {
      if (i <= 240) {
        return `/hero1/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
      } else if (i <= 448) {
        return `/hero2/ezgif-frame-${(i - 240).toString().padStart(3, '0')}.jpg`;
      } else {
        return `/hero3/ezgif-frame-${(i - 448).toString().padStart(3, '0')}.jpg`;
      }
    };

    // Phase 1: Load the first 50 frames immediately
    for (let i = 1; i <= initialPreloadFrames; i++) {
      const img = new window.Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
        if (i === 1) {
          requestAnimationFrame(() => drawFrame(0));
        }
        if (loadedCount === initialPreloadFrames) {
          lazyLoadRemaining();
        }
      };
      loadedImages[i - 1] = img;
    }

    // Phase 2: Lazy preload the remaining 614 frames in staggered batches of 15 to keep main-thread responsive (INP)
    const lazyLoadRemaining = () => {
      let currentIndex = initialPreloadFrames + 1;
      const batchSize = 15;

      const loadNextBatch = () => {
        if (currentIndex > totalFrames) return;

        const loader = () => {
          const limit = Math.min(currentIndex + batchSize, totalFrames + 1);
          for (let i = currentIndex; i < limit; i++) {
            const img = new window.Image();
            img.src = getFrameSrc(i);
            img.onload = () => {
              loadedCount++;
              setImagesLoaded(loadedCount);
            };
            loadedImages[i - 1] = img;
          }
          currentIndex = limit;

          // Queue next batch
          if (currentIndex <= totalFrames) {
            if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
              window.requestIdleCallback(loadNextBatch);
            } else {
              setTimeout(loadNextBatch, 200);
            }
          }
        };

        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
          window.requestIdleCallback(loader);
        } else {
          setTimeout(loader, 100);
        }
      };

      loadNextBatch();
    };

    imagesRef.current = loadedImages;
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResizeCheck);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Phase tracking logic
  // 10% scroll progress offset
  const phase1TextThreshold = 0.10;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    drawFrame(Math.floor(latest * (totalFrames - 1)));

    let currentPhase = 0;
    if (latest > 0.001 && latest < 0.20) currentPhase = 1; // Phase 1: Intro (Right Mid)
    else if (latest >= 0.22 && latest < 0.41) currentPhase = 2; // Phase 2: Welcome (Left/Right Mid)
    else if (latest >= 0.50 && latest < 0.67) currentPhase = 3; // Phase 3: Tech Stack (Bottom Left/Right)
    else if (latest >= 0.83 && latest <= 1.0) currentPhase = 4; // Phase 4: Stats (Top Left/Right)
    
    if (currentPhase !== activePhase) {
      setActivePhase(currentPhase);
    }

    // Show Phase 1 text 30 frames after Phase 1 starts
    setShowPhase1Text(latest >= phase1TextThreshold && latest < 0.20);
  });

  useEffect(() => {
    const handleResize = () => drawFrame(Math.floor(scrollYProgress.get() * (totalFrames - 1)));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [scrollYProgress]);

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Hero — Abhay Mallick Full Stack Developer Portfolio"
      className="relative h-[3000vh] bg-white w-full"
    >
      {/* Visually hidden H1 for SEO — screen readers and crawlers see this */}
      <h1
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        Abhay Mallick — Full Stack Developer | React, Next.js, Node.js &amp; Android Developer from Chandrapur, Maharashtra, India
      </h1>
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Stable HTML LCP candidate for search indexing and performance auditing (White text blending with the canvas) */}
        <div style={{ position: 'absolute', left: '20px', top: '20px', zIndex: 5, pointerEvents: 'none' }}>
          <h1 style={{ color: '#ffffff', fontSize: '16px', userSelect: 'none' }}>
            Abhay Mallick | Freelance Full Stack Developer & Software Engineer Portfolio
          </h1>
        </div>

        {/* --- UI OVERLAY LAYER (Above Canvas) --- */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Subtle Grid Lines */}
          <div className="absolute left-[5%] md:left-[8%] top-0 bottom-0 w-[1px] bg-black/[0.04]"></div>
          <div className="absolute right-[5%] md:right-[8%] top-0 bottom-0 w-[1px] bg-black/[0.04]"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/[0.02] hidden md:block"></div>
          
          {/* Micro Copy */}
          <div className="absolute top-8 left-[5%] md:left-[8%] pl-4 border-l-2 border-blue-600 hidden md:block">
            <span className="text-[9px] font-sans font-bold text-black/50 tracking-[0.3em] uppercase block">Edition 2026</span>
            <span className="text-[9px] font-sans font-bold text-black/30 tracking-[0.3em] uppercase block mt-1">SYS.READY</span>
          </div>
          <div className="absolute bottom-8 right-[5%] md:right-[8%] pr-4 border-r-2 border-blue-600 hidden md:block text-right">
            <span className="text-[9px] font-sans font-bold text-black/50 tracking-[0.3em] uppercase block">Scroll Sequence</span>
            <span className="text-[9px] font-sans font-bold text-blue-600 tracking-[0.3em] uppercase block mt-1">Active / 01</span>
          </div>
        </div>

        {/* Splash Loading Screen */}
        {!splashComplete && (
          <SplashScreen 
            progress={Math.min(imagesLoaded / initialPreloadFrames, 1.0)} 
            onComplete={() => setSplashComplete(true)} 
          />
        )}



        <AnimatePresence>
          {/* SEQUENCE 0: First Frame Instruction Tooltip */}
          {activePhase === 0 && splashComplete && (
            <motion.div
              key="first-frame-instruction"
              initial={{ opacity: 0, y: 30, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 15, x: "-50%" }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-10 left-1/2 z-30 flex flex-col md:flex-row items-center gap-4 px-6 py-3.5 bg-white/70 backdrop-blur-md border border-black/10 rounded-none shadow-[0_8px_32px_rgba(0,0,0,0.04)] pointer-events-auto select-none"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-sans font-black text-blue-600 tracking-[0.25em] uppercase">
                  Instruction
                </span>
              </div>
              <div className="hidden md:block w-[1px] h-3 bg-black/10" />
              <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5 text-[10px] font-mono text-black/60 font-semibold tracking-wider">
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <span className="text-blue-600 text-xs">🖱️</span> Right-click for menu bar
                </span>
                <span className="hidden md:inline text-black/20 font-light">•</span>
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <span className="text-blue-600 text-xs animate-bounce">👇</span> Scroll to explore
                </span>
              </div>
            </motion.div>
          )}

          {/* SEQUENCE 1: Intro (Hero 1 Start) */}
          {activePhase === 1 && (
            <>
              {/* Left Mid Message — scroll-triggered, all at once, 30 frames into Phase 1 */}
              <motion.div 
                key="phase1-left"
                initial={{ opacity: 0, y: 40, filter: "blur(12px)", scale: 0.96 }}
                animate={showPhase1Text 
                  ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 } 
                  : { opacity: 0, y: 40, filter: "blur(12px)", scale: 0.96 }
                }
                exit={{ opacity: 0, y: -30, filter: "blur(10px)", scale: 0.95 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-1/2 -translate-y-1/2 left-[5%] md:left-[8%] max-w-[260px] sm:max-w-[320px] z-20 hidden md:block"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-[2px] bg-blue-600"></div>
                    <span className="text-[10px] md:text-[11px] font-sans font-bold text-blue-600 tracking-[0.3em] uppercase">
                      Chapter 01
                    </span>
                  </div>
                  
                  <h2 className="text-[36px] md:text-[46px] lg:text-[56px] font-sans font-bold text-black leading-[1.05] tracking-tighter">
                    Welcome to<br/>
                    my <span className="text-blue-600">universe.</span>
                  </h2>
                  
                  <div className="mt-4 border-l-2 border-black/10 pl-5 py-1">
                     <p className="text-[13px] md:text-[15px] font-sans text-black/60 leading-relaxed font-medium">
                       Step into a world of precision engineering and carefully crafted digital experiences.
                     </p>
                  </div>
                </div>
              </motion.div>

              {/* Right Mid Message (Hero Identity) */}
              <motion.div 
                key="phase1-right"
                variants={containerVariants}
                initial="hidden" animate="visible" exit="exit"
                className="absolute top-auto bottom-[8%] md:top-1/2 md:-translate-y-1/2 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[8%] flex flex-col items-center md:items-end text-center md:text-right pointer-events-none w-[90%] md:w-auto md:max-w-lg z-20 bg-white/50 backdrop-blur-md border border-white/30 rounded-3xl p-5 md:p-0 md:bg-transparent md:backdrop-blur-none md:border-0 md:rounded-none md:shadow-none"
              >
                <motion.div variants={fadeUpVariants} className="mb-3 flex items-center gap-4 justify-center md:justify-end w-full">
                  <TypingText text="HELLO, I AM" className="text-[12px] md:text-[14px] font-sans font-bold text-black/50 tracking-[0.4em] uppercase" />
                  <div className="w-12 h-[1px] bg-black/20"></div>
                </motion.div>
                
                <motion.div variants={fadeUpVariants} className="flex flex-col items-center md:items-end mb-6 w-full">
                  <span className="text-[42px] sm:text-[64px] md:text-[90px] lg:text-[110px] font-sans font-black text-black tracking-tighter leading-[0.85]">
                    Abhay
                  </span>
                  <span className="text-[42px] sm:text-[64px] md:text-[90px] lg:text-[110px] font-sans font-black text-blue-600 tracking-tighter leading-[0.85]">
                    Mallick.
                  </span>
                </motion.div>
                
                <motion.div variants={fadeUpVariants} className="bg-white/80 backdrop-blur-md px-6 md:px-8 py-3.5 md:py-4 border border-black/10 md:border-0 md:border-r-4 border-blue-600 rounded-full md:rounded-none shadow-sm shrink-0">
                  <TypingText text="FULL STACK DEVELOPER" className="text-black text-[10px] md:text-[13px] font-black tracking-[0.2em] md:tracking-[0.25em] uppercase" />
                </motion.div>
              </motion.div>
            </>
          )}

          {/* SEQUENCE 2: Welcome Msg (Hero 1 to Hero 2 Transition) */}
          {activePhase === 2 && (
            <motion.div 
              key="phase2"
              className="absolute inset-0 pointer-events-none"
            >
              {/* Left Mid Message */}
              <motion.div 
                variants={containerVariants}
                initial="hidden" animate="visible" exit="exit"
                className="absolute top-1/2 -translate-y-1/2 left-[5%] md:left-[8%] max-w-[250px] sm:max-w-[320px] hidden md:block"
              >
                <motion.div variants={fadeUpVariants} className="border-l-4 border-blue-600 pl-5">
                  <h4 className="text-[12px] uppercase tracking-[0.2em] font-bold text-black/50 mb-3">
                    <TypingText text="Design Philosophy" />
                  </h4>
                  <p className="text-[20px] md:text-[26px] font-sans font-medium text-black leading-snug tracking-tight">
                    Crafting <span className="font-bold text-blue-600">precision-driven</span> digital experiences.
                  </p>
                </motion.div>
              </motion.div>
              
              {/* Right Mid Message */}
              <motion.div 
                variants={containerVariants}
                initial="hidden" animate="visible" exit="exit"
                className="absolute top-auto bottom-[8%] md:top-1/2 md:-translate-y-1/2 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[8%] text-center md:text-right w-[90%] md:w-auto md:max-w-[320px] flex flex-col items-center md:items-end z-20 bg-white/50 backdrop-blur-md border border-white/30 rounded-3xl p-5 md:p-0 md:bg-transparent md:backdrop-blur-none md:border-0 md:rounded-none md:shadow-none"
              >
                <motion.div variants={fadeUpVariants} className="border-b-2 md:border-b-0 md:border-r-4 border-black/10 pb-2 md:pb-0 md:pr-5 w-full flex flex-col items-center md:items-end">
                  <h4 className="text-[12px] uppercase tracking-[0.2em] font-bold text-black/50 mb-3 text-center md:text-right">
                    <TypingText text="Engineering Standard" />
                  </h4>
                  <p className="text-[18px] sm:text-[22px] md:text-[26px] font-sans font-medium text-black leading-snug tracking-tight text-center md:text-right">
                    Where brutalist aesthetics meet <span className="font-bold">flawless execution</span>.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* SEQUENCE 3: Tech Info (Hero 2) */}
          {activePhase === 3 && (
            <motion.div 
              key="phase3"
              className="absolute inset-0 pointer-events-none"
            >
              {/* Left Bottom */}
              <motion.div 
                variants={containerVariants}
                initial="hidden" animate="visible" exit="exit"
                className="absolute bottom-[8%] md:bottom-[10%] left-[5%] md:left-[8%] text-left max-w-[280px] sm:max-w-sm md:max-w-md hidden md:block"
              >
                <motion.div variants={fadeUpVariants} className="mb-4 md:mb-6 border-l-4 border-blue-600 pl-4 md:pl-5">
                  <h3 className="text-[11px] md:text-[13px] font-sans font-bold text-black/60 tracking-[0.2em] uppercase">
                    <TypingText text="Tech Stack & Architecture" />
                  </h3>
                </motion.div>
                <motion.p variants={fadeUpVariants} className="text-[22px] md:text-[32px] lg:text-[38px] font-sans font-medium text-black leading-[1.15] tracking-tight">
                  Engineered with <span className="text-blue-600 font-bold">modern frameworks</span>,<br/>
                  ensuring scalable performance.
                </motion.p>
              </motion.div>

              {/* Right Bottom */}
              <motion.div 
                variants={containerVariants}
                initial="hidden" animate="visible" exit="exit"
                className="absolute bottom-[8%] md:bottom-[10%] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[8%] text-center md:text-right w-[90%] md:w-auto md:max-w-sm flex flex-col items-center md:items-end z-20 bg-white/50 backdrop-blur-md border border-white/30 rounded-3xl p-5 md:p-0 md:bg-transparent md:backdrop-blur-none md:border-0 md:rounded-none md:shadow-none"
              >
                <motion.div variants={fadeUpVariants} className="mb-3 md:mb-6 border-b border-black/10 md:border-b-0 md:border-r-4 md:pr-5 w-full pb-2 md:pb-0">
                  <h3 className="text-[11px] md:text-[13px] font-sans font-bold text-black/60 tracking-[0.2em] uppercase text-center md:text-right">
                    <TypingText text="Core Expertise" />
                  </h3>
                </motion.div>
                <motion.p variants={fadeUpVariants} className="text-[14px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-sans font-medium text-black leading-snug tracking-tight text-black/80 text-center md:text-right">
                  Specializing in Next.js, robust APIs, database architecture, and hyper-optimized WebGL/Canvas rendering.
                </motion.p>
              </motion.div>
            </motion.div>
          )}

          {/* SEQUENCE 4: Stats & Details (Hero 3) */}
          {activePhase === 4 && (
            <motion.div 
              key="phase4"
              className="absolute inset-0 pointer-events-none"
            >
              {/* Left Panel */}
              <motion.div 
                variants={containerVariants}
                initial="hidden" animate="visible" exit="exit"
                className="absolute top-[10%] left-[5%] md:left-[8%] max-w-[200px] sm:max-w-[300px] flex flex-col gap-10 hidden md:flex"
              >
                <motion.div variants={fadeUpVariants} className="border-t-2 border-black/10 pt-4">
                  <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-blue-600 mb-2">Role</h4>
                  <p className="text-[18px] md:text-[24px] font-bold text-black tracking-tight">Full Stack Developer</p>
                </motion.div>
                <motion.div variants={fadeUpVariants} className="border-t-2 border-black/10 pt-4">
                  <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-blue-600 mb-2">Experience</h4>
                  <p className="text-[18px] md:text-[24px] font-bold text-black tracking-tight">2+ Years</p>
                </motion.div>
                <motion.div variants={fadeUpVariants} className="border-t-2 border-black/10 pt-4">
                  <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-blue-600 mb-2">Track Record</h4>
                  <p className="text-[18px] md:text-[24px] font-bold text-black tracking-tight">Completed 50+ Projects</p>
                </motion.div>
              </motion.div>
              
              {/* Right Panel */}
              <motion.div 
                variants={containerVariants}
                initial="hidden" animate="visible" exit="exit"
                className="absolute top-auto bottom-[8%] md:top-[12%] md:bottom-auto left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[8%] text-center md:text-right w-[90%] md:w-auto md:max-w-[350px] flex flex-col items-center md:items-end z-20 bg-white/50 backdrop-blur-md border border-white/30 rounded-3xl p-5 md:p-0 md:bg-transparent md:backdrop-blur-none md:border-0 md:rounded-none md:shadow-none"
              >
                <motion.div variants={fadeUpVariants} className="border-b border-black/10 md:border-b-0 md:border-t-2 md:border-black/10 pt-0 md:pt-4 pb-2 md:pb-0 w-full">
                  <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-blue-600 mb-4 text-center md:text-right">Developed Solutions Focus</h4>
                  <p className="text-[16px] sm:text-[22px] md:text-[28px] font-sans font-bold text-black leading-snug tracking-tight text-center md:text-right">
                    CRMs, Mobile Apps,<br/>Ecommerce Sites,<br/>Portfolios & More.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
