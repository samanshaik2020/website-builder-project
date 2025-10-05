"use client"
import type { TemplateProps } from "../types"
import { EditableButton, EditableImage, EditableText } from "../shared/editable"

export function IPhoneProductTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-white text-gray-900">
      {/* Navigation */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
          <EditableText id="iphone_brand" as="h1" className="text-lg font-semibold" editable={editable} {...props}>
            iPhone
          </EditableText>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {["iPhone", "Features"].map((label, i) => (
              <EditableText key={label} id={`iphone_nav_${i}`} className="hover:text-blue-600 transition-colors" editable={editable} {...props}>
                {label}
              </EditableText>
            ))}
          </nav>
          <EditableButton id="iphone_nav_cta" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium" editable={editable} {...props}>
            Buy
          </EditableButton>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 py-16 text-center">
        <EditableText
          id="iphone_hero_title"
          as="h2"
          className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
          editable={editable}
          {...props}
        >
          The Ultimate iPhone.
        </EditableText>
        <EditableText
          id="iphone_hero_subtitle"
          className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
          editable={editable}
          {...props}
        >
          Forged in titanium and featuring the groundbreaking A18 Bionic chip, a customizable Action button, and our most powerful camera system.
        </EditableText>
        <EditableButton id="iphone_hero_cta" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-base font-medium mb-4" editable={editable} {...props}>
          Learn More
        </EditableButton>
        <div className="flex items-center justify-center gap-6 text-sm text-gray-600 mt-6">
          <EditableText id="iphone_hero_price" editable={editable} {...props}>
            From $799
          </EditableText>
          <span className="text-gray-300">|</span>
          <EditableText id="iphone_hero_trade" editable={editable} {...props}>
            or $33.29/mo.
          </EditableText>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <EditableText
            id="iphone_innovation_title"
            as="h3"
            className="text-4xl md:text-5xl font-bold mb-6 text-center"
            editable={editable}
            {...props}
          >
            A new era of innovation.
          </EditableText>
          <EditableText
            id="iphone_innovation_subtitle"
            className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto"
            editable={editable}
            {...props}
          >
            iPhone is a magical piece of glass. The Dynamic Island bubbles up alerts and Live Activities — so you won't miss them while you're doing something else.
          </EditableText>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { title: "Pro Camera System", desc: "Capture your best shots ever with a new 48MP camera and advanced computational photography." },
              { title: "A18 Bionic Chip", desc: "The fastest chip in a smartphone, delivering incredible performance and efficiency." },
              { title: "All-Day Battery", desc: "Up to 29 hours of video playback. That's a full day and then some." }
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <EditableText
                  id={`iphone_innovation_feature_${i}_title`}
                  as="h4"
                  className="text-xl font-semibold mb-3"
                  editable={editable}
                  {...props}
                >
                  {feature.title}
                </EditableText>
                <EditableText
                  id={`iphone_innovation_feature_${i}_desc`}
                  className="text-gray-600 leading-relaxed"
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

      {/* Camera Section with Image */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <EditableText
              id="iphone_camera_title"
              as="h3"
              className="text-4xl md:text-5xl font-bold mb-4"
              editable={editable}
              {...props}
            >
              Pro Camera System.
            </EditableText>
            <EditableText
              id="iphone_camera_subtitle"
              as="h4"
              className="text-3xl md:text-4xl font-bold mb-6"
              editable={editable}
              {...props}
            >
              A new perspective.
            </EditableText>
            <EditableText
              id="iphone_camera_desc"
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              editable={editable}
              {...props}
            >
              The new 48MP Main camera is more advanced than ever, capturing super-high-resolution photos with a new level of detail and color. The Photonic Engine enhances mid- to low-light performance for all cameras.
            </EditableText>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <EditableImage
              id="iphone_camera_image"
              src="/placeholder.svg?height=600&width=1200&query=nature%20landscape"
              alt="Camera sample"
              className="w-full h-auto"
              editable={editable}
              {...props}
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6">
          <EditableText
            id="iphone_features_title"
            as="h3"
            className="text-4xl md:text-5xl font-bold mb-16 text-center"
            editable={editable}
            {...props}
          >
            Explore the full story.
          </EditableText>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: "💻", title: "A18 Bionic Chip", desc: "The fastest chip in a smartphone, with a 6-core CPU that's up to 50% faster than the competition." },
              { icon: "🔊", title: "Dynamic Island", desc: "A brilliant way to see what's happening in real time. From incoming calls to sports scores to your next ride." },
              { icon: "📱", title: "iOS 18", desc: "Equipped with iOS 18. Customize your iPhone in ways you never could before. Plus, new ways to stay in touch with those who matter most." }
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl mb-4">
                  <EditableText id={`iphone_feature_${i}_icon`} editable={editable} {...props}>
                    {feature.icon}
                  </EditableText>
                </div>
                <EditableText
                  id={`iphone_feature_${i}_title`}
                  as="h4"
                  className="text-2xl font-semibold mb-3"
                  editable={editable}
                  {...props}
                >
                  {feature.title}
                </EditableText>
                <EditableText
                  id={`iphone_feature_${i}_desc`}
                  className="text-gray-600 leading-relaxed"
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

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <EditableText
            id="iphone_cta_title"
            as="h3"
            className="text-4xl md:text-5xl font-bold mb-6"
            editable={editable}
            {...props}
          >
            Choose your new iPhone.
          </EditableText>
          <EditableText
            id="iphone_cta_subtitle"
            className="text-lg text-gray-600 mb-8"
            editable={editable}
            {...props}
          >
            Available in four great finishes.
          </EditableText>
          <EditableButton id="iphone_cta_button" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-base font-medium" editable={editable} {...props}>
            Select iPhone
          </EditableButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-gray-600">
          <EditableText id="iphone_footer" editable={editable} {...props}>
            Copyright © 2025 Apple Inc. All rights reserved.
          </EditableText>
        </div>
      </footer>
    </main>
  )
}
