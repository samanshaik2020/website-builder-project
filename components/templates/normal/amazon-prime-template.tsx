"use client"
import type { TemplateProps } from "../types"
import { EditableButton, EditableImage, EditableText } from "../shared/editable"

export function AmazonPrimeTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-white text-gray-900">
      {/* Navigation */}
      <header className="bg-gray-900 text-white sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
          <EditableImage
            id="prime_logo"
            src="/placeholder.svg?height=30&width=100&query=amazon%20prime%20logo"
            alt="Amazon Prime"
            className="h-8 w-auto"
            editable={editable}
            {...props}
          />
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <EditableText id="prime_nav_0" className="hover:text-gray-300 transition-colors cursor-pointer" editable={editable} {...props}>
              See more plans
            </EditableText>
          </nav>
          <EditableButton
            id="prime_nav_cta"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-semibold text-sm"
            editable={editable}
            {...props}
          >
            GET STARTED
          </EditableButton>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-700 text-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <EditableText
                id="prime_hero_title"
                as="h1"
                className="text-4xl md:text-5xl font-bold mb-6"
                editable={editable}
                {...props}
              >
                There's something for everyone with Prime!
              </EditableText>
              <EditableText
                id="prime_hero_subtitle"
                className="text-lg mb-8 text-blue-100"
                editable={editable}
                {...props}
              >
                Check out what's included with your Prime membership. Enjoy exclusive deals, free delivery, and more.
              </EditableText>
              <EditableButton
                id="prime_hero_cta"
                className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-md font-bold text-lg shadow-lg"
                editable={editable}
                {...props}
              >
                GET STARTED
              </EditableButton>
              <EditableText
                id="prime_hero_note"
                className="text-sm mt-4 text-blue-100"
                editable={editable}
                {...props}
              >
                Join Prime and start saving today! Cancel anytime. Terms and conditions apply.
              </EditableText>
            </div>
            <div>
              <EditableImage
                id="prime_hero_image"
                src="/placeholder.svg?height=500&width=500&query=person%20with%20packages%20illustration"
                alt="Prime Benefits"
                className="w-full h-auto"
                editable={editable}
                {...props}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { color: "bg-blue-600", icon: "📦", title: "2-day", subtitle: "shipping" },
              { color: "bg-red-600", icon: "🎬", title: "Stream", subtitle: "movies" },
              { color: "bg-pink-600", icon: "🎵", title: "Music", subtitle: "streaming" },
              { color: "bg-orange-500", icon: "📚", title: "Read", subtitle: "books" }
            ].map((benefit, i) => (
              <div key={i} className={`${benefit.color} text-white rounded-lg p-8 text-center hover:opacity-90 transition-opacity cursor-pointer`}>
                <div className="text-5xl mb-3">{benefit.icon}</div>
                <EditableText
                  id={`prime_benefit_${i + 1}_title`}
                  className="text-2xl font-bold"
                  editable={editable}
                  {...props}
                >
                  {benefit.title}
                </EditableText>
                <EditableText
                  id={`prime_benefit_${i + 1}_subtitle`}
                  className="text-lg"
                  editable={editable}
                  {...props}
                >
                  {benefit.subtitle}
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <EditableImage
                id="prime_delivery_image"
                src="/placeholder.svg?height=400&width=500&query=delivery%20person%20packages"
                alt="Fast Delivery"
                className="w-full h-auto"
                editable={editable}
                {...props}
              />
            </div>
            <div>
              <EditableText
                id="prime_delivery_badge"
                className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4"
                editable={editable}
                {...props}
              >
                PRIME DELIVERY
              </EditableText>
              <EditableText
                id="prime_delivery_title"
                as="h2"
                className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
                editable={editable}
                {...props}
              >
                Fast, free delivery on millions of items
              </EditableText>
              <EditableText
                id="prime_delivery_description"
                className="text-lg text-gray-600 mb-6 leading-relaxed"
                editable={editable}
                {...props}
              >
                Save time and money. Millions of items with FREE two-day delivery. No minimum order size. Exclusive access to deals and more.
              </EditableText>
              <EditableButton
                id="prime_delivery_cta"
                className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-2"
                editable={editable}
                {...props}
              >
                Explore Prime Delivery →
              </EditableButton>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <EditableText
            id="prime_info_title"
            as="h2"
            className="text-2xl md:text-3xl font-bold mb-4 text-gray-900"
            editable={editable}
            {...props}
          >
            Here's a little more about Prime that we think you'll love:
          </EditableText>
        </div>
      </section>

      {/* Fast Delivery Feature */}
      <section className="relative bg-gradient-to-r from-red-500 to-pink-500 text-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <EditableText
                id="prime_fast_delivery_title"
                as="h2"
                className="text-4xl md:text-5xl font-bold mb-6"
                editable={editable}
                {...props}
              >
                Fast, free delivery on millions of items
              </EditableText>
              <EditableText
                id="prime_fast_delivery_description"
                className="text-lg mb-6 text-red-50"
                editable={editable}
                {...props}
              >
                Prime members get FREE Two-Day Delivery on millions of eligible items, with no minimum order size.
              </EditableText>
              <EditableButton
                id="prime_fast_delivery_cta"
                className="text-white font-semibold hover:text-red-100 inline-flex items-center gap-2"
                editable={editable}
                {...props}
              >
                Learn more about delivery →
              </EditableButton>
            </div>
            <div>
              <EditableImage
                id="prime_fast_delivery_image"
                src="/placeholder.svg?height=400&width=400&query=delivery%20person%20box"
                alt="Fast Delivery"
                className="w-full h-auto"
                editable={editable}
                {...props}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Amazon Originals Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <EditableImage
                id="prime_originals_image"
                src="/placeholder.svg?height=400&width=400&query=amazon%20originals%20poster"
                alt="Amazon Originals"
                className="w-full h-auto rounded-lg shadow-xl"
                editable={editable}
                {...props}
              />
            </div>
            <div>
              <EditableText
                id="prime_originals_badge"
                className="inline-block bg-gray-900 text-white px-4 py-2 rounded text-sm font-bold mb-4"
                editable={editable}
                {...props}
              >
                INSTANTLY UPLOAD
              </EditableText>
              <EditableText
                id="prime_originals_title"
                as="h2"
                className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
                editable={editable}
                {...props}
              >
                Exclusive access to Amazon Originals
              </EditableText>
              <EditableText
                id="prime_originals_description"
                className="text-lg text-gray-600 mb-6 leading-relaxed"
                editable={editable}
                {...props}
              >
                Enjoy exclusive Amazon Original series and movies you can't watch Amazon anywhere else. From award-winning dramas to laugh-out-loud comedies, there's something for everyone.
              </EditableText>
              <EditableButton
                id="prime_originals_cta"
                className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-2"
                editable={editable}
                {...props}
              >
                Explore Prime Video →
              </EditableButton>
            </div>
          </div>
        </div>
      </section>

      {/* Streaming Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <EditableText
                id="prime_streaming_title"
                as="h2"
                className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
                editable={editable}
                {...props}
              >
                Stream or download hit movies and TV shows
              </EditableText>
              <EditableText
                id="prime_streaming_description"
                className="text-lg text-gray-600 mb-6 leading-relaxed"
                editable={editable}
                {...props}
              >
                As a Prime member, you can watch popular movies and TV shows at no extra cost. Watch on your favorite devices, at home or on the go.
              </EditableText>
              <EditableButton
                id="prime_streaming_cta"
                className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-2"
                editable={editable}
                {...props}
              >
                Learn more about Prime Video →
              </EditableButton>
            </div>
            <div className="order-1 md:order-2">
              <EditableImage
                id="prime_streaming_image"
                src="/placeholder.svg?height=400&width=600&query=streaming%20devices%20tv"
                alt="Streaming"
                className="w-full h-auto rounded-lg"
                editable={editable}
                {...props}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <EditableImage
                id="prime_music_image"
                src="/placeholder.svg?height=400&width=400&query=music%20album%20cover"
                alt="Prime Music"
                className="w-full h-auto rounded-lg shadow-xl"
                editable={editable}
                {...props}
              />
            </div>
            <div>
              <EditableText
                id="prime_music_title"
                as="h2"
                className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
                editable={editable}
                {...props}
              >
                Stay on top of the hottest music
              </EditableText>
              <EditableText
                id="prime_music_description"
                className="text-lg text-gray-600 mb-6 leading-relaxed"
                editable={editable}
                {...props}
              >
                Prime members can listen to 2 million songs ad-free, plus thousands of playlists and stations. Download music and listen offline.
              </EditableText>
              <EditableButton
                id="prime_music_cta"
                className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-2"
                editable={editable}
                {...props}
              >
                Explore Prime Music →
              </EditableButton>
            </div>
          </div>
        </div>
      </section>

      {/* Reading Section */}
      <section className="py-20 bg-blue-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <EditableText
                id="prime_reading_title"
                as="h2"
                className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
                editable={editable}
                {...props}
              >
                Prime members read for no additional cost
              </EditableText>
              <EditableText
                id="prime_reading_description"
                className="text-lg text-gray-600 mb-6 leading-relaxed"
                editable={editable}
                {...props}
              >
                As a Prime member, you can now read as much as you like from over a thousand top Kindle books, magazines, short works, comics, children's books and more.
              </EditableText>
              <EditableButton
                id="prime_reading_cta"
                className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-2"
                editable={editable}
                {...props}
              >
                Explore Prime Reading →
              </EditableButton>
            </div>
            <div className="order-1 md:order-2">
              <EditableImage
                id="prime_reading_image"
                src="/placeholder.svg?height=500&width=600&query=book%20covers%20collection"
                alt="Prime Reading"
                className="w-full h-auto"
                editable={editable}
                {...props}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <EditableImage
            id="prime_final_image"
            src="/placeholder.svg?height=400&width=300&query=person%20with%20packages"
            alt="Join Prime"
            className="w-64 h-auto mx-auto mb-8"
            editable={editable}
            {...props}
          />
          <EditableText
            id="prime_final_title"
            as="h2"
            className="text-3xl md:text-4xl font-bold mb-6 text-gray-900"
            editable={editable}
            {...props}
          >
            There's something for everyone
          </EditableText>
          <EditableButton
            id="prime_final_cta"
            className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 rounded-md font-bold text-lg shadow-lg"
            editable={editable}
            {...props}
          >
            GET STARTED
          </EditableButton>
          <EditableText
            id="prime_final_note"
            className="text-sm text-blue-600 mt-4 hover:underline cursor-pointer"
            editable={editable}
            {...props}
          >
            Already a member? Sign in here. Cancel anytime.
          </EditableText>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <EditableText id="prime_footer_links" className="text-sm text-gray-400" editable={editable} {...props}>
            Back to top
          </EditableText>
          <div className="mt-4 text-xs text-gray-500">
            <EditableText id="prime_footer_copyright" editable={editable} {...props}>
              © 2025 Amazon.com, Inc. or its affiliates
            </EditableText>
          </div>
        </div>
      </footer>
    </main>
  )
}
