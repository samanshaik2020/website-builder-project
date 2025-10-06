"use client"

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
  Edit
} from "lucide-react"
import Link from "next/link"
import { useProjects } from "@/hooks/use-projects"
import { generateHTMLExport } from "@/lib/export-html"
import type { ProjectRecord } from "@/components/lib/projects-store"

export default function DashboardPage() {
  const { projects, remove } = useProjects()

  const handleExport = (project: ProjectRecord) => {
    const html = generateHTMLExport(project)
    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${project.name.replace(/\s+/g, "-").toLowerCase()}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handlePreview = (project: ProjectRecord) => {
    const html = generateHTMLExport(project)
    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    window.open(url, "_blank")
  }

  const handleEdit = (project: ProjectRecord) => {
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
            <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                LU
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-900">Local User</div>
                <div className="text-xs text-gray-500">user@example.com</div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-600">Here's what's happening with your websites today.</p>
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
                            <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                          </div>
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
                              onClick={() => handleExport(project)}
                            >
                              <Download className="w-3.5 h-3.5" />
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

            {/* Upgrade to Pro */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Upgrade to Pro</h3>
              <p className="text-sm text-white/90 mb-4">Unlock advanced features</p>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-white">•</span>
                  <span>Unlimited websites</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">•</span>
                  <span>AI content generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">•</span>
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">•</span>
                  <span>Priority support</span>
                </li>
              </ul>
              <Button className="w-full bg-white text-purple-600 hover:bg-gray-100">
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
