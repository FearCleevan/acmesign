import HeroSection from '@/components/home/HeroSection'
import Ticker from '@/components/home/Ticker'
import AboutSection from '@/components/home/AboutSection'
import ServicesTabbed from '@/components/home/ServicesTabbed'
import ProjectsScroll from '@/components/home/ProjectsScroll'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import ContactSection from '@/components/home/ContactSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Ticker />
      <AboutSection />
      <ServicesTabbed />
      <ProjectsScroll />
      <TestimonialsSection />
      <ContactSection />
    </>
  )
}
