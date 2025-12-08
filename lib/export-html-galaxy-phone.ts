import { TemplateData } from '@/types/template';

export const generateGalaxyPhoneHTML = (data: TemplateData): string => {
  const getText = (id: string, defaultValue: string) => {
    return data[id]?.text || defaultValue;
  };

  const getImage = (id: string, defaultValue: string) => {
    return data[id]?.image || defaultValue;
  };

  const getButton = (id: string, defaultText: string, defaultUrl: string = '#') => {
    return {
      text: data[id]?.button?.text || defaultText,
      url: data[id]?.button?.url || defaultUrl,
    };
  };

  return `<!DOCTYPE html>
<html class="light" lang="en">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>Flagship Phone Product Page</title>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
  <script>
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "primary": "#2b8cee",
            "background-light": "#f6f7f8",
            "background-dark": "#101922",
          },
          fontFamily: {
            "display": ["Space Grotesk", "sans-serif"]
          },
          borderRadius: {
            "DEFAULT": "0.25rem",
            "lg": "0.5rem",
            "xl": "0.75rem",
            "full": "9999px"
          },
        },
      },
    }
  </script>
  <style>
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
    .slider-image {
      position: absolute;
      inset: 0;
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
    }
    .slider-image.active {
      opacity: 1;
      z-index: 10;
    }
    .slider-container:hover .slider-arrow {
      opacity: 1;
    }
    .slider-arrow {
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .slider-dot.active {
      background-color: white;
      transform: scale(1.1);
    }
    .slider-tab.active {
      background-color: rgba(43, 140, 238, 0.2);
      color: #2b8cee;
      border: 2px solid #2b8cee;
    }
  </style>
</head>
<body class="bg-background-light font-display">
  <div class="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
    <div class="layout-container flex h-full grow flex-col">
      <div class="flex flex-1 justify-center">
        <div class="layout-content-container flex flex-col w-full">
          <!-- Header -->
          <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 px-4 sm:px-10 py-3 bg-white backdrop-blur-sm sticky top-0 z-50">
            <div class="flex items-center gap-8">
              <div class="flex items-center gap-2 text-slate-900">
                <span class="material-symbols-outlined text-2xl text-primary">interests</span>
                <h2 class="text-lg font-bold leading-tight tracking-[-0.015em]">${getText('nav_brand', 'Galaxy')}</h2>
              </div>
              <div class="hidden md:flex items-center gap-9">
                <a class="text-slate-800 text-sm font-medium leading-normal" href="#">${getText('nav_link_1', 'Phones')}</a>
                <a class="text-slate-800 text-sm font-medium leading-normal" href="#">${getText('nav_link_2', 'Tablets')}</a>
                <a class="text-slate-800 text-sm font-medium leading-normal" href="#">${getText('nav_link_3', 'Watches')}</a>
                <a class="text-slate-800 text-sm font-medium leading-normal" href="#">${getText('nav_link_4', 'Deals')}</a>
              </div>
            </div>
            <div class="flex flex-1 justify-end items-center gap-2">
              <div class="hidden sm:flex">
                <label class="flex flex-col min-w-40 !h-10 max-w-64">
                  <div class="flex w-full flex-1 items-stretch rounded-lg h-full">
                    <div class="text-slate-500 flex border-none bg-slate-100 items-center justify-center pl-3 rounded-l-lg border-r-0">
                      <span class="material-symbols-outlined">search</span>
                    </div>
                    <input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-0 focus:ring-0 border-none bg-slate-100 focus:border-none h-full placeholder:text-slate-500 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" placeholder="Search" value=""/>
                  </div>
                </label>
              </div>
              <button class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-slate-100 text-slate-900 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                <span class="material-symbols-outlined">shopping_cart</span>
              </button>
              <button class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-slate-100 text-slate-900 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                <span class="material-symbols-outlined">account_circle</span>
              </button>
            </div>
          </header>

          <main class="py-5">
            <div class="mx-auto flex flex-col gap-12">
              <!-- Hero Image Slider Section -->
              <div class="w-full lg:w-[88%] lg:mx-auto px-0 md:px-8 lg:px-0">
                <div class="flex flex-col gap-4">
                  <div class="slider-container relative bg-slate-100 rounded-none lg:rounded-xl aspect-square md:aspect-video overflow-hidden">
                    <!-- Slider Images -->
                    <div class="relative w-full h-full">
                      <div class="slider-image active" data-slide="0">
                        <img src="${getImage('hero_image_1', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcQ8vje5f3LPncIbhlcuI1VkjQdi0mxfu-02iE0W-BlV4yMzBptIc7HWITJ0a4F7VZaDdHMjfM8PT-VdaNQwaWkISCTLPOfqQ-C1iIZf3lA2mMRjnBTKJCW89dimJu-x76sR5aHZP_NzEn0gybgRkYX1CC-VCf_9Rwm6JTvNU3gs4dpgjjQ9XquSh-lRr72aBV7c17dMSawS-hx1GsuFSsag57wo51tZfrxrgOg4Keur73ypcPWal9li-B4d014XxNnQYNQGoVDJs')}" alt="Front View" class="w-full h-full object-cover" />
                      </div>
                      <div class="slider-image" data-slide="1">
                        <img src="${getImage('hero_image_2', 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=600&fit=crop')}" alt="Back View" class="w-full h-full object-cover" />
                      </div>
                      <div class="slider-image" data-slide="2">
                        <img src="${getImage('hero_image_3', 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=600&fit=crop')}" alt="Side View" class="w-full h-full object-cover" />
                      </div>
                      <div class="slider-image" data-slide="3">
                        <img src="${getImage('hero_image_4', 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=600&fit=crop')}" alt="Camera" class="w-full h-full object-cover" />
                      </div>
                    </div>

                    <!-- Navigation Arrows -->
                    <button onclick="prevSlide()" class="slider-arrow absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center">
                      <span class="material-symbols-outlined text-slate-700">chevron_left</span>
                    </button>
                    <button onclick="nextSlide()" class="slider-arrow absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center">
                      <span class="material-symbols-outlined text-slate-700">chevron_right</span>
                    </button>

                    <!-- Dot Indicators -->
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent z-20">
                      <div class="flex justify-center gap-2 p-5">
                        <button onclick="goToSlide(0)" class="slider-dot active size-2.5 rounded-full bg-white/50 hover:bg-white/70 transition-all" data-dot="0"></button>
                        <button onclick="goToSlide(1)" class="slider-dot size-2.5 rounded-full bg-white/50 hover:bg-white/70 transition-all" data-dot="1"></button>
                        <button onclick="goToSlide(2)" class="slider-dot size-2.5 rounded-full bg-white/50 hover:bg-white/70 transition-all" data-dot="2"></button>
                        <button onclick="goToSlide(3)" class="slider-dot size-2.5 rounded-full bg-white/50 hover:bg-white/70 transition-all" data-dot="3"></button>
                      </div>
                    </div>
                  </div>

                  <!-- Thumbnail Navigation -->
                  <div class="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:justify-center sm:mx-0 sm:px-0">
                    <button onclick="goToSlide(0)" class="slider-tab active flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-200 text-slate-800 px-4 transition-all" data-tab="0">
                      <p class="text-sm font-medium leading-normal">Front View</p>
                    </button>
                    <button onclick="goToSlide(1)" class="slider-tab flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-200 text-slate-800 px-4 transition-all" data-tab="1">
                      <p class="text-sm font-medium leading-normal">Back View</p>
                    </button>
                    <button onclick="goToSlide(2)" class="slider-tab flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-200 text-slate-800 px-4 transition-all" data-tab="2">
                      <p class="text-sm font-medium leading-normal">Side View</p>
                    </button>
                    <button onclick="goToSlide(3)" class="slider-tab flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-200 text-slate-800 px-4 transition-all" data-tab="3">
                      <p class="text-sm font-medium leading-normal">Camera</p>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Product Info Section -->
              <div class="px-4 sm:px-8 md:px-16 lg:px-24">
                <div class="max-w-4xl mx-auto flex flex-col gap-6">
                  <h1 class="text-slate-900 tracking-tight text-4xl sm:text-5xl font-bold leading-tight text-left">${getText('hero_title', 'Galaxy S25 Ultra 5G')}</h1>
                  
                  <!-- Rating -->
                  <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <div class="flex items-center gap-2">
                      <p class="text-slate-900 text-lg font-bold">${getText('hero_rating', '4.8')}</p>
                      <div class="flex gap-0.5">
                        <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1">star</span>
                        <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1">star</span>
                        <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1">star</span>
                        <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1">star</span>
                        <span class="material-symbols-outlined text-primary">star_half</span>
                      </div>
                    </div>
                    <a class="text-slate-600 text-sm font-normal leading-normal underline" href="#">${getText('hero_reviews_count', '1,284 reviews')}</a>
                  </div>

                  <!-- Pricing Card -->
                  <div class="flex flex-col gap-4 p-4 bg-white rounded-xl border border-slate-200">
                    <div class="flex items-baseline gap-4">
                      <span class="text-4xl font-bold text-slate-900">${getText('price_current', '$999.00')}</span>
                      <span class="text-xl font-medium text-slate-500 line-through">${getText('price_original', '$1299.00')}</span>
                      <span class="text-sm font-bold text-orange-500 bg-orange-500/10 px-2 py-1 rounded-md">${getText('price_discount', '-30%')}</span>
                    </div>
                    <p class="text-sm text-slate-600">${getText('price_savings', 'You save $300.00. Free delivery by Tomorrow.')}</p>
                  </div>

                  <!-- Color Selection -->
                  <div class="flex flex-col gap-3">
                    <p class="text-base font-medium text-slate-800">${getText('color_label', 'Color:')} <span class="font-bold">${getText('color_name', 'Titanium Gray')}</span></p>
                    <div class="flex gap-3">
                      <button class="size-8 rounded-full bg-[#a1a1aa] ring-2 ring-primary ring-offset-2 ring-offset-background-light"></button>
                      <button class="size-8 rounded-full bg-[#1e40af]"></button>
                      <button class="size-8 rounded-full bg-[#fde047]"></button>
                      <button class="size-8 rounded-full bg-[#171717]"></button>
                    </div>
                  </div>

                  <!-- Storage Selection -->
                  <div class="flex flex-col gap-3">
                    <p class="text-base font-medium text-slate-800">${getText('storage_label', 'Storage:')} <span class="font-bold">${getText('storage_selected', '256GB')}</span></p>
                    <div class="flex flex-wrap gap-3">
                      <button class="px-4 py-2 rounded-lg bg-primary/20 text-primary border-2 border-primary"><span class="font-bold">${getText('storage_option_1', '256GB')}</span></button>
                      <button class="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"><span class="font-bold">${getText('storage_option_2', '512GB')}</span></button>
                      <button class="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"><span class="font-bold">${getText('storage_option_3', '1TB')}</span></button>
                    </div>
                  </div>

                  <!-- CTA Buttons -->
                  <div class="flex flex-col gap-4 pt-4">
                    <a href="${getButton('cta_buy_now', 'Buy Now', '#').url}" class="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-4 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em]">
                      <span class="truncate">${getButton('cta_buy_now', 'Buy Now').text}</span>
                    </a>
                    <a href="${getButton('cta_add_cart', 'Add to Cart', '#').url}" class="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-4 bg-primary/20 text-primary text-base font-bold leading-normal tracking-[0.015em]">
                      <span class="truncate">${getButton('cta_add_cart', 'Add to Cart').text}</span>
                    </a>
                    <div class="flex items-center justify-center gap-2 text-slate-500">
                      <span class="material-symbols-outlined text-sm">lock</span>
                      <p class="text-xs">Secure Checkout</p>
                    </div>
                  </div>
                </div>

                <!-- Quick Highlights -->
                <div class="mt-16 max-w-4xl mx-auto">
                  <h2 class="text-3xl font-bold text-slate-900 mb-8 text-center">${getText('highlights_title', 'Quick Highlights')}</h2>
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-slate-200">
                      <span class="material-symbols-outlined text-4xl text-primary mb-3">photo_camera</span>
                      <h3 class="font-bold text-lg text-slate-800">${getText('highlight_1_title', 'Pro-Grade Camera')}</h3>
                      <p class="text-sm text-slate-600 mt-1">${getText('highlight_1_description', '200MP sensor for incredible detail in any light.')}</p>
                    </div>
                    <div class="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-slate-200">
                      <span class="material-symbols-outlined text-4xl text-primary mb-3">battery_charging_full</span>
                      <h3 class="font-bold text-lg text-slate-800">${getText('highlight_2_title', 'All-Day Battery')}</h3>
                      <p class="text-sm text-slate-600 mt-1">${getText('highlight_2_description', '5000mAh intelligent battery that lasts longer than your day.')}</p>
                    </div>
                    <div class="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-slate-200">
                      <span class="material-symbols-outlined text-4xl text-primary mb-3">fullscreen</span>
                      <h3 class="font-bold text-lg text-slate-800">${getText('highlight_3_title', 'Dynamic Display')}</h3>
                      <p class="text-sm text-slate-600 mt-1">${getText('highlight_3_description', '6.8" Dynamic AMOLED 2X with 120Hz refresh rate.')}</p>
                    </div>
                    <div class="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-slate-200">
                      <span class="material-symbols-outlined text-4xl text-primary mb-3">memory</span>
                      <h3 class="font-bold text-lg text-slate-800">${getText('highlight_4_title', 'Ultimate Performance')}</h3>
                      <p class="text-sm text-slate-600 mt-1">${getText('highlight_4_description', 'Next-gen processor for unparalleled speed and power.')}</p>
                    </div>
                  </div>
                </div>

                <!-- Detailed Specifications -->
                <div class="mt-16 max-w-4xl mx-auto">
                  <h2 class="text-3xl font-bold text-slate-900 mb-8 text-center">${getText('specs_title', 'Detailed Specifications')}</h2>
                  <div class="flow-root">
                    <dl class="-my-3 divide-y divide-slate-200 text-sm">
                      <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt class="font-medium text-slate-800">${getText('spec_1_label', 'Display')}</dt>
                        <dd class="text-slate-600 sm:col-span-2">${getText('spec_1_value', '6.8" Quad HD+ Dynamic AMOLED 2X, 120Hz')}</dd>
                      </div>
                      <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt class="font-medium text-slate-800">${getText('spec_2_label', 'Processor')}</dt>
                        <dd class="text-slate-600 sm:col-span-2">${getText('spec_2_value', 'Snapdragon 9 Gen 4 for Galaxy')}</dd>
                      </div>
                      <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt class="font-medium text-slate-800">${getText('spec_3_label', 'RAM')}</dt>
                        <dd class="text-slate-600 sm:col-span-2">${getText('spec_3_value', '12GB / 16GB')}</dd>
                      </div>
                      <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt class="font-medium text-slate-800">${getText('spec_4_label', 'Camera')}</dt>
                        <dd class="text-slate-600 sm:col-span-2">${getText('spec_4_value', '200MP Wide, 12MP Ultra-Wide, 50MP 5x Telephoto, 10MP 3x Telephoto')}</dd>
                      </div>
                      <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt class="font-medium text-slate-800">${getText('spec_5_label', 'Battery')}</dt>
                        <dd class="text-slate-600 sm:col-span-2">${getText('spec_5_value', '5,000mAh, 45W Super Fast Charging')}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <!-- Customer Reviews -->
                <div class="mt-16 max-w-4xl mx-auto p-6 sm:p-8 bg-white rounded-xl border border-slate-200">
                  <h2 class="text-2xl font-bold text-slate-900 mb-6">${getText('reviews_title', 'Customer Reviews')}</h2>
                  <div class="flex flex-wrap gap-x-8 gap-y-6">
                    <div class="flex flex-col gap-2">
                      <p class="text-slate-900 text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em]">${getText('reviews_rating', '4.8')}</p>
                      <div class="flex gap-0.5">
                        <span class="material-symbols-outlined text-primary text-xl" style="font-variation-settings: 'FILL' 1">star</span>
                        <span class="material-symbols-outlined text-primary text-xl" style="font-variation-settings: 'FILL' 1">star</span>
                        <span class="material-symbols-outlined text-primary text-xl" style="font-variation-settings: 'FILL' 1">star</span>
                        <span class="material-symbols-outlined text-primary text-xl" style="font-variation-settings: 'FILL' 1">star</span>
                        <span class="material-symbols-outlined text-primary text-xl">star_half</span>
                      </div>
                      <p class="text-slate-600 text-base font-normal leading-normal">${getText('reviews_total', 'Based on 1,284 reviews')}</p>
                    </div>
                    <div class="grid min-w-[200px] max-w-[400px] flex-1 grid-cols-[20px_1fr_40px] items-center gap-y-3">
                      <p class="text-slate-800 text-sm font-normal leading-normal">5</p>
                      <div class="flex h-2 flex-1 overflow-hidden rounded-full bg-slate-200"><div class="rounded-full bg-primary" style="width: 85%;"></div></div>
                      <p class="text-slate-500 text-sm font-normal leading-normal text-right">${getText('reviews_5_star', '85%')}</p>
                      <p class="text-slate-800 text-sm font-normal leading-normal">4</p>
                      <div class="flex h-2 flex-1 overflow-hidden rounded-full bg-slate-200"><div class="rounded-full bg-primary" style="width: 10%;"></div></div>
                      <p class="text-slate-500 text-sm font-normal leading-normal text-right">${getText('reviews_4_star', '10%')}</p>
                      <p class="text-slate-800 text-sm font-normal leading-normal">3</p>
                      <div class="flex h-2 flex-1 overflow-hidden rounded-full bg-slate-200"><div class="rounded-full bg-primary" style="width: 3%;"></div></div>
                      <p class="text-slate-500 text-sm font-normal leading-normal text-right">${getText('reviews_3_star', '3%')}</p>
                      <p class="text-slate-800 text-sm font-normal leading-normal">2</p>
                      <div class="flex h-2 flex-1 overflow-hidden rounded-full bg-slate-200"><div class="rounded-full bg-primary" style="width: 1%;"></div></div>
                      <p class="text-slate-500 text-sm font-normal leading-normal text-right">${getText('reviews_2_star', '1%')}</p>
                      <p class="text-slate-800 text-sm font-normal leading-normal">1</p>
                      <div class="flex h-2 flex-1 overflow-hidden rounded-full bg-slate-200"><div class="rounded-full bg-primary" style="width: 1%;"></div></div>
                      <p class="text-slate-500 text-sm font-normal leading-normal text-right">${getText('reviews_1_star', '1%')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>

  <script>
    let currentSlide = 0;
    const totalSlides = 4;

    function goToSlide(index) {
      currentSlide = index;
      updateSlider();
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider();
    }

    function updateSlider() {
      // Update images
      document.querySelectorAll('.slider-image').forEach((img, i) => {
        img.classList.toggle('active', i === currentSlide);
      });
      
      // Update dots
      document.querySelectorAll('.slider-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
      
      // Update tabs
      document.querySelectorAll('.slider-tab').forEach((tab, i) => {
        tab.classList.toggle('active', i === currentSlide);
      });
    }
  </script>
</body>
</html>`;
};
