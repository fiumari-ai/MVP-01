import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import ProblemBlock from '@/components/landing/ProblemBlock'
import SolutionBlock from '@/components/landing/SolutionBlock'
import FeaturePreview from '@/components/landing/FeaturePreview'
import ProTeaser from '@/components/landing/ProTeaser'
import Testimonials from '@/components/landing/Testimonials'
import Pricing from '@/components/landing/Pricing'
import FAQ from '@/components/landing/FAQ'
import FinalCTA from '@/components/landing/FinalCTA'
import Footer from '@/components/layout/Footer'

export default function LandingPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Navbar />
      <Hero />
      <ProblemBlock />
      <SolutionBlock />
      <FeaturePreview />
      <ProTeaser />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  )
}
