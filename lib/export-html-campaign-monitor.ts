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
 * Generates HTML for Campaign Monitor Template
 */
export function generateCampaignMonitorHTML(
    getText: GetText,
    getImage: GetImage,
    getButton: GetButton
): string {
    const heroPrimary = getButton("cm_hero_cta_primary")
    const heroSecondary = getButton("cm_hero_cta_secondary")
    const navLogin = getButton("cm_nav_login")
    const navSignup = getButton("cm_nav_signup")
    const ctaButton = getButton("cm_cta_button")

    return `
    <main class="bg-white text-gray-900">
      <!-- Navigation -->
      <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div class="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <img src="${escapeHtml(getImage("cm_logo", "/placeholder.svg?height=40&width=180"))}" alt="Campaign Monitor" class="h-10 w-auto">
          <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            ${[0, 1, 2, 3].map((i) => {
        const labels = ["Features", "Pricing", "Resources", "Support"]
        return `<span class="hover:text-blue-600 transition-colors cursor-pointer">${escapeHtml(getText(`cm_nav_${i}`, labels[i]))}</span>`
    }).join("")}
            <a href="${escapeHtml(navLogin.href)}" class="text-blue-600 hover:text-blue-700 font-medium">${escapeHtml(navLogin.text)}</a>
            <a href="${escapeHtml(navSignup.href)}" class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium">${escapeHtml(navSignup.text)}</a>
          </nav>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="relative bg-gradient-to-b from-gray-50 to-white py-20">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
                ${escapeHtml(getText("cm_hero_title", "Create beautiful and effective HTML emails"))}
              </h1>
              <p class="text-xl text-gray-600 mb-8 leading-relaxed">
                ${escapeHtml(getText("cm_hero_subtitle", "Launch unique, fully branded email campaigns that are targeted to the right audience."))}
              </p>
              <div class="flex gap-4 mb-6">
                <a href="${escapeHtml(heroPrimary.href)}" class="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold rounded-md shadow-lg">
                  ${escapeHtml(heroPrimary.text)}
                </a>
                <a href="${escapeHtml(heroSecondary.href)}" class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-4 text-lg font-semibold rounded-md flex items-center gap-2">
                  ${escapeHtml(heroSecondary.text)}
                </a>
              </div>
              <p class="text-sm text-gray-500">
                ${escapeHtml(getText("cm_hero_note", "Get started for free. No credit card required."))}
              </p>
            </div>
            <div class="relative">
              <img src="${escapeHtml(getImage("cm_hero_image", "/placeholder.svg?height=600&width=800"))}" alt="Email Campaign Preview" class="w-full h-auto rounded-lg shadow-2xl">
            </div>
          </div>
        </div>
      </section>

      <!-- Trust Bar -->
      <section class="bg-gray-100 py-12">
        <div class="mx-auto max-w-7xl px-6">
          <p class="text-center text-sm text-gray-600 mb-8">
            ${escapeHtml(getText("cm_trust_title", "Loved by over 2 million marketers at 200,000 businesses around the world."))}
          </p>
          <div class="flex flex-wrap items-center justify-center gap-12">
            ${["BuzzFeed", "Rip Curl", "TOPSHOP", "unicef", "adidas", "SHOWTIME"].map((brand, i) => `
              <img src="${escapeHtml(getImage(`cm_brand_${i}`, `/placeholder.svg?height=40&width=120`))}" alt="${brand}" class="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity">
            `).join("")}
          </div>
        </div>
      </section>

      <!-- Main Feature Section -->
      <section class="py-20 bg-white">
        <div class="mx-auto max-w-7xl px-6">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              ${escapeHtml(getText("cm_feature_main_title", "Drag and drop your way to a beautiful HTML email"))}
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              ${escapeHtml(getText("cm_feature_main_subtitle", "Build completely branded emails and customize everything from fonts and colors to the exact spacing between sections so your email is pixel-perfect."))}
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <img src="${escapeHtml(getImage("cm_feature_1_image", "/placeholder.svg?height=500&width=600"))}" alt="Email Builder" class="w-full h-auto rounded-lg shadow-xl">
            </div>
            <div class="space-y-8">
              <div>
                <h3 class="text-2xl font-bold mb-3 text-gray-900">
                  ${escapeHtml(getText("cm_feature_1_title", "EASE OF USE"))}
                </h3>
                <p class="text-gray-600 leading-relaxed">
                  ${escapeHtml(getText("cm_feature_1_desc", "Our drag-and-drop email builder makes it radically easy to design a unique-looking email that matches your brand. No code required!"))}
                </p>
              </div>
              <div>
                <h3 class="text-2xl font-bold mb-3 text-gray-900">
                  ${escapeHtml(getText("cm_feature_2_title", "COMPLETE CUSTOMIZATION"))}
                </h3>
                <p class="text-gray-600 leading-relaxed">
                  ${escapeHtml(getText("cm_feature_2_desc", "With our email builder you can get pixel-level customization over all aspects of your email with the exact fonts and colors to match your brand."))}
                </p>
              </div>
              <div>
                <h3 class="text-2xl font-bold mb-3 text-gray-900">
                  ${escapeHtml(getText("cm_feature_3_title", "MOBILE OPTIMIZATION"))}
                </h3>
                <p class="text-gray-600 leading-relaxed">
                  ${escapeHtml(getText("cm_feature_3_desc", "It's essential your emails are responsive so we like the mobile optimization built into our email builder to ensure your emails look great on any device."))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Secondary Feature Section -->
      <section class="py-20 bg-gray-50">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-2 gap-16 items-center">
            <div class="order-2 md:order-1 space-y-6">
              <h2 class="text-4xl font-bold text-gray-900">
                ${escapeHtml(getText("cm_secondary_feature_title", "Customize everything"))}
              </h2>
              <p class="text-lg text-gray-600 leading-relaxed">
                ${escapeHtml(getText("cm_secondary_feature_desc", "Build completely branded emails and customize everything from fonts and colors to the exact spacing between sections so your email is pixel-perfect."))}
              </p>
              <div class="space-y-4">
                ${[
            { title: "Colors and Fonts", desc: "Customize colors and fonts to match your brand" },
            { title: "Layout Options", desc: "Choose from multiple layout options" },
            { title: "Image Editing", desc: "Edit images directly in the builder" }
        ].map((item, i) => `
                  <div class="flex gap-4">
                    <div class="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                      ✓
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900">${escapeHtml(getText(`cm_feature_item_${i}_title`, item.title))}</p>
                      <p class="text-gray-600 text-sm">${escapeHtml(getText(`cm_feature_item_${i}_desc`, item.desc))}</p>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
            <div class="order-1 md:order-2">
              <img src="${escapeHtml(getImage("cm_secondary_feature_image", "/placeholder.svg?height=500&width=600"))}" alt="Customization Panel" class="w-full h-auto rounded-lg shadow-xl">
            </div>
          </div>
        </div>
      </section>

      <!-- Templates Section -->
      <section class="py-20 bg-white">
        <div class="mx-auto max-w-7xl px-6">
          <div class="text-center mb-12">
            <h2 class="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              ${escapeHtml(getText("cm_templates_title", "Start with a template"))}
            </h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
              ${escapeHtml(getText("cm_templates_subtitle", "Choose from our library of professionally designed templates or start from scratch."))}
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            ${[1, 2, 3].map((i) => `
              <div class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img src="${escapeHtml(getImage(`cm_template_${i}_image`, `/placeholder.svg?height=400&width=300`))}" alt="Template ${i}" class="w-full h-80 object-cover">
                <div class="p-6">
                  <p class="text-xl font-bold text-gray-900 mb-2">${escapeHtml(getText(`cm_template_${i}_name`, `Template ${i}`))}</p>
                  <p class="text-gray-600 text-sm">${escapeHtml(getText(`cm_template_${i}_desc`, "Perfect for newsletters and announcements"))}</p>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div class="mx-auto max-w-4xl px-6 text-center">
          <h2 class="text-4xl md:text-5xl font-bold mb-6 text-white">
            ${escapeHtml(getText("cm_cta_title", "Ready to get started?"))}
          </h2>
          <p class="text-xl text-blue-100 mb-8">
            ${escapeHtml(getText("cm_cta_subtitle", "Join thousands of marketers creating beautiful email campaigns"))}
          </p>
          <a href="${escapeHtml(ctaButton.href)}" class="bg-green-500 hover:bg-green-600 text-white px-10 py-4 text-lg font-bold rounded-md shadow-lg inline-block">
            ${escapeHtml(ctaButton.text)}
          </a>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-gray-900 text-white py-12">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src="${escapeHtml(getImage("cm_footer_logo", "/placeholder.svg?height=40&width=150"))}" alt="Campaign Monitor" class="h-10 w-auto mb-4">
              <p class="text-gray-400 text-sm">${escapeHtml(getText("cm_footer_tagline", "Beautiful email marketing made simple"))}</p>
            </div>
            <div>
              <h5 class="font-semibold mb-4">${escapeHtml(getText("cm_footer_product_title", "Product"))}</h5>
              <div class="space-y-2 text-sm text-gray-400">
                ${["Features", "Pricing", "Templates", "Integrations"].map((item, i) => `
                  <p class="hover:text-white cursor-pointer">${escapeHtml(getText(`cm_footer_product_${i}`, item))}</p>
                `).join("")}
              </div>
            </div>
            <div>
              <h5 class="font-semibold mb-4">${escapeHtml(getText("cm_footer_resources_title", "Resources"))}</h5>
              <div class="space-y-2 text-sm text-gray-400">
                ${["Blog", "Guides", "Help Center", "API Docs"].map((item, i) => `
                  <p class="hover:text-white cursor-pointer">${escapeHtml(getText(`cm_footer_resources_${i}`, item))}</p>
                `).join("")}
              </div>
            </div>
            <div>
              <h5 class="font-semibold mb-4">${escapeHtml(getText("cm_footer_company_title", "Company"))}</h5>
              <div class="space-y-2 text-sm text-gray-400">
                ${["About", "Careers", "Contact", "Partners"].map((item, i) => `
                  <p class="hover:text-white cursor-pointer">${escapeHtml(getText(`cm_footer_company_${i}`, item))}</p>
                `).join("")}
              </div>
            </div>
          </div>
          <div class="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>${escapeHtml(getText("cm_footer_copyright", "© 2025 Campaign Monitor. All rights reserved. | Privacy Policy | Terms of Service"))}</p>
          </div>
        </div>
      </footer>
    </main>
  `
}
