export function generateFurnitureStoreHTML(data: Record<string, any>): string {
  const getText = (eid: string, defaultText: string) => data[eid]?.text || defaultText;
  const getImage = (eid: string, defaultSrc: string) => data[eid]?.image || defaultSrc;
  const getButton = (eid: string, defaultText: string, defaultUrl: string) => {
    return data[eid]?.button || { text: defaultText, url: defaultUrl };
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${getText('nav_brand', 'cocoVillage')} - Furniture Store</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; }
  </style>
</head>
<body class="min-h-screen bg-white">
  <!-- Navigation -->
  <nav class="bg-white border-b border-gray-200 py-4">
    <div class="container mx-auto px-6 flex justify-between items-center">
      <div class="text-2xl font-bold text-gray-800">${getText('nav_brand', 'cocoVillage')}</div>
      <div class="flex gap-8">
        <a href="#" class="text-gray-600 hover:text-gray-900">${getText('nav_link1', 'Home')}</a>
        <a href="#products" class="text-gray-600 hover:text-gray-900">${getText('nav_link2', 'Products')}</a>
        <a href="#about" class="text-gray-600 hover:text-gray-900">${getText('nav_link3', 'About')}</a>
        <a href="#contact" class="text-gray-600 hover:text-gray-900">${getText('nav_link4', 'Contact')}</a>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="relative bg-gradient-to-br from-blue-50 via-white to-orange-50 py-20">
    <div class="container mx-auto px-6">
      <div class="flex items-center justify-between">
        <div class="w-1/2">
          <div class="text-teal-600 text-sm font-semibold mb-2">${getText('hero_badge', 'GET')}</div>
          <div class="text-6xl font-bold text-teal-700 mb-2">${getText('hero_discount', '50%')}</div>
          <div class="text-4xl font-bold text-gray-700 mb-4">${getText('hero_discount_text', 'OFF')}</div>
          <h1 class="text-3xl font-bold text-gray-800 mb-4">${getText('hero_title', 'BEDS AND BEDDING SETS!')}</h1>
          <p class="text-gray-600 mb-6 max-w-md">${getText('hero_description', 'Transform your bedroom into a cozy sanctuary with our premium collection of beds and bedding sets.')}</p>
          <a href="${getButton('hero_cta', 'Shop Now', '#products').url}" class="inline-block text-white px-8 py-3 rounded-full hover:opacity-90 transition-colors" style="background-color: #ff7f6e;">
            ${getButton('hero_cta', 'Shop Now', '#products').text}
          </a>
        </div>
        <div class="w-1/2 flex justify-end">
          <img src="${getImage('hero_image', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&h=600&fit=crop')}" alt="Bedroom" class="rounded-full w-80 h-80 object-cover shadow-2xl">
        </div>
      </div>
    </div>
  </section>

  <!-- Beds Section -->
  <section id="products" class="py-16 bg-white">
    <div class="container mx-auto px-6">
      <div class="flex items-start gap-12 mb-12">
        <h2 class="text-5xl font-bold" style="color: #ffb5a7;">${getText('beds_title', 'BEDS')}</h2>
        <div class="flex-1">
          <p class="text-gray-600 leading-relaxed">${getText('beds_description', "Let's make right bed choice and bright design, we have beautiful and solid wood beds available in various sizes and designs including modern beds, bunk beds, and storage beds.")}</p>
        </div>
      </div>

      <!-- Beds Grid -->
      <div class="grid grid-cols-3 gap-8 mb-8">
        ${[1, 2, 3].map(i => `
          <div class="text-center">
            <img src="${getImage(`bed${i}_image`, `https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop&sig=${i}`)}" alt="Bed ${i}" class="w-full h-64 object-cover rounded-lg mb-4">
            <h3 class="text-xl font-bold text-gray-800 mb-2">${getText(`bed${i}_title`, 'HOUSE BEDS')}</h3>
            <p class="text-gray-600 mb-4">${getText(`bed${i}_price`, `Starting at $${299 + i * 50}`)}</p>
            <a href="${getButton(`bed${i}_cta`, 'Shop now', '#').url}" class="inline-block border-2 px-6 py-2 rounded-full hover:bg-orange-50 transition-colors" style="border-color: #ff7f6e; color: #ff7f6e;">
              ${getButton(`bed${i}_cta`, 'Shop now', '#').text}
            </a>
          </div>
        `).join('')}
      </div>

      <!-- Second Row -->
      <div class="grid grid-cols-3 gap-8">
        ${[4, 5, 6].map(i => `
          <div class="text-center">
            <img src="${getImage(`bed${i}_image`, `https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&h=300&fit=crop&sig=${i}`)}" alt="Bed ${i}" class="w-full h-64 object-cover rounded-lg mb-4">
            <h3 class="text-xl font-bold text-gray-800 mb-2">${getText(`bed${i}_title`, 'LOFT BED')}</h3>
            <p class="text-gray-600 mb-4">${getText(`bed${i}_price`, `$${2500 + i * 200}.00 $${2300 + i * 200}`)}</p>
            <a href="${getButton(`bed${i}_cta`, 'Shop now', '#').url}" class="inline-block border-2 px-6 py-2 rounded-full hover:bg-orange-50 transition-colors" style="border-color: #ff7f6e; color: #ff7f6e;">
              ${getButton(`bed${i}_cta`, 'Shop now', '#').text}
            </a>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Bedding Sets Section -->
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-6">
      <div class="flex items-start gap-12 mb-12">
        <h2 class="text-5xl font-bold" style="color: #ffb5a7;">${getText('bedding_title', 'BEDDING SETS')}</h2>
        <div class="flex-1">
          <p class="text-gray-600 leading-relaxed">${getText('bedding_description', 'The bed linen is an indispensable should have to construct a bed. It not only can make the bed more soft and warm, but also can decorate the bed and make it more beautiful.')}</p>
        </div>
      </div>

      <!-- Bedding Grid -->
      <div class="grid grid-cols-4 gap-6">
        ${[1, 2, 3, 4].map(i => `
          <div class="text-center">
            <img src="${getImage(`bedding${i}_image`, `https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&h=300&fit=crop&sig=${i}`)}" alt="Bedding ${i}" class="w-full h-48 object-cover rounded-lg mb-4">
            <h3 class="text-lg font-bold text-gray-800 mb-2">${getText(`bedding${i}_title`, `BEDDING SET ${i}`)}</h3>
            <p class="text-gray-600 mb-4">${getText(`bedding${i}_price`, `$${79 + i * 5}.99`)}</p>
            <a href="${getButton(`bedding${i}_cta`, 'Shop now', '#').url}" class="inline-block border-2 px-6 py-2 rounded-full hover:bg-orange-50 transition-colors text-sm" style="border-color: #ff7f6e; color: #ff7f6e;">
              ${getButton(`bedding${i}_cta`, 'Shop now', '#').text}
            </a>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Pillows Section -->
  <section class="py-16 bg-white">
    <div class="container mx-auto px-6">
      <h2 class="text-4xl font-bold text-teal-600 text-center mb-4">${getText('pillows_title', 'AND MANY FUN PILLOWS')}</h2>
      <p class="text-2xl text-gray-600 text-center mb-12">${getText('pillows_subtitle', 'AT $29.99 $20')}</p>

      <!-- Pillows Grid -->
      <div class="grid grid-cols-4 gap-6 mb-8">
        ${[1, 2, 3, 4, 5, 6, 7, 8].map(i => `
          <img src="${getImage(`pillow${i}_image`, `https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=300&h=300&fit=crop&sig=${i}`)}" alt="Pillow ${i}" class="w-full h-48 object-cover rounded-lg">
        `).join('')}
      </div>

      <div class="text-center">
        <a href="${getButton('pillows_cta', 'Shop now', '#').url}" class="inline-block border-2 px-8 py-3 rounded-full hover:bg-orange-50 transition-colors" style="border-color: #ff7f6e; color: #ff7f6e;">
          ${getButton('pillows_cta', 'Shop now', '#').text}
        </a>
      </div>
    </div>
  </section>

  <!-- Instagram Section -->
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-3 gap-6">
        ${[1, 2, 3].map(i => `
          <div class="relative">
            <img src="${getImage(`instagram${i}_image`, `https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop&sig=${i}`)}" alt="Instagram ${i}" class="w-full h-80 object-cover rounded-lg">
            <div class="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg">
              <div class="text-sm font-semibold">${getText(`instagram${i}_handle`, '@cocovillage')}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section id="about" class="py-16 bg-gradient-to-br from-blue-50 via-white to-teal-50">
    <div class="container mx-auto px-6 text-center max-w-3xl">
      <h2 class="text-4xl font-bold text-teal-700 mb-6">${getText('about_title', 'ABOUT COCO VILLAGE')}</h2>
      <p class="text-gray-600 leading-relaxed">${getText('about_description', 'Coco Village is proud to offer unique furniture and accessories for the importance of children. We believe every child deserves a comfortable and inspiring space to grow, learn, and dream. Our carefully curated collection combines safety, quality, and beautiful design.')}</p>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-800 text-white py-8">
    <div class="container mx-auto px-6 text-center">
      <div class="text-2xl font-bold mb-4">${getText('footer_brand', 'cocoVillage')}</div>
      <p class="text-gray-400">${getText('footer_copyright', '© 2025 cocoVillage. All rights reserved.')}</p>
    </div>
  </footer>
</body>
</html>`;
}
