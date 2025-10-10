"use client"
import type { TemplateProps } from "../types"
import { EditableButton, EditableImage, EditableText } from "../shared/editable"

export function BranchFurnitureTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-white text-gray-900">
      {/* Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <EditableText id="branch_logo" as="h1" className="text-xl font-bold" editable={editable} {...props}>
            Branch
          </EditableText>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            <EditableText id="branch_nav_0" className="hover:text-gray-900 transition-colors cursor-pointer" editable={editable} {...props}>
              Shop
            </EditableText>
            <EditableText id="branch_nav_1" className="hover:text-gray-900 transition-colors cursor-pointer" editable={editable} {...props}>
              Collections
            </EditableText>
            <EditableText id="branch_nav_2" className="hover:text-gray-900 transition-colors cursor-pointer" editable={editable} {...props}>
              About
            </EditableText>
            <EditableText id="branch_nav_3" className="hover:text-gray-900 transition-colors cursor-pointer" editable={editable} {...props}>
              Contact
            </EditableText>
          </nav>
          <EditableButton
            id="branch_nav_cart"
            className="text-gray-700 hover:text-gray-900 font-medium"
            editable={editable}
            {...props}
          >
            Cart (0)
          </EditableButton>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-amber-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <EditableText
                id="branch_hero_title"
                as="h1"
                className="text-5xl md:text-6xl font-serif mb-6 text-gray-900"
                editable={editable}
                {...props}
              >
                Timeless Furniture for Modern Living
              </EditableText>
              <EditableText
                id="branch_hero_subtitle"
                className="text-xl text-gray-600 mb-8 leading-relaxed"
                editable={editable}
                {...props}
              >
                Handcrafted pieces that blend traditional craftsmanship with contemporary design. Each item is built to last generations.
              </EditableText>
              <div className="flex gap-4">
                <EditableButton
                  id="branch_hero_cta_primary"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-md font-semibold"
                  editable={editable}
                  {...props}
                >
                  Shop Collection
                </EditableButton>
                <EditableButton
                  id="branch_hero_cta_secondary"
                  className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-md font-semibold hover:bg-gray-900 hover:text-white transition-colors"
                  editable={editable}
                  {...props}
                >
                  Learn More
                </EditableButton>
              </div>
            </div>
            <div>
              <EditableImage
                id="branch_hero_image"
                src="https://placehold.co/600x400/EEE/999?text=Image"
                alt="Modern Furniture"
                className="w-full h-auto rounded-lg shadow-2xl"
                editable={editable}
                {...props}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { icon: "🌳", title: "Sustainable Materials", desc: "Responsibly sourced wood from certified forests" },
              { icon: "🛠️", title: "Handcrafted Quality", desc: "Each piece is carefully crafted by skilled artisans" },
              { icon: "🏠", title: "Lifetime Warranty", desc: "We stand behind our furniture for generations" }
            ].map((feature, i) => (
              <div key={i} className="space-y-4">
                <div className="text-5xl">{feature.icon}</div>
                <EditableText
                  id={`branch_feature_${i + 1}_title`}
                  as="h3"
                  className="text-xl font-semibold text-gray-900"
                  editable={editable}
                  {...props}
                >
                  {feature.title}
                </EditableText>
                <EditableText
                  id={`branch_feature_${i + 1}_desc`}
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

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <EditableText
              id="branch_products_title"
              as="h2"
              className="text-4xl font-serif mb-4 text-gray-900"
              editable={editable}
              {...props}
            >
              Featured Collection
            </EditableText>
            <EditableText
              id="branch_products_subtitle"
              className="text-lg text-gray-600"
              editable={editable}
              {...props}
            >
              Discover our most popular pieces
            </EditableText>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Oak Dining Table", price: "$1,299" },
              { name: "Walnut Bookshelf", price: "$899" },
              { name: "Maple Coffee Table", price: "$649" }
            ].map((product, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <EditableImage
                  id={`branch_product_${i + 1}_image`}
                  src={``}
                  alt={product.name}
                  className="w-full h-80 object-cover"
                  editable={editable}
                  {...props}
                />
                <div className="p-6">
                  <EditableText
                    id={`branch_product_${i + 1}_name`}
                    as="h3"
                    className="text-xl font-semibold text-gray-900 mb-2"
                    editable={editable}
                    {...props}
                  >
                    {product.name}
                  </EditableText>
                  <EditableText
                    id={`branch_product_${i + 1}_price`}
                    className="text-2xl font-bold text-amber-600 mb-4"
                    editable={editable}
                    {...props}
                  >
                    {product.price}
                  </EditableText>
                  <EditableButton
                    id={`branch_product_${i + 1}_cta`}
                    className="w-full bg-gray-900 text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors"
                    editable={editable}
                    {...props}
                  >
                    View Details
                  </EditableButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <EditableImage
                id="branch_craftsmanship_image"
                src="https://placehold.co/600x400/EEE/999?text=Image"
                alt="Craftsmanship"
                className="w-full h-auto rounded-lg"
                editable={editable}
                {...props}
              />
            </div>
            <div className="space-y-6">
              <EditableText
                id="branch_craftsmanship_title"
                as="h2"
                className="text-4xl font-serif text-gray-900"
                editable={editable}
                {...props}
              >
                The Art of Woodworking
              </EditableText>
              <EditableText
                id="branch_craftsmanship_description"
                className="text-lg text-gray-600 leading-relaxed"
                editable={editable}
                {...props}
              >
                Every piece of Branch furniture begins with carefully selected wood. Our master craftsmen use time-honored techniques passed down through generations, combined with modern precision tools to create furniture that's both beautiful and built to last.
              </EditableText>
              <EditableText
                id="branch_craftsmanship_details"
                className="text-gray-600 leading-relaxed"
                editable={editable}
                {...props}
              >
                From the initial design sketch to the final hand-rubbed finish, each step is performed with meticulous attention to detail. We believe that great furniture should improve with age, developing character and patina over time.
              </EditableText>
              <EditableButton
                id="branch_craftsmanship_cta"
                className="text-amber-600 font-semibold hover:text-amber-700 inline-flex items-center gap-2"
                editable={editable}
                {...props}
              >
                Learn About Our Process →
              </EditableButton>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-amber-50">
        <div className="mx-auto max-w-6xl px-6">
          <EditableText
            id="branch_testimonials_title"
            as="h2"
            className="text-4xl font-serif text-center mb-12 text-gray-900"
            editable={editable}
            {...props}
          >
            What Our Customers Say
          </EditableText>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-lg p-8 shadow-lg">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <EditableText
                  id={`branch_testimonial_${i}_text`}
                  className="text-gray-700 leading-relaxed mb-4 italic"
                  editable={editable}
                  {...props}
                >
                  "The quality of Branch furniture is exceptional. Our dining table has become the centerpiece of our home, and we know it will last for generations."
                </EditableText>
                <EditableText
                  id={`branch_testimonial_${i}_author`}
                  className="font-semibold text-gray-900"
                  editable={editable}
                  {...props}
                >
                  — Sarah Johnson
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <EditableText
            id="branch_newsletter_title"
            as="h2"
            className="text-3xl font-serif mb-4"
            editable={editable}
            {...props}
          >
            Stay Connected
          </EditableText>
          <EditableText
            id="branch_newsletter_subtitle"
            className="text-gray-300 mb-8"
            editable={editable}
            {...props}
          >
            Subscribe to receive updates on new collections and exclusive offers
          </EditableText>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <EditableButton
              id="branch_newsletter_cta"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-md font-semibold whitespace-nowrap"
              editable={editable}
              {...props}
            >
              Subscribe
            </EditableButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <EditableText id="branch_footer_logo" as="h3" className="text-lg font-bold mb-4" editable={editable} {...props}>
                Branch
              </EditableText>
              <EditableText id="branch_footer_tagline" className="text-gray-400 text-sm" editable={editable} {...props}>
                Timeless furniture, crafted with care
              </EditableText>
            </div>
            <div>
              <EditableText id="branch_footer_shop_title" as="h5" className="font-semibold mb-4" editable={editable} {...props}>
                Shop
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                {["Living Room", "Dining Room", "Bedroom", "Office"].map((item, i) => (
                  <EditableText key={item} id={`branch_footer_shop_${i}`} className="block hover:text-white cursor-pointer" editable={editable} {...props}>
                    {item}
                  </EditableText>
                ))}
              </div>
            </div>
            <div>
              <EditableText id="branch_footer_company_title" as="h5" className="font-semibold mb-4" editable={editable} {...props}>
                Company
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                {["About Us", "Our Process", "Sustainability", "Contact"].map((item, i) => (
                  <EditableText key={item} id={`branch_footer_company_${i}`} className="block hover:text-white cursor-pointer" editable={editable} {...props}>
                    {item}
                  </EditableText>
                ))}
              </div>
            </div>
            <div>
              <EditableText id="branch_footer_support_title" as="h5" className="font-semibold mb-4" editable={editable} {...props}>
                Support
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                {["Shipping", "Returns", "Warranty", "FAQ"].map((item, i) => (
                  <EditableText key={item} id={`branch_footer_support_${i}`} className="block hover:text-white cursor-pointer" editable={editable} {...props}>
                    {item}
                  </EditableText>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <EditableText id="branch_footer_copyright" editable={editable} {...props}>
              © 2025 Branch Furniture. All rights reserved.
            </EditableText>
          </div>
        </div>
      </footer>
    </main>
  )
}
