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
 * Generates HTML for Branch Furniture Template
 */
export function generateBranchFurnitureHTML(
    getText: GetText,
    getImage: GetImage,
    getButton: GetButton
): string {
    const navCart = getButton("branch_nav_cart")
    const heroPrimary = getButton("branch_hero_cta_primary")
    const heroSecondary = getButton("branch_hero_cta_secondary")
    const craftsmanshipCta = getButton("branch_craftsmanship_cta")
    const newsletterCta = getButton("branch_newsletter_cta")

    return `
    <main class="bg-white text-gray-900">
      <!-- Navigation -->
      <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div class="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <img src="${escapeHtml(getImage("branch_logo", ""))}" alt="Branch Furniture" class="h-10 w-auto">
          <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            ${[0, 1, 2, 3].map((i) => {
        const labels = ["Shop", "Collections", "About", "Contact"]
        return `<span class="hover:text-gray-900 transition-colors cursor-pointer">${escapeHtml(getText(`branch_nav_${i}`, labels[i]))}</span>`
    }).join("")}
          </nav>
          <a href="${escapeHtml(navCart.href)}" class="text-gray-700 hover:text-gray-900 font-medium">
            ${escapeHtml(navCart.text)}
          </a>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="relative bg-amber-50 py-20">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 class="text-5xl md:text-6xl font-serif mb-6 text-gray-900">
                ${escapeHtml(getText("branch_hero_title", "Timeless Furniture for Modern Living"))}
              </h1>
              <p class="text-xl text-gray-600 mb-8 leading-relaxed">
                ${escapeHtml(getText("branch_hero_subtitle", "Handcrafted pieces that blend traditional craftsmanship with contemporary design. Each item is built to last generations."))}
              </p>
              <div class="flex gap-4">
                <a href="${escapeHtml(heroPrimary.href)}" class="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-md font-semibold inline-block">
                  ${escapeHtml(heroPrimary.text)}
                </a>
                <a href="${escapeHtml(heroSecondary.href)}" class="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-md font-semibold hover:bg-gray-900 hover:text-white transition-colors inline-block">
                  ${escapeHtml(heroSecondary.text)}
                </a>
              </div>
            </div>
            <div>
              <img src="${escapeHtml(getImage("branch_hero_image", ""))}" alt="Modern Furniture" class="w-full h-auto rounded-lg shadow-2xl">
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-20 bg-white">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-3 gap-12 text-center">
            ${[
            { icon: "🌳", title: "Sustainable Materials", desc: "Responsibly sourced wood from certified forests" },
            { icon: "🛠️", title: "Handcrafted Quality", desc: "Each piece is carefully crafted by skilled artisans" },
            { icon: "🏠", title: "Lifetime Warranty", desc: "We stand behind our furniture for generations" }
        ].map((feature, i) => `
              <div class="space-y-4">
                <div class="text-5xl">${feature.icon}</div>
                <h3 class="text-xl font-semibold text-gray-900">
                  ${escapeHtml(getText(`branch_feature_${i + 1}_title`, feature.title))}
                </h3>
                <p class="text-gray-600 leading-relaxed">
                  ${escapeHtml(getText(`branch_feature_${i + 1}_desc`, feature.desc))}
                </p>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- Featured Products Section -->
      <section class="py-20 bg-gray-50">
        <div class="mx-auto max-w-7xl px-6">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-serif mb-4 text-gray-900">
              ${escapeHtml(getText("branch_products_title", "Featured Collection"))}
            </h2>
            <p class="text-lg text-gray-600">
              ${escapeHtml(getText("branch_products_subtitle", "Discover our most popular pieces"))}
            </p>
          </div>
          <div class="grid md:grid-cols-3 gap-8">
            ${[
            { name: "Oak Dining Table", price: "$1,299" },
            { name: "Walnut Bookshelf", price: "$899" },
            { name: "Maple Coffee Table", price: "$649" }
        ].map((product, i) => `
              <div class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img src="${escapeHtml(getImage(`branch_product_${i + 1}_image`, ``))}" alt="${product.name}" class="w-full h-80 object-cover">
                <div class="p-6">
                  <h3 class="text-xl font-semibold text-gray-900 mb-2">
                    ${escapeHtml(getText(`branch_product_${i + 1}_name`, product.name))}
                  </h3>
                  <p class="text-2xl font-bold text-amber-600 mb-4">
                    ${escapeHtml(getText(`branch_product_${i + 1}_price`, product.price))}
                  </p>
                  <a href="${escapeHtml(getButton(`branch_product_${i + 1}_cta`).href)}" class="w-full bg-gray-900 text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors inline-block text-center">
                    ${escapeHtml(getButton(`branch_product_${i + 1}_cta`).text || "View Details")}
                  </a>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- Craftsmanship Section -->
      <section class="py-20 bg-white">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <img src="${escapeHtml(getImage("branch_craftsmanship_image", ""))}" alt="Craftsmanship" class="w-full h-auto rounded-lg">
            </div>
            <div class="space-y-6">
              <h2 class="text-4xl font-serif text-gray-900">
                ${escapeHtml(getText("branch_craftsmanship_title", "The Art of Woodworking"))}
              </h2>
              <p class="text-lg text-gray-600 leading-relaxed">
                ${escapeHtml(getText("branch_craftsmanship_description", "Every piece of Branch furniture begins with carefully selected wood. Our master craftsmen use time-honored techniques passed down through generations."))}
              </p>
              <p class="text-gray-600 leading-relaxed">
                ${escapeHtml(getText("branch_craftsmanship_details", "From the initial design sketch to the final hand-rubbed finish, each step is performed with meticulous attention to detail."))}
              </p>
              <a href="${escapeHtml(craftsmanshipCta.href)}" class="text-amber-600 font-semibold hover:text-amber-700 inline-flex items-center gap-2">
                ${escapeHtml(craftsmanshipCta.text)}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section class="py-20 bg-amber-50">
        <div class="mx-auto max-w-6xl px-6">
          <h2 class="text-4xl font-serif text-center mb-12 text-gray-900">
            ${escapeHtml(getText("branch_testimonials_title", "What Our Customers Say"))}
          </h2>
          <div class="grid md:grid-cols-2 gap-8">
            ${[1, 2].map((i) => `
              <div class="bg-white rounded-lg p-8 shadow-lg">
                <div class="flex gap-1 mb-4">
                  ${[1, 2, 3, 4, 5].map(() => '<span class="text-yellow-400 text-xl">★</span>').join('')}
                </div>
                <p class="text-gray-700 leading-relaxed mb-4 italic">
                  ${escapeHtml(getText(`branch_testimonial_${i}_text`, '"The quality of Branch furniture is exceptional. Our dining table has become the centerpiece of our home."'))}
                </p>
                <p class="font-semibold text-gray-900">
                  ${escapeHtml(getText(`branch_testimonial_${i}_author`, "— Sarah Johnson"))}
                </p>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- Newsletter Section -->
      <section class="py-16 bg-gray-900 text-white">
        <div class="mx-auto max-w-4xl px-6 text-center">
          <h2 class="text-3xl font-serif mb-4">
            ${escapeHtml(getText("branch_newsletter_title", "Stay Connected"))}
          </h2>
          <p class="text-gray-300 mb-8">
            ${escapeHtml(getText("branch_newsletter_subtitle", "Subscribe to receive updates on new collections and exclusive offers"))}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" class="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500">
            <a href="${escapeHtml(newsletterCta.href)}" class="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-md font-semibold whitespace-nowrap">
              ${escapeHtml(newsletterCta.text)}
            </a>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-gray-900 text-white py-12">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src="${escapeHtml(getImage("branch_footer_logo", ""))}" alt="Branch Furniture" class="h-10 w-auto mb-4">
              <p class="text-gray-400 text-sm">${escapeHtml(getText("branch_footer_tagline", "Timeless furniture, crafted with care"))}</p>
            </div>
            <div>
              <h5 class="font-semibold mb-4">${escapeHtml(getText("branch_footer_shop_title", "Shop"))}</h5>
              <div class="space-y-2 text-sm text-gray-400">
                ${["Living Room", "Dining Room", "Bedroom", "Office"].map((item, i) => `
                  <p class="hover:text-white cursor-pointer">${escapeHtml(getText(`branch_footer_shop_${i}`, item))}</p>
                `).join("")}
              </div>
            </div>
            <div>
              <h5 class="font-semibold mb-4">${escapeHtml(getText("branch_footer_company_title", "Company"))}</h5>
              <div class="space-y-2 text-sm text-gray-400">
                ${["About Us", "Our Process", "Sustainability", "Contact"].map((item, i) => `
                  <p class="hover:text-white cursor-pointer">${escapeHtml(getText(`branch_footer_company_${i}`, item))}</p>
                `).join("")}
              </div>
            </div>
            <div>
              <h5 class="font-semibold mb-4">${escapeHtml(getText("branch_footer_support_title", "Support"))}</h5>
              <div class="space-y-2 text-sm text-gray-400">
                ${["Shipping", "Returns", "Warranty", "FAQ"].map((item, i) => `
                  <p class="hover:text-white cursor-pointer">${escapeHtml(getText(`branch_footer_support_${i}`, item))}</p>
                `).join("")}
              </div>
            </div>
          </div>
          <div class="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>${escapeHtml(getText("branch_footer_copyright", "© 2025 Branch Furniture. All rights reserved."))}</p>
          </div>
        </div>
      </footer>
    </main>
  `
}
