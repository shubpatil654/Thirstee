'use client'

import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import ProductsSection from './components/ProductsSection'
import WhyChooseUsSection from './components/WhyChooseUsSection'
import JoinUsSection from './components/JoinUsSection'
import TestimonialsSection from './components/TestimonialsSection'

export default function Home() {
  return (
    <div className="pt-16">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProductsSection />
      <WhyChooseUsSection />
      <JoinUsSection />
      <TestimonialsSection />
    </div>
  )
}