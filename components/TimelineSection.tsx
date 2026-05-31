'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from 'framer-motion';

// ─── Data ─────────────────────────────────────────────────────────────────────
const JOURNEY = [
  {
    id: 0,
    number: '01',
    period: 'Jan 2024 — Jun 2024',
    role: 'Full Stack Dev Trainee',
    company: 'The Kiran Academy',
    type: 'Education',
    description:
      'Mastered modern web architecture — JavaScript, Node.js, Express.js, React, and database design — laying the groundwork for production-grade engineering.',
    tags: ['JavaScript', 'Node.js', 'React', 'Express.js'],
    stat: { label: 'Duration', value: '6 mo' },
  },
  {
    id: 1,
    number: '02',
    period: 'Jul 2024 — Dec 2024',
    role: 'Software Dev Intern',
    company: 'Inspire Engineering Service',
    type: 'Internship',
    description:
      'Developed and maintained full-stack features in a live engineering environment — collaborating with senior devs to ship high-quality, scalable solutions on tight deadlines.',
    tags: ['Full Stack', 'Collaboration', 'Production', 'Agile'],
    stat: { label: 'Duration', value: '6 mo' },
  },
  {
    id: 2,
    number: '03',
    period: 'Jan 2025 — Present',
    role: 'Freelancer',
    company: 'Remote · Worldwide',
    type: 'Freelance',
    description:
      'Architecting bespoke digital masterpieces — blending Swiss design principles with cutting-edge web technologies. 50+ projects delivered across web, mobile and AI.',
    tags: ['Next.js', 'AI Integration', 'System Design', 'UI/UX'],
    stat: { label: 'Projects', value: '50+' },
  },
] as const;

// ─── Active Index Calculator ─────────────────────────────────────────────────────
function getActiveIndex(p: number): 0 | 1 | 2 {
  if (p < 0.38) return 0;
  if (p < 0.72) return 1;
  return 2;
}

// ─── Timeline Card (Alternates Left/Right with Organic Spring Fly-In) ───────────
function TimelineCard({
  item,
  index,
  isActive,
}: {
  item: typeof JOURNEY[number];
  index: number;
  isActive: boolean;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? 30 : -30, scale: 0.85, rotate: isEven ? 2 : -2 }}
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.85,
        x: isActive ? 0 : isEven ? 30 : -30,
        rotate: isActive ? 0 : isEven ? 2 : -2,
        filter: isActive ? 'blur(0px)' : 'blur(4px)',
      }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 14,
        mass: 0.8,
      }}
      className={`absolute w-[38%] flex flex-col -translate-y-1/2 top-1/2 ${
        isEven
          ? 'left-[52%] items-start text-left'
          : 'right-[52%] items-end text-right'
      } ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <div className="w-full bg-white/90 backdrop-blur-md border border-white/75 shadow-[0_15px_30px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.01)] rounded-2xl p-4 md:p-5.5 lg:p-6.5 relative transition-all duration-300 hover:shadow-xl select-text">
        {/* Soft upper border accent line in teal */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#0d9488] rounded-t-2xl" />

        {/* Year Label */}
        <span className="text-[#0d9488] font-mono font-bold text-[9px] md:text-[10.5px] uppercase tracking-wider mb-0.5 block">
          {item.period}
        </span>

        {/* Role Title */}
        <h3 className="text-xs md:text-sm lg:text-base font-black text-zinc-900 uppercase tracking-tight leading-tight mb-0.5">
          {item.role}
        </h3>

        {/* Company Subheading with SVG Location Pin */}
        <span className="text-zinc-400 font-semibold text-[8px] md:text-[9.5px] uppercase tracking-wide mb-3 flex items-center gap-1.5 justify-start">
          <svg className="w-2.5 h-2.5 text-[#0d9488] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {item.company}
        </span>

        {/* Description Body */}
        <p className="text-[9px] md:text-[11px] lg:text-[12px] leading-relaxed text-zinc-600 mb-4">
          {item.description}
        </p>

        {/* Bottom tags */}
        <div className={`flex flex-wrap gap-1 w-full ${isEven ? 'justify-start' : 'justify-end'}`}>
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[8px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500 border border-zinc-200/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Inside Laptop Screen (GPU-Accelerated Parallax Timeline with Full IDE details) ─
function JourneyScreen({
  progress,
  activeIndex,
}: {
  progress: MotionValue<number>;
  activeIndex: 0 | 1 | 2;
}) {
  // Map raw progress [0.03, 0.97] to a standard clamped timeline progress [0, 1]
  const mappedT = useTransform(progress, [0.03, 0.97], [0, 1]);

  // 1. Compute 2D Camera translations using native re-render free MotionValues
  const translateY = useTransform(mappedT, [0, 1], ['35%', '-35%']);
  
  // Winding curves between X = 38% and X = 62%. Camera offsets X between +12% and -12% to keep centered.
  const translateX = useTransform(mappedT, (t) => {
    const clamped = Math.max(0, Math.min(1, t));
    const offset = Math.cos(clamped * 2 * Math.PI) * 12;
    return `${offset}%`;
  });

  // Combine X and Y translations into a single GPU hardware-accelerated translate string
  const cameraTransform = useTransform(
    [translateX, translateY],
    ([xVal, yVal]) => `translate(${xVal}, ${yVal})`
  );

  // 2. Winding S-Curve progress path (SVG viewBox 100 x 500 coordinates)
  // Curves between X = 38 and X = 62.
  const PATH_D = 'M 38 75 C 75 125, 75 200, 62 250 C 49 300, 25 375, 38 425';

  // 3. Compute active drawing stroke offset directly on the GPU
  const dashOffset = useTransform(mappedT, [0, 1], [450, 0]);

  // 4. Compute traveling coordinate dot positions
  const dotX = useTransform(mappedT, (t) => {
    const clamped = Math.max(0, Math.min(1, t));
    const offset = 50 - Math.cos(clamped * 2 * Math.PI) * 12;
    return `${offset}%`;
  });
  
  const dotY = useTransform(mappedT, [0, 1], ['15%', '85%']);

  const stops = [
    { percentX: '38%', percentY: '15%' }, // Node 0
    { percentX: '62%', percentY: '50%' }, // Node 1
    { percentX: '38%', percentY: '85%' }, // Node 2
  ];

  // Syntax Highlighted code string block in the background
  const codeLines = `import { Experience } from '@/types';
import { useScroll } from 'framer-motion';

// Work Experience dataset definition
export const journey: Experience[] = [
  {
    id: 1,
    role: "Full Stack Dev Trainee",
    company: "The Kiran Academy",
    period: "Jan 2024 - Jun 2024",
    stat: "6 months duration"
  },
  {
    id: 2,
    role: "Software Dev Intern",
    company: "Inspire Engineering",
    period: "Jul 2024 - Dec 2024",
    stat: "6 months duration"
  },
  {
    id: 3,
    role: "Freelancer",
    company: "Remote / Worldwide",
    period: "Jan 2025 - Present",
    stat: "50+ completed projects"
  }
];

export function getActiveTimelineNode(p: number) {
  if (p < 0.38) return 0;
  if (p < 0.72) return 1;
  return 2;
}`;

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#f9f9fb] flex flex-col justify-between select-none">
      
      {/* ─── Mock IDE Tab Window Header ─── */}
      <div className="h-9 w-full bg-[#f4f4f5] border-b border-black/5 flex items-center justify-between px-4 z-20 select-none">
        <div className="flex items-center gap-6">
          {/* macOS Style Window controls */}
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-black/[0.12]" />
            <div className="w-2.5 h-2.5 rounded-full bg-black/[0.12]" />
            <div className="w-2.5 h-2.5 rounded-full bg-black/[0.12]" />
          </div>

          {/* Tab item */}
          <div className="h-9 px-3 bg-[#fafafa] border-r border-l border-black/5 border-b border-b-[#fafafa] flex items-center gap-2 mt-px">
            <span className="text-[9px] font-black bg-[#1d4ed8] text-white px-1 py-px rounded-[2px] leading-none">
              TS
            </span>
            <span className="text-[10px] font-mono font-bold text-black/75">
              experience.ts
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#1d4ed8] mt-px" />
          </div>
        </div>

        {/* Directory Breadcrumb */}
        <span className="text-[9.5px] font-mono text-black/30 hidden sm:block">
          abhaymallick.dev / src / components / Timeline
        </span>
      </div>

      {/* ─── Main Editor Workspace split ─── */}
      <div className="relative flex-1 w-full flex overflow-hidden">
        
        {/* ─── Left Sidebar File Explorer (VS Code Style) ─── */}
        <div className="w-36 md:w-44 bg-[#f4f4f5] border-r border-black/5 flex flex-col justify-start pt-3.5 px-3 h-full z-15 select-none text-black/50 text-[9px] font-mono leading-relaxed shrink-0">
          <div className="text-[8px] font-sans font-bold uppercase tracking-wider text-black/30 mb-3.5 px-0.5">
            Explorer
          </div>
          <div className="flex flex-col gap-1.5 pl-0.5">
            <div className="flex items-center gap-1 font-bold text-black/75">
              <span>▼</span> <span className="truncate">abhaymallick.dev</span>
            </div>
            <div className="flex flex-col gap-1.5 pl-3">
              <div className="flex items-center gap-1 text-black/40">
                <span>▶</span> <span className="truncate">public</span>
              </div>
              <div className="flex items-center gap-1 text-black/75 font-semibold">
                <span>▼</span> <span className="truncate">src</span>
              </div>
              <div className="flex flex-col gap-1 pl-3 border-l border-black/5">
                
                {/* components Folder */}
                <div className="flex items-center gap-1 text-black/75 font-semibold">
                  <span>▼</span> <span className="truncate">components</span>
                </div>
                <div className="flex flex-col gap-1 pl-3.5 border-l border-black/5 mb-1.5">
                  <div className="flex items-center gap-1 text-black/35">
                    <span className="text-[8.5px]">📁</span> <span className="truncate">ui</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#1d4ed8] bg-blue-50/50 py-0.5 px-1.5 rounded border-l-2 border-[#1d4ed8] font-bold">
                    <span className="text-[7.5px] bg-[#1d4ed8] text-white px-0.5 py-px rounded-[1px] leading-none font-sans scale-90 font-black">TS</span>
                    <span className="truncate">experience.ts</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-black/45">
                    <span className="text-[7.5px] bg-blue-500/20 text-blue-700 px-0.5 py-px rounded-[1px] leading-none font-sans scale-90 font-black">TS</span>
                    <span className="truncate">HeroSection.tsx</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-black/45">
                    <span className="text-[7.5px] bg-blue-500/20 text-blue-700 px-0.5 py-px rounded-[1px] leading-none font-sans scale-90 font-black">TS</span>
                    <span className="truncate">SkillsSection.tsx</span>
                  </div>
                </div>

                {/* education Folder (B.Tech Computer Science & Engineering) */}
                <div className="flex items-center gap-1 text-black/75 font-semibold mt-1">
                  <span>▼</span> <span className="truncate">education</span>
                </div>
                <div className="flex flex-col gap-1 pl-3.5 border-l border-black/5">
                  <div className="flex items-center gap-1.5 text-black/65 font-medium py-0.5">
                    <span className="text-[8.5px]">🎓</span>
                    <span className="truncate">btech-cse.ts</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* ─── Code Editor Canvas (Right pane) ─── */}
        <div className="relative flex-1 h-full overflow-hidden bg-[#fafafa]">
          
          {/* Vertical IDE Line Numbers column */}
          <div className="absolute left-0 top-0 bottom-0 w-8 border-r border-black/5 bg-[#f4f4f5]/40 flex flex-col items-center pt-4 select-none z-10 text-[9px] font-mono text-black/15 gap-[7px] leading-none">
            {Array.from({ length: 30 }).map((_, i) => {
              const activeRangeStart = activeIndex * 8;
              const activeRangeEnd = (activeIndex + 1) * 8;
              const isLineActive = i >= activeRangeStart && i < activeRangeEnd;
              return (
                <span
                  key={i}
                  className={`transition-colors duration-450 ${
                    isLineActive ? 'text-[#1d4ed8] font-black' : ''
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              );
            })}
          </div>

          {/* Faint Editor Source Code Background (gives beautiful backdrop blur backdrop-filter depth) */}
          <div className="absolute inset-0 pl-11 pt-4 select-none opacity-[0.055] text-[9.5px] font-mono leading-[16px] text-zinc-900 pointer-events-none whitespace-pre z-0">
            {codeLines}
          </div>

          {/* Soft Teal spotlight centered in the viewport */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(13,148,136,0.03)_0%,transparent_60%)] z-10" />

          {/* Camera Tracking translation container (Houses background path, dots, AND cards for organic kinetic glide!) */}
          <motion.div
            style={{ transform: cameraTransform }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Winding S-Curve Progress Path SVG */}
            <svg
              viewBox="0 0 100 500"
              className="absolute inset-0 w-full h-full"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Curved Path Track (Muted gray) */}
              <path
                d={PATH_D}
                stroke="rgba(0,0,0,0.06)"
                strokeWidth="1.8"
                strokeLinecap="round"
              />

              {/* Curved Active drawing line segment (Stormy Teal) */}
              <motion.path
                d={PATH_D}
                stroke="#0d9488"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeDasharray="450"
                style={{ strokeDashoffset: dashOffset }}
              />
            </svg>

            {/* Timeline Nodes & Opposite Alternating Cards */}
            {stops.map((s, i) => {
              const isActive = i === activeIndex;
              const isPast = i < activeIndex;

              return (
                <React.Fragment key={i}>
                  {/* Yale Blue Node Dot */}
                  <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{ left: s.percentX, top: s.percentY }}
                  >
                    {/* Expanding Ripple ring */}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0.15 }}
                        animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.15, 0.35, 0.15] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute inset-[-10px] border border-[#1d4ed8] rounded-full"
                      />
                    )}

                    {/* Node Dot with spring scale */}
                    <motion.div
                      animate={{ scale: isActive ? 1.15 : 0.8 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      className={`w-3.5 h-3.5 md:w-4.5 md:h-4.5 rounded-full border-[3px] border-white shadow-md ${
                        isActive || isPast ? 'bg-[#1d4ed8]' : 'bg-zinc-300'
                      }`}
                      style={{ transition: 'background-color 0.4s ease' }}
                    />

                    {/* Floating Step Number */}
                    <span
                      className={`absolute -top-3.5 left-1/2 -translate-x-1/2 font-mono text-[8px] font-bold ${
                        isActive ? 'text-[#1d4ed8]' : 'text-zinc-300'
                      }`}
                      style={{ transition: 'color 0.4s ease' }}
                    >
                      {JOURNEY[i].number}
                    </span>
                  </div>

                  {/* Alternating Experience Card wrapper (moves dynamically with path to keep parallax glide) */}
                  <div
                    className="absolute w-full h-0 font-sans z-25"
                    style={{ left: 0, top: s.percentY }}
                  >
                    <TimelineCard item={JOURNEY[i]} index={i} isActive={isActive} />
                  </div>
                </React.Fragment>
              );
            })}

            {/* Traveling Blue coordinate dot */}
            <motion.div
              style={{ left: dotX, top: dotY }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#1d4ed8] border-2 border-white shadow-[0_0_6px_rgba(29,78,216,0.5)] z-20"
          />
        </motion.div>
      </div>

      </div>

      {/* ─── Mock IDE Status Bar ─── */}
      <div className="h-6 w-full bg-[#f4f4f5] border-t border-black/5 flex items-center justify-between px-4 z-20 text-black/40 font-mono text-[9px] select-none">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#0d9488] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488] animate-pulse" />
            GPU.ACCEL
          </span>
          <span className="w-[1px] h-3 bg-black/10" />
          <span>target:</span>
          <span className="text-black/60 font-bold">experience.ts</span>
        </div>
        <div className="flex items-center gap-4">
          <span>LN {24 + activeIndex * 4}, COL 8</span>
          <span className="hidden sm:inline">WebGL-Ready</span>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section Wrapper ────────────────────────────────────────────────────
export default function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 22,
    restDelta: 0.001,
  });

  // Map progress with small margins (accounting for the header space)
  const screenProgress = useTransform(smoothProgress, [0.15, 0.95], [0, 1]);

  // Dynamic scroll loading path progress values
  const progressLineHeight = useTransform(smoothProgress, [0.15, 0.95], ['0%', '100%']);
  const progressPercent = useTransform(screenProgress, (p) => `${Math.round(Math.max(0, Math.min(1, p)) * 100)}%`);

  // Strict index scrubbing state update — fires EXACTLY TWICE over 400vh scroll
  const [activeIndex, setActiveIndex] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    return screenProgress.on('change', (v) => {
      const index = getActiveIndex(v);
      setActiveIndex((prev) => (prev !== index ? index : prev));
    });
  }, [screenProgress]);

  const hintOpacity = useTransform(scrollYProgress, [0, 0.07], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full bg-[#FAFAFA]"
      style={{ height: '400vh' }}
      aria-label="Work Experience of Abhay Mallick"
    >
      {/* Background Swiss Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] z-0"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Editorial Swiss Header (Non-sticky, matching Skills/Expertise layout) */}
      <div className="pt-32 md:pt-48 pb-20 md:pb-28 border-b border-black/5 bg-[#FAFAFA]">
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

      {/* Sticky Laptop Frame Wrapper */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-7xl md:max-w-[84vw] px-4 md:px-8 lg:px-12">
          
          <div className="relative mx-auto w-full">
            {/* Bezel */}
            <div className="relative bg-[#0a0a0a] rounded-[2rem] md:rounded-[3rem] p-3 md:p-4 shadow-[0_50px_100px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.05)] border-t border-white/10">
              {/* Camera Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#0a0a0a] rounded-b-xl z-20 hidden md:block" />

              {/* Aspect-Ratio Screen interior */}
              <div className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden bg-white">
                {/* Pass the Framer Motion smoothProgress directly into the child */}
                <JourneyScreen progress={smoothProgress} activeIndex={activeIndex} />
                
                {/* Subtle Screen Glare overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/[0.03] via-transparent to-transparent opacity-30" />
              </div>
            </div>

            {/* Laptop Base and shadow */}
            <div className="relative -mt-2 h-4 w-[90%] mx-auto bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-b-3xl shadow-xl border-t border-white/5" />
            <div className="relative -mt-1 h-2 w-[30%] mx-auto bg-black/20 rounded-full blur-sm" />

            {/* Soft Ambient Shadow backing */}
            <div className="absolute -inset-10 blur-[120px] -z-10 bg-blue-600/5 rounded-full pointer-events-none" />
          </div>

          {/* Upgraded Classic Mouse Scroll Indicator */}
          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-30"
          >
            <div className="w-4 h-7 rounded-full border border-black/15 relative flex justify-center pt-1.5">
              <motion.div
                className="w-[2px] h-[5px] bg-[#0d9488] rounded-full"
                animate={{ y: [0, 6, 0], opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <span className="text-[8.5px] font-sans font-bold text-black/25 tracking-[0.25em] uppercase">
              SCROLL TO TRAVEL
            </span>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
