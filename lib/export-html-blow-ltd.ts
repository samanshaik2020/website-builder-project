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
 * Generates HTML for Blow LTD Template
 */
export function generateBlowLtdHTML(
    getText: GetText,
    getImage: GetImage,
    getButton: GetButton
): string {
    const navCta = getButton("blow_nav_cta")
    const heroCta = getButton("blow_hero_cta")
    const homeExtensionsCta = getButton("blow_home_extensions_cta")
    const appStore = getButton("blow_app_store")
    const googlePlay = getButton("blow_google_play")

    return `
    <main class="bg-white text-gray-900">
      <!-- Navigation -->
      <header class="bg-white shadow-sm sticky top-0 z-50">
        <div class="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <img src="${escapeHtml(getImage("blow_logo", "/placeholder.svg?height=40&width=120"))}" alt="Blow LTD" class="h-10 w-auto">
          <a href="${escapeHtml(navCta.href)}" class="bg-coral-500 hover:bg-coral-600 text-white px-6 py-2 rounded-md font-medium text-sm">
            ${escapeHtml(navCta.text)}
          </a>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="relative bg-gradient-to-r from-pink-50 to-white py-16">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="text-center md:text-left">
              <h1 class="text-4xl md:text-5xl font-serif italic mb-4 text-gray-900">
                ${escapeHtml(getText("blow_hero_title", "Eyelash Extensions At Home"))}
              </h1>
              <p class="text-base text-gray-700 mb-6 leading-relaxed">
                ${escapeHtml(getText("blow_hero_subtitle", "Natural, volume or infills. W/ eyelash extensions services starting at £45 with promo code BOOK10."))}
              </p>
              <a href="${escapeHtml(heroCta.href)}" class="bg-coral-500 hover:bg-coral-600 text-white px-8 py-3 rounded-md font-medium inline-block">
                ${escapeHtml(heroCta.text)}
              </a>
            </div>
            <div class="relative">
              <img src="${escapeHtml(getImage("blow_hero_image", "/placeholder.svg?height=400&width=600"))}" alt="Eyelash Extensions" class="w-full h-auto rounded-lg">
            </div>
          </div>
        </div>
      </section>

      <!-- Reviews Section -->
      <section class="py-16 bg-white">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-3 gap-8">
            ${[1, 2, 3].map((i) => {
        const names = ["Angie G.", "Lucy H.", "Monique"]
        const reviews = [
            "Blow was fantastic extremely professional and very talented lash technician. I would highly recommend!",
            "This was my first experience getting my lash extensions done and I couldn't be happier! The service was amazing.",
            "Absolutely so lovely and just perfect and my lashes are so beautiful. I liked the booking again!!"
        ]
        return `
              <div class="text-center">
                <div class="flex justify-center gap-1 mb-3">
                  ${[1, 2, 3, 4, 5].map(() => '<span class="text-yellow-400 text-xl">★</span>').join('')}
                </div>
                <p class="font-semibold text-gray-900 mb-2">${escapeHtml(getText(`blow_review_${i}_name`, names[i - 1]))}</p>
                <p class="text-sm text-gray-600 leading-relaxed">${escapeHtml(getText(`blow_review_${i}_text`, reviews[i - 1]))}</p>
              </div>
            `
    }).join("")}
          </div>
          <div class="text-center mt-8">
            <p class="text-sm text-gray-600">
              ${escapeHtml(getText("blow_reviews_summary", "Rated 4.8 out of 5 based on 1,451 verified reviews"))}
            </p>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-16 bg-gray-50">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-3 gap-12 text-center">
            ${[1, 2, 3].map((i) => {
        const titles = [
            "FROM 7AM UNTIL LATE, 7 DAYS A WEEK",
            "5* LUXURY PRODUCTS USED IN SERVICE",
            "COMFORT AT HOME"
        ]
        return `
              <div>
                <div class="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <img src="${escapeHtml(getImage(`blow_feature_${i}_icon`, `/placeholder.svg?height=64&width=64`))}" alt="Feature ${i}" class="w-full h-full">
                </div>
                <p class="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide">
                  ${escapeHtml(getText(`blow_feature_${i}_title`, titles[i - 1]))}
                </p>
              </div>
            `
    }).join("")}
          </div>
        </div>
      </section>

      <!-- Home Eyelash Extensions Section -->
      <section class="py-16 bg-white">
        <div class="mx-auto max-w-7xl px-6">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-serif italic mb-6 text-gray-900">
              ${escapeHtml(getText("blow_home_extensions_title", "HOME EYELASH EXTENSIONS"))}
            </h2>
          </div>
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src="${escapeHtml(getImage("blow_home_extensions_image", "/placeholder.svg?height=400&width=400"))}" alt="Eyelash Extensions" class="w-full h-auto rounded-lg">
            </div>
            <div>
              <p class="text-gray-700 leading-relaxed mb-6">
                ${escapeHtml(getText("blow_home_extensions_desc", "We offer eyelash extensions for a natural, volume, infills or hybrid look in between appointments. Our lash technicians are fully qualified and insured to deliver the best results in the morning!"))}
              </p>
              <p class="text-gray-700 leading-relaxed mb-6">
                ${escapeHtml(getText("blow_home_extensions_details", "The eyelash extensions will be semi-permanent, soft and durable in best through your daily activities. Our lash technicians are fully qualified, which lifts volumes and lengths your own lashes."))}
              </p>
              <p class="text-gray-700 mb-6">
                ${escapeHtml(getText("blow_home_extensions_pricing", "Prices starting at £45 with promo code BOOK10."))}
              </p>
              <a href="${escapeHtml(homeExtensionsCta.href)}" class="bg-coral-500 hover:bg-coral-600 text-white px-8 py-3 rounded-md font-medium inline-block">
                ${escapeHtml(homeExtensionsCta.text)}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section class="py-16 bg-gray-50">
        <div class="mx-auto max-w-7xl px-6">
          <h2 class="text-3xl md:text-4xl font-serif italic text-center mb-12 text-gray-900">
            ${escapeHtml(getText("blow_how_it_works_title", "How It Works"))}
          </h2>
          <div class="grid md:grid-cols-3 gap-8">
            ${[
            { step: "1", title: "SELECT A AT HOME EYELASH EXTENSION SERVICE" },
            { step: "2", title: "CHOOSE TIME & DATE" },
            { step: "3", title: "SIT BACK & RELAX WE'LL COME TO YOU" }
        ].map((item, i) => `
              <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                  <span class="text-2xl font-serif">${item.step}</span>
                </div>
                <p class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  ${escapeHtml(getText(`blow_step_${i + 1}_title`, item.title))}
                </p>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section class="py-16 bg-white">
        <div class="mx-auto max-w-7xl px-6">
          <h2 class="text-3xl md:text-4xl font-serif italic text-center mb-12 text-gray-900">
            ${escapeHtml(getText("blow_services_title", "Our Services"))}
          </h2>
          <div class="grid md:grid-cols-4 gap-6">
            ${[
            { name: "NATURAL", label: "BOOK LASH EXTENSIONS NATURAL" },
            { name: "VOLUME", label: "BOOK LASH EXTENSIONS VOLUME" },
            { name: "INFILLS", label: "BOOK LASH INFILLS" },
            { name: "HYBRID", label: "BOOK VOL. HYBRID" }
        ].map((service, i) => `
              <div class="text-center">
                <img src="${escapeHtml(getImage(`blow_service_${i + 1}_image`, `/placeholder.svg?height=300&width=300`))}" alt="${service.name}" class="w-full h-64 object-cover rounded-lg mb-4">
                <a href="${escapeHtml(getButton(`blow_service_${i + 1}_cta`).href)}" class="bg-coral-500 hover:bg-coral-600 text-white px-4 py-2 rounded-md font-medium text-sm w-full inline-block">
                  ${escapeHtml(getButton(`blow_service_${i + 1}_cta`).text || service.label)}
                </a>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- App Download Section -->
      <section class="py-16 bg-gray-50">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="flex justify-center">
              <img src="${escapeHtml(getImage("blow_app_mockup", "/placeholder.svg?height=600&width=300"))}" alt="Blow LTD App" class="h-96 w-auto">
            </div>
            <div class="text-center md:text-left">
              <h2 class="text-3xl md:text-4xl font-serif italic mb-6 text-gray-900">
                ${escapeHtml(getText("blow_app_title", "Download the App to book an appointment now"))}
              </h2>
              <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="${escapeHtml(appStore.href)}" class="inline-block">
                  <img src="/placeholder.svg?height=50&width=150&query=app%20store%20badge" alt="Download on App Store" class="h-12">
                </a>
                <a href="${escapeHtml(googlePlay.href)}" class="inline-block">
                  <img src="/placeholder.svg?height=50&width=150&query=google%20play%20badge" alt="Get it on Google Play" class="h-12">
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-black text-white py-12">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <img src="${escapeHtml(getImage("blow_footer_logo", "/placeholder.svg?height=40&width=120"))}" alt="Blow LTD" class="h-10 w-auto mb-4">
            </div>
            <div>
              <h5 class="font-semibold mb-4">${escapeHtml(getText("blow_footer_contact_title", "Contact Us"))}</h5>
              <div class="space-y-2 text-sm text-gray-400">
                <p>${escapeHtml(getText("blow_footer_contact", "Email: hello@blowltd.com"))}</p>
              </div>
            </div>
            <div>
              <h5 class="font-semibold mb-4">${escapeHtml(getText("blow_footer_faq_title", "FAQ"))}</h5>
              <div class="space-y-2 text-sm text-gray-400">
                <p class="hover:text-white cursor-pointer">${escapeHtml(getText("blow_footer_faq", "Frequently Asked Questions"))}</p>
              </div>
            </div>
          </div>
          <div class="flex justify-center gap-4 mb-8">
            ${["Facebook", "Twitter", "Pinterest", "Instagram", "YouTube", "TikTok"].map((social, i) => `
              <a href="${escapeHtml(getButton(`blow_social_${i}`).href)}" class="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center">
                ${social[0]}
              </a>
            `).join("")}
          </div>
          <div class="text-center text-sm text-gray-400">
            <p>${escapeHtml(getText("blow_footer_copyright", "© 2025 Blow LTD. All rights reserved."))}</p>
          </div>
        </div>
      </footer>
    </main>
  `
}
