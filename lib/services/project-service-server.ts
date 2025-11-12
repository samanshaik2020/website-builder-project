import { createClient } from '@/lib/supabase/server'
import type { ProjectWithAnalytics } from '@/lib/supabase/types'

/**
 * Server-side function to get a single project by ID
 * This can be called from server components
 */
export async function getProjectServer(projectId: string): Promise<ProjectWithAnalytics | null> {
  const supabase = await createClient()
  
  console.log('[getProjectServer] Fetching project with ID:', projectId)
  
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      analytics:project_analytics(*)
    `)
    .eq('id', projectId)
    .maybeSingle()

  if (error) {
    console.error('[getProjectServer] Error:', error)
    return null
  }

  if (!data) {
    console.log('[getProjectServer] No project found with ID:', projectId)
    return null
  }

  console.log('[getProjectServer] Project found:', data.id)
  return {
    ...data,
    analytics: data.analytics?.[0] || null,
  }
}

/**
 * Server-side function to get a project by custom URL
 * This allows anonymous access for public shareable links
 */
export async function getProjectByCustomUrlServer(customUrl: string): Promise<ProjectWithAnalytics | null> {
  const supabase = await createClient()
  
  console.log('[getProjectByCustomUrlServer] Fetching project with custom URL:', customUrl)
  
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      analytics:project_analytics(*)
    `)
    .eq('custom_url', customUrl)
    .maybeSingle()

  if (error) {
    console.error('[getProjectByCustomUrlServer] Error:', error)
    return null
  }

  if (!data) {
    console.log('[getProjectByCustomUrlServer] No project found with custom URL:', customUrl)
    return null
  }

  console.log('[getProjectByCustomUrlServer] Project found:', data.id)
  return {
    ...data,
    analytics: data.analytics?.[0] || null,
  }
}
