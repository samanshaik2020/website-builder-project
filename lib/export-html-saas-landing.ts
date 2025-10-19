/**
 * SaaS Landing Template HTML Export
 */

type GetText = (id: string, fallback?: string) => string
type GetImage = (id: string, fallback?: string) => string
type GetButton = (id: string) => { href: string; text: string }

export function generateSaaSLandingHTML(
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
  <title>${getText("sl-brand", "SaaS Product")}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-gray-900">
  <header class="border-b border-gray-200">
    <div class="mx-auto max-w-6xl px-4 py-5 flex items-center justify-between">
      <h1 class="text-xl font-semibold">${getText("sl-brand", "SparkMail AI")}</h1>
      <nav class="hidden md:flex items-center gap-6 text-sm">
        ${[0, 1, 2, 3].map(i => `<span>${getText(`sl-nav-${i}`, ["Features", "Pricing", "Docs", "Contact"][i])}</span>`).join("")}
      </nav>
      <div class="flex gap-3">
        <a href="${getButton("sl-cta-header").href}" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">${getButton("sl-cta-header").text}</a>
      </div>
    </div>
  </header>

  <section class="mx-auto max-w-6xl px-4 py-16 md:py-24 text-center">
    <h2 class="text-4xl md:text-6xl font-bold mb-6">${getText("sl-hero-title", "Email marketing that actually converts")}</h2>
    <p class="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">${getText("sl-hero-sub", "Grow your business with AI-powered email campaigns that your customers will love.")}</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
      <a href="${getButton("sl-cta-primary").href}" class="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 font-semibold">${getButton("sl-cta-primary").text}</a>
      <a href="${getButton("sl-cta-secondary").href}" class="bg-gray-100 text-gray-900 px-8 py-4 rounded-lg hover:bg-gray-200 font-semibold">${getButton("sl-cta-secondary").text}</a>
    </div>
    <img src="${getImage("sl-hero-img")}" alt="Product screenshot" class="w-full max-w-5xl mx-auto rounded-xl shadow-2xl">
  </section>

  <section class="bg-gray-50 border-y border-gray-200 py-12">
    <div class="mx-auto max-w-6xl px-4">
      <p class="text-center text-sm text-gray-500 mb-8">${getText("sl-social-proof", "Trusted by 10,000+ companies worldwide")}</p>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-50">
        ${[1, 2, 3, 4, 5].map(i => `<img src="${getImage(`sl-logo-${i}`)}" alt="Company logo" class="mx-auto h-8">`).join("")}
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-4 py-16 md:py-24">
    <div class="text-center mb-16">
      <h3 class="text-3xl md:text-5xl font-bold mb-4">${getText("sl-features-title", "Everything you need to succeed")}</h3>
      <p class="text-lg text-gray-600">${getText("sl-features-sub", "Powerful features to help you grow faster")}</p>
    </div>
    <div class="grid md:grid-cols-3 gap-8">
      ${[1, 2, 3, 4, 5, 6].map(i => `
        <div class="p-6">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-2xl">${getText(`sl-feature-${i}-icon`, "✨")}</div>
          <h4 class="text-xl font-semibold mb-2">${getText(`sl-feature-${i}-title`, "Feature Title")}</h4>
          <p class="text-gray-600">${getText(`sl-feature-${i}-desc`, "Feature description goes here")}</p>
        </div>
      `).join("")}
    </div>
  </section>

  <section class="bg-blue-600 text-white py-16 md:py-24">
    <div class="mx-auto max-w-4xl px-4 text-center">
      <h3 class="text-3xl md:text-5xl font-bold mb-6">${getText("sl-cta-title", "Ready to get started?")}</h3>
      <p class="text-xl mb-8 opacity-90">${getText("sl-cta-sub", "Join thousands of companies already using our platform")}</p>
      <a href="${getButton("sl-cta-final").href}" class="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 font-semibold text-lg">${getButton("sl-cta-final").text}</a>
    </div>
  </section>

  <footer class="border-t border-gray-200 py-12">
    <div class="mx-auto max-w-6xl px-4">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <h4 class="font-semibold mb-4">${getText("sl-footer-col1-title", "Product")}</h4>
          <div class="space-y-2 text-sm text-gray-600">
            ${[1, 2, 3].map(i => `<div>${getText(`sl-footer-col1-${i}`, "Link")}</div>`).join("")}
          </div>
        </div>
        <div>
          <h4 class="font-semibold mb-4">${getText("sl-footer-col2-title", "Company")}</h4>
          <div class="space-y-2 text-sm text-gray-600">
            ${[1, 2, 3].map(i => `<div>${getText(`sl-footer-col2-${i}`, "Link")}</div>`).join("")}
          </div>
        </div>
        <div>
          <h4 class="font-semibold mb-4">${getText("sl-footer-col3-title", "Resources")}</h4>
          <div class="space-y-2 text-sm text-gray-600">
            ${[1, 2, 3].map(i => `<div>${getText(`sl-footer-col3-${i}`, "Link")}</div>`).join("")}
          </div>
        </div>
        <div>
          <h4 class="font-semibold mb-4">${getText("sl-footer-col4-title", "Legal")}</h4>
          <div class="space-y-2 text-sm text-gray-600">
            ${[1, 2, 3].map(i => `<div>${getText(`sl-footer-col4-${i}`, "Link")}</div>`).join("")}
          </div>
        </div>
      </div>
      <div class="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
        <p>${getText("sl-footer-copy", "© 2025 SparkMail AI. All rights reserved.")}</p>
      </div>
    </div>
  </footer>
</body>
</html>`
}
