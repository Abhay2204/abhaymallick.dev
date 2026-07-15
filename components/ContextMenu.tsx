'use client';

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ContextMenu() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      // Disallow custom menus on form inputs or editable items
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        target.closest('input') ||
        target.closest('textarea')
      ) {
        return;
      }

      e.preventDefault();
      setPosition({ x: e.clientX, y: e.clientY });
      setCoords({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleClose = () => {
      setVisible(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setVisible(false);
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('click', handleClose);
    window.addEventListener('scroll', handleClose, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('click', handleClose);
      window.removeEventListener('scroll', handleClose);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavClick = (item: { label: string; selector?: string; href?: string }) => {
    if (item.href) {
      router.push(item.href);
    } else if (item.selector) {
      const target = document.querySelector(item.selector);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setVisible(false);
  };

  // Adjust positions so menu doesn't overflow screen viewport boundaries
  useLayoutEffect(() => {
    if (!visible) return;
    const menu = menuRef.current;
    if (!menu) return;
    const adjustedX = Math.min(position.x, window.innerWidth - menu.offsetWidth - 20);
    const adjustedY = Math.min(position.y, window.innerHeight - menu.offsetHeight - 20);
    setCoords({ x: adjustedX, y: adjustedY });
  }, [visible, position]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          style={{
            position: 'fixed',
            left: coords.x,
            top: coords.y,
            zIndex: 9999,
          }}
          className="w-56 bg-white/90 backdrop-blur-md border border-black/10 rounded-2xl p-2.5 shadow-[0_15px_40px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.04)] select-none"
        >
          {/* Header */}
          <span className="block text-[8.5px] font-black tracking-[0.2em] text-black/35 px-3 py-1.5 border-b border-black/5 mb-1.5 uppercase">
            Portfolio Navigator
          </span>

          {/* Nav Items */}
          <div className="flex flex-col gap-0.5">
            {[
              { label: '01 · Home', selector: '#hero' },
              { label: '02 · About', selector: '#about' },
              { label: '03 · Skills', selector: '#skills' },
              { label: '04 · Experience', selector: '#timeline' },
              { label: '05 · Projects', selector: '#projects' },
              { label: '06 · UI/UX Gallery', selector: '#gallery' },
              { label: '07 · Contact', selector: '#contact' },
              { label: '08 · Blog Feed', href: '/blog' },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="group w-full flex items-center justify-between px-3 py-2 text-left text-xs font-bold uppercase tracking-wider text-black/60 hover:text-blue-600 hover:bg-black/5 transition-all rounded-lg duration-200 cursor-pointer border-none"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-blue-600" />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
