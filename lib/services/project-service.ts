'use client'

import { createClient } from '@/lib/supabase/client'
import type { Project, ProjectWithAnalytics } from '@/lib/supabase/types'

export interface ProjectData {
  texts?: Record<string, string>
  images?: Record<string, string>
  buttons?: Record<string, { href: string; text: string }>
  [key: string]: unknown
}

export interface CreateProjectInput {
  name: string
  template: string
  theme?: string
  data: ProjectData
  customUrl?: string
}

export interface UpdateProjectInput {
  name?: string
  template?: string
  theme?: string
  data?: ProjectData
  customUrl?: string
}

/**
 * Get all projects for the current user
 */
export async function getUserProjects(): Promise<ProjectWithAnalytics[]> {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      analytics:project_analytics(*)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  // Transform the data to flatten analytics
  return (data || []).map((project) => ({
    ...project,
    analytics: project.analytics?.[0] || null,
  })) as ProjectWithAnalytics[]
}

/**
 * Get a single project by ID
 */
export async function getProject(projectId: string): Promise<ProjectWithAnalytics | null> {
  const supabase = createClient()
  
  console.log('[getProject] Fetching project with ID:', projectId)
  
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      analytics:project_analytics(*)
    `)
    .eq('id', projectId)
    .maybeSingle() // Use maybeSingle instead of single

  if (error) {
    console.error('[getProject] Error:', error)
    throw new Error(error.message)
  }

  if (!data) {
    console.log('[getProject] No project found with ID:', projectId)
    return null
  }

  console.log('[getProject] Project found:', data.id)
  return {
    ...data,
    analytics: data.analytics?.[0] || null,
  }
}

/**
 * Get a project by custom URL (for shareable links)
 * This function allows anonymous access for public shareable links
 */
export async function getProjectByCustomUrl(customUrl: string): Promise<ProjectWithAnalytics | null> {
  const supabase = createClient()
  
  console.log('[getProjectByCustomUrl] Fetching project with custom URL:', customUrl)
  
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      analytics:project_analytics(*)
    `)
    .eq('custom_url', customUrl)
    .maybeSingle() // Use maybeSingle instead of single to avoid errors when not found

  if (error) {
    console.error('[getProjectByCustomUrl] Error:', error)
    throw new Error(error.message)
  }

  if (!data) {
    console.log('[getProjectByCustomUrl] No project found with custom URL:', customUrl)
    return null
  }

  console.log('[getProjectByCustomUrl] Project found:', data.id)
  return {
    ...data,
    analytics: data.analytics?.[0] || null,
  }
}

/**
 * Create a new project
 */
export async function createProject(input: CreateProjectInput): Promise<Project> {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('projects')
    .insert({
      user_id: user.id,
      name: input.name,
      template: input.template,
      theme: input.theme,
      data: input.data as Record<string, unknown>,
      custom_url: input.customUrl,
    })
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

/**
 * Update an existing project
 */
export async function updateProject(projectId: string, input: UpdateProjectInput): Promise<Project> {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }

  const updateData: Record<string, unknown> = {}
  if (input.name !== undefined) updateData.name = input.name
  if (input.template !== undefined) updateData.template = input.template
  if (input.theme !== undefined) updateData.theme = input.theme
  if (input.data !== undefined) updateData.data = input.data
  if (input.customUrl !== undefined) updateData.custom_url = input.customUrl

  const { data, error } = await supabase
    .from('projects')
    .update(updateData)
    .eq('id', projectId)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

/**
 * Delete a project
 */
export async function deleteProject(projectId: string): Promise<void> {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId)
    .eq('user_id', user.id)

  if (error) {
    throw new Error(error.message)
  }
}

/**
 * Check if custom URL is available
 */
export async function isCustomUrlAvailable(customUrl: string, excludeProjectId?: string): Promise<boolean> {
  const supabase = createClient()
  
  let query = supabase
    .from('projects')
    .select('id')
    .eq('custom_url', customUrl)

  if (excludeProjectId) {
    query = query.neq('id', excludeProjectId)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(error.message)
  }

  return data.length === 0
}
