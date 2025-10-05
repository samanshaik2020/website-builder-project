"use client"

import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "gradient" | "minimal"
  className?: string
  text?: string
}

export function LoadingSpinner({ 
  size = "md", 
  variant = "default", 
  className,
  text 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  }

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base", 
    xl: "text-lg"
  }

  if (variant === "gradient") {
    return (
      <div className={cn("flex flex-col items-center gap-3", className)}>
        <div className={cn("relative", sizeClasses[size])}>
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-2 border-slate-200 dark:border-slate-800"></div>
          <div 
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-500 border-r-purple-500 animate-spin"
            style={{ animationDuration: '1s' }}
          ></div>
          
          {/* Inner pulsing dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {text && (
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce"></div>
              <div className="w-1 h-1 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1 h-1 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className={cn("font-medium", textSizeClasses[size])}>{text}</span>
          </div>
        )}
      </div>
    )
  }

  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className={cn("animate-spin rounded-full border-2 border-slate-300 border-t-slate-600 dark:border-slate-600 dark:border-t-slate-300", sizeClasses[size])}></div>
        {text && <span className={cn("text-slate-600 dark:text-slate-400", textSizeClasses[size])}>{text}</span>}
      </div>
    )
  }

  // Default variant with enhanced animations
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-indigo-400 rounded-full opacity-40"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animation: `float ${2 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 1}s`
              }}
            />
          ))}
        </div>

        {/* Main spinner */}
        <svg className={cn("animate-spin", sizeClasses[size])} viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-slate-200 dark:text-slate-800"
          />
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke="url(#spinnerGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="32 32"
            className="text-indigo-500"
          />
          <defs>
            <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {text && (
        <span className={cn("text-slate-600 dark:text-slate-400 font-medium animate-pulse", textSizeClasses[size])}>
          {text}
        </span>
      )}

      {/* CSS for float animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.4; }
          50% { transform: translateY(-8px) scale(1.2); opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}