import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import TimelineSection from '@/components/TimelineSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExpertiseSection from '@/components/ExpertiseSection';
import UiUxGallery from '@/components/UiUxGallery';
import Footer from '@/components/Footer';
import DesktopChatbot from '@/components/DesktopChatbot';

export default function DesktopPortfolio() {
  return (
    <main className="min-h-screen bg-white relative">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <TimelineSection />
      <ProjectsSection />
      <ExpertiseSection />
      <UiUxGallery />
      <Footer />
      <DesktopChatbot />
    </main>
  );
}
