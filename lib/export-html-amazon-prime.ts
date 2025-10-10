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
 * Generates HTML for Amazon Prime Template
 */
export function generateAmazonPrimeHTML(
    getText: GetText,
    getImage: GetImage,
    getButton: GetButton
): string {
    const navCta = getButton("prime_nav_cta")
    const heroCta = getButton("prime_hero_cta")
    const deliveryCta = getButton("prime_delivery_cta")
    const fastDeliveryCta = getButton("prime_fast_delivery_cta")
    const originalsCta = getButton("prime_originals_cta")
    const streamingCta = getButton("prime_streaming_cta")
    const musicCta = getButton("prime_music_cta")
    const readingCta = getButton("prime_reading_cta")
    const finalCta = getButton("prime_final_cta")

    return `
    <main class="bg-white text-gray-900">
      <!-- Navigation -->
      <header class="bg-gray-900 text-white sticky top-0 z-50">
        <div class="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
          <img src="${escapeHtml(getImage("prime_logo", "/placeholder.svg?height=30&width=100"))}" alt="Amazon Prime" class="h-8 w-auto">
          <nav class="hidden md:flex items-center gap-6 text-sm">
            <span class="hover:text-gray-300 transition-colors cursor-pointer">${escapeHtml(getText("prime_nav_0", "See more plans"))}</span>
          </nav>
          <a href="${escapeHtml(navCta.href)}" class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-semibold text-sm">
            ${escapeHtml(navCta.text)}
          </a>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="relative bg-gradient-to-br from-blue-600 to-blue-700 text-white py-16">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 class="text-4xl md:text-5xl font-bold mb-6">
                ${escapeHtml(getText("prime_hero_title", "There's something for everyone with Prime!"))}
              </h1>
              <p class="text-lg mb-8 text-blue-100">
                ${escapeHtml(getText("prime_hero_subtitle", "Check out what's included with your Prime membership. Enjoy exclusive deals, free delivery, and more."))}
              </p>
              <a href="${escapeHtml(heroCta.href)}" class="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-md font-bold text-lg shadow-lg inline-block">
                ${escapeHtml(heroCta.text)}
              </a>
              <p class="text-sm mt-4 text-blue-100">
                ${escapeHtml(getText("prime_hero_note", "Join Prime and start saving today! Cancel anytime."))}
              </p>
            </div>
            <div>
              <img src="${escapeHtml(getImage("prime_hero_image", "/placeholder.svg?height=500&width=500"))}" alt="Prime Benefits" class="w-full h-auto">
            </div>
          </div>
        </div>
      </section>

      <!-- Benefits Grid Section -->
      <section class="py-16 bg-white">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-4 gap-6">
            ${[
            { color: "bg-blue-600", icon: "📦", title: "2-day", subtitle: "shipping" },
            { color: "bg-red-600", icon: "🎬", title: "Stream", subtitle: "movies" },
            { color: "bg-pink-600", icon: "🎵", title: "Music", subtitle: "streaming" },
            { color: "bg-orange-500", icon: "📚", title: "Read", subtitle: "books" }
        ].map((benefit, i) => `
              <div class="${benefit.color} text-white rounded-lg p-8 text-center hover:opacity-90 transition-opacity cursor-pointer">
                <div class="text-5xl mb-3">${benefit.icon}</div>
                <p class="text-2xl font-bold">${escapeHtml(getText(`prime_benefit_${i + 1}_title`, benefit.title))}</p>
                <p class="text-lg">${escapeHtml(getText(`prime_benefit_${i + 1}_subtitle`, benefit.subtitle))}</p>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- Delivery Section -->
      <section class="py-16 bg-gray-50">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src="${escapeHtml(getImage("prime_delivery_image", "/placeholder.svg?height=400&width=500"))}" alt="Fast Delivery" class="w-full h-auto">
            </div>
            <div>
              <span class="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                ${escapeHtml(getText("prime_delivery_badge", "PRIME DELIVERY"))}
              </span>
              <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                ${escapeHtml(getText("prime_delivery_title", "Fast, free delivery on millions of items"))}
              </h2>
              <p class="text-lg text-gray-600 mb-6 leading-relaxed">
                ${escapeHtml(getText("prime_delivery_description", "Save time and money. Millions of items with FREE two-day delivery."))}
              </p>
              <a href="${escapeHtml(deliveryCta.href)}" class="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-2">
                ${escapeHtml(deliveryCta.text)}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Info Section -->
      <section class="py-12 bg-white">
        <div class="mx-auto max-w-4xl px-6 text-center">
          <h2 class="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            ${escapeHtml(getText("prime_info_title", "Here's a little more about Prime that we think you'll love:"))}
          </h2>
        </div>
      </section>

      <!-- Fast Delivery Feature -->
      <section class="relative bg-gradient-to-r from-red-500 to-pink-500 text-white py-20">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-4xl md:text-5xl font-bold mb-6">
                ${escapeHtml(getText("prime_fast_delivery_title", "Fast, free delivery on millions of items"))}
              </h2>
              <p class="text-lg mb-6 text-red-50">
                ${escapeHtml(getText("prime_fast_delivery_description", "Prime members get FREE Two-Day Delivery on millions of eligible items."))}
              </p>
              <a href="${escapeHtml(fastDeliveryCta.href)}" class="text-white font-semibold hover:text-red-100 inline-flex items-center gap-2">
                ${escapeHtml(fastDeliveryCta.text)}
              </a>
            </div>
            <div>
              <img src="${escapeHtml(getImage("prime_fast_delivery_image", "/placeholder.svg?height=400&width=400"))}" alt="Fast Delivery" class="w-full h-auto">
            </div>
          </div>
        </div>
      </section>

      <!-- Amazon Originals Section -->
      <section class="py-20 bg-white">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src="${escapeHtml(getImage("prime_originals_image", "/placeholder.svg?height=400&width=400"))}" alt="Amazon Originals" class="w-full h-auto rounded-lg shadow-xl">
            </div>
            <div>
              <span class="inline-block bg-gray-900 text-white px-4 py-2 rounded text-sm font-bold mb-4">
                ${escapeHtml(getText("prime_originals_badge", "INSTANTLY UPLOAD"))}
              </span>
              <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                ${escapeHtml(getText("prime_originals_title", "Exclusive access to Amazon Originals"))}
              </h2>
              <p class="text-lg text-gray-600 mb-6 leading-relaxed">
                ${escapeHtml(getText("prime_originals_description", "Enjoy exclusive Amazon Original series and movies you can't watch anywhere else."))}
              </p>
              <a href="${escapeHtml(originalsCta.href)}" class="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-2">
                ${escapeHtml(originalsCta.text)}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Streaming Section -->
      <section class="py-20 bg-gray-50">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="order-2 md:order-1">
              <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                ${escapeHtml(getText("prime_streaming_title", "Stream or download hit movies and TV shows"))}
              </h2>
              <p class="text-lg text-gray-600 mb-6 leading-relaxed">
                ${escapeHtml(getText("prime_streaming_description", "As a Prime member, you can watch popular movies and TV shows at no extra cost."))}
              </p>
              <a href="${escapeHtml(streamingCta.href)}" class="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-2">
                ${escapeHtml(streamingCta.text)}
              </a>
            </div>
            <div class="order-1 md:order-2">
              <img src="${escapeHtml(getImage("prime_streaming_image", "/placeholder.svg?height=400&width=600"))}" alt="Streaming" class="w-full h-auto rounded-lg">
            </div>
          </div>
        </div>
      </section>

      <!-- Music Section -->
      <section class="py-20 bg-white">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src="${escapeHtml(getImage("prime_music_image", "/placeholder.svg?height=400&width=400"))}" alt="Prime Music" class="w-full h-auto rounded-lg shadow-xl">
            </div>
            <div>
              <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                ${escapeHtml(getText("prime_music_title", "Stay on top of the hottest music"))}
              </h2>
              <p class="text-lg text-gray-600 mb-6 leading-relaxed">
                ${escapeHtml(getText("prime_music_description", "Prime members can listen to 2 million songs ad-free, plus thousands of playlists."))}
              </p>
              <a href="${escapeHtml(musicCta.href)}" class="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-2">
                ${escapeHtml(musicCta.text)}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Reading Section -->
      <section class="py-20 bg-blue-50">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="order-2 md:order-1">
              <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                ${escapeHtml(getText("prime_reading_title", "Prime members read for no additional cost"))}
              </h2>
              <p class="text-lg text-gray-600 mb-6 leading-relaxed">
                ${escapeHtml(getText("prime_reading_description", "Read as much as you like from over a thousand top Kindle books, magazines, and more."))}
              </p>
              <a href="${escapeHtml(readingCta.href)}" class="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-2">
                ${escapeHtml(readingCta.text)}
              </a>
            </div>
            <div class="order-1 md:order-2">
              <img src="${escapeHtml(getImage("prime_reading_image", "/placeholder.svg?height=500&width=600"))}" alt="Prime Reading" class="w-full h-auto">
            </div>
          </div>
        </div>
      </section>

      <!-- Final CTA Section -->
      <section class="py-20 bg-white">
        <div class="mx-auto max-w-4xl px-6 text-center">
          <img src="${escapeHtml(getImage("prime_final_image", "/placeholder.svg?height=400&width=300"))}" alt="Join Prime" class="w-64 h-auto mx-auto mb-8">
          <h2 class="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            ${escapeHtml(getText("prime_final_title", "There's something for everyone"))}
          </h2>
          <a href="${escapeHtml(finalCta.href)}" class="bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 rounded-md font-bold text-lg shadow-lg inline-block">
            ${escapeHtml(finalCta.text)}
          </a>
          <p class="text-sm text-blue-600 mt-4 hover:underline cursor-pointer">
            ${escapeHtml(getText("prime_final_note", "Already a member? Sign in here. Cancel anytime."))}
          </p>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-gray-900 text-white py-8">
        <div class="mx-auto max-w-7xl px-6 text-center">
          <p class="text-sm text-gray-400">${escapeHtml(getText("prime_footer_links", "Back to top"))}</p>
          <div class="mt-4 text-xs text-gray-500">
            <p>${escapeHtml(getText("prime_footer_copyright", "© 2025 Amazon.com, Inc. or its affiliates"))}</p>
          </div>
        </div>
      </footer>
    </main>
  `
}
