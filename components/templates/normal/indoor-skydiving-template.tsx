"use client"
import type { TemplateProps } from "../types"
import { EditableButton, EditableImage, EditableText } from "../shared/editable"

export function IndoorSkydivingTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-white text-gray-900">
      {/* Navigation */}
      <header className="bg-[#003366] text-white sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <EditableImage
              id="sky_logo"
              src="/placeholder.svg?height=40&width=40&query=skydiving%20logo"
              alt="Logo"
              className="w-10 h-10"
              editable={editable}
              {...props}
            />
            <EditableText id="sky_brand" as="h1" className="text-lg font-bold" editable={editable} {...props}>
              iFLY Indoor Skydiving
            </EditableText>
          </div>
          <EditableButton id="sky_nav_cta" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 text-sm font-medium rounded" editable={editable} {...props}>
            BOOK NOW
          </EditableButton>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-400 via-orange-300 to-yellow-200 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
        </div>
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <EditableImage
                id="sky_hero_image"
                src="/placeholder.svg?height=600&width=500&query=indoor%20skydiving%20person"
                alt="Indoor skydiving experience"
                className="w-full h-auto rounded-lg shadow-2xl"
                editable={editable}
                {...props}
              />
            </div>
            <div>
              <EditableText
                id="sky_hero_title"
                as="h2"
                className="text-5xl md:text-7xl font-black mb-6 leading-tight text-[#003366]"
                editable={editable}
                {...props}
              >
                FEEL THE RUSH
              </EditableText>
              <EditableText
                id="sky_hero_subtitle"
                className="text-xl text-gray-800 mb-4"
                editable={editable}
                {...props}
              >
                With Indoor Skydiving from £39.99
              </EditableText>
              <EditableText
                id="sky_hero_price"
                className="text-2xl font-bold text-[#003366] mb-8"
                editable={editable}
                {...props}
              >
                Was £49.99 | Now £39.99
              </EditableText>
              <EditableButton id="sky_hero_cta" className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 text-lg font-bold rounded-full shadow-lg" editable={editable} {...props}>
                Get Our 10% Discount!
              </EditableButton>
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-8 h-12 border-2 border-[#003366] rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-[#003366] rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6">
            <EditableText
              id="sky_testimonial_quote"
              className="text-2xl md:text-3xl text-gray-700 italic mb-6"
              editable={editable}
              {...props}
            >
              "The flying experience at Paramount Skydiving is one of the world's most exhilarating and adrenaline-filled activities!"
            </EditableText>
          </div>
          <div className="flex items-center justify-center gap-4">
            <EditableImage
              id="sky_testimonial_avatar"
              src="/placeholder.svg?height=60&width=60&query=person%20avatar"
              alt="Customer"
              className="w-16 h-16 rounded-full"
              editable={editable}
              {...props}
            />
            <div className="text-left">
              <EditableText
                id="sky_testimonial_name"
                className="font-bold text-gray-900"
                editable={editable}
                {...props}
              >
                Sarah Johnson
              </EditableText>
              <EditableText
                id="sky_testimonial_role"
                className="text-sm text-gray-600"
                editable={editable}
                {...props}
              >
                First-time Flyer
              </EditableText>
            </div>
          </div>
          <div className="flex justify-center gap-1 mt-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-yellow-400 text-2xl">★</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: "🎯", title: "Like The Real Thing", desc: "Experience the thrill of skydiving in a safe, controlled environment" },
              { icon: "👨‍🏫", title: "Expert Instructors", desc: "Our certified instructors guide you through every step" },
              { icon: "🏆", title: "Used by The Pros", desc: "Trusted by professional skydivers for training" },
              { icon: "🌟", title: "Adventure Awaits...", desc: "Perfect for all ages and skill levels" }
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <div className="mb-4">
                  <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                    <EditableImage
                      id={`sky_feature_${i}_icon`}
                      src={`/placeholder.svg?height=80&width=80&query=feature%20${i + 1}`}
                      alt={feature.title}
                      className="w-16 h-16 rounded-full"
                      editable={editable}
                      {...props}
                    />
                  </div>
                </div>
                <EditableText
                  id={`sky_feature_${i}_title`}
                  as="h4"
                  className="text-lg font-bold mb-2 text-[#003366]"
                  editable={editable}
                  {...props}
                >
                  {feature.title}
                </EditableText>
                <EditableText
                  id={`sky_feature_${i}_desc`}
                  className="text-sm text-gray-600"
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

      {/* Video Section */}
      <section className="bg-[#003366] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
            <EditableImage
              id="sky_video_thumbnail"
              src="/placeholder.svg?height=600&width=1000&query=indoor%20skydiving%20tunnel"
              alt="Indoor skydiving video"
              className="w-full h-full object-cover"
              editable={editable}
              {...props}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-[#003366] text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <EditableImage
                id="sky_stats_image"
                src="/placeholder.svg?height=400&width=600&query=happy%20customers"
                alt="Happy customers"
                className="w-full h-auto rounded-lg"
                editable={editable}
                {...props}
              />
            </div>
            <div>
              <EditableText
                id="sky_stats_title"
                as="h3"
                className="text-3xl md:text-4xl font-bold mb-8"
                editable={editable}
                {...props}
              >
                We attract over 100,000 visitors per year from all over the world.
              </EditableText>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: "4.5", label: "Average rating" },
                  { value: "4.7", label: "Customer service" },
                  { value: "4.5", label: "Overall experience" }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <EditableText
                      id={`sky_stat_${i}_value`}
                      className="text-4xl font-bold mb-2"
                      editable={editable}
                      {...props}
                    >
                      {stat.value}
                    </EditableText>
                    <div className="flex justify-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-yellow-400 text-sm">★</span>
                      ))}
                    </div>
                    <EditableText
                      id={`sky_stat_${i}_label`}
                      className="text-sm text-blue-200"
                      editable={editable}
                      {...props}
                    >
                      {stat.label}
                    </EditableText>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <EditableText
              id="sky_packages_eyebrow"
              className="text-sm font-semibold text-red-600 mb-2 uppercase tracking-wide"
              editable={editable}
              {...props}
            >
              Standard Packages
            </EditableText>
            <EditableText
              id="sky_packages_title"
              as="h3"
              className="text-4xl md:text-5xl font-bold text-[#003366]"
              editable={editable}
              {...props}
            >
              Party Packages | Are You 13 To 19? | How Good Is It Really? | FAQ
            </EditableText>
          </div>

          {/* Discount Banner */}
          <div className="bg-gradient-to-r from-blue-900 to-[#003366] text-white py-6 px-8 rounded-lg mb-12 text-center">
            <EditableText
              id="sky_discount_text"
              className="text-2xl font-bold"
              editable={editable}
              {...props}
            >
              Get 15% Off With Discount Code: FDIVE15
            </EditableText>
          </div>

          {/* Package Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                key: "2flight",
                badge: "2 Person",
                title: "2 Flight Experience",
                price: "£33.74",
                originalPrice: "£46.74",
                features: ["2 flights in the tunnel", "All equipment included", "Professional instructor", "Certificate of achievement"]
              },
              {
                key: "4flight",
                badge: "4 Person",
                title: "4 Flight Experience",
                price: "£82.24",
                originalPrice: "£92.24",
                features: ["4 flights in the tunnel", "All equipment included", "Professional instructor", "Certificate of achievement", "Group photo"]
              },
              {
                key: "friend",
                badge: "2 Person",
                title: "Fly With A Friend",
                price: "£76.48",
                originalPrice: "£86.98",
                features: ["2 people flying together", "2 flights each", "All equipment included", "Professional instructor", "Shared experience"]
              }
            ].map((pkg) => (
              <article key={pkg.key} className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200 hover:border-red-500 transition-colors">
                <div className="relative">
                  <EditableImage
                    id={`sky_pkg_${pkg.key}_image`}
                    src={`/placeholder.svg?height=200&width=400&query=${pkg.title}`}
                    alt={pkg.title}
                    className="w-full h-48 object-cover"
                    editable={editable}
                    {...props}
                  />
                  <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <span className="text-lg">⭐</span>
                    <EditableText id={`sky_pkg_${pkg.key}_badge`} editable={editable} {...props}>
                      {pkg.badge}
                    </EditableText>
                  </div>
                </div>
                <div className="p-6">
                  <EditableText
                    id={`sky_pkg_${pkg.key}_title`}
                    as="h4"
                    className="text-xl font-bold mb-4 text-[#003366]"
                    editable={editable}
                    {...props}
                  >
                    {pkg.title}
                  </EditableText>
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <EditableText
                        id={`sky_pkg_${pkg.key}_price`}
                        className="text-3xl font-bold text-red-600"
                        editable={editable}
                        {...props}
                      >
                        {pkg.price}
                      </EditableText>
                      <EditableText
                        id={`sky_pkg_${pkg.key}_original`}
                        className="text-lg text-gray-500 line-through"
                        editable={editable}
                        {...props}
                      >
                        {pkg.originalPrice}
                      </EditableText>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <EditableText id={`sky_pkg_${pkg.key}_feat_${i}`} editable={editable} {...props}>
                          {feature}
                        </EditableText>
                      </li>
                    ))}
                  </ul>
                  <EditableButton
                    id={`sky_pkg_${pkg.key}_cta`}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 font-bold rounded"
                    editable={editable}
                    {...props}
                  >
                    Book Now
                  </EditableButton>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-gray-100">
        <div className="mx-auto max-w-7xl px-6">
          <EditableText
            id="sky_disclaimer"
            className="text-xs text-gray-600 text-center"
            editable={editable}
            {...props}
          >
            *Packages are non-refundable. Prices are subject to change. Minimum age and weight restrictions apply. Please read our terms and conditions before booking.
          </EditableText>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#003366] text-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <EditableText id="sky_footer_brand" as="h4" className="text-xl font-bold mb-4" editable={editable} {...props}>
                iFLY Indoor Skydiving
              </EditableText>
              <EditableText id="sky_footer_tagline" className="text-blue-200 text-sm" editable={editable} {...props}>
                Experience the thrill of flight
              </EditableText>
            </div>
            <div>
              <EditableText id="sky_footer_experiences_title" as="h5" className="font-semibold mb-4" editable={editable} {...props}>
                Experiences
              </EditableText>
              <div className="space-y-2 text-sm text-blue-200">
                {["First Time Flyers", "Group Events", "Birthday Parties", "Corporate Events"].map((item, i) => (
                  <EditableText key={item} id={`sky_footer_exp_${i}`} className="block hover:text-white" editable={editable} {...props}>
                    {item}
                  </EditableText>
                ))}
              </div>
            </div>
            <div>
              <EditableText id="sky_footer_info_title" as="h5" className="font-semibold mb-4" editable={editable} {...props}>
                Information
              </EditableText>
              <div className="space-y-2 text-sm text-blue-200">
                {["About Us", "FAQ", "Safety", "Contact"].map((item, i) => (
                  <EditableText key={item} id={`sky_footer_info_${i}`} className="block hover:text-white" editable={editable} {...props}>
                    {item}
                  </EditableText>
                ))}
              </div>
            </div>
            <div>
              <EditableText id="sky_footer_contact_title" as="h5" className="font-semibold mb-4" editable={editable} {...props}>
                Contact Us
              </EditableText>
              <div className="space-y-2 text-sm text-blue-200">
                <EditableText id="sky_footer_phone" className="block" editable={editable} {...props}>
                  📞 0800 000 0000
                </EditableText>
                <EditableText id="sky_footer_email" className="block" editable={editable} {...props}>
                  ✉️ info@ifly.com
                </EditableText>
                <EditableText id="sky_footer_address" className="block" editable={editable} {...props}>
                  📍 123 Flight Street, London
                </EditableText>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 pt-8 text-center text-sm text-blue-200">
            <EditableText id="sky_footer_copyright" editable={editable} {...props}>
              © 2025 iFLY Indoor Skydiving. All rights reserved. | Privacy Policy | Terms & Conditions
            </EditableText>
          </div>
        </div>
      </footer>
    </main>
  )
}
