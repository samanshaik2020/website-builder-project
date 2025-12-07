import { TemplateData } from '@/types/template';

export const generateGadgetDealsHTML = (data: TemplateData, projectName: string): string => {
  const getText = (id: string, defaultValue: string) => {
    const text = data[id]?.text || defaultValue;
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  const getImage = (id: string, defaultValue: string) => {
    return data[id]?.image || defaultValue;
  };

  const getButtonText = (id: string, defaultText: string) => {
    const text = data[id]?.button?.text || defaultText;
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  // Default product data for 12 items
  const defaultProductData = [
    { name: 'Aura Wireless Headphones', description: 'Bluetooth 5.3 · 40hr Battery', price: '$149', originalPrice: '$199', discount: '25% OFF' },
    { name: 'Explorer Action Camera', description: '4K Video · Waterproof to 50m', price: '$255', originalPrice: '$300', discount: '15% OFF' },
    { name: 'Nova Smartwatch Series 8', description: '45mm Retina Display · GPS', price: '$359', originalPrice: '$399', discount: '10% OFF' },
    { name: 'SoundWave Portable Speaker', description: 'IP67 Waterproof · 12hr Playtime', price: '$69', originalPrice: '$99', discount: '30% OFF' },
    { name: 'Quantum Earbuds Pro', description: 'Active Noise Cancellation', price: '$119', originalPrice: '$149', discount: '20% OFF' },
    { name: 'PowerUp 20000mAh Bank', description: 'Dual USB-C Fast Charging', price: '$32', originalPrice: '$50', discount: '35% OFF' },
    { name: 'Zenith Over-Ear Headphones', description: 'Hi-Fi Audio · Premium Comfort', price: '$195', originalPrice: '$250', discount: '22% OFF' },
    { name: 'AquaShot Waterproof Camera', description: '20MP Sensor · Image Stabilization', price: '$287', originalPrice: '$350', discount: '18% OFF' },
    { name: 'PulseFit Smart Tracker', description: 'Heart Rate & SpO2 Monitor', price: '$89', originalPrice: '$119', discount: '25% OFF' },
    { name: 'MegaBlast Bluetooth Speaker', description: '360° Sound · Rich Bass', price: '$99', originalPrice: '$149', discount: '33% OFF' },
    { name: 'Stealth Noise-Cancelling Buds', description: 'Secure Fit · 8hr Battery', price: '$126', originalPrice: '$149', discount: '15% OFF' },
    { name: 'ChargeFast Power Bank', description: 'Slim Design · 18W PD Output', price: '$29', originalPrice: '$49', discount: '40% OFF' },
  ];

  // Product images
  const productImages = [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop',
  ];

  // Generate product cards HTML
  const productCardsHTML = defaultProductData.map((product, i) => {
    const imageId = `product_${i + 1}_image`;
    const discountId = `product_${i + 1}_discount`;
    const nameId = `product_${i + 1}_name`;
    const descriptionId = `product_${i + 1}_description`;
    const priceId = `product_${i + 1}_price`;
    const originalPriceId = `product_${i + 1}_original_price`;
    const ctaId = `product_${i + 1}_cta`;

    return `
      <div class="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
        <div class="relative aspect-square overflow-hidden">
          <img src="${getImage(imageId, productImages[i] ?? productImages[0] ?? '')}" alt="${getText(nameId, product.name)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div class="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            ${getText(discountId, product.discount)}
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-bold text-gray-900 mb-1">${getText(nameId, product.name)}</h3>
          <p class="text-sm text-gray-500 mb-3">${getText(descriptionId, product.description)}</p>
          <div class="flex items-baseline gap-2 mb-4">
            <span class="text-xl font-bold text-gray-900">${getText(priceId, product.price)}</span>
            <span class="text-sm text-gray-400 line-through">${getText(originalPriceId, product.originalPrice)}</span>
          </div>
          <button class="w-full py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">${getButtonText(ctaId, 'Add to Cart')}</button>
        </div>
      </div>
    `;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <meta name="description" content="Website created with Squpage">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-900 min-h-screen">
  <!-- Header -->
  <header class="bg-white border-b border-gray-200 sticky top-0 z-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <span class="text-xl font-bold text-gray-900">${getText('nav_brand', 'GadgetStore')}</span>
        </div>
        <nav class="hidden md:flex items-center gap-8">
          <a href="#" class="text-sm font-medium text-gray-700 hover:text-blue-600">${getText('nav_link_1', 'Deals')}</a>
          <a href="#" class="text-sm font-medium text-gray-700 hover:text-blue-600">${getText('nav_link_2', 'New Arrivals')}</a>
          <a href="#" class="text-sm font-medium text-gray-700 hover:text-blue-600">${getText('nav_link_3', 'Categories')}</a>
          <a href="#" class="text-sm font-medium text-gray-700 hover:text-blue-600">${getText('nav_link_4', 'Support')}</a>
        </nav>
        <div class="flex items-center gap-3">
          <button class="p-2 hover:bg-gray-100 rounded-lg">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button class="p-2 hover:bg-gray-100 rounded-lg">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button class="p-2 hover:bg-gray-100 rounded-lg relative">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Hero Title -->
    <div class="mb-8">
      <h1 class="text-3xl sm:text-4xl font-black text-gray-900 mb-2">${getText('hero_title', 'Top Deals on Gadgets — Big Discounts Live!')}</h1>
      <p class="text-gray-600">${getText('hero_subtitle', "Shop the best tech deals before they're gone")}</p>
    </div>

    <!-- Filter Buttons -->
    <div class="flex gap-3 mb-8 overflow-x-auto pb-2">
      <button class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 whitespace-nowrap">
        <span class="text-sm font-medium text-gray-700">${getText('filter_1', 'Category')}</span>
        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <button class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 whitespace-nowrap">
        <span class="text-sm font-medium text-gray-700">${getText('filter_2', 'Price')}</span>
        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <button class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 whitespace-nowrap">
        <span class="text-sm font-medium text-gray-700">${getText('filter_3', 'Discount')}</span>
        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <button class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 whitespace-nowrap">
        <span class="text-sm font-medium text-gray-700">${getText('filter_4', 'Popularity')}</span>
        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      ${productCardsHTML}
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-center gap-2 mt-10">
      <button class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100">
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold">1</button>
      <button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700">2</button>
      <button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700">3</button>
      <span class="w-10 h-10 flex items-center justify-center text-gray-500">...</span>
      <button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700">10</button>
      <button class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100">
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </main>
</body>
</html>`;
};
