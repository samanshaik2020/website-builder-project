"use client"
import type { TemplateProps } from "../../types"
import { EditableButton, EditableImage, EditableText } from "../../shared/editable"

export function IPhoneProVibrantGradient(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 text-gray-900">
      {/* Vibrant Navigation */}
      <header className="border-b border-white/50 bg-white/70 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="mx-auto max-w-7xl px-8 py-4 flex items-center justify-between">
          <EditableText id="iphone_pro_brand" as="h1" className="text-2xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent" editable={editable} {...props}>
            iPhone Pro
          </EditableText>
          <nav className="hidden md:flex items-center gap-10 text-sm font-semibold text-gray-700">
            {["Overview", "Tech Specs", "Gallery", "Compare"].map((label, i) => (
              <EditableText key={label} id={`iphone_pro_nav_${i}`} className="hover:text-purple-600 transition-colors" editable={editable} {...props}>
                {label}
              </EditableText>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <EditableButton 
              id="iphone_pro_nav_preorder" 
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-purple-500/30" 
              editable={editable} 
              {...props}
            >
              Pre-order
            </EditableButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/40 via-purple-200/40 to-blue-200/40"></div>
        <div className="relative mx-auto max-w-7xl px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-purple-300 text-purple-700 text-sm font-bold mb-8 shadow-lg">
            <EditableText id="iphone_pro_hero_badge" editable={editable} {...props}>
              ✨ Colorful Innovation
            </EditableText>
          </div>
          <EditableText
            id="iphone_pro_hero_title"
            as="h2"
            className="text-6xl md:text-8xl font-black mb-6 tracking-tighter"
            editable={editable}
            {...props}
          >
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Titanium Brilliance.
            </span>
            <br />
            <span className="text-gray-900">Vibrant Power.</span>
          </EditableText>
          <EditableText
            id="iphone_pro_hero_subtitle"
            className="text-xl md:text-2xl text-gray-700 mb-10 max-w-4xl mx-auto leading-relaxed font-semibold"
            editable={editable}
            {...props}
          >
            Experience the most colorful iPhone ever. Aerospace-grade titanium meets stunning design. A18 Pro chip delivers explosive performance.
          </EditableText>
          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-8">
            <EditableButton 
              id="iphone_pro_hero_cta_primary" 
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white px-10 py-4 rounded-full text-lg font-bold shadow-2xl shadow-purple-500/40 transform hover:scale-105 transition-all" 
              editable={editable} 
              {...props}
            >
              Buy Now
            </EditableButton>
            <EditableButton
              id="iphone_pro_hero_cta_secondary"
              className="bg-white hover:bg-purple-50 text-purple-700 px-10 py-4 rounded-full text-lg font-bold border-2 border-purple-300 shadow-lg transition-all"
              editable={editable}
              {...props}
            >
              Watch Video
            </EditableButton>
          </div>
          <div className="flex items-center justify-center gap-8 text-base text-purple-700 font-bold">
            <EditableText id="iphone_pro_hero_price" editable={editable} {...props}>
              From $1,199
            </EditableText>
            <span className="text-purple-300">•</span>
            <EditableText id="iphone_pro_hero_trade" editable={editable} {...props}>
              or $49.95/mo.
            </EditableText>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-8">
          <div className="relative rounded-3xl overflow-hidden border-4 border-purple-200 shadow-2xl shadow-purple-500/20">
            <EditableImage
              id="iphone_pro_showcase_image"
              src="/placeholder.svg?height=800&width=1400&query=colorful%20iphone"
              alt="iPhone Pro"
              className="w-full h-auto"
              editable={editable}
              {...props}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="mx-auto max-w-7xl px-8">
          <div className="text-center mb-20">
            <EditableText
              id="iphone_pro_features_eyebrow"
              className="text-purple-600 font-black text-sm uppercase tracking-widest mb-4"
              editable={editable}
              {...props}
            >
              Amazing Features
            </EditableText>
            <EditableText
              id="iphone_pro_features_title"
              as="h3"
              className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent"
              editable={editable}
              {...props}
            >
              Brilliantly engineered.
            </EditableText>
            <EditableText
              id="iphone_pro_features_subtitle"
              className="text-xl text-gray-700 max-w-3xl mx-auto font-semibold"
              editable={editable}
              {...props}
            >
              Every feature designed to bring color and joy to your life.
            </EditableText>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: "⚡", 
                title: "A18 Pro Chip", 
                desc: "6-core CPU with incredible speed. 20% faster than ever before.",
                gradient: "from-yellow-200 to-orange-200 border-orange-300"
              },
              { 
                icon: "📸", 
                title: "Pro Camera System", 
                desc: "48MP Main camera. Capture life in stunning detail and vibrant colors.",
                gradient: "from-pink-200 to-purple-200 border-purple-300"
              },
              { 
                icon: "🔋", 
                title: "All-Day Battery", 
                desc: "Up to 29 hours of video. Keep the fun going all day long.",
                gradient: "from-green-200 to-teal-200 border-teal-300"
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className={`relative p-8 rounded-3xl bg-gradient-to-br ${feature.gradient} border-2 backdrop-blur-sm hover:scale-105 transition-transform duration-300 shadow-xl`}
              >
                <div className="text-6xl mb-6">
                  <EditableText id={`iphone_pro_feature_${i}_icon`} editable={editable} {...props}>
                    {feature.icon}
                  </EditableText>
                </div>
                <EditableText
                  id={`iphone_pro_feature_${i}_title`}
                  as="h4"
                  className="text-2xl font-black mb-4 text-gray-900"
                  editable={editable}
                  {...props}
                >
                  {feature.title}
                </EditableText>
                <EditableText
                  id={`iphone_pro_feature_${i}_desc`}
                  className="text-gray-700 leading-relaxed font-semibold"
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
                className="text-pink-600 font-black text-sm uppercase tracking-widest mb-4"
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
                <span className="text-gray-900">Capture life in</span>
                <br />
                <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">vivid color.</span>
              </EditableText>
              <EditableText
                id="iphone_pro_camera_desc"
                className="text-lg text-gray-700 mb-8 leading-relaxed font-semibold"
                editable={editable}
                {...props}
              >
                48MP Main camera captures every moment with breathtaking detail and color accuracy. Advanced AI brings your photos to life.
              </EditableText>
              <ul className="space-y-4">
                {[
                  "48MP Main with advanced color science",
                  "12MP Ultra Wide for expansive shots",
                  "12MP 5x Telephoto for close-ups",
                  "Portrait mode with vibrant depth"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-purple-600 mt-1 text-xl">●</span>
                    <EditableText
                      id={`iphone_pro_camera_feature_${i}`}
                      className="text-gray-700 font-semibold"
                      editable={editable}
                      {...props}
                    >
                      {item}
                    </EditableText>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl overflow-hidden border-4 border-pink-200 shadow-2xl">
              <EditableImage
                id="iphone_pro_camera_image"
                src="/placeholder.svg?height=700&width=600&query=colorful%20photography"
                alt="Camera"
                className="w-full h-auto"
                editable={editable}
                {...props}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tech Specs */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="mx-auto max-w-7xl px-8">
          <EditableText
            id="iphone_pro_specs_title"
            as="h3"
            className="text-5xl md:text-6xl font-black mb-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            editable={editable}
            {...props}
          >
            Technical excellence.
          </EditableText>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Display", value: "6.7″ XDR", detail: "ProMotion 120Hz", color: "from-pink-200 to-purple-200 border-purple-300" },
              { label: "Chip", value: "A18 Pro", detail: "6-core Beast", color: "from-purple-200 to-blue-200 border-blue-300" },
              { label: "Storage", value: "Up to 1TB", detail: "Massive Space", color: "from-blue-200 to-teal-200 border-teal-300" },
              { label: "5G", value: "Ultra-Fast", detail: "Lightning Speed", color: "from-teal-200 to-green-200 border-green-300" }
            ].map((spec, i) => (
              <div key={i} className={`p-6 rounded-2xl bg-gradient-to-br ${spec.color} border-2 shadow-lg text-center hover:scale-105 transition-transform`}>
                <EditableText
                  id={`iphone_pro_spec_${i}_label`}
                  className="text-sm text-gray-700 uppercase tracking-wider mb-2 font-black"
                  editable={editable}
                  {...props}
                >
                  {spec.label}
                </EditableText>
                <EditableText
                  id={`iphone_pro_spec_${i}_value`}
                  className="text-2xl font-black mb-1 text-gray-900"
                  editable={editable}
                  {...props}
                >
                  {spec.value}
                </EditableText>
                <EditableText
                  id={`iphone_pro_spec_${i}_detail`}
                  className="text-sm text-gray-700 font-bold"
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
            className="text-5xl md:text-6xl font-black mb-6 text-gray-900"
            editable={editable}
            {...props}
          >
            Four stunning colors.
          </EditableText>
          <EditableText
            id="iphone_pro_colors_subtitle"
            className="text-xl text-gray-700 mb-16 font-bold"
            editable={editable}
            {...props}
          >
            Titanium design in Natural, Blue, White, and Black.
          </EditableText>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { name: "Natural Titanium", gradient: "from-amber-300 to-yellow-400" },
              { name: "Blue Titanium", gradient: "from-blue-400 to-cyan-500" },
              { name: "White Titanium", gradient: "from-gray-200 to-gray-300" },
              { name: "Black Titanium", gradient: "from-gray-700 to-gray-900" }
            ].map((color, i) => (
              <div key={i} className="text-center">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${color.gradient} mb-3 mx-auto border-4 border-white shadow-xl`}></div>
                <EditableText
                  id={`iphone_pro_color_${i}`}
                  className="text-sm text-gray-700 font-bold"
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
      <section className="py-24 bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600 text-white">
        <div className="mx-auto max-w-5xl px-8 text-center">
          <EditableText
            id="iphone_pro_cta_title"
            as="h3"
            className="text-5xl md:text-7xl font-black mb-8"
            editable={editable}
            {...props}
          >
            Your colorful life awaits.
          </EditableText>
          <EditableText
            id="iphone_pro_cta_subtitle"
            className="text-xl mb-10 opacity-95 font-semibold"
            editable={editable}
            {...props}
          >
            Pre-order now and experience the most vibrant iPhone ever.
          </EditableText>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <EditableButton 
              id="iphone_pro_cta_primary" 
              className="bg-white hover:bg-gray-100 text-purple-600 px-12 py-5 rounded-full text-lg font-black shadow-2xl transform hover:scale-105 transition-all" 
              editable={editable} 
              {...props}
            >
              Pre-order Now
            </EditableButton>
            <EditableButton
              id="iphone_pro_cta_secondary"
              className="bg-transparent hover:bg-white/10 text-white px-12 py-5 rounded-full text-lg font-bold border-2 border-white transition-all"
              editable={editable}
              {...props}
            >
              Compare Models
            </EditableButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-purple-200 bg-white">
        <div className="mx-auto max-w-7xl px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {[
              { title: "Shop", links: ["iPhone Pro", "Accessories"] },
              { title: "Learn", links: ["Tech Specs", "User Guide"] },
              { title: "Support", links: ["Contact", "Warranty"] },
              { title: "Company", links: ["About", "News"] }
            ].map((col, colIdx) => (
              <div key={colIdx}>
                <EditableText id={`iphone_pro_footer_col${colIdx + 1}_title`} className="font-black mb-4 text-purple-700" editable={editable} {...props}>
                  {col.title}
                </EditableText>
                <div className="space-y-2 text-sm text-gray-700">
                  {col.links.map((link, linkIdx) => (
                    <EditableText
                      key={linkIdx}
                      id={`iphone_pro_footer_${col.title.toLowerCase()}_${linkIdx + 1}`}
                      className="block hover:text-purple-600 transition-colors font-semibold"
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
          <div className="pt-8 border-t-2 border-purple-200 text-center text-sm text-gray-600">
            <EditableText id="iphone_pro_footer_copyright" editable={editable} {...props}>
              © 2025 Apple Inc. All rights reserved. | Privacy | Terms
            </EditableText>
          </div>
        </div>
      </footer>
    </main>
  )
}
