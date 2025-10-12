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
 * Generates HTML for Ecommerce Pro Template
 */
export function generateEcommerceProHTML(
    getText: GetText,
    getImage: GetImage,
    getButton: GetButton
): string {
    const navCart = getButton("ecommerce_pro_nav_cart")
    const heroPrimary = getButton("ecommerce_pro_hero_cta_primary")
    const heroSecondary = getButton("ecommerce_pro_hero_cta_secondary")
    const newsletterCta = getButton("ecommerce_pro_newsletter_cta")

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(getText("ecommerce_pro_brand", "ShopPro"))}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-gray-900">
    <!-- Navigation -->
    <header class="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div class="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
            <h1 class="text-xl font-bold">${escapeHtml(getText("ecommerce_pro_brand", "ShopPro"))}</h1>
            <nav class="hidden md:flex items-center gap-8 text-sm font-medium">
                <span>${escapeHtml(getText("ecommerce_pro_nav_1", "Shop"))}</span>
                <span>${escapeHtml(getText("ecommerce_pro_nav_2", "Collections"))}</span>
                <span>${escapeHtml(getText("ecommerce_pro_nav_3", "About"))}</span>
                <span>${escapeHtml(getText("ecommerce_pro_nav_4", "Contact"))}</span>
            </nav>
            <div class="flex items-center gap-3">
                <a href="${escapeHtml(navCart.href)}" class="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800">
                    ${escapeHtml(navCart.text)}
                </a>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="relative bg-gray-50 py-20 md:py-28">
        <div class="mx-auto max-w-7xl px-4">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <span class="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
                        ${escapeHtml(getText("ecommerce_pro_hero_badge", "New Collection"))}
                    </span>
                    <h2 class="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        ${escapeHtml(getText("ecommerce_pro_hero_headline", "Discover Your Perfect Style"))}
                    </h2>
                    <p class="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                        ${escapeHtml(getText("ecommerce_pro_hero_subheadline", "Premium quality products curated for modern living. Free shipping on orders over $50."))}
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4">
                        <a href="${escapeHtml(heroPrimary.href)}" class="text-base px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium text-center">
                            ${escapeHtml(heroPrimary.text)}
                        </a>
                        <a href="${escapeHtml(heroSecondary.href)}" class="text-base px-8 py-4 bg-white text-gray-900 hover:bg-gray-50 border border-gray-300 rounded-md font-medium text-center">
                            ${escapeHtml(heroSecondary.text)}
                        </a>
                    </div>
                </div>
                <div>
                    <img src="${escapeHtml(getImage("ecommerce_pro_hero_image", "/placeholder.svg"))}" alt="Hero product" class="w-full rounded-lg shadow-xl">
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
        <div class="mx-auto max-w-7xl px-4">
            <div class="grid md:grid-cols-4 gap-8">
                ${[1, 2, 3, 4].map((i) => {
        const icons = ["🚚", "🔒", "↩️", "💳"]
        const titles = ["Free Shipping", "Secure Payment", "Easy Returns", "24/7 Support"]
        const descs = ["On orders over $50", "100% secure checkout", "30-day return policy", "We're here to help"]
        return `
                <div class="text-center">
                    <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4 text-2xl">
                        ${escapeHtml(getText(`ecommerce_pro_feature_icon_${i}`, icons[i - 1]))}
                    </div>
                    <h3 class="font-semibold mb-2">
                        ${escapeHtml(getText(`ecommerce_pro_feature_title_${i}`, titles[i - 1]))}
                    </h3>
                    <p class="text-sm text-gray-600">
                        ${escapeHtml(getText(`ecommerce_pro_feature_desc_${i}`, descs[i - 1]))}
                    </p>
                </div>
                `
    }).join("")}
            </div>
        </div>
    </section>

    <!-- Featured Products Section -->
    <section class="py-20 bg-gray-50">
        <div class="mx-auto max-w-7xl px-4">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl font-bold mb-4">
                    ${escapeHtml(getText("ecommerce_pro_featured_title", "Featured Products"))}
                </h2>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                    ${escapeHtml(getText("ecommerce_pro_featured_subtitle", "Handpicked favorites from our latest collection"))}
                </p>
            </div>
            <div class="grid md:grid-cols-4 gap-8">
                ${[1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
        const categories = ["Clothing", "Clothing", "Accessories", "Accessories", "Shoes", "Shoes", "Home", "Home"]
        const badges = i % 3 === 0 ? "Sale" : i % 2 === 0 ? "New" : ""
        return `
                <div class="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                    <div class="relative overflow-hidden aspect-square">
                        <img src="${escapeHtml(getImage(`ecommerce_pro_product_image_${i}`, "/placeholder.svg"))}" alt="Product ${i}" class="w-full h-full object-cover">
                        ${badges ? `<div class="absolute top-2 right-2">
                            <span class="text-xs font-semibold px-2 py-1 rounded bg-blue-600 text-white">
                                ${escapeHtml(getText(`ecommerce_pro_product_badge_${i}`, badges))}
                            </span>
                        </div>` : ''}
                    </div>
                    <div class="p-4">
                        <p class="text-xs text-gray-600 mb-1">
                            ${escapeHtml(getText(`ecommerce_pro_product_category_${i}`, categories[i - 1]))}
                        </p>
                        <h3 class="font-semibold mb-2">
                            ${escapeHtml(getText(`ecommerce_pro_product_name_${i}`, `Product Name ${i}`))}
                        </h3>
                        <div class="flex items-center justify-between">
                            <p class="text-lg font-bold">
                                ${escapeHtml(getText(`ecommerce_pro_product_price_${i}`, `$${(29.99 + i * 10).toFixed(2)}`))}
                            </p>
                            <a href="${escapeHtml(getButton(`ecommerce_pro_product_cta_${i}`).href)}" class="text-sm px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                ${escapeHtml(getButton(`ecommerce_pro_product_cta_${i}`).text)}
                            </a>
                        </div>
                    </div>
                </div>
                `
    }).join("")}
            </div>
        </div>
    </section>

    <!-- Collections Section -->
    <section class="py-20 bg-white">
        <div class="mx-auto max-w-7xl px-4">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl font-bold mb-4">
                    ${escapeHtml(getText("ecommerce_pro_collections_title", "Shop by Collection"))}
                </h2>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                    ${escapeHtml(getText("ecommerce_pro_collections_subtitle", "Curated collections for every occasion"))}
                </p>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                ${[1, 2, 3].map((i) => {
        const names = ["Summer Collection", "Winter Essentials", "Spring Arrivals"]
        const descs = ["Light & breezy styles", "Stay warm in style", "Fresh new looks"]
        return `
                <div class="relative group cursor-pointer overflow-hidden rounded-lg">
                    <img src="${escapeHtml(getImage(`ecommerce_pro_collection_image_${i}`, "/placeholder.svg"))}" alt="Collection ${i}" class="w-full h-96 object-cover group-hover:scale-105 transition-transform">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                        <div>
                            <h3 class="text-2xl font-bold text-white mb-2">
                                ${escapeHtml(getText(`ecommerce_pro_collection_name_${i}`, names[i - 1]))}
                            </h3>
                            <p class="text-white/90 mb-4">
                                ${escapeHtml(getText(`ecommerce_pro_collection_desc_${i}`, descs[i - 1]))}
                            </p>
                            <a href="${escapeHtml(getButton(`ecommerce_pro_collection_cta_${i}`).href)}" class="inline-block bg-white text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-100">
                                ${escapeHtml(getButton(`ecommerce_pro_collection_cta_${i}`).text)}
                            </a>
                        </div>
                    </div>
                </div>
                `
    }).join("")}
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20 bg-gray-50">
        <div class="mx-auto max-w-7xl px-4">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl font-bold mb-4">
                    ${escapeHtml(getText("ecommerce_pro_testimonials_title", "What Our Customers Say"))}
                </h2>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                ${[1, 2, 3].map((i) => {
        const testimonials = [
            "Amazing quality and fast shipping! The products exceeded my expectations. Will definitely shop again.",
            "Love the attention to detail and customer service. Every purchase has been perfect.",
            "Best online shopping experience I've had. The quality is outstanding and prices are fair."
        ]
        const names = ["Jessica Miller", "David Park", "Amanda Chen"]
        const locations = ["New York, NY", "Los Angeles, CA", "Chicago, IL"]
        return `
                <div class="bg-white p-8 rounded-lg border border-gray-200">
                    <div class="flex items-center gap-1 mb-4">
                        ${"★".repeat(5).split("").map(() => '<span class="text-yellow-500">★</span>').join("")}
                    </div>
                    <p class="text-lg mb-6 leading-relaxed">
                        ${escapeHtml(getText(`ecommerce_pro_testimonial_text_${i}`, testimonials[i - 1]))}
                    </p>
                    <div class="flex items-center gap-3">
                        <img src="${escapeHtml(getImage(`ecommerce_pro_testimonial_avatar_${i}`, "/placeholder.svg"))}" alt="Customer avatar" class="w-12 h-12 rounded-full">
                        <div>
                            <p class="font-semibold">
                                ${escapeHtml(getText(`ecommerce_pro_testimonial_name_${i}`, names[i - 1]))}
                            </p>
                            <p class="text-sm text-gray-600">
                                ${escapeHtml(getText(`ecommerce_pro_testimonial_location_${i}`, locations[i - 1]))}
                            </p>
                        </div>
                    </div>
                </div>
                `
    }).join("")}
            </div>
        </div>
    </section>

    <!-- Instagram Section -->
    <section class="py-20 bg-white">
        <div class="mx-auto max-w-7xl px-4">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl font-bold mb-4">
                    ${escapeHtml(getText("ecommerce_pro_instagram_title", "Follow Us on Instagram"))}
                </h2>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                    ${escapeHtml(getText("ecommerce_pro_instagram_subtitle", "@shoppro - Tag us in your photos for a chance to be featured"))}
                </p>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
                ${[1, 2, 3, 4, 5, 6].map((i) => `
                <div class="aspect-square overflow-hidden rounded-lg">
                    <img src="${escapeHtml(getImage(`ecommerce_pro_instagram_image_${i}`, "/placeholder.svg"))}" alt="Instagram post ${i}" class="w-full h-full object-cover hover:scale-110 transition-transform cursor-pointer">
                </div>
                `).join("")}
            </div>
        </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-20 bg-blue-600 text-white">
        <div class="mx-auto max-w-4xl px-4 text-center">
            <h2 class="text-3xl md:text-5xl font-bold mb-6">
                ${escapeHtml(getText("ecommerce_pro_newsletter_title", "Join Our Newsletter"))}
            </h2>
            <p class="text-lg mb-8 text-blue-100">
                ${escapeHtml(getText("ecommerce_pro_newsletter_subtitle", "Subscribe to get special offers, free giveaways, and exclusive deals."))}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <a href="${escapeHtml(newsletterCta.href)}" class="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-md font-semibold">
                    ${escapeHtml(newsletterCta.text)}
                </a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-50 py-12">
        <div class="mx-auto max-w-7xl px-4">
            <div class="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                    <h3 class="text-lg font-bold mb-4">${escapeHtml(getText("ecommerce_pro_footer_brand", "ShopPro"))}</h3>
                    <p class="text-sm text-gray-600">${escapeHtml(getText("ecommerce_pro_footer_tagline", "Your destination for quality products and exceptional service."))}</p>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">${escapeHtml(getText("ecommerce_pro_footer_col1_title", "Shop"))}</h4>
                    <ul class="space-y-2 text-sm">
                        ${[1, 2, 3, 4].map((i) => {
        const items = ["New Arrivals", "Best Sellers", "Sale", "Collections"]
        return `<li>${escapeHtml(getText(`ecommerce_pro_footer_shop_${i}`, items[i - 1]))}</li>`
    }).join("")}
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">${escapeHtml(getText("ecommerce_pro_footer_col2_title", "Customer Service"))}</h4>
                    <ul class="space-y-2 text-sm">
                        ${[1, 2, 3, 4].map((i) => {
        const items = ["Contact Us", "Shipping Info", "Returns", "FAQ"]
        return `<li>${escapeHtml(getText(`ecommerce_pro_footer_service_${i}`, items[i - 1]))}</li>`
    }).join("")}
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">${escapeHtml(getText("ecommerce_pro_footer_col3_title", "Follow Us"))}</h4>
                    <ul class="space-y-2 text-sm">
                        ${[1, 2, 3, 4].map((i) => {
        const items = ["Instagram", "Facebook", "Twitter", "Pinterest"]
        return `<li>${escapeHtml(getText(`ecommerce_pro_footer_social_${i}`, items[i - 1]))}</li>`
    }).join("")}
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-200 pt-8 text-center">
                <p class="text-sm text-gray-600">${escapeHtml(getText("ecommerce_pro_footer_copyright", "© 2024 ShopPro. All rights reserved."))}</p>
            </div>
        </div>
    </footer>
</body>
</html>`
}
