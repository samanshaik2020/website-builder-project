"use client"

import { supabase } from './client'

export type ShareableLink = {
  id: string
  user_id: string
  project_id: string
  custom_slug: string
  expires_at: string | null
  max_views: number | null
  views: number
  created_at: string
  updated_at: string
}

// Get all shareable links for current user
export async function getShareableLinks(): Promise<ShareableLink[]> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return []

  const { data, error } = await supabase
    .from('shareable_links')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching shareable links:', error)
    return []
  }

  return data as ShareableLink[]
}

// Get shareable links for a specific project
export async function getShareableLinksByProjectId(projectId: string): Promise<ShareableLink[]> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return []

  const { data, error } = await supabase
    .from('shareable_links')
    .select('*')
    .eq('user_id', user.id)
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching shareable links:', error)
    return []
  }

  return data as ShareableLink[]
}

// Get shareable link by custom slug (public access)
export async function getShareableLinkBySlug(slug: string): Promise<ShareableLink | null> {
  const { data, error } = await supabase
    .from('shareable_links')
    .select('*')
    .eq('custom_slug', slug)
    .single()

  if (error) {
    console.error('Error fetching shareable link:', error)
    return null
  }

  const link = data as ShareableLink

  // Check if link has expired
  if (link.expires_at && new Date(link.expires_at) < new Date()) {
    return null
  }

  // Check if view limit reached
  if (link.max_views && link.views >= link.max_views) {
    return null
  }

  return link
}

// Create a new shareable link
export async function createShareableLink(
  projectId: string,
  customSlug: string,
  expiryDays: number | null = null,
  maxViews?: number
): Promise<ShareableLink> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Not authenticated')

  // Check if slug is available
  const { data: existing } = await supabase
    .from('shareable_links')
    .select('id')
    .eq('custom_slug', customSlug)
    .single()

  if (existing) {
    throw new Error('This custom URL is already taken. Please choose a different one.')
  }

  const expiresAt = expiryDays 
    ? new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000).toISOString()
    : null

  const { data, error } = await supabase
    .from('shareable_links')
    .insert({
      user_id: user.id,
      project_id: projectId,
      custom_slug: customSlug,
      expires_at: expiresAt,
      max_views: maxViews || null,
      views: 0,
    })
    .select()
    .single()

  if (error) throw error
  return data as ShareableLink
}

// Increment link views
export async function incrementLinkViews(linkId: string): Promise<void> {
  const { error } = await supabase.rpc('increment_link_views', { link_id: linkId })

  // Fallback if RPC doesn't exist
  if (error) {
    const { data: link } = await supabase
      .from('shareable_links')
      .select('views')
      .eq('id', linkId)
      .single()

    if (link) {
      await supabase
        .from('shareable_links')
        .update({ views: link.views + 1 })
        .eq('id', linkId)
    }
  }
}

// Delete a shareable link
export async function deleteShareableLink(linkId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('shareable_links')
    .delete()
    .eq('id', linkId)
    .eq('user_id', user.id)

  if (error) throw error
}

// Update a shareable link
export async function updateShareableLink(
  linkId: string,
  updates: Partial<Pick<ShareableLink, 'custom_slug' | 'expires_at' | 'max_views'>>
): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('shareable_links')
    .update(updates)
    .eq('id', linkId)
    .eq('user_id', user.id)

  if (error) throw error
}

// Check if slug is available
export async function isSlugAvailable(slug: string): Promise<boolean> {
  const { data } = await supabase
    .from('shareable_links')
    .select('id')
    .eq('custom_slug', slug)
    .single()

  return !data
}

// Get count of active links for a project
export async function getActiveLinkCount(projectId: string): Promise<number> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return 0

  const now = new Date().toISOString()

  const { count, error } = await supabase
    .from('shareable_links')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('project_id', projectId)
    .or(`expires_at.is.null,expires_at.gt.${now}`)

  if (error) {
    console.error('Error counting active links:', error)
    return 0
  }

  return count || 0
}
