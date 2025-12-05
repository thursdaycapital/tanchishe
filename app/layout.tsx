import type { Metadata, Viewport } from 'next'
import './globals.css'
import FarcasterMeta from '@/components/FarcasterMeta'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export function generateMetadata(): Metadata {
  return {
    title: 'Snake Game - Farcaster MiniApp',
    description: '复古风格的贪吃蛇游戏',
    openGraph: {
      title: 'Snake Game',
      description: '复古风格的贪吃蛇游戏 Farcaster MiniApp',
      images: [
        {
          url: 'https://tanchishe-phi.vercel.app/snake.png',
          width: 1200,
          height: 630,
          alt: 'Snake Game',
        },
      ],
      type: 'website',
      siteName: 'Snake Game',
      url: 'https://tanchishe-phi.vercel.app',
    },
    other: {
      'fc:frame': 'vNext',
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>
        <FarcasterMeta />
        {children}
      </body>
    </html>
  )
}

