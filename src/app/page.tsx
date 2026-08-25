import Hero from '@/components/sections/Hero';
import AboutPreview from '@/components/sections/AboutPreview';
import ServicesPreview from '@/components/sections/ServicesPreview';
import GlassParallaxSection from '@/components/sections/GlassParallaxSection';
import PortfolioPreview from '@/components/sections/PortfolioPreview';
import Testimonials from '@/components/sections/Testimonials';
import CTASection from '@/components/sections/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <GlassParallaxSection />
      <PortfolioPreview />
      <Testimonials />
      <CTASection />
    </>
  );
}
