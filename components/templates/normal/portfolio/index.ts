import { PortfolioTemplate } from "./default"
import { PortfolioCreativeDark } from "./themes/creative-dark"
import { PortfolioMinimalLight } from "./themes/minimal-light"
import { PortfolioVibrantMagazine } from "./themes/vibrant-magazine"

export { 
  PortfolioTemplate,
  PortfolioCreativeDark,
  PortfolioMinimalLight,
  PortfolioVibrantMagazine
}

// Theme configuration for portfolio template
export const PORTFOLIO_THEMES = {
  "default": {
    id: "default",
    name: "Default",
    description: "Clean and professional portfolio design",
    component: PortfolioTemplate,
    previewImage: "/portfolio.png",
    colors: {
      primary: "#000000",
      secondary: "#ffffff",
      accent: "#3b82f6"
    }
  },
  "creative-dark": {
    id: "creative-dark",
    name: "Creative Dark",
    description: "Bold dark theme with purple/pink gradients and asymmetric layout",
    component: PortfolioCreativeDark,
    previewImage: "/portfolio-creative-dark.png",
    colors: {
      primary: "#7c3aed",
      secondary: "#ec4899",
      accent: "#a78bfa"
    }
  },
  "minimal-light": {
    id: "minimal-light",
    name: "Minimal Light",
    description: "Clean white design with elegant typography and generous spacing",
    component: PortfolioMinimalLight,
    previewImage: "/portfolio-minimal-light.png",
    colors: {
      primary: "#ffffff",
      secondary: "#f3f4f6",
      accent: "#1f2937"
    }
  },
  "vibrant-magazine": {
    id: "vibrant-magazine",
    name: "Vibrant Magazine",
    description: "Bold colorful theme with magazine-style grid and dynamic effects",
    component: PortfolioVibrantMagazine,
    previewImage: "/portfolio-vibrant-magazine.png",
    colors: {
      primary: "#f97316",
      secondary: "#ec4899",
      accent: "#a855f7"
    }
  }
} as const

export type PortfolioThemeId = keyof typeof PORTFOLIO_THEMES
