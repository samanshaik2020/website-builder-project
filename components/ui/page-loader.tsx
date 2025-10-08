"use client"

import { useEffect, useState } from "react"
import { Brain } from "lucide-react"

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          return 100
        }
        return prev + 2
      })
    }, 40)

    return () => {
      clearTimeout(timer)
      clearInterval(progressTimer)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl animate-pulse shadow-2xl">
            <Brain className="w-12 h-12 text-white animate-spin" />
          </div>
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl blur-lg animate-pulse" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Loading Squpage AI
        </h2>
        
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-gray-600 mt-4 text-sm">
          Preparing your AI-powered experience...
        </p>
      </div>
    </div>
  )
}