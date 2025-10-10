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

export function generateGobyToothbrushHTML(
    getText: GetText,
    getImage: GetImage,
    getButton: GetButton
): string {
    const navCta = getButton("goby_nav_cta")
    const heroCta = getButton("goby_hero_cta")
    const feature2Cta = getButton("goby_feature_2_cta")
    const testimonialCta = getButton("goby_testimonial_cta")
    const guaranteeCta = getButton("goby_guarantee_cta")

    return `
    <main class="bg-white text-gray-900">
      <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div class="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <img src="${escapeHtml(getImage("goby_logo", "/placeholder.svg?height=30&width=80"))}" alt="GOBY" class="h-8 w-auto">
          <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            <span class="hover:text-gray-900 transition-colors cursor-pointer">${escapeHtml(getText("goby_nav_0", "Subscribe & Save"))}</span>
          </nav>
          <a href="${escapeHtml(navCta.href)}" class="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-md font-semibold text-sm">${escapeHtml(navCta.text)}</a>
        </div>
      </header>

      <section class="relative bg-gradient-to-r from-pink-100 via-pink-50 to-blue-100 py-20">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src="${escapeHtml(getImage("goby_hero_icon", "/placeholder.svg?height=60&width=60"))}" alt="Icon" class="w-16 h-16 mb-6">
              <h1 class="text-5xl md:text-6xl font-bold mb-6 text-gray-900">${escapeHtml(getText("goby_hero_title", "BRUSHING PERFECTED"))}</h1>
              <p class="text-xl text-gray-700 mb-8 leading-relaxed">${escapeHtml(getText("goby_hero_subtitle", "Goby provides an earth-shattering brush at a jaw-dropping price."))}</p>
              <a href="${escapeHtml(heroCta.href)}" class="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-md font-bold text-lg inline-block">${escapeHtml(heroCta.text)}</a>
            </div>
            <div>
              <img src="${escapeHtml(getImage("goby_hero_image", "/placeholder.svg?height=600&width=400"))}" alt="GOBY Toothbrush" class="w-full h-auto">
            </div>
          </div>
        </div>
      </section>

      <section class="bg-blue-600 text-white py-6">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-3 gap-8 text-center">
            ${[
            { title: "30-DAY GUARANTEE", subtitle: "ARE YOU HAPPY?" },
            { title: "SUBSCRIBE & SAVE", subtitle: "SAVE UP TO 40%" },
            { title: "FREE SHIPPING", subtitle: "HAPPY SMILES" }
        ].map((feature, i) => `
              <div>
                <p class="text-sm font-bold mb-1">${escapeHtml(getText(`goby_feature_bar_${i + 1}_title`, feature.title))}</p>
                <p class="text-xs opacity-90">${escapeHtml(getText(`goby_feature_bar_${i + 1}_subtitle`, feature.subtitle))}</p>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <section class="py-20 bg-gradient-to-br from-pink-50 to-white">
        <div class="mx-auto max-w-7xl px-6">
          <div class="text-center mb-12">
            <span class="inline-block bg-white border-2 border-gray-900 px-6 py-2 rounded-full text-sm font-bold mb-8">
              ${escapeHtml(getText("goby_features_badge", "IT'S GOT EVERYTHING YOU"))}
            </span>
          </div>
          <div class="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <img src="${escapeHtml(getImage("goby_features_image", "/placeholder.svg?height=600&width=500"))}" alt="Product Features" class="w-full h-auto">
            </div>
            <div class="space-y-8">
              ${[1, 2, 3, 4].map((i) => `
                <div>
                  <h3 class="text-2xl font-bold mb-3 text-gray-900">${escapeHtml(getText(`goby_feature_${i}_title`, `Feature ${i}`))}</h3>
                  ${i === 1 || i === 2 ? `<p class="text-gray-600 leading-relaxed">${escapeHtml(getText(`goby_feature_${i}_desc`, "Description"))}</p>` : ''}
                  ${i === 2 ? `<a href="${escapeHtml(feature2Cta.href)}" class="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-md font-bold inline-block mt-4">${escapeHtml(feature2Cta.text)}</a>` : ''}
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </section>

      <section class="py-20 bg-white">
        <div class="mx-auto max-w-4xl px-6 text-center">
          <h2 class="text-4xl md:text-5xl font-bold mb-6 text-gray-900">${escapeHtml(getText("goby_smile_title", "A HEALTHIER SMILE, DELIVERED."))}</h2>
          <p class="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">${escapeHtml(getText("goby_smile_description", "To make the switch to a brush heads as proven to clean better, we deliver brush heads to you."))}</p>
        </div>
      </section>

      <section class="py-16 bg-gray-50">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-3 gap-12 text-center">
            ${[
            { icon: "⚡", title: "POWERFUL", desc: "Our brush removes up to 100% more plaque than a manual brush." },
            { icon: "😊", title: "SIMPLE", desc: "One button, three modes. It's really that simple." },
            { icon: "🔋", title: "LONG-LASTING", desc: "A 4-hour charge lasts up to 30 days." }
        ].map((benefit, i) => `
              <div class="space-y-4">
                <div class="text-5xl">${benefit.icon}</div>
                <h3 class="text-xl font-bold text-gray-900">${escapeHtml(getText(`goby_benefit_${i + 1}_title`, benefit.title))}</h3>
                <p class="text-gray-600 leading-relaxed">${escapeHtml(getText(`goby_benefit_${i + 1}_desc`, benefit.desc))}</p>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <section class="py-20 bg-white">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src="${escapeHtml(getImage("goby_testimonial_image", "/placeholder.svg?height=500&width=500"))}" alt="GOBY Product" class="w-full h-auto rounded-lg">
            </div>
            <div>
              <h2 class="text-3xl md:text-4xl font-bold mb-6 text-gray-900">${escapeHtml(getText("goby_testimonial_title", "THE BUZZ ON GOBY"))}</h2>
              <p class="text-xl text-gray-700 leading-relaxed mb-6 italic">${escapeHtml(getText("goby_testimonial_quote", '"The design team has managed the feat of making a toothbrush that\'s both functional and beautiful."'))}</p>
              <p class="text-sm font-semibold text-gray-900 mb-6">${escapeHtml(getText("goby_testimonial_author", "— DESIGN MAGAZINE"))}</p>
              <a href="${escapeHtml(testimonialCta.href)}" class="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-md font-bold inline-block">${escapeHtml(testimonialCta.text)}</a>
            </div>
          </div>
        </div>
      </section>

      <section class="py-20 bg-gray-50">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="order-2 md:order-1">
              <h2 class="text-3xl md:text-4xl font-bold mb-6 text-gray-900">${escapeHtml(getText("goby_giving_title", "GOBY GIVES BACK"))}</h2>
              <p class="text-lg text-gray-600 leading-relaxed mb-6">${escapeHtml(getText("goby_giving_description", "We're on a mission to make good oral care accessible to all."))}</p>
              <p class="text-gray-600 leading-relaxed">${escapeHtml(getText("goby_giving_details", "We also partner with NYC's Share of Humanity's Global Impact Network Program."))}</p>
            </div>
            <div class="order-1 md:order-2">
              <img src="${escapeHtml(getImage("goby_giving_image", "/placeholder.svg?height=500&width=600"))}" alt="Giving Back" class="w-full h-auto rounded-lg">
            </div>
          </div>
        </div>
      </section>

      <section class="py-20 bg-white">
        <div class="mx-auto max-w-7xl px-6">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">${escapeHtml(getText("goby_instagram_title", "#GOBYGRAM"))}</h2>
          <p class="text-center text-gray-600 mb-12">${escapeHtml(getText("goby_instagram_subtitle", "Tag us for a chance to be featured!"))}</p>
          <div class="grid md:grid-cols-4 gap-6">
            ${[1, 2, 3, 4].map((i) => `
              <div class="relative group">
                <img src="${escapeHtml(getImage(`goby_instagram_${i}_image`, `/placeholder.svg?height=300&width=300`))}" alt="Instagram ${i}" class="w-full h-64 object-cover rounded-lg">
                <p class="text-center text-sm text-gray-600 mt-2">${escapeHtml(getText(`goby_instagram_${i}_caption`, "@username"))}</p>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <section class="py-20 bg-gray-800 text-white">
        <div class="mx-auto max-w-4xl px-6 text-center">
          <img src="${escapeHtml(getImage("goby_guarantee_icon", "/placeholder.svg?height=80&width=80"))}" alt="Guarantee" class="w-20 h-20 mx-auto mb-6">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">${escapeHtml(getText("goby_guarantee_title", "UNLIMITED COMPLIMENTARY GUARANTEES."))}</h2>
          <p class="text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto">${escapeHtml(getText("goby_guarantee_description", "If you don't love your brush, we'll do whatever it takes to make it right."))}</p>
          <a href="${escapeHtml(guaranteeCta.href)}" class="bg-white text-gray-900 px-10 py-4 rounded-md font-bold hover:bg-gray-100 transition-colors inline-block">${escapeHtml(guaranteeCta.text)}</a>
        </div>
      </section>

      <footer class="bg-gray-900 text-white py-12">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src="${escapeHtml(getImage("goby_footer_logo", "/placeholder.svg?height=30&width=80"))}" alt="GOBY" class="h-8 w-auto mb-4">
            </div>
            ${["shop", "company", "support"].map((section, idx) => `
              <div>
                <h5 class="font-semibold mb-4 text-sm">${escapeHtml(getText(`goby_footer_${section}_title`, section.toUpperCase()))}</h5>
                <div class="space-y-2 text-sm text-gray-400">
                  ${[0, 1, 2, 3].map((i) => `<p class="hover:text-white cursor-pointer">${escapeHtml(getText(`goby_footer_${section}_${i}`, "Link"))}</p>`).join("")}
                </div>
              </div>
            `).join("")}
          </div>
          <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>${escapeHtml(getText("goby_footer_copyright", "© GOBY"))}</p>
            <div class="flex gap-6 mt-4 md:mt-0">
              <p class="hover:text-white cursor-pointer">${escapeHtml(getText("goby_footer_privacy", "PRIVACY POLICY"))}</p>
              <p class="hover:text-white cursor-pointer">${escapeHtml(getText("goby_footer_terms", "TERMS OF SERVICE"))}</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  `
}
