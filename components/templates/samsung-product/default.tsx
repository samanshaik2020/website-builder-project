'use client';

import React from 'react';
import { EditableButton } from '@/components/editor/editable-button';
import { EditableImage } from '@/components/editor/editable-image';
import { BaseTemplateProps } from '@/types/template';

interface SamsungProductProps extends BaseTemplateProps {
  onContentChange?: (eid: string, value: unknown) => void;
}

export default function SamsungProduct({ editable = false, data = {}, onContentChange }: SamsungProductProps) {
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

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span
              data-eid="nav_brand"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-2xl font-bold tracking-wider"
            >
              {getText('nav_brand', 'SAMSUNG')}
            </span>
            <div className="hidden md:flex gap-6 text-sm">
              <span
                data-eid="nav_link_1"
                contentEditable={editable}
                suppressContentEditableWarning
                className="hover:opacity-70 cursor-pointer transition"
              >
                {getText('nav_link_1', 'Mobile')}
              </span>
              <span
                data-eid="nav_link_2"
                contentEditable={editable}
                suppressContentEditableWarning
                className="hover:opacity-70 cursor-pointer transition"
              >
                {getText('nav_link_2', 'TV & AV')}
              </span>
              <span
                data-eid="nav_link_3"
                contentEditable={editable}
                suppressContentEditableWarning
                className="hover:opacity-70 cursor-pointer transition"
              >
                {getText('nav_link_3', 'Home Appliances')}
              </span>
            </div>
          </div>
          <EditableButton
            eid="nav_cta"
            defaultText={getButton('nav_cta', 'Buy Now', '#buy').text}
            defaultUrl={getButton('nav_cta', 'Buy Now', '#buy').url}
            className="px-6 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition"
            editable={editable}
            onChange={onContentChange}
          />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <p
              data-eid="hero_badge"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-sm font-semibold text-blue-600 mb-4 tracking-wider uppercase"
            >
              {getText('hero_badge', 'NEW ARRIVAL')}
            </p>
            <h1
              data-eid="hero_title"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-5xl md:text-7xl font-bold text-black mb-6 tracking-tight"
            >
              {getText('hero_title', 'Galaxy S24 Ultra')}
            </h1>
            <p
              data-eid="hero_subtitle"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              {getText('hero_subtitle', 'The most powerful Galaxy yet. Experience innovation at its finest.')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <EditableButton
                eid="hero_cta_primary"
                defaultText={getButton('hero_cta_primary', 'Pre-order now', '#preorder').text}
                defaultUrl={getButton('hero_cta_primary', 'Pre-order now', '#preorder').url}
                className="px-8 py-4 bg-black text-white text-lg font-semibold rounded-full hover:bg-gray-800 transition"
                editable={editable}
                onChange={onContentChange}
              />
              <EditableButton
                eid="hero_cta_secondary"
                defaultText={getButton('hero_cta_secondary', 'Learn more', '#learn').text}
                defaultUrl={getButton('hero_cta_secondary', 'Learn more', '#learn').url}
                className="px-8 py-4 bg-white text-black text-lg font-semibold rounded-full border-2 border-black hover:bg-gray-100 transition"
                editable={editable}
                onChange={onContentChange}
              />
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="mt-12 flex justify-center">
            <EditableImage
              eid="hero_image"
              defaultSrc={getImage('hero_image', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&h=600&fit=crop')}
              alt="Product"
              className="w-full max-w-4xl aspect-video rounded-3xl object-cover"
              editable={editable}
              onChange={handleImageChange}
            />
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            data-eid="features_title"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            {getText('features_title', 'Key Features')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📱</span>
              </div>
              <h3
                data-eid="feature_1_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-2xl font-bold mb-4"
              >
                {getText('feature_1_title', 'Dynamic AMOLED Display')}
              </h3>
              <p
                data-eid="feature_1_description"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-gray-400 leading-relaxed"
              >
                {getText('feature_1_description', 'Experience stunning visuals with our brightest display ever. 6.8-inch screen with 120Hz refresh rate for smooth scrolling.')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📸</span>
              </div>
              <h3
                data-eid="feature_2_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-2xl font-bold mb-4"
              >
                {getText('feature_2_title', 'Pro-Grade Camera')}
              </h3>
              <p
                data-eid="feature_2_description"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-gray-400 leading-relaxed"
              >
                {getText('feature_2_description', '200MP main camera with AI-powered zoom. Capture every detail with professional-quality photos and 8K video recording.')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h3
                data-eid="feature_3_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-2xl font-bold mb-4"
              >
                {getText('feature_3_title', 'All-Day Battery')}
              </h3>
              <p
                data-eid="feature_3_description"
                contentEditable={editable}
                suppressContentEditableWarning
                className="text-gray-400 leading-relaxed"
              >
                {getText('feature_3_description', '5000mAh battery with super-fast charging. Power through your day and recharge in minutes, not hours.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            data-eid="specs_title"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-black"
          >
            {getText('specs_title', 'Technical Specifications')}
          </h2>
          
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {/* Spec 1 */}
              <div className="p-8">
                <h4
                  data-eid="spec_1_label"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2"
                >
                  {getText('spec_1_label', 'Processor')}
                </h4>
                <p
                  data-eid="spec_1_value"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-xl font-bold text-black"
                >
                  {getText('spec_1_value', 'Snapdragon 8 Gen 3')}
                </p>
              </div>

              {/* Spec 2 */}
              <div className="p-8">
                <h4
                  data-eid="spec_2_label"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2"
                >
                  {getText('spec_2_label', 'Memory')}
                </h4>
                <p
                  data-eid="spec_2_value"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-xl font-bold text-black"
                >
                  {getText('spec_2_value', '12GB RAM / 512GB Storage')}
                </p>
              </div>

              {/* Spec 3 */}
              <div className="p-8">
                <h4
                  data-eid="spec_3_label"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2"
                >
                  {getText('spec_3_label', 'Display')}
                </h4>
                <p
                  data-eid="spec_3_value"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-xl font-bold text-black"
                >
                  {getText('spec_3_value', '6.8" Dynamic AMOLED 2X')}
                </p>
              </div>

              {/* Spec 4 */}
              <div className="p-8">
                <h4
                  data-eid="spec_4_label"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2"
                >
                  {getText('spec_4_label', 'Camera')}
                </h4>
                <p
                  data-eid="spec_4_value"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="text-xl font-bold text-black"
                >
                  {getText('spec_4_value', '200MP + 12MP + 10MP + 10MP')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            data-eid="gallery_title"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-black"
          >
            {getText('gallery_title', 'See It In Action')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <EditableImage
              eid="gallery_1"
              defaultSrc={getImage('gallery_1', 'https://images.unsplash.com/photo-1592286927505-b0e6067f7f2e?w=600&h=600&fit=crop')}
              alt="Gallery Image 1"
              className="aspect-square rounded-2xl object-cover"
              editable={editable}
              onChange={handleImageChange}
            />
            <EditableImage
              eid="gallery_2"
              defaultSrc={getImage('gallery_2', 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop')}
              alt="Gallery Image 2"
              className="aspect-square rounded-2xl object-cover"
              editable={editable}
              onChange={handleImageChange}
            />
            <EditableImage
              eid="gallery_3"
              defaultSrc={getImage('gallery_3', 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&h=600&fit=crop')}
              alt="Gallery Image 3"
              className="aspect-square rounded-2xl object-cover"
              editable={editable}
              onChange={handleImageChange}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2
            data-eid="pricing_title"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            {getText('pricing_title', 'Get Yours Today')}
          </h2>
          <p
            data-eid="pricing_subtitle"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-xl text-gray-400 mb-8"
          >
            {getText('pricing_subtitle', 'Available in multiple colors and storage options')}
          </p>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8">
            <p
              data-eid="pricing_label"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-sm text-gray-400 mb-2"
            >
              {getText('pricing_label', 'Starting at')}
            </p>
            <p
              data-eid="pricing_amount"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-6xl font-bold mb-4"
            >
              {getText('pricing_amount', '$1,199')}
            </p>
            <p
              data-eid="pricing_description"
              contentEditable={editable}
              suppressContentEditableWarning
              className="text-gray-400 mb-6"
            >
              {getText('pricing_description', 'or $49.95/mo. for 24 months')}
            </p>
            <EditableButton
              eid="pricing_cta"
              defaultText={getButton('pricing_cta', 'Buy Now', '#buy').text}
              defaultUrl={getButton('pricing_cta', 'Buy Now', '#buy').url}
              className="w-full py-4 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition"
              editable={editable}
              onChange={onContentChange}
            />
          </div>

          <p
            data-eid="pricing_note"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-sm text-gray-500"
          >
            {getText('pricing_note', 'Free shipping and 30-day returns. Trade-in available.')}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4
                data-eid="footer_col_1_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="font-bold mb-4"
              >
                {getText('footer_col_1_title', 'Products')}
              </h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p
                  data-eid="footer_col_1_link_1"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="hover:text-white cursor-pointer"
                >
                  {getText('footer_col_1_link_1', 'Smartphones')}
                </p>
                <p
                  data-eid="footer_col_1_link_2"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="hover:text-white cursor-pointer"
                >
                  {getText('footer_col_1_link_2', 'Tablets')}
                </p>
                <p
                  data-eid="footer_col_1_link_3"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="hover:text-white cursor-pointer"
                >
                  {getText('footer_col_1_link_3', 'Wearables')}
                </p>
              </div>
            </div>

            <div>
              <h4
                data-eid="footer_col_2_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="font-bold mb-4"
              >
                {getText('footer_col_2_title', 'Support')}
              </h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p
                  data-eid="footer_col_2_link_1"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="hover:text-white cursor-pointer"
                >
                  {getText('footer_col_2_link_1', 'Contact Us')}
                </p>
                <p
                  data-eid="footer_col_2_link_2"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="hover:text-white cursor-pointer"
                >
                  {getText('footer_col_2_link_2', 'FAQs')}
                </p>
                <p
                  data-eid="footer_col_2_link_3"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="hover:text-white cursor-pointer"
                >
                  {getText('footer_col_2_link_3', 'Warranty')}
                </p>
              </div>
            </div>

            <div>
              <h4
                data-eid="footer_col_3_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="font-bold mb-4"
              >
                {getText('footer_col_3_title', 'Company')}
              </h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p
                  data-eid="footer_col_3_link_1"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="hover:text-white cursor-pointer"
                >
                  {getText('footer_col_3_link_1', 'About Us')}
                </p>
                <p
                  data-eid="footer_col_3_link_2"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="hover:text-white cursor-pointer"
                >
                  {getText('footer_col_3_link_2', 'Careers')}
                </p>
                <p
                  data-eid="footer_col_3_link_3"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="hover:text-white cursor-pointer"
                >
                  {getText('footer_col_3_link_3', 'Press')}
                </p>
              </div>
            </div>

            <div>
              <h4
                data-eid="footer_col_4_title"
                contentEditable={editable}
                suppressContentEditableWarning
                className="font-bold mb-4"
              >
                {getText('footer_col_4_title', 'Follow Us')}
              </h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p
                  data-eid="footer_social_1"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="hover:text-white cursor-pointer"
                >
                  {getText('footer_social_1', 'Facebook')}
                </p>
                <p
                  data-eid="footer_social_2"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="hover:text-white cursor-pointer"
                >
                  {getText('footer_social_2', 'Twitter')}
                </p>
                <p
                  data-eid="footer_social_3"
                  contentEditable={editable}
                  suppressContentEditableWarning
                  className="hover:text-white cursor-pointer"
                >
                  {getText('footer_social_3', 'Instagram')}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p
              data-eid="footer_copyright"
              contentEditable={editable}
              suppressContentEditableWarning
            >
              {getText('footer_copyright', '© 2024 Samsung Electronics. All rights reserved.')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
