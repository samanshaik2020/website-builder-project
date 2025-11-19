'use client';

import React from 'react';
import { SlateEditableText } from '@/components/editor/slate-editable-text';
import { EditableButton } from '@/components/editor/editable-button';

interface LegalCenterTemplateProps {
  data?: Record<string, any>;
  editable?: boolean;
  onContentChange?: (eid: string, content: any) => void;
}

export default function LegalCenterTemplate({ 
  data = {}, 
  editable = false,
  onContentChange = () => {}
}: LegalCenterTemplateProps) {
  
  const getText = (eid: string, defaultText: string) => {
    return data[eid]?.text || defaultText;
  };

  const getButton = (eid: string, defaultText: string, defaultUrl: string) => {
    return data[eid]?.button || { text: defaultText, url: defaultUrl };
  };

  const handleTextChange = (eid: string, value: string) => {
    onContentChange(eid, { text: value });
  };

  const handleButtonChange = (eid: string, content: { button: { text: string; url: string } }) => {
    onContentChange(eid, content);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white font-sans text-[#2D3748]">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between whitespace-nowrap px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-4 text-[#2D3748]">
            <svg className="text-[#2B6CB0] size-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
            </svg>
            <SlateEditableText
              eid="nav_brand"
              defaultText={getText('nav_brand', 'squpage.com')}
              className="text-lg font-bold"
              editable={editable}
              onChange={handleTextChange}
            />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <SlateEditableText
                eid="nav_link_1"
                defaultText={getText('nav_link_1', 'Home')}
                className="text-sm font-medium hover:text-[#2B6CB0] cursor-pointer"
                editable={editable}
                onChange={handleTextChange}
              />
              <SlateEditableText
                eid="nav_link_2"
                defaultText={getText('nav_link_2', 'Features')}
                className="text-sm font-medium hover:text-[#2B6CB0] cursor-pointer"
                editable={editable}
                onChange={handleTextChange}
              />
              <SlateEditableText
                eid="nav_link_3"
                defaultText={getText('nav_link_3', 'Pricing')}
                className="text-sm font-medium hover:text-[#2B6CB0] cursor-pointer"
                editable={editable}
                onChange={handleTextChange}
              />
              <SlateEditableText
                eid="nav_link_4"
                defaultText={getText('nav_link_4', 'About Us')}
                className="text-sm font-medium hover:text-[#2B6CB0] cursor-pointer"
                editable={editable}
                onChange={handleTextChange}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <EditableButton
              eid="nav_login_btn"
              defaultText={getButton('nav_login_btn', 'Log In', '#').text}
              defaultUrl={getButton('nav_login_btn', 'Log In', '#').url}
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-sm font-bold bg-[#2B6CB0]/20 text-[#2B6CB0] hover:bg-[#2B6CB0]/30"
              editable={editable}
              onChange={handleButtonChange}
            />
            <EditableButton
              eid="nav_signup_btn"
              defaultText={getButton('nav_signup_btn', 'Sign Up', '#').text}
              defaultUrl={getButton('nav_signup_btn', 'Sign Up', '#').url}
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#2B6CB0] text-white text-sm font-bold hover:bg-[#2B6CB0]/90"
              editable={editable}
              onChange={handleButtonChange}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <div className="border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
            <div className="flex flex-col gap-3">
              <SlateEditableText
                eid="hero_title"
                defaultText={getText('hero_title', 'Legal Center')}
                className="text-4xl font-black tracking-tighter text-[#2D3748]"
                editable={editable}
                onChange={handleTextChange}
              />
              <SlateEditableText
                eid="hero_description"
                defaultText={getText('hero_description', "Here you'll find our Terms of Service and Privacy Policy. These documents outline your rights and responsibilities when using our services and how we handle your data.")}
                className="text-base text-gray-500 max-w-2xl"
                editable={editable}
                onChange={handleTextChange}
              />
            </div>
            <SlateEditableText
              eid="hero_last_updated"
              defaultText={getText('hero_last_updated', 'Last updated: October 26, 2023')}
              className="text-sm text-gray-400 pt-6"
              editable={editable}
              onChange={handleTextChange}
            />
          </div>
        </div>

        {/* Two Column Legal Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Terms of Service Column */}
            <div className="flex flex-col gap-8">
              <div className="sticky top-24 self-start">
                <SlateEditableText
                  eid="tos_title"
                  defaultText={getText('tos_title', 'Terms of Service')}
                  className="text-2xl font-bold tracking-tight text-[#2D3748]"
                  editable={editable}
                  onChange={handleTextChange}
                />
                <SlateEditableText
                  eid="tos_subtitle"
                  defaultText={getText('tos_subtitle', 'Rules and guidelines for using squpage.com.')}
                  className="text-sm text-gray-500 mt-1"
                  editable={editable}
                  onChange={handleTextChange}
                />
              </div>
              <div className="space-y-12">
                {/* Section 1 */}
                <section id="user-agreement">
                  <SlateEditableText
                    eid="tos_section1_title"
                    defaultText={getText('tos_section1_title', '1. User Agreement')}
                    className="text-xl font-bold text-[#2D3748]"
                    editable={editable}
                    onChange={handleTextChange}
                  />
                  <div className="space-y-4 text-gray-600">
                    <SlateEditableText
                      eid="tos_section1_content"
                      defaultText={getText('tos_section1_content', 'By accessing or using squpage.com, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to all the terms and conditions, then you may not access the website or use any services.')}
                      className="text-gray-600"
                      editable={editable}
                      onChange={handleTextChange}
                    />
                  </div>
                </section>

                {/* Section 2 */}
                <section id="user-conduct">
                  <SlateEditableText
                    eid="tos_section2_title"
                    defaultText={getText('tos_section2_title', '2. User Conduct')}
                    className="text-xl font-bold text-[#2D3748]"
                    editable={editable}
                    onChange={handleTextChange}
                  />
                  <div className="space-y-4 text-gray-600">
                    <SlateEditableText
                      eid="tos_section2_content"
                      defaultText={getText('tos_section2_content', 'You agree not to use the service for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the service in any way that could damage the website, services, or general business of squpage.com.')}
                      className="text-gray-600"
                      editable={editable}
                      onChange={handleTextChange}
                    />
                    <ul className="list-disc list-inside space-y-2 pl-2">
                      <li>
                        <SlateEditableText
                          eid="tos_section2_bullet1"
                          defaultText={getText('tos_section2_bullet1', 'You will not harass, abuse, or threaten others.')}
                          className="text-gray-600 inline"
                          editable={editable}
                          onChange={handleTextChange}
                        />
                      </li>
                      <li>
                        <SlateEditableText
                          eid="tos_section2_bullet2"
                          defaultText={getText('tos_section2_bullet2', 'You will not violate any intellectual property rights.')}
                          className="text-gray-600 inline"
                          editable={editable}
                          onChange={handleTextChange}
                        />
                      </li>
                      <li>
                        <SlateEditableText
                          eid="tos_section2_bullet3"
                          defaultText={getText('tos_section2_bullet3', 'You will not upload any computer viruses or malicious code.')}
                          className="text-gray-600 inline"
                          editable={editable}
                          onChange={handleTextChange}
                        />
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Section 3 */}
                <section id="termination">
                  <SlateEditableText
                    eid="tos_section3_title"
                    defaultText={getText('tos_section3_title', '3. Termination of Use')}
                    className="text-xl font-bold text-[#2D3748]"
                    editable={editable}
                    onChange={handleTextChange}
                  />
                  <div className="space-y-4 text-gray-600">
                    <SlateEditableText
                      eid="tos_section3_content"
                      defaultText={getText('tos_section3_content', 'We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including but not limited to a breach of the Terms.')}
                      className="text-gray-600"
                      editable={editable}
                      onChange={handleTextChange}
                    />
                  </div>
                </section>
              </div>
            </div>

            {/* Privacy Policy Column */}
            <div className="flex flex-col gap-8">
              <div className="sticky top-24 self-start">
                <SlateEditableText
                  eid="privacy_title"
                  defaultText={getText('privacy_title', 'Privacy Policy')}
                  className="text-2xl font-bold tracking-tight text-[#2D3748]"
                  editable={editable}
                  onChange={handleTextChange}
                />
                <SlateEditableText
                  eid="privacy_subtitle"
                  defaultText={getText('privacy_subtitle', 'How we collect, use, and protect your data.')}
                  className="text-sm text-gray-500 mt-1"
                  editable={editable}
                  onChange={handleTextChange}
                />
              </div>
              <div className="space-y-12">
                {/* Section 1 */}
                <section id="info-collect">
                  <SlateEditableText
                    eid="privacy_section1_title"
                    defaultText={getText('privacy_section1_title', '1. Information We Collect')}
                    className="text-xl font-bold text-[#2D3748]"
                    editable={editable}
                    onChange={handleTextChange}
                  />
                  <div className="space-y-4 text-gray-600">
                    <SlateEditableText
                      eid="privacy_section1_content1"
                      defaultText={getText('privacy_section1_content1', 'To provide and improve our services, we collect certain information when you use squpage.com. This information falls into three categories: information you provide to us, information collected automatically, and information from third parties.')}
                      className="text-gray-600"
                      editable={editable}
                      onChange={handleTextChange}
                    />
                    <SlateEditableText
                      eid="privacy_section1_content2"
                      defaultText={getText('privacy_section1_content2', 'Personal Data: This includes your name, email address, and payment information when you sign up for an account or make a purchase.')}
                      className="text-gray-600"
                      editable={editable}
                      onChange={handleTextChange}
                    />
                  </div>
                </section>

                {/* Section 2 */}
                <section id="info-use">
                  <SlateEditableText
                    eid="privacy_section2_title"
                    defaultText={getText('privacy_section2_title', '2. How We Use Information')}
                    className="text-xl font-bold text-[#2D3748]"
                    editable={editable}
                    onChange={handleTextChange}
                  />
                  <div className="space-y-4 text-gray-600">
                    <SlateEditableText
                      eid="privacy_section2_content"
                      defaultText={getText('privacy_section2_content', 'We use the information we collect to operate, maintain, and enhance our services. This includes personalizing your experience, communicating with you, processing transactions, and for security and fraud prevention purposes.')}
                      className="text-gray-600"
                      editable={editable}
                      onChange={handleTextChange}
                    />
                  </div>
                </section>

                {/* Section 3 */}
                <section id="info-share">
                  <SlateEditableText
                    eid="privacy_section3_title"
                    defaultText={getText('privacy_section3_title', '3. How We Share Information')}
                    className="text-xl font-bold text-[#2D3748]"
                    editable={editable}
                    onChange={handleTextChange}
                  />
                  <div className="space-y-4 text-gray-600">
                    <SlateEditableText
                      eid="privacy_section3_content"
                      defaultText={getText('privacy_section3_content', 'We do not sell your personal information. We may share your information with trusted third-party service providers who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.')}
                      className="text-gray-600"
                      editable={editable}
                      onChange={handleTextChange}
                    />
                  </div>
                </section>

                {/* CTA Box */}
                <section id="info-contact">
                  <div className="bg-[#F7FAFC] rounded-xl p-6 lg:p-8">
                    <SlateEditableText
                      eid="cta_title"
                      defaultText={getText('cta_title', 'Have questions about your data?')}
                      className="text-xl font-bold text-[#2D3748]"
                      editable={editable}
                      onChange={handleTextChange}
                    />
                    <SlateEditableText
                      eid="cta_description"
                      defaultText={getText('cta_description', "If you have any questions or concerns about our privacy practices, please don't hesitate to reach out to our privacy team.")}
                      className="mt-2 text-gray-600"
                      editable={editable}
                      onChange={handleTextChange}
                    />
                    <EditableButton
                      eid="cta_button"
                      defaultText={getButton('cta_button', 'Contact Privacy Team', '#').text}
                      defaultUrl={getButton('cta_button', 'Contact Privacy Team', '#').url}
                      className="mt-4 flex items-center gap-2 min-w-[84px] cursor-pointer justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#4FD1C5] text-white text-sm font-bold hover:bg-[#4FD1C5]/90"
                      editable={editable}
                      onChange={handleButtonChange}
                    />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#F7FAFC] mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <SlateEditableText
              eid="footer_copyright"
              defaultText={getText('footer_copyright', ' 2024 squpage.com. All rights reserved.')}
              className="text-sm text-gray-500"
              editable={editable}
              onChange={handleTextChange}
            />
            <div className="flex gap-4">
              <SlateEditableText
                eid="footer_link_1"
                defaultText={getText('footer_link_1', 'Terms of Service')}
                className="text-sm text-gray-500 hover:text-[#2B6CB0] cursor-pointer"
                editable={editable}
                onChange={handleTextChange}
              />
              <SlateEditableText
                eid="footer_link_2"
                defaultText={getText('footer_link_2', 'Privacy Policy')}
                className="text-sm text-gray-500 hover:text-[#2B6CB0] cursor-pointer"
                editable={editable}
                onChange={handleTextChange}
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
