'use client';

import React from 'react';
import { EditableImage } from '@/components/editor/editable-image';
import { EditableButton } from '@/components/editor/editable-button';

interface GeneralContentTemplateProps {
  data?: Record<string, any>;
  editable?: boolean;
  onContentChange?: (eid: string, content: any) => void;
}

export default function GeneralContentTemplate({
  data = {},
  editable = false,
  onContentChange = () => { },
}: GeneralContentTemplateProps) {
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
    <main className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#f6f7f8] text-[#111418] font-['Inter',sans-serif]">
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Image Column */}
        <div className="w-full lg:w-2/5 xl:w-1/2">
          <div className="h-64 lg:h-screen w-full relative">
            <EditableImage
              eid="hero_image"
              defaultSrc={getImage('hero_image', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&h=800&fit=crop')}
              alt="Compelling photograph relevant to the page's subject matter"
              className="absolute inset-0 w-full h-full object-cover"
              editable={editable}
              onChange={handleImageChange('hero_image')}
            />
          </div>
        </div>

        {/* Content Column */}
        <div className="w-full lg:w-3/5 xl:w-1/2 flex items-center justify-center">
          <div className="flex flex-col gap-6 p-8 sm:p-12 md:p-16 lg:p-20 max-w-2xl w-full">
            <div className="flex flex-col gap-4 text-left">
              <h1
                data-eid="headline"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl whitespace-pre-wrap break-words"
              >
                {getText('headline', 'A short, impactful headline summarizing the core message')}
              </h1>
              <p
                data-eid="paragraph1"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-base font-normal leading-relaxed text-[#111418]/80 sm:text-lg whitespace-pre-wrap break-words"
              >
                {getText('paragraph1', 'Two to three short paragraphs explaining the concept, benefit, or story in more detail. This content should be clear, concise, and easy to read, engaging the user and providing valuable context to the accompanying visual.')}
              </p>
              <p
                data-eid="paragraph2"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-base font-normal leading-relaxed text-[#111418]/80 sm:text-lg whitespace-pre-wrap break-words"
              >
                {getText('paragraph2', 'Elaborate further on the key points, focusing on user benefits or the unique value proposition. Keep sentences direct and paragraphs focused to maintain reader engagement.')}
              </p>
            </div>
            <EditableButton
              eid="cta_button"
              defaultText={getButton('cta_button', 'Get Started', '#').text}
              defaultUrl={getButton('cta_button', 'Get Started', '#').url}
              className="flex min-w-[84px] max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#197fe6] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#197fe6]/90 focus:outline-none focus:ring-4 focus:ring-[#197fe6]/30 transition-colors"
              editable={editable}
              onChange={onContentChange}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
