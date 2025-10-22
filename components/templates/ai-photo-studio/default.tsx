'use client'

import React from 'react'
import { Camera } from 'lucide-react'
import { EditableButton } from '@/components/editor/editable-button'
import { EditableImage } from '@/components/editor/editable-image'
import { BaseTemplateProps } from '@/types/template'

interface AIPhotoStudioTemplateProps extends BaseTemplateProps {}

export default function AIPhotoStudioTemplate({
  editable = false,
  data = {},
  onContentChange = () => {},
}: AIPhotoStudioTemplateProps) {
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
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="w-6 h-6 text-orange-500" />
              <span
                data-eid="nav_logo"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-xl font-semibold text-gray-900"
              >
                {getText('nav_logo', 'Deep agency')}
              </span>
            </div>
            <div className="flex items-center gap-8">
              <span
                data-eid="nav_link_1"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                {getText('nav_link_1', 'Pricing')}
              </span>
              <EditableButton
                eid="nav_cta"
                defaultText={getButton('nav_cta', 'Get credits', '#').text}
                defaultUrl={getButton('nav_cta', 'Get credits', '#').url}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                editable={editable}
                onChange={onContentChange}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4">
                <span
                  data-eid="hero_badge"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-xs font-semibold text-orange-500 tracking-wider"
                >
                  {getText('hero_badge', 'TRUSTED BY 1M+ USERS')}
                </span>
              </div>
              <h1 className="text-6xl font-bold mb-6 leading-tight">
                <span
                  data-eid="hero_title_1"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-gray-900"
                >
                  {getText('hero_title_1', 'AI Photo Studio')}
                </span>
                <span className="text-orange-500"> & </span>
                <br />
                <span
                  data-eid="hero_title_2"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-gray-900"
                >
                  {getText('hero_title_2', 'Modelling Agency')}
                </span>
              </h1>
              <p
                data-eid="hero_description"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-lg text-gray-600 mb-8 leading-relaxed"
              >
                {getText(
                  'hero_description',
                  'Transform your photos with AI technology. Create professional headshots, generate AI models, and produce stunning visuals without a physical photo studio. Perfect for your digital goals and say goodbye to high-priced photo shoots.'
                )}
              </p>
              <div className="flex items-center gap-4 mb-6">
                <span
                  data-eid="hero_rating_text"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-sm text-gray-600"
                >
                  {getText('hero_rating_text', 'Loved by 1M+ creators')}
                </span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-orange-500">★</span>
                  ))}
                </div>
                <span
                  data-eid="hero_rating_score"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-sm font-semibold text-gray-900"
                >
                  {getText('hero_rating_score', '4.9/5')}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <EditableButton
                  eid="hero_cta_primary"
                  defaultText={getButton('hero_cta_primary', 'Get started', '#').text}
                  defaultUrl={getButton('hero_cta_primary', 'Get started', '#').url}
                  className="px-8 py-4 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30"
                  editable={editable}
                  onChange={onContentChange}
                />
                <EditableButton
                  eid="hero_cta_secondary"
                  defaultText={getButton('hero_cta_secondary', 'See pricing', '#').text}
                  defaultUrl={getButton('hero_cta_secondary', 'See pricing', '#').url}
                  className="px-8 py-4 text-gray-700 hover:text-gray-900 font-semibold transition-colors"
                  editable={editable}
                  onChange={onContentChange}
                />
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <EditableImage
                  eid="hero_image"
                  defaultSrc={getImage('hero_image', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=1000&fit=crop')}
                  alt="AI Photo Studio Models"
                  className="w-full h-[600px] object-cover"
                  editable={editable}
                  onChange={onContentChange}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              data-eid="features_title"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              {getText('features_title', 'Create a virtual twin of yourself or use AI-models')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Virtual Twin */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="mb-6">
                <h3
                  data-eid="feature_1_title"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-2xl font-bold text-gray-900 mb-4"
                >
                  {getText('feature_1_title', 'Virtual Twin')}
                </h3>
                <p
                  data-eid="feature_1_description"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-gray-600 leading-relaxed"
                >
                  {getText(
                    'feature_1_description',
                    'Upload 15-20 photos of yourself and create your AI twin. You can use this version to create great new photos of yourself.'
                  )}
                </p>
              </div>
              <div className="relative rounded-xl overflow-hidden">
                <EditableImage
                  eid="feature_1_image"
                  defaultSrc={getImage('feature_1_image', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop')}
                  alt="Virtual Twin Feature"
                  className="w-full h-64 object-cover"
                  editable={editable}
                  onChange={onContentChange}
                />
              </div>
            </div>

            {/* Hire AI Models */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="mb-6">
                <h3
                  data-eid="feature_2_title"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-2xl font-bold text-gray-900 mb-4"
                >
                  {getText('feature_2_title', 'Hire AI-models')}
                </h3>
                <p
                  data-eid="feature_2_description"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-gray-600 leading-relaxed"
                >
                  {getText(
                    'feature_2_description',
                    'Use one of our AI models to create great photos. Just describe what you want and let our AI create professional, lifelike photos of our AI models for you.'
                  )}
                </p>
              </div>
              <div className="relative rounded-xl overflow-hidden">
                <EditableImage
                  eid="feature_2_image"
                  defaultSrc={getImage('feature_2_image', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=400&fit=crop')}
                  alt="AI Models Feature"
                  className="w-full h-64 object-cover"
                  editable={editable}
                  onChange={onContentChange}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Studio Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              data-eid="studio_title"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              {getText('studio_title', 'Your virtual photo studio, instantly available.')}
            </h2>
            <p
              data-eid="studio_subtitle"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-xl text-gray-600"
            >
              {getText('studio_subtitle', 'Create professional photos in seconds with AI')}
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-12">
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
                  <EditableImage
                    eid={`gallery_image_${i}`}
                    defaultSrc={getImage(`gallery_image_${i}`, `https://images.unsplash.com/photo-${1500000000000 + i * 100000000}?w=400&h=400&fit=crop`)}
                    alt={`Gallery ${i}`}
                    className="w-full h-full object-cover"
                    editable={editable}
                    onChange={onContentChange}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2
              data-eid="faq_title"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              {getText('faq_title', 'Frequently asked questions')}
            </h2>
            <p
              data-eid="faq_subtitle"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-lg text-gray-600"
            >
              {getText('faq_subtitle', 'Have more questions? Feel free to reach out to our support team.')}
            </p>
          </div>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <h3
                  data-eid={`faq_question_${i}`}
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-lg font-semibold text-gray-900 mb-2"
                >
                  {getText(`faq_question_${i}`, `What do you do with my photos after creating?`)}
                </h3>
                <p
                  data-eid={`faq_answer_${i}`}
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-gray-600 leading-relaxed"
                >
                  {getText(
                    `faq_answer_${i}`,
                    'Your privacy is our priority. All photos are securely stored and only used to train your personal AI model. We never share your images with third parties.'
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            data-eid="cta_title"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-5xl font-bold text-gray-900 mb-6"
          >
            {getText('cta_title', 'Ready to transform your photos?')}
          </h2>
          <p
            data-eid="cta_description"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-xl text-gray-600 mb-8"
          >
            {getText('cta_description', 'Join over 1 million creators using AI Photo Studio')}
          </p>
          <EditableButton
            eid="cta_button"
            defaultText={getButton('cta_button', 'Get started now', '#').text}
            defaultUrl={getButton('cta_button', 'Get started now', '#').url}
            className="px-12 py-5 bg-orange-500 text-white rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors shadow-xl shadow-orange-500/30"
            editable={editable}
            onChange={onContentChange}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Camera className="w-6 h-6 text-orange-500" />
                <span
                  data-eid="footer_logo"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-xl font-semibold"
                >
                  {getText('footer_logo', 'Deep agency')}
                </span>
              </div>
              <p
                data-eid="footer_description"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-gray-400 text-sm leading-relaxed"
              >
                {getText(
                  'footer_description',
                  'AI-powered photo studio and modelling agency. Create professional photos instantly.'
                )}
              </p>
            </div>
            <div>
              <h3
                data-eid="footer_col_1_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="font-semibold mb-4"
              >
                {getText('footer_col_1_title', 'Studio')}
              </h3>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    data-eid={`footer_col_1_link_${i}`}
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="block text-gray-400 hover:text-white text-sm cursor-pointer"
                  >
                    {getText(`footer_col_1_link_${i}`, 'Link')}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3
                data-eid="footer_col_2_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="font-semibold mb-4"
              >
                {getText('footer_col_2_title', 'Legal')}
              </h3>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    data-eid={`footer_col_2_link_${i}`}
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="block text-gray-400 hover:text-white text-sm cursor-pointer"
                  >
                    {getText(`footer_col_2_link_${i}`, 'Link')}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3
                data-eid="footer_col_3_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="font-semibold mb-4"
              >
                {getText('footer_col_3_title', 'Support')}
              </h3>
              <div className="space-y-2">
                {[1, 2].map((i) => (
                  <span
                    key={i}
                    data-eid={`footer_col_3_link_${i}`}
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="block text-gray-400 hover:text-white text-sm cursor-pointer"
                  >
                    {getText(`footer_col_3_link_${i}`, 'Link')}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p
              data-eid="footer_copyright"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-gray-400 text-sm"
            >
              {getText('footer_copyright', '© 2024 Deep Agency. All rights reserved.')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
