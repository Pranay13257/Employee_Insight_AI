'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-radial from-accent-blue/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-radial from-accent-purple/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 animate-grid-scroll" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent-cyan rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
              opacity: 0,
            }}
            animate={{
              y: -100,
              opacity: [0, 0.8, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center space-x-2 mb-6"
        >
          <Sparkles className="w-5 h-5 text-accent-cyan" />
          <span className="text-accent-cyan font-semibold tracking-wide uppercase text-sm">
            AI-Powered Knowledge Platform
          </span>
          <Sparkles className="w-5 h-5 text-accent-cyan" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-orbitron font-black text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight"
        >
          <span className="text-gradient">Enterprise Employee</span>
          <br />
          <span className="text-gradient">Lifecycle Platform</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-text-dim text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed font-light"
        >
          Capture institutional knowledge, prevent decision obsolescence, and transform
          onboarding with{' '}
          <span className="text-accent-cyan font-semibold">GraphRAG</span>,{' '}
          <span className="text-accent-blue font-semibold">Neo4j</span>, and{' '}
          <span className="text-accent-purple font-semibold">Predictive ML Analytics</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#features"
            className="group relative px-8 py-4 bg-gradient-to-r from-accent-cyan to-accent-blue rounded-full font-semibold text-lg text-dark-bg hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] transition-all duration-300 flex items-center space-x-2 overflow-hidden"
          >
            <span className="relative z-10">Explore Platform</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>

          <a
            href="#docs"
            className="px-8 py-4 border-2 border-accent-cyan/50 text-accent-cyan rounded-full font-semibold text-lg hover:bg-accent-cyan/10 hover:border-accent-cyan transition-all duration-300 flex items-center space-x-2"
          >
            <Zap className="w-5 h-5" />
            <span>View Documentation</span>
          </a>
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { value: '85%', label: 'Decision Capture' },
            { value: '50%', label: 'Faster Onboarding' },
            { value: '95%', label: 'Chatbot Accuracy' },
            { value: '6mo+', label: 'Early Detection' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-orbitron font-bold text-3xl md:text-4xl text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-text-dim text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-accent-cyan/50 rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-accent-cyan rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
