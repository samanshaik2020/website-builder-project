"use client"

/**
 * Utility to migrate data from localStorage to Supabase
 * Run this once after setting up Supabase to transfer existing data
 */

import { saveProject } from './projects'
import { createShareableLink } from './shareable-links'
import { updateUserPlan } from './auth'

interface LocalStorageProject {
  id: string
  name: string
  template: string
  theme?: string
  updatedAt: number
  data: {
    texts: Record<string, string>
    images: Record<string, string>
    buttons: Record<string, { href: string; text: string }>
  }
}

interface LocalStorageLink {
  id: string
  projectId: string
  customSlug: string
  expiresAt: number | null
  createdAt: number
  views: number
  maxViews?: number
}

interface LocalStorageSubscription {
  userId: string
  email: string
  plan: 'free' | 'starter' | 'professional' | 'unlimited'
  subscribedAt: number
}

export async function migrateLocalStorageToSupabase() {
  const results = {
    projects: { success: 0, failed: 0 },
    links: { success: 0, failed: 0 },
    subscription: { success: false, error: null as string | null },
  }

  try {
    // 1. Migrate Projects
    const projectsData = localStorage.getItem('sitebuilder.projects')
    if (projectsData) {
      const projects: LocalStorageProject[] = JSON.parse(projectsData)
      
      for (const project of projects) {
        try {
          await saveProject({
            name: project.name,
            template: project.template,
            theme: project.theme || null,
            data: project.data,
          })
          results.projects.success++
        } catch (error) {
          console.error('Failed to migrate project:', project.name, error)
          results.projects.failed++
        }
      }
    }

    // 2. Migrate Shareable Links
    const linksData = localStorage.getItem('sitebuilder.shareable-links')
    if (linksData) {
      const links: LocalStorageLink[] = JSON.parse(linksData)
      
      for (const link of links) {
        try {
          const expiryDays = link.expiresAt 
            ? Math.ceil((link.expiresAt - Date.now()) / (1000 * 60 * 60 * 24))
            : null
          
          await createShareableLink(
            link.projectId,
            link.customSlug,
            expiryDays,
            link.maxViews
          )
          results.links.success++
        } catch (error) {
          console.error('Failed to migrate link:', link.customSlug, error)
          results.links.failed++
        }
      }
    }

    // 3. Migrate Subscription
    const subscriptionData = localStorage.getItem('sitebuilder.user.subscription')
    if (subscriptionData) {
      const subscription: LocalStorageSubscription = JSON.parse(subscriptionData)
      
      try {
        if (subscription.plan !== 'free') {
          await updateUserPlan(subscription.plan)
          results.subscription.success = true
        }
      } catch (error: any) {
        console.error('Failed to migrate subscription:', error)
        results.subscription.error = error.message
      }
    }

    return results
  } catch (error: any) {
    console.error('Migration failed:', error)
    throw error
  }
}

export async function clearLocalStorage() {
  if (typeof window === 'undefined') return

  const keys = [
    'sitebuilder.projects',
    'sitebuilder.shareable-links',
    'sitebuilder.user.subscription',
  ]

  keys.forEach(key => localStorage.removeItem(key))
}

export function getLocalStorageStats() {
  if (typeof window === 'undefined') return null

  const projectsData = localStorage.getItem('sitebuilder.projects')
  const linksData = localStorage.getItem('sitebuilder.shareable-links')
  const subscriptionData = localStorage.getItem('sitebuilder.user.subscription')

  const projects = projectsData ? JSON.parse(projectsData) : []
  const links = linksData ? JSON.parse(linksData) : []
  const subscription = subscriptionData ? JSON.parse(subscriptionData) : null

  return {
    projects: {
      count: projects.length,
      items: projects,
    },
    links: {
      count: links.length,
      items: links,
    },
    subscription,
  }
}
