import { TemplateData } from '@/types/template';

export function generateSamsungProductHTML(data: TemplateData): string {
  const getText = (id: string, defaultValue: string) => data[id]?.text || defaultValue;
  const getButtonText = (id: string, defaultValue: string) => data[id]?.button?.text || defaultValue;
  const getButtonUrl = (id: string, defaultValue: string) => data[id]?.button?.url || defaultValue;
  const getImage = (id: string, defaultValue: string) => data[id]?.image || defaultValue;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${getText('hero_title', 'Galaxy S24 Ultra')} - ${getText('nav_brand', 'SAMSUNG')}</title>
  <meta name="description" content="${getText('hero_subtitle', 'The most powerful Galaxy yet. Experience innovation at its finest.')}">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
    html {
      scroll-behavior: smooth;
    }
  </style>
</head>
<body class="bg-white">
  <!-- Navigation -->
  <nav class="fixed top-0 left-0 right-0 z-50 bg-black text-white">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-8">
        <span class="text-2xl font-bold tracking-wider">${getText('nav_brand', 'SAMSUNG')}</span>
        <div class="hidden md:flex gap-6 text-sm">
          <a href="#" class="hover:opacity-70 transition">${getText('nav_link_1', 'Mobile')}</a>
          <a href="#" class="hover:opacity-70 transition">${getText('nav_link_2', 'TV & AV')}</a>
          <a href="#" class="hover:opacity-70 transition">${getText('nav_link_3', 'Home Appliances')}</a>
        </div>
      </div>
      <a href="${getButtonUrl('nav_cta', '#buy')}" class="px-6 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition">
        ${getButtonText('nav_cta', 'Buy Now')}
      </a>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-8">
        <p class="text-sm font-semibold text-blue-600 mb-4 tracking-wider uppercase">${getText('hero_badge', 'NEW ARRIVAL')}</p>
        <h1 class="text-5xl md:text-7xl font-bold text-black mb-6 tracking-tight">${getText('hero_title', 'Galaxy S24 Ultra')}</h1>
        <p class="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">${getText('hero_subtitle', 'The most powerful Galaxy yet. Experience innovation at its finest.')}</p>
        <div class="flex flex-wrap gap-4 justify-center">
          <a href="${getButtonUrl('hero_cta_primary', '#preorder')}" class="px-8 py-4 bg-black text-white text-lg font-semibold rounded-full hover:bg-gray-800 transition">
            ${getButtonText('hero_cta_primary', 'Pre-order now')}
          </a>
          <a href="${getButtonUrl('hero_cta_secondary', '#learn')}" class="px-8 py-4 bg-white text-black text-lg font-semibold rounded-full border-2 border-black hover:bg-gray-100 transition">
            ${getButtonText('hero_cta_secondary', 'Learn more')}
          </a>
        </div>
      </div>
      
      <!-- Hero Image -->
      <div class="mt-12 flex justify-center">
        <img src="${getImage('hero_image', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&h=600&fit=crop')}" alt="Product" class="w-full max-w-4xl aspect-video rounded-3xl object-cover">
      </div>
    </div>
  </section>

  <!-- Key Features Section -->
  <section class="py-20 bg-black text-white">
    <div class="max-w-7xl mx-auto px-6">
      <h2 class="text-4xl md:text-5xl font-bold text-center mb-16">${getText('features_title', 'Key Features')}</h2>
      
      <div class="grid md:grid-cols-3 gap-12">
        <!-- Feature 1 -->
        <div class="text-center">
          <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span class="text-3xl">📱</span>
          </div>
          <h3 class="text-2xl font-bold mb-4">${getText('feature_1_title', 'Dynamic AMOLED Display')}</h3>
          <p class="text-gray-400 leading-relaxed">${getText('feature_1_description', 'Experience stunning visuals with our brightest display ever. 6.8-inch screen with 120Hz refresh rate for smooth scrolling.')}</p>
        </div>

        <!-- Feature 2 -->
        <div class="text-center">
          <div class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span class="text-3xl">📸</span>
          </div>
          <h3 class="text-2xl font-bold mb-4">${getText('feature_2_title', 'Pro-Grade Camera')}</h3>
          <p class="text-gray-400 leading-relaxed">${getText('feature_2_description', '200MP main camera with AI-powered zoom. Capture every detail with professional-quality photos and 8K video recording.')}</p>
        </div>

        <!-- Feature 3 -->
        <div class="text-center">
          <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span class="text-3xl">⚡</span>
          </div>
          <h3 class="text-2xl font-bold mb-4">${getText('feature_3_title', 'All-Day Battery')}</h3>
          <p class="text-gray-400 leading-relaxed">${getText('feature_3_description', '5000mAh battery with super-fast charging. Power through your day and recharge in minutes, not hours.')}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Specifications Section -->
  <section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6">
      <h2 class="text-4xl md:text-5xl font-bold text-center mb-16 text-black">${getText('specs_title', 'Technical Specifications')}</h2>
      
      <div class="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div class="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <!-- Spec 1 -->
          <div class="p-8">
            <h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">${getText('spec_1_label', 'Processor')}</h4>
            <p class="text-xl font-bold text-black">${getText('spec_1_value', 'Snapdragon 8 Gen 3')}</p>
          </div>

          <!-- Spec 2 -->
          <div class="p-8">
            <h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">${getText('spec_2_label', 'Memory')}</h4>
            <p class="text-xl font-bold text-black">${getText('spec_2_value', '12GB RAM / 512GB Storage')}</p>
          </div>

          <!-- Spec 3 -->
          <div class="p-8">
            <h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">${getText('spec_3_label', 'Display')}</h4>
            <p class="text-xl font-bold text-black">${getText('spec_3_value', '6.8" Dynamic AMOLED 2X')}</p>
          </div>

          <!-- Spec 4 -->
          <div class="p-8">
            <h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">${getText('spec_4_label', 'Camera')}</h4>
            <p class="text-xl font-bold text-black">${getText('spec_4_value', '200MP + 12MP + 10MP + 10MP')}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Gallery Section -->
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <h2 class="text-4xl md:text-5xl font-bold text-center mb-16 text-black">${getText('gallery_title', 'See It In Action')}</h2>
      
      <div class="grid md:grid-cols-3 gap-6">
        <img src="${getImage('gallery_1', 'https://images.unsplash.com/photo-1592286927505-b0e6067f7f2e?w=600&h=600&fit=crop')}" alt="Gallery Image 1" class="aspect-square rounded-2xl object-cover">
        <img src="${getImage('gallery_2', 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop')}" alt="Gallery Image 2" class="aspect-square rounded-2xl object-cover">
        <img src="${getImage('gallery_3', 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&h=600&fit=crop')}" alt="Gallery Image 3" class="aspect-square rounded-2xl object-cover">
      </div>
    </div>
  </section>

  <!-- Pricing Section -->
  <section class="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
    <div class="max-w-4xl mx-auto px-6 text-center">
      <h2 class="text-4xl md:text-5xl font-bold mb-6">${getText('pricing_title', 'Get Yours Today')}</h2>
      <p class="text-xl text-gray-400 mb-8">${getText('pricing_subtitle', 'Available in multiple colors and storage options')}</p>
      
      <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8">
        <p class="text-sm text-gray-400 mb-2">${getText('pricing_label', 'Starting at')}</p>
        <p class="text-6xl font-bold mb-4">${getText('pricing_amount', '$1,199')}</p>
        <p class="text-gray-400 mb-6">${getText('pricing_description', 'or $49.95/mo. for 24 months')}</p>
        <a href="${getButtonUrl('pricing_cta', '#buy')}" class="block w-full py-4 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition">
          ${getButtonText('pricing_cta', 'Buy Now')}
        </a>
      </div>

      <p class="text-sm text-gray-500">${getText('pricing_note', 'Free shipping and 30-day returns. Trade-in available.')}</p>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-black text-white py-12">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <h4 class="font-bold mb-4">${getText('footer_col_1_title', 'Products')}</h4>
          <div class="space-y-2 text-sm text-gray-400">
            <p class="hover:text-white cursor-pointer">${getText('footer_col_1_link_1', 'Smartphones')}</p>
            <p class="hover:text-white cursor-pointer">${getText('footer_col_1_link_2', 'Tablets')}</p>
            <p class="hover:text-white cursor-pointer">${getText('footer_col_1_link_3', 'Wearables')}</p>
          </div>
        </div>

        <div>
          <h4 class="font-bold mb-4">${getText('footer_col_2_title', 'Support')}</h4>
          <div class="space-y-2 text-sm text-gray-400">
            <p class="hover:text-white cursor-pointer">${getText('footer_col_2_link_1', 'Contact Us')}</p>
            <p class="hover:text-white cursor-pointer">${getText('footer_col_2_link_2', 'FAQs')}</p>
            <p class="hover:text-white cursor-pointer">${getText('footer_col_2_link_3', 'Warranty')}</p>
          </div>
        </div>

        <div>
          <h4 class="font-bold mb-4">${getText('footer_col_3_title', 'Company')}</h4>
          <div class="space-y-2 text-sm text-gray-400">
            <p class="hover:text-white cursor-pointer">${getText('footer_col_3_link_1', 'About Us')}</p>
            <p class="hover:text-white cursor-pointer">${getText('footer_col_3_link_2', 'Careers')}</p>
            <p class="hover:text-white cursor-pointer">${getText('footer_col_3_link_3', 'Press')}</p>
          </div>
        </div>

        <div>
          <h4 class="font-bold mb-4">${getText('footer_col_4_title', 'Follow Us')}</h4>
          <div class="space-y-2 text-sm text-gray-400">
            <p class="hover:text-white cursor-pointer">${getText('footer_social_1', 'Facebook')}</p>
            <p class="hover:text-white cursor-pointer">${getText('footer_social_2', 'Twitter')}</p>
            <p class="hover:text-white cursor-pointer">${getText('footer_social_3', 'Instagram')}</p>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
        <p>${getText('footer_copyright', '© 2024 Samsung Electronics. All rights reserved.')}</p>
      </div>
    </div>
  </footer>
</body>
</html>`;
}
