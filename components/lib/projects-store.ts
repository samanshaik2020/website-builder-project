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

function read(): ProjectRecord[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as ProjectRecord[]) : []
  } catch {
    return []
  }
}

function write(next: ProjectRecord[]) {
  if (typeof window === "undefined") return
  try {
    const payload = JSON.stringify(next)
    window.localStorage.setItem(KEY, payload)
    window.dispatchEvent(new StorageEvent("storage", { key: KEY, newValue: payload }))
  } catch {}
}

export function getProjects() {
  return read()
}

export function saveProject(p: ProjectRecord) {
  const list = read()
  const idx = list.findIndex((x) => x.id === p.id)
  if (idx >= 0) list[idx] = p
  else list.unshift(p)
  write(list)
}

export function deleteProject(id: string) {
  write(read().filter((p) => p.id !== id))
}
