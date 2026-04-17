'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Save, 
  Edit, 
  Eye, 
  Plus, 
  Trash2, 
  Upload,
  FileText,
  Image as ImageIcon,
  Globe,
  Users,
  Star,
  Heart,
  CheckCircle
} from 'lucide-react'
import { contentAPI } from '@/lib/api'
import { useContent } from '@/app/contexts/ContentContext'

const ContentManager = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [error, setError] = useState('')
  const { refreshContent } = useContent()

  const contentSections = [
    { id: 'hero', label: 'Hero Section', icon: Globe, description: 'Main banner and carousel' },
    { id: 'about', label: 'About Section', icon: FileText, description: 'Company information' },
    { id: 'services', label: 'Services', icon: Star, description: 'Service offerings' },
    { id: 'products', label: 'Products', icon: Users, description: 'Product catalog' },
    { id: 'testimonials', label: 'Testimonials', icon: Heart, description: 'Client reviews' },
    { id: 'footer', label: 'Footer', icon: FileText, description: 'Contact & links' }
  ]

  // Content state
  const [heroContent, setHeroContent] = useState({
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
  })

  const [aboutContent, setAboutContent] = useState({
    title: "Quenching Thirst, Creating Impact",
    description: "THIRSTEE bridges the gap between corporate advertising needs and community welfare. We provide free, custom-labeled water bottles that serve as powerful advertising mediums while addressing the critical need for clean water access.",
    sponsorCount: "50+",
    bottlesDistributed: "100K+",
    citiesReached: "25+",
    livesImpacted: "10K+"
  })

  // Load content from backend on component mount
  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const content = await contentAPI.get()
      
      if (content.hero_content) {
        setHeroContent(content.hero_content)
      }
      if (content.about_content) {
        setAboutContent(content.about_content)
      }
    } catch (error) {
      console.error('Failed to load content:', error)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError('')
    
    try {
      const contentData = {
        hero_content: heroContent,
        about_content: aboutContent
      }
      
      await contentAPI.update(contentData)
      
      // Refresh content context to update all components
      await refreshContent()
      
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error: any) {
      setError(error.message || 'Failed to save content')
    } finally {
      setIsSaving(false)
    }
  }

  const renderHeroEditor = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Main Hero Content</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Main Title</label>
            <input
              type="text"
              value={heroContent.mainTitle}
              onChange={(e) => setHeroContent({...heroContent, mainTitle: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Main Description</label>
            <textarea
              rows={4}
              value={heroContent.mainDescription}
              onChange={(e) => setHeroContent({...heroContent, mainDescription: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Carousel Slides</h3>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Slide</span>
          </button>
        </div>
        <div className="space-y-4">
          {heroContent.slides.map((slide, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">Slide {index + 1}</h4>
                <button className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={slide.title}
                    onChange={(e) => {
                      const newSlides = [...heroContent.slides]
                      newSlides[index].title = e.target.value
                      setHeroContent({...heroContent, slides: newSlides})
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    value={slide.image}
                    onChange={(e) => {
                      const newSlides = [...heroContent.slides]
                      newSlides[index].image = e.target.value
                      setHeroContent({...heroContent, slides: newSlides})
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <textarea
                  rows={2}
                  value={slide.subtitle}
                  onChange={(e) => {
                    const newSlides = [...heroContent.slides]
                    newSlides[index].subtitle = e.target.value
                    setHeroContent({...heroContent, slides: newSlides})
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAboutEditor = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">About Section Content</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
            <input
              type="text"
              value={aboutContent.title}
              onChange={(e) => setAboutContent({...aboutContent, title: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              rows={6}
              value={aboutContent.description}
              onChange={(e) => setAboutContent({...aboutContent, description: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sponsor Count</label>
            <input
              type="text"
              value={aboutContent.sponsorCount}
              onChange={(e) => setAboutContent({...aboutContent, sponsorCount: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bottles Distributed</label>
            <input
              type="text"
              value={aboutContent.bottlesDistributed}
              onChange={(e) => setAboutContent({...aboutContent, bottlesDistributed: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cities Reached</label>
            <input
              type="text"
              value={aboutContent.citiesReached}
              onChange={(e) => setAboutContent({...aboutContent, citiesReached: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lives Impacted</label>
            <input
              type="text"
              value={aboutContent.livesImpacted}
              onChange={(e) => setAboutContent({...aboutContent, livesImpacted: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderContentEditor = () => {
    switch (activeSection) {
      case 'hero':
        return renderHeroEditor()
      case 'about':
        return renderAboutEditor()
      default:
        return (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {contentSections.find(s => s.id === activeSection)?.label} Editor
            </h3>
            <p className="text-gray-600">
              Content editor for this section is coming soon. You can edit the content directly in the code for now.
            </p>
          </div>
        )
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Content Manager
          </h1>
          <p className="text-gray-600">
            Edit all website content from one central location
          </p>
        </div>
        <div className="flex space-x-3">
          <a 
            href="http://localhost:3000" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>Preview Site</span>
          </a>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Section Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Sections</h2>
            <nav className="space-y-2">
              {contentSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-start space-x-3 px-4 py-3 rounded-lg transition-all duration-300 text-left ${
                    activeSection === section.id
                      ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {(() => {
                    const IconComponent = section.icon;
                    return <IconComponent className="h-5 w-5 mt-0.5 flex-shrink-0" />;
                  })()}
                  <div>
                    <div className="font-medium">{section.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{section.description}</div>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContentEditor()}
          </motion.div>
        </div>
      </div>

      {/* Save Notification */}
      {saveSuccess && (
        <div className="fixed bottom-6 right-6 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2"
          >
            <CheckCircle className="h-5 w-5" />
            <span>Changes saved successfully!</span>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default ContentManager