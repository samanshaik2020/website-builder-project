'use client';

import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/editor/editable-image';
import { TiptapEditableText } from '@/components/editor/tiptap-editable-text';
import { EditableButton } from '@/components/editor/editable-button';
import { EditableLink } from '@/components/editor/editable-link';
import { BaseTemplateProps } from '@/types/template';

interface SaasLandingProps extends BaseTemplateProps {
  onContentChange?: (eid: string, value: unknown) => void;
}

export default function SaasVibrantGradient({ editable = false, data = {}, onContentChange }: SaasLandingProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getText = (id: string, defaultValue: string) => {
    return data[id]?.text || defaultValue;
  };

  const getImage = (id: string, defaultValue: string) => {
    return data[id]?.image || defaultValue;
  };

  const getButton = (id: string, defaultText: string, defaultUrl: string) => {
    return {
      text: data[id]?.button?.text || defaultText,
      url: data[id]?.button?.url || defaultUrl,
    };
  };

  const handleTextChange = (eid: string, content: string) => {
    if (onContentChange) {
      onContentChange(eid, { text: content });
    }
  };

  const handleImageChange = (eid: string, data: { image: string; linkUrl?: string | undefined }) => {
    if (onContentChange) {
      onContentChange(eid, data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Navigation */}
      <nav className={`fixed left-0 right-0 z-50 transition-all duration-300 ${editable ? 'top-16' : 'top-0'} ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg' : 'bg-transparent'
        }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <TiptapEditableText
              eid="nav_logo"
              defaultText={getText('nav_logo', 'Vibrant')}
              className="text-3xl font-bold"
              editorClassName="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
              editable={editable}
              onChange={handleTextChange}
              as="div"
            />
            <div className="hidden md:flex items-center gap-8">
              <EditableLink href="#features" className="text-gray-700 hover:text-purple-600 font-medium transition-colors" editable={editable}>
                <span
                  data-eid="nav_link_1"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextChange('nav_link_1', e.currentTarget.textContent || '')}
                >
                  {getText('nav_link_1', 'Features')}
                </span>
              </EditableLink>
              <EditableLink href="#pricing" className="text-gray-700 hover:text-purple-600 font-medium transition-colors" editable={editable}>
                <span
                  data-eid="nav_link_2"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextChange('nav_link_2', e.currentTarget.textContent || '')}
                >
                  {getText('nav_link_2', 'Pricing')}
                </span>
              </EditableLink>
              <EditableLink href="#testimonials" className="text-gray-700 hover:text-purple-600 font-medium transition-colors" editable={editable}>
                <span
                  data-eid="nav_link_3"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextChange('nav_link_3', e.currentTarget.textContent || '')}
                >
                  {getText('nav_link_3', 'Reviews')}
                </span>
              </EditableLink>
              <EditableButton
                eid="nav_cta"
                defaultText={getButton('nav_cta', 'Get Started', '#').text}
                defaultUrl={getButton('nav_cta', 'Get Started', '#').url}
                className="px-6 py-2.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all"
                editable={editable}
                onChange={onContentChange}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <TiptapEditableText
              eid="hero_badge"
              defaultText={getText('hero_badge', '🚀 New: AI-Powered Features')}
              className="inline-block px-6 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-full text-sm font-semibold shadow-lg"
              editable={editable}
              onChange={handleTextChange}
              as="div"
            />

            <TiptapEditableText
              eid="hero_title"
              defaultText={getText('hero_title', 'Transform Your Business with Vibrant SaaS')}
              className="text-5xl md:text-7xl font-bold leading-tight"
              editorClassName="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
              editable={editable}
              onChange={handleTextChange}
              as="h1"
            />

            <TiptapEditableText
              eid="hero_description"
              defaultText={getText('hero_description', 'The all-in-one platform that helps you grow faster, work smarter, and achieve more. Join thousands of teams already transforming their workflow.')}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              editable={editable}
              onChange={handleTextChange}
              as="div"
            />

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <EditableButton
                eid="hero_cta_primary"
                defaultText={getButton('hero_cta_primary', 'Start Free Trial', '#').text}
                defaultUrl={getButton('hero_cta_primary', 'Start Free Trial', '#').url}
                className="px-10 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
                editable={editable}
                onChange={onContentChange}
              />
              <EditableButton
                eid="hero_cta_secondary"
                defaultText={getButton('hero_cta_secondary', 'Watch Demo', '#').text}
                defaultUrl={getButton('hero_cta_secondary', 'Watch Demo', '#').url}
                className="px-10 py-4 bg-white text-purple-600 rounded-full font-bold text-lg border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all"
                editable={editable}
                onChange={onContentChange}
              />
            </div>

            <div className="pt-8">
              <EditableImage
                eid="hero_image"
                defaultSrc={getImage('hero_image', 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=600&fit=crop')}
                alt="Hero"
                className="rounded-3xl shadow-2xl w-full max-w-5xl mx-auto border-8 border-white"
                editable={editable}
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="space-y-2">
                <TiptapEditableText
                  eid={`stat${num}_number`}
                  defaultText={getText(`stat${num}_number`, num === 1 ? '10K+' : num === 2 ? '99%' : num === 3 ? '24/7' : '150+')}
                  className="text-4xl font-bold"
                  editorClassName="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
                  editable={editable}
                  onChange={handleTextChange}
                  as="div"
                />
                <TiptapEditableText
                  eid={`stat${num}_label`}
                  defaultText={getText(`stat${num}_label`, num === 1 ? 'Active Users' : num === 2 ? 'Satisfaction' : num === 3 ? 'Support' : 'Countries')}
                  className="text-gray-600 font-medium"
                  editable={editable}
                  onChange={handleTextChange}
                  as="div"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <TiptapEditableText
              eid="features_title"
              defaultText={getText('features_title', 'Powerful Features')}
              className="text-4xl md:text-5xl font-bold"
              editorClassName="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
              editable={editable}
              onChange={handleTextChange}
              as="h2"
            />
            <TiptapEditableText
              eid="features_subtitle"
              defaultText={getText('features_subtitle', 'Everything you need to succeed, all in one place')}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              editable={editable}
              onChange={handleTextChange}
              as="div"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="group p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-purple-100">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">✨</span>
                </div>
                <TiptapEditableText
                  eid={`feature${num}_title`}
                  defaultText={getText(`feature${num}_title`, `Feature ${num}`)}
                  className="text-xl font-bold mb-3 text-gray-900"
                  editable={editable}
                  onChange={handleTextChange}
                  as="h3"
                />
                <TiptapEditableText
                  eid={`feature${num}_description`}
                  defaultText={getText(`feature${num}_description`, 'Powerful tools to help you achieve your goals faster and more efficiently.')}
                  className="text-gray-600"
                  editable={editable}
                  onChange={handleTextChange}
                  as="div"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <TiptapEditableText
              eid="pricing_title"
              defaultText={getText('pricing_title', 'Simple, Transparent Pricing')}
              className="text-4xl md:text-5xl font-bold"
              editorClassName="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
              editable={editable}
              onChange={handleTextChange}
              as="h2"
            />
            <TiptapEditableText
              eid="pricing_subtitle"
              defaultText={getText('pricing_subtitle', 'Choose the perfect plan for your needs')}
              className="text-xl text-gray-600"
              editable={editable}
              onChange={handleTextChange}
              as="div"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className={`p-8 rounded-3xl ${num === 2 ? 'bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white scale-105 shadow-2xl' : 'bg-white shadow-lg'}`}>
                <TiptapEditableText
                  eid={`plan${num}_name`}
                  defaultText={getText(`plan${num}_name`, num === 1 ? 'Starter' : num === 2 ? 'Professional' : 'Enterprise')}
                  className={`text-2xl font-bold mb-2 ${num === 2 ? 'text-white' : 'text-gray-900'}`}
                  editable={editable}
                  onChange={handleTextChange}
                  as="div"
                />
                <div className="mb-6">
                  <TiptapEditableText
                    eid={`plan${num}_price`}
                    defaultText={getText(`plan${num}_price`, num === 1 ? '$29' : num === 2 ? '$79' : '$199')}
                    className={`text-5xl font-bold ${num === 2 ? 'text-white' : ''}`}
                    editorClassName={num === 2 ? '' : 'bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent'}
                    editable={editable}
                    onChange={handleTextChange}
                    as="span"
                  />
                  <span className={num === 2 ? 'text-white/80' : 'text-gray-600'}>/month</span>
                </div>
                <TiptapEditableText
                  eid={`plan${num}_description`}
                  defaultText={getText(`plan${num}_description`, 'Perfect for getting started')}
                  className={`mb-6 ${num === 2 ? 'text-white/90' : 'text-gray-600'}`}
                  editable={editable}
                  onChange={handleTextChange}
                  as="p"
                />
                <EditableButton
                  eid={`plan${num}_cta`}
                  defaultText={getButton(`plan${num}_cta`, 'Get Started', '#').text}
                  defaultUrl={getButton(`plan${num}_cta`, 'Get Started', '#').url}
                  className={`w-full py-3 rounded-full font-bold transition-all ${num === 2
                    ? 'bg-white text-purple-600 hover:shadow-xl'
                    : 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:shadow-xl'
                    }`}
                  editable={editable}
                  onChange={onContentChange}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <TiptapEditableText
              eid="testimonials_title"
              defaultText={getText('testimonials_title', 'Loved by Thousands')}
              className="text-4xl md:text-5xl font-bold"
              editorClassName="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
              editable={editable}
              onChange={handleTextChange}
              as="h2"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="p-8 bg-white rounded-3xl shadow-lg border border-purple-100">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                <TiptapEditableText
                  eid={`testimonial${num}_text`}
                  defaultText={getText(`testimonial${num}_text`, 'This platform has completely transformed how we work. Highly recommended!')}
                  className="text-gray-600 mb-6"
                  editable={editable}
                  onChange={handleTextChange}
                  as="div"
                />
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full"></div>
                  <div>
                    <TiptapEditableText
                      eid={`testimonial${num}_name`}
                      defaultText={getText(`testimonial${num}_name`, 'John Doe')}
                      className="font-bold text-gray-900"
                      editable={editable}
                      onChange={handleTextChange}
                      as="div"
                    />
                    <TiptapEditableText
                      eid={`testimonial${num}_role`}
                      defaultText={getText(`testimonial${num}_role`, 'CEO, Company')}
                      className="text-sm text-gray-500"
                      editable={editable}
                      onChange={handleTextChange}
                      as="div"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
        <div className="container mx-auto max-w-4xl text-center text-white space-y-8">
          <TiptapEditableText
            eid="cta_title"
            defaultText={getText('cta_title', 'Ready to Get Started?')}
            className="text-4xl md:text-5xl font-bold"
            editable={editable}
            onChange={handleTextChange}
            as="h2"
          />
          <TiptapEditableText
            eid="cta_description"
            defaultText={getText('cta_description', 'Join thousands of teams already using Vibrant to transform their workflow')}
            className="text-xl text-white/90"
            editable={editable}
            onChange={handleTextChange}
            as="div"
          />
          <EditableButton
            eid="cta_button"
            defaultText={getButton('cta_button', 'Start Your Free Trial', '#').text}
            defaultUrl={getButton('cta_button', 'Start Your Free Trial', '#').url}
            className="px-12 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
            editable={editable}
            onChange={onContentChange}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <TiptapEditableText
            eid="footer_text"
            defaultText={getText('footer_text', '© 2025 Vibrant SaaS. All rights reserved.')}
            className="text-gray-400"
            editable={editable}
            onChange={handleTextChange}
            as="div"
          />
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
