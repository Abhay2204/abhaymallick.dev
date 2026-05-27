'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const MobileChatbot = dynamic(() => import('@/components/MobileChatbot'), { ssr: false });
const DesktopPortfolio = dynamic(() => import('@/components/DesktopPortfolio'), { ssr: false });

export default function Home() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check immediately on mount
    
    // We only need to check on resize if we want it to adapt. 
    // Usually, reloading the page is preferred for such extreme layout changes, 
    // but a listener is fine.
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Return a blank screen (or loading state) while measuring to prevent hydration mismatch
  if (isMobile === null) {
    return <div className="min-h-screen bg-white" />;
  }

  // If mobile, load ONLY the chatbot. No heavy canvas frames!
  if (isMobile) {
    return <MobileChatbot />;
  }

  // Otherwise, load the full high-end desktop portfolio
  return <DesktopPortfolio />;
}
