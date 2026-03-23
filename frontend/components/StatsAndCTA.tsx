'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { TrendingUp, Clock, Target, Zap, ArrowRight, FileText } from 'lucide-react'

const stats = [
  {
    icon: Target,
    number: '85%',
    label: 'Decision Capture Rate',
    description: 'Key decisions captured within 48 hours',
  },
  {
    icon: Clock,
    number: '50%',
    label: 'Faster Onboarding',
    description: 'Reduce ramp-up from 6 to 3 months',
  },
  {
    icon: Zap,
    number: '95%',
    label: 'Chatbot Accuracy',
    description: 'Zero-hallucination GraphRAG responses',
  },
  {
    icon: TrendingUp,
    number: '6mo+',
    label: 'Early Detection',
    description: 'Flag obsolete decisions before impact',
  },
]

export default function StatsAndCTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <>
      {/* Stats Section */}
      <section
        id="technology"
        className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark-bg via-dark-mid/30 to-dark-bg"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            ref={ref}
            className="text-center mb-20"
          >
            <h2 className="font-orbitron font-black text-4xl md:text-6xl mb-6 text-gradient">
              Performance Metrics
            </h2>
            <p className="text-text-dim text-lg md:text-xl max-w-3xl mx-auto">
              Measurable impact on organizational knowledge management
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative bg-dark-mid/60 border border-accent-cyan/20 rounded-2xl p-8 backdrop-blur-lg hover:border-accent-cyan hover:shadow-[0_20px_60px_rgba(0,240,255,0.3)] transition-all duration-500 text-center">
                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Number */}
                  <div className="font-orbitron font-black text-5xl mb-3 text-gradient">
                    {stat.number}
                  </div>

                  {/* Label */}
                  <div className="font-semibold text-accent-cyan mb-2">{stat.label}</div>

                  {/* Description */}
                  <div className="text-text-dim text-sm">{stat.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-orbitron font-black text-4xl md:text-6xl mb-6 text-gradient">
              Transform Your Knowledge Management
            </h2>
            <p className="text-text-dim text-lg md:text-xl mb-12 max-w-3xl mx-auto">
              Join forward-thinking organizations leveraging AI to capture, preserve, and
              leverage institutional knowledge across the entire employee lifecycle.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-10 py-5 bg-gradient-to-r from-accent-cyan to-accent-blue rounded-full font-semibold text-lg text-dark-bg hover:shadow-[0_0_50px_rgba(0,240,255,0.6)] transition-all duration-300 flex items-center space-x-3"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </motion.a>

              <motion.a
                href="/docs/01_Product_Scope.md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 border-2 border-accent-cyan/50 text-accent-cyan rounded-full font-semibold text-lg hover:bg-accent-cyan/10 hover:border-accent-cyan transition-all duration-300 flex items-center space-x-3"
              >
                <FileText className="w-5 h-5" />
                <span>View Documentation</span>
              </motion.a>
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 text-text-dim text-sm"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent-cyan rounded-full animate-pulse" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent-purple rounded-full animate-pulse" />
                <span>Cancel anytime</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
