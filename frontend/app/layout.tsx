import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Enterprise Employee Lifecycle Platform',
  description: 'Capture institutional knowledge, prevent decision obsolescence, and transform onboarding with AI-powered knowledge mapping and predictive analytics',
  keywords: 'employee lifecycle, knowledge management, AI, GraphRAG, Neo4j, decision tracking',
}

export default function RootLayout({
  children,
}: {
  children: React.Node
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
