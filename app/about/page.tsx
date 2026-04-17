'use client'

import { motion } from 'framer-motion'
import { Users, Target, Eye, Heart, Award, Globe } from 'lucide-react'
import Image from 'next/image'

const AboutPage = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We believe in the power of caring for others and making a positive impact in communities worldwide."
    },
    {
      icon: Target,
      title: "Purpose",
      description: "Every bottle we produce serves a dual purpose - promoting brands and providing clean water to those in need."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards in product quality, customer service, and social responsibility."
    },
    {
      icon: Globe,
      title: "Sustainability",
      description: "Our commitment to environmental responsibility guides every aspect of our operations."
    }
  ]

  const team = [
    {
      name: "Alex Johnson",
      position: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Passionate about combining business success with social impact."
    },
    {
      name: "Maria Garcia",
      position: "Operations Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Expert in supply chain management and quality assurance."
    },
    {
      name: "David Kim",
      position: "Community Outreach Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Dedicated to building partnerships with communities and organizations."
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
              About THIRSTEE
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed">
              We're more than just a water bottle company. We're a movement that believes 
              business can be a force for good, creating value for brands while addressing 
              one of humanity's most basic needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  THIRSTEE was born from a simple yet powerful idea: what if every marketing 
                  campaign could also help solve the global water crisis? Our founder, Alex Johnson, 
                  witnessed firsthand the impact of water scarcity during a volunteer trip to rural communities.
                </p>
                <p>
                  Combining his background in marketing with a passion for social impact, Alex envisioned 
                  a business model that would turn advertising budgets into a force for good. Today, 
                  THIRSTEE has distributed over 100,000 bottles while helping brands reach their 
                  target audiences in meaningful ways.
                </p>
                <p>
                  Every bottle we produce carries a message of hope - your brand's message and our 
                  commitment to ensuring clean water reaches those who need it most.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding gradient-bg">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <Target className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-display font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To revolutionize advertising by creating meaningful connections between brands and communities, 
                ensuring that every marketing dollar spent contributes to solving the global water crisis while 
                delivering exceptional brand visibility and engagement.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-secondary-100 p-3 rounded-lg">
                  <Eye className="h-8 w-8 text-secondary-600" />
                </div>
                <h3 className="text-2xl font-display font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                A world where access to clean water is universal, and where businesses actively contribute 
                to social good through their marketing efforts. We envision a future where every brand 
                campaign creates positive social impact.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape how we interact with our clients, 
              communities, and the world around us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="bg-gradient-to-r from-primary-100 to-secondary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {(() => {
                    const IconComponent = value.icon;
                    return <IconComponent className="h-10 w-10 text-primary-600" />;
                  })()}
                </div>
                <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding gradient-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate individuals behind THIRSTEE who work tirelessly to make our 
              mission a reality every single day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center card-hover"
              >
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-display font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-semibold mb-4">
                  {member.position}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage