"use client"

export type ShareableLinkRecord = {
  id: string
  projectId: string
  customSlug: string // Custom URL slug like "my-awesome-site"
  expiresAt: number | null // Timestamp or null for unlimited
  createdAt: number
  views: number
  maxViews?: number // Optional view limit
}

const KEY = "sitebuilder.shareable-links"

function read(): ShareableLinkRecord[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as ShareableLinkRecord[]) : []
  } catch {
    return []
  }
}

function write(next: ShareableLinkRecord[]) {
  if (typeof window === "undefined") return
  try {
    const payload = JSON.stringify(next)
    window.localStorage.setItem(KEY, payload)
    window.dispatchEvent(new StorageEvent("storage", { key: KEY, newValue: payload }))
  } catch {}
}

export function getShareableLinks() {
  return read()
}

export function getShareableLinkBySlug(slug: string): ShareableLinkRecord | null {
  const links = read()
  const link = links.find((l) => l.customSlug === slug)
  
  if (!link) return null
  
  // Check if link has expired
  if (link.expiresAt && link.expiresAt < Date.now()) {
    return null
  }
  
  // Check if view limit reached
  if (link.maxViews && link.views >= link.maxViews) {
    return null
  }
  
  return link
}

export function getShareableLinksByProjectId(projectId: string): ShareableLinkRecord[] {
  return read().filter((l) => l.projectId === projectId)
}

export function createShareableLink(
  projectId: string,
  customSlug: string,
  expiryDays: number | null = null,
  maxViews?: number
): ShareableLinkRecord {
  const links = read()
  
  // Check if slug already exists
  if (links.some((l) => l.customSlug === customSlug)) {
    throw new Error("This custom URL is already taken. Please choose a different one.")
  }
  
  const now = Date.now()
  const expiresAt = expiryDays ? now + expiryDays * 24 * 60 * 60 * 1000 : null
  
  const newLink: ShareableLinkRecord = {
    id: `link_${now}_${Math.random().toString(36).substring(2, 9)}`,
    projectId,
    customSlug,
    expiresAt,
    createdAt: now,
    views: 0,
    maxViews,
  }
  
  links.unshift(newLink)
  write(links)
  
  return newLink
}

export function incrementLinkViews(linkId: string) {
  const links = read()
  const link = links.find((l) => l.id === linkId)
  
  if (link) {
    link.views += 1
    write(links)
  }
}

export function deleteShareableLink(linkId: string) {
  write(read().filter((l) => l.id !== linkId))
}

export function updateShareableLink(linkId: string, updates: Partial<ShareableLinkRecord>) {
  const links = read()
  const idx = links.findIndex((l) => l.id === linkId)
  
  if (idx >= 0) {
    links[idx] = { ...links[idx], ...updates }
    write(links)
  }
}

export function isSlugAvailable(slug: string): boolean {
  return !read().some((l) => l.customSlug === slug)
}

export function getActiveLinkCount(projectId: string): number {
  const now = Date.now()
  return read().filter((l) => {
    if (l.projectId !== projectId) return false
    if (l.expiresAt && l.expiresAt < now) return false
    if (l.maxViews && l.views >= l.maxViews) return false
    return true
  }).length
}
