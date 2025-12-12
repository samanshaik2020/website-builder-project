'use client';

import React, { useState, useEffect } from 'react';
import { EditableButton } from '@/components/editor/editable-button';
import { EditableImage } from '@/components/editor/editable-image';
import { BaseTemplateProps } from '@/types/template';

interface FestivalSaleProps extends BaseTemplateProps {
  onContentChange?: (eid: string, value: unknown) => void;
}

export default function FestivalSale({ editable = false, data = {}, onContentChange }: FestivalSaleProps) {
  const getText = (id: string, defaultValue: string) => {
    return data[id]?.text || defaultValue;
  };

  const getButton = (id: string, defaultText: string, defaultUrl: string) => {
    return {
      text: data[id]?.button?.text || defaultText,
      url: data[id]?.button?.url || defaultUrl,
    };
  };

  const getImage = (id: string, defaultValue: string) => {
    return data[id]?.image || defaultValue;
  };

  const handleImageChange = (eid: string, data: { image: string; linkUrl?: string | undefined }) => {
    if (onContentChange) {
      onContentChange(eid, data);
    }
  };

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: parseInt(getText('timer_hours', '23')) || 23,
    minutes: parseInt(getText('timer_minutes', '59')) || 59,
    seconds: parseInt(getText('timer_seconds', '45')) || 45,
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8"
      style={{
        fontFamily: "'Plus Jakarta Sans', 'Noto Sans', sans-serif",
        background: '#221110'
      }}
    >
      <div className="w-full max-w-4xl">
        {/* Top Banner */}
        <h3
          data-eid="top_banner_text"
          contentEditable={editable}
          suppressContentEditableWarning
          className="text-white tracking-wide text-xl sm:text-2xl font-bold leading-tight text-center pb-4 pt-5 whitespace-pre-wrap break-words"
        >
          {getText('top_banner_text', '🔥 MEGA SALE — UP TO 80% OFF')}
        </h3>

        {/* Hero Section */}
        <div className="w-full">
          <div className="relative flex flex-col gap-6 items-center justify-center p-4">
            {/* Product Image with Discount Badge */}
            <div className="relative mb-6">
              <EditableImage
                eid="hero_image"
                defaultSrc={getImage('hero_image', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmWRkGTUrA5QaMfaJLdPOszUcPmGdl5OBL6_Hd593GYOVCC0dqBiRmmFLWZsxfHLYSU6IFKfFak8iY63HZ_pRW6MYOX0SwTBTbO8pis-91fawuoHjsB8O7qYGWjUghj5ZJWYzpF49pHYS44R051glsMr3hhcxdhpfKxOk7Nm-lVti7Qat7mrAJ0XD4dewhH-wdHfQUXLq3qgN3ToNeWDOFsCRQlTxGtQbHQCzjg0hcAyvClyK2HEWyiPUoeoiUhMokziuItauXASw')}
                alt="Product"
                className="w-full max-w-md sm:max-w-lg h-auto object-contain drop-shadow-2xl"
                editable={editable}
                onChange={handleImageChange}
              />
              <div className="absolute -top-8 -right-8 sm:-top-10 sm:-right-10 flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36 bg-yellow-400 rounded-full text-center transform -rotate-12">
                <div className="flex flex-col">
                  <span
                    data-eid="discount_percentage"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-4xl sm:text-5xl font-black text-red-600 leading-none whitespace-pre-wrap break-words"
                  >
                    {getText('discount_percentage', '-80%')}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-red-600 uppercase">OFF</span>
                </div>
              </div>
            </div>

            {/* Hero Text */}
            <div className="flex flex-col gap-4 text-center">
              <h1
                data-eid="hero_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-white text-4xl font-black leading-tight tracking-tight sm:text-6xl whitespace-pre-wrap break-words"
              >
                {getText('hero_title', 'Unbelievable Discounts')}
              </h1>
              <h2
                data-eid="hero_subtitle"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-white/80 text-lg font-normal leading-normal sm:text-xl whitespace-pre-wrap break-words"
              >
                {getText('hero_subtitle', "Grab It Before It's Gone!")}
              </h2>
            </div>

            {/* Product Info & Features */}
            <div className="flex flex-col items-center gap-4 mt-4 w-full max-w-lg">
              <h3
                data-eid="product_name"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-white text-2xl font-bold whitespace-pre-wrap break-words"
              >
                {getText('product_name', 'Aero-Boost Runners')}
              </h3>
              <p
                data-eid="product_tagline"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-white/70 italic whitespace-pre-wrap break-words"
              >
                {getText('product_tagline', 'Experience the future of speed and comfort.')}
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full text-center mt-4">
                <div className="flex flex-col items-center gap-2 p-2 rounded bg-white/5">
                  <span className="text-yellow-400 text-3xl">🏆</span>
                  <p
                    data-eid="feature_1_text"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-white text-sm whitespace-pre-wrap break-words"
                  >
                    {getText('feature_1_text', 'Premium Build')}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2 p-2 rounded bg-white/5">
                  <span className="text-yellow-400 text-3xl">🚀</span>
                  <p
                    data-eid="feature_2_text"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-white text-sm whitespace-pre-wrap break-words"
                  >
                    {getText('feature_2_text', 'Top Performance')}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2 p-2 rounded bg-white/5">
                  <span className="text-yellow-400 text-3xl">✓</span>
                  <p
                    data-eid="feature_3_text"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-white text-sm whitespace-pre-wrap break-words"
                  >
                    {getText('feature_3_text', '2-Year Warranty')}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2 p-2 rounded bg-white/5">
                  <span className="text-yellow-400 text-3xl">⭐</span>
                  <p
                    data-eid="feature_4_text"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-white text-sm whitespace-pre-wrap break-words"
                  >
                    {getText('feature_4_text', 'Bestseller')}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <EditableButton
              eid="cta_button"
              defaultText={getButton('cta_button', 'Shop Now', '#').text}
              defaultUrl={getButton('cta_button', 'Shop Now', '#').url}
              className="flex min-w-[84px] w-full max-w-sm cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-5 mt-8 text-white text-lg font-bold leading-normal tracking-wide transition-transform duration-300 hover:scale-105"
              style={{
                background: '#f43625',
                boxShadow: '0 0 15px 5px rgba(244, 54, 37, 0.4), 0 0 30px 10px rgba(244, 54, 37, 0.3)'
              }}
              editable={editable}
              onChange={onContentChange}
            />

            {/* Meta Text */}
            <p
              data-eid="meta_text"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-sm font-normal leading-normal text-center mt-2 whitespace-pre-wrap break-words"
              style={{ color: '#ba9e9c' }}
            >
              {getText('meta_text', 'Fast Delivery · Easy Returns · Secure Payments')}
            </p>
          </div>
        </div>

        {/* Urgency Sub-banner and Timer */}
        <div className="mt-8 border-t border-white/10 pt-8 w-full">
          <p
            data-eid="urgency_text"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4 text-center whitespace-pre-wrap break-words"
          >
            {getText('urgency_text', 'Limited stock • Today only • Prices will increase soon')}
          </p>

          {/* Timer */}
          <div className="flex gap-2 sm:gap-4 py-6 px-4 max-w-sm mx-auto">
            <div className="flex grow basis-0 flex-col items-stretch gap-2 sm:gap-4">
              <div className="flex h-16 sm:h-20 grow items-center justify-center rounded bg-white/10">
                <p className="text-white text-2xl sm:text-3xl font-bold leading-tight tracking-tight">
                  {formatTime(timeLeft.hours)}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <p className="text-white/80 text-xs sm:text-sm font-normal leading-normal">Hours</p>
              </div>
            </div>
            <div className="flex grow basis-0 flex-col items-stretch gap-2 sm:gap-4">
              <div className="flex h-16 sm:h-20 grow items-center justify-center rounded bg-white/10">
                <p className="text-white text-2xl sm:text-3xl font-bold leading-tight tracking-tight">
                  {formatTime(timeLeft.minutes)}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <p className="text-white/80 text-xs sm:text-sm font-normal leading-normal">Minutes</p>
              </div>
            </div>
            <div className="flex grow basis-0 flex-col items-stretch gap-2 sm:gap-4">
              <div className="flex h-16 sm:h-20 grow items-center justify-center rounded bg-white/10">
                <p className="text-white text-2xl sm:text-3xl font-bold leading-tight tracking-tight">
                  {formatTime(timeLeft.seconds)}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <p className="text-white/80 text-xs sm:text-sm font-normal leading-normal">Seconds</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
