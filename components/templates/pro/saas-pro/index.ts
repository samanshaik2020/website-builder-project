import { SaaSProTemplate } from "./saas-pro-template"
import { SaaSProVibrantPlayful } from "./vibrant-playful"
import { SaaSProModernMinimal } from "./modern-minimal"
import { SaaSProCorporateBlue } from "./corporate-blue"
import { SaaSProElegantDark } from "./elegant-dark"
import { SaaSProCreativeBold } from "./creative-bold"
import { SaaSProNatureCalm } from "./nature-calm"

export { 
  SaaSProTemplate,
  SaaSProVibrantPlayful, 
  SaaSProModernMinimal,
  SaaSProCorporateBlue,
  SaaSProElegantDark,
  SaaSProCreativeBold,
  SaaSProNatureCalm
}

// Theme ID mapping
export const SAAS_PRO_THEMES = {
  "vibrant-playful": SaaSProVibrantPlayful,
  "modern-minimal": SaaSProModernMinimal,
  "corporate-blue": SaaSProCorporateBlue,
  "elegant-dark": SaaSProElegantDark,
  "creative-bold": SaaSProCreativeBold,
  "nature-calm": SaaSProNatureCalm,
} as const

export type SaaSProThemeId = keyof typeof SAAS_PRO_THEMES
