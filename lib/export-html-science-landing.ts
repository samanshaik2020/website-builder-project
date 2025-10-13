"use client"

type GetText = (id: string, fallback?: string) => string
type GetImage = (id: string, fallback?: string) => string
type GetButton = (id: string) => { href: string; text: string }

/**
 * Helper function to escape HTML
 */
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

/**
 * Generates HTML for Science Landing Template
 */
export function generateScienceLandingHTML(
    getText: GetText,
    getImage: GetImage,
    getButton: GetButton
): string {
    const cta1 = getButton("sl-cta-1")
    const cta2 = getButton("sl-cta-2")

    return `
    <main class="bg-white text-gray-900">
      <!-- Top Header -->
      <section class="border-b border-gray-200 bg-gray-50 px-4 py-3">
        <div class="mx-auto max-w-6xl">
          <p class="text-center text-sm text-gray-600">
            ${escapeHtml(getText("sl-top-heading", "Add Your Heading Text Here"))}
          </p>
        </div>
      </section>

      <!-- Hero Section -->
      <section class="mx-auto max-w-6xl px-4 py-12">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            ${escapeHtml(getText("sl-hero-title", "welcome to landing page"))}
          </h1>
          
          <h2 class="text-2xl md:text-3xl font-semibold mb-4">
            ${escapeHtml(getText("sl-hero-subtitle", "Add Your Heading Text Here Add Your Heading Text HereAdd Your Heading Text HereAdd Your Heading"))}
          </h2>

          <p class="mx-auto max-w-4xl text-base leading-relaxed text-gray-700 mb-8">
            ${escapeHtml(getText("sl-hero-description", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."))}
          </p>
        </div>

        <!-- Main Image -->
        <div class="mb-8">
          <img src="${escapeHtml(getImage("sl-main-image", "/placeholder.svg?height=400&width=700"))}" alt="The Science of Sleep" class="mx-auto w-full max-w-3xl rounded-lg shadow-lg">
        </div>

        <!-- CTA Button -->
        <div class="text-center mb-12">
          <a href="${escapeHtml(cta1.href)}" class="bg-gray-600 text-white hover:bg-gray-700 px-6 py-3 rounded inline-block">
            ${escapeHtml(cta1.text)}
          </a>
        </div>

        <!-- Description Section -->
        <div class="mb-12">
          <p class="text-base leading-relaxed text-gray-700 mb-6">
            ${escapeHtml(getText("sl-description", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."))}
          </p>
        </div>

        <!-- Content Heading -->
        <div class="text-center mb-8">
          <h3 class="text-2xl md:text-3xl font-semibold mb-6">
            ${escapeHtml(getText("sl-content-heading", "Add Your Heading Text Here"))}
          </h3>

          <p class="text-base text-gray-700 mb-8">
            ${escapeHtml(getText("sl-content-description", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."))}
          </p>
        </div>

        <!-- Bullet Points -->
        <div class="mx-auto max-w-3xl mb-12">
          <ul class="space-y-4">
            ${[1, 2, 3].map((n) => `
              <li class="flex items-start">
                <span class="mr-3 text-gray-600">•</span>
                <p class="text-base text-gray-700">
                  ${escapeHtml(getText(`sl-bullet-${n}`, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."))}
                </p>
              </li>
            `).join("")}
          </ul>
        </div>

        <!-- Bottom Heading and CTA -->
        <div class="text-center mb-12">
          <h3 class="text-2xl md:text-3xl font-semibold mb-6">
            ${escapeHtml(getText("sl-bottom-heading", "Add Your Heading Text Here"))}
          </h3>

          <a href="${escapeHtml(cta2.href)}" class="bg-gray-600 text-white hover:bg-gray-700 px-6 py-3 rounded inline-block">
            ${escapeHtml(cta2.text)}
          </a>
        </div>
      </section>

      <!-- Footer -->
      <footer class="border-t border-gray-200 bg-gray-50 py-8">
        <div class="mx-auto max-w-6xl px-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div>
              <h4 class="text-sm font-semibold mb-2">
                ${escapeHtml(getText("sl-footer-1", "affiliate desclimination"))}
              </h4>
            </div>
            <div>
              <h4 class="text-sm font-semibold mb-2">
                ${escapeHtml(getText("sl-footer-2", "terms and conditions"))}
              </h4>
            </div>
            <div>
              <h4 class="text-sm font-semibold mb-2">
                ${escapeHtml(getText("sl-footer-3", "policy"))}
              </h4>
            </div>
            <div>
              <h4 class="text-sm font-semibold mb-2">
                ${escapeHtml(getText("sl-footer-4", "about us"))}
              </h4>
            </div>
          </div>
        </div>
      </footer>
    </main>
  `
}
