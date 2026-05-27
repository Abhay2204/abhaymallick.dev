'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const expertiseAreas = [
  {
    id: "01",
    title: "UI/UX Design",
    subtitle: "Pixel-Perfect Interfaces",
    description: "Crafting visually stunning, Swiss-inspired interfaces that balance aesthetics with intuitive usability. Every pixel intentional, every interaction deliberate.",
    tags: ["Figma", "Prototyping", "Design Systems", "Typography"]
  },
  {
    id: "02",
    title: "Full Stack Dev",
    subtitle: "Next.js, Express, MongoDB, React",
    description: "Engineering robust end-to-end solutions. From highly performant React interfaces to scalable Node.js/Express backends — production-ready by design.",
    tags: ["Next.js", "React", "Node.js", "MongoDB", "PostgreSQL"]
  },
  {
    id: "03",
    title: "Mobile Apps",
    subtitle: "Kotlin & Jetpack Compose",
    description: "Building native Android experiences with modern declarative UI. Smooth, performant, and architecturally sound mobile applications.",
    tags: ["Kotlin", "Jetpack Compose", "Android", "Firebase"]
  },
  {
    id: "04",
    title: "AI Solutions",
    subtitle: "Intelligent Integrations",
    description: "Embedding AI into real products — from intelligent chatbots and task orchestration to vision-based detection and predictive analytics engines.",
    tags: ["Gemini API", "LLMs", "AI Agents", "Vision AI"]
  },
  {
    id: "05",
    title: "API & Analytics",
    subtitle: "Data-Driven Architecture",
    description: "Designing RESTful APIs, real-time data pipelines, and analytics dashboards that surface actionable intelligence from complex datasets.",
    tags: ["REST API", "Supabase", "Analytics", "SQL"]
  },
  {
    id: "06",
    title: "System Design",
    subtitle: "Scalable Infrastructure",
    description: "Architecting distributed systems with scalability and fault-tolerance in mind. From database schemas to cloud deployment on AWS.",
    tags: ["AWS", "Docker", "Microservices", "Git"]
  }
];

export default function ExpertiseSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="expertise"
      className="relative w-full bg-[#FAFAFA] text-[#111111] overflow-hidden"
      aria-label="Core Expertise of Abhay Mallick"
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }}
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">

        {/* Header */}
        <div className="pt-32 md:pt-48 pb-20 md:pb-28 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <div className="text-sm font-bold tracking-widest uppercase text-blue-600 flex items-center gap-4 mb-6">
              <span>05</span>
              <div className="w-8 h-[2px] bg-blue-600" />
              <span>Core Expertise</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter max-w-2xl leading-tight">
              What I do<br />exceptionally well.
            </h2>
          </div>
          <p className="text-base md:text-lg text-black/40 max-w-sm leading-relaxed">
            Six areas of deep specialization, refined over 2+ years of production-grade delivery.
          </p>
        </div>

        {/* Rows */}
        <div className="flex flex-col pb-32 md:pb-48">
          {expertiseAreas.map((area, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={area.id}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                className="relative border-t border-black/10 last:border-b last:border-black/10 cursor-default overflow-hidden"
              >
                {/* Black fill — scaleY curtain from center, stays within the row */}
                <motion.div
                  aria-hidden
                  className="absolute inset-0 bg-[#111111] rounded-xl z-0 pointer-events-none"
                  initial={false}
                  animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originY: "50%" }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-6 py-8 md:py-10 lg:py-12 px-2 md:px-4">

                  {/* Number */}
                  <span
                    className="text-sm font-mono font-bold w-10 shrink-0 transition-colors duration-300"
                    style={{ color: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)' }}
                  >
                    /{area.id}
                  </span>

                  {/* Title + Subtitle */}
                  <div className="lg:w-[38%] shrink-0">
                    <h3
                      className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none transition-colors duration-300"
                      style={{ color: isActive ? '#ffffff' : '#111111' }}
                    >
                      {area.title}
                    </h3>
                    <p
                      className="mt-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300"
                      style={{ color: isActive ? '#60a5fa' : '#2563eb' }}
                    >
                      {area.subtitle}
                    </p>
                  </div>

                  {/* Description — always rendered, no height shift */}
                  <div className="flex-1 hidden lg:block">
                    <p
                      className="text-sm md:text-base leading-relaxed line-clamp-2 transition-colors duration-300"
                      style={{ color: isActive ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.4)' }}
                    >
                      {area.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {area.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium border rounded-full transition-colors duration-300"
                          style={{
                            borderColor: isActive ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)',
                            color: isActive ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="shrink-0 ml-auto">
                    <motion.div
                      animate={{ rotate: isActive ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="w-9 h-9 flex items-center justify-center rounded-full border transition-colors duration-300"
                      style={{
                        borderColor: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
                        color: isActive ? '#ffffff' : '#111111'
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M2 10L10 2M10 2H4M10 2v6" />
                      </svg>
                    </motion.div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
