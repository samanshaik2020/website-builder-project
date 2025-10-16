import { AgencyProModernMinimal } from "./modern-minimal"
import { AgencyProVibrantPlayful } from "./vibrant-playful"
import { AgencyProCorporateBlue } from "./corporate-blue"
import { AgencyProElegantDark } from "./elegant-dark"
import { AgencyProCreativeBold } from "./creative-bold"
import { AgencyProNatureCalm } from "./nature-calm"

export { 
  AgencyProModernMinimal,
  AgencyProVibrantPlayful, 
  AgencyProCorporateBlue,
  AgencyProElegantDark,
  AgencyProCreativeBold,
  AgencyProNatureCalm
}

// Theme ID mapping
export const AGENCY_PRO_THEMES = {
  "modern-minimal": AgencyProModernMinimal,
  "vibrant-playful": AgencyProVibrantPlayful,
  "corporate-blue": AgencyProCorporateBlue,
  "elegant-dark": AgencyProElegantDark,
  "creative-bold": AgencyProCreativeBold,
  "nature-calm": AgencyProNatureCalm,
} as const

export type AgencyProThemeId = keyof typeof AGENCY_PRO_THEMES
