/**
 * @deprecated This file is deprecated and kept only for backward compatibility.
 * Please use the new Supabase project service instead:
 * 
 * import { getUserProjects, createProject, updateProject, deleteProject } from '@/lib/services/project-service'
 * 
 * All project data is now stored in Supabase with proper user authentication,
 * analytics tracking, and shareable links.
 */

"use client"

export type ProjectRecord = {
  id: string
  name: string
  template: string
  theme?: string // For Pro templates like saas-pro
  updatedAt: number
  data: {
    texts: Record<string, string>
    images: Record<string, string>
    buttons: Record<string, { href: string; text: string }>
  }
}

const KEY = "sitebuilder.projects"

/**
 * @deprecated Use getUserProjects() from @/lib/services/project-service instead
 */
function read(): ProjectRecord[] {
  console.warn('projects-store.read() is deprecated. Use getUserProjects() from @/lib/services/project-service instead.');
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as ProjectRecord[]) : []
  } catch {
    return []
  }
}

/**
 * @deprecated Projects are now stored in Supabase
 */
function write(next: ProjectRecord[]) {
  console.warn('projects-store.write() is deprecated. Projects are now stored in Supabase.');
  if (typeof window === "undefined") return
  try {
    const payload = JSON.stringify(next)
    window.localStorage.setItem(KEY, payload)
    window.dispatchEvent(new StorageEvent("storage", { key: KEY, newValue: payload }))
  } catch {}
}

/**
 * @deprecated Use getUserProjects() from @/lib/services/project-service instead
 */
export function getProjects() {
  return read()
}

/**
 * @deprecated Use createProject() or updateProject() from @/lib/services/project-service instead
 */
export function saveProject(p: ProjectRecord) {
  const list = read()
  const idx = list.findIndex((x) => x.id === p.id)
  if (idx >= 0) list[idx] = p
  else list.unshift(p)
  write(list)
}

/**
 * @deprecated Use deleteProject() from @/lib/services/project-service instead
 */
export function deleteProject(id: string) {
  write(read().filter((p) => p.id !== id))
}
