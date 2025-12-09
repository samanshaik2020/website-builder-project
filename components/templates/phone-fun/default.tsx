'use client';

import React from 'react';
import { SlateEditableText } from '@/components/editor/slate-editable-text';
import { EditableImage } from '@/components/editor/editable-image';
import { EditableButton } from '@/components/editor/editable-button';

interface PhoneFunTemplateProps {
  data?: Record<string, any>;
  editable?: boolean;
  onContentChange?: (eid: string, content: any) => void;
}

export default function PhoneFunTemplate({
  data = {},
  editable = false,
  onContentChange = () => {},
}: PhoneFunTemplateProps) {
  const getText = (eid: string, defaultValue: string) => data[eid]?.text || defaultValue;
  const getImage = (eid: string, defaultValue: string) => data[eid]?.image || defaultValue;
  const getButton = (eid: string, defaultText: string, defaultUrl: string) => 
    data[eid]?.button || { text: defaultText, url: defaultUrl };

  const handleSlateTextChange = (eid: string, value: string) => onContentChange(eid, { text: value });
  const handleImageChange = (eid: string, data: { image: string; linkUrl?: string | undefined }) => onContentChange(eid, data);
  const handleButtonChange = (eid: string, content: { button: { text: string; url: string } }) => 
    onContentChange(eid, content);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;700&family=Architects+Daughter&display=swap" rel="stylesheet" />
      <style>{`
        .font-fredoka { font-family: 'Fredoka', sans-serif; }
        .font-architects { font-family: 'Architects Daughter', cursive; }
      `}</style>
      
      <div className="min-h-screen bg-[#FDFCEE] text-[#222] overflow-x-hidden font-architects">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b-4 border-dashed border-[#0074D9]/30 bg-[#FDFCEE]/90 backdrop-blur-sm shadow-md">
          <div className="container mx-auto flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 text-[#FF4136]">
                <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.998 2.5A4.498 4.498 0 0 0 7.5 7c0 .59.12 1.15.34 1.66A6.5 6.5 0 0 0 4 15c0 1.2.33 2.31.88 3.26A6.5 6.5 0 0 0 12 21.5a6.5 6.5 0 0 0 7.12-3.24A6.5 6.5 0 0 0 20 15a6.5 6.5 0 0 0-3.84-5.84c.22-.5.34-1.07.34-1.66a4.498 4.498 0 0 0-4.5-4.5zm0 1.5a3 3 0 0 1 3 3c0 .5-.11 1-.31 1.45a6.47 6.47 0 0 0-5.38 0A3.49 3.49 0 0 1 9 7a3 3 0 0 1 3-3z"></path>
                </svg>
              </div>
              <div className="font-fredoka">
                <SlateEditableText
                  eid="nav_brand"
                  defaultText={getText('nav_brand', 'AwesomePhone')}
                  className="text-2xl font-bold text-[#0074D9]"
                  editable={editable}
                  onChange={handleSlateTextChange}
                />
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <SlateEditableText eid="nav_link1" defaultText={getText('nav_link1', 'Cool Stuff')} 
                className="text-base hover:text-[#FF4136] transition-colors cursor-pointer" 
                editable={editable} onChange={handleSlateTextChange} />
              <SlateEditableText eid="nav_link2" defaultText={getText('nav_link2', 'The Nitty-Gritty')} 
                className="text-base hover:text-[#FF4136] transition-colors cursor-pointer" 
                editable={editable} onChange={handleSlateTextChange} />
              <SlateEditableText eid="nav_link3" defaultText={getText('nav_link3', 'Happy Talk')} 
                className="text-base hover:text-[#FF4136] transition-colors cursor-pointer" 
                editable={editable} onChange={handleSlateTextChange} />
            </nav>
            <div className="font-fredoka">
              <EditableButton
                eid="nav_cta"
                defaultText={getButton('nav_cta', 'Snag Yours!', '#cta').text}
                defaultUrl={getButton('nav_cta', 'Snag Yours!', '#cta').url}
                className="min-w-[90px] h-10 px-5 bg-[#FF4136] text-white rounded-full font-bold transition-transform hover:scale-105 shadow-lg"
                editable={editable}
                onChange={handleButtonChange}
              />
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute top-1/4 left-0 -translate-x-1/2 w-48 h-48 bg-[#FFDC00] rounded-full mix-blend-multiply opacity-30"></div>
          <div className="absolute bottom-1/4 right-0 translate-x-1/2 w-64 h-64 bg-[#2ECC40] rounded-full mix-blend-multiply opacity-30"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
              <div className="flex w-full flex-col items-center gap-6 text-center lg:w-1/2 lg:items-start lg:text-left">
                <div className="font-fredoka">
                  <SlateEditableText
                    eid="hero_title"
                    defaultText={getText('hero_title', 'Unleash Your Inner Awesome with AwesomePhone!')}
                    className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight tracking-tight text-[#0074D9] -rotate-3 mb-4"
                    editable={editable}
                    onChange={handleSlateTextChange}
                  />
                </div>
                <SlateEditableText
                  eid="hero_subtitle"
                  defaultText={getText('hero_subtitle', 'Super duper camera, screen so bright it\'s basically magic, and performance that zoom-zooms past the rest!')}
                  className="text-lg sm:text-xl text-[#555] transform rotate-1"
                  editable={editable}
                  onChange={handleSlateTextChange}
                />
                <div className="font-fredoka">
                  <EditableButton
                    eid="hero_cta"
                    defaultText={getButton('hero_cta', 'Grab It Now! 🎉', '#cta').text}
                    defaultUrl={getButton('hero_cta', 'Grab It Now! 🎉', '#cta').url}
                    className="h-14 px-6 bg-[#FF4136] text-white text-xl font-bold rounded-[2rem_0.5rem_2rem_0.5rem] transition-transform hover:scale-105 active:scale-95 shadow-xl mt-6"
                    editable={editable}
                    onChange={handleButtonChange}
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 relative transform rotate-6 lg:-rotate-6">
                <div className="relative rounded-xl border-4 border-dashed border-[#FF4136]/50 shadow-2xl p-4 bg-white">
                  <EditableImage
                    eid="hero_image"
                    defaultSrc={getImage('hero_image', 'https://images.unsplash.com/photo-1592286927505-c0d6e2f3f8b7?w=600')}
                    alt="Phone"
                    className="w-full aspect-square object-contain rounded-xl"
                    editable={editable}
                    onChange={handleImageChange}
                  />
                  <SlateEditableText
                    eid="hero_image_caption"
                    defaultText={getText('hero_image_caption', 'Look, it\'s a phone!')}
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[#0074D9] text-lg italic bg-[#FFDC00]/70 px-4 py-2 rounded-full shadow-md -rotate-3"
                    editable={editable}
                    onChange={handleSlateTextChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="container mx-auto px-4 py-16 sm:py-24 relative">
          <div className="flex flex-col gap-6 text-center">
            <div className="font-fredoka">
              <SlateEditableText
                eid="gallery_title"
                defaultText={getText('gallery_title', 'Shoot Like a Pro (Without Actually Being One!) 📸')}
                className="text-4xl sm:text-5xl font-bold tracking-tight text-[#2ECC40] transform rotate-2"
                editable={editable}
                onChange={handleSlateTextChange}
              />
            </div>
            <SlateEditableText
              eid="gallery_subtitle"
              defaultText={getText('gallery_subtitle', 'Capture your world in super-duper detail. From epic landscapes to silly selfies, this camera makes magic happen!')}
              className="text-lg text-[#555] max-w-2xl mx-auto transform -rotate-1"
              editable={editable}
              onChange={handleSlateTextChange}
            />
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 lg:gap-12 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#0074D9] rounded-full mix-blend-multiply opacity-20 z-0"></div>
            
            {[1, 2, 3].map((i) => (
              <div key={i} className={`relative z-10 rounded-xl aspect-[3/4] shadow-xl border-4 ${
                i === 1 ? 'border-solid border-[#FF4136]/50 transform rotate-3 hover:rotate-0' :
                i === 2 ? 'border-dashed border-[#FFDC00]/50 transform -rotate-2 md:mt-16 hover:rotate-0' :
                'border-dotted border-[#0074D9]/50 transform rotate-4 md:mt-8 hover:rotate-0'
              } hover:scale-105 transition-transform duration-300 overflow-hidden`}>
                <EditableImage
                  eid={`gallery_image${i}`}
                  defaultSrc={getImage(`gallery_image${i}`, `https://images.unsplash.com/photo-${
                    i === 1 ? '1511707171634-5f897ff02aa9' :
                    i === 2 ? '1490730141103-6cac27aaab94' :
                    '1519389950473-47ba0277781c'
                  }?w=400`)}
                  alt={`Gallery ${i}`}
                  className="w-full h-full object-cover"
                  editable={editable}
                  onChange={handleImageChange}
                />
                <SlateEditableText
                  eid={`gallery_caption${i}`}
                  defaultText={getText(`gallery_caption${i}`, 
                    i === 1 ? 'So many lenses!' :
                    i === 2 ? 'Flower power!' :
                    'Night mode magic!'
                  )}
                  className={`absolute ${
                    i === 1 ? '-bottom-4 left-1/2 -translate-x-1/2 bg-[#FF4136] -rotate-6' :
                    i === 2 ? '-top-4 right-4 bg-[#2ECC40] rotate-3' :
                    '-bottom-4 right-1/2 translate-x-1/2 bg-[#0074D9] rotate-2'
                  } text-white text-sm px-3 py-1 rounded-full shadow-md`}
                  editable={editable}
                  onChange={handleSlateTextChange}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 py-16 sm:py-24">
          <div className="flex flex-col gap-6 text-center">
            <div className="font-fredoka">
              <SlateEditableText
                eid="features_title"
                defaultText={getText('features_title', 'All the Super-Duper Fun Stuff! ✨')}
                className="text-4xl sm:text-5xl font-bold tracking-tight text-[#FF4136] transform -rotate-2"
                editable={editable}
                onChange={handleSlateTextChange}
              />
            </div>
            <SlateEditableText
              eid="features_subtitle"
              defaultText={getText('features_subtitle', 'Get ready to discover the mind-blowing features that make AwesomePhone the coolest gadget ever!')}
              className="text-lg text-[#555] max-w-2xl mx-auto transform rotate-1"
              editable={editable}
              onChange={handleSlateTextChange}
            />
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { bg: '#FFDC00', border: '#FFDC00', title: 'See in the Dark Camera!', desc: 'Capture incredible details even when it\'s super dark. Your night photos will be legendary!', img: 'https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?w=400' },
              { bg: '#0074D9', border: '#0074D9', title: 'Lightning Fast Performance!', desc: 'Apps open in a blink, games run super smooth. This chip is a total speed demon!', img: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400' },
              { bg: '#2ECC40', border: '#2ECC40', title: 'Battery That Goes All Day (and Night)!', desc: 'Forget charging! This battery keeps going and going so you can have endless fun!', img: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400' }
            ].map((feature, i) => (
              <div key={i} className={`flex flex-col gap-4 text-center items-center p-6 rounded-xl shadow-lg border-2 border-dashed transform ${
                i === 0 ? 'rotate-2' : i === 1 ? '-rotate-1' : 'rotate-3'
              } hover:rotate-0 hover:scale-105 transition-transform`} >
                <EditableImage
                  eid={`feature_image${i + 1}`}
                  defaultSrc={getImage(`feature_image${i + 1}`, feature.img)}
                  alt={feature.title}
                  className="w-full aspect-video object-cover rounded-lg border-2 border-solid p-4"
                  
                  editable={editable}
                  onChange={handleImageChange}
                />
                <div>
                  <div className={`font-fredoka ${i === 0 ? 'text-[#FF4136]' : i === 1 ? 'text-[#2ECC40]' : 'text-[#0074D9]'}`}>
                    <SlateEditableText
                      eid={`feature_title${i + 1}`}
                      defaultText={getText(`feature_title${i + 1}`, feature.title)}
                      className="font-bold text-xl mb-2"
                      editable={editable}
                      onChange={handleSlateTextChange}
                    />
                  </div>
                  <SlateEditableText
                    eid={`feature_desc${i + 1}`}
                    defaultText={getText(`feature_desc${i + 1}`, feature.desc)}
                    className="text-base text-[#555]"
                    editable={editable}
                    onChange={handleSlateTextChange}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Specs Section */}
        <section id="specs" className="bg-[#FFDC00]/10 py-16 sm:py-24 relative">
          <div className="absolute top-1/2 right-0 translate-x-1/2 w-48 h-48 bg-[#FF4136] rounded-full mix-blend-multiply opacity-20 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col gap-6 text-center">
              <div className="font-fredoka">
                <SlateEditableText
                  eid="specs_title"
                  defaultText={getText('specs_title', 'The Nitty-Gritty Details! 🤓')}
                  className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0074D9] transform rotate-1"
                  editable={editable}
                  onChange={handleSlateTextChange}
                />
              </div>
              <SlateEditableText
                eid="specs_subtitle"
                defaultText={getText('specs_subtitle', 'Wanna know what makes this phone a total superhero? Dive into the awesome specs!')}
                className="text-lg text-[#555] max-w-2xl mx-auto transform -rotate-1"
                editable={editable}
                onChange={handleSlateTextChange}
              />
            </div>

            <div className="mt-16 grid max-w-4xl mx-auto grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
              {[
                { icon: '📱', color: '#FF4136', title: 'Awesome Display!', desc: 'A huge 6.7-inch screen that\'s super bright and super smooth. It\'s like watching a movie in your hand!', rotate: '-rotate-3' },
                { icon: '💾', color: '#2ECC40', title: 'Brainy Processor!', desc: 'The A16 Bionic chip is a super brain, making everything incredibly fast and fun. No lag allowed!', rotate: '-rotate-3' },
                { icon: '📷', color: '#0074D9', title: 'Super Camera System!', desc: 'Three cameras (wow!) for all your photo adventures. Main, Ultra Wide, and Telephoto – you\'re covered!', rotate: 'rotate-3' },
                { icon: '🔋', color: '#FFDC00', title: 'Epic Battery!', desc: 'Watch videos for almost a whole day! Plus, wireless charging is like magic, no strings attached!', rotate: 'rotate-3' }
              ].map((spec, i) => (
                <div key={i} className={`flex flex-col gap-6 transform ${spec.rotate}`}>
                  <div className="flex items-start gap-4 rounded-xl p-6 border-2 border-dashed shadow-md bg-white" >
                    <span className="text-4xl mt-1">{spec.icon}</span>
                    <div>
                      <div className="font-fredoka" style={{ color: spec.color }}>
                        <SlateEditableText
                          eid={`spec_title${i + 1}`}
                          defaultText={getText(`spec_title${i + 1}`, spec.title)}
                          className="font-bold text-xl mb-2"
                          editable={editable}
                          onChange={handleSlateTextChange}
                        />
                      </div>
                      <SlateEditableText
                        eid={`spec_desc${i + 1}`}
                        defaultText={getText(`spec_desc${i + 1}`, spec.desc)}
                        className="text-base text-[#555]"
                        editable={editable}
                        onChange={handleSlateTextChange}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="container mx-auto px-4 py-16 sm:py-24 relative">
          <div className="absolute top-1/4 left-0 -translate-x-1/2 w-64 h-64 bg-[#0074D9] rounded-full mix-blend-multiply opacity-20 z-0"></div>
          <div className="flex flex-col gap-6 text-center relative z-10">
            <div className="font-fredoka">
              <SlateEditableText
                eid="reviews_title"
                defaultText={getText('reviews_title', 'What Our Awesome Fans Are Saying! 🥰')}
                className="text-4xl sm:text-5xl font-bold tracking-tight text-[#2ECC40] transform rotate-2"
                editable={editable}
                onChange={handleSlateTextChange}
              />
            </div>
            <SlateEditableText
              eid="reviews_subtitle"
              defaultText={getText('reviews_subtitle', 'Hear from real people who are totally smitten with their new AwesomePhone!')}
              className="text-lg text-[#555] max-w-2xl mx-auto transform -rotate-1"
              editable={editable}
              onChange={handleSlateTextChange}
            />
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { stars: 5, text: '"OMG, the camera is absolutely mind-blowing! My pics look like they\'re from a magazine. Best phone EVER!"', name: 'Sarah J.', role: 'Super Happy Customer', border: '#FF4136', rotate: '-rotate-2' },
              { stars: 5, text: '"I\'m always on my phone, and this one just keeps going! The battery life is seriously a game-changer. So much fun!"', name: 'Mike R.', role: 'Gamer Extraordinaire', border: '#0074D9', rotate: 'rotate-1' },
              { stars: 4.5, text: '"Scrolling is like butter, gaming is smooth as silk! This phone is so fast and responsive. A fantastic upgrade, totally recommend!"', name: 'Emily C.', role: 'Smooth Operator', border: '#2ECC40', rotate: '-rotate-3' }
            ].map((review, i) => (
              <div key={i} className={`flex flex-col gap-4 rounded-xl border-4 border-dotted bg-white p-6 shadow-lg transform ${review.rotate} hover:rotate-0 hover:scale-105 transition-transform`} >
                <div className="flex items-center text-[#FFDC00]">
                  {[...Array(Math.floor(review.stars))].map((_, j) => (
                    <span key={j} className="text-3xl">⭐</span>
                  ))}
                  {review.stars % 1 !== 0 && <span className="text-3xl">⭐</span>}
                </div>
                <SlateEditableText
                  eid={`review_text${i + 1}`}
                  defaultText={getText(`review_text${i + 1}`, review.text)}
                  className="text-base italic text-[#555]"
                  editable={editable}
                  onChange={handleSlateTextChange}
                />
                <div className="font-fredoka" style={{ color: review.border }}>
                  <SlateEditableText
                    eid={`review_name${i + 1}`}
                    defaultText={getText(`review_name${i + 1}`, `— ${review.name} (${review.role})`)}
                    className="font-bold text-lg"
                    editable={editable}
                    onChange={handleSlateTextChange}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="bg-[#FF4136]/10 py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#FFDC00] rounded-full mix-blend-multiply opacity-20 z-0 transform -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-[#0074D9] rounded-full mix-blend-multiply opacity-20 z-0 transform translate-y-1/2"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="font-fredoka">
              <SlateEditableText
                eid="cta_title"
                defaultText={getText('cta_title', 'Ready for Your Own Awesome Adventure? 🚀')}
                className="text-4xl sm:text-5xl font-bold tracking-tight text-[#FF4136] transform rotate-3"
                editable={editable}
                onChange={handleSlateTextChange}
              />
            </div>
            <SlateEditableText
              eid="cta_subtitle"
              defaultText={getText('cta_subtitle', 'Jump into the world of power, fun, and simplicity with the coolest AwesomePhone yet. Snag yours today and let the good times roll!')}
              className="mt-6 max-w-xl mx-auto text-lg text-[#555] transform -rotate-2"
              editable={editable}
              onChange={handleSlateTextChange}
            />
            <div className="mt-10 flex justify-center">
              <div className="font-fredoka">
                <EditableButton
                  eid="cta_button"
                  defaultText={getButton('cta_button', 'Yes! I Want My AwesomePhone + Free Shipping!', '#').text}
                  defaultUrl={getButton('cta_button', 'Yes! I Want My AwesomePhone + Free Shipping!', '#').url}
                  className="h-16 px-8 bg-[#FF4136] text-white text-xl font-bold rounded-[2rem_0.5rem_2rem_0.5rem] transition-transform hover:scale-110 active:scale-95 shadow-xl transform -rotate-2"
                  editable={editable}
                  onChange={handleButtonChange}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0074D9]/10 border-t-4 border-dashed border-[#0074D9]/30 mt-12">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
              <SlateEditableText
                eid="footer_copyright"
                defaultText={getText('footer_copyright', '© 2024 AwesomePhone Adventures. All rights reserved.')}
                className="text-sm text-[#555] transform rotate-1"
                editable={editable}
                onChange={handleSlateTextChange}
              />
              <div className="text-sm text-[#555] transform -rotate-1">
                <SlateEditableText
                  eid="footer_disclaimer"
                  defaultText={getText('footer_disclaimer', 'Psst! We might earn a tiny bit from your super cool purchases. But don\'t worry, it doesn\'t change your price!')}
                  className="mb-2"
                  editable={editable}
                  onChange={handleSlateTextChange}
                />
                <SlateEditableText
                  eid="footer_privacy"
                  defaultText={getText('footer_privacy', 'Secret Privacy Stuff')}
                  className="underline hover:text-[#FF4136] cursor-pointer"
                  editable={editable}
                  onChange={handleSlateTextChange}
                />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

