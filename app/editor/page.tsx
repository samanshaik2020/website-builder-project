"use client"

import type React from "react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, Save, ArrowLeft } from "lucide-react"
import { X } from "lucide-react"
import { AIGenerationModal } from "@/components/ai-generation-modal"
import { FloatingTextToolbar } from "@/components/floating-text-toolbar"
import { generateSaaSProContent, generatePortfolioProThemeContent, generateIPhoneProThemeContent, generateAgencyProThemeContent, generateEcommerceProThemeContent } from "@/lib/gemini-api"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { PortfolioTemplate } from "@/components/templates/normal/portfolio-template"
import { SaaSTemplate } from "@/components/templates/normal/saas-landing-template"
import { ProjectOverviewTemplate } from "@/components/templates/normal/project-overview-template"
import { PersonalProfileTemplate } from "@/components/templates/normal/personal-profile-template"
import { EventLandingTemplate } from "@/components/templates/normal/event-landing-template"
import { IPhoneProductTemplate } from "@/components/templates/normal/iphone-product-template"
import { LeadGenerationTemplate } from "@/components/templates/normal/lead-generation-template"
import { ClickThroughTemplate } from "@/components/templates/normal/click-through-template"
import { SalesLandingTemplate } from "@/components/templates/normal/sales-landing-template"
import { CatFoodTemplate } from "@/components/templates/normal/cat-food-template"
import { IndoorSkydivingTemplate } from "@/components/templates/normal/indoor-skydiving-template"
import { KetoBarTemplate } from "@/components/templates/normal/keto-bars-template"
import { CampaignMonitorTemplate } from "@/components/templates/normal/campaign-monitor-template"
import { BlowLtdTemplate } from "@/components/templates/normal/blow-ltd-template"
import { BePatientsTemplate } from "@/components/templates/normal/be-patients-template"
import { OutlierApparelTemplate } from "@/components/templates/normal/outlier-apparel-template"
import { BranchFurnitureTemplate } from "@/components/templates/normal/branch-furniture-template"
import { AmazonPrimeTemplate } from "@/components/templates/normal/amazon-prime-template"
import { GobyToothbrushTemplate } from "@/components/templates/normal/goby-toothbrush-template"
import { ZolaWeddingTemplate } from "@/components/templates/normal/zola-wedding-template"
import { BananaMilkTemplate } from "@/components/templates/normal/banana-milk-template"
import { SAAS_PRO_THEMES, type SaaSProThemeId } from "@/components/templates/pro/saas-pro"
import { AGENCY_PRO_THEMES, type AgencyProThemeId } from "@/components/templates/pro/agency-pro"
import { ECOMMERCE_PRO_THEMES, type EcommerceProThemeId } from "@/components/templates/pro/ecommerce-pro"
import { PortfolioProTemplatePro } from "@/components/templates/pro/portfolio-pro-template"
import { IPHONE_PRO_THEMES, type IPhoneProThemeId } from "@/components/templates/pro/iphone-pro"
import type { AITheme } from "@/components/ai-generation-modal"
import { useProjects } from "@/hooks/use-projects"
import { useSubscription } from "@/hooks/use-subscription"
import { canCreateNormalTemplate, canCreateProTemplate, getPlanById } from "@/lib/pricing-plans"
import { toast } from "sonner"

type TemplateId =
  | "portfolio"
  | "saas-landing"
  | "project-overview"
  | "personal-profile"
  | "event"
  | "iphone-product"
  | "lead-generation"
  | "click-through"
  | "sales-landing"
  | "cat-food"
  | "indoor-skydiving"
  | "keto-bars"
  | "campaign-monitor"
  | "blow-ltd"
  | "be-patients"
  | "outlier-apparel"
  | "branch-furniture"
  | "amazon-prime"
  | "goby-toothbrush"
  | "zola-wedding"
  | "banana-milk"
  | "agency-pro"
  | "saas-pro"
  | "portfolio-pro"
  | "iphone-pro"
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
          {"Squpage"}
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
          {saving ? (
            <LoadingSpinner size="sm" variant="minimal" className="text-white" />
          ) : (
            <Save className="size-4" aria-hidden />
          )}
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
    imgSrc: string
    imgAlt: string
    desc: string
    category: "Portfolio" | "SaaS" | "Profile" | "Event" | "Agency" | "Ecommerce"
    tags: string[]
    free?: boolean
  }> = [
    {
      id: "portfolio",
      title: "Portfolio Website",
      imgSrc: "/portfolio.png",
      imgAlt: "Portfolio template preview",
      desc: "Professional portfolio showcasing projects, skills, and experience",
      category: "Portfolio",
      tags: ["Portfolio", "Creative", "Professional"],
      free: true,
    },
    {
      id: "saas-landing",
      title: "SaaS Landing Page",
      imgSrc: "/saas landing page.png",
      imgAlt: "SaaS landing template preview",
      desc: "High-converting product marketing page for your startup",
      category: "SaaS",
      tags: ["Marketing", "Product", "Conversion"],
      free: true,
    },
    {
      id: "project-overview",
      title: "Project Overview",
      imgSrc: "/project-overview.png",
      imgAlt: "Project overview template preview",
      desc: "Case-study layout to present goals, process, and outcomes",
      category: "Portfolio",
      tags: ["Case Study", "UX", "Process"],
      free: true,
    },
    {
      id: "personal-profile",
      title: "Personal Profile",
      imgSrc: "/personal-profile.png",
      imgAlt: "Personal profile template preview",
      desc: "Simple bio page with links and social profiles",
      category: "Profile",
      tags: ["Links", "Bio", "Creator"],
      free: true,
    },
    {
      id: "event",
      title: "Event Landing Page",
      imgSrc: "/event-landing-page.png",
      imgAlt: "Event template preview",
      desc: "Event page with countdown, details, map and RSVP form",
      category: "Event",
      tags: ["RSVP", "Countdown", "Venue"],
      free: true,
    },
    {
      id: "iphone-product",
      title: "iPhone Product Landing",
      imgSrc: "/iphone landing page.png",
      imgAlt: "iPhone product template preview",
      desc: "Clean, minimal product landing page inspired by Apple's design language",
      category: "SaaS",
      tags: ["Product", "Clean", "Minimal"],
      free: true,
    },
    {
      id: "lead-generation",
      title: "Lead Generation Landing",
      imgSrc: "/Lead Generation Landing.png",
      imgAlt: "Lead generation template preview",
      desc: "Capture leads with forms, benefits, and social proof sections",
      category: "SaaS",
      tags: ["Lead Capture", "Forms", "Conversion"],
      free: true,
    },
    {
      id: "click-through",
      title: "Click-Through Landing",
      imgSrc: "/Click-Through Landing.png",
      imgAlt: "Click-through template preview",
      desc: "Drive clicks with compelling features, benefits, and clear CTAs",
      category: "SaaS",
      tags: ["CTA", "Features", "Benefits"],
      free: true,
    },
    {
      id: "sales-landing",
      title: "Sales Landing Page",
      imgSrc: "/Sales Landing Page.png",
      imgAlt: "Sales landing template preview",
      desc: "High-converting sales page with urgency, testimonials, and guarantees",
      category: "SaaS",
      tags: ["Sales", "Urgency", "Conversion"],
      free: true,
    },
    {
      id: "cat-food",
      title: "Cat Food Product Landing",
      imgSrc: "/Cat Food Product Landing.png",
      imgAlt: "Cat food product template preview",
      desc: "Vibrant product landing page for pet food with colorful sections and engaging design",
      category: "Ecommerce",
      tags: ["Product", "E-commerce", "Colorful"],
      free: true,
    },
    {
      id: "indoor-skydiving",
      title: "Indoor Skydiving Experience",
      imgSrc: "/Indoor Skydiving Experience.png",
      imgAlt: "Indoor skydiving template preview",
      desc: "Exciting landing page for indoor skydiving with packages, testimonials, and booking features",
      category: "Event",
      tags: ["Adventure", "Booking", "Experience"],
      free: true,
    },
    {
      id: "keto-bars",
      title: "Keto Bars Product Landing",
      imgSrc: "/Keto Bars Product Landing.png",
      imgAlt: "Keto bars product template preview",
      desc: "Clean, modern landing page for keto protein bars with nutrition facts, testimonials, and health benefits",
      category: "Ecommerce",
      tags: ["Product", "Health", "E-commerce"],
      free: true,
    },
    {
      id: "campaign-monitor",
      title: "Campaign Monitor Email Builder",
      imgSrc: "/Campaign Monitor Email Builder.png",
      imgAlt: "Campaign Monitor template preview",
      desc: "Professional email marketing landing page with drag-and-drop builder features, templates, and customization options",
      category: "SaaS",
      tags: ["Email", "Marketing", "Builder"],
      free: true,
    },
    {
      id: "blow-ltd",
      title: "Blow LTD Eyelash Extensions",
      imgSrc: "/Blow LTD Eyelash Extensions.png",
      imgAlt: "Blow LTD template preview",
      desc: "Beautiful beauty salon landing page for eyelash extensions at home with booking features, reviews, and service showcase",
      category: "Event",
      tags: ["Beauty", "Salon", "Booking"],
      free: true,
    },
    {
      id: "be-patients",
      title: "Be Patients Bariatric Reset",
      imgSrc: "/Be Patients Bariatric Reset.png",
      imgAlt: "Be Patients template preview",
      desc: "Medical health service landing page for bariatric surgery pouch reset program with testimonials and free plan offer",
      category: "Event",
      tags: ["Health", "Medical", "Lead Gen"],
      free: true,
    },
    {
      id: "outlier-apparel",
      title: "Outlier Apparel Fashion",
      imgSrc: "/Outlier Apparel Fashion.png",
      imgAlt: "Outlier Apparel template preview",
      desc: "Minimalist fashion brand landing page with full-screen imagery, product details, and premium apparel showcase",
      category: "Ecommerce",
      tags: ["Fashion", "E-commerce", "Premium"],
      free: true,
    },
    {
      id: "branch-furniture",
      title: "Branch Furniture Store",
      imgSrc: "/Branch Furniture Store.png",
      imgAlt: "Branch Furniture template preview",
      desc: "Elegant furniture e-commerce landing page with product showcase, craftsmanship details, and testimonials",
      category: "Ecommerce",
      tags: ["Furniture", "E-commerce", "Handcrafted"],
      free: true,
    },
    {
      id: "amazon-prime",
      title: "Amazon Prime Membership",
      imgSrc: "/Amazon Prime Membership.png",
      imgAlt: "Amazon Prime template preview",
      desc: "Comprehensive membership landing page showcasing Prime benefits including delivery, streaming, music, and reading",
      category: "SaaS",
      tags: ["Membership", "Subscription", "Benefits"],
      free: true,
    },
    {
      id: "goby-toothbrush",
      title: "GOBY Electric Toothbrush",
      imgSrc: "/GOBY Electric Toothbrush.png",
      imgAlt: "GOBY Toothbrush template preview",
      desc: "Modern e-commerce landing page for electric toothbrush with subscription model, testimonials, and social proof",
      category: "Ecommerce",
      tags: ["Product", "Subscription", "Health"],
      free: true,
    },
    {
      id: "zola-wedding",
      title: "Zola Wedding Websites",
      imgSrc: "/Zola Wedding Websites.png",
      imgAlt: "Zola Wedding template preview",
      desc: "Beautiful wedding website builder landing page with design showcase, features, and registry integration",
      category: "Event",
      tags: ["Wedding", "Event", "Registry"],
      free: true,
    },
    {
      id: "banana-milk",
      title: "Banana Milk Product Landing",
      imgSrc: "/Cat Food Product Landing.png",
      imgAlt: "Banana Milk template preview",
      desc: "Playful and vibrant product landing page for banana milk with fun illustrations and product benefits",
      category: "Ecommerce",
      tags: ["Product", "E-commerce", "Fun"],
      free: true,
    },
    {
      id: "agency-pro",
      title: "Agency Pro",
      imgSrc: "/template-preview.jpg",
      imgAlt: "Agency Pro template preview",
      desc: "Full‑service agency with enhanced sections, pricing, case studies, and blog.",
      category: "Agency",
      tags: ["Pro", "Agency", "Premium"],
      free: false,
    },
    {
      id: "saas-pro",
      title: "SaaS Pro",
      imgSrc: "/saas landing page.png",
      imgAlt: "SaaS Pro template preview",
      desc: "Premium SaaS marketing with advanced sections and testimonials.",
      category: "SaaS",
      tags: ["Pro", "Marketing", "Premium"],
      free: false,
    },
    {
      id: "portfolio-pro",
      title: "Portfolio Pro",
      imgSrc: "/portfolio.png",
      imgAlt: "Portfolio Pro template preview",
      desc: "Advanced portfolio with multiple themes, AI-powered content, and premium features.",
      category: "Portfolio",
      tags: ["Pro", "Portfolio", "Multi-Theme", "AI"],
      free: false,
    },
    {
      id: "iphone-pro",
      title: "iPhone Pro Landing",
      imgSrc: "/iphone landing page.png",
      imgAlt: "iPhone Pro template preview",
      desc: "Premium dark-themed product landing with gradients, animations, and stunning visuals.",
      category: "SaaS",
      tags: ["Pro", "Premium", "Dark Theme", "Product"],
      free: false,
    },
    {
      id: "ecommerce-pro",
      title: "Ecommerce Pro",
      imgSrc: "/template-preview.jpg",
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
            {"Squpage"}
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
              <img src={c.imgSrc} alt={c.imgAlt} className="h-48 w-full object-cover" />
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
  onImageUpdate,
}: {
  open: boolean
  selected: SelectedElement | null
  onClose: () => void
  onImageUpdate?: (imageId: string, src: string) => void
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
      if (selected?.kind === "image") {
        const imageId = selected.el.getAttribute("data-eid")
        selected.el.setAttribute("src", dataUrl)
        // Cache the image so it persists through preview toggles
        if (imageId && onImageUpdate) {
          onImageUpdate(imageId, dataUrl)
        }
      }
    }
    reader.readAsDataURL(file)
  }

  const onSetImageUrl = () => {
    if (selected?.kind !== "image") return
    const imageId = selected.el.getAttribute("data-eid")
    selected.el.setAttribute("src", imageSrc)
    // Cache the image URL
    if (imageId && onImageUpdate) {
      onImageUpdate(imageId, imageSrc)
    }
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

export default function EditorPage() {
  const router = useRouter()
  const { subscription, isLoaded } = useSubscription()
  const { projects, save } = useProjects()
  const [template, setTemplate] = useState<TemplateId | null>(null)
  const [modalOpen, setModalOpen] = useState(true)
  const [aiModalOpen, setAiModalOpen] = useState(false)
  const [selectedProTemplate, setSelectedProTemplate] = useState<TemplateId | null>(null)
  const [selectedThemeId, setSelectedThemeId] = useState<SaaSProThemeId | IPhoneProThemeId | AgencyProThemeId | EcommerceProThemeId | null>(null)
  const [preview, setPreview] = useState(false)
  const [saving, setSaving] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [selected, setSelected] = useState<SelectedElement | null>(null)
  const [imageCache, setImageCache] = useState<Record<string, string>>({})
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [projectName, setProjectName] = useState("")

  // Restore template from URL params or localStorage on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlTemplate = params.get('template') as TemplateId | null
    const urlTheme = params.get('theme') as SaaSProThemeId | IPhoneProThemeId | null
    const shouldLoadProject = params.get('loadProject') === 'true'
    
    if (urlTemplate) {
      setTemplate(urlTemplate)
      if (urlTheme) {
        setSelectedThemeId(urlTheme)
      }
      setModalOpen(false)
      
      // Load project data if requested
      if (shouldLoadProject) {
        const projectDataStr = localStorage.getItem('editor-project-data')
        if (projectDataStr) {
          try {
            const projectData = JSON.parse(projectDataStr)
            
            // Wait for template to render, then populate data
            // Use multiple attempts to ensure DOM is ready
            let attempts = 0
            const maxAttempts = 5
            const loadInterval = setInterval(() => {
              attempts++
              
              // Check if template has rendered by looking for data-eid elements
              const elements = document.querySelectorAll('[data-eid]')
              if (elements.length > 0 || attempts >= maxAttempts) {
                clearInterval(loadInterval)
                
                // Populate texts
                if (projectData.data?.texts) {
                  let textCount = 0
                  Object.entries(projectData.data.texts).forEach(([id, text]) => {
                    const element = document.querySelector(`[data-eid="${id}"]`)
                    if (element && typeof text === 'string') {
                      element.textContent = text
                      textCount++
                    }
                  })
                }
                
                // Populate images
                if (projectData.data?.images) {
                  const imageUpdates: Record<string, string> = {}
                  let imageCount = 0
                  Object.entries(projectData.data.images).forEach(([id, src]) => {
                    const img = document.querySelector(`img[data-eid="${id}"]`) as HTMLImageElement
                    if (img && typeof src === 'string') {
                      img.setAttribute('src', src)
                      imageUpdates[id] = src
                      imageCount++
                    }
                  })
                  // Cache all images at once
                  if (Object.keys(imageUpdates).length > 0) {
                    setImageCache(prev => ({ ...prev, ...imageUpdates }))
                  }
                }
                
                // Populate buttons
                if (projectData.data?.buttons) {
                  let buttonCount = 0
                  Object.entries(projectData.data.buttons).forEach(([id, btnData]: [string, any]) => {
                    const btn = document.querySelector(`a[data-eid="${id}"]`) as HTMLAnchorElement
                    if (btn && btnData) {
                      if (btnData.text) btn.textContent = btnData.text
                      if (btnData.href) btn.setAttribute('href', btnData.href)
                      buttonCount++
                    }
                  })
                }
                
                // Clean up localStorage
                localStorage.removeItem('editor-project-data')
              }
            }, 300) // Check every 300ms, up to 5 times (1.5 seconds total)
          } catch (error) {
            console.error('Error loading project data:', error)
          }
        }
      }
    } else {
      // Try to restore from localStorage
      const savedTemplate = localStorage.getItem('editor-template') as TemplateId | null
      const savedTheme = localStorage.getItem('editor-theme') as SaaSProThemeId | IPhoneProThemeId | null
      
      if (savedTemplate) {
        setTemplate(savedTemplate)
        if (savedTheme) {
          setSelectedThemeId(savedTheme)
        }
        setModalOpen(false)
      }
    }
  }, [])

  useEffect(() => {
    if (template) {
      setModalOpen(false)
      // Update URL params
      const params = new URLSearchParams(window.location.search)
      params.set('template', template)
      if (selectedThemeId) {
        params.set('theme', selectedThemeId)
      } else {
        params.delete('theme')
      }
      window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`)
      
      // Save to localStorage
      localStorage.setItem('editor-template', template)
      if (selectedThemeId) {
        localStorage.setItem('editor-theme', selectedThemeId)
      }
    }
  }, [template, selectedThemeId])

  const onSelectTemplate = useCallback((id: TemplateId) => {
    // Check if it's a Pro template
    const proTemplates: TemplateId[] = ["agency-pro", "saas-pro", "portfolio-pro", "iphone-pro", "ecommerce-pro"]
    
    if (proTemplates.includes(id)) {
      // Check pro template limits
      const proProjectCount = projects.filter((p: any) => proTemplates.includes(p.template as TemplateId)).length
      
      if (!canCreateProTemplate(subscription.plan, proProjectCount)) {
        const plan = getPlanById(subscription.plan)
        const limit = plan.limits.proTemplates === Infinity ? "unlimited" : plan.limits.proTemplates
        toast.error("Pro Template Limit Reached", {
          description: `You've reached your limit of ${limit} pro templates. Upgrade your plan to create more.`,
          duration: 5000,
        })
        setTimeout(() => router.push("/pricing"), 1500)
        return
      }
      
      // Open AI generation modal for Pro templates
      setSelectedProTemplate(id)
      setModalOpen(false)
      setAiModalOpen(true)
    } else {
      // Check normal template limits
      const normalProjectCount = projects.filter((p: any) => !proTemplates.includes(p.template as TemplateId)).length
      
      if (!canCreateNormalTemplate(subscription.plan, normalProjectCount)) {
        const plan = getPlanById(subscription.plan)
        const limit = plan.limits.normalTemplates === "unlimited" ? "unlimited" : plan.limits.normalTemplates
        toast.error("Template Limit Reached", {
          description: `You've reached your limit of ${limit} normal templates. Upgrade your plan to create more.`,
          duration: 5000,
        })
        setTimeout(() => router.push("/pricing"), 1500)
        return
      }
      
      // Regular templates - just select
      setTemplate(id)
      setModalOpen(false)
    }
  }, [subscription.plan, router])

  const onTogglePreview = useCallback(() => {
    setPreview((p) => !p)
    
    // After toggling, restore cached images
    setTimeout(() => {
      Object.entries(imageCache).forEach(([imageId, src]) => {
        const img = document.querySelector(`img[data-eid="${imageId}"]`) as HTMLImageElement
        if (img && img.getAttribute("src") !== src) {
          img.setAttribute("src", src)
        }
      })
    }, 100)
  }, [imageCache])

  const onBackToTemplates = useCallback(() => {
    setTemplate(null)
    setSelectedThemeId(null)
    setModalOpen(true)
    setPreview(false)
    
    // Clear URL params
    window.history.replaceState({}, '', window.location.pathname)
    
    // Clear localStorage
    localStorage.removeItem('editor-template')
    localStorage.removeItem('editor-theme')
  }, [])

  const handleAIGenerate = useCallback(async (topic: string, theme: AITheme) => {
    if (!selectedProTemplate) return

    try {
      // Generate content using Gemini API based on template type
      let elements
      if (selectedProTemplate === "saas-pro") {
        const result = await generateSaaSProContent(topic, theme)
        elements = result.elements
      } else if (selectedProTemplate === "portfolio-pro") {
        const result = await generatePortfolioProThemeContent(topic, theme.id)
        elements = result.elements
      } else if (selectedProTemplate === "iphone-pro") {
        const result = await generateIPhoneProThemeContent(topic, theme.id)
        elements = result.elements
      } else if (selectedProTemplate === "agency-pro") {
        const result = await generateAgencyProThemeContent(topic, theme.id)
        elements = result.elements
      } else if (selectedProTemplate === "ecommerce-pro") {
        const result = await generateEcommerceProThemeContent(topic, theme.id)
        elements = result.elements
      } else {
        // For other pro templates, use SaaS Pro as fallback for now
        const result = await generateSaaSProContent(topic, theme)
        elements = result.elements
      }
      
      // Close AI modal, set template and theme
      setAiModalOpen(false)
      setSelectedThemeId(theme.id as SaaSProThemeId | IPhoneProThemeId | AgencyProThemeId | EcommerceProThemeId)
      setTemplate(selectedProTemplate)
      setSelectedProTemplate(null)
      
      // Wait for template to render
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Populate all elements with generated content
      if (elements && Array.isArray(elements)) {
        elements.forEach(({ id, content }) => {
          const element = document.querySelector(`[data-eid="${id}"]`)
          if (element) {
            // Update text content
            if (element.textContent !== undefined) {
              element.textContent = content
            }
          }
        })
      }
    } catch (error) {
      console.error("Error during AI generation:", error)
      toast.error("AI Generation Failed", {
        description: "Failed to generate content. Please try again.",
        duration: 4000,
      })
      setAiModalOpen(false)
      setModalOpen(true)
    }
  }, [selectedProTemplate])

  const onSavePublish = useCallback(async () => {
    // Get suggested name from template content
    const textNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-eid]:not(img):not(a)"))
    const texts: Record<string, string> = {}
    textNodes.forEach((el) => {
      const id = el.getAttribute("data-eid")
      if (!id) return
      texts[id] = el.innerText || ""
    })

    const suggestedName =
      texts["sl-hero-title"] ||
      texts["pt-hero-title"] ||
      texts["po-title"] ||
      texts["pp-name"] ||
      texts["el-title"] ||
      texts["lg-hero-title"] ||
      texts["ct-hero-title"] ||
      "Untitled Website"

    setProjectName(suggestedName)
    setSaveDialogOpen(true)
  }, [template])

  const handleSaveConfirm = useCallback(async () => {
    if (!projectName.trim()) {
      toast.error("Project name required", {
        description: "Please enter a name for your project.",
        duration: 3000,
      })
      return
    }

    setSaveDialogOpen(false)
    setSaving(true)

    try {
      // Add a slight delay for better UX
      await new Promise((r) => setTimeout(r, 200))

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

      const themeToSave = (template === "saas-pro" || template === "portfolio-pro" || template === "iphone-pro") ? selectedThemeId || undefined : undefined
      
      const project = {
        name: projectName.trim(),
        template: template || "unknown",
        theme: themeToSave,
        data: { texts, images, buttons },
      }

      await save(project)

      // Enhanced saving experience with realistic timing
      await new Promise((r) => setTimeout(r, 800))
      
      setSaving(false)
      toast.success("Saved & Published!", {
        description: `"${projectName}" has been saved successfully. Check the Dashboard to see it.`,
        duration: 4000,
      })
    } catch (error) {
      console.error("Error saving project:", error)
      setSaving(false)
      toast.error("Failed to Save", {
        description: "Failed to save project. Please try again.",
        duration: 4000,
      })
    }
  }, [template, selectedThemeId, projectName, save])

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
      case "iphone-product":
        return <IPhoneProductTemplate editable={!preview} openInspector={openInspector} />
      case "lead-generation":
        return <LeadGenerationTemplate editable={!preview} openInspector={openInspector} />
      case "click-through":
        return <ClickThroughTemplate editable={!preview} openInspector={openInspector} />
      case "sales-landing":
        return <SalesLandingTemplate editable={!preview} openInspector={openInspector} />
      case "cat-food":
        return <CatFoodTemplate editable={!preview} openInspector={openInspector} />
      case "indoor-skydiving":
        return <IndoorSkydivingTemplate editable={!preview} openInspector={openInspector} />
      case "keto-bars":
        return <KetoBarTemplate editable={!preview} openInspector={openInspector} />
      case "campaign-monitor":
        return <CampaignMonitorTemplate editable={!preview} openInspector={openInspector} />
      case "blow-ltd":
        return <BlowLtdTemplate editable={!preview} openInspector={openInspector} />
      case "be-patients":
        return <BePatientsTemplate editable={!preview} openInspector={openInspector} />
      case "outlier-apparel":
        return <OutlierApparelTemplate editable={!preview} openInspector={openInspector} />
      case "branch-furniture":
        return <BranchFurnitureTemplate editable={!preview} openInspector={openInspector} />
      case "amazon-prime":
        return <AmazonPrimeTemplate editable={!preview} openInspector={openInspector} />
      case "goby-toothbrush":
        return <GobyToothbrushTemplate editable={!preview} openInspector={openInspector} />
      case "zola-wedding":
        return <ZolaWeddingTemplate editable={!preview} openInspector={openInspector} />
      case "banana-milk":
        return <BananaMilkTemplate editable={!preview} openInspector={openInspector} />
      case "agency-pro": {
        // Use the themed template based on selected theme
        const themeId = (selectedThemeId as AgencyProThemeId) || "modern-creative"
        const ThemedTemplate = AGENCY_PRO_THEMES[themeId] || AGENCY_PRO_THEMES["modern-creative"]
        if (!ThemedTemplate) return null
        return <ThemedTemplate editable={!preview} openInspector={openInspector} />
      }
      case "saas-pro": {
        // Use the themed template based on selected theme
        const themeId = (selectedThemeId as SaaSProThemeId) || "modern-minimal"
        const ThemedTemplate = SAAS_PRO_THEMES[themeId]
        return <ThemedTemplate editable={!preview} openInspector={openInspector} />
      }
      case "portfolio-pro":
        return <PortfolioProTemplatePro editable={!preview} openInspector={openInspector} />
      case "iphone-pro": {
        // Use the themed template based on selected theme
        const themeId = (selectedThemeId as IPhoneProThemeId) || "dark-gradient"
        const ThemedTemplate = IPHONE_PRO_THEMES[themeId]
        return <ThemedTemplate editable={!preview} openInspector={openInspector} />
      }
      case "ecommerce-pro": {
        // Use the themed template based on selected theme
        const themeId = (selectedThemeId as EcommerceProThemeId) || "luxury-elegant"
        const ThemedTemplate = ECOMMERCE_PRO_THEMES[themeId] || ECOMMERCE_PRO_THEMES["luxury-elegant"]
        if (!ThemedTemplate) return null
        return <ThemedTemplate editable={!preview} openInspector={openInspector} />
      }
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
        {!preview && template && <FloatingTextToolbar active={!preview} />}
        <EditElementPanel 
          open={!preview && panelOpen} 
          selected={selected} 
          onClose={() => setPanelOpen(false)}
          onImageUpdate={(imageId, src) => {
            setImageCache(prev => ({ ...prev, [imageId]: src }))
          }}
        />
      </section>

      <TemplateModal open={modalOpen} onSelect={onSelectTemplate} />
      <AIGenerationModal 
        open={aiModalOpen} 
        templateType={
          selectedProTemplate === "saas-pro" ? "SaaS Pro" : 
          selectedProTemplate === "portfolio-pro" ? "Portfolio Pro" :
          selectedProTemplate === "agency-pro" ? "Agency Pro" : 
          selectedProTemplate === "iphone-pro" ? "iPhone Pro" :
          "Ecommerce Pro"
        }
        onClose={() => {
          // User cancelled - go back to template selection
          setAiModalOpen(false)
          setModalOpen(true)
          setSelectedProTemplate(null)
        }}
        onGenerate={handleAIGenerate}
      />

      {/* Save Project Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Save Your Project</DialogTitle>
            <DialogDescription>
              Give your project a name to easily identify it in your dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="project-name" className="text-sm font-medium">
                Project Name
              </label>
              <Input
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSaveConfirm()
                  }
                }}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setSaveDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveConfirm}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Save & Publish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
