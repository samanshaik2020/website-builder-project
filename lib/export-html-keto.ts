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
 * Generates HTML for Keto Bars Template
 */
export function generateKetoBarHTML(
  getText: GetText,
  getImage: GetImage,
  getButton: GetButton
): string {
  const navCta = getButton("keto_nav_cta")
  const heroCta = getButton("keto_hero_cta")
  const product1Cta = getButton("keto_product_1_cta")
  const featureCta = getButton("keto_feature_cta")
  const finalCta = getButton("keto_final_cta")

  return `
    <main class="bg-white text-gray-900">
      <!-- Navigation -->
      <header class="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div class="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <h1 class="text-xl font-bold">${escapeHtml(getText("keto_brand", "PERFECT KETO"))}</h1>
          <nav class="hidden md:flex items-center gap-8 text-sm font-medium">
            <span class="hover:text-teal-600 transition-colors cursor-pointer">${escapeHtml(getText("keto_nav_0", "Products"))}</span>
            <span class="hover:text-teal-600 transition-colors cursor-pointer">${escapeHtml(getText("keto_nav_1", "Nutrition"))}</span>
            <span class="hover:text-teal-600 transition-colors cursor-pointer">${escapeHtml(getText("keto_nav_2", "About"))}</span>
            <span class="hover:text-teal-600 transition-colors cursor-pointer">${escapeHtml(getText("keto_nav_3", "Reviews"))}</span>
          </nav>
          <a href="${escapeHtml(navCta.href)}" class="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 text-sm font-medium rounded">
            ${escapeHtml(navCta.text)}
          </a>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="relative bg-gradient-to-b from-teal-50 to-white py-20">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                ${escapeHtml(getText("keto_hero_title", "Your new keto secret weapon."))}
              </h2>
              <p class="text-lg text-gray-600 mb-8 leading-relaxed">
                ${escapeHtml(getText("keto_hero_subtitle", "Delicious, low-carb protein bars that keep you in ketosis. Real ingredients, amazing taste, zero compromise."))}
              </p>
              <a href="${escapeHtml(heroCta.href)}" class="inline-block bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-base font-medium rounded-lg">
                ${escapeHtml(heroCta.text)}
              </a>
            </div>
            <div class="relative">
              <img src="${escapeHtml(getImage("keto_hero_image", "/placeholder.svg?height=500&width=500"))}" alt="Keto protein bar" class="w-full h-auto rounded-lg">
            </div>
          </div>
        </div>
      </section>

      <!-- Category Bar -->
      <section class="bg-white border-y border-gray-200 py-4">
        <div class="mx-auto max-w-7xl px-6">
          <nav class="flex items-center justify-center gap-8 text-sm font-medium text-gray-600">
            <span class="hover:text-teal-600 cursor-pointer transition-colors">${escapeHtml(getText("keto_category_0", "Keto Bars"))}</span>
            <span class="hover:text-teal-600 cursor-pointer transition-colors">${escapeHtml(getText("keto_category_1", "Ingredients"))}</span>
            <span class="hover:text-teal-600 cursor-pointer transition-colors">${escapeHtml(getText("keto_category_2", "Nutrition"))}</span>
            <span class="hover:text-teal-600 cursor-pointer transition-colors">${escapeHtml(getText("keto_category_3", "Benefits"))}</span>
            <span class="hover:text-teal-600 cursor-pointer transition-colors">${escapeHtml(getText("keto_category_4", "Reviews"))}</span>
          </nav>
        </div>
      </section>

      <!-- Product Showcase Section -->
      <section class="py-20 bg-gray-50">
        <div class="mx-auto max-w-7xl px-6">
          <div class="text-center mb-16">
            <h3 class="text-4xl md:text-5xl font-bold mb-4">
              ${escapeHtml(getText("keto_showcase_title", "Keto Bars"))}
            </h3>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              ${escapeHtml(getText("keto_showcase_subtitle", "Premium ingredients, scientifically formulated for optimal ketosis"))}
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div class="relative">
              <img src="${escapeHtml(getImage("keto_product_1_image", "/placeholder.svg?height=600&width=600"))}" alt="Keto bar product" class="w-full h-auto rounded-lg shadow-xl">
            </div>
            <div>
              <h4 class="text-3xl font-bold mb-4">
                ${escapeHtml(getText("keto_product_1_title", "The perfect keto snack"))}
              </h4>
              <p class="text-gray-600 mb-6 leading-relaxed">
                ${escapeHtml(getText("keto_product_1_desc", "Our bars are made with clean, whole food ingredients. No artificial sweeteners, no maltitol, no compromise. Just pure, delicious nutrition that keeps you energized and in ketosis."))}
              </p>
              <ul class="space-y-3 mb-8">
                <li class="flex items-center gap-3">
                  <span class="text-teal-500 text-xl">✓</span>
                  <span class="text-gray-700">${escapeHtml(getText("keto_product_1_feature_0", "Only 3g net carbs per bar"))}</span>
                </li>
                <li class="flex items-center gap-3">
                  <span class="text-teal-500 text-xl">✓</span>
                  <span class="text-gray-700">${escapeHtml(getText("keto_product_1_feature_1", "15g of quality protein"))}</span>
                </li>
                <li class="flex items-center gap-3">
                  <span class="text-teal-500 text-xl">✓</span>
                  <span class="text-gray-700">${escapeHtml(getText("keto_product_1_feature_2", "Real food ingredients"))}</span>
                </li>
                <li class="flex items-center gap-3">
                  <span class="text-teal-500 text-xl">✓</span>
                  <span class="text-gray-700">${escapeHtml(getText("keto_product_1_feature_3", "No artificial sweeteners"))}</span>
                </li>
              </ul>
              <a href="${escapeHtml(product1Cta.href)}" class="inline-block bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 font-medium rounded-lg">
                ${escapeHtml(product1Cta.text)}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Benefits Section -->
      <section class="py-20 bg-white">
        <div class="mx-auto max-w-7xl px-6">
          <h3 class="text-4xl md:text-5xl font-bold mb-4 text-center">
            ${escapeHtml(getText("keto_benefits_title", "Keto Bars are perfect for..."))}
          </h3>
          <p class="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            ${escapeHtml(getText("keto_benefits_subtitle", "Whether you're at home, at work, or on the go"))}
          </p>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center p-8 bg-teal-50 rounded-lg">
              <div class="text-5xl mb-4">${escapeHtml(getText("keto_benefit_0_icon", "🏃"))}</div>
              <h4 class="text-xl font-bold mb-3">
                ${escapeHtml(getText("keto_benefit_0_title", "Pre-Workout Fuel"))}
              </h4>
              <p class="text-gray-600 text-sm leading-relaxed">
                ${escapeHtml(getText("keto_benefit_0_desc", "Clean energy without the sugar crash. Perfect before your workout or morning run."))}
              </p>
            </div>
            <div class="text-center p-8 bg-teal-50 rounded-lg">
              <div class="text-5xl mb-4">${escapeHtml(getText("keto_benefit_1_icon", "💼"))}</div>
              <h4 class="text-xl font-bold mb-3">
                ${escapeHtml(getText("keto_benefit_1_title", "Office Snack"))}
              </h4>
              <p class="text-gray-600 text-sm leading-relaxed">
                ${escapeHtml(getText("keto_benefit_1_desc", "Stay focused and energized throughout your workday with convenient, mess-free nutrition."))}
              </p>
            </div>
            <div class="text-center p-8 bg-teal-50 rounded-lg">
              <div class="text-5xl mb-4">${escapeHtml(getText("keto_benefit_2_icon", "✈️"))}</div>
              <h4 class="text-xl font-bold mb-3">
                ${escapeHtml(getText("keto_benefit_2_title", "Travel Companion"))}
              </h4>
              <p class="text-gray-600 text-sm leading-relaxed">
                ${escapeHtml(getText("keto_benefit_2_desc", "TSA-friendly and shelf-stable. Your perfect keto companion wherever you go."))}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Product Image with Text Section -->
      <section class="bg-gradient-to-b from-teal-50 to-white py-20">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 class="text-4xl md:text-5xl font-bold mb-6">
                ${escapeHtml(getText("keto_feature_title", "Keto made with real food."))}
              </h3>
              <p class="text-gray-600 mb-8 leading-relaxed">
                ${escapeHtml(getText("keto_feature_desc", "We believe in real ingredients you can pronounce. Our bars are made with almonds, coconut, cocoa, and other whole foods. No lab-created fillers or artificial ingredients."))}
              </p>
              <a href="${escapeHtml(featureCta.href)}" class="inline-block bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 font-medium rounded-lg">
                ${escapeHtml(featureCta.text)}
              </a>
            </div>
            <div class="relative">
              <img src="${escapeHtml(getImage("keto_feature_image", "/placeholder.svg?height=600&width=600"))}" alt="Keto bar with ingredients" class="w-full h-auto rounded-lg shadow-xl">
            </div>
          </div>
        </div>
      </section>

      <!-- Colorful Product Lineup -->
      <section class="py-20 bg-gradient-to-r from-orange-100 via-teal-100 to-yellow-100">
        <div class="mx-auto max-w-7xl px-6">
          <h3 class="text-4xl md:text-5xl font-bold mb-12 text-center">
            ${escapeHtml(getText("keto_flavors_title", "5 Delicious Flavors"))}
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
            ${["Chocolate", "Peanut Butter", "Coconut", "Almond", "Lemon"].map((flavor, i) => {
              const colors = [
                "from-orange-200 to-orange-300",
                "from-yellow-200 to-yellow-300",
                "from-teal-200 to-teal-300",
                "from-red-200 to-red-300",
                "from-yellow-100 to-yellow-200"
              ]
              return `
                <div class="bg-gradient-to-b ${colors[i]} p-6 rounded-lg text-center">
                  <img src="${escapeHtml(getImage(`keto_flavor_${i}_image`, `/placeholder.svg?height=200&width=150`))}" alt="${flavor}" class="w-full h-48 object-contain mb-4">
                  <p class="font-bold text-lg">${escapeHtml(getText(`keto_flavor_${i}_name`, flavor))}</p>
                </div>
              `
            }).join("")}
          </div>
        </div>
      </section>

      <!-- Nutrition Facts Section -->
      <section class="py-20 bg-white">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h3 class="text-4xl font-bold mb-6">
                ${escapeHtml(getText("keto_nutrition_title", "Nutrition Facts"))}
              </h3>
              <div class="bg-white border-2 border-gray-900 p-6 rounded-lg">
                <p class="text-sm mb-4 pb-2 border-b-2 border-gray-900">
                  ${escapeHtml(getText("keto_nutrition_serving", "Serving Size: 1 bar (50g)"))}
                </p>
                <div class="space-y-3">
                  ${[
                    { label: "Calories", value: "190" },
                    { label: "Total Fat", value: "14g" },
                    { label: "Total Carbs", value: "15g" },
                    { label: "Dietary Fiber", value: "12g" },
                    { label: "Net Carbs", value: "3g" },
                    { label: "Protein", value: "15g" }
                  ].map((item, i) => `
                    <div class="flex justify-between items-center py-2 border-b border-gray-300">
                      <span class="font-medium">${escapeHtml(getText(`keto_nutrition_${i}_label`, item.label))}</span>
                      <span class="font-bold">${escapeHtml(getText(`keto_nutrition_${i}_value`, item.value))}</span>
                    </div>
                  `).join("")}
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-4xl font-bold mb-6">
                ${escapeHtml(getText("keto_why_title", "Why we chose this formula"))}
              </h3>
              <div class="space-y-4">
                ${[
                  "Low net carbs to maintain ketosis",
                  "High quality fats from coconut and almonds",
                  "Complete amino acid profile",
                  "No blood sugar spikes",
                  "Sustained energy for hours"
                ].map((item, i) => `
                  <div class="flex items-start gap-3">
                    <span class="text-teal-500 text-xl mt-1">✓</span>
                    <span class="text-gray-700 leading-relaxed">${escapeHtml(getText(`keto_why_${i}`, item))}</span>
                  </div>
                `).join("")}
              </div>
              <p class="mt-6 text-gray-600 leading-relaxed">
                ${escapeHtml(getText("keto_why_desc", "Our formula is designed by nutritionists and tested by athletes. Every ingredient serves a purpose, and nothing is included that doesn't need to be."))}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section class="py-20 bg-gradient-to-b from-teal-50 to-white">
        <div class="mx-auto max-w-7xl px-6">
          <h3 class="text-4xl md:text-5xl font-bold mb-4 text-center">
            ${escapeHtml(getText("keto_testimonials_title", "Trusted by health leaders."))}
          </h3>
          <p class="text-center text-gray-600 mb-16">
            ${escapeHtml(getText("keto_testimonials_subtitle", "See what our customers are saying"))}
          </p>
          
          <div class="grid md:grid-cols-2 gap-8 mb-12">
            ${[
              { name: "Dr. Sarah Johnson", role: "Nutritionist", text: "These bars are a game-changer for my clients. Clean ingredients, perfect macros, and they actually taste good." },
              { name: "Mike Peterson", role: "Fitness Coach", text: "I recommend these to all my keto clients. They're the only bars I trust that won't kick you out of ketosis." },
              { name: "Jennifer Lee", role: "Keto Blogger", text: "After trying dozens of keto bars, these are the only ones I keep in my pantry. The taste and texture are unmatched." },
              { name: "David Martinez", role: "Athlete", text: "Perfect pre-workout fuel. Gives me sustained energy without any crash. I won't train without them." }
            ].map((testimonial, i) => `
              <div class="bg-white p-8 rounded-lg shadow-md">
                <div class="flex items-center mb-4">
                  <img src="${escapeHtml(getImage(`keto_testimonial_${i}_image`, `/placeholder.svg?height=60&width=60`))}" alt="${testimonial.name}" class="w-14 h-14 rounded-full mr-4">
                  <div>
                    <h5 class="font-bold">${escapeHtml(getText(`keto_testimonial_${i}_name`, testimonial.name))}</h5>
                    <p class="text-sm text-gray-500">${escapeHtml(getText(`keto_testimonial_${i}_role`, testimonial.role))}</p>
                  </div>
                </div>
                <p class="text-gray-600 text-sm leading-relaxed italic">
                  "${escapeHtml(getText(`keto_testimonial_${i}_text`, testimonial.text))}"
                </p>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="py-20 bg-white">
        <div class="mx-auto max-w-4xl px-6">
          <h3 class="text-4xl font-bold mb-12 text-center">
            ${escapeHtml(getText("keto_faq_title", "Frequently Asked Questions"))}
          </h3>
          <div class="space-y-6">
            ${[
              { q: "Are these bars really keto?", a: "Yes! With only 3g net carbs per bar, they're designed to keep you in ketosis." },
              { q: "What sweeteners do you use?", a: "We use only natural sweeteners like stevia and monk fruit. No artificial sweeteners or sugar alcohols." },
              { q: "How long do they stay fresh?", a: "Our bars have a 12-month shelf life and don't require refrigeration." },
              { q: "Are they gluten-free?", a: "Yes, all our bars are gluten-free, grain-free, and made in a dedicated facility." }
            ].map((faq, i) => `
              <div class="bg-gray-50 p-6 rounded-lg">
                <h4 class="text-lg font-bold mb-2">
                  ${escapeHtml(getText(`keto_faq_${i}_q`, faq.q))}
                </h4>
                <p class="text-gray-600">
                  ${escapeHtml(getText(`keto_faq_${i}_a`, faq.a))}
                </p>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- Final CTA Section -->
      <section class="bg-gradient-to-r from-teal-500 to-teal-600 py-20">
        <div class="mx-auto max-w-4xl px-6 text-center">
          <h3 class="text-4xl md:text-5xl font-bold mb-6 text-white">
            ${escapeHtml(getText("keto_final_title", "100% better ingredients.")).replace("<br />", "<br>")}
          </h3>
          <p class="text-lg text-teal-50 mb-8 max-w-2xl mx-auto">
            ${escapeHtml(getText("keto_final_subtitle", "Join thousands of people who have made the switch to clean keto nutrition."))}
          </p>
          <a href="${escapeHtml(finalCta.href)}" class="inline-block bg-white hover:bg-gray-100 text-teal-600 px-10 py-4 text-lg font-bold rounded-lg">
            ${escapeHtml(finalCta.text)}
          </a>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-gray-900 text-white py-12">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 class="text-xl font-bold mb-4">${escapeHtml(getText("keto_footer_brand", "PERFECT KETO"))}</h4>
              <p class="text-gray-400 text-sm">${escapeHtml(getText("keto_footer_tagline", "Real food. Real results."))}</p>
            </div>
            <div>
              <h5 class="font-semibold mb-4">${escapeHtml(getText("keto_footer_products_title", "Products"))}</h5>
              <div class="space-y-2 text-sm text-gray-400">
                <p class="hover:text-white cursor-pointer">${escapeHtml(getText("keto_footer_product_0", "Keto Bars"))}</p>
                <p class="hover:text-white cursor-pointer">${escapeHtml(getText("keto_footer_product_1", "Protein Powder"))}</p>
                <p class="hover:text-white cursor-pointer">${escapeHtml(getText("keto_footer_product_2", "MCT Oil"))}</p>
                <p class="hover:text-white cursor-pointer">${escapeHtml(getText("keto_footer_product_3", "Supplements"))}</p>
              </div>
            </div>
            <div>
              <h5 class="font-semibold mb-4">${escapeHtml(getText("keto_footer_company_title", "Company"))}</h5>
              <div class="space-y-2 text-sm text-gray-400">
                <p class="hover:text-white cursor-pointer">${escapeHtml(getText("keto_footer_company_0", "About Us"))}</p>
                <p class="hover:text-white cursor-pointer">${escapeHtml(getText("keto_footer_company_1", "Contact"))}</p>
                <p class="hover:text-white cursor-pointer">${escapeHtml(getText("keto_footer_company_2", "Blog"))}</p>
                <p class="hover:text-white cursor-pointer">${escapeHtml(getText("keto_footer_company_3", "Careers"))}</p>
              </div>
            </div>
            <div>
              <h5 class="font-semibold mb-4">${escapeHtml(getText("keto_footer_social_title", "Follow Us"))}</h5>
              <div class="flex gap-4">
                <span class="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">${escapeHtml(getText("keto_footer_social_0", "f"))}</span>
                <span class="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">${escapeHtml(getText("keto_footer_social_1", "𝕏"))}</span>
                <span class="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">${escapeHtml(getText("keto_footer_social_2", "in"))}</span>
              </div>
            </div>
          </div>
          <div class="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>${escapeHtml(getText("keto_footer_copyright", "© 2025 Perfect Keto. All rights reserved. | Privacy Policy | Terms of Service"))}</p>
          </div>
        </div>
      </footer>
    </main>
  `
}
