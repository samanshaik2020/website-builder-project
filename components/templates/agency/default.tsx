'use client';

import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/editor/editable-image';
import { EditableButton } from '@/components/editor/editable-button';
import { TiptapEditableText } from '@/components/editor/tiptap-editable-text';
import { BaseTemplateProps } from '@/types/template';

interface AgencyProps extends BaseTemplateProps {
  onContentChange?: (eid: string, value: unknown) => void;
}

export default function Agency({ editable = false, data = {}, onContentChange }: AgencyProps) {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      const sections = ['home', 'services', 'portfolio', 'team', 'testimonials', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Fixed Navigation */}
      <nav className={`fixed left-0 right-0 z-50 transition-all duration-300 ${editable ? 'top-16' : 'top-[48px]'} ${scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-slate-900/80 backdrop-blur-md'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <TiptapEditableText
              eid="nav_logo"
              defaultText={getText('nav_logo', 'Creative Agency')}
              className={`text-2xl font-bold transition-colors whitespace-pre-wrap break-words ${scrollY > 50 ? '' : 'text-white'}`}
              editorClassName={scrollY > 50 ? 'bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent' : ''}
              editable={editable}
              onChange={handleTextChange}
              as="h1"
            />
            <div className="flex gap-6 items-center">
              {['Home', 'Services', 'Portfolio', 'Team', 'Testimonials', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors hover:text-orange-400 px-3 py-2 rounded-lg ${scrollY > 50 ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
                    } ${activeSection === item.toLowerCase() ? 'text-orange-500 bg-orange-50' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-slate-900 text-white px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-purple-500/20"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="max-w-6xl mx-auto text-center relative z-10" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
          <div className="inline-block px-4 py-2 bg-orange-600/30 backdrop-blur-sm rounded-full border border-orange-400/30 mb-6">
            <TiptapEditableText
              eid="hero_badge"
              defaultText={getText('hero_badge', '🎨 Award-Winning Agency')}
              className="text-sm text-orange-200 whitespace-pre-wrap break-words"
              editable={editable}
              onChange={handleTextChange}
              as="span"
            />
          </div>
          <TiptapEditableText
            eid="hero_headline"
            defaultText={getText('hero_headline', 'Creative Agency')}
            className="text-6xl md:text-8xl font-bold mb-6 whitespace-pre-wrap break-words"
            editorClassName="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent"
            editable={editable}
            onChange={handleTextChange}
            as="h1"
          />
          <TiptapEditableText
            eid="hero_tagline"
            defaultText={getText('hero_tagline', 'We craft digital experiences that inspire and engage')}
            className="text-2xl md:text-3xl text-slate-300 mb-10 max-w-3xl mx-auto whitespace-pre-wrap break-words"
            editable={editable}
            onChange={handleTextChange}
            as="p"
          />
          <div className="flex gap-4 justify-center">
            <EditableButton
              eid="hero_cta_primary"
              defaultText={getButton('hero_cta_primary', 'Start Your Project', '#').text}
              defaultUrl={getButton('hero_cta_primary', 'Start Your Project', '#').url}
              className="px-10 py-5 bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 rounded-full text-xl font-semibold transition-all shadow-2xl hover:shadow-orange-500/50 hover:scale-105"
              editable={editable}
              onChange={onContentChange}
            />
            <EditableButton
              eid="hero_cta_secondary"
              defaultText={getButton('hero_cta_secondary', 'View Portfolio', '#portfolio').text}
              defaultUrl={getButton('hero_cta_secondary', 'View Portfolio', '#portfolio').url}
              className="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-xl font-semibold transition-all"
              editable={editable}
              onChange={onContentChange}
            />
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <TiptapEditableText
              eid="services_heading"
              defaultText={getText('services_heading', 'Our Services')}
              className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 whitespace-pre-wrap break-words"
              editable={editable}
              onChange={handleTextChange}
              as="h2"
            />
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-purple-500 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Service 1 */}
            <div className="group p-8 bg-gradient-to-br from-orange-50 to-purple-50 rounded-2xl hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🎨</span>
              </div>
              <TiptapEditableText
                eid="service_1_title"
                defaultText={getText('service_1_title', 'Brand Identity')}
                className="text-2xl font-bold text-slate-900 mb-4 whitespace-pre-wrap break-words"
                editable={editable}
                onChange={handleTextChange}
                as="h3"
              />
              <TiptapEditableText
                eid="service_1_description"
                defaultText={getText('service_1_description', 'Create a memorable brand that stands out with custom logos, color palettes, and visual guidelines.')}
                className="text-slate-600 leading-relaxed whitespace-pre-wrap break-words"
                editable={editable}
                onChange={handleTextChange}
                as="p"
              />
            </div>

            {/* Service 2 */}
            <div className="group p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">💻</span>
              </div>
              <TiptapEditableText
                eid="service_2_title"
                defaultText={getText('service_2_title', 'Web Development')}
                className="text-2xl font-bold text-slate-900 mb-4 whitespace-pre-wrap break-words"
                editable={editable}
                onChange={handleTextChange}
                as="h3"
              />
              <TiptapEditableText
                eid="service_2_description"
                defaultText={getText('service_2_description', 'Build fast, responsive websites with modern technologies and best practices for optimal performance.')}
                className="text-slate-600 leading-relaxed whitespace-pre-wrap break-words"
                editable={editable}
                onChange={handleTextChange}
                as="p"
              />
            </div>

            {/* Service 3 */}
            <div className="group p-8 bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">📱</span>
              </div>
              <TiptapEditableText
                eid="service_3_title"
                defaultText={getText('service_3_title', 'Mobile Apps')}
                className="text-2xl font-bold text-slate-900 mb-4 whitespace-pre-wrap break-words"
                editable={editable}
                onChange={handleTextChange}
                as="h3"
              />
              <TiptapEditableText
                eid="service_3_description"
                defaultText={getText('service_3_description', 'Design and develop native and cross-platform mobile applications that users love.')}
                className="text-slate-600 leading-relaxed whitespace-pre-wrap break-words"
                editable={editable}
                onChange={handleTextChange}
                as="p"
              />
            </div>

            {/* Service 4 */}
            <div className="group p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">📊</span>
              </div>
              <TiptapEditableText
                eid="service_4_title"
                defaultText={getText('service_4_title', 'Digital Marketing')}
                className="text-2xl font-bold text-slate-900 mb-4 whitespace-pre-wrap break-words"
                editable={editable}
                onChange={handleTextChange}
                as="h3"
              />
              <TiptapEditableText
                eid="service_4_description"
                defaultText={getText('service_4_description', 'Grow your business with data-driven marketing strategies and campaigns that deliver results.')}
                className="text-slate-600 leading-relaxed whitespace-pre-wrap break-words"
                editable={editable}
                onChange={handleTextChange}
                as="p"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <TiptapEditableText
              eid="portfolio_heading"
              defaultText={getText('portfolio_heading', 'Featured Work')}
              className="text-5xl md:text-6xl font-bold mb-4 whitespace-pre-wrap break-words"
              editable={editable}
              onChange={handleTextChange}
              as="h2"
            />
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-purple-500 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Portfolio Item 1 */}
            <div className="group relative h-80 bg-gradient-to-br from-orange-500 to-purple-500 rounded-2xl overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <TiptapEditableText
                  eid="portfolio_1_title"
                  defaultText={getText('portfolio_1_title', 'Brand Redesign')}
                  className="text-3xl font-bold text-white whitespace-pre-wrap break-words"
                  editable={editable}
                  onChange={handleTextChange}
                  as="h3"
                />
              </div>
            </div>

            {/* Portfolio Item 2 */}
            <div className="group relative h-80 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <TiptapEditableText
                  eid="portfolio_2_title"
                  defaultText={getText('portfolio_2_title', 'E-commerce Site')}
                  className="text-3xl font-bold text-white whitespace-pre-wrap break-words"
                  editable={editable}
                  onChange={handleTextChange}
                  as="h3"
                />
              </div>
            </div>

            {/* Portfolio Item 3 */}
            <div className="group relative h-80 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <TiptapEditableText
                  eid="portfolio_3_title"
                  defaultText={getText('portfolio_3_title', 'Mobile App')}
                  className="text-3xl font-bold text-white whitespace-pre-wrap break-words"
                  editable={editable}
                  onChange={handleTextChange}
                  as="h3"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <TiptapEditableText
              eid="team_heading"
              defaultText={getText('team_heading', 'Meet Our Team')}
              className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 whitespace-pre-wrap break-words"
              editable={editable}
              onChange={handleTextChange}
              as="h2"
            />
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-purple-500 mx-auto mb-4"></div>
            <TiptapEditableText
              eid="team_description"
              defaultText={getText('team_description', 'Talented individuals working together to create exceptional digital experiences')}
              className="text-xl text-slate-600 max-w-3xl mx-auto whitespace-pre-wrap break-words"
              editable={editable}
              onChange={handleTextChange}
              as="p"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <div className="relative h-80">
                <EditableImage
                  eid="team_1_photo"
                  defaultSrc={getImage('team_1_photo', '')}
                  alt="Team Member"
                  className="w-full h-full object-cover"
                  editable={editable}
                  onChange={handleImageChange}
                  placeholderIcon={<span className="text-slate-400 text-6xl">👤</span>}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-6 text-center">
                <TiptapEditableText
                  eid="team_1_name"
                  defaultText={getText('team_1_name', 'Sarah Johnson')}
                  className="text-2xl font-bold text-slate-900 mb-2 whitespace-pre-wrap break-words"
                  editable={editable}
                  onChange={handleTextChange}
                  as="h3"
                />
                <TiptapEditableText
                  eid="team_1_role"
                  defaultText={getText('team_1_role', 'Creative Director')}
                  className="text-orange-500 font-semibold mb-3 whitespace-pre-wrap break-words"
                  editable={editable}
                  onChange={handleTextChange}
                  as="p"
                />
                <TiptapEditableText
                  eid="team_1_bio"
                  defaultText={getText('team_1_bio', '10+ years of experience in brand strategy and visual design')}
                  className="text-slate-600 text-sm whitespace-pre-wrap break-words"
                  editable={editable}
                  onChange={handleTextChange}
                  as="p"
                />
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <div className="relative h-80">
                <EditableImage
                  eid="team_2_photo"
                  defaultSrc={getImage('team_2_photo', '')}
                  alt="Team Member"
                  className="w-full h-full object-cover"
                  editable={editable}
                  onChange={handleImageChange}
                  placeholderIcon={<span className="text-slate-400 text-6xl">👤</span>}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-6 text-center">
                <TiptapEditableText
                  eid="team_2_name"
                  defaultText={getText('team_2_name', 'Michael Chen')}
                  className="text-2xl font-bold text-slate-900 mb-2 whitespace-pre-wrap break-words"
                  editable={editable}
                  onChange={handleTextChange}
                  as="h3"
                />
                <TiptapEditableText
                  eid="team_2_role"
                  defaultText={getText('team_2_role', 'Lead Developer')}
                  className="text-purple-500 font-semibold mb-3 whitespace-pre-wrap break-words"
                  editable={editable}
                  onChange={handleTextChange}
                  as="p"
                />
                <TiptapEditableText
                  eid="team_2_bio"
                  defaultText={getText('team_2_bio', 'Full-stack expert specializing in modern web technologies')}
                  className="text-slate-600 text-sm whitespace-pre-wrap break-words"
                  editable={editable}
                  onChange={handleTextChange}
                  as="p"
                />
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <div className="relative h-80">
                <EditableImage
                  eid="team_3_photo"
                  defaultSrc={getImage('team_3_photo', '')}
                  alt="Team Member"
                  className="w-full h-full object-cover"
                  editable={editable}
                  onChange={handleImageChange}
                  placeholderIcon={<span className="text-slate-400 text-6xl">👤</span>}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-6 text-center">
                <TiptapEditableText
                  eid="team_3_name"
                  defaultText={getText('team_3_name', 'Emily Rodriguez')}
                  className="text-2xl font-bold text-slate-900 mb-2 whitespace-pre-wrap break-words"
                  editable={editable}
                  onChange={handleTextChange}
                  as="h3"
                />
                <TiptapEditableText
                  eid="team_3_role"
                  defaultText={getText('team_3_role', 'Marketing Strategist')}
                  className="text-pink-500 font-semibold mb-3 whitespace-pre-wrap break-words"
                  editable={editable}
                  onChange={handleTextChange}
                  as="p"
                />
                <TiptapEditableText
                  eid="team_3_bio"
                  defaultText={getText('team_3_bio', 'Data-driven marketing expert with proven track record')}
                  className="text-slate-600 text-sm whitespace-pre-wrap break-words"
                  editable={editable}
                  onChange={handleTextChange}
                  as="p"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <TiptapEditableText
              eid="testimonials_heading"
              defaultText={getText('testimonials_heading', 'What Clients Say')}
              className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 whitespace-pre-wrap break-words"
              editable={editable}
              onChange={handleTextChange}
              as="h2"
            />
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-purple-500 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-orange-50 to-purple-50 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
              <TiptapEditableText
                eid="testimonial_1_text"
                defaultText={getText('testimonial_1_text', '"Working with this agency transformed our brand. Their creativity and professionalism exceeded all expectations."')}
                className="text-slate-700 mb-6 leading-relaxed italic whitespace-pre-wrap break-words"
                editable={editable}
                onChange={handleTextChange}
                as="p"
              />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div>
                  <TiptapEditableText
                    eid="testimonial_1_name"
                    defaultText={getText('testimonial_1_name', 'John Davis')}
                    className="font-bold text-slate-900 whitespace-pre-wrap break-words"
                    editable={editable}
                    onChange={handleTextChange}
                    as="h4"
                  />
                  <TiptapEditableText
                    eid="testimonial_1_company"
                    defaultText={getText('testimonial_1_company', 'CEO, TechStart Inc.')}
                    className="text-sm text-slate-600 whitespace-pre-wrap break-words"
                    editable={editable}
                    onChange={handleTextChange}
                    as="p"
                  />
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
              <TiptapEditableText
                eid="testimonial_2_text"
                defaultText={getText('testimonial_2_text', '"Incredible attention to detail and amazing results. Our website traffic increased by 300% in just 3 months!"')}
                className="text-slate-700 mb-6 leading-relaxed italic whitespace-pre-wrap break-words"
                editable={editable}
                onChange={handleTextChange}
                as="p"
              />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  SM
                </div>
                <div>
                  <TiptapEditableText
                    eid="testimonial_2_name"
                    defaultText={getText('testimonial_2_name', 'Sarah Martinez')}
                    className="font-bold text-slate-900 whitespace-pre-wrap break-words"
                    editable={editable}
                    onChange={handleTextChange}
                    as="h4"
                  />
                  <TiptapEditableText
                    eid="testimonial_2_company"
                    defaultText={getText('testimonial_2_company', 'Founder, StyleHub')}
                    className="text-sm text-slate-600 whitespace-pre-wrap break-words"
                    editable={editable}
                    onChange={handleTextChange}
                    as="p"
                  />
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
              <TiptapEditableText
                eid="testimonial_3_text"
                defaultText={getText('testimonial_3_text', '"Best decision we made for our business. The team is responsive, talented, and truly cares about results."')}
                className="text-slate-700 mb-6 leading-relaxed italic whitespace-pre-wrap break-words"
                editable={editable}
                onChange={handleTextChange}
                as="p"
              />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                  RK
                </div>
                <div>
                  <TiptapEditableText
                    eid="testimonial_3_name"
                    defaultText={getText('testimonial_3_name', 'Robert Kim')}
                    className="font-bold text-slate-900 whitespace-pre-wrap break-words"
                    editable={editable}
                    onChange={handleTextChange}
                    as="h4"
                  />
                  <TiptapEditableText
                    eid="testimonial_3_company"
                    defaultText={getText('testimonial_3_company', 'Director, GrowthLab')}
                    className="text-sm text-slate-600 whitespace-pre-wrap break-words"
                    editable={editable}
                    onChange={handleTextChange}
                    as="p"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <TiptapEditableText
            eid="contact_heading"
            defaultText={getText('contact_heading', "Let's Create Something Amazing")}
            className="text-5xl md:text-6xl font-bold mb-4 whitespace-pre-wrap break-words"
            editable={editable}
            onChange={handleTextChange}
            as="h2"
          />
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-purple-500 mx-auto mb-6"></div>
          <TiptapEditableText
            eid="contact_subheading"
            defaultText={getText('contact_subheading', 'Ready to bring your vision to life? Get in touch with our team today and start your journey to digital excellence.')}
            className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto whitespace-pre-wrap break-words"
            editable={editable}
            onChange={handleTextChange}
            as="p"
          />
          <div className="flex gap-4 justify-center mb-12">
            <EditableButton
              eid="contact_cta_primary"
              defaultText={getButton('contact_cta_primary', 'Contact Us', '#').text}
              defaultUrl={getButton('contact_cta_primary', 'Contact Us', '#').url}
              className="px-10 py-5 bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 text-white rounded-full text-xl font-semibold transition-all shadow-xl hover:scale-105"
              editable={editable}
              onChange={onContentChange}
            />
            <EditableButton
              eid="contact_cta_secondary"
              defaultText={getButton('contact_cta_secondary', 'Schedule Call', '#').text}
              defaultUrl={getButton('contact_cta_secondary', 'Schedule Call', '#').url}
              className="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-xl font-semibold transition-all"
              editable={editable}
              onChange={onContentChange}
            />
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-4xl mb-3">📧</div>
              <TiptapEditableText
                eid="contact_email_label"
                defaultText={getText('contact_email_label', 'Email Us')}
                className="font-semibold mb-2 whitespace-pre-wrap break-words"
                editable={editable}
                onChange={handleTextChange}
                as="h3"
              />
              <TiptapEditableText
                eid="contact_email"
                defaultText={getText('contact_email', 'hello@agency.com')}
                className="text-slate-300 whitespace-pre-wrap break-words"
                editable={editable}
                onChange={handleTextChange}
                as="p"
              />
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-4xl mb-3">📱</div>
              <TiptapEditableText
                eid="contact_phone_label"
                defaultText={getText('contact_phone_label', 'Call Us')}
                className="font-semibold mb-2 whitespace-pre-wrap break-words"
                editable={editable}
                onChange={handleTextChange}
                as="h3"
              />
              <TiptapEditableText
                eid="contact_phone"
                defaultText={getText('contact_phone', '+1 (555) 123-4567')}
                className="text-slate-300 whitespace-pre-wrap break-words"
                editable={editable}
                onChange={handleTextChange}
                as="p"
              />
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-4xl mb-3">📍</div>
              <TiptapEditableText
                eid="contact_location_label"
                defaultText={getText('contact_location_label', 'Visit Us')}
                className="font-semibold mb-2 whitespace-pre-wrap break-words"
                editable={editable}
                onChange={handleTextChange}
                as="h3"
              />
              <TiptapEditableText
                eid="contact_location"
                defaultText={getText('contact_location', 'San Francisco, CA')}
                className="text-slate-300 whitespace-pre-wrap break-words"
                editable={editable}
                onChange={handleTextChange}
                as="p"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <TiptapEditableText
                eid="footer_brand"
                defaultText={getText('footer_brand', 'Creative Agency')}
                className="text-2xl font-bold mb-4 whitespace-pre-wrap break-words"
                editorClassName="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent"
                editable={editable}
                onChange={handleTextChange}
                as="h3"
              />
              <TiptapEditableText
                eid="footer_tagline"
                defaultText={getText('footer_tagline', 'Crafting digital experiences that inspire and engage.')}
                className="text-slate-400 text-sm whitespace-pre-wrap break-words"
                editable={editable}
                onChange={handleTextChange}
                as="p"
              />
            </div>
            <div>
              <TiptapEditableText
                eid="footer_services_title"
                defaultText={getText('footer_services_title', 'Services')}
                className="font-bold mb-4 whitespace-pre-wrap break-words"
                editable={editable}
                onChange={handleTextChange}
                as="h4"
              />
              <ul className="space-y-2 text-slate-400 text-sm">
                <TiptapEditableText
                  eid="footer_service_1"
                  defaultText={getText('footer_service_1', 'Brand Identity')}
                  className=""
                  editable={editable}
                  onChange={handleTextChange}
                  as="li"
                />
                <TiptapEditableText
                  eid="footer_service_2"
                  defaultText={getText('footer_service_2', 'Web Development')}
                  className=""
                  editable={editable}
                  onChange={handleTextChange}
                  as="li"
                />
                <TiptapEditableText
                  eid="footer_service_3"
                  defaultText={getText('footer_service_3', 'Mobile Apps')}
                  className=""
                  editable={editable}
                  onChange={handleTextChange}
                  as="li"
                />
                <TiptapEditableText
                  eid="footer_service_4"
                  defaultText={getText('footer_service_4', 'Digital Marketing')}
                  className=""
                  editable={editable}
                  onChange={handleTextChange}
                  as="li"
                />
              </ul>
            </div>
            <div>
              <TiptapEditableText
                eid="footer_company_title"
                defaultText={getText('footer_company_title', 'Company')}
                className="font-bold mb-4 whitespace-pre-wrap break-words"
                editable={editable}
                onChange={handleTextChange}
                as="h4"
              />
              <ul className="space-y-2 text-slate-400 text-sm">
                <TiptapEditableText
                  eid="footer_link_1"
                  defaultText={getText('footer_link_1', 'About Us')}
                  className=""
                  editable={editable}
                  onChange={handleTextChange}
                  as="li"
                />
                <TiptapEditableText
                  eid="footer_link_2"
                  defaultText={getText('footer_link_2', 'Careers')}
                  className=""
                  editable={editable}
                  onChange={handleTextChange}
                  as="li"
                />
                <TiptapEditableText
                  eid="footer_link_3"
                  defaultText={getText('footer_link_3', 'Blog')}
                  className=""
                  editable={editable}
                  onChange={handleTextChange}
                  as="li"
                />
                <TiptapEditableText
                  eid="footer_link_4"
                  defaultText={getText('footer_link_4', 'Contact')}
                  className=""
                  editable={editable}
                  onChange={handleTextChange}
                  as="li"
                />
              </ul>
            </div>
            <div>
              <TiptapEditableText
                eid="footer_social_title"
                defaultText={getText('footer_social_title', 'Follow Us')}
                className="font-bold mb-4"
                editable={editable}
                onChange={handleTextChange}
                as="h4"
              />
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                  <span>📘</span>
                </div>
                <div className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                  <span>🐦</span>
                </div>
                <div className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                  <span>📷</span>
                </div>
                <div className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                  <span>💼</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center">
            <TiptapEditableText
              eid="footer_copyright"
              defaultText={getText('footer_copyright', '© 2024 Creative Agency. All rights reserved.')}
              className="text-slate-400 text-sm"
              editable={editable}
              onChange={handleTextChange}
              as="p"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
