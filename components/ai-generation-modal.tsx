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

const saasThemes: Theme[] = [
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

const iphoneProThemes: Theme[] = [
  {
    id: "dark-gradient",
    name: "Dark Gradient",
    description: "Premium dark with blue-purple gradients",
    colors: ["#0F172A", "#3B82F6", "#8B5CF6"],
    tone: "premium, sophisticated, and high-tech"
  },
  {
    id: "light-elegant",
    name: "Light Elegant",
    description: "Clean white with blue accents",
    colors: ["#FFFFFF", "#2563EB", "#F3F4F6"],
    tone: "clean, minimal, and elegant"
  },
  {
    id: "neon-cyberpunk",
    name: "Neon Cyberpunk",
    description: "Black with cyan and pink neon",
    colors: ["#000000", "#06B6D4", "#EC4899"],
    tone: "edgy, futuristic, and bold"
  },
  {
    id: "luxury-gold",
    name: "Luxury Gold",
    description: "Cream with gold and amber accents",
    colors: ["#FFFBEB", "#D97706", "#F59E0B"],
    tone: "luxurious, refined, and premium"
  },
  {
    id: "minimalist-tech",
    name: "Minimalist Tech",
    description: "Monochrome black and white minimal",
    colors: ["#FFFFFF", "#000000", "#F5F5F5"],
    tone: "ultra-minimal and refined"
  },
  {
    id: "vibrant-gradient",
    name: "Vibrant Gradient",
    description: "Colorful pink-purple-blue gradients",
    colors: ["#EC4899", "#8B5CF6", "#3B82F6"],
    tone: "colorful, energetic, and playful"
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
  const [currentStep, setCurrentStep] = useState(0)

  // Select themes based on template type
  const themes = templateType === "iPhone Pro" ? iphoneProThemes : saasThemes

  // Enhanced loading animation with steps
  useEffect(() => {
    if (generating) {
      const steps = [
        'Analyzing your request...',
        `Applying ${selectedTheme?.name || 'selected'} theme...`,
        'Generating layout...',
        'Creating components...',
        'Adding styling...',
        'Finalizing design...',
      ]

      let stepIndex = 0

      const stepInterval = setInterval(() => {
        if (stepIndex < steps.length) {
          setStatus(steps[stepIndex])
          setCurrentStep(stepIndex)
          stepIndex++
        }
      }, 1200)

      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) return prev
          const increment = Math.random() * 8 + 2
          return Math.min(prev + increment, 95)
        })
      }, 200)

      return () => {
        clearInterval(stepInterval)
        clearInterval(progressInterval)
      }
    } else {
      setProgress(0)
      setCurrentStep(0)
    }
  }, [generating, selectedTheme])

  if (!open) return null

  const handleGenerate = async () => {
    if (!topic.trim() || !selectedTheme) return

    setGenerating(true)
    setProgress(0)
    setCurrentStep(0)
    
    try {
      // Enhanced loading sequence with realistic timing
      const loadingSteps = [
        { status: "Analyzing your request...", duration: 1000, progress: 15 },
        { status: `Applying ${selectedTheme.name} theme...`, duration: 1200, progress: 30 },
        { status: "Generating layout structure...", duration: 1000, progress: 50 },
        { status: "Creating compelling content...", duration: 1500, progress: 70 },
        { status: "Adding visual styling...", duration: 800, progress: 85 },
        { status: "Finalizing your masterpiece...", duration: 600, progress: 95 }
      ]

      // Execute loading steps with smooth progress
      for (let i = 0; i < loadingSteps.length; i++) {
        const step = loadingSteps[i]
        setStatus(step.status)
        setCurrentStep(i)
        
        // Animate progress smoothly to target
        const startProgress = i === 0 ? 0 : loadingSteps[i - 1].progress
        const targetProgress = step.progress
        const progressDuration = step.duration * 0.7 // Use 70% of time for progress animation
        
        const progressStart = Date.now()
        const progressAnimation = () => {
          const elapsed = Date.now() - progressStart
          const progressRatio = Math.min(elapsed / progressDuration, 1)
          const currentProgress = startProgress + (targetProgress - startProgress) * progressRatio
          
          setProgress(currentProgress)
          
          if (progressRatio < 1) {
            requestAnimationFrame(progressAnimation)
          }
        }
        progressAnimation()
        
        await new Promise(resolve => setTimeout(resolve, step.duration))
      }
      
      // Call the actual generation function
      await onGenerate(topic, selectedTheme)
      
      // Final completion
      setStatus("Complete! 🎉")
      setProgress(100)
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Reset state (parent will handle closing the modal)
      setTopic("")
      setSelectedTheme(null)
      setGenerating(false)
      setStatus("")
      setProgress(0)
      setCurrentStep(0)
      
    } catch (error) {
      console.error("AI Generation Error:", error)
      setStatus("⚠️ Generation failed. Please try again.")
      setProgress(0)
      setGenerating(false)
      setTimeout(() => {
        setStatus("")
        setCurrentStep(0)
      }, 3000)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !generating && !isOpen && onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden p-0 gap-0 bg-white">
        {/* Header Section - Light Theme */}
        <div className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100">
          <DialogHeader className="relative px-6 py-8 text-center">
            <div className="inline-flex items-center justify-center gap-3 mb-3 mx-auto">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/10 rounded-xl blur-md"></div>
                <div className="relative p-3 bg-white rounded-xl border-2 border-blue-500/20 shadow-sm">
                  <Brain className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <DialogTitle className="text-4xl font-bold text-slate-900 tracking-tight">
                AI Page Generator
              </DialogTitle>
            </div>
            <DialogDescription className="text-base text-slate-600 font-medium">
              Create a complete <span className="font-bold text-blue-600">{templateType}</span> page with AI-powered content
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-240px)] p-6">
          {!generating ? (
            <div className="space-y-6">
              {/* Topic Input */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-3">
                  <Wand2 className="w-4 h-4 text-blue-600" />
                  What is your website about?
                </label>
                <div className="relative">
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Describe your website in detail... e.g., An innovative project management tool for creative agencies that helps teams collaborate in real-time, track progress, and deliver projects faster."
                    className="w-full h-32 px-4 py-3 border-2 border-slate-200 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm shadow-sm"
                    disabled={generating}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-slate-400 font-medium bg-white/80 px-2 py-1 rounded">
                    {topic.length} characters
                  </div>
                </div>
                <div className="mt-3 flex items-start gap-2 text-xs text-blue-700 bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p>
                    <span className="font-semibold">Pro tip:</span> The more specific you are, the better the AI can create tailored content.
                  </p>
                </div>
              </div>

              {/* Theme Selection */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-3">
                  <Zap className="w-4 h-4 text-blue-600" />
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
                          ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg ring-2 ring-blue-100"
                          : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-md"
                      )}
                    >
                      {/* Color Swatches */}
                      <div className="flex gap-1.5 mb-3">
                        {theme.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-lg border-2 border-white shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      
                      {/* Theme Info */}
                      <h4 className="font-bold text-slate-900 mb-1 text-sm">{theme.name}</h4>
                      <p className="text-xs text-slate-600 leading-snug">{theme.description}</p>
                      
                      {/* Selected Indicator */}
                      {selectedTheme?.id === theme.id && (
                        <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                          <Check className="w-4 h-4 text-white stroke-[3]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Clean Loading State - Light Theme
            <div className="py-16 px-6 text-center relative">
              {/* Simple Loading Animation */}
              <div className="relative inline-block mb-8">
                <div className="w-32 h-32 relative">
                  {/* Outer rotating ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                  <div 
                    className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-400 animate-spin"
                    style={{ animationDuration: '1.5s' }}
                  ></div>
                  
                  {/* Progress circle */}
                  <svg className="w-full h-full -rotate-90 absolute inset-0" viewBox="0 0 128 128">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      className="text-slate-100"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="url(#progressGradient)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={`${(progress / 100) * 352} 352`}
                      className="transition-all duration-500 ease-out"
                    />
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#2563eb" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Center icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative p-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg">
                      <Brain 
                        className="w-10 h-10 text-white" 
                        style={{
                          animation: 'pulse 2s ease-in-out infinite'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Status Display */}
              <div className="space-y-4 mb-8">
                <h3 className="text-2xl font-bold text-slate-900">
                  {status}
                </h3>
                
                {/* Step indicators */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i <= currentStep 
                          ? 'w-8 bg-blue-500' 
                          : 'w-4 bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
                
                <p className="text-sm text-slate-600 font-medium">
                  AI is crafting your perfect website
                </p>
              </div>
              
              {/* Progress Bar */}
              <div className="max-w-md mx-auto">
                <div className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                  <span>Generation Progress</span>
                  <span className="tabular-nums">{Math.round(progress)}%</span>
                </div>
                <div className="relative h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  >
                    {/* Shine effect */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      style={{
                        animation: 'shine 2s ease-in-out infinite'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* CSS Animations */}
              <style jsx>{`
                @keyframes shine {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(200%); }
                }
              `}</style>
            </div>
          )}
        </div>

        {/* Footer with Action Buttons */}
        {!generating && (
          <DialogFooter className="border-t border-slate-200 p-6 bg-white">
            <div className="flex gap-3 w-full">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1 h-11 font-semibold border-slate-300 text-slate-700 hover:bg-slate-50"
                disabled={generating}
              >
                Cancel
              </Button>
              <Button
                onClick={handleGenerate}
                disabled={!topic.trim() || !selectedTheme || generating}
                className="flex-1 h-11 font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
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
