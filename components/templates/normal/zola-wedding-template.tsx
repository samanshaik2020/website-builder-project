"use client"
import type { TemplateProps } from "../types"
import { EditableButton, EditableImage, EditableText } from "../shared/editable"

export function ZolaWeddingTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-white text-gray-900">
      {/* Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <EditableImage
            id="zola_logo"
            src=""
            alt="ZOLA"
            className="h-8 w-auto"
            editable={editable}
            {...props}
          />
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            <EditableText id="zola_nav_0" className="hover:text-gray-900 transition-colors cursor-pointer" editable={editable} {...props}>
              LOG IN
            </EditableText>
          </nav>
          <EditableButton
            id="zola_nav_cta"
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full font-semibold text-sm"
            editable={editable}
            {...props}
          >
            START YOUR WEBSITE
          </EditableButton>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 via-gray-50 to-blue-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <EditableText
                id="zola_hero_title"
                as="h1"
                className="text-5xl md:text-6xl font-bold mb-6 text-gray-900"
                editable={editable}
                {...props}
              >
                Free, Beautiful Wedding Websites
              </EditableText>
              <EditableButton
                id="zola_hero_cta"
                className="bg-teal-500 hover:bg-teal-600 text-white px-10 py-4 rounded-full font-bold text-lg"
                editable={editable}
                {...props}
              >
                START YOUR WEBSITE
              </EditableButton>
            </div>
          </div>
        </div>
      </section>

      {/* Designs Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <EditableText
            id="zola_designs_title"
            as="h2"
            className="text-4xl font-bold text-center mb-12 text-gray-900"
            editable={editable}
            {...props}
          >
            Over 100 Gorgeous Designs
          </EditableText>
          <div className="relative">
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <EditableImage
                    id={`zola_design_${i}_image`}
                    src={``}
                    alt={`Design ${i}`}
                    className="w-full h-80 object-cover"
                    editable={editable}
                    {...props}
                  />
                </div>
              ))}
            </div>
            <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800">
              ←
            </button>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800">
              →
            </button>
          </div>
          <div className="text-center mt-12">
            <EditableButton
              id="zola_designs_cta"
              className="bg-teal-500 hover:bg-teal-600 text-white px-10 py-4 rounded-full font-bold"
              editable={editable}
              {...props}
            >
              EXPLORE DESIGNS
            </EditableButton>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-teal-700 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <EditableText
            id="zola_features_title"
            as="h2"
            className="text-4xl font-bold text-center mb-16"
            editable={editable}
            {...props}
          >
            Why You'll Love Our Wedding Websites
          </EditableText>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { icon: "💻", title: "So Easy", desc: "Set up your website in minutes with our simple drag-and-drop tools." },
              { icon: "✏️", title: "Super Customizable", desc: "Add your photos, colors, and story to make it uniquely yours." },
              { icon: "👍", title: "Guest-Approved", desc: "Your guests will love how easy it is to RSVP and find info." }
            ].map((feature, i) => (
              <div key={i} className="space-y-4">
                <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center text-4xl">
                  {feature.icon}
                </div>
                <EditableText
                  id={`zola_feature_${i + 1}_title`}
                  as="h3"
                  className="text-2xl font-bold"
                  editable={editable}
                  {...props}
                >
                  {feature.title}
                </EditableText>
                <EditableText
                  id={`zola_feature_${i + 1}_desc`}
                  className="text-teal-100 leading-relaxed"
                  editable={editable}
                  {...props}
                >
                  {feature.desc}
                </EditableText>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <EditableButton
              id="zola_features_cta"
              className="bg-white text-teal-700 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors"
              editable={editable}
              {...props}
            >
              CREATE YOUR WEBSITE
            </EditableButton>
          </div>
        </div>
      </section>

      {/* Save the Dates Section */}
      <section className="py-20 bg-pink-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <EditableImage
                id="zola_save_dates_image"
                src=""
                alt="Save the Dates"
                className="w-full h-auto"
                editable={editable}
                {...props}
              />
            </div>
            <div>
              <EditableText
                id="zola_save_dates_title"
                as="h2"
                className="text-4xl font-bold mb-6 text-gray-900"
                editable={editable}
                {...props}
              >
                Add Matching Save the Dates and Invitations
              </EditableText>
              <EditableText
                id="zola_save_dates_description"
                className="text-lg text-gray-700 mb-6 leading-relaxed"
                editable={editable}
                {...props}
              >
                And get 20% OFF your first order with code SAVE20!
              </EditableText>
              <EditableButton
                id="zola_save_dates_cta"
                className="bg-teal-500 hover:bg-teal-600 text-white px-10 py-4 rounded-full font-bold"
                editable={editable}
                {...props}
              >
                GET STARTED
              </EditableButton>
            </div>
          </div>
        </div>
      </section>

      {/* Registry Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <EditableText
                id="zola_registry_title"
                as="h2"
                className="text-4xl font-bold mb-6 text-gray-900"
                editable={editable}
                {...props}
              >
                Put Your Zola Registry On Your Wedding Website
              </EditableText>
              <EditableText
                id="zola_registry_description"
                className="text-lg text-gray-700 mb-6 leading-relaxed"
                editable={editable}
                {...props}
              >
                Let guests view your wedding registry right from your website. They can shop from top stores and contribute to cash funds.
              </EditableText>
              <EditableButton
                id="zola_registry_cta"
                className="bg-teal-500 hover:bg-teal-600 text-white px-10 py-4 rounded-full font-bold"
                editable={editable}
                {...props}
              >
                GET STARTED
              </EditableButton>
            </div>
            <div className="order-1 md:order-2">
              <EditableImage
                id="zola_registry_image"
                src=""
                alt="Registry"
                className="w-full h-auto rounded-lg shadow-xl"
                editable={editable}
                {...props}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-teal-700 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <EditableText
            id="zola_final_title"
            as="h2"
            className="text-4xl md:text-5xl font-script italic mb-8"
            editable={editable}
            {...props}
          >
            We'll make this fun and easy!
          </EditableText>
          <EditableButton
            id="zola_final_cta"
            className="bg-white text-teal-700 px-12 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
            editable={editable}
            {...props}
          >
            START YOUR WEBSITE
          </EditableButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <EditableImage
                id="zola_footer_logo"
                src=""
                alt="ZOLA"
                className="h-8 w-auto mb-4"
                editable={editable}
                {...props}
              />
              <EditableText id="zola_footer_tagline" className="text-sm text-gray-400" editable={editable} {...props}>
                Your wedding, your way
              </EditableText>
            </div>
            <div>
              <EditableText id="zola_footer_wedding_title" as="h5" className="font-semibold mb-4 text-sm" editable={editable} {...props}>
                WEDDING
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                {["Websites", "Invitations", "Registry", "Planning Tools"].map((item, i) => (
                  <EditableText key={item} id={`zola_footer_wedding_${i}`} className="block hover:text-white cursor-pointer" editable={editable} {...props}>
                    {item}
                  </EditableText>
                ))}
              </div>
            </div>
            <div>
              <EditableText id="zola_footer_company_title" as="h5" className="font-semibold mb-4 text-sm" editable={editable} {...props}>
                COMPANY
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                {["About", "Blog", "Careers", "Press"].map((item, i) => (
                  <EditableText key={item} id={`zola_footer_company_${i}`} className="block hover:text-white cursor-pointer" editable={editable} {...props}>
                    {item}
                  </EditableText>
                ))}
              </div>
            </div>
            <div>
              <EditableText id="zola_footer_support_title" as="h5" className="font-semibold mb-4 text-sm" editable={editable} {...props}>
                SUPPORT
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                {["Help Center", "Contact Us", "Shipping", "Returns"].map((item, i) => (
                  <EditableText key={item} id={`zola_footer_support_${i}`} className="block hover:text-white cursor-pointer" editable={editable} {...props}>
                    {item}
                  </EditableText>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <EditableText id="zola_footer_copyright" editable={editable} {...props}>
              © 2025 Zola, Inc. All rights reserved.
            </EditableText>
          </div>
        </div>
      </footer>
    </main>
  )
}
