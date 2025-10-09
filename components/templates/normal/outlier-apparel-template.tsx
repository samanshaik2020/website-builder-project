"use client"
import type { TemplateProps } from "../types"
import { EditableButton, EditableImage, EditableText } from "../shared/editable"

export function OutlierApparelTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-white text-gray-900">
      {/* Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <EditableImage
            id="outlier_logo"
            src="/placeholder.svg?height=30&width=120&query=outlier%20apparel%20logo"
            alt="Outlier Apparel"
            className="h-8 w-auto"
            editable={editable}
            {...props}
          />
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            <EditableText id="outlier_nav_0" className="hover:text-gray-900 transition-colors cursor-pointer" editable={editable} {...props}>
              Shop
            </EditableText>
            <EditableText id="outlier_nav_1" className="hover:text-gray-900 transition-colors cursor-pointer" editable={editable} {...props}>
              About
            </EditableText>
            <EditableText id="outlier_nav_2" className="hover:text-gray-900 transition-colors cursor-pointer" editable={editable} {...props}>
              Journal
            </EditableText>
            <EditableText id="outlier_nav_3" className="hover:text-gray-900 transition-colors cursor-pointer" editable={editable} {...props}>
              Contact
            </EditableText>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen">
        <EditableImage
          id="outlier_hero_image"
          src="/placeholder.svg?height=1080&width=1920&query=urban%20cyclist%20bmx"
          alt="Urban Lifestyle"
          className="w-full h-full object-cover"
          editable={editable}
          {...props}
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-center text-white">
            <EditableText
              id="outlier_hero_title"
              as="h1"
              className="text-5xl md:text-7xl font-light mb-4 tracking-wide"
              editable={editable}
              {...props}
            >
              THE OUTLIER WORK PANT
            </EditableText>
            <EditableText
              id="outlier_hero_subtitle"
              className="text-xl md:text-2xl font-light tracking-wide"
              editable={editable}
              {...props}
            >
              Performance meets style
            </EditableText>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { icon: "🎯", title: "PRECISION ENGINEERING", desc: "Every detail matters. From fabric selection to final stitch, we obsess over quality." },
              { icon: "✂️", title: "TAILORED FIT", desc: "Designed to move with you. Athletic cut that works from office to adventure." },
              { icon: "🌍", title: "BUILT TO LAST", desc: "Investment pieces that improve with age. Sustainable by design, not by accident." }
            ].map((feature, i) => (
              <div key={i} className="space-y-4">
                <div className="text-4xl">{feature.icon}</div>
                <EditableText
                  id={`outlier_feature_${i + 1}_title`}
                  as="h3"
                  className="text-sm font-semibold tracking-widest text-gray-900"
                  editable={editable}
                  {...props}
                >
                  {feature.title}
                </EditableText>
                <EditableText
                  id={`outlier_feature_${i + 1}_desc`}
                  className="text-sm text-gray-600 leading-relaxed"
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

      {/* Reviews Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-yellow-400 text-2xl">★</span>
            ))}
          </div>
          <EditableText
            id="outlier_review_title"
            className="text-sm font-semibold tracking-widest text-gray-900 mb-4"
            editable={editable}
            {...props}
          >
            BEST PANTS EVER
          </EditableText>
          <EditableText
            id="outlier_review_text"
            className="text-base text-gray-700 leading-relaxed max-w-2xl mx-auto"
            editable={editable}
            {...props}
          >
            "These pants have completely changed my daily routine. I can bike to work, sit in meetings, and go out for dinner without ever feeling uncomfortable or out of place. The fabric is incredible."
          </EditableText>
        </div>
      </section>

      {/* Product Detail Section 1 */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <EditableImage
                id="outlier_detail_1_image"
                src="/placeholder.svg?height=800&width=600&query=man%20skateboarding%20urban"
                alt="Urban Movement"
                className="w-full h-auto"
                editable={editable}
                {...props}
              />
            </div>
            <div className="space-y-6">
              <EditableText
                id="outlier_detail_1_title"
                as="h2"
                className="text-sm font-semibold tracking-widest text-gray-900"
                editable={editable}
                {...props}
              >
                MOVEMENT FIRST
              </EditableText>
              <EditableText
                id="outlier_detail_1_description"
                className="text-base text-gray-700 leading-relaxed"
                editable={editable}
                {...props}
              >
                We started with a simple question: why can't work pants move like athletic wear? The answer became our obsession. Using advanced four-way stretch fabric and gusseted construction, we created pants that bend, stretch, and breathe with you.
              </EditableText>
              <EditableText
                id="outlier_detail_1_note"
                className="text-sm text-gray-500 italic"
                editable={editable}
                {...props}
              >
                "The difference is in the details you can't see."
              </EditableText>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 space-y-6">
              <EditableText
                id="outlier_showcase_title"
                as="h2"
                className="text-3xl md:text-4xl font-light text-gray-900"
                editable={editable}
                {...props}
              >
                DEAF PATROL
              </EditableText>
              <EditableText
                id="outlier_showcase_description"
                className="text-base text-gray-700 leading-relaxed"
                editable={editable}
                {...props}
              >
                Our signature collection represents years of refinement. Each piece is designed to be worn daily, to age gracefully, and to become an essential part of your wardrobe. This isn't fast fashion—it's the last pants you'll need to buy.
              </EditableText>
              <EditableButton
                id="outlier_showcase_cta"
                className="text-sm font-semibold tracking-widest text-gray-900 hover:text-gray-600 transition-colors"
                editable={editable}
                {...props}
              >
                EXPLORE COLLECTION →
              </EditableButton>
            </div>
            <div className="order-1 md:order-2">
              <EditableImage
                id="outlier_showcase_image"
                src="/placeholder.svg?height=800&width=600&query=man%20walking%20city%20street"
                alt="Collection Showcase"
                className="w-full h-auto"
                editable={editable}
                {...props}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle Section */}
      <section className="relative h-screen bg-gray-900">
        <EditableImage
          id="outlier_lifestyle_image"
          src="/placeholder.svg?height=1080&width=1920&query=person%20working%20leather%20craft"
          alt="Craftsmanship"
          className="w-full h-full object-cover opacity-70"
          editable={editable}
          {...props}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-2xl px-6">
            <EditableText
              id="outlier_lifestyle_title"
              as="h2"
              className="text-4xl md:text-5xl font-light mb-6"
              editable={editable}
              {...props}
            >
              CRAFTED WITH INTENTION
            </EditableText>
            <EditableText
              id="outlier_lifestyle_description"
              className="text-lg text-gray-200 leading-relaxed"
              editable={editable}
              {...props}
            >
              Every stitch, every seam, every detail is considered. We work with the world's best mills and manufacturers to create garments that perform beyond expectations.
            </EditableText>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <EditableText
            id="outlier_features_grid_title"
            as="h2"
            className="text-3xl md:text-4xl font-light text-center mb-16 text-gray-900"
            editable={editable}
            {...props}
          >
            MADE SMARTER
          </EditableText>
          <div className="grid md:grid-cols-2 gap-16">
            {[
              { title: "WATER RESISTANT", desc: "DWR coating sheds rain and stains without compromising breathability.", image: "water-resistant-fabric" },
              { title: "4-WAY STRETCH", desc: "Move freely in any direction. Fabric returns to shape after every wear.", image: "stretch-fabric" },
              { title: "HIDDEN POCKETS", desc: "Secure storage that doesn't interrupt clean lines. Everything has its place.", image: "hidden-pocket-detail" },
              { title: "REINFORCED SEAMS", desc: "Triple-stitched stress points. Built to handle whatever you throw at them.", image: "reinforced-seams" }
            ].map((item, i) => (
              <div key={i} className="space-y-6">
                <EditableImage
                  id={`outlier_grid_${i + 1}_image`}
                  src={`/placeholder.svg?height=400&width=600&query=${item.image}`}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                  editable={editable}
                  {...props}
                />
                <div>
                  <EditableText
                    id={`outlier_grid_${i + 1}_title`}
                    as="h3"
                    className="text-sm font-semibold tracking-widest text-gray-900 mb-3"
                    editable={editable}
                    {...props}
                  >
                    {item.title}
                  </EditableText>
                  <EditableText
                    id={`outlier_grid_${i + 1}_desc`}
                    className="text-sm text-gray-600 leading-relaxed"
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
      </section>

      {/* Materials Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <EditableImage
                id="outlier_materials_image"
                src="/placeholder.svg?height=600&width=600&query=fabric%20texture%20close%20up"
                alt="Premium Materials"
                className="w-full h-auto"
                editable={editable}
                {...props}
              />
            </div>
            <div className="space-y-6">
              <EditableText
                id="outlier_materials_title"
                as="h2"
                className="text-3xl md:text-4xl font-light text-gray-900"
                editable={editable}
                {...props}
              >
                FABRIC MATTERS
              </EditableText>
              <EditableText
                id="outlier_materials_description"
                className="text-base text-gray-700 leading-relaxed"
                editable={editable}
                {...props}
              >
                We source our fabrics from the world's leading mills in Italy and Japan. Each material is chosen for its unique properties—breathability, durability, stretch, and recovery. The result is clothing that performs as good as it looks.
              </EditableText>
              <div className="space-y-4">
                {[
                  "Schoeller® 4-way stretch fabric",
                  "DWR water-resistant coating",
                  "Merino wool blend lining",
                  "YKK® zippers throughout"
                ].map((spec, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-gray-900 font-bold">—</span>
                    <EditableText
                      id={`outlier_materials_spec_${i + 1}`}
                      className="text-sm text-gray-700"
                      editable={editable}
                      {...props}
                    >
                      {spec}
                    </EditableText>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative h-screen">
        <EditableImage
          id="outlier_final_image"
          src="/placeholder.svg?height=1080&width=1920&query=person%20walking%20desert%20landscape"
          alt="Adventure Awaits"
          className="w-full h-full object-cover"
          editable={editable}
          {...props}
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <EditableText
              id="outlier_final_title"
              as="h2"
              className="text-4xl md:text-6xl font-light mb-8"
              editable={editable}
              {...props}
            >
              READY FOR ANYTHING
            </EditableText>
            <EditableButton
              id="outlier_final_cta"
              className="bg-white text-gray-900 px-12 py-4 text-sm font-semibold tracking-widest hover:bg-gray-100 transition-colors"
              editable={editable}
              {...props}
            >
              SHOP NOW
            </EditableButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <EditableImage
                id="outlier_footer_logo"
                src="/placeholder.svg?height=30&width=120&query=outlier%20logo%20white"
                alt="Outlier Apparel"
                className="h-8 w-auto mb-6"
                editable={editable}
                {...props}
              />
              <EditableText id="outlier_footer_tagline" className="text-sm text-gray-400" editable={editable} {...props}>
                Performance apparel for the modern professional
              </EditableText>
            </div>
            <div>
              <EditableText id="outlier_footer_shop_title" as="h5" className="text-sm font-semibold tracking-widest mb-4" editable={editable} {...props}>
                SHOP
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                {["Pants", "Shirts", "Outerwear", "Accessories"].map((item, i) => (
                  <EditableText key={item} id={`outlier_footer_shop_${i}`} className="block hover:text-white cursor-pointer" editable={editable} {...props}>
                    {item}
                  </EditableText>
                ))}
              </div>
            </div>
            <div>
              <EditableText id="outlier_footer_company_title" as="h5" className="text-sm font-semibold tracking-widest mb-4" editable={editable} {...props}>
                COMPANY
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                {["About", "Journal", "Careers", "Contact"].map((item, i) => (
                  <EditableText key={item} id={`outlier_footer_company_${i}`} className="block hover:text-white cursor-pointer" editable={editable} {...props}>
                    {item}
                  </EditableText>
                ))}
              </div>
            </div>
            <div>
              <EditableText id="outlier_footer_support_title" as="h5" className="text-sm font-semibold tracking-widest mb-4" editable={editable} {...props}>
                SUPPORT
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                {["Sizing", "Returns", "Shipping", "FAQ"].map((item, i) => (
                  <EditableText key={item} id={`outlier_footer_support_${i}`} className="block hover:text-white cursor-pointer" editable={editable} {...props}>
                    {item}
                  </EditableText>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <EditableText id="outlier_footer_copyright" editable={editable} {...props}>
              © 2025 Outlier Apparel. All rights reserved.
            </EditableText>
          </div>
        </div>
      </footer>
    </main>
  )
}
