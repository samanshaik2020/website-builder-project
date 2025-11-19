export function generateSqupagePromoHTML(data: Record<string, any>): string {
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

  // Extract all content
  const navBrand = getText('nav_brand', 'Squpage');
  const navCta = getButton('nav_cta', 'Get Started Free', 'https://squpage.com/signup');
  
  const heroBadge = getText('hero_badge', '🚀 The Future of Website Building');
  const heroTitle = getText('hero_title', 'Build Beautiful Websites in Minutes');
  const heroDescription = getText('hero_description', 'Create stunning websites with our AI-powered builder. No coding required. Choose from 50+ templates, edit live, and share instantly.');
  const heroCta1 = getButton('hero_cta_primary', 'Start Building Free', '#');
  const heroCta2 = getButton('hero_cta_secondary', 'View Templates', '#');
  const heroImage = getImage('hero_image', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop');
  
  const stats = [
    { value: getText('stat1_value', '50+'), label: getText('stat1_label', 'Templates') },
    { value: getText('stat2_value', '10K+'), label: getText('stat2_label', 'Websites Created') },
    { value: getText('stat3_value', '5K+'), label: getText('stat3_label', 'Active Users') },
    { value: getText('stat4_value', '99.9%'), label: getText('stat4_label', 'Uptime') },
  ];
  
  const featuresTitle = getText('features_title', 'Everything You Need to Build Amazing Websites');
  const featuresSubtitle = getText('features_subtitle', 'Powerful features that make website building effortless and enjoyable');
  
  const features = [
    { icon: '🎨', title: getText('feature1_title', 'Beautiful Templates'), desc: getText('feature1_desc', '50+ professionally designed templates') },
    { icon: '✏️', title: getText('feature2_title', 'Live Editing'), desc: getText('feature2_desc', 'Edit content directly with real-time preview') },
    { icon: '🤖', title: getText('feature3_title', 'AI Generation'), desc: getText('feature3_desc', 'Generate content with AI in seconds') },
    { icon: '🔗', title: getText('feature4_title', 'Easy Sharing'), desc: getText('feature4_desc', 'Share with custom URLs instantly') },
    { icon: '⚡', title: getText('feature5_title', 'Lightning Fast'), desc: getText('feature5_desc', 'Built with Next.js for speed') },
    { icon: '📱', title: getText('feature6_title', 'Fully Responsive'), desc: getText('feature6_desc', 'Perfect on all devices') },
  ];
  
  const howItWorksTitle = getText('how_it_works_title', 'Build Your Website in 3 Simple Steps');
  const steps = [
    { num: '01', title: getText('step1_title', 'Choose Template'), desc: getText('step1_desc', 'Select from 50+ beautiful templates') },
    { num: '02', title: getText('step2_title', 'Customize Content'), desc: getText('step2_desc', 'Edit text, images, and colors live') },
    { num: '03', title: getText('step3_title', 'Publish & Share'), desc: getText('step3_desc', 'Get your custom URL and go live') },
  ];
  
  const testimonialsTitle = getText('testimonials_title', 'Loved by Creators Worldwide');
  const testimonials = [
    {
      avatar: getImage('testimonial1_avatar', 'https://images.unsplash.com/photo-1500000001?w=100&h=100&fit=crop&crop=faces'),
      name: getText('testimonial1_name', 'User 1'),
      role: getText('testimonial1_role', 'Creator'),
      quote: getText('testimonial1_quote', 'Squpage made building my website incredibly easy. The templates are beautiful and the AI feature is a game-changer!'),
    },
    {
      avatar: getImage('testimonial2_avatar', 'https://images.unsplash.com/photo-1500000002?w=100&h=100&fit=crop&crop=faces'),
      name: getText('testimonial2_name', 'User 2'),
      role: getText('testimonial2_role', 'Creator'),
      quote: getText('testimonial2_quote', 'Squpage made building my website incredibly easy. The templates are beautiful and the AI feature is a game-changer!'),
    },
    {
      avatar: getImage('testimonial3_avatar', 'https://images.unsplash.com/photo-1500000003?w=100&h=100&fit=crop&crop=faces'),
      name: getText('testimonial3_name', 'User 3'),
      role: getText('testimonial3_role', 'Creator'),
      quote: getText('testimonial3_quote', 'Squpage made building my website incredibly easy. The templates are beautiful and the AI feature is a game-changer!'),
    },
  ];
  
  const ctaTitle = getText('cta_title', 'Ready to Build Your Dream Website?');
  const ctaDescription = getText('cta_description', 'Join thousands of creators who trust Squpage for their web presence');
  const ctaButton = getButton('cta_button', 'Start Building for Free', '#');
  
  const footerBrand = getText('footer_brand', 'Squpage');
  const footerTagline = getText('footer_tagline', 'Build beautiful websites in minutes, not hours');
  const footerCopyright = getText('footer_copyright', '© 2025 Squpage. All rights reserved.');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>${navBrand} - ${heroTitle}</title>
  <meta name="description" content="${heroDescription.substring(0, 160)}"/>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fade-in {
      animation: fadeIn 0.6s ease-out;
    }
  </style>
</head>
<body class="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
  <!-- Animated Background -->
  <div class="fixed inset-0 overflow-hidden pointer-events-none">
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
  </div>

  <!-- Navigation -->
  <nav class="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-purple-500/20">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center font-bold text-xl">
          S
        </div>
        <span class="text-xl font-bold">${navBrand}</span>
      </div>
      <a href="${navCta.url}" class="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl">
        ${navCta.text}
      </a>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="relative min-h-screen flex items-center justify-center px-6 pt-20">
    <div class="max-w-7xl mx-auto text-center relative z-10 fade-in">
      <div class="mb-6 inline-block">
        <span class="px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-sm font-medium backdrop-blur-sm">
          ${heroBadge}
        </span>
      </div>
      
      <h1 class="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
        ${heroTitle}
      </h1>
      
      <p class="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
        ${heroDescription}
      </p>

      <div class="flex flex-wrap gap-4 justify-center mb-12">
        <a href="${heroCta1.url}" class="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold text-lg transition-all shadow-2xl">
          ${heroCta1.text}
        </a>
        <a href="${heroCta2.url}" class="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg font-bold text-lg transition-all">
          ${heroCta2.text}
        </a>
      </div>

      <div class="relative max-w-5xl mx-auto">
        <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-3xl opacity-30"></div>
        <img src="${heroImage}" alt="Squpage Dashboard" class="relative rounded-2xl shadow-2xl border border-purple-500/30 w-full"/>
      </div>
    </div>
  </section>

  <!-- Stats Section -->
  <section class="py-20 px-6 relative z-10">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        ${stats.map(stat => `
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              ${stat.value}
            </div>
            <div class="text-slate-400 font-medium">${stat.label}</div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="py-20 px-6 relative z-10">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-black mb-4">${featuresTitle}</h2>
        <p class="text-xl text-slate-400 max-w-2xl mx-auto">${featuresSubtitle}</p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${features.map(feature => `
          <div class="p-8 bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl hover:bg-white/10 hover:border-purple-500/40 transition-all">
            <div class="text-5xl mb-4">${feature.icon}</div>
            <h3 class="text-2xl font-bold mb-2">${feature.title}</h3>
            <p class="text-slate-400">${feature.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- How It Works Section -->
  <section class="py-20 px-6 relative z-10">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-black mb-4">${howItWorksTitle}</h2>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        ${steps.map((step, index) => `
          <div class="relative text-center">
            <div class="text-8xl font-black bg-gradient-to-r from-purple-600/20 to-pink-600/20 bg-clip-text text-transparent mb-4">
              ${step.num}
            </div>
            <h3 class="text-2xl font-bold mb-2">${step.title}</h3>
            <p class="text-slate-400">${step.desc}</p>
            ${index < 2 ? '<div class="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-4xl text-purple-500">→</div>' : ''}
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="py-20 px-6 relative z-10">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-black mb-4">${testimonialsTitle}</h2>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        ${testimonials.map(t => `
          <div class="p-8 bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl">
            <div class="flex items-center gap-4 mb-4">
              <img src="${t.avatar}" alt="${t.name}" class="w-16 h-16 rounded-full object-cover"/>
              <div>
                <div class="font-bold">${t.name}</div>
                <div class="text-sm text-slate-400">${t.role}</div>
              </div>
            </div>
            <p class="text-slate-300">${t.quote}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-20 px-6 relative z-10">
    <div class="max-w-4xl mx-auto text-center">
      <div class="p-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-3xl">
        <h2 class="text-4xl md:text-5xl font-black mb-4">${ctaTitle}</h2>
        <p class="text-xl text-slate-300 mb-8">${ctaDescription}</p>
        <a href="${ctaButton.url}" class="inline-block px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold text-xl transition-all shadow-2xl">
          ${ctaButton.text}
        </a>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-12 px-6 border-t border-purple-500/20 relative z-10">
    <div class="max-w-7xl mx-auto text-center">
      <div class="flex items-center justify-center gap-2 mb-4">
        <div class="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center font-bold">
          S
        </div>
        <span class="text-lg font-bold">${footerBrand}</span>
      </div>
      <p class="text-slate-400 mb-4">${footerTagline}</p>
      <p class="text-sm text-slate-500">${footerCopyright}</p>
    </div>
  </footer>
</body>
</html>`;
}
