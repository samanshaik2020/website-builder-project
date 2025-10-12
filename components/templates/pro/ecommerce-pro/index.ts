import { EcommerceProTemplate } from "./ecommerce-pro-template"
import { EcommerceProLuxuryElegant } from "./luxury-elegant"
import { EcommerceProModernMinimal } from "./modern-minimal"
import { EcommerceProVibrantColorful } from "./vibrant-colorful"
import { EcommerceProDarkPremium } from "./dark-premium"
import { EcommerceProEcoNatural } from "./eco-natural"

export { 
  EcommerceProTemplate,
  EcommerceProLuxuryElegant,
  EcommerceProModernMinimal,
  EcommerceProVibrantColorful,
  EcommerceProDarkPremium,
  EcommerceProEcoNatural
}

// Theme ID mapping
export const ECOMMERCE_PRO_THEMES = {
  "luxury-elegant": EcommerceProLuxuryElegant,
  "modern-minimal": EcommerceProModernMinimal,
  "vibrant-colorful": EcommerceProVibrantColorful,
  "dark-premium": EcommerceProDarkPremium,
  "eco-natural": EcommerceProEcoNatural,
} as const

export type EcommerceProThemeId = keyof typeof ECOMMERCE_PRO_THEMES
