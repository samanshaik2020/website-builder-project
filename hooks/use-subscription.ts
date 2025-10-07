"use client"

import { useEffect, useState } from "react"
import { getUserSubscription, updateUserSubscription, type UserSubscription } from "@/lib/user-subscription-store"
import type { PlanType } from "@/lib/pricing-plans"

export function useSubscription() {
  const [subscription, setSubscription] = useState<UserSubscription | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load subscription from localStorage on mount (client-side only)
    setSubscription(getUserSubscription())
    setIsLoaded(true)

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "sitebuilder.user.subscription") {
        setSubscription(getUserSubscription())
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const upgradePlan = (plan: PlanType) => {
    updateUserSubscription(plan)
    setSubscription(getUserSubscription())
  }

  return {
    subscription: subscription || getUserSubscription(),
    upgradePlan,
    isLoaded,
  }
}
