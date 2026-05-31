'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// ============================================
// DATA (With completed Live Link/Play properties)
// ============================================

const projects = [
  {
    title: "Cosmic IDE",
    year: "2025",
    type: "Development Tool",
    techStack: ["React", "Node.js", "Electron", "Gemini API"],
    description: "A professional-grade, AI-native IDE engineered for high-end development. Features integrated multi-language debugging, live code execution, robust extension ecosystem, and advanced AI agents.",
    image: "cosmic ide.png",
    githubUrl: "https://github.com/Abhay2204/Cosmic-IDE",
    liveUrl: "https://github.com/Abhay2204/Cosmic-IDE"
  },
  {
    title: "TAFE CRM",
    year: "2025",
    type: "Enterprise CRM",
    techStack: ["React", "Node.js", "PostgreSQL"],
    description: "Tailored CRM solution for TAFE institutions — streamlining student enrollment, course management, and staff workflows with a clean, intuitive interface.",
    image: "tafeCrm.png",
    githubUrl: null,
    liveUrl: null
  },
  {
    title: "Nexus AI Task",
    year: "2025",
    type: "AI Task Manager",
    techStack: ["Next.js", "Gemini", "Supabase", "Tailwind"],
    description: "AI-powered task manager featuring Strict Focus Mode, intelligent task breakdown, smart time allocation, priority scheduling, and deep productivity analytics.",
    image: "nexus ai task commander.png",
    githubUrl: null,
    liveUrl: "https://nexus-task-commander.vercel.app"
  },
  {
    title: "InsightFlow",
    year: "2023",
    type: "AI Analytics",
    techStack: ["React", "Gemini API", "Recharts"],
    description: "Transform raw data into actionable insights with AI-driven dashboards, custom reports, and predictive analytics.",
    image: "insightflow.png",
    githubUrl: null,
    liveUrl: null
  },
  {
    title: "CodeX DSA",
    year: "2023",
    type: "Education Platform",
    techStack: ["React Native", "Vue.js"],
    description: "Interactive DSA learning platform with visual algorithms, practice problems, and progress tracking.",
    image: "dsa guru.png",
    githubUrl: "https://github.com/Abhay2204/codex",
    liveUrl: null
  },
  {
    title: "Health Track",
    year: "2022",
    type: "Lifestyle App",
    techStack: ["MERN Stack"],
    description: "Personal health companion with activity tracking, meal planning, sleep analysis, and AI wellness recommendations.",
    image: "health_track_new.jpg",
    githubUrl: null,
    liveUrl: null
  },
  {
    title: "NE CRM",
    year: "2024",
    type: "Enterprise Software",
    techStack: ["React", "Node.js", "Supabase"],
    description: "Enterprise-grade CRM with automated workflows, predictive analytics, and team collaboration tools for scaling businesses.",
    image: "ne crm.png",
    githubUrl: null,
    liveUrl: null
  },
  {
    title: "SmartCity",
    year: "2024",
    type: "Web Application",
    techStack: ["HTML", "CSS", "JS", "Node.js"],
    description: "SmartCity is a comprehensive web application designed to modernize urban living through digital governance, data-driven decision making, and smart services for citizens. Features Citizen Complaint Systems, Smart Dashboards, and an AI Health Chatbot.",
    image: "smartcity.jpg",
    githubUrl: "https://github.com/Abhay2204/SmartCity",
    liveUrl: "https://github.com/Abhay2204/SmartCity"
  },
  {
    title: "Beyond Bark",
    year: "2024",
    type: "Mobile App",
    techStack: ["Kotlin", "Jetpack Compose", "Firebase", "Netmind API"],
    description: "AI-powered mobile app designed to improve the lives of pets and their humans. Leverages modern AI to provide mood detection, species identification, disease detection, and a rescue system for abandoned animals.",
    image: "beyond_bark.jpg",
    githubUrl: "https://github.com/Abhay2204/Beyond-bark",
    liveUrl: "https://github.com/Abhay2204/Beyond-bark"
  }
];

// ============================================
// CARD COMPONENT
// ============================================

const Card = ({ index, project, progress, targetScale, total, onSelect }: any) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
  const scale = useTransform(progress, [index * (1 / total), 1], [1, targetScale]);

  return (
    <div ref={containerRef} className="h-screen w-full flex items-center justify-center sticky top-0 overflow-hidden">
      <motion.article
        style={{ scale, top: `calc(-5vh + ${index * 25}px)` }}
        className="relative flex flex-col md:flex-row w-[90vw] md:w-[85vw] h-[85vh] md:h-[75vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] origin-top border border-black/5"
        aria-label={`Project: ${project.title}`}
      >
        {/* Left Side: Content */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-between bg-white z-10 order-2 md:order-1 h-1/2 md:h-full">
          <div>
            <div className="flex flex-row items-center justify-between mb-6 md:mb-10 gap-4">
              <span className="text-2xl md:text-3xl font-mono text-black/30 font-light leading-none">
                0{index + 1}
              </span>
              <div className="flex items-center gap-2.5">
                {/* View Details/Expand Button */}
                <button
                  onClick={() => onSelect(project)}
                  className="inline-flex items-center gap-1.5 px-4.5 py-2 bg-blue-600 text-white rounded-full font-semibold uppercase tracking-wider text-[10.5px] hover:scale-105 hover:bg-blue-700 hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                  <span>View Details</span>
                </button>

                {/* GitHub Button */}
                {project.githubUrl ? (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 px-4.5 py-2 bg-[#111111] text-white rounded-full font-semibold uppercase tracking-wider text-[10.5px] hover:scale-105 hover:bg-blue-600 hover:shadow-md transition-all duration-300"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                    <span>GitHub</span>
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-4.5 py-2 bg-black/5 text-black/40 rounded-full font-semibold uppercase tracking-wider text-[10.5px] cursor-not-allowed">
                    <span>Private Code</span>
                  </div>
                )}
              </div>
            </div>

            <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 md:mb-6 text-[#111111] leading-tight">
              {project.title}
            </h3>
            <p className="text-sm md:text-base lg:text-lg text-black/60 leading-relaxed max-w-lg mb-6 line-clamp-4 md:line-clamp-none">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-3">
            {project.techStack.map((tech: string) => (
              <span 
                key={tech} 
                className="px-4 py-2 border border-black/10 rounded-full text-xs md:text-sm font-medium text-black/70 hover:border-black/30 hover:bg-black/5 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-white order-1 md:order-2 border-b md:border-b-0 md:border-l border-black/5">
          <motion.div className="w-full h-full relative flex items-center justify-center p-4 cursor-pointer" style={{ scale: imageScale }} onClick={() => onSelect(project)}>
            <Image 
              src={`/project images/${project.image}`} 
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain object-center" 
              alt={project.title} 
              priority={index < 2}
            />
          </motion.div>
        </div>
      </motion.article>
    </div>
  );
};

// ============================================
// MAIN PROJECTS SECTION COMPONENT
// ============================================

export default function ProjectsSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  // Lock body scroll when project is expanded
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  return (
    <section
      id="projects"
      className="relative w-full bg-[#FAFAFA] text-[#111111] pb-32"
      aria-label="Selected Projects by Abhay Mallick"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Section Header */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 pt-32 md:pt-48 mb-8 md:mb-16">
        <div className="flex flex-col justify-center items-center gap-6 text-center">
          <div className="text-sm md:text-base font-bold tracking-widest uppercase text-blue-600 flex items-center justify-center gap-4">
            <div className="w-8 h-[2px] bg-blue-600" />
            <span>06 &mdash; Selected Projects</span>
            <div className="w-8 h-[2px] bg-blue-600" />
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans tracking-tighter font-semibold max-w-4xl leading-tight">
            Architecting bespoke digital masterpieces.
          </h2>
        </div>
      </div>

      {/* Stacking Cards Container */}
      <div ref={containerRef} className="relative z-10 w-full mt-16" style={{ height: `${projects.length * 100}vh` }}>
        {projects.map((project, index) => {
          const targetScale = 1 - ((projects.length - index) * 0.05);
          return (
            <Card 
              key={index} 
              index={index} 
              project={project} 
              progress={scrollYProgress} 
              targetScale={targetScale} 
              total={projects.length} 
              onSelect={setSelectedProject}
            />
          );
        })}
      </div>

      {/* Selected Project Full-Screen Expanded Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-hidden select-none">
            {/* Backdrop overlay with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xl cursor-zoom-out"
            />

            {/* Modal Window Card */}
            <motion.article
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-5xl h-[85vh] max-h-[700px] bg-white rounded-[2rem] md:rounded-[3rem] shadow-[0_30px_90px_rgba(0,0,0,0.35)] border border-black/5 overflow-hidden flex flex-col md:flex-row z-10 select-text"
              aria-label={`Expanded Project Showcase: ${selectedProject.title}`}
            >
              {/* Floating Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full border border-black/15 bg-white/90 backdrop-blur-md flex items-center justify-center text-zinc-500 hover:text-black hover:scale-110 hover:shadow-md transition-all cursor-pointer z-50 shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              {/* Left Side: Large Project Image Showcase */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-zinc-50 border-b md:border-b-0 md:border-r border-black/5 flex items-center justify-center p-6 md:p-12 select-none">
                {/* Grid overlay for a high-end blueprint style */}
                <div
                  className="absolute inset-0 opacity-[0.035] pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                
                <div className="w-full h-full relative flex items-center justify-center p-4">
                  <Image
                    src={`/project images/${selectedProject.image}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain object-center drop-shadow-[0_15px_30px_rgba(0,0,0,0.08)]"
                    alt={selectedProject.title}
                    priority
                  />
                </div>
              </div>

              {/* Right Side: Scrollable Details Panel */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-12 lg:p-14 flex flex-col justify-between overflow-y-auto bg-white select-text">
                <div>
                  {/* Type tag + Year indicator */}
                  <div className="flex items-center gap-4 mb-4 select-none">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100/50">
                      {selectedProject.type}
                    </span>
                    <span className="text-xs font-mono text-black/35 font-semibold">
                      {selectedProject.year}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 tracking-tight leading-none mb-4 md:mb-6 uppercase">
                    {selectedProject.title}
                  </h2>

                  {/* Divider */}
                  <div className="w-12 h-[2px] bg-blue-600 mb-6" />

                  {/* Extended Description Body */}
                  <p className="text-sm leading-relaxed text-zinc-600 mb-8 max-w-md">
                    {selectedProject.description}
                  </p>

                  {/* Tech Stack List */}
                  <div className="mb-8">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3.5 select-none">
                      Technologies Wielded
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-3.5 py-1.5 border border-zinc-200 rounded-full text-xs font-medium text-zinc-600 select-all hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Premium Actions Row */}
                <div className="flex items-center gap-3.5 pt-6 border-t border-zinc-100 flex-wrap">
                  {/* Play Live / Launch Button */}
                  {selectedProject.liveUrl ? (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-6 py-3 bg-blue-600 text-white rounded-full font-bold uppercase tracking-wider text-[10.5px] hover:scale-105 hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      <span>Play Live</span>
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-2.5 px-6 py-3 bg-zinc-100 text-zinc-400 rounded-full font-bold uppercase tracking-wider text-[10.5px] cursor-not-allowed border border-zinc-200/50">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" opacity="0.3"/></svg>
                      <span>Private Demo</span>
                    </div>
                  )}

                  {/* GitHub Button */}
                  {selectedProject.githubUrl ? (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#111111] text-white rounded-full font-bold uppercase tracking-wider text-[10.5px] hover:scale-105 hover:bg-blue-600 hover:shadow-lg transition-all duration-300"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                      <span>GitHub Code</span>
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-2.5 px-6 py-3 bg-zinc-100 text-zinc-400 rounded-full font-bold uppercase tracking-wider text-[10.5px] cursor-not-allowed border border-zinc-200/50">
                      <span>Private Code</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
