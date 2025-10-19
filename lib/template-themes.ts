/**
 * Central configuration for all template themes
 * This file defines which templates have multiple themes available
 */

export interface ThemeMetadata {
  id: string
  name: string
  description: string
  previewImage: string
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  isPro?: boolean
}

export interface TemplateThemeConfig {
  templateId: string
  templateName: string
  hasMultipleThemes: boolean
  defaultTheme: string
  themes: Record<string, ThemeMetadata>
  category: "Portfolio" | "SaaS" | "Profile" | "Event" | "Agency" | "Ecommerce"
}

// Template theme configurations
export const TEMPLATE_THEMES: Record<string, TemplateThemeConfig> = {
  // Pro Templates with multiple themes
  "saas-pro": {
    templateId: "saas-pro",
    templateName: "SaaS Pro",
    hasMultipleThemes: true,
    defaultTheme: "vibrant-playful",
    category: "SaaS",
    themes: {
      "vibrant-playful": {
        id: "vibrant-playful",
        name: "Vibrant Playful",
        description: "Energetic and colorful design with playful elements",
        previewImage: "/saas-pro-vibrant.png",
        colors: { primary: "#ec4899", secondary: "#8b5cf6", accent: "#f59e0b" },
        isPro: true
      },
      "modern-minimal": {
        id: "modern-minimal",
        name: "Modern Minimal",
        description: "Clean and minimalist design with focus on content",
        previewImage: "/saas-pro-minimal.png",
        colors: { primary: "#000000", secondary: "#ffffff", accent: "#3b82f6" },
        isPro: true
      },
      "corporate-blue": {
        id: "corporate-blue",
        name: "Corporate Blue",
        description: "Professional corporate design with blue accents",
        previewImage: "/saas-pro-corporate.png",
        colors: { primary: "#1e40af", secondary: "#3b82f6", accent: "#60a5fa" },
        isPro: true
      },
      "elegant-dark": {
        id: "elegant-dark",
        name: "Elegant Dark",
        description: "Sophisticated dark theme with elegant touches",
        previewImage: "/saas-pro-dark.png",
        colors: { primary: "#1f2937", secondary: "#374151", accent: "#8b5cf6" },
        isPro: true
      },
      "creative-bold": {
        id: "creative-bold",
        name: "Creative Bold",
        description: "Bold and creative design with strong visual impact",
        previewImage: "/saas-pro-bold.png",
        colors: { primary: "#dc2626", secondary: "#ea580c", accent: "#f59e0b" },
        isPro: true
      },
      "nature-calm": {
        id: "nature-calm",
        name: "Nature Calm",
        description: "Calm and natural design with earth tones",
        previewImage: "/saas-pro-nature.png",
        colors: { primary: "#059669", secondary: "#10b981", accent: "#34d399" },
        isPro: true
      }
    }
  },
  "portfolio-pro": {
    templateId: "portfolio-pro",
    templateName: "Portfolio Pro",
    hasMultipleThemes: true,
    defaultTheme: "modern-dark",
    category: "Portfolio",
    themes: {
      "modern-dark": {
        id: "modern-dark",
        name: "Modern Dark",
        description: "Sleek dark portfolio with modern aesthetics",
        previewImage: "/portfolio-pro-dark.png",
        colors: { primary: "#000000", secondary: "#1f2937", accent: "#3b82f6" },
        isPro: true
      },
      "creative-light": {
        id: "creative-light",
        name: "Creative Light",
        description: "Bright and creative portfolio design",
        previewImage: "/portfolio-pro-light.png",
        colors: { primary: "#ffffff", secondary: "#f3f4f6", accent: "#8b5cf6" },
        isPro: true
      },
      "minimal-elegant": {
        id: "minimal-elegant",
        name: "Minimal Elegant",
        description: "Elegant minimalist portfolio",
        previewImage: "/portfolio-pro-minimal.png",
        colors: { primary: "#1f2937", secondary: "#ffffff", accent: "#6366f1" },
        isPro: true
      },
      "bold-colorful": {
        id: "bold-colorful",
        name: "Bold Colorful",
        description: "Vibrant and bold portfolio design",
        previewImage: "/portfolio-pro-colorful.png",
        colors: { primary: "#ec4899", secondary: "#8b5cf6", accent: "#f59e0b" },
        isPro: true
      },
      "professional-blue": {
        id: "professional-blue",
        name: "Professional Blue",
        description: "Professional portfolio with blue theme",
        previewImage: "/portfolio-pro-blue.png",
        colors: { primary: "#1e40af", secondary: "#3b82f6", accent: "#60a5fa" },
        isPro: true
      },
      "artistic-gradient": {
        id: "artistic-gradient",
        name: "Artistic Gradient",
        description: "Artistic portfolio with gradient effects",
        previewImage: "/portfolio-pro-gradient.png",
        colors: { primary: "#7c3aed", secondary: "#ec4899", accent: "#f59e0b" },
        isPro: true
      }
    }
  },
  "iphone-pro": {
    templateId: "iphone-pro",
    templateName: "iPhone Pro Landing",
    hasMultipleThemes: true,
    defaultTheme: "midnight-purple",
    category: "SaaS",
    themes: {
      "midnight-purple": {
        id: "midnight-purple",
        name: "Midnight Purple",
        description: "Dark theme with purple gradients",
        previewImage: "/iphone-pro-purple.png",
        colors: { primary: "#1e1b4b", secondary: "#7c3aed", accent: "#a78bfa" },
        isPro: true
      },
      "ocean-blue": {
        id: "ocean-blue",
        name: "Ocean Blue",
        description: "Deep blue oceanic theme",
        previewImage: "/iphone-pro-blue.png",
        colors: { primary: "#0c4a6e", secondary: "#0284c7", accent: "#38bdf8" },
        isPro: true
      },
      "sunset-orange": {
        id: "sunset-orange",
        name: "Sunset Orange",
        description: "Warm sunset-inspired theme",
        previewImage: "/iphone-pro-orange.png",
        colors: { primary: "#7c2d12", secondary: "#ea580c", accent: "#fb923c" },
        isPro: true
      },
      "forest-green": {
        id: "forest-green",
        name: "Forest Green",
        description: "Natural forest green theme",
        previewImage: "/iphone-pro-green.png",
        colors: { primary: "#14532d", secondary: "#16a34a", accent: "#4ade80" },
        isPro: true
      },
      "rose-gold": {
        id: "rose-gold",
        name: "Rose Gold",
        description: "Elegant rose gold theme",
        previewImage: "/iphone-pro-rose.png",
        colors: { primary: "#881337", secondary: "#e11d48", accent: "#fb7185" },
        isPro: true
      },
      "space-gray": {
        id: "space-gray",
        name: "Space Gray",
        description: "Sleek space gray theme",
        previewImage: "/iphone-pro-gray.png",
        colors: { primary: "#18181b", secondary: "#52525b", accent: "#a1a1aa" },
        isPro: true
      }
    }
  },
  "agency-pro": {
    templateId: "agency-pro",
    templateName: "Agency Pro",
    hasMultipleThemes: true,
    defaultTheme: "modern-minimal",
    category: "Agency",
    themes: {
      "modern-minimal": {
        id: "modern-minimal",
        name: "Modern Minimal",
        description: "Clean minimal agency design",
        previewImage: "/agency-pro-minimal.png",
        colors: { primary: "#000000", secondary: "#ffffff", accent: "#3b82f6" },
        isPro: true
      },
      "vibrant-playful": {
        id: "vibrant-playful",
        name: "Vibrant Playful",
        description: "Colorful and energetic agency theme",
        previewImage: "/agency-pro-vibrant.png",
        colors: { primary: "#ec4899", secondary: "#8b5cf6", accent: "#f59e0b" },
        isPro: true
      },
      "corporate-blue": {
        id: "corporate-blue",
        name: "Corporate Blue",
        description: "Professional corporate agency design",
        previewImage: "/agency-pro-corporate.png",
        colors: { primary: "#1e40af", secondary: "#3b82f6", accent: "#60a5fa" },
        isPro: true
      },
      "elegant-dark": {
        id: "elegant-dark",
        name: "Elegant Dark",
        description: "Sophisticated dark agency theme",
        previewImage: "/agency-pro-dark.png",
        colors: { primary: "#1f2937", secondary: "#374151", accent: "#8b5cf6" },
        isPro: true
      },
      "creative-bold": {
        id: "creative-bold",
        name: "Creative Bold",
        description: "Bold creative agency design",
        previewImage: "/agency-pro-bold.png",
        colors: { primary: "#dc2626", secondary: "#ea580c", accent: "#f59e0b" },
        isPro: true
      },
      "nature-calm": {
        id: "nature-calm",
        name: "Nature Calm",
        description: "Natural and calm agency theme",
        previewImage: "/agency-pro-nature.png",
        colors: { primary: "#059669", secondary: "#10b981", accent: "#34d399" },
        isPro: true
      }
    }
  },
  
  // Normal templates (no themes)
  "portfolio": {
    templateId: "portfolio",
    templateName: "Portfolio Website",
    hasMultipleThemes: false,
    defaultTheme: "default",
    category: "Portfolio",
    themes: {
      "default": {
        id: "default",
        name: "Default",
        description: "Clean and professional portfolio design",
        previewImage: "/portfolio.png",
        colors: { primary: "#000000", secondary: "#ffffff", accent: "#3b82f6" }
      }
    }
  },
  "saas-landing": {
    templateId: "saas-landing",
    templateName: "SaaS Landing Page",
    hasMultipleThemes: false,
    defaultTheme: "default",
    category: "SaaS",
    themes: {
      "default": {
        id: "default",
        name: "Default",
        description: "High-converting product marketing page",
        previewImage: "/saas landing page.png",
        colors: { primary: "#3b82f6", secondary: "#1e40af", accent: "#60a5fa" }
      }
    }
  },
  "personal-profile": {
    templateId: "personal-profile",
    templateName: "Personal Profile",
    hasMultipleThemes: false,
    defaultTheme: "default",
    category: "Profile",
    themes: {
      "default": {
        id: "default",
        name: "Default",
        description: "Simple bio page with links",
        previewImage: "/personal-profile.png",
        colors: { primary: "#000000", secondary: "#ffffff", accent: "#8b5cf6" }
      }
    }
  }
  // Add more templates as needed...
}

/**
 * Get theme configuration for a template
 */
export function getTemplateThemes(templateId: string): TemplateThemeConfig | undefined {
  return TEMPLATE_THEMES[templateId]
}

/**
 * Check if a template has multiple themes
 */
export function hasMultipleThemes(templateId: string): boolean {
  return TEMPLATE_THEMES[templateId]?.hasMultipleThemes ?? false
}

/**
 * Get all theme IDs for a template
 */
export function getThemeIds(templateId: string): string[] {
  const config = TEMPLATE_THEMES[templateId]
  return config ? Object.keys(config.themes) : []
}
