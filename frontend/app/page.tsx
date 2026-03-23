import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Architecture from '@/components/Architecture'
import StatsAndCTA from '@/components/StatsAndCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-purple/10" />
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'gridScroll 20s linear infinite'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <Architecture />
        <StatsAndCTA />
        <Footer />
      </div>
    </main>
  )
}
