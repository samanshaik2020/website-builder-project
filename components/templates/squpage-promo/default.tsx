'use client';

import React, { useState, useEffect } from 'react';
import { EditableImage } from '@/components/editor/editable-image';
import { EditableButton } from '@/components/editor/editable-button';

interface SqupagePromoTemplateProps {
  data?: Record<string, any>;
  editable?: boolean;
  onContentChange?: (eid: string, content: any) => void;
}

export default function SqupagePromoTemplate({
  data = {},
  editable = false,
  onContentChange = () => { },
}: SqupagePromoTemplateProps) {
  const [scrollY, setScrollY] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getText = (eid: string, defaultText: string) => {
    return data[eid]?.text || defaultText;
  };

  const getImage = (eid: string, defaultSrc: string) => {
    return data[eid]?.image || defaultSrc;
  };

  const getButton = (eid: string, defaultText: string, defaultUrl: string) => {
    return {
      text: data[eid]?.button?.text || defaultText,
      url: data[eid]?.button?.url || defaultUrl,
    };
  };

  const handleImageChange = (eid: string) => (content: any) => {
    onContentChange(eid, content);
  };

  const features = [
    { icon: '🎨', title: 'Beautiful Templates', desc: '50+ professionally designed templates' },
    { icon: '✏️', title: 'Live Editing', desc: 'Edit content directly with real-time preview' },
    { icon: '🤖', title: 'AI Generation', desc: 'Generate content with AI in seconds' },
    { icon: '🔗', title: 'Easy Sharing', desc: 'Share with custom URLs instantly' },
    { icon: '⚡', title: 'Lightning Fast', desc: 'Built with Next.js for speed' },
    { icon: '📱', title: 'Fully Responsive', desc: 'Perfect on all devices' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden" suppressHydrationWarning>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${-scrollY * 0.3}px)` }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed left-0 right-0 z-50 transition-all duration-300 ${editable ? 'top-16' : 'top-0'} ${scrollY > 50 ? 'bg-slate-900/95 backdrop-blur-xl border-b border-purple-500/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center font-bold text-xl">
              S
            </div>
            <span
              data-eid="nav_brand"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-xl font-bold whitespace-pre-wrap break-words"
            >
              {getText('nav_brand', 'Squpage')}
            </span>
          </div>
          <EditableButton
            eid="nav_cta"
            defaultText={getButton('nav_cta', 'Get Started Free', 'https://squpage.com/signup').text}
            defaultUrl={getButton('nav_cta', 'Get Started Free', 'https://squpage.com/signup').url}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl hover:scale-105"
            editable={editable}
            onChange={onContentChange}
          />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-6 inline-block">
            <span
              data-eid="hero_badge"
              contentEditable={editable}
              suppressContentEditableWarning
              className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-sm font-medium backdrop-blur-sm whitespace-pre-wrap break-words"
            >
              {getText('hero_badge', '🚀 The Future of Website Building')}
            </span>
          </div>

          <h1
            data-eid="hero_title"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse whitespace-pre-wrap break-words"
          >
            {getText('hero_title', 'Build Beautiful Websites in Minutes')}
          </h1>

          <p
            data-eid="hero_description"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto whitespace-pre-wrap break-words"
          >
            {getText('hero_description', 'Create stunning websites with our AI-powered builder. No coding required. Choose from 50+ templates, edit live, and share instantly.')}
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <EditableButton
              eid="hero_cta_primary"
              defaultText={getButton('hero_cta_primary', 'Start Building Free', '#').text}
              defaultUrl={getButton('hero_cta_primary', 'Start Building Free', '#').url}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold text-lg transition-all shadow-2xl hover:shadow-purple-500/50 hover:scale-105"
              editable={editable}
              onChange={onContentChange}
            />
            <EditableButton
              eid="hero_cta_secondary"
              defaultText={getButton('hero_cta_secondary', 'View Templates', '#').text}
              defaultUrl={getButton('hero_cta_secondary', 'View Templates', '#').url}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg font-bold text-lg transition-all"
              editable={editable}
              onChange={onContentChange}
            />
          </div>

          {/* Hero Image */}
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-3xl opacity-30 animate-pulse"></div>
            <EditableImage
              eid="hero_image"
              defaultSrc={getImage('hero_image', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop')}
              alt="Squpage Dashboard"
              className="relative rounded-2xl shadow-2xl border border-purple-500/30"
              editable={editable}
              onChange={handleImageChange('hero_image')}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { eid: 'stat1', label: 'stat1_label', value: 'stat1_value', defaultLabel: 'Templates', defaultValue: '50+' },
              { eid: 'stat2', label: 'stat2_label', value: 'stat2_value', defaultLabel: 'Websites Created', defaultValue: '10K+' },
              { eid: 'stat3', label: 'stat3_label', value: 'stat3_value', defaultLabel: 'Active Users', defaultValue: '5K+' },
              { eid: 'stat4', label: 'stat4_label', value: 'stat4_value', defaultLabel: 'Uptime', defaultValue: '99.9%' },
            ].map((stat) => (
              <div key={stat.eid} className="text-center transform hover:scale-110 transition-transform duration-300">
                <div
                  data-eid={stat.value}
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 whitespace-pre-wrap break-words"
                >
                  {getText(stat.value, stat.defaultValue)}
                </div>
                <div
                  data-eid={stat.label}
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-slate-400 font-medium whitespace-pre-wrap break-words"
                >
                  {getText(stat.label, stat.defaultLabel)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              data-eid="features_title"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-4xl md:text-5xl font-black mb-4 whitespace-pre-wrap break-words"
            >
              {getText('features_title', 'Everything You Need to Build Amazing Websites')}
            </h2>
            <p
              data-eid="features_subtitle"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-xl text-slate-400 max-w-2xl mx-auto whitespace-pre-wrap break-words"
            >
              {getText('features_subtitle', 'Powerful features that make website building effortless and enjoyable')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-8 bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl hover:bg-white/10 hover:border-purple-500/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 ${activeFeature === index ? 'ring-2 ring-purple-500 shadow-2xl shadow-purple-500/50' : ''
                  }`}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3
                  data-eid={`feature${index + 1}_title`}
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-2xl font-bold mb-2 whitespace-pre-wrap break-words"
                >
                  {getText(`feature${index + 1}_title`, feature.title)}
                </h3>
                <p
                  data-eid={`feature${index + 1}_desc`}
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-slate-400 whitespace-pre-wrap break-words"
                >
                  {getText(`feature${index + 1}_desc`, feature.desc)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              data-eid="how_it_works_title"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-4xl md:text-5xl font-black mb-4 whitespace-pre-wrap break-words"
            >
              {getText('how_it_works_title', 'Build Your Website in 3 Simple Steps')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Choose Template', desc: 'Select from 50+ beautiful templates' },
              { num: '02', title: 'Customize Content', desc: 'Edit text, images, and colors live' },
              { num: '03', title: 'Publish & Share', desc: 'Get your custom URL and go live' },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="text-8xl font-black bg-gradient-to-r from-purple-600/20 to-pink-600/20 bg-clip-text text-transparent mb-4">
                    {step.num}
                  </div>
                  <h3
                    data-eid={`step${index + 1}_title`}
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-2xl font-bold mb-2 whitespace-pre-wrap break-words"
                  >
                    {getText(`step${index + 1}_title`, step.title)}
                  </h3>
                  <p
                    data-eid={`step${index + 1}_desc`}
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-slate-400 whitespace-pre-wrap break-words"
                  >
                    {getText(`step${index + 1}_desc`, step.desc)}
                  </p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <div className="text-4xl text-purple-500">→</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              data-eid="testimonials_title"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-4xl md:text-5xl font-black mb-4 whitespace-pre-wrap break-words"
            >
              {getText('testimonials_title', 'Loved by Creators Worldwide')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="p-8 bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl hover:bg-white/10 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <EditableImage
                    eid={`testimonial${num}_avatar`}
                    defaultSrc={getImage(`testimonial${num}_avatar`, `https://images.unsplash.com/photo-${1500000000000 + num}?w=100&h=100&fit=crop&crop=faces`)}
                    alt={`Testimonial ${num}`}
                    className="w-16 h-16 rounded-full object-cover"
                    editable={editable}
                    onChange={handleImageChange(`testimonial${num}_avatar`)}
                  />
                  <div>
                    <div
                      data-eid={`testimonial${num}_name`}
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="font-bold whitespace-pre-wrap break-words"
                    >
                      {getText(`testimonial${num}_name`, `User ${num}`)}
                    </div>
                    <div
                      data-eid={`testimonial${num}_role`}
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-sm text-slate-400 whitespace-pre-wrap break-words"
                    >
                      {getText(`testimonial${num}_role`, 'Creator')}
                    </div>
                  </div>
                </div>
                <p
                  data-eid={`testimonial${num}_quote`}
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-slate-300 whitespace-pre-wrap break-words"
                >
                  {getText(`testimonial${num}_quote`, 'Squpage made building my website incredibly easy. The templates are beautiful and the AI feature is a game-changer!')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-3xl">
            <h2
              data-eid="cta_title"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-4xl md:text-5xl font-black mb-4 whitespace-pre-wrap break-words"
            >
              {getText('cta_title', 'Ready to Build Your Dream Website?')}
            </h2>
            <p
              data-eid="cta_description"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-xl text-slate-300 mb-8 whitespace-pre-wrap break-words"
            >
              {getText('cta_description', 'Join thousands of creators who trust Squpage for their web presence')}
            </p>
            <EditableButton
              eid="cta_button"
              defaultText={getButton('cta_button', 'Start Building for Free', '#').text}
              defaultUrl={getButton('cta_button', 'Start Building for Free', '#').url}
              className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold text-xl transition-all shadow-2xl hover:shadow-purple-500/50 hover:scale-105"
              editable={editable}
              onChange={onContentChange}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-purple-500/20 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center font-bold">
              S
            </div>
            <span
              data-eid="footer_brand"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-lg font-bold whitespace-pre-wrap break-words"
            >
              {getText('footer_brand', 'Squpage')}
            </span>
          </div>
          <p
            data-eid="footer_tagline"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-slate-400 mb-4 whitespace-pre-wrap break-words"
          >
            {getText('footer_tagline', 'Build beautiful websites in minutes, not hours')}
          </p>
          <p
            data-eid="footer_copyright"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-sm text-slate-500 whitespace-pre-wrap break-words"
          >
            {getText('footer_copyright', '© 2025 Squpage. All rights reserved.')}
          </p>
        </div>
      </footer>
    </div>
  );
}
