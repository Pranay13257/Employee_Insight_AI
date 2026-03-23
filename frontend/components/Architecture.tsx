'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Layers, Database, Brain, Cloud, Shield, Workflow } from 'lucide-react'

const layers = [
  {
    icon: Cloud,
    number: '0',
    name: 'Active Capture & Interactions',
    description: 'AI Chatbot, Exit Bot, Google Connectors, SSO',
    color: 'from-accent-cyan to-accent-blue',
  },
  {
    icon: Brain,
    number: '1',
    name: 'Intelligent Decision Extraction',
    description: 'LangChain, Base LLM, NLP Entity Extraction',
    color: 'from-accent-blue to-accent-purple',
  },
  {
    icon: Database,
    number: '2',
    name: 'Decision Analytics & Tracking',
    description: 'PostgreSQL, Monthly Reports, Mortality Detection',
    color: 'from-accent-purple to-pink-500',
  },
  {
    icon: Workflow,
    number: '3',
    name: 'Knowledge Mapping & Graph Storage',
    description: 'Neo4j, GraphRAG, Employee Matching Engine',
    color: 'from-pink-500 to-accent-cyan',
  },
]

const techStack = [
  { category: 'Frontend', tech: 'Next.js, React, TailwindCSS, Shadcn UI' },
  { category: 'Backend', tech: 'FastAPI (Python), Express.js (Node)' },
  { category: 'Databases', tech: 'PostgreSQL, Neo4j' },
  { category: 'AI/ML', tech: 'GPT-4o/Claude, LangChain, ADWIN, Cox PH, XGBoost' },
  { category: 'Auth', tech: 'Google OAuth 2.0' },
  { category: 'MLOps', tech: 'MLflow, Apache Airflow, Docker' },
]

export default function Architecture() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="architecture" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-dark-mid/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Layers className="w-10 h-10 text-accent-cyan" />
            <h2 className="font-orbitron font-black text-4xl md:text-6xl text-gradient">
              4-Layer Architecture
            </h2>
          </div>
          <p className="text-text-dim text-lg md:text-xl max-w-3xl mx-auto">
            Modular design separating capture, extraction, analytics, and knowledge mapping
          </p>
        </motion.div>

        {/* Architecture Layers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {layers.map((layer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group"
            >
              <div className="relative h-full bg-dark-mid/80 border border-accent-cyan/20 rounded-2xl p-6 backdrop-blur-lg hover:border-accent-cyan hover:shadow-[0_20px_60px_rgba(0,240,255,0.3)] transition-all duration-500">
                {/* Layer Number */}
                <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br ${layer.color} flex items-center justify-center font-orbitron font-bold text-2xl text-white shadow-lg`}>
                  {layer.number}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 mb-4 rounded-xl bg-gradient-to-br ${layer.color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500`}>
                  <layer.icon className="w-8 h-8 text-white" />
                </div>

                {/* Name */}
                <h3 className="font-orbitron font-bold text-lg mb-3 text-accent-cyan">
                  Layer {layer.number}
                </h3>
                <h4 className="font-semibold text-white mb-2">{layer.name}</h4>

                {/* Description */}
                <p className="text-text-dim text-sm leading-relaxed">{layer.description}</p>
              </div>

              {/* Connection Arrow (except last item) */}
              {index < layers.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-accent-cyan"
                  >
                    →
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-dark-mid/60 border border-accent-cyan/20 rounded-2xl p-8 backdrop-blur-lg"
        >
          <div className="flex items-center justify-center space-x-3 mb-8">
            <Shield className="w-8 h-8 text-accent-cyan" />
            <h3 className="font-orbitron font-bold text-3xl text-gradient">Tech Stack</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="bg-dark-bg/50 rounded-xl p-4 border border-accent-cyan/10 hover:border-accent-cyan/30 transition-all duration-300"
              >
                <div className="font-semibold text-accent-cyan mb-2">{item.category}</div>
                <div className="text-text-dim text-sm">{item.tech}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
