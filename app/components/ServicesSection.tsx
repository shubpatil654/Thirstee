'use client'

import { motion } from 'framer-motion'
import { Megaphone, Tag, Building, Calendar, Droplets } from 'lucide-react'

const ServicesSection = () => {
  const services = [
    {
      icon: Megaphone,
      title: "Advertising Solutions",
      description: "Transform your brand visibility with custom-labeled water bottles distributed in high-traffic areas, events, and communities.",
      features: ["Brand Logo Placement", "Strategic Distribution", "Target Audience Reach", "Performance Analytics"],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Tag,
      title: "Custom Label Water Bottles",
      description: "Premium quality water bottles with your custom design, perfect for promotional campaigns and brand awareness.",
      features: ["High-Quality Printing", "Multiple Sizes Available", "Eco-Friendly Materials", "Fast Turnaround"],
      color: "from-green-500 to-green-600"
    },
    {
      icon: Building,
      title: "Corporate Solutions",
      description: "Comprehensive water bottle solutions for corporate offices, meetings, and employee wellness programs.",
      features: ["Bulk Orders", "Corporate Branding", "Regular Supply", "Employee Wellness"],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Calendar,
      title: "Event Packs",
      description: "Specially designed water bottle packages for conferences, festivals, sports events, and corporate gatherings.",
      features: ["Event Customization", "Volume Discounts", "On-Site Delivery", "Event Branding"],
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Droplets,
      title: "Free Water Supply",
      description: "Community-focused initiative providing free water bottles to underserved areas and emergency situations.",
      features: ["Community Outreach", "Emergency Response", "Charity Partnerships", "Social Impact"],
      color: "from-cyan-500 to-cyan-600"
    }
  ]

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-600 font-semibold text-lg mb-4 block">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Comprehensive Water
            <span className="text-gradient"> Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From advertising campaigns to community outreach, we offer a complete range of 
            water bottle solutions tailored to your specific needs and objectives.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              {/* Card Header */}
              <div className={`bg-gradient-to-r ${service.color} p-6 text-white`}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    {(() => {
                      const IconComponent = service.icon;
                      return <IconComponent className="h-8 w-8" />;
                    })()}
                  </div>
                  <h3 className="text-xl font-display font-bold">
                    {service.title}
                  </h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Key Features:</h4>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + featureIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-gray-600">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-6 bg-gray-100 hover:bg-primary-600 hover:text-white text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Ready to Make an Impact?
          </h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our mission to provide clean water while promoting your brand. 
            Let's create a campaign that makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
              Get Started Today
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-all duration-300">
              Request Quote
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection