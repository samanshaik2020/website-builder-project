"use client"
import type { TemplateProps } from "../types"
import { EditableButton, EditableImage, EditableText } from "../shared/editable"

export function KetoBarTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-white text-gray-900">
      {/* Navigation */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <EditableText id="keto_brand" as="h1" className="text-xl font-bold" editable={editable} {...props}>
            PERFECT KETO
          </EditableText>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {["Products", "Nutrition", "About", "Reviews"].map((label, i) => (
              <EditableText key={label} id={`keto_nav_${i}`} className="hover:text-teal-600 transition-colors" editable={editable} {...props}>
                {label}
              </EditableText>
            ))}
          </nav>
          <EditableButton id="keto_nav_cta" className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 text-sm font-medium rounded" editable={editable} {...props}>
            Shop Now
          </EditableButton>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-teal-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <EditableText
                id="keto_hero_title"
                as="h2"
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
                editable={editable}
                {...props}
              >
                Your new keto secret weapon.
              </EditableText>
              <EditableText
                id="keto_hero_subtitle"
                className="text-lg text-gray-600 mb-8 leading-relaxed"
                editable={editable}
                {...props}
              >
                Delicious, low-carb protein bars that keep you in ketosis. Real ingredients, amazing taste, zero compromise.
              </EditableText>
              <EditableButton id="keto_hero_cta" className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-base font-medium rounded-lg" editable={editable} {...props}>
                Get Started
              </EditableButton>
            </div>
            <div className="relative">
              <EditableImage
                id="keto_hero_image"
                src="/placeholder.svg?height=500&width=500&query=keto%20protein%20bar"
                alt="Keto protein bar"
                className="w-full h-auto rounded-lg"
                editable={editable}
                {...props}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Bar */}
      <section className="bg-white border-y border-gray-200 py-4">
        <div className="mx-auto max-w-7xl px-6">
          <nav className="flex items-center justify-center gap-8 text-sm font-medium text-gray-600">
            {["Keto Bars", "Ingredients", "Nutrition", "Benefits", "Reviews"].map((label, i) => (
              <EditableText key={label} id={`keto_category_${i}`} className="hover:text-teal-600 cursor-pointer transition-colors" editable={editable} {...props}>
                {label}
              </EditableText>
            ))}
          </nav>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <EditableText
              id="keto_showcase_title"
              as="h3"
              className="text-4xl md:text-5xl font-bold mb-4"
              editable={editable}
              {...props}
            >
              Keto Bars
            </EditableText>
            <EditableText
              id="keto_showcase_subtitle"
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              editable={editable}
              {...props}
            >
              Premium ingredients, scientifically formulated for optimal ketosis
            </EditableText>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative">
              <EditableImage
                id="keto_product_1_image"
                src="/placeholder.svg?height=600&width=600&query=chocolate%20keto%20bar"
                alt="Keto bar product"
                className="w-full h-auto rounded-lg shadow-xl"
                editable={editable}
                {...props}
              />
            </div>
            <div>
              <EditableText
                id="keto_product_1_title"
                as="h4"
                className="text-3xl font-bold mb-4"
                editable={editable}
                {...props}
              >
                The perfect keto snack
              </EditableText>
              <EditableText
                id="keto_product_1_desc"
                className="text-gray-600 mb-6 leading-relaxed"
                editable={editable}
                {...props}
              >
                Our bars are made with clean, whole food ingredients. No artificial sweeteners, no maltitol, no compromise. Just pure, delicious nutrition that keeps you energized and in ketosis.
              </EditableText>
              <ul className="space-y-3 mb-8">
                {[
                  "Only 3g net carbs per bar",
                  "15g of quality protein",
                  "Real food ingredients",
                  "No artificial sweeteners"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-teal-500 text-xl">✓</span>
                    <EditableText id={`keto_product_1_feature_${i}`} className="text-gray-700" editable={editable} {...props}>
                      {item}
                    </EditableText>
                  </li>
                ))}
              </ul>
              <EditableButton id="keto_product_1_cta" className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 font-medium rounded-lg" editable={editable} {...props}>
                Shop Keto Bars
              </EditableButton>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <EditableText
            id="keto_benefits_title"
            as="h3"
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
            editable={editable}
            {...props}
          >
            Keto Bars are perfect for...
          </EditableText>
          <EditableText
            id="keto_benefits_subtitle"
            className="text-center text-gray-600 mb-16 max-w-2xl mx-auto"
            editable={editable}
            {...props}
          >
            Whether you're at home, at work, or on the go
          </EditableText>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🏃", title: "Pre-Workout Fuel", desc: "Clean energy without the sugar crash. Perfect before your workout or morning run." },
              { icon: "💼", title: "Office Snack", desc: "Stay focused and energized throughout your workday with convenient, mess-free nutrition." },
              { icon: "✈️", title: "Travel Companion", desc: "TSA-friendly and shelf-stable. Your perfect keto companion wherever you go." }
            ].map((benefit, i) => (
              <div key={i} className="text-center p-8 bg-teal-50 rounded-lg">
                <div className="text-5xl mb-4">
                  <EditableText id={`keto_benefit_${i}_icon`} editable={editable} {...props}>
                    {benefit.icon}
                  </EditableText>
                </div>
                <EditableText
                  id={`keto_benefit_${i}_title`}
                  as="h4"
                  className="text-xl font-bold mb-3"
                  editable={editable}
                  {...props}
                >
                  {benefit.title}
                </EditableText>
                <EditableText
                  id={`keto_benefit_${i}_desc`}
                  className="text-gray-600 text-sm leading-relaxed"
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

      {/* Product Image with Text Section */}
      <section className="bg-gradient-to-b from-teal-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <EditableText
                id="keto_feature_title"
                as="h3"
                className="text-4xl md:text-5xl font-bold mb-6"
                editable={editable}
                {...props}
              >
                Keto made with real food.
              </EditableText>
              <EditableText
                id="keto_feature_desc"
                className="text-gray-600 mb-8 leading-relaxed"
                editable={editable}
                {...props}
              >
                We believe in real ingredients you can pronounce. Our bars are made with almonds, coconut, cocoa, and other whole foods. No lab-created fillers or artificial ingredients.
              </EditableText>
              <EditableButton id="keto_feature_cta" className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 font-medium rounded-lg" editable={editable} {...props}>
                See Ingredients
              </EditableButton>
            </div>
            <div className="relative">
              <EditableImage
                id="keto_feature_image"
                src="/placeholder.svg?height=600&width=600&query=keto%20bar%20ingredients"
                alt="Keto bar with ingredients"
                className="w-full h-auto rounded-lg shadow-xl"
                editable={editable}
                {...props}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Colorful Product Lineup */}
      <section className="py-20 bg-gradient-to-r from-orange-100 via-teal-100 to-yellow-100">
        <div className="mx-auto max-w-7xl px-6">
          <EditableText
            id="keto_flavors_title"
            as="h3"
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
            editable={editable}
            {...props}
          >
            5 Delicious Flavors
          </EditableText>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { name: "Chocolate", color: "from-orange-200 to-orange-300" },
              { name: "Peanut Butter", color: "from-yellow-200 to-yellow-300" },
              { name: "Coconut", color: "from-teal-200 to-teal-300" },
              { name: "Almond", color: "from-red-200 to-red-300" },
              { name: "Lemon", color: "from-yellow-100 to-yellow-200" }
            ].map((flavor, i) => (
              <div key={i} className={`bg-gradient-to-b ${flavor.color} p-6 rounded-lg text-center`}>
                <EditableImage
                  id={`keto_flavor_${i}_image`}
                  src={`/placeholder.svg?height=200&width=150&query=keto%20bar%20${flavor.name}`}
                  alt={flavor.name}
                  className="w-full h-48 object-contain mb-4"
                  editable={editable}
                  {...props}
                />
                <EditableText
                  id={`keto_flavor_${i}_name`}
                  className="font-bold text-lg"
                  editable={editable}
                  {...props}
                >
                  {flavor.name}
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nutrition Facts Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <EditableText
                id="keto_nutrition_title"
                as="h3"
                className="text-4xl font-bold mb-6"
                editable={editable}
                {...props}
              >
                Nutrition Facts
              </EditableText>
              <div className="bg-white border-2 border-gray-900 p-6 rounded-lg">
                <EditableText
                  id="keto_nutrition_serving"
                  className="text-sm mb-4 pb-2 border-b-2 border-gray-900"
                  editable={editable}
                  {...props}
                >
                  Serving Size: 1 bar (50g)
                </EditableText>
                <div className="space-y-3">
                  {[
                    { label: "Calories", value: "190" },
                    { label: "Total Fat", value: "14g" },
                    { label: "Total Carbs", value: "15g" },
                    { label: "Dietary Fiber", value: "12g" },
                    { label: "Net Carbs", value: "3g" },
                    { label: "Protein", value: "15g" }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-gray-300">
                      <EditableText id={`keto_nutrition_${i}_label`} className="font-medium" editable={editable} {...props}>
                        {item.label}
                      </EditableText>
                      <EditableText id={`keto_nutrition_${i}_value`} className="font-bold" editable={editable} {...props}>
                        {item.value}
                      </EditableText>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <EditableText
                id="keto_why_title"
                as="h3"
                className="text-4xl font-bold mb-6"
                editable={editable}
                {...props}
              >
                Why we chose this formula
              </EditableText>
              <div className="space-y-4">
                {[
                  "Low net carbs to maintain ketosis",
                  "High quality fats from coconut and almonds",
                  "Complete amino acid profile",
                  "No blood sugar spikes",
                  "Sustained energy for hours"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-teal-500 text-xl mt-1">✓</span>
                    <EditableText id={`keto_why_${i}`} className="text-gray-700 leading-relaxed" editable={editable} {...props}>
                      {item}
                    </EditableText>
                  </div>
                ))}
              </div>
              <EditableText
                id="keto_why_desc"
                className="mt-6 text-gray-600 leading-relaxed"
                editable={editable}
                {...props}
              >
                Our formula is designed by nutritionists and tested by athletes. Every ingredient serves a purpose, and nothing is included that doesn't need to be.
              </EditableText>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-teal-50 to-white">
        <div className="mx-auto max-w-7xl px-6">
          <EditableText
            id="keto_testimonials_title"
            as="h3"
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
            editable={editable}
            {...props}
          >
            Trusted by health leaders.
          </EditableText>
          <EditableText
            id="keto_testimonials_subtitle"
            className="text-center text-gray-600 mb-16"
            editable={editable}
            {...props}
          >
            See what our customers are saying
          </EditableText>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              { name: "Dr. Sarah Johnson", role: "Nutritionist", text: "These bars are a game-changer for my clients. Clean ingredients, perfect macros, and they actually taste good." },
              { name: "Mike Peterson", role: "Fitness Coach", text: "I recommend these to all my keto clients. They're the only bars I trust that won't kick you out of ketosis." },
              { name: "Jennifer Lee", role: "Keto Blogger", text: "After trying dozens of keto bars, these are the only ones I keep in my pantry. The taste and texture are unmatched." },
              { name: "David Martinez", role: "Athlete", text: "Perfect pre-workout fuel. Gives me sustained energy without any crash. I won't train without them." }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <EditableImage
                    id={`keto_testimonial_${i}_image`}
                    src={`/placeholder.svg?height=60&width=60&query=person%20${i + 1}`}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full mr-4"
                    editable={editable}
                    {...props}
                  />
                  <div>
                    <EditableText
                      id={`keto_testimonial_${i}_name`}
                      as="h5"
                      className="font-bold"
                      editable={editable}
                      {...props}
                    >
                      {testimonial.name}
                    </EditableText>
                    <EditableText
                      id={`keto_testimonial_${i}_role`}
                      className="text-sm text-gray-500"
                      editable={editable}
                      {...props}
                    >
                      {testimonial.role}
                    </EditableText>
                  </div>
                </div>
                <EditableText
                  id={`keto_testimonial_${i}_text`}
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

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <EditableText
            id="keto_faq_title"
            as="h3"
            className="text-4xl font-bold mb-12 text-center"
            editable={editable}
            {...props}
          >
            Frequently Asked Questions
          </EditableText>
          <div className="space-y-6">
            {[
              { q: "Are these bars really keto?", a: "Yes! With only 3g net carbs per bar, they're designed to keep you in ketosis." },
              { q: "What sweeteners do you use?", a: "We use only natural sweeteners like stevia and monk fruit. No artificial sweeteners or sugar alcohols." },
              { q: "How long do they stay fresh?", a: "Our bars have a 12-month shelf life and don't require refrigeration." },
              { q: "Are they gluten-free?", a: "Yes, all our bars are gluten-free, grain-free, and made in a dedicated facility." }
            ].map((faq, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-lg">
                <EditableText
                  id={`keto_faq_${i}_q`}
                  as="h4"
                  className="text-lg font-bold mb-2"
                  editable={editable}
                  {...props}
                >
                  {faq.q}
                </EditableText>
                <EditableText
                  id={`keto_faq_${i}_a`}
                  className="text-gray-600"
                  editable={editable}
                  {...props}
                >
                  {faq.a}
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-teal-500 to-teal-600 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <EditableText
            id="keto_final_title"
            as="h3"
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            editable={editable}
            {...props}
          >
            100% better ingredients.<br />100% better results.
          </EditableText>
          <EditableText
            id="keto_final_subtitle"
            className="text-lg text-teal-50 mb-8 max-w-2xl mx-auto"
            editable={editable}
            {...props}
          >
            Join thousands of people who have made the switch to clean keto nutrition.
          </EditableText>
          <EditableButton id="keto_final_cta" className="bg-white hover:bg-gray-100 text-teal-600 px-10 py-4 text-lg font-bold rounded-lg" editable={editable} {...props}>
            Start Your Journey
          </EditableButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <EditableText id="keto_footer_brand" as="h4" className="text-xl font-bold mb-4" editable={editable} {...props}>
                PERFECT KETO
              </EditableText>
              <EditableText id="keto_footer_tagline" className="text-gray-400 text-sm" editable={editable} {...props}>
                Real food. Real results.
              </EditableText>
            </div>
            <div>
              <EditableText id="keto_footer_products_title" as="h5" className="font-semibold mb-4" editable={editable} {...props}>
                Products
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                {["Keto Bars", "Protein Powder", "MCT Oil", "Supplements"].map((item, i) => (
                  <EditableText key={item} id={`keto_footer_product_${i}`} className="block hover:text-white" editable={editable} {...props}>
                    {item}
                  </EditableText>
                ))}
              </div>
            </div>
            <div>
              <EditableText id="keto_footer_company_title" as="h5" className="font-semibold mb-4" editable={editable} {...props}>
                Company
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                {["About Us", "Contact", "Blog", "Careers"].map((item, i) => (
                  <EditableText key={item} id={`keto_footer_company_${i}`} className="block hover:text-white" editable={editable} {...props}>
                    {item}
                  </EditableText>
                ))}
              </div>
            </div>
            <div>
              <EditableText id="keto_footer_social_title" as="h5" className="font-semibold mb-4" editable={editable} {...props}>
                Follow Us
              </EditableText>
              <div className="flex gap-4">
                {["f", "𝕏", "in"].map((icon, i) => (
                  <EditableText key={icon} id={`keto_footer_social_${i}`} className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700" editable={editable} {...props}>
                    {icon}
                  </EditableText>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <EditableText id="keto_footer_copyright" editable={editable} {...props}>
              © 2025 Perfect Keto. All rights reserved. | Privacy Policy | Terms of Service
            </EditableText>
          </div>
        </div>
      </footer>
    </main>
  )
}
