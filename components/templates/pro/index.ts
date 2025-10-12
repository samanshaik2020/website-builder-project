// Re-export all iPhone Pro templates
export * from "./iphone-pro"

// Re-export all Portfolio Pro templates
export * from "./portfolio-pro"

// Re-export all SaaS Pro templates
export * from "./saas-pro"

// Re-export all Agency Pro templates
export * from "./agency-pro"

// Re-export all Ecommerce Pro templates
export * from "./ecommerce-pro"

// Re-export the legacy portfolio pro template at root level
export { PortfolioProTemplatePro as PortfolioProLegacy } from "./portfolio-pro-template"

// Ensure default export for module resolution
export default {}
