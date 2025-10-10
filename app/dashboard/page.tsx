"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Brain, 
  Plus, 
  Search, 
  Bell, 
  HelpCircle, 
  Globe, 
  Eye, 
  MousePointerClick, 
  Target,
  Layout,
  Upload,
  Layers,
  Calendar,
  Trash2,
  Grid3x3,
  List,
  Download,
  ExternalLink,
  Edit,
  Lock,
  Share2,
  LogOut,
  User,
  Settings,
  ChevronDown
} from "lucide-react"
import Link from "next/link"
import { useProjects } from "@/hooks/use-projects"
import { generateHTMLExport } from "@/lib/export-html"
import type { Project } from "@/lib/supabase/projects"
import { useSubscription } from "@/hooks/use-subscription"
import { canExport, getPlanById } from "@/lib/pricing-plans"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ShareLinkDialog } from "@/components/share-link-dialog"
import { useAuth } from "@/contexts/auth-context"
import { signOut } from "@/lib/supabase/auth"
import { useShareableLinks } from "@/hooks/use-shareable-links"
import { Copy } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DashboardPage() {
  const { projects, remove } = useProjects()
  const { subscription, isLoaded } = useSubscription()
  const { user, profile } = useAuth()
  const router = useRouter()
  const currentPlan = getPlanById(subscription.plan)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { links: allLinks } = useShareableLinks()

  const handleLogout = async () => {
    try {
      await signOut()
      toast.success("Logged out successfully")
      router.push("/auth/signin")
    } catch (error: any) {
      toast.error("Logout failed", {
        description: error.message || "Could not log out. Please try again.",
      })
    }
  }

  const getUserInitials = (email: string | null | undefined) => {
    if (!email) return "LU"
    const parts = email.split("@")[0].split(".")
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return email.substring(0, 2).toUpperCase()
  }

  const displayEmail = profile?.email || user?.email || "user@example.com"
  const displayName = profile?.fullName || user?.user_metadata?.full_name || "Local User"
  const userInitials = getUserInitials(displayEmail)

  // Prevent hydration errors by not rendering subscription-dependent content until loaded
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  const handleExport = (project: Project) => {
    // Check if user's plan allows export
    if (!canExport(subscription.plan)) {
      toast.error("Export Feature Locked", {
        description: "Export is only available on Professional and Unlimited plans. Upgrade to export your websites.",
        duration: 5000,
      })
      setTimeout(() => router.push("/pricing"), 1500)
      return
    }
    
    // Convert Supabase project format to format expected by generateHTMLExport
    const projectData = {
      id: project.id,
      name: project.name,
      template: project.template,
      theme: project.theme || undefined,
      updatedAt: new Date(project.updated_at).getTime(),
      data: project.data,
    }
    const html = generateHTMLExport(projectData)
    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${project.name.replace(/\s+/g, "-").toLowerCase()}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast.success("Export Successful!", {
      description: `${project.name} has been exported as HTML.`,
      duration: 3000,
    })
  }

  const handlePreview = (project: Project) => {
    // Convert Supabase project format to format expected by generateHTMLExport
    const projectData = {
      id: project.id,
      name: project.name,
      template: project.template,
      theme: project.theme || undefined,
      updatedAt: new Date(project.updated_at).getTime(),
      data: project.data,
    }
    const html = generateHTMLExport(projectData)
    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    window.open(url, "_blank")
  }

  const handleEdit = (project: Project) => {
    // Save project to localStorage for editor to load
    localStorage.setItem('editor-project-data', JSON.stringify(project))
    
    // Navigate to editor with template and theme parameters
    const params = new URLSearchParams()
    params.set('template', project.template)
    if (project.theme) {
      params.set('theme', project.theme)
    }
    params.set('loadProject', 'true')
    window.location.href = `/editor?${params.toString()}`
  }

  const handleShare = (project: Project) => {
    setSelectedProject(project)
    setShareDialogOpen(true)
  }

  const handleCopyLink = (link: string, e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(link)
    toast.success("Link copied to clipboard!")
  }

  const getProjectLink = (projectId: string) => {
    // Find the most recent active link for this project
    const link = allLinks.find(l => {
      if (l.project_id !== projectId) return false
      
      // Check if expired
      if (l.expires_at && new Date(l.expires_at) < new Date()) return false
      
      // Check if max views reached
      if (l.max_views && l.views >= l.max_views) return false
      
      return true
    })
    
    if (link) {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin
      return `${baseUrl}/share/${link.custom_slug}`
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between max-w-[1400px] mx-auto">
          {/* Left: Logo and Search */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">Squpage</span>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search projects..."
                className="pl-10 w-80 h-9 bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          {/* Right: Actions and User */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <HelpCircle className="w-5 h-5 text-gray-600" />
            </button>
            <div className="pl-4 border-l border-gray-200">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 hover:bg-gray-50 rounded-lg p-1.5 transition-colors">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {userInitials}
                    </div>
                    <div className="text-sm text-left">
                      <div className="font-medium text-gray-900">{displayName}</div>
                      <div className="text-xs text-gray-500">{displayEmail}</div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{displayName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {displayEmail}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/pricing" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Plans & Billing</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
              <p className="text-gray-600">Here's what's happening with your websites today.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-lg border border-gray-200 px-4 py-2">
                <div className="text-xs text-gray-600">Current Plan</div>
                <div className="text-sm font-semibold text-purple-600 uppercase">{subscription.plan}</div>
              </div>
              <Link href="/pricing">
                <Button variant="outline" className="gap-2">
                  View Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-8">
          <Link href="/editor">
            <Button variant="outline" className="gap-2">
              <Layout className="w-4 h-4" />
              Browse Templates
            </Button>
          </Link>
          <Link href="/editor">
            <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4" />
              New Website
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Websites</div>
                <div className="text-3xl font-bold text-gray-900">{projects.length}</div>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <span>↑ {projects.length} this month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Views</div>
                <div className="text-3xl font-bold text-gray-900">0</div>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <span>↑ 0% vs last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Clicks</div>
                <div className="text-3xl font-bold text-gray-900">0</div>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                <MousePointerClick className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <span>↑ 0% vs last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Avg. Conversion</div>
                <div className="text-3xl font-bold text-gray-900">0%</div>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <span>↑ 0% vs last month</span>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Quick Actions and Projects */}
          <div className="col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/editor">
                  <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Layout className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Portfolio Template</div>
                      <div className="text-sm text-gray-600">Professional portfolio website</div>
                    </div>
                  </div>
                </Link>

                <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Blank Canvas</div>
                    <div className="text-sm text-gray-600">Build with Elementor editor</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Import Design</div>
                    <div className="text-sm text-gray-600">Upload your existing design</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Layers className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">View Templates</div>
                    <div className="text-sm text-gray-600">Browse all available templates</div>
                  </div>
                </div>
              </div>
            </div>

            {/* My Projects */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">My Projects</h2>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                    All
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
                    Published
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
                    Drafts
                  </button>
                  <div className="ml-2 flex gap-1">
                    <button className="p-1.5 hover:bg-gray-100 rounded">
                      <Grid3x3 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded">
                      <List className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {projects.length > 0 ? (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="w-32 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Layout className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900">{project.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                                  {project.template}
                                </span>
                                <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded font-medium">
                                  Published
                                </span>
                              </div>
                            </div>
                            <button 
                              onClick={() => remove(project.id)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(project.updated_at).toLocaleDateString()}</span>
                          </div>
                          {getProjectLink(project.id) && (
                            <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                              <div className="flex items-center gap-2">
                                <Globe className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                                <code className="text-xs text-blue-700 flex-1 truncate">
                                  {getProjectLink(project.id)}
                                </code>
                                <button
                                  onClick={(e) => handleCopyLink(getProjectLink(project.id)!, e)}
                                  className="p-1 hover:bg-blue-100 rounded transition-colors"
                                  title="Copy link"
                                >
                                  <Copy className="w-3.5 h-3.5 text-blue-600" />
                                </button>
                              </div>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1.5 h-8"
                              onClick={() => handleEdit(project)}
                            >
                              <Edit className="w-3.5 h-3.5" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1.5 h-8"
                              onClick={() => handlePreview(project)}
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Preview
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1.5 h-8"
                              onClick={() => handleShare(project)}
                            >
                              <Share2 className="w-3.5 h-3.5" />
                              Share
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className={`gap-1.5 h-8 ${!currentPlan.limits.canExport ? "opacity-60" : ""}`}
                              onClick={() => handleExport(project)}
                            >
                              {!currentPlan.limits.canExport ? (
                                <Lock className="w-3.5 h-3.5" />
                              ) : (
                                <Download className="w-3.5 h-3.5" />
                              )}
                              Export
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    View All Projects
                  </button>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Layout className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No projects yet. Create your first website!</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - This Month and Upgrade */}
          <div className="space-y-6">
            {/* This Month Stats */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">This Month</h2>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Websites Created</div>
                  <div className="text-2xl font-bold text-gray-900">{projects.length}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Total Visitors</div>
                  <div className="text-2xl font-bold text-gray-900">0</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Conversion Rate</div>
                  <div className="text-2xl font-bold text-gray-900">0%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Leads Generated</div>
                  <div className="text-2xl font-bold text-gray-900">0</div>
                </div>
              </div>
            </div>

            {/* Plan Limits & Upgrade */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Your Plan Limits</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Normal Templates</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {projects.filter(p => !["agency-pro", "saas-pro", "portfolio-pro", "iphone-pro", "ecommerce-pro"].includes(p.template)).length} / {currentPlan.limits.normalTemplates === "unlimited" ? "∞" : currentPlan.limits.normalTemplates}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ 
                        width: currentPlan.limits.normalTemplates === "unlimited" 
                          ? "100%" 
                          : `${Math.min((projects.filter(p => !["agency-pro", "saas-pro", "portfolio-pro", "iphone-pro", "ecommerce-pro"].includes(p.template)).length / (currentPlan.limits.normalTemplates as number)) * 100, 100)}%` 
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Pro Templates</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {projects.filter(p => ["agency-pro", "saas-pro", "portfolio-pro", "iphone-pro", "ecommerce-pro"].includes(p.template)).length} / {currentPlan.limits.proTemplates === Infinity ? "∞" : currentPlan.limits.proTemplates}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ 
                        width: currentPlan.limits.proTemplates === Infinity 
                          ? "100%" 
                          : `${Math.min((projects.filter(p => ["agency-pro", "saas-pro", "portfolio-pro", "iphone-pro", "ecommerce-pro"].includes(p.template)).length / currentPlan.limits.proTemplates) * 100, 100)}%` 
                      }}
                    />
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Export to HTML</span>
                    <span className={`text-sm font-semibold ${currentPlan.limits.canExport ? "text-green-600" : "text-red-600"}`}>
                      {currentPlan.limits.canExport ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {subscription.plan !== "unlimited" && (
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {subscription.plan === "free" ? "Upgrade to Pro" : "Upgrade Your Plan"}
                </h3>
                <p className="text-sm text-white/90 mb-4">Unlock more features and templates</p>
                <ul className="space-y-2 mb-6 text-sm">
                  {subscription.plan === "free" && (
                    <>
                      <li className="flex items-center gap-2">
                        <span className="text-white">•</span>
                        <span>Unlimited normal templates</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-white">•</span>
                        <span>Access to pro templates</span>
                      </li>
                    </>
                  )}
                  {(subscription.plan === "free" || subscription.plan === "starter") && (
                    <li className="flex items-center gap-2">
                      <span className="text-white">•</span>
                      <span>Export to HTML</span>
                    </li>
                  )}
                  <li className="flex items-center gap-2">
                    <span className="text-white">•</span>
                    <span>AI content generation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-white">•</span>
                    <span>Priority support</span>
                  </li>
                </ul>
                <Link href="/pricing">
                  <Button className="w-full bg-white text-purple-600 hover:bg-gray-100">
                    View All Plans
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Share Link Dialog */}
      {selectedProject && (
        <ShareLinkDialog
          project={selectedProject}
          open={shareDialogOpen}
          onOpenChange={setShareDialogOpen}
        />
      )}
    </div>
  )
}
