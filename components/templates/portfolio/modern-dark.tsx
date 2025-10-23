'use client';

import React, { useState, useEffect } from 'react';
import { EditableImage } from '@/components/editor/editable-image';
import { EditableButton } from '@/components/editor/editable-button';
import { BaseTemplateProps } from '@/types/template';

interface PortfolioProps extends BaseTemplateProps {
  onContentChange?: (eid: string, value: unknown) => void;
}

export default function PortfolioModernDark({ editable = false, data = {}, onContentChange }: PortfolioProps) {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
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

  const handleImageChange = (eid: string, imageUrl: string) => {
    if (onContentChange) {
      onContentChange(eid, { image: imageUrl });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div
              data-eid="nav_logo"
              contentEditable={editable}
              suppressContentEditableWarning
              onBlur={(e) => handleTextChange('nav_logo', e.currentTarget.textContent || '')}
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              {getText('nav_logo', 'JD')}
            </div>
            <div className="hidden md:flex gap-8">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors hover:text-cyan-400 ${
                    activeSection === item.toLowerCase() ? 'text-cyan-400' : 'text-slate-300'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div
                data-eid="hero_greeting"
                contentEditable={editable}
                suppressContentEditableWarning
                onBlur={(e) => handleTextChange('hero_greeting', e.currentTarget.textContent || '')}
                className="text-cyan-400 text-lg font-medium"
              >
                {getText('hero_greeting', 'Hi, my name is')}
              </div>
              <h1
                data-eid="hero_name"
                contentEditable={editable}
                suppressContentEditableWarning
                onBlur={(e) => handleTextChange('hero_name', e.currentTarget.textContent || '')}
                className="text-6xl md:text-7xl font-bold"
              >
                {getText('hero_name', 'John Doe')}
              </h1>
              <h2
                data-eid="hero_title"
                contentEditable={editable}
                suppressContentEditableWarning
                onBlur={(e) => handleTextChange('hero_title', e.currentTarget.textContent || '')}
                className="text-4xl md:text-5xl font-bold text-slate-400"
              >
                {getText('hero_title', 'Full Stack Developer')}
              </h2>
              <p
                data-eid="hero_description"
                contentEditable={editable}
                suppressContentEditableWarning
                onBlur={(e) => handleTextChange('hero_description', e.currentTarget.textContent || '')}
                className="text-lg text-slate-400 max-w-xl"
              >
                {getText('hero_description', 'I build exceptional digital experiences that live on the web. Specialized in creating responsive, user-friendly applications with modern technologies.')}
              </p>
              <div className="flex gap-4">
                <EditableButton
                  eid="hero_cta_primary"
                  defaultText={getButton('hero_cta_primary', 'View My Work', '#projects').text}
                  defaultUrl={getButton('hero_cta_primary', 'View My Work', '#projects').url}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                  editable={editable}
                  onChange={onContentChange}
                />
                <EditableButton
                  eid="hero_cta_secondary"
                  defaultText={getButton('hero_cta_secondary', 'Contact Me', '#contact').text}
                  defaultUrl={getButton('hero_cta_secondary', 'Contact Me', '#contact').url}
                  className="px-8 py-4 border-2 border-cyan-500 rounded-lg font-semibold hover:bg-cyan-500/10 transition-all"
                  editable={editable}
                  onChange={onContentChange}
                />
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl opacity-20"></div>
              <EditableImage
                eid="hero_image"
                defaultSrc={getImage('hero_image', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop')}
                alt="Profile"
                className="relative rounded-2xl w-full h-auto shadow-2xl"
                editable={editable}
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2
            data-eid="about_title"
            contentEditable={editable}
            suppressContentEditableWarning
            onBlur={(e) => handleTextChange('about_title', e.currentTarget.textContent || '')}
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
          >
            {getText('about_title', 'About Me')}
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p
                data-eid="about_description"
                contentEditable={editable}
                suppressContentEditableWarning
                onBlur={(e) => handleTextChange('about_description', e.currentTarget.textContent || '')}
                className="text-slate-300 text-lg leading-relaxed"
              >
                {getText('about_description', 'Hello! I\'m John, a passionate full-stack developer based in San Francisco. I enjoy creating things that live on the internet, whether that be websites, applications, or anything in between. My focus is on building accessible, inclusive products and digital experiences for a variety of clients.')}
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-2xl opacity-20"></div>
              <EditableImage
                eid="about_image"
                defaultSrc={getImage('about_image', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop')}
                alt="About"
                className="relative rounded-2xl w-full h-auto shadow-2xl"
                editable={editable}
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <h2
            data-eid="projects_title"
            contentEditable={editable}
            suppressContentEditableWarning
            onBlur={(e) => handleTextChange('projects_title', e.currentTarget.textContent || '')}
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
          >
            {getText('projects_title', 'Featured Projects')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="group relative bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-500 transition-all">
                <EditableImage
                  eid={`project${num}_image`}
                  defaultSrc={getImage(`project${num}_image`, `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop`)}
                  alt={`Project ${num}`}
                  className="w-full h-64 object-cover"
                  editable={editable}
                  onChange={handleImageChange}
                />
                <div className="p-6 space-y-4">
                  <h3
                    data-eid={`project${num}_title`}
                    contentEditable={editable}
                    suppressContentEditableWarning
                    onBlur={(e) => handleTextChange(`project${num}_title`, e.currentTarget.textContent || '')}
                    className="text-2xl font-bold"
                  >
                    {getText(`project${num}_title`, `Project ${num}`)}
                  </h3>
                  <p
                    data-eid={`project${num}_description`}
                    contentEditable={editable}
                    suppressContentEditableWarning
                    onBlur={(e) => handleTextChange(`project${num}_description`, e.currentTarget.textContent || '')}
                    className="text-slate-400"
                  >
                    {getText(`project${num}_description`, 'A full-stack project with modern technologies.')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2
            data-eid="skills_title"
            contentEditable={editable}
            suppressContentEditableWarning
            onBlur={(e) => handleTextChange('skills_title', e.currentTarget.textContent || '')}
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
          >
            {getText('skills_title', 'Skills & Technologies')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
                <h3
                  data-eid={`skill${num}_title`}
                  contentEditable={editable}
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextChange(`skill${num}_title`, e.currentTarget.textContent || '')}
                  className="text-2xl font-bold mb-4"
                >
                  {getText(`skill${num}_title`, `Skill ${num}`)}
                </h3>
                <p
                  data-eid={`skill${num}_description`}
                  contentEditable={editable}
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextChange(`skill${num}_description`, e.currentTarget.textContent || '')}
                  className="text-slate-400"
                >
                  {getText(`skill${num}_description`, 'Technologies and tools')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-slate-900/50">
        <div className="container mx-auto max-w-2xl text-center">
          <h2
            data-eid="contact_title"
            contentEditable={editable}
            suppressContentEditableWarning
            onBlur={(e) => handleTextChange('contact_title', e.currentTarget.textContent || '')}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            {getText('contact_title', 'Get In Touch')}
          </h2>
          <p
            data-eid="contact_description"
            contentEditable={editable}
            suppressContentEditableWarning
            onBlur={(e) => handleTextChange('contact_description', e.currentTarget.textContent || '')}
            className="text-slate-400 text-lg mb-8"
          >
            {getText('contact_description', 'I\'m currently looking for new opportunities. Whether you have a question or just want to say hi, I\'ll try my best to get back to you!')}
          </p>
          <EditableButton
            eid="contact_cta"
            defaultText={getButton('contact_cta', 'Say Hello', 'mailto:hello@example.com').text}
            defaultUrl={getButton('contact_cta', 'Say Hello', 'mailto:hello@example.com').url}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            editable={editable}
            onChange={onContentChange}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800">
        <div className="container mx-auto text-center">
          <p
            data-eid="footer_text"
            contentEditable={editable}
            suppressContentEditableWarning
            onBlur={(e) => handleTextChange('footer_text', e.currentTarget.textContent || '')}
            className="text-slate-400"
          >
            {getText('footer_text', '© 2025 John Doe. All rights reserved.')}
          </p>
        </div>
      </footer>
    </div>
  );
}
