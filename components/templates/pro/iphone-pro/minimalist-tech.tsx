"use client"
import type { TemplateProps } from "../../types"
import { EditableButton, EditableImage, EditableText } from "../../shared/editable"

export function IPhoneProMinimalistTech(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-white text-black">
      {/* Ultra Minimal Navigation */}
      <header className="border-b border-black/10 bg-white sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-8 py-5 flex items-center justify-between">
          <EditableText id="iphone_pro_brand" as="h1" className="text-xl font-medium tracking-tight" editable={editable} {...props}>
            iPhone Pro
          </EditableText>
          <nav className="hidden md:flex items-center gap-12 text-sm">
            {["Overview", "Tech Specs", "Gallery", "Compare"].map((label, i) => (
              <EditableText key={label} id={`iphone_pro_nav_${i}`} className="hover:opacity-60 transition-opacity" editable={editable} {...props}>
                {label}
              </EditableText>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <EditableButton 
              id="iphone_pro_nav_preorder" 
              className="bg-black hover:bg-black/80 text-white px-6 py-2 rounded-none text-sm font-medium transition-all" 
              editable={editable} 
              {...props}
            >
              Order
            </EditableButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-32 md:py-40">
        <div className="relative mx-auto max-w-7xl px-8">
          <div className="max-w-4xl">
            <div className="inline-block px-3 py-1 border border-black/20 text-black/60 text-xs font-medium mb-8 tracking-wider">
              <EditableText id="iphone_pro_hero_badge" editable={editable} {...props}>
                NEW RELEASE
              </EditableText>
            </div>
            <EditableText
              id="iphone_pro_hero_title"
              as="h2"
              className="text-7xl md:text-9xl font-light mb-8 tracking-tighter leading-none"
              editable={editable}
              {...props}
            >
              iPhone Pro
            </EditableText>
            <EditableText
              id="iphone_pro_hero_subtitle"
              className="text-xl md:text-2xl text-black/60 mb-12 max-w-2xl leading-relaxed font-light"
              editable={editable}
              {...props}
            >
              Titanium design. Advanced camera system. A18 Pro chip. The essential smartphone, refined to perfection.
            </EditableText>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <EditableButton 
                id="iphone_pro_hero_cta_primary" 
                className="bg-black hover:bg-black/80 text-white px-8 py-4 rounded-none text-base font-medium transition-all" 
                editable={editable} 
                {...props}
              >
                Buy Now
              </EditableButton>
              <EditableButton
                id="iphone_pro_hero_cta_secondary"
                className="bg-white hover:bg-black/5 text-black px-8 py-4 rounded-none text-base font-medium border border-black/20 transition-all"
                editable={editable}
                {...props}
              >
                Learn More
              </EditableButton>
            </div>
            <div className="flex items-center gap-6 text-sm text-black/60">
              <EditableText id="iphone_pro_hero_price" editable={editable} {...props}>
                From $1,199
              </EditableText>
              <span className="text-black/20">|</span>
              <EditableText id="iphone_pro_hero_trade" editable={editable} {...props}>
                $49.95/mo.
              </EditableText>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-black/5">
        <div className="mx-auto max-w-7xl px-8">
          <div className="relative overflow-hidden">
            <EditableImage
              id="iphone_pro_showcase_image"
              src="/placeholder.svg?height=800&width=1400&query=minimal%20iphone"
              alt="iPhone Pro"
              className="w-full h-auto"
              editable={editable}
              {...props}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32">
        <div className="mx-auto max-w-7xl px-8">
          <div className="mb-20">
            <EditableText
              id="iphone_pro_features_eyebrow"
              className="text-black/40 font-medium text-xs uppercase tracking-widest mb-4"
              editable={editable}
              {...props}
            >
              Technology
            </EditableText>
            <EditableText
              id="iphone_pro_features_title"
              as="h3"
              className="text-5xl md:text-6xl font-light mb-6 tracking-tight"
              editable={editable}
              {...props}
            >
              Engineered for excellence.
            </EditableText>
            <EditableText
              id="iphone_pro_features_subtitle"
              className="text-xl text-black/60 max-w-2xl font-light"
              editable={editable}
              {...props}
            >
              Every component refined to deliver uncompromising performance.
            </EditableText>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-black/10">
            {[
              { 
                icon: "⚡", 
                title: "A18 Pro", 
                desc: "6-core CPU. 20% faster performance. Unprecedented efficiency."
              },
              { 
                icon: "📸", 
                title: "Pro Camera", 
                desc: "48MP Main. 12MP Ultra Wide. 12MP Telephoto. Professional results."
              },
              { 
                icon: "🔋", 
                title: "All-Day Power", 
                desc: "29 hours video playback. Fast charging. Wireless capable."
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="p-12 bg-white hover:bg-black/5 transition-colors"
              >
                <div className="text-5xl mb-6">
                  <EditableText id={`iphone_pro_feature_${i}_icon`} editable={editable} {...props}>
                    {feature.icon}
                  </EditableText>
                </div>
                <EditableText
                  id={`iphone_pro_feature_${i}_title`}
                  as="h4"
                  className="text-2xl font-medium mb-4"
                  editable={editable}
                  {...props}
                >
                  {feature.title}
                </EditableText>
                <EditableText
                  id={`iphone_pro_feature_${i}_desc`}
                  className="text-black/60 leading-relaxed font-light"
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
      <section className="py-32 bg-black/5">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <EditableText
                id="iphone_pro_camera_eyebrow"
                className="text-black/40 font-medium text-xs uppercase tracking-widest mb-4"
                editable={editable}
                {...props}
              >
                Camera System
              </EditableText>
              <EditableText
                id="iphone_pro_camera_title"
                as="h3"
                className="text-5xl md:text-6xl font-light mb-8 tracking-tight leading-tight"
                editable={editable}
                {...props}
              >
                Professional photography.
                <br />
                Simplified.
              </EditableText>
              <EditableText
                id="iphone_pro_camera_desc"
                className="text-lg text-black/60 mb-10 leading-relaxed font-light"
                editable={editable}
                {...props}
              >
                48MP Main camera delivers exceptional detail. Advanced computational photography ensures perfect results in any condition.
              </EditableText>
              <ul className="space-y-4">
                {[
                  "48MP Main with sensor-shift OIS",
                  "12MP Ultra Wide with autofocus",
                  "12MP 5x Telephoto optical zoom",
                  "Portrait mode with depth control"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-black/80">
                    <span className="mt-1.5 w-1 h-1 bg-black rounded-full flex-shrink-0"></span>
                    <EditableText
                      id={`iphone_pro_camera_feature_${i}`}
                      className="font-light"
                      editable={editable}
                      {...props}
                    >
                      {item}
                    </EditableText>
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-hidden">
              <EditableImage
                id="iphone_pro_camera_image"
                src="/placeholder.svg?height=700&width=600&query=minimal%20photography"
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
      <section className="py-32">
        <div className="mx-auto max-w-7xl px-8">
          <EditableText
            id="iphone_pro_specs_title"
            as="h3"
            className="text-5xl md:text-6xl font-light mb-20 text-center tracking-tight"
            editable={editable}
            {...props}
          >
            Specifications.
          </EditableText>
          <div className="grid md:grid-cols-4 gap-px bg-black/10">
            {[
              { label: "Display", value: "6.7″", detail: "Super Retina XDR" },
              { label: "Chip", value: "A18 Pro", detail: "6-core CPU" },
              { label: "Storage", value: "1TB", detail: "Maximum capacity" },
              { label: "5G", value: "Ultra-fast", detail: "Global coverage" }
            ].map((spec, i) => (
              <div key={i} className="p-8 bg-white text-center">
                <EditableText
                  id={`iphone_pro_spec_${i}_label`}
                  className="text-xs text-black/40 uppercase tracking-widest mb-3 font-medium"
                  editable={editable}
                  {...props}
                >
                  {spec.label}
                </EditableText>
                <EditableText
                  id={`iphone_pro_spec_${i}_value`}
                  className="text-3xl font-light mb-2"
                  editable={editable}
                  {...props}
                >
                  {spec.value}
                </EditableText>
                <EditableText
                  id={`iphone_pro_spec_${i}_detail`}
                  className="text-sm text-black/60 font-light"
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
      <section className="py-32 bg-black/5">
        <div className="mx-auto max-w-7xl px-8 text-center">
          <EditableText
            id="iphone_pro_colors_title"
            as="h3"
            className="text-5xl md:text-6xl font-light mb-6 tracking-tight"
            editable={editable}
            {...props}
          >
            Four finishes.
          </EditableText>
          <EditableText
            id="iphone_pro_colors_subtitle"
            className="text-xl text-black/60 mb-16 font-light"
            editable={editable}
            {...props}
          >
            Titanium in Natural, Blue, White, and Black.
          </EditableText>
          <div className="flex flex-wrap justify-center gap-8">
            {["Natural", "Blue", "White", "Black"].map((color, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 mb-3 mx-auto border border-black/10"></div>
                <EditableText
                  id={`iphone_pro_color_${i}`}
                  className="text-sm text-black/60 font-light"
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
      <section className="py-32 bg-black text-white">
        <div className="mx-auto max-w-5xl px-8 text-center">
          <EditableText
            id="iphone_pro_cta_title"
            as="h3"
            className="text-5xl md:text-7xl font-light mb-8 tracking-tight"
            editable={editable}
            {...props}
          >
            Experience iPhone Pro.
          </EditableText>
          <EditableText
            id="iphone_pro_cta_subtitle"
            className="text-xl mb-12 opacity-60 font-light"
            editable={editable}
            {...props}
          >
            Available now. Order today.
          </EditableText>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EditableButton 
              id="iphone_pro_cta_primary" 
              className="bg-white hover:bg-white/90 text-black px-12 py-5 rounded-none text-lg font-medium transition-all" 
              editable={editable} 
              {...props}
            >
              Order Now
            </EditableButton>
            <EditableButton
              id="iphone_pro_cta_secondary"
              className="bg-transparent hover:bg-white/10 text-white px-12 py-5 rounded-none text-lg font-medium border border-white/20 transition-all"
              editable={editable}
              {...props}
            >
              Compare
            </EditableButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-8 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {[
              { title: "Shop", links: ["iPhone Pro", "Accessories"] },
              { title: "Learn", links: ["Tech Specs", "User Guide"] },
              { title: "Support", links: ["Contact", "Warranty"] },
              { title: "Company", links: ["About", "News"] }
            ].map((col, colIdx) => (
              <div key={colIdx}>
                <EditableText id={`iphone_pro_footer_col${colIdx + 1}_title`} className="font-medium mb-4 text-sm" editable={editable} {...props}>
                  {col.title}
                </EditableText>
                <div className="space-y-2 text-sm text-black/60">
                  {col.links.map((link, linkIdx) => (
                    <EditableText
                      key={linkIdx}
                      id={`iphone_pro_footer_${col.title.toLowerCase()}_${linkIdx + 1}`}
                      className="block hover:text-black transition-colors font-light"
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
          <div className="pt-8 border-t border-black/10 text-center text-xs text-black/40">
            <EditableText id="iphone_pro_footer_copyright" editable={editable} {...props}>
              © 2025 Apple Inc. All rights reserved.
            </EditableText>
          </div>
        </div>
      </footer>
    </main>
  )
}
