'use client'

import { motion } from 'framer-motion'
import { Shield, Zap, Heart, Award, Users, Recycle } from 'lucide-react'

const WhyChooseUsSection = () => {
  const reasons = [
    {
      icon: Shield,
      title: "Trusted Quality",
      description: "Premium materials and rigorous quality control ensure every bottle meets the highest standards.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Zap,
      title: "Fast Turnaround",
      description: "Quick production and delivery times to meet your urgent campaign and event requirements.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Heart,
      title: "Social Impact",
      description: "Every purchase contributes to our mission of providing free water to communities in need.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Award,
      title: "Industry Expertise",
      description: "Years of experience in promotional products and community outreach programs.",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Personal account managers and 24/7 customer support for all your project needs.",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Recycle,
      title: "Eco-Friendly",
      description: "Sustainable materials and environmentally responsible production processes.",
      color: "from-emerald-500 to-green-600"
    }
  ]

  const achievements = [
    { number: "99%", label: "Customer Satisfaction", description: "Based on client feedback" },
    { number: "48h", label: "Average Turnaround", description: "For standard orders" },
    { number: "100K+", label: "Bottles Produced", description: "Monthly capacity" },
    { number: "5★", label: "Average Rating", description: "Across all platforms" }
  ]

  return (
    <section className="section-padding bg-white">
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
            Why Choose THIRSTEE
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            The Smart Choice for
            <span className="text-gradient"> Your Brand</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We combine quality products, exceptional service, and social responsibility 
            to deliver results that exceed expectations while making a positive impact.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                {/* Icon */}
                <div className={`bg-gradient-to-r ${reason.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {(() => {
                    const IconComponent = reason.icon;
                    return <IconComponent className="h-8 w-8 text-white" />;
                  })()}
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 md:p-12 text-white"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Proven Track Record
            </h3>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Our numbers speak for themselves. Here's what we've achieved together with our clients.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-display font-bold mb-2">
                  {achievement.number}
                </div>
                <div className="text-lg font-semibold mb-1">
                  {achievement.label}
                </div>
                <div className="text-white/80 text-sm">
                  {achievement.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
            Ready to Experience the Difference?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who have chosen THIRSTEE for their water bottle needs. 
            Let's create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Start Your Project
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary"
            >
              Schedule Consultation
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUsSection