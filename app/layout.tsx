import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export function generateMetadata(): Metadata {
  return {
    title: 'Snake Game',
    description: '复古风格的贪吃蛇游戏',
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
      userScalable: false,
      viewportFit: 'cover',
    },
    other: {
      'mobile-web-app-capable': 'yes',
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" style={{ height: '100%', margin: 0, padding: 0 }}>
      <body style={{ margin: 0, padding: 0, minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  )
}

