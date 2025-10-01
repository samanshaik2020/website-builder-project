"use client"

import type { ProjectRecord } from "@/components/lib/projects-store"

/**
 * Generates a standalone HTML file from a saved project
 */
export function generateHTMLExport(project: ProjectRecord): string {
  const { template, data, name } = project
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
      html = generateSaaSProHTML(getText, getImage, getButton)
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
  <header class="border-b border-border">
    <div class="mx-auto max-w-4xl px-4 py-6">
      <h1 class="text-2xl font-bold">${escapeHtml(getText("po-title", "Project Title"))}</h1>
      <p class="text-muted-foreground mt-2">${escapeHtml(getText("po-subtitle", "Project subtitle"))}</p>
    </div>
  </header>

  <section class="mx-auto max-w-4xl px-4 py-12">
    <img src="${escapeHtml(getImage("po-hero-img", "/placeholder.svg"))}" alt="Project hero" class="w-full rounded-lg mb-8" />
    <div class="prose max-w-none">
      <h2 class="text-2xl font-bold mb-4">${escapeHtml(getText("po-overview-title", "Overview"))}</h2>
      <p class="text-muted-foreground">${escapeHtml(getText("po-overview-body", "Project overview content..."))}</p>
    </div>
  </section>

  <footer class="border-t border-border py-8">
    <div class="mx-auto max-w-4xl px-4 text-center">
      <p class="text-sm text-muted-foreground">${escapeHtml(getText("po-footer", "© 2025"))}</p>
    </div>
  </footer>
</main>
  `
}

function generatePersonalProfileHTML(getText: GetText, getImage: GetImage, getButton: GetButton): string {
  return `
<main class="bg-background text-foreground min-h-screen flex items-center justify-center p-4">
  <div class="max-w-md w-full text-center">
    <img src="${escapeHtml(getImage("pp-avatar", "/placeholder.svg"))}" alt="Profile" class="w-32 h-32 rounded-full mx-auto mb-6" />
    <h1 class="text-3xl font-bold mb-2">${escapeHtml(getText("pp-name", "Your Name"))}</h1>
    <p class="text-muted-foreground mb-6">${escapeHtml(getText("pp-bio", "Your bio here"))}</p>
    <div class="space-y-3">
      ${[1, 2, 3, 4]
        .map(
          (n) =>
            `<a href="${escapeHtml(getButton(`pp-link-${n}`).href)}" class="block w-full rounded-lg border border-border bg-card p-4 hover:bg-accent">${escapeHtml(getButton(`pp-link-${n}`).text)}</a>`
        )
        .join("")}
    </div>
  </div>
</main>
  `
}

function generateEventLandingHTML(getText: GetText, getImage: GetImage, getButton: GetButton): string {
  return `
<main class="bg-background text-foreground">
  <section class="mx-auto max-w-4xl px-4 py-20 text-center">
    <h1 class="text-5xl font-bold mb-4">${escapeHtml(getText("el-title", "Event Name"))}</h1>
    <p class="text-xl text-muted-foreground mb-8">${escapeHtml(getText("el-date", "Date & Time"))}</p>
    <p class="text-lg mb-8">${escapeHtml(getText("el-description", "Event description"))}</p>
    <a href="${escapeHtml(getButton("el-rsvp").href)}" class="inline-flex items-center justify-center rounded-md bg-primary px-8 py-4 text-lg font-medium text-primary-foreground">${escapeHtml(getButton("el-rsvp").text)}</a>
  </section>

  <footer class="border-t border-border py-8">
    <div class="mx-auto max-w-4xl px-4 text-center">
      <p class="text-sm text-muted-foreground">${escapeHtml(getText("el-footer", "© 2025"))}</p>
    </div>
  </footer>
</main>
  `
}

function generateSaaSProHTML(getText: GetText, getImage: GetImage, getButton: GetButton): string {
  return `
<main class="bg-background text-foreground">
  <header class="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
    <div class="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
      <h1 class="text-xl font-bold">${escapeHtml(getText("saas_pro_brand", "InnovatePro"))}</h1>
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium">
        <span>${escapeHtml(getText("saas_pro_nav_1", "Features"))}</span>
        <span>${escapeHtml(getText("saas_pro_nav_2", "Solutions"))}</span>
        <span>${escapeHtml(getText("saas_pro_nav_3", "Pricing"))}</span>
        <span>${escapeHtml(getText("saas_pro_nav_4", "Resources"))}</span>
        <span>${escapeHtml(getText("saas_pro_nav_5", "Company"))}</span>
      </nav>
      <div class="flex items-center gap-3">
        <a href="${escapeHtml(getButton("saas_pro_nav_signin").href)}" class="hidden md:inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent">${escapeHtml(getButton("saas_pro_nav_signin").text)}</a>
        <a href="${escapeHtml(getButton("saas_pro_nav_cta").href)}" class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">${escapeHtml(getButton("saas_pro_nav_cta").text)}</a>
      </div>
    </div>
  </header>

  <section class="mx-auto max-w-7xl px-4 py-20 md:py-28">
    <div class="text-center max-w-4xl mx-auto">
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
        ${escapeHtml(getText("saas_pro_hero_badge", "✨ New: AI-Powered Analytics Dashboard"))}
      </div>
      <h2 class="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">${escapeHtml(getText("saas_pro_hero_headline", "Transform Your Business with Intelligent Automation"))}</h2>
      <p class="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">${escapeHtml(getText("saas_pro_hero_subheadline", "Streamline operations, boost productivity, and scale effortlessly"))}</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-6">
        <a href="${escapeHtml(getButton("saas_pro_hero_cta_primary").href)}" class="inline-flex items-center justify-center rounded-md bg-primary px-8 py-6 text-base font-medium text-primary-foreground">${escapeHtml(getButton("saas_pro_hero_cta_primary").text)}</a>
        <a href="${escapeHtml(getButton("saas_pro_hero_cta_secondary").href)}" class="inline-flex items-center justify-center rounded-md bg-secondary px-8 py-6 text-base font-medium text-secondary-foreground">${escapeHtml(getButton("saas_pro_hero_cta_secondary").text)}</a>
      </div>
      <p class="text-sm text-muted-foreground">${escapeHtml(getText("saas_pro_hero_note", "No credit card required • Free 14-day trial"))}</p>
    </div>
    <div class="mt-16 relative">
      <img src="${escapeHtml(getImage("saas_pro_hero_image", "/abstract-product-screenshot.jpg"))}" alt="Product dashboard" class="w-full max-w-5xl mx-auto rounded-xl shadow-2xl border border-border" />
    </div>
  </section>

  <footer class="border-t border-border bg-muted/30 py-12">
    <div class="mx-auto max-w-7xl px-4">
      <div class="text-center">
        <h5 class="text-lg font-bold mb-3">${escapeHtml(getText("saas_pro_footer_brand", "InnovatePro"))}</h5>
        <p class="text-sm text-muted-foreground">${escapeHtml(getText("saas_pro_footer_copyright", "© 2025 InnovatePro. All rights reserved."))}</p>
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
