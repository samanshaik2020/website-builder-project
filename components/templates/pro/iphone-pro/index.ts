import { IPhoneProDarkGradient } from "./dark-gradient"
import { IPhoneProLightElegant } from "./light-elegant"
import { IPhoneProNeonCyberpunk } from "./neon-cyberpunk"
import { IPhoneProLuxuryGold } from "./luxury-gold"
import { IPhoneProMinimalistTech } from "./minimalist-tech"
import { IPhoneProVibrantGradient } from "./vibrant-gradient"

export { 
  IPhoneProDarkGradient, 
  IPhoneProLightElegant,
  IPhoneProNeonCyberpunk,
  IPhoneProLuxuryGold,
  IPhoneProMinimalistTech,
  IPhoneProVibrantGradient
}

// Theme ID mapping
export const IPHONE_PRO_THEMES = {
  "dark-gradient": IPhoneProDarkGradient,
  "light-elegant": IPhoneProLightElegant,
  "neon-cyberpunk": IPhoneProNeonCyberpunk,
  "luxury-gold": IPhoneProLuxuryGold,
  "minimalist-tech": IPhoneProMinimalistTech,
  "vibrant-gradient": IPhoneProVibrantGradient,
} as const

export type IPhoneProThemeId = keyof typeof IPHONE_PRO_THEMES
