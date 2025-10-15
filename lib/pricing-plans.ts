export type PlanType = "free" | "starter" | "professional" | "unlimited"

export interface PricingPlan {
  id: PlanType
  name: string
  price: number
  priceINR: number // Price in Indian Rupees
  priceUSD: number // Price in US Dollars
  period: string
  description: string
  features: string[]
  limits: {
    normalTemplates: number | "unlimited"
    proTemplates: number
    canExport: boolean
    shareableLinkExpiry: number | null // Days until link expires, null for unlimited
    maxShareableLinks: number | "unlimited" // Max active shareable links per project
  }
  popular?: boolean
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free Plan",
    price: 0,
    priceINR: 0,
    priceUSD: 0,
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "Create up to 2 normal landing pages",
      "Basic templates access",
      "Community support",
      "Squpage branding",
      "7-day shareable links",
      "1 active link per project",
    ],
    limits: {
      normalTemplates: 2,
      proTemplates: 0,
      canExport: false,
      shareableLinkExpiry: 7,
      maxShareableLinks: 1,
    },
  },
  {
    id: "starter",
    name: "Starter Plan",
    price: 9,
    priceINR: 399,
    priceUSD: 9,
    period: "month",
    description: "Great for individuals and small projects",
    features: [
      "Create 3 pro templates",
      "Unlimited normal templates",
      "All basic features",
      "Email support",
      "Remove Squpage branding",
      "30-day shareable links",
      "3 active links per project",
    ],
    limits: {
      normalTemplates: "unlimited",
      proTemplates: 3,
      canExport: false,
      shareableLinkExpiry: 30,
      maxShareableLinks: 3,
    },
    popular: true,
  },
  {
    id: "professional",
    name: "Professional Plan",
    price: 19,
    priceINR: 799,
    priceUSD: 19,
    period: "month",
    description: "Perfect for professionals and agencies",
    features: [
      "Create 10 pro templates",
      "Unlimited normal templates",
      "Export to HTML",
      "AI content generation",
      "Priority support",
      "Advanced analytics",
      "30-day shareable links",
      "10 active links per project",
    ],
    limits: {
      normalTemplates: "unlimited",
      proTemplates: 10,
      canExport: true,
      shareableLinkExpiry: 30,
      maxShareableLinks: 10,
    },
  },
  {
    id: "unlimited",
    name: "Unlimited Plan",
    price: 49,
    priceINR: 1999,
    priceUSD: 49,
    period: "month",
    description: "For power users and large teams",
    features: [
      "Unlimited pro templates",
      "Unlimited normal templates",
      "Export to HTML",
      "AI content generation",
      "White-label solution",
      "Dedicated support",
      "Custom integrations",
      "Team collaboration",
      "Unlimited link expiry",
      "Unlimited active links",
    ],
    limits: {
      normalTemplates: "unlimited",
      proTemplates: Infinity,
      canExport: true,
      shareableLinkExpiry: null,
      maxShareableLinks: "unlimited",
    },
  },
]

export function getPlanById(planId: PlanType): PricingPlan {
  return PRICING_PLANS.find((p) => p.id === planId) || PRICING_PLANS[0]
}

export function canCreateNormalTemplate(planId: PlanType, currentCount: number): boolean {
  const plan = getPlanById(planId)
  if (plan.limits.normalTemplates === "unlimited") return true
  return currentCount < plan.limits.normalTemplates
}

export function canCreateProTemplate(planId: PlanType, currentCount: number): boolean {
  const plan = getPlanById(planId)
  return currentCount < plan.limits.proTemplates
}

export function canExport(planId: PlanType): boolean {
  const plan = getPlanById(planId)
  return plan.limits.canExport
}

export function getShareableLinkExpiry(planId: PlanType): number | null {
  const plan = getPlanById(planId)
  return plan.limits.shareableLinkExpiry
}

export function canCreateShareableLink(planId: PlanType, currentActiveLinks: number): boolean {
  const plan = getPlanById(planId)
  if (plan.limits.maxShareableLinks === "unlimited") return true
  return currentActiveLinks < plan.limits.maxShareableLinks
}

export function getMaxShareableLinks(planId: PlanType): number | "unlimited" {
  const plan = getPlanById(planId)
  return plan.limits.maxShareableLinks
}
