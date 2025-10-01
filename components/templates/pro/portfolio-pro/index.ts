import { PortfolioProTemplate } from "./portfolio-pro-template"
import { PortfolioProCreativeArtist } from "./creative-artist"
import { PortfolioProTechMinimal } from "./tech-minimal"
import { PortfolioProLuxuryElegant } from "./luxury-elegant"
import { PortfolioProNatureOrganic } from "./nature-organic"
import { PortfolioProCyberpunkFuturistic } from "./cyberpunk-futuristic"

export { 
  PortfolioProTemplate,
  PortfolioProCreativeArtist, 
  PortfolioProTechMinimal,
  PortfolioProLuxuryElegant,
  PortfolioProNatureOrganic,
  PortfolioProCyberpunkFuturistic
}

// Theme ID mapping
export const PORTFOLIO_PRO_THEMES = {
  "default": PortfolioProTemplate,
  "creative-artist": PortfolioProCreativeArtist,
  "tech-minimal": PortfolioProTechMinimal,
  "luxury-elegant": PortfolioProLuxuryElegant,
  "nature-organic": PortfolioProNatureOrganic,
  "cyberpunk-futuristic": PortfolioProCyberpunkFuturistic,
} as const

export type PortfolioProThemeId = keyof typeof PORTFOLIO_PRO_THEMES

// Theme metadata for UI
export const PORTFOLIO_PRO_THEME_INFO = {
  "default": {
    name: "Professional Default",
    description: "Clean and professional portfolio design",
    colors: ["#000000", "#ffffff", "#3b82f6"],
    category: "Professional"
  },
  "creative-artist": {
    name: "Creative Artist",
    description: "Vibrant and artistic design for digital artists",
    colors: ["#ec4899", "#f97316", "#8b5cf6"],
    category: "Creative"
  },
  "tech-minimal": {
    name: "Tech Minimal",
    description: "Minimalist design for developers and tech professionals",
    colors: ["#f3f4f6", "#1f2937", "#3b82f6"],
    category: "Technology"
  },
  "luxury-elegant": {
    name: "Luxury Elegant",
    description: "Sophisticated design for luxury brands and high-end services",
    colors: ["#000000", "#f59e0b", "#ffffff"],
    category: "Luxury"
  },
  "nature-organic": {
    name: "Nature Organic",
    description: "Earth-friendly design for sustainable and eco-conscious brands",
    colors: ["#16a34a", "#059669", "#10b981"],
    category: "Eco-Friendly"
  },
  "cyberpunk-futuristic": {
    name: "Cyberpunk Futuristic",
    description: "High-tech design for cybersecurity and futuristic themes",
    colors: ["#000000", "#06b6d4", "#ec4899"],
    category: "Futuristic"
  }
} as const