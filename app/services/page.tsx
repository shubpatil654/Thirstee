'use client'

import { motion } from 'framer-motion'
import { Megaphone, Tag, Building, Calendar, Droplets, Check, ArrowRight } from 'lucide-react'
import Image from 'next/image'

const ServicesPage = () => {
  const services = [
    {
      id: 'advertising',
      icon: Megaphone,
      title: "Advertising Solutions",
      subtitle: "Strategic Brand Promotion",
      description: "Transform your brand visibility with custom-labeled water bottles distributed in high-traffic areas, events, and communities. Our advertising solutions create meaningful touchpoints with your target audience.",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      features: [
        "Strategic placement in high-traffic locations",
        "Custom brand logo and messaging",
        "Target demographic analysis and reach",
        "Real-time distribution tracking",
        "Performance analytics and reporting",
        "Multi-location campaign coordination"
      ],
      benefits: [
        "Increased brand awareness",
        "Positive brand association",
        "Cost-effective marketing",
        "Social impact messaging"
      ],
      pricing: "Starting at $0.75 per bottle",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 'custom-labels',
      icon: Tag,
      title: "Custom Label Water Bottles",
      subtitle: "Premium Branding Solutions",
      description: "High-quality water bottles with your custom design, perfect for promotional campaigns, product launches, and brand awareness initiatives. Our premium printing ensures your brand looks professional.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      features: [
        "Full-color, high-resolution printing",
        "Multiple bottle sizes (330ml, 500ml, 750ml)",
        "Waterproof and durable labels",
        "Design consultation and support",
        "Brand compliance verification",
        "Fast turnaround (48-72 hours)"
      ],
      benefits: [
        "Professional brand presentation",
        "Memorable promotional items",
        "Versatile marketing tool",
        "High-quality materials"
      ],
      pricing: "Starting at $0.85 per bottle",
      color: "from-green-500 to-green-600"
    },
    {
      id: 'corporate',
      icon: Building,
      title: "Corporate Solutions",
      subtitle: "Business & Office Programs",
      description: "Comprehensive water bottle solutions for corporate offices, meetings, employee wellness programs, and client entertainment. Enhance your corporate image while supporting employee health.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      features: [
        "Bulk ordering with volume discounts",
        "Corporate branding and messaging",
        "Regular supply scheduling",
        "Employee wellness program integration",
        "Client meeting and event supplies",
        "Dedicated account management"
      ],
      benefits: [
        "Enhanced corporate image",
        "Employee satisfaction",
        "Client impression management",
        "Convenient bulk ordering"
      ],
      pricing: "Volume pricing available",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 'events',
      icon: Calendar,
      title: "Event Packs",
      subtitle: "Special Event Solutions",
      description: "Specially designed water bottle packages for conferences, festivals, sports events, weddings, and corporate gatherings. Make your event memorable with custom-branded hydration solutions.",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      features: [
        "Event-specific customization",
        "Volume discounts for large events",
        "On-site delivery and setup",
        "Event branding and theming",
        "Multiple distribution options",
        "Post-event impact reporting"
      ],
      benefits: [
        "Memorable event experience",
        "Professional presentation",
        "Guest satisfaction",
        "Brand visibility"
      ],
      pricing: "Custom event pricing",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 'free-supply',
      icon: Droplets,
      title: "Free Water Supply",
      subtitle: "Community Impact Programs",
      description: "Community-focused initiative providing free water bottles to underserved areas, emergency situations, and charitable organizations. Partner with us to make a direct social impact.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      features: [
        "Community outreach programs",
        "Emergency response distribution",
        "Charity and NGO partnerships",
        "Regular supply to underserved areas",
        "Impact measurement and reporting",
        "Volunteer coordination support"
      ],
      benefits: [
        "Direct social impact",
        "Community relationship building",
        "Corporate social responsibility",
        "Positive brand association"
      ],
      pricing: "Sponsored programs available",
      color: "from-cyan-500 to-cyan-600"
    }
  ]

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
              Our Services
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed">
              Comprehensive water bottle solutions that combine effective marketing 
              with meaningful social impact. Choose the service that best fits your needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail Sections */}
      {services.map((service, index) => (
        <section 
          key={service.id} 
          id={service.id}
          className={`section-padding ${index % 2 === 0 ? 'bg-white' : 'gradient-bg'}`}
        >
          <div className="container-custom">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
            }`}>
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={index % 2 === 1 ? 'lg:col-start-2' : ''}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`bg-gradient-to-r ${service.color} p-3 rounded-lg`}>
                    {(() => {
                      const IconComponent = service.icon;
                      return <IconComponent className="h-8 w-8 text-white" />;
                    })()}
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
                      {service.title}
                    </h2>
                    <p className="text-lg text-primary-600 font-semibold">
                      {service.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
                    Key Features:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-3"
                      >
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Benefits & Pricing */}
                <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Benefits:</h4>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                            <span className="text-gray-600">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Pricing:</h4>
                      <p className="text-2xl font-display font-bold text-primary-600 mb-2">
                        {service.pricing}
                      </p>
                      <p className="text-sm text-gray-500">
                        Volume discounts available
                      </p>
                    </div>
                  </div>
                </div>

                <button className={`bg-gradient-to-r ${service.color} text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2`}>
                  <span>Get Started</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={`relative h-96 rounded-2xl overflow-hidden shadow-2xl ${
                  index % 2 === 1 ? 'lg:col-start-1' : ''
                }`}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-20`} />
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let's discuss your specific needs and create a custom solution that 
              delivers results for your brand while making a positive impact.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
                Request Quote
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-all duration-300">
                Schedule Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage