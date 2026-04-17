'use client'

import { motion } from 'framer-motion'
import { Heart, Users, Globe, ArrowRight } from 'lucide-react'

const JoinUsSection = () => {
  const impactStats = [
    {
      icon: Users,
      number: "10,000+",
      label: "People Helped",
      description: "Lives impacted through our water distribution programs"
    },
    {
      icon: Globe,
      number: "25+",
      label: "Communities",
      description: "Underserved areas receiving regular water supply"
    },
    {
      icon: Heart,
      number: "50+",
      label: "Partners",
      description: "Organizations working with us to make a difference"
    }
  ]

  return (
    <section className="section-padding gradient-bg">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-primary-600 font-semibold text-lg"
              >
                Join Our Mission
              </motion.span>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-display font-bold text-gray-900"
              >
                Together We Can
                <span className="text-gradient"> Help the Needy</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              Every bottle you sponsor, every partnership you create, and every campaign you run 
              with THIRSTEE directly contributes to providing clean water to those who need it most. 
              Join our growing community of changemakers who believe that business success and 
              social impact can go hand in hand.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
                How You Can Make a Difference:
              </h3>
              <ul className="space-y-3">
                {[
                  "Sponsor water bottles for community distribution",
                  "Partner with us for your corporate events",
                  "Volunteer in our community outreach programs", 
                  "Spread awareness about water accessibility issues"
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <button className="btn-primary flex items-center justify-center space-x-2">
                <span>Join Us Today</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="btn-secondary">
                Learn More
              </button>
            </motion.div>
          </motion.div>

          {/* Impact Stats Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Main CTA Card */}
            <div className="bg-gradient-to-br from-primary-600 to-secondary-600 p-8 rounded-3xl text-white text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Heart className="h-10 w-10" />
              </motion.div>
              
              <h3 className="text-2xl font-display font-bold mb-4">
                Make an Impact Today
              </h3>
              <p className="text-white/90 mb-6 leading-relaxed">
                Your participation in our programs directly translates to clean water 
                reaching families and communities in need.
              </p>
              <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
                Get Involved
              </button>
            </div>

            {/* Impact Statistics */}
            <div className="grid grid-cols-1 gap-6">
              {impactStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-2xl shadow-lg flex items-center space-x-4"
                >
                  <div className="bg-gradient-to-r from-primary-100 to-secondary-100 w-16 h-16 rounded-xl flex items-center justify-center">
                    {(() => {
                      const IconComponent = stat.icon;
                      return <IconComponent className="h-8 w-8 text-primary-600" />;
                    })()}
                  </div>
                  <div>
                    <div className="text-2xl font-display font-bold text-gray-900">
                      {stat.number}
                    </div>
                    <div className="text-lg font-semibold text-gray-800">
                      {stat.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <blockquote className="text-2xl md:text-3xl font-display font-medium text-gray-700 italic max-w-4xl mx-auto">
            "The best way to find yourself is to lose yourself in the service of others."
          </blockquote>
          <cite className="text-lg text-gray-500 mt-4 block">- Mahatma Gandhi</cite>
        </motion.div>
      </div>
    </section>
  )
}

export default JoinUsSection