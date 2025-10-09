"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getProjectByShareableLink } from "@/lib/supabase/projects"
import { getShareableLinkBySlug, incrementLinkViews } from "@/lib/supabase/shareable-links"
import { generateHTMLExport } from "@/lib/export-html"
import { AlertCircle, Clock, Eye } from "lucide-react"

export default function SharePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSharedProject() {
      if (!slug) {
        setError("Invalid link")
        setLoading(false)
        return
      }

      try {
        // Get the shareable link
        const link = await getShareableLinkBySlug(slug)
        
        if (!link) {
          setError("This link has expired or doesn't exist")
          setLoading(false)
          return
        }

        // Increment view count
        await incrementLinkViews(link.id)

        // Get the project via shareable link
        const project = await getProjectByShareableLink(slug)

        if (!project) {
          setError("Project not found")
          setLoading(false)
          return
        }

        // Convert Supabase project format to the format expected by generateHTMLExport
        const projectData = {
          id: project.id,
          name: project.name,
          template: project.template,
          theme: project.theme || undefined,
          updatedAt: new Date(project.updated_at).getTime(),
          data: project.data,
        }

        // Generate and display the HTML
        const html = generateHTMLExport(projectData)
        const blob = new Blob([html], { type: "text/html" })
        const url = URL.createObjectURL(blob)
        
        // Redirect to the blob URL
        window.location.href = url
      } catch (err) {
        console.error("Error loading shared project:", err)
        setError("Failed to load project")
        setLoading(false)
      }
    }

    loadSharedProject()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 font-medium">Loading shared project...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Link Not Available</h1>
          <p className="text-gray-600">{error}</p>
          <div className="pt-4 space-y-2 text-sm text-gray-500">
            <p className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              Links may expire based on the creator's plan
            </p>
            <p className="flex items-center justify-center gap-2">
              <Eye className="w-4 h-4" />
              Some links have view limits
            </p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    )
  }

  return null
}
