"use client"
import type { TemplateProps } from "../types"
import { EditableButton, EditableImage, EditableText } from "../shared/editable"

export function BePatientsTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-gradient-to-b from-purple-50 via-white to-purple-50 text-gray-900">
      {/* Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <EditableImage
            id="bp_logo"
            src=""
            alt="Be Patients"
            className="h-10 w-auto"
            editable={editable}
            {...props}
          />
          <EditableButton
            id="bp_nav_cta"
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full font-medium text-sm"
            editable={editable}
            {...props}
          >
            START NOW
          </EditableButton>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-purple-100 via-purple-50 to-teal-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-1 md:order-2">
              <EditableText
                id="bp_hero_title"
                as="h1"
                className="text-4xl md:text-5xl font-bold mb-4 text-teal-600"
                editable={editable}
                {...props}
              >
                Have you over-etched your pouch?
              </EditableText>
              <EditableText
                id="bp_hero_subtitle"
                className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 italic"
                editable={editable}
                {...props}
              >
                FIX IT in just 48 hours with this tried & proven plan!
              </EditableText>
              <EditableText
                id="bp_hero_description"
                className="text-base text-gray-700 mb-6 leading-relaxed"
                editable={editable}
                {...props}
              >
                Add your meals in as it tells you the PDF Plan! Includes shopping list, recipes, and meal prep tips!
              </EditableText>
              <EditableButton
                id="bp_hero_cta"
                className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg"
                editable={editable}
                {...props}
              >
                START NOW
              </EditableButton>
              <EditableText
                id="bp_hero_note"
                className="text-xs text-gray-500 mt-4"
                editable={editable}
                {...props}
              >
                *Eating slower is a 1-2 month process and takes time. Consistency is key!
              </EditableText>
            </div>
          </div>
        </div>
      </section>

      {/* Reset Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <EditableText
            id="bp_reset_title"
            as="h2"
            className="text-3xl md:text-4xl font-bold mb-6 text-gray-900"
            editable={editable}
            {...props}
          >
            Reset your pouch in just 48 hours
          </EditableText>
          <EditableText
            id="bp_reset_description"
            className="text-base text-gray-700 leading-relaxed"
            editable={editable}
            {...props}
          >
            We know a time & times like these happen! You think you can eat more, and before you know it, you're eating more than you should. This 48-hour plan will help you revert the pouch so that all "crunchy time" should shift back. It's super simple to follow and SUPER easy! It may not feel food choices will be the fix, but trust me on this one!
          </EditableText>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-purple-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <EditableImage
                id="bp_feature_1_image"
                src=""
                alt="Meal Planning"
                className="w-full h-auto rounded-lg mb-6"
                editable={editable}
                {...props}
              />
              <EditableText
                id="bp_feature_1_title"
                as="h3"
                className="text-2xl font-bold mb-4 text-gray-900"
                editable={editable}
                {...props}
              >
                Keep your 48-hr pouch reset After my Pouch Reset, I was able to eat less and my Cravings went away!
              </EditableText>
              <EditableText
                id="bp_feature_1_description"
                className="text-gray-700 leading-relaxed mb-4"
                editable={editable}
                {...props}
              >
                I was able to eat less and my Cravings went away! I'm so glad I found this program. It's helped me get back on track!
              </EditableText>
              <EditableButton
                id="bp_feature_1_cta"
                className="text-teal-600 font-semibold hover:text-teal-700"
                editable={editable}
                {...props}
              >
                → LEARN MORE
              </EditableButton>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <EditableImage
                id="bp_feature_2_image"
                src=""
                alt="Meal Prep"
                className="w-full h-auto rounded-lg mb-6"
                editable={editable}
                {...props}
              />
              <EditableText
                id="bp_feature_2_title"
                as="h3"
                className="text-2xl font-bold mb-4 text-gray-900"
                editable={editable}
                {...props}
              >
                I lift way! Much more and then I was back eating a healthy amount of food. I'm so glad I found this!
              </EditableText>
              <EditableText
                id="bp_feature_2_description"
                className="text-gray-700 leading-relaxed mb-4"
                editable={editable}
                {...props}
              >
                The program helped me reset my eating habits and get back to healthy portions.
              </EditableText>
              <EditableButton
                id="bp_feature_2_cta"
                className="text-teal-600 font-semibold hover:text-teal-700"
                editable={editable}
                {...props}
              >
                → START MY RESET
              </EditableButton>
            </div>
          </div>
        </div>
      </section>

      {/* Suitable For Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <EditableText
            id="bp_suitable_title"
            as="h2"
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900"
            editable={editable}
            {...props}
          >
            Suitable for all bariatric surgeries:
          </EditableText>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Gastric Bypass", icon: "stomach-icon-1" },
              { name: "Gastric Sleeve", icon: "stomach-icon-2" },
              { name: "Lap-Band", icon: "stomach-icon-3" }
            ].map((surgery, i) => (
              <div key={i} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <EditableImage
                    id={`bp_surgery_${i + 1}_icon`}
                    src={``}
                    alt={surgery.name}
                    className="w-20 h-20"
                    editable={editable}
                    {...props}
                  />
                </div>
                <EditableText
                  id={`bp_surgery_${i + 1}_name`}
                  className="text-lg font-semibold text-gray-900"
                  editable={editable}
                  {...props}
                >
                  {surgery.name}
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Works Section */}
      <section className="py-16 bg-purple-50">
        <div className="mx-auto max-w-4xl px-6">
          <EditableText
            id="bp_why_title"
            as="h2"
            className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900"
            editable={editable}
            {...props}
          >
            Why this will work for you too!
          </EditableText>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <EditableText
              id="bp_why_description"
              className="text-gray-700 leading-relaxed mb-6"
              editable={editable}
              {...props}
            >
              This 48-hour plan is designed to help you reset your pouch and get back on track with your weight loss journey. It's simple, effective, and proven to work!
            </EditableText>
            <ul className="space-y-3 text-gray-700">
              {[
                "Easy to follow meal plan",
                "Shopping list included",
                "Proven results in 48 hours",
                "Works for all bariatric surgeries"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-teal-500 font-bold text-xl">✓</span>
                  <EditableText
                    id={`bp_why_item_${i + 1}`}
                    className="flex-1"
                    editable={editable}
                    {...props}
                  >
                    {item}
                  </EditableText>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Magic Inside Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <EditableText
                id="bp_magic_title"
                as="h2"
                className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 uppercase"
                editable={editable}
                {...props}
              >
                THE MAGIC IS INSIDE YOU!
              </EditableText>
              <EditableText
                id="bp_magic_description"
                className="text-gray-700 leading-relaxed mb-6"
                editable={editable}
                {...props}
              >
                It's been a time of eating, all you need to do is RESET. You can do this! Your pouch will be fulfilled now.
              </EditableText>
              <EditableText
                id="bp_magic_details"
                className="text-gray-700 leading-relaxed"
                editable={editable}
                {...props}
              >
                You may feel a bit hungry at first, but that's normal. Your body is adjusting. Stay strong and you will see results! You may also feel a bit tired, but that's also normal. Your body is working hard to reset itself.
              </EditableText>
            </div>
            <div className="flex justify-center">
              <EditableImage
                id="bp_magic_image"
                src=""
                alt="Healthcare Professional"
                className="w-64 h-auto"
                editable={editable}
                {...props}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup Section */}
      <section className="py-12 bg-teal-50">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <EditableText
            id="bp_email_title"
            className="text-lg font-semibold mb-4 text-gray-900"
            editable={editable}
            {...props}
          >
            You can do this! We are here to help.
          </EditableText>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 w-full"
            />
            <EditableButton
              id="bp_email_cta"
              className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-full font-semibold whitespace-nowrap"
              editable={editable}
              {...props}
            >
              JOIN NOW
            </EditableButton>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-gradient-to-br from-teal-50 to-purple-50">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <EditableText
              id="bp_testimonial_quote"
              className="text-2xl md:text-3xl font-serif italic text-gray-900 mb-6"
              editable={editable}
              {...props}
            >
              "For me, the Pouch Reset is a cure coming crusher which is the key for success."
            </EditableText>
            <EditableText
              id="bp_testimonial_author"
              className="text-lg font-semibold text-teal-600"
              editable={editable}
              {...props}
            >
              - MEGAN SUES
            </EditableText>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-100 to-teal-100">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <EditableText
            id="bp_final_title"
            as="h2"
            className="text-4xl md:text-5xl font-bold mb-4 text-teal-600"
            editable={editable}
            {...props}
          >
            Get the 48hr Pouch Reset Plan for FREE!
          </EditableText>
          <EditableText
            id="bp_final_subtitle"
            className="text-xl mb-8 text-gray-900"
            editable={editable}
            {...props}
          >
            PLUS: Bonus video & tips
          </EditableText>
          <EditableButton
            id="bp_final_cta"
            className="bg-teal-500 hover:bg-teal-600 text-white px-12 py-4 rounded-full font-bold text-xl shadow-2xl"
            editable={editable}
            {...props}
          >
            GET IT FOR FREE!
          </EditableButton>
          <EditableText
            id="bp_final_note"
            className="text-sm text-gray-600 mt-6"
            editable={editable}
            {...props}
          >
            The Pouch Reset shows you my 48hr PDF method that has helped thousands of bariatric patients worldwide!
          </EditableText>
          <div className="mt-8">
            <EditableImage
              id="bp_final_preview"
              src=""
              alt="Plan Preview"
              className="mx-auto h-96 w-auto"
              editable={editable}
              {...props}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <EditableImage
            id="bp_footer_logo"
            src=""
            alt="Be Patients"
            className="h-10 w-auto mx-auto mb-4"
            editable={editable}
            {...props}
          />
          <EditableText id="bp_footer_copyright" className="text-sm text-gray-400" editable={editable} {...props}>
            © 2025 Be Patients LLC. All Rights Reserved.
          </EditableText>
        </div>
      </footer>
    </main>
  )
}
