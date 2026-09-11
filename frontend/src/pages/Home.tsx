import { HeroSection } from '@/components/features/home/HeroSection'
import { CourtsSection } from '@/components/features/home/CourtsSection'
import { AboutSection } from '@/components/features/home/AboutSection'
import { HowItWorksSection } from '@/components/features/home/HowItWorksSection'
import { FeaturesSection } from '@/components/features/home/FeaturesSection'
import { FaqSection } from '@/components/features/home/FaqSection'
import { CallToActionSection } from '@/components/features/home/CallToActionSection'

export function HomePage() {
  return (
    <div>
      <HeroSection />
      <CourtsSection />
      <AboutSection />
      <HowItWorksSection />
      <FeaturesSection />
      <FaqSection />
      <CallToActionSection />
    </div>
  )
}