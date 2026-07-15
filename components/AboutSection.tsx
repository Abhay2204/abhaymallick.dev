'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Blocks, Layers, Server, Braces, Database, Cloud, PenTool, Triangle } from 'lucide-react';
import { LogoCloud } from '@/components/ui/logo-cloud-3';

// ============================================
// UTILITY COMPONENTS
// ============================================

// SwissGrid Component
interface SwissGridProps {
  children: React.ReactNode;
  className?: string;
}

function SwissGrid({ children, className = '' }: SwissGridProps) {
  return (
    <div className={`grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8 w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}

// ============================================
// HYPER TEXT COMPONENT
// ============================================

const SCRAMBLE_SPEED = 10;
const CYCLES_PER_LETTER = 3;
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";

interface WordProps {
  children: string;
  isDimmed: boolean;
  isHighlightable: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const Word = ({
  children,
  isDimmed,
  isHighlightable,
  onHoverStart,
  onHoverEnd,
}: WordProps) => {
  const [displayText, setDisplayText] = useState(children);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const scramble = useCallback(() => {
    let pos = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const scrambled = children
        .split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) return char;
          const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          return randomChar;
        })
        .join("");

      setDisplayText(scrambled);
      pos++;

      if (pos >= children.length * CYCLES_PER_LETTER) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(children);
      }
    }, SCRAMBLE_SPEED);
  }, [children]);

  const stopScramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(children);
  }, [children]);

  const handleMouseEnter = () => {
    if (isHighlightable) {
      setIsHovered(true);
      onHoverStart();
      scramble();
    }
  };

  const handleMouseLeave = () => {
    if (isHighlightable) {
      setIsHovered(false);
      onHoverEnd();
      stopScramble();
    }
  };

  return (
    <motion.span
      className={`
        relative inline-block font-mono font-medium whitespace-nowrap
        ${isHighlightable ? "cursor-pointer" : "cursor-default"}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        scale: isHovered ? 1.1 : 1,
        y: isHovered ? -4 : 0,
        opacity: isDimmed && !isHovered ? 0.3 : 1,
        filter: isDimmed && !isHovered ? "blur(2px)" : "blur(0px)",
        color: isHovered ? "#FFFFFF" : isHighlightable ? "#2563eb" : "#111111",
        zIndex: isHovered ? 20 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.span
            className="absolute -inset-2 rounded-lg bg-black z-[-1]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            layoutId="hover-bg"
            style={{
              boxShadow:
                "0px 10px 25px -5px rgba(37, 99, 235, 0.4), 0px 8px 10px -6px rgba(0, 0, 0, 0.1)",
            }}
          />
        )}
      </AnimatePresence>

      <span className="relative z-10 px-1">{displayText}</span>

      <AnimatePresence>
        {isHovered && (
          <>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full z-20"
            />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-500 rounded-full z-20"
            />
          </>
        )}
      </AnimatePresence>
    </motion.span>
  );
};

interface HyperTextProps {
  text: string;
  className?: string;
  highlightWords?: string[];
}

function HyperTextParagraph({
  text,
  className = "",
  highlightWords = [],
}: HyperTextProps) {
  const [isParagraphHovered, setIsParagraphHovered] = useState(false);

  const words = text.split(" ");

  const clean = (w: string) => w.toLowerCase().replace(/[^a-z0-9]/g, "");

  return (
    <div className={`leading-relaxed tracking-wide flex flex-wrap gap-y-1 ${className}`}>
      {words.map((word, i) => {
        const isHighlightable = highlightWords.some(
          (hw) => clean(hw) === clean(word)
        );

        return (
          <React.Fragment key={i}>
            <Word
              isDimmed={isParagraphHovered}
              isHighlightable={isHighlightable}
              onHoverStart={() => setIsParagraphHovered(true)}
              onHoverEnd={() => setIsParagraphHovered(false)}
            >
              {word}
            </Word>
            <span className="inline-block whitespace-pre"> </span>
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ============================================
// MAIN ABOUT SECTION COMPONENT
// ============================================

const techLogos = [
  { alt: "React", src: "/tech/react.svg" },
  { alt: "Next.js", src: "/tech/nextjs.svg" },
  { alt: "TypeScript", src: "/tech/typescript.svg" },
  { alt: "Tailwind CSS", src: "/tech/tailwindcss.svg" },
  { alt: "Vue.js", src: "/tech/vuejs.svg" },
  { alt: "GSAP", src: "/tech/gsap.svg" },
  { alt: "Node.js", src: "/tech/nodejs.svg" },
  { alt: "MongoDB", src: "/tech/mongodb.svg" },
  { alt: "PostgreSQL", src: "/tech/postgresql.svg" },
  { alt: "Android", src: "/tech/android.svg" },
  { alt: "Kotlin", src: "/tech/kotlin.svg" },
  { alt: "AWS", src: "/tech/aws.svg" },
  { alt: "Docker", src: "/tech/docker.svg" },
  { alt: "Git", src: "/tech/git.svg" },
  { alt: "Figma", src: "/tech/figma.svg" }
];

export default function AboutSection() {
  const bio = "I am Abhay_Mallick, a Computer Science Engineer and Full Stack Developer passionate about building robust web and mobile applications. From highly performant Next.js and React interfaces to scalable Node.js/Express backends, I turn complex problems into efficient, production-ready software.";

  const triggers = ["Abhay_Mallick", "Engineer", "Developer", "passionate", "Next.js", "React", "Node.js", "MongoDB", "AWS", "scalable"];

  return (
    <section
      id="about"
      className="relative w-full py-32 md:py-48 bg-[#FAFAFA] text-[#111111] overflow-hidden"
      aria-label="About Abhay Mallick"
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* Hidden Crawler-only SEO keywords block */}
      <div className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
        <h2>Abhay Mallick Developer &mdash; Full Stack Engineer</h2>
        <p>
          Abhay Mallick is an expert freelance software developer and coder. Providing client-centered Next.js, React, Node.js, and Express stack custom systems.
          Based in Chandrapur, Maharashtra.
        </p>
      </div>
      <meta itemProp="name" content="Abhay Mallick" />
      <meta itemProp="jobTitle" content="Full Stack Developer" />
      <meta itemProp="address" content="Chandrapur, Maharashtra, India" />
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-200/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-200/30 rounded-full blur-[120px]" />

        {/* Subtle Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <SwissGrid className="relative z-10">
        <div className="col-span-4 md:col-span-2 lg:col-span-3 mb-8 md:mb-0">
          <div className="text-sm md:text-base font-bold tracking-widest uppercase text-blue-600 flex items-center gap-4">
            <span>02</span>
            <div className="w-8 h-[2px] bg-blue-600" />
            <span>About</span>
          </div>
        </div>

        <div className="col-span-4 md:col-span-6 lg:col-span-9">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full relative"
          >
            {/* Main Content Card */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-[2rem] p-8 md:p-12 lg:p-16">
              <HyperTextParagraph
                text={bio}
                highlightWords={triggers}
                className="text-2xl md:text-3xl lg:text-4xl text-[#111111] font-normal"
              />
            </div>
          </motion.div>
        </div>
      </SwissGrid>

      <section className="relative w-full mt-24 md:mt-32">
        <h2 className="mb-10 text-center font-medium text-[#111111] text-xl tracking-tight md:text-3xl px-4">
          <span className="text-black/50">Trusted tools.</span>
          <br />
          <span className="font-semibold">Used by the Top Agencies & Competitors.</span>
        </h2>

        <div className="mx-auto my-5 h-px w-full max-w-4xl bg-black/10 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />

        <LogoCloud logos={techLogos} />

        <div className="mt-5 h-px w-full max-w-4xl mx-auto bg-black/10 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
      </section>
    </section>
  );
}
