'use client'

import { Bot, Github, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react'

const footerLinks = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Pricing', href: '#' },
    { name: 'Roadmap', href: '#' },
  ],
  resources: [
    { name: 'Documentation', href: '/docs/01_Product_Scope.md' },
    { name: 'API Reference', href: '/docs/03_System_Architecture.md' },
    { name: 'ML Pipeline', href: '/docs/04_AI_ML_Pipeline.md' },
    { name: 'Implementation Guide', href: '/docs/05_Implementation_Timeline.md' },
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contact', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Security', href: '#' },
    { name: 'Compliance', href: '#' },
  ],
}

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:contact@emplif.ai', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-accent-cyan/20 bg-dark-mid/50 backdrop-blur-lg" id="docs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <Bot className="w-10 h-10 text-accent-cyan" />
              <span className="font-orbitron text-2xl font-bold text-gradient">EmplifAI</span>
            </div>
            <p className="text-text-dim text-sm leading-relaxed mb-6">
              Enterprise Employee Lifecycle Platform powered by GraphRAG, Neo4j, and Predictive
              ML Analytics. Capture, preserve, and leverage institutional knowledge.
            </p>
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center hover:bg-accent-cyan/20 hover:border-accent-cyan transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-accent-cyan group-hover:text-white transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-text-dim hover:text-accent-cyan transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-text-dim hover:text-accent-cyan transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-text-dim hover:text-accent-cyan transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-text-dim hover:text-accent-cyan transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-accent-cyan/10 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-accent-cyan" />
              <div>
                <div className="text-sm text-white font-semibold">Headquarters</div>
                <div className="text-xs text-text-dim">San Francisco, CA 94105</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-accent-cyan" />
              <div>
                <div className="text-sm text-white font-semibold">Sales</div>
                <div className="text-xs text-text-dim">+1 (555) 123-4567</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-accent-cyan" />
              <div>
                <div className="text-sm text-white font-semibold">Support</div>
                <div className="text-xs text-text-dim">support@emplif.ai</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-accent-cyan/10 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-text-dim text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} EmplifAI. All rights reserved. Powered by GraphRAG
            & Neo4j.
          </p>
          <div className="flex items-center space-x-6 text-xs text-text-dim">
            <span className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>All Systems Operational</span>
            </span>
            <a href="#" className="hover:text-accent-cyan transition-colors duration-300">
              Status
            </a>
            <a href="#" className="hover:text-accent-cyan transition-colors duration-300">
              Changelog
            </a>
          </div>
        </div>
      </div>

      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-accent-cyan/5 to-transparent pointer-events-none" />
    </footer>
  )
}
