"use client"
import type { TemplateProps } from "../types"
import { EditableButton, EditableImage, EditableText } from "../shared/editable"

export function GobyToothbrushTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-white text-gray-900">
      {/* Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <EditableImage
            id="goby_logo"
            src=""
            alt="GOBY"
            className="h-8 w-auto"
            editable={editable}
            {...props}
          />
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            <EditableText id="goby_nav_0" className="hover:text-gray-900 transition-colors cursor-pointer" editable={editable} {...props}>
              Subscribe & Save
            </EditableText>
          </nav>
          <EditableButton
            id="goby_nav_cta"
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-md font-semibold text-sm"
            editable={editable}
            {...props}
          >
            SUBSCRIBE
          </EditableButton>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-100 via-pink-50 to-blue-100 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <EditableImage
                id="goby_hero_icon"
                src=""
                alt="Icon"
                className="w-16 h-16 mb-6"
                editable={editable}
                {...props}
              />
              <EditableText
                id="goby_hero_title"
                as="h1"
                className="text-5xl md:text-6xl font-bold mb-6 text-gray-900"
                editable={editable}
                {...props}
              >
                BRUSHING PERFECTED
              </EditableText>
              <EditableText
                id="goby_hero_subtitle"
                className="text-xl text-gray-700 mb-8 leading-relaxed"
                editable={editable}
                {...props}
              >
                Goby provides an earth-shattering brush at a jaw-dropping price.
              </EditableText>
              <EditableButton
                id="goby_hero_cta"
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-md font-bold text-lg"
                editable={editable}
                {...props}
              >
                GET STARTED
              </EditableButton>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-blue-600 text-white py-6">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { title: "30-DAY GUARANTEE", subtitle: "ARE YOU HAPPY?" },
              { title: "SUBSCRIBE & SAVE", subtitle: "SAVE UP TO 40%" },
              { title: "FREE SHIPPING", subtitle: "HAPPY SMILES" }
            ].map((feature, i) => (
              <div key={i}>
                <EditableText
                  id={`goby_feature_bar_${i + 1}_title`}
                  className="text-sm font-bold mb-1"
                  editable={editable}
                  {...props}
                >
                  {feature.title}
                </EditableText>
                <EditableText
                  id={`goby_feature_bar_${i + 1}_subtitle`}
                  className="text-xs opacity-90"
                  editable={editable}
                  {...props}
                >
                  {feature.subtitle}
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Features Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <EditableText
              id="goby_features_badge"
              className="inline-block bg-white border-2 border-gray-900 px-6 py-2 rounded-full text-sm font-bold mb-8"
              editable={editable}
              {...props}
            >
              IT'S GOT EVERYTHING YOU
            </EditableText>
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <EditableImage
                id="goby_features_image"
                src=""
                alt="Product Features"
                className="w-full h-auto"
                editable={editable}
                {...props}
              />
            </div>
            <div className="space-y-8">
              <div>
                <EditableText
                  id="goby_feature_1_title"
                  as="h3"
                  className="text-2xl font-bold mb-3 text-gray-900"
                  editable={editable}
                  {...props}
                >
                  CLINICALLY PROVEN BRUSH
                </EditableText>
                <EditableText
                  id="goby_feature_1_desc"
                  className="text-gray-600 leading-relaxed"
                  editable={editable}
                  {...props}
                >
                  Our brush heads are designed by dentists to provide optimal cleaning.
                </EditableText>
              </div>
              <div>
                <EditableText
                  id="goby_feature_2_title"
                  as="h3"
                  className="text-2xl font-bold mb-3 text-gray-900"
                  editable={editable}
                  {...props}
                >
                  MAXIMUM CLEAN. FRACTION OF THE PRICE.
                </EditableText>
                <EditableText
                  id="goby_feature_2_desc"
                  className="text-gray-600 leading-relaxed mb-4"
                  editable={editable}
                  {...props}
                >
                  Get professional-level cleaning without the premium price tag.
                </EditableText>
                <EditableButton
                  id="goby_feature_2_cta"
                  className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-md font-bold"
                  editable={editable}
                  {...props}
                >
                  SHOP NOW
                </EditableButton>
              </div>
              <div>
                <EditableText
                  id="goby_feature_3_title"
                  as="h3"
                  className="text-2xl font-bold mb-3 text-gray-900"
                  editable={editable}
                  {...props}
                >
                  GET EARLY ACCESS
                </EditableText>
              </div>
              <div>
                <EditableText
                  id="goby_feature_4_title"
                  as="h3"
                  className="text-2xl font-bold mb-3 text-gray-900"
                  editable={editable}
                  {...props}
                >
                  LONG-LASTING BATTERY
                </EditableText>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smile Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <EditableText
            id="goby_smile_title"
            as="h2"
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
            editable={editable}
            {...props}
          >
            A HEALTHIER SMILE, DELIVERED.
          </EditableText>
          <EditableText
            id="goby_smile_description"
            className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto"
            editable={editable}
            {...props}
          >
            To make the switch to a brush heads as proven to clean better, we deliver brush heads to you, so you're never missing changing your brush head.
          </EditableText>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { icon: "⚡", title: "POWERFUL", desc: "Our brush removes up to 100% more plaque than a manual brush." },
              { icon: "😊", title: "SIMPLE", desc: "One button, three modes. It's really that simple." },
              { icon: "🔋", title: "LONG-LASTING", desc: "A 4-hour charge lasts up to 30 days. No need to constantly charge." }
            ].map((benefit, i) => (
              <div key={i} className="space-y-4">
                <div className="text-5xl">{benefit.icon}</div>
                <EditableText
                  id={`goby_benefit_${i + 1}_title`}
                  as="h3"
                  className="text-xl font-bold text-gray-900"
                  editable={editable}
                  {...props}
                >
                  {benefit.title}
                </EditableText>
                <EditableText
                  id={`goby_benefit_${i + 1}_desc`}
                  className="text-gray-600 leading-relaxed"
                  editable={editable}
                  {...props}
                >
                  {benefit.desc}
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <EditableImage
                id="goby_testimonial_image"
                src=""
                alt="GOBY Product"
                className="w-full h-auto rounded-lg"
                editable={editable}
                {...props}
              />
            </div>
            <div>
              <EditableText
                id="goby_testimonial_title"
                as="h2"
                className="text-3xl md:text-4xl font-bold mb-6 text-gray-900"
                editable={editable}
                {...props}
              >
                THE BUZZ ON GOBY
              </EditableText>
              <EditableText
                id="goby_testimonial_quote"
                className="text-xl text-gray-700 leading-relaxed mb-6 italic"
                editable={editable}
                {...props}
              >
                "The design team has managed the feat of making a toothbrush that's both functional and beautiful. It's a rare combination of form and function, and that's refreshing."
              </EditableText>
              <EditableText
                id="goby_testimonial_author"
                className="text-sm font-semibold text-gray-900 mb-6"
                editable={editable}
                {...props}
              >
                — DESIGN MAGAZINE
              </EditableText>
              <EditableButton
                id="goby_testimonial_cta"
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-md font-bold"
                editable={editable}
                {...props}
              >
                GET STARTED
              </EditableButton>
            </div>
          </div>
        </div>
      </section>

      {/* Giving Back Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <EditableText
                id="goby_giving_title"
                as="h2"
                className="text-3xl md:text-4xl font-bold mb-6 text-gray-900"
                editable={editable}
                {...props}
              >
                GOBY GIVES BACK
              </EditableText>
              <EditableText
                id="goby_giving_description"
                className="text-lg text-gray-600 leading-relaxed mb-6"
                editable={editable}
                {...props}
              >
                We're on a mission to make good oral care accessible to all. For every brush you buy, we donate a brush to a child in need.
              </EditableText>
              <EditableText
                id="goby_giving_details"
                className="text-gray-600 leading-relaxed"
                editable={editable}
                {...props}
              >
                We also partner with NYC's Share of Humanity's Global Impact Network Program, donating a percentage of our profits to help provide oral care to those who need it most.
              </EditableText>
            </div>
            <div className="order-1 md:order-2">
              <EditableImage
                id="goby_giving_image"
                src=""
                alt="Giving Back"
                className="w-full h-auto rounded-lg"
                editable={editable}
                {...props}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <EditableText
            id="goby_instagram_title"
            as="h2"
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900"
            editable={editable}
            {...props}
          >
            #GOBYGRAM
          </EditableText>
          <EditableText
            id="goby_instagram_subtitle"
            className="text-center text-gray-600 mb-12"
            editable={editable}
            {...props}
          >
            Tag us for a chance to be featured on our feed!
          </EditableText>
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative group">
                <EditableImage
                  id={`goby_instagram_${i}_image`}
                  src={``}
                  alt={`Instagram ${i}`}
                  className="w-full h-64 object-cover rounded-lg"
                  editable={editable}
                  {...props}
                />
                <EditableText
                  id={`goby_instagram_${i}_caption`}
                  className="text-center text-sm text-gray-600 mt-2"
                  editable={editable}
                  {...props}
                >
                  @username
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 bg-gray-800 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <EditableImage
            id="goby_guarantee_icon"
            src=""
            alt="Guarantee"
            className="w-20 h-20 mx-auto mb-6"
            editable={editable}
            {...props}
          />
          <EditableText
            id="goby_guarantee_title"
            as="h2"
            className="text-3xl md:text-4xl font-bold mb-6"
            editable={editable}
            {...props}
          >
            UNLIMITED COMPLIMENTARY GUARANTEES.
          </EditableText>
          <EditableText
            id="goby_guarantee_description"
            className="text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto"
            editable={editable}
            {...props}
          >
            If you don't love your brush, we'll do whatever it takes to make it right. We'll send you a new brush, refund your money, or help you find the perfect brush for you. No questions asked.
          </EditableText>
          <EditableButton
            id="goby_guarantee_cta"
            className="bg-white text-gray-900 px-10 py-4 rounded-md font-bold hover:bg-gray-100 transition-colors"
            editable={editable}
            {...props}
          >
            GET STARTED
          </EditableButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <EditableImage
                id="goby_footer_logo"
                src=""
                alt="GOBY"
                className="h-8 w-auto mb-4"
                editable={editable}
                {...props}
              />
            </div>
            <div>
              <EditableText id="goby_footer_shop_title" as="h5" className="font-semibold mb-4 text-sm" editable={editable} {...props}>
                SHOP
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                {["Toothbrush", "Refills", "Accessories", "Bundles"].map((item, i) => (
                  <EditableText key={item} id={`goby_footer_shop_${i}`} className="block hover:text-white cursor-pointer" editable={editable} {...props}>
                    {item}
                  </EditableText>
                ))}
              </div>
            </div>
            <div>
              <EditableText id="goby_footer_company_title" as="h5" className="font-semibold mb-4 text-sm" editable={editable} {...props}>
                COMPANY
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                {["About", "Reviews", "Blog", "Contact"].map((item, i) => (
                  <EditableText key={item} id={`goby_footer_company_${i}`} className="block hover:text-white cursor-pointer" editable={editable} {...props}>
                    {item}
                  </EditableText>
                ))}
              </div>
            </div>
            <div>
              <EditableText id="goby_footer_support_title" as="h5" className="font-semibold mb-4 text-sm" editable={editable} {...props}>
                SUPPORT
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                {["FAQ", "Shipping", "Returns", "Warranty"].map((item, i) => (
                  <EditableText key={item} id={`goby_footer_support_${i}`} className="block hover:text-white cursor-pointer" editable={editable} {...props}>
                    {item}
                  </EditableText>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <EditableText id="goby_footer_copyright" editable={editable} {...props}>
              © GOBY
            </EditableText>
            <div className="flex gap-6 mt-4 md:mt-0">
              <EditableText id="goby_footer_privacy" className="hover:text-white cursor-pointer" editable={editable} {...props}>
                PRIVACY POLICY
              </EditableText>
              <EditableText id="goby_footer_terms" className="hover:text-white cursor-pointer" editable={editable} {...props}>
                TERMS OF SERVICE
              </EditableText>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
