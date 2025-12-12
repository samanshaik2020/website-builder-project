'use client';

import React, { useState } from 'react';
import { EditableImage } from '@/components/editor/editable-image';
import { EditableButton } from '@/components/editor/editable-button';
import { BaseTemplateProps } from '@/types/template';

interface GalaxyPhoneTemplateProps extends BaseTemplateProps {
  onContentChange?: (eid: string, value: unknown) => void;
}

export default function GalaxyPhoneTemplate({
  editable = false,
  data = {},
  onContentChange,
}: GalaxyPhoneTemplateProps) {
  const getText = (id: string, defaultValue: string) => {
    return data[id]?.text || defaultValue;
  };

  const getImage = (id: string, defaultValue: string) => {
    return data[id]?.image || defaultValue;
  };

  const getButton = (id: string, defaultText: string, defaultUrl: string = '#') => {
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

  // Image slider state
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderImages = [
    { eid: 'hero_image_1', default: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcQ8vje5f3LPncIbhlcuI1VkjQdi0mxfu-02iE0W-BlV4yMzBptIc7HWITJ0a4F7VZaDdHMjfM8PT-VdaNQwaWkISCTLPOfqQ-C1iIZf3lA2mMRjnBTKJCW89dimJu-x76sR5aHZP_NzEn0gybgRkYX1CC-VCf_9Rwm6JTvNU3gs4dpgjjQ9XquSh-lRr72aBV7c17dMSawS-hx1GsuFSsag57wo51tZfrxrgOg4Keur73ypcPWal9li-B4d014XxNnQYNQGoVDJs', label: 'Front View' },
    { eid: 'hero_image_2', default: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=600&fit=crop', label: 'Back View' },
    { eid: 'hero_image_3', default: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=600&fit=crop', label: 'Side View' },
    { eid: 'hero_image_4', default: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=600&fit=crop', label: 'Camera' },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  return (
    <div className="bg-[#f6f7f8] min-h-screen" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 px-4 sm:px-10 py-3 bg-white sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-slate-900">
            <span className="material-symbols-outlined text-2xl text-[#2b8cee]">interests</span>
            <h2
              data-eid="nav_brand"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-lg font-bold leading-tight tracking-[-0.015em] whitespace-pre-wrap break-words"
            >
              {getText('nav_brand', 'Galaxy')}
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-9">
            <span
              data-eid="nav_link_1"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-slate-800 text-sm font-medium leading-normal cursor-pointer hover:text-[#2b8cee]"
            >
              {getText('nav_link_1', 'Phones')}
            </span>
            <span
              data-eid="nav_link_2"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-slate-800 text-sm font-medium leading-normal cursor-pointer hover:text-[#2b8cee]"
            >
              {getText('nav_link_2', 'Tablets')}
            </span>
            <span
              data-eid="nav_link_3"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-slate-800 text-sm font-medium leading-normal cursor-pointer hover:text-[#2b8cee]"
            >
              {getText('nav_link_3', 'Watches')}
            </span>
            <span
              data-eid="nav_link_4"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-slate-800 text-sm font-medium leading-normal cursor-pointer hover:text-[#2b8cee]"
            >
              {getText('nav_link_4', 'Deals')}
            </span>
          </div>
        </div>
        <div className="flex flex-1 justify-end items-center gap-2">
          <div className="hidden sm:flex">
            <label className="flex flex-col min-w-40 h-10 max-w-64">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div className="text-slate-500 flex border-none bg-slate-100 items-center justify-center pl-3 rounded-l-lg border-r-0">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-0 focus:ring-0 border-none bg-slate-100 focus:border-none h-full placeholder:text-slate-500 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                  placeholder="Search"
                />
              </div>
            </label>
          </div>
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-slate-100 text-slate-900 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-slate-100 text-slate-900 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </header>

      <main className="py-5">
        <div className="mx-auto flex flex-col gap-12">
          {/* Hero Image Slider Section */}
          <div className="w-full lg:w-[88%] lg:mx-auto px-0 md:px-8 lg:px-0">
            <div className="flex flex-col gap-4">
              <div className="relative bg-slate-100 rounded-none lg:rounded-xl aspect-square md:aspect-video overflow-hidden group">
                {/* Slider Images */}
                <div className="relative w-full h-full">
                  {sliderImages.map((img, index) => (
                    <div
                      key={img.eid}
                      className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    >
                      <EditableImage
                        eid={img.eid}
                        defaultSrc={getImage(img.eid, img.default)}
                        alt={`Product ${img.label}`}
                        className="w-full h-full object-cover"
                        editable={editable}
                        onChange={handleImageChange}
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Previous slide"
                >
                  <span className="material-symbols-outlined text-slate-700">chevron_left</span>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Next slide"
                >
                  <span className="material-symbols-outlined text-slate-700">chevron_right</span>
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent z-20">
                  <div className="flex justify-center gap-2 p-5">
                    {sliderImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`size-2.5 rounded-full transition-all ${index === currentSlide
                            ? 'bg-white scale-110'
                            : 'bg-white/50 hover:bg-white/70'
                          }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:justify-center sm:mx-0 sm:px-0">
                {sliderImages.map((img, index) => (
                  <button
                    key={img.eid}
                    onClick={() => setCurrentSlide(index)}
                    className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-all ${index === currentSlide
                        ? 'bg-[#2b8cee]/20 text-[#2b8cee] border-2 border-[#2b8cee]'
                        : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                      }`}
                  >
                    <p className="text-sm font-medium leading-normal">{img.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="px-4 sm:px-8 md:px-16 lg:px-24">
            <div className="max-w-4xl mx-auto flex flex-col gap-6">
              <h1
                data-eid="hero_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-slate-900 tracking-tight text-4xl sm:text-5xl font-bold leading-tight text-left whitespace-pre-wrap break-words"
              >
                {getText('hero_title', 'Galaxy S25 Ultra 5G')}
              </h1>

              {/* Rating */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="flex items-center gap-2">
                  <span
                    data-eid="hero_rating"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-slate-900 text-lg font-bold"
                  >
                    {getText('hero_rating', '4.8')}
                  </span>
                  <div className="flex gap-0.5">
                    <span className="material-symbols-outlined text-[#2b8cee]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[#2b8cee]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[#2b8cee]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[#2b8cee]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[#2b8cee]">star_half</span>
                  </div>
                </div>
                <span
                  data-eid="hero_reviews_count"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-slate-600 text-sm font-normal leading-normal underline cursor-pointer"
                >
                  {getText('hero_reviews_count', '1,284 reviews')}
                </span>
              </div>

              {/* Pricing Card */}
              <div className="flex flex-col gap-4 p-4 bg-white rounded-xl border border-slate-200">
                <div className="flex items-baseline gap-4 flex-wrap">
                  <span
                    data-eid="price_current"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-4xl font-bold text-slate-900"
                  >
                    {getText('price_current', '$999.00')}
                  </span>
                  <span
                    data-eid="price_original"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-xl font-medium text-slate-500 line-through"
                  >
                    {getText('price_original', '$1299.00')}
                  </span>
                  <span
                    data-eid="price_discount"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-sm font-bold text-orange-500 bg-orange-500/10 px-2 py-1 rounded-md"
                  >
                    {getText('price_discount', '-30%')}
                  </span>
                </div>
                <p
                  data-eid="price_savings"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-sm text-slate-600"
                >
                  {getText('price_savings', 'You save $300.00. Free delivery by Tomorrow.')}
                </p>
              </div>

              {/* Color Selection */}
              <div className="flex flex-col gap-3">
                <p className="text-base font-medium text-slate-800">
                  <span
                    data-eid="color_label"
                    contentEditable={editable}
                    suppressContentEditableWarning
                  >
                    {getText('color_label', 'Color:')}
                  </span>
                  {' '}
                  <span
                    data-eid="color_name"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="font-bold"
                  >
                    {getText('color_name', 'Titanium Gray')}
                  </span>
                </p>
                <div className="flex gap-3">
                  <button className="size-8 rounded-full bg-[#a1a1aa] ring-2 ring-[#2b8cee] ring-offset-2 ring-offset-[#f6f7f8]"></button>
                  <button className="size-8 rounded-full bg-[#1e40af]"></button>
                  <button className="size-8 rounded-full bg-[#fde047]"></button>
                  <button className="size-8 rounded-full bg-[#171717]"></button>
                </div>
              </div>

              {/* Storage Selection */}
              <div className="flex flex-col gap-3">
                <p className="text-base font-medium text-slate-800">
                  <span
                    data-eid="storage_label"
                    contentEditable={editable}
                    suppressContentEditableWarning
                  >
                    {getText('storage_label', 'Storage:')}
                  </span>
                  {' '}
                  <span
                    data-eid="storage_selected"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="font-bold"
                  >
                    {getText('storage_selected', '256GB')}
                  </span>
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 rounded-lg bg-[#2b8cee]/20 text-[#2b8cee] border-2 border-[#2b8cee]">
                    <span
                      data-eid="storage_option_1"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="font-bold"
                    >
                      {getText('storage_option_1', '256GB')}
                    </span>
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                    <span
                      data-eid="storage_option_2"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="font-bold"
                    >
                      {getText('storage_option_2', '512GB')}
                    </span>
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                    <span
                      data-eid="storage_option_3"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="font-bold"
                    >
                      {getText('storage_option_3', '1TB')}
                    </span>
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-4 pt-4">
                <EditableButton
                  eid="cta_buy_now"
                  defaultText={getButton('cta_buy_now', 'Buy Now').text}
                  defaultUrl={getButton('cta_buy_now', 'Buy Now', '#').url}
                  className="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-4 bg-[#2b8cee] text-white text-base font-bold leading-normal tracking-[0.015em]"
                  editable={editable}
                  onChange={onContentChange}
                />
                <EditableButton
                  eid="cta_add_cart"
                  defaultText={getButton('cta_add_cart', 'Add to Cart').text}
                  defaultUrl={getButton('cta_add_cart', 'Add to Cart', '#').url}
                  className="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-4 bg-[#2b8cee]/20 text-[#2b8cee] text-base font-bold leading-normal tracking-[0.015em]"
                  editable={editable}
                  onChange={onContentChange}
                />
                <div className="flex items-center justify-center gap-2 text-slate-500">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  <p className="text-xs">Secure Checkout</p>
                </div>
              </div>
            </div>

            {/* Quick Highlights */}
            <div className="mt-16 max-w-4xl mx-auto">
              <h2
                data-eid="highlights_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-3xl font-bold text-slate-900 mb-8 text-center whitespace-pre-wrap break-words"
              >
                {getText('highlights_title', 'Quick Highlights')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Highlight 1 */}
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-slate-200">
                  <span className="material-symbols-outlined text-4xl text-[#2b8cee] mb-3">photo_camera</span>
                  <h3
                    data-eid="highlight_1_title"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="font-bold text-lg text-slate-800 whitespace-pre-wrap break-words"
                  >
                    {getText('highlight_1_title', 'Pro-Grade Camera')}
                  </h3>
                  <p
                    data-eid="highlight_1_description"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-sm text-slate-600 mt-1 whitespace-pre-wrap break-words"
                  >
                    {getText('highlight_1_description', '200MP sensor for incredible detail in any light.')}
                  </p>
                </div>
                {/* Highlight 2 */}
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-slate-200">
                  <span className="material-symbols-outlined text-4xl text-[#2b8cee] mb-3">battery_charging_full</span>
                  <h3
                    data-eid="highlight_2_title"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="font-bold text-lg text-slate-800 whitespace-pre-wrap break-words"
                  >
                    {getText('highlight_2_title', 'All-Day Battery')}
                  </h3>
                  <p
                    data-eid="highlight_2_description"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-sm text-slate-600 mt-1 whitespace-pre-wrap break-words"
                  >
                    {getText('highlight_2_description', '5000mAh intelligent battery that lasts longer than your day.')}
                  </p>
                </div>
                {/* Highlight 3 */}
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-slate-200">
                  <span className="material-symbols-outlined text-4xl text-[#2b8cee] mb-3">fullscreen</span>
                  <h3
                    data-eid="highlight_3_title"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="font-bold text-lg text-slate-800 whitespace-pre-wrap break-words"
                  >
                    {getText('highlight_3_title', 'Dynamic Display')}
                  </h3>
                  <p
                    data-eid="highlight_3_description"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-sm text-slate-600 mt-1 whitespace-pre-wrap break-words"
                  >
                    {getText('highlight_3_description', '6.8" Dynamic AMOLED 2X with 120Hz refresh rate.')}
                  </p>
                </div>
                {/* Highlight 4 */}
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-slate-200">
                  <span className="material-symbols-outlined text-4xl text-[#2b8cee] mb-3">memory</span>
                  <h3
                    data-eid="highlight_4_title"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="font-bold text-lg text-slate-800 whitespace-pre-wrap break-words"
                  >
                    {getText('highlight_4_title', 'Ultimate Performance')}
                  </h3>
                  <p
                    data-eid="highlight_4_description"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-sm text-slate-600 mt-1 whitespace-pre-wrap break-words"
                  >
                    {getText('highlight_4_description', 'Next-gen processor for unparalleled speed and power.')}
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Specifications */}
            <div className="mt-16 max-w-4xl mx-auto">
              <h2
                data-eid="specs_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-3xl font-bold text-slate-900 mb-8 text-center whitespace-pre-wrap break-words"
              >
                {getText('specs_title', 'Detailed Specifications')}
              </h2>
              <div className="flow-root">
                <dl className="-my-3 divide-y divide-slate-200 text-sm">
                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt
                      data-eid="spec_1_label"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="font-medium text-slate-800"
                    >
                      {getText('spec_1_label', 'Display')}
                    </dt>
                    <dd
                      data-eid="spec_1_value"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-slate-600 sm:col-span-2"
                    >
                      {getText('spec_1_value', '6.8" Quad HD+ Dynamic AMOLED 2X, 120Hz')}
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt
                      data-eid="spec_2_label"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="font-medium text-slate-800"
                    >
                      {getText('spec_2_label', 'Processor')}
                    </dt>
                    <dd
                      data-eid="spec_2_value"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-slate-600 sm:col-span-2"
                    >
                      {getText('spec_2_value', 'Snapdragon 9 Gen 4 for Galaxy')}
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt
                      data-eid="spec_3_label"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="font-medium text-slate-800"
                    >
                      {getText('spec_3_label', 'RAM')}
                    </dt>
                    <dd
                      data-eid="spec_3_value"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-slate-600 sm:col-span-2"
                    >
                      {getText('spec_3_value', '12GB / 16GB')}
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt
                      data-eid="spec_4_label"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="font-medium text-slate-800"
                    >
                      {getText('spec_4_label', 'Camera')}
                    </dt>
                    <dd
                      data-eid="spec_4_value"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-slate-600 sm:col-span-2"
                    >
                      {getText('spec_4_value', '200MP Wide, 12MP Ultra-Wide, 50MP 5x Telephoto, 10MP 3x Telephoto')}
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt
                      data-eid="spec_5_label"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="font-medium text-slate-800"
                    >
                      {getText('spec_5_label', 'Battery')}
                    </dt>
                    <dd
                      data-eid="spec_5_value"
                      contentEditable={editable}
                      suppressContentEditableWarning
                      className="text-slate-600 sm:col-span-2"
                    >
                      {getText('spec_5_value', '5,000mAh, 45W Super Fast Charging')}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="mt-16 max-w-4xl mx-auto p-6 sm:p-8 bg-white rounded-xl border border-slate-200">
              <h2
                data-eid="reviews_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-2xl font-bold text-slate-900 mb-6"
              >
                {getText('reviews_title', 'Customer Reviews')}
              </h2>
              <div className="flex flex-wrap gap-x-8 gap-y-6">
                <div className="flex flex-col gap-2">
                  <p
                    data-eid="reviews_rating"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-slate-900 text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em]"
                  >
                    {getText('reviews_rating', '4.8')}
                  </p>
                  <div className="flex gap-0.5">
                    <span className="material-symbols-outlined text-[#2b8cee] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[#2b8cee] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[#2b8cee] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[#2b8cee] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[#2b8cee] text-xl">star_half</span>
                  </div>
                  <p
                    data-eid="reviews_total"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-slate-600 text-base font-normal leading-normal"
                  >
                    {getText('reviews_total', 'Based on 1,284 reviews')}
                  </p>
                </div>
                <div className="grid min-w-[200px] max-w-[400px] flex-1 grid-cols-[20px_1fr_40px] items-center gap-y-3">
                  <p className="text-slate-800 text-sm font-normal leading-normal">5</p>
                  <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                    <div className="rounded-full bg-[#2b8cee]" style={{ width: '85%' }}></div>
                  </div>
                  <span
                    data-eid="reviews_5_star"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-slate-500 text-sm font-normal leading-normal text-right"
                  >
                    {getText('reviews_5_star', '85%')}
                  </span>
                  <p className="text-slate-800 text-sm font-normal leading-normal">4</p>
                  <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                    <div className="rounded-full bg-[#2b8cee]" style={{ width: '10%' }}></div>
                  </div>
                  <span
                    data-eid="reviews_4_star"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-slate-500 text-sm font-normal leading-normal text-right"
                  >
                    {getText('reviews_4_star', '10%')}
                  </span>
                  <p className="text-slate-800 text-sm font-normal leading-normal">3</p>
                  <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                    <div className="rounded-full bg-[#2b8cee]" style={{ width: '3%' }}></div>
                  </div>
                  <span
                    data-eid="reviews_3_star"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-slate-500 text-sm font-normal leading-normal text-right"
                  >
                    {getText('reviews_3_star', '3%')}
                  </span>
                  <p className="text-slate-800 text-sm font-normal leading-normal">2</p>
                  <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                    <div className="rounded-full bg-[#2b8cee]" style={{ width: '1%' }}></div>
                  </div>
                  <span
                    data-eid="reviews_2_star"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-slate-500 text-sm font-normal leading-normal text-right"
                  >
                    {getText('reviews_2_star', '1%')}
                  </span>
                  <p className="text-slate-800 text-sm font-normal leading-normal">1</p>
                  <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                    <div className="rounded-full bg-[#2b8cee]" style={{ width: '1%' }}></div>
                  </div>
                  <span
                    data-eid="reviews_1_star"
                    contentEditable={editable}
                    suppressContentEditableWarning
                    className="text-slate-500 text-sm font-normal leading-normal text-right"
                  >
                    {getText('reviews_1_star', '1%')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
