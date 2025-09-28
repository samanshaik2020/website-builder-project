"use client"

import type React from "react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Eye, Save } from "lucide-react"
import { Bold, Italic, LinkIcon, AlignLeft, AlignCenter, AlignRight, TypeIcon, Palette, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PortfolioTemplate } from "@/components/templates/normal/portfolio-template"
import { SaaSTemplate } from "@/components/templates/normal/saas-landing-template"
import { ProjectOverviewTemplate } from "@/components/templates/normal/project-overview-template"
import { PersonalProfileTemplate } from "@/components/templates/normal/personal-profile-template"
import { EventLandingTemplate } from "@/components/templates/normal/event-landing-template"
import { AgencyProTemplate } from "@/components/templates/pro/agency-pro-template"
import { SaaSProTemplatePro } from "@/components/templates/pro/saas-pro-template"
import { EcommerceProTemplate } from "@/components/templates/pro/ecommerce-pro-template"
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

type SelectedElement = { kind: "image"; el: HTMLImageElement } | { kind: "button"; el: HTMLAnchorElement }

function EditorHeader({
  onTogglePreview,
  onSavePublish,
  isPreview,
  saving,
}: {
  onTogglePreview: () => void
  onSavePublish: () => Promise<void> | void
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
      className="fixed inset-0 z-40 overflow-y-auto bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Choose a Template"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:py-10">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <a href="/dashboard" className="inline-flex items-center gap-2 text-sm text-black/70 hover:text-black">
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
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className="ml-3 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100"
            aria-label="Reset Templates filter"
          >
            {"Reset Templates"}
          </button>
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

function FloatingTextToolbar({ active }: { active: boolean }) {
  const [visible, setVisible] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 })
  const [target, setTarget] = useState<HTMLElement | null>(null)
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkValue, setLinkValue] = useState("")
  const [fontSize, setFontSize] = useState<string>("")
  const [color, setColor] = useState<string>("")

  const getEditableTarget = useCallback((el: HTMLElement | null) => {
    if (!el) return null
    // Prefer the nearest element explicitly marked as editable or contentEditable
    const nearest = el.closest('[data-editable="true"], [contenteditable="true"]') as HTMLElement | null
    if (nearest) return nearest
    // Fallback: if the element itself is in an editable region
    if ((el as HTMLElement).isContentEditable) return el
    return null
  }, [])

  const positionForEl = useCallback((el: HTMLElement) => {
    const rect = el.getBoundingClientRect()
    const top = Math.max(8, rect.top - 48) // 48px toolbar height estimate
    const left = Math.min(window.innerWidth - 120, Math.max(120, rect.left + rect.width / 2))
    setPos({ top, left })
  }, [])

  useEffect(() => {
    if (!active) {
      setVisible(false)
      setTarget(null)
      return
    }
    const onFocusIn = (e: Event) => {
      const t = getEditableTarget(e.target as HTMLElement | null)
      if (t) {
        setTarget(t)
        // Initialize style states from computed styles to reflect current appearance
        const cs = window.getComputedStyle(t)
        const fs = cs.fontSize.replace("px", "")
        setFontSize(fs || "")
        setColor(cs.color || "")
        positionForEl(t)
        setVisible(true)
      }
    }
    const onMouseDown = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      const toolbar = document.getElementById("sb-text-toolbar")
      if (!toolbar) return
      const clickedInsideToolbar = toolbar.contains(el)
      const clickedTarget = target && (el === target || target.contains(el))
      if (!clickedInsideToolbar && !clickedTarget) {
        setVisible(false)
        setTarget(null)
        setShowLinkInput(false)
      }
    }
    const onScrollOrResize = () => {
      if (target) positionForEl(target)
    }
    const onSelectionChange = () => {
      if (target) positionForEl(target)
    }

    document.addEventListener("focusin", onFocusIn, true)
    document.addEventListener("mousedown", onMouseDown, true)
    window.addEventListener("scroll", onScrollOrResize, true)
    window.addEventListener("resize", onScrollOrResize, true)
    document.addEventListener("selectionchange", onSelectionChange)

    return () => {
      document.removeEventListener("focusin", onFocusIn, true)
      document.removeEventListener("mousedown", onMouseDown, true)
      window.removeEventListener("scroll", onScrollOrResize, true)
      window.removeEventListener("resize", onScrollOrResize, true)
      document.removeEventListener("selectionchange", onSelectionChange)
    }
  }, [active, getEditableTarget, positionForEl, target])

  if (!visible || !target) return null

  const exec = (cmd: string, value?: string) => {
    try {
      document.execCommand(cmd, false, value)
    } catch {}
    // update position and states in case layout changed
    positionForEl(target)
  }

  const setAlign = (align: "left" | "center" | "right") => {
    if (!target) return
    target.style.textAlign = align
    positionForEl(target)
  }

  const onFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!target) return
    const v = e.target.value
    setFontSize(v)
    target.style.fontSize = v ? `${v}px` : ""
    positionForEl(target)
  }

  const onColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!target) return
    const v = e.target.value
    setColor(v)
    target.style.color = v
    positionForEl(target)
  }

  const applyLink = () => {
    if (!linkValue) return
    exec("createLink", linkValue)
    setShowLinkInput(false)
    setLinkValue("")
  }

  return (
    <div
      id="sb-text-toolbar"
      className="fixed z-[60] flex items-center gap-2 rounded-md border px-2 py-1 shadow-lg"
      style={{ top: pos.top, left: pos.left, transform: "translateX(-50%)" }}
    >
      <div className="flex items-center gap-1 rounded bg-[color-mix(in_oklab,var(--sb-overlay)_30%,var(--sb-header))] px-2 py-1 text-[var(--sb-text)]">
        <button type="button" className="rounded px-1 hover:opacity-80" onClick={() => exec("bold")} aria-label="Bold">
          <Bold className="size-4" />
        </button>
        <button
          type="button"
          className="rounded px-1 hover:opacity-80"
          onClick={() => exec("italic")}
          aria-label="Italic"
        >
          <Italic className="size-4" />
        </button>
        <div className="h-4 w-px bg-[var(--sb-text)]/20" />
        <button
          type="button"
          className="rounded px-1 hover:opacity-80"
          onClick={() => setShowLinkInput((s) => !s)}
          aria-label="Add link"
        >
          <LinkIcon className="size-4" />
        </button>
        {showLinkInput && (
          <div className="ml-2 flex items-center gap-1">
            <input
              aria-label="Link URL"
              placeholder="https://example.com"
              value={linkValue}
              onChange={(e) => setLinkValue(e.target.value)}
              className="h-7 w-48 rounded border bg-[var(--sb-bg)] px-2 text-sm text-[var(--sb-text)]"
            />
            <button
              type="button"
              className="rounded bg-[var(--sb-primary)] px-2 py-1 text-xs text-[var(--sb-text)] hover:opacity-90"
              onClick={applyLink}
            >
              Apply
            </button>
          </div>
        )}
        <div className="h-4 w-px bg-[var(--sb-text)]/20" />
        <button
          type="button"
          className="rounded px-1 hover:opacity-80"
          onClick={() => setAlign("left")}
          aria-label="Align left"
        >
          <AlignLeft className="size-4" />
        </button>
        <button
          type="button"
          className="rounded px-1 hover:opacity-80"
          onClick={() => setAlign("center")}
          aria-label="Align center"
        >
          <AlignCenter className="size-4" />
        </button>
        <button
          type="button"
          className="rounded px-1 hover:opacity-80"
          onClick={() => setAlign("right")}
          aria-label="Align right"
        >
          <AlignRight className="size-4" />
        </button>
        <div className="h-4 w-px bg-[var(--sb-text)]/20" />
        <div className="flex items-center gap-1">
          <TypeIcon className="size-4 opacity-70" aria-hidden />
          <select
            aria-label="Font size"
            value={fontSize}
            onChange={onFontSizeChange}
            className="h-7 rounded border bg-[var(--sb-bg)] px-2 text-sm text-[var(--sb-text)]"
          >
            <option value="">Auto</option>
            <option value="14">14</option>
            <option value="16">16</option>
            <option value="18">18</option>
            <option value="24">24</option>
            <option value="32">32</option>
            <option value="40">40</option>
          </select>
        </div>
        <div className="flex items-center gap-1 pl-1">
          <Palette className="size-4 opacity-70" aria-hidden />
          <input
            aria-label="Text color"
            type="color"
            value={color || "#ffffff"}
            onChange={onColorChange}
            className="h-7 w-7 cursor-pointer rounded border bg-[var(--sb-bg)] p-0"
          />
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
    } else if (selected.kind === "button") {
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
    if (selected?.kind !== "button") return
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
        {!selected && <p className="opacity-70">Select an image or button to edit.</p>}

        {selected?.kind === "image" && (
          <div className="space-y-3">
            <div>
              <p className="mb-2 text-sm opacity-80">Preview</p>
              <img
                src={imageSrc || "/placeholder.svg?height=160&width=256&query=selected image preview"}
                alt="Selected image preview"
                className="h-40 w-full rounded border object-cover"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm opacity-80">Image URL</label>
              <input
                value={imageSrc}
                onChange={(e) => setImageSrc(e.target.value)}
                placeholder="https://…"
                className="w-full rounded border bg-[var(--sb-bg)] px-3 py-2 text-sm text-[var(--sb-text)]"
              />
              <button
                type="button"
                onClick={onSetImageUrl}
                className="w-full rounded bg-[var(--sb-primary)] px-3 py-2 text-sm text-[var(--sb-text)] hover:opacity-90"
              >
                Apply URL
              </button>
            </div>
            <div className="space-y-2">
              <label className="text-sm opacity-80">Upload New Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && onUploadImage(e.target.files[0])}
                className="w-full text-sm"
              />
            </div>
          </div>
        )}

        {selected?.kind === "button" && (
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm opacity-80">Button Text</label>
              <input
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                className="w-full rounded border bg-[var(--sb-bg)] px-3 py-2 text-sm text-[var(--sb-text)]"
                placeholder="Get Started for Free"
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
  const [preview, setPreview] = useState(false)
  const [saving, setSaving] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [selected, setSelected] = useState<SelectedElement | null>(null)

  useEffect(() => {
    if (template) setModalOpen(false)
  }, [template])

  const onSelectTemplate = useCallback((id: TemplateId) => {
    setTemplate(id)
    setModalOpen(false)
  }, [])

  const onTogglePreview = useCallback(() => {
    setPreview((p) => !p)
  }, [])

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
      updatedAt: Date.now(),
      data: { texts, images, buttons },
    }

    console.log("[v0] Publishing payload:", project)
    saveProject(project)

    await new Promise((r) => setTimeout(r, 400))
    setSaving(false)
    alert("Saved & Published! Check the Dashboard to see your project.")
  }, [template])

  const openInspector = useCallback((type: "image" | "button", payload: { id: string }) => {
    const selector = type === "image" ? `img[data-eid="${payload.id}"]` : `a[data-eid="${payload.id}"]`
    const el = document.querySelector(selector) as HTMLImageElement | HTMLAnchorElement | null
    if (!el) return
    setSelected(
      type === "image" ? ({ kind: "image", el } as SelectedElement) : ({ kind: "button", el } as SelectedElement),
    )
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
        return <AgencyProTemplate editable={!preview} openInspector={openInspector} />
      case "saas-pro":
        return <SaaSProTemplatePro editable={!preview} openInspector={openInspector} />
      case "ecommerce-pro":
        return <EcommerceProTemplate editable={!preview} openInspector={openInspector} />
      default:
        return null
    }
  }, [template, preview, openInspector])

  return (
    <main className={cn("min-h-screen", "bg-[var(--sb-bg)] text-[var(--sb-text)]")}>
      <EditorHeader
        onTogglePreview={onTogglePreview}
        onSavePublish={onSavePublish}
        isPreview={preview}
        saving={saving}
      />

      <div className="h-14" aria-hidden />
      <section
        className={cn("relative", "flex min-h-[calc(100vh-3.5rem)] items-center justify-center p-4")}
        aria-label="Editor canvas"
      >
        {TemplateView ?? (
          <div className="text-center opacity-80">
            <p>{"Select a template to begin."}</p>
          </div>
        )}
        {!preview && <FloatingTextToolbar active={!preview} />}
        <EditElementPanel open={!preview && panelOpen} selected={selected} onClose={() => setPanelOpen(false)} />
      </section>

      <TemplateModal open={modalOpen} onSelect={onSelectTemplate} />
    </main>
  )
}
