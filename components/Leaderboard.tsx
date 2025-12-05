'use client'

import { useEffect, useState } from 'react'

interface LeaderboardEntry {
  id: string
  username: string
  score: number
  timestamp: number
}

export default function Leaderboard({ refreshKey }: { refreshKey?: number }) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/leaderboard')
      if (response.ok) {
        const data = await response.json()
        setEntries(data)
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error)
    }
  }

  useEffect(() => {
    fetchLeaderboard()
  }, [refreshKey])

  return (
    <div className="leaderboard">
      <h2 className="retro-text">🏆 Leaderboard</h2>
      {entries.length === 0 ? (
        <div className="retro-text" style={{ textAlign: 'center', padding: '20px' }}>
          No scores yet. Be the first!
        </div>
      ) : (
        entries.map((entry, index) => (
          <div key={entry.id} className="leaderboard-item">
            <div>
              <span className="leaderboard-rank">#{index + 1}</span>
              <span className="retro-text">{entry.username || 'Anonymous'}</span>
            </div>
            <div className="retro-text">{entry.score}</div>
          </div>
        ))
      )}
    </div>
  )
}

