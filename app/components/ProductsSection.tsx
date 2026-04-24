'use client'

import { motion } from 'framer-motion'
import { Check, Star, Crown } from 'lucide-react'
import Image from 'next/image'

const ProductsSection = () => {
  const products = [
    {
      name: "Standard Water Bottles",
      description: "High-quality, eco-friendly water bottles perfect for everyday distribution and basic branding needs.",
      image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: Check,
      features: [
        "500ml capacity",
        "BPA-free plastic",
        "Basic label customization",
        "Bulk order discounts",
        "Fast production time"
      ],
      color: "from-blue-500 to-blue-600",
      popular: false
    },
    {
      name: "Custom Label Water Bottles",
      description: "Premium bottles with full-color custom labels, perfect for marketing campaigns and brand promotion.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: Star,
      features: [
        "Full-color printing",
        "Multiple size options",
        "Premium label material",
        "Design consultation",
        "Brand compliance check"
      ],
      color: "from-green-500 to-green-600",
      popular: true
    },
    {
      name: "Premium Water Bottles",
      description: "Luxury glass and stainless steel bottles with premium branding for high-end corporate events.",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: Crown,
      features: [
        "Glass or stainless steel",
        "Laser engraving available",
        "Premium packaging",
        "Reusable design",
        "Executive gift quality"
      ],
      color: "from-purple-500 to-purple-600",
      popular: false
    }
  ]

  return (
    <section id="products" className="section-padding gradient-bg">
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
            Our Products
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Quality Water Bottles for
            <span className="text-gradient"> Every Need</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from our range of carefully crafted water bottles, each designed to meet 
            different requirements while maintaining our commitment to quality and sustainability.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-3xl shadow-xl overflow-hidden card-hover ${
                product.popular ? 'ring-4 ring-primary-200 scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {product.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${product.color} opacity-20`} />
              </div>

              {/* Product Content */}
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`bg-gradient-to-r ${product.color} p-2 rounded-lg`}>
                    {(() => {
                      const IconComponent = product.icon;
                      return <IconComponent className="h-6 w-6 text-white" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-gray-900">
                      {product.name}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {product.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + featureIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full bg-gradient-to-r ${product.color} text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    Order Now
                  </motion.button>
                  <button className="w-full border-2 border-gray-200 text-gray-700 hover:border-primary-600 hover:text-primary-600 font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                    Get Quote
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
              Quality Guaranteed
            </h3>
            <p className="text-gray-600">
              All our bottles meet international quality standards and safety regulations.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
              Custom Design
            </h3>
            <p className="text-gray-600">
              Our design team helps create stunning labels that represent your brand perfectly.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
              Fast Delivery
            </h3>
            <p className="text-gray-600">
              Quick turnaround times to meet your project deadlines and event schedules.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductsSection