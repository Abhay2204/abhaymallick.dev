'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, X } from 'lucide-react';

const galleryItems = [
  {
    id: 'v1',
    type: 'video' as const,
    src: '/gallary/beautiful ui 1.mp4',
    title: 'Motion Study I',
    year: '2024',
    href: null,
    category: 'Motion Design',
    description: 'A high-fidelity motion study exploring liquid fluid micro-interactions, spring physics, and organic gestures for touch interfaces. Designed to push the boundaries of standard tactile feedback in mobile designs.',
    tools: ['After Effects', 'Figma', 'Lottie', 'Spring Physics']
  },
  {
    id: 'v2',
    type: 'video' as const,
    src: '/gallary/beautiful ui2.mp4',
    title: 'Motion Study II',
    year: '2024',
    href: null,
    category: 'Spatial UIUX',
    description: 'An immersive spatial computing navigation prototype featuring depth layers, glassmorphism shadows, and volumetric hover states engineered for augmented and mixed reality dashboards.',
    tools: ['Spline 3D', 'Figma', 'Bevel Mapping', 'Framer Motion']
  },
  {
    id: 'p1',
    type: 'yt' as const,
    ytId: 'ELFXqa3f39k',
    title: 'Nike x Motorsport',
    year: '2024',
    href: 'https://nikexmototsport.vercel.app/',
    category: 'Interactive E-Commerce',
    description: 'A high-octane visual concept store combining aggressive motorsport design systems with Nike\'s signature athletic heritage. Features complex parallax layers, custom-drawn vector pathways, and fluid 3D carousel transitions.',
    tools: ['Next.js', 'Framer Motion', 'TailwindCSS', 'GSAP']
  },
  {
    id: 'p2',
    type: 'yt' as const,
    ytId: 'ocmy-UtrVUA',
    title: 'Horizon XR',
    year: '2024',
    href: 'https://horizon-xr.vercel.app/',
    category: 'Spatial Design',
    description: 'Next-generation spatial interface concept for mixed-reality headsets. Bridging physical gestures with digital layouts using clean grids, holographic typography, and reactive glow maps.',
    tools: ['React', 'Three.js', 'React Three Fiber', 'Tailwind']
  },
  {
    id: 'p3',
    type: 'yt' as const,
    ytId: 'LYjg3dmH99c',
    title: 'Drone UIUX',
    year: '2024',
    href: 'https://drone-uiux.vercel.app/',
    category: 'Telemetry Interface',
    description: 'A telemetry dashboard interface for commercial drones. Built with real-time HUD elements, vector gauges, vector tracking maps, and ultra-low latency response feeds.',
    tools: ['Vue.js', 'D3.js', 'WebSockets', 'Canvas API']
  },
  {
    id: 'p4',
    type: 'yt' as const,
    ytId: 'sMhU-C2V4c0',
    title: 'Legacy Construction',
    year: '2024',
    href: null,
    category: 'Brutalist Editorial',
    description: 'Premium architectural portfolio showcasing construction landmarks. Engineered with monolithic grids, heavy editorial typography, and brutalist split-screen image reveals.',
    tools: ['HTML5', 'Vanilla CSS', 'Locomotive Scroll', 'Figma']
  },
  {
    id: 'p5',
    type: 'yt' as const,
    ytId: 'j1jYFcBvd5c',
    title: 'Air Jordan',
    year: '2024',
    href: 'https://air-jordan-plum.vercel.app/',
    category: 'Immersive Product Design',
    description: 'A legendary digital showcase for the iconic Air Jordan series. Highlights interactive shoe exploration, custom colorway editors, dynamic lighting models, and typography that commands attention.',
    tools: ['Next.js', 'Spline', 'Framer Motion', 'TailwindCSS']
  },
  {
    id: 'p6',
    type: 'yt' as const,
    ytId: 'r9T0iu_7aF0',
    title: 'Lumina Botanical',
    year: '2023',
    href: 'https://lumina-botanical.vercel.app/',
    category: 'Clean Editorial E-Com',
    description: 'An e-commerce experience for rare houseplants. Merging clean botanical art with high-end editorial styling, featuring seamless cart drawers and immersive filter arrays.',
    tools: ['React', 'Next.js', 'Supabase', 'Figma']
  },
  {
    id: 'p7',
    type: 'yt' as const,
    ytId: 'Sc-MOqQGFB4',
    title: 'Inferno I300',
    year: '2023',
    href: 'https://inferno-i-300.vercel.app/',
    category: 'Automotive Configurator',
    description: 'Supercar configurator dashboard for the Inferno I300 hypercar. Dynamic engine specification displays, high-contrast digital speedometers, and responsive telemetry charts.',
    tools: ['React', 'Framer Motion', 'Canvas', 'TailwindCSS']
  },
  {
    id: 'p8',
    type: 'yt' as const,
    ytId: 'rgVRF1TW1E8',
    title: 'Tiyara',
    year: '2023',
    href: 'https://tiyara-shopify.vercel.app/',
    category: 'Luxury E-Commerce',
    description: 'Bespoke luxury jewelry marketplace. Built around high-resolution imagery, subtle gold accents, sophisticated serif typography, and a checkout experience engineered for high-ticket items.',
    tools: ['Shopify API', 'React', 'TailwindCSS', 'GraphQL']
  },
  {
    id: 'p9',
    type: 'yt' as const,
    ytId: 'xI2ZG-bQggE',
    title: 'Jesko Absolute',
    year: '2023',
    href: 'https://jesko-absolute.vercel.app/',
    category: 'High-Velocity Design',
    description: 'An absolute visual tribute to Koenigsegg\'s Jesko. Features high-velocity scroll animations, aerodynamic soundscapes, interactive wind-tunnel simulations, and reactive engine rev metrics.',
    tools: ['Next.js', 'GSAP ScrollTrigger', 'Web Audio API']
  },
  {
    id: 'p10',
    type: 'yt' as const,
    ytId: 'TBmxkSvRJfA',
    title: 'Nirvana',
    year: '2023',
    href: 'https://nirvana-timeless-luxury.vercel.app/',
    category: 'Horology Showcase',
    description: 'A luxury watch e-commerce experience. Incorporating precision timepiece components, mechanical movements, interactive bezel rotation, and rich editorial design storytelling.',
    tools: ['Next.js', 'Framer Motion', 'Figma', 'Spline']
  },
  {
    id: 'p11',
    type: 'yt' as const,
    ytId: 'mxZt6kVx9jM',
    title: 'Atelier',
    year: '2023',
    href: 'https://atelier-premium-geans.vercel.app/',
    category: 'Slow Fashion Editorial',
    description: 'Premium denim craftsmanship shop. Focused on slow-fashion storytelling, fabric weave zoom-ins, production line tracing, and a minimal tactile purchase flow.',
    tools: ['React', 'Figma', 'CSS Modules', 'Lenis Scroll']
  },
  {
    id: 'p12',
    type: 'yt' as const,
    ytId: 'tI-6n6nV5wA',
    title: 'Air Walk',
    year: '2023',
    href: 'https://airwalk-shopify.vercel.app/',
    category: 'Active Lifestyle Shop',
    description: 'A street fashion shoe retail store concept. Featuring responsive grids, vibrant energetic colors, dynamic shoe previews, and intuitive checkout layout systems.',
    tools: ['React', 'TailwindCSS', 'Framer Motion', 'Figma']
  },
  {
    id: 'p13',
    type: 'yt' as const,
    ytId: 'U3MgiImMnds',
    title: 'Vantage Arch.',
    year: '2023',
    href: 'https://vantage-architectural-excellence.vercel.app/',
    category: 'Architectural Blueprint',
    description: 'Architectural excellence portal. Showcasing minimalist design philosophies, structural geometry visualizations, and seamless transitions between blueprint layers.',
    tools: ['HTML5', 'TailwindCSS', 'GSAP', 'Figma']
  },
  {
    id: 'p14',
    type: 'yt' as const,
    ytId: 'c6ne47PqqDg',
    title: 'Neon Suture',
    year: '2023',
    href: 'https://neon-suture.vercel.app/',
    category: 'Cyberpunk Apparel',
    description: 'Cyberpunk-inspired techwear clothing brand interface. Incorporating neon wireframes, neon grid lines, tactical utility specifications, and reactive futuristic soundscapes.',
    tools: ['React', 'TailwindCSS', 'CSS Neon Filters', 'Framer Motion']
  }
];

// ============================================
// 3D CARD
// ============================================

interface Card3DProps {
  item: typeof galleryItems[0];
  index: number;
  onClick: () => void;
}

function Card3D({ item, index, onClick }: Card3DProps) {
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
      onClick={onClick}
      className="relative w-full overflow-hidden rounded-xl md:rounded-2xl bg-white border border-black/10 shadow-[0_8px_40px_rgba(0,0,0,0.08)] group cursor-pointer"
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
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);

  // Lock body scroll when gallery item is expanded
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

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
      id="gallery"
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
                      <Card3D item={item} index={i} onClick={() => setSelectedItem(item)} />
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

      {/* Selected Gallery Item Full-Screen Expanded Modal Overlay */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-hidden select-none">
            {/* Backdrop overlay with heavy blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-xl cursor-zoom-out"
            />

            {/* Modal Window Card (High-End Dark Theme) */}
            <motion.article
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="relative w-full max-w-5xl h-[85vh] max-h-[700px] bg-[#0A0A0A] text-white rounded-[2rem] md:rounded-[3rem] shadow-[0_30px_90px_rgba(0,0,0,0.6)] border border-white/10 overflow-hidden flex flex-col md:flex-row z-10 select-text"
              aria-label={`Expanded Project Video: ${selectedItem.title}`}
            >
              {/* Floating Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full border border-white/10 bg-black/80 backdrop-blur-md flex items-center justify-center text-zinc-400 hover:text-white hover:scale-110 hover:border-white/30 hover:shadow-md transition-all cursor-pointer z-50 shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Side: Video Player Showcase */}
              <div className="w-full md:w-1/2 h-[45%] md:h-full relative overflow-hidden bg-black flex items-center justify-center p-0 select-none">
                {/* Tech grid overlay */}
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />

                <div className="w-full h-full relative flex items-center justify-center">
                  {/* LOCAL VIDEO */}
                  {selectedItem.type === 'video' && (
                    <video
                      src={selectedItem.src}
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* YOUTUBE EMBED PLAYER */}
                  {selectedItem.type === 'yt' && (
                    <iframe
                      className="absolute inset-0 w-full h-full border-0"
                      src={`https://www.youtube.com/embed/${selectedItem.ytId}?autoplay=1&controls=1&rel=0&modestbranding=1`}
                      allow="accelerometer-media; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>
              </div>

              {/* Right Side: Details & Actions Panel */}
              <div className="w-full md:w-1/2 h-[55%] md:h-full p-8 md:p-12 lg:p-14 flex flex-col justify-between overflow-y-auto bg-[#0F0F0F] border-t md:border-t-0 md:border-l border-white/5 select-text">
                <div>
                  {/* Category tag + Year indicator */}
                  <div className="flex items-center gap-4 mb-4 select-none">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {selectedItem.category}
                    </span>
                    <span className="text-xs font-mono text-white/35 font-semibold">
                      {selectedItem.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none mb-4 md:mb-6 uppercase">
                    {selectedItem.title}
                  </h2>

                  {/* Divider */}
                  <div className="w-12 h-[2px] bg-blue-500 mb-6" />

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-zinc-400 mb-8 max-w-md">
                    {selectedItem.description}
                  </p>

                  {/* Tools Used */}
                  <div className="mb-8">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3.5 select-none">
                      Tools & Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tools.map((tool: string) => (
                        <span
                          key={tool}
                          className="px-3.5 py-1.5 border border-white/10 bg-white/5 rounded-full text-xs font-medium text-zinc-300 hover:bg-white/10 hover:border-white/20 transition-colors"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="flex items-center gap-3.5 pt-6 border-t border-white/5 flex-wrap">
                  {/* Live Link Button */}
                  {selectedItem.href ? (
                    <a
                      href={selectedItem.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-6 py-3 bg-blue-600 text-white rounded-full font-bold uppercase tracking-wider text-[10.5px] hover:scale-105 hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>Play Live Site</span>
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-2.5 px-6 py-3 bg-white/5 text-zinc-500 rounded-full font-bold uppercase tracking-wider text-[10.5px] border border-white/10 cursor-not-allowed select-none">
                      <Play className="w-3.5 h-3.5 opacity-30" />
                      <span>Video Only Showcase</span>
                    </div>
                  )}

                  {/* Optional Back to Gallery button */}
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="inline-flex items-center gap-2.5 px-6 py-3 bg-white/10 text-white hover:bg-white/15 rounded-full font-bold uppercase tracking-wider text-[10.5px] hover:scale-105 transition-all duration-300 cursor-pointer border border-white/5"
                  >
                    <span>Close Preview</span>
                  </button>
                </div>
              </div>
            </motion.article>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

