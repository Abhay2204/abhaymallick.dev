'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Search, ArrowLeft, RefreshCw, Layers } from 'lucide-react';
import Link from 'next/link';

interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}

interface BlogClientProps {
  initialArticles: Article[];
}

export default function BlogClient({ initialArticles }: BlogClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [articles] = useState<Article[]>(initialArticles);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const categories = ['All', 'AI & Robotics', 'Space & Aerospace', 'Software Dev'];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = 
      article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description?.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeCategory === 'All') return true;
    
    const textToSearch = `${article.title || ''} ${article.description || ''}`.toLowerCase();
    
    if (activeCategory === 'AI & Robotics') {
      return ["ai", "artificial intelligence", "robot", "openai", "gemini", "chatgpt", "machine learning", "neural", "gpu", "nvidia"].some(kw => textToSearch.includes(kw));
    }
    if (activeCategory === 'Space & Aerospace') {
      return ["space", "aerospace", "nasa", "spacex", "orbit", "mars", "rocket", "satellite", "starship", "cosmic"].some(kw => textToSearch.includes(kw));
    }
    if (activeCategory === 'Software Dev') {
      return ["programming", "software", "developer", "coding", "javascript", "python", "typescript", "git", "database", "rust", "react", "html"].some(kw => textToSearch.includes(kw));
    }
    return true;
  });

  const getRelativeTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      
      if (diffHrs < 1) {
        const diffMins = Math.floor(diffMs / (1000 * 60));
        return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
      }
      if (diffHrs < 24) {
        return `${diffHrs} hr${diffHrs !== 1 ? 's' : ''} ago`;
      }
      const diffDays = Math.floor(diffHrs / 24);
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } catch (e) {
      return 'Recently';
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#FAFAFA] text-[#111111] overflow-hidden relative pb-28 font-sans selection:bg-blue-600 selection:text-white"
    >
      {/* Interactive Mouse Follow Glow Spotlight */}
      <div 
        style={{
          position: 'absolute',
          left: mousePos.x,
          top: mousePos.y,
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(37,99,235,0.045) 0%, rgba(124,58,237,0.02) 45%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 1,
          borderRadius: '50%',
          filter: 'blur(55px)',
          transition: 'left 0.12s ease-out, top 0.12s ease-out',
        }}
      />

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] z-0"
        style={{
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* TOP NAVIGATION HEADER */}
      <header className="relative z-20 border-b border-black/5 bg-white/70 backdrop-blur-md sticky top-0">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 h-16 flex items-center justify-between">
          <Link 
            href="/"
            className="group flex items-center gap-2.5 text-[10px] font-black uppercase tracking-widest text-black/60 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Portfolio</span>
          </Link>
          
          <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-black/45 bg-blue-50/60 border border-blue-100/50 px-2.5 py-1 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488] animate-pulse" />
            <span>DAILY RADAR FEED ACTIVE</span>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 pt-16 md:pt-24 pb-12 border-b border-black/5 bg-[#FAFAFA]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col items-start">
            <div className="text-xs font-bold tracking-widest uppercase text-blue-600 flex items-center gap-3 mb-6">
              <span>Radar Console</span>
              <div className="w-8 h-[2px] bg-blue-600" />
              <span>Blog Page</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter max-w-3xl leading-[0.95] text-black">
              Daily Tech<br />
              Radar Feed.
            </h1>
            
            <p className="text-sm md:text-base text-black/40 mt-6 max-w-md leading-relaxed">
              Curated real-time feed tracking artificial intelligence, space discoveries, programming paradigms, and aerospace breakthroughs.
            </p>
          </div>

          {/* Stats / Status Box */}
          <div className="bg-white border border-black/5 p-6 rounded-2xl shadow-sm shrink-0 w-full md:w-80 flex flex-col gap-4 font-mono text-[10px] text-zinc-500">
            <div className="flex items-center justify-between border-b border-black/5 pb-2">
              <span className="font-bold uppercase tracking-wider text-black/40">Status</span>
              <span className="text-green-600 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                ONLINE
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-black/5 pb-2">
              <span className="font-bold uppercase tracking-wider text-black/40">Articles Count</span>
              <span className="text-black font-semibold">{articles.length} Loaded</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold uppercase tracking-wider text-black/40">Refresh Interval</span>
              <span className="text-blue-600 font-semibold flex items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                24 Hours
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER & SEARCH BAR */}
      <section className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Category selector pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10'
                    : 'bg-white text-black/50 border-black/5 hover:border-black/15 shadow-sm'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search bar input container */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/35" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search feed articles..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-black/5 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-600 transition-all text-[#111111] placeholder-zinc-300 shadow-sm"
          />
        </div>
      </section>

      {/* ARTICLES GRID CONTAINER */}
      <section className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        <AnimatePresence mode="wait">
          {filteredArticles.length > 0 ? (
            <motion.div 
              key="grid"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.05 } }
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredArticles.map((article, idx) => (
                <motion.article
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                  whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.04)', borderColor: 'rgba(37,99,235,0.15)' }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm flex flex-col h-[400px] hover:border-blue-600/15"
                >
                  {/* Thumbnail Image Header */}
                  <div className="h-44 bg-zinc-100 relative overflow-hidden flex items-center justify-center shrink-0 select-none border-b border-black/5">
                    {article.urlToImage ? (
                      <img 
                        src={article.urlToImage} 
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            const fallback = parent.querySelector('.fallback-gradient');
                            if (fallback) fallback.classList.remove('hidden');
                          }
                        }}
                      />
                    ) : null}
                    
                    {/* Fallback geometric gradient if image fails or is empty */}
                    <div className={`fallback-gradient absolute inset-0 bg-gradient-to-tr from-blue-50 to-indigo-100/40 flex items-center justify-center p-4 ${article.urlToImage ? 'hidden' : ''}`}>
                      <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 font-bold border border-blue-600/10">
                        <Layers className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Category Overlay Tag */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md border border-black/5 px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-wider text-black/60 shadow-sm">
                      {article.source.name}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex flex-col justify-between flex-1 min-w-0">
                    <div className="min-w-0">
                      {/* Meta Date */}
                      <span className="text-[9px] font-mono font-bold text-black/25 uppercase tracking-wider">
                        {getRelativeTime(article.publishedAt)}
                      </span>
                      
                      {/* Title */}
                      <h3 className="text-sm font-semibold tracking-tight text-[#111111] mt-2 mb-2 line-clamp-2 leading-snug">
                        {article.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-xs text-black/45 line-clamp-3 leading-relaxed">
                        {article.description}
                      </p>
                    </div>

                    {/* Bottom Direct CTA Link */}
                    <div className="pt-4 border-t border-black/5 mt-4 flex items-center justify-between shrink-0 select-none">
                      <span className="text-[9px] font-mono font-bold text-black/35 uppercase">
                        {article.author ? `By ${article.author.slice(0, 20)}` : 'Tech Radar'}
                      </span>
                      
                      <a 
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[9px] font-black uppercase tracking-widest text-[#1d4ed8] flex items-center gap-1 cursor-pointer group"
                      >
                        <span>Read Source</span>
                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center font-mono text-xs"
            >
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 text-blue-600">
                <Layers className="w-6 h-6 animate-pulse" />
              </div>
              <h4 className="text-sm font-bold font-sans text-[#111111] mb-1">No articles found</h4>
              <p className="text-[11px] font-sans text-black/40 max-w-[280px] leading-relaxed">
                Could not find articles matching &quot;{searchQuery}&quot; under {activeCategory}. Please try another criteria.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 mt-20 pt-8 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4 select-none font-mono text-[9px] text-black/30">
        <span>© {new Date().getFullYear()} ABHAY MALLICK · RADAR AGGREGATOR</span>
        <span>NEWS SERVICE POWERED BY NEWSAPI.ORG</span>
      </footer>
    </div>
  );
}
