'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Bot,
  Video,
  Users,
  Zap,
  BarChart3,
  FileText,
  LogOut,
  Network,
} from 'lucide-react'

const features = [
  {
    icon: Bot,
    title: 'GraphRAG Chatbot',
    description:
      'Natural language interface powered by Graph Retrieval-Augmented Generation. Ask questions, log updates, and access organizational knowledge with zero hallucinations. Grounded in your actual data graph.',
    tag: 'AI Core',
    color: 'from-accent-cyan to-accent-blue',
  },
  {
    icon: Video,
    title: 'Google Meet Capture',
    description:
      'Automatically extracts decisions, rationale, and context from meeting transcripts. LangChain-powered entity extraction stores structured knowledge before context is lost. Zero manual data entry.',
    tag: 'Automation',
    color: 'from-accent-blue to-accent-purple',
  },
  {
    icon: Users,
    title: 'Smart Buddy Matching',
    description:
      'Graph similarity algorithms connect new hires with optimal mentors based on shared skills, projects, and semantic profile matching. Reduce ramp-up time from 6+ months to 3 months.',
    tag: 'Onboarding',
    color: 'from-accent-purple to-pink-500',
  },
  {
    icon: Zap,
    title: 'Decision Mortality Engine',
    description:
      'Ensemble ML pipeline (ADWIN + Cox PH + XGBoost) predicts when decisions become obsolete. Detects organizational lock-in 6+ months before critical impact. Prevents costly legacy debt.',
    tag: 'Predictive',
    color: 'from-yellow-400 to-accent-cyan',
  },
  {
    icon: BarChart3,
    title: 'Manager Dashboard',
    description:
      'Monthly aggregated reports with team contribution metrics, dependency visualization, and mortality alerts. Interactive Neo4j graph explorer reveals knowledge bottlenecks and crossteam dependencies.',
    tag: 'Analytics',
    color: 'from-green-400 to-accent-blue',
  },
  {
    icon: FileText,
    title: 'Daily Operations Logging',
    description:
      'Natural language daily updates automatically structured and linked to knowledge graph. Track contributions, maintain context, and build comprehensive employee activity history without form fatigue.',
    tag: 'Capture',
    color: 'from-blue-400 to-accent-purple',
  },
  {
    icon: LogOut,
    title: 'Exit Interview Bot',
    description:
      'Conversational AI captures tribal knowledge before employees depart. Structured handoff documentation, technical debt warnings, and knowledge transfer recommendations prevent 32% institutional knowledge loss.',
    tag: 'Offboarding',
    color: 'from-red-400 to-accent-purple',
  },
  {
    icon: Network,
    title: 'Neo4j Knowledge Graph',
    description:
      'Maps employees, decisions, skills, and dependencies as a dynamic graph. Cypher-powered queries enable multi-hop reasoning, causal relationship tracking, and semantic search across organizational knowledge.',
    tag: 'Foundation',
    color: 'from-accent-cyan to-green-400',
  },
]

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="features" className="relative py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
          className="text-center mb-20"
        >
          <h2 className="font-orbitron font-black text-4xl md:text-6xl mb-6 text-gradient">
            Intelligent Lifecycle Features
          </h2>
          <p className="text-text-dim text-lg md:text-xl max-w-3xl mx-auto">
            End-to-end platform capturing knowledge from day one to departure
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const Icon = feature.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative h-full bg-dark-mid/60 border border-accent-cyan/20 rounded-2xl p-6 backdrop-blur-lg hover:border-accent-cyan hover:shadow-[0_20px_60px_rgba(0,240,255,0.3)] transition-all duration-500 overflow-hidden">
        {/* Background Gradient on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

        {/* Tag */}
        <span className="absolute top-4 right-4 px-3 py-1 bg-accent-cyan/10 border border-accent-cyan/30 rounded-full text-accent-cyan text-xs font-semibold">
          {feature.tag}
        </span>

        {/* Icon */}
        <div className={`relative w-16 h-16 mb-4 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
          <Icon className="w-8 h-8 text-white" />
        </div>

        {/* Title */}
        <h3 className="font-orbitron font-bold text-xl mb-3 text-accent-cyan group-hover:text-white transition-colors duration-300">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-text-dim text-sm leading-relaxed group-hover:text-text-light transition-colors duration-300">
          {feature.description}
        </p>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-accent-cyan/50 pointer-events-none transition-all duration-500" />
      </div>
    </motion.div>
  )
}
