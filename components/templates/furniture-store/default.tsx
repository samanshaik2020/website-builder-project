'use client'

import React from 'react'
import { EditableButton } from '@/components/editor/editable-button'
import { EditableImage } from '@/components/editor/editable-image'
import { BaseTemplateProps } from '@/types/template'

export default function FurnitureStoreTemplate({
  editable = false,
  data = {},
  onContentChange = () => { },
}: BaseTemplateProps) {
  const getText = (eid: string, defaultText: string) => {
    return data[eid]?.text || defaultText
  }

  const getButton = (eid: string, defaultText: string, defaultUrl: string) => {
    return data[eid]?.button || { text: defaultText, url: defaultUrl }
  }

  const getImage = (eid: string, defaultSrc: string) => {
    return data[eid]?.image || defaultSrc
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div
            data-eid="nav_brand"
            contentEditable={editable}
            suppressContentEditableWarning
            className="text-2xl font-bold text-gray-800 whitespace-pre-wrap break-words"
          >
            {getText('nav_brand', 'cocoVillage')}
          </div>
          <div className="flex gap-8">
            <div data-eid="nav_link1" contentEditable={editable} suppressContentEditableWarning className="text-gray-600 hover:text-gray-900 cursor-pointer whitespace-pre-wrap break-words">
              {getText('nav_link1', 'Home')}
            </div>
            <div data-eid="nav_link2" contentEditable={editable} suppressContentEditableWarning className="text-gray-600 hover:text-gray-900 cursor-pointer whitespace-pre-wrap break-words">
              {getText('nav_link2', 'Products')}
            </div>
            <div data-eid="nav_link3" contentEditable={editable} suppressContentEditableWarning className="text-gray-600 hover:text-gray-900 cursor-pointer whitespace-pre-wrap break-words">
              {getText('nav_link3', 'About')}
            </div>
            <div data-eid="nav_link4" contentEditable={editable} suppressContentEditableWarning className="text-gray-600 hover:text-gray-900 cursor-pointer whitespace-pre-wrap break-words">
              {getText('nav_link4', 'Contact')}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-orange-50 py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="w-1/2">
              <div data-eid="hero_badge" contentEditable={editable} suppressContentEditableWarning className="text-teal-600 text-sm font-semibold mb-2 whitespace-pre-wrap break-words">
                {getText('hero_badge', 'GET')}
              </div>
              <div data-eid="hero_discount" contentEditable={editable} suppressContentEditableWarning className="text-6xl font-bold text-teal-700 mb-2 whitespace-pre-wrap break-words">
                {getText('hero_discount', '50%')}
              </div>
              <div data-eid="hero_discount_text" contentEditable={editable} suppressContentEditableWarning className="text-4xl font-bold text-gray-700 mb-4 whitespace-pre-wrap break-words">
                {getText('hero_discount_text', 'OFF')}
              </div>
              <h1 data-eid="hero_title" contentEditable={editable} suppressContentEditableWarning className="text-3xl font-bold text-gray-800 mb-4 whitespace-pre-wrap break-words">
                {getText('hero_title', 'BEDS AND BEDDING SETS!')}
              </h1>
              <p data-eid="hero_description" contentEditable={editable} suppressContentEditableWarning className="text-gray-600 mb-6 max-w-md whitespace-pre-wrap break-words">
                {getText('hero_description', 'Transform your bedroom into a cozy sanctuary with our premium collection of beds and bedding sets.')}
              </p>
              <div style={{ backgroundColor: '#ff7f6e' }} className="inline-block rounded-full">
                <EditableButton
                  eid="hero_cta"
                  defaultText={getButton('hero_cta', 'Shop Now', '#products').text}
                  defaultUrl={getButton('hero_cta', 'Shop Now', '#products').url}
                  className="text-white px-8 py-3 rounded-full hover:opacity-90 transition-colors"
                  editable={editable}
                  onChange={onContentChange}
                />
              </div>
            </div>
            <div className="w-1/2 flex justify-end">
              <EditableImage
                eid="hero_image"
                defaultSrc={getImage('hero_image', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=800&fit=crop')}
                alt="Bedroom"
                className="rounded-3xl w-full max-w-2xl h-96 object-cover shadow-2xl"
                editable={editable}
                onChange={onContentChange}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Beds Section */}
      <section id="products" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-start gap-12 mb-12">
            <h2 data-eid="beds_title" contentEditable={editable} suppressContentEditableWarning className="text-5xl font-bold whitespace-pre-wrap break-words" style={{ color: '#ffb5a7' }}>
              {getText('beds_title', 'BEDS')}
            </h2>
            <div className="flex-1">
              <p data-eid="beds_description" contentEditable={editable} suppressContentEditableWarning className="text-gray-600 leading-relaxed whitespace-pre-wrap break-words">
                {getText('beds_description', "Let's make right bed choice and bright design, we have beautiful and solid wood beds available in various sizes and designs including modern beds, bunk beds, and storage beds.")}
              </p>
            </div>
          </div>

          {/* Beds Grid */}
          <div className="grid grid-cols-3 gap-8 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <EditableImage
                  eid={`bed${i}_image`}
                  defaultSrc={getImage(`bed${i}_image`, `https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop&sig=${i}`)}
                  alt={`Bed ${i}`}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                  editable={editable}
                  onChange={onContentChange}
                />
                <h3 data-eid={`bed${i}_title`} contentEditable={editable} suppressContentEditableWarning className="text-xl font-bold text-gray-800 mb-2 whitespace-pre-wrap break-words">
                  {getText(`bed${i}_title`, `HOUSE BEDS`)}
                </h3>
                <p data-eid={`bed${i}_price`} contentEditable={editable} suppressContentEditableWarning className="text-gray-600 mb-4 whitespace-pre-wrap break-words">
                  {getText(`bed${i}_price`, `Starting at $${299 + i * 50}`)}
                </p>
                <div style={{ borderColor: '#ff7f6e', color: '#ff7f6e' }} className="inline-block">
                  <EditableButton
                    eid={`bed${i}_cta`}
                    defaultText={getButton(`bed${i}_cta`, 'Shop now', '#').text}
                    defaultUrl={getButton(`bed${i}_cta`, 'Shop now', '#').url}
                    className="border-2 px-6 py-2 rounded-full hover:bg-orange-50 transition-colors"
                    editable={editable}
                    onChange={onContentChange}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-3 gap-8">
            {[4, 5, 6].map((i) => (
              <div key={i} className="text-center">
                <EditableImage
                  eid={`bed${i}_image`}
                  defaultSrc={getImage(`bed${i}_image`, `https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&h=300&fit=crop&sig=${i}`)}
                  alt={`Bed ${i}`}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                  editable={editable}
                  onChange={onContentChange}
                />
                <h3 data-eid={`bed${i}_title`} contentEditable={editable} suppressContentEditableWarning className="text-xl font-bold text-gray-800 mb-2 whitespace-pre-wrap break-words">
                  {getText(`bed${i}_title`, `LOFT BED`)}
                </h3>
                <p data-eid={`bed${i}_price`} contentEditable={editable} suppressContentEditableWarning className="text-gray-600 mb-4 whitespace-pre-wrap break-words">
                  {getText(`bed${i}_price`, `$${2500 + i * 200}.00 $${2300 + i * 200}`)}
                </p>
                <div style={{ borderColor: '#ff7f6e', color: '#ff7f6e' }} className="inline-block">
                  <EditableButton
                    eid={`bed${i}_cta`}
                    defaultText={getButton(`bed${i}_cta`, 'Shop now', '#').text}
                    defaultUrl={getButton(`bed${i}_cta`, 'Shop now', '#').url}
                    className="border-2 px-6 py-2 rounded-full hover:bg-orange-50 transition-colors"
                    editable={editable}
                    onChange={onContentChange}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bedding Sets Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex items-start gap-12 mb-12">
            <h2 data-eid="bedding_title" contentEditable={editable} suppressContentEditableWarning className="text-5xl font-bold whitespace-pre-wrap break-words" style={{ color: '#ffb5a7' }}>
              {getText('bedding_title', 'BEDDING SETS')}
            </h2>
            <div className="flex-1">
              <p data-eid="bedding_description" contentEditable={editable} suppressContentEditableWarning className="text-gray-600 leading-relaxed whitespace-pre-wrap break-words">
                {getText('bedding_description', 'The bed linen is an indispensable should have to construct a bed. It not only can make the bed more soft and warm, but also can decorate the bed and make it more beautiful.')}
              </p>
            </div>
          </div>

          {/* Bedding Grid */}
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <EditableImage
                  eid={`bedding${i}_image`}
                  defaultSrc={getImage(`bedding${i}_image`, `https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&h=300&fit=crop&sig=${i}`)}
                  alt={`Bedding ${i}`}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  editable={editable}
                  onChange={onContentChange}
                />
                <h3 data-eid={`bedding${i}_title`} contentEditable={editable} suppressContentEditableWarning className="text-lg font-bold text-gray-800 mb-2 whitespace-pre-wrap break-words">
                  {getText(`bedding${i}_title`, `BEDDING SET ${i}`)}
                </h3>
                <p data-eid={`bedding${i}_price`} contentEditable={editable} suppressContentEditableWarning className="text-gray-600 mb-4 whitespace-pre-wrap break-words">
                  {getText(`bedding${i}_price`, `$${79 + i * 5}.99`)}
                </p>
                <div style={{ borderColor: '#ff7f6e', color: '#ff7f6e' }} className="inline-block">
                  <EditableButton
                    eid={`bedding${i}_cta`}
                    defaultText={getButton(`bedding${i}_cta`, 'Shop now', '#').text}
                    defaultUrl={getButton(`bedding${i}_cta`, 'Shop now', '#').url}
                    className="border-2 px-6 py-2 rounded-full hover:bg-orange-50 transition-colors text-sm"
                    editable={editable}
                    onChange={onContentChange}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillows Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 data-eid="pillows_title" contentEditable={editable} suppressContentEditableWarning className="text-4xl font-bold text-teal-600 text-center mb-4 whitespace-pre-wrap break-words">
            {getText('pillows_title', 'AND MANY FUN PILLOWS')}
          </h2>
          <p data-eid="pillows_subtitle" contentEditable={editable} suppressContentEditableWarning className="text-2xl text-gray-600 text-center mb-12 whitespace-pre-wrap break-words">
            {getText('pillows_subtitle', 'AT $29.99 $20')}
          </p>

          {/* Pillows Grid */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <EditableImage
                key={i}
                eid={`pillow${i}_image`}
                defaultSrc={getImage(`pillow${i}_image`, `https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=300&h=300&fit=crop&sig=${i}`)}
                alt={`Pillow ${i}`}
                className="w-full h-48 object-cover rounded-lg"
                editable={editable}
                onChange={onContentChange}
              />
            ))}
          </div>

          <div className="text-center">
            <div style={{ borderColor: '#ff7f6e', color: '#ff7f6e' }} className="inline-block">
              <EditableButton
                eid="pillows_cta"
                defaultText={getButton('pillows_cta', 'Shop now', '#').text}
                defaultUrl={getButton('pillows_cta', 'Shop now', '#').url}
                className="border-2 px-8 py-3 rounded-full hover:bg-orange-50 transition-colors"
                editable={editable}
                onChange={onContentChange}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative">
                <EditableImage
                  eid={`instagram${i}_image`}
                  defaultSrc={getImage(`instagram${i}_image`, `https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop&sig=${i}`)}
                  alt={`Instagram ${i}`}
                  className="w-full h-80 object-cover rounded-lg"
                  editable={editable}
                  onChange={onContentChange}
                />
                <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg">
                  <div data-eid={`instagram${i}_handle`} contentEditable={editable} suppressContentEditableWarning className="text-sm font-semibold whitespace-pre-wrap break-words">
                    {getText(`instagram${i}_handle`, '@cocovillage')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 data-eid="about_title" contentEditable={editable} suppressContentEditableWarning className="text-4xl font-bold text-teal-700 mb-6 whitespace-pre-wrap break-words">
            {getText('about_title', 'ABOUT COCO VILLAGE')}
          </h2>
          <p data-eid="about_description" contentEditable={editable} suppressContentEditableWarning className="text-gray-600 leading-relaxed whitespace-pre-wrap break-words">
            {getText('about_description', 'Coco Village is proud to offer unique furniture and accessories for the importance of children. We believe every child deserves a comfortable and inspiring space to grow, learn, and dream. Our carefully curated collection combines safety, quality, and beautiful design.')}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <div data-eid="footer_brand" contentEditable={editable} suppressContentEditableWarning className="text-2xl font-bold mb-4 whitespace-pre-wrap break-words">
            {getText('footer_brand', 'cocoVillage')}
          </div>
          <p data-eid="footer_copyright" contentEditable={editable} suppressContentEditableWarning className="text-gray-400 whitespace-pre-wrap break-words">
            {getText('footer_copyright', '© 2025 cocoVillage. All rights reserved.')}
          </p>
        </div>
      </footer>
    </div>
  )
}
