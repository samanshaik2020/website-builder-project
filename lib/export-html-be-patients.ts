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
 * Generates HTML for Be Patients Template
 */
export function generateBePatientsHTML(
    getText: GetText,
    getImage: GetImage,
    getButton: GetButton
): string {
    const navCta = getButton("bp_nav_cta")
    const heroCta = getButton("bp_hero_cta")
    const feature1Cta = getButton("bp_feature_1_cta")
    const feature2Cta = getButton("bp_feature_2_cta")
    const emailCta = getButton("bp_email_cta")
    const finalCta = getButton("bp_final_cta")

    return `
    <main class="bg-gradient-to-b from-purple-50 via-white to-purple-50 text-gray-900">
      <!-- Navigation -->
      <header class="bg-white shadow-sm sticky top-0 z-50">
        <div class="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <img src="${escapeHtml(getImage("bp_logo", "/placeholder.svg?height=40&width=150"))}" alt="Be Patients" class="h-10 w-auto">
          <a href="${escapeHtml(navCta.href)}" class="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full font-medium text-sm">
            ${escapeHtml(navCta.text)}
          </a>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="relative py-16 bg-gradient-to-br from-purple-100 via-purple-50 to-teal-50">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="order-2 md:order-1">
              <img src="${escapeHtml(getImage("bp_hero_image", "/placeholder.svg?height=600&width=500"))}" alt="Pouch Reset Plan" class="w-full h-auto">
            </div>
            <div class="order-1 md:order-2">
              <h1 class="text-4xl md:text-5xl font-bold mb-4 text-teal-600">
                ${escapeHtml(getText("bp_hero_title", "Have you over-etched your pouch?"))}
              </h1>
              <p class="text-2xl md:text-3xl font-bold mb-4 text-gray-900 italic">
                ${escapeHtml(getText("bp_hero_subtitle", "FIX IT in just 48 hours with this tried & proven plan!"))}
              </p>
              <p class="text-base text-gray-700 mb-6 leading-relaxed">
                ${escapeHtml(getText("bp_hero_description", "Add your meals in as it tells you the PDF Plan! Includes shopping list, recipes, and meal prep tips!"))}
              </p>
              <a href="${escapeHtml(heroCta.href)}" class="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg inline-block">
                ${escapeHtml(heroCta.text)}
              </a>
              <p class="text-xs text-gray-500 mt-4">
                ${escapeHtml(getText("bp_hero_note", "*Eating slower is a 1-2 month process and takes time. Consistency is key!"))}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Reset Section -->
      <section class="py-16 bg-white">
        <div class="mx-auto max-w-4xl px-6 text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            ${escapeHtml(getText("bp_reset_title", "Reset your pouch in just 48 hours"))}
          </h2>
          <p class="text-base text-gray-700 leading-relaxed">
            ${escapeHtml(getText("bp_reset_description", "We know a time & times like these happen! You think you can eat more, and before you know it, you're eating more than you should. This 48-hour plan will help you revert the pouch so that all 'crunchy time' should shift back."))}
          </p>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-16 bg-purple-50">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-2 gap-12">
            <div class="bg-white rounded-2xl shadow-lg p-8">
              <img src="${escapeHtml(getImage("bp_feature_1_image", "/placeholder.svg?height=300&width=400"))}" alt="Meal Planning" class="w-full h-auto rounded-lg mb-6">
              <h3 class="text-2xl font-bold mb-4 text-gray-900">
                ${escapeHtml(getText("bp_feature_1_title", "Keep your 48-hr pouch reset After my Pouch Reset, I was able to eat less and my Cravings went away!"))}
              </h3>
              <p class="text-gray-700 leading-relaxed mb-4">
                ${escapeHtml(getText("bp_feature_1_description", "I was able to eat less and my Cravings went away! I'm so glad I found this program. It's helped me get back on track!"))}
              </p>
              <a href="${escapeHtml(feature1Cta.href)}" class="text-teal-600 font-semibold hover:text-teal-700">
                ${escapeHtml(feature1Cta.text)}
              </a>
            </div>

            <div class="bg-white rounded-2xl shadow-lg p-8">
              <img src="${escapeHtml(getImage("bp_feature_2_image", "/placeholder.svg?height=300&width=400"))}" alt="Meal Prep" class="w-full h-auto rounded-lg mb-6">
              <h3 class="text-2xl font-bold mb-4 text-gray-900">
                ${escapeHtml(getText("bp_feature_2_title", "I lift way! Much more and then I was back eating a healthy amount of food. I'm so glad I found this!"))}
              </h3>
              <p class="text-gray-700 leading-relaxed mb-4">
                ${escapeHtml(getText("bp_feature_2_description", "The program helped me reset my eating habits and get back to healthy portions."))}
              </p>
              <a href="${escapeHtml(feature2Cta.href)}" class="text-teal-600 font-semibold hover:text-teal-700">
                ${escapeHtml(feature2Cta.text)}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Suitable For Section -->
      <section class="py-16 bg-white">
        <div class="mx-auto max-w-6xl px-6">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            ${escapeHtml(getText("bp_suitable_title", "Suitable for all bariatric surgeries:"))}
          </h2>
          <div class="grid md:grid-cols-3 gap-8">
            ${[
            { name: "Gastric Bypass", icon: "stomach-icon-1" },
            { name: "Gastric Sleeve", icon: "stomach-icon-2" },
            { name: "Lap-Band", icon: "stomach-icon-3" }
        ].map((surgery, i) => `
              <div class="text-center">
                <div class="w-32 h-32 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <img src="${escapeHtml(getImage(`bp_surgery_${i + 1}_icon`, `/placeholder.svg?height=80&width=80`))}" alt="${surgery.name}" class="w-20 h-20">
                </div>
                <p class="text-lg font-semibold text-gray-900">
                  ${escapeHtml(getText(`bp_surgery_${i + 1}_name`, surgery.name))}
                </p>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- Why This Works Section -->
      <section class="py-16 bg-purple-50">
        <div class="mx-auto max-w-4xl px-6">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
            ${escapeHtml(getText("bp_why_title", "Why this will work for you too!"))}
          </h2>
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <p class="text-gray-700 leading-relaxed mb-6">
              ${escapeHtml(getText("bp_why_description", "This 48-hour plan is designed to help you reset your pouch and get back on track with your weight loss journey. It's simple, effective, and proven to work!"))}
            </p>
            <ul class="space-y-3 text-gray-700">
              ${[
            "Easy to follow meal plan",
            "Shopping list included",
            "Proven results in 48 hours",
            "Works for all bariatric surgeries"
        ].map((item, i) => `
                <li class="flex items-start gap-3">
                  <span class="text-teal-500 font-bold text-xl">✓</span>
                  <span>${escapeHtml(getText(`bp_why_item_${i + 1}`, item))}</span>
                </li>
              `).join("")}
            </ul>
          </div>
        </div>
      </section>

      <!-- Magic Inside Section -->
      <section class="py-16 bg-white">
        <div class="mx-auto max-w-6xl px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-3xl md:text-4xl font-bold mb-6 text-gray-900 uppercase">
                ${escapeHtml(getText("bp_magic_title", "THE MAGIC IS INSIDE YOU!"))}
              </h2>
              <p class="text-gray-700 leading-relaxed mb-6">
                ${escapeHtml(getText("bp_magic_description", "It's been a time of eating, all you need to do is RESET. You can do this! Your pouch will be fulfilled now."))}
              </p>
              <p class="text-gray-700 leading-relaxed">
                ${escapeHtml(getText("bp_magic_details", "You may feel a bit hungry at first, but that's normal. Your body is adjusting. Stay strong and you will see results!"))}
              </p>
            </div>
            <div class="flex justify-center">
              <img src="${escapeHtml(getImage("bp_magic_image", "/placeholder.svg?height=400&width=300"))}" alt="Healthcare Professional" class="w-64 h-auto">
            </div>
          </div>
        </div>
      </section>

      <!-- Email Signup Section -->
      <section class="py-12 bg-teal-50">
        <div class="mx-auto max-w-4xl px-6 text-center">
          <p class="text-lg font-semibold mb-4 text-gray-900">
            ${escapeHtml(getText("bp_email_title", "You can do this! We are here to help."))}
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" class="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 w-full">
            <a href="${escapeHtml(emailCta.href)}" class="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-full font-semibold whitespace-nowrap">
              ${escapeHtml(emailCta.text)}
            </a>
          </div>
        </div>
      </section>

      <!-- Testimonial Section -->
      <section class="py-16 bg-gradient-to-br from-teal-50 to-purple-50">
        <div class="mx-auto max-w-4xl px-6 text-center">
          <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <p class="text-2xl md:text-3xl font-serif italic text-gray-900 mb-6">
              ${escapeHtml(getText("bp_testimonial_quote", '"For me, the Pouch Reset is a cure coming crusher which is the key for success."'))}
            </p>
            <p class="text-lg font-semibold text-teal-600">
              ${escapeHtml(getText("bp_testimonial_author", "- MEGAN SUES"))}
            </p>
          </div>
        </div>
      </section>

      <!-- Final CTA Section -->
      <section class="py-20 bg-gradient-to-br from-purple-100 to-teal-100">
        <div class="mx-auto max-w-4xl px-6 text-center">
          <h2 class="text-4xl md:text-5xl font-bold mb-4 text-teal-600">
            ${escapeHtml(getText("bp_final_title", "Get the 48hr Pouch Reset Plan for FREE!"))}
          </h2>
          <p class="text-xl mb-8 text-gray-900">
            ${escapeHtml(getText("bp_final_subtitle", "PLUS: Bonus video & tips"))}
          </p>
          <a href="${escapeHtml(finalCta.href)}" class="bg-teal-500 hover:bg-teal-600 text-white px-12 py-4 rounded-full font-bold text-xl shadow-2xl inline-block">
            ${escapeHtml(finalCta.text)}
          </a>
          <p class="text-sm text-gray-600 mt-6">
            ${escapeHtml(getText("bp_final_note", "The Pouch Reset shows you my 48hr PDF method that has helped thousands of bariatric patients worldwide!"))}
          </p>
          <div class="mt-8">
            <img src="${escapeHtml(getImage("bp_final_preview", "/placeholder.svg?height=400&width=300"))}" alt="Plan Preview" class="mx-auto h-96 w-auto">
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-gray-900 text-white py-8">
        <div class="mx-auto max-w-7xl px-6 text-center">
          <img src="${escapeHtml(getImage("bp_footer_logo", "/placeholder.svg?height=40&width=150"))}" alt="Be Patients" class="h-10 w-auto mx-auto mb-4">
          <p class="text-sm text-gray-400">${escapeHtml(getText("bp_footer_copyright", "© 2025 Be Patients LLC. All Rights Reserved."))}</p>
        </div>
      </footer>
    </main>
  `
}
