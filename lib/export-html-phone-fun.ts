export function generatePhoneFunHTML(data: Record<string, any>): string {
  const getText = (eid: string, defaultValue: string) => data[eid]?.text || defaultValue;
  const getImage = (eid: string, defaultValue: string) => data[eid]?.image || defaultValue;
  const getButton = (eid: string, defaultText: string, defaultUrl: string) => 
    data[eid]?.button || { text: defaultText, url: defaultUrl };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${getText('nav_brand', 'AwesomePhone')}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
  </style>
</head>
<body class="min-h-screen bg-gradient-to-b from-orange-50 via-pink-50 to-blue-50">
  <!-- Navigation -->
  <nav class="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        ${getText('nav_brand', 'AwesomePhone')}
      </div>
      <div class="flex items-center gap-8">
        <a href="#features" class="text-gray-700 hover:text-blue-600 transition-colors">${getText('nav_link1', 'Features')}</a>
        <a href="#gallery" class="text-gray-700 hover:text-blue-600 transition-colors">${getText('nav_link2', 'Gallery')}</a>
        <a href="${getButton('nav_cta', 'Get Started', '#cta').url}" class="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300">
          ${getButton('nav_cta', 'Get Started', '#cta').text}
        </a>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="pt-32 pb-20 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div class="space-y-6">
          <h1 class="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            ${getText('hero_title', 'Unleash Your Inner Awesome with AwesomePhone!')}
          </h1>
          <p class="text-xl text-gray-700 leading-relaxed">
            ${getText('hero_subtitle', "Hey there! 🌟 Ready to level up your mobile game? Say hello to AwesomePhone!")}
          </p>
          <a href="${getButton('hero_cta', 'Get Yours Now! 🚀', '#cta').url}" class="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            ${getButton('hero_cta', 'Get Yours Now! 🚀', '#cta').text}
          </a>
        </div>
        <div class="relative animate-float">
          <div class="absolute inset-0 bg-gradient-to-r from-pink-300 to-orange-300 rounded-3xl transform rotate-6 opacity-50 blur-2xl"></div>
          <div class="relative bg-gradient-to-br from-pink-200 to-orange-200 rounded-3xl p-8 shadow-2xl">
            <img src="${getImage('hero_image', 'https://images.unsplash.com/photo-1592286927505-c0d6e2f3f8b7?w=600')}" alt="Phone" class="w-full h-auto rounded-2xl shadow-xl" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Gallery Section -->
  <section id="gallery" class="py-20 px-6 bg-white/50">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-4xl lg:text-5xl font-bold text-center mb-4">
        ${getText('gallery_title', 'Shoot Like a Pro (Without Actually Being One!) 📸')}
      </h2>
      <p class="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
        ${getText('gallery_subtitle', "Whether you're snapping your lunch or the sunset, AwesomePhone makes everything look amazing!")}
      </p>

      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-white p-4 rounded-lg shadow-xl transform hover:scale-105 hover:-rotate-2 transition-all duration-500 border-4 border-gray-800">
          <img src="${getImage('gallery_image1', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400')}" alt="Gallery 1" class="w-full h-64 object-cover rounded" />
          <div class="mt-4 text-center">
            <p class="text-lg font-bold text-gray-800">${getText('gallery_caption1', 'Ultra-Wide Magic ✨')}</p>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-xl transform hover:scale-105 hover:rotate-2 transition-all duration-500 border-4 border-pink-400">
          <img src="${getImage('gallery_image2', 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400')}" alt="Gallery 2" class="w-full h-64 object-cover rounded" />
          <div class="mt-4 text-center">
            <p class="text-lg font-bold text-gray-800">${getText('gallery_caption2', 'Macro Madness 🌸')}</p>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-xl transform hover:scale-105 hover:-rotate-2 transition-all duration-500 border-4 border-blue-400">
          <img src="${getImage('gallery_image3', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400')}" alt="Gallery 3" class="w-full h-64 object-cover rounded" />
          <div class="mt-4 text-center">
            <p class="text-lg font-bold text-gray-800">${getText('gallery_caption3', 'Night Mode Ninja 🌙')}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section id="features" class="py-20 px-6">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-4xl lg:text-5xl font-bold text-center mb-16">
        ${getText('features_title', 'All the Super-Duper Fun Stuff! ✨')}
      </h2>

      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-white p-8 rounded-2xl shadow-lg border-4 border-yellow-300 transform hover:scale-105 hover:-rotate-1 transition-all duration-300">
          <div class="text-6xl text-center mb-4">📷</div>
          <h3 class="text-2xl font-bold text-center mb-3">${getText('feature_title1', 'Mega Awesome Camera')}</h3>
          <p class="text-gray-600 text-center leading-relaxed">${getText('feature_desc1', 'Take pics so good, your friends will think you hired a professional!')}</p>
        </div>
        <div class="bg-white p-8 rounded-2xl shadow-lg border-4 border-blue-300 transform hover:scale-105 hover:rotate-1 transition-all duration-300">
          <div class="text-6xl text-center mb-4">⚡</div>
          <h3 class="text-2xl font-bold text-center mb-3">${getText('feature_title2', 'Lightning Fast Processor')}</h3>
          <p class="text-gray-600 text-center leading-relaxed">${getText('feature_desc2', 'Faster than your morning coffee kicking in. Multitask like a boss!')}</p>
        </div>
        <div class="bg-white p-8 rounded-2xl shadow-lg border-4 border-green-300 transform hover:scale-105 hover:-rotate-1 transition-all duration-300">
          <div class="text-6xl text-center mb-4">🔋</div>
          <h3 class="text-2xl font-bold text-center mb-3">${getText('feature_title3', 'Battery That Won\'t Quit')}</h3>
          <p class="text-gray-600 text-center leading-relaxed">${getText('feature_desc3', 'Lasts longer than your Netflix binge sessions. This thing is a marathon runner!')}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Details Section -->
  <section class="py-20 px-6 bg-gradient-to-b from-blue-50 to-purple-50">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-4xl lg:text-5xl font-bold text-center mb-16">
        ${getText('details_title', 'The Nitty-Gritty Details! 🤓')}
      </h2>

      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-white p-8 rounded-2xl shadow-lg border-l-8 border-purple-500 transform hover:scale-105 transition-all duration-300">
          <div class="flex items-start gap-4">
            <span class="text-4xl">📱</span>
            <div>
              <h3 class="text-2xl font-bold mb-2">${getText('detail_title1', 'Awesome Display')}</h3>
              <p class="text-gray-600 leading-relaxed">${getText('detail_desc1', '6.7" Super AMOLED screen that makes everything look amazing!')}</p>
            </div>
          </div>
        </div>
        <div class="bg-white p-8 rounded-2xl shadow-lg border-l-8 border-blue-500 transform hover:scale-105 transition-all duration-300">
          <div class="flex items-start gap-4">
            <span class="text-4xl">💾</span>
            <div>
              <h3 class="text-2xl font-bold mb-2">${getText('detail_title2', 'Mega Storage')}</h3>
              <p class="text-gray-600 leading-relaxed">${getText('detail_desc2', 'Up to 512GB! That\'s like... a bazillion photos and videos!')}</p>
            </div>
          </div>
        </div>
        <div class="bg-white p-8 rounded-2xl shadow-lg border-l-8 border-green-500 transform hover:scale-105 transition-all duration-300">
          <div class="flex items-start gap-4">
            <span class="text-4xl">🔒</span>
            <div>
              <h3 class="text-2xl font-bold mb-2">${getText('detail_title3', 'Biometric Protection')}</h3>
              <p class="text-gray-600 leading-relaxed">${getText('detail_desc3', 'Face unlock & fingerprint sensor. Your secrets are safe!')}</p>
            </div>
          </div>
        </div>
        <div class="bg-white p-8 rounded-2xl shadow-lg border-l-8 border-yellow-500 transform hover:scale-105 transition-all duration-300">
          <div class="flex items-start gap-4">
            <span class="text-4xl">🌐</span>
            <div>
              <h3 class="text-2xl font-bold mb-2">${getText('detail_title4', '5G Connectivity')}</h3>
              <p class="text-gray-600 leading-relaxed">${getText('detail_desc4', 'Blazing fast internet speeds. Download movies in seconds!')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Reviews Section -->
  <section class="py-20 px-6">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-4xl lg:text-5xl font-bold text-center mb-16">
        ${getText('reviews_title', 'What Our Awesome Fans Are Saying! 🥰')}
      </h2>

      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
          <div class="flex gap-1 mb-4">
            <span class="text-yellow-400 text-2xl">⭐</span>
            <span class="text-yellow-400 text-2xl">⭐</span>
            <span class="text-yellow-400 text-2xl">⭐</span>
            <span class="text-yellow-400 text-2xl">⭐</span>
            <span class="text-yellow-400 text-2xl">⭐</span>
          </div>
          <p class="text-gray-700 mb-6 italic leading-relaxed">${getText('review_text1', '"This phone is literally the best thing since sliced bread!" 🍞')}</p>
          <div class="flex items-center gap-3">
            <img src="${getImage('review_avatar1', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100')}" alt="Reviewer" class="w-12 h-12 rounded-full object-cover" />
            <div>
              <p class="font-bold">${getText('review_name1', 'Sarah M.')}</p>
              <p class="text-sm text-gray-500">${getText('review_role1', 'Bread Enthusiast')}</p>
            </div>
          </div>
        </div>
        <div class="bg-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
          <div class="flex gap-1 mb-4">
            <span class="text-yellow-400 text-2xl">⭐</span>
            <span class="text-yellow-400 text-2xl">⭐</span>
            <span class="text-yellow-400 text-2xl">⭐</span>
            <span class="text-yellow-400 text-2xl">⭐</span>
            <span class="text-yellow-400 text-2xl">⭐</span>
          </div>
          <p class="text-gray-700 mb-6 italic leading-relaxed">${getText('review_text2', '"My old phone is now jealous. Worth it! 😎"')}</p>
          <div class="flex items-center gap-3">
            <img src="${getImage('review_avatar2', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100')}" alt="Reviewer" class="w-12 h-12 rounded-full object-cover" />
            <div>
              <p class="font-bold">${getText('review_name2', 'Mike T.')}</p>
              <p class="text-sm text-gray-500">${getText('review_role2', 'Tech Lover')}</p>
            </div>
          </div>
        </div>
        <div class="bg-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
          <div class="flex gap-1 mb-4">
            <span class="text-yellow-400 text-2xl">⭐</span>
            <span class="text-yellow-400 text-2xl">⭐</span>
            <span class="text-yellow-400 text-2xl">⭐</span>
            <span class="text-yellow-400 text-2xl">⭐</span>
            <span class="text-yellow-400 text-2xl">⭐</span>
          </div>
          <p class="text-gray-700 mb-6 italic leading-relaxed">${getText('review_text3', '"10/10 would recommend. My cat even approves! 🐱"')}</p>
          <div class="flex items-center gap-3">
            <img src="${getImage('review_avatar3', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100')}" alt="Reviewer" class="w-12 h-12 rounded-full object-cover" />
            <div>
              <p class="font-bold">${getText('review_name3', 'Emma K.')}</p>
              <p class="text-sm text-gray-500">${getText('review_role3', 'Cat Mom')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section id="cta" class="py-20 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
    <div class="max-w-4xl mx-auto text-center text-white">
      <h2 class="text-4xl lg:text-5xl font-bold mb-6">
        ${getText('cta_title', 'Ready for Your Own Awesome Adventure? 🚀')}
      </h2>
      <p class="text-xl mb-8 leading-relaxed opacity-90">
        ${getText('cta_subtitle', "Join the AwesomePhone family today! Free shipping, 30-day returns, and a lifetime of awesomeness!")}
      </p>
      <a href="${getButton('cta_button', 'Order Now! 💳', '#').url}" class="inline-block px-10 py-5 bg-white text-purple-600 rounded-full font-bold text-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300">
        ${getButton('cta_button', 'Order Now! 💳', '#').text}
      </a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-900 text-white py-12 px-6">
    <div class="max-w-7xl mx-auto text-center">
      <div class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
        ${getText('footer_brand', 'AwesomePhone')}
      </div>
      <p class="text-gray-400 mb-6">${getText('footer_text', 'Making the world more awesome, one phone at a time! ✨')}</p>
      <p class="text-sm text-gray-500">${getText('footer_copyright', '© 2025 AwesomePhone. All rights reserved.')}</p>
    </div>
  </footer>
</body>
</html>`;
}
