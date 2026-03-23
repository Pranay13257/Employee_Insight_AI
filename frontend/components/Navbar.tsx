'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Bot, Github, FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Technology', href: '#technology' },
    { name: 'Documentation', href: '#docs' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${ isScrolled
          ? 'bg-dark-mid/95 backdrop-blur-lg border-b border-accent-cyan/20 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <Bot className="w-10 h-10 text-accent-cyan" />
            <span className="font-orbitron text-xl font-bold text-gradient">
              EmplifAI
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-text-dim hover:text-accent-cyan transition-colors duration-300 font-medium"
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.a
              href="#docs"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2 px-4 py-2 text-accent-cyan border border-accent-cyan/50 rounded-full hover:bg-accent-cyan/10 transition-all duration-300"
            >
              <FileText className="w-4 h-4" />
              <span>Docs</span>
            </motion.a>
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-accent-cyan to-accent-blue text-dark-bg rounded-full font-semibold hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all duration-300"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-accent-cyan p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-mid/95 backdrop-blur-lg border-t border-accent-cyan/20"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks. map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-text-dim hover:text-accent-cyan transition-colors duration-300 font-medium"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col space-y-3 pt-4">
                <a
                  href="#docs"
                  className="flex items-center justify-center space-x-2 px-4 py-2 text-accent-cyan border border-accent-cyan/50 rounded-full"
                >
                  <FileText className="w-4 h-4" />
                  <span>Documentation</span>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 px-6 py-2 bg-gradient-to-r from-accent-cyan to-accent-blue text-dark-bg rounded-full font-semibold"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
