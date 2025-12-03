import { TemplateData } from '@/types/template';

export const generateFlashSaleHTML = (data: TemplateData): string => {
  const getText = (id: string, defaultValue: string) => {
    return data[id]?.text || defaultValue;
  };

  const getButton = (id: string, defaultText: string) => {
    // Handle multiple data formats:
    // 1. data[id]?.button?.text - standard button format
    // 2. data[id]?.text - if stored as text directly
    // 3. data[id] as string - if stored as plain string
    const value = data[id];
    if (!value) return defaultText;
    if (typeof value === 'string') return value;
    if (value.button?.text) return value.button.text;
    if (value.text) return value.text;
    return defaultText;
  };

  const getImage = (id: string, defaultValue: string) => {
    return data[id]?.image || defaultValue;
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flash Sale Landing Page</title>
  <meta name="description" content="Website created with Squpage">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
    .hero-bg {
      background: linear-gradient(135deg, #8B0000 0%, #DC2626 50%, #EF4444 100%);
    }
    .text-shadow {
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
  </style>
</head>
<body class="bg-gray-50 text-gray-800">

  <!-- Top Banner -->
  <div class="bg-red-800 text-white text-center py-2 text-xs md:text-sm font-bold tracking-wide">
    ${getText('top_banner_text', '⚡ FLASH SALE: UP TO 70% OFF Today Only! Use Code:')}
    <span class="bg-yellow-400 text-red-900 px-1 rounded">${getText('top_banner_code', 'FLASH70')}</span>
    at checkout. Ends Soon! ⚡
  </div>

  <!-- Hero Section -->
  <section class="hero-bg text-white relative overflow-hidden pb-12 pt-8">
    <div class="absolute top-1/2 left-0 w-full h-32 bg-white opacity-5 transform -translate-y-1/2"></div>

    <div class="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center relative z-10">
      <div class="text-center md:text-left space-y-6">
        <h1 class="text-4xl md:text-6xl font-black uppercase leading-tight text-shadow">
          ${getText('hero_title', 'Limited-Time Flash Deal: Up to 70% Off!')}
        </h1>
        <p class="text-lg md:text-xl text-red-100 max-w-lg mx-auto md:mx-0">
          ${getText('hero_description', "Experience superior sound quality and comfort. Don't miss our biggest sale of the year!")}
        </p>

        <!-- Countdown Timer -->
        <div class="flex justify-center md:justify-start gap-4 text-center my-6">
          <div class="bg-black/30 rounded-lg p-3 w-20 backdrop-blur-sm border border-red-400">
            <span id="timer-hours" class="block text-3xl font-bold font-mono">${getText('hero_timer_hours', '03')}</span>
            <span class="text-xs uppercase">Hours</span>
          </div>
          <div class="text-3xl font-bold self-center">:</div>
          <div class="bg-black/30 rounded-lg p-3 w-20 backdrop-blur-sm border border-red-400">
            <span id="timer-mins" class="block text-3xl font-bold font-mono">${getText('hero_timer_mins', '45')}</span>
            <span class="text-xs uppercase">Mins</span>
          </div>
          <div class="text-3xl font-bold self-center">:</div>
          <div class="bg-black/30 rounded-lg p-3 w-20 backdrop-blur-sm border border-red-400">
            <span id="timer-secs" class="block text-3xl font-bold font-mono">${getText('hero_timer_secs', '20')}</span>
            <span class="text-xs uppercase">Secs</span>
          </div>
        </div>

        <button class="bg-yellow-500 hover:bg-yellow-400 text-red-900 font-black text-xl py-4 px-10 rounded-full shadow-lg transform hover:scale-105 transition duration-300 w-full md:w-auto uppercase">
          ${getButton('hero_cta', 'Get Yours Now - Save 70%')}
        </button>

        <div class="flex justify-center md:justify-start gap-4 text-xs font-semibold pt-2 opacity-90">
          <span>✓ ${getText('hero_badge_1', '1-Year Warranty')}</span>
          <span>🚚 ${getText('hero_badge_2', 'Free Shipping')}</span>
          <span>🔒 ${getText('hero_badge_3', 'Secure Payment')}</span>
        </div>
      </div>

      <div class="relative group">
        <div class="absolute inset-0 bg-yellow-500 blur-[80px] opacity-20 rounded-full"></div>
        <img src="${getImage('hero_image', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop')}" alt="Product" class="relative z-10 w-full drop-shadow-2xl transform group-hover:scale-105 transition duration-500 rounded-2xl">
      </div>
    </div>
  </section>

  <!-- Urgency Bar -->
  <div class="bg-black text-white text-center py-4 font-bold text-lg md:text-xl uppercase tracking-wider">
    ${getText('urgency_bar_text', 'TODAY ONLY: Price Drops, Limited Stock, Instant Savings! Act Fast!')}
  </div>

  <!-- Quick Offers Section -->
  <section class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-10 text-gray-900">${getText('offers_title', 'Quick Offer Highlights')}</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-gray-100 p-6 rounded-xl flex items-center gap-4 border border-gray-200 shadow-sm">
          <div class="text-4xl text-red-600">🏷️</div>
          <div>
            <h3 class="font-bold text-lg">${getText('offer_1_title', '70% OFF HEADPHONES')}</h3>
            <p class="text-sm text-gray-600">${getText('offer_1_description', 'Massive discount on our best selling model.')}</p>
          </div>
        </div>
        <div class="bg-gray-100 p-6 rounded-xl flex items-center gap-4 border border-gray-200 shadow-sm">
          <div class="text-4xl text-gray-800">🎁</div>
          <div>
            <h3 class="font-bold text-lg">${getText('offer_2_title', 'FREE CARRY CASE')}</h3>
            <p class="text-sm text-gray-600">${getText('offer_2_description', 'Includes premium protective case.')}</p>
          </div>
        </div>
        <div class="bg-gray-100 p-6 rounded-xl flex items-center gap-4 border border-gray-200 shadow-sm">
          <div class="text-4xl text-gray-800">🚀</div>
          <div>
            <h3 class="font-bold text-lg">${getText('offer_3_title', 'NEXT DAY DELIVERY')}</h3>
            <p class="text-sm text-gray-600">${getText('offer_3_description', 'Order by 2 PM for fast shipping.')}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Product Benefits Section -->
  <section class="py-12 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-10">${getText('benefits_title', 'Product Benefits')}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <div class="text-4xl text-red-600 mb-4">🎧</div>
          <h3 class="font-bold text-lg mb-2">${getText('benefit_1_title', 'Active Noise Cancellation')}</h3>
          <p class="text-sm text-gray-600">${getText('benefit_1_description', 'Immerse yourself in music without distractions.')}</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <div class="text-4xl text-red-600 mb-4">🔋</div>
          <h3 class="font-bold text-lg mb-2">${getText('benefit_2_title', '30+ Hour Battery Life')}</h3>
          <p class="text-sm text-gray-600">${getText('benefit_2_description', 'Long lasting power for all-day listening.')}</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <div class="text-4xl text-red-600 mb-4">☁️</div>
          <h3 class="font-bold text-lg mb-2">${getText('benefit_3_title', 'Supreme Comfort')}</h3>
          <p class="text-sm text-gray-600">${getText('benefit_3_description', 'Ergonomic design for extended wear.')}</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <div class="text-4xl text-red-600 mb-4">🎤</div>
          <h3 class="font-bold text-lg mb-2">${getText('benefit_4_title', 'Crystal Clear Calls')}</h3>
          <p class="text-sm text-gray-600">${getText('benefit_4_description', 'Built-in mic for seamless communication.')}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Detailed Features Section -->
  <section class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 space-y-12">
      <h2 class="text-3xl font-bold text-center mb-8">${getText('features_title', 'Detailed Product Features')}</h2>

      <div class="grid md:grid-cols-2 gap-8 items-center">
        <img src="${getImage('feature_1_image', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=350&fit=crop')}" alt="Feature 1" class="rounded-2xl shadow-lg w-full">
        <div>
          <h3 class="text-2xl font-bold mb-4">${getText('feature_1_title', 'Intuitive Touch Controls')}</h3>
          <p class="text-gray-600 mb-4">${getText('feature_1_description', 'Effortlessly manage volume, tracks, and calls with a simple tap on the ear cup. No need to reach for your phone.')}</p>
          <ul class="space-y-2 text-sm text-gray-700">
            <li><span class="text-green-500 mr-2">✓</span>${getText('feature_1_bullet_1', 'Swipe for volume')}</li>
            <li><span class="text-green-500 mr-2">✓</span>${getText('feature_1_bullet_2', 'Tap to pause/play')}</li>
          </ul>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-8 items-center">
        <div class="md:order-2">
          <img src="${getImage('feature_2_image', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=350&fit=crop')}" alt="Feature 2" class="rounded-2xl shadow-lg w-full">
        </div>
        <div class="md:order-1">
          <h3 class="text-2xl font-bold mb-4">${getText('feature_2_title', 'Portable and Foldable Design')}</h3>
          <p class="text-gray-600 mb-4">${getText('feature_2_description', 'Compact and easy to carry anywhere. The premium hinges allow the headphones to fold flat into the included travel case.')}</p>
          <ul class="space-y-2 text-sm text-gray-700">
            <li><span class="text-green-500 mr-2">✓</span>${getText('feature_2_bullet_1', 'Travel-ready')}</li>
            <li><span class="text-green-500 mr-2">✓</span>${getText('feature_2_bullet_2', 'Lightweight construction')}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Gallery Section -->
  <section class="py-12 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-10">${getText('gallery_title', 'Product Gallery')}</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="col-span-2 md:col-span-2 row-span-2">
          <img src="${getImage('gallery_1', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop')}" class="w-full h-full object-cover rounded-xl shadow-sm" alt="Main Gallery">
        </div>
        <img src="${getImage('gallery_2', 'https://images.unsplash.com/photo-1558756520-22cfe5d382ca?w=300&h=300&fit=crop')}" class="w-full rounded-xl shadow-sm aspect-square object-cover" alt="Gallery 2">
        <img src="${getImage('gallery_3', 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=300&h=300&fit=crop')}" class="w-full rounded-xl shadow-sm aspect-square object-cover" alt="Gallery 3">
        <img src="${getImage('gallery_4', 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=300&h=300&fit=crop')}" class="w-full rounded-xl shadow-sm aspect-square object-cover" alt="Gallery 4">
        <img src="${getImage('gallery_5', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop')}" class="w-full rounded-xl shadow-sm aspect-square object-cover" alt="Gallery 5">
      </div>
    </div>
  </section>

  <!-- Stock & Pricing Section -->
  <section class="py-16 bg-white">
    <div class="max-w-4xl mx-auto px-4">
      <div class="mb-10 text-center">
        <h3 class="text-xl font-bold mb-2 text-red-600">Stock & Scarcity</h3>
        <div class="w-full bg-gray-200 rounded-full h-6 mb-2 relative overflow-hidden">
          <div class="bg-red-600 h-6 rounded-full text-xs text-white flex items-center justify-center font-bold" style="width: ${getText('stock_percentage', '85')}%">${getText('stock_percentage', '85')}% SOLD</div>
        </div>
        <p class="text-sm font-bold text-gray-800">${getText('stock_message', 'HURRY! Only 150 units left at this price. 500+ people viewing this product right now!')}</p>
      </div>

      <div class="bg-neutral-900 text-white rounded-3xl p-8 md:p-12 text-center shadow-2xl border-4 border-red-600 relative">
        <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-lg">
          ${getText('pricing_badge', 'Best Deal Ever')}
        </div>

        <h2 class="text-2xl font-light text-gray-400 mb-2">${getText('pricing_label', 'FLASH SALE PRICE')}</h2>
        <div class="flex items-center justify-center gap-4 mb-6">
          <span class="text-3xl text-gray-500 line-through">${getText('pricing_original', '$299.99')}</span>
          <span class="text-6xl md:text-7xl font-black text-red-500">${getText('pricing_sale', '$89.99')}</span>
        </div>

        <button class="bg-yellow-500 hover:bg-yellow-400 text-black font-black text-2xl py-4 px-12 rounded-full shadow-lg transform hover:scale-105 transition duration-300 w-full md:w-auto mb-6">
          ${getButton('pricing_cta', 'BUY NOW & SAVE $210')}
        </button>

        <div class="flex justify-center gap-4 text-2xl text-gray-400">
          <span>💳</span>
          <span>💳</span>
          <span>💳</span>
          <span>💳</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Reviews Section -->
  <section class="py-12 bg-gray-50">
    <div class="max-w-3xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-2">${getText('reviews_title', 'Customer Reviews')}</h2>
      <p class="text-center text-gray-600 mb-10">${getText('reviews_subtitle', '4.9/5 Stars based on 500+ reviews')}</p>

      <div class="space-y-4">
        <div class="bg-white p-4 rounded-lg shadow-sm flex gap-4 items-start">
          <img src="${getImage('review_1_image', 'https://i.pravatar.cc/150?img=1')}" class="w-12 h-12 rounded-full object-cover" alt="Reviewer">
          <div>
            <div class="text-yellow-400 text-sm mb-1">⭐⭐⭐⭐⭐</div>
            <p class="font-bold text-sm">${getText('review_1_text', '"Amazing sound quality and comfort!"')}</p>
            <p class="text-xs text-gray-500 mt-1">${getText('review_1_author', '- Sarah J.')}</p>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm flex gap-4 items-start">
          <img src="${getImage('review_2_image', 'https://i.pravatar.cc/150?img=3')}" class="w-12 h-12 rounded-full object-cover" alt="Reviewer">
          <div>
            <div class="text-yellow-400 text-sm mb-1">⭐⭐⭐⭐⭐</div>
            <p class="font-bold text-sm">${getText('review_2_text', '"Best deal ever, incredible value."')}</p>
            <p class="text-xs text-gray-500 mt-1">${getText('review_2_author', '- Mike T.')}</p>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm flex gap-4 items-start">
          <img src="${getImage('review_3_image', 'https://i.pravatar.cc/150?img=5')}" class="w-12 h-12 rounded-full object-cover" alt="Reviewer">
          <div>
            <div class="text-yellow-400 text-sm mb-1">⭐⭐⭐⭐⭐</div>
            <p class="font-bold text-sm">${getText('review_3_text', '"Great headphones, fast delivery."')}</p>
            <p class="text-xs text-gray-500 mt-1">${getText('review_3_author', '- Emily K.')}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- How It Works Section -->
  <section class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 text-center">
      <h2 class="text-2xl font-bold mb-8">${getText('how_it_works_title', 'How It Works')}</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div>
          <div class="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
          <h3 class="font-bold">${getText('step_1_title', 'Add to Cart')}</h3>
          <p class="text-sm text-gray-600">${getText('step_1_description', 'Select your quantity and click buy.')}</p>
        </div>
        <div>
          <div class="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
          <h3 class="font-bold">${getText('step_2_title', 'Checkout Securely')}</h3>
          <p class="text-sm text-gray-600">${getText('step_2_description', 'Enter your shipping details.')}</p>
        </div>
        <div>
          <div class="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
          <h3 class="font-bold">${getText('step_3_title', 'Enjoy Your Headphones')}</h3>
          <p class="text-sm text-gray-600">${getText('step_3_description', 'Fast delivery to your door.')}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="py-12 bg-gray-50">
    <div class="max-w-2xl mx-auto px-4">
      <h2 class="text-2xl font-bold text-center mb-8">${getText('faq_title', 'FAQ Section')}</h2>
      <div class="space-y-4">
        <details class="bg-white p-4 rounded-lg shadow-sm cursor-pointer group">
          <summary class="font-semibold flex justify-between items-center list-none">
            ${getText('faq_1_question', 'How long does shipping take?')}
            <span class="transition group-open:rotate-180">▼</span>
          </summary>
          <p class="text-gray-600 mt-2 text-sm">${getText('faq_1_answer', 'We offer Next Day Delivery if you order before 2 PM. Standard shipping takes 2-4 business days.')}</p>
        </details>
        <details class="bg-white p-4 rounded-lg shadow-sm cursor-pointer group">
          <summary class="font-semibold flex justify-between items-center list-none">
            ${getText('faq_2_question', 'What is the return policy?')}
            <span class="transition group-open:rotate-180">▼</span>
          </summary>
          <p class="text-gray-600 mt-2 text-sm">${getText('faq_2_answer', 'We have a 30-day money-back guarantee. No questions asked.')}</p>
        </details>
        <details class="bg-white p-4 rounded-lg shadow-sm cursor-pointer group">
          <summary class="font-semibold flex justify-between items-center list-none">
            ${getText('faq_3_question', 'Is there a warranty?')}
            <span class="transition group-open:rotate-180">▼</span>
          </summary>
          <p class="text-gray-600 mt-2 text-sm">${getText('faq_3_answer', 'Yes, all headphones come with a 1-year manufacturer warranty.')}</p>
        </details>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-black text-white py-12 text-center">
    <h3 class="text-2xl font-bold mb-4">${getText('footer_cta_title', "Don't Miss Out - Sale Ends Soon!")}</h3>
    <button class="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-full mb-8">
      ${getButton('footer_cta_button', 'SHOP FLASH SALE NOW')}
    </button>
    <div class="flex justify-center gap-6 text-sm text-gray-400 mb-4">
      <span class="hover:text-white cursor-pointer">${getText('footer_link_1', 'About Us')}</span>
      <span class="hover:text-white cursor-pointer">${getText('footer_link_2', 'Contact')}</span>
      <span class="hover:text-white cursor-pointer">${getText('footer_link_3', 'Privacy Policy')}</span>
      <span class="hover:text-white cursor-pointer">${getText('footer_link_4', 'Terms of Service')}</span>
    </div>
    <div class="flex justify-center gap-4 text-xl mb-4">
      <span>📘</span>
      <span>📷</span>
      <span>🐦</span>
    </div>
    <p class="text-xs text-gray-600">${getText('footer_copyright', '© 2024 FlashDeals Inc. All Rights Reserved.')}</p>
  </footer>

  <script>
    // Handle smooth scrolling for anchor links
    document.addEventListener('DOMContentLoaded', function() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    });

    // Countdown Timer
    (function() {
      let hours = parseInt(document.getElementById('timer-hours').textContent) || 3;
      let minutes = parseInt(document.getElementById('timer-mins').textContent) || 45;
      let seconds = parseInt(document.getElementById('timer-secs').textContent) || 20;
      
      function updateTimer() {
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
        
        document.getElementById('timer-hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('timer-mins').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('timer-secs').textContent = seconds.toString().padStart(2, '0');
      }
      
      setInterval(updateTimer, 1000);
    })();
  </script>
</body>
</html>`;
};
