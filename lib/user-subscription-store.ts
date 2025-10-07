"use client"

import type { PlanType } from "./pricing-plans"

export interface UserSubscription {
  userId: string
  email: string
  plan: PlanType
  subscribedAt: number
}

const KEY = "sitebuilder.user.subscription"

function read(): UserSubscription | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as UserSubscription) : null
  } catch {
    return null
  }
}

function write(subscription: UserSubscription | null) {
  if (typeof window === "undefined") return
  try {
    if (subscription === null) {
      window.localStorage.removeItem(KEY)
    } else {
      const payload = JSON.stringify(subscription)
      window.localStorage.setItem(KEY, payload)
    }
    window.dispatchEvent(new StorageEvent("storage", { key: KEY }))
  } catch {}
}

export function getUserSubscription(): UserSubscription {
  const subscription = read()
  // Default to free plan if no subscription exists
  if (!subscription) {
    return {
      userId: "local-user",
      email: "user@example.com",
      plan: "free",
      subscribedAt: Date.now(),
    }
  }
  return subscription
}

export function updateUserSubscription(plan: PlanType) {
  const current = getUserSubscription()
  const updated: UserSubscription = {
    ...current,
    plan,
    subscribedAt: Date.now(),
  }
  write(updated)
}

export function clearUserSubscription() {
  write(null)
}
