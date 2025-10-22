'use client'

import { createClient } from '@/lib/supabase/client'
import type { ProjectAnalytics, PageView, ButtonClick } from '@/lib/supabase/types'

/**
 * Track a page view for a project
 */
export async function trackPageView(
  projectId: string,
  metadata?: {
    ipAddress?: string
    userAgent?: string
    referrer?: string
  }
): Promise<void> {
  const supabase = createClient()

  // Insert detailed page view record
  await supabase.from('page_views').insert({
    project_id: projectId,
    ip_address: metadata?.ipAddress,
    user_agent: metadata?.userAgent,
    referrer: metadata?.referrer,
  })

  // Update aggregate analytics
  const { data: analytics } = await supabase
    .from('project_analytics')
    .select('*')
    .eq('project_id', projectId)
    .single()

  if (analytics) {
    await supabase
      .from('project_analytics')
      .update({
        views: (analytics.views || 0) + 1,
        last_viewed_at: new Date().toISOString(),
      })
      .eq('project_id', projectId)
  }
}

/**
 * Track a button click for a project
 */
export async function trackButtonClick(
  projectId: string,
  buttonId?: string,
  metadata?: {
    ipAddress?: string
    userAgent?: string
  }
): Promise<void> {
  const supabase = createClient()

  // Insert detailed button click record
  await supabase.from('button_clicks').insert({
    project_id: projectId,
    button_id: buttonId,
    ip_address: metadata?.ipAddress,
    user_agent: metadata?.userAgent,
  })

  // Update aggregate analytics
  const { data: analytics } = await supabase
    .from('project_analytics')
    .select('*')
    .eq('project_id', projectId)
    .single()

  if (analytics) {
    await supabase
      .from('project_analytics')
      .update({
        clicks: (analytics.clicks || 0) + 1,
        last_clicked_at: new Date().toISOString(),
      })
      .eq('project_id', projectId)
  }
}

/**
 * Get analytics for a specific project
 */
export async function getProjectAnalytics(projectId: string): Promise<ProjectAnalytics | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('project_analytics')
    .select('*')
    .eq('project_id', projectId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null // Analytics not found
    }
    throw new Error(error.message)
  }

  return data
}

/**
 * Get page views for a project
 */
export async function getPageViews(
  projectId: string,
  options?: {
    limit?: number
    offset?: number
    startDate?: Date
    endDate?: Date
  }
): Promise<PageView[]> {
  const supabase = createClient()

  let query = supabase
    .from('page_views')
    .select('*')
    .eq('project_id', projectId)
    .order('viewed_at', { ascending: false })

  if (options?.startDate) {
    query = query.gte('viewed_at', options.startDate.toISOString())
  }

  if (options?.endDate) {
    query = query.lte('viewed_at', options.endDate.toISOString())
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(error.message)
  }

  return data || []
}

/**
 * Get button clicks for a project
 */
export async function getButtonClicks(
  projectId: string,
  options?: {
    limit?: number
    offset?: number
    startDate?: Date
    endDate?: Date
    buttonId?: string
  }
): Promise<ButtonClick[]> {
  const supabase = createClient()

  let query = supabase
    .from('button_clicks')
    .select('*')
    .eq('project_id', projectId)
    .order('clicked_at', { ascending: false })

  if (options?.buttonId) {
    query = query.eq('button_id', options.buttonId)
  }

  if (options?.startDate) {
    query = query.gte('clicked_at', options.startDate.toISOString())
  }

  if (options?.endDate) {
    query = query.lte('clicked_at', options.endDate.toISOString())
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(error.message)
  }

  return data || []
}

/**
 * Get analytics summary for all user projects
 */
export async function getUserAnalyticsSummary(): Promise<{
  totalProjects: number
  totalViews: number
  totalClicks: number
  avgConversion: number
  monthlyStats: {
    websitesCreated: number
    totalVisitors: number
    conversionRate: number
    leadsGenerated: number
  }
}> {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  // Get all user projects with analytics
  const { data: projects } = await supabase
    .from('projects')
    .select(`
      id,
      created_at,
      analytics:project_analytics(views, clicks)
    `)
    .eq('user_id', user.id)

  if (!projects) {
    return {
      totalProjects: 0,
      totalViews: 0,
      totalClicks: 0,
      avgConversion: 0,
      monthlyStats: {
        websitesCreated: 0,
        totalVisitors: 0,
        conversionRate: 0,
        leadsGenerated: 0,
      },
    }
  }

  // Calculate totals
  const totalProjects = projects.length
  let totalViews = 0
  let totalClicks = 0

  projects.forEach((project: { analytics?: Array<{ views?: number; clicks?: number }> }) => {
    const analytics = project.analytics?.[0]
    if (analytics) {
      totalViews += analytics.views || 0
      totalClicks += analytics.clicks || 0
    }
  })

  const avgConversion = totalViews > 0 ? (totalClicks / totalViews) * 100 : 0

  // Calculate monthly stats
  const now = new Date()
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const monthlyProjects = projects.filter(
    (p: { created_at: string }) => new Date(p.created_at) >= firstDayOfMonth
  )

  let monthlyViews = 0
  let monthlyClicks = 0

  monthlyProjects.forEach((project: { analytics?: Array<{ views?: number; clicks?: number }> }) => {
    const analytics = project.analytics?.[0]
    if (analytics) {
      monthlyViews += analytics.views || 0
      monthlyClicks += analytics.clicks || 0
    }
  })

  const monthlyConversion = monthlyViews > 0 ? (monthlyClicks / monthlyViews) * 100 : 0

  return {
    totalProjects,
    totalViews,
    totalClicks,
    avgConversion,
    monthlyStats: {
      websitesCreated: monthlyProjects.length,
      totalVisitors: monthlyViews,
      conversionRate: monthlyConversion,
      leadsGenerated: monthlyClicks,
    },
  }
}
