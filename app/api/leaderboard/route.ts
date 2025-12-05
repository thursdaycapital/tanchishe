import { NextRequest, NextResponse } from 'next/server'

interface LeaderboardEntry {
  id: string
  username: string
  score: number
  timestamp: number
}

// 简单的内存存储（生产环境应使用数据库）
let leaderboard: LeaderboardEntry[] = []

export async function GET() {
  // 按分数降序排序，返回前 10 名
  const sorted = [...leaderboard]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)

  return NextResponse.json(sorted)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, score } = body

    if (!username || typeof score !== 'number') {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      )
    }

    const entry: LeaderboardEntry = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      username: username.substring(0, 20), // 限制用户名长度
      score: Math.max(0, Math.floor(score)), // 确保分数为非负整数
      timestamp: Date.now(),
    }

    leaderboard.push(entry)

    // 保持排行榜最多 100 条记录
    if (leaderboard.length > 100) {
      leaderboard = leaderboard
        .sort((a, b) => b.score - a.score)
        .slice(0, 100)
    }

    return NextResponse.json({ success: true, entry })
  } catch (error) {
    console.error('Error submitting score:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

