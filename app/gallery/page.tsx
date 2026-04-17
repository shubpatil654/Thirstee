'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Filter } from 'lucide-react'
import Image from 'next/image'

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'advertising', name: 'Advertising Campaigns' },
    { id: 'corporate', name: 'Corporate Events' },
    { id: 'community', name: 'Community Outreach' },
    { id: 'events', name: 'Special Events' },
    { id: 'products', name: 'Product Showcase' }
  ]

  const galleryItems = [
    {
      id: 1,
      title: "TechCorp Brand Campaign",
      category: "advertising",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Custom-labeled bottles for major tech company's product launch campaign."
    },
    {
      id: 2,
      title: "Corporate Conference 2024",
      category: "corporate",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Premium bottles for international business conference with 500+ attendees."
    },
    {
      id: 3,
      title: "Community Water Drive",
      category: "community",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Free water distribution to underserved communities during summer heat wave."
    },
    {
      id: 4,
      title: "Music Festival Partnership",
      category: "events",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Eco-friendly bottles for 3-day music festival with sustainability focus."
    },
    {
      id: 5,
      title: "Premium Glass Collection",
      category: "products",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Luxury glass bottles with laser engraving for executive gifts."
    },
    {
      id: 6,
      title: "Startup Launch Event",
      category: "advertising",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Custom bottles for innovative startup's market entry campaign."
    },
    {
      id: 7,
      title: "Healthcare Conference",
      category: "corporate",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Branded bottles for medical professionals conference and networking."
    },
    {
      id: 8,
      title: "School Water Program",
      category: "community",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Educational initiative providing clean water to local schools."
    },
    {
      id: 9,
      title: "Sports Tournament",
      category: "events",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Hydration solutions for regional sports championship tournament."
    },
    {
      id: 10,
      title: "Standard Bottle Range",
      category: "products",
      image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Our complete range of standard water bottles in various sizes."
    },
    {
      id: 11,
      title: "Fashion Brand Collaboration",
      category: "advertising",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Stylish bottles for luxury fashion brand's runway show and after-party."
    },
    {
      id: 12,
      title: "Emergency Relief Effort",
      category: "community",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Rapid response water distribution during natural disaster relief operations."
    }
  ]

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredItems.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + filteredItems.length) % filteredItems.length)
    }
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Project Gallery
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed">
              Explore our portfolio of successful campaigns, community initiatives, 
              and product showcases that demonstrate the impact of our work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 text-gray-600 mb-4 md:mb-0">
              <Filter className="h-5 w-5" />
              <span className="font-medium">Filter by:</span>
            </div>
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding gradient-bg">
        <div className="container-custom">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className="group cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                          <span className="text-gray-900 font-semibold">View Details</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-display font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                      <div className="mt-4">
                        <span className="inline-block bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-xs font-medium">
                          {categories.find(cat => cat.id === item.category)?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-xl text-gray-600">
                No projects found in this category. Try selecting a different filter.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-all duration-300"
              >
                <X className="h-6 w-6 text-white" />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>

              {/* Image */}
              <div className="relative h-96 md:h-[600px] w-full rounded-lg overflow-hidden">
                <Image
                  src={filteredItems[selectedImage].image}
                  alt={filteredItems[selectedImage].title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Image Info */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-b-lg">
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  {filteredItems[selectedImage].title}
                </h3>
                <p className="text-white/90 leading-relaxed">
                  {filteredItems[selectedImage].description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              Ready to Create Your Own Success Story?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's work together to create a campaign that not only promotes your brand 
              but also makes a positive impact on communities in need.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="btn-primary">
                Start Your Project
              </button>
              <button className="btn-secondary">
                View More Examples
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default GalleryPage