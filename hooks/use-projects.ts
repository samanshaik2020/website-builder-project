"use client"

import { useEffect, useState } from 'react'
import { getProjects, saveProject, deleteProject, type Project, type ProjectData } from '@/lib/supabase/projects'
import { trackTemplateUsage } from '@/lib/supabase/template-stats'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  const loadProjects = async () => {
    setLoading(true)
    try {
      const data = await getProjects()
      setProjects(data)
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const save = async (project: {
    id?: string
    name: string
    template: string
    theme?: string | null
    data: ProjectData
  }) => {
    try {
      const saved = await saveProject(project)
      
      if (saved) {
        // Track template usage
        await trackTemplateUsage(saved.template, saved.theme)
        
        // Reload projects
        await loadProjects()
      }
      
      return saved
    } catch (error) {
      console.error('Error saving project:', error)
      throw error
    }
  }

  const remove = async (id: string) => {
    try {
      await deleteProject(id)
      await loadProjects()
    } catch (error) {
      console.error('Error deleting project:', error)
      throw error
    }
  }

  return {
    projects,
    loading,
    save,
    remove,
    reload: loadProjects,
  }
}
