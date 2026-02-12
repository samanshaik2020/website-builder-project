'use client'

import { EditableButton } from '@/components/editor/editable-button'
import { EditableImage } from '@/components/editor/editable-image'
import { BaseTemplateProps } from '@/types/template'

export default function CatFoodTemplate({
  editable = false,
  data = {},
  onContentChange = () => { },
}: BaseTemplateProps) {
  const getText = (eid: string, defaultText: string) => {
    return data[eid]?.text || defaultText
  }

  const getButton = (eid: string, defaultText: string, defaultUrl: string) => {
    return data[eid]?.button || { text: defaultText, url: defaultUrl }
  }

  const getImage = (eid: string, defaultSrc: string) => {
    return data[eid]?.image || defaultSrc
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-5 py-5">
          <div className="flex justify-between items-center">
            <div
              data-eid="logo"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-2xl font-bold tracking-[0.2em] whitespace-pre-wrap break-words"
            >
              {getText('logo', 'SMALLS')}
            </div>
            <EditableButton
              eid="header_cta"
              defaultText={getButton('header_cta', 'Get Started', '#').text}
              defaultUrl={getButton('header_cta', 'Get Started', '#').url}
              className="bg-black text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
              editable={editable}
              onChange={onContentChange}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-100 py-20 text-center">
        <div className="max-w-7xl mx-auto px-5">
          <h1
            data-eid="hero_title"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-5xl md:text-6xl font-bold mb-5 tracking-wide whitespace-pre-wrap break-words"
          >
            {getText('hero_title', 'FOR THE CURIOUS CAT.')}
          </h1>
          <p
            data-eid="hero_subtitle"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto whitespace-pre-wrap break-words"
          >
            {getText('hero_subtitle', 'Healthy, human-grade food custom-made for your cat and delivered right to your door.')}
          </p>
          <EditableButton
            eid="hero_cta"
            defaultText={getButton('hero_cta', 'Get Started', '#').text}
            defaultUrl={getButton('hero_cta', 'Get Started', '#').url}
            className="bg-black text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
            editable={editable}
            onChange={onContentChange}
          />
          <div className="mt-10 max-w-4xl mx-auto">
            <EditableImage
              eid="hero_image"
              defaultSrc={getImage('hero_image', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=400&fit=crop')}
              alt="Cat with food"
              className="w-full h-auto rounded-lg"
              editable={editable}
              onChange={onContentChange}
            />
          </div>
        </div>
      </section>

      {/* Press Section */}
      <section className="bg-orange-400 py-8">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex justify-around items-center flex-wrap gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                data-eid={`press_logo_${i}`}
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-lg font-semibold text-black whitespace-pre-wrap break-words"
              >
                {getText(`press_logo_${i}`, 'PRESS LOGO')}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <h2
            data-eid="how_it_works_title"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-4xl font-bold text-center mb-16 whitespace-pre-wrap break-words"
          >
            {getText('how_it_works_title', 'HOW IT WORKS')}
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="text-6xl mb-5">
                  <span
                    data-eid={`step_${i}_icon`}
                    contentEditable={editable}
                    suppressContentEditableWarning
                  >
                    {getText(`step_${i}_icon`, '🎯')}
                  </span>
                </div>
                <h3
                  data-eid={`step_${i}_title`}
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-xl font-semibold mb-4 whitespace-pre-wrap break-words"
                >
                  {getText(`step_${i}_title`, 'Step Title')}
                </h3>
                <p
                  data-eid={`step_${i}_description`}
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap break-words"
                >
                  {getText(`step_${i}_description`, 'Step description goes here.')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Health Section */}
      <section className="py-20 bg-yellow-300">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <EditableImage
                eid="health_image"
                defaultSrc={getImage('health_image', 'https://images.unsplash.com/photo-1573865526739-10c1dd7aa5a0?w=500&h=500&fit=crop')}
                alt="Person with cat"
                className="w-full h-auto rounded-lg"
                editable={editable}
                onChange={onContentChange}
              />
            </div>
            <div>
              <h2
                data-eid="health_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-5xl font-bold mb-5 whitespace-pre-wrap break-words"
              >
                {getText('health_title', 'Cat health starts with you.')}
              </h2>
              <p
                data-eid="health_description"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-base text-gray-800 mb-8 leading-relaxed whitespace-pre-wrap break-words"
              >
                {getText('health_description', 'Cats need a diet that helps you feel balanced about the food you eat. At Smalls we believe that starts with gentle, human-grade ingredients cooked with care.')}
              </p>
              <EditableButton
                eid="health_cta"
                defaultText={getButton('health_cta', 'See the proof', '#').text}
                defaultUrl={getButton('health_cta', 'See the proof', '#').url}
                className="bg-black text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
                editable={editable}
                onChange={onContentChange}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fresh Food Section */}
      <section className="py-20 relative" style={{ background: 'linear-gradient(to bottom, #87ceeb 50%, #f9a26c 50%)' }}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2
                data-eid="fresh_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-6xl md:text-7xl font-black uppercase mb-8 tracking-wider whitespace-pre-wrap break-words"
              >
                {getText('fresh_title', 'FRESH KILLS')}
              </h2>
              <div className="bg-white p-8 rounded-lg">
                <p
                  data-eid="fresh_description"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-sm leading-relaxed whitespace-pre-wrap break-words"
                >
                  {getText('fresh_description', 'Our beloved entry kit made fresh with real meat for cats who love wet food. Every recipe is gently cooked in small batches to lock in freshness.')}
                </p>
              </div>
            </div>
            <div className="text-center">
              <EditableImage
                eid="fresh_image"
                defaultSrc={getImage('fresh_image', 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=400&h=400&fit=crop')}
                alt="Cat with fresh food"
                className="max-w-full h-auto"
                editable={editable}
                onChange={onContentChange}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dry Food Section */}
      <section className="py-20 bg-orange-400">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="text-center order-2 md:order-1">
              <EditableImage
                eid="dry_image"
                defaultSrc={getImage('dry_image', 'https://images.unsplash.com/photo-1529257414772-1960b7bea4eb?w=400&h=400&fit=crop')}
                alt="Cat with dry food"
                className="max-w-full h-auto"
                editable={editable}
                onChange={onContentChange}
              />
            </div>
            <div className="order-1 md:order-2">
              <h2
                data-eid="dry_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-6xl md:text-7xl font-black uppercase mb-8 tracking-wider whitespace-pre-wrap break-words"
              >
                {getText('dry_title', 'DRY KILLS')}
              </h2>
              <div className="bg-white p-8 rounded-lg">
                <p
                  data-eid="dry_description"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-sm leading-relaxed whitespace-pre-wrap break-words"
                >
                  {getText('dry_description', 'High-protein, low-carb kibble for cats who prefer crunchy food. Made with real meat and no fillers.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <h2
            data-eid="benefits_title"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-4xl font-bold text-center mb-16 whitespace-pre-wrap break-words"
          >
            {getText('benefits_title', 'BENEFITS')}
          </h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-5 bg-gray-50 p-8 rounded-lg">
                  <div className="text-4xl flex-shrink-0">
                    <span
                      data-eid={`benefit_${i}_icon`}
                      contentEditable={editable}
                      suppressContentEditableWarning
                    >
                      {getText(`benefit_${i}_icon`, '🦷')}
                    </span>
                  </div>
                  <div>
                    <h3
                      data-eid={`benefit_${i}_title`}
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-xl font-semibold mb-3 whitespace-pre-wrap break-words"
                    >
                      {getText(`benefit_${i}_title`, 'Benefit Title')}
                    </h3>
                    <p
                      data-eid={`benefit_${i}_description`}
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap break-words"
                    >
                      {getText(`benefit_${i}_description`, 'Benefit description goes here.')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <EditableImage
                eid="benefit_image"
                defaultSrc={getImage('benefit_image', 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&h=600&fit=crop')}
                alt="Cat benefit"
                className="max-w-full h-auto rounded-lg"
                editable={editable}
                onChange={onContentChange}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-5">
          <h2
            data-eid="testimonials_title"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-4xl font-bold text-center mb-16"
          >
            {getText('testimonials_title', 'CATS LOVE SMALLS')}
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto mb-5 overflow-hidden">
                  <EditableImage
                    eid={`testimonial_${i}_avatar`}
                    defaultSrc={getImage(`testimonial_${i}_avatar`, 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=80&h=80&fit=crop')}
                    alt="Cat"
                    className="w-full h-full object-cover"
                    editable={editable}
                    onChange={onContentChange}
                  />
                </div>
                <p
                  data-eid={`testimonial_${i}_quote`}
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-sm text-gray-600 leading-relaxed mb-3 whitespace-pre-wrap break-words"
                >
                  {getText(`testimonial_${i}_quote`, '"My cat absolutely loves Smalls! The quality of the ingredients really shows."')}
                </p>
                <div
                  data-eid={`testimonial_${i}_name`}
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="font-semibold text-gray-800 text-sm whitespace-pre-wrap break-words"
                >
                  {getText(`testimonial_${i}_name`, '- Maya K.')}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <EditableButton
              eid="testimonials_cta"
              defaultText={getButton('testimonials_cta', 'See Reviews', '#').text}
              defaultUrl={getButton('testimonials_cta', 'See Reviews', '#').url}
              className="bg-black text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
              editable={editable}
              onChange={onContentChange}
            />
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="w-20 h-20 bg-yellow-300 rounded-full flex items-center justify-center text-2xl font-bold">
              ✓
            </div>
            <div className="text-left max-w-lg">
              <h3
                data-eid="guarantee_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-2xl font-semibold mb-3 whitespace-pre-wrap break-words"
              >
                {getText('guarantee_title', 'MONEY BACK GUARANTEE')}
              </h3>
              <p
                data-eid="guarantee_description"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-gray-600 text-sm whitespace-pre-wrap break-words"
              >
                {getText('guarantee_description', "We know your cat will love Smalls! If not, we'll make it right with our 100% satisfaction guarantee.")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <h4
                data-eid="footer_col_1_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-base font-semibold mb-4 whitespace-pre-wrap break-words"
              >
                {getText('footer_col_1_title', 'Company')}
              </h4>
              <ul className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <li key={i}>
                    <span
                      data-eid={`footer_col_1_link_${i}`}
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-gray-600 text-sm hover:text-black cursor-pointer"
                    >
                      {getText(`footer_col_1_link_${i}`, 'Link')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4
                data-eid="footer_col_2_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-base font-semibold mb-4 whitespace-pre-wrap break-words"
              >
                {getText('footer_col_2_title', 'Support')}
              </h4>
              <ul className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <li key={i}>
                    <span
                      data-eid={`footer_col_2_link_${i}`}
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-gray-600 text-sm hover:text-black cursor-pointer"
                    >
                      {getText(`footer_col_2_link_${i}`, 'Link')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4
                data-eid="footer_col_3_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-base font-semibold mb-4 whitespace-pre-wrap break-words"
              >
                {getText('footer_col_3_title', 'Legal')}
              </h4>
              <ul className="space-y-3">
                {[1, 2].map((i) => (
                  <li key={i}>
                    <span
                      data-eid={`footer_col_3_link_${i}`}
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-gray-600 text-sm hover:text-black cursor-pointer"
                    >
                      {getText(`footer_col_3_link_${i}`, 'Link')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4
                data-eid="footer_col_4_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-base font-semibold mb-4"
              >
                {getText('footer_col_4_title', 'Follow Us')}
              </h4>
              <div className="flex gap-4">
                <EditableButton
                  eid="social_facebook"
                  defaultText={getButton('social_facebook', 'f', 'https://facebook.com').text}
                  defaultUrl={getButton('social_facebook', 'f', 'https://facebook.com').url}
                  className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm hover:bg-gray-800 transition-colors"
                  editable={editable}
                  onChange={onContentChange}
                />
                <EditableButton
                  eid="social_twitter"
                  defaultText={getButton('social_twitter', 't', 'https://twitter.com').text}
                  defaultUrl={getButton('social_twitter', 't', 'https://twitter.com').url}
                  className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm hover:bg-gray-800 transition-colors"
                  editable={editable}
                  onChange={onContentChange}
                />
                <EditableButton
                  eid="social_instagram"
                  defaultText={getButton('social_instagram', 'i', 'https://instagram.com').text}
                  defaultUrl={getButton('social_instagram', 'i', 'https://instagram.com').url}
                  className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm hover:bg-gray-800 transition-colors"
                  editable={editable}
                  onChange={onContentChange}
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
