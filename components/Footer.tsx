'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
);
const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
);
import gsap from 'gsap';

const CONTACT = {
  email: 'abhaymallick.dev@gmail.com',
  phone: '+91 84218 22204',
  github: 'https://github.com/Abhay2204',
  linkedin: 'https://www.linkedin.com/in/abhaymallick2002',
  instagram: 'https://www.instagram.com/abhay_as_u_like_it/',
  location: 'Chandrapur, Maharashtra, India',
  timezone: 'IST (Asia/Kolkata)',
};

const MARQUEE_TEXT = "LET'S COLLABORATE · OPEN TO WORK · FULL STACK · UI/UX · MOBILE APPS · AI SOLUTIONS · ";

function SocialLink({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 14px',
        borderRadius: '12px',
        textDecoration: 'none',
        color: 'rgba(0,0,0,0.6)',
        transition: 'all 0.25s ease',
        border: '1px solid transparent',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(0,0,0,0.03)';
        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)';
        e.currentTarget.style.color = '#2563eb';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.borderColor = 'transparent';
        e.currentTarget.style.color = 'rgba(0,0,0,0.6)';
      }}
    >
      <Icon style={{ width: 18, height: 18, flexShrink: 0 }} />
      <span style={{ fontSize: '0.8125rem', fontWeight: 600, flex: 1 }}>{label}</span>
      <ArrowUpRight style={{ width: 14, height: 14, opacity: 0.4 }} />
    </motion.a>
  );
}

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const currentYear = new Date().getFullYear();
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      setTimeString(formatter.format(new Date()));
    };
    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isInView || !headingRef.current) return;
    const chars = headingRef.current.querySelectorAll('.ftr-char');
    gsap.fromTo(chars,
      { y: 80, opacity: 0, rotateX: -40 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.02, ease: 'power3.out' }
    );
  }, [isInView]);

  const renderChars = (text: string, accent?: boolean) =>
    text.split('').map((ch, i) => (
      <span key={i} className="ftr-char"
        style={{
          display: ch === ' ' ? 'inline' : 'inline-block',
          opacity: 0,
          color: accent ? '#2563eb' : undefined,
        }}>
        {ch === ' ' ? '\u00A0' : ch}
      </span>
    ));

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ftrMarquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes ftrPulse { 0%{transform:translate(-50%,-50%) scale(1);opacity:.6} 100%{transform:translate(-50%,-50%) scale(3);opacity:0} }
        @keyframes ftrBlink { 0%,100%{opacity:1} 50%{opacity:.3} }
      `}} />

      <footer ref={sectionRef} id="contact"
        aria-label="Contact Abhay Mallick — Full Stack Developer"
        style={{ position: 'relative', width: '100%', background: '#FAFAFA', color: '#111111', overflow: 'hidden' }}
        itemScope
        itemType="https://schema.org/ContactPage"
      >

        {/* Noise */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.02,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '128px 128px',
        }} />

        {/* Marquee */}
        <div style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', borderTop: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden', padding: '20px 0', background: '#ffffff' }}>
          <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'ftrMarquee 25s linear infinite' }}>
            {[0,1,2,3].map(i => (
              <span key={i} style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(0,0,0,0.12)',
                paddingRight: 16,
                flexShrink: 0,
              }}>{MARQUEE_TEXT}</span>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1440, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>

          {/* Label */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 16,
            paddingTop: 'clamp(80px, 12vw, 120px)', marginBottom: 32,
            fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: '#2563eb',
          }}>
            <span>08</span>
            <div style={{ width: 32, height: 2, background: '#2563eb' }} />
            <span>Get In Touch</span>
          </div>

          {/* Heading */}
          <h2 ref={headingRef} style={{
            fontSize: 'clamp(2.8rem, 8vw, 7rem)', fontWeight: 900,
            letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: 40,
            perspective: '600px', color: '#111111',
          }}>
            {renderChars("Let's build")}<br />
            {renderChars("something", true)}<br />
            {renderChars("remarkable.")}
          </h2>

          {/* CTA Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 'clamp(60px, 8vw, 100px)' }}>
            <motion.a href={`mailto:${CONTACT.email}`}
              whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 12,
                padding: '16px 32px', borderRadius: 999,
                background: '#2563eb', color: '#fff',
                fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.12em', textDecoration: 'none', cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(37,99,235,0.2)',
                transition: 'all 0.3s ease',
              }}>
              <Mail style={{ width: 16, height: 16 }} />
              <span>Send a Message</span>
              <ArrowUpRight style={{ width: 16, height: 16 }} />
            </motion.a>

            <motion.a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
              whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                padding: '16px 32px',
                borderRadius: 999,
                background: 'transparent',
                color: 'rgba(0,0,0,0.7)',
                border: '1px solid rgba(0,0,0,0.1)',
                fontSize: '0.8125rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(0,0,0,0.03)';
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)';
              }}
            >
              <Phone style={{ width: 16, height: 16 }} />
              <span>{CONTACT.phone}</span>
            </motion.a>
          </div>

          {/* Bento Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 20, marginBottom: 80,
          }}>

            {/* MAP CARD */}
            <div style={{
              borderRadius: 24, overflow: 'hidden',
              border: '1px solid rgba(0,0,0,0.08)',
              background: '#ffffff', minHeight: 380, position: 'relative',
              boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
            }}>
              {/* Glow */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%', width: 250, height: 250,
                transform: 'translate(-50%,-50%)',
                background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 75%)',
                pointerEvents: 'none', zIndex: 2,
              }} />

              <iframe
                title="Location - Chandrapur, Maharashtra"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119743.5!2d79.2298!3d19.9504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd2dc50b4e3e4b7%3A0x7b1e4e5a2f0d2b1a!2sChandrapur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000!5m2!1sen!2sin"
                style={{
                  width: '100%', height: '100%', minHeight: 380, border: 'none',
                  filter: 'grayscale(0.9) contrast(1.1) brightness(0.98)',
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Pulsing pin */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 3 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'rgba(37,99,235,0.15)',
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%,-50%)',
                  animation: 'ftrPulse 2s ease-out infinite',
                }} />
                <div style={{
                  width: 12, height: 12, borderRadius: '50%',
                  background: '#2563eb', border: '2px solid #fff',
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%,-50%)',
                  boxShadow: '0 0 15px rgba(37,99,235,0.4)',
                }} />
              </div>

              {/* Location label */}
              <div style={{
                position: 'absolute', bottom: 20, left: 20, zIndex: 3,
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 14px', borderRadius: 8,
                background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: 'rgba(0,0,0,0.7)',
              }}>
                <MapPin style={{ width: 12, height: 12, color: '#2563eb' }} />
                <span>Chandrapur, MH</span>
              </div>
            </div>

            {/* INFO CARDS COLUMN */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Contact Card */}
              <div style={{
                background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: 24, padding: 28, display: 'flex', flexDirection: 'column', gap: 16,
                boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
              }}>
                <h4 style={{
                  fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase',
                  letterSpacing: '0.2em', color: 'rgba(0,0,0,0.3)', marginBottom: 4,
                }}>Contact</h4>

                {[
                  { href: `mailto:${CONTACT.email}`, Icon: Mail, text: CONTACT.email },
                  { href: `tel:${CONTACT.phone.replace(/\s/g,'')}`, Icon: Phone, text: CONTACT.phone },
                  { href: undefined, Icon: MapPin, text: CONTACT.location },
                ].map((item, i) => {
                  const El = item.href ? 'a' : 'address';
                  return (
                    <El key={i} href={item.href as string} target={item.href?.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        fontSize: '0.8125rem', color: 'rgba(0,0,0,0.65)',
                        textDecoration: 'none', transition: 'color 0.2s, transform 0.2s',
                        fontStyle: 'normal',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = '#2563eb';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'rgba(0,0,0,0.65)';
                      }}
                    >
                      <item.Icon style={{ width: 16, height: 16, color: '#2563eb', flexShrink: 0 }} />
                      <span style={{ fontWeight: 550 }}>{item.text}</span>
                    </El>
                  );
                })}

                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  fontSize: '0.75rem', color: 'rgba(0,0,0,0.4)',
                  paddingTop: 8, borderTop: '1px solid rgba(0,0,0,0.05)',
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%', background: '#22c55e',
                    flexShrink: 0, boxShadow: '0 0 8px rgba(34,197,94,0.5)',
                    animation: 'ftrBlink 2s ease-in-out infinite',
                  }} />
                  <span style={{ fontWeight: 500 }}>{CONTACT.timezone}</span>
                </div>
              </div>

              {/* Socials Card */}
              <div style={{
                background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: 24, padding: 28, display: 'flex', flexDirection: 'column', gap: 8, flex: 1,
                boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
              }}>
                <h4 style={{
                  fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase',
                  letterSpacing: '0.2em', color: 'rgba(0,0,0,0.3)', marginBottom: 4,
                }}>Socials</h4>
                <SocialLink href={CONTACT.github} icon={GithubIcon} label="GitHub" />
                <SocialLink href={CONTACT.linkedin} icon={LinkedinIcon} label="LinkedIn" />
                <SocialLink href={CONTACT.instagram} icon={InstagramIcon} label="Instagram" />
              </div>
            </div>
          </div>

          {/* Bottom Map, Links & Status (Premium Bento Grid) */}
          <div style={{
            borderTop: '1px solid rgba(0,0,0,0.08)',
            paddingTop: '60px',
            paddingBottom: '40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px',
            fontSize: '0.8125rem',
            color: '#555555',
          }}>
            {/* COLUMN A: Dynamic Localized Clock & Availability */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h5 style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.3)' }}>Status & Time</h5>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%', background: '#22c55e',
                  boxShadow: '0 0 10px rgba(34,197,94,0.6)',
                  animation: 'ftrBlink 2s ease-in-out infinite',
                }} />
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Available for Freelance
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: 'rgba(0,0,0,0.55)', fontSize: '0.8125rem' }}>
                <div>
                  <span style={{ fontWeight: 650, color: '#111111' }}>Chandrapur, MH, India</span>
                </div>
                <div>
                  <span>Local Time: </span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#2563eb', background: 'rgba(37,99,235,0.05)', padding: '2px 6px', borderRadius: '4px' }}>
                    {timeString || '09:52 AM'}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.35)', fontWeight: 600, marginLeft: '6px' }}>IST (UTC+5:30)</span>
                </div>
              </div>
            </div>

            {/* COLUMN B: Symmetrical Swiss Navigation Map */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h5 style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.3)' }}>Explore Index</h5>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px' }}>
                {[
                  { name: '01 · Home', href: '#hero' },
                  { name: '02 · About', href: '#about' },
                  { name: '03 · Skills', href: '#skills' },
                  { name: '04 · Experience', href: '#timeline' },
                  { name: '05 · Projects', href: '#projects' },
                  { name: '06 · UI/UX Gallery', href: '#gallery' }
                ].map(link => (
                  <a
                    key={link.name}
                    href={link.href}
                    style={{
                      textDecoration: 'none',
                      color: 'rgba(0,0,0,0.6)',
                      fontWeight: 600,
                      fontSize: '0.8125rem',
                      transition: 'all 0.2s ease',
                      display: 'inline-block'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = '#2563eb';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'rgba(0,0,0,0.6)';
                      e.currentTarget.style.transform = 'none';
                    }}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* COLUMN C: Smooth Return-To-Top Trigger */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
              <h5 style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.3)' }}>Navigation</h5>
              
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 22px',
                  borderRadius: '999px',
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.08)',
                  color: '#111111',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(37,99,235,0.2)';
                  e.currentTarget.style.color = '#2563eb';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,99,235,0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)';
                  e.currentTarget.style.color = '#111111';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.03)';
                }}
              >
                <span>Back To Top</span>
                <svg style={{ width: '14px', height: '14px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
              </motion.button>

              <span style={{ fontSize: '0.6875rem', color: 'rgba(0,0,0,0.3)', fontWeight: 600, letterSpacing: '0.05em' }}>
                © {currentYear} ABHAY MALLICK · ALL RIGHTS RESERVED
              </span>
            </div>
          </div>

          {/* Monolith Typographic Watermark Signature */}
          <div style={{ 
            textAlign: 'center', 
            borderTop: '1px solid rgba(0,0,0,0.05)',
            paddingTop: '20px',
            paddingBottom: '20px',
            userSelect: 'none',
            overflow: 'hidden'
          }}>
            <span style={{
              display: 'block',
              fontSize: 'clamp(3rem, 11vw, 12rem)',
              fontWeight: 950,
              letterSpacing: '-0.05em',
              lineHeight: '0.8',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.025)',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Abhay Mallick
            </span>
          </div>

        </div>
      </footer>
    </>
  );
}

