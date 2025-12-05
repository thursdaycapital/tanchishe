'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface Position {
  x: number
  y: number
}

interface GameState {
  snake: Position[]
  food: Position
  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
  score: number
  gameOver: boolean
  paused: boolean
}

const GRID_SIZE = 20
const CELL_SIZE = 20
const GAME_SPEED = 150 // 游戏速度（毫秒），数值越大越慢
const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 }
]

export default function SnakeGame({ onGameOver }: { onGameOver: (score: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameStateRef = useRef<GameState>({
    snake: [...INITIAL_SNAKE],
    food: { x: 15, y: 15 },
    direction: 'UP',
    score: 0,
    gameOver: false,
    paused: false
  })
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [paused, setPaused] = useState(false)
  const gameLoopRef = useRef<number>()
  const gameIntervalRef = useRef<NodeJS.Timeout>()

  // 生成随机食物位置
  const generateFood = useCallback((): Position => {
    let newFood: Position
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      }
    } while (
      gameStateRef.current.snake.some(
        segment => segment.x === newFood.x && segment.y === newFood.y
      )
    )
    return newFood
  }, [])

  // 绘制游戏
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 清空画布
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 绘制网格
    ctx.strokeStyle = '#003300'
    ctx.lineWidth = 1
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * CELL_SIZE, 0)
      ctx.lineTo(i * CELL_SIZE, canvas.height)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i * CELL_SIZE)
      ctx.lineTo(canvas.width, i * CELL_SIZE)
      ctx.stroke()
    }

    const state = gameStateRef.current

    // 绘制食物
    ctx.fillStyle = '#ff0000'
    ctx.shadowBlur = 10
    ctx.shadowColor = '#ff0000'
    ctx.fillRect(
      state.food.x * CELL_SIZE + 2,
      state.food.y * CELL_SIZE + 2,
      CELL_SIZE - 4,
      CELL_SIZE - 4
    )
    ctx.shadowBlur = 0

    // 绘制蛇
    state.snake.forEach((segment, index) => {
      if (index === 0) {
        // 蛇头
        ctx.fillStyle = '#00ff00'
        ctx.shadowBlur = 15
        ctx.shadowColor = '#00ff00'
      } else {
        // 蛇身
        ctx.fillStyle = '#00cc00'
        ctx.shadowBlur = 5
        ctx.shadowColor = '#00cc00'
      }
      ctx.fillRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      )
    })
    ctx.shadowBlur = 0

    // 绘制暂停提示
    if (state.paused && !state.gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#00ff00'
      ctx.font = '20px "Courier New", monospace'
      ctx.textAlign = 'center'
      ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2)
    }
  }, [])

  // 游戏逻辑更新
  const update = useCallback(() => {
    const state = gameStateRef.current

    if (state.gameOver || state.paused) {
      return
    }

    // 移动蛇头
    const head = { ...state.snake[0] }
    switch (state.direction) {
      case 'UP':
        head.y -= 1
        break
      case 'DOWN':
        head.y += 1
        break
      case 'LEFT':
        head.x -= 1
        break
      case 'RIGHT':
        head.x += 1
        break
    }

    // 检查边界碰撞
    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE
    ) {
      state.gameOver = true
      setGameOver(true)
      onGameOver(state.score)
      return
    }

    // 检查自身碰撞
    if (
      state.snake.some(
        segment => segment.x === head.x && segment.y === head.y
      )
    ) {
      state.gameOver = true
      setGameOver(true)
      onGameOver(state.score)
      return
    }

    // 添加新头部
    state.snake.unshift(head)

    // 检查是否吃到食物
    if (head.x === state.food.x && head.y === state.food.y) {
      state.score += 10
      setScore(state.score)
      state.food = generateFood()
    } else {
      // 移除尾部
      state.snake.pop()
    }
  }, [generateFood, onGameOver])

  // 游戏循环
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = GRID_SIZE * CELL_SIZE
    canvas.height = GRID_SIZE * CELL_SIZE

    // 初始绘制
    draw()

    // 使用 setInterval 控制游戏速度
    gameIntervalRef.current = setInterval(() => {
      const state = gameStateRef.current
      if (!state.gameOver && !state.paused) {
        update()
      } else {
        draw() // 即使暂停也要重绘以显示暂停状态
      }
    }, GAME_SPEED)

    // 使用 requestAnimationFrame 进行平滑渲染
    const gameLoop = () => {
      draw()
      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
      if (gameIntervalRef.current) {
        clearInterval(gameIntervalRef.current)
      }
    }
  }, [draw, update])

  // 键盘控制
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const state = gameStateRef.current

      if (state.gameOver) return

      // 空格键暂停/继续
      if (e.key === ' ' || e.key === 'Space') {
        e.preventDefault()
        state.paused = !state.paused
        setPaused(state.paused)
        return
      }

      if (state.paused) return

      // 方向键控制
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          if (state.direction !== 'DOWN') {
            state.direction = 'UP'
          }
          break
        case 'ArrowDown':
          e.preventDefault()
          if (state.direction !== 'UP') {
            state.direction = 'DOWN'
          }
          break
        case 'ArrowLeft':
          e.preventDefault()
          if (state.direction !== 'RIGHT') {
            state.direction = 'LEFT'
          }
          break
        case 'ArrowRight':
          e.preventDefault()
          if (state.direction !== 'LEFT') {
            state.direction = 'RIGHT'
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  // 触摸控制（移动端）
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    const touch = e.touches[0]
    const startX = touch.clientX
    const startY = touch.clientY

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault()
      const touch = e.changedTouches[0]
      const endX = touch.clientX
      const endY = touch.clientY

      const dx = endX - startX
      const dy = endY - startY

      const state = gameStateRef.current
      if (state.gameOver || state.paused) return

      if (Math.abs(dx) > Math.abs(dy)) {
        // 水平滑动
        if (dx > 30 && state.direction !== 'LEFT') {
          state.direction = 'RIGHT'
        } else if (dx < -30 && state.direction !== 'RIGHT') {
          state.direction = 'LEFT'
        }
      } else {
        // 垂直滑动
        if (dy > 30 && state.direction !== 'UP') {
          state.direction = 'DOWN'
        } else if (dy < -30 && state.direction !== 'DOWN') {
          state.direction = 'UP'
        }
      }

      document.removeEventListener('touchend', handleTouchEnd)
    }

    document.addEventListener('touchend', handleTouchEnd, { once: true })
  }, [])

  // 处理方向键按钮点击
  const handleDirectionClick = useCallback((direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    const state = gameStateRef.current
    if (state.gameOver || state.paused) return

    // 防止反向移动
    switch (direction) {
      case 'UP':
        if (state.direction !== 'DOWN') {
          state.direction = 'UP'
        }
        break
      case 'DOWN':
        if (state.direction !== 'UP') {
          state.direction = 'DOWN'
        }
        break
      case 'LEFT':
        if (state.direction !== 'RIGHT') {
          state.direction = 'LEFT'
        }
        break
      case 'RIGHT':
        if (state.direction !== 'LEFT') {
          state.direction = 'RIGHT'
        }
        break
    }
  }, [])

  // 重新开始游戏
  const restart = useCallback(() => {
    gameStateRef.current = {
      snake: [...INITIAL_SNAKE],
      food: generateFood(),
      direction: 'UP',
      score: 0,
      gameOver: false,
      paused: false
    }
    setScore(0)
    setGameOver(false)
    setPaused(false)
  }, [generateFood])

  return (
    <div className="game-container">
      <div className="game-info">
        <div className="retro-text">Score: {score}</div>
        {paused && <div className="retro-text">PAUSED</div>}
      </div>
      <canvas
        ref={canvasRef}
        onTouchStart={handleTouchStart}
        style={{
          border: '3px solid #00ff00',
          boxShadow: '0 0 20px rgba(0, 255, 0, 0.5)',
          background: '#000'
        }}
      />
      {gameOver && (
        <button className="retro-button" onClick={restart}>
          Restart
        </button>
      )}
      {!gameOver && (
        <>
          <div className="retro-text" style={{ fontSize: '12px', textAlign: 'center' }}>
            Use Arrow Keys or Swipe to Control
            <br />
            Press Space to Pause
          </div>
          {/* 方向键按钮 - 十字形布局 */}
          <div className="direction-buttons">
            <div className="direction-buttons-grid">
              <div></div>
              <button
                className="direction-btn direction-btn-up"
                onClick={() => handleDirectionClick('UP')}
                aria-label="Up"
              >
                ↑
              </button>
              <div></div>
              <button
                className="direction-btn direction-btn-left"
                onClick={() => handleDirectionClick('LEFT')}
                aria-label="Left"
              >
                ←
              </button>
              <div></div>
              <button
                className="direction-btn direction-btn-right"
                onClick={() => handleDirectionClick('RIGHT')}
                aria-label="Right"
              >
                →
              </button>
              <div></div>
              <button
                className="direction-btn direction-btn-down"
                onClick={() => handleDirectionClick('DOWN')}
                aria-label="Down"
              >
                ↓
              </button>
              <div></div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

