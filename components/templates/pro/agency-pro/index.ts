import { AgencyProTemplate } from "./agency-pro-template"
import { AgencyProModernCreative } from "./modern-creative"
import { AgencyProBoldVibrant } from "./bold-vibrant"
import { AgencyProElegantMinimal } from "./elegant-minimal"
import { AgencyProTechDark } from "./tech-dark"
import { AgencyProNatureOrganic } from "./nature-organic"

export { 
  AgencyProTemplate,
  AgencyProModernCreative,
  AgencyProBoldVibrant,
  AgencyProElegantMinimal,
  AgencyProTechDark,
  AgencyProNatureOrganic
}

// Theme ID mapping
export const AGENCY_PRO_THEMES = {
  "modern-creative": AgencyProModernCreative,
  "bold-vibrant": AgencyProBoldVibrant,
  "elegant-minimal": AgencyProElegantMinimal,
  "tech-dark": AgencyProTechDark,
  "nature-organic": AgencyProNatureOrganic,
} as const

export type AgencyProThemeId = keyof typeof AGENCY_PRO_THEMES
