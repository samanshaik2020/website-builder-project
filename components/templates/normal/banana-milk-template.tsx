"use client"
import type { TemplateProps } from "../types"
import { EditableButton, EditableImage, EditableText } from "../shared/editable"

export function BananaMilkTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-white text-gray-900">
      {/* Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <EditableImage
            id="bm_logo"
            src=""
            alt="Brand Logo"
            className="h-12 w-auto"
            editable={editable}
            {...props}
          />
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            <EditableText id="bm_nav_0" className="hover:text-yellow-500 transition-colors cursor-pointer" editable={editable} {...props}>
              Home
            </EditableText>
            <EditableText id="bm_nav_1" className="hover:text-yellow-500 transition-colors cursor-pointer" editable={editable} {...props}>
              Our Products
            </EditableText>
            <EditableText id="bm_nav_2" className="hover:text-yellow-500 transition-colors cursor-pointer" editable={editable} {...props}>
              Our Story
            </EditableText>
            <EditableText id="bm_nav_3" className="hover:text-yellow-500 transition-colors cursor-pointer" editable={editable} {...props}>
              Recipes
            </EditableText>
            <EditableText id="bm_nav_4" className="hover:text-yellow-500 transition-colors cursor-pointer" editable={editable} {...props}>
              Hello at Mooala
            </EditableText>
            <EditableText id="bm_nav_5" className="hover:text-yellow-500 transition-colors cursor-pointer" editable={editable} {...props}>
              Find a Store
            </EditableText>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-yellow-300 via-yellow-200 to-yellow-100 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300 rounded-full blur-3xl"></div>
        </div>
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <EditableText
                id="bm_hero_title"
                as="h1"
                className="text-6xl md:text-7xl font-black mb-6 leading-tight text-white"
                editable={editable}
                {...props}
              >
                BANAMILK.<br />It's A thing.
              </EditableText>
              <EditableText
                id="bm_hero_subtitle"
                className="text-lg text-gray-800 mb-6 leading-relaxed max-w-md"
                editable={editable}
                {...props}
              >
                Banamilk is made from 4 ingredients. Bananas, sunflower seeds, cinnamon and Himalayan pink salt. Banamilk is dairy free, nut free, soy free, gluten free and delicious. It's also dairy free and nut free.
              </EditableText>
              <div className="mb-6">
                <EditableText
                  id="bm_hero_email_label"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                  editable={editable}
                  {...props}
                >
                  Get the latest on Banamilk and more!
                </EditableText>
                <div className="flex gap-3 max-w-md">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <EditableButton
                    id="bm_hero_cta"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 font-medium rounded-md whitespace-nowrap"
                    editable={editable}
                    {...props}
                  >
                    EMAIL COUPON
                  </EditableButton>
                </div>
                <label className="flex items-center gap-2 mt-3 text-xs text-gray-600">
                  <input type="checkbox" className="rounded" />
                  <EditableText id="bm_hero_checkbox" editable={editable} {...props}>
                    I agree to receive recurring automated marketing messages at the email provided. Consent is not a condition of purchase. View Privacy Policy.
                  </EditableText>
                </label>
              </div>
            </div>
            <div className="relative">
              <EditableImage
                id="bm_hero_product"
                src=""
                alt="Banamilk Product"
                className="w-full h-auto max-w-md mx-auto drop-shadow-2xl"
                editable={editable}
                {...props}
              />
            </div>
          </div>
        </div>
      </section>

      {/* It's Bananas Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <EditableText
              id="bm_bananas_title"
              as="h2"
              className="text-5xl md:text-6xl font-black mb-6 text-blue-900"
              editable={editable}
              {...props}
            >
              IT'S BANANAS!
            </EditableText>
            <EditableText
              id="bm_bananas_subtitle"
              className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed"
              editable={editable}
              {...props}
            >
              What is Banamilk, you ask? It's not a sugary sweet banana smoothie, as you might think. But that could hardly be farther from the truth. Made with the finest organic ingredients, free from nuts or added sugar, our Banamilk is dairy free, nut free, soy free, gluten free and delicious. It's also dairy free and nut free. Banamilk is a guilt-free alternative that you can enjoy guilt free.
            </EditableText>
          </div>

          {/* Features Banner */}
          <div className="bg-gradient-to-r from-green-400 via-green-300 to-green-400 py-6 rounded-lg shadow-lg">
            <div className="flex flex-wrap items-center justify-center gap-8 text-white font-bold text-lg">
              <EditableText id="bm_feature_0" editable={editable} {...props}>
                USDA ORGANIC
              </EditableText>
              <span className="text-2xl">•</span>
              <EditableText id="bm_feature_1" editable={editable} {...props}>
                NON-GMO
              </EditableText>
              <span className="text-2xl">•</span>
              <EditableText id="bm_feature_2" editable={editable} {...props}>
                50 CALORIES
              </EditableText>
              <span className="text-2xl">•</span>
              <EditableText id="bm_feature_3" editable={editable} {...props}>
                6 INGREDIENTS
              </EditableText>
            </div>
          </div>
        </div>
      </section>

      {/* Product Flavors Section */}
      <section className="py-20 bg-gradient-to-b from-blue-100 to-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <EditableText
              id="bm_flavors_title"
              as="h2"
              className="text-5xl md:text-6xl font-black mb-6 text-blue-900"
              editable={editable}
              {...props}
            >
              FLAVOR FULL.
            </EditableText>
            <EditableText
              id="bm_flavors_subtitle"
              className="text-lg text-gray-700 max-w-2xl mx-auto"
              editable={editable}
              {...props}
            >
              Original, Chocolate, Vanilla, All Mooala, we offer a variety of fun, plant-based options to suit every taste. Check out our full lineup!
            </EditableText>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {[
              { name: "Original", color: "from-yellow-200 to-yellow-100" },
              { name: "Chocolate", color: "from-amber-200 to-amber-100" },
              { name: "Vanilla", color: "from-orange-200 to-orange-100" },
              { name: "All Mooala", color: "from-blue-200 to-blue-100" }
            ].map((flavor, i) => (
              <div key={i} className={`bg-gradient-to-b ${flavor.color} rounded-lg p-6 text-center shadow-lg`}>
                <EditableImage
                  id={`bm_flavor_${i}_image`}
                  src={``}
                  alt={flavor.name}
                  className="w-full h-64 object-contain mb-4"
                  editable={editable}
                  {...props}
                />
                <EditableText
                  id={`bm_flavor_${i}_name`}
                  className="text-xl font-bold text-gray-800"
                  editable={editable}
                  {...props}
                >
                  {flavor.name}
                </EditableText>
              </div>
            ))}
          </div>

          <div className="text-center">
            <EditableButton
              id="bm_flavors_cta"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 text-lg font-bold rounded-full shadow-lg"
              editable={editable}
              {...props}
            >
              LEARN MORE
            </EditableButton>
          </div>
        </div>
      </section>

      {/* Check Out Our Moos Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <EditableText
            id="bm_moos_title"
            as="h2"
            className="text-5xl md:text-6xl font-black mb-12 text-center text-blue-900"
            editable={editable}
            {...props}
          >
            CHECK OUT OUR MOOS
          </EditableText>

          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <EditableImage
                  id={`bm_moo_${i}_image`}
                  src={``}
                  alt={`Lifestyle ${i}`}
                  className="w-full h-64 object-cover"
                  editable={editable}
                  {...props}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Locator Section */}
      <section className="py-20 bg-gradient-to-b from-gray-100 to-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <EditableText
            id="bm_store_title"
            as="h2"
            className="text-5xl md:text-6xl font-black mb-6 text-blue-900"
            editable={editable}
            {...props}
          >
            We're Closer Than<br />You Think.
          </EditableText>
          <EditableText
            id="bm_store_subtitle"
            className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto"
            editable={editable}
            {...props}
          >
            Mooala is available in hundreds of grocery stores, each more being added all the time. Click below to find the locations nearest you!
          </EditableText>
          <EditableButton
            id="bm_store_cta"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-10 py-4 text-lg font-bold rounded-full shadow-lg"
            editable={editable}
            {...props}
          >
            FIND A STORE
          </EditableButton>
        </div>
      </section>

      {/* Social Section */}
      <section className="py-16 bg-yellow-300">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-8">
            <EditableText
              id="bm_social_title"
              as="h3"
              className="text-4xl font-black mb-4 text-gray-900"
              editable={editable}
              {...props}
            >
              STAY<br />CONNECTED!
            </EditableText>
          </div>
          <div className="flex justify-center gap-6">
            {["Facebook", "Snapchat", "Instagram", "Pinterest", "Twitter"].map((social, i) => (
              <EditableButton
                key={social}
                id={`bm_social_${i}`}
                className="w-12 h-12 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110"
                editable={editable}
                {...props}
              >
                {social[0]}
              </EditableButton>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <EditableImage
                id="bm_footer_logo"
                src=""
                alt="Mooala"
                className="h-10 w-auto mb-4"
                editable={editable}
                {...props}
              />
              <EditableText id="bm_footer_tagline" className="text-gray-400 text-sm" editable={editable} {...props}>
                Plant-based goodness in every sip
              </EditableText>
            </div>
            <div>
              <EditableText id="bm_footer_products_title" as="h5" className="font-semibold mb-4" editable={editable} {...props}>
                Products
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                {["Banamilk", "Almondmilk", "Oatmilk", "Creamers"].map((item, i) => (
                  <EditableText key={item} id={`bm_footer_product_${i}`} className="block hover:text-white cursor-pointer" editable={editable} {...props}>
                    {item}
                  </EditableText>
                ))}
              </div>
            </div>
            <div>
              <EditableText id="bm_footer_company_title" as="h5" className="font-semibold mb-4" editable={editable} {...props}>
                Company
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                {["Our Story", "Recipes", "Blog", "Contact"].map((item, i) => (
                  <EditableText key={item} id={`bm_footer_company_${i}`} className="block hover:text-white cursor-pointer" editable={editable} {...props}>
                    {item}
                  </EditableText>
                ))}
              </div>
            </div>
            <div>
              <EditableText id="bm_footer_support_title" as="h5" className="font-semibold mb-4" editable={editable} {...props}>
                Support
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                {["FAQ", "Store Locator", "Wholesale", "Careers"].map((item, i) => (
                  <EditableText key={item} id={`bm_footer_support_${i}`} className="block hover:text-white cursor-pointer" editable={editable} {...props}>
                    {item}
                  </EditableText>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <EditableText id="bm_footer_copyright" editable={editable} {...props}>
              © 2025 Mooala. All rights reserved. | Privacy Policy | Terms of Service
            </EditableText>
          </div>
        </div>
      </footer>
    </main>
  )
}
