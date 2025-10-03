"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Sparkles, Wand2, Brain, Zap, Check } from "lucide-react"

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
    <Dialog open={open} onOpenChange={(isOpen) => !generating && !isOpen && onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden p-0 gap-0">
        {/* Header Section */}
        <div className="relative overflow-hidden border-b">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"></div>
          
          <DialogHeader className="relative px-6 py-8 text-center">
            <div className="inline-flex items-center justify-center gap-3 mb-3 mx-auto">
              <div className="relative">
                <div className="absolute inset-0 bg-white/30 rounded-xl blur-lg"></div>
                <div className="relative p-3 bg-white/20 backdrop-blur-md rounded-xl border border-white/30">
                  <Brain className="w-8 h-8 text-white" />
                </div>
              </div>
              <DialogTitle className="text-4xl font-black text-white tracking-tight">
                AI Page Generator
              </DialogTitle>
            </div>
            <DialogDescription className="text-lg text-white/95 font-medium">
              Create a complete <span className="font-bold underline decoration-white/50">{templateType}</span> page with AI-powered content
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-240px)] p-6">
          {!generating ? (
            <div className="space-y-6">
              {/* Topic Input */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                  <Wand2 className="w-4 h-4" />
                  What is your website about?
                </label>
                <div className="relative">
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Describe your website in detail... e.g., An innovative project management tool for creative agencies that helps teams collaborate in real-time, track progress, and deliver projects faster."
                    className="w-full h-32 px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                    disabled={generating}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-slate-400 font-medium">
                    {topic.length} characters
                  </div>
                </div>
                <div className="mt-2 flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 bg-indigo-50 dark:bg-indigo-950/30 p-3 rounded-lg">
                  <Sparkles className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                  <p>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">Pro tip:</span> The more specific you are, the better the AI can create tailored content.
                  </p>
                </div>
              </div>

              {/* Theme Selection */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                  <Zap className="w-4 h-4" />
                  Choose your style & theme
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => !generating && setSelectedTheme(theme)}
                      disabled={generating}
                      className={cn(
                        "group relative p-4 rounded-xl border-2 text-left transition-all duration-200",
                        selectedTheme?.id === theme.id
                          ? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 shadow-lg"
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md"
                      )}
                    >
                      {/* Color Swatches */}
                      <div className="flex gap-1.5 mb-3">
                        {theme.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-lg border-2 border-white dark:border-slate-700 shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      
                      {/* Theme Info */}
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1 text-sm">{theme.name}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">{theme.description}</p>
                      
                      {/* Selected Indicator */}
                      {selectedTheme?.id === theme.id && (
                        <div className="absolute -top-1.5 -right-1.5 w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                          <Check className="w-4 h-4 text-white stroke-[3]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Loading State
            <div className="py-12 px-6 text-center">
              {/* Professional Loading Animation */}
              <div className="relative inline-block mb-8">
                <div className="w-32 h-32 relative">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                      className="text-slate-200 dark:text-slate-800"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${(progress / 100) * 352} 352`}
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
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
                      <div className="relative p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-xl">
                        <Brain className="w-10 h-10 text-white animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Status Text */}
              <div className="space-y-3 mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {status}
                </h3>
                <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm font-medium">AI is working its magic</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="max-w-sm mx-auto">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Action Buttons */}
        {!generating && (
          <DialogFooter className="border-t p-6 bg-slate-50 dark:bg-slate-900/50">
            <div className="flex gap-3 w-full">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1 h-11 font-semibold"
                disabled={generating}
              >
                Cancel
              </Button>
              <Button
                onClick={handleGenerate}
                disabled={!topic.trim() || !selectedTheme || generating}
                className="flex-1 h-11 font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                Generate My Website
                <Zap className="w-4 h-4 group-hover:-rotate-12 transition-transform" />
              </Button>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
