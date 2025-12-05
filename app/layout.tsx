import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '贪吃蛇 - Farcaster MiniApp',
  description: '复古风格的贪吃蛇游戏',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}

