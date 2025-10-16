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
 * Get theme-specific CSS classes for Agency Pro templates
 */
function getAgencyProThemeStyles(theme: string) {
    const themes: Record<string, any> = {
        "modern-minimal": {
            mainBg: "bg-white",
            mainText: "text-gray-900",
            headerBg: "bg-white/95 backdrop-blur border-b border-gray-200",
            headerText: "text-gray-900",
            heroBg: "bg-white",
            primaryBtn: "bg-blue-600 text-white hover:bg-blue-700",
            secondaryBtn: "bg-white text-gray-900 border-2 border-gray-200 hover:bg-gray-50",
            sectionBg: "bg-gray-50",
            cardBg: "bg-white",
            cardBorder: "border-gray-200",
        },
        "vibrant-playful": {
            mainBg: "bg-gradient-to-br from-pink-50 via-yellow-50 to-cyan-50",
            mainText: "text-gray-900",
            headerBg: "bg-white/90 backdrop-blur border-b-4 border-pink-400 shadow-lg",
            headerText: "bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent",
            heroBg: "bg-gradient-to-br from-pink-50 via-yellow-50 to-cyan-50",
            primaryBtn: "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 shadow-2xl",
            secondaryBtn: "bg-white text-pink-600 border-4 border-pink-400 hover:bg-pink-50 shadow-xl",
            sectionBg: "bg-white",
            cardBg: "bg-white",
            cardBorder: "border-pink-200",
        },
        "corporate-blue": {
            mainBg: "bg-slate-50",
            mainText: "text-slate-900",
            headerBg: "bg-white shadow-md border-b-2 border-blue-600",
            headerText: "text-blue-900",
            heroBg: "bg-gradient-to-br from-blue-50 to-slate-100",
            primaryBtn: "bg-blue-600 text-white hover:bg-blue-700 shadow-xl",
            secondaryBtn: "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50",
            sectionBg: "bg-white",
            cardBg: "bg-white",
            cardBorder: "border-blue-200",
        },
        "elegant-dark": {
            mainBg: "bg-gray-900",
            mainText: "text-white",
            headerBg: "bg-gray-900/95 backdrop-blur border-b border-gray-700",
            headerText: "text-white",
            heroBg: "bg-gray-900",
            primaryBtn: "bg-white text-gray-900 hover:bg-gray-100",
            secondaryBtn: "bg-transparent text-white border-2 border-white hover:bg-white/10",
            sectionBg: "bg-gray-800",
            cardBg: "bg-gray-800",
            cardBorder: "border-gray-700",
        },
        "creative-bold": {
            mainBg: "bg-black",
            mainText: "text-white",
            headerBg: "bg-black/95 backdrop-blur border-b-4 border-yellow-400",
            headerText: "text-yellow-400",
            heroBg: "bg-black",
            primaryBtn: "bg-yellow-400 text-black hover:bg-yellow-500 font-black",
            secondaryBtn: "bg-transparent text-yellow-400 border-4 border-yellow-400 hover:bg-yellow-400/10 font-black",
            sectionBg: "bg-gray-900",
            cardBg: "bg-gray-900",
            cardBorder: "border-yellow-400",
        },
        "nature-calm": {
            mainBg: "bg-gradient-to-br from-green-50 to-teal-50",
            mainText: "text-gray-900",
            headerBg: "bg-white/95 backdrop-blur border-b-2 border-green-600 shadow-sm",
            headerText: "text-green-800",
            heroBg: "bg-gradient-to-br from-green-50 to-teal-50",
            primaryBtn: "bg-green-600 text-white hover:bg-green-700",
            secondaryBtn: "bg-white text-green-600 border-2 border-green-600 hover:bg-green-50",
            sectionBg: "bg-white",
            cardBg: "bg-white",
            cardBorder: "border-green-200",
        },
    }

    return themes[theme] || themes["modern-minimal"]
}

/**
 * Generates HTML for Agency Pro Template
 */
export function generateAgencyProHTML(
    getText: GetText,
    getImage: GetImage,
    getButton: GetButton,
    theme?: string
): string {
    const t = getAgencyProThemeStyles(theme || "modern-minimal")
    const navCta = getButton("agency_pro_nav_cta")
    const heroPrimary = getButton("agency_pro_hero_cta_primary")
    const heroSecondary = getButton("agency_pro_hero_cta_secondary")
    const ctaPrimary = getButton("agency_pro_cta_primary")
    const ctaSecondary = getButton("agency_pro_cta_secondary")

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(getText("agency_pro_brand", "CreativeStudio"))}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="${t.mainBg} ${t.mainText}">
    <!-- Navigation -->
    <header class="sticky top-0 z-40 ${t.headerBg}">
        <div class="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
            <h1 class="text-xl font-bold ${t.headerText}">${escapeHtml(getText("agency_pro_brand", "CreativeStudio"))}</h1>
            <nav class="hidden md:flex items-center gap-8 text-sm font-medium">
                <span>${escapeHtml(getText("agency_pro_nav_1", "Services"))}</span>
                <span>${escapeHtml(getText("agency_pro_nav_2", "Work"))}</span>
                <span>${escapeHtml(getText("agency_pro_nav_3", "About"))}</span>
                <span>${escapeHtml(getText("agency_pro_nav_4", "Blog"))}</span>
                <span>${escapeHtml(getText("agency_pro_nav_5", "Contact"))}</span>
            </nav>
            <div class="flex items-center gap-3">
                <a href="${escapeHtml(navCta.href)}" class="${t.primaryBtn} px-4 py-2 rounded-md text-sm font-medium">
                    ${escapeHtml(navCta.text)}
                </a>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="mx-auto max-w-7xl px-4 py-20 md:py-28">
        <div class="text-center max-w-4xl mx-auto">
            <h2 class="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                ${escapeHtml(getText("agency_pro_hero_headline", "We Create Digital Experiences That Matter"))}
            </h2>
            <p class="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                ${escapeHtml(getText("agency_pro_hero_subheadline", "Award-winning creative agency specializing in branding, web design, and digital marketing. Let's bring your vision to life."))}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="${escapeHtml(heroPrimary.href)}" class="text-base px-8 py-6 ${t.primaryBtn} rounded-md font-medium">
                    ${escapeHtml(heroPrimary.text)}
                </a>
                <a href="${escapeHtml(heroSecondary.href)}" class="text-base px-8 py-6 ${t.secondaryBtn} rounded-md font-medium">
                    ${escapeHtml(heroSecondary.text)}
                </a>
            </div>
        </div>
        <div class="mt-16 relative">
            <img src="${escapeHtml(getImage("agency_pro_hero_image", "/placeholder.svg"))}" alt="Agency showcase" class="w-full rounded-lg shadow-2xl">
        </div>
    </section>

    <!-- Services Section -->
    <section class="bg-gray-50 py-20">
        <div class="mx-auto max-w-7xl px-4">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl font-bold mb-4">
                    ${escapeHtml(getText("agency_pro_services_title", "Our Services"))}
                </h2>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                    ${escapeHtml(getText("agency_pro_services_subtitle", "Comprehensive solutions to elevate your brand and drive growth"))}
                </p>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                ${[1, 2, 3, 4, 5, 6].map((i) => {
        const icons = ["🎨", "💻", "📱", "🚀", "📊", "✨"]
        const titles = ["Brand Identity", "Web Design", "Mobile Apps", "Digital Marketing", "SEO & Analytics", "Content Strategy"]
        const descs = [
            "Create a memorable brand that resonates with your audience and stands out from the competition.",
            "Beautiful, responsive websites that convert visitors into customers and deliver exceptional user experiences.",
            "Native and cross-platform mobile applications that engage users and drive business growth.",
            "Data-driven marketing campaigns that reach your target audience and maximize ROI.",
            "Optimize your online presence and track performance with advanced analytics and SEO strategies.",
            "Strategic content that tells your story, builds trust, and drives meaningful engagement."
        ]
        return `
                <div class="${t.cardBg} p-8 rounded-lg border ${t.cardBorder} hover:shadow-lg transition-shadow">
                    <div class="w-12 h-12 rounded-lg ${t.cardBg} border ${t.cardBorder} flex items-center justify-center mb-4 text-2xl">
                        ${escapeHtml(getText(`agency_pro_service_icon_${i}`, icons[i - 1]))}
                    </div>
                    <h3 class="text-xl font-bold mb-3">
                        ${escapeHtml(getText(`agency_pro_service_title_${i}`, titles[i - 1]))}
                    </h3>
                    <p class="text-gray-600">
                        ${escapeHtml(getText(`agency_pro_service_desc_${i}`, descs[i - 1]))}
                    </p>
                </div>
                `
    }).join("")}
            </div>
        </div>
    </section>

    <!-- Case Studies Section -->
    <section class="py-20">
        <div class="mx-auto max-w-7xl px-4">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl font-bold mb-4">
                    ${escapeHtml(getText("agency_pro_cases_title", "Featured Work"))}
                </h2>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                    ${escapeHtml(getText("agency_pro_cases_subtitle", "Success stories from our amazing clients"))}
                </p>
            </div>
            <div class="grid md:grid-cols-2 gap-8">
                ${[1, 2, 3, 4].map((i) => {
        const tags = ["Branding", "Web Design", "Marketing", "Mobile App"]
        const titles = ["TechStart Rebranding", "E-commerce Platform", "Growth Campaign", "Fitness App Launch"]
        const descs = [
            "Complete brand overhaul for a leading tech startup, resulting in 300% increase in brand recognition.",
            "Custom e-commerce solution that increased conversion rates by 150% and revenue by $2M annually.",
            "Multi-channel marketing campaign that generated 50K+ leads and 200% ROI in 6 months.",
            "Award-winning fitness app with 100K+ downloads and 4.8-star rating in first month."
        ]
        return `
                <div class="group cursor-pointer">
                    <div class="relative overflow-hidden rounded-lg mb-4">
                        <img src="${escapeHtml(getImage(`agency_pro_case_image_${i}`, "/placeholder.svg"))}" alt="Case study ${i}" class="w-full h-80 object-cover transition-transform group-hover:scale-105">
                    </div>
                    <div class="flex items-center gap-2 mb-2">
                        <span class="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-600">
                            ${escapeHtml(getText(`agency_pro_case_tag_${i}`, tags[i - 1]))}
                        </span>
                    </div>
                    <h3 class="text-2xl font-bold mb-2">
                        ${escapeHtml(getText(`agency_pro_case_title_${i}`, titles[i - 1]))}
                    </h3>
                    <p class="text-gray-600 mb-4">
                        ${escapeHtml(getText(`agency_pro_case_desc_${i}`, descs[i - 1]))}
                    </p>
                </div>
                `
    }).join("")}
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="bg-gray-50 py-20">
        <div class="mx-auto max-w-7xl px-4">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl font-bold mb-4">
                    ${escapeHtml(getText("agency_pro_testimonials_title", "What Our Clients Say"))}
                </h2>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                ${[1, 2, 3].map((i) => {
        const testimonials = [
            "Working with CreativeStudio transformed our business. Their strategic approach and creative excellence exceeded all expectations.",
            "The team's professionalism and attention to detail is unmatched. They delivered a stunning website that perfectly captures our brand.",
            "Best agency we've ever worked with. They understood our vision and brought it to life beyond what we imagined."
        ]
        const names = ["Sarah Johnson", "Michael Chen", "Emily Rodriguez"]
        const roles = ["CEO, TechVision", "Founder, StyleHub", "Director, GrowthLab"]
        return `
                <div class="bg-white p-8 rounded-lg border border-gray-200">
                    <div class="flex items-center gap-1 mb-4">
                        ${"★".repeat(5).split("").map(() => '<span class="text-yellow-500">★</span>').join("")}
                    </div>
                    <p class="text-lg mb-6 leading-relaxed">
                        ${escapeHtml(getText(`agency_pro_testimonial_text_${i}`, testimonials[i - 1]))}
                    </p>
                    <div class="flex items-center gap-3">
                        <img src="${escapeHtml(getImage(`agency_pro_testimonial_avatar_${i}`, "/placeholder.svg"))}" alt="Client avatar" class="w-12 h-12 rounded-full">
                        <div>
                            <p class="font-semibold">
                                ${escapeHtml(getText(`agency_pro_testimonial_name_${i}`, names[i - 1]))}
                            </p>
                            <p class="text-sm text-gray-600">
                                ${escapeHtml(getText(`agency_pro_testimonial_role_${i}`, roles[i - 1]))}
                            </p>
                        </div>
                    </div>
                </div>
                `
    }).join("")}
            </div>
        </div>
    </section>

    <!-- Team Section -->
    <section class="py-20">
        <div class="mx-auto max-w-7xl px-4">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl font-bold mb-4">
                    ${escapeHtml(getText("agency_pro_team_title", "Meet Our Team"))}
                </h2>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                    ${escapeHtml(getText("agency_pro_team_subtitle", "Talented professionals passionate about creating exceptional work"))}
                </p>
            </div>
            <div class="grid md:grid-cols-4 gap-8">
                ${[1, 2, 3, 4].map((i) => {
        const names = ["Alex Morgan", "Jordan Lee", "Taylor Swift", "Casey Brown"]
        const roles = ["Creative Director", "Lead Designer", "Strategy Lead", "Tech Director"]
        return `
                <div class="text-center">
                    <img src="${escapeHtml(getImage(`agency_pro_team_photo_${i}`, "/placeholder.svg"))}" alt="Team member ${i}" class="w-full aspect-square object-cover rounded-lg mb-4">
                    <h3 class="text-xl font-bold mb-1">
                        ${escapeHtml(getText(`agency_pro_team_name_${i}`, names[i - 1]))}
                    </h3>
                    <p class="text-gray-600">
                        ${escapeHtml(getText(`agency_pro_team_role_${i}`, roles[i - 1]))}
                    </p>
                </div>
                `
    }).join("")}
            </div>
        </div>
    </section>

    <!-- Blog Section -->
    <section class="bg-gray-50 py-20">
        <div class="mx-auto max-w-7xl px-4">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl font-bold mb-4">
                    ${escapeHtml(getText("agency_pro_blog_title", "Latest Insights"))}
                </h2>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                    ${escapeHtml(getText("agency_pro_blog_subtitle", "Tips, trends, and thought leadership from our team"))}
                </p>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                ${[1, 2, 3].map((i) => {
        const categories = ["Design", "Marketing", "Strategy"]
        const titles = ["10 Design Trends Shaping 2024", "How to Build a Winning Brand", "The Future of Digital Marketing"]
        const excerpts = [
            "Discover the latest design trends that are transforming the digital landscape...",
            "Learn the essential strategies for creating a brand that resonates with your audience...",
            "Explore emerging technologies and strategies that will define marketing success..."
        ]
        const dates = ["March 15, 2024", "March 10, 2024", "March 5, 2024"]
        return `
                <div class="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                    <img src="${escapeHtml(getImage(`agency_pro_blog_image_${i}`, "/placeholder.svg"))}" alt="Blog post ${i}" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <p class="text-xs font-medium text-blue-600 mb-2">
                            ${escapeHtml(getText(`agency_pro_blog_category_${i}`, categories[i - 1]))}
                        </p>
                        <h3 class="text-xl font-bold mb-2">
                            ${escapeHtml(getText(`agency_pro_blog_title_${i}`, titles[i - 1]))}
                        </h3>
                        <p class="text-gray-600 mb-4">
                            ${escapeHtml(getText(`agency_pro_blog_excerpt_${i}`, excerpts[i - 1]))}
                        </p>
                        <p class="text-sm text-gray-500">
                            ${escapeHtml(getText(`agency_pro_blog_date_${i}`, dates[i - 1]))}
                        </p>
                    </div>
                </div>
                `
    }).join("")}
            </div>
        </div>
    </section>

    <!-- Pricing Section -->
    <section class="py-20">
        <div class="mx-auto max-w-7xl px-4">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl font-bold mb-4">
                    ${escapeHtml(getText("agency_pro_pricing_title", "Flexible Pricing"))}
                </h2>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                    ${escapeHtml(getText("agency_pro_pricing_subtitle", "Choose the package that fits your needs and budget"))}
                </p>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                ${[1, 2, 3].map((i) => {
        const names = ["Starter", "Professional", "Enterprise"]
        const descs = ["Perfect for small projects", "Ideal for growing businesses", "For large-scale needs"]
        const prices = ["$2,500", "$7,500", "$15,000"]
        const isPopular = i === 2
        return `
                <div class="p-8 rounded-lg border ${isPopular ? 'border-blue-600 shadow-xl scale-105' : 'border-gray-200'} bg-white">
                    <h3 class="text-2xl font-bold mb-2">
                        ${escapeHtml(getText(`agency_pro_pricing_name_${i}`, names[i - 1]))}
                    </h3>
                    <p class="text-gray-600 mb-6">
                        ${escapeHtml(getText(`agency_pro_pricing_desc_${i}`, descs[i - 1]))}
                    </p>
                    <div class="mb-6">
                        <p class="text-4xl font-bold">
                            ${escapeHtml(getText(`agency_pro_pricing_price_${i}`, prices[i - 1]))}
                        </p>
                        <p class="text-gray-600">
                            ${escapeHtml(getText(`agency_pro_pricing_period_${i}`, "per project"))}
                        </p>
                    </div>
                    <ul class="space-y-3 mb-8">
                        ${[1, 2, 3, 4, 5].map((j) => {
            const features = [
                ["Brand consultation", "Logo design", "Basic website (5 pages)", "1 month support", "Email support"],
                ["Everything in Starter", "Full brand identity", "Custom website (15 pages)", "SEO optimization", "3 months support"],
                ["Everything in Professional", "Multi-platform strategy", "Unlimited pages", "Advanced analytics", "12 months support"]
            ]
            return `
                        <li class="flex items-start gap-2">
                            <span class="text-blue-600 mt-1">✓</span>
                            <span class="text-sm">
                                ${escapeHtml(getText(`agency_pro_pricing_feature_${i}_${j}`, features[i - 1][j - 1]))}
                            </span>
                        </li>
                        `
        }).join("")}
                    </ul>
                    <a href="#" class="block w-full text-center ${isPopular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} px-4 py-3 rounded-md font-medium">
                        ${escapeHtml(getText(`agency_pro_pricing_cta_${i}`, "Get Started"))}
                    </a>
                </div>
                `
    }).join("")}
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-blue-600 text-white py-20">
        <div class="mx-auto max-w-4xl px-4 text-center">
            <h2 class="text-3xl md:text-5xl font-bold mb-6">
                ${escapeHtml(getText("agency_pro_cta_title", "Ready to Start Your Project?"))}
            </h2>
            <p class="text-lg mb-8 text-blue-100">
                ${escapeHtml(getText("agency_pro_cta_subtitle", "Let's discuss how we can help bring your vision to life. Get in touch today for a free consultation."))}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="${escapeHtml(ctaPrimary.href)}" class="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-md font-semibold">
                    ${escapeHtml(ctaPrimary.text)}
                </a>
                <a href="${escapeHtml(ctaSecondary.href)}" class="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-md font-semibold">
                    ${escapeHtml(ctaSecondary.text)}
                </a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-50 py-12">
        <div class="mx-auto max-w-7xl px-4">
            <div class="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                    <h3 class="text-lg font-bold mb-4">${escapeHtml(getText("agency_pro_footer_brand", "CreativeStudio"))}</h3>
                    <p class="text-sm text-gray-600">${escapeHtml(getText("agency_pro_footer_tagline", "Creating digital experiences that matter since 2015."))}</p>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">${escapeHtml(getText("agency_pro_footer_col1_title", "Services"))}</h4>
                    <ul class="space-y-2 text-sm">
                        ${[1, 2, 3, 4].map((i) => {
        const services = ["Branding", "Web Design", "Marketing", "Development"]
        return `<li>${escapeHtml(getText(`agency_pro_footer_service_${i}`, services[i - 1]))}</li>`
    }).join("")}
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">${escapeHtml(getText("agency_pro_footer_col2_title", "Company"))}</h4>
                    <ul class="space-y-2 text-sm">
                        ${[1, 2, 3, 4].map((i) => {
        const company = ["About Us", "Careers", "Blog", "Contact"]
        return `<li>${escapeHtml(getText(`agency_pro_footer_company_${i}`, company[i - 1]))}</li>`
    }).join("")}
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">${escapeHtml(getText("agency_pro_footer_col3_title", "Connect"))}</h4>
                    <ul class="space-y-2 text-sm">
                        ${[1, 2, 3, 4].map((i) => {
        const social = ["Twitter", "LinkedIn", "Instagram", "Dribbble"]
        return `<li>${escapeHtml(getText(`agency_pro_footer_social_${i}`, social[i - 1]))}</li>`
    }).join("")}
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-200 pt-8 text-center">
                <p class="text-sm text-gray-600">${escapeHtml(getText("agency_pro_footer_copyright", "© 2024 CreativeStudio. All rights reserved."))}</p>
            </div>
        </div>
    </footer>
</body>
</html>`
}
