import { TemplateData } from '@/types/template';

export const generateMegaDiscountHTML = (data: TemplateData): string => {
  const getText = (id: string, defaultText: string) => {
    return data[id]?.text || defaultText;
  };

  const getButton = (id: string, defaultText: string, defaultUrl: string = '#') => {
    return {
      text: data[id]?.button?.text || defaultText,
      url: data[id]?.button?.url || defaultUrl,
    };
  };

  const getImage = (id: string, defaultSrc: string) => {
    return data[id]?.image || defaultSrc;
  };

  const ctaButton = getButton('cta_button', 'Buy Now & Save 70%', '#buy');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>Mega Discount Flash Sale</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com" rel="preconnect"/>
  <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
  <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700;900&family=Lato:wght@400;700&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
  <style>
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
  </style>
</head>
<body style="font-family: 'Lato', sans-serif; background-color: #F8FAFC; color: #1F2937;">
  <div class="relative flex min-h-screen w-full flex-col overflow-x-hidden">
    <div class="flex h-full grow flex-col">
      <div class="flex flex-1 justify-center py-8 md:py-12 lg:py-16">
        <div class="flex flex-col w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8">
          
          <!-- Flash Sale Banner -->
          <div class="w-full text-center mb-6">
            <p class="text-sm font-normal leading-normal py-2 px-4 inline-flex items-center gap-1 rounded-full" style="background-color: #A7F3D0; color: #1F2937;">
              <span class="material-symbols-outlined text-base">bolt</span>
              ${getText('flash_banner_text', 'FLASH SALE LIVE — UP TO 70% OFF')}
            </p>
          </div>

          <!-- Main Content -->
          <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch py-4 lg:py-8">
            
            <!-- Left Column -->
            <div class="flex flex-col gap-6 w-full lg:w-1/2">
              
              <!-- Hero Card -->
              <div class="p-6 md:p-8 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tighter" style="font-family: 'Rubik', sans-serif; color: #1F2937;">
                  ${getText('hero_title', '🔥 Mega Discount Sale Is Live — Grab It Now!')}
                </h1>
                <p class="text-base md:text-lg font-normal leading-normal" style="color: #4B5563;">
                  ${getText('hero_description', 'Limited-time offer. Prices slashed up to 70%. Hurry before stock runs out!')}
                </p>
              </div>

              <!-- Countdown Timer Card -->
              <div class="p-6 md:p-8 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
                <h3 class="text-xl font-bold mb-2" style="font-family: 'Rubik', sans-serif; color: #1F2937;">
                  ${getText('timer_title', 'Time Remaining:')}
                </h3>
                <div class="grid grid-cols-4 gap-4">
                  <div class="flex flex-col items-center justify-center p-3 rounded-lg" style="background-color: #67E8F9; color: #1F2937;">
                    <p id="timer-days" class="text-3xl md:text-4xl font-bold" style="font-family: 'Rubik', sans-serif;">
                      ${getText('timer_days', '01')}
                    </p>
                    <p class="text-xs sm:text-sm">Days</p>
                  </div>
                  <div class="flex flex-col items-center justify-center p-3 rounded-lg" style="background-color: #67E8F9; color: #1F2937;">
                    <p id="timer-hours" class="text-3xl md:text-4xl font-bold" style="font-family: 'Rubik', sans-serif;">
                      ${getText('timer_hours', '18')}
                    </p>
                    <p class="text-xs sm:text-sm">Hours</p>
                  </div>
                  <div class="flex flex-col items-center justify-center p-3 rounded-lg" style="background-color: #67E8F9; color: #1F2937;">
                    <p id="timer-minutes" class="text-3xl md:text-4xl font-bold" style="font-family: 'Rubik', sans-serif;">
                      ${getText('timer_minutes', '45')}
                    </p>
                    <p class="text-xs sm:text-sm">Minutes</p>
                  </div>
                  <div class="flex flex-col items-center justify-center p-3 rounded-lg" style="background-color: #67E8F9; color: #1F2937;">
                    <p id="timer-seconds" class="text-3xl md:text-4xl font-bold" style="font-family: 'Rubik', sans-serif;">
                      ${getText('timer_seconds', '33')}
                    </p>
                    <p class="text-xs sm:text-sm">Seconds</p>
                  </div>
                </div>
              </div>

              <!-- Key Features Card -->
              <div class="p-6 md:p-8 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
                <h3 class="text-xl font-bold mb-2" style="font-family: 'Rubik', sans-serif; color: #1F2937;">
                  ${getText('features_title', 'Key Features:')}
                </h3>
                <div class="grid grid-cols-2 gap-x-6 gap-y-4">
                  <div class="flex flex-col">
                    <p class="text-sm" style="color: #6B7280;">${getText('feature_1_label', 'Battery life')}</p>
                    <p class="text-base font-medium" style="color: #1F2937;">${getText('feature_1_value', '24 Hours')}</p>
                  </div>
                  <div class="flex flex-col">
                    <p class="text-sm" style="color: #6B7280;">${getText('feature_2_label', 'Warranty info')}</p>
                    <p class="text-base font-medium" style="color: #1F2937;">${getText('feature_2_value', '2-Year Full')}</p>
                  </div>
                  <div class="flex flex-col">
                    <p class="text-sm" style="color: #6B7280;">${getText('feature_3_label', 'Quality rating')}</p>
                    <p class="text-base font-medium" style="color: #1F2937;">${getText('feature_3_value', '★ 4.8/5')}</p>
                  </div>
                  <div class="flex flex-col">
                    <p class="text-sm" style="color: #6B7280;">${getText('feature_4_label', 'Material')}</p>
                    <p class="text-base font-medium" style="color: #1F2937;">${getText('feature_4_value', 'Aero-grade Aluminum')}</p>
                  </div>
                </div>
              </div>

              <!-- CTA Card -->
              <div class="p-6 md:p-8 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
                <a href="${ctaButton.url}" class="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 text-white text-base font-bold leading-normal tracking-wide hover:opacity-90 transition-opacity" style="background-color: #EF4444; text-decoration: none;">
                  <span class="truncate">${ctaButton.text}</span>
                </a>
                <p class="text-sm font-normal leading-normal text-center" style="color: #6B7280;">
                  ${getText('cta_subtext', 'Free Shipping · 30-Day Guarantee · Secure Checkout')}
                </p>
              </div>
            </div>

            <!-- Right Column - Product Image -->
            <div class="w-full lg:w-1/2 flex items-center justify-center bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8">
              <div class="relative w-full aspect-square max-w-lg">
                <img 
                  src="${getImage('product_image', 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2HSG1Ii_9pAfHTrf2_UxsSGgA1DkVK2hv5_q7I89y0ilfTucZNtouuhFPNQZv3YOmesnJGqlsd9KOea0w8vbIt16DhPiRNbnLKsNmLhtJsPfD3NRF02XFb4tBexXd67ckY66XWBkfiAUL7CCXHFt9VIKVxD-sfiC-zUTG-JIyk90lN3p_w4ozSYN33PW886KxCdza7lZ_kxiziAfkoqyhap0qL0lU8Rc1oxy8NlP66qwISd9aEPkMoqKly3OQEKJsHw0ggs6k1g')}"
                  alt="Product Image"
                  class="w-full h-full object-contain rounded-lg"
                />
                <div class="absolute -top-4 -right-4 text-white text-lg font-bold px-4 py-2 rounded-full transform rotate-12" style="background-color: #EF4444;">
                  ${getText('discount_badge', '-70%')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script>
    // Countdown Timer
    (function() {
      let days = parseInt(document.getElementById('timer-days').textContent) || 1;
      let hours = parseInt(document.getElementById('timer-hours').textContent) || 18;
      let minutes = parseInt(document.getElementById('timer-minutes').textContent) || 45;
      let seconds = parseInt(document.getElementById('timer-seconds').textContent) || 33;
      
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
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        document.getElementById('timer-days').textContent = days.toString().padStart(2, '0');
        document.getElementById('timer-hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('timer-minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('timer-seconds').textContent = seconds.toString().padStart(2, '0');
      }
      
      setInterval(updateTimer, 1000);
    })();
  </script>
</body>
</html>`;
};
