'use client'

import { useEffect } from 'react'

export default function FarcasterMeta() {
  useEffect(() => {
    // 添加 Farcaster Frame meta 标签
    const addMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name'
      const existing = document.querySelector(`meta[${attribute}="${name}"]`)
      
      if (existing) {
        existing.setAttribute('content', content)
      } else {
        const meta = document.createElement('meta')
        meta.setAttribute(attribute, name)
        meta.setAttribute('content', content)
        document.head.appendChild(meta)
      }
    }

    // 添加必需的 Farcaster Miniapp metadata
    addMetaTag('fc:frame', 'vNext')
    addMetaTag('og:title', 'Snake Game', true)
    addMetaTag('og:image', 'https://tanchishe-phi.vercel.app/snake.png', true)
    addMetaTag('og:type', 'website', true)
    addMetaTag('og:description', '复古风格的贪吃蛇游戏 Farcaster MiniApp', true)
    addMetaTag('og:url', 'https://tanchishe-phi.vercel.app', true)
  }, [])

  return null
}

