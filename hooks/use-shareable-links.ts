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
  type ShareableLinkRecord,
} from "@/lib/shareable-links-store"

export function useShareableLinks(projectId?: string) {
  const [links, setLinks] = useState<ShareableLinkRecord[]>([])
  const [loading, setLoading] = useState(true)

  const loadLinks = () => {
    if (projectId) {
      setLinks(getShareableLinksByProjectId(projectId))
    } else {
      setLinks(getShareableLinks())
    }
    setLoading(false)
  }

  useEffect(() => {
    loadLinks()

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "sitebuilder.shareable-links") {
        loadLinks()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [projectId])

  const create = (
    projectId: string,
    customSlug: string,
    expiryDays: number | null = null,
    maxViews?: number
  ) => {
    const newLink = createShareableLink(projectId, customSlug, expiryDays, maxViews)
    loadLinks()
    return newLink
  }

  const remove = (linkId: string) => {
    deleteShareableLink(linkId)
    loadLinks()
  }

  const update = (linkId: string, updates: Partial<ShareableLinkRecord>) => {
    updateShareableLink(linkId, updates)
    loadLinks()
  }

  const checkSlugAvailability = (slug: string): boolean => {
    return isSlugAvailable(slug)
  }

  const getActiveCount = (projectId: string): number => {
    return getActiveLinkCount(projectId)
  }

  return {
    links,
    loading,
    create,
    remove,
    update,
    checkSlugAvailability,
    getActiveCount,
  }
}
