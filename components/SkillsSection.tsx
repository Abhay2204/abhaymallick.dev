'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { Terminal, Zap, Layers, Cpu, Code2, Globe } from 'lucide-react';

const bentoItems = [
  { name: 'React', icon: '/tech/react.svg', span: 'md:col-span-2 md:row-span-2', category: 'Frontend', level: 'Expert', color: '#61DAFB' },
  { name: 'Next.js', icon: '/tech/nextjs.svg', span: 'md:col-span-2 md:row-span-1', category: 'Framework', level: 'Expert', color: '#000000' },
  { name: 'TypeScript', icon: '/tech/typescript.svg', span: 'md:col-span-1 md:row-span-2', category: 'Language', level: 'Expert', color: '#3178C6' },
  { name: 'Node.js', icon: '/tech/nodejs.svg', span: 'md:col-span-1 md:row-span-1', category: 'Backend', level: 'Advanced', color: '#339933' },
  { name: 'Tailwind', icon: '/tech/tailwindcss.svg', span: 'md:col-span-1 md:row-span-1', category: 'Styling', level: 'Expert', color: '#06B6D4' },
  { name: 'MongoDB', icon: '/tech/mongodb.svg', span: 'md:col-span-1 md:row-span-2', category: 'Database', level: 'Advanced', color: '#47A248' },
  { name: 'Vue.js', icon: '/tech/vuejs.svg', span: 'md:col-span-1 md:row-span-1', category: 'Frontend', level: 'Intermediate', color: '#4FC08D' },
  { name: 'PostgreSQL', icon: '/tech/postgresql.svg', span: 'md:col-span-2 md:row-span-1', category: 'Database', level: 'Advanced', color: '#4169E1' },
  { name: 'AWS', icon: '/tech/aws.svg', span: 'md:col-span-1 md:row-span-1', category: 'Cloud', level: 'Intermediate', color: '#FF9900' },
  { name: 'Docker', icon: '/tech/docker.svg', span: 'md:col-span-1 md:row-span-1', category: 'DevOps', level: 'Intermediate', color: '#2496ED' },
  { name: 'Kotlin', icon: '/tech/kotlin.svg', span: 'md:col-span-1 md:row-span-2', category: 'Mobile', level: 'Advanced', color: '#7F52FF' },
  { name: 'GSAP', icon: '/tech/gsap.svg', span: 'md:col-span-1 md:row-span-1', category: 'Motion', level: 'Expert', color: '#88CE02' },
  { name: 'Git', icon: '/tech/git.svg', span: 'md:col-span-1 md:row-span-1', category: 'Tools', level: 'Advanced', color: '#F05032' },
  { name: 'Figma', icon: '/tech/figma.svg', span: 'md:col-span-2 md:row-span-1', category: 'Design', level: 'Advanced', color: '#F24E1E' },
  { name: 'Python', icon: '/tech/python.svg', span: 'md:col-span-1 md:row-span-1', category: 'AI/Backend', level: 'Intermediate', color: '#3776AB' },
  { name: 'JavaScript', icon: '/tech/javascript.svg', span: 'md:col-span-1 md:row-span-1', category: 'Language', level: 'Expert', color: '#F7DF1E' },
  { name: 'Framer', icon: '/tech/framermotion.svg', span: 'md:col-span-1 md:row-span-1', category: 'Motion', level: 'Advanced', color: '#0055FF' },
  { name: 'Android', icon: '/tech/android.svg', span: 'md:col-span-2 md:row-span-1', category: 'Mobile', level: 'Advanced', color: '#3DDC84' },
  { name: 'Supabase', icon: '/tech/supabase.svg', span: 'md:col-span-1 md:row-span-1', category: 'Backend', level: 'Advanced', color: '#3ECF8E' },
  { name: 'Vercel', icon: '/tech/vercel.svg', span: 'md:col-span-1 md:row-span-1', category: 'Cloud', level: 'Expert', color: '#000000' },
];

function SkillCard({ item, index }: { item: typeof bentoItems[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15;
    setMousePos({ x, y });
    
    // Light effect
    const lightX = ((e.clientX - rect.left) / rect.width) * 100;
    const lightY = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty('--light-x', `${lightX}%`);
    cardRef.current.style.setProperty('--light-y', `${lightY}%`);
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.04, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
      className={`${item.span} group relative overflow-hidden rounded-[2rem] border border-black/5 bg-[#F9F9F9] p-6 md:p-8 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:border-black/10 hover:bg-white`}
    >
      {/* Light Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at var(--light-x, 50%) var(--light-y, 50%), ${item.color}08, transparent 60%)`,
        }}
      />

      {/* Top Section */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="w-12 h-12 md:w-14 md:h-14 relative grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
          <Image src={item.icon} alt={item.name} fill className="object-contain" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-black/20 group-hover:text-black/40 transition-colors">
          {item.category}
        </span>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 mt-8">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-black/80 group-hover:text-black transition-colors">
          {item.name}
        </h3>
        <div className="flex items-center gap-2 mt-2 overflow-hidden">
          <div className="h-[2px] w-8 bg-black/5 group-hover:bg-blue-600/20 transition-all duration-500 group-hover:w-full" />
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-tighter text-black/30 group-hover:text-blue-600 transition-colors">
            {item.level}
          </span>
        </div>
      </div>

      {/* Decorative Dots */}
      <div className="absolute top-4 right-4 flex gap-1 opacity-10 group-hover:opacity-30 transition-opacity">
        <div className="w-1 h-1 rounded-full bg-black" />
        <div className="w-1 h-1 rounded-full bg-black" />
        <div className="w-1 h-1 rounded-full bg-black" />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative w-full bg-white py-32 md:py-56 overflow-hidden"
      aria-label="Technical Skills of Abhay Mallick"
    >
      {/* Hidden Crawler-only SEO keywords block */}
      <div className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
        <h2>Abhay Mallick Freelancer &mdash; Professional Stack Skills</h2>
        <p>
          Abhay Mallick is a freelancer developer specializing in frontend Next.js, backend Express APIs, Node, SQL database indexing, and mobile Android (Kotlin) development.
        </p>
      </div>
      {/* Abstract Background Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-50/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-indigo-50/30 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Editorial Header */}
        <div className="mb-24 md:mb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <motion.div 
              style={{ y: titleY, opacity: titleOpacity }}
              className="text-sm md:text-base font-bold tracking-widest uppercase text-blue-600 flex items-center gap-4 mb-4"
            >
              <span>03</span>
              <div className="w-8 h-[2px] bg-blue-600" />
              <span>Technical Arsenal</span>
            </motion.div>
            
            <motion.h2 
              style={{ y: titleY, opacity: titleOpacity }}
              className="text-4xl md:text-6xl font-black tracking-tighter leading-none text-[#111]"
            >
              Tools I wield <br className="hidden md:block" />
              <span className="text-blue-600">with precision.</span>
            </motion.h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-lg text-black/40 max-w-sm leading-relaxed font-medium"
          >
            Bridging the gap between design and engineering with a curated stack of industry-leading technologies.
          </motion.p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-4 md:gap-8 mb-16 opacity-40 hover:opacity-100 transition-opacity duration-700">
          {[
            { icon: Code2, label: 'Frontend' },
            { icon: Cpu, label: 'Backend' },
            { icon: Layers, label: 'DevOps' },
            { icon: Globe, label: 'Cloud' },
            { icon: Zap, label: 'Motion' }
          ].map((cat) => (
            <div key={cat.label} className="flex items-center gap-2 group cursor-default">
              <cat.icon className="w-4 h-4 group-hover:text-blue-600 transition-colors" />
              <span className="text-[10px] font-bold uppercase tracking-widest group-hover:text-black transition-colors">{cat.label}</span>
            </div>
          ))}
        </div>

        {/* Dynamic Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 auto-rows-min">
          {bentoItems.map((item, index) => (
            <SkillCard key={item.name} item={item} index={index} />
          ))}
        </div>

        {/* Bottom CTA / Stats */}
        <div className="mt-32 pt-20 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex gap-16">
            <div>
              <span className="block text-4xl font-black tracking-tighter">20+</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">Technologies</span>
            </div>
            <div>
              <span className="block text-4xl font-black tracking-tighter">100%</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">Precision</span>
            </div>
          </div>
          <p className="text-sm font-mono text-black/20 max-w-[200px] text-center md:text-right">
            UPDATING REGULARLY TO STAY AHEAD OF THE CURVE.
          </p>
        </div>
      </div>
    </section>
  );
}
