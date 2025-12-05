'use client'

import { useEffect, useState } from 'react'
import SnakeGame from '@/components/SnakeGame'
import Leaderboard from '@/components/Leaderboard'

export default function Home() {
  const [username, setUsername] = useState('')
  const [showGameOverModal, setShowGameOverModal] = useState(false)
  const [finalScore, setFinalScore] = useState(0)
  const [leaderboardKey, setLeaderboardKey] = useState(0)

  // 获取 Farcaster 用户信息
  useEffect(() => {
    const initFrame = async () => {
      try {
        // 检查是否在 Farcaster Frame 环境中
        if (typeof window !== 'undefined' && (window as any).farcaster) {
          const farcaster = (window as any).farcaster
          const context = await farcaster.context
          if (context?.user?.username) {
            setUsername(context.user.username)
          }
        } else if (typeof window !== 'undefined' && (window as any).parent) {
          // 尝试从父窗口获取 Farcaster 上下文
          try {
            const parent = (window as any).parent
            if (parent.farcaster) {
              const context = await parent.farcaster.context
              if (context?.user?.username) {
                setUsername(context.user.username)
              }
            }
          } catch (e) {
            // 跨域限制，忽略错误
          }
        }
      } catch (error) {
        // 非 Farcaster 环境，使用默认值
        console.log('Not in Farcaster environment, using default username')
      }
    }
    initFrame()
  }, [])

  const handleGameOver = async (score: number) => {
    setFinalScore(score)
    setShowGameOverModal(true)
  }

  const handleSubmitScore = async (name: string) => {
    try {
      const response = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: name || username || 'Anonymous',
          score: finalScore,
        }),
      })

      if (response.ok) {
        setShowGameOverModal(false)
        setLeaderboardKey(prev => prev + 1) // 刷新排行榜
      }
    } catch (error) {
      console.error('Failed to submit score:', error)
    }
  }

  return (
    <main style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px',
      overflow: 'auto'
    }}>
      <h1 className="retro-text" style={{ 
        fontSize: '32px', 
        marginBottom: '20px',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '3px'
      }}>
        🐍 Snake Game
      </h1>

      <SnakeGame onGameOver={handleGameOver} />

      <Leaderboard refreshKey={leaderboardKey} />

      {showGameOverModal && (
        <div className="game-over-modal">
          <h2 className="retro-text">Game Over!</h2>
          <p className="retro-text">Final Score: {finalScore}</p>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength={20}
            autoFocus
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSubmitScore(username)
              }
            }}
          />
          <button
            className="retro-button"
            onClick={() => handleSubmitScore(username)}
            style={{ width: '100%' }}
          >
            Submit Score
          </button>
        </div>
      )}
    </main>
  )
}

