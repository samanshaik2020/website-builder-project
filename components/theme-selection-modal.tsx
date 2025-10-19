"use client"

import React from "react"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { TemplateThemeConfig, ThemeMetadata } from "@/lib/template-themes"

interface ThemeSelectionModalProps {
  open: boolean
  onClose: () => void
  templateConfig: TemplateThemeConfig | null
  onSelectTheme: (templateId: string, themeId: string) => void
}

export function ThemeSelectionModal({
  open,
  onClose,
  templateConfig,
  onSelectTheme,
}: ThemeSelectionModalProps) {
  if (!templateConfig) return null

  const themes = Object.values(templateConfig.themes)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">
              Choose Your {templateConfig.templateName} Theme
            </DialogTitle>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Select a theme style that best matches your vision. Each theme has unique colors and styling.
          </p>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {themes.map((theme) => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              onSelect={() => onSelectTheme(templateConfig.templateId, theme.id)}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface ThemeCardProps {
  theme: ThemeMetadata
  onSelect: () => void
}

function ThemeCard({ theme, onSelect }: ThemeCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-sm hover:shadow-xl hover:border-black transition-all duration-300">
      {/* Theme Preview Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <img
          src={theme.previewImage}
          alt={theme.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            // Fallback to a placeholder if image doesn't exist
            e.currentTarget.src = "/placeholder-theme.png"
          }}
        />
        
        {/* Pro Badge */}
        {theme.isPro && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            PRO
          </div>
        )}

        {/* Color Palette Preview */}
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          <div
            className="h-6 w-6 rounded-full border-2 border-white shadow-md"
            style={{ backgroundColor: theme.colors.primary }}
            title="Primary Color"
          />
          <div
            className="h-6 w-6 rounded-full border-2 border-white shadow-md"
            style={{ backgroundColor: theme.colors.secondary }}
            title="Secondary Color"
          />
          <div
            className="h-6 w-6 rounded-full border-2 border-white shadow-md"
            style={{ backgroundColor: theme.colors.accent }}
            title="Accent Color"
          />
        </div>
      </div>

      {/* Theme Info */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-semibold text-gray-900">{theme.name}</h3>
        <p className="mt-1 text-sm text-gray-600 flex-1">{theme.description}</p>

        {/* Select Button */}
        <Button
          onClick={onSelect}
          className="mt-4 w-full bg-black text-white hover:bg-gray-800 transition-colors"
        >
          Select Theme
        </Button>
      </div>
    </div>
  )
}

// Hover Popup Component (shows on template card hover)
interface ThemeHoverPopupProps {
  templateConfig: TemplateThemeConfig
  onViewAll: () => void
  onSelectTheme: (themeId: string) => void
}

export function ThemeHoverPopup({
  templateConfig,
  onViewAll,
  onSelectTheme,
}: ThemeHoverPopupProps) {
  const themes = Object.values(templateConfig.themes).slice(0, 3) // Show first 3 themes

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
      <div className="text-center mb-4">
        <h4 className="text-white font-semibold text-lg mb-2">
          {templateConfig.themes && Object.keys(templateConfig.themes).length} Theme
          {Object.keys(templateConfig.themes).length > 1 ? "s" : ""} Available
        </h4>
      </div>

      {/* Quick Theme Preview */}
      <div className="flex gap-2 mb-4">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={(e) => {
              e.stopPropagation()
              onSelectTheme(theme.id)
            }}
            className="group/theme relative h-16 w-16 rounded-lg overflow-hidden border-2 border-white/30 hover:border-white hover:scale-110 transition-all"
            title={theme.name}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 50%, ${theme.colors.accent} 100%)`
              }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover/theme:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>

      {/* View All Button */}
      <Button
        onClick={(e) => {
          e.stopPropagation()
          onViewAll()
        }}
        variant="outline"
        className="bg-white text-black hover:bg-gray-100 font-medium"
      >
        View All {templateConfig.templateName} Themes
      </Button>
    </div>
  )
}
