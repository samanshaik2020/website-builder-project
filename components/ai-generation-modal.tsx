"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Sparkles, Wand2, Brain, Zap, Check, Cpu, Layers, Palette, Rocket } from "lucide-react"

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

const portfolioProThemes: Theme[] = [
  {
    id: "default",
    name: "Professional Default",
    description: "Clean and professional portfolio design",
    colors: ["#000000", "#ffffff", "#3b82f6"],
    tone: "professional, clean, and polished"
  },
  {
    id: "creative-artist",
    name: "Creative Artist",
    description: "Vibrant and artistic design for digital artists",
    colors: ["#ec4899", "#f97316", "#8b5cf6"],
    tone: "creative, artistic, and vibrant"
  },
  {
    id: "tech-minimal",
    name: "Tech Minimal",
    description: "Minimalist design for developers and tech professionals",
    colors: ["#f3f4f6", "#1f2937", "#3b82f6"],
    tone: "technical, minimal, and modern"
  },
  {
    id: "luxury-elegant",
    name: "Luxury Elegant",
    description: "Sophisticated design for luxury brands",
    colors: ["#000000", "#f59e0b", "#ffffff"],
    tone: "luxurious, elegant, and sophisticated"
  },
  {
    id: "nature-organic",
    name: "Nature Organic",
    description: "Earth-friendly design for sustainable brands",
    colors: ["#16a34a", "#059669", "#10b981"],
    tone: "natural, organic, and eco-friendly"
  },
  {
    id: "cyberpunk-futuristic",
    name: "Cyberpunk Futuristic",
    description: "High-tech design for futuristic themes",
    colors: ["#000000", "#06b6d4", "#ec4899"],
    tone: "futuristic, edgy, and high-tech"
  }
]

const agencyProThemes: Theme[] = [
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

const ecommerceProThemes: Theme[] = [
  {
    id: "luxury-elegant",
    name: "Luxury Elegant",
    description: "Sophisticated and premium with exclusivity",
    colors: ["#9333EA", "#D946EF", "#FFFFFF"],
    tone: "sophisticated, premium, and refined with emphasis on exclusivity and high-end appeal"
  },
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    description: "Clean and contemporary simplicity",
    colors: ["#000000", "#FFFFFF", "#F5F5F5"],
    tone: "clean, contemporary, and straightforward with focus on simplicity and functionality"
  },
  {
    id: "vibrant-bold",
    name: "Vibrant Bold",
    description: "Energetic and dynamic statement",
    colors: ["#EC4899", "#8B5CF6", "#F59E0B"],
    tone: "energetic, exciting, and dynamic with emphasis on standing out and making a statement"
  },
  {
    id: "athletic-sport",
    name: "Athletic Sport",
    description: "Powerful and performance-driven",
    colors: ["#F97316", "#000000", "#FFFFFF"],
    tone: "powerful, motivational, and performance-driven with focus on action and achievement"
  },
  {
    id: "eco-natural",
    name: "Eco Natural",
    description: "Organic and earth-conscious",
    colors: ["#16A34A", "#84CC16", "#F0FDF4"],
    tone: "organic, sustainable, and earth-conscious with emphasis on natural materials and ethics"
  },
  {
    id: "tech-futuristic",
    name: "Tech Futuristic",
    description: "Innovative and cutting-edge",
    colors: ["#0EA5E9", "#8B5CF6", "#1E293B"],
    tone: "innovative, cutting-edge, and forward-thinking with focus on technology and innovation"
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
  const themes = 
    templateType === "iPhone Pro" ? iphoneProThemes :
    templateType === "Portfolio Pro" ? portfolioProThemes :
    templateType === "Agency Pro" ? agencyProThemes :
    templateType === "E-commerce Pro" ? ecommerceProThemes :
    saasThemes

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
      <DialogContent className="max-w-6xl h-[85vh] overflow-hidden p-0 gap-0 bg-white border border-slate-200 shadow-2xl flex flex-col">
        {!generating ? (
          // Main Form Layout - No Scroll, Single Page
          <>
            {/* Premium Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white border-b border-blue-200 flex-shrink-0">
              <DialogHeader className="relative px-8 py-6">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <div className="relative">
                    <div className="relative p-3 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-center">
                    <DialogTitle className="text-3xl font-bold tracking-tight text-white">
                      AI Page Generator
                    </DialogTitle>
                    <DialogDescription className="text-white/90 font-medium text-base mt-1">
                      Create a complete <span className="font-bold text-white">{templateType}</span> page with AI-powered content
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
            </div>

            {/* Main Content - Two Column Layout */}
            <div className="flex-1 flex overflow-hidden min-h-0">
              {/* Left Column - Form */}
              <div className="flex-1 p-8 space-y-6 overflow-y-auto min-h-0">
                {/* Topic Input Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                      <Wand2 className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">What is your website about?</h3>
                  </div>
                  
                  <div className="relative group">
                    <textarea
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="Describe your website in detail... e.g., An innovative project management tool for creative agencies that helps teams collaborate in real-time, track progress, and deliver projects faster."
                      className="w-full h-36 px-6 py-4 border-2 border-slate-200 rounded-2xl bg-white/80 backdrop-blur-sm text-slate-900 placeholder:text-slate-400 resize-none focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-base shadow-lg group-hover:shadow-xl"
                      disabled={generating}
                    />
                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                      <div className="text-sm text-slate-500 font-medium bg-white/90 px-3 py-1 rounded-full border">
                        {topic.length} chars
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 text-sm text-blue-800 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200/50">
                    <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Pro tip for better results:</p>
                      <p className="text-blue-700">The more specific and detailed you are, the better the AI can create tailored, professional content that matches your vision.</p>
                    </div>
                  </div>
                </div>

                {/* Theme Selection */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                      <Palette className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Choose your style & theme</h3>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {themes.map((theme) => (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => !generating && setSelectedTheme(theme)}
                        disabled={generating}
                        className={cn(
                          "group relative p-5 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-105",
                          selectedTheme?.id === theme.id
                            ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl ring-4 ring-blue-100 scale-105"
                            : "border-slate-200 bg-white/80 backdrop-blur-sm hover:border-blue-300 hover:shadow-lg"
                        )}
                      >
                        {/* Color Swatches */}
                        <div className="flex gap-2 mb-4">
                          {theme.colors.map((color, i) => (
                            <div
                              key={i}
                              className="w-6 h-6 rounded-lg border-2 border-white shadow-md"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        
                        {/* Theme Info */}
                        <h4 className="font-bold text-slate-900 mb-2 text-sm">{theme.name}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{theme.description}</p>
                        
                        {/* Selected Indicator */}
                        {selectedTheme?.id === theme.id && (
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                            <Check className="w-4 h-4 text-white stroke-[3]" />
                          </div>
                        )}
                        
                        {/* Hover Effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Preview & Features */}
              <div className="w-80 bg-gradient-to-b from-blue-50 to-indigo-50 border-l border-slate-200 p-6 space-y-6 overflow-y-auto min-h-0">
                {/* AI Features */}
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900 text-lg mb-4">What you'll get:</h4>
                  
                  <div className="space-y-3">
                    {[
                      { icon: Cpu, title: "AI-Generated Content", desc: "Professional copy tailored to your business" },
                      { icon: Layers, title: "Complete Layout", desc: "Fully structured sections and components" },
                      { icon: Palette, title: "Custom Styling", desc: "Theme-matched colors and typography" },
                      { icon: Rocket, title: "Ready to Deploy", desc: "Production-ready code in seconds" }
                    ].map((feature, i) => (
                      <div key={i} className="flex gap-3 p-3 bg-white/60 rounded-xl border border-slate-200/50 backdrop-blur-sm">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex-shrink-0">
                          <feature.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-slate-900 text-sm">{feature.title}</h5>
                          <p className="text-xs text-slate-600 leading-relaxed">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Theme Preview */}
                {selectedTheme && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-900 text-lg">Selected Theme:</h4>
                    <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex gap-2 mb-3">
                        {selectedTheme.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-lg border-2 border-white shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <h5 className="font-bold text-slate-900 mb-1">{selectedTheme.name}</h5>
                      <p className="text-sm text-slate-600 mb-2">{selectedTheme.description}</p>
                      <p className="text-xs text-blue-600 font-medium">Tone: {selectedTheme.tone}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Footer */}
            <div className="border-t border-slate-200 bg-white/80 backdrop-blur-sm p-6 flex-shrink-0">
              <div className="flex gap-4">
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="px-8 h-12 font-semibold border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl"
                  disabled={generating}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleGenerate}
                  disabled={!topic.trim() || !selectedTheme || generating}
                  className="flex-1 h-12 font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all gap-3 disabled:opacity-50 disabled:cursor-not-allowed group rounded-xl text-lg"
                >
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Generate My Professional Website
                  <Rocket className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          // Professional Loading State - Full Screen
          <div className="h-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Animated Background */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/30 to-purple-100/30"></div>
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>

            <div className="relative text-center z-10 max-w-2xl mx-auto px-8">
              {/* Main Loading Animation */}
              <div className="relative inline-block mb-10">
                <div className="w-40 h-40 relative">
                  {/* Progress circle */}
                  <svg className="w-full h-full -rotate-90 absolute inset-0" viewBox="0 0 160 160">
                    <circle
                      cx="80"
                      cy="80"
                      r="72"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      className="text-blue-200"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="72"
                      fill="none"
                      stroke="url(#loadingGradient)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={`${(progress / 100) * 452} 452`}
                      className="transition-all duration-500 ease-out"
                    />
                    <defs>
                      <linearGradient id="loadingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="50%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#A855F7" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Center content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="relative p-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg mb-3">
                        <Brain 
                          className="w-12 h-12 text-white" 
                          style={{
                            animation: 'pulse 2s ease-in-out infinite'
                          }}
                        />
                      </div>
                      <div className="text-3xl font-bold tabular-nums text-blue-600">
                        {Math.round(progress)}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Status Display */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-800">
                  {status}
                </h2>
                
                {/* Enhanced step indicators */}
                <div className="flex items-center justify-center gap-2">
                  {[
                    { icon: Brain, label: "Analyzing" },
                    { icon: Palette, label: "Theming" },
                    { icon: Layers, label: "Layout" },
                    { icon: Cpu, label: "Content" },
                    { icon: Sparkles, label: "Styling" },
                    { icon: Rocket, label: "Finalizing" }
                  ].map((step, i) => (
                    <div
                      key={i}
                      className={`flex flex-col items-center gap-2 transition-all duration-500 ${
                        i <= currentStep ? 'opacity-100 scale-100' : 'opacity-30 scale-90'
                      }`}
                    >
                      <div className={`p-2.5 rounded-full transition-all duration-500 ${
                        i <= currentStep 
                          ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-md' 
                          : 'bg-slate-200'
                      }`}>
                        <step.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-medium text-slate-600">{step.label}</span>
                    </div>
                  ))}
                </div>
                
                <p className="text-lg text-slate-600 font-medium">
                  AI is crafting your professional website experience
                </p>
              </div>
            </div>

            {/* Floating particles animation */}
            <style jsx>{`
              @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(180deg); }
              }
            `}</style>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
