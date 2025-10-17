"use client"

import { useEffect, useState } from "react"
import {
  getShareableLinks,
  getShareableLinksByProjectId,
  createShareableLink,
  deleteShareableLink,
  updateShareableLink,
  isSlugAvailable,
  getActiveLinkCount,
  type ShareableLink,
} from "@/lib/supabase/shareable-links"

export function useShareableLinks(projectId?: string) {
  const [links, setLinks] = useState<ShareableLink[]>([])
  const [loading, setLoading] = useState(true)

  const loadLinks = async () => {
    try {
      if (projectId) {
        const data = await getShareableLinksByProjectId(projectId)
        setLinks(data)
      } else {
        const data = await getShareableLinks()
        setLinks(data)
      }
    } catch (error) {
      console.error("Error loading shareable links:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadLinks()
  }, [projectId])

  const create = async (
    projectId: string,
    customSlug: string,
    expiryDays: number | null = null,
    maxViews?: number
  ) => {
    const newLink = await createShareableLink(projectId, customSlug, expiryDays, maxViews)
    await loadLinks()
    return newLink
  }

  const remove = async (linkId: string) => {
    await deleteShareableLink(linkId)
    await loadLinks()
  }

  const update = async (linkId: string, updates: Partial<ShareableLink>) => {
    await updateShareableLink(linkId, updates)
    await loadLinks()
  }

  const checkSlugAvailability = async (slug: string): Promise<boolean> => {
    return await isSlugAvailable(slug)
  }

  const getActiveCount = async (projectId: string): Promise<number> => {
    return await getActiveLinkCount(projectId)
  }

  return {
    links,
    loading,
    create,
    remove,
    update,
    checkSlugAvailability,
    getActiveCount,
    reload: loadLinks,
  }
}
