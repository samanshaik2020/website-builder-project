"use client"

import { supabase } from './client'

export type ProjectData = {
  texts: Record<string, string>
  images: Record<string, string>
  buttons: Record<string, { href: string; text: string }>
}

export type Project = {
  id: string
  user_id: string
  name: string
  template: string
  theme?: string | null
  data: ProjectData
  created_at: string
  updated_at: string
}

// Get all projects for current user
export async function getProjects(): Promise<Project[]> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return []

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }

  return data as Project[]
}

// Get a single project by ID
export async function getProjectById(projectId: string): Promise<Project | null> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .eq('user_id', user.id)
    .single()

  if (error) {
    console.error('Error fetching project:', error)
    return null
  }

  return data as Project
}

// Save or update a project
export async function saveProject(project: {
  id?: string
  name: string
  template: string
  theme?: string | null
  data: ProjectData
}): Promise<Project | null> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Not authenticated')

  // If project has an ID, update it
  if (project.id) {
    const { data, error } = await supabase
      .from('projects')
      .update({
        name: project.name,
        template: project.template,
        theme: project.theme,
        data: project.data,
      })
      .eq('id', project.id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) throw error
    return data as Project
  }

  // Otherwise, create a new project
  const { data, error } = await supabase
    .from('projects')
    .insert({
      user_id: user.id,
      name: project.name,
      template: project.template,
      theme: project.theme,
      data: project.data,
    })
    .select()
    .single()

  if (error) throw error
  return data as Project
}

// Delete a project
export async function deleteProject(projectId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId)
    .eq('user_id', user.id)

  if (error) throw error
}

// Count projects by template type
export async function countProjectsByTemplate(template: string, theme?: string): Promise<number> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return 0

  let query = supabase
    .from('projects')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('template', template)

  if (theme) {
    query = query.eq('theme', theme)
  }

  const { count, error } = await query

  if (error) {
    console.error('Error counting projects:', error)
    return 0
  }

  return count || 0
}

// Count normal templates (non-pro)
export async function countNormalTemplates(): Promise<number> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return 0

  const normalTemplates = [
    'portfolio',
    'saas-landing',
    'project-overview',
    'personal-profile',
    'event',
    'iphone-product',
    'lead-generation',
    'click-through',
    'sales-landing',
  ]

  const { count, error } = await supabase
    .from('projects')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .in('template', normalTemplates)

  if (error) {
    console.error('Error counting normal templates:', error)
    return 0
  }

  return count || 0
}

// Count pro templates
export async function countProTemplates(): Promise<number> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return 0

  const proTemplates = [
    'agency-pro',
    'saas-pro',
    'portfolio-pro',
    'iphone-pro',
    'ecommerce-pro',
  ]

  const { count, error } = await supabase
    .from('projects')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .in('template', proTemplates)

  if (error) {
    console.error('Error counting pro templates:', error)
    return 0
  }

  return count || 0
}
