"use client"

import { supabase } from './client'

export type TemplateStat = {
  id: string
  user_id: string
  template: string
  theme: string | null
  usage_count: number
  last_used_at: string
  created_at: string
}

// Track template usage
export async function trackTemplateUsage(template: string, theme?: string | null): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return

  // Check if stat already exists
  let query = supabase
    .from('template_stats')
    .select('*')
    .eq('user_id', user.id)
    .eq('template', template)

  if (theme) {
    query = query.eq('theme', theme)
  } else {
    query = query.is('theme', null)
  }

  const { data: existing } = await query.single()

  if (existing) {
    // Update existing stat
    await supabase
      .from('template_stats')
      .update({
        usage_count: existing.usage_count + 1,
        last_used_at: new Date().toISOString(),
      })
      .eq('id', existing.id)
  } else {
    // Create new stat
    await supabase
      .from('template_stats')
      .insert({
        user_id: user.id,
        template,
        theme: theme || null,
        usage_count: 1,
        last_used_at: new Date().toISOString(),
      })
  }
}

// Get all template stats for current user
export async function getTemplateStats(): Promise<TemplateStat[]> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return []

  const { data, error } = await supabase
    .from('template_stats')
    .select('*')
    .eq('user_id', user.id)
    .order('usage_count', { ascending: false })

  if (error) {
    console.error('Error fetching template stats:', error)
    return []
  }

  return data as TemplateStat[]
}

// Get most used templates
export async function getMostUsedTemplates(limit: number = 5): Promise<TemplateStat[]> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return []

  const { data, error } = await supabase
    .from('template_stats')
    .select('*')
    .eq('user_id', user.id)
    .order('usage_count', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching most used templates:', error)
    return []
  }

  return data as TemplateStat[]
}

// Get recently used templates
export async function getRecentlyUsedTemplates(limit: number = 5): Promise<TemplateStat[]> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return []

  const { data, error } = await supabase
    .from('template_stats')
    .select('*')
    .eq('user_id', user.id)
    .order('last_used_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recently used templates:', error)
    return []
  }

  return data as TemplateStat[]
}
