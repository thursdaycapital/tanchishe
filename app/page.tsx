'use client'

import { useState } from 'react'
import SnakeGame from '@/components/SnakeGame'
import Leaderboard from '@/components/Leaderboard'

export default function Home() {
  const [username, setUsername] = useState('')
  const [showGameOverModal, setShowGameOverModal] = useState(false)
  const [finalScore, setFinalScore] = useState(0)
  const [leaderboardKey, setLeaderboardKey] = useState(0)

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

