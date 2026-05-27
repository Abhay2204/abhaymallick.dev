'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';

const galleryItems = [
  { id: 'v1', type: 'video' as const, src: '/gallary/beautiful ui 1.mp4', title: 'Motion Study I', year: '2024', href: null },
  { id: 'v2', type: 'video' as const, src: '/gallary/beautiful ui2.mp4', title: 'Motion Study II', year: '2024', href: null },
  { id: 'p1', type: 'yt' as const, ytId: 'ELFXqa3f39k', title: 'Nike x Motorsport', year: '2024', href: 'https://nikexmototsport.vercel.app/' },
  { id: 'p2', type: 'yt' as const, ytId: 'ocmy-UtrVUA', title: 'Horizon XR', year: '2024', href: 'https://horizon-xr.vercel.app/' },
  { id: 'p3', type: 'yt' as const, ytId: 'LYjg3dmH99c', title: 'Drone UIUX', year: '2024', href: 'https://drone-uiux.vercel.app/' },
  { id: 'p4', type: 'yt' as const, ytId: 'sMhU-C2V4c0', title: 'Legacy Construction', year: '2024', href: null },
  { id: 'p5', type: 'yt' as const, ytId: 'j1jYFcBvd5c', title: 'Air Jordan', year: '2024', href: 'https://air-jordan-plum.vercel.app/' },
  { id: 'p6', type: 'yt' as const, ytId: 'r9T0iu_7aF0', title: 'Lumina Botanical', year: '2023', href: 'https://lumina-botanical.vercel.app/' },
  { id: 'p7', type: 'yt' as const, ytId: 'Sc-MOqQGFB4', title: 'Inferno I300', year: '2023', href: 'https://inferno-i-300.vercel.app/' },
  { id: 'p8', type: 'yt' as const, ytId: 'rgVRF1TW1E8', title: 'Tiyara', year: '2023', href: 'https://tiyara-shopify.vercel.app/' },
  { id: 'p9', type: 'yt' as const, ytId: 'xI2ZG-bQggE', title: 'Jesko Absolute', year: '2023', href: 'https://jesko-absolute.vercel.app/' },
  { id: 'p10', type: 'yt' as const, ytId: 'TBmxkSvRJfA', title: 'Nirvana', year: '2023', href: 'https://nirvana-timeless-luxury.vercel.app/' },
  { id: 'p11', type: 'yt' as const, ytId: 'mxZt6kVx9jM', title: 'Atelier', year: '2023', href: 'https://atelier-premium-geans.vercel.app/' },
  { id: 'p12', type: 'yt' as const, ytId: 'tI-6n6nV5wA', title: 'Air Walk', year: '2023', href: 'https://airwalk-shopify.vercel.app/' },
  { id: 'p13', type: 'yt' as const, ytId: 'U3MgiImMnds', title: 'Vantage Arch.', year: '2023', href: 'https://vantage-architectural-excellence.vercel.app/' },
  { id: 'p14', type: 'yt' as const, ytId: 'c6ne47PqqDg', title: 'Neon Suture', year: '2023', href: 'https://neon-suture.vercel.app/' },
];

// ============================================
// 3D CARD
// ============================================

function Card3D({ item, index }: { item: typeof galleryItems[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    cardRef.current.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)`;
    }
  };

  const thumbUrl = item.type === 'yt' ? `https://img.youtube.com/vi/${item.ytId}/maxresdefault.jpg` : null;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden rounded-xl md:rounded-2xl bg-white border border-black/10 shadow-[0_8px_40px_rgba(0,0,0,0.08)] group cursor-default"
      style={{
        aspectRatio: '16/10',
        transition: 'transform 0.2s ease-out, box-shadow 0.3s ease',
        boxShadow: hovered
          ? '0 20px 60px rgba(0,0,0,0.15), 0 4px 20px rgba(37,99,235,0.1)'
          : '0 8px 40px rgba(0,0,0,0.08)',
      }}
    >
      {/* ---- LOCAL VIDEO ---- */}
      {item.type === 'video' && (
        <video
          src={item.src}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* ---- YOUTUBE ---- */}
      {item.type === 'yt' && (
        <>
          {!hovered && (
            <div className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumbUrl!} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  <Play className="w-6 h-6 text-[#111] fill-[#111] ml-1" />
                </div>
              </div>
            </div>
          )}
          {hovered && (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${item.ytId}?autoplay=1&mute=1&loop=1&playlist=${item.ytId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3`}
              allow="autoplay; encrypted-media"
              style={{ pointerEvents: 'none' }}
            />
          )}
        </>
      )}

      {/* ---- BOTTOM INFO BAR ---- */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1">
              {String(index + 1).padStart(2, '0')} · {item.year}
            </span>
            <h3 className="text-lg md:text-2xl font-bold text-white tracking-tight leading-tight">{item.title}</h3>
          </div>
          {item.href && (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-colors duration-200 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
            >
              Live <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN
// ============================================

export default function UiUxGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);

  // Measure actual track overflow on mount/resize
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        const trackW = trackRef.current.scrollWidth;
        const viewportW = window.innerWidth;
        setMaxScroll(Math.max(0, trackW - viewportW));
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Progress bar for both the top of the section and the central glowing line
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);
  const smoothX = useSpring(x, { stiffness: 60, damping: 28, mass: 1 });

  // More scroll height = slower, more controlled scrolling
  const scrollHeight = galleryItems.length * 140;

  return (
    <section
      ref={containerRef}
      className="relative bg-[#FAFAFA]"
      style={{ height: `${scrollHeight}vh` }}
    >
      {/* Background grid — same as entire site */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }}
      />

      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">

        {/* Top Header Bar */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 pt-8 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-sm font-bold tracking-widest uppercase text-blue-600 flex items-center gap-4 mb-4">
              <span>07</span>
              <div className="w-8 h-[2px] bg-blue-600" />
              <span>UI/UX Gallery</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none text-[#111]">
              Selected <span className="text-blue-600">Works</span>
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://design-by-abhay.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-black/15 rounded-full text-xs font-bold uppercase tracking-widest text-black/50 hover:bg-[#111] hover:text-white hover:border-[#111] transition-all duration-300"
            >
              Full Archive <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <span className="text-xs font-mono text-black/25">
              {galleryItems.length} works
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-[1px] bg-black/10 relative z-20">
          <motion.div className="h-full bg-blue-600" style={{ width: progressWidth }} />
        </div>

        {/* 3D Horizontal Scroll Track with 2-Row Layout */}
        <div
          className="flex-1 relative flex items-center overflow-hidden"
          style={{ perspective: '1200px' }}
        >
          {/* Viewport-fixed background dim line */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-black/5 -translate-y-1/2 z-0 pointer-events-none" />
          
          {/* Viewport-fixed glowing progress line */}
          <motion.div 
            className="absolute top-1/2 left-0 h-[2px] bg-blue-500 shadow-[0_0_15px_#3b82f6] -translate-y-1/2 z-10 origin-left pointer-events-none"
            style={{ width: progressWidth }}
          />

          <motion.div
            ref={trackRef}
            style={{ x: smoothX }}
            className="relative flex items-center h-full px-4 sm:px-8 md:px-24 w-max"
          >
            <div className="flex gap-4 sm:gap-6 md:gap-10 lg:gap-12 relative z-20 h-full">
              {galleryItems.map((item, i) => {
                const isTop = i % 2 === 0;
                
                return (
                  <div key={item.id} className="relative w-[55vw] sm:w-[42vw] md:w-[35vw] lg:w-[30vw] xl:w-[26vw] 2xl:w-[22vw] shrink-0 h-full">
                    {/* Card Container — positioned as top 42% or bottom 42% of available height */}
                    <div 
                      className="absolute w-full"
                      style={{
                        ...(isTop
                          ? { bottom: 'calc(50% + 1rem)', maxHeight: '42%' }
                          : { top: 'calc(50% + 1rem)', maxHeight: '42%' }),
                      }}
                    >
                      <Card3D item={item} index={i} />
                    </div>
                    
                    {/* Vertical Connector Line */}
                    <div className={`absolute left-1/2 w-[2px] bg-blue-500 shadow-[0_0_10px_#3b82f6] -translate-x-1/2 ${
                      isTop ? 'bottom-[50%] h-[1rem]' : 'top-[50%] h-[1rem]'
                    }`} />

                    {/* Glowing dot on the main line */}
                    <div className="absolute top-1/2 left-1/2 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-white shadow-[0_0_10px_#fff,0_0_20px_#3b82f6] -translate-x-1/2 -translate-y-1/2" />
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom strip */}
        <div className="relative z-20 w-full border-t border-black/10 py-4 px-4 md:px-12 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-black/25">
            Scroll to explore →
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-black/25">
            © {new Date().getFullYear()} Abhay Mallick
          </span>
        </div>

      </div>
    </section>
  );
}
