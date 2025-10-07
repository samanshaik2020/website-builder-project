"use client"

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { updateUserPlan } from '@/lib/supabase/auth'
import type { PlanType } from '@/lib/pricing-plans'

export interface UserSubscription {
  userId: string
  email: string
  plan: PlanType
  subscribedAt: number
}

export function useSupabaseSubscription() {
  const { user, profile, loading: authLoading } = useAuth()
  const [subscription, setSubscription] = useState<UserSubscription>({
    userId: 'local-user',
    email: 'user@example.com',
    plan: 'free',
    subscribedAt: Date.now(),
  })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!authLoading) {
      if (profile) {
        setSubscription({
          userId: profile.id,
          email: profile.email,
          plan: profile.plan,
          subscribedAt: Date.now(),
        })
      }
      setIsLoaded(true)
    }
  }, [profile, authLoading])

  const updatePlan = async (plan: PlanType) => {
    try {
      await updateUserPlan(plan)
      setSubscription(prev => ({
        ...prev,
        plan,
        subscribedAt: Date.now(),
      }))
    } catch (error) {
      console.error('Error updating plan:', error)
      throw error
    }
  }

  return {
    subscription,
    isLoaded,
    updatePlan,
  }
}
