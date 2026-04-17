'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Award, Globe, Heart } from 'lucide-react'
import { useContent } from '@/app/contexts/ContentContext'

const AboutSection = () => {
  const { content } = useContent()
  
  const aboutContent = content.about_content || {
    title: "Quenching Thirst, Creating Impact",
    description: "THIRSTEE bridges the gap between corporate advertising needs and community welfare. We provide free, custom-labeled water bottles that serve as powerful advertising mediums while addressing the critical need for clean water access.",
    sponsorCount: "50+",
    bottlesDistributed: "100K+",
    citiesReached: "25+",
    livesImpacted: "10K+"
  }

  const stats = [
    {
      icon: Users,
      number: aboutContent.sponsorCount,
      label: "Active Sponsors",
      description: "Trusted partners supporting our mission"
    },
    {
      icon: Award,
      number: aboutContent.bottlesDistributed,
      label: "Bottles Distributed",
      description: "Free water bottles provided to communities"
    },
    {
      icon: Globe,
      number: aboutContent.citiesReached,
      label: "Cities Reached",
      description: "Expanding our impact across regions"
    },
    {
      icon: Heart,
      number: aboutContent.livesImpacted,
      label: "Lives Impacted",
      description: "People helped through our initiatives"
    }
  ]

  return (
    <section id="about" className="section-padding gradient-bg">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-primary-600 font-semibold text-lg"
              >
                About THIRSTEE
              </motion.span>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-display font-bold text-gray-900"
              >
                {aboutContent.title.split(',')[0]},
                <span className="text-gradient"> {aboutContent.title.split(',')[1]?.trim() || 'Creating Impact'}</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              {aboutContent.description}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              Our innovative approach transforms traditional advertising into a force for good. 
              Every sponsored bottle not only promotes your brand but also provides essential 
              hydration to communities in need, creating a win-win solution for businesses and society.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <button className="btn-primary">
                Learn More
              </button>
              <button className="btn-secondary">
                Become a Sponsor
              </button>
            </motion.div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-lg card-hover text-center"
              >
                <div className="bg-gradient-to-r from-primary-100 to-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {(() => {
                    const IconComponent = stat.icon;
                    return <IconComponent className="h-8 w-8 text-primary-600" />;
                  })()}
                </div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-3xl font-display font-bold text-gray-900 mb-2"
                >
                  {stat.number}
                </motion.div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {stat.label}
                </h3>
                
                <p className="text-sm text-gray-600">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-3xl p-8 md:p-12 shadow-xl"
        >
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Our Mission
            </h3>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              "To revolutionize advertising by creating meaningful connections between brands and communities, 
              ensuring that every marketing dollar spent contributes to solving the global water crisis while 
              delivering exceptional brand visibility and engagement."
            </p>
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-primary-600 to-secondary-600 w-24 h-1 rounded-full"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection