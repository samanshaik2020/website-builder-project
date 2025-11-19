'use client';

import React from 'react';
import { EditableImage } from '@/components/editor/editable-image';
import { EditableButton } from '@/components/editor/editable-button';

interface CreativeCommunityTemplateProps {
  data?: Record<string, any>;
  editable?: boolean;
  onContentChange?: (eid: string, content: any) => void;
}

export default function CreativeCommunityTemplate({
  data = {},
  editable = false,
  onContentChange = () => {},
}: CreativeCommunityTemplateProps) {
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

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#fdf8f4] font-['Comfortaa',sans-serif]">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="h-64 w-64 rounded-full bg-gradient-to-br from-[#ff8c42] to-[#a16bfe] absolute top-10 left-10 filter blur-3xl mix-blend-multiply animate-pulse"></div>
        <div className="h-64 w-64 rounded-full bg-gradient-to-br from-[#fecaca] to-[#a78bfa] absolute bottom-20 right-20 filter blur-3xl mix-blend-multiply animate-pulse"></div>
      </div>

      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 w-full z-10">
          <div className="flex flex-col lg:flex-row w-full min-h-screen relative p-4 lg:p-12">
            {/* Left Content Section */}
            <div className="w-full lg:w-[60%] flex flex-col justify-center p-6 md:p-12 lg:pr-20 relative bg-white rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] lg:mr-[-5rem] lg:mb-12 z-20">
              <div className="layout-content-container flex flex-col w-full max-w-2xl mx-auto flex-1 justify-center py-10 lg:py-0">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <span className="text-[#a16bfe] text-4xl">💡</span>
                    <span
                      data-eid="nav_brand"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-xl font-bold text-gray-800"
                    >
                      {getText('nav_brand', 'IgniteCreatives')}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <a
                      data-eid="nav_login_link"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-sm font-medium text-gray-600 hover:text-[#a16bfe] transition-colors cursor-pointer"
                      href="#"
                    >
                      {getText('nav_login_link', 'Curator Login')}
                    </a>
                    <EditableButton
                      eid="nav_cta"
                      defaultText={getButton('nav_cta', 'Join the Spark', '#').text}
                      defaultUrl={getButton('nav_cta', 'Join the Spark', '#').url}
                      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gradient-to-br from-[#ff8c42] to-[#a16bfe] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 shadow-lg transition-all duration-300 ease-out transform hover:scale-105"
                      editable={editable}
                      onChange={onContentChange}
                    />
                  </div>
                </div>

                {/* Hero Section */}
                <div className="flex flex-col gap-6 text-left py-10">
                  <h1
                    data-eid="hero_title"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-[#111418] text-4xl font-extrabold leading-tight tracking-[-0.033em] md:text-5xl lg:text-6xl"
                  >
                    {getText('hero_title', 'Unleash Your Passion, Connect with Fellow Creators.')}
                  </h1>
                  <p
                    data-eid="hero_description"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-gray-600 text-lg font-normal leading-relaxed md:text-xl"
                  >
                    {getText('hero_description', 'Dive into a vibrant community where artistic expression thrives. Share your unique creations, collaborate on inspiring projects, and turn your creative energy into rewarding experiences.')}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <EditableButton
                      eid="hero_cta_primary"
                      defaultText={getButton('hero_cta_primary', 'Start Your Creative Journey', '#').text}
                      defaultUrl={getButton('hero_cta_primary', 'Start Your Creative Journey', '#').url}
                      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-gradient-to-br from-[#ff8c42] to-[#a16bfe] text-white text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90 shadow-lg transition-all duration-300 ease-out transform hover:scale-105"
                      editable={editable}
                      onChange={onContentChange}
                    />
                    <EditableButton
                      eid="hero_cta_secondary"
                      defaultText={getButton('hero_cta_secondary', 'Explore Collaborations', '#').text}
                      defaultUrl={getButton('hero_cta_secondary', 'Explore Collaborations', '#').url}
                      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#fdf8f4] text-[#111418] text-base font-bold leading-normal tracking-[0.015em] hover:bg-gray-200 shadow-md transition-all duration-300 ease-out"
                      editable={editable}
                      onChange={onContentChange}
                    />
                  </div>
                </div>

                {/* Features Grid */}
                <div className="flex flex-col gap-8 py-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Feature 1 */}
                    <div className="flex gap-4">
                      <span className="text-[#a16bfe] text-3xl mt-1">🎨</span>
                      <div className="flex flex-col gap-1">
                        <h2
                          data-eid="feature1_title"
                          contentEditable={editable}
                          suppressContentEditableWarning
                          className="text-[#111418] text-lg font-bold leading-tight"
                        >
                          {getText('feature1_title', 'Inspiring Spaces')}
                        </h2>
                        <p
                          data-eid="feature1_description"
                          contentEditable={editable}
                          suppressContentEditableWarning
                          className="text-gray-600 text-sm font-normal leading-normal"
                        >
                          {getText('feature1_description', 'Discover a curated feed of diverse artistic projects and find your next inspiration.')}
                        </p>
                      </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex gap-4">
                      <span className="text-[#a16bfe] text-3xl mt-1">💬</span>
                      <div className="flex flex-col gap-1">
                        <h2
                          data-eid="feature2_title"
                          contentEditable={editable}
                          suppressContentEditableWarning
                          className="text-[#111418] text-lg font-bold leading-tight"
                        >
                          {getText('feature2_title', 'Collaborate & Grow')}
                        </h2>
                        <p
                          data-eid="feature2_description"
                          contentEditable={editable}
                          suppressContentEditableWarning
                          className="text-gray-600 text-sm font-normal leading-normal"
                        >
                          {getText('feature2_description', 'Connect with like-minded individuals, share feedback, and build amazing things together.')}
                        </p>
                      </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex gap-4">
                      <span className="text-[#a16bfe] text-3xl mt-1">💰</span>
                      <div className="flex flex-col gap-1">
                        <h2
                          data-eid="feature3_title"
                          contentEditable={editable}
                          suppressContentEditableWarning
                          className="text-[#111418] text-lg font-bold leading-tight"
                        >
                          {getText('feature3_title', 'Passion-Driven Earnings')}
                        </h2>
                        <p
                          data-eid="feature3_description"
                          contentEditable={editable}
                          suppressContentEditableWarning
                          className="text-gray-600 text-sm font-normal leading-normal"
                        >
                          {getText('feature3_description', 'Monetize your talents through creative commissions and community-supported projects.')}
                        </p>
                      </div>
                    </div>

                    {/* Feature 4 */}
                    <div className="flex gap-4">
                      <span className="text-[#a16bfe] text-3xl mt-1">🤝</span>
                      <div className="flex flex-col gap-1">
                        <h2
                          data-eid="feature4_title"
                          contentEditable={editable}
                          suppressContentEditableWarning
                          className="text-[#111418] text-lg font-bold leading-tight"
                        >
                          {getText('feature4_title', 'Supportive Network')}
                        </h2>
                        <p
                          data-eid="feature4_description"
                          contentEditable={editable}
                          suppressContentEditableWarning
                          className="text-gray-600 text-sm font-normal leading-normal"
                        >
                          {getText('feature4_description', 'Our team and fellow creators are here to champion your artistic journey.')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Section */}
            <div className="w-full lg:w-[45%] flex flex-col justify-center items-center p-6 md:p-12 lg:pl-10 relative mt-8 lg:mt-0 lg:ml-[-5rem] z-10">
              <div className="layout-content-container flex flex-col w-full max-w-2xl mx-auto flex-1 justify-center py-10 lg:py-0">
                {/* Main Image */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] transform rotate-[-3deg] lg:rotate-[-5deg] scale-105 z-20">
                  <EditableImage
                    eid="hero_image"
                    defaultSrc={getImage('hero_image', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop')}
                    alt="Diverse creators collaborating"
                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                    editable={editable}
                    onChange={handleImageChange('hero_image')}
                  />
                </div>

                {/* Testimonial Card */}
                <div className="relative flex flex-col gap-6 p-8 rounded-xl bg-gradient-to-br from-[#fecaca] to-[#a78bfa] text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] transform rotate-[2deg] lg:rotate-[3deg] ml-auto mr-auto lg:mr-0 max-w-md w-[90%] lg:w-full z-30 lg:mt-[-5rem] xl:mt-[-8rem]">
                  <div className="flex flex-col items-center text-center gap-4">
                    <EditableImage
                      eid="testimonial_avatar"
                      defaultSrc={getImage('testimonial_avatar', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop')}
                      alt="Creator testimonial"
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                      editable={editable}
                      onChange={handleImageChange('testimonial_avatar')}
                    />
                    <p
                      data-eid="testimonial_quote"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-lg font-semibold leading-relaxed"
                    >
                      {getText('testimonial_quote', '"This community is a game-changer! I\'ve found my tribe, pushed my artistic boundaries, and even earned from my passion. Truly inspiring!"')}
                    </p>
                    <p
                      data-eid="testimonial_author"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-sm mt-1 font-medium"
                    >
                      {getText('testimonial_author', '- Anya Sharma, Digital Artist & Collaborator')}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="text-center mt-12 transform rotate-[-2deg] lg:rotate-[-1deg] text-gray-700">
                  <p
                    data-eid="stats_text"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-base font-normal leading-normal"
                  >
                    {getText('stats_text', 'Join over 10,000+ vibrant creators igniting their potential!')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
