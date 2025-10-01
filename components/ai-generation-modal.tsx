"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Sparkles, Wand2, Brain, Zap, Check, X } from "lucide-react"

type Theme = {
  id: string
  name: string
  description: string
  colors: string[]
  tone: string
}

export type { Theme as AITheme }

const themes: Theme[] = [
  {
    id: "modern-minimal",
    name: "Modern & Minimal",
    description: "Clean, professional, and sophisticated",
    colors: ["#000000", "#FFFFFF", "#F5F5F5"],
    tone: "professional, concise, and clear"
  },
  {
    id: "vibrant-playful",
    name: "Vibrant & Playful",
    description: "Energetic, fun, and approachable",
    colors: ["#FF6B6B", "#4ECDC4", "#FFE66D"],
    tone: "fun, energetic, and engaging"
  },
  {
    id: "corporate-blue",
    name: "Corporate & Blue",
    description: "Trustworthy, reliable, and professional",
    colors: ["#1E3A8A", "#3B82F6", "#DBEAFE"],
    tone: "trustworthy, corporate, and authoritative"
  },
  {
    id: "elegant-dark",
    name: "Elegant & Dark",
    description: "Sophisticated, premium, and luxurious",
    colors: ["#1A1A1A", "#D4AF37", "#F5F5F5"],
    tone: "elegant, sophisticated, and premium"
  },
  {
    id: "creative-bold",
    name: "Creative & Bold",
    description: "Innovative, daring, and imaginative",
    colors: ["#8B5CF6", "#EC4899", "#F59E0B"],
    tone: "bold, creative, and innovative"
  },
  {
    id: "nature-calm",
    name: "Nature & Calm",
    description: "Peaceful, organic, and grounded",
    colors: ["#059669", "#10B981", "#D1FAE5"],
    tone: "calm, natural, and soothing"
  }
]

interface AIGenerationModalProps {
  open: boolean
  templateType: string
  onClose: () => void
  onGenerate: (topic: string, theme: Theme) => Promise<void>
}

export function AIGenerationModal({ open, templateType, onClose, onGenerate }: AIGenerationModalProps) {
  const [topic, setTopic] = useState("")
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null)
  const [generating, setGenerating] = useState(false)
  const [status, setStatus] = useState("")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (generating) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) return prev
          return prev + Math.random() * 10
        })
      }, 300)
      return () => clearInterval(interval)
    } else {
      setProgress(0)
    }
  }, [generating])

  if (!open) return null

  const handleGenerate = async () => {
    if (!topic.trim() || !selectedTheme) return

    setGenerating(true)
    setStatus("Analyzing your topic...")
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      setStatus("Generating creative content...")
      await new Promise(resolve => setTimeout(resolve, 800))
      setStatus("Writing compelling copy...")
      await new Promise(resolve => setTimeout(resolve, 800))
      setStatus("Finalizing your page...")
      
      await onGenerate(topic, selectedTheme)
      
      setStatus("Complete!")
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Reset state (parent will handle closing the modal)
      setTopic("")
      setSelectedTheme(null)
      setGenerating(false)
      setStatus("")
      // Note: Don't call onClose() here - parent handles it after successful generation
    } catch (error) {
      setStatus("Error generating content. Please try again.")
      setGenerating(false)
      setTimeout(() => setStatus(""), 3000)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)',
        backdropFilter: 'blur(12px)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !generating) onClose()
      }}
    >
      <div className="relative w-full max-w-6xl max-h-[95vh] overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-slate-200/50 dark:border-slate-700/50">
        {/* Close Button */}
        {!generating && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl group"
          >
            <X className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" />
          </button>
        )}

        {/* Header Section */}
        <div className="relative overflow-hidden border-b border-slate-200/50 dark:border-slate-700/50">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-90"></div>
          
          {/* Animated mesh gradient overlay */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>
          
          <div className="relative px-8 py-12 text-center">
            <div className="inline-flex items-center justify-center gap-3 mb-5">
              <div className="relative">
                <div className="absolute inset-0 bg-white/30 rounded-2xl blur-xl"></div>
                <div className="relative p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-2xl">
                  <Brain className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
              </div>
              <h1 className="text-5xl font-black text-white drop-shadow-2xl tracking-tight">
                AI Page Generator
              </h1>
            </div>
            <p className="text-xl text-white/95 max-w-2xl mx-auto font-medium drop-shadow-lg">
              Create a complete <span className="font-bold underline decoration-white/50">{templateType}</span> page with AI-powered content in seconds
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-200px)] p-10">
          {!generating ? (
            <>
              {/* Topic Input */}
              <div className="mb-10">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wider">
                  <Wand2 className="w-4 h-4" />
                  What is your website about?
                </label>
                <div className="relative">
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Describe your website in detail... e.g., An innovative project management tool for creative agencies that helps teams collaborate in real-time, track progress, and deliver projects faster."
                    className="w-full h-40 px-6 py-5 border-2 border-slate-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-base shadow-sm hover:shadow-md font-medium leading-relaxed"
                    disabled={generating}
                  />
                  <div className="absolute bottom-4 right-4 text-xs text-slate-400 dark:text-slate-600 font-medium">
                    {topic.length} characters
                  </div>
                </div>
                <div className="mt-3 flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400 bg-indigo-50 dark:bg-indigo-950/30 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
                  <Sparkles className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">Pro tip:</span> The more specific you are, the better the AI can create tailored, relevant content for your website.
                  </p>
                </div>
              </div>

              {/* Theme Selection */}
              <div className="mb-8">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 mb-5 uppercase tracking-wider">
                  <Zap className="w-4 h-4" />
                  Choose your style & theme
                </label>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => !generating && setSelectedTheme(theme)}
                      disabled={generating}
                      className={cn(
                        "group relative p-6 rounded-2xl border-2 text-left transition-all duration-300",
                        selectedTheme?.id === theme.id
                          ? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 shadow-xl scale-[1.02]"
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-lg hover:scale-[1.01]"
                      )}
                    >
                      {/* Color Swatches */}
                      <div className="flex gap-2.5 mb-5">
                        {theme.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-11 h-11 rounded-xl border-2 border-white dark:border-slate-700 shadow-lg transition-transform group-hover:scale-110"
                            style={{ 
                              backgroundColor: color,
                              transitionDelay: `${i * 50}ms`
                            }}
                          />
                        ))}
                      </div>
                      
                      {/* Theme Info */}
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-lg">{theme.name}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{theme.description}</p>
                      
                      {/* Selected Indicator */}
                      {selectedTheme?.id === theme.id && (
                        <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-in zoom-in duration-300">
                          <Check className="w-6 h-6 text-white stroke-[3]" />
                        </div>
                      )}
                      
                      {/* Hover glow effect */}
                      <div className={cn(
                        "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
                        selectedTheme?.id === theme.id ? "opacity-100" : ""
                      )}>
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl"></div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            // Loading State
            <div className="py-16 px-8 text-center">
              {/* Professional Loading Animation */}
              <div className="relative inline-block mb-10">
                {/* Outer rotating gradient ring */}
                <div className="w-40 h-40 relative">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-slate-200 dark:text-slate-800"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${(progress / 100) * 440} 440`}
                      className="transition-all duration-300 ease-out"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="50%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Center icon with pulse */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                      <div className="relative p-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-2xl">
                        <Brain className="w-12 h-12 text-white animate-pulse" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Orbiting particles */}
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
                    <div className="absolute top-0 left-1/2 w-3 h-3 bg-indigo-500 rounded-full -translate-x-1/2 shadow-lg"></div>
                  </div>
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}>
                    <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-purple-500 rounded-full -translate-x-1/2 shadow-lg"></div>
                  </div>
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: '2.5s' }}>
                    <div className="absolute top-1/2 right-0 w-2.5 h-2.5 bg-pink-500 rounded-full -translate-y-1/2 shadow-lg"></div>
                  </div>
                </div>
              </div>
              
              {/* Status Text */}
              <div className="space-y-4 mb-8">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {status}
                </h3>
                <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm font-medium">AI is working its magic</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="max-w-md mx-auto">
                <div className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out shadow-lg"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Action Buttons */}
        {!generating && (
          <div className="border-t border-slate-200 dark:border-slate-700 p-8 bg-slate-50 dark:bg-slate-900/50">
            <div className="flex gap-4 max-w-2xl mx-auto">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1 h-14 text-base font-bold border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all rounded-xl"
                disabled={generating}
              >
                Cancel
              </Button>
              <Button
                onClick={handleGenerate}
                disabled={!topic.trim() || !selectedTheme || generating}
                className="flex-1 h-14 text-base font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl transition-all gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none rounded-xl group"
              >
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Generate My Website
                <Zap className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
