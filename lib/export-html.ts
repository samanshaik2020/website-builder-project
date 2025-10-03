"use client"

import type { ProjectRecord } from "@/components/lib/projects-store"

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
    case "saas-pro":
      html = generateSaaSProHTML(getText, getImage, getButton, theme)
      break
    case "portfolio-pro":
      html = generatePortfolioProHTML(getText, getImage, getButton, theme)
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
function getThemeStyles(theme: string) {
  const themes: Record<string, any> = {
    "modern-minimal": {
      mainBg: "bg-white",
      mainText: "text-gray-900",
      headerBg: "bg-white/95 backdrop-blur border-b border-gray-200",
      headerText: "text-gray-900",
      heroBg: "bg-white",
      primaryBtn: "bg-gray-900 text-white hover:bg-gray-800",
      secondaryBtn: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    },
    "corporate-blue": {
      mainBg: "bg-slate-50",
      mainText: "text-slate-900",
      headerBg: "bg-white shadow-md border-b-2 border-blue-600",
      headerText: "text-blue-900",
      heroBg: "bg-gradient-to-br from-blue-50 to-slate-100",
      primaryBtn: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg",
      secondaryBtn: "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50",
    },
    "vibrant-playful": {
      mainBg: "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50",
      mainText: "text-gray-900",
      headerBg: "bg-white/90 backdrop-blur-lg border-b-2 border-purple-300 shadow-lg",
      headerText: "text-purple-900",
      heroBg: "bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100",
      primaryBtn: "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 shadow-xl",
      secondaryBtn: "bg-white text-purple-600 border-2 border-purple-400 hover:bg-purple-50",
    },
    "elegant-dark": {
      mainBg: "bg-gray-900",
      mainText: "text-gray-100",
      headerBg: "bg-black/90 backdrop-blur border-b border-gray-800",
      headerText: "text-white",
      heroBg: "bg-gradient-to-br from-gray-900 via-gray-800 to-black",
      primaryBtn: "bg-white text-black hover:bg-gray-200",
      secondaryBtn: "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700",
    },
    "creative-bold": {
      mainBg: "bg-black",
      mainText: "text-white",
      headerBg: "bg-black border-b-4 border-yellow-400",
      headerText: "text-white",
      heroBg: "bg-gradient-to-br from-black via-gray-900 to-black",
      primaryBtn: "bg-yellow-400 text-black hover:bg-yellow-500 font-bold shadow-2xl",
      secondaryBtn: "bg-transparent text-yellow-400 border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black",
    },
    "nature-calm": {
      mainBg: "bg-green-50",
      mainText: "text-green-900",
      headerBg: "bg-white/95 backdrop-blur border-b border-green-200 shadow-sm",
      headerText: "text-green-900",
      heroBg: "bg-gradient-to-br from-green-50 to-teal-50",
      primaryBtn: "bg-green-600 text-white hover:bg-green-700 shadow-lg",
      secondaryBtn: "bg-white text-green-600 border-2 border-green-500 hover:bg-green-50",
    },
  }
  
  return themes[theme] || themes["modern-minimal"]
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
  const t = getThemeStyles(theme || "modern-minimal")
  
  return `
<main class="${t.mainBg} ${t.mainText}">
  <!-- Navigation -->
  <header class="sticky top-0 z-40 ${t.headerBg}">
    <div class="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
      <h1 class="text-xl font-bold ${t.headerText}">${escapeHtml(getText("saas_pro_brand", "InnovatePro"))}</h1>
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium">
        ${[1,2,3,4,5].map(n => `<span>${escapeHtml(getText(`saas_pro_nav_${n}`, ["Features","Solutions","Pricing","Resources","Company"][n-1]))}</span>`).join("")}
      </nav>
      <div class="flex items-center gap-3">
        <a href="${escapeHtml(getButton("saas_pro_nav_signin").href)}" class="hidden md:inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium ${t.secondaryBtn}">${escapeHtml(getButton("saas_pro_nav_signin").text)}</a>
        <a href="${escapeHtml(getButton("saas_pro_nav_cta").href)}" class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium ${t.primaryBtn}">${escapeHtml(getButton("saas_pro_nav_cta").text)}</a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="mx-auto max-w-7xl px-4 py-20 md:py-28 ${t.heroBg}">
    <div class="text-center max-w-4xl mx-auto">
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-opacity-20 ${t.primaryBtn} text-sm font-medium mb-6">${escapeHtml(getText("saas_pro_hero_badge", "✨ New: AI-Powered Analytics Dashboard"))}</div>
      <h2 class="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">${escapeHtml(getText("saas_pro_hero_headline", "Transform Your Business with Intelligent Automation"))}</h2>
      <p class="text-lg md:text-xl opacity-80 mb-8 leading-relaxed max-w-3xl mx-auto">${escapeHtml(getText("saas_pro_hero_subheadline", "Streamline operations, boost productivity, and scale effortlessly"))}</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-6">
        <a href="${escapeHtml(getButton("saas_pro_hero_cta_primary").href)}" class="inline-flex items-center justify-center rounded-md px-8 py-6 text-base font-medium ${t.primaryBtn}">${escapeHtml(getButton("saas_pro_hero_cta_primary").text)}</a>
        <a href="${escapeHtml(getButton("saas_pro_hero_cta_secondary").href)}" class="inline-flex items-center justify-center rounded-md px-8 py-6 text-base font-medium ${t.secondaryBtn}">${escapeHtml(getButton("saas_pro_hero_cta_secondary").text)}</a>
      </div>
      <p class="text-sm opacity-70">${escapeHtml(getText("saas_pro_hero_note", "No credit card required • Free 14-day trial"))}</p>
    </div>
    <div class="mt-16 relative">
      <img src="${escapeHtml(getImage("saas_pro_hero_image", "/abstract-product-screenshot.jpg"))}" alt="Product dashboard" class="w-full max-w-5xl mx-auto rounded-xl shadow-2xl border border-gray-200" />
    </div>
  </section>

  <!-- Social Proof / Logos -->
  <section class="border-y border-opacity-20 py-12 bg-opacity-30">
    <div class="mx-auto max-w-7xl px-4">
      <p class="text-center text-sm font-medium opacity-60 mb-8">${escapeHtml(getText("saas_pro_logos_heading", "Trusted by industry-leading companies worldwide"))}</p>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
        ${[1,2,3,4,5].map(n => `<img src="${escapeHtml(getImage(`saas_pro_logo_${n}`, `/placeholder.svg?height=40&width=140&query=logo%20${n}`))}" alt="Partner ${n}" class="mx-auto h-8 md:h-10 w-auto opacity-60" />`).join("")}
      </div>
    </div>
  </section>

  <!-- Features Grid -->
  <section class="mx-auto max-w-7xl px-4 py-20 md:py-28">
    <div class="text-center max-w-3xl mx-auto mb-16">
      <p class="font-semibold text-sm uppercase tracking-wider mb-3 opacity-80">${escapeHtml(getText("saas_pro_features_eyebrow", "Powerful Features"))}</p>
      <h3 class="text-3xl md:text-5xl font-bold mb-4">${escapeHtml(getText("saas_pro_features_headline", "Everything You Need to Succeed"))}</h3>
      <p class="text-lg opacity-70">${escapeHtml(getText("saas_pro_features_subheadline", "Our comprehensive suite of tools helps you work smarter"))}</p>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      ${[1,2,3,4,5,6].map(n => `
        <div class="p-6 rounded-xl border border-opacity-20 hover:shadow-lg transition-shadow">
          <div class="w-12 h-12 rounded-lg bg-opacity-10 flex items-center justify-center mb-4 text-2xl">${escapeHtml(getText(`saas_pro_feature_${n}_icon`, ["⚡","🎯","🔒","📊","🚀","💡"][n-1]))}</div>
          <h4 class="text-xl font-semibold mb-2">${escapeHtml(getText(`saas_pro_feature_${n}_title`, ["Lightning Fast","Precision Targeting","Bank-Grade Security","Advanced Analytics","Seamless Integrations","Smart Automation"][n-1]))}</h4>
          <p class="opacity-70 leading-relaxed">${escapeHtml(getText(`saas_pro_feature_${n}_description`, "Feature description"))}</p>
        </div>
      `).join("")}
    </div>
  </section>

  <!-- Stats / Metrics -->
  <section class="border-y border-opacity-20 py-20 bg-opacity-30">
    <div class="mx-auto max-w-7xl px-4">
      <div class="text-center mb-12">
        <h3 class="text-3xl md:text-4xl font-bold mb-4">${escapeHtml(getText("saas_pro_stats_headline", "Results That Speak for Themselves"))}</h3>
        <p class="text-lg opacity-70">${escapeHtml(getText("saas_pro_stats_subheadline", "Join thousands of businesses seeing improvements"))}</p>
      </div>
      <div class="grid md:grid-cols-4 gap-8">
        ${[1,2,3,4].map(i => `
          <div class="text-center">
            <p class="text-4xl md:text-5xl font-bold mb-2">${escapeHtml(getText(`saas_pro_stat_${i}_number`, ["10K+","99.9%","4.9/5","24/7"][i-1]))}</p>
            <p class="opacity-70 font-medium">${escapeHtml(getText(`saas_pro_stat_${i}_label`, ["Active Users","Uptime SLA","Customer Rating","Support"][i-1]))}</p>
          </div>
        `).join("")}
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="mx-auto max-w-7xl px-4 py-20 md:py-28">
    <div class="text-center mb-16">
      <p class="font-semibold text-sm uppercase tracking-wider mb-3 opacity-80">${escapeHtml(getText("saas_pro_testimonials_eyebrow", "Testimonials"))}</p>
      <h3 class="text-3xl md:text-5xl font-bold">${escapeHtml(getText("saas_pro_testimonials_headline", "Loved by Teams Everywhere"))}</h3>
    </div>
    <div class="grid md:grid-cols-3 gap-8">
      ${[1,2,3].map(n => `
        <div class="p-6 rounded-xl border border-opacity-20">
          <div class="flex items-center gap-1 mb-4 text-yellow-500">${escapeHtml(getText(`saas_pro_testimonial_${n}_rating`, "⭐⭐⭐⭐⭐"))}</div>
          <p class="text-lg mb-6 leading-relaxed">${escapeHtml(getText(`saas_pro_testimonial_${n}_quote`, "Great product!"))}</p>
          <div class="flex items-center gap-3">
            <img src="${escapeHtml(getImage(`saas_pro_testimonial_${n}_avatar`, `/placeholder.svg?height=48&width=48&query=avatar%20${n}`))}" alt="Customer ${n}" class="w-12 h-12 rounded-full" />
            <div>
              <p class="font-semibold">${escapeHtml(getText(`saas_pro_testimonial_${n}_name`, `Customer ${n}`))}</p>
              <p class="text-sm opacity-70">${escapeHtml(getText(`saas_pro_testimonial_${n}_title`, "Title"))}</p>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  </section>

  <!-- Pricing -->
  <section class="mx-auto max-w-7xl px-4 py-20 md:py-28 border-t border-opacity-20">
    <div class="text-center mb-16">
      <p class="font-semibold text-sm uppercase tracking-wider mb-3 opacity-80">${escapeHtml(getText("saas_pro_pricing_eyebrow", "Pricing"))}</p>
      <h3 class="text-3xl md:text-5xl font-bold mb-4">${escapeHtml(getText("saas_pro_pricing_headline", "Simple, Transparent Pricing"))}</h3>
      <p class="text-lg opacity-70">${escapeHtml(getText("saas_pro_pricing_subheadline", "Choose the plan that fits your needs"))}</p>
    </div>
    <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      ${[1,2,3].map(i => `
        <div class="relative p-8 rounded-2xl border border-opacity-20 ${i===2?'shadow-xl scale-105':''}">
          ${i===2?`<div class="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 ${t.primaryBtn} text-sm font-semibold rounded-full">${escapeHtml(getText(`saas_pro_pricing_${i}_badge`, "Most Popular"))}</div>`:''}
          <p class="text-xl font-semibold mb-2">${escapeHtml(getText(`saas_pro_pricing_${i}_name`, ["Starter","Professional","Enterprise"][i-1]))}</p>
          <div class="mb-6">
            <span class="text-4xl font-bold">${escapeHtml(getText(`saas_pro_pricing_${i}_price`, ["$29","$79","$199"][i-1]))}</span>
            <span class="opacity-70">${escapeHtml(getText(`saas_pro_pricing_${i}_period`, "/month"))}</span>
          </div>
          <p class="text-sm opacity-70 mb-6">${escapeHtml(getText(`saas_pro_pricing_${i}_description`, "Plan description"))}</p>
          <a href="${escapeHtml(getButton(`saas_pro_pricing_${i}_cta`).href)}" class="block w-full text-center rounded-md px-4 py-3 mb-6 ${i===2?t.primaryBtn:t.secondaryBtn}">${escapeHtml(getButton(`saas_pro_pricing_${i}_cta`).text)}</a>
          <div class="space-y-3">
            ${[1,2,3,4,5].map(f => `<div class="flex items-start gap-2"><span class="mt-0.5">✓</span><p class="text-sm">${escapeHtml(getText(`saas_pro_pricing_${i}_feature_${f}`, `Feature ${f}`))}</p></div>`).join("")}
          </div>
        </div>
      `).join("")}
    </div>
  </section>

  <!-- CTA Section -->
  <section class="mx-auto max-w-7xl px-4 py-20 md:py-28">
    <div class="rounded-3xl ${t.primaryBtn} p-12 md:p-16 text-center">
      <h3 class="text-3xl md:text-5xl font-bold mb-4">${escapeHtml(getText("saas_pro_cta_headline", "Ready to Transform Your Workflow?"))}</h3>
      <p class="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">${escapeHtml(getText("saas_pro_cta_subheadline", "Join over 10,000 teams who have made the switch"))}</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="${escapeHtml(getButton("saas_pro_cta_primary").href)}" class="inline-flex items-center justify-center rounded-md px-8 py-6 text-base font-medium ${t.secondaryBtn}">${escapeHtml(getButton("saas_pro_cta_primary").text)}</a>
        <a href="${escapeHtml(getButton("saas_pro_cta_secondary").href)}" class="inline-flex items-center justify-center rounded-md px-8 py-6 text-base font-medium border-2 border-opacity-20">${escapeHtml(getButton("saas_pro_cta_secondary").text)}</a>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-opacity-20 py-12 bg-opacity-30">
    <div class="mx-auto max-w-7xl px-4">
      <div class="grid md:grid-cols-5 gap-8 mb-8">
        <div class="md:col-span-2">
          <h5 class="text-lg font-bold mb-3">${escapeHtml(getText("saas_pro_footer_brand", "InnovatePro"))}</h5>
          <p class="text-sm opacity-70 mb-4 max-w-xs">${escapeHtml(getText("saas_pro_footer_tagline", "Empowering businesses with intelligent automation"))}</p>
        </div>
        ${[1,2,3].map(col => `
          <div>
            <p class="font-semibold mb-3">${escapeHtml(getText(`saas_pro_footer_col_${col}_title`, ["Product","Company","Support"][col-1]))}</p>
            <div class="space-y-2">
              ${[1,2,3,4].map(link => `<p class="text-sm opacity-70">${escapeHtml(getText(`saas_pro_footer_col_${col}_link_${link}`, `Link ${link}`))}</p>`).join("")}
            </div>
          </div>
        `).join("")}
      </div>
      <div class="pt-8 border-t border-opacity-20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm opacity-70">${escapeHtml(getText("saas_pro_footer_copyright", "© 2025 InnovatePro. All rights reserved."))}</p>
        <div class="flex gap-6">
          ${[1,2,3].map(i => `<span class="text-sm opacity-70">${escapeHtml(getText(`saas_pro_footer_legal_${i}`, ["Privacy","Terms","Cookies"][i-1]))}</span>`).join("")}
        </div>
      </div>
    </div>
  </footer>
</main>
  `
}

function generatePortfolioProHTML(getText: GetText, getImage: GetImage, getButton: GetButton, theme?: string): string {
  // Portfolio Pro uses similar theme system as SaaS Pro
  const t = getThemeStyles(theme || "modern-minimal")
  
  return `
<main class="${t.mainBg} ${t.mainText}">
  <!-- Navigation -->
  <header class="sticky top-0 z-40 ${t.headerBg}">
    <div class="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
      <h1 class="text-xl font-bold ${t.headerText}">${escapeHtml(getText("portfolio_pro_brand", "Alex Morgan"))}</h1>
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium">
        ${[1,2,3,4,5].map(n => `<span>${escapeHtml(getText(`portfolio_pro_nav_${n}`, ["Work","About","Services","Blog","Contact"][n-1]))}</span>`).join("")}
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
      ${[1,2,3].map(n => `
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
