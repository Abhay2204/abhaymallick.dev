'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

// ============================================
// DATA
// ============================================

const projects = [
  {
    title: "Cosmic IDE",
    year: "2025",
    type: "Development Tool",
    techStack: ["React", "Node.js", "Electron", "Gemini API"],
    description: "A professional-grade, AI-native IDE engineered for high-end development. Features integrated multi-language debugging, live code execution, robust extension ecosystem, and advanced AI agents.",
    image: "cosmic ide.png",
    githubUrl: "https://github.com/Abhay2204/Cosmic-IDE"
  },
  {
    title: "TAFE CRM",
    year: "2025",
    type: "Enterprise CRM",
    techStack: ["React", "Node.js", "PostgreSQL"],
    description: "Tailored CRM solution for TAFE institutions — streamlining student enrollment, course management, and staff workflows with a clean, intuitive interface.",
    image: "tafeCrm.png",
    githubUrl: null
  },
  {
    title: "Nexus AI Task",
    year: "2025",
    type: "AI Task Manager",
    techStack: ["Next.js", "Gemini", "Supabase", "Tailwind"],
    description: "AI-powered task manager featuring Strict Focus Mode, intelligent task breakdown, smart time allocation, priority scheduling, and deep productivity analytics.",
    image: "nexus ai task commander.png",
    githubUrl: null
  },
  {
    title: "InsightFlow",
    year: "2023",
    type: "AI Analytics",
    techStack: ["React", "Gemini API", "Recharts"],
    description: "Transform raw data into actionable insights with AI-driven dashboards, custom reports, and predictive analytics.",
    image: "insightflow.png",
    githubUrl: null
  },
  {
    title: "CodeX DSA",
    year: "2023",
    type: "Education Platform",
    techStack: ["React Native", "Vue.js"],
    description: "Interactive DSA learning platform with visual algorithms, practice problems, and progress tracking.",
    image: "dsa guru.png",
    githubUrl: "https://github.com/Abhay2204/codex"
  },
  {
    title: "Health Track",
    year: "2022",
    type: "Lifestyle App",
    techStack: ["MERN Stack"],
    description: "Personal health companion with activity tracking, meal planning, sleep analysis, and AI wellness recommendations.",
    image: "health_track_new.jpg",
    githubUrl: null
  },
  {
    title: "NE CRM",
    year: "2024",
    type: "Enterprise Software",
    techStack: ["React", "Node.js", "Supabase"],
    description: "Enterprise-grade CRM with automated workflows, predictive analytics, and team collaboration tools for scaling businesses.",
    image: "ne crm.png",
    githubUrl: null
  },
  {
    title: "SmartCity",
    year: "2024",
    type: "Web Application",
    techStack: ["HTML", "CSS", "JS", "Node.js"],
    description: "SmartCity is a comprehensive web application designed to modernize urban living through digital governance, data-driven decision making, and smart services for citizens. Features Citizen Complaint Systems, Smart Dashboards, and an AI Health Chatbot.",
    image: "smartcity.jpg",
    githubUrl: "https://github.com/Abhay2204/SmartCity"
  },
  {
    title: "Beyond Bark",
    year: "2024",
    type: "Mobile App",
    techStack: ["Kotlin", "Jetpack Compose", "Firebase", "Netmind API"],
    description: "AI-powered mobile app designed to improve the lives of pets and their humans. Leverages modern AI to provide mood detection, species identification, disease detection, and a rescue system for abandoned animals.",
    image: "beyond_bark.jpg",
    githubUrl: "https://github.com/Abhay2204/Beyond-bark"
  }
];

// ============================================
// CARD COMPONENT
// ============================================

const Card = ({ index, project, progress, targetScale, total }: any) => {
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
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-10 gap-4">
              <span className="text-2xl md:text-3xl font-mono text-black/30 font-light">
                0{index + 1}
              </span>
              {project.githubUrl ? (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center w-fit gap-2 px-5 py-2.5 bg-[#111111] text-white rounded-full font-semibold uppercase tracking-wider text-xs md:text-sm hover:scale-105 hover:bg-blue-600 hover:shadow-lg transition-all duration-300"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                  <span>GitHub</span>
                </a>
              ) : (
                <div className="inline-flex items-center w-fit gap-2 px-5 py-2.5 bg-black/5 text-black/40 rounded-full font-semibold uppercase tracking-wider text-xs md:text-sm cursor-not-allowed">
                  <span>Private Code</span>
                </div>
              )}
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
          <motion.div className="w-full h-full relative flex items-center justify-center p-4" style={{ scale: imageScale }}>
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
            />
          );
        })}
      </div>
    </section>
  );
}
