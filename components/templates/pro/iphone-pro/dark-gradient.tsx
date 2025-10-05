"use client"
import type { TemplateProps } from "../../types"
import { EditableButton, EditableImage, EditableText } from "../../shared/editable"

export function IPhoneProDarkGradient(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      {/* Premium Navigation */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-8 py-4 flex items-center justify-between">
          <EditableText id="iphone_pro_brand" as="h1" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent" editable={editable} {...props}>
            iPhone Pro
          </EditableText>
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
            {["Overview", "Tech Specs", "Gallery", "Compare"].map((label, i) => (
              <EditableText key={label} id={`iphone_pro_nav_${i}`} className="hover:text-blue-400 transition-colors" editable={editable} {...props}>
                {label}
              </EditableText>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <EditableButton 
              id="iphone_pro_nav_preorder" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-blue-500/30" 
              editable={editable} 
              {...props}
            >
              Pre-order Now
            </EditableButton>
          </div>
        </div>
      </header>

      {/* Hero Section with Gradient */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl"></div>
        <div className="relative mx-auto max-w-7xl px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-blue-300 text-sm font-semibold mb-8 backdrop-blur-sm">
            <EditableText id="iphone_pro_hero_badge" editable={editable} {...props}>
              ✨ Introducing iPhone 15 Pro Max
            </EditableText>
          </div>
          <EditableText
            id="iphone_pro_hero_title"
            as="h2"
            className="text-6xl md:text-8xl font-black mb-6 tracking-tighter bg-gradient-to-b from-white via-white to-gray-400 bg-clip-text text-transparent"
            editable={editable}
            {...props}
          >
            Titanium. So strong.
            <br />So light. So Pro.
          </EditableText>
          <EditableText
            id="iphone_pro_hero_subtitle"
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed"
            editable={editable}
            {...props}
          >
            Forged from aerospace-grade titanium with the most advanced camera system ever in an iPhone. Featuring the revolutionary A18 Pro chip and breakthrough Action button.
          </EditableText>
          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-8">
            <EditableButton 
              id="iphone_pro_hero_cta_primary" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-2xl shadow-blue-500/40 transform hover:scale-105 transition-all" 
              editable={editable} 
              {...props}
            >
              Buy iPhone Pro
            </EditableButton>
            <EditableButton
              id="iphone_pro_hero_cta_secondary"
              className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-full text-lg font-semibold border border-white/20 backdrop-blur-sm transition-all"
              editable={editable}
              {...props}
            >
              Watch Film
            </EditableButton>
          </div>
          <div className="flex items-center justify-center gap-8 text-base text-gray-400">
            <EditableText id="iphone_pro_hero_price" className="font-medium" editable={editable} {...props}>
              From $1,199
            </EditableText>
            <span className="text-gray-600">•</span>
            <EditableText id="iphone_pro_hero_trade" className="font-medium" editable={editable} {...props}>
              or $49.95/mo. for 24 mo.
            </EditableText>
          </div>
        </div>
      </section>

      {/* Product Showcase with Image */}
      <section className="py-20 relative">
        <div className="mx-auto max-w-7xl px-8">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/20">
            <EditableImage
              id="iphone_pro_showcase_image"
              src="/placeholder.svg?height=800&width=1400&query=iphone%20titanium"
              alt="iPhone Pro showcase"
              className="w-full h-auto"
              editable={editable}
              {...props}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-24 bg-gradient-to-b from-transparent to-slate-950/50">
        <div className="mx-auto max-w-7xl px-8">
          <div className="text-center mb-20">
            <EditableText
              id="iphone_pro_features_eyebrow"
              className="text-blue-400 font-bold text-sm uppercase tracking-widest mb-4"
              editable={editable}
              {...props}
            >
              Revolutionary Technology
            </EditableText>
            <EditableText
              id="iphone_pro_features_title"
              as="h3"
              className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
              editable={editable}
              {...props}
            >
              Engineered to perfection.
            </EditableText>
            <EditableText
              id="iphone_pro_features_subtitle"
              className="text-xl text-gray-400 max-w-3xl mx-auto"
              editable={editable}
              {...props}
            >
              Every detail meticulously crafted to deliver an unprecedented mobile experience.
            </EditableText>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: "⚡", 
                title: "A18 Pro Chip", 
                desc: "6-core CPU with 2 performance and 4 efficiency cores. Up to 20% faster than A17 Pro.",
                gradient: "from-yellow-500/20 to-orange-500/20"
              },
              { 
                icon: "📸", 
                title: "Pro Camera System", 
                desc: "48MP Main | 12MP Ultra Wide | 12MP 5x Telephoto. Capture stunning 4K ProRes video.",
                gradient: "from-blue-500/20 to-cyan-500/20"
              },
              { 
                icon: "🔋", 
                title: "All-Day Battery", 
                desc: "Up to 29 hours video playback. Fast-charge capable with 20W adapter or higher.",
                gradient: "from-green-500/20 to-emerald-500/20"
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className={`relative p-8 rounded-2xl bg-gradient-to-br ${feature.gradient} border border-white/10 backdrop-blur-sm hover:scale-105 transition-transform duration-300`}
              >
                <div className="text-6xl mb-6">
                  <EditableText id={`iphone_pro_feature_${i}_icon`} editable={editable} {...props}>
                    {feature.icon}
                  </EditableText>
                </div>
                <EditableText
                  id={`iphone_pro_feature_${i}_title`}
                  as="h4"
                  className="text-2xl font-bold mb-4"
                  editable={editable}
                  {...props}
                >
                  {feature.title}
                </EditableText>
                <EditableText
                  id={`iphone_pro_feature_${i}_desc`}
                  className="text-gray-300 leading-relaxed"
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
      <section className="py-24 bg-slate-950/50">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <EditableText
                id="iphone_pro_camera_eyebrow"
                className="text-purple-400 font-bold text-sm uppercase tracking-widest mb-4"
                editable={editable}
                {...props}
              >
                Pro Camera System
              </EditableText>
              <EditableText
                id="iphone_pro_camera_title"
                as="h3"
                className="text-5xl md:text-6xl font-black mb-6"
                editable={editable}
                {...props}
              >
                Shoot like a pro.
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Edit like a pro.
                </span>
              </EditableText>
              <EditableText
                id="iphone_pro_camera_desc"
                className="text-lg text-gray-300 mb-8 leading-relaxed"
                editable={editable}
                {...props}
              >
                The new 48MP Main camera captures super-high-resolution photos with a new level of detail and color. Advanced computational photography delivers stunning images in any light. And with ProRAW and ProRes, you have incredible creative control.
              </EditableText>
              <ul className="space-y-4">
                {[
                  "48MP Main camera with second-generation sensor-shift OIS",
                  "12MP Ultra Wide camera with autofocus",
                  "12MP 2x Telephoto and 5x Telephoto cameras",
                  "Next-generation portraits with Focus and Depth Control"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">✓</span>
                    <EditableText
                      id={`iphone_pro_camera_feature_${i}`}
                      className="text-gray-300"
                      editable={editable}
                      {...props}
                    >
                      {item}
                    </EditableText>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <EditableImage
                id="iphone_pro_camera_image"
                src="/placeholder.svg?height=700&width=600&query=professional%20photography"
                alt="Camera sample"
                className="w-full h-auto"
                editable={editable}
                {...props}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tech Specs Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-8">
          <EditableText
            id="iphone_pro_specs_title"
            as="h3"
            className="text-5xl md:text-6xl font-black mb-16 text-center"
            editable={editable}
            {...props}
          >
            Technical excellence.
          </EditableText>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Display", value: "6.7″ Super Retina XDR", detail: "ProMotion 120Hz" },
              { label: "Chip", value: "A18 Pro", detail: "6-core CPU, 6-core GPU" },
              { label: "Storage", value: "Up to 1TB", detail: "Choose your capacity" },
              { label: "5G", value: "Superfast", detail: "Download. Stream. Game." }
            ].map((spec, i) => (
              <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm text-center hover:bg-white/10 transition-colors">
                <EditableText
                  id={`iphone_pro_spec_${i}_label`}
                  className="text-sm text-gray-400 uppercase tracking-wider mb-2"
                  editable={editable}
                  {...props}
                >
                  {spec.label}
                </EditableText>
                <EditableText
                  id={`iphone_pro_spec_${i}_value`}
                  className="text-2xl font-bold mb-1"
                  editable={editable}
                  {...props}
                >
                  {spec.value}
                </EditableText>
                <EditableText
                  id={`iphone_pro_spec_${i}_detail`}
                  className="text-sm text-gray-400"
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
      <section className="py-24 bg-gradient-to-b from-slate-950/50 to-black">
        <div className="mx-auto max-w-7xl px-8 text-center">
          <EditableText
            id="iphone_pro_colors_title"
            as="h3"
            className="text-5xl md:text-6xl font-black mb-6"
            editable={editable}
            {...props}
          >
            Four stunning finishes.
          </EditableText>
          <EditableText
            id="iphone_pro_colors_subtitle"
            className="text-xl text-gray-400 mb-16"
            editable={editable}
            {...props}
          >
            Titanium design in Natural, Blue, White, and Black.
          </EditableText>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"].map((color, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 mb-3 mx-auto border-2 border-white/20 shadow-xl"></div>
                <EditableText
                  id={`iphone_pro_color_${i}`}
                  className="text-sm text-gray-400"
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
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 blur-3xl"></div>
        <div className="relative mx-auto max-w-5xl px-8 text-center">
          <EditableText
            id="iphone_pro_cta_title"
            as="h3"
            className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
            editable={editable}
            {...props}
          >
            The ultimate iPhone experience awaits.
          </EditableText>
          <EditableText
            id="iphone_pro_cta_subtitle"
            className="text-xl text-gray-300 mb-10"
            editable={editable}
            {...props}
          >
            Pre-order now and be among the first to experience iPhone Pro.
          </EditableText>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <EditableButton 
              id="iphone_pro_cta_primary" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-5 rounded-full text-lg font-bold shadow-2xl shadow-blue-500/50 transform hover:scale-105 transition-all" 
              editable={editable} 
              {...props}
            >
              Pre-order iPhone Pro
            </EditableButton>
            <EditableButton
              id="iphone_pro_cta_secondary"
              className="bg-white/10 hover:bg-white/20 text-white px-12 py-5 rounded-full text-lg font-semibold border-2 border-white/30 backdrop-blur-sm transition-all"
              editable={editable}
              {...props}
            >
              Compare Models
            </EditableButton>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="border-t border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <EditableText id="iphone_pro_footer_col1_title" className="font-semibold mb-4" editable={editable} {...props}>
                Shop
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                <EditableText id="iphone_pro_footer_shop_1" className="block hover:text-white transition-colors" editable={editable} {...props}>
                  iPhone Pro
                </EditableText>
                <EditableText id="iphone_pro_footer_shop_2" className="block hover:text-white transition-colors" editable={editable} {...props}>
                  Accessories
                </EditableText>
              </div>
            </div>
            <div>
              <EditableText id="iphone_pro_footer_col2_title" className="font-semibold mb-4" editable={editable} {...props}>
                Learn More
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                <EditableText id="iphone_pro_footer_learn_1" className="block hover:text-white transition-colors" editable={editable} {...props}>
                  Tech Specs
                </EditableText>
                <EditableText id="iphone_pro_footer_learn_2" className="block hover:text-white transition-colors" editable={editable} {...props}>
                  User Guide
                </EditableText>
              </div>
            </div>
            <div>
              <EditableText id="iphone_pro_footer_col3_title" className="font-semibold mb-4" editable={editable} {...props}>
                Support
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                <EditableText id="iphone_pro_footer_support_1" className="block hover:text-white transition-colors" editable={editable} {...props}>
                  Contact Us
                </EditableText>
                <EditableText id="iphone_pro_footer_support_2" className="block hover:text-white transition-colors" editable={editable} {...props}>
                  Warranty
                </EditableText>
              </div>
            </div>
            <div>
              <EditableText id="iphone_pro_footer_col4_title" className="font-semibold mb-4" editable={editable} {...props}>
                Company
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                <EditableText id="iphone_pro_footer_company_1" className="block hover:text-white transition-colors" editable={editable} {...props}>
                  About
                </EditableText>
                <EditableText id="iphone_pro_footer_company_2" className="block hover:text-white transition-colors" editable={editable} {...props}>
                  Newsroom
                </EditableText>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-500">
            <EditableText id="iphone_pro_footer_copyright" editable={editable} {...props}>
              Copyright © 2025 Apple Inc. All rights reserved. | Privacy Policy | Terms of Use
            </EditableText>
          </div>
        </div>
      </footer>
    </main>
  )
}
