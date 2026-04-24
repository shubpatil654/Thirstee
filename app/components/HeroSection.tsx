'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Droplets, Heart, Globe } from 'lucide-react'
import Link from 'next/link'
import { useContent } from '@/app/contexts/ContentContext'

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { content } = useContent()
  
  const heroContent = content.hero_content || {
    slides: [
      {
        title: "Clean Water Crisis",
        subtitle: "2.2 billion people lack access to safely managed drinking water",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      },
      {
        title: "Water Pollution Emergency", 
        subtitle: "80% of wastewater flows back into the ecosystem without treatment",
        image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      },
      {
        title: "Water Scarcity Impact",
        subtitle: "By 2025, half of the world's population will live in water-stressed areas",
        image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      }
    ],
    mainTitle: "THIRSTEE is Making a Difference",
    mainDescription: "We provide free custom-labeled water bottles while creating advertising opportunities. Every bottle distributed helps someone in need while promoting your brand."
  }

  const slides = [
    {
      title: heroContent.slides[0]?.title || "Clean Water Crisis",
      subtitle: heroContent.slides[0]?.subtitle || "2.2 billion people lack access to safely managed drinking water",
      image: heroContent.slides[0]?.image || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      icon: Droplets,
      color: "from-blue-600 to-cyan-600"
    },
    {
      title: heroContent.slides[1]?.title || "Water Pollution Emergency", 
      subtitle: heroContent.slides[1]?.subtitle || "80% of wastewater flows back into the ecosystem without treatment",
      image: heroContent.slides[1]?.image || "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      icon: Globe,
      color: "from-green-600 to-teal-600"
    },
    {
      title: heroContent.slides[2]?.title || "Water Scarcity Impact",
      subtitle: heroContent.slides[2]?.subtitle || "By 2025, half of the world's population will live in water-stressed areas",
      image: heroContent.slides[2]?.image || "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      icon: Heart,
      color: "from-orange-600 to-red-600"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />
          
          {/* Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].color} opacity-80`} />
          
          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="container-custom">
              <div className="max-w-4xl">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex items-center space-x-4 mb-6"
                >
                  {(() => {
                    const IconComponent = slides[currentSlide].icon;
                    return <IconComponent className="h-12 w-12 text-white" />;
                  })()}
                  <span className="text-white/90 text-xl font-medium">Water Crisis Alert</span>
                </motion.div>

                <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.p
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>

                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="mb-12"
                >
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                    {heroContent.mainTitle}
                  </h2>
                  <p className="text-lg text-white/90 max-w-2xl">
                    {heroContent.mainDescription}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
                >
                  <Link href="/services" className="bg-white text-gray-900 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-center">
                    Explore Services
                  </Link>
                  <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-center">
                    Join Our Mission
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 right-8 z-20 text-white"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm font-medium">Scroll Down</span>
          <div className="w-0.5 h-8 bg-white/60"></div>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection