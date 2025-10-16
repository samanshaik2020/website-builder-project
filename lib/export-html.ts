"use client"

import type { ProjectRecord } from "@/components/lib/projects-store"
import { generateKetoBarHTML } from "./export-html-keto"
import { generateBananaMilkHTML } from "./export-html-banana-milk"
import { generateCampaignMonitorHTML } from "./export-html-campaign-monitor"
import { generateBlowLtdHTML } from "./export-html-blow-ltd"
import { generateBePatientsHTML } from "./export-html-be-patients"
import { generateOutlierApparelHTML } from "./export-html-outlier-apparel"
import { generateBranchFurnitureHTML } from "./export-html-branch-furniture"
import { generateAmazonPrimeHTML } from "./export-html-amazon-prime"
import { generateGobyToothbrushHTML } from "./export-html-goby-toothbrush"
import { generateZolaWeddingHTML } from "./export-html-zola-wedding"
import { generateAgencyProHTML } from "./export-html-agency-pro"
import { generateEcommerceProHTML } from "./export-html-ecommerce-pro"
import { generateScienceLandingHTML } from "./export-html-science-landing"
import { generateEmptyHTML } from "./export-html-empty"

/**
 * Generates a standalone HTML file from a saved project
 */
export function generateHTMLExport(project: ProjectRecord): string {
  const { template, data, name, theme } = project
  const { texts, images, buttons } = data

  // Helper to get text content by ID
  const getText = (id: string, fallback = "") => texts[id] || fallback

  // Helper to get image src by ID
  const getImage = (id: string, fallback = "/placeholder.svg") => images[id] || fallback

  // Helper to get button data by ID
  const getButton = (id: string) => buttons[id] || { href: "#", text: "Click" }

  // Generate HTML based on template type
  let html = ""

  switch (template) {
    case "portfolio":
      html = generatePortfolioHTML(getText, getImage, getButton)
      break
    case "saas-landing":
      html = generateSaaSLandingHTML(getText, getImage, getButton)
      break
    case "project-overview":
      html = generateProjectOverviewHTML(getText, getImage, getButton)
      break
    case "personal-profile":
      html = generatePersonalProfileHTML(getText, getImage, getButton)
      break
    case "event":
      html = generateEventLandingHTML(getText, getImage, getButton)
      break
    case "lead-generation":
      html = generateLeadGenerationHTML(getText, getImage, getButton)
      break
    case "click-through":
      html = generateClickThroughHTML(getText, getImage, getButton)
      break
    case "sales-landing":
      html = generateSalesLandingHTML(getText, getImage, getButton)
      break
    case "indoor-skydiving":
      html = generateIndoorSkydivingHTML(getText, getImage, getButton)
      break
    case "saas-pro":
      html = generateSaaSProHTML(getText, getImage, getButton, theme)
      break
    case "portfolio-pro":
      html = generatePortfolioProHTML(getText, getImage, getButton, theme)
      break
    case "iphone-pro":
      html = generateIPhoneProHTML(getText, getImage, getButton, theme)
      break
    case "keto-bars":
      html = generateKetoBarHTML(getText, getImage, getButton)
      break
    case "banana-milk":
      html = generateBananaMilkHTML(getText, getImage, getButton)
      break
    case "campaign-monitor":
      html = generateCampaignMonitorHTML(getText, getImage, getButton)
      break
    case "blow-ltd":
      html = generateBlowLtdHTML(getText, getImage, getButton)
      break
    case "be-patients":
      html = generateBePatientsHTML(getText, getImage, getButton)
      break
    case "outlier-apparel":
      html = generateOutlierApparelHTML(getText, getImage, getButton)
      break
    case "branch-furniture":
      html = generateBranchFurnitureHTML(getText, getImage, getButton)
      break
    case "amazon-prime":
      html = generateAmazonPrimeHTML(getText, getImage, getButton)
      break
    case "goby-toothbrush":
      html = generateGobyToothbrushHTML(getText, getImage, getButton)
      break
    case "zola-wedding":
      html = generateZolaWeddingHTML(getText, getImage, getButton)
      break
    case "science-landing":
      html = generateScienceLandingHTML(getText, getImage, getButton)
      break
    case "empty":
      html = generateEmptyHTML(getText, getButton)
      break
    case "agency-pro":
      html = generateAgencyProHTML(getText, getImage, getButton, theme)
      break
    case "ecommerce-pro":
      html = generateEcommerceProHTML(getText, getImage, getButton)
      break
    default:
      html = generateGenericHTML(getText, getImage, getButton, name)
  }

  return wrapInHTMLDocument(html, name)
}

/**
 * Wraps content in a complete HTML document with Tailwind CSS
 */
function wrapInHTMLDocument(content: string, title: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {
      --background: 0 0% 100%;
      --foreground: 222.2 84% 4.9%;
      --card: 0 0% 100%;
      --card-foreground: 222.2 84% 4.9%;
      --primary: 222.2 47.4% 11.2%;
      --primary-foreground: 210 40% 98%;
      --secondary: 210 40% 96.1%;
      --secondary-foreground: 222.2 47.4% 11.2%;
      --muted: 210 40% 96.1%;
      --muted-foreground: 215.4 16.3% 46.9%;
      --accent: 210 40% 96.1%;
      --accent-foreground: 222.2 47.4% 11.2%;
      --border: 214.3 31.8% 91.4%;
      --ring: 222.2 84% 4.9%;
    }
    
    .bg-background { background-color: hsl(var(--background)); }
    .text-foreground { color: hsl(var(--foreground)); }
    .bg-card { background-color: hsl(var(--card)); }
    .text-card-foreground { color: hsl(var(--card-foreground)); }
    .bg-primary { background-color: hsl(var(--primary)); }
    .text-primary { color: hsl(var(--primary)); }
    .text-primary-foreground { color: hsl(var(--primary-foreground)); }
    .bg-secondary { background-color: hsl(var(--secondary)); }
    .text-secondary-foreground { color: hsl(var(--secondary-foreground)); }
    .text-muted-foreground { color: hsl(var(--muted-foreground)); }
    .border-border { border-color: hsl(var(--border)); }
  </style>
</head>
<body>
  ${content}
</body>
</html>`
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

type GetText = (id: string, fallback?: string) => string
type GetImage = (id: string, fallback?: string) => string
type GetButton = (id: string) => { href: string; text: string }

/**
 * Get theme-specific CSS classes for SaaS Pro templates
 */
function getSaaSProThemeStyles(theme: string) {
  const themes: Record<string, any> = {
    "modern-minimal": {
      mainBg: "bg-white",
      mainText: "text-gray-900",
      headerBg: "bg-white/95 backdrop-blur border-b border-gray-200",
      headerText: "text-gray-900",
      heroBg: "bg-white",
      primaryBtn: "bg-gray-900 text-white hover:bg-gray-800",
      secondaryBtn: "bg-gray-100 text-gray-900 hover:bg-gray-200",
      fontWeight: "font-normal",
      cardBg: "bg-card",
      cardBorder: "border-border",
    },
    "corporate-blue": {
      mainBg: "bg-slate-50",
      mainText: "text-slate-900",
      headerBg: "bg-white shadow-md border-b-2 border-blue-600",
      headerText: "text-blue-900",
      heroBg: "bg-gradient-to-br from-blue-50 to-slate-100",
      primaryBtn: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg",
      secondaryBtn: "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50",
      fontWeight: "font-normal",
      cardBg: "bg-white",
      cardBorder: "border-blue-200",
    },
    "vibrant-playful": {
      mainBg: "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50",
      mainText: "text-gray-900",
      headerBg: "bg-white/90 backdrop-blur-lg border-b-2 border-purple-300 shadow-lg",
      headerText: "text-purple-900",
      heroBg: "bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100",
      primaryBtn: "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 shadow-xl",
      secondaryBtn: "bg-white text-purple-600 border-2 border-purple-400 hover:bg-purple-50",
      fontWeight: "font-normal",
      cardBg: "bg-white",
      cardBorder: "border-purple-200",
    },
    "elegant-dark": {
      mainBg: "bg-gray-900",
      mainText: "text-gray-100",
      headerBg: "bg-black/90 backdrop-blur border-b border-gray-800",
      headerText: "text-white",
      heroBg: "bg-gradient-to-br from-gray-900 via-gray-800 to-black",
      primaryBtn: "bg-white text-black hover:bg-gray-200",
      secondaryBtn: "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700",
      fontWeight: "font-normal",
      cardBg: "bg-gray-800",
      cardBorder: "border-gray-700",
    },
    "creative-bold": {
      mainBg: "bg-black",
      mainText: "text-white",
      headerBg: "bg-black border-b-4 border-yellow-400",
      headerText: "text-white",
      heroBg: "bg-gradient-to-br from-black via-gray-900 to-black",
      primaryBtn: "bg-yellow-400 text-black hover:bg-yellow-500 font-bold shadow-2xl",
      secondaryBtn: "bg-transparent text-yellow-400 border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black",
      fontWeight: "font-bold",
      cardBg: "bg-gray-900",
      cardBorder: "border-yellow-400",
    },
    "nature-calm": {
      mainBg: "bg-emerald-50",
      mainText: "text-emerald-950",
      headerBg: "bg-white/90 backdrop-blur border-b-2 border-emerald-200",
      headerText: "text-emerald-800",
      heroBg: "bg-emerald-50",
      primaryBtn: "bg-black text-white hover:bg-gray-800 font-light",
      secondaryBtn: "bg-white text-black border border-gray-300 hover:bg-gray-50 font-light",
      fontWeight: "font-light",
      cardBg: "bg-white",
      cardBorder: "border-gray-200",
    },
  }

  return themes[theme] || themes["modern-minimal"]
}

/**
 * Get theme-specific CSS classes for Portfolio Pro templates
 */
function getPortfolioProThemeStyles(theme: string) {
  const themes: Record<string, any> = {
    "default": {
      mainBg: "bg-white",
      mainText: "text-gray-900",
      headerBg: "bg-white/95 backdrop-blur border-b border-gray-200",
      headerText: "text-gray-900",
      heroBg: "bg-white",
      primaryBtn: "bg-blue-600 text-white hover:bg-blue-700",
      secondaryBtn: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    },
    "creative-artist": {
      mainBg: "bg-gradient-to-br from-pink-50 via-orange-50 to-purple-50",
      mainText: "text-gray-900",
      headerBg: "bg-white/90 backdrop-blur-lg border-b-2 border-pink-300",
      headerText: "text-pink-900",
      heroBg: "bg-gradient-to-r from-pink-100 via-orange-100 to-purple-100",
      primaryBtn: "bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:from-pink-600 hover:to-orange-600 shadow-xl",
      secondaryBtn: "bg-white text-pink-600 border-2 border-pink-400 hover:bg-pink-50",
    },
    "tech-minimal": {
      mainBg: "bg-gray-50",
      mainText: "text-gray-900",
      headerBg: "bg-white border-b border-gray-200",
      headerText: "text-gray-900",
      heroBg: "bg-gray-50",
      primaryBtn: "bg-blue-600 text-white hover:bg-blue-700",
      secondaryBtn: "bg-white text-gray-900 border border-gray-300 hover:bg-gray-100",
    },
    "luxury-elegant": {
      mainBg: "bg-gradient-to-b from-black via-gray-900 to-black",
      mainText: "text-white",
      headerBg: "bg-black/95 backdrop-blur border-b border-amber-600/30",
      headerText: "text-white",
      heroBg: "bg-gradient-to-br from-black via-gray-900 to-black",
      primaryBtn: "bg-gradient-to-r from-amber-600 to-yellow-600 text-black hover:from-amber-700 hover:to-yellow-700 font-semibold shadow-xl shadow-amber-600/30",
      secondaryBtn: "bg-transparent text-amber-600 border-2 border-amber-600 hover:bg-amber-600 hover:text-black",
    },
    "nature-organic": {
      mainBg: "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50",
      mainText: "text-green-900",
      headerBg: "bg-white/95 backdrop-blur border-b border-green-300",
      headerText: "text-green-900",
      heroBg: "bg-gradient-to-br from-green-50 to-emerald-50",
      primaryBtn: "bg-green-600 text-white hover:bg-green-700 shadow-lg",
      secondaryBtn: "bg-white text-green-600 border-2 border-green-500 hover:bg-green-50",
    },
    "cyberpunk-futuristic": {
      mainBg: "bg-black",
      mainText: "text-white",
      headerBg: "bg-black/95 backdrop-blur border-b-2 border-cyan-400",
      headerText: "text-cyan-400",
      heroBg: "bg-gradient-to-br from-black via-gray-900 to-black",
      primaryBtn: "bg-gradient-to-r from-cyan-500 to-pink-500 text-black hover:from-cyan-600 hover:to-pink-600 font-bold shadow-xl shadow-cyan-500/30",
      secondaryBtn: "bg-transparent text-cyan-400 border-2 border-cyan-400 hover:bg-cyan-400 hover:text-black",
    },
  }

  return themes[theme] || themes["default"]
}

function generatePortfolioHTML(getText: GetText, getImage: GetImage, getButton: GetButton): string {
  return `
<main class="bg-background text-foreground">
  <header class="border-b border-border">
    <div class="mx-auto max-w-6xl px-4 py-6 flex items-center justify-between">
      <h1 class="text-xl font-semibold">${escapeHtml(getText("pt-brand", "Your Name"))}</h1>
      <nav class="flex items-center gap-6 text-sm">
        <span>${escapeHtml(getText("pt-nav-1", "About"))}</span>
        <span>${escapeHtml(getText("pt-nav-2", "Projects"))}</span>
        <span>${escapeHtml(getText("pt-nav-3", "Contact"))}</span>
      </nav>
    </div>
  </header>

  <section class="mx-auto max-w-6xl px-4 py-12 grid gap-8 md:grid-cols-2">
    <div class="flex flex-col gap-4">
      <h2 class="text-3xl md:text-5xl font-bold text-balance">${escapeHtml(getText("pt-hero-title", "Designer & Frontend Developer crafting clean, modern websites"))}</h2>
      <p class="text-muted-foreground leading-relaxed">${escapeHtml(getText("pt-hero-sub", "I help startups and agencies turn ideas into delightful, performant digital products."))}</p>
      <div class="flex gap-3">
        <a href="${escapeHtml(getButton("pt-cta-1").href)}" class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">${escapeHtml(getButton("pt-cta-1").text)}</a>
        <a href="${escapeHtml(getButton("pt-cta-2").href)}" class="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:opacity-90">${escapeHtml(getButton("pt-cta-2").text)}</a>
      </div>
    </div>
    <img src="${escapeHtml(getImage("pt-hero-img", "/portfolio-cover-preview.jpg"))}" alt="Portfolio preview" class="w-full h-auto md:justify-self-end" />
  </section>

  <section class="mx-auto max-w-6xl px-4 py-12 grid gap-8 md:grid-cols-[1fr_1.2fr]">
    <div class="rounded-xl border border-border bg-card p-6">
      <h3 class="text-xl font-semibold mb-3">${escapeHtml(getText("pt-about-title", "About Me"))}</h3>
      <p class="text-sm text-muted-foreground leading-relaxed">${escapeHtml(getText("pt-about-body", "I specialize in UX, UI, and front-end development. I turn complex problems into simple, beautiful solutions."))}</p>
    </div>
    <div class="rounded-xl border border-border bg-card p-6">
      <h3 class="text-xl font-semibold mb-3">${escapeHtml(getText("pt-skills-title", "Skills"))}</h3>
      <div class="grid grid-cols-2 gap-3 text-sm">
        ${["React", "Next.js", "Tailwind", "Figma", "TypeScript", "Accessibility"]
      .map((s, i) => `<div class="rounded-lg bg-background p-3">${escapeHtml(getText(`pt-skill-${i}`, s))}</div>`)
      .join("")}
      </div>
    </div>
  </section>

  <section class="bg-card border-y border-border">
    <div class="mx-auto max-w-6xl px-4 py-12">
      <h3 class="text-2xl font-semibold mb-6 text-center">${escapeHtml(getText("pt-test-title", "What clients say"))}</h3>
      <div class="grid gap-6 md:grid-cols-3">
        ${[1, 2, 3].map((n) => `
          <figure class="rounded-lg border border-border p-5 bg-background">
            <blockquote class="text-pretty">${escapeHtml(getText(`pt-test-quote-${n}`, '"Outstanding work, fast delivery, and great communication throughout."'))}</blockquote>
            <div class="mt-4 flex items-center gap-3">
              <img src="${escapeHtml(getImage(`pt-test-avatar-${n}`, `/placeholder.svg?height=40&width=40&query=avatar%20${n}`))}" alt="Client ${n}" class="h-10 w-10 rounded-full" />
              <div>
                <p class="text-sm font-medium">${escapeHtml(getText(`pt-test-name-${n}`, `Client Name ${n}`))}</p>
                <p class="text-xs text-muted-foreground">${escapeHtml(getText(`pt-test-role-${n}`, "Company"))}</p>
              </div>
            </div>
          </figure>
        `).join("")}
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-4 py-12">
    <div class="rounded-xl border border-border p-6 bg-card grid gap-6 md:grid-cols-[1.2fr_1fr] items-center">
      <div>
        <h4 class="text-xl font-semibold">${escapeHtml(getText("pt-contact-title", "Let's build something great"))}</h4>
        <p class="text-sm text-muted-foreground mt-2">${escapeHtml(getText("pt-contact-desc", "Ready to start your project? Get in touch and tell me about your idea."))}</p>
      </div>
      <div class="flex gap-3 md:justify-end">
        <a href="${escapeHtml(getButton("pt-contact-cta-1").href)}" class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">${escapeHtml(getButton("pt-contact-cta-1").text)}</a>
        <a href="${escapeHtml(getButton("pt-contact-cta-2").href)}" class="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:opacity-90">${escapeHtml(getButton("pt-contact-cta-2").text)}</a>
      </div>
    </div>
  </section>

  <section class="bg-card border-t border-border">
    <div class="mx-auto max-w-6xl px-4 py-12">
      <h3 class="text-2xl font-semibold mb-6">${escapeHtml(getText("pt-sec-title", "Selected Projects"))}</h3>
      <div class="grid gap-6 md:grid-cols-3">
        ${[1, 2, 3].map((n) => `
          <article class="rounded-lg border border-border overflow-hidden bg-background">
            <img src="${escapeHtml(getImage(`pt-proj-img-${n}`, `/placeholder.svg?height=200&width=400&query=project%20${n}`))}" alt="Project ${n}" class="w-full h-auto" />
            <div class="p-4">
              <h4 class="font-medium">${escapeHtml(getText(`pt-proj-title-${n}`, `Project Title ${n}`))}</h4>
              <p class="text-sm text-muted-foreground">${escapeHtml(getText(`pt-proj-desc-${n}`, "Short description of the project and the impact it delivered."))}</p>
            </div>
          </article>
        `).join("")}
      </div>
    </div>
  </section>

  <footer class="border-t border-border">
    <div class="mx-auto max-w-6xl px-4 py-8 flex items-center justify-between">
      <p class="text-sm text-muted-foreground">${escapeHtml(getText("pt-foot-copy", "© 2025 Your Name. All rights reserved."))}</p>
      <div class="flex gap-4 text-sm">
        <span>${escapeHtml(getText("pt-foot-link-1", "Twitter"))}</span>
        <span>${escapeHtml(getText("pt-foot-link-2", "LinkedIn"))}</span>
        <span>${escapeHtml(getText("pt-foot-link-3", "GitHub"))}</span>
      </div>
    </div>
  </footer>
</main>
  `
}

function generateSaaSLandingHTML(getText: GetText, getImage: GetImage, getButton: GetButton): string {
  return `
<main class="bg-background text-foreground">
  <header class="border-b border-border">
    <div class="mx-auto max-w-6xl px-4 py-5 flex items-center justify-between">
      <h1 class="text-xl font-semibold">${escapeHtml(getText("sl-brand", "SparkMail AI"))}</h1>
      <nav class="hidden md:flex items-center gap-6 text-sm">
        ${[0, 1, 2, 3].map((i) => `<span>${escapeHtml(getText(`sl-nav-${i}`, ["Features", "Pricing", "Docs", "Contact"][i]))}</span>`).join("")}
      </nav>
      <a href="${escapeHtml(getButton("sl-cta-login").href)}" class="hidden md:inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">${escapeHtml(getButton("sl-cta-login").text)}</a>
    </div>
  </header>

  <section class="mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-2">
    <div class="flex flex-col gap-4">
      <h2 class="text-3xl md:text-5xl font-bold text-balance">${escapeHtml(getText("sl-hero-title", "Write better emails 10x faster with AI"))}</h2>
      <p class="text-muted-foreground leading-relaxed">${escapeHtml(getText("sl-hero-sub", "Draft, improve, and personalize emails with one click."))}</p>
      <div class="flex flex-col sm:flex-row gap-3">
        <a href="${escapeHtml(getButton("sl-cta-1").href)}" class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">${escapeHtml(getButton("sl-cta-1").text)}</a>
        <a href="${escapeHtml(getButton("sl-cta-2").href)}" class="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">${escapeHtml(getButton("sl-cta-2").text)}</a>
      </div>
      <div class="text-xs text-muted-foreground">${escapeHtml(getText("sl-footnote", "No credit card required"))}</div>
    </div>
    <img src="${escapeHtml(getImage("sl-hero-img", "/product-screenshot.png"))}" alt="App screenshot" class="w-full h-auto md:justify-self-end" />
  </section>

  <section class="mx-auto max-w-6xl px-4 py-10">
    <div class="rounded-xl border border-border p-6 bg-card">
      <h4 class="text-center text-sm text-muted-foreground mb-6">${escapeHtml(getText("sl-logos-title", "Trusted by teams at"))}</h4>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
        ${[1, 2, 3, 4].map((n) => `<img src="${escapeHtml(getImage(`sl-logo-${n}`, `/placeholder.svg?height=36&width=120&query=logo%20${n}`))}" alt="Logo ${n}" class="mx-auto h-9 w-auto opacity-70" />`).join("")}
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-4 py-12">
    <div class="grid gap-6 md:grid-cols-3">
      ${[0, 1, 2].map((i) => `
        <article class="rounded-lg border border-border p-5 bg-card">
          <img src="${escapeHtml(getImage(`sl-adv-icon-${i}`, `/placeholder.svg?height=40&width=40&query=icon%20${i + 1}`))}" alt="Feature icon ${i + 1}" class="h-10 w-10 mb-3" />
          <h4 class="font-medium">${escapeHtml(getText(`sl-adv-title-${i}`, `Advanced Feature ${i + 1}`))}</h4>
          <p class="text-sm text-muted-foreground">${escapeHtml(getText(`sl-adv-desc-${i}`, "Explain how this feature provides tangible value."))}</p>
          <ul class="mt-3 list-disc pl-5 text-sm">
            ${[1, 2, 3].map((n) => `<li>${escapeHtml(getText(`sl-adv-bullet-${i}-${n}`, `Key benefit ${n}`))}</li>`).join("")}
          </ul>
        </article>
      `).join("")}
    </div>
  </section>

  <section class="bg-card border-y border-border">
    <div class="mx-auto max-w-6xl px-4 py-12">
      <h3 class="text-2xl font-semibold mb-6 text-center">${escapeHtml(getText("sl-test-title", "Loved by modern teams"))}</h3>
      <div class="grid gap-6 md:grid-cols-3">
        ${[1, 2, 3].map((n) => `
          <figure class="rounded-lg border border-border p-5 bg-background">
            <blockquote class="text-pretty">${escapeHtml(getText(`sl-test-quote-${n}`, "SparkMail AI cut our reply time by 70%."))}</blockquote>
            <div class="mt-4 flex items-center gap-3">
              <img src="${escapeHtml(getImage(`sl-test-avatar-${n}`, `/placeholder.svg?height=40&width=40&query=avatar%20${n}`))}" alt="Avatar ${n}" class="h-10 w-10 rounded-full" />
              <div>
                <p class="text-sm font-medium">${escapeHtml(getText(`sl-test-name-${n}`, "Alex Johnson"))}</p>
                <p class="text-xs text-muted-foreground">${escapeHtml(getText(`sl-test-role-${n}`, "Head of Support, Acme"))}</p>
              </div>
            </div>
          </figure>
        `).join("")}
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-4 py-12">
    <h3 class="text-2xl font-semibold mb-6 text-center">${escapeHtml(getText("sl-pricing-title", "Simple, transparent pricing"))}</h3>
    <div class="grid gap-6 md:grid-cols-3">
      ${["starter", "pro", "team"].map((k) => `
        <article class="rounded-lg border border-border p-6 bg-card flex flex-col">
          <p class="text-sm text-muted-foreground">${escapeHtml(getText(`sl-price-badge-${k}`, k.charAt(0).toUpperCase() + k.slice(1)))}</p>
          <div class="mt-2 text-3xl font-bold">${escapeHtml(getText(`sl-price-amount-${k}`, k === "starter" ? "$0/mo" : k === "pro" ? "$19/mo" : "$49/mo"))}</div>
          <ul class="mt-4 space-y-2 text-sm">
            ${[1, 2, 3, 4].map((n) => `<li>${escapeHtml(getText(`sl-price-feat-${k}-${n}`, `Plan feature ${n}`))}</li>`).join("")}
          </ul>
          <div class="mt-6">
            <a href="${escapeHtml(getButton(`sl-price-cta-${k}`).href)}" class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground w-full">${escapeHtml(getButton(`sl-price-cta-${k}`).text)}</a>
          </div>
        </article>
      `).join("")}
    </div>
  </section>

  <section class="bg-card border-y border-border">
    <div class="mx-auto max-w-6xl px-4 py-12">
      <h3 class="text-2xl font-semibold mb-6 text-center">${escapeHtml(getText("sl-faq-title", "Frequently asked questions"))}</h3>
      <div class="grid gap-4 md:grid-cols-2">
        ${[1, 2, 3, 4].map((n) => `
          <article class="rounded-lg border border-border p-5 bg-background">
            <h4 class="font-medium">${escapeHtml(getText(`sl-faq-q-${n}`, `Question ${n}: How does SparkMail AI work?`))}</h4>
            <p class="text-sm text-muted-foreground">${escapeHtml(getText(`sl-faq-a-${n}`, "Answer: It analyzes your context and tone."))}</p>
          </article>
        `).join("")}
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-4 py-12">
    <div class="rounded-xl border border-border p-6 bg-card grid md:grid-cols-2 gap-6 items-center">
      <h4 class="text-xl font-semibold">${escapeHtml(getText("sl-cta-final-title", "Get started in minutes — no credit card required"))}</h4>
      <div class="flex gap-3 md:justify-end">
        <a href="${escapeHtml(getButton("sl-cta-final-1").href)}" class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">${escapeHtml(getButton("sl-cta-final-1").text)}</a>
        <a href="${escapeHtml(getButton("sl-cta-final-2").href)}" class="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">${escapeHtml(getButton("sl-cta-final-2").text)}</a>
      </div>
    </div>
  </section>

  <footer class="border-t border-border">
    <div class="mx-auto max-w-6xl px-4 py-8 text-center md:text-left">
      <p class="text-sm text-muted-foreground">${escapeHtml(getText("sl-footer", "© 2025 SparkMail Inc."))}</p>
    </div>
  </footer>
</main>
  `
}

function generateProjectOverviewHTML(getText: GetText, getImage: GetImage, getButton: GetButton): string {
  return `
<main class="bg-background text-foreground">
  <section class="mx-auto max-w-5xl px-4 py-12">
    <h1 class="text-3xl md:text-5xl font-bold text-balance">${escapeHtml(getText("po-title", "Project Phoenix"))}</h1>
    <p class="text-muted-foreground mt-2">${escapeHtml(getText("po-sub", "A concise overview of goals, timeline, stakeholders, and key deliverables."))}</p>
  </section>

  <section class="bg-card border-y border-border">
    <div class="mx-auto max-w-5xl px-4 py-12 grid gap-6 md:grid-cols-2">
      <article class="rounded-lg border border-border p-6 bg-background">
        <h3 class="text-xl font-semibold mb-2">${escapeHtml(getText("po-problem-title", "Problem"))}</h3>
        <p class="text-sm text-muted-foreground">${escapeHtml(getText("po-problem", "Describe the business challenge and constraints that motivated the project."))}</p>
      </article>
      <article class="rounded-lg border border-border p-6 bg-background">
        <h3 class="text-xl font-semibold mb-2">${escapeHtml(getText("po-solution-title", "Solution"))}</h3>
        <p class="text-sm text-muted-foreground">${escapeHtml(getText("po-solution", "Summarize the approach, key decisions, and how the solution addresses the problem."))}</p>
      </article>
    </div>
  </section>

  <section class="mx-auto max-w-5xl px-4 pb-12 grid gap-6 md:grid-cols-3">
    ${["Goals", "Timeline", "Team"].map((t, i) => `
      <article class="rounded-lg border border-border p-5 bg-card">
        <h3 class="font-semibold">${escapeHtml(getText(`po-card-${i}-title`, t))}</h3>
        <p class="text-sm text-muted-foreground">${escapeHtml(getText(`po-card-${i}-desc`, `Replace this with structured details about ${t.toLowerCase()}.`))}</p>
      </article>
    `).join("")}
  </section>

  <section class="mx-auto max-w-5xl px-4 py-12">
    <h3 class="text-2xl font-semibold mb-6">${escapeHtml(getText("po-process-title", "Process"))}</h3>
    <div class="grid gap-6 md:grid-cols-3">
      ${["Research", "Design", "Implementation"].map((step, i) => `
        <article class="rounded-lg border border-border p-5 bg-card">
          <h4 class="font-medium">${escapeHtml(getText(`po-step-${i}-title`, step))}</h4>
          <p class="text-sm text-muted-foreground">${escapeHtml(getText(`po-step-${i}-desc`, "Outline activities, artifacts, and outcomes for this phase."))}</p>
        </article>
      `).join("")}
    </div>
  </section>

  <section class="bg-card border-y border-border">
    <div class="mx-auto max-w-5xl px-4 py-12">
      <h3 class="text-2xl font-semibold mb-6">${escapeHtml(getText("po-metrics-title", "Results & Metrics"))}</h3>
      <div class="grid gap-4 md:grid-cols-4">
        ${[1, 2, 3, 4].map((n) => `
          <div class="rounded-lg border border-border p-5 bg-background text-center">
            <div class="text-2xl font-bold">${escapeHtml(getText(`po-metric-${n}-value`, "+45%"))}</div>
            <p class="text-xs text-muted-foreground">${escapeHtml(getText(`po-metric-${n}-label`, "Improvement metric"))}</p>
          </div>
        `).join("")}
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-5xl px-4 py-12">
    <div class="rounded-xl border border-border p-6 bg-card grid gap-6 md:grid-cols-[1.2fr_1fr] items-center">
      <div>
        <h4 class="text-xl font-semibold">${escapeHtml(getText("po-outcome-title", "Outcomes"))}</h4>
        <p class="text-sm text-muted-foreground mt-2">${escapeHtml(getText("po-outcome-desc", "Summarize the final impact, adoption, and learnings post-release."))}</p>
      </div>
      <img src="${escapeHtml(getImage("po-outcome-img", "/outcome-visual.jpg"))}" alt="Outcome visual" class="w-full h-auto md:justify-self-end rounded-lg" />
    </div>
  </section>

  <section class="mx-auto max-w-5xl px-4 pb-16">
    <div class="rounded-xl border border-border overflow-hidden">
      <img src="${escapeHtml(getImage("po-hero", "/project-banner.png"))}" alt="Project banner" class="w-full h-auto" />
    </div>
  </section>
</main>
  `
}

function generatePersonalProfileHTML(getText: GetText, getImage: GetImage, getButton: GetButton): string {
  return `
<main class="bg-background text-foreground">
  <section class="mx-auto max-w-4xl px-4 py-12 grid gap-8 md:grid-cols-[240px_1fr]">
    <img src="${escapeHtml(getImage("pp-avatar", "/profile-portrait.png"))}" alt="Profile portrait" class="w-60 h-60 object-cover rounded-full border border-border" />
    <div class="flex flex-col gap-3">
      <h1 class="text-3xl font-bold">${escapeHtml(getText("pp-name", "Alex Johnson"))}</h1>
      <p class="text-muted-foreground">${escapeHtml(getText("pp-role", "Product Designer"))}</p>
      <p class="leading-relaxed">${escapeHtml(getText("pp-bio", "Short bio goes here. Highlight experience, values, and areas of expertise."))}</p>
      <div class="flex gap-3">
        <a href="${escapeHtml(getButton("pp-cta-1").href)}" class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">${escapeHtml(getButton("pp-cta-1").text)}</a>
        <a href="${escapeHtml(getButton("pp-cta-2").href)}" class="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">${escapeHtml(getButton("pp-cta-2").text)}</a>
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-4xl px-4 pb-12">
    <h3 class="text-xl font-semibold mb-4">${escapeHtml(getText("pp-socials-title", "Social Profiles"))}</h3>
    <div class="grid grid-cols-2 gap-3 text-sm">
      ${["Twitter", "LinkedIn", "GitHub", "Dribbble"].map((s, i) => `
        <a href="${escapeHtml(getButton(`pp-social-${i}`).href)}" class="inline-flex items-center justify-center rounded-md bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-card/90">${escapeHtml(getButton(`pp-social-${i}`).text)}</a>
      `).join("")}
    </div>
  </section>

  <section class="bg-card border-y border-border">
    <div class="mx-auto max-w-4xl px-4 py-12">
      <h3 class="text-2xl font-semibold mb-6">${escapeHtml(getText("pp-exp-title", "Experience"))}</h3>
      <div class="grid gap-4">
        ${[1, 2, 3].map((n) => `
          <article class="rounded-lg border border-border p-5 bg-background">
            <h4 class="font-medium">${escapeHtml(getText(`pp-exp-${n}-role`, "Senior Designer"))}</h4>
            <p class="text-xs text-muted-foreground">${escapeHtml(getText(`pp-exp-${n}-meta`, "Company • 2022–Present"))}</p>
            <p class="text-sm text-muted-foreground mt-2">${escapeHtml(getText(`pp-exp-${n}-desc`, "Brief description of responsibilities, key projects, and impact."))}</p>
          </article>
        `).join("")}
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-4xl px-4 py-12">
    <h3 class="text-2xl font-semibold mb-6">${escapeHtml(getText("pp-work-title", "Featured Work"))}</h3>
    <div class="grid gap-6 md:grid-cols-2">
      ${[1, 2].map((n) => `
        <article class="rounded-lg border border-border overflow-hidden bg-card">
          <img src="${escapeHtml(getImage(`pp-work-img-${n}`, `/placeholder.svg?height=200&width=400&query=work%20${n}`))}" alt="Work ${n}" class="w-full h-auto" />
          <div class="p-4">
            <h4 class="font-medium">${escapeHtml(getText(`pp-work-title-${n}`, `Project ${n}`))}</h4>
            <p class="text-sm text-muted-foreground">${escapeHtml(getText(`pp-work-desc-${n}`, "Short description of the project and role."))}</p>
          </div>
        </article>
      `).join("")}
    </div>
  </section>

  <section class="bg-card border-t border-border">
    <div class="mx-auto max-w-4xl px-4 py-12 grid gap-6 md:grid-cols-[1.2fr_1fr] items-center">
      <div>
        <h4 class="text-xl font-semibold">${escapeHtml(getText("pp-contact-title", "Get in touch"))}</h4>
        <p class="text-sm text-muted-foreground mt-2">${escapeHtml(getText("pp-contact-desc", "Open to freelance work and full-time opportunities."))}</p>
      </div>
      <div class="flex gap-3 md:justify-end">
        <a href="${escapeHtml(getButton("pp-contact-cta-1").href)}" class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">${escapeHtml(getButton("pp-contact-cta-1").text)}</a>
        <a href="${escapeHtml(getButton("pp-contact-cta-2").href)}" class="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">${escapeHtml(getButton("pp-contact-cta-2").text)}</a>
      </div>
    </div>
  </section>
</main>
  `
}

function generateEventLandingHTML(getText: GetText, getImage: GetImage, getButton: GetButton): string {
  return `
<main class="bg-background text-foreground">
  <section class="mx-auto max-w-6xl px-4 py-12 grid gap-8 md:grid-cols-[1.2fr_1fr]">
    <div class="flex flex-col gap-4">
      <h1 class="text-3xl md:text-5xl font-bold text-balance">${escapeHtml(getText("el-title", "Product Summit 2025"))}</h1>
      <p class="text-muted-foreground">${escapeHtml(getText("el-sub", "Join 2,000+ builders for two days of talks, workshops, and networking."))}</p>
      <div class="grid gap-3 sm:grid-cols-2 max-w-md">
        <article class="rounded-lg border border-border p-4 bg-card">
          <p class="font-medium">${escapeHtml(getText("el-when", "June 12–13, 2025"))}</p>
          <p class="text-sm text-muted-foreground">${escapeHtml(getText("el-where", "San Francisco, CA"))}</p>
        </article>
        <article class="rounded-lg border border-border p-4 bg-card">
          <p class="font-medium">${escapeHtml(getText("el-pass", "Early bird now live"))}</p>
          <p class="text-sm text-muted-foreground">${escapeHtml(getText("el-note", "Limited seats available"))}</p>
        </article>
      </div>
      <div class="flex gap-3">
        <a href="${escapeHtml(getButton("el-cta-1").href)}" class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">${escapeHtml(getButton("el-cta-1").text)}</a>
        <a href="${escapeHtml(getButton("el-cta-2").href)}" class="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">${escapeHtml(getButton("el-cta-2").text)}</a>
      </div>
    </div>
    <img src="${escapeHtml(getImage("el-hero", "/event-venue-or-audience.jpg"))}" alt="Event venue" class="w-full h-auto md:justify-self-end rounded-xl" />
  </section>

  <section class="bg-card border-t border-border">
    <div class="mx-auto max-w-6xl px-4 py-12">
      <h3 class="text-2xl font-semibold mb-6">${escapeHtml(getText("el-agenda-title", "Agenda Highlights"))}</h3>
      <div class="grid gap-6 md:grid-cols-3">
        ${[1, 2, 3].map((n) => `
          <article class="rounded-lg border border-border p-5 bg-background">
            <h4 class="font-medium">${escapeHtml(getText(`el-agenda-${n}-title`, `Keynote ${n}`))}</h4>
            <p class="text-sm text-muted-foreground">${escapeHtml(getText(`el-agenda-${n}-desc`, "Brief description of the session, speaker, and what attendees will learn."))}</p>
          </article>
        `).join("")}
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-4 py-12">
    <h3 class="text-2xl font-semibold mb-6 text-center">${escapeHtml(getText("el-speakers-title", "Featured Speakers"))}</h3>
    <div class="grid gap-6 md:grid-cols-3">
      ${[1, 2, 3].map((n) => `
        <figure class="rounded-lg border border-border p-5 bg-card">
          <img src="${escapeHtml(getImage(`el-speaker-${n}-avatar`, `/placeholder.svg?height=120&width=120&query=speaker%20${n}`))}" alt="Speaker ${n}" class="mx-auto h-28 w-28 rounded-full" />
          <div class="mt-4 text-center">
            <p class="text-sm font-medium">${escapeHtml(getText(`el-speaker-${n}-name`, `Speaker Name ${n}`))}</p>
            <p class="text-xs text-muted-foreground">${escapeHtml(getText(`el-speaker-${n}-role`, "Title, Company"))}</p>
          </div>
        </figure>
      `).join("")}
    </div>
  </section>

  <section class="bg-card border-y border-border">
    <div class="mx-auto max-w-6xl px-4 py-12">
      <h3 class="text-2xl font-semibold mb-6 text-center">${escapeHtml(getText("el-tickets-title", "Tickets"))}</h3>
      <div class="grid gap-6 md:grid-cols-3">
        ${["basic", "pro", "vip"].map((k) => `
          <article class="rounded-lg border border-border p-6 bg-background flex flex-col">
            <p class="text-sm text-muted-foreground">${escapeHtml(getText(`el-ticket-badge-${k}`, k.charAt(0).toUpperCase() + k.slice(1)))}</p>
            <div class="mt-2 text-3xl font-bold">${escapeHtml(getText(`el-ticket-amount-${k}`, k === "basic" ? "$99" : k === "pro" ? "$199" : "$399"))}</div>
            <ul class="mt-4 space-y-2 text-sm">
              ${[1, 2, 3].map((n) => `<li>${escapeHtml(getText(`el-ticket-feat-${k}-${n}`, `Ticket feature ${n}`))}</li>`).join("")}
            </ul>
            <div class="mt-6">
              <a href="${escapeHtml(getButton(`el-ticket-cta-${k}`).href)}" class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground w-full">${escapeHtml(getButton(`el-ticket-cta-${k}`).text)}</a>
            </div>
          </article>
        `).join("")}
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-4 py-12">
    <h3 class="text-2xl font-semibold mb-6 text-center">${escapeHtml(getText("el-faq-title", "Frequently asked questions"))}</h3>
    <div class="grid gap-4 md:grid-cols-2">
      ${[1, 2, 3, 4].map((n) => `
        <article class="rounded-lg border border-border p-5 bg-card">
          <h4 class="font-medium">${escapeHtml(getText(`el-faq-q-${n}`, `Question ${n}: What is included with my ticket?`))}</h4>
          <p class="text-sm text-muted-foreground">${escapeHtml(getText(`el-faq-a-${n}`, "Answer: Access to all sessions, workshops, and community events for both days."))}</p>
        </article>
      `).join("")}
    </div>
  </section>

  <footer class="border-t border-border">
    <div class="mx-auto max-w-6xl px-4 py-8 text-center md:text-left">
      <p class="text-sm text-muted-foreground">${escapeHtml(getText("el-footer", "© 2025 Product Summit. All rights reserved."))}</p>
    </div>
  </footer>
</main>
  `
}

function generateSaaSProHTML(getText: GetText, getImage: GetImage, getButton: GetButton, theme?: string): string {
  const t = getSaaSProThemeStyles(theme || "modern-minimal")

  return `
<main class="${t.mainBg} ${t.mainText}">
  <!-- Navigation -->
  <header class="sticky top-0 z-40 ${t.headerBg}">
    <div class="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
      <h1 class="text-xl font-semibold ${t.headerText}">${escapeHtml(getText("saas_pro_brand", "InnovatePro"))}</h1>
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-emerald-700">
        ${[1, 2, 3, 4, 5].map(n => `<span class="hover:text-emerald-600 transition-colors">${escapeHtml(getText(`saas_pro_nav_${n}`, ["Features", "Solutions", "Pricing", "Resources", "Company"][n - 1]))}</span>`).join("")}
      </nav>
      <div class="flex items-center gap-3">
        <a href="${escapeHtml(getButton("saas_pro_nav_signin").href)}" class="hidden md:inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium ${t.secondaryBtn}">${escapeHtml(getButton("saas_pro_nav_signin").text)}</a>
        <a href="${escapeHtml(getButton("saas_pro_nav_cta").href)}" class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold ${t.primaryBtn}">${escapeHtml(getButton("saas_pro_nav_cta").text)}</a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="mx-auto max-w-7xl px-4 py-20 md:py-28 ${t.heroBg}">
    <div class="text-center max-w-4xl mx-auto">
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 text-gray-600 text-xs ${t.fontWeight} mb-6">${escapeHtml(getText("saas_pro_hero_badge", "✨ New: AI-Powered Analytics Dashboard"))}</div>
      <h2 class="text-5xl md:text-7xl lg:text-8xl ${t.fontWeight} tracking-tight mb-6 leading-none">${escapeHtml(getText("saas_pro_hero_headline", "Transform Your Business with Intelligent Automation"))}</h2>
      <p class="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto ${t.fontWeight}">${escapeHtml(getText("saas_pro_hero_subheadline", "Streamline operations, boost productivity, and scale effortlessly"))}</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-6">
        <a href="${escapeHtml(getButton("saas_pro_hero_cta_primary").href)}" class="inline-flex items-center justify-center rounded-md px-8 py-4 text-base ${t.primaryBtn}">${escapeHtml(getButton("saas_pro_hero_cta_primary").text)}</a>
        <a href="${escapeHtml(getButton("saas_pro_hero_cta_secondary").href)}" class="inline-flex items-center justify-center rounded-md px-8 py-4 text-base ${t.secondaryBtn}">${escapeHtml(getButton("saas_pro_hero_cta_secondary").text)}</a>
      </div>
      <p class="text-xs text-gray-500 ${t.fontWeight}">${escapeHtml(getText("saas_pro_hero_note", "No credit card required • Free 14-day trial"))}</p>
    </div>
    <div class="mt-20 relative">
      <img src="${escapeHtml(getImage("saas_pro_hero_image", "/abstract-product-screenshot.jpg"))}" alt="Product dashboard" class="w-full max-w-5xl mx-auto rounded-lg shadow-2xl border border-gray-200" />
    </div>
  </section>

  <!-- Social Proof / Logos -->
  <section class="border-y ${t.cardBorder} bg-gray-50 py-12">
    <div class="mx-auto max-w-7xl px-4">
      <p class="text-center text-xs ${t.fontWeight} text-gray-500 mb-8 uppercase tracking-widest">${escapeHtml(getText("saas_pro_logos_heading", "Trusted by industry-leading companies worldwide"))}</p>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
        ${[1, 2, 3, 4, 5].map(n => `<img src="${escapeHtml(getImage(`saas_pro_logo_${n}`, `/placeholder.svg?height=40&width=140&query=logo%20${n}`))}" alt="Partner ${n}" class="mx-auto h-8 md:h-10 w-auto opacity-40 hover:opacity-100 transition-opacity grayscale" />`).join("")}
      </div>
    </div>
  </section>

  <!-- Features Grid -->
  <section class="mx-auto max-w-7xl px-4 py-24 md:py-32">
    <div class="text-center max-w-3xl mx-auto mb-20">
      <p class="text-gray-500 ${t.fontWeight} text-xs uppercase tracking-widest mb-3">${escapeHtml(getText("saas_pro_features_eyebrow", "Powerful Features"))}</p>
      <h3 class="text-4xl md:text-6xl ${t.fontWeight} mb-4">${escapeHtml(getText("saas_pro_features_headline", "Everything You Need to Succeed"))}</h3>
      <p class="text-lg text-gray-600 ${t.fontWeight}">${escapeHtml(getText("saas_pro_features_subheadline", "Our comprehensive suite of tools helps you work smarter"))}</p>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
      ${[1, 2, 3, 4, 5, 6].map(n => `
        <div class="group">
          <div class="w-12 h-12 rounded-full border ${t.cardBorder} flex items-center justify-center mb-4 group-hover:border-black transition-colors">${escapeHtml(getText(`saas_pro_feature_${n}_icon`, ["⚡", "🎯", "🔒", "📊", "🚀", "💡"][n - 1]))}</div>
          <h4 class="text-xl ${t.fontWeight} mb-2">${escapeHtml(getText(`saas_pro_feature_${n}_title`, ["Lightning Fast", "Precision Targeting", "Bank-Grade Security", "Advanced Analytics", "Seamless Integrations", "Smart Automation"][n - 1]))}</h4>
          <p class="text-gray-600 leading-relaxed ${t.fontWeight} text-sm">${escapeHtml(getText(`saas_pro_feature_${n}_description`, "Feature description"))}</p>
        </div>
      `).join("")}
    </div>
  </section>

  <!-- Stats / Metrics -->
  <section class="border-y ${t.cardBorder} bg-gray-50 py-20">
    <div class="mx-auto max-w-7xl px-4">
      <div class="text-center mb-16">
        <h3 class="text-4xl md:text-5xl ${t.fontWeight} mb-4">${escapeHtml(getText("saas_pro_stats_headline", "Results That Speak for Themselves"))}</h3>
        <p class="text-lg text-gray-600 ${t.fontWeight}">${escapeHtml(getText("saas_pro_stats_subheadline", "Join thousands of businesses seeing improvements"))}</p>
      </div>
      <div class="grid md:grid-cols-4 gap-12">
        ${[1, 2, 3, 4].map(i => `
          <div class="text-center">
            <p class="text-5xl md:text-6xl ${t.fontWeight} mb-2">${escapeHtml(getText(`saas_pro_stat_${i}_number`, ["10K+", "99.9%", "4.9/5", "24/7"][i - 1]))}</p>
            <p class="text-gray-600 ${t.fontWeight} text-sm">${escapeHtml(getText(`saas_pro_stat_${i}_label`, ["Active Users", "Uptime SLA", "Customer Rating", "Support"][i - 1]))}</p>
          </div>
        `).join("")}
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="mx-auto max-w-7xl px-4 py-24 md:py-32">
    <div class="text-center mb-20">
      <p class="text-gray-500 ${t.fontWeight} text-xs uppercase tracking-widest mb-3">${escapeHtml(getText("saas_pro_testimonials_eyebrow", "Testimonials"))}</p>
      <h3 class="text-4xl md:text-6xl ${t.fontWeight}">${escapeHtml(getText("saas_pro_testimonials_headline", "Loved by Teams Everywhere"))}</h3>
    </div>
    <div class="grid md:grid-cols-3 gap-8">
      ${[1, 2, 3].map(n => `
        <div class="p-8 border ${t.cardBorder} ${t.cardBg}">
          <div class="flex items-center gap-1 mb-4 text-gray-400 text-sm">${escapeHtml(getText(`saas_pro_testimonial_${n}_rating`, "⭐⭐⭐⭐⭐"))}</div>
          <p class="text-base mb-6 leading-relaxed ${t.fontWeight}">${escapeHtml(getText(`saas_pro_testimonial_${n}_quote`, "Great product!"))}</p>
          <div class="flex items-center gap-3">
            <img src="${escapeHtml(getImage(`saas_pro_testimonial_${n}_avatar`, `/placeholder.svg?height=48&width=48&query=avatar%20${n}`))}" alt="Customer ${n}" class="w-12 h-12 rounded-full border ${t.cardBorder}" />
            <div>
              <p class="${t.fontWeight}">${escapeHtml(getText(`saas_pro_testimonial_${n}_name`, `Customer ${n}`))}</p>
              <p class="text-xs text-gray-500 ${t.fontWeight}">${escapeHtml(getText(`saas_pro_testimonial_${n}_title`, "Title"))}</p>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  </section>

  <!-- Pricing -->
  <section class="mx-auto max-w-7xl px-4 py-24 md:py-32 border-t ${t.cardBorder}">
    <div class="text-center mb-20">
      <p class="text-gray-500 ${t.fontWeight} text-xs uppercase tracking-widest mb-3">${escapeHtml(getText("saas_pro_pricing_eyebrow", "Pricing"))}</p>
      <h3 class="text-4xl md:text-6xl ${t.fontWeight} mb-4">${escapeHtml(getText("saas_pro_pricing_headline", "Simple, Transparent Pricing"))}</h3>
      <p class="text-lg text-gray-600 ${t.fontWeight}">${escapeHtml(getText("saas_pro_pricing_subheadline", "Choose the plan that fits your needs"))}</p>
    </div>
    <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      ${[1, 2, 3].map(i => `
        <div class="relative p-8 border ${i === 2 ? 'border-black bg-gray-50' : '' + t.cardBorder + ' ' + t.cardBg}">
          ${i === 2 ? `<div class="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-black text-white text-xs ${t.fontWeight}">${escapeHtml(getText(`saas_pro_pricing_${i}_badge`, "Most Popular"))}</div>` : ''}
          <p class="text-xl ${t.fontWeight} mb-2">${escapeHtml(getText(`saas_pro_pricing_${i}_name`, ["Starter", "Professional", "Enterprise"][i - 1]))}</p>
          <div class="mb-6">
            <span class="text-5xl ${t.fontWeight}">${escapeHtml(getText(`saas_pro_pricing_${i}_price`, ["$29", "$79", "$199"][i - 1]))}</span>
            <span class="text-gray-500 ${t.fontWeight} text-sm">${escapeHtml(getText(`saas_pro_pricing_${i}_period`, "/month"))}</span>
          </div>
          <p class="text-xs text-gray-600 mb-6 ${t.fontWeight}">${escapeHtml(getText(`saas_pro_pricing_${i}_description`, "Plan description"))}</p>
          <a href="${escapeHtml(getButton(`saas_pro_pricing_${i}_cta`).href)}" class="block w-full text-center rounded-md px-4 py-3 mb-6 ${i === 2 ? 'bg-black text-white hover:bg-gray-800 ' + t.fontWeight : 'bg-white text-black border ' + t.cardBorder + ' hover:bg-gray-50 ' + t.fontWeight}">${escapeHtml(getButton(`saas_pro_pricing_${i}_cta`).text)}</a>
          <div class="space-y-3">
            ${[1, 2, 3, 4, 5].map(f => `<div class="flex items-start gap-2"><span class="text-black mt-0.5">✓</span><p class="text-xs ${t.fontWeight}">${escapeHtml(getText(`saas_pro_pricing_${i}_feature_${f}`, `Feature ${f}`))}</p></div>`).join("")}
          </div>
        </div>
      `).join("")}
    </div>
  </section>

  <!-- CTA Section -->
  <section class="mx-auto max-w-7xl px-4 py-24 md:py-32">
    <div class="border ${t.cardBorder} p-16 text-center bg-gray-50">
      <h3 class="text-4xl md:text-6xl ${t.fontWeight} mb-4">${escapeHtml(getText("saas_pro_cta_headline", "Ready to Transform Your Workflow?"))}</h3>
      <p class="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto ${t.fontWeight}">${escapeHtml(getText("saas_pro_cta_subheadline", "Join over 10,000 teams who have made the switch"))}</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="${escapeHtml(getButton("saas_pro_cta_primary").href)}" class="inline-flex items-center justify-center rounded-md px-8 py-4 text-base ${t.primaryBtn}">${escapeHtml(getButton("saas_pro_cta_primary").text)}</a>
        <a href="${escapeHtml(getButton("saas_pro_cta_secondary").href)}" class="inline-flex items-center justify-center rounded-md px-8 py-4 text-base ${t.secondaryBtn}">${escapeHtml(getButton("saas_pro_cta_secondary").text)}</a>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t ${t.cardBorder} ${t.cardBg} py-12">
    <div class="mx-auto max-w-7xl px-4">
      <div class="grid md:grid-cols-5 gap-8 mb-8">
        <div class="md:col-span-2">
          <h5 class="text-lg ${t.fontWeight} mb-3">${escapeHtml(getText("saas_pro_footer_brand", "InnovatePro"))}</h5>
          <p class="text-xs text-gray-600 mb-4 max-w-xs ${t.fontWeight}">${escapeHtml(getText("saas_pro_footer_tagline", "Empowering businesses with intelligent automation"))}</p>
        </div>
        ${[1, 2, 3].map(col => `
          <div>
            <p class="${t.fontWeight} mb-3 text-sm">${escapeHtml(getText(`saas_pro_footer_col_${col}_title`, ["Product", "Company", "Support"][col - 1]))}</p>
            <div class="space-y-2">
              ${[1, 2, 3, 4].map(link => `<p class="text-xs text-gray-600 hover:text-black ${t.fontWeight} transition-colors">${escapeHtml(getText(`saas_pro_footer_col_${col}_link_${link}`, `Link ${link}`))}</p>`).join("")}
            </div>
          </div>
        `).join("")}
      </div>
      <div class="pt-8 border-t ${t.cardBorder} flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-xs text-gray-500 ${t.fontWeight}">${escapeHtml(getText("saas_pro_footer_copyright", "© 2025 InnovatePro. All rights reserved."))}</p>
        <div class="flex gap-6">
          ${[1, 2, 3].map(i => `<span class="text-xs text-gray-500 hover:text-black ${t.fontWeight} transition-colors">${escapeHtml(getText(`saas_pro_footer_legal_${i}`, ["Privacy", "Terms", "Cookies"][i - 1]))}</span>`).join("")}
        </div>
      </div>
    </div>
  </footer>
</main>
  `
}

function generatePortfolioProHTML(getText: GetText, getImage: GetImage, getButton: GetButton, theme?: string): string {
  // Portfolio Pro has its own theme system
  const t = getPortfolioProThemeStyles(theme || "default")

  return `
<main class="${t.mainBg} ${t.mainText}">
  <!-- Navigation -->
  <header class="sticky top-0 z-40 ${t.headerBg}">
    <div class="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
      <h1 class="text-xl font-bold ${t.headerText}">${escapeHtml(getText("portfolio_pro_brand", "Alex Morgan"))}</h1>
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium">
        ${[1, 2, 3, 4, 5].map(n => `<span>${escapeHtml(getText(`portfolio_pro_nav_${n}`, ["Work", "About", "Services", "Blog", "Contact"][n - 1]))}</span>`).join("")}
      </nav>
      <div class="flex items-center gap-3">
        <a href="${escapeHtml(getButton("portfolio_pro_nav_resume").href)}" class="hidden md:inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium ${t.secondaryBtn}">${escapeHtml(getButton("portfolio_pro_nav_resume").text)}</a>
        <a href="${escapeHtml(getButton("portfolio_pro_nav_cta").href)}" class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium ${t.primaryBtn}">${escapeHtml(getButton("portfolio_pro_nav_cta").text)}</a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="mx-auto max-w-7xl px-4 py-20 md:py-28">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <p class="text-lg font-medium opacity-70 mb-4">${escapeHtml(getText("portfolio_pro_hero_greeting", "Hello, I'm"))}</p>
        <h1 class="text-4xl md:text-6xl font-bold mb-6">${escapeHtml(getText("portfolio_pro_hero_title", "Alex Morgan"))}</h1>
        <p class="text-xl md:text-2xl opacity-80 mb-8">${escapeHtml(getText("portfolio_pro_hero_subtitle", "Creative Designer & Developer"))}</p>
        <p class="text-lg opacity-70 mb-8 leading-relaxed">${escapeHtml(getText("portfolio_pro_hero_description", "I craft beautiful digital experiences"))}</p>
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="${escapeHtml(getButton("portfolio_pro_hero_cta_primary").href)}" class="inline-flex items-center justify-center rounded-md px-8 py-3 ${t.primaryBtn}">${escapeHtml(getButton("portfolio_pro_hero_cta_primary").text)}</a>
          <a href="${escapeHtml(getButton("portfolio_pro_hero_cta_secondary").href)}" class="inline-flex items-center justify-center rounded-md px-8 py-3 ${t.secondaryBtn}">${escapeHtml(getButton("portfolio_pro_hero_cta_secondary").text)}</a>
        </div>
      </div>
      <div class="relative">
        <img src="${escapeHtml(getImage("portfolio_pro_hero_image", "/placeholder.svg?text=Portrait"))}" alt="Professional Portrait" class="w-full max-w-md mx-auto rounded-2xl shadow-2xl" />
      </div>
    </div>
  </section>

  <!-- Featured Work -->
  <section class="mx-auto max-w-7xl px-4 py-20">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">${escapeHtml(getText("portfolio_pro_work_title", "Featured Work"))}</h2>
      <p class="text-lg opacity-70 max-w-2xl mx-auto">${escapeHtml(getText("portfolio_pro_work_subtitle", "A selection of my recent projects"))}</p>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      ${[1, 2, 3].map(n => `
        <div class="group cursor-pointer">
          <div class="relative overflow-hidden rounded-xl mb-4">
            <img src="${escapeHtml(getImage(`portfolio_pro_project_${n}_image`, `/placeholder.svg?text=Project+${n}`))}" alt="Project ${n}" class="w-full h-64 object-cover" />
          </div>
          <h3 class="text-xl font-semibold mb-2">${escapeHtml(getText(`portfolio_pro_project_${n}_title`, `Project ${n}`))}</h3>
          <p class="opacity-70 mb-3">${escapeHtml(getText(`portfolio_pro_project_${n}_description`, "Project description"))}</p>
        </div>
      `).join("")}
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-opacity-20 py-12 bg-opacity-30">
    <div class="mx-auto max-w-7xl px-4 text-center">
      <p class="text-sm opacity-70">${escapeHtml(getText("portfolio_pro_footer_copyright", "© 2025 Alex Morgan. All rights reserved."))}</p>
    </div>
  </footer>
</main>
  `
}

function generateIPhoneProHTML(getText: GetText, getImage: GetImage, getButton: GetButton, theme?: string): string {
  // iPhone Pro templates have 6 premium themes
  // Theme IDs: "dark-gradient", "light-elegant", "neon-cyberpunk", "luxury-gold", "minimalist-tech", "vibrant-gradient"

  // Theme-specific styling
  let bgClass = 'bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white'
  let headerBg = 'border-white/10 bg-black/40'
  let titleClass = 'bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'
  let textHoverClass = 'hover:text-blue-400'
  let buttonClass = 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
  let buttonSecondary = 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
  let badgeClass = 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-blue-300'
  let heroTitleClass = 'bg-gradient-to-b from-white via-white to-gray-400 bg-clip-text text-transparent'
  let textColor = 'text-gray-300'
  let textMuted = 'text-gray-400'
  let cardBg = 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10'
  let accentColor = 'text-blue-400'
  let sectionBg = 'bg-gradient-to-b from-transparent to-slate-950/50'
  let isDark = true
  // Font and style specific
  let brandFontWeight = 'font-bold'
  let brandFontFamily = ''
  let badgeFontWeight = 'font-semibold'
  let badgeRounded = 'rounded-full'
  let buttonRounded = 'rounded-full'
  let buttonFontWeight = 'font-semibold'
  let buttonShadow = 'shadow-lg shadow-blue-500/30'
  let heroTitleFontWeight = 'font-black'
  let heroSubtitleFontWeight = ''
  let imageBorder = 'border border-white/10'
  let imageShadow = 'shadow-2xl shadow-blue-500/20'
  let imageRounded = 'rounded-3xl'
  let featureCardBgs = ['bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10', 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10', 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10']
  let featureCardRounded = 'rounded-2xl'
  let featureTitleColor = ''

  if (theme === 'vibrant-gradient') {
    bgClass = 'bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 text-gray-900'
    headerBg = 'border-white/50 bg-white/70'
    titleClass = 'bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent'
    textHoverClass = 'hover:text-purple-600'
    buttonClass = 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600'
    buttonSecondary = 'bg-white hover:bg-purple-50 text-purple-700 border-2 border-purple-300'
    badgeClass = 'bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-purple-300 text-purple-700'
    heroTitleClass = 'bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent'
    textColor = 'text-gray-700'
    textMuted = 'text-purple-700'
    cardBg = 'bg-gradient-to-br from-pink-100/50 via-purple-100/50 to-blue-100/50 border-2 border-purple-200'
    accentColor = 'text-purple-600'
    sectionBg = 'bg-white'
    isDark = false
    // Fonts & styles
    brandFontWeight = 'font-black'
    badgeFontWeight = 'font-bold'
    buttonFontWeight = 'font-bold'
    buttonShadow = 'shadow-lg shadow-purple-500/30'
    heroTitleFontWeight = 'font-black'
    heroSubtitleFontWeight = 'font-semibold'
    imageBorder = 'border-4 border-purple-200'
    imageShadow = 'shadow-2xl shadow-purple-500/20'
    imageRounded = 'rounded-3xl'
    featureCardBgs = [
      'bg-gradient-to-br from-yellow-200 to-yellow-300 shadow-xl shadow-yellow-300/30',
      'bg-gradient-to-br from-pink-200 to-pink-300 shadow-xl shadow-pink-300/30',
      'bg-gradient-to-br from-cyan-200 to-teal-300 shadow-xl shadow-cyan-300/30'
    ]
    featureCardRounded = 'rounded-3xl'
    featureTitleColor = 'text-gray-900'
  } else if (theme === 'light-elegant') {
    bgClass = 'bg-white text-gray-900'
    headerBg = 'border-gray-200 bg-white'
    titleClass = 'text-gray-900'
    textHoverClass = 'hover:text-blue-600'
    buttonClass = 'bg-blue-600 hover:bg-blue-700'
    buttonSecondary = 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300'
    badgeClass = 'bg-blue-50 border border-blue-200 text-blue-700'
    heroTitleClass = 'text-gray-900'
    textColor = 'text-gray-700'
    textMuted = 'text-gray-600'
    cardBg = 'bg-white border border-gray-200'
    accentColor = 'text-blue-600'
    sectionBg = 'bg-gray-50'
    isDark = false
    // Fonts & styles
    brandFontWeight = 'font-bold'
    badgeFontWeight = 'font-semibold'
    buttonFontWeight = 'font-semibold'
    buttonShadow = 'shadow-lg'
    heroTitleFontWeight = 'font-black'
    imageBorder = 'border border-gray-200'
    imageShadow = 'shadow-2xl'
    imageRounded = 'rounded-3xl'
  } else if (theme === 'neon-cyberpunk') {
    bgClass = 'bg-black text-white'
    headerBg = 'border-cyan-500/30 bg-black/90'
    titleClass = 'bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent'
    textHoverClass = 'hover:text-pink-500'
    buttonClass = 'bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-black border-2 border-cyan-400'
    buttonSecondary = 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border-2 border-cyan-400'
    badgeClass = 'bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border-2 border-cyan-400 text-cyan-300'
    heroTitleClass = 'bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent'
    textColor = 'text-gray-300'
    textMuted = 'text-cyan-400'
    cardBg = 'bg-gradient-to-br from-cyan-500/20 to-pink-500/20 border-2 border-cyan-400/50'
    accentColor = 'text-cyan-400'
    sectionBg = 'bg-gradient-to-b from-black via-purple-950/20 to-black'
    isDark = true
    // Fonts & styles
    brandFontWeight = 'font-black'
    badgeFontWeight = 'font-black'
    buttonFontWeight = 'font-black'
    buttonShadow = 'shadow-lg shadow-pink-500/50'
    buttonRounded = 'rounded-md'
    badgeRounded = 'rounded-md'
    heroTitleFontWeight = 'font-black'
    imageBorder = 'border-2 border-cyan-400/50'
    imageShadow = 'shadow-2xl shadow-cyan-500/30'
    imageRounded = 'rounded-2xl'
  } else if (theme === 'luxury-gold') {
    bgClass = 'bg-gradient-to-b from-amber-50 via-white to-amber-50 text-gray-900'
    headerBg = 'border-amber-200 bg-white/95'
    titleClass = 'bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent'
    textHoverClass = 'hover:text-amber-700'
    buttonClass = 'bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700'
    buttonSecondary = 'bg-white hover:bg-amber-50 text-amber-800 border-2 border-amber-300'
    badgeClass = 'bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 text-amber-800'
    heroTitleClass = 'bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 bg-clip-text text-transparent'
    textColor = 'text-gray-600'
    textMuted = 'text-amber-700'
    cardBg = 'bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200'
    accentColor = 'text-amber-700'
    sectionBg = 'bg-gradient-to-br from-amber-100/50 via-yellow-50/50 to-amber-100/50'
    isDark = false
    // Fonts & styles
    brandFontWeight = 'font-bold'
    brandFontFamily = 'font-serif'
    badgeFontWeight = 'font-semibold'
    buttonFontWeight = 'font-semibold'
    buttonShadow = 'shadow-lg shadow-amber-600/30'
    heroTitleFontWeight = 'font-black'
    heroSubtitleFontWeight = ''
    imageBorder = 'border-2 border-amber-200'
    imageShadow = 'shadow-2xl shadow-amber-500/20'
    imageRounded = 'rounded-3xl'
  } else if (theme === 'minimalist-tech') {
    bgClass = 'bg-white text-black'
    headerBg = 'border-black/10 bg-white'
    titleClass = 'text-black'
    textHoverClass = 'hover:opacity-60'
    buttonClass = 'bg-black hover:bg-black/80 text-white'
    buttonSecondary = 'bg-white hover:bg-black/5 text-black border-2 border-black/20'
    badgeClass = 'border border-black/20 text-black/60'
    heroTitleClass = 'text-black'
    textColor = 'text-black/60'
    textMuted = 'text-black/40'
    cardBg = 'bg-black/5 border border-black/10'
    accentColor = 'text-black'
    sectionBg = 'bg-black/5'
    isDark = false
    // Fonts & styles
    brandFontWeight = 'font-medium'
    badgeFontWeight = 'font-medium'
    buttonFontWeight = 'font-medium'
    buttonShadow = ''
    buttonRounded = 'rounded-none'
    badgeRounded = ''
    heroTitleFontWeight = 'font-light'
    heroSubtitleFontWeight = 'font-light'
    imageBorder = 'border border-black/10'
    imageShadow = 'shadow-xl'
    imageRounded = 'rounded-lg'
  }
  // dark-gradient is the default (already set above)

  return `
<main class="${bgClass}">
  <!-- Navigation -->
  <header class="border-b ${headerBg} backdrop-blur-xl sticky top-0 z-50">
    <div class="mx-auto max-w-7xl px-8 py-4 flex items-center justify-between">
      <h1 class="text-2xl ${brandFontWeight} ${brandFontFamily} ${titleClass}">${escapeHtml(getText("iphone_pro_brand", "iPhone Pro"))}</h1>
      <nav class="hidden md:flex items-center gap-10 text-sm font-medium">
        ${[0, 1, 2, 3].map(i => `<span class="${textHoverClass} transition-colors">${escapeHtml(getText(`iphone_pro_nav_${i}`, ["Overview", "Tech Specs", "Gallery", "Compare"][i]))}</span>`).join("")}
      </nav>
      <div class="flex items-center gap-4">
        <a href="${escapeHtml(getButton("iphone_pro_nav_preorder").href)}" class="${buttonClass} text-white px-6 py-2.5 ${buttonRounded} text-sm ${buttonFontWeight} ${buttonShadow}">${escapeHtml(getButton("iphone_pro_nav_preorder").text)}</a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="relative overflow-hidden py-24 md:py-32">
    ${isDark ? '<div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl"></div>' : ''}
    <div class="relative mx-auto max-w-7xl px-8 text-center">
      <div class="inline-flex items-center gap-2 px-4 py-2 ${badgeRounded} ${badgeClass} text-sm ${badgeFontWeight} mb-8 backdrop-blur-sm">
        ${escapeHtml(getText("iphone_pro_hero_badge", "✨ Introducing iPhone 15 Pro Max"))}
      </div>
      <h2 class="text-6xl md:text-8xl ${heroTitleFontWeight} mb-6 tracking-tighter ${heroTitleClass}">
        ${escapeHtml(getText("iphone_pro_hero_title", "Titanium. So strong. So light. So Pro."))}
      </h2>
      <p class="text-xl md:text-2xl ${textColor} ${heroSubtitleFontWeight} mb-10 max-w-4xl mx-auto leading-relaxed">
        ${escapeHtml(getText("iphone_pro_hero_subtitle", "Forged from aerospace-grade titanium with the most advanced camera system ever in an iPhone."))}
      </p>
      <div class="flex flex-col sm:flex-row gap-5 justify-center mb-8">
        <a href="${escapeHtml(getButton("iphone_pro_hero_cta_primary").href)}" class="${buttonClass} text-white px-10 py-4 ${buttonRounded} text-lg ${buttonFontWeight} ${buttonShadow} transform hover:scale-105 transition-all">${escapeHtml(getButton("iphone_pro_hero_cta_primary").text)}</a>
        <a href="${escapeHtml(getButton("iphone_pro_hero_cta_secondary").href)}" class="${buttonSecondary} px-10 py-4 ${buttonRounded} text-lg ${buttonFontWeight} backdrop-blur-sm transition-all">${escapeHtml(getButton("iphone_pro_hero_cta_secondary").text)}</a>
      </div>
      <div class="flex items-center justify-center gap-8 text-base ${textMuted}">
        <span class="font-medium">${escapeHtml(getText("iphone_pro_hero_price", "From $1,199"))}</span>
        <span class="${textMuted}">•</span>
        <span class="font-medium">${escapeHtml(getText("iphone_pro_hero_trade", "or $49.95/mo. for 24 mo."))}</span>
      </div>
    </div>
  </section>

  <!-- Product Showcase -->
  <section class="py-20 relative">
    <div class="mx-auto max-w-7xl px-8">
      <div class="relative ${imageRounded} overflow-hidden ${imageBorder} ${imageShadow}">
        <img src="${escapeHtml(getImage("iphone_pro_showcase_image", "/placeholder.svg?height=800&width=1400&query=iphone"))}" alt="iPhone Pro showcase" class="w-full h-auto" />
        ${isDark ? '<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>' : ''}
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="py-24 ${sectionBg}">
    <div class="mx-auto max-w-7xl px-8">
      <div class="text-center mb-20">
        <p class="${accentColor} font-bold text-sm uppercase tracking-widest mb-4">${escapeHtml(getText("iphone_pro_features_eyebrow", "Revolutionary Technology"))}</p>
        <h3 class="text-5xl md:text-6xl font-black mb-6 ${heroTitleClass}">${escapeHtml(getText("iphone_pro_features_title", "Engineered to perfection."))}</h3>
        <p class="text-xl ${textMuted} max-w-3xl mx-auto">${escapeHtml(getText("iphone_pro_features_subtitle", "Every detail meticulously crafted to deliver an unprecedented mobile experience."))}</p>
      </div>
      <div class="grid md:grid-cols-3 gap-8">
        ${[0, 1, 2].map(i => `
          <div class="relative p-8 ${featureCardRounded} ${featureCardBgs[i]} backdrop-blur-sm hover:scale-105 transition-transform duration-300">
            <div class="text-6xl mb-6">${escapeHtml(getText(`iphone_pro_feature_${i}_icon`, ["⚡", "📸", "🔋"][i]))}</div>
            <h4 class="text-2xl font-bold mb-4 ${featureTitleColor}">${escapeHtml(getText(`iphone_pro_feature_${i}_title`, ["A18 Pro Chip", "Pro Camera System", "All-Day Battery"][i]))}</h4>
            <p class="${textColor} leading-relaxed">${escapeHtml(getText(`iphone_pro_feature_${i}_desc`, "Feature description"))}</p>
          </div>
        `).join("")}
      </div>
    </div>
  </section>

  <!-- Camera Showcase -->
  <section class="py-24 ${isDark ? 'bg-slate-950/50' : 'bg-white'}">
    <div class="mx-auto max-w-7xl px-8">
      <div class="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p class="${isDark ? 'text-purple-400' : 'text-purple-600'} font-bold text-sm uppercase tracking-widest mb-4">${escapeHtml(getText("iphone_pro_camera_eyebrow", "Pro Camera System"))}</p>
          <h3 class="text-5xl md:text-6xl font-black mb-6">
            <span class="${isDark ? 'text-white' : 'text-gray-900'}">${escapeHtml(getText("iphone_pro_camera_title", "Shoot like a pro."))}</span>
          </h3>
          <p class="text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8 leading-relaxed">${escapeHtml(getText("iphone_pro_camera_desc", "The new 48MP Main camera captures super-high-resolution photos with incredible detail."))}</p>
          <ul class="space-y-4">
            ${[0, 1, 2, 3].map(i => `
              <li class="flex items-start gap-3">
                <span class="${isDark ? 'text-blue-400' : 'text-blue-600'} mt-1">✓</span>
                <span class="${isDark ? 'text-gray-300' : 'text-gray-600'}">${escapeHtml(getText(`iphone_pro_camera_feature_${i}`, `Camera feature ${i + 1}`))}</span>
              </li>
            `).join("")}
          </ul>
        </div>
        <div class="rounded-2xl overflow-hidden ${isDark ? 'border border-white/10' : 'border border-gray-200'} shadow-2xl">
          <img src="${escapeHtml(getImage("iphone_pro_camera_image", "/placeholder.svg?height=700&width=600&query=photography"))}" alt="Camera sample" class="w-full h-auto" />
        </div>
      </div>
    </div>
  </section>

  <!-- Tech Specs -->
  <section class="py-24">
    <div class="mx-auto max-w-7xl px-8">
      <h3 class="text-5xl md:text-6xl font-black mb-16 text-center">${escapeHtml(getText("iphone_pro_specs_title", "Technical excellence."))}</h3>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        ${[0, 1, 2, 3].map(i => `
          <div class="p-6 rounded-xl ${isDark ? 'bg-white/5 border border-white/10 hover:bg-white/10' : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'} backdrop-blur-sm text-center transition-colors">
            <p class="text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider mb-2">${escapeHtml(getText(`iphone_pro_spec_${i}_label`, ["Display", "Chip", "Storage", "5G"][i]))}</p>
            <p class="text-2xl font-bold mb-1">${escapeHtml(getText(`iphone_pro_spec_${i}_value`, ["6.7″ XDR", "A18 Pro", "Up to 1TB", "Superfast"][i]))}</p>
            <p class="text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}">${escapeHtml(getText(`iphone_pro_spec_${i}_detail`, "Detail"))}</p>
          </div>
        `).join("")}
      </div>
    </div>
  </section>

  <!-- Color Options -->
  <section class="py-24 ${isDark ? 'bg-gradient-to-b from-slate-950/50 to-black' : 'bg-gray-50'}">
    <div class="mx-auto max-w-7xl px-8 text-center">
      <h3 class="text-5xl md:text-6xl font-black mb-6">${escapeHtml(getText("iphone_pro_colors_title", "Four stunning finishes."))}</h3>
      <p class="text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-16">${escapeHtml(getText("iphone_pro_colors_subtitle", "Titanium design in Natural, Blue, White, and Black."))}</p>
      <div class="flex flex-wrap justify-center gap-6 mb-12">
        ${[0, 1, 2, 3].map(i => `
          <div class="text-center">
            <div class="w-20 h-20 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 mb-3 mx-auto ${isDark ? 'border-2 border-white/20' : 'border-2 border-gray-300'} shadow-xl"></div>
            <p class="text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}">${escapeHtml(getText(`iphone_pro_color_${i}`, ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"][i]))}</p>
          </div>
        `).join("")}
      </div>
    </div>
  </section>

  <!-- Final CTA -->
  <section class="py-24 relative overflow-hidden">
    ${isDark ? '<div class="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 blur-3xl"></div>' : ''}
    <div class="relative mx-auto max-w-5xl px-8 text-center">
      <h3 class="text-5xl md:text-7xl font-black mb-8 ${isDark ? 'bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent' : 'text-gray-900'}">${escapeHtml(getText("iphone_pro_cta_title", "The ultimate iPhone experience awaits."))}</h3>
      <p class="text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-10">${escapeHtml(getText("iphone_pro_cta_subtitle", "Pre-order now and be among the first to experience iPhone Pro."))}</p>
      <div class="flex flex-col sm:flex-row gap-5 justify-center">
        <a href="${escapeHtml(getButton("iphone_pro_cta_primary").href)}" class="${isDark ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : 'bg-blue-600 hover:bg-blue-700'} text-white px-12 py-5 rounded-full text-lg font-bold shadow-2xl transform hover:scale-105 transition-all">${escapeHtml(getButton("iphone_pro_cta_primary").text)}</a>
        <a href="${escapeHtml(getButton("iphone_pro_cta_secondary").href)}" class="${isDark ? 'bg-white/10 hover:bg-white/20 text-white border-2 border-white/30' : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-2 border-gray-300'} px-12 py-5 rounded-full text-lg font-semibold backdrop-blur-sm transition-all">${escapeHtml(getButton("iphone_pro_cta_secondary").text)}</a>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="${isDark ? 'border-t border-white/10 bg-black/60' : 'border-t border-gray-200 bg-gray-50'} backdrop-blur-xl">
    <div class="mx-auto max-w-7xl px-8 py-12">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        ${[1, 2, 3, 4].map(col => `
          <div>
            <p class="font-semibold mb-4">${escapeHtml(getText(`iphone_pro_footer_col${col}_title`, ["Shop", "Learn More", "Support", "Company"][col - 1]))}</p>
            <div class="space-y-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}">
              <p class="${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors">${escapeHtml(getText(`iphone_pro_footer_${["shop", "learn", "support", "company"][col - 1]}_1`, "Link 1"))}</p>
              <p class="${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors">${escapeHtml(getText(`iphone_pro_footer_${["shop", "learn", "support", "company"][col - 1]}_2`, "Link 2"))}</p>
            </div>
          </div>
        `).join("")}
      </div>
      <div class="pt-8 ${isDark ? 'border-t border-white/10' : 'border-t border-gray-200'} text-center text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}">
        <p>${escapeHtml(getText("iphone_pro_footer_copyright", "Copyright © 2025 Apple Inc. All rights reserved."))}</p>
      </div>
    </div>
  </footer>
</main>
  `
}

function generateLeadGenerationHTML(getText: GetText, getImage: GetImage, getButton: GetButton): string {
  return `
<main class="bg-background text-foreground">
  <header class="border-b border-border">
    <div class="mx-auto max-w-6xl px-4 py-5 flex items-center justify-between">
      <h1 class="text-xl font-semibold">${escapeHtml(getText("lg-brand", "LeadFlow Pro"))}</h1>
      <nav class="hidden md:flex items-center gap-6 text-sm">
        ${[0, 1, 2].map((i) => `<span>${escapeHtml(getText(`lg-nav-${i}`, ["Features", "Benefits", "Testimonials"][i]))}</span>`).join("")}
      </nav>
    </div>
  </header>

  <section class="mx-auto max-w-6xl px-4 py-16">
    <div class="grid gap-10 md:grid-cols-2 items-center">
      <div class="flex flex-col gap-6">
        <h2 class="text-4xl md:text-5xl font-bold text-balance">${escapeHtml(getText("lg-hero-title", "Get Your Free Marketing Strategy Guide"))}</h2>
        <p class="text-lg text-muted-foreground leading-relaxed">${escapeHtml(getText("lg-hero-subtitle", "Download our comprehensive 50-page guide and learn proven strategies to grow your business by 300% in 12 months."))}</p>
      </div>
      <div class="rounded-xl border border-border p-8 bg-card shadow-lg">
        <h3 class="text-2xl font-semibold mb-6">${escapeHtml(getText("lg-form-title", "Download Your Free Guide"))}</h3>
        <form class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">${escapeHtml(getText("lg-form-label-name", "Full Name"))}</label>
            <input type="text" placeholder="John Doe" class="w-full px-4 py-2 rounded-md border border-input bg-background" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">${escapeHtml(getText("lg-form-label-email", "Email Address"))}</label>
            <input type="email" placeholder="john@example.com" class="w-full px-4 py-2 rounded-md border border-input bg-background" />
          </div>
          <a href="${escapeHtml(getButton("lg-form-submit").href)}" class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground w-full">${escapeHtml(getButton("lg-form-submit").text)}</a>
          <p class="text-xs text-muted-foreground text-center">${escapeHtml(getText("lg-form-privacy", "We respect your privacy. Unsubscribe at any time."))}</p>
        </form>
      </div>
    </div>
  </section>

  <section class="bg-card border-y border-border">
    <div class="mx-auto max-w-6xl px-4 py-12">
      <h4 class="text-center text-sm text-muted-foreground mb-8">${escapeHtml(getText("lg-social-title", "Trusted by over 10,000 businesses worldwide"))}</h4>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center">
        ${[1, 2, 3, 4].map((n) => `<img src="${escapeHtml(getImage(`lg-logo-${n}`, `/placeholder.svg?height=40&width=140&query=company%20logo%20${n}`))}" alt="Company ${n}" class="mx-auto h-10 w-auto opacity-70" />`).join("")}
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-4 py-16">
    <h3 class="text-3xl font-bold mb-10 text-center">${escapeHtml(getText("lg-learn-title", "What You'll Learn Inside"))}</h3>
    <div class="grid gap-6 md:grid-cols-3">
      ${[0, 1, 2].map((i) => `
        <article class="rounded-lg border border-border p-6 bg-card">
          <img src="${escapeHtml(getImage(`lg-learn-icon-${i}`, `/placeholder.svg?height=48&width=48&query=icon%20${i + 1}`))}" alt="Feature ${i + 1}" class="h-12 w-12 mb-4" />
          <h4 class="text-xl font-semibold mb-3">${escapeHtml(getText(`lg-learn-heading-${i}`, `Chapter ${i + 1}: Key Strategy`))}</h4>
          <p class="text-muted-foreground">${escapeHtml(getText(`lg-learn-desc-${i}`, "Discover proven tactics and actionable insights."))}</p>
        </article>
      `).join("")}
    </div>
  </section>

  <section class="bg-primary text-primary-foreground">
    <div class="mx-auto max-w-4xl px-4 py-16 text-center">
      <h3 class="text-3xl md:text-4xl font-bold mb-4">${escapeHtml(getText("lg-cta-title", "Ready to Transform Your Marketing?"))}</h3>
      <p class="text-lg mb-8 opacity-90">${escapeHtml(getText("lg-cta-subtitle", "Join thousands of marketers who have already downloaded this guide"))}</p>
      <a href="${escapeHtml(getButton("lg-cta-button").href)}" class="inline-flex items-center justify-center rounded-md bg-background text-foreground px-6 py-3 text-sm font-medium hover:opacity-90">${escapeHtml(getButton("lg-cta-button").text)}</a>
    </div>
  </section>

  <footer class="border-t border-border">
    <div class="mx-auto max-w-6xl px-4 py-8 text-center">
      <p class="text-sm text-muted-foreground">${escapeHtml(getText("lg-footer", "© 2025 LeadFlow Pro. All rights reserved."))}</p>
    </div>
  </footer>
</main>
  `
}

function generateClickThroughHTML(getText: GetText, getImage: GetImage, getButton: GetButton): string {
  return `
<main class="bg-background text-foreground">
  <header class="border-b border-border">
    <div class="mx-auto max-w-6xl px-4 py-5 flex items-center justify-between">
      <h1 class="text-xl font-semibold">${escapeHtml(getText("ct-brand", "CloudSync Pro"))}</h1>
      <a href="${escapeHtml(getButton("ct-header-cta").href)}" class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">${escapeHtml(getButton("ct-header-cta").text)}</a>
    </div>
  </header>

  <section class="mx-auto max-w-6xl px-4 py-20">
    <div class="text-center max-w-4xl mx-auto">
      <span class="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">${escapeHtml(getText("ct-hero-badge", "🚀 New: AI-Powered Sync Technology"))}</span>
      <h2 class="text-4xl md:text-6xl font-bold mb-6 text-balance">${escapeHtml(getText("ct-hero-title", "Sync Your Files Across All Devices Instantly"))}</h2>
      <p class="text-xl text-muted-foreground mb-8 text-balance">${escapeHtml(getText("ct-hero-subtitle", "Experience lightning-fast file synchronization with military-grade encryption."))}</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <a href="${escapeHtml(getButton("ct-hero-cta-primary").href)}" class="inline-flex items-center justify-center rounded-md bg-primary px-8 py-6 text-lg font-medium text-primary-foreground">${escapeHtml(getButton("ct-hero-cta-primary").text)}</a>
        <a href="${escapeHtml(getButton("ct-hero-cta-secondary").href)}" class="inline-flex items-center justify-center rounded-md bg-secondary px-8 py-6 text-lg font-medium text-secondary-foreground">${escapeHtml(getButton("ct-hero-cta-secondary").text)}</a>
      </div>
      <p class="text-sm text-muted-foreground">${escapeHtml(getText("ct-hero-note", "No credit card required • Cancel anytime • 5GB free storage"))}</p>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-4 py-12">
    <img src="${escapeHtml(getImage("ct-product-preview", "/placeholder.svg?height=600&width=1200&query=dashboard%20preview"))}" alt="Product Dashboard" class="w-full rounded-xl border border-border shadow-2xl" />
  </section>

  <section class="mx-auto max-w-6xl px-4 py-16">
    <h3 class="text-3xl font-bold mb-12 text-center">${escapeHtml(getText("ct-features-title", "Everything You Need in One Platform"))}</h3>
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      ${[0, 1, 2, 3].map((i) => `
        <article class="text-center">
          <img src="${escapeHtml(getImage(`ct-feature-icon-${i}`, `/placeholder.svg?height=64&width=64&query=feature%20icon%20${i + 1}`))}" alt="Feature ${i + 1}" class="h-16 w-16 mx-auto mb-4" />
          <h4 class="text-lg font-semibold mb-2">${escapeHtml(getText(`ct-feature-title-${i}`, `Feature ${i + 1}`))}</h4>
          <p class="text-sm text-muted-foreground">${escapeHtml(getText(`ct-feature-desc-${i}`, "Brief description of this powerful feature."))}</p>
        </article>
      `).join("")}
    </div>
  </section>

  <section class="bg-card border-y border-border">
    <div class="mx-auto max-w-6xl px-4 py-16">
      <h3 class="text-3xl font-bold mb-12 text-center">${escapeHtml(getText("ct-how-title", "Get Started in 3 Simple Steps"))}</h3>
      <div class="grid gap-8 md:grid-cols-3">
        ${[1, 2, 3].map((n) => `
          <article class="text-center">
            <div class="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4 mx-auto">${n}</div>
            <h4 class="text-xl font-semibold mb-3">${escapeHtml(getText(`ct-step-title-${n}`, `Step ${n} Title`))}</h4>
            <p class="text-muted-foreground">${escapeHtml(getText(`ct-step-desc-${n}`, "Clear explanation of what happens in this step."))}</p>
          </article>
        `).join("")}
      </div>
    </div>
  </section>

  <section class="bg-primary text-primary-foreground">
    <div class="mx-auto max-w-4xl px-4 py-20 text-center">
      <h3 class="text-4xl font-bold mb-6">${escapeHtml(getText("ct-final-title", "Ready to Experience the Difference?"))}</h3>
      <p class="text-xl mb-8 opacity-90">${escapeHtml(getText("ct-final-subtitle", "Join over 100,000 users who trust CloudSync Pro"))}</p>
      <a href="${escapeHtml(getButton("ct-final-cta").href)}" class="inline-flex items-center justify-center rounded-md bg-background text-foreground px-10 py-6 text-lg font-medium hover:opacity-90">${escapeHtml(getButton("ct-final-cta").text)}</a>
    </div>
  </section>

  <footer class="border-t border-border">
    <div class="mx-auto max-w-6xl px-4 py-8 text-center">
      <p class="text-sm text-muted-foreground">${escapeHtml(getText("ct-footer", "© 2025 CloudSync Pro. All rights reserved."))}</p>
    </div>
  </footer>
</main>
  `
}

function generateSalesLandingHTML(getText: GetText, getImage: GetImage, getButton: GetButton): string {
  return `
<main class="bg-background text-foreground">
  <header class="border-b border-border">
    <div class="mx-auto max-w-6xl px-4 py-5 flex items-center justify-between">
      <h1 class="text-xl font-semibold">${escapeHtml(getText("sl-brand", "ProFitness Elite"))}</h1>
      <div class="flex items-center gap-4">
        <span class="hidden md:block text-sm font-medium">${escapeHtml(getText("sl-phone", "📞 1-800-FIT-ELITE"))}</span>
        <a href="${escapeHtml(getButton("sl-header-cta").href)}" class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">${escapeHtml(getButton("sl-header-cta").text)}</a>
      </div>
    </div>
  </header>

  <section class="bg-gradient-to-br from-primary/10 to-primary/5">
    <div class="mx-auto max-w-6xl px-4 py-16">
      <div class="grid gap-10 md:grid-cols-2 items-center">
        <div class="flex flex-col gap-6">
          <span class="inline-block w-fit px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold">${escapeHtml(getText("sl-hero-badge", "LIMITED TIME: 50% OFF + FREE SHIPPING"))}</span>
          <h2 class="text-4xl md:text-5xl font-bold text-balance">${escapeHtml(getText("sl-hero-title", "Transform Your Body in Just 30 Days"))}</h2>
          <p class="text-lg text-muted-foreground leading-relaxed">${escapeHtml(getText("sl-hero-subtitle", "The complete home fitness system that delivers professional gym results."))}</p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a href="${escapeHtml(getButton("sl-hero-cta").href)}" class="inline-flex items-center justify-center rounded-md bg-primary px-8 py-6 text-lg font-medium text-primary-foreground">${escapeHtml(getButton("sl-hero-cta").text)}</a>
            <div class="flex flex-col justify-center">
              <p class="text-sm text-muted-foreground line-through">${escapeHtml(getText("sl-price-strike", "Was $199"))}</p>
              <p class="text-2xl font-bold text-primary">${escapeHtml(getText("sl-price-now", "Now $99"))}</p>
            </div>
          </div>
        </div>
        <img src="${escapeHtml(getImage("sl-hero-image", "/placeholder.svg?height=600&width=600&query=fitness%20product"))}" alt="Product" class="w-full rounded-lg shadow-2xl" />
      </div>
    </div>
  </section>

  <section class="bg-primary text-primary-foreground">
    <div class="mx-auto max-w-6xl px-4 py-4 text-center">
      <p class="font-semibold">${escapeHtml(getText("sl-urgency", "⏰ HURRY! Offer ends in 24 hours. Only 47 spots left at this price!"))}</p>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-4 py-16">
    <h3 class="text-3xl font-bold mb-8 text-center">${escapeHtml(getText("sl-problem-title", "Tired of Expensive Gyms That Don't Deliver Results?"))}</h3>
    <div class="grid gap-6 md:grid-cols-3">
      ${[0, 1, 2].map((i) => `
        <article class="rounded-lg border border-primary/20 p-6 bg-primary/5">
          <h4 class="text-xl font-semibold mb-3 text-primary">${escapeHtml(getText(`sl-solution-${i}`, `✓ Solution ${i + 1}`))}</h4>
          <p class="text-muted-foreground">${escapeHtml(getText(`sl-solution-desc-${i}`, "How your product specifically addresses and solves this problem."))}</p>
        </article>
      `).join("")}
    </div>
  </section>

  <section class="bg-card border-y border-border">
    <div class="mx-auto max-w-6xl px-4 py-16">
      <h3 class="text-3xl font-bold mb-12 text-center">${escapeHtml(getText("sl-results-title", "Real People, Real Results"))}</h3>
      <div class="grid gap-8 md:grid-cols-3">
        ${[1, 2, 3].map((n) => `
          <article class="rounded-lg border border-border p-6 bg-background">
            <img src="${escapeHtml(getImage(`sl-result-before-after-${n}`, `/placeholder.svg?height=300&width=400&query=before%20after%20${n}`))}" alt="Result ${n}" class="w-full rounded-lg mb-4" />
            <div class="flex items-center gap-3 mb-3">
              <img src="${escapeHtml(getImage(`sl-result-avatar-${n}`, `/placeholder.svg?height=48&width=48&query=avatar%20${n}`))}" alt="Customer ${n}" class="h-12 w-12 rounded-full" />
              <div>
                <p class="font-semibold">${escapeHtml(getText(`sl-result-name-${n}`, "Sarah M."))}</p>
                <p class="text-sm text-primary font-medium">${escapeHtml(getText(`sl-result-stat-${n}`, "Lost 25 lbs in 30 days"))}</p>
              </div>
            </div>
            <blockquote class="text-sm text-pretty">${escapeHtml(getText(`sl-result-quote-${n}`, "I couldn't believe the results! This program changed my life."))}</blockquote>
          </article>
        `).join("")}
      </div>
    </div>
  </section>

  <section class="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
    <div class="mx-auto max-w-4xl px-4 py-20 text-center">
      <h3 class="text-4xl md:text-5xl font-bold mb-6">${escapeHtml(getText("sl-final-title", "Don't Miss This Limited-Time Offer!"))}</h3>
      <p class="text-xl mb-8 opacity-90">${escapeHtml(getText("sl-final-subtitle", "Get 50% OFF + Free Shipping + Bonus Coaching Session"))}</p>
      <div class="bg-background/10 rounded-xl p-8 mb-8 backdrop-blur-sm">
        <div class="flex justify-center items-baseline gap-4 mb-4">
          <span class="text-2xl line-through opacity-70">${escapeHtml(getText("sl-final-price-was", "$199"))}</span>
          <span class="text-6xl font-bold">${escapeHtml(getText("sl-final-price-now", "$99"))}</span>
        </div>
        <p class="text-lg font-semibold">${escapeHtml(getText("sl-final-savings", "You Save $100 Today!"))}</p>
      </div>
      <a href="${escapeHtml(getButton("sl-final-cta").href)}" class="inline-flex items-center justify-center rounded-md bg-background text-foreground px-12 py-8 text-xl font-medium hover:opacity-90">${escapeHtml(getButton("sl-final-cta").text)}</a>
    </div>
  </section>

  <footer class="border-t border-border">
    <div class="mx-auto max-w-6xl px-4 py-8 text-center">
      <p class="text-sm text-muted-foreground">${escapeHtml(getText("sl-footer", "© 2025 ProFitness Elite. All rights reserved."))}</p>
    </div>
  </footer>
</main>
  `
}

function generateIndoorSkydivingHTML(getText: GetText, getImage: GetImage, getButton: GetButton): string {
  return `
<main class="bg-white text-gray-900">
  <header class="bg-[#003366] text-white sticky top-0 z-50">
    <div class="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <img src="${escapeHtml(getImage("sky_logo", "/placeholder.svg?height=40&width=40&query=skydiving%20logo"))}" alt="Logo" class="w-10 h-10" />
        <h1 class="text-lg font-bold">${escapeHtml(getText("sky_brand", "iFLY Indoor Skydiving"))}</h1>
      </div>
      <a href="${escapeHtml(getButton("sky_nav_cta").href)}" class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 text-sm font-medium rounded">${escapeHtml(getButton("sky_nav_cta").text)}</a>
    </div>
  </header>

  <section class="relative bg-gradient-to-br from-orange-400 via-orange-300 to-yellow-200 py-20 overflow-hidden">
    <div class="mx-auto max-w-7xl px-6 relative z-10">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="relative">
          <img src="${escapeHtml(getImage("sky_hero_image", "/placeholder.svg?height=600&width=500&query=indoor%20skydiving%20person"))}" alt="Indoor skydiving" class="w-full h-auto rounded-lg shadow-2xl" />
        </div>
        <div>
          <h2 class="text-5xl md:text-7xl font-black mb-6 leading-tight text-[#003366]">${escapeHtml(getText("sky_hero_title", "FEEL THE RUSH"))}</h2>
          <p class="text-xl text-gray-800 mb-4">${escapeHtml(getText("sky_hero_subtitle", "With Indoor Skydiving from £39.99"))}</p>
          <p class="text-2xl font-bold text-[#003366] mb-8">${escapeHtml(getText("sky_hero_price", "Was £49.99 | Now £39.99"))}</p>
          <a href="${escapeHtml(getButton("sky_hero_cta").href)}" class="inline-block bg-red-600 hover:bg-red-700 text-white px-10 py-4 text-lg font-bold rounded-full shadow-lg">${escapeHtml(getButton("sky_hero_cta").text)}</a>
        </div>
      </div>
    </div>
  </section>

  <section class="py-16 bg-gray-50">
    <div class="mx-auto max-w-4xl px-6 text-center">
      <p class="text-2xl md:text-3xl text-gray-700 italic mb-6">${escapeHtml(getText("sky_testimonial_quote", "The flying experience at Paramount Skydiving is one of the world's most exhilarating and adrenaline-filled activities!"))}</p>
      <div class="flex items-center justify-center gap-4">
        <img src="${escapeHtml(getImage("sky_testimonial_avatar", "/placeholder.svg?height=60&width=60&query=person%20avatar"))}" alt="Customer" class="w-16 h-16 rounded-full" />
        <div class="text-left">
          <p class="font-bold text-gray-900">${escapeHtml(getText("sky_testimonial_name", "Sarah Johnson"))}</p>
          <p class="text-sm text-gray-600">${escapeHtml(getText("sky_testimonial_role", "First-time Flyer"))}</p>
        </div>
      </div>
      <div class="flex justify-center gap-1 mt-4">
        <span class="text-yellow-400 text-2xl">★★★★★</span>
      </div>
    </div>
  </section>

  <section class="py-20 bg-white">
    <div class="mx-auto max-w-7xl px-6">
      <div class="grid md:grid-cols-4 gap-8">
        ${[0, 1, 2, 3].map((i) => `
          <div class="text-center">
            <div class="mb-4">
              <div class="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <img src="${escapeHtml(getImage(`sky_feature_${i}_icon`, `/placeholder.svg?height=80&width=80&query=feature%20${i + 1}`))}" alt="Feature ${i + 1}" class="w-16 h-16 rounded-full" />
              </div>
            </div>
            <h4 class="text-lg font-bold mb-2 text-[#003366]">${escapeHtml(getText(`sky_feature_${i}_title`, `Feature ${i + 1}`))}</h4>
            <p class="text-sm text-gray-600">${escapeHtml(getText(`sky_feature_${i}_desc`, "Feature description"))}</p>
          </div>
        `).join("")}
      </div>
    </div>
  </section>

  <section class="bg-[#003366] py-20">
    <div class="mx-auto max-w-6xl px-6">
      <div class="relative aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
        <img src="${escapeHtml(getImage("sky_video_thumbnail", "/placeholder.svg?height=600&width=1000&query=indoor%20skydiving%20tunnel"))}" alt="Video" class="w-full h-full object-cover" />
      </div>
    </div>
  </section>

  <section class="py-16 bg-gradient-to-r from-blue-900 to-[#003366] text-white">
    <div class="mx-auto max-w-7xl px-6">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img src="${escapeHtml(getImage("sky_stats_image", "/placeholder.svg?height=400&width=600&query=happy%20customers"))}" alt="Happy customers" class="w-full h-auto rounded-lg" />
        </div>
        <div>
          <h3 class="text-3xl md:text-4xl font-bold mb-8">${escapeHtml(getText("sky_stats_title", "We attract over 100,000 visitors per year from all over the world."))}</h3>
          <div class="grid grid-cols-3 gap-6">
            ${[0, 1, 2].map((i) => `
              <div class="text-center">
                <p class="text-4xl font-bold mb-2">${escapeHtml(getText(`sky_stat_${i}_value`, "4.5"))}</p>
                <div class="flex justify-center gap-1 mb-2">
                  <span class="text-yellow-400 text-sm">★★★★★</span>
                </div>
                <p class="text-sm text-blue-200">${escapeHtml(getText(`sky_stat_${i}_label`, "Rating"))}</p>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="py-20 bg-gray-50">
    <div class="mx-auto max-w-7xl px-6">
      <div class="text-center mb-12">
        <p class="text-sm font-semibold text-red-600 mb-2 uppercase tracking-wide">${escapeHtml(getText("sky_packages_eyebrow", "Standard Packages"))}</p>
        <h3 class="text-4xl md:text-5xl font-bold text-[#003366]">${escapeHtml(getText("sky_packages_title", "Choose Your Experience"))}</h3>
      </div>

      <div class="bg-gradient-to-r from-blue-900 to-[#003366] text-white py-6 px-8 rounded-lg mb-12 text-center">
        <p class="text-2xl font-bold">${escapeHtml(getText("sky_discount_text", "Get 15% Off With Discount Code: FDIVE15"))}</p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        ${["2flight", "4flight", "friend"].map((pkg) => `
          <article class="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200">
            <div class="relative">
              <img src="${escapeHtml(getImage(`sky_pkg_${pkg}_image`, `/placeholder.svg?height=200&width=400&query=${pkg}`))}" alt="Package" class="w-full h-48 object-cover" />
              <div class="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                ⭐ ${escapeHtml(getText(`sky_pkg_${pkg}_badge`, "Popular"))}
              </div>
            </div>
            <div class="p-6">
              <h4 class="text-xl font-bold mb-4 text-[#003366]">${escapeHtml(getText(`sky_pkg_${pkg}_title`, "Package"))}</h4>
              <div class="mb-4">
                <div class="flex items-baseline gap-2">
                  <span class="text-3xl font-bold text-red-600">${escapeHtml(getText(`sky_pkg_${pkg}_price`, "£99"))}</span>
                  <span class="text-lg text-gray-500 line-through">${escapeHtml(getText(`sky_pkg_${pkg}_original`, "£120"))}</span>
                </div>
              </div>
              <ul class="space-y-2 mb-6">
                ${[0, 1, 2, 3].map((i) => `
                  <li class="flex items-start gap-2 text-sm text-gray-600">
                    <span class="text-green-600 mt-0.5">✓</span>
                    <span>${escapeHtml(getText(`sky_pkg_${pkg}_feat_${i}`, "Feature"))}</span>
                  </li>
                `).join("")}
              </ul>
              <a href="${escapeHtml(getButton(`sky_pkg_${pkg}_cta`).href)}" class="block w-full bg-red-600 hover:bg-red-700 text-white py-3 font-bold rounded text-center">${escapeHtml(getButton(`sky_pkg_${pkg}_cta`).text)}</a>
            </div>
          </article>
        `).join("")}
      </div>
    </div>
  </section>

  <footer class="bg-[#003366] text-white py-12">
    <div class="mx-auto max-w-7xl px-6">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <h4 class="text-xl font-bold mb-4">${escapeHtml(getText("sky_footer_brand", "iFLY Indoor Skydiving"))}</h4>
          <p class="text-blue-200 text-sm">${escapeHtml(getText("sky_footer_tagline", "Experience the thrill of flight"))}</p>
        </div>
        <div>
          <h5 class="font-semibold mb-4">${escapeHtml(getText("sky_footer_experiences_title", "Experiences"))}</h5>
          <div class="space-y-2 text-sm text-blue-200">
            ${[0, 1, 2, 3].map((i) => `
              <p>${escapeHtml(getText(`sky_footer_exp_${i}`, "Experience"))}</p>
            `).join("")}
          </div>
        </div>
        <div>
          <h5 class="font-semibold mb-4">${escapeHtml(getText("sky_footer_info_title", "Information"))}</h5>
          <div class="space-y-2 text-sm text-blue-200">
            ${[0, 1, 2, 3].map((i) => `
              <p>${escapeHtml(getText(`sky_footer_info_${i}`, "Info"))}</p>
            `).join("")}
          </div>
        </div>
        <div>
          <h5 class="font-semibold mb-4">${escapeHtml(getText("sky_footer_contact_title", "Contact Us"))}</h5>
          <div class="space-y-2 text-sm text-blue-200">
            <p>${escapeHtml(getText("sky_footer_phone", "📞 0800 000 0000"))}</p>
            <p>${escapeHtml(getText("sky_footer_email", "✉️ info@ifly.com"))}</p>
            <p>${escapeHtml(getText("sky_footer_address", "📍 123 Flight Street, London"))}</p>
          </div>
        </div>
      </div>
      <div class="border-t border-blue-800 pt-8 text-center text-sm text-blue-200">
        <p>${escapeHtml(getText("sky_footer_copyright", "© 2025 iFLY Indoor Skydiving. All rights reserved."))}</p>
      </div>
    </div>
  </footer>
</main>
  `
}

function generateGenericHTML(getText: GetText, getImage: GetImage, getButton: GetButton, title: string): string {
  return `
<main class="bg-background text-foreground min-h-screen p-8">
  <div class="mx-auto max-w-4xl">
    <h1 class="text-4xl font-bold mb-8">${escapeHtml(title)}</h1>
    <p class="text-muted-foreground">This is a generic export. The template type was not recognized.</p>
  </div>
</main>
  `
}

/**
 * Downloads the HTML as a file
 */
export function downloadHTML(html: string, filename: string) {
  const blob = new Blob([html], { type: "text/html" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename.endsWith(".html") ? filename : `${filename}.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
