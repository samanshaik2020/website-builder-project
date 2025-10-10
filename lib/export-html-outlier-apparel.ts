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
 * Generates HTML for Outlier Apparel Template
 */
export function generateOutlierApparelHTML(
    getText: GetText,
    getImage: GetImage,
    getButton: GetButton
): string {
    const showcaseCta = getButton("outlier_showcase_cta")
    const finalCta = getButton("outlier_final_cta")

    return `
    <main class="bg-white text-gray-900">
      <!-- Navigation -->
      <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div class="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <img src="${escapeHtml(getImage("outlier_logo", ""))}" alt="Outlier Apparel" class="h-8 w-auto">
          <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            ${[0, 1, 2, 3].map((i) => {
        const labels = ["Shop", "About", "Journal", "Contact"]
        return `<span class="hover:text-gray-900 transition-colors cursor-pointer">${escapeHtml(getText(`outlier_nav_${i}`, labels[i]))}</span>`
    }).join("")}
          </nav>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="relative h-screen">
        <img src="${escapeHtml(getImage("outlier_hero_image", ""))}" alt="Urban Lifestyle" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div class="text-center text-white">
            <h1 class="text-5xl md:text-7xl font-light mb-4 tracking-wide">
              ${escapeHtml(getText("outlier_hero_title", "THE OUTLIER WORK PANT"))}
            </h1>
            <p class="text-xl md:text-2xl font-light tracking-wide">
              ${escapeHtml(getText("outlier_hero_subtitle", "Performance meets style"))}
            </p>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-20 bg-white">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-3 gap-12 text-center">
            ${[
            { icon: "🎯", title: "PRECISION ENGINEERING", desc: "Every detail matters. From fabric selection to final stitch, we obsess over quality." },
            { icon: "✂️", title: "TAILORED FIT", desc: "Designed to move with you. Athletic cut that works from office to adventure." },
            { icon: "🌍", title: "BUILT TO LAST", desc: "Investment pieces that improve with age. Sustainable by design, not by accident." }
        ].map((feature, i) => `
              <div class="space-y-4">
                <div class="text-4xl">${feature.icon}</div>
                <h3 class="text-sm font-semibold tracking-widest text-gray-900">
                  ${escapeHtml(getText(`outlier_feature_${i + 1}_title`, feature.title))}
                </h3>
                <p class="text-sm text-gray-600 leading-relaxed">
                  ${escapeHtml(getText(`outlier_feature_${i + 1}_desc`, feature.desc))}
                </p>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- Reviews Section -->
      <section class="py-16 bg-gray-50">
        <div class="mx-auto max-w-4xl px-6 text-center">
          <div class="flex justify-center gap-1 mb-4">
            ${[1, 2, 3, 4, 5].map(() => '<span class="text-yellow-400 text-2xl">★</span>').join('')}
          </div>
          <p class="text-sm font-semibold tracking-widest text-gray-900 mb-4">
            ${escapeHtml(getText("outlier_review_title", "BEST PANTS EVER"))}
          </p>
          <p class="text-base text-gray-700 leading-relaxed max-w-2xl mx-auto">
            ${escapeHtml(getText("outlier_review_text", '"These pants have completely changed my daily routine. I can bike to work, sit in meetings, and go out for dinner without ever feeling uncomfortable or out of place."'))}
          </p>
        </div>
      </section>

      <!-- Product Detail Section 1 -->
      <section class="py-20 bg-white">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <img src="${escapeHtml(getImage("outlier_detail_1_image", ""))}" alt="Urban Movement" class="w-full h-auto">
            </div>
            <div class="space-y-6">
              <h2 class="text-sm font-semibold tracking-widest text-gray-900">
                ${escapeHtml(getText("outlier_detail_1_title", "MOVEMENT FIRST"))}
              </h2>
              <p class="text-base text-gray-700 leading-relaxed">
                ${escapeHtml(getText("outlier_detail_1_description", "We started with a simple question: why can't work pants move like athletic wear? Using advanced four-way stretch fabric and gusseted construction, we created pants that bend, stretch, and breathe with you."))}
              </p>
              <p class="text-sm text-gray-500 italic">
                ${escapeHtml(getText("outlier_detail_1_note", '"The difference is in the details you can\'t see."'))}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Product Showcase Section -->
      <section class="py-20 bg-gray-50">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-2 gap-16 items-center">
            <div class="order-2 md:order-1 space-y-6">
              <h2 class="text-3xl md:text-4xl font-light text-gray-900">
                ${escapeHtml(getText("outlier_showcase_title", "DEAF PATROL"))}
              </h2>
              <p class="text-base text-gray-700 leading-relaxed">
                ${escapeHtml(getText("outlier_showcase_description", "Our signature collection represents years of refinement. Each piece is designed to be worn daily, to age gracefully, and to become an essential part of your wardrobe."))}
              </p>
              <a href="${escapeHtml(showcaseCta.href)}" class="text-sm font-semibold tracking-widest text-gray-900 hover:text-gray-600 transition-colors inline-block">
                ${escapeHtml(showcaseCta.text)}
              </a>
            </div>
            <div class="order-1 md:order-2">
              <img src="${escapeHtml(getImage("outlier_showcase_image", ""))}" alt="Collection Showcase" class="w-full h-auto">
            </div>
          </div>
        </div>
      </section>

      <!-- Lifestyle Section -->
      <section class="relative h-screen bg-gray-900">
        <img src="${escapeHtml(getImage("outlier_lifestyle_image", ""))}" alt="Craftsmanship" class="w-full h-full object-cover opacity-70">
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center text-white max-w-2xl px-6">
            <h2 class="text-4xl md:text-5xl font-light mb-6">
              ${escapeHtml(getText("outlier_lifestyle_title", "CRAFTED WITH INTENTION"))}
            </h2>
            <p class="text-lg text-gray-200 leading-relaxed">
              ${escapeHtml(getText("outlier_lifestyle_description", "Every stitch, every seam, every detail is considered. We work with the world's best mills and manufacturers to create garments that perform beyond expectations."))}
            </p>
          </div>
        </div>
      </section>

      <!-- Features Grid Section -->
      <section class="py-20 bg-white">
        <div class="mx-auto max-w-7xl px-6">
          <h2 class="text-3xl md:text-4xl font-light text-center mb-16 text-gray-900">
            ${escapeHtml(getText("outlier_features_grid_title", "MADE SMARTER"))}
          </h2>
          <div class="grid md:grid-cols-2 gap-16">
            ${[
            { title: "WATER RESISTANT", desc: "DWR coating sheds rain and stains without compromising breathability.", image: "water-resistant-fabric" },
            { title: "4-WAY STRETCH", desc: "Move freely in any direction. Fabric returns to shape after every wear.", image: "stretch-fabric" },
            { title: "HIDDEN POCKETS", desc: "Secure storage that doesn't interrupt clean lines. Everything has its place.", image: "hidden-pocket-detail" },
            { title: "REINFORCED SEAMS", desc: "Triple-stitched stress points. Built to handle whatever you throw at them.", image: "reinforced-seams" }
        ].map((item, i) => `
              <div class="space-y-6">
                <img src="${escapeHtml(getImage(`outlier_grid_${i + 1}_image`, ``))}" alt="${item.title}" class="w-full h-64 object-cover">
                <div>
                  <h3 class="text-sm font-semibold tracking-widest text-gray-900 mb-3">
                    ${escapeHtml(getText(`outlier_grid_${i + 1}_title`, item.title))}
                  </h3>
                  <p class="text-sm text-gray-600 leading-relaxed">
                    ${escapeHtml(getText(`outlier_grid_${i + 1}_desc`, item.desc))}
                  </p>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- Materials Section -->
      <section class="py-20 bg-gray-50">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <img src="${escapeHtml(getImage("outlier_materials_image", ""))}" alt="Premium Materials" class="w-full h-auto">
            </div>
            <div class="space-y-6">
              <h2 class="text-3xl md:text-4xl font-light text-gray-900">
                ${escapeHtml(getText("outlier_materials_title", "FABRIC MATTERS"))}
              </h2>
              <p class="text-base text-gray-700 leading-relaxed">
                ${escapeHtml(getText("outlier_materials_description", "We source our fabrics from the world's leading mills in Italy and Japan. Each material is chosen for its unique properties—breathability, durability, stretch, and recovery."))}
              </p>
              <div class="space-y-4">
                ${[
            "Schoeller® 4-way stretch fabric",
            "DWR water-resistant coating",
            "Merino wool blend lining",
            "YKK® zippers throughout"
        ].map((spec, i) => `
                  <div class="flex items-start gap-3">
                    <span class="text-gray-900 font-bold">—</span>
                    <span class="text-sm text-gray-700">${escapeHtml(getText(`outlier_materials_spec_${i + 1}`, spec))}</span>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Final CTA Section -->
      <section class="relative h-screen">
        <img src="${escapeHtml(getImage("outlier_final_image", ""))}" alt="Adventure Awaits" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div class="text-center text-white px-6">
            <h2 class="text-4xl md:text-6xl font-light mb-8">
              ${escapeHtml(getText("outlier_final_title", "READY FOR ANYTHING"))}
            </h2>
            <a href="${escapeHtml(finalCta.href)}" class="bg-white text-gray-900 px-12 py-4 text-sm font-semibold tracking-widest hover:bg-gray-100 transition-colors inline-block">
              ${escapeHtml(finalCta.text)}
            </a>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-gray-900 text-white py-16">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <img src="${escapeHtml(getImage("outlier_footer_logo", ""))}" alt="Outlier Apparel" class="h-8 w-auto mb-6">
              <p class="text-sm text-gray-400">${escapeHtml(getText("outlier_footer_tagline", "Performance apparel for the modern professional"))}</p>
            </div>
            <div>
              <h5 class="text-sm font-semibold tracking-widest mb-4">${escapeHtml(getText("outlier_footer_shop_title", "SHOP"))}</h5>
              <div class="space-y-2 text-sm text-gray-400">
                ${["Pants", "Shirts", "Outerwear", "Accessories"].map((item, i) => `
                  <p class="hover:text-white cursor-pointer">${escapeHtml(getText(`outlier_footer_shop_${i}`, item))}</p>
                `).join("")}
              </div>
            </div>
            <div>
              <h5 class="text-sm font-semibold tracking-widest mb-4">${escapeHtml(getText("outlier_footer_company_title", "COMPANY"))}</h5>
              <div class="space-y-2 text-sm text-gray-400">
                ${["About", "Journal", "Careers", "Contact"].map((item, i) => `
                  <p class="hover:text-white cursor-pointer">${escapeHtml(getText(`outlier_footer_company_${i}`, item))}</p>
                `).join("")}
              </div>
            </div>
            <div>
              <h5 class="text-sm font-semibold tracking-widest mb-4">${escapeHtml(getText("outlier_footer_support_title", "SUPPORT"))}</h5>
              <div class="space-y-2 text-sm text-gray-400">
                ${["Sizing", "Returns", "Shipping", "FAQ"].map((item, i) => `
                  <p class="hover:text-white cursor-pointer">${escapeHtml(getText(`outlier_footer_support_${i}`, item))}</p>
                `).join("")}
              </div>
            </div>
          </div>
          <div class="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>${escapeHtml(getText("outlier_footer_copyright", "© 2025 Outlier Apparel. All rights reserved."))}</p>
          </div>
        </div>
      </footer>
    </main>
  `
}
