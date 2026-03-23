/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0a0e27',
        'dark-mid': '#131936',
        'accent-cyan': '#00f0ff',
        'accent-blue': '#0066ff',
        'accent-purple': '#8b5cf6',
        'text-light': '#e0e7ff',
        'text-dim': '#94a3b8',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'grid-scroll': 'gridScroll 20s linear infinite',
        'fade-in-up': 'fadeInUp 1s ease-out',
        'rotate-icon': 'rotateIcon 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotateY(0deg) rotateX(0deg)' },
          '25%': { transform: 'translateY(-20px) rotateY(5deg) rotateX(2deg)' },
          '50%': { transform: 'translateY(0) rotateY(0deg) rotateX(0deg)' },
          '75%': { transform: 'translateY(-20px) rotateY(-5deg) rotateX(-2deg)' },
        },
        gridScroll: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(50px)' },
        },
        fadeInUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        rotateIcon: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
