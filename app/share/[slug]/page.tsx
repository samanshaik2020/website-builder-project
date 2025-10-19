"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getProjectByShareableLink } from "@/lib/supabase/projects"
import { getShareableLinkBySlug, incrementLinkViews } from "@/lib/supabase/shareable-links"
import { generateHTMLExport } from "@/lib/export-html"
import { trackButtonClick } from "@/lib/supabase/analytics"
import { AlertCircle, Clock, Eye } from "lucide-react"

export default function SharePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [htmlContent, setHtmlContent] = useState<string | null>(null)
  const [linkId, setLinkId] = useState<string | null>(null)

  useEffect(() => {
    async function loadSharedProject() {
      console.log('🔗 [SHAREABLE LINK] Starting to load project for slug:', slug)
      
      if (!slug) {
        console.error('❌ [SHAREABLE LINK] No slug provided')
        setError("Invalid link")
        setLoading(false)
        return
      }

      try {
        // Get the shareable link
        console.log('🔍 [SHAREABLE LINK] Step 1: Fetching shareable link from database...')
        const link = await getShareableLinkBySlug(slug)
        
        if (!link) {
          console.error('❌ [SHAREABLE LINK] Link not found or expired for slug:', slug)
          setError("This link has expired or doesn't exist")
          setLoading(false)
          return
        }

        console.log('✅ [SHAREABLE LINK] Step 1 Complete: Link found', {
          linkId: link.id,
          projectId: link.project_id,
          views: link.views,
          expiresAt: link.expires_at,
          maxViews: link.max_views
        })

        // Store link ID for click tracking
        setLinkId(link.id)

        // Increment view count
        console.log('📊 [SHAREABLE LINK] Step 2: Incrementing view count...')
        await incrementLinkViews(link.id)

        // Get the project via shareable link
        console.log('🔍 [SHAREABLE LINK] Step 3: Fetching project data from database...')
        const project = await getProjectByShareableLink(slug)

        if (!project) {
          console.error('❌ [SHAREABLE LINK] Project not found for slug:', slug)
          setError("Project not found")
          setLoading(false)
          return
        }

        console.log('✅ [SHAREABLE LINK] Step 3 Complete: Project fetched from database', {
          projectId: project.id,
          projectName: project.name,
          template: project.template,
          theme: project.theme,
          themeType: typeof project.theme,
          themeIsNull: project.theme === null,
          themeIsUndefined: project.theme === undefined,
          hasData: !!project.data,
          dataKeys: project.data ? Object.keys(project.data) : []
        })

        // Convert Supabase project format to the format expected by generateHTMLExport
        const projectData = {
          id: project.id,
          name: project.name,
          template: project.template,
          theme: project.theme || undefined,
          updatedAt: new Date(project.updated_at).getTime(),
          data: project.data,
        }

        console.log('🎨 [SHAREABLE LINK] Step 4: Project data prepared for export:', {
          name: projectData.name,
          template: projectData.template,
          theme: projectData.theme,
          themeAfterConversion: projectData.theme,
          hasTheme: !!projectData.theme,
          willUseDefaultTheme: !projectData.theme,
          dataTextCount: Object.keys(projectData.data?.texts || {}).length,
          dataImageCount: Object.keys(projectData.data?.images || {}).length,
          dataButtonCount: Object.keys(projectData.data?.buttons || {}).length
        })

        // Generate HTML and render inline
        console.log('🔨 [SHAREABLE LINK] Step 5: Generating HTML export...')
        const html = generateHTMLExport(projectData)
        
        console.log('✅ [SHAREABLE LINK] Step 5 Complete: HTML generated', {
          htmlLength: html.length,
          htmlPreview: html.substring(0, 200) + '...'
        })
        
        setHtmlContent(html)
        setLoading(false)
        
        console.log('🎉 [SHAREABLE LINK] SUCCESS: Project loaded and rendered!')
      } catch (err) {
        console.error('❌ [SHAREABLE LINK] ERROR: Failed to load project:', err)
        console.error('❌ [SHAREABLE LINK] Error details:', {
          errorMessage: err instanceof Error ? err.message : 'Unknown error',
          errorStack: err instanceof Error ? err.stack : undefined,
          slug: slug
        })
        setError("Failed to load project")
        setLoading(false)
      }
    }

    loadSharedProject()
  }, [slug])

  // Track button clicks
  useEffect(() => {
    if (!htmlContent || !linkId) return

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const button = target.closest('a, button')
      
      if (button) {
        const buttonId = button.getAttribute('data-button-id') || button.id || 'unknown'
        const buttonText = button.textContent || ''
        const buttonHref = button instanceof HTMLAnchorElement ? button.href : ''
        
        // Track the click asynchronously
        trackButtonClick(linkId, buttonId, buttonText, buttonHref)
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [htmlContent, linkId])

  // Render HTML content
  if (htmlContent) {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  }

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
