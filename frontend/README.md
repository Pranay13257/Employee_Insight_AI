# Enterprise Employee Lifecycle Platform - Landing Page

A modern, responsive landing page built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion animations.

## Features

- ✨ Modern, glassmorphic UI design
- 🎨 Gradient animations and hover effects
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast performance with Next.js 14 App Router
- 🎭 Smooth animations with Framer Motion
- 🎯 SEO optimized
- 🔧 TypeScript for type safety
- 💅 Tailwind CSS for styling
- 🎪 Interactive components with scroll animations

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Orbitron, Outfit (Google Fonts)

## Project Structure

```
landing-page/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx             # Main page combining all sections
│   └── globals.css          # Global styles and Tailwind directives
├── components/
│   ├── Navbar.tsx           # Navigation bar with mobile menu
│   ├── Hero.tsx             # Hero section with animated background
│   ├── Features.tsx         # Feature cards grid (8 features)
│   ├── Architecture.tsx     # 4-layer architecture showcase
│   ├── StatsAndCTA.tsx      # Performance stats and CTA section
│   └── Footer.tsx           # Comprehensive footer with links
├── public/                  # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── next.config.js
└── postcss.config.js
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. Navigate to the landing-page directory:

```bash
cd landing-page
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm run start
```

## Components Overview

### Navbar

- Sticky navigation with scroll detection
- Mobile-responsive hamburger menu
- Smooth scroll to sections
- CTA buttons (Docs, GitHub)

### Hero

- Animated background with particles
- Eye-catching gradient text
- Floating animations
- Quick stats preview
- Dual CTA buttons

### Features

- 8 feature cards in responsive grid
- Hover effects with gradient backgrounds
- Icons with rotation animations
- Category tags for each feature
- Intersection Observer for scroll animations

### Architecture

- 4-layer system visualization
- Sequential layer presentation
- Connection arrows between layers
- Tech stack breakdown
- Interactive hover states

### Stats & CTA

- 4 key performance metrics
- Animated stat cards
- Primary and secondary CTAs
- Trust indicators (free trial, no CC)

### Footer

- Multi-column layout
- Social media links
- Contact information
- Comprehensive navigation
- Status indicator
- Responsive design

## Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```js
colors: {
  'dark-bg': '#0a0e27',
  'dark-mid': '#131936',
  'accent-cyan': '#00f0ff',
  'accent-blue': '#0066ff',
  'accent-purple': '#8b5cf6',
  'text-light': '#e0e7ff',
  'text-dim': '#94a3b8',
}
```

### Fonts

Fonts are loaded from Google Fonts in `app/globals.css`. To change:

```css
@import url("https://fonts.googleapis.com/css2?family=YourFont&display=swap");
```

### Content

Edit component files in `components/` to update:

- Feature descriptions
- Stats and metrics
- Footer links
- Navigation items
- CTA button text and links

## Performance Optimizations

- Next.js Image optimization (ready for implementation)
- Code splitting with dynamic imports
- Lazy loading for scroll-triggered animations
- Optimized fonts with `display=swap`
- Minimal JavaScript bundle

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Other Platforms

Build the project and deploy the `.next` folder:

```bash
npm run build
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome)

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators
- Responsive text sizing

## Future Enhancements

- [ ] Add dark/light mode toggle
- [ ] Implement blog section
- [ ] Add video demonstrations
- [ ] Create pricing page
- [ ] Add customer testimonials
- [ ] Implement contact form with backend
- [ ] Add multi-language support
- [ ] Integrate analytics tracking

## License

This project is part of the Enterprise Employee Lifecycle Platform.

## Support

For issues or questions:

- Email: support@emplif.ai
- Documentation: `/docs` folder in parent directory

---

Built with ❤️ using Next.js 14, TypeScript, and Tailwind CSS
