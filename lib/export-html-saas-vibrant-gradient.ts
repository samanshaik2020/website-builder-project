export const generateSaasVibrantGradientHTML = (data: Record<string, any>): string => {
  const getText = (id: string, defaultValue: string) => {
    return data[id]?.text || defaultValue;
  };

  const getImage = (id: string, defaultValue: string) => {
    return data[id]?.image || defaultValue;
  };

  const getButton = (id: string, defaultText: string, defaultUrl: string) => {
    return {
      text: data[id]?.button?.text || defaultText,
      url: data[id]?.button?.url || defaultUrl,
    };
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${getText('nav_logo', 'Vibrant')} - SaaS Platform</title>
  <meta name="description" content="Website created with Squpage">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    html { scroll-behavior: smooth; }
    @keyframes blob {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
    }
    .animate-blob { animation: blob 7s infinite; }
    .animation-delay-2000 { animation-delay: 2s; }
    .animation-delay-4000 { animation-delay: 4s; }
  </style>
</head>
<body class="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
  <!-- Navigation -->
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl shadow-lg">
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          ${getText('nav_logo', 'Vibrant')}
        </div>
        <div class="hidden md:flex items-center gap-8">
          <a href="#features" class="text-gray-700 hover:text-purple-600 font-medium transition-colors">Features</a>
          <a href="#pricing" class="text-gray-700 hover:text-purple-600 font-medium transition-colors">Pricing</a>
          <a href="#testimonials" class="text-gray-700 hover:text-purple-600 font-medium transition-colors">Reviews</a>
          <a href="${getButton('nav_cta', 'Get Started', '#').url}" class="px-6 py-2.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all">
            ${getButton('nav_cta', 'Get Started', '#').text}
          </a>
        </div>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="pt-32 pb-20 px-6 relative overflow-hidden">
    <div class="absolute top-0 left-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
    <div class="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
    <div class="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

    <div class="container mx-auto relative z-10">
      <div class="max-w-4xl mx-auto text-center space-y-8">
        <div class="inline-block px-6 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-full text-sm font-semibold shadow-lg">
          ${getText('hero_badge', '🚀 New: AI-Powered Features')}
        </div>
        
        <h1 class="text-5xl md:text-7xl font-bold leading-tight">
          <span class="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            ${getText('hero_title', 'Transform Your Business with Vibrant SaaS')}
          </span>
        </h1>
        
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          ${getText('hero_description', 'The all-in-one platform that helps you grow faster, work smarter, and achieve more. Join thousands of teams already transforming their workflow.')}
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="${getButton('hero_cta_primary', 'Start Free Trial', '#').url}" class="px-10 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all">
            ${getButton('hero_cta_primary', 'Start Free Trial', '#').text}
          </a>
          <a href="${getButton('hero_cta_secondary', 'Watch Demo', '#').url}" class="px-10 py-4 bg-white text-purple-600 rounded-full font-bold text-lg border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all">
            ${getButton('hero_cta_secondary', 'Watch Demo', '#').text}
          </a>
        </div>

        <div class="pt-8">
          <img src="${getImage('hero_image', 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=600&fit=crop')}" alt="Hero" class="rounded-3xl shadow-2xl w-full max-w-5xl mx-auto border-8 border-white">
        </div>
      </div>
    </div>
  </section>

  <!-- Stats Section -->
  <section class="py-16 px-6 bg-white/50 backdrop-blur-sm">
    <div class="container mx-auto">
      <div class="grid md:grid-cols-4 gap-8 text-center">
        ${[1, 2, 3, 4].map(num => `
        <div class="space-y-2">
          <div class="text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            ${getText(`stat${num}_number`, num === 1 ? '10K+' : num === 2 ? '99%' : num === 3 ? '24/7' : '150+')}
          </div>
          <div class="text-gray-600 font-medium">
            ${getText(`stat${num}_label`, num === 1 ? 'Active Users' : num === 2 ? 'Satisfaction' : num === 3 ? 'Support' : 'Countries')}
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section id="features" class="py-24 px-6">
    <div class="container mx-auto max-w-6xl">
      <div class="text-center mb-16 space-y-4">
        <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
          ${getText('features_title', 'Powerful Features')}
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          ${getText('features_subtitle', 'Everything you need to succeed, all in one place')}
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        ${[1, 2, 3, 4, 5, 6].map(num => `
        <div class="group p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-purple-100">
          <div class="w-14 h-14 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <span class="text-2xl">✨</span>
          </div>
          <h3 class="text-xl font-bold mb-3 text-gray-900">
            ${getText(`feature${num}_title`, `Feature ${num}`)}
          </h3>
          <p class="text-gray-600">
            ${getText(`feature${num}_description`, 'Powerful tools to help you achieve your goals faster and more efficiently.')}
          </p>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Pricing Section -->
  <section id="pricing" class="py-24 px-6 bg-gradient-to-br from-purple-50 to-pink-50">
    <div class="container mx-auto max-w-6xl">
      <div class="text-center mb-16 space-y-4">
        <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
          ${getText('pricing_title', 'Simple, Transparent Pricing')}
        </h2>
        <p class="text-xl text-gray-600">
          ${getText('pricing_subtitle', 'Choose the perfect plan for your needs')}
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        ${[1, 2, 3].map(num => `
        <div class="p-8 rounded-3xl ${num === 2 ? 'bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white scale-105 shadow-2xl' : 'bg-white shadow-lg'}">
          <div class="text-2xl font-bold mb-2 ${num === 2 ? 'text-white' : 'text-gray-900'}">
            ${getText(`plan${num}_name`, num === 1 ? 'Starter' : num === 2 ? 'Professional' : 'Enterprise')}
          </div>
          <div class="mb-6">
            <span class="text-5xl font-bold ${num === 2 ? 'text-white' : 'bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent'}">
              ${getText(`plan${num}_price`, num === 1 ? '$29' : num === 2 ? '$79' : '$199')}
            </span>
            <span class="${num === 2 ? 'text-white/80' : 'text-gray-600'}">/month</span>
          </div>
          <p class="mb-6 ${num === 2 ? 'text-white/90' : 'text-gray-600'}">
            ${getText(`plan${num}_description`, 'Perfect for getting started')}
          </p>
          <a href="${getButton(`plan${num}_cta`, 'Get Started', '#').url}" class="block w-full py-3 rounded-full font-bold text-center transition-all ${
            num === 2 
              ? 'bg-white text-purple-600 hover:shadow-xl' 
              : 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:shadow-xl'
          }">
            ${getButton(`plan${num}_cta`, 'Get Started', '#').text}
          </a>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section id="testimonials" class="py-24 px-6">
    <div class="container mx-auto max-w-6xl">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
          ${getText('testimonials_title', 'Loved by Thousands')}
        </h2>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        ${[1, 2, 3].map(num => `
        <div class="p-8 bg-white rounded-3xl shadow-lg border border-purple-100">
          <div class="flex items-center gap-1 mb-4">
            ${'⭐'.repeat(5)}
          </div>
          <p class="text-gray-600 mb-6">
            ${getText(`testimonial${num}_text`, 'This platform has completely transformed how we work. Highly recommended!')}
          </p>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full"></div>
            <div>
              <div class="font-bold text-gray-900">
                ${getText(`testimonial${num}_name`, 'John Doe')}
              </div>
              <div class="text-sm text-gray-500">
                ${getText(`testimonial${num}_role`, 'CEO, Company')}
              </div>
            </div>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-24 px-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
    <div class="container mx-auto max-w-4xl text-center text-white space-y-8">
      <h2 class="text-4xl md:text-5xl font-bold">
        ${getText('cta_title', 'Ready to Get Started?')}
      </h2>
      <p class="text-xl text-white/90">
        ${getText('cta_description', 'Join thousands of teams already using Vibrant to transform their workflow')}
      </p>
      <a href="${getButton('cta_button', 'Start Your Free Trial', '#').url}" class="inline-block px-12 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all">
        ${getButton('cta_button', 'Start Your Free Trial', '#').text}
      </a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-12 px-6 bg-gray-900 text-white">
    <div class="container mx-auto text-center">
      <div class="text-gray-400">
        ${getText('footer_text', '© 2025 Vibrant SaaS. All rights reserved.')}
      </div>
    </div>
  </footer>
</body>
</html>`;
};
