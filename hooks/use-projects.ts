"use client"

import { useEffect, useState } from "react"
import { deleteProject, getProjects, saveProject, type ProjectRecord } from "@/components/lib/projects-store"

const KEY = "sitebuilder.projects"

export function useProjects() {
  const [projects, setProjects] = useState<ProjectRecord[]>([])

  useEffect(() => {
    setProjects(getProjects())
    const onStorage = (e: StorageEvent) => {
      if (!e.key || e.key === KEY) {
        setProjects(getProjects())
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  return {
    projects,
    save: saveProject,
    remove: deleteProject,
  }
}
