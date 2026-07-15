'use client';

import { useEffect, useState, ComponentType } from 'react';

export default function Home() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [forceDesktop, setForceDesktop] = useState<boolean>(false);
  const [ActiveComponent, setActiveComponent] = useState<ComponentType<{ onSwitchToDesktop: () => void }> | null>(null);

  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768;
    const mobileStatus = checkMobile();
    
    // Defer state update to avoid synchronous setState inside useEffect
    const timer = setTimeout(() => {
      setIsMobile(mobileStatus);
    }, 0);

    if (mobileStatus && !forceDesktop) {
      // Dynamic import mobile chatbot only on mobile
      import('@/components/MobileChatbot').then((mod) => {
        setActiveComponent(() => mod.default);
      });
    } else {
      // Dynamic import desktop portfolio only on desktop
      import('@/components/DesktopPortfolio').then((mod) => {
        setActiveComponent(() => mod.default);
      });
    }

    const handleResize = () => {
      if (forceDesktop) return; // Don't trigger resize reload when forcing desktop
      const currentMobile = checkMobile();
      if (currentMobile !== mobileStatus) {
        window.location.reload(); // Clean reload for layout calibration
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [forceDesktop]);

  // Return a blank screen while measuring to prevent hydration mismatch
  if (isMobile === null || !ActiveComponent) {
    return <div className="min-h-screen bg-[#111]" />;
  }

  return (
    <>
      <ActiveComponent onSwitchToDesktop={() => setForceDesktop(true)} />
      {forceDesktop && (
        <button 
          onClick={() => setForceDesktop(false)} 
          className="fixed top-4 right-4 z-[9999] bg-[#111] text-white border border-white/20 px-3.5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-2xl flex items-center gap-1.5"
        >
          <span>📱</span> Switch to Mobile
        </button>
      )}
    </>
  );
}
