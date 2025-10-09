"use client"
import type { TemplateProps } from "../types"
import { EditableButton, EditableImage, EditableText } from "../shared/editable"

export function CatFoodTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-white text-gray-900">
      {/* Navigation */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <EditableText id="cat_brand" as="h1" className="text-xl font-bold" editable={editable} {...props}>
            ROYAL 0
          </EditableText>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {["PRODUCTS", "ABOUT", "CONTACT"].map((label, i) => (
              <EditableText key={label} id={`cat_nav_${i}`} className="hover:text-orange-600 transition-colors" editable={editable} {...props}>
                {label}
              </EditableText>
            ))}
          </nav>
          <EditableButton id="cat_nav_cta" className="bg-black hover:bg-gray-800 text-white px-6 py-2 text-sm font-medium" editable={editable} {...props}>
            SHOP NOW
          </EditableButton>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <EditableText
                id="cat_hero_title"
                as="h2"
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
                editable={editable}
                {...props}
              >
                FOR THE BURGLAR CAT.
              </EditableText>
              <EditableText
                id="cat_hero_subtitle"
                className="text-lg text-gray-600 mb-8 leading-relaxed"
                editable={editable}
                {...props}
              >
                Premium nutrition designed for your feline friend's unique needs. Made with real ingredients, backed by science.
              </EditableText>
              <EditableButton id="cat_hero_cta" className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-base font-medium" editable={editable} {...props}>
                DISCOVER MORE
              </EditableButton>
            </div>
            <div className="relative">
              <EditableImage
                id="cat_hero_image"
                src="/placeholder.svg?height=500&width=500&query=cat%20eating"
                alt="Cat with food"
                className="w-full h-auto rounded-lg"
                editable={editable}
                {...props}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 py-6">
        <div className="mx-auto max-w-7xl px-6">
          <nav className="flex items-center justify-center gap-8 text-white font-medium">
            {["NutriFood", "ROYAL O", "THERAPY", "INSTINCT", "Relationship"].map((label, i) => (
              <EditableText key={label} id={`cat_category_${i}`} className="hover:underline cursor-pointer" editable={editable} {...props}>
                {label}
              </EditableText>
            ))}
          </nav>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <EditableText
            id="cat_features_title"
            as="h3"
            className="text-3xl md:text-4xl font-bold mb-4 text-center"
            editable={editable}
            {...props}
          >
            HEALTH BENEFITS
          </EditableText>
          <EditableText
            id="cat_features_subtitle"
            className="text-center text-gray-600 mb-16 max-w-2xl mx-auto"
            editable={editable}
            {...props}
          >
            Everything your cat needs for a healthy, happy life
          </EditableText>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🦴", title: "Strong Bones", desc: "Calcium and phosphorus for healthy bone development and maintenance throughout life." },
              { icon: "🐾", title: "Healthy Joints", desc: "Glucosamine and chondroitin support joint health and mobility for active cats." },
              { icon: "✨", title: "Shiny Coat", desc: "Omega-3 and Omega-6 fatty acids promote a lustrous, healthy coat and skin." }
            ].map((feature, i) => (
              <div key={i} className="text-center p-6 bg-orange-50 rounded-lg">
                <div className="text-5xl mb-4">
                  <EditableText id={`cat_feature_${i}_icon`} editable={editable} {...props}>
                    {feature.icon}
                  </EditableText>
                </div>
                <EditableText
                  id={`cat_feature_${i}_title`}
                  as="h4"
                  className="text-xl font-bold mb-3"
                  editable={editable}
                  {...props}
                >
                  {feature.title}
                </EditableText>
                <EditableText
                  id={`cat_feature_${i}_desc`}
                  className="text-gray-600 text-sm leading-relaxed"
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

      {/* Cat Health Section */}
      <section className="bg-yellow-300 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <EditableImage
                id="cat_health_image"
                src="/placeholder.svg?height=600&width=500&query=woman%20with%20cat"
                alt="Woman with cat"
                className="w-full h-auto rounded-lg shadow-2xl"
                editable={editable}
                {...props}
              />
            </div>
            <div>
              <EditableText
                id="cat_health_eyebrow"
                className="text-sm font-semibold mb-2 uppercase tracking-wide"
                editable={editable}
                {...props}
              >
                CAT NUTRITION
              </EditableText>
              <EditableText
                id="cat_health_title"
                as="h3"
                className="text-4xl md:text-5xl font-bold mb-6"
                editable={editable}
                {...props}
              >
                Cat health starts with you.
              </EditableText>
              <EditableText
                id="cat_health_desc"
                className="text-gray-700 mb-8 leading-relaxed"
                editable={editable}
                {...props}
              >
                Your cat's health is our priority. Our scientifically formulated recipes provide complete and balanced nutrition for every life stage, from playful kittens to senior cats.
              </EditableText>
              <EditableButton id="cat_health_cta" className="bg-black hover:bg-gray-800 text-white px-8 py-3 font-medium" editable={editable} {...props}>
                LEARN MORE
              </EditableButton>
            </div>
          </div>
        </div>
      </section>

      {/* Fresh Kills Section */}
      <section className="bg-cyan-300 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <EditableText
              id="cat_fresh_title"
              as="h3"
              className="text-5xl md:text-6xl font-black mb-6 tracking-tight"
              editable={editable}
              {...props}
            >
              FRESH KILLS
            </EditableText>
            <EditableText
              id="cat_fresh_subtitle"
              className="text-lg text-gray-700 max-w-2xl mx-auto mb-8"
              editable={editable}
              {...props}
            >
              Real meat, real ingredients. No artificial preservatives, colors, or flavors. Just pure, natural nutrition your cat will love.
            </EditableText>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <EditableImage
              id="cat_fresh_image"
              src="/placeholder.svg?height=600&width=800&query=cat%20eating%20food"
              alt="Cat eating fresh food"
              className="w-full h-auto rounded-lg shadow-2xl"
              editable={editable}
              {...props}
            />
          </div>
        </div>
      </section>

      {/* Dry Kills Section */}
      <section className="bg-orange-500 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <EditableText
                id="cat_dry_title"
                as="h3"
                className="text-5xl md:text-6xl font-black mb-6 tracking-tight"
                editable={editable}
                {...props}
              >
                DRY KILLS
              </EditableText>
              <EditableText
                id="cat_dry_desc"
                className="text-lg leading-relaxed mb-8"
                editable={editable}
                {...props}
              >
                Crunchy kibble that helps maintain dental health while providing complete nutrition. Perfect for cats who prefer dry food or as a complement to wet food.
              </EditableText>
              <EditableButton id="cat_dry_cta" className="bg-white hover:bg-gray-100 text-orange-600 px-8 py-3 font-bold" editable={editable} {...props}>
                SHOP DRY FOOD
              </EditableButton>
            </div>
            <div className="relative">
              <EditableImage
                id="cat_dry_image"
                src="/placeholder.svg?height=600&width=600&query=white%20cat"
                alt="White cat"
                className="w-full h-auto rounded-lg"
                editable={editable}
                {...props}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-b from-yellow-200 to-yellow-300">
        <div className="mx-auto max-w-7xl px-6">
          <EditableText
            id="cat_why_title"
            as="h3"
            className="text-4xl md:text-5xl font-bold mb-16 text-center"
            editable={editable}
            {...props}
          >
            WHY CHOOSE US
          </EditableText>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🥩", title: "Real Meat First", desc: "Our recipes start with real, high-quality meat as the first ingredient for optimal protein." },
              { icon: "🔬", title: "Science-Backed", desc: "Developed by veterinarians and nutritionists to meet your cat's specific needs." },
              { icon: "🌿", title: "Natural Ingredients", desc: "No artificial colors, flavors, or preservatives. Just wholesome, natural nutrition." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="text-5xl mb-4">
                  <EditableText id={`cat_why_${i}_icon`} editable={editable} {...props}>
                    {item.icon}
                  </EditableText>
                </div>
                <EditableText
                  id={`cat_why_${i}_title`}
                  as="h4"
                  className="text-xl font-bold mb-3"
                  editable={editable}
                  {...props}
                >
                  {item.title}
                </EditableText>
                <EditableText
                  id={`cat_why_${i}_desc`}
                  className="text-gray-600 text-sm leading-relaxed"
                  editable={editable}
                  {...props}
                >
                  {item.desc}
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Colorful Section with Plants */}
      <section className="relative py-20 bg-gradient-to-r from-green-400 via-yellow-300 to-orange-400">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <EditableImage
                id="cat_plants_image"
                src="/placeholder.svg?height=600&width=600&query=plants%20and%20food"
                alt="Natural ingredients"
                className="w-full h-auto rounded-lg"
                editable={editable}
                {...props}
              />
            </div>
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <EditableText
                id="cat_plants_title"
                as="h3"
                className="text-3xl font-bold mb-4"
                editable={editable}
                {...props}
              >
                DIGS
              </EditableText>
              <EditableText
                id="cat_plants_desc"
                className="text-gray-700 leading-relaxed mb-6"
                editable={editable}
                {...props}
              >
                We dig deep to source the finest ingredients from trusted suppliers. Every ingredient is carefully selected and tested to ensure the highest quality and safety for your cat.
              </EditableText>
              <EditableButton id="cat_plants_cta" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-medium" editable={editable} {...props}>
                OUR INGREDIENTS
              </EditableButton>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <EditableText
            id="cat_testimonials_title"
            as="h3"
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
            editable={editable}
            {...props}
          >
            CAT'S LOVE RESULTS
          </EditableText>
          <EditableText
            id="cat_testimonials_subtitle"
            className="text-center text-gray-600 mb-16"
            editable={editable}
            {...props}
          >
            See what cat parents are saying
          </EditableText>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah M.", text: "My cat's coat has never looked better! She loves the taste and I love the ingredients.", image: "/placeholder.svg?height=100&width=100&query=cat%201" },
              { name: "John D.", text: "Finally found a food my picky eater actually enjoys. The quality is outstanding.", image: "/placeholder.svg?height=100&width=100&query=cat%202" },
              { name: "Emily R.", text: "Noticed a huge difference in my senior cat's energy levels. Highly recommend!", image: "/placeholder.svg?height=100&width=100&query=cat%203" }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <EditableImage
                    id={`cat_testimonial_${i}_image`}
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4"
                    editable={editable}
                    {...props}
                  />
                  <EditableText
                    id={`cat_testimonial_${i}_name`}
                    as="h5"
                    className="font-bold"
                    editable={editable}
                    {...props}
                  >
                    {testimonial.name}
                  </EditableText>
                </div>
                <EditableText
                  id={`cat_testimonial_${i}_text`}
                  className="text-gray-600 text-sm leading-relaxed italic"
                  editable={editable}
                  {...props}
                >
                  "{testimonial.text}"
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Money Back Guarantee */}
      <section className="bg-gradient-to-r from-orange-100 to-yellow-100 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <EditableImage
              id="cat_guarantee_badge"
              src="/placeholder.svg?height=100&width=100&query=badge"
              alt="Guarantee badge"
              className="w-24 h-24"
              editable={editable}
              {...props}
            />
          </div>
          <EditableText
            id="cat_guarantee_title"
            as="h3"
            className="text-3xl md:text-4xl font-bold mb-4"
            editable={editable}
            {...props}
          >
            MONEY-BACK GUARANTEED
          </EditableText>
          <EditableText
            id="cat_guarantee_desc"
            className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto"
            editable={editable}
            {...props}
          >
            We're so confident your cat will love our food that we offer a 100% satisfaction guarantee. If you're not completely satisfied, we'll refund your purchase.
          </EditableText>
          <EditableButton id="cat_guarantee_cta" className="bg-black hover:bg-gray-800 text-white px-8 py-3 font-medium" editable={editable} {...props}>
            TRY RISK-FREE
          </EditableButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <EditableText id="cat_footer_brand" as="h4" className="text-xl font-bold mb-4" editable={editable} {...props}>
                ROYAL 0
              </EditableText>
              <EditableText id="cat_footer_tagline" className="text-gray-400 text-sm" editable={editable} {...props}>
                Premium nutrition for your feline friend
              </EditableText>
            </div>
            <div>
              <EditableText id="cat_footer_products_title" as="h5" className="font-semibold mb-4" editable={editable} {...props}>
                Products
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                {["Dry Food", "Wet Food", "Treats", "Supplements"].map((item, i) => (
                  <EditableText key={item} id={`cat_footer_product_${i}`} className="block hover:text-white" editable={editable} {...props}>
                    {item}
                  </EditableText>
                ))}
              </div>
            </div>
            <div>
              <EditableText id="cat_footer_company_title" as="h5" className="font-semibold mb-4" editable={editable} {...props}>
                Company
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                {["About Us", "Contact", "Blog", "Careers"].map((item, i) => (
                  <EditableText key={item} id={`cat_footer_company_${i}`} className="block hover:text-white" editable={editable} {...props}>
                    {item}
                  </EditableText>
                ))}
              </div>
            </div>
            <div>
              <EditableText id="cat_footer_social_title" as="h5" className="font-semibold mb-4" editable={editable} {...props}>
                Follow Us
              </EditableText>
              <div className="flex gap-4">
                {["f", "𝕏", "in"].map((icon, i) => (
                  <EditableText key={icon} id={`cat_footer_social_${i}`} className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700" editable={editable} {...props}>
                    {icon}
                  </EditableText>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <EditableText id="cat_footer_copyright" editable={editable} {...props}>
              © 2025 Royal O. All rights reserved. | Privacy Policy | Terms of Service
            </EditableText>
          </div>
        </div>
      </footer>
    </main>
  )
}
