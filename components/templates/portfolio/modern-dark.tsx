'use client';

import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/editor/editable-image';
import { EditableButton } from '@/components/editor/editable-button';
import { TiptapEditableText } from '@/components/editor/tiptap-editable-text';
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

  const handleImageChange = (eid: string, data: { image: string; linkUrl?: string | undefined }) => {
    if (onContentChange) {
      onContentChange(eid, data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <TiptapEditableText
              eid="nav_logo"
              defaultText={getText('nav_logo', 'JD')}
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
              editable={editable}
              onChange={handleTextChange}
              as="div"
            />
            <div className="hidden md:flex gap-8">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors hover:text-cyan-400 ${activeSection === item.toLowerCase() ? 'text-cyan-400' : 'text-slate-300'
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
              <TiptapEditableText
                eid="hero_greeting"
                defaultText={getText('hero_greeting', 'Hi, my name is')}
                className="text-cyan-400 text-lg font-medium"
                editable={editable}
                onChange={handleTextChange}
                as="div"
              />
              <TiptapEditableText
                eid="hero_name"
                defaultText={getText('hero_name', 'John Doe')}
                className="text-6xl md:text-7xl font-bold"
                editable={editable}
                onChange={handleTextChange}
                as="h1"
              />
              <TiptapEditableText
                eid="hero_title"
                defaultText={getText('hero_title', 'Full Stack Developer')}
                className="text-4xl md:text-5xl font-bold text-slate-400"
                editable={editable}
                onChange={handleTextChange}
                as="h2"
              />
              <TiptapEditableText
                eid="hero_description"
                defaultText={getText('hero_description', 'I build exceptional digital experiences that live on the web. Specialized in creating responsive, user-friendly applications with modern technologies.')}
                className="text-lg text-slate-400 max-w-xl"
                editable={editable}
                onChange={handleTextChange}
                as="div"
              />
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
          <TiptapEditableText
            eid="about_title"
            defaultText={getText('about_title', 'About Me')}
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
            editable={editable}
            onChange={handleTextChange}
            as="h2"
          />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <TiptapEditableText
                eid="about_description"
                defaultText={getText('about_description', 'Hello! I\'m John, a passionate full-stack developer based in San Francisco. I enjoy creating things that live on the internet, whether that be websites, applications, or anything in between. My focus is on building accessible, inclusive products and digital experiences for a variety of clients.')}
                className="text-slate-300 text-lg leading-relaxed"
                editable={editable}
                onChange={handleTextChange}
                as="div"
              />
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
          <TiptapEditableText
            eid="projects_title"
            defaultText={getText('projects_title', 'Featured Projects')}
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
            editable={editable}
            onChange={handleTextChange}
            as="h2"
          />
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
                  <TiptapEditableText
                    eid={`project${num}_title`}
                    defaultText={getText(`project${num}_title`, `Project ${num}`)}
                    className="text-2xl font-bold"
                    editable={editable}
                    onChange={handleTextChange}
                    as="h3"
                  />
                  <TiptapEditableText
                    eid={`project${num}_description`}
                    defaultText={getText(`project${num}_description`, 'A full-stack project with modern technologies.')}
                    className="text-slate-400"
                    editable={editable}
                    onChange={handleTextChange}
                    as="div"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <TiptapEditableText
            eid="skills_title"
            defaultText={getText('skills_title', 'Skills & Technologies')}
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
            editable={editable}
            onChange={handleTextChange}
            as="h2"
          />
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
                <TiptapEditableText
                  eid={`skill${num}_title`}
                  defaultText={getText(`skill${num}_title`, `Skill ${num}`)}
                  className="text-2xl font-bold mb-4"
                  editable={editable}
                  onChange={handleTextChange}
                  as="h3"
                />
                <TiptapEditableText
                  eid={`skill${num}_description`}
                  defaultText={getText(`skill${num}_description`, 'Technologies and tools')}
                  className="text-slate-400"
                  editable={editable}
                  onChange={handleTextChange}
                  as="div"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-slate-900/50">
        <div className="container mx-auto max-w-2xl text-center">
          <TiptapEditableText
            eid="contact_title"
            defaultText={getText('contact_title', 'Get In Touch')}
            className="text-4xl md:text-5xl font-bold mb-6"
            editable={editable}
            onChange={handleTextChange}
            as="h2"
          />
          <TiptapEditableText
            eid="contact_description"
            defaultText={getText('contact_description', 'I\'m currently looking for new opportunities. Whether you have a question or just want to say hi, I\'ll try my best to get back to you!')}
            className="text-slate-400 text-lg mb-8"
            editable={editable}
            onChange={handleTextChange}
            as="div"
          />
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
          <TiptapEditableText
            eid="footer_text"
            defaultText={getText('footer_text', '© 2025 John Doe. All rights reserved.')}
            className="text-slate-400"
            editable={editable}
            onChange={handleTextChange}
            as="div"
          />
        </div>
      </footer>
    </div>
  );
}
