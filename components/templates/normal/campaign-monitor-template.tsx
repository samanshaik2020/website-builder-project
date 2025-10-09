"use client"
import type { TemplateProps } from "../types"
import { EditableButton, EditableImage, EditableText } from "../shared/editable"

export function CampaignMonitorTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-white text-gray-900">
      {/* Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <EditableImage
            id="cm_logo"
            src="/placeholder.svg?height=40&width=180&query=campaign%20monitor%20logo"
            alt="Campaign Monitor"
            className="h-10 w-auto"
            editable={editable}
            {...props}
          />
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            <EditableText id="cm_nav_0" className="hover:text-blue-600 transition-colors cursor-pointer" editable={editable} {...props}>
              Features
            </EditableText>
            <EditableText id="cm_nav_1" className="hover:text-blue-600 transition-colors cursor-pointer" editable={editable} {...props}>
              Pricing
            </EditableText>
            <EditableText id="cm_nav_2" className="hover:text-blue-600 transition-colors cursor-pointer" editable={editable} {...props}>
              Resources
            </EditableText>
            <EditableText id="cm_nav_3" className="hover:text-blue-600 transition-colors cursor-pointer" editable={editable} {...props}>
              Support
            </EditableText>
            <EditableButton
              id="cm_nav_login"
              className="text-blue-600 hover:text-blue-700 font-medium"
              editable={editable}
              {...props}
            >
              Log in
            </EditableButton>
            <EditableButton
              id="cm_nav_signup"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium"
              editable={editable}
              {...props}
            >
              Sign up free
            </EditableButton>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <EditableText
                id="cm_hero_title"
                as="h1"
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900"
                editable={editable}
                {...props}
              >
                Create beautiful and effective HTML emails
              </EditableText>
              <EditableText
                id="cm_hero_subtitle"
                className="text-xl text-gray-600 mb-8 leading-relaxed"
                editable={editable}
                {...props}
              >
                Launch unique, fully branded email campaigns that are targeted to the right audience.
              </EditableText>
              <div className="flex gap-4 mb-6">
                <EditableButton
                  id="cm_hero_cta_primary"
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold rounded-md shadow-lg"
                  editable={editable}
                  {...props}
                >
                  DESIGN YOUR FIRST HTML EMAIL NOW
                </EditableButton>
                <EditableButton
                  id="cm_hero_cta_secondary"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-4 text-lg font-semibold rounded-md flex items-center gap-2"
                  editable={editable}
                  {...props}
                >
                  WATCH DEMO ▶
                </EditableButton>
              </div>
              <EditableText
                id="cm_hero_note"
                className="text-sm text-gray-500"
                editable={editable}
                {...props}
              >
                Get started for free. No credit card required.
              </EditableText>
            </div>
            <div className="relative">
              <EditableImage
                id="cm_hero_image"
                src="/placeholder.svg?height=600&width=800&query=email%20campaign%20preview"
                alt="Email Campaign Preview"
                className="w-full h-auto rounded-lg shadow-2xl"
                editable={editable}
                {...props}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-gray-100 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <EditableText
            id="cm_trust_title"
            className="text-center text-sm text-gray-600 mb-8"
            editable={editable}
            {...props}
          >
            Loved by over 2 million marketers at 200,000 businesses around the world.
          </EditableText>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {["BuzzFeed", "Rip Curl", "TOPSHOP", "unicef", "adidas", "SHOWTIME"].map((brand, i) => (
              <EditableImage
                key={brand}
                id={`cm_brand_${i}`}
                src={`/placeholder.svg?height=40&width=120&query=${brand}%20logo`}
                alt={brand}
                className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity"
                editable={editable}
                {...props}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Feature Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <EditableText
              id="cm_feature_main_title"
              as="h2"
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
              editable={editable}
              {...props}
            >
              Drag and drop your way to a beautiful HTML email
            </EditableText>
            <EditableText
              id="cm_feature_main_subtitle"
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              editable={editable}
              {...props}
            >
              Build completely branded emails and customize everything from fonts and colors to the exact spacing between sections so your email is pixel-perfect.
            </EditableText>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <EditableImage
                id="cm_feature_1_image"
                src="/placeholder.svg?height=500&width=600&query=email%20builder%20interface"
                alt="Email Builder"
                className="w-full h-auto rounded-lg shadow-xl"
                editable={editable}
                {...props}
              />
            </div>
            <div className="space-y-8">
              <div>
                <EditableText
                  id="cm_feature_1_title"
                  as="h3"
                  className="text-2xl font-bold mb-3 text-gray-900"
                  editable={editable}
                  {...props}
                >
                  EASE OF USE
                </EditableText>
                <EditableText
                  id="cm_feature_1_desc"
                  className="text-gray-600 leading-relaxed"
                  editable={editable}
                  {...props}
                >
                  Our drag-and-drop email builder makes it radically easy to design a unique-looking email that matches your brand. No code required!
                </EditableText>
              </div>
              <div>
                <EditableText
                  id="cm_feature_2_title"
                  as="h3"
                  className="text-2xl font-bold mb-3 text-gray-900"
                  editable={editable}
                  {...props}
                >
                  COMPLETE CUSTOMIZATION
                </EditableText>
                <EditableText
                  id="cm_feature_2_desc"
                  className="text-gray-600 leading-relaxed"
                  editable={editable}
                  {...props}
                >
                  With our email builder you can get pixel-level customization over all aspects of your email with the exact fonts and colors to match your brand.
                </EditableText>
              </div>
              <div>
                <EditableText
                  id="cm_feature_3_title"
                  as="h3"
                  className="text-2xl font-bold mb-3 text-gray-900"
                  editable={editable}
                  {...props}
                >
                  MOBILE OPTIMIZATION
                </EditableText>
                <EditableText
                  id="cm_feature_3_desc"
                  className="text-gray-600 leading-relaxed"
                  editable={editable}
                  {...props}
                >
                  It's essential your emails are responsive so we like the mobile optimization built into our email builder to ensure your emails look great on any device.
                </EditableText>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Feature Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 space-y-6">
              <EditableText
                id="cm_secondary_feature_title"
                as="h2"
                className="text-4xl font-bold text-gray-900"
                editable={editable}
                {...props}
              >
                Customize everything
              </EditableText>
              <EditableText
                id="cm_secondary_feature_desc"
                className="text-lg text-gray-600 leading-relaxed"
                editable={editable}
                {...props}
              >
                Build completely branded emails and customize everything from fonts and colors to the exact spacing between sections so your email is pixel-perfect.
              </EditableText>
              <div className="space-y-4">
                {[
                  { title: "Colors and Fonts", desc: "Customize colors and fonts to match your brand" },
                  { title: "Layout Options", desc: "Choose from multiple layout options" },
                  { title: "Image Editing", desc: "Edit images directly in the builder" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                      ✓
                    </div>
                    <div>
                      <EditableText
                        id={`cm_feature_item_${i}_title`}
                        className="font-semibold text-gray-900"
                        editable={editable}
                        {...props}
                      >
                        {item.title}
                      </EditableText>
                      <EditableText
                        id={`cm_feature_item_${i}_desc`}
                        className="text-gray-600 text-sm"
                        editable={editable}
                        {...props}
                      >
                        {item.desc}
                      </EditableText>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <EditableImage
                id="cm_secondary_feature_image"
                src="/placeholder.svg?height=500&width=600&query=customization%20panel"
                alt="Customization Panel"
                className="w-full h-auto rounded-lg shadow-xl"
                editable={editable}
                {...props}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <EditableText
              id="cm_templates_title"
              as="h2"
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
              editable={editable}
              {...props}
            >
              Start with a template
            </EditableText>
            <EditableText
              id="cm_templates_subtitle"
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              editable={editable}
              {...props}
            >
              Choose from our library of professionally designed templates or start from scratch.
            </EditableText>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <EditableImage
                  id={`cm_template_${i}_image`}
                  src={`/placeholder.svg?height=400&width=300&query=email%20template%20${i}`}
                  alt={`Template ${i}`}
                  className="w-full h-80 object-cover"
                  editable={editable}
                  {...props}
                />
                <div className="p-6">
                  <EditableText
                    id={`cm_template_${i}_name`}
                    className="text-xl font-bold text-gray-900 mb-2"
                    editable={editable}
                    {...props}
                  >
                    Template {i}
                  </EditableText>
                  <EditableText
                    id={`cm_template_${i}_desc`}
                    className="text-gray-600 text-sm"
                    editable={editable}
                    {...props}
                  >
                    Perfect for newsletters and announcements
                  </EditableText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <EditableText
            id="cm_cta_title"
            as="h2"
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            editable={editable}
            {...props}
          >
            Ready to get started?
          </EditableText>
          <EditableText
            id="cm_cta_subtitle"
            className="text-xl text-blue-100 mb-8"
            editable={editable}
            {...props}
          >
            Join thousands of marketers creating beautiful email campaigns
          </EditableText>
          <EditableButton
            id="cm_cta_button"
            className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 text-lg font-bold rounded-md shadow-lg"
            editable={editable}
            {...props}
          >
            START YOUR FREE TRIAL
          </EditableButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <EditableImage
                id="cm_footer_logo"
                src="/placeholder.svg?height=40&width=150&query=campaign%20monitor%20logo%20white"
                alt="Campaign Monitor"
                className="h-10 w-auto mb-4"
                editable={editable}
                {...props}
              />
              <EditableText id="cm_footer_tagline" className="text-gray-400 text-sm" editable={editable} {...props}>
                Beautiful email marketing made simple
              </EditableText>
            </div>
            <div>
              <EditableText id="cm_footer_product_title" as="h5" className="font-semibold mb-4" editable={editable} {...props}>
                Product
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                {["Features", "Pricing", "Templates", "Integrations"].map((item, i) => (
                  <EditableText key={item} id={`cm_footer_product_${i}`} className="block hover:text-white cursor-pointer" editable={editable} {...props}>
                    {item}
                  </EditableText>
                ))}
              </div>
            </div>
            <div>
              <EditableText id="cm_footer_resources_title" as="h5" className="font-semibold mb-4" editable={editable} {...props}>
                Resources
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                {["Blog", "Guides", "Help Center", "API Docs"].map((item, i) => (
                  <EditableText key={item} id={`cm_footer_resources_${i}`} className="block hover:text-white cursor-pointer" editable={editable} {...props}>
                    {item}
                  </EditableText>
                ))}
              </div>
            </div>
            <div>
              <EditableText id="cm_footer_company_title" as="h5" className="font-semibold mb-4" editable={editable} {...props}>
                Company
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                {["About", "Careers", "Contact", "Partners"].map((item, i) => (
                  <EditableText key={item} id={`cm_footer_company_${i}`} className="block hover:text-white cursor-pointer" editable={editable} {...props}>
                    {item}
                  </EditableText>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <EditableText id="cm_footer_copyright" editable={editable} {...props}>
              © 2025 Campaign Monitor. All rights reserved. | Privacy Policy | Terms of Service
            </EditableText>
          </div>
        </div>
      </footer>
    </main>
  )
}
