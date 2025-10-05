"use client"
import type { TemplateProps } from "../../types"
import { EditableButton, EditableImage, EditableText } from "../../shared/editable"

export function IPhoneProNeonCyberpunk(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-black text-white">
      {/* Cyberpunk Navigation */}
      <header className="border-b border-cyan-500/30 bg-black/90 backdrop-blur-xl sticky top-0 z-50 shadow-lg shadow-cyan-500/20">
        <div className="mx-auto max-w-7xl px-8 py-4 flex items-center justify-between">
          <EditableText id="iphone_pro_brand" as="h1" className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-pulse" editable={editable} {...props}>
            iPhone Pro
          </EditableText>
          <nav className="hidden md:flex items-center gap-10 text-sm font-bold text-cyan-400">
            {["Overview", "Tech Specs", "Gallery", "Compare"].map((label, i) => (
              <EditableText key={label} id={`iphone_pro_nav_${i}`} className="hover:text-pink-500 transition-colors" editable={editable} {...props}>
                {label}
              </EditableText>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <EditableButton 
              id="iphone_pro_nav_preorder" 
              className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-black px-6 py-2.5 rounded-md text-sm font-black shadow-lg shadow-pink-500/50 border-2 border-cyan-400" 
              editable={editable} 
              {...props}
            >
              PRE-ORDER NOW
            </EditableButton>
          </div>
        </div>
      </header>

      {/* Hero Section with Neon Glow */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border-2 border-cyan-400 text-cyan-300 text-sm font-black mb-8 shadow-lg shadow-cyan-500/30">
            <EditableText id="iphone_pro_hero_badge" editable={editable} {...props}>
              ⚡ NEXT-GEN TECH UNLEASHED
            </EditableText>
          </div>
          <EditableText
            id="iphone_pro_hero_title"
            as="h2"
            className="text-6xl md:text-8xl font-black mb-6 tracking-tighter"
            editable={editable}
            {...props}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              TITANIUM BEAST.
            </span>
            <br />
            <span className="text-white drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
              UNSTOPPABLE POWER.
            </span>
          </EditableText>
          <EditableText
            id="iphone_pro_hero_subtitle"
            className="text-xl md:text-2xl text-cyan-300 mb-10 max-w-4xl mx-auto leading-relaxed font-semibold"
            editable={editable}
            {...props}
          >
            Forged in the digital realm with aerospace-grade titanium. The most advanced camera system ever created. A18 Pro chip that breaks all limits.
          </EditableText>
          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-8">
            <EditableButton 
              id="iphone_pro_hero_cta_primary" 
              className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-black px-10 py-4 rounded-md text-lg font-black shadow-2xl shadow-pink-500/50 border-2 border-cyan-400 transform hover:scale-105 transition-all" 
              editable={editable} 
              {...props}
            >
              BUY NOW
            </EditableButton>
            <EditableButton
              id="iphone_pro_hero_cta_secondary"
              className="bg-black/50 hover:bg-black/70 text-cyan-400 px-10 py-4 rounded-md text-lg font-black border-2 border-cyan-400 shadow-lg shadow-cyan-500/30 transition-all"
              editable={editable}
              {...props}
            >
              WATCH TRAILER
            </EditableButton>
          </div>
          <div className="flex items-center justify-center gap-8 text-base text-pink-400 font-bold">
            <EditableText id="iphone_pro_hero_price" editable={editable} {...props}>
              FROM $1,199
            </EditableText>
            <span className="text-cyan-500">|</span>
            <EditableText id="iphone_pro_hero_trade" editable={editable} {...props}>
              $49.95/MO
            </EditableText>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-gradient-to-b from-black to-purple-950/30">
        <div className="mx-auto max-w-7xl px-8">
          <div className="relative rounded-xl overflow-hidden border-2 border-cyan-500 shadow-2xl shadow-cyan-500/50">
            <EditableImage
              id="iphone_pro_showcase_image"
              src="/placeholder.svg?height=800&width=1400&query=iphone%20neon"
              alt="iPhone Pro showcase"
              className="w-full h-auto"
              editable={editable}
              {...props}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-black">
        <div className="mx-auto max-w-7xl px-8">
          <div className="text-center mb-20">
            <EditableText
              id="iphone_pro_features_eyebrow"
              className="text-cyan-400 font-black text-sm uppercase tracking-widest mb-4"
              editable={editable}
              {...props}
            >
              ⚡ CUTTING-EDGE TECHNOLOGY
            </EditableText>
            <EditableText
              id="iphone_pro_features_title"
              as="h3"
              className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent"
              editable={editable}
              {...props}
            >
              ENGINEERED FOR DOMINATION.
            </EditableText>
            <EditableText
              id="iphone_pro_features_subtitle"
              className="text-xl text-purple-300 max-w-3xl mx-auto font-semibold"
              editable={editable}
              {...props}
            >
              Every component optimized for maximum performance and style.
            </EditableText>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: "⚡", 
                title: "A18 PRO CHIP", 
                desc: "6-core CPU with 2 performance and 4 efficiency cores. 20% faster than anything before.",
                gradient: "from-yellow-500/20 to-orange-500/20",
                border: "border-yellow-500",
                glow: "shadow-yellow-500/50"
              },
              { 
                icon: "📸", 
                title: "PRO CAMERA SYSTEM", 
                desc: "48MP Main | 12MP Ultra Wide | 12MP 5x Telephoto. Capture reality in 4K ProRes.",
                gradient: "from-cyan-500/20 to-blue-500/20",
                border: "border-cyan-500",
                glow: "shadow-cyan-500/50"
              },
              { 
                icon: "🔋", 
                title: "INFINITE BATTERY", 
                desc: "Up to 29 hours video playback. Fast-charge to full power in minutes.",
                gradient: "from-pink-500/20 to-purple-500/20",
                border: "border-pink-500",
                glow: "shadow-pink-500/50"
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className={`relative p-8 rounded-xl bg-gradient-to-br ${feature.gradient} border-2 ${feature.border} backdrop-blur-sm hover:scale-105 transition-transform duration-300 shadow-xl ${feature.glow}`}
              >
                <div className="text-6xl mb-6">
                  <EditableText id={`iphone_pro_feature_${i}_icon`} editable={editable} {...props}>
                    {feature.icon}
                  </EditableText>
                </div>
                <EditableText
                  id={`iphone_pro_feature_${i}_title`}
                  as="h4"
                  className="text-2xl font-black mb-4 text-white"
                  editable={editable}
                  {...props}
                >
                  {feature.title}
                </EditableText>
                <EditableText
                  id={`iphone_pro_feature_${i}_desc`}
                  className="text-gray-300 leading-relaxed font-medium"
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
      <section className="py-24 bg-gradient-to-b from-black to-purple-950/30">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <EditableText
                id="iphone_pro_camera_eyebrow"
                className="text-pink-500 font-black text-sm uppercase tracking-widest mb-4"
                editable={editable}
                {...props}
              >
                🎯 PRO CAMERA SYSTEM
              </EditableText>
              <EditableText
                id="iphone_pro_camera_title"
                as="h3"
                className="text-5xl md:text-6xl font-black mb-6"
                editable={editable}
                {...props}
              >
                <span className="text-white">SHOOT LIKE A</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">CYBERPUNK PRO.</span>
              </EditableText>
              <EditableText
                id="iphone_pro_camera_desc"
                className="text-lg text-purple-300 mb-8 leading-relaxed font-semibold"
                editable={editable}
                {...props}
              >
                48MP Main camera captures ultra-high-resolution photos with insane detail. Advanced AI delivers perfect shots in any lighting condition.
              </EditableText>
              <ul className="space-y-4">
                {[
                  "48MP Main camera with AI-powered OIS",
                  "12MP Ultra Wide with night vision",
                  "12MP 2x & 5x Telephoto zoom",
                  "Next-gen portraits with depth control"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1 text-xl">▶</span>
                    <EditableText
                      id={`iphone_pro_camera_feature_${i}`}
                      className="text-gray-300 font-medium"
                      editable={editable}
                      {...props}
                    >
                      {item}
                    </EditableText>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden border-2 border-pink-500 shadow-2xl shadow-pink-500/50">
              <EditableImage
                id="iphone_pro_camera_image"
                src="/placeholder.svg?height=700&width=600&query=cyberpunk%20photography"
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
      <section className="py-24 bg-black">
        <div className="mx-auto max-w-7xl px-8">
          <EditableText
            id="iphone_pro_specs_title"
            as="h3"
            className="text-5xl md:text-6xl font-black mb-16 text-center bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent"
            editable={editable}
            {...props}
          >
            TECH SPECS OVERLOAD.
          </EditableText>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "DISPLAY", value: "6.7″ XDR", detail: "ProMotion 120Hz", color: "cyan" },
              { label: "CHIP", value: "A18 PRO", detail: "6-core Beast", color: "pink" },
              { label: "STORAGE", value: "UP TO 1TB", detail: "Massive Space", color: "purple" },
              { label: "5G", value: "ULTRA FAST", detail: "Lightning Speed", color: "yellow" }
            ].map((spec, i) => (
              <div key={i} className={`p-6 rounded-xl bg-gradient-to-br from-${spec.color}-500/10 to-black border-2 border-${spec.color}-500 shadow-xl shadow-${spec.color}-500/30 text-center hover:scale-105 transition-transform`}>
                <EditableText
                  id={`iphone_pro_spec_${i}_label`}
                  className={`text-sm text-${spec.color}-400 uppercase tracking-wider mb-2 font-black`}
                  editable={editable}
                  {...props}
                >
                  {spec.label}
                </EditableText>
                <EditableText
                  id={`iphone_pro_spec_${i}_value`}
                  className="text-2xl font-black mb-1 text-white"
                  editable={editable}
                  {...props}
                >
                  {spec.value}
                </EditableText>
                <EditableText
                  id={`iphone_pro_spec_${i}_detail`}
                  className="text-sm text-gray-400 font-semibold"
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
      <section className="py-24 bg-gradient-to-b from-black to-purple-950/30">
        <div className="mx-auto max-w-7xl px-8 text-center">
          <EditableText
            id="iphone_pro_colors_title"
            as="h3"
            className="text-5xl md:text-6xl font-black mb-6 text-white"
            editable={editable}
            {...props}
          >
            FOUR KILLER FINISHES.
          </EditableText>
          <EditableText
            id="iphone_pro_colors_subtitle"
            className="text-xl text-cyan-400 mb-16 font-bold"
            editable={editable}
            {...props}
          >
            Titanium design in Natural, Blue, White, and Black.
          </EditableText>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {[
              { name: "Natural Titanium", gradient: "from-gray-400 to-gray-600", border: "border-gray-400" },
              { name: "Blue Titanium", gradient: "from-cyan-400 to-blue-600", border: "border-cyan-400" },
              { name: "White Titanium", gradient: "from-gray-200 to-gray-400", border: "border-gray-200" },
              { name: "Black Titanium", gradient: "from-gray-800 to-black", border: "border-gray-800" }
            ].map((color, i) => (
              <div key={i} className="text-center">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${color.gradient} mb-3 mx-auto border-2 ${color.border} shadow-xl`}></div>
                <EditableText
                  id={`iphone_pro_color_${i}`}
                  className="text-sm text-gray-400 font-bold"
                  editable={editable}
                  {...props}
                >
                  {color.name}
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/20 via-pink-500/20 to-purple-500/20 blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-5xl px-8 text-center">
          <EditableText
            id="iphone_pro_cta_title"
            as="h3"
            className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent"
            editable={editable}
            {...props}
          >
            ENTER THE FUTURE NOW.
          </EditableText>
          <EditableText
            id="iphone_pro_cta_subtitle"
            className="text-xl text-cyan-300 mb-10 font-bold"
            editable={editable}
            {...props}
          >
            Pre-order now and be the first to experience the revolution.
          </EditableText>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <EditableButton 
              id="iphone_pro_cta_primary" 
              className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-black px-12 py-5 rounded-md text-lg font-black shadow-2xl shadow-pink-500/50 border-2 border-cyan-400 transform hover:scale-105 transition-all" 
              editable={editable} 
              {...props}
            >
              PRE-ORDER NOW
            </EditableButton>
            <EditableButton
              id="iphone_pro_cta_secondary"
              className="bg-black/50 hover:bg-black/70 text-cyan-400 px-12 py-5 rounded-md text-lg font-black border-2 border-cyan-400 shadow-lg shadow-cyan-500/30 transition-all"
              editable={editable}
              {...props}
            >
              COMPARE MODELS
            </EditableButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-cyan-500/30 bg-black">
        <div className="mx-auto max-w-7xl px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <EditableText id="iphone_pro_footer_col1_title" className="font-black mb-4 text-cyan-400" editable={editable} {...props}>
                SHOP
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400 font-semibold">
                <EditableText id="iphone_pro_footer_shop_1" className="block hover:text-cyan-400 transition-colors" editable={editable} {...props}>
                  iPhone Pro
                </EditableText>
                <EditableText id="iphone_pro_footer_shop_2" className="block hover:text-cyan-400 transition-colors" editable={editable} {...props}>
                  Accessories
                </EditableText>
              </div>
            </div>
            <div>
              <EditableText id="iphone_pro_footer_col2_title" className="font-black mb-4 text-pink-400" editable={editable} {...props}>
                LEARN MORE
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400 font-semibold">
                <EditableText id="iphone_pro_footer_learn_1" className="block hover:text-pink-400 transition-colors" editable={editable} {...props}>
                  Tech Specs
                </EditableText>
                <EditableText id="iphone_pro_footer_learn_2" className="block hover:text-pink-400 transition-colors" editable={editable} {...props}>
                  User Guide
                </EditableText>
              </div>
            </div>
            <div>
              <EditableText id="iphone_pro_footer_col3_title" className="font-black mb-4 text-purple-400" editable={editable} {...props}>
                SUPPORT
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400 font-semibold">
                <EditableText id="iphone_pro_footer_support_1" className="block hover:text-purple-400 transition-colors" editable={editable} {...props}>
                  Contact Us
                </EditableText>
                <EditableText id="iphone_pro_footer_support_2" className="block hover:text-purple-400 transition-colors" editable={editable} {...props}>
                  Warranty
                </EditableText>
              </div>
            </div>
            <div>
              <EditableText id="iphone_pro_footer_col4_title" className="font-black mb-4 text-yellow-400" editable={editable} {...props}>
                COMPANY
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400 font-semibold">
                <EditableText id="iphone_pro_footer_company_1" className="block hover:text-yellow-400 transition-colors" editable={editable} {...props}>
                  About
                </EditableText>
                <EditableText id="iphone_pro_footer_company_2" className="block hover:text-yellow-400 transition-colors" editable={editable} {...props}>
                  Newsroom
                </EditableText>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t-2 border-cyan-500/30 text-center text-sm text-gray-500 font-semibold">
            <EditableText id="iphone_pro_footer_copyright" editable={editable} {...props}>
              © 2025 Apple Inc. All rights reserved. | Privacy | Terms
            </EditableText>
          </div>
        </div>
      </footer>
    </main>
  )
}
