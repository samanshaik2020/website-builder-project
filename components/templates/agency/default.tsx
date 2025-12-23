'use client';

import React, { useState, useEffect } from 'react';
import { EditableImage } from '@/components/editor/editable-image';
import { EditableButton } from '@/components/editor/editable-button';
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
            <h1
              data-eid="nav_logo"
              contentEditable={editable}
              suppressContentEditableWarning
              className={`text-2xl font-bold transition-colors ${scrollY > 50 ? 'bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent' : 'text-white'} whitespace-pre-wrap break-words`}
            >
              {getText('nav_logo', 'Creative Agency')}
            </h1>
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
            <span
              data-eid="hero_badge"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-sm text-orange-200 whitespace-pre-wrap break-words"
            >
              {getText('hero_badge', '🎨 Award-Winning Agency')}
            </span>
          </div>
          <h1
            data-eid="hero_headline"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent whitespace-pre-wrap break-words"
          >
            {getText('hero_headline', 'Creative Agency')}
          </h1>
          <p
            data-eid="hero_tagline"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-2xl md:text-3xl text-slate-300 mb-10 max-w-3xl mx-auto whitespace-pre-wrap break-words"
          >
            {getText('hero_tagline', 'We craft digital experiences that inspire and engage')}
          </p>
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
            <h2
              data-eid="services_heading"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 whitespace-pre-wrap break-words"
            >
              {getText('services_heading', 'Our Services')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-purple-500 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Service 1 */}
            <div className="group p-8 bg-gradient-to-br from-orange-50 to-purple-50 rounded-2xl hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🎨</span>
              </div>
              <h3
                data-eid="service_1_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-2xl font-bold text-slate-900 mb-4 whitespace-pre-wrap break-words"
              >
                {getText('service_1_title', 'Brand Identity')}
              </h3>
              <p
                data-eid="service_1_description"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-slate-600 leading-relaxed whitespace-pre-wrap break-words"
              >
                {getText('service_1_description', 'Create a memorable brand that stands out with custom logos, color palettes, and visual guidelines.')}
              </p>
            </div>

            {/* Service 2 */}
            <div className="group p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">💻</span>
              </div>
              <h3
                data-eid="service_2_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-2xl font-bold text-slate-900 mb-4 whitespace-pre-wrap break-words"
              >
                {getText('service_2_title', 'Web Development')}
              </h3>
              <p
                data-eid="service_2_description"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-slate-600 leading-relaxed whitespace-pre-wrap break-words"
              >
                {getText('service_2_description', 'Build fast, responsive websites with modern technologies and best practices for optimal performance.')}
              </p>
            </div>

            {/* Service 3 */}
            <div className="group p-8 bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">📱</span>
              </div>
              <h3
                data-eid="service_3_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-2xl font-bold text-slate-900 mb-4 whitespace-pre-wrap break-words"
              >
                {getText('service_3_title', 'Mobile Apps')}
              </h3>
              <p
                data-eid="service_3_description"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-slate-600 leading-relaxed whitespace-pre-wrap break-words"
              >
                {getText('service_3_description', 'Design and develop native and cross-platform mobile applications that users love.')}
              </p>
            </div>

            {/* Service 4 */}
            <div className="group p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">📊</span>
              </div>
              <h3
                data-eid="service_4_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-2xl font-bold text-slate-900 mb-4 whitespace-pre-wrap break-words"
              >
                {getText('service_4_title', 'Digital Marketing')}
              </h3>
              <p
                data-eid="service_4_description"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-slate-600 leading-relaxed whitespace-pre-wrap break-words"
              >
                {getText('service_4_description', 'Grow your business with data-driven marketing strategies and campaigns that deliver results.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              data-eid="portfolio_heading"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-5xl md:text-6xl font-bold mb-4 whitespace-pre-wrap break-words"
            >
              {getText('portfolio_heading', 'Featured Work')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-purple-500 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Portfolio Item 1 */}
            <div className="group relative h-80 bg-gradient-to-br from-orange-500 to-purple-500 rounded-2xl overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <h3
                  data-eid="portfolio_1_title"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-3xl font-bold text-white whitespace-pre-wrap break-words"
                >
                  {getText('portfolio_1_title', 'Brand Redesign')}
                </h3>
              </div>
            </div>

            {/* Portfolio Item 2 */}
            <div className="group relative h-80 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <h3
                  data-eid="portfolio_2_title"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-3xl font-bold text-white whitespace-pre-wrap break-words"
                >
                  {getText('portfolio_2_title', 'E-commerce Site')}
                </h3>
              </div>
            </div>

            {/* Portfolio Item 3 */}
            <div className="group relative h-80 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <h3
                  data-eid="portfolio_3_title"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-3xl font-bold text-white whitespace-pre-wrap break-words"
                >
                  {getText('portfolio_3_title', 'Mobile App')}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              data-eid="team_heading"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 whitespace-pre-wrap break-words"
            >
              {getText('team_heading', 'Meet Our Team')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-purple-500 mx-auto mb-4"></div>
            <p
              data-eid="team_description"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-xl text-slate-600 max-w-3xl mx-auto whitespace-pre-wrap break-words"
            >
              {getText('team_description', 'Talented individuals working together to create exceptional digital experiences')}
            </p>
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
                <h3
                  data-eid="team_1_name"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-2xl font-bold text-slate-900 mb-2 whitespace-pre-wrap break-words"
                >
                  {getText('team_1_name', 'Sarah Johnson')}
                </h3>
                <p
                  data-eid="team_1_role"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-orange-500 font-semibold mb-3 whitespace-pre-wrap break-words"
                >
                  {getText('team_1_role', 'Creative Director')}
                </p>
                <p
                  data-eid="team_1_bio"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-slate-600 text-sm whitespace-pre-wrap break-words"
                >
                  {getText('team_1_bio', '10+ years of experience in brand strategy and visual design')}
                </p>
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
                <h3
                  data-eid="team_2_name"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-2xl font-bold text-slate-900 mb-2 whitespace-pre-wrap break-words"
                >
                  {getText('team_2_name', 'Michael Chen')}
                </h3>
                <p
                  data-eid="team_2_role"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-purple-500 font-semibold mb-3 whitespace-pre-wrap break-words"
                >
                  {getText('team_2_role', 'Lead Developer')}
                </p>
                <p
                  data-eid="team_2_bio"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-slate-600 text-sm whitespace-pre-wrap break-words"
                >
                  {getText('team_2_bio', 'Full-stack expert specializing in modern web technologies')}
                </p>
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
                <h3
                  data-eid="team_3_name"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-2xl font-bold text-slate-900 mb-2 whitespace-pre-wrap break-words"
                >
                  {getText('team_3_name', 'Emily Rodriguez')}
                </h3>
                <p
                  data-eid="team_3_role"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-pink-500 font-semibold mb-3 whitespace-pre-wrap break-words"
                >
                  {getText('team_3_role', 'Marketing Strategist')}
                </p>
                <p
                  data-eid="team_3_bio"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-slate-600 text-sm whitespace-pre-wrap break-words"
                >
                  {getText('team_3_bio', 'Data-driven marketing expert with proven track record')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              data-eid="testimonials_heading"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 whitespace-pre-wrap break-words"
            >
              {getText('testimonials_heading', 'What Clients Say')}
            </h2>
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
              <p
                data-eid="testimonial_1_text"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-slate-700 mb-6 leading-relaxed italic whitespace-pre-wrap break-words"
              >
                {getText('testimonial_1_text', '"Working with this agency transformed our brand. Their creativity and professionalism exceeded all expectations."')}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div>
                  <h4
                    data-eid="testimonial_1_name"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="font-bold text-slate-900 whitespace-pre-wrap break-words"
                  >
                    {getText('testimonial_1_name', 'John Davis')}
                  </h4>
                  <p
                    data-eid="testimonial_1_company"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-sm text-slate-600 whitespace-pre-wrap break-words"
                  >
                    {getText('testimonial_1_company', 'CEO, TechStart Inc.')}
                  </p>
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
              <p
                data-eid="testimonial_2_text"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-slate-700 mb-6 leading-relaxed italic whitespace-pre-wrap break-words"
              >
                {getText('testimonial_2_text', '"Incredible attention to detail and amazing results. Our website traffic increased by 300% in just 3 months!"')}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  SM
                </div>
                <div>
                  <h4
                    data-eid="testimonial_2_name"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="font-bold text-slate-900 whitespace-pre-wrap break-words"
                  >
                    {getText('testimonial_2_name', 'Sarah Martinez')}
                  </h4>
                  <p
                    data-eid="testimonial_2_company"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-sm text-slate-600 whitespace-pre-wrap break-words"
                  >
                    {getText('testimonial_2_company', 'Founder, StyleHub')}
                  </p>
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
              <p
                data-eid="testimonial_3_text"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-slate-700 mb-6 leading-relaxed italic whitespace-pre-wrap break-words"
              >
                {getText('testimonial_3_text', '"Best decision we made for our business. The team is responsive, talented, and truly cares about results."')}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                  RK
                </div>
                <div>
                  <h4
                    data-eid="testimonial_3_name"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="font-bold text-slate-900 whitespace-pre-wrap break-words"
                  >
                    {getText('testimonial_3_name', 'Robert Kim')}
                  </h4>
                  <p
                    data-eid="testimonial_3_company"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-sm text-slate-600 whitespace-pre-wrap break-words"
                  >
                    {getText('testimonial_3_company', 'Director, GrowthLab')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            data-eid="contact_heading"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-5xl md:text-6xl font-bold mb-4 whitespace-pre-wrap break-words"
          >
            {getText('contact_heading', "Let's Create Something Amazing")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-purple-500 mx-auto mb-6"></div>
          <p
            data-eid="contact_subheading"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto whitespace-pre-wrap break-words"
          >
            {getText('contact_subheading', 'Ready to bring your vision to life? Get in touch with our team today and start your journey to digital excellence.')}
          </p>
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
              <h3
                data-eid="contact_email_label"
                contentEditable={editable}
                suppressContentEditableWarning
                className="font-semibold mb-2 whitespace-pre-wrap break-words"
              >
                {getText('contact_email_label', 'Email Us')}
              </h3>
              <p
                data-eid="contact_email"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-slate-300 whitespace-pre-wrap break-words"
              >
                {getText('contact_email', 'hello@agency.com')}
              </p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-4xl mb-3">📱</div>
              <h3
                data-eid="contact_phone_label"
                contentEditable={editable}
                suppressContentEditableWarning
                className="font-semibold mb-2 whitespace-pre-wrap break-words"
              >
                {getText('contact_phone_label', 'Call Us')}
              </h3>
              <p
                data-eid="contact_phone"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-slate-300 whitespace-pre-wrap break-words"
              >
                {getText('contact_phone', '+1 (555) 123-4567')}
              </p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-4xl mb-3">📍</div>
              <h3
                data-eid="contact_location_label"
                contentEditable={editable}
                suppressContentEditableWarning
                className="font-semibold mb-2 whitespace-pre-wrap break-words"
              >
                {getText('contact_location_label', 'Visit Us')}
              </h3>
              <p
                data-eid="contact_location"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-slate-300 whitespace-pre-wrap break-words"
              >
                {getText('contact_location', 'San Francisco, CA')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3
                data-eid="footer_brand"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent mb-4 whitespace-pre-wrap break-words"
              >
                {getText('footer_brand', 'Creative Agency')}
              </h3>
              <p
                data-eid="footer_tagline"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-slate-400 text-sm whitespace-pre-wrap break-words"
              >
                {getText('footer_tagline', 'Crafting digital experiences that inspire and engage.')}
              </p>
            </div>
            <div>
              <h4
                data-eid="footer_services_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="font-bold mb-4 whitespace-pre-wrap break-words"
              >
                {getText('footer_services_title', 'Services')}
              </h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li
                  data-eid="footer_service_1"
                  contentEditable={editable}
                  suppressContentEditableWarning
                >
                  {getText('footer_service_1', 'Brand Identity')}
                </li>
                <li
                  data-eid="footer_service_2"
                  contentEditable={editable}
                  suppressContentEditableWarning
                >
                  {getText('footer_service_2', 'Web Development')}
                </li>
                <li
                  data-eid="footer_service_3"
                  contentEditable={editable}
                  suppressContentEditableWarning
                >
                  {getText('footer_service_3', 'Mobile Apps')}
                </li>
                <li
                  data-eid="footer_service_4"
                  contentEditable={editable}
                  suppressContentEditableWarning
                >
                  {getText('footer_service_4', 'Digital Marketing')}
                </li>
              </ul>
            </div>
            <div>
              <h4
                data-eid="footer_company_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="font-bold mb-4 whitespace-pre-wrap break-words"
              >
                {getText('footer_company_title', 'Company')}
              </h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li
                  data-eid="footer_link_1"
                  contentEditable={editable}
                  suppressContentEditableWarning
                >
                  {getText('footer_link_1', 'About Us')}
                </li>
                <li
                  data-eid="footer_link_2"
                  contentEditable={editable}
                  suppressContentEditableWarning
                >
                  {getText('footer_link_2', 'Careers')}
                </li>
                <li
                  data-eid="footer_link_3"
                  contentEditable={editable}
                  suppressContentEditableWarning
                >
                  {getText('footer_link_3', 'Blog')}
                </li>
                <li
                  data-eid="footer_link_4"
                  contentEditable={editable}
                  suppressContentEditableWarning
                >
                  {getText('footer_link_4', 'Contact')}
                </li>
              </ul>
            </div>
            <div>
              <h4
                data-eid="footer_social_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="font-bold mb-4"
              >
                {getText('footer_social_title', 'Follow Us')}
              </h4>
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
            <p
              data-eid="footer_copyright"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-slate-400 text-sm"
            >
              {getText('footer_copyright', '© 2024 Creative Agency. All rights reserved.')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
