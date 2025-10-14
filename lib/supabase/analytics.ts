"use client"

import { supabase } from './client'

export type ButtonClick = {
  id: string
  shareable_link_id: string
  button_id: string
  button_text: string | null
  button_href: string | null
  clicked_at: string
  user_agent: string | null
  ip_address: string | null
}

/**
 * Get total views across all user's shareable links
 */
export async function getUserTotalViews(): Promise<number> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return 0

  const { data, error } = await supabase.rpc('get_user_total_views', {
    user_uuid: user.id
  })

  if (error) {
    console.error('Error fetching total views:', error)
    return 0
  }

  return data || 0
}

/**
 * Get total button clicks across all user's shareable links
 */
export async function getUserTotalClicks(): Promise<number> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return 0

  const { data, error } = await supabase.rpc('get_user_total_clicks', {
    user_uuid: user.id
  })

  if (error) {
    console.error('Error fetching total clicks:', error)
    return 0
  }

  return data || 0
}

/**
 * Track a button click on a shared link
 */
export async function trackButtonClick(
  linkId: string,
  buttonId: string,
  buttonText?: string,
  buttonHref?: string
): Promise<string | null> {
  try {
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : null

    const { data, error } = await supabase.rpc('track_button_click', {
      link_id: linkId,
      btn_id: buttonId,
      btn_text: buttonText || null,
      btn_href: buttonHref || null,
      user_agent_str: userAgent,
      ip_addr: null // IP address would need to be set server-side for security
    })

    if (error) {
      console.error('Error tracking button click:', error)
      return null
    }

    return data
  } catch (err) {
    console.error('Error tracking button click:', err)
    return null
  }
}

/**
 * Get button clicks for a specific shareable link
 */
export async function getButtonClicksByLink(linkId: string): Promise<ButtonClick[]> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return []

  const { data, error } = await supabase
    .from('button_clicks')
    .select('*')
    .eq('shareable_link_id', linkId)
    .order('clicked_at', { ascending: false })

  if (error) {
    console.error('Error fetching button clicks:', error)
    return []
  }

  return data as ButtonClick[]
}

/**
 * Get analytics summary for dashboard
 */
export async function getAnalyticsSummary(): Promise<{
  totalViews: number
  totalClicks: number
  conversionRate: number
}> {
  const [totalViews, totalClicks] = await Promise.all([
    getUserTotalViews(),
    getUserTotalClicks()
  ])

  const conversionRate = totalViews > 0 ? (totalClicks / totalViews) * 100 : 0

  return {
    totalViews,
    totalClicks,
    conversionRate: Math.round(conversionRate * 10) / 10 // Round to 1 decimal
  }
}
