"use client"
import type { TemplateProps} from "../../types"
import { EditableButton, EditableImage, EditableText } from "../../shared/editable"

export function IPhoneProLuxuryGold(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-gradient-to-b from-amber-50 via-white to-amber-50 text-gray-900">
      {/* Luxury Navigation */}
      <header className="border-b border-amber-200 bg-white/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-8 py-4 flex items-center justify-between">
          <EditableText id="iphone_pro_brand" as="h1" className="text-2xl font-serif font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent" editable={editable} {...props}>
            iPhone Pro
          </EditableText>
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-700">
            {["Overview", "Tech Specs", "Gallery", "Compare"].map((label, i) => (
              <EditableText key={label} id={`iphone_pro_nav_${i}`} className="hover:text-amber-700 transition-colors" editable={editable} {...props}>
                {label}
              </EditableText>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <EditableButton 
              id="iphone_pro_nav_preorder" 
              className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-amber-600/30" 
              editable={editable} 
              {...props}
            >
              Reserve Now
            </EditableButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 via-yellow-50/50 to-amber-100/50"></div>
        <div className="relative mx-auto max-w-7xl px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 text-amber-800 text-sm font-semibold mb-8">
            <EditableText id="iphone_pro_hero_badge" editable={editable} {...props}>
              ✨ Luxury Edition
            </EditableText>
          </div>
          <EditableText
            id="iphone_pro_hero_title"
            as="h2"
            className="text-6xl md:text-8xl font-serif font-black mb-6 tracking-tight"
            editable={editable}
            {...props}
          >
            <span className="bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
              Titanium Elegance.
            </span>
            <br />
            <span className="text-gray-900">Timeless Luxury.</span>
          </EditableText>
          <EditableText
            id="iphone_pro_hero_subtitle"
            className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed"
            editable={editable}
            {...props}
          >
            Crafted from aerospace-grade titanium with 24K gold accents. The pinnacle of sophistication meets cutting-edge technology.
          </EditableText>
          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-8">
            <EditableButton 
              id="iphone_pro_hero_cta_primary" 
              className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-2xl shadow-amber-600/40 transform hover:scale-105 transition-all" 
              editable={editable} 
              {...props}
            >
              Reserve Yours
            </EditableButton>
            <EditableButton
              id="iphone_pro_hero_cta_secondary"
              className="bg-white hover:bg-amber-50 text-amber-800 px-10 py-4 rounded-full text-lg font-semibold border-2 border-amber-300 transition-all"
              editable={editable}
              {...props}
            >
              Explore Collection
            </EditableButton>
          </div>
          <div className="flex items-center justify-center gap-8 text-base text-amber-700 font-medium">
            <EditableText id="iphone_pro_hero_price" editable={editable} {...props}>
              From $1,499
            </EditableText>
            <span className="text-amber-300">•</span>
            <EditableText id="iphone_pro_hero_trade" editable={editable} {...props}>
              or $62.46/mo. for 24 mo.
            </EditableText>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-8">
          <div className="relative rounded-3xl overflow-hidden border-2 border-amber-200 shadow-2xl shadow-amber-600/20">
            <EditableImage
              id="iphone_pro_showcase_image"
              src="/placeholder.svg?height=800&width=1400&query=luxury%20iphone%20gold"
              alt="iPhone Pro showcase"
              className="w-full h-auto"
              editable={editable}
              {...props}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-amber-50 to-white">
        <div className="mx-auto max-w-7xl px-8">
          <div className="text-center mb-20">
            <EditableText
              id="iphone_pro_features_eyebrow"
              className="text-amber-700 font-bold text-sm uppercase tracking-widest mb-4"
              editable={editable}
              {...props}
            >
              Premium Craftsmanship
            </EditableText>
            <EditableText
              id="iphone_pro_features_title"
              as="h3"
              className="text-5xl md:text-6xl font-serif font-black mb-6 text-gray-900"
              editable={editable}
              {...props}
            >
              Masterfully engineered.
            </EditableText>
            <EditableText
              id="iphone_pro_features_subtitle"
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              editable={editable}
              {...props}
            >
              Every element refined to perfection for the discerning connoisseur.
            </EditableText>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: "⚡", 
                title: "A18 Pro Chip", 
                desc: "6-core CPU delivering unparalleled performance with whisper-quiet efficiency.",
                gradient: "from-amber-100 to-yellow-100 border-amber-300"
              },
              { 
                icon: "📸", 
                title: "Pro Camera System", 
                desc: "48MP Main camera with advanced optics. Capture moments with museum-quality clarity.",
                gradient: "from-yellow-100 to-amber-100 border-yellow-300"
              },
              { 
                icon: "🔋", 
                title: "All-Day Power", 
                desc: "Up to 29 hours of video playback. Luxury shouldn't be interrupted.",
                gradient: "from-amber-100 to-orange-100 border-amber-300"
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className={`relative p-8 rounded-2xl bg-gradient-to-br ${feature.gradient} border-2 backdrop-blur-sm hover:scale-105 transition-transform duration-300 shadow-xl`}
              >
                <div className="text-6xl mb-6">
                  <EditableText id={`iphone_pro_feature_${i}_icon`} editable={editable} {...props}>
                    {feature.icon}
                  </EditableText>
                </div>
                <EditableText
                  id={`iphone_pro_feature_${i}_title`}
                  as="h4"
                  className="text-2xl font-serif font-bold mb-4 text-gray-900"
                  editable={editable}
                  {...props}
                >
                  {feature.title}
                </EditableText>
                <EditableText
                  id={`iphone_pro_feature_${i}_desc`}
                  className="text-gray-700 leading-relaxed"
                  editable={editable}
                  {...props}
                >
                  {feature.desc}
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Camera Showcase */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <EditableText
                id="iphone_pro_camera_eyebrow"
                className="text-amber-700 font-bold text-sm uppercase tracking-widest mb-4"
                editable={editable}
                {...props}
              >
                Pro Camera System
              </EditableText>
              <EditableText
                id="iphone_pro_camera_title"
                as="h3"
                className="text-5xl md:text-6xl font-serif font-black mb-6 text-gray-900"
                editable={editable}
                {...props}
              >
                Capture perfection.
                <br />
                <span className="bg-gradient-to-r from-amber-700 to-yellow-600 bg-clip-text text-transparent">Frame excellence.</span>
              </EditableText>
              <EditableText
                id="iphone_pro_camera_desc"
                className="text-lg text-gray-600 mb-8 leading-relaxed"
                editable={editable}
                {...props}
              >
                The 48MP Main camera delivers extraordinary detail and color accuracy. Every photograph becomes a work of art.
              </EditableText>
              <ul className="space-y-4">
                {[
                  "48MP Main camera with precision optics",
                  "12MP Ultra Wide with enhanced clarity",
                  "12MP 5x Telephoto for distant beauty",
                  "Portrait mode with studio-quality depth"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-amber-600 mt-1 text-xl">◆</span>
                    <EditableText
                      id={`iphone_pro_camera_feature_${i}`}
                      className="text-gray-700"
                      editable={editable}
                      {...props}
                    >
                      {item}
                    </EditableText>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden border-2 border-amber-200 shadow-2xl">
              <EditableImage
                id="iphone_pro_camera_image"
                src="/placeholder.svg?height=700&width=600&query=luxury%20photography"
                alt="Camera sample"
                className="w-full h-auto"
                editable={editable}
                {...props}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tech Specs */}
      <section className="py-24 bg-gradient-to-b from-amber-50 to-white">
        <div className="mx-auto max-w-7xl px-8">
          <EditableText
            id="iphone_pro_specs_title"
            as="h3"
            className="text-5xl md:text-6xl font-serif font-black mb-16 text-center text-gray-900"
            editable={editable}
            {...props}
          >
            Technical mastery.
          </EditableText>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Display", value: "6.7″ Super Retina XDR", detail: "ProMotion 120Hz" },
              { label: "Chip", value: "A18 Pro", detail: "6-core Excellence" },
              { label: "Storage", value: "Up to 1TB", detail: "Limitless Capacity" },
              { label: "5G", value: "Ultra-Fast", detail: "Global Connectivity" }
            ].map((spec, i) => (
              <div key={i} className="p-6 rounded-xl bg-white border-2 border-amber-200 shadow-lg text-center hover:shadow-2xl hover:border-amber-300 transition-all">
                <EditableText
                  id={`iphone_pro_spec_${i}_label`}
                  className="text-sm text-amber-700 uppercase tracking-wider mb-2 font-bold"
                  editable={editable}
                  {...props}
                >
                  {spec.label}
                </EditableText>
                <EditableText
                  id={`iphone_pro_spec_${i}_value`}
                  className="text-2xl font-serif font-bold mb-1 text-gray-900"
                  editable={editable}
                  {...props}
                >
                  {spec.value}
                </EditableText>
                <EditableText
                  id={`iphone_pro_spec_${i}_detail`}
                  className="text-sm text-gray-600"
                  editable={editable}
                  {...props}
                >
                  {spec.detail}
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Color Options */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-8 text-center">
          <EditableText
            id="iphone_pro_colors_title"
            as="h3"
            className="text-5xl md:text-6xl font-serif font-black mb-6 text-gray-900"
            editable={editable}
            {...props}
          >
            Exquisite finishes.
          </EditableText>
          <EditableText
            id="iphone_pro_colors_subtitle"
            className="text-xl text-gray-600 mb-16"
            editable={editable}
            {...props}
          >
            Titanium design in Natural, Blue, White, and Black.
          </EditableText>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"].map((color, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-300 to-yellow-500 mb-3 mx-auto border-2 border-amber-400 shadow-xl"></div>
                <EditableText
                  id={`iphone_pro_color_${i}`}
                  className="text-sm text-gray-700 font-medium"
                  editable={editable}
                  {...props}
                >
                  {color}
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-amber-600 via-yellow-600 to-amber-700 text-white">
        <div className="mx-auto max-w-5xl px-8 text-center">
          <EditableText
            id="iphone_pro_cta_title"
            as="h3"
            className="text-5xl md:text-7xl font-serif font-black mb-8"
            editable={editable}
            {...props}
          >
            Experience true luxury.
          </EditableText>
          <EditableText
            id="iphone_pro_cta_subtitle"
            className="text-xl mb-10 opacity-95"
            editable={editable}
            {...props}
          >
            Reserve your iPhone Pro today and join an exclusive circle.
          </EditableText>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <EditableButton 
              id="iphone_pro_cta_primary" 
              className="bg-white hover:bg-amber-50 text-amber-800 px-12 py-5 rounded-full text-lg font-bold shadow-2xl transform hover:scale-105 transition-all" 
              editable={editable} 
              {...props}
            >
              Reserve Now
            </EditableButton>
            <EditableButton
              id="iphone_pro_cta_secondary"
              className="bg-transparent hover:bg-white/10 text-white px-12 py-5 rounded-full text-lg font-semibold border-2 border-white transition-all"
              editable={editable}
              {...props}
            >
              View Collection
            </EditableButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-amber-200 bg-amber-50">
        <div className="mx-auto max-w-7xl px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {[
              { title: "Shop", links: ["iPhone Pro", "Accessories"] },
              { title: "Learn More", links: ["Tech Specs", "User Guide"] },
              { title: "Support", links: ["Contact Us", "Warranty"] },
              { title: "Company", links: ["About", "Newsroom"] }
            ].map((col, colIdx) => (
              <div key={colIdx}>
                <EditableText id={`iphone_pro_footer_col${colIdx + 1}_title`} className="font-bold mb-4 text-amber-900" editable={editable} {...props}>
                  {col.title}
                </EditableText>
                <div className="space-y-2 text-sm text-gray-700">
                  {col.links.map((link, linkIdx) => (
                    <EditableText
                      key={linkIdx}
                      id={`iphone_pro_footer_${col.title.toLowerCase().replace(' ', '_')}_${linkIdx + 1}`}
                      className="block hover:text-amber-800 transition-colors"
                      editable={editable}
                      {...props}
                    >
                      {link}
                    </EditableText>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t-2 border-amber-200 text-center text-sm text-gray-600">
            <EditableText id="iphone_pro_footer_copyright" editable={editable} {...props}>
              Copyright © 2025 Apple Inc. All rights reserved. | Privacy Policy | Terms of Use
            </EditableText>
          </div>
        </div>
      </footer>
    </main>
  )
}
