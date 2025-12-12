'use client';

import React, { useState, useEffect } from 'react';
import { EditableButton } from '@/components/editor/editable-button';
import { EditableImage } from '@/components/editor/editable-image';

interface MegaDiscountTemplateProps {
  editable?: boolean;
  data?: Record<string, any>;
  onContentChange?: (id: string, value: any) => void;
}

export const MegaDiscountTemplate: React.FC<MegaDiscountTemplateProps> = ({
  editable = false,
  data = {},
  onContentChange,
}) => {
  const getText = (id: string, defaultText: string) => {
    return data[id]?.text || defaultText;
  };

  const getButton = (id: string, defaultText: string, defaultUrl: string = '#') => {
    return {
      text: data[id]?.button?.text || defaultText,
      url: data[id]?.button?.url || defaultUrl,
    };
  };

  const getImage = (id: string, defaultSrc: string) => {
    return data[id]?.image || defaultSrc;
  };

  const handleImageChange = (id: string, imageData: { image: string; linkUrl?: string | undefined }) => {
    if (onContentChange) {
      onContentChange(id, { image: imageData.image });
    }
  };

  const ctaButton = getButton('cta_button', 'Buy Now & Save 70%', '#buy');

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: parseInt(getText('timer_days', '01')) || 1,
    hours: parseInt(getText('timer_hours', '18')) || 18,
    minutes: parseInt(getText('timer_minutes', '45')) || 45,
    seconds: parseInt(getText('timer_seconds', '33')) || 33,
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="bg-[#F8FAFC] min-h-screen" style={{ fontFamily: "'Lato', sans-serif" }}>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700;900&family=Lato:wght@400;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <div className="flex h-full grow flex-col">
          <div className="flex flex-1 justify-center py-8 md:py-12 lg:py-16">
            <div className="flex flex-col w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8">

              {/* Flash Sale Banner */}
              <div className="w-full text-center mb-6">
                <p
                  data-eid="flash_banner_text"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-[#4B5563] text-sm font-normal leading-normal py-2 px-4 inline-flex items-center gap-1 rounded-full bg-[#A7F3D0] text-[#1F2937]"
                >
                  <span className="material-symbols-outlined text-base">bolt</span>
                  {getText('flash_banner_text', 'FLASH SALE LIVE — UP TO 70% OFF')}
                </p>
              </div>

              {/* Main Content */}
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch py-4 lg:py-8">

                {/* Left Column */}
                <div className="flex flex-col gap-6 w-full lg:w-1/2">

                  {/* Hero Card */}
                  <div className="p-6 md:p-8 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
                    <h1
                      data-eid="hero_title"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-[#1F2937] text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tighter whitespace-pre-wrap break-words"
                      style={{ fontFamily: "'Rubik', sans-serif" }}
                    >
                      {getText('hero_title', '🔥 Mega Discount Sale Is Live — Grab It Now!')}
                    </h1>
                    <p
                      data-eid="hero_description"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-[#4B5563] text-base md:text-lg font-normal leading-normal whitespace-pre-wrap break-words"
                    >
                      {getText('hero_description', 'Limited-time offer. Prices slashed up to 70%. Hurry before stock runs out!')}
                    </p>
                  </div>

                  {/* Countdown Timer Card */}
                  <div className="p-6 md:p-8 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
                    <h3
                      data-eid="timer_title"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-[#1F2937] text-xl font-bold mb-2 whitespace-pre-wrap break-words"
                      style={{ fontFamily: "'Rubik', sans-serif" }}
                    >
                      {getText('timer_title', 'Time Remaining:')}
                    </h3>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#67E8F9] text-[#1F2937]">
                        <p
                          className="text-3xl md:text-4xl font-bold"
                          style={{ fontFamily: "'Rubik', sans-serif" }}
                        >
                          {formatTime(timeLeft.days)}
                        </p>
                        <p className="text-xs sm:text-sm">Days</p>
                      </div>
                      <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#67E8F9] text-[#1F2937]">
                        <p
                          className="text-3xl md:text-4xl font-bold"
                          style={{ fontFamily: "'Rubik', sans-serif" }}
                        >
                          {formatTime(timeLeft.hours)}
                        </p>
                        <p className="text-xs sm:text-sm">Hours</p>
                      </div>
                      <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#67E8F9] text-[#1F2937]">
                        <p
                          className="text-3xl md:text-4xl font-bold"
                          style={{ fontFamily: "'Rubik', sans-serif" }}
                        >
                          {formatTime(timeLeft.minutes)}
                        </p>
                        <p className="text-xs sm:text-sm">Minutes</p>
                      </div>
                      <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#67E8F9] text-[#1F2937]">
                        <p
                          className="text-3xl md:text-4xl font-bold"
                          style={{ fontFamily: "'Rubik', sans-serif" }}
                        >
                          {formatTime(timeLeft.seconds)}
                        </p>
                        <p className="text-xs sm:text-sm">Seconds</p>
                      </div>
                    </div>
                  </div>

                  {/* Key Features Card */}
                  <div className="p-6 md:p-8 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
                    <h3
                      data-eid="features_title"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-[#1F2937] text-xl font-bold mb-2 whitespace-pre-wrap break-words"
                      style={{ fontFamily: "'Rubik', sans-serif" }}
                    >
                      {getText('features_title', 'Key Features:')}
                    </h3>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                      <div className="flex flex-col">
                        <p
                          data-eid="feature_1_label"
                          contentEditable={editable}
                          suppressContentEditableWarning
                          className="text-[#6B7280] text-sm"
                        >
                          {getText('feature_1_label', 'Battery life')}
                        </p>
                        <p
                          data-eid="feature_1_value"
                          contentEditable={editable}
                          suppressContentEditableWarning
                          className="text-[#1F2937] text-base font-medium"
                        >
                          {getText('feature_1_value', '24 Hours')}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <p
                          data-eid="feature_2_label"
                          contentEditable={editable}
                          suppressContentEditableWarning
                          className="text-[#6B7280] text-sm"
                        >
                          {getText('feature_2_label', 'Warranty info')}
                        </p>
                        <p
                          data-eid="feature_2_value"
                          contentEditable={editable}
                          suppressContentEditableWarning
                          className="text-[#1F2937] text-base font-medium"
                        >
                          {getText('feature_2_value', '2-Year Full')}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <p
                          data-eid="feature_3_label"
                          contentEditable={editable}
                          suppressContentEditableWarning
                          className="text-[#6B7280] text-sm"
                        >
                          {getText('feature_3_label', 'Quality rating')}
                        </p>
                        <p
                          data-eid="feature_3_value"
                          contentEditable={editable}
                          suppressContentEditableWarning
                          className="text-[#1F2937] text-base font-medium"
                        >
                          {getText('feature_3_value', '★ 4.8/5')}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <p
                          data-eid="feature_4_label"
                          contentEditable={editable}
                          suppressContentEditableWarning
                          className="text-[#6B7280] text-sm"
                        >
                          {getText('feature_4_label', 'Material')}
                        </p>
                        <p
                          data-eid="feature_4_value"
                          contentEditable={editable}
                          suppressContentEditableWarning
                          className="text-[#1F2937] text-base font-medium"
                        >
                          {getText('feature_4_value', 'Aero-grade Aluminum')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Card */}
                  <div className="p-6 md:p-8 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
                    <EditableButton
                      eid="cta_button"
                      defaultText={ctaButton.text}
                      defaultUrl={ctaButton.url}
                      editable={editable}
                      onChange={onContentChange}
                      className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-[#EF4444] text-white text-base font-bold leading-normal tracking-wide hover:opacity-90 transition-opacity"
                    />
                    <p
                      data-eid="cta_subtext"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-[#6B7280] text-sm font-normal leading-normal text-center whitespace-pre-wrap break-words"
                    >
                      {getText('cta_subtext', 'Free Shipping · 30-Day Guarantee · Secure Checkout')}
                    </p>
                  </div>
                </div>

                {/* Right Column - Product Image */}
                <div className="w-full lg:w-1/2 flex items-center justify-center bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8">
                  <div className="relative w-full aspect-square max-w-lg">
                    <EditableImage
                      eid="product_image"
                      defaultSrc={getImage('product_image', 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2HSG1Ii_9pAfHTrf2_UxsSGgA1DkVK2hv5_q7I89y0ilfTucZNtouuhFPNQZv3YOmesnJGqlsd9KOea0w8vbIt16DhPiRNbnLKsNmLhtJsPfD3NRF02XFb4tBexXd67ckY66XWBkfiAUL7CCXHFt9VIKVxD-sfiC-zUTG-JIyk90lN3p_w4ozSYN33PW886KxCdza7lZ_kxiziAfkoqyhap0qL0lU8Rc1oxy8NlP66qwISd9aEPkMoqKly3OQEKJsHw0ggs6k1g')}
                      alt="Product Image"
                      editable={editable}
                      onChange={handleImageChange}
                      className="w-full h-full object-contain rounded-lg"
                    />
                    <div
                      data-eid="discount_badge"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="absolute -top-4 -right-4 bg-[#EF4444] text-white text-lg font-bold px-4 py-2 rounded-full transform rotate-12"
                    >
                      {getText('discount_badge', '-70%')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaDiscountTemplate;
