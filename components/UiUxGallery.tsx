'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, X, Info, ChevronLeft, ChevronRight } from 'lucide-react';

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
// CAROUSEL CARD
// ============================================

interface CarouselCardProps {
  item: typeof galleryItems[0];
  isActive: boolean;
  onClick: () => void;
}

function CarouselCard({ item, isActive, onClick }: CarouselCardProps) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const thumbUrl = item.type === 'yt' ? `https://img.youtube.com/vi/${item.ytId}/maxresdefault.jpg` : null;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`snap-start shrink-0 w-[50vw] sm:w-[35vw] md:w-[26vw] lg:w-[20vw] xl:w-[17vw] cursor-pointer transition-all duration-300 relative rounded-xl overflow-hidden aspect-[16/10] bg-black select-none border ${
        isActive 
          ? 'ring-2 ring-blue-600 border-transparent shadow-[0_4px_20px_rgba(37,99,235,0.25)] scale-[0.98]' 
          : 'border-white/10 hover:border-white/30 hover:scale-[1.02]'
      }`}
    >
      {/* Background Image / Video Preview */}
      {item.type === 'video' ? (
        <video
          ref={videoRef}
          src={item.src}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-100"
        />
      ) : (
        <>
          {thumbUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={thumbUrl} 
              alt={item.title} 
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hovered ? 'opacity-0' : 'opacity-100'}`} 
            />
          )}
          {hovered && (
            <iframe
              className="absolute inset-0 w-full h-full border-0 pointer-events-none scale-105"
              src={`https://www.youtube.com/embed/${item.ytId}?autoplay=1&mute=1&loop=1&playlist=${item.ytId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3`}
              allow="autoplay; encrypted-media"
            />
          )}
        </>
      )}

      {/* Hover Info Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent flex flex-col justify-end p-4 transition-all duration-300 ${hovered ? 'opacity-100' : 'opacity-90'}`}>
        <span className="text-[8px] font-bold text-blue-400 uppercase tracking-widest mb-0.5">
          {item.category}
        </span>
        <h4 className="text-xs font-black text-white uppercase tracking-tight truncate">
          {item.title}
        </h4>
      </div>
      
      {/* Small Active Indicator Dot */}
      {isActive && (
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
      )}
    </div>
  );
}

// ============================================
// FILTER LOGIC
// ============================================

const filterItems = (filter: string) => {
  if (filter === 'ALL') return galleryItems;
  if (filter === 'MOTION') {
    return galleryItems.filter(item => 
      item.id === 'v1' || item.id === 'v2' || item.id === 'p9' || item.id === 'p14'
    );
  }
  if (filter === 'SPATIAL') {
    return galleryItems.filter(item => 
      item.id === 'v2' || item.id === 'p2' || item.id === 'p5' || item.id === 'p10' || item.id === 'p13'
    );
  }
  if (filter === 'WEB') {
    return galleryItems.filter(item => 
      item.id !== 'v1' && item.id !== 'v2' && item.id !== 'p9' && item.id !== 'p14' && item.id !== 'p2' && item.id !== 'p5' && item.id !== 'p10' && item.id !== 'p13'
    );
  }
  return galleryItems;
};

// ============================================
// MAIN
// ============================================

export default function UiUxGallery() {
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);
  const [activeItem, setActiveItem] = useState<typeof galleryItems[0]>(galleryItems[0]);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const carouselRef = useRef<HTMLDivElement>(null);

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

  const filteredItems = filterItems(activeFilter);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.75;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const FILTERS = [
    { id: 'ALL', label: 'All Works' },
    { id: 'MOTION', label: 'Motion' },
    { id: 'SPATIAL', label: 'Spatial & 3D' },
    { id: 'WEB', label: 'Creative Web' }
  ];

  return (
    <section
      id="gallery"
      className="relative bg-[#FAFAFA] border-t border-black/5 py-16 md:py-24 overflow-hidden select-none"
    >
      {/* Hidden Crawler-only SEO keywords block */}
      <div className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
        <h2>Abhay Mallick Design Showcase &mdash; Motion &amp; Spatial UI/UX Design</h2>
        <p>
          Explore spatial computer dashboards, liquid interactive motion studies, and next-generation UI designs created by Abhay Mallick, designer and developer.
        </p>
      </div>

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }}
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Top Header Bar */}
        <div className="pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
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

        {/* Mobile Filter Tabs (rendered above the video player on mobile) */}
        <div className="flex md:hidden items-center gap-2 overflow-x-auto scrollbar-none py-1 mb-5 select-none">
          {FILTERS.map((f) => {
            const isSelected = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => {
                  setActiveFilter(f.id);
                  const filtered = filterItems(f.id);
                  if (filtered.length > 0) {
                    setActiveItem(filtered[0]);
                  }
                }}
                className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-[0_2px_10px_rgba(37,99,235,0.4)] border border-blue-500/50'
                    : 'bg-black/5 border border-black/10 text-black/60 hover:text-black'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Streaming Dashboard Player Box (Theater Mode Console) */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[24/10] rounded-3xl overflow-hidden bg-[#0A0A0A] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.3)] mb-6 md:mb-10 flex flex-col justify-end p-6 md:p-10 lg:p-12">
          {/* Background Media Container (Autoplay, muted) */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full relative"
              >
                {activeItem.type === 'video' ? (
                  <video
                    src={activeItem.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover pointer-events-none opacity-100"
                  />
                ) : (
                  <iframe
                    className="w-full h-full object-cover border-0 pointer-events-none scale-105 opacity-100"
                    src={`https://www.youtube.com/embed/${activeItem.ytId}?autoplay=1&mute=1&loop=1&playlist=${activeItem.ytId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3`}
                    allow="autoplay; encrypted-media"
                    style={{ pointerEvents: 'none' }}
                  />
                )}
              </motion.div>
            </AnimatePresence>
            
            {/* Cinematic Gradient Overlays (Only visible on desktop/md to keep text readable) */}
            <div className="hidden md:block absolute inset-y-0 left-0 w-full md:w-2/3 bg-gradient-to-r from-black/55 via-black/20 to-transparent z-10 pointer-events-none" />
            <div className="hidden md:block absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none" />
          </div>

          {/* Top Row: Navigation and Profile (Desktop only) */}
          <div className="hidden md:flex absolute top-0 left-0 right-0 p-6 items-center justify-between z-20 bg-gradient-to-b from-black/45 to-transparent">
            {/* Nav Tabs */}
            <div className="flex items-center gap-2 md:gap-3 overflow-x-auto scrollbar-none py-1">
              {FILTERS.map((f) => {
                const isSelected = activeFilter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => {
                      setActiveFilter(f.id);
                      const filtered = filterItems(f.id);
                      if (filtered.length > 0) {
                        setActiveItem(filtered[0]);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-[0_2px_10px_rgba(37,99,235,0.4)] border border-blue-500/50'
                        : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>

            {/* Right Side: Avatar */}
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-black uppercase tracking-widest text-white/40 hidden md:inline-block">
                Abhay TV
              </span>
              <div className="w-8 h-8 rounded-full border border-white/20 overflow-hidden shadow-[0_0_10px_rgba(37,99,235,0.2)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/profile.jpg"
                  alt="Abhay Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Featured Project Info Content (Desktop only) */}
          <div className="hidden md:block relative z-20 max-w-xl md:max-w-2xl select-text">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                {/* Category & Year Tag */}
                <div className="flex items-center gap-3 mb-3 select-none">
                  <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                    {activeItem.category}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-white/40">
                    {activeItem.year}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  {activeItem.title}
                </h2>

                {/* Description */}
                <p className="text-[11px] md:text-xs text-zinc-200/90 leading-relaxed mb-5 max-w-md drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                  {activeItem.description}
                </p>

                {/* Stack used */}
                <div className="flex flex-wrap gap-1.5 mb-5 select-none">
                  {activeItem.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 border border-white/10 bg-white/5 rounded-full text-[9px] font-semibold text-zinc-300 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 select-none">
                  {activeItem.href ? (
                    <a
                      href={activeItem.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold uppercase tracking-wider text-[9px] transition-all hover:scale-105 active:scale-95 shadow-[0_4px_15px_rgba(37,99,235,0.3)]"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>Play Live</span>
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-4.5 py-2 bg-white/5 border border-white/10 text-zinc-400 rounded-full font-bold uppercase tracking-wider text-[9px] cursor-not-allowed">
                      <Play className="w-3.5 h-3.5 opacity-35" />
                      <span>Video Only Showcase</span>
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedItem(activeItem)}
                    className="inline-flex items-center gap-1.5 px-4.5 py-2 border border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold uppercase tracking-wider text-[9px] transition-all hover:scale-105 active:scale-95"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Watch Details</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Info Container (Only visible on mobile, rendered below the video player) */}
        <div className="block md:hidden w-full mt-4 px-1 mb-8 select-text">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Category & Year Tag */}
              <div className="flex items-center gap-3 mb-2 select-none">
                <span className="bg-blue-600/10 text-blue-600 border border-blue-200 text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                  {activeItem.category}
                </span>
                <span className="text-[10px] font-mono font-bold text-zinc-400">
                  {activeItem.year}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl font-black text-[#111] uppercase tracking-tight mb-2">
                {activeItem.title}
              </h2>

              {/* Description */}
              <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                {activeItem.description}
              </p>

              {/* Stack used */}
              <div className="flex flex-wrap gap-1.5 mb-5 select-none">
                {activeItem.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2 py-0.5 border border-zinc-200 bg-zinc-50 rounded-full text-[9px] font-semibold text-zinc-600"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 select-none">
                {activeItem.href ? (
                  <a
                    href={activeItem.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold uppercase tracking-wider text-[9px] transition-all"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>Play Live</span>
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-4.5 py-2 bg-zinc-100 border border-zinc-200 text-zinc-400 rounded-full font-bold uppercase tracking-wider text-[9px] cursor-not-allowed">
                    <Play className="w-3.5 h-3.5 opacity-35" />
                    <span>Video Only</span>
                  </div>
                )}

                <button
                  onClick={() => setSelectedItem(activeItem)}
                  className="inline-flex items-center gap-1.5 px-4.5 py-2 border border-black/10 bg-black/5 text-[#111] rounded-full font-bold uppercase tracking-wider text-[9px] transition-all"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Watch Details</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Section Wrapper */}
        <div className="w-full relative">
          {/* Row Title */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black tracking-widest text-zinc-400 uppercase">
              Showcase Selection ({filteredItems.length} titles)
            </h3>
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest hidden md:block">
              Hover to preview · Click to play
            </div>
          </div>

          {/* Carousel Slider Controls Container */}
          <div className="relative group/carousel w-full">
            {/* Left Button */}
            <button
              onClick={() => scrollCarousel('left')}
              aria-label="Previous works"
              className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 cursor-pointer shadow-xl hidden md:flex"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Right Button */}
            <button
              onClick={() => scrollCarousel('right')}
              aria-label="Next works"
              className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 cursor-pointer shadow-xl hidden md:flex"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Slider track */}
            <div
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {filteredItems.map((item) => (
                <CarouselCard
                  key={item.id}
                  item={item}
                  isActive={activeItem.id === item.id}
                  onClick={() => setActiveItem(item)}
                />
              ))}
            </div>
          </div>
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

