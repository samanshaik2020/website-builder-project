'use client';

import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/editor/editable-image';
import { EditableButton } from '@/components/editor/editable-button';
import { TiptapEditableText } from '@/components/editor/tiptap-editable-text';
import { BaseTemplateProps } from '@/types/template';

interface PortfolioProps extends BaseTemplateProps {
  onContentChange?: (eid: string, value: unknown) => void;
}

export default function Portfolio({ editable = false, data = {}, onContentChange }: PortfolioProps) {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      const sections = ['home', 'about', 'projects', 'resume', 'testimonials', 'contact'];
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

  const getImageLink = (id: string) => {
    return data[id]?.linkUrl || '';
  };

  const getButton = (id: string, defaultText: string, defaultUrl: string) => {
    return {
      text: data[id]?.button?.text || defaultText,
      url: data[id]?.button?.url || defaultUrl,
    };
  };

  const handleImageChange = (eid: string, imageData: { image: string; linkUrl?: string | undefined }) => {
    if (onContentChange) {
      onContentChange(eid, imageData);
    }
  };

  const handleTextChange = (eid: string, value: string) => {
    if (onContentChange) {
      onContentChange(eid, { text: value });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Navigation - Hidden in edit mode */}
      {/* Fixed Navigation */}
      <nav className={`fixed left-0 right-0 z-40 transition-all duration-300 ${editable ? 'top-16' : 'top-0'} ${scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-slate-900/80 backdrop-blur-md'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <TiptapEditableText
              eid="nav_logo"
              defaultText={getText('nav_logo', 'Portfolio')}
              className={`text-2xl font-bold transition-colors ${scrollY > 50 ? 'text-slate-900' : 'text-white'}`}
              editable={editable}
              onChange={handleTextChange}
              as="h1"
            />
            <div className="flex gap-6 items-center">
              {['Home', 'About', 'Projects', 'Resume', 'Testimonials', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors hover:text-purple-400 px-3 py-2 rounded-lg ${scrollY > 50 ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
                    } ${activeSection === item.toLowerCase() ? 'text-purple-600 bg-purple-50' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>


      {/* Hero/Landing Section */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-left space-y-6" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
            <div className="inline-block px-4 py-2 bg-purple-600/30 backdrop-blur-sm rounded-full border border-purple-400/30">
              <TiptapEditableText
                eid="hero_badge"
                defaultText={getText('hero_badge', '👋 Welcome to my portfolio')}
                className="text-sm text-purple-200"
                editable={editable}
                onChange={handleTextChange}
                as="span"
              />
            </div>
            <TiptapEditableText
              eid="hero_name"
              defaultText={getText('hero_name', 'John Doe')}
              className="text-6xl md:text-7xl font-bold mb-4 text-white"
              editable={editable}
              onChange={handleTextChange}
              as="h1"
            />
            <TiptapEditableText
              eid="hero_title"
              defaultText={getText('hero_title', 'Full Stack Developer & Designer')}
              className="text-3xl md:text-4xl text-purple-300 font-semibold"
              editable={editable}
              onChange={handleTextChange}
              as="h2"
            />
            <TiptapEditableText
              eid="hero_description"
              defaultText={getText('hero_description', 'I create beautiful, functional websites and applications that help businesses grow. With a passion for clean code and elegant design, I turn ideas into digital experiences.')}
              className="text-lg text-slate-300 leading-relaxed max-w-xl"
              editable={editable}
              onChange={handleTextChange}
              as="p"
            />
            <div className="flex gap-4 pt-4">
              <EditableButton
                eid="hero_cta_primary"
                defaultText={getButton('hero_cta_primary', 'View My Work', '#projects').text}
                defaultUrl={getButton('hero_cta_primary', 'View My Work', '#projects').url}
                className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 hover:shadow-xl"
                editable={editable}
                onChange={onContentChange}
              />
              <EditableButton
                eid="hero_cta_secondary"
                defaultText={getButton('hero_cta_secondary', 'Contact Me', '#contact').text}
                defaultUrl={getButton('hero_cta_secondary', 'Contact Me', '#contact').url}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-lg font-semibold transition-all"
                editable={editable}
                onChange={onContentChange}
              />
            </div>
          </div>

          <div className="flex justify-center" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <EditableImage
                eid="hero_photo"
                defaultSrc={getImage('hero_photo', '')}
                defaultLinkUrl={getImageLink('hero_photo')}
                alt="Professional Photo"
                className="relative w-80 h-80 rounded-full object-cover border-4 border-white/20 shadow-2xl"
                editable={editable}
                onChange={handleImageChange}
                placeholderIcon={<span className="text-white text-6xl">👤</span>}
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <TiptapEditableText
              eid="about_heading"
              defaultText={getText('about_heading', 'About Me')}
              className="text-5xl md:text-6xl font-bold text-slate-900 mb-4"
              editable={editable}
              onChange={handleTextChange}
              as="h2"
            />
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
            <div className="space-y-6">
              <TiptapEditableText
                eid="about_story_title"
                defaultText={getText('about_story_title', 'My Professional Story')}
                className="text-3xl font-bold text-slate-900"
                editable={editable}
                onChange={handleTextChange}
                as="h3"
              />
              <TiptapEditableText
                eid="about_story_p1"
                defaultText={getText('about_story_p1', 'With over 5 years of experience in web development, I\'ve had the privilege of working with startups and established companies to bring their digital visions to life.')}
                className="text-lg text-slate-600 leading-relaxed"
                editable={editable}
                onChange={handleTextChange}
                as="p"
              />
              <TiptapEditableText
                eid="about_story_p2"
                defaultText={getText('about_story_p2', 'My journey began with a fascination for how things work on the web. Today, I specialize in creating modern, responsive websites and applications that not only look great but deliver exceptional user experiences.')}
                className="text-lg text-slate-600 leading-relaxed"
                editable={editable}
                onChange={handleTextChange}
                as="p"
              />
              <TiptapEditableText
                eid="about_story_p3"
                defaultText={getText('about_story_p3', 'I believe in writing clean, maintainable code and staying current with the latest technologies. When I\'m not coding, you\'ll find me contributing to open-source projects or mentoring aspiring developers.')}
                className="text-lg text-slate-600 leading-relaxed"
                editable={editable}
                onChange={handleTextChange}
                as="p"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl transform rotate-3"></div>
              <EditableImage
                eid="about_image"
                defaultSrc={getImage('about_image', '')}
                defaultLinkUrl={getImageLink('about_image')}
                alt="About Me"
                className="relative w-full h-96 rounded-2xl object-cover shadow-xl"
                editable={editable}
                onChange={handleImageChange}
                placeholderIcon={<span className="text-slate-400 text-6xl">💼</span>}
              />
            </div>
          </div>

          {/* Skills Grid */}
          <div className="mt-20">
            <TiptapEditableText
              eid="skills_section_title"
              defaultText={getText('skills_section_title', 'Core Skills & Expertise')}
              className="text-3xl font-bold text-slate-900 mb-10 text-center"
              editable={editable}
              onChange={handleTextChange}
              as="h3"
            />
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className={`p-8 bg-gradient-to-br rounded-2xl border hover:shadow-xl transition-all transform hover:-translate-y-2 ${num === 1 ? 'from-purple-50 to-pink-50 border-purple-100' :
                  num === 2 ? 'from-blue-50 to-cyan-50 border-blue-100' :
                    num === 3 ? 'from-green-50 to-emerald-50 border-green-100' :
                      num === 4 ? 'from-orange-50 to-red-50 border-orange-100' :
                        num === 5 ? 'from-yellow-50 to-amber-50 border-yellow-100' :
                          'from-indigo-50 to-purple-50 border-indigo-100'
                  }`}>
                  <div className="text-4xl mb-4">
                    {num === 1 ? '⚡' : num === 2 ? '🚀' : num === 3 ? '🎨' : num === 4 ? '☁️' : num === 5 ? '📱' : '🔧'}
                  </div>
                  <TiptapEditableText
                    eid={`skill_${num}_title`}
                    defaultText={getText(`skill_${num}_title`,
                      num === 1 ? 'Frontend Development' :
                        num === 2 ? 'Backend Development' :
                          num === 3 ? 'UI/UX Design' :
                            num === 4 ? 'Cloud & DevOps' :
                              num === 5 ? 'Mobile Development' :
                                'Testing & Quality'
                    )}
                    className="text-xl font-bold text-slate-900 mb-3"
                    editable={editable}
                    onChange={handleTextChange}
                    as="h4"
                  />
                  <TiptapEditableText
                    eid={`skill_${num}_description`}
                    defaultText={getText(`skill_${num}_description`,
                      num === 1 ? 'React, Next.js, TypeScript, Tailwind CSS, Vue.js' :
                        num === 2 ? 'Node.js, Python, PostgreSQL, MongoDB, REST APIs' :
                          num === 3 ? 'Figma, Adobe XD, Responsive Design, User Research' :
                            num === 4 ? 'AWS, Docker, CI/CD, Git, Vercel, Netlify' :
                              num === 5 ? 'React Native, Flutter, Progressive Web Apps' :
                                'Jest, Cypress, Testing Library, Code Reviews'
                    )}
                    className="text-slate-600"
                    editable={editable}
                    onChange={handleTextChange}
                    as="p"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects/Work Section */}
      <section id="projects" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <TiptapEditableText
              eid="projects_section_title"
              defaultText={getText('projects_section_title', 'Featured Projects')}
              className="text-5xl md:text-6xl font-bold text-slate-900 mb-4"
              editable={editable}
              onChange={handleTextChange}
              as="h2"
            />
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-6"></div>
            <TiptapEditableText
              eid="projects_section_subtitle"
              defaultText={getText('projects_section_subtitle', 'Curated case studies of my best work that demonstrate my skills and the results I achieved')}
              className="text-xl text-slate-600 max-w-3xl mx-auto"
              editable={editable}
              onChange={handleTextChange}
              as="p"
            />
          </div>

          <div className="space-y-16">
            {/* Project 1 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all">
              <div className="grid md:grid-cols-2 gap-0">
                <EditableImage
                  eid="project_1_image"
                  defaultSrc={getImage('project_1_image', '')}
                  defaultLinkUrl={getImageLink('project_1_image')}
                  alt="Project 1"
                  className="h-full min-h-[400px] bg-gradient-to-br from-purple-500 to-pink-500"
                  editable={editable}
                  onChange={handleImageChange}
                  placeholderIcon={<span className="text-white text-6xl">🎨</span>}
                />
                <div className="p-12 flex flex-col justify-center">
                  <div className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4 w-fit">
                    <TiptapEditableText
                      eid="project_1_category"
                      defaultText={getText('project_1_category', 'Web Application')}
                      className=""
                      editable={editable}
                      onChange={handleTextChange}
                      as="span"
                    />
                  </div>
                  <TiptapEditableText
                    eid="project_1_title"
                    defaultText={getText('project_1_title', 'E-commerce Platform')}
                    className="text-4xl font-bold text-slate-900 mb-4"
                    editable={editable}
                    onChange={handleTextChange}
                    as="h3"
                  />
                  <TiptapEditableText
                    eid="project_1_description"
                    defaultText={getText('project_1_description', 'A modern e-commerce solution with seamless checkout experience, real-time inventory management, and personalized product recommendations.')}
                    className="text-lg text-slate-600 mb-6 leading-relaxed"
                    editable={editable}
                    onChange={handleTextChange}
                    as="p"
                  />
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-purple-600">✓</span>
                      <TiptapEditableText
                        eid="project_1_result_1"
                        defaultText={getText('project_1_result_1', '40% increase in conversion rate')}
                        className="text-slate-600"
                        editable={editable}
                        onChange={handleTextChange}
                        as="span"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-600">✓</span>
                      <TiptapEditableText
                        eid="project_1_result_2"
                        defaultText={getText('project_1_result_2', '10,000+ active users')}
                        className="text-slate-600"
                        editable={editable}
                        onChange={handleTextChange}
                        as="span"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-600">✓</span>
                      <TiptapEditableText
                        eid="project_1_result_3"
                        defaultText={getText('project_1_result_3', 'Featured in TechCrunch')}
                        className="text-slate-600"
                        editable={editable}
                        onChange={handleTextChange}
                        as="span"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <TiptapEditableText
                      eid="project_1_tech_1"
                      defaultText={getText('project_1_tech_1', 'React')}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                      editable={editable}
                      onChange={handleTextChange}
                      as="span"
                    />
                    <TiptapEditableText
                      eid="project_1_tech_2"
                      defaultText={getText('project_1_tech_2', 'Node.js')}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                      editable={editable}
                      onChange={handleTextChange}
                      as="span"
                    />
                    <TiptapEditableText
                      eid="project_1_tech_3"
                      defaultText={getText('project_1_tech_3', 'PostgreSQL')}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                      editable={editable}
                      onChange={handleTextChange}
                      as="span"
                    />
                    <TiptapEditableText
                      eid="project_1_tech_4"
                      defaultText={getText('project_1_tech_4', 'Stripe')}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                      editable={editable}
                      onChange={handleTextChange}
                      as="span"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-12 flex flex-col justify-center order-2 md:order-1">
                  <div className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4 w-fit">
                    <TiptapEditableText
                      eid="project_2_category"
                      defaultText={getText('project_2_category', 'Mobile App')}
                      className=""
                      editable={editable}
                      onChange={handleTextChange}
                      as="span"
                    />
                  </div>
                  <TiptapEditableText
                    eid="project_2_title"
                    defaultText={getText('project_2_title', 'Fitness Tracking App')}
                    className="text-4xl font-bold text-slate-900 mb-4"
                    editable={editable}
                    onChange={handleTextChange}
                    as="h3"
                  />
                  <TiptapEditableText
                    eid="project_2_description"
                    defaultText={getText('project_2_description', 'Intuitive mobile app design for a fitness tracking platform with AI-powered workout recommendations and social features.')}
                    className="text-lg text-slate-600 mb-6 leading-relaxed"
                    editable={editable}
                    onChange={handleTextChange}
                    as="p"
                  />
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600">✓</span>
                      <TiptapEditableText
                        eid="project_2_result_1"
                        defaultText={getText('project_2_result_1', '50,000+ downloads in first month')}
                        className="text-slate-600"
                        editable={editable}
                        onChange={handleTextChange}
                        as="span"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600">✓</span>
                      <TiptapEditableText
                        eid="project_2_result_2"
                        defaultText={getText('project_2_result_2', '4.8 star rating on App Store')}
                        className="text-slate-600"
                        editable={editable}
                        onChange={handleTextChange}
                        as="span"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600">✓</span>
                      <TiptapEditableText
                        eid="project_2_result_3"
                        defaultText={getText('project_2_result_3', 'Winner of Best Health App 2023')}
                        className="text-slate-600"
                        editable={editable}
                        onChange={handleTextChange}
                        as="span"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <TiptapEditableText
                      eid="project_2_tech_1"
                      defaultText={getText('project_2_tech_1', 'React Native')}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                      editable={editable}
                      onChange={handleTextChange}
                      as="span"
                    />
                    <TiptapEditableText
                      eid="project_2_tech_2"
                      defaultText={getText('project_2_tech_2', 'Firebase')}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                      editable={editable}
                      onChange={handleTextChange}
                      as="span"
                    />
                    <TiptapEditableText
                      eid="project_2_tech_3"
                      defaultText={getText('project_2_tech_3', 'TensorFlow')}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                      editable={editable}
                      onChange={handleTextChange}
                      as="span"
                    />
                    <TiptapEditableText
                      eid="project_2_tech_4"
                      defaultText={getText('project_2_tech_4', 'Redux')}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                      editable={editable}
                      onChange={handleTextChange}
                      as="span"
                    />
                  </div>
                </div>
                <EditableImage
                  eid="project_2_image"
                  defaultSrc={getImage('project_2_image', '')}
                  defaultLinkUrl={getImageLink('project_2_image')}
                  alt="Project 2"
                  className="h-full min-h-[400px] bg-gradient-to-br from-blue-500 to-cyan-500 order-1 md:order-2"
                  editable={editable}
                  onChange={handleImageChange}
                  placeholderIcon={<span className="text-white text-6xl">📱</span>}
                />
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all">
              <div className="grid md:grid-cols-2 gap-0">
                <EditableImage
                  eid="project_3_image"
                  defaultSrc={getImage('project_3_image', '')}
                  defaultLinkUrl={getImageLink('project_3_image')}
                  alt="Project 3"
                  className="h-full min-h-[400px] bg-gradient-to-br from-green-500 to-emerald-500"
                  editable={editable}
                  onChange={handleImageChange}
                  placeholderIcon={<span className="text-white text-6xl">🚀</span>}
                />
                <div className="p-12 flex flex-col justify-center">
                  <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4 w-fit">
                    <TiptapEditableText
                      eid="project_3_category"
                      defaultText={getText('project_3_category', 'SaaS Platform')}
                      className=""
                      editable={editable}
                      onChange={handleTextChange}
                      as="span"
                    />
                  </div>
                  <TiptapEditableText
                    eid="project_3_title"
                    defaultText={getText('project_3_title', 'Analytics Dashboard')}
                    className="text-4xl font-bold text-slate-900 mb-4"
                    editable={editable}
                    onChange={handleTextChange}
                    as="h3"
                  />
                  <TiptapEditableText
                    eid="project_3_description"
                    defaultText={getText('project_3_description', 'Comprehensive analytics dashboard for a B2B SaaS platform with real-time data visualization and custom reporting.')}
                    className="text-lg text-slate-600 mb-6 leading-relaxed"
                    editable={editable}
                    onChange={handleTextChange}
                    as="p"
                  />
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <TiptapEditableText
                        eid="project_3_result_1"
                        defaultText={getText('project_3_result_1', '200+ enterprise clients')}
                        className="text-slate-600"
                        editable={editable}
                        onChange={handleTextChange}
                        as="span"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <TiptapEditableText
                        eid="project_3_result_2"
                        defaultText={getText('project_3_result_2', '99.9% uptime SLA')}
                        className="text-slate-600"
                        editable={editable}
                        onChange={handleTextChange}
                        as="span"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <TiptapEditableText
                        eid="project_3_result_3"
                        defaultText={getText('project_3_result_3', '$2M ARR in year one')}
                        className="text-slate-600"
                        editable={editable}
                        onChange={handleTextChange}
                        as="span"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <TiptapEditableText
                      eid="project_3_tech_1"
                      defaultText={getText('project_3_tech_1', 'Next.js')}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                      editable={editable}
                      onChange={handleTextChange}
                      as="span"
                    />
                    <TiptapEditableText
                      eid="project_3_tech_2"
                      defaultText={getText('project_3_tech_2', 'D3.js')}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                      editable={editable}
                      onChange={handleTextChange}
                      as="span"
                    />
                    <TiptapEditableText
                      eid="project_3_tech_3"
                      defaultText={getText('project_3_tech_3', 'AWS')}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                      editable={editable}
                      onChange={handleTextChange}
                      as="span"
                    />
                    <TiptapEditableText
                      eid="project_3_tech_4"
                      defaultText={getText('project_3_tech_4', 'MongoDB')}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                      editable={editable}
                      onChange={handleTextChange}
                      as="span"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-24 px-6 bg-gradient-to-br from-purple-900 via-slate-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <TiptapEditableText
            eid="resume_section_title"
            defaultText={getText('resume_section_title', 'Resume')}
            className="text-5xl md:text-6xl font-bold mb-6"
            editable={editable}
            onChange={handleTextChange}
            as="h2"
          />
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-8"></div>
          <TiptapEditableText
            eid="resume_description"
            defaultText={getText('resume_description', 'Download my complete resume to learn more about my experience, education, and professional achievements.')}
            className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto"
            editable={editable}
            onChange={handleTextChange}
            as="p"
          />

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-12 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-4xl">
                  📄
                </div>
                <div className="text-left">
                  <TiptapEditableText
                    eid="resume_file_name"
                    defaultText={getText('resume_file_name', 'John_Doe_Resume.pdf')}
                    className="text-2xl font-bold mb-2"
                    editable={editable}
                    onChange={handleTextChange}
                    as="h3"
                  />
                  <div className="text-slate-300">
                    <TiptapEditableText
                      eid="resume_file_size"
                      defaultText={getText('resume_file_size', '2.4 MB')}
                      className=""
                      editable={editable}
                      onChange={handleTextChange}
                      as="span"
                    />
                    {' • '}
                    <TiptapEditableText
                      eid="resume_file_updated"
                      defaultText={getText('resume_file_updated', 'Updated Jan 2024')}
                      className=""
                      editable={editable}
                      onChange={handleTextChange}
                      as="span"
                    />
                  </div>
                </div>
              </div>
              <EditableButton
                eid="resume_download_button"
                defaultText={getButton('resume_download_button', 'Download Resume', '#').text}
                defaultUrl={getButton('resume_download_button', 'Download Resume', '#').url}
                className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 hover:shadow-xl whitespace-nowrap"
                editable={editable}
                onChange={onContentChange}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-3xl mb-3">🎓</div>
              <TiptapEditableText
                eid="resume_education_title"
                defaultText={getText('resume_education_title', 'Education')}
                className="text-lg font-semibold mb-2"
                editable={editable}
                onChange={handleTextChange}
                as="h4"
              />
              <TiptapEditableText
                eid="resume_education"
                defaultText={getText('resume_education', 'BS in Computer Science\nStanford University')}
                className="text-slate-300 text-sm"
                editable={editable}
                onChange={handleTextChange}
                as="p"
              />
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-3xl mb-3">💼</div>
              <TiptapEditableText
                eid="resume_experience_title"
                defaultText={getText('resume_experience_title', 'Experience')}
                className="text-lg font-semibold mb-2"
                editable={editable}
                onChange={handleTextChange}
                as="h4"
              />
              <TiptapEditableText
                eid="resume_experience"
                defaultText={getText('resume_experience', '5+ Years\nSenior Developer')}
                className="text-slate-300 text-sm"
                editable={editable}
                onChange={handleTextChange}
                as="p"
              />
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-3xl mb-3">🏆</div>
              <TiptapEditableText
                eid="resume_certifications_title"
                defaultText={getText('resume_certifications_title', 'Certifications')}
                className="text-lg font-semibold mb-2"
                editable={editable}
                onChange={handleTextChange}
                as="h4"
              />
              <TiptapEditableText
                eid="resume_certifications"
                defaultText={getText('resume_certifications', 'AWS Certified\nGoogle Cloud Pro')}
                className="text-slate-300 text-sm"
                editable={editable}
                onChange={handleTextChange}
                as="p"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <TiptapEditableText
              eid="testimonials_section_title"
              defaultText={getText('testimonials_section_title', 'Testimonials')}
              className="text-5xl md:text-6xl font-bold text-slate-900 mb-4"
              editable={editable}
              onChange={handleTextChange}
              as="h2"
            />
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-6"></div>
            <TiptapEditableText
              eid="testimonials_section_subtitle"
              defaultText={getText('testimonials_section_subtitle', 'What colleagues and clients say about working with me')}
              className="text-xl text-slate-600 max-w-3xl mx-auto"
              editable={editable}
              onChange={handleTextChange}
              as="p"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100 hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <EditableImage
                  eid="testimonial_1_image"
                  defaultSrc={getImage('testimonial_1_image', '')}
                  defaultLinkUrl={getImageLink('testimonial_1_image')}
                  alt="Testimonial 1"
                  className="w-16 h-16 rounded-full object-cover bg-gradient-to-br from-purple-400 to-pink-400"
                  editable={editable}
                  onChange={handleImageChange}
                  placeholderIcon={<span className="text-white text-2xl">👤</span>}
                />
                <div>
                  <TiptapEditableText
                    eid="testimonial_1_name"
                    defaultText={getText('testimonial_1_name', 'Sarah Johnson')}
                    className="font-bold text-slate-900"
                    editable={editable}
                    onChange={handleTextChange}
                    as="h4"
                  />
                  <TiptapEditableText
                    eid="testimonial_1_role"
                    defaultText={getText('testimonial_1_role', 'CEO, TechStart Inc.')}
                    className="text-sm text-slate-600"
                    editable={editable}
                    onChange={handleTextChange}
                    as="p"
                  />
                </div>
              </div>
              <div className="text-purple-600 text-3xl mb-4">&quot;</div>
              <TiptapEditableText
                eid="testimonial_1_quote"
                defaultText={getText('testimonial_1_quote', 'Working with John was an absolute pleasure. His technical expertise and attention to detail helped us launch our product ahead of schedule. Highly recommended!')}
                className="text-slate-700 leading-relaxed"
                editable={editable}
                onChange={handleTextChange}
                as="p"
              />
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100 hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <EditableImage
                  eid="testimonial_2_image"
                  defaultSrc={getImage('testimonial_2_image', '')}
                  defaultLinkUrl={getImageLink('testimonial_2_image')}
                  alt="Testimonial 2"
                  className="w-16 h-16 rounded-full object-cover bg-gradient-to-br from-blue-400 to-cyan-400"
                  editable={editable}
                  onChange={handleImageChange}
                  placeholderIcon={<span className="text-white text-2xl">👤</span>}
                />
                <div>
                  <TiptapEditableText
                    eid="testimonial_2_name"
                    defaultText={getText('testimonial_2_name', 'Michael Chen')}
                    className="font-bold text-slate-900"
                    editable={editable}
                    onChange={handleTextChange}
                    as="h4"
                  />
                  <TiptapEditableText
                    eid="testimonial_2_role"
                    defaultText={getText('testimonial_2_role', 'Product Manager, InnovateCo')}
                    className="text-sm text-slate-600"
                    editable={editable}
                    onChange={handleTextChange}
                    as="p"
                  />
                </div>
              </div>
              <div className="text-blue-600 text-3xl mb-4">&quot;</div>
              <p
                data-eid="testimonial_2_quote"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-slate-700 leading-relaxed"
              >
                {getText('testimonial_2_quote', 'John\'s ability to translate complex requirements into elegant solutions is remarkable. He\'s a true professional who delivers exceptional results every time.')}
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100 hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <EditableImage
                  eid="testimonial_3_image"
                  defaultSrc={getImage('testimonial_3_image', '')}
                  defaultLinkUrl={getImageLink('testimonial_3_image')}
                  alt="Testimonial 3"
                  className="w-16 h-16 rounded-full object-cover bg-gradient-to-br from-green-400 to-emerald-400"
                  editable={editable}
                  onChange={handleImageChange}
                  placeholderIcon={<span className="text-white text-2xl">👤</span>}
                />
                <div>
                  <TiptapEditableText
                    eid="testimonial_3_name"
                    defaultText={getText('testimonial_3_name', 'Emily Rodriguez')}
                    className="font-bold text-slate-900"
                    editable={editable}
                    onChange={handleTextChange}
                    as="h4"
                  />
                  <TiptapEditableText
                    eid="testimonial_3_role"
                    defaultText={getText('testimonial_3_role', 'CTO, Digital Solutions')}
                    className="text-sm text-slate-600"
                    editable={editable}
                    onChange={handleTextChange}
                    as="p"
                  />
                </div>
              </div>
              <div className="text-green-600 text-3xl mb-4">&quot;</div>
              <TiptapEditableText
                eid="testimonial_3_quote"
                defaultText={getText('testimonial_3_quote', 'An outstanding developer with excellent communication skills. John not only built our platform but also mentored our junior developers. A valuable asset to any team.')}
                className="text-slate-700 leading-relaxed"
                editable={editable}
                onChange={handleTextChange}
                as="p"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            data-eid="contact_section_title"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            {getText('contact_section_title', "Let's Work Together")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-8"></div>
          <p
            data-eid="contact_description"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto"
          >
            {getText('contact_description', 'I\'m always interested in hearing about new projects and opportunities. Feel free to reach out!')}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-left hover:bg-white/15 transition-all">
              <div className="text-4xl mb-4">📧</div>
              <TiptapEditableText
                eid="contact_email_label"
                defaultText={getText('contact_email_label', 'Email')}
                className="text-xl font-semibold mb-2"
                editable={editable}
                onChange={handleTextChange}
                as="h3"
              />
              <TiptapEditableText
                eid="contact_email"
                defaultText={getText('contact_email', 'hello@johndoe.com')}
                className="text-purple-300"
                editable={editable}
                onChange={handleTextChange}
                as="p"
              />
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-left hover:bg-white/15 transition-all">
              <div className="text-4xl mb-4">📱</div>
              <TiptapEditableText
                eid="contact_phone_label"
                defaultText={getText('contact_phone_label', 'Phone')}
                className="text-xl font-semibold mb-2"
                editable={editable}
                onChange={handleTextChange}
                as="h3"
              />
              <TiptapEditableText
                eid="contact_phone"
                defaultText={getText('contact_phone', '+1 (555) 123-4567')}
                className="text-purple-300"
                editable={editable}
                onChange={handleTextChange}
                as="p"
              />
            </div>
          </div>

          <div className="mb-12">
            <TiptapEditableText
              eid="contact_social_label"
              defaultText={getText('contact_social_label', 'Connect With Me')}
              className="text-2xl font-semibold mb-6"
              editable={editable}
              onChange={handleTextChange}
              as="h3"
            />
            <div className="flex justify-center gap-6">
              <EditableButton
                eid="contact_linkedin_link"
                defaultText="💼"
                defaultUrl={getButton('contact_linkedin_link', '💼', 'https://linkedin.com').url}
                className="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all transform hover:scale-110"
                editable={editable}
                onChange={onContentChange}
              />
              <EditableButton
                eid="contact_github_link"
                defaultText="🐙"
                defaultUrl={getButton('contact_github_link', '🐙', 'https://github.com').url}
                className="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all transform hover:scale-110"
                editable={editable}
                onChange={onContentChange}
              />
              <EditableButton
                eid="contact_twitter_link"
                defaultText="🐦"
                defaultUrl={getButton('contact_twitter_link', '🐦', 'https://twitter.com').url}
                className="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all transform hover:scale-110"
                editable={editable}
                onChange={onContentChange}
              />
              <EditableButton
                eid="contact_instagram_link"
                defaultText="📷"
                defaultUrl={getButton('contact_instagram_link', '📷', 'https://instagram.com').url}
                className="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all transform hover:scale-110"
                editable={editable}
                onChange={onContentChange}
              />
            </div>
            <div className="flex justify-center gap-6 mt-4 text-sm text-slate-400">
              <TiptapEditableText
                eid="contact_linkedin"
                defaultText={getText('contact_linkedin', 'LinkedIn')}
                className=""
                editable={editable}
                onChange={handleTextChange}
                as="span"
              />
              <TiptapEditableText
                eid="contact_github"
                defaultText={getText('contact_github', 'GitHub')}
                className=""
                editable={editable}
                onChange={handleTextChange}
                as="span"
              />
              <TiptapEditableText
                eid="contact_twitter"
                defaultText={getText('contact_twitter', 'Twitter')}
                className=""
                editable={editable}
                onChange={handleTextChange}
                as="span"
              />
              <TiptapEditableText
                eid="contact_instagram"
                defaultText={getText('contact_instagram', 'Instagram')}
                className=""
                editable={editable}
                onChange={handleTextChange}
                as="span"
              />
            </div>
          </div>

          <EditableButton
            eid="contact_cta"
            defaultText={getButton('contact_cta', 'Get In Touch', '#contact').text}
            defaultUrl={getButton('contact_cta', 'Get In Touch', '#contact').url}
            className="px-12 py-5 bg-purple-600 hover:bg-purple-700 rounded-lg text-xl font-semibold transition-all transform hover:scale-105 hover:shadow-2xl"
            editable={editable}
            onChange={onContentChange}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-slate-950 text-slate-400 text-center">
        <TiptapEditableText
          eid="footer_text"
          defaultText={getText('footer_text', ' 2024 John Doe. All rights reserved.')}
          className=""
          editable={editable}
          onChange={handleTextChange}
          as="p"
        />
      </footer>
    </div>
  );
}
