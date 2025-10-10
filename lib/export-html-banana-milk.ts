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
 * Generates HTML for Banana Milk Template
 */
export function generateBananaMilkHTML(
    getText: GetText,
    getImage: GetImage,
    getButton: GetButton
): string {
    const heroCta = getButton("bm_hero_cta")
    const flavorsCta = getButton("bm_flavors_cta")
    const storeCta = getButton("bm_store_cta")

    return `
    <main class="bg-white text-gray-900">
      <!-- Navigation -->
      <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div class="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <img src="${escapeHtml(getImage("bm_logo", ""))}" alt="Brand Logo" class="h-12 w-auto">
          <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            ${[0, 1, 2, 3, 4, 5].map((i) => {
        const labels = ["Home", "Our Products", "Our Story", "Recipes", "Hello at Mooala", "Find a Store"]
        return `<span class="hover:text-yellow-500 transition-colors cursor-pointer">${escapeHtml(getText(`bm_nav_${i}`, labels[i]))}</span>`
    }).join("")}
          </nav>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="relative bg-gradient-to-b from-yellow-300 via-yellow-200 to-yellow-100 py-20 overflow-hidden">
        <div class="absolute inset-0 opacity-30">
          <div class="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 right-0 w-96 h-96 bg-orange-300 rounded-full blur-3xl"></div>
        </div>
        <div class="mx-auto max-w-7xl px-6 relative z-10">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 class="text-6xl md:text-7xl font-black mb-6 leading-tight text-white">
                ${escapeHtml(getText("bm_hero_title", "BANAMILK. It's A thing.")).replace(/\n/g, "<br>")}
              </h1>
              <p class="text-lg text-gray-800 mb-6 leading-relaxed max-w-md">
                ${escapeHtml(getText("bm_hero_subtitle", "Banamilk is made from 4 ingredients. Bananas, sunflower seeds, cinnamon and Himalayan pink salt. Banamilk is dairy free, nut free, soy free, gluten free and delicious."))}
              </p>
              <div class="mb-6">
                <label class="text-sm font-medium text-gray-700 mb-2 block">
                  ${escapeHtml(getText("bm_hero_email_label", "Get the latest on Banamilk and more!"))}
                </label>
                <div class="flex gap-3 max-w-md">
                  <input type="email" placeholder="Email Address" class="flex-1 px-4 py-3 border border-gray-300 rounded-md">
                  <a href="${escapeHtml(heroCta.href)}" class="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 font-medium rounded-md whitespace-nowrap">
                    ${escapeHtml(heroCta.text)}
                  </a>
                </div>
                <label class="flex items-center gap-2 mt-3 text-xs text-gray-600">
                  <input type="checkbox" class="rounded">
                  <span>${escapeHtml(getText("bm_hero_checkbox", "I agree to receive recurring automated marketing messages at the email provided."))}</span>
                </label>
              </div>
            </div>
            <div class="relative">
              <img src="${escapeHtml(getImage("bm_hero_product", ""))}" alt="Banamilk Product" class="w-full h-auto max-w-md mx-auto drop-shadow-2xl">
            </div>
          </div>
        </div>
      </section>

      <!-- It's Bananas Section -->
      <section class="py-20 bg-white">
        <div class="mx-auto max-w-7xl px-6">
          <div class="text-center mb-12">
            <h2 class="text-5xl md:text-6xl font-black mb-6 text-blue-900">
              ${escapeHtml(getText("bm_bananas_title", "IT'S BANANAS!"))}
            </h2>
            <p class="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              ${escapeHtml(getText("bm_bananas_subtitle", "What is Banamilk, you ask? Made with the finest organic ingredients, free from nuts or added sugar, our Banamilk is dairy free, nut free, soy free, gluten free and delicious."))}
            </p>
          </div>

          <!-- Features Banner -->
          <div class="bg-gradient-to-r from-green-400 via-green-300 to-green-400 py-6 rounded-lg shadow-lg">
            <div class="flex flex-wrap items-center justify-center gap-8 text-white font-bold text-lg">
              ${[0, 1, 2, 3].map((i) => {
        const features = ["USDA ORGANIC", "NON-GMO", "50 CALORIES", "6 INGREDIENTS"]
        return `<span>${escapeHtml(getText(`bm_feature_${i}`, features[i]))}</span>${i < 3 ? '<span class="text-2xl">•</span>' : ''}`
    }).join("")}
            </div>
          </div>
        </div>
      </section>

      <!-- Product Flavors Section -->
      <section class="py-20 bg-gradient-to-b from-blue-100 to-white">
        <div class="mx-auto max-w-7xl px-6">
          <div class="text-center mb-12">
            <h2 class="text-5xl md:text-6xl font-black mb-6 text-blue-900">
              ${escapeHtml(getText("bm_flavors_title", "FLAVOR FULL."))}
            </h2>
            <p class="text-lg text-gray-700 max-w-2xl mx-auto">
              ${escapeHtml(getText("bm_flavors_subtitle", "Original, Chocolate, Vanilla, All Mooala, we offer a variety of fun, plant-based options to suit every taste."))}
            </p>
          </div>

          <div class="grid md:grid-cols-4 gap-8 mb-12">
            ${[
            { name: "Original", color: "from-yellow-200 to-yellow-100" },
            { name: "Chocolate", color: "from-amber-200 to-amber-100" },
            { name: "Vanilla", color: "from-orange-200 to-orange-100" },
            { name: "All Mooala", color: "from-blue-200 to-blue-100" }
        ].map((flavor, i) => `
              <div class="bg-gradient-to-b ${flavor.color} rounded-lg p-6 text-center shadow-lg">
                <img src="${escapeHtml(getImage(`bm_flavor_${i}_image`, ``))}" alt="${flavor.name}" class="w-full h-64 object-contain mb-4">
                <p class="text-xl font-bold text-gray-800">${escapeHtml(getText(`bm_flavor_${i}_name`, flavor.name))}</p>
              </div>
            `).join("")}
          </div>

          <div class="text-center">
            <a href="${escapeHtml(flavorsCta.href)}" class="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 text-lg font-bold rounded-full shadow-lg inline-block">
              ${escapeHtml(flavorsCta.text)}
            </a>
          </div>
        </div>
      </section>

      <!-- Check Out Our Moos Section -->
      <section class="py-20 bg-white">
        <div class="mx-auto max-w-7xl px-6">
          <h2 class="text-5xl md:text-6xl font-black mb-12 text-center text-blue-900">
            ${escapeHtml(getText("bm_moos_title", "CHECK OUT OUR MOOS"))}
          </h2>

          <div class="grid md:grid-cols-4 gap-6">
            ${[1, 2, 3, 4].map((i) => `
              <div class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img src="${escapeHtml(getImage(`bm_moo_${i}_image`, ``))}" alt="Lifestyle ${i}" class="w-full h-64 object-cover">
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- Store Locator Section -->
      <section class="py-20 bg-gradient-to-b from-gray-100 to-white">
        <div class="mx-auto max-w-4xl px-6 text-center">
          <h2 class="text-5xl md:text-6xl font-black mb-6 text-blue-900">
            ${escapeHtml(getText("bm_store_title", "We're Closer Than You Think.")).replace(/\n/g, "<br>")}
          </h2>
          <p class="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            ${escapeHtml(getText("bm_store_subtitle", "Mooala is available in hundreds of grocery stores. Click below to find the locations nearest you!"))}
          </p>
          <a href="${escapeHtml(storeCta.href)}" class="bg-yellow-500 hover:bg-yellow-600 text-white px-10 py-4 text-lg font-bold rounded-full shadow-lg inline-block">
            ${escapeHtml(storeCta.text)}
          </a>
        </div>
      </section>

      <!-- Social Section -->
      <section class="py-16 bg-yellow-300">
        <div class="mx-auto max-w-7xl px-6">
          <div class="text-center mb-8">
            <h3 class="text-4xl font-black mb-4 text-gray-900">
              ${escapeHtml(getText("bm_social_title", "STAY CONNECTED!")).replace(/\n/g, "<br>")}
            </h3>
          </div>
          <div class="flex justify-center gap-6">
            ${["Facebook", "Snapchat", "Instagram", "Pinterest", "Twitter"].map((social, i) => `
              <a href="${escapeHtml(getButton(`bm_social_${i}`).href)}" class="w-12 h-12 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110">
                ${social[0]}
              </a>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-gray-900 text-white py-12">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src="${escapeHtml(getImage("bm_footer_logo", ""))}" alt="Mooala" class="h-10 w-auto mb-4">
              <p class="text-gray-400 text-sm">${escapeHtml(getText("bm_footer_tagline", "Plant-based goodness in every sip"))}</p>
            </div>
            <div>
              <h5 class="font-semibold mb-4">${escapeHtml(getText("bm_footer_products_title", "Products"))}</h5>
              <div class="space-y-2 text-sm text-gray-400">
                ${["Banamilk", "Almondmilk", "Oatmilk", "Creamers"].map((item, i) => `
                  <p class="hover:text-white cursor-pointer">${escapeHtml(getText(`bm_footer_product_${i}`, item))}</p>
                `).join("")}
              </div>
            </div>
            <div>
              <h5 class="font-semibold mb-4">${escapeHtml(getText("bm_footer_company_title", "Company"))}</h5>
              <div class="space-y-2 text-sm text-gray-400">
                ${["Our Story", "Recipes", "Blog", "Contact"].map((item, i) => `
                  <p class="hover:text-white cursor-pointer">${escapeHtml(getText(`bm_footer_company_${i}`, item))}</p>
                `).join("")}
              </div>
            </div>
            <div>
              <h5 class="font-semibold mb-4">${escapeHtml(getText("bm_footer_support_title", "Support"))}</h5>
              <div class="space-y-2 text-sm text-gray-400">
                ${["FAQ", "Store Locator", "Wholesale", "Careers"].map((item, i) => `
                  <p class="hover:text-white cursor-pointer">${escapeHtml(getText(`bm_footer_support_${i}`, item))}</p>
                `).join("")}
              </div>
            </div>
          </div>
          <div class="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>${escapeHtml(getText("bm_footer_copyright", "© 2025 Mooala. All rights reserved. | Privacy Policy | Terms of Service"))}</p>
          </div>
        </div>
      </footer>
    </main>
  `
}
