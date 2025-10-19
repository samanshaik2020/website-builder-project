import { SaaSTemplate } from "./default"
import { SaaSModernGradient } from "./themes/modern-gradient"
import { SaaSMinimalClean } from "./themes/minimal-clean"
import { SaaSBoldDynamic } from "./themes/bold-dynamic"

export { 
  SaaSTemplate,
  SaaSModernGradient,
  SaaSMinimalClean,
  SaaSBoldDynamic
}

// Theme configuration for SaaS landing template
export const SAAS_LANDING_THEMES = {
  "default": {
    id: "default",
    name: "Default",
    description: "Modern SaaS landing page design",
    component: SaaSTemplate,
    previewImage: "/saas landing page.png",
    colors: {
      primary: "#3b82f6",
      secondary: "#1e40af",
      accent: "#60a5fa"
    }
  },
  "modern-gradient": {
    id: "modern-gradient",
    name: "Modern Gradient",
    description: "Sleek design with blue/purple gradients and smooth animations",
    component: SaaSModernGradient,
    previewImage: "/saas-modern-gradient.png",
    colors: {
      primary: "#3b82f6",
      secondary: "#8b5cf6",
      accent: "#06b6d4"
    }
  },
  "minimal-clean": {
    id: "minimal-clean",
    name: "Minimal Clean",
    description: "Ultra-clean white design with subtle accents and elegant spacing",
    component: SaaSMinimalClean,
    previewImage: "/saas-minimal-clean.png",
    colors: {
      primary: "#000000",
      secondary: "#ffffff",
      accent: "#3b82f6"
    }
  },
  "bold-dynamic": {
    id: "bold-dynamic",
    name: "Bold Dynamic",
    description: "Energetic design with bold colors and dynamic animations",
    component: SaaSBoldDynamic,
    previewImage: "/saas-bold-dynamic.png",
    colors: {
      primary: "#f59e0b",
      secondary: "#ec4899",
      accent: "#8b5cf6"
    }
  }
} as const

export type SaaSLandingThemeId = keyof typeof SAAS_LANDING_THEMES
