"use client"

type GetText = (id: string, fallback?: string) => string
type GetImage = (id: string, fallback?: string) => string
type GetButton = (id: string) => { href: string; text: string }

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

export function generateZolaWeddingHTML(
    getText: GetText,
    getImage: GetImage,
    getButton: GetButton
): string {
    const navCta = getButton("zola_nav_cta")
    const heroCta = getButton("zola_hero_cta")
    const designsCta = getButton("zola_designs_cta")
    const featuresCta = getButton("zola_features_cta")
    const saveDatesCta = getButton("zola_save_dates_cta")
    const registryCta = getButton("zola_registry_cta")
    const finalCta = getButton("zola_final_cta")

    return `
    <main class="bg-white text-gray-900">
      <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div class="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <img src="${escapeHtml(getImage("zola_logo", "/placeholder.svg?height=30&width=80"))}" alt="ZOLA" class="h-8 w-auto">
          <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            <span class="hover:text-gray-900 transition-colors cursor-pointer">${escapeHtml(getText("zola_nav_0", "LOG IN"))}</span>
          </nav>
          <a href="${escapeHtml(navCta.href)}" class="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full font-semibold text-sm">${escapeHtml(navCta.text)}</a>
        </div>
      </header>

      <section class="relative bg-gradient-to-r from-blue-50 via-gray-50 to-blue-50 py-20">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 class="text-5xl md:text-6xl font-bold mb-6 text-gray-900">${escapeHtml(getText("zola_hero_title", "Free, Beautiful Wedding Websites"))}</h1>
              <a href="${escapeHtml(heroCta.href)}" class="bg-teal-500 hover:bg-teal-600 text-white px-10 py-4 rounded-full font-bold text-lg inline-block">${escapeHtml(heroCta.text)}</a>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <img src="${escapeHtml(getImage("zola_hero_image_1", "/placeholder.svg?height=400&width=300"))}" alt="Wedding Photo" class="w-full h-auto rounded-lg shadow-lg">
              <div class="space-y-4">
                <img src="${escapeHtml(getImage("zola_hero_image_2", "/placeholder.svg?height=200&width=300"))}" alt="Wedding Invitation" class="w-full h-auto rounded-lg shadow-lg">
                <img src="${escapeHtml(getImage("zola_hero_image_3", "/placeholder.svg?height=200&width=300"))}" alt="Wedding Flowers" class="w-full h-auto rounded-lg">
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-20 bg-white">
        <div class="mx-auto max-w-7xl px-6">
          <h2 class="text-4xl font-bold text-center mb-12 text-gray-900">${escapeHtml(getText("zola_designs_title", "Over 100 Gorgeous Designs"))}</h2>
          <div class="relative">
            <div class="grid md:grid-cols-3 gap-8">
              ${[1, 2, 3].map((i) => `
                <div class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <img src="${escapeHtml(getImage(`zola_design_${i}_image`, `/placeholder.svg?height=400&width=300`))}" alt="Design ${i}" class="w-full h-80 object-cover">
                </div>
              `).join("")}
            </div>
          </div>
          <div class="text-center mt-12">
            <a href="${escapeHtml(designsCta.href)}" class="bg-teal-500 hover:bg-teal-600 text-white px-10 py-4 rounded-full font-bold inline-block">${escapeHtml(designsCta.text)}</a>
          </div>
        </div>
      </section>

      <section class="py-20 bg-teal-700 text-white">
        <div class="mx-auto max-w-7xl px-6">
          <h2 class="text-4xl font-bold text-center mb-16">${escapeHtml(getText("zola_features_title", "Why You'll Love Our Wedding Websites"))}</h2>
          <div class="grid md:grid-cols-3 gap-12 text-center">
            ${[
            { icon: "💻", title: "So Easy", desc: "Set up your website in minutes with our simple drag-and-drop tools." },
            { icon: "✏️", title: "Super Customizable", desc: "Add your photos, colors, and story to make it uniquely yours." },
            { icon: "👍", title: "Guest-Approved", desc: "Your guests will love how easy it is to RSVP and find info." }
        ].map((feature, i) => `
              <div class="space-y-4">
                <div class="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center text-4xl">${feature.icon}</div>
                <h3 class="text-2xl font-bold">${escapeHtml(getText(`zola_feature_${i + 1}_title`, feature.title))}</h3>
                <p class="text-teal-100 leading-relaxed">${escapeHtml(getText(`zola_feature_${i + 1}_desc`, feature.desc))}</p>
              </div>
            `).join("")}
          </div>
          <div class="text-center mt-12">
            <a href="${escapeHtml(featuresCta.href)}" class="bg-white text-teal-700 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors inline-block">${escapeHtml(featuresCta.text)}</a>
          </div>
        </div>
      </section>

      <section class="py-20 bg-pink-50">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src="${escapeHtml(getImage("zola_save_dates_image", "/placeholder.svg?height=600&width=500"))}" alt="Save the Dates" class="w-full h-auto">
            </div>
            <div>
              <h2 class="text-4xl font-bold mb-6 text-gray-900">${escapeHtml(getText("zola_save_dates_title", "Add Matching Save the Dates and Invitations"))}</h2>
              <p class="text-lg text-gray-700 mb-6 leading-relaxed">${escapeHtml(getText("zola_save_dates_description", "And get 20% OFF your first order with code SAVE20!"))}</p>
              <a href="${escapeHtml(saveDatesCta.href)}" class="bg-teal-500 hover:bg-teal-600 text-white px-10 py-4 rounded-full font-bold inline-block">${escapeHtml(saveDatesCta.text)}</a>
            </div>
          </div>
        </div>
      </section>

      <section class="py-20 bg-white">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="order-2 md:order-1">
              <h2 class="text-4xl font-bold mb-6 text-gray-900">${escapeHtml(getText("zola_registry_title", "Put Your Zola Registry On Your Wedding Website"))}</h2>
              <p class="text-lg text-gray-700 mb-6 leading-relaxed">${escapeHtml(getText("zola_registry_description", "Let guests view your wedding registry right from your website."))}</p>
              <a href="${escapeHtml(registryCta.href)}" class="bg-teal-500 hover:bg-teal-600 text-white px-10 py-4 rounded-full font-bold inline-block">${escapeHtml(registryCta.text)}</a>
            </div>
            <div class="order-1 md:order-2">
              <img src="${escapeHtml(getImage("zola_registry_image", "/placeholder.svg?height=600&width=600"))}" alt="Registry" class="w-full h-auto rounded-lg shadow-xl">
            </div>
          </div>
        </div>
      </section>

      <section class="py-20 bg-teal-700 text-white">
        <div class="mx-auto max-w-4xl px-6 text-center">
          <h2 class="text-4xl md:text-5xl font-script italic mb-8">${escapeHtml(getText("zola_final_title", "We'll make this fun and easy!"))}</h2>
          <a href="${escapeHtml(finalCta.href)}" class="bg-white text-teal-700 px-12 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors inline-block">${escapeHtml(finalCta.text)}</a>
        </div>
      </section>

      <footer class="bg-gray-900 text-white py-12">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src="${escapeHtml(getImage("zola_footer_logo", "/placeholder.svg?height=30&width=80"))}" alt="ZOLA" class="h-8 w-auto mb-4">
              <p class="text-sm text-gray-400">${escapeHtml(getText("zola_footer_tagline", "Your wedding, your way"))}</p>
            </div>
            ${["wedding", "company", "support"].map((section) => `
              <div>
                <h5 class="font-semibold mb-4 text-sm">${escapeHtml(getText(`zola_footer_${section}_title`, section.toUpperCase()))}</h5>
                <div class="space-y-2 text-sm text-gray-400">
                  ${[0, 1, 2, 3].map((i) => `<p class="hover:text-white cursor-pointer">${escapeHtml(getText(`zola_footer_${section}_${i}`, "Link"))}</p>`).join("")}
                </div>
              </div>
            `).join("")}
          </div>
          <div class="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>${escapeHtml(getText("zola_footer_copyright", "© 2025 Zola, Inc. All rights reserved."))}</p>
          </div>
        </div>
      </footer>
    </main>
  `
}
