import { NextResponse } from 'next/server'

export async function GET() {
  const farcasterConfig = {
    version: "1.0",
    name: "Snake Game",
    description: "复古风格的贪吃蛇游戏 Farcaster MiniApp",
    iconUrl: "https://tanchishe-phi.vercel.app/snake.png",
    splashImageUrl: "https://tanchishe-phi.vercel.app/snake.png",
    splashBackgroundColor: "#1a1a1a",
    url: "https://tanchishe-phi.vercel.app"
  }

  return NextResponse.json(farcasterConfig, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

