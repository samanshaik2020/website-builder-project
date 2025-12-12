'use client'

import React, { useState, useEffect } from 'react';
import { EditableImage } from '@/components/editor/editable-image';
import { EditableButton } from '@/components/editor/editable-button';
import { Link2, X } from 'lucide-react';
import { BaseTemplateProps } from '@/types/template'

export default function MeditationAppTemplate({
  editable = false,
  data = {},
  onContentChange = () => { },
}: BaseTemplateProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [editingSocialUrl, setEditingSocialUrl] = useState<{ eid: string; url: string } | null>(null)
  const [mounted, setMounted] = useState(false)
  const [starStyles, setStarStyles] = useState<Array<{ top: string, left: string, animation: string }>>([])

  useEffect(() => {
    setMounted(true)
    // Generate star positions on client only
    const styles = Array.from({ length: 50 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animation: `twinkle ${2 + Math.random() * 3}s infinite`
    }))
    setStarStyles(styles)
  }, [])

  const stories = [
    {
      imageEid: 'story1_image',
      categoryEid: 'story1_category',
      titleEid: 'story1_title',
      descriptionEid: 'story1_description',
      narratorEid: 'story1_narrator',
      narratorImageEid: 'story1_narrator_image',
      defaults: {
        image: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=300&h=400&fit=crop',
        category: 'SLEEP STORY',
        title: 'Serene Me Sleepy Train',
        description: 'Join bestselling author and beloved comedian David Walliams for a sleepy adventure through the mountains of Switzerland.',
        narrator: 'David Walliams',
        narratorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop'
      }
    },
    {
      imageEid: 'story2_image',
      categoryEid: 'story2_category',
      titleEid: 'story2_title',
      descriptionEid: 'story2_description',
      narratorEid: 'story2_narrator',
      narratorImageEid: 'story2_narrator_image',
      defaults: {
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&h=400&fit=crop',
        category: 'SLEEP STORY',
        title: 'Northern Lights Journey',
        description: 'Drift away under the magical aurora borealis as we explore the serene landscapes of Iceland.',
        narrator: 'Stephen Fry',
        narratorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop'
      }
    },
    {
      imageEid: 'story3_image',
      categoryEid: 'story3_category',
      titleEid: 'story3_title',
      descriptionEid: 'story3_description',
      narratorEid: 'story3_narrator',
      narratorImageEid: 'story3_narrator_image',
      defaults: {
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop',
        category: 'SLEEP STORY',
        title: 'Mountain Meditation',
        description: 'Find peace in the tranquil peaks of the Himalayas with this calming bedtime story.',
        narrator: 'Matthew McConaughey',
        narratorImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop'
      }
    }
  ]

  const currentStory = stories[currentStoryIndex]!

  const nextStory = () => {
    setCurrentStoryIndex((prev) => (prev + 1) % stories.length)
  }

  const prevStory = () => {
    setCurrentStoryIndex((prev) => (prev - 1 + stories.length) % stories.length)
  }

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
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-indigo-900 via-indigo-800 to-blue-600 text-white py-20 overflow-hidden">
        {/* Stars background effect */}
        {mounted && (
          <div className="absolute inset-0 opacity-30">
            {starStyles.map((style, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={style}
              />
            ))}
          </div>
        )}

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center justify-between">
            <div className="w-1/2">
              <div
                data-eid="hero_brand"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-3xl font-light mb-8 whitespace-pre-wrap break-words"
              >
                {getText('hero_brand', 'Calm')}
              </div>
              <h1
                data-eid="hero_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-5xl font-light mb-6 leading-tight whitespace-pre-wrap break-words"
              >
                {getText('hero_title', 'Meet Calm, the #1 app for sleep and meditation')}
              </h1>
              <p
                data-eid="hero_description"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-lg mb-8 opacity-90 max-w-md whitespace-pre-wrap break-words"
              >
                {getText('hero_description', 'Join millions around the globe who are experiencing better sleep, lower stress and less anxiety.')}
              </p>
              <EditableButton
                eid="hero_cta"
                defaultText={getButton('hero_cta', 'GET STARTED', '#').text}
                defaultUrl={getButton('hero_cta', 'GET STARTED', '#').url}
                className="bg-white text-indigo-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                editable={editable}
                onChange={onContentChange}
              />
            </div>
            <div className="w-1/2 flex justify-end">
              <div className="relative">
                <EditableImage
                  eid="hero_app_preview"
                  defaultSrc={getImage('hero_app_preview', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=900&fit=crop')}
                  alt="App Preview"
                  className="w-full max-w-lg h-auto rounded-3xl shadow-2xl"
                  editable={editable}
                  onChange={onContentChange}
                />
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
        `}</style>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-start gap-16">
            <div className="w-1/2">
              <EditableImage
                eid="features_app_image"
                defaultSrc={getImage('features_app_image', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=600&fit=crop')}
                alt="App Features"
                className="w-full max-w-[350px] mx-auto rounded-3xl shadow-xl"
                editable={editable}
                onChange={onContentChange}
              />
            </div>
            <div className="w-1/2">
              <h2
                data-eid="features_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-4xl font-light mb-12 text-gray-800"
              >
                {getText('features_title', 'What do you get?')}
              </h2>

              <div className="space-y-8">
                {/* Feature 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">😴</span>
                  </div>
                  <div>
                    <h3
                      data-eid="feature1_title"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-xl font-semibold mb-2 text-gray-800"
                    >
                      {getText('feature1_title', 'Sleep Stories')}
                    </h3>
                    <p
                      data-eid="feature1_description"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-gray-600 whitespace-pre-wrap break-words"
                    >
                      {getText('feature1_description', 'Drift off with a library of Sleep Stories designed to lull you into a deep and restful slumber.')}
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🧘</span>
                  </div>
                  <div>
                    <h3
                      data-eid="feature2_title"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-xl font-semibold mb-2 text-gray-800"
                    >
                      {getText('feature2_title', 'Guided Meditations')}
                    </h3>
                    <p
                      data-eid="feature2_description"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-gray-600 whitespace-pre-wrap break-words"
                    >
                      {getText('feature2_description', 'Find peace with guided meditations for stress, anxiety, and relaxation.')}
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🎵</span>
                  </div>
                  <div>
                    <h3
                      data-eid="feature3_title"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-xl font-semibold mb-2 text-gray-800"
                    >
                      {getText('feature3_title', 'Calm Music')}
                    </h3>
                    <p
                      data-eid="feature3_description"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-gray-600"
                    >
                      {getText('feature3_description', 'Exclusive music for sleep, relaxation, or doing, plus lullabies & Nature Sounds.')}
                    </p>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💪</span>
                  </div>
                  <div>
                    <h3
                      data-eid="feature4_title"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-xl font-semibold mb-2 text-gray-800"
                    >
                      {getText('feature4_title', 'Mindfulness')}
                    </h3>
                    <p
                      data-eid="feature4_description"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-gray-600 whitespace-pre-wrap break-words"
                    >
                      {getText('feature4_description', 'Build your practice, including programs, tips, and techniques to help build a life.')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <div style={{ backgroundColor: '#8BC34A' }} className="inline-block rounded-full">
                  <EditableButton
                    eid="features_cta"
                    defaultText={getButton('features_cta', 'TRY CALM FOR FREE', '#').text}
                    defaultUrl={getButton('features_cta', 'TRY CALM FOR FREE', '#').url}
                    className="text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-colors"
                    editable={editable}
                    onChange={onContentChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sleep Stories Showcase */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              data-eid="stories_title"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-4xl font-light mb-4 text-gray-800"
            >
              {getText('stories_title', 'Drift off with Sleep Stories')}
            </h2>
            <p
              data-eid="stories_subtitle"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-xl text-gray-600"
            >
              {getText('stories_subtitle', 'narrated by iconic voices')}
            </p>
          </div>

          <div className="flex items-center justify-center gap-12">
            {/* Navigation Arrow Left */}
            <button
              onClick={prevStory}
              className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center hover:bg-purple-600 transition-colors"
            >
              ←
            </button>

            {/* Story Card */}
            <div className="max-w-2xl">
              <div className="flex items-start gap-8">
                <EditableImage
                  eid={currentStory.imageEid}
                  defaultSrc={getImage(currentStory.imageEid, currentStory.defaults.image)}
                  alt="Sleep Story"
                  className="w-72 h-96 object-cover rounded-2xl shadow-xl"
                  editable={editable}
                  onChange={onContentChange}
                />
                <div className="flex-1">
                  <div
                    data-eid={currentStory.categoryEid}
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-sm text-purple-600 font-semibold mb-4"
                  >
                    {getText(currentStory.categoryEid, currentStory.defaults.category)}
                  </div>
                  <h3
                    data-eid={currentStory.titleEid}
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-3xl font-light mb-4 text-gray-800"
                  >
                    {getText(currentStory.titleEid, currentStory.defaults.title)}
                  </h3>
                  <p
                    data-eid={currentStory.descriptionEid}
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-gray-600 mb-6 leading-relaxed"
                  >
                    {getText(currentStory.descriptionEid, currentStory.defaults.description)}
                  </p>
                  <div className="flex items-center gap-3">
                    <EditableImage
                      eid={currentStory.narratorImageEid}
                      defaultSrc={getImage(currentStory.narratorImageEid, currentStory.defaults.narratorImage)}
                      alt="Narrator"
                      className="w-12 h-12 rounded-full object-cover"
                      editable={editable}
                      onChange={onContentChange}
                    />
                    <div
                      data-eid={currentStory.narratorEid}
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-gray-700 font-medium"
                    >
                      {getText(currentStory.narratorEid, currentStory.defaults.narrator)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrow Right */}
            <button
              onClick={nextStory}
              className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center hover:bg-purple-600 transition-colors"
            >
              →
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStoryIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${index === currentStoryIndex ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2
            data-eid="testimonials_title"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-4xl font-light text-center mb-16 text-gray-800"
          >
            {getText('testimonials_title', 'What others say')}
          </h2>

          <div className="grid grid-cols-3 gap-12">
            {/* Testimonial 1 */}
            <div className="text-center">
              <div
                data-eid="testimonial1_logo"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-2xl font-bold mb-6 text-gray-800"
              >
                {getText('testimonial1_logo', 'WIRED')}
              </div>
              <p
                data-eid="testimonial1_text"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-gray-600 leading-relaxed whitespace-pre-wrap break-words"
              >
                {getText('testimonial1_text', '"Calm has app-based meditation for every mood, from anxiety to work stress to sleep. It\'s like having a personal meditation coach in your pocket."')}
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="text-center">
              <div
                data-eid="testimonial2_logo"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-2xl font-bold mb-6 text-gray-800"
              >
                {getText('testimonial2_logo', 'Los Angeles Times')}
              </div>
              <p
                data-eid="testimonial2_text"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-gray-600 leading-relaxed whitespace-pre-wrap break-words"
              >
                {getText('testimonial2_text', '"Today, the magic of the Calm App is that it not only can help you fall asleep, but it also can help you feel more relaxed and less anxious during the day."')}
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="text-center">
              <div
                data-eid="testimonial3_logo"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-2xl font-bold mb-6 text-gray-800"
              >
                {getText('testimonial3_logo', 'REFINERY29')}
              </div>
              <p
                data-eid="testimonial3_text"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-gray-600 leading-relaxed whitespace-pre-wrap break-words"
              >
                {getText('testimonial3_text', '"The only sounds Calm app is as if you\'re lounging in the Bahamas (if there is such a place) and you get guided meditations, along with music and other programs."')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 text-center">
          <div style={{ backgroundColor: '#8BC34A' }} className="inline-block rounded-full">
            <EditableButton
              eid="cta_button"
              defaultText={getButton('cta_button', 'GET STARTED', '#').text}
              defaultUrl={getButton('cta_button', 'GET STARTED', '#').url}
              className="text-white px-12 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-colors"
              editable={editable}
              onChange={onContentChange}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-4 gap-8">
            {/* Column 1 */}
            <div>
              <h3
                data-eid="footer_col1_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="font-semibold mb-4"
              >
                {getText('footer_col1_title', 'Company')}
              </h3>
              <div className="space-y-2">
                <div data-eid="footer_col1_link1" contentEditable={editable} suppressContentEditableWarning className="text-gray-400 hover:text-white cursor-pointer">
                  {getText('footer_col1_link1', 'About')}
                </div>
                <div data-eid="footer_col1_link2" contentEditable={editable} suppressContentEditableWarning className="text-gray-400 hover:text-white cursor-pointer">
                  {getText('footer_col1_link2', 'Careers')}
                </div>
                <div data-eid="footer_col1_link3" contentEditable={editable} suppressContentEditableWarning className="text-gray-400 hover:text-white cursor-pointer">
                  {getText('footer_col1_link3', 'Press')}
                </div>
                <div data-eid="footer_col1_link4" contentEditable={editable} suppressContentEditableWarning className="text-gray-400 hover:text-white cursor-pointer">
                  {getText('footer_col1_link4', 'Meditation 101')}
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <h3
                data-eid="footer_col2_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="font-semibold mb-4"
              >
                {getText('footer_col2_title', 'Get the App')}
              </h3>
              <div className="space-y-2">
                <div data-eid="footer_col2_link1" contentEditable={editable} suppressContentEditableWarning className="text-gray-400 hover:text-white cursor-pointer">
                  {getText('footer_col2_link1', 'iOS App')}
                </div>
                <div data-eid="footer_col2_link2" contentEditable={editable} suppressContentEditableWarning className="text-gray-400 hover:text-white cursor-pointer">
                  {getText('footer_col2_link2', 'Android App')}
                </div>
                <div data-eid="footer_col2_link3" contentEditable={editable} suppressContentEditableWarning className="text-gray-400 hover:text-white cursor-pointer">
                  {getText('footer_col2_link3', 'Kindle Fire')}
                </div>
                <div data-eid="footer_col2_link4" contentEditable={editable} suppressContentEditableWarning className="text-gray-400 hover:text-white cursor-pointer">
                  {getText('footer_col2_link4', 'Learn More')}
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div>
              <h3
                data-eid="footer_col3_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="font-semibold mb-4"
              >
                {getText('footer_col3_title', 'Help')}
              </h3>
              <div className="space-y-2">
                <div data-eid="footer_col3_link1" contentEditable={editable} suppressContentEditableWarning className="text-gray-400 hover:text-white cursor-pointer">
                  {getText('footer_col3_link1', 'FAQ')}
                </div>
                <div data-eid="footer_col3_link2" contentEditable={editable} suppressContentEditableWarning className="text-gray-400 hover:text-white cursor-pointer">
                  {getText('footer_col3_link2', 'Contact Us')}
                </div>
                <div data-eid="footer_col3_link3" contentEditable={editable} suppressContentEditableWarning className="text-gray-400 hover:text-white cursor-pointer">
                  {getText('footer_col3_link3', 'Terms')}
                </div>
              </div>
            </div>

            {/* Column 4 - Social */}
            <div>
              <div className="flex gap-4">
                {editable ? (
                  <>
                    <button
                      onClick={() => setEditingSocialUrl({ eid: 'footer_facebook', url: getButton('footer_facebook', '', 'https://facebook.com').url })}
                      className="text-gray-400 hover:text-white transition-colors relative group"
                      aria-label="Edit Facebook URL"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link2 size={10} className="text-white" />
                      </span>
                    </button>
                    <button
                      onClick={() => setEditingSocialUrl({ eid: 'footer_twitter', url: getButton('footer_twitter', '', 'https://twitter.com').url })}
                      className="text-gray-400 hover:text-white transition-colors relative group"
                      aria-label="Edit Twitter URL"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link2 size={10} className="text-white" />
                      </span>
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      href={getButton('footer_facebook', '', 'https://facebook.com').url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label="Facebook"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                    </a>
                    <a
                      href={getButton('footer_twitter', '', 'https://twitter.com').url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label="Twitter"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-700 text-center">
            <p
              data-eid="footer_copyright"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-gray-400 text-sm"
            >
              {getText('footer_copyright', '© Calm.com Inc. All rights reserved.')}
            </p>
          </div>
        </div>
      </footer>

      {/* Social Media URL Edit Modal */}
      {editingSocialUrl && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[10000]">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900">Edit Social Media URL</h3>
              <button
                onClick={() => setEditingSocialUrl(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-slate-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Social Media URL
                </label>
                <input
                  type="text"
                  value={editingSocialUrl.url}
                  onChange={(e) => setEditingSocialUrl({ ...editingSocialUrl, url: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      onContentChange(editingSocialUrl.eid, { button: { text: '', url: editingSocialUrl.url } });
                      setEditingSocialUrl(null);
                    } else if (e.key === 'Escape') {
                      e.preventDefault();
                      setEditingSocialUrl(null);
                    }
                  }}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  placeholder="https://facebook.com/yourpage"
                  autoFocus
                />
                <p className="text-xs text-slate-500 mt-2">
                  Enter the full URL (e.g., https://facebook.com/yourpage)
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditingSocialUrl(null)}
                className="flex-1 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onContentChange(editingSocialUrl.eid, { button: { text: '', url: editingSocialUrl.url } });
                  setEditingSocialUrl(null);
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all shadow-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
