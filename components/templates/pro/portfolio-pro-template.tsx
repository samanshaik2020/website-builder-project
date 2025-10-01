"use client"
import { useState } from "react"
import type { TemplateProps } from "../types"
import { PORTFOLIO_PRO_THEMES, PORTFOLIO_PRO_THEME_INFO, type PortfolioProThemeId } from "./portfolio-pro"

interface PortfolioProTemplateProps extends TemplateProps {
  initialTheme?: PortfolioProThemeId
}

export function PortfolioProTemplatePro({ initialTheme = "default", ...props }: PortfolioProTemplateProps) {
  const [currentTheme, setCurrentTheme] = useState<PortfolioProThemeId>(initialTheme)
  const { editable } = props

  // Get the current theme component
  const ThemeComponent = PORTFOLIO_PRO_THEMES[currentTheme]

  // Theme selector (only show in edit mode)
  const ThemeSelector = () => {
    if (!editable) return null

    return (
      <div className="fixed top-20 right-4 z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-sm">
        <h3 className="font-semibold mb-3 text-gray-900">Portfolio Themes</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {Object.entries(PORTFOLIO_PRO_THEME_INFO).map(([themeId, info]) => (
            <button
              key={themeId}
              onClick={() => setCurrentTheme(themeId as PortfolioProThemeId)}
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                currentTheme === themeId
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm text-gray-900">{info.name}</span>
                <div className="flex gap-1">
                  {info.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-3 h-3 rounded-full border border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-1">{info.description}</p>
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                {info.category}
              </span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <ThemeComponent {...props} />
      <ThemeSelector />
    </>
  )
}