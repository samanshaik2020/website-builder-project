"use client"
import type { TemplateProps } from "../types"
import { EditableButton, EditableImage, EditableText } from "../shared/editable"

export function BlowLtdTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-white text-gray-900">
      {/* Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <EditableText id="blow_logo" as="h1" className="text-xl font-bold" editable={editable} {...props}>
            Blow LTD
          </EditableText>
          <EditableButton
            id="blow_nav_cta"
            className="bg-coral-500 hover:bg-coral-600 text-white px-6 py-2 rounded-md font-medium text-sm"
            editable={editable}
            {...props}
          >
            BOOK EYELASH EXTENSIONS
          </EditableButton>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-50 to-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <EditableText
                id="blow_hero_title"
                as="h1"
                className="text-4xl md:text-5xl font-serif italic mb-4 text-gray-900"
                editable={editable}
                {...props}
              >
                Eyelash Extensions At Home
              </EditableText>
              <EditableText
                id="blow_hero_subtitle"
                className="text-base text-gray-700 mb-6 leading-relaxed"
                editable={editable}
                {...props}
              >
                Natural, volume or infills. W/ eyelash extensions services starting at £45 with promo code BOOK10.
              </EditableText>
              <EditableButton
                id="blow_hero_cta"
                className="bg-coral-500 hover:bg-coral-600 text-white px-8 py-3 rounded-md font-medium inline-block"
                editable={editable}
                {...props}
              >
                BOOK AN APPOINTMENT
              </EditableButton>
            </div>
            <div className="relative">
              <EditableImage
                id="blow_hero_image"
                src="https://placehold.co/600x400/EEE/999?text=Image"
                alt="Eyelash Extensions"
                className="w-full h-auto rounded-lg"
                editable={editable}
                {...props}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="flex justify-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <EditableText
                  id={`blow_review_${i}_name`}
                  className="font-semibold text-gray-900 mb-2"
                  editable={editable}
                  {...props}
                >
                  {i === 1 ? "Angie G." : i === 2 ? "Lucy H." : "Monique"}
                </EditableText>
                <EditableText
                  id={`blow_review_${i}_text`}
                  className="text-sm text-gray-600 leading-relaxed"
                  editable={editable}
                  {...props}
                >
                  {i === 1 
                    ? "Blow was fantastic extremely professional and very talented lash technician. I would highly recommend!"
                    : i === 2
                    ? "This was my first experience getting my lash extensions done and I couldn't be happier! The service was amazing."
                    : "Absolutely so lovely and just perfect and my lashes are so beautiful. I liked the booking again!!"}
                </EditableText>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <EditableText
              id="blow_reviews_summary"
              className="text-sm text-gray-600"
              editable={editable}
              {...props}
            >
              Rated 4.8 out of 5 based on 1,451 verified reviews
            </EditableText>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <EditableImage
                  id="blow_feature_1_icon"
                  src="https://placehold.co/600x400/EEE/999?text=Image"
                  alt="Clock"
                  className="w-full h-full"
                  editable={editable}
                  {...props}
                />
              </div>
              <EditableText
                id="blow_feature_1_title"
                className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide"
                editable={editable}
                {...props}
              >
                FROM 7AM UNTIL LATE, 7 DAYS A WEEK
              </EditableText>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <EditableImage
                  id="blow_feature_2_icon"
                  src="https://placehold.co/600x400/EEE/999?text=Image"
                  alt="Luxury"
                  className="w-full h-full"
                  editable={editable}
                  {...props}
                />
              </div>
              <EditableText
                id="blow_feature_2_title"
                className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide"
                editable={editable}
                {...props}
              >
                5* LUXURY PRODUCTS USED IN SERVICE
              </EditableText>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <EditableImage
                  id="blow_feature_3_icon"
                  src="https://placehold.co/600x400/EEE/999?text=Image"
                  alt="Comfort"
                  className="w-full h-full"
                  editable={editable}
                  {...props}
                />
              </div>
              <EditableText
                id="blow_feature_3_title"
                className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide"
                editable={editable}
                {...props}>
                COMFORT AT HOME
              </EditableText>
            </div>
          </div>
        </div>
      </section>

      {/* Home Eyelash Extensions Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <EditableText
              id="blow_home_extensions_title"
              as="h2"
              className="text-3xl md:text-4xl font-serif italic mb-6 text-gray-900"
              editable={editable}
              {...props}
            >
              HOME EYELASH EXTENSIONS
            </EditableText>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <EditableImage
                id="blow_home_extensions_image"
                src="https://placehold.co/600x400/EEE/999?text=Image"
                alt="Eyelash Extensions"
                className="w-full h-auto rounded-lg"
                editable={editable}
                {...props}
              />
            </div>
            <div>
              <EditableText
                id="blow_home_extensions_desc"
                className="text-gray-700 leading-relaxed mb-6"
                editable={editable}
                {...props}
              >
                We offer eyelash extensions for a natural, volume, infills or hybrid look in between appointments. Our lash technicians are fully qualified and insured to deliver the best results in the morning!
              </EditableText>
              <EditableText
                id="blow_home_extensions_details"
                className="text-gray-700 leading-relaxed mb-6"
                editable={editable}
                {...props}
              >
                The eyelash extensions will be semi-permanent, soft and durable in best through your daily activities. Our lash technicians are fully qualified, which lifts volumes and lengths your own lashes.
              </EditableText>
              <EditableText
                id="blow_home_extensions_pricing"
                className="text-gray-700 mb-6"
                editable={editable}
                {...props}
              >
                Prices starting at £45 with promo code BOOK10.
              </EditableText>
              <EditableButton
                id="blow_home_extensions_cta"
                className="bg-coral-500 hover:bg-coral-600 text-white px-8 py-3 rounded-md font-medium"
                editable={editable}
                {...props}
              >
                BOOK AN APPOINTMENT
              </EditableButton>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <EditableText
            id="blow_how_it_works_title"
            as="h2"
            className="text-3xl md:text-4xl font-serif italic text-center mb-12 text-gray-900"
            editable={editable}
            {...props}
          >
            How It Works
          </EditableText>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "SELECT A AT HOME EYELASH EXTENSION SERVICE" },
              { step: "2", title: "CHOOSE TIME & DATE" },
              { step: "3", title: "SIT BACK & RELAX WE'LL COME TO YOU" }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                  <span className="text-2xl font-serif">{item.step}</span>
                </div>
                <EditableText
                  id={`blow_step_${i + 1}_title`}
                  className="text-sm font-semibold text-gray-700 uppercase tracking-wide"
                  editable={editable}
                  {...props}
                >
                  {item.title}
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <EditableText
            id="blow_services_title"
            as="h2"
            className="text-3xl md:text-4xl font-serif italic text-center mb-12 text-gray-900"
            editable={editable}
            {...props}
          >
            Our Services
          </EditableText>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "NATURAL", label: "BOOK LASH EXTENSIONS NATURAL" },
              { name: "VOLUME", label: "BOOK LASH EXTENSIONS VOLUME" },
              { name: "INFILLS", label: "BOOK LASH INFILLS" },
              { name: "HYBRID", label: "BOOK VOL. HYBRID" }
            ].map((service, i) => (
              <div key={i} className="text-center">
                <EditableImage
                  id={`blow_service_${i + 1}_image`}
                  src={``}
                  alt={service.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                  editable={editable}
                  {...props}
                />
                <EditableButton
                  id={`blow_service_${i + 1}_cta`}
                  className="bg-coral-500 hover:bg-coral-600 text-white px-4 py-2 rounded-md font-medium text-sm w-full"
                  editable={editable}
                  {...props}
                >
                  {service.label}
                </EditableButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <EditableImage
                id="blow_app_mockup"
                src="https://placehold.co/600x400/EEE/999?text=Image"
                alt="Blow LTD App"
                className="h-96 w-auto"
                editable={editable}
                {...props}
              />
            </div>
            <div className="text-center md:text-left">
              <EditableText
                id="blow_app_title"
                as="h2"
                className="text-3xl md:text-4xl font-serif italic mb-6 text-gray-900"
                editable={editable}
                {...props}
              >
                Download the App to book an appointment now
              </EditableText>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <EditableButton
                  id="blow_app_store"
                  className="inline-block"
                  editable={editable}
                  {...props}
                >
                  <img src="https://placehold.co/150x50/000000/FFFFFF?text=App+Store" alt="Download on App Store" className="h-12" />
                </EditableButton>
                <EditableButton
                  id="blow_google_play"
                  className="inline-block"
                  editable={editable}
                  {...props}
                >
                  <img src="https://placehold.co/150x50/000000/FFFFFF?text=Google+Play" alt="Get it on Google Play" className="h-12" />
                </EditableButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <EditableText id="blow_footer_logo" as="h3" className="text-lg font-bold mb-4" editable={editable} {...props}>
                Blow LTD
              </EditableText>
            </div>
            <div>
              <EditableText id="blow_footer_contact_title" as="h5" className="font-semibold mb-4" editable={editable} {...props}>
                Contact Us
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                <EditableText id="blow_footer_contact" className="block" editable={editable} {...props}>
                  Email: hello@blowltd.com
                </EditableText>
              </div>
            </div>
            <div>
              <EditableText id="blow_footer_faq_title" as="h5" className="font-semibold mb-4" editable={editable} {...props}>
                FAQ
              </EditableText>
              <div className="space-y-2 text-sm text-gray-400">
                <EditableText id="blow_footer_faq" className="block hover:text-white cursor-pointer" editable={editable} {...props}>
                  Frequently Asked Questions
                </EditableText>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 mb-8">
            {["Facebook", "Twitter", "Pinterest", "Instagram", "YouTube", "TikTok"].map((social, i) => (
              <EditableButton
                key={social}
                id={`blow_social_${i}`}
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center"
                editable={editable}
                {...props}
              >
                {social[0]}
              </EditableButton>
            ))}
          </div>
          <div className="text-center text-sm text-gray-400">
            <EditableText id="blow_footer_copyright" editable={editable} {...props}>
              © 2025 Blow LTD. All rights reserved.
            </EditableText>
          </div>
        </div>
      </footer>
    </main>
  )
}
