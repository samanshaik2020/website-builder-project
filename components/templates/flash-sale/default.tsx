'use client';

import React, { useState, useEffect } from 'react';
import { EditableButton } from '@/components/editor/editable-button';
import { EditableImage } from '@/components/editor/editable-image';
import { BaseTemplateProps } from '@/types/template';

interface FlashSaleProps extends BaseTemplateProps {
  onContentChange?: (eid: string, value: unknown) => void;
}

export default function FlashSale({ editable = false, data = {}, onContentChange }: FlashSaleProps) {
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
    hours: parseInt(getText('hero_timer_hours', '03')) || 3,
    minutes: parseInt(getText('hero_timer_mins', '45')) || 45,
    seconds: parseInt(getText('hero_timer_secs', '20')) || 20,
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
    <div className="min-h-screen bg-gray-50 text-gray-800" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Top Banner */}
      <div className="bg-red-800 text-white text-center py-2 text-xs md:text-sm font-bold tracking-wide">
        <span
          data-eid="top_banner_text"
          contentEditable={editable}
          suppressContentEditableWarning
        >
          {getText('top_banner_text', '⚡ FLASH SALE: UP TO 70% OFF Today Only! Use Code:')}
        </span>
        {' '}
        <span
          data-eid="top_banner_code"
          contentEditable={editable}
          suppressContentEditableWarning
          className="bg-yellow-400 text-red-900 px-1 rounded whitespace-pre-wrap break-words"
        >
          {getText('top_banner_code', 'FLASH70')}
        </span>
        {' at checkout. Ends Soon! ⚡'}
      </div>

      {/* Hero Section */}
      <section className="text-white relative overflow-hidden pb-12 pt-8" style={{ background: 'linear-gradient(135deg, #8B0000 0%, #DC2626 50%, #EF4444 100%)' }}>
        <div className="absolute top-1/2 left-0 w-full h-32 bg-white opacity-5 transform -translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center relative z-10">
          <div className="text-center md:text-left space-y-6">
            <h1
              data-eid="hero_title"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-4xl md:text-6xl font-black uppercase leading-tight whitespace-pre-wrap break-words"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
            >
              {getText('hero_title', 'Limited-Time Flash Deal: Up to 70% Off!')}
            </h1>
            <p
              data-eid="hero_description"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-lg md:text-xl text-red-100 max-w-lg mx-auto md:mx-0 whitespace-pre-wrap break-words"
            >
              {getText('hero_description', "Experience superior sound quality and comfort. Don't miss our biggest sale of the year!")}
            </p>

            {/* Countdown Timer */}
            <div className="flex justify-center md:justify-start gap-4 text-center my-6">
              <div className="bg-black/30 rounded-lg p-3 w-20 backdrop-blur-sm border border-red-400">
                <span className="block text-3xl font-bold font-mono">
                  {formatTime(timeLeft.hours)}
                </span>
                <span className="text-xs uppercase">Hours</span>
              </div>
              <div className="text-3xl font-bold self-center">:</div>
              <div className="bg-black/30 rounded-lg p-3 w-20 backdrop-blur-sm border border-red-400">
                <span className="block text-3xl font-bold font-mono">
                  {formatTime(timeLeft.minutes)}
                </span>
                <span className="text-xs uppercase">Mins</span>
              </div>
              <div className="text-3xl font-bold self-center">:</div>
              <div className="bg-black/30 rounded-lg p-3 w-20 backdrop-blur-sm border border-red-400">
                <span className="block text-3xl font-bold font-mono">
                  {formatTime(timeLeft.seconds)}
                </span>
                <span className="text-xs uppercase">Secs</span>
              </div>
            </div>

            <EditableButton
              eid="hero_cta"
              defaultText={getButton('hero_cta', 'Get Yours Now - Save 70%', '#buy').text}
              defaultUrl={getButton('hero_cta', 'Get Yours Now - Save 70%', '#buy').url}
              className="bg-yellow-500 hover:bg-yellow-400 text-red-900 font-black text-xl py-4 px-10 rounded-full shadow-lg transform hover:scale-105 transition duration-300 w-full md:w-auto uppercase"
              editable={editable}
              onChange={onContentChange}
            />

            <div className="flex justify-center md:justify-start gap-4 text-xs font-semibold pt-2 opacity-90">
              <span>
                <span className="mr-1">✓</span>
                <span
                  data-eid="hero_badge_1"
                  contentEditable={editable}
                  suppressContentEditableWarning
                >
                  {getText('hero_badge_1', '1-Year Warranty')}
                </span>
              </span>
              <span>
                <span className="mr-1">🚚</span>
                <span
                  data-eid="hero_badge_2"
                  contentEditable={editable}
                  suppressContentEditableWarning
                >
                  {getText('hero_badge_2', 'Free Shipping')}
                </span>
              </span>
              <span>
                <span className="mr-1">🔒</span>
                <span
                  data-eid="hero_badge_3"
                  contentEditable={editable}
                  suppressContentEditableWarning
                >
                  {getText('hero_badge_3', 'Secure Payment')}
                </span>
              </span>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-yellow-500 blur-[80px] opacity-20 rounded-full"></div>
            <EditableImage
              eid="hero_image"
              defaultSrc={getImage('hero_image', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop')}
              alt="Product"
              className="relative z-10 w-full drop-shadow-2xl transform group-hover:scale-105 transition duration-500 rounded-2xl"
              editable={editable}
              onChange={handleImageChange}
            />
          </div>
        </div>
      </section>

      {/* Urgency Bar */}
      <div className="bg-black text-white text-center py-4 font-bold text-lg md:text-xl uppercase tracking-wider">
        <span
          data-eid="urgency_bar_text"
          contentEditable={editable}
          suppressContentEditableWarning
        >
          {getText('urgency_bar_text', 'TODAY ONLY: Price Drops, Limited Stock, Instant Savings! Act Fast!')}
        </span>
      </div>

      {/* Quick Offers Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2
            data-eid="offers_title"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-3xl font-bold text-center mb-10 text-gray-900 whitespace-pre-wrap break-words"
          >
            {getText('offers_title', 'Quick Offer Highlights')}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Offer 1 */}
            <div className="bg-gray-100 p-6 rounded-xl flex items-center gap-4 border border-gray-200 shadow-sm">
              <div className="text-4xl text-red-600">🏷️</div>
              <div>
                <h3
                  data-eid="offer_1_title"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="font-bold text-lg whitespace-pre-wrap break-words"
                >
                  {getText('offer_1_title', '70% OFF HEADPHONES')}
                </h3>
                <p
                  data-eid="offer_1_description"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-sm text-gray-600 whitespace-pre-wrap break-words"
                >
                  {getText('offer_1_description', 'Massive discount on our best selling model.')}
                </p>
              </div>
            </div>

            {/* Offer 2 */}
            <div className="bg-gray-100 p-6 rounded-xl flex items-center gap-4 border border-gray-200 shadow-sm">
              <div className="text-4xl text-gray-800">🎁</div>
              <div>
                <h3
                  data-eid="offer_2_title"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="font-bold text-lg whitespace-pre-wrap break-words"
                >
                  {getText('offer_2_title', 'FREE CARRY CASE')}
                </h3>
                <p
                  data-eid="offer_2_description"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-sm text-gray-600 whitespace-pre-wrap break-words"
                >
                  {getText('offer_2_description', 'Includes premium protective case.')}
                </p>
              </div>
            </div>

            {/* Offer 3 */}
            <div className="bg-gray-100 p-6 rounded-xl flex items-center gap-4 border border-gray-200 shadow-sm">
              <div className="text-4xl text-gray-800">🚀</div>
              <div>
                <h3
                  data-eid="offer_3_title"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="font-bold text-lg whitespace-pre-wrap break-words"
                >
                  {getText('offer_3_title', 'NEXT DAY DELIVERY')}
                </h3>
                <p
                  data-eid="offer_3_description"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-sm text-gray-600 whitespace-pre-wrap break-words"
                >
                  {getText('offer_3_description', 'Order by 2 PM for fast shipping.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Benefits Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2
            data-eid="benefits_title"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-3xl font-bold text-center mb-10 whitespace-pre-wrap break-words"
          >
            {getText('benefits_title', 'Product Benefits')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {/* Benefit 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="text-4xl text-red-600 mb-4">🎧</div>
              <h3
                data-eid="benefit_1_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="font-bold text-lg mb-2 whitespace-pre-wrap break-words"
              >
                {getText('benefit_1_title', 'Active Noise Cancellation')}
              </h3>
              <p
                data-eid="benefit_1_description"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-sm text-gray-600 whitespace-pre-wrap break-words"
              >
                {getText('benefit_1_description', 'Immerse yourself in music without distractions.')}
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="text-4xl text-red-600 mb-4">🔋</div>
              <h3
                data-eid="benefit_2_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="font-bold text-lg mb-2 whitespace-pre-wrap break-words"
              >
                {getText('benefit_2_title', '30+ Hour Battery Life')}
              </h3>
              <p
                data-eid="benefit_2_description"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-sm text-gray-600 whitespace-pre-wrap break-words"
              >
                {getText('benefit_2_description', 'Long lasting power for all-day listening.')}
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="text-4xl text-red-600 mb-4">☁️</div>
              <h3
                data-eid="benefit_3_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="font-bold text-lg mb-2 whitespace-pre-wrap break-words"
              >
                {getText('benefit_3_title', 'Supreme Comfort')}
              </h3>
              <p
                data-eid="benefit_3_description"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-sm text-gray-600 whitespace-pre-wrap break-words"
              >
                {getText('benefit_3_description', 'Ergonomic design for extended wear.')}
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="text-4xl text-red-600 mb-4">🎤</div>
              <h3
                data-eid="benefit_4_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="font-bold text-lg mb-2 whitespace-pre-wrap break-words"
              >
                {getText('benefit_4_title', 'Crystal Clear Calls')}
              </h3>
              <p
                data-eid="benefit_4_description"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-sm text-gray-600 whitespace-pre-wrap break-words"
              >
                {getText('benefit_4_description', 'Built-in mic for seamless communication.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <h2
            data-eid="features_title"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-3xl font-bold text-center mb-8 whitespace-pre-wrap break-words"
          >
            {getText('features_title', 'Detailed Product Features')}
          </h2>

          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <EditableImage
              eid="feature_1_image"
              defaultSrc={getImage('feature_1_image', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=350&fit=crop')}
              alt="Feature 1"
              className="rounded-2xl shadow-lg w-full"
              editable={editable}
              onChange={handleImageChange}
            />
            <div>
              <h3
                data-eid="feature_1_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-2xl font-bold mb-4 whitespace-pre-wrap break-words"
              >
                {getText('feature_1_title', 'Intuitive Touch Controls')}
              </h3>
              <p
                data-eid="feature_1_description"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-gray-600 mb-4 whitespace-pre-wrap break-words"
              >
                {getText('feature_1_description', 'Effortlessly manage volume, tracks, and calls with a simple tap on the ear cup. No need to reach for your phone.')}
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <span className="text-green-500 mr-2">✓</span>
                  <span
                    data-eid="feature_1_bullet_1"
                    contentEditable={editable}
                    suppressContentEditableWarning
                  >
                    {getText('feature_1_bullet_1', 'Swipe for volume')}
                  </span>
                </li>
                <li>
                  <span className="text-green-500 mr-2">✓</span>
                  <span
                    data-eid="feature_1_bullet_2"
                    contentEditable={editable}
                    suppressContentEditableWarning
                  >
                    {getText('feature_1_bullet_2', 'Tap to pause/play')}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="md:order-2">
              <EditableImage
                eid="feature_2_image"
                defaultSrc={getImage('feature_2_image', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=350&fit=crop')}
                alt="Feature 2"
                className="rounded-2xl shadow-lg w-full"
                editable={editable}
                onChange={handleImageChange}
              />
            </div>
            <div className="md:order-1">
              <h3
                data-eid="feature_2_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-2xl font-bold mb-4 whitespace-pre-wrap break-words"
              >
                {getText('feature_2_title', 'Portable and Foldable Design')}
              </h3>
              <p
                data-eid="feature_2_description"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-gray-600 mb-4 whitespace-pre-wrap break-words"
              >
                {getText('feature_2_description', 'Compact and easy to carry anywhere. The premium hinges allow the headphones to fold flat into the included travel case.')}
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <span className="text-green-500 mr-2">✓</span>
                  <span
                    data-eid="feature_2_bullet_1"
                    contentEditable={editable}
                    suppressContentEditableWarning
                  >
                    {getText('feature_2_bullet_1', 'Travel-ready')}
                  </span>
                </li>
                <li>
                  <span className="text-green-500 mr-2">✓</span>
                  <span
                    data-eid="feature_2_bullet_2"
                    contentEditable={editable}
                    suppressContentEditableWarning
                  >
                    {getText('feature_2_bullet_2', 'Lightweight construction')}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2
            data-eid="gallery_title"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-3xl font-bold text-center mb-10 whitespace-pre-wrap break-words"
          >
            {getText('gallery_title', 'Product Gallery')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 md:col-span-2 row-span-2">
              <EditableImage
                eid="gallery_1"
                defaultSrc={getImage('gallery_1', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop')}
                alt="Main Gallery"
                className="w-full h-full object-cover rounded-xl shadow-sm"
                editable={editable}
                onChange={handleImageChange}
              />
            </div>
            <EditableImage
              eid="gallery_2"
              defaultSrc={getImage('gallery_2', 'https://images.unsplash.com/photo-1558756520-22cfe5d382ca?w=300&h=300&fit=crop')}
              alt="Gallery 2"
              className="w-full rounded-xl shadow-sm aspect-square object-cover"
              editable={editable}
              onChange={handleImageChange}
            />
            <EditableImage
              eid="gallery_3"
              defaultSrc={getImage('gallery_3', 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=300&h=300&fit=crop')}
              alt="Gallery 3"
              className="w-full rounded-xl shadow-sm aspect-square object-cover"
              editable={editable}
              onChange={handleImageChange}
            />
            <EditableImage
              eid="gallery_4"
              defaultSrc={getImage('gallery_4', 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=300&h=300&fit=crop')}
              alt="Gallery 4"
              className="w-full rounded-xl shadow-sm aspect-square object-cover"
              editable={editable}
              onChange={handleImageChange}
            />
            <EditableImage
              eid="gallery_5"
              defaultSrc={getImage('gallery_5', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop')}
              alt="Gallery 5"
              className="w-full rounded-xl shadow-sm aspect-square object-cover"
              editable={editable}
              onChange={handleImageChange}
            />
          </div>
        </div>
      </section>

      {/* Stock & Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          {/* Stock Indicator */}
          <div className="mb-10 text-center">
            <h3 className="text-xl font-bold mb-2 text-red-600">Stock & Scarcity</h3>
            <div className="w-full bg-gray-200 rounded-full h-6 mb-2 relative overflow-hidden">
              <div
                className="bg-red-600 h-6 rounded-full text-xs text-white flex items-center justify-center font-bold"
                style={{ width: `${getText('stock_percentage', '85')}%` }}
              >
                <span
                  data-eid="stock_percentage"
                  contentEditable={editable}
                  suppressContentEditableWarning
                >
                  {getText('stock_percentage', '85')}
                </span>% SOLD
              </div>
            </div>
            <p
              data-eid="stock_message"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-sm font-bold text-gray-800 whitespace-pre-wrap break-words"
            >
              {getText('stock_message', 'HURRY! Only 150 units left at this price. 500+ people viewing this product right now!')}
            </p>
          </div>

          {/* Pricing Card */}
          <div className="bg-neutral-900 text-white rounded-3xl p-8 md:p-12 text-center shadow-2xl border-4 border-red-600 relative">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-lg">
              <span
                data-eid="pricing_badge"
                contentEditable={editable}
                suppressContentEditableWarning
              >
                {getText('pricing_badge', 'Best Deal Ever')}
              </span>
            </div>

            <h2
              data-eid="pricing_label"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-2xl font-light text-gray-400 mb-2 whitespace-pre-wrap break-words"
            >
              {getText('pricing_label', 'FLASH SALE PRICE')}
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span
                data-eid="pricing_original"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-3xl text-gray-500 line-through whitespace-pre-wrap break-words"
              >
                {getText('pricing_original', '$299.99')}
              </span>
              <span
                data-eid="pricing_sale"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-6xl md:text-7xl font-black text-red-500 whitespace-pre-wrap break-words"
              >
                {getText('pricing_sale', '$89.99')}
              </span>
            </div>

            <EditableButton
              eid="pricing_cta"
              defaultText={getButton('pricing_cta', 'BUY NOW & SAVE $210', '#checkout').text}
              defaultUrl={getButton('pricing_cta', 'BUY NOW & SAVE $210', '#checkout').url}
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-black text-2xl py-4 px-12 rounded-full shadow-lg transform hover:scale-105 transition duration-300 w-full md:w-auto mb-6"
              editable={editable}
              onChange={onContentChange}
            />

            <div className="flex justify-center gap-4 text-2xl text-gray-400">
              <span>💳</span>
              <span>💳</span>
              <span>💳</span>
              <span>💳</span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2
            data-eid="reviews_title"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-3xl font-bold text-center mb-2 whitespace-pre-wrap break-words"
          >
            {getText('reviews_title', 'Customer Reviews')}
          </h2>
          <p
            data-eid="reviews_subtitle"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-center text-gray-600 mb-10 whitespace-pre-wrap break-words"
          >
            {getText('reviews_subtitle', '4.9/5 Stars based on 500+ reviews')}
          </p>

          <div className="space-y-4">
            {/* Review 1 */}
            <div className="bg-white p-4 rounded-lg shadow-sm flex gap-4 items-start">
              <EditableImage
                eid="review_1_image"
                defaultSrc={getImage('review_1_image', 'https://i.pravatar.cc/150?img=1')}
                alt="Reviewer"
                className="w-12 h-12 rounded-full object-cover"
                editable={editable}
                onChange={handleImageChange}
              />
              <div>
                <div className="text-yellow-400 text-sm mb-1">⭐⭐⭐⭐⭐</div>
                <p
                  data-eid="review_1_text"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="font-bold text-sm whitespace-pre-wrap break-words"
                >
                  {getText('review_1_text', '"Amazing sound quality and comfort!"')}
                </p>
                <p
                  data-eid="review_1_author"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-xs text-gray-500 mt-1"
                >
                  {getText('review_1_author', '- Sarah J.')}
                </p>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-4 rounded-lg shadow-sm flex gap-4 items-start">
              <EditableImage
                eid="review_2_image"
                defaultSrc={getImage('review_2_image', 'https://i.pravatar.cc/150?img=3')}
                alt="Reviewer"
                className="w-12 h-12 rounded-full object-cover"
                editable={editable}
                onChange={handleImageChange}
              />
              <div>
                <div className="text-yellow-400 text-sm mb-1">⭐⭐⭐⭐⭐</div>
                <p
                  data-eid="review_2_text"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="font-bold text-sm whitespace-pre-wrap break-words"
                >
                  {getText('review_2_text', '"Best deal ever, incredible value."')}
                </p>
                <p
                  data-eid="review_2_author"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-xs text-gray-500 mt-1"
                >
                  {getText('review_2_author', '- Mike T.')}
                </p>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white p-4 rounded-lg shadow-sm flex gap-4 items-start">
              <EditableImage
                eid="review_3_image"
                defaultSrc={getImage('review_3_image', 'https://i.pravatar.cc/150?img=5')}
                alt="Reviewer"
                className="w-12 h-12 rounded-full object-cover"
                editable={editable}
                onChange={handleImageChange}
              />
              <div>
                <div className="text-yellow-400 text-sm mb-1">⭐⭐⭐⭐⭐</div>
                <p
                  data-eid="review_3_text"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="font-bold text-sm whitespace-pre-wrap break-words"
                >
                  {getText('review_3_text', '"Great headphones, fast delivery."')}
                </p>
                <p
                  data-eid="review_3_author"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-xs text-gray-500 mt-1"
                >
                  {getText('review_3_author', '- Emily K.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2
            data-eid="how_it_works_title"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-2xl font-bold mb-8 whitespace-pre-wrap break-words"
          >
            {getText('how_it_works_title', 'How It Works')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div>
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3
                data-eid="step_1_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="font-bold whitespace-pre-wrap break-words"
              >
                {getText('step_1_title', 'Add to Cart')}
              </h3>
              <p
                data-eid="step_1_description"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-sm text-gray-600 whitespace-pre-wrap break-words"
              >
                {getText('step_1_description', 'Select your quantity and click buy.')}
              </p>
            </div>

            {/* Step 2 */}
            <div>
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3
                data-eid="step_2_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="font-bold whitespace-pre-wrap break-words"
              >
                {getText('step_2_title', 'Checkout Securely')}
              </h3>
              <p
                data-eid="step_2_description"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-sm text-gray-600 whitespace-pre-wrap break-words"
              >
                {getText('step_2_description', 'Enter your shipping details.')}
              </p>
            </div>

            {/* Step 3 */}
            <div>
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3
                data-eid="step_3_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="font-bold whitespace-pre-wrap break-words"
              >
                {getText('step_3_title', 'Enjoy Your Headphones')}
              </h3>
              <p
                data-eid="step_3_description"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-sm text-gray-600 whitespace-pre-wrap break-words"
              >
                {getText('step_3_description', 'Fast delivery to your door.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <h2
            data-eid="faq_title"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-2xl font-bold text-center mb-8 whitespace-pre-wrap break-words"
          >
            {getText('faq_title', 'FAQ Section')}
          </h2>
          <div className="space-y-4">
            {/* FAQ 1 */}
            <details className="bg-white p-4 rounded-lg shadow-sm cursor-pointer group">
              <summary className="font-semibold flex justify-between items-center list-none">
                <span
                  data-eid="faq_1_question"
                  contentEditable={editable}
                  suppressContentEditableWarning
                >
                  {getText('faq_1_question', 'How long does shipping take?')}
                </span>
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p
                data-eid="faq_1_answer"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-gray-600 mt-2 text-sm"
              >
                {getText('faq_1_answer', 'We offer Next Day Delivery if you order before 2 PM. Standard shipping takes 2-4 business days.')}
              </p>
            </details>

            {/* FAQ 2 */}
            <details className="bg-white p-4 rounded-lg shadow-sm cursor-pointer group">
              <summary className="font-semibold flex justify-between items-center list-none">
                <span
                  data-eid="faq_2_question"
                  contentEditable={editable}
                  suppressContentEditableWarning
                >
                  {getText('faq_2_question', 'What is the return policy?')}
                </span>
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p
                data-eid="faq_2_answer"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-gray-600 mt-2 text-sm"
              >
                {getText('faq_2_answer', 'We have a 30-day money-back guarantee. No questions asked.')}
              </p>
            </details>

            {/* FAQ 3 */}
            <details className="bg-white p-4 rounded-lg shadow-sm cursor-pointer group">
              <summary className="font-semibold flex justify-between items-center list-none">
                <span
                  data-eid="faq_3_question"
                  contentEditable={editable}
                  suppressContentEditableWarning
                >
                  {getText('faq_3_question', 'Is there a warranty?')}
                </span>
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p
                data-eid="faq_3_answer"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-gray-600 mt-2 text-sm"
              >
                {getText('faq_3_answer', 'Yes, all headphones come with a 1-year manufacturer warranty.')}
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 text-center">
        <h3
          data-eid="footer_cta_title"
          contentEditable={editable}
          suppressContentEditableWarning
          className="text-2xl font-bold mb-4 whitespace-pre-wrap break-words"
        >
          {getText('footer_cta_title', "Don't Miss Out - Sale Ends Soon!")}
        </h3>
        <EditableButton
          eid="footer_cta_button"
          defaultText={getButton('footer_cta_button', 'SHOP FLASH SALE NOW', '#buy').text}
          defaultUrl={getButton('footer_cta_button', 'SHOP FLASH SALE NOW', '#buy').url}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-full mb-8"
          editable={editable}
          onChange={onContentChange}
        />
        <div className="flex justify-center gap-6 text-sm text-gray-400 mb-4">
          <span
            data-eid="footer_link_1"
            contentEditable={editable}
            suppressContentEditableWarning
            className="hover:text-white cursor-pointer"
          >
            {getText('footer_link_1', 'About Us')}
          </span>
          <span
            data-eid="footer_link_2"
            contentEditable={editable}
            suppressContentEditableWarning
            className="hover:text-white cursor-pointer"
          >
            {getText('footer_link_2', 'Contact')}
          </span>
          <span
            data-eid="footer_link_3"
            contentEditable={editable}
            suppressContentEditableWarning
            className="hover:text-white cursor-pointer"
          >
            {getText('footer_link_3', 'Privacy Policy')}
          </span>
          <span
            data-eid="footer_link_4"
            contentEditable={editable}
            suppressContentEditableWarning
            className="hover:text-white cursor-pointer"
          >
            {getText('footer_link_4', 'Terms of Service')}
          </span>
        </div>
        <div className="flex justify-center gap-4 text-xl mb-4">
          <span>📘</span>
          <span>📷</span>
          <span>🐦</span>
        </div>
        <p
          data-eid="footer_copyright"
          contentEditable={editable}
          suppressContentEditableWarning
          className="text-xs text-gray-600"
        >
          {getText('footer_copyright', '© 2024 FlashDeals Inc. All Rights Reserved.')}
        </p>
      </footer>
    </div>
  );
}
