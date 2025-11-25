"use client"

import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

export function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const colors = [
      'rgba(59, 130, 246, 0.6)',   // blue
      'rgba(147, 51, 234, 0.6)',   // purple
      'rgba(236, 72, 153, 0.6)',   // pink
      'rgba(6, 182, 212, 0.6)',    // cyan
    ]

    const initialParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)]!
    }))

    setParticles(initialParticles)

    const animateParticles = () => {
      setParticles(prev => prev.map(particle => {
        const newX = particle.x + particle.speedX
        const newY = particle.y + particle.speedY
        
        return {
          ...particle,
          x: newX > window.innerWidth ? 0 : newX < 0 ? window.innerWidth : newX,
          y: newY > window.innerHeight ? 0 : newY < 0 ? window.innerHeight : newY,
        }
      }))
    }

    const interval = setInterval(animateParticles, 50)
    return () => clearInterval(interval)
  }, [])

  // Don't render anything until mounted on client to prevent hydration mismatch
  if (!mounted) {
    return <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full blur-sm"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transition: 'all 0.05s linear',
          }}
        />
      ))}
    </div>
  )
}