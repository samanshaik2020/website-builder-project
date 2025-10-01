"use client"

import type React from "react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Eye, Save, ArrowLeft } from "lucide-react"
import { Bold, Italic, LinkIcon, AlignLeft, AlignCenter, AlignRight, TypeIcon, Palette, X } from "lucide-react"
import { SiteBuilderSlateToolbar } from "@/components/site-builder-slate-toolbar"
import { AIGenerationModal } from "@/components/ai-generation-modal"
import { generateSaaSProContent } from "@/lib/gemini-api"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PortfolioTemplate } from "@/components/templates/normal/portfolio-template"
import { SaaSTemplate } from "@/components/templates/normal/saas-landing-template"
import { ProjectOverviewTemplate } from "@/components/templates/normal/project-overview-template"
import { PersonalProfileTemplate } from "@/components/templates/normal/personal-profile-template"
import { EventLandingTemplate } from "@/components/templates/normal/event-landing-template"
// TODO: Create remaining pro templates
// import { AgencyProTemplate } from "@/components/templates/pro/agency-pro-template"
import { SAAS_PRO_THEMES, type SaaSProThemeId } from "@/components/templates/pro/saas-pro"
import type { AITheme } from "@/components/ai-generation-modal"
// import { EcommerceProTemplate } from "@/components/templates/pro/ecommerce-pro-template"
import { saveProject, type ProjectRecord } from "@/components/lib/projects-store"

type TemplateId =
  | "portfolio"
  | "saas-landing"
  | "project-overview"
  | "personal-profile"
  | "event"
  | "agency-pro"
  | "saas-pro"
  | "ecommerce-pro"

type SelectedElement = { kind: "image"; el: HTMLImageElement } | { kind: "button"; el: HTMLAnchorElement } | { kind: "link"; el: HTMLAnchorElement }

function EditorHeader({
  onTogglePreview,
  onSavePublish,
  onBackToTemplates,
  isPreview,
  saving,
}: {
  onTogglePreview: () => void
  onSavePublish: () => Promise<void> | void
  onBackToTemplates: () => void
  isPreview: boolean
  saving: boolean
}) {
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        "h-14 border-b",
        "flex items-center justify-between px-4 md:px-6",
        "bg-[var(--sb-header)] text-[var(--sb-text)]",
      )}
      role="banner"
      aria-label="Editor header"
    >
      <div className="flex items-center gap-2">
        <div
          aria-label="SiteBuilder logo"
          className="rounded-md px-2 py-1 text-sm font-semibold tracking-wide"
          style={{ background: "color-mix(in oklab, var(--sb-text) 10%, var(--sb-header))" }}
        >
          {"SiteBuilder"}
        </div>
        <Button
          type="button"
          variant="ghost"
          onClick={onBackToTemplates}
          className={cn("h-9 gap-2 text-[var(--sb-text)] hover:opacity-80")}
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to Templates
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={onTogglePreview}
          aria-pressed={isPreview}
          className={cn("h-9 gap-2", "bg-[var(--sb-muted)] text-[var(--sb-bg)] hover:opacity-90")}
        >
          <Eye className="size-4" aria-hidden />
          {isPreview ? "Exit Preview" : "Preview"}
        </Button>
        <Button
          type="button"
          onClick={onSavePublish}
          disabled={saving}
          className={cn("h-9 gap-2", "bg-[var(--sb-primary)] text-[var(--sb-text)] hover:opacity-90")}
        >
          <Save className="size-4" aria-hidden />
          {saving ? "Saving…" : "Save & Publish"}
        </Button>
      </div>
    </header>
  )
}

function TemplateModal({
  open,
  onSelect,
}: {
  open: boolean
  onSelect: (id: TemplateId) => void
}) {
  const [activeFilter, setActiveFilter] = useState<"all" | "portfolio" | "free" | "pro">("all")
  const cards: Array<{
    id: TemplateId
    title: string
    imgAlt: string
    desc: string
    category: "Portfolio" | "SaaS" | "Profile" | "Event" | "Agency" | "Ecommerce"
    tags: string[]
    free?: boolean
  }> = [
    {
      id: "portfolio",
      title: "Portfolio Website",
      imgAlt: "Portfolio template preview",
      desc: "Professional portfolio showcasing projects, skills, and experience",
      category: "Portfolio",
      tags: ["Portfolio", "Creative", "Professional"],
      free: true,
    },
    {
      id: "saas-landing",
      title: "SaaS Landing Page",
      imgAlt: "SaaS landing template preview",
      desc: "High-converting product marketing page for your startup",
      category: "SaaS",
      tags: ["Marketing", "Product", "Conversion"],
      free: true,
    },
    {
      id: "project-overview",
      title: "Project Overview",
      imgAlt: "Project overview template preview",
      desc: "Case-study layout to present goals, process, and outcomes",
      category: "Portfolio",
      tags: ["Case Study", "UX", "Process"],
      free: true,
    },
    {
      id: "personal-profile",
      title: "Personal Profile",
      imgAlt: "Personal profile template preview",
      desc: "Simple bio page with links and social profiles",
      category: "Profile",
      tags: ["Links", "Bio", "Creator"],
      free: true,
    },
    {
      id: "event",
      title: "Event Landing Page",
      imgAlt: "Event template preview",
      desc: "Event page with countdown, details, map and RSVP form",
      category: "Event",
      tags: ["RSVP", "Countdown", "Venue"],
      free: true,
    },
    {
      id: "agency-pro",
      title: "Agency Pro",
      imgAlt: "Agency Pro template preview",
      desc: "Full‑service agency with enhanced sections, pricing, case studies, and blog.",
      category: "Agency",
      tags: ["Pro", "Agency", "Premium"],
      free: false,
    },
    {
      id: "saas-pro",
      title: "SaaS Pro",
      imgAlt: "SaaS Pro template preview",
      desc: "Premium SaaS marketing with advanced sections and testimonials.",
      category: "SaaS",
      tags: ["Pro", "Marketing", "Premium"],
      free: false,
    },
    {
      id: "ecommerce-pro",
      title: "Ecommerce Pro",
      imgAlt: "Ecommerce Pro template preview",
      desc: "Storefront with product grid, feature highlights, and conversion CTAs.",
      category: "Ecommerce",
      tags: ["Pro", "Storefront", "Premium"],
      free: false,
    },
  ]

  if (!open) return null

  const filtered = cards.filter((c) => {
    if (activeFilter === "all") return true
    if (activeFilter === "portfolio") return c.category === "Portfolio"
    if (activeFilter === "free") return c.free
    if (activeFilter === "pro") return c.free === false
    return true
  })

  return (
    <div
      className="fixed inset-0 z-40 overflow-y-auto bg-white"
      role="dialog"
      aria-modal="true"
      aria-label="Choose a Template"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:py-10">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <a href="/dashboard" className="inline-flex items-center gap-2 text-sm text-black/70 hover:text-black font-medium">
            {"← Back to Dashboard"}
          </a>
          <div aria-label="SiteBuilder" className="rounded-md bg-black/5 px-3 py-1.5 text-sm font-semibold">
            {"SiteBuilder"}
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-balance text-2xl font-semibold md:text-3xl">{"Choose Your Template"}</h1>
          <p className="mx-auto mt-2 max-w-xl text-pretty text-sm text-black/60">
            {"Start with a professionally designed template and customize every element to match your vision"}
          </p>
          <div className="mt-4">
            <Button 
              variant="outline" 
              className="rounded-lg border-black/20 bg-white text-black hover:bg-black/5"
              onClick={() => window.location.href = '/dashboard'}
            >
              Go to Dashboard
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {[
            { key: "all", label: "All" },
            { key: "portfolio", label: "Portfolio" },
            { key: "free", label: "Free" },
            { key: "pro", label: "Pro" },
          ].map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActiveFilter(f.key as any)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium",
                activeFilter === f.key ? "bg-black text-white border-black" : "bg-white text-black/80 hover:bg-black/5",
              )}
              aria-pressed={activeFilter === f.key}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <div key={c.id} className="flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm">
              <img src="/template-preview.jpg" alt={c.imgAlt} className="h-48 w-full object-cover" />
              <div className="flex flex-1 flex-col p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-pretty text-base font-semibold">{c.title}</h3>
                    <p className="mt-1 text-sm text-black/60">{c.desc}</p>
                  </div>
                  <span className="whitespace-nowrap rounded-full bg-black/5 px-2 py-1 text-[11px] font-medium text-black/70">
                    {c.category}
                  </span>
                </div>
                <div className="mt-auto">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {c.tags.map((t, i) => (
                      <span key={i} className="rounded-full bg-black/5 px-2 py-1 text-[11px] text-black/70">
                        {t}
                      </span>
                    ))}
                  </div>
                  <Button
                    type="button"
                    onClick={() => onSelect(c.id)}
                    className="h-10 w-full rounded-lg bg-black text-white hover:opacity-90"
                  >
                    {"Start Editing"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}



function EditElementPanel({
  open,
  selected,
  onClose,
}: {
  open: boolean
  selected: SelectedElement | null
  onClose: () => void
}) {
  const [buttonText, setButtonText] = useState("")
  const [buttonHref, setButtonHref] = useState("")
  const [imageSrc, setImageSrc] = useState("")

  useEffect(() => {
    if (!open || !selected) return
    if (selected.kind === "image") {
      setImageSrc(selected.el.getAttribute("src") || "")
    } else if (selected.kind === "button" || selected.kind === "link") {
      setButtonText(selected.el.textContent || "")
      setButtonHref(selected.el.getAttribute("href") || "")
    }
  }, [open, selected])

  const onUploadImage = async (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      setImageSrc(dataUrl)
      selected?.kind === "image" && selected.el.setAttribute("src", dataUrl)
    }
    reader.readAsDataURL(file)
  }

  const onSetImageUrl = () => {
    if (selected?.kind !== "image") return
    selected.el.setAttribute("src", imageSrc)
  }

  const onApplyButtonChanges = () => {
    if (selected?.kind !== "button" && selected?.kind !== "link") return
    selected.el.textContent = buttonText
    selected.el.setAttribute("href", buttonHref || "#")
  }

  return (
    <aside
      className="fixed right-0 top-0 z-50 h-full w-80 translate-x-0 border-l bg-[var(--sb-header)] text-[var(--sb-text)] shadow-xl transition-transform"
      style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
      aria-label="Edit Element Panel"
      role="complementary"
    >
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h3 className="text-sm font-semibold">Edit Element</h3>
        <button type="button" onClick={onClose} aria-label="Close panel" className="rounded p-1 hover:opacity-80">
          <X className="size-4" />
        </button>
      </div>

      <div className="space-y-4 p-4">
        {!selected && <p className="opacity-70">Select an image, button, or link to edit.</p>}

        {selected?.kind === "image" && (
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium opacity-90">Current Image</p>
              <div className="relative group">
                <img
                  src={imageSrc || "/placeholder.svg?height=160&width=256&query=selected image preview"}
                  alt="Selected image preview"
                  className="h-40 w-full rounded-lg border object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                  Preview
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium opacity-90 mb-2">📤 Upload Image</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && onUploadImage(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer hover:bg-[var(--sb-primary)]/10 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-2 pb-3">
                      <svg className="w-8 h-8 mb-2 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-xs opacity-80">Click or drag image here</p>
                      <p className="text-xs opacity-60 mt-1">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-[var(--sb-header)] px-2 opacity-60">OR</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium opacity-90 mb-2">🔗 Image URL</label>
                <input
                  value={imageSrc}
                  onChange={(e) => setImageSrc(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-lg border bg-[var(--sb-bg)] px-3 py-2.5 text-sm text-[var(--sb-text)] focus:ring-2 focus:ring-primary/50 outline-none"
                />
                <button
                  type="button"
                  onClick={onSetImageUrl}
                  className="w-full mt-2 rounded-lg bg-[var(--sb-primary)] px-3 py-2.5 text-sm font-medium text-[var(--sb-text)] hover:opacity-90 transition-opacity"
                >
                  Apply URL
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-border">
              <p className="text-xs opacity-60">
                💡 Tip: Uploaded images are converted to base64 and embedded in your project
              </p>
            </div>
          </div>
        )}

        {(selected?.kind === "button" || selected?.kind === "link") && (
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm opacity-80">
                {selected.kind === "button" ? "Button Text" : "Link Text"}
              </label>
              <input
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                className="w-full rounded border bg-[var(--sb-bg)] px-3 py-2 text-sm text-[var(--sb-text)]"
                placeholder={selected.kind === "button" ? "Get Started for Free" : "Link text"}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm opacity-80">Link URL</label>
              <input
                value={buttonHref}
                onChange={(e) => setButtonHref(e.target.value)}
                className="w-full rounded border bg-[var(--sb-bg)] px-3 py-2 text-sm text-[var(--sb-text)]"
                placeholder="https://example.com"
              />
            </div>
            <button
              type="button"
              onClick={onApplyButtonChanges}
              className="w-full rounded bg-[var(--sb-primary)] px-3 py-2 text-sm text-[var(--sb-text)] hover:opacity-90"
            >
              Apply Changes
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}

export default function Page() {
  const [template, setTemplate] = useState<TemplateId | null>(null)
  const [modalOpen, setModalOpen] = useState(true)
  const [aiModalOpen, setAiModalOpen] = useState(false)
  const [selectedProTemplate, setSelectedProTemplate] = useState<TemplateId | null>(null)
  const [selectedThemeId, setSelectedThemeId] = useState<SaaSProThemeId | null>(null)
  const [preview, setPreview] = useState(false)
  const [saving, setSaving] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [selected, setSelected] = useState<SelectedElement | null>(null)

  useEffect(() => {
    if (template) setModalOpen(false)
  }, [template])

  const onSelectTemplate = useCallback((id: TemplateId) => {
    // Check if it's a Pro template
    const proTemplates: TemplateId[] = ["agency-pro", "saas-pro", "ecommerce-pro"]
    
    if (proTemplates.includes(id)) {
      // Open AI generation modal for Pro templates
      setSelectedProTemplate(id)
      setModalOpen(false)
      setAiModalOpen(true)
    } else {
      // Regular templates - just select
      setTemplate(id)
      setModalOpen(false)
    }
  }, [])

  const onTogglePreview = useCallback(() => {
    setPreview((p) => !p)
  }, [])

  const onBackToTemplates = useCallback(() => {
    setTemplate(null)
    setSelectedThemeId(null)
    setModalOpen(true)
    setPreview(false)
  }, [])

  const handleAIGenerate = useCallback(async (topic: string, theme: AITheme) => {
    if (!selectedProTemplate) return

    try {
      // Generate content using Gemini API
      const { elements } = await generateSaaSProContent(topic, theme)
      
      // Close AI modal, set template and theme
      setAiModalOpen(false)
      setSelectedThemeId(theme.id as SaaSProThemeId)
      setTemplate(selectedProTemplate)
      setSelectedProTemplate(null)
      
      // Wait for template to render
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Populate all elements with generated content
      elements.forEach(({ id, content }) => {
        const element = document.querySelector(`[data-eid="${id}"]`)
        if (element) {
          // Update text content
          if (element.textContent !== undefined) {
            element.textContent = content
          }
        }
      })
      
      console.log("AI content generated and populated successfully!", `Populated ${elements.length} elements`)
    } catch (error) {
      console.error("Error during AI generation:", error)
      alert("Failed to generate content. Please try again.")
      setAiModalOpen(false)
      setModalOpen(true)
    }
  }, [selectedProTemplate])

  const onSavePublish = useCallback(async () => {
    setSaving(true)

    // texts
    const textNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-eid]:not(img):not(a)"))
    const texts: Record<string, string> = {}
    textNodes.forEach((el) => {
      const id = el.getAttribute("data-eid")
      if (!id) return
      texts[id] = el.innerText || ""
    })

    // images
    const imgNodes = Array.from(document.querySelectorAll<HTMLImageElement>("img[data-eid]"))
    const images: Record<string, string> = {}
    imgNodes.forEach((el) => {
      const id = el.getAttribute("data-eid")
      if (!id) return
      images[id] = el.getAttribute("src") || ""
    })

    // buttons
    const btnNodes = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[data-eid]"))
    const buttons: Record<string, { href: string; text: string }> = {}
    btnNodes.forEach((el) => {
      const id = el.getAttribute("data-eid")
      if (!id) return
      buttons[id] = { href: el.getAttribute("href") || "#", text: el.innerText || "" }
    })

    // derive project name from first headline-like text if available, else from template
    const titleCandidate =
      texts["sl-hero-title"] ||
      texts["pt-hero-title"] ||
      texts["po-title"] ||
      texts["pp-name"] ||
      texts["el-title"] ||
      "Untitled Website"

    const project: ProjectRecord = {
      id: `p_${Date.now()}`,
      name: titleCandidate,
      template: template || "unknown",
      theme: template === "saas-pro" ? selectedThemeId || undefined : undefined,
      updatedAt: Date.now(),
      data: { texts, images, buttons },
    }

    console.log("[v0] Publishing payload:", project)
    saveProject(project)

    await new Promise((r) => setTimeout(r, 400))
    setSaving(false)
    alert("Saved & Published! Check the Dashboard to see your project.")
  }, [template])

  const openInspector = useCallback((type: "image" | "button" | "link", payload: { id: string }) => {
    const selector = type === "image" ? `img[data-eid="${payload.id}"]` : `a[data-eid="${payload.id}"]`
    const el = document.querySelector(selector) as HTMLImageElement | HTMLAnchorElement | null
    if (!el) return
    
    let selectedElement: SelectedElement
    if (type === "image") {
      selectedElement = { kind: "image", el: el as HTMLImageElement }
    } else if (type === "button") {
      selectedElement = { kind: "button", el: el as HTMLAnchorElement }
    } else {
      selectedElement = { kind: "link", el: el as HTMLAnchorElement }
    }
    
    setSelected(selectedElement)
    setPanelOpen(true)
  }, [])

  const TemplateView = useMemo(() => {
    switch (template) {
      case "portfolio":
        return <PortfolioTemplate editable={!preview} openInspector={openInspector} />
      case "saas-landing":
        return <SaaSTemplate editable={!preview} openInspector={openInspector} />
      case "project-overview":
        return <ProjectOverviewTemplate editable={!preview} openInspector={openInspector} />
      case "personal-profile":
        return <PersonalProfileTemplate editable={!preview} openInspector={openInspector} />
      case "event":
        return <EventLandingTemplate editable={!preview} openInspector={openInspector} />
      case "agency-pro":
        // return <AgencyProTemplate editable={!preview} openInspector={openInspector} />
        return <div className="text-center p-8"><p className="text-lg">Agency Pro template coming soon...</p></div>
      case "saas-pro": {
        // Use the themed template based on selected theme
        const themeId = selectedThemeId || "modern-minimal"
        const ThemedTemplate = SAAS_PRO_THEMES[themeId]
        return <ThemedTemplate editable={!preview} openInspector={openInspector} />
      }
      case "ecommerce-pro":
        // return <EcommerceProTemplate editable={!preview} openInspector={openInspector} />
        return <div className="text-center p-8"><p className="text-lg">Ecommerce Pro template coming soon...</p></div>
      default:
        return null
    }
  }, [template, preview, openInspector, selectedThemeId])

  return (
    <main className={cn("min-h-screen", "bg-[var(--sb-bg)] text-[var(--sb-text)]")}>
      {template && (
        <>
          <EditorHeader
            onTogglePreview={onTogglePreview}
            onSavePublish={onSavePublish}
            onBackToTemplates={onBackToTemplates}
            isPreview={preview}
            saving={saving}
          />
          <div className="h-14" aria-hidden />
        </>
      )}

      <section
        className={cn(
          "relative",
          preview 
            ? "min-h-screen w-full" 
            : "flex min-h-[calc(100vh-3.5rem)] items-center justify-center p-4"
        )}
        aria-label="Editor canvas"
      >
        {TemplateView ?? (
          <div className="text-center opacity-80">
            <p>{"Select a template to begin."}</p>
          </div>
        )}
        {!preview && template && <SiteBuilderSlateToolbar active={!preview} />}
        <EditElementPanel open={!preview && panelOpen} selected={selected} onClose={() => setPanelOpen(false)} />
      </section>

      <TemplateModal open={modalOpen} onSelect={onSelectTemplate} />
      <AIGenerationModal 
        open={aiModalOpen} 
        templateType={selectedProTemplate === "saas-pro" ? "SaaS Pro" : selectedProTemplate === "agency-pro" ? "Agency Pro" : "Ecommerce Pro"}
        onClose={() => {
          // User cancelled - go back to template selection
          setAiModalOpen(false)
          setModalOpen(true)
          setSelectedProTemplate(null)
        }}
        onGenerate={handleAIGenerate}
      />
    </main>
  )
}
