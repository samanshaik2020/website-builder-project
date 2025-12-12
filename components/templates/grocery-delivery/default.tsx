'use client'

import React from 'react'
import { EditableButton } from '@/components/editor/editable-button'
import { EditableImage } from '@/components/editor/editable-image'
import { BaseTemplateProps } from '@/types/template'

export default function GroceryDeliveryTemplate({
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
      {/* Hero Section */}
      <section className="relative bg-gray-300 min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <EditableImage
            eid="hero_background"
            defaultSrc={getImage('hero_background', 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1600&h=600&fit=crop')}
            alt="Hero background"
            className="w-full h-full object-cover"
            editable={editable}
            onChange={onContentChange}
          />
          <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-xl">
            <h1
              data-eid="hero_title"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight whitespace-pre-wrap break-words"
            >
              {getText('hero_title', 'Get $20 off Harmless Harvest coconut water.')}
            </h1>

            <EditableButton
              eid="hero_cta"
              defaultText={getButton('hero_cta', 'Claim Your Coconut Water', '#').text}
              defaultUrl={getButton('hero_cta', 'Claim Your Coconut Water', '#').url}
              className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              editable={editable}
              onChange={onContentChange}
            />

            <p
              data-eid="hero_subtitle"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-white/90 text-sm mt-4 whitespace-pre-wrap break-words"
            >
              {getText('hero_subtitle', 'One valid $20 new Good Eggs customers only.')}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white">
                <div className="mb-6 aspect-square overflow-hidden rounded-lg">
                  <EditableImage
                    eid={`feature_${i}_image`}
                    defaultSrc={getImage(`feature_${i}_image`, `https://images.unsplash.com/photo-${1500000000000 + i * 100000000}?w=400&h=400&fit=crop`)}
                    alt={`Feature ${i}`}
                    className="w-full h-full object-cover"
                    editable={editable}
                    onChange={onContentChange}
                  />
                </div>
                <h3
                  data-eid={`feature_${i}_title`}
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-xl font-bold text-gray-900 mb-3 whitespace-pre-wrap break-words"
                >
                  {getText(`feature_${i}_title`, 'Everything you need, delivered to your door.')}
                </h3>
                <p
                  data-eid={`feature_${i}_description`}
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap break-words"
                >
                  {getText(`feature_${i}_description`, 'Good Eggs carries everything you can find at the grocery store, and more. We\'ll deliver to your door the same day you order — spend $60 and delivery is free. No subscription required.')}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <EditableButton
              eid="features_cta"
              defaultText={getButton('features_cta', 'Get Your Free Coconut Water', '#').text}
              defaultUrl={getButton('features_cta', 'Get Your Free Coconut Water', '#').url}
              className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-colors"
              editable={editable}
              onChange={onContentChange}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            data-eid="testimonials_title"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-center text-sm font-semibold tracking-widest text-gray-900 mb-16 uppercase whitespace-pre-wrap break-words"
          >
            {getText('testimonials_title', 'WHAT CUSTOMERS ARE SAYING')}
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 rounded-lg">
                <p
                  data-eid={`testimonial_${i}_quote`}
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-gray-700 italic text-base leading-relaxed mb-6 whitespace-pre-wrap break-words"
                >
                  {getText(`testimonial_${i}_quote`, 'Good Eggs has been an absolute life changer. I\'m a full time working mom of two kids and have to outsource many tasks but this is easily my favorite grocery delivery and meal kit service.')}
                </p>
                <div
                  data-eid={`testimonial_${i}_name`}
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="font-bold text-gray-900 text-sm uppercase tracking-wide"
                >
                  {getText(`testimonial_${i}_name`, 'JULIA T.')}
                </div>
                <div
                  data-eid={`testimonial_${i}_location`}
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-gray-500 text-sm"
                >
                  {getText(`testimonial_${i}_location`, 'San Francisco')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4
                data-eid="footer_col_1_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="font-semibold mb-4 text-sm uppercase tracking-wide"
              >
                {getText('footer_col_1_title', 'Shop')}
              </h4>
              <ul className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <li key={i}>
                    <span
                      data-eid={`footer_col_1_link_${i}`}
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-gray-300 text-sm hover:text-white cursor-pointer"
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
                className="font-semibold mb-4 text-sm uppercase tracking-wide"
              >
                {getText('footer_col_2_title', 'About')}
              </h4>
              <ul className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <li key={i}>
                    <span
                      data-eid={`footer_col_2_link_${i}`}
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-gray-300 text-sm hover:text-white cursor-pointer"
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
                className="font-semibold mb-4 text-sm uppercase tracking-wide"
              >
                {getText('footer_col_3_title', 'Support')}
              </h4>
              <ul className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <li key={i}>
                    <span
                      data-eid={`footer_col_3_link_${i}`}
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-gray-300 text-sm hover:text-white cursor-pointer"
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
                className="font-semibold mb-4 text-sm uppercase tracking-wide"
              >
                {getText('footer_col_4_title', 'Connect')}
              </h4>
              <div className="flex justify-center gap-4">
                <EditableButton
                  eid="social_facebook"
                  defaultText={getButton('social_facebook', 'f', 'https://facebook.com').text}
                  defaultUrl={getButton('social_facebook', 'f', 'https://facebook.com').url}
                  className="w-10 h-10 bg-gray-700 text-white rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                  editable={editable}
                  onChange={onContentChange}
                />
                <EditableButton
                  eid="social_twitter"
                  defaultText={getButton('social_twitter', 't', 'https://twitter.com').text}
                  defaultUrl={getButton('social_twitter', 't', 'https://twitter.com').url}
                  className="w-10 h-10 bg-gray-700 text-white rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                  editable={editable}
                  onChange={onContentChange}
                />
                <EditableButton
                  eid="social_instagram"
                  defaultText={getButton('social_instagram', 'i', 'https://instagram.com').text}
                  defaultUrl={getButton('social_instagram', 'i', 'https://instagram.com').url}
                  className="w-10 h-10 bg-gray-700 text-white rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                  editable={editable}
                  onChange={onContentChange}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <p
              data-eid="footer_copyright"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-gray-400 text-sm"
            >
              {getText('footer_copyright', '© 2024 Good Eggs. All rights reserved.')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
