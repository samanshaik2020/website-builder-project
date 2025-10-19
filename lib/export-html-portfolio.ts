/**
 * Portfolio Template HTML Export
 */

type GetText = (id: string, fallback?: string) => string
type GetImage = (id: string, fallback?: string) => string
type GetButton = (id: string) => { href: string; text: string }

export function generatePortfolioHTML(
  getText: GetText,
  getImage: GetImage,
  getButton: GetButton,
  theme?: string
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${getText("pt-brand", "Portfolio")}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-gray-900">
  <header class="border-b border-gray-200">
    <div class="mx-auto max-w-6xl px-4 py-6 flex items-center justify-between">
      <h1 class="text-xl font-semibold">${getText("pt-brand", "Your Name")}</h1>
      <nav class="flex items-center gap-6 text-sm">
        <span>${getText("pt-nav-1", "About")}</span>
        <span>${getText("pt-nav-2", "Projects")}</span>
        <span>${getText("pt-nav-3", "Contact")}</span>
      </nav>
    </div>
  </header>

  <section class="mx-auto max-w-6xl px-4 py-12 grid gap-8 md:grid-cols-2">
    <div class="flex flex-col gap-4">
      <h2 class="text-3xl md:text-5xl font-bold">${getText("pt-hero-title", "Designer & Frontend Developer")}</h2>
      <p class="text-gray-600">${getText("pt-hero-sub", "I help startups and agencies turn ideas into delightful digital products.")}</p>
      <div class="flex gap-3">
        <a href="${getButton("pt-cta-1").href}" class="bg-black text-white px-6 py-3 rounded-lg hover:opacity-90">${getButton("pt-cta-1").text}</a>
        <a href="${getButton("pt-cta-2").href}" class="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-300">${getButton("pt-cta-2").text}</a>
      </div>
    </div>
    <img src="${getImage("pt-hero-img")}" alt="Portfolio" class="w-full h-auto rounded-lg">
  </section>

  <section class="mx-auto max-w-6xl px-4 py-12 grid gap-8 md:grid-cols-2">
    <div class="rounded-xl border border-gray-200 bg-gray-50 p-6">
      <h3 class="text-xl font-semibold mb-3">${getText("pt-about-title", "About Me")}</h3>
      <p class="text-sm text-gray-600">${getText("pt-about-body", "I specialize in UX, UI, and front-end development.")}</p>
    </div>
    <div class="rounded-xl border border-gray-200 bg-gray-50 p-6">
      <h3 class="text-xl font-semibold mb-3">${getText("pt-skills-title", "Skills")}</h3>
      <div class="grid grid-cols-2 gap-3 text-sm">
        ${[0, 1, 2, 3, 4, 5].map(i => `<div class="rounded-lg bg-white p-3">${getText(`pt-skill-${i}`, "Skill")}</div>`).join("")}
      </div>
    </div>
  </section>

  <section class="bg-gray-50 border-y border-gray-200 py-12">
    <div class="mx-auto max-w-6xl px-4">
      <h3 class="text-2xl font-semibold mb-6 text-center">${getText("pt-test-title", "What clients say")}</h3>
      <div class="grid gap-6 md:grid-cols-3">
        ${[1, 2, 3].map(n => `
          <div class="rounded-lg border border-gray-200 p-5 bg-white">
            <blockquote class="text-sm mb-4">${getText(`pt-test-quote-${n}`, "Outstanding work!")}</blockquote>
            <div class="flex items-center gap-3">
              <img src="${getImage(`pt-test-avatar-${n}`)}" alt="Client" class="h-10 w-10 rounded-full">
              <div>
                <p class="text-sm font-medium">${getText(`pt-test-name-${n}`, "Client Name")}</p>
                <p class="text-xs text-gray-600">${getText(`pt-test-role-${n}`, "Company")}</p>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-4 py-12">
    <h3 class="text-2xl font-semibold mb-6">${getText("pt-sec-title", "Selected Projects")}</h3>
    <div class="grid gap-6 md:grid-cols-3">
      ${[1, 2, 3].map(n => `
        <article class="rounded-lg border border-gray-200 overflow-hidden bg-white">
          <img src="${getImage(`pt-proj-img-${n}`)}" alt="Project" class="w-full h-48 object-cover">
          <div class="p-4">
            <h4 class="font-medium mb-2">${getText(`pt-proj-title-${n}`, "Project Title")}</h4>
            <p class="text-sm text-gray-600">${getText(`pt-proj-desc-${n}`, "Project description")}</p>
          </div>
        </article>
      `).join("")}
    </div>
  </section>

  <footer class="border-t border-gray-200 py-8">
    <div class="mx-auto max-w-6xl px-4 flex items-center justify-between">
      <p class="text-sm text-gray-600">${getText("pt-foot-copy", "© 2025 Your Name")}</p>
      <div class="flex gap-4 text-sm">
        <span>${getText("pt-foot-link-1", "Twitter")}</span>
        <span>${getText("pt-foot-link-2", "LinkedIn")}</span>
        <span>${getText("pt-foot-link-3", "GitHub")}</span>
      </div>
    </div>
  </footer>
</body>
</html>`
}
