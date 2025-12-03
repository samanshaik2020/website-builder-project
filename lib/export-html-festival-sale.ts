import { TemplateData } from '@/types/template';

export const generateFestivalSaleHTML = (data: TemplateData): string => {
  const getText = (id: string, defaultValue: string) => {
    return data[id]?.text || defaultValue;
  };

  const getButton = (id: string, defaultText: string) => {
    return data[id]?.button?.text || defaultText;
  };

  const getImage = (id: string, defaultValue: string) => {
    return data[id]?.image || defaultValue;
  };

  return `<!DOCTYPE html>
<html class="dark" lang="en">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>Festival Sale Product Poster</title>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link href="https://fonts.googleapis.com" rel="preconnect"/>
  <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet"/>
  <script>
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "primary": "#f43625",
            "background-light": "#f8f6f5",
            "background-dark": "#221110",
          },
          fontFamily: {
            "display": ["Plus Jakarta Sans", "Noto Sans", "sans-serif"]
          },
          borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
        },
      },
    }
  </script>
  <style>
    .glow-effect {
      box-shadow: 0 0 15px 5px rgba(244, 54, 37, 0.4), 0 0 30px 10px rgba(244, 54, 37, 0.3);
    }
  </style>
</head>
<body class="font-display">
  <div class="relative flex min-h-screen w-full flex-col items-center justify-center bg-background-dark group/design-root overflow-x-hidden p-4 sm:p-6 lg:p-8">
    <div class="layout-container flex h-full grow flex-col w-full">
      <div class="flex flex-1 justify-center py-5">
        <div class="layout-content-container flex flex-col w-full max-w-4xl">
          <!-- Top Banner -->
          <h3 class="text-white tracking-light text-xl sm:text-2xl font-bold leading-tight text-center pb-4 pt-5">${getText('top_banner_text', '🔥 MEGA SALE — UP TO 80% OFF')}</h3>
          
          <!-- Hero Section -->
          <div class="@container w-full">
            <div class="@[480px]:p-4">
              <div class="relative flex flex-col gap-6 items-center justify-center p-4">
                <!-- Product Image with Discount Badge -->
                <div class="relative mb-6">
                  <img alt="Product" class="w-full max-w-md sm:max-w-lg h-auto object-contain drop-shadow-2xl" src="${getImage('hero_image', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmWRkGTUrA5QaMfaJLdPOszUcPmGdl5OBL6_Hd593GYOVCC0dqBiRmmFLWZsxfHLYSU6IFKfFak8iY63HZ_pRW6MYOX0SwTBTbO8pis-91fawuoHjsB8O7qYGWjUghj5ZJWYzpF49pHYS44R051glsMr3hhcxdhpfKxOk7Nm-lVti7Qat7mrAJ0XD4dewhH-wdHfQUXLq3qgN3ToNeWDOFsCRQlTxGtQbHQCzjg0hcAyvClyK2HEWyiPUoeoiUhMokziuItauXASw')}"/>
                  <div class="absolute -top-8 -right-8 sm:-top-10 sm:-right-10 flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36 bg-yellow-400 rounded-full text-center transform -rotate-12">
                    <div class="flex flex-col">
                      <span class="text-4xl sm:text-5xl font-black text-red-600 leading-none">${getText('discount_percentage', '-80%')}</span>
                      <span class="text-xl sm:text-2xl font-bold text-red-600 uppercase">OFF</span>
                    </div>
                  </div>
                </div>
                
                <div class="flex flex-col gap-4 text-center">
                  <h1 class="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-6xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                    ${getText('hero_title', 'Unbelievable Discounts')}
                  </h1>
                  <h2 class="text-white/80 text-lg font-normal leading-normal @[480px]:text-xl @[480px]:font-normal @[480px]:leading-normal">
                    ${getText('hero_subtitle', "Grab It Before It's Gone!")}
                  </h2>
                </div>
                
                <!-- Product Info & Features -->
                <div class="flex flex-col items-center gap-4 mt-4 w-full max-w-lg">
                  <h3 class="text-white text-2xl font-bold">${getText('product_name', 'Aero-Boost Runners')}</h3>
                  <p class="text-white/70 italic">${getText('product_tagline', 'Experience the future of speed and comfort.')}</p>
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full text-center mt-4">
                    <div class="flex flex-col items-center gap-2 p-2 rounded bg-white/5">
                      <span class="text-yellow-400 text-3xl">🏆</span>
                      <p class="text-white text-sm">${getText('feature_1_text', 'Premium Build')}</p>
                    </div>
                    <div class="flex flex-col items-center gap-2 p-2 rounded bg-white/5">
                      <span class="text-yellow-400 text-3xl">🚀</span>
                      <p class="text-white text-sm">${getText('feature_2_text', 'Top Performance')}</p>
                    </div>
                    <div class="flex flex-col items-center gap-2 p-2 rounded bg-white/5">
                      <span class="text-yellow-400 text-3xl">✓</span>
                      <p class="text-white text-sm">${getText('feature_3_text', '2-Year Warranty')}</p>
                    </div>
                    <div class="flex flex-col items-center gap-2 p-2 rounded bg-white/5">
                      <span class="text-yellow-400 text-3xl">⭐</span>
                      <p class="text-white text-sm">${getText('feature_4_text', 'Bestseller')}</p>
                    </div>
                  </div>
                </div>
                
                <!-- CTA Button -->
                <button class="flex min-w-[84px] w-full max-w-sm cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-5 mt-8 bg-primary text-white text-lg font-bold leading-normal tracking-[0.015em] glow-effect transition-transform duration-300 hover:scale-105">
                  <span class="truncate">${getButton('cta_button', 'Shop Now')}</span>
                </button>
                
                <!-- Meta Text -->
                <p class="text-[#ba9e9c] text-sm font-normal leading-normal text-center mt-2">${getText('meta_text', 'Fast Delivery · Easy Returns · Secure Payments')}</p>
              </div>
            </div>
          </div>
          
          <!-- Urgency Sub-banner and Timer -->
          <div class="mt-8 border-t border-white/10 pt-8 w-full">
            <p class="text-white text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">${getText('urgency_text', 'Limited stock • Today only • Prices will increase soon')}</p>
            
            <!-- Timer -->
            <div class="flex gap-2 sm:gap-4 py-6 px-4 max-w-sm mx-auto">
              <div class="flex grow basis-0 flex-col items-stretch gap-2 sm:gap-4">
                <div class="flex h-16 sm:h-20 grow items-center justify-center rounded bg-white/10">
                  <p class="text-white text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.015em]" id="timer-hours">${getText('timer_hours', '23')}</p>
                </div>
                <div class="flex items-center justify-center"><p class="text-white/80 text-xs sm:text-sm font-normal leading-normal">Hours</p></div>
              </div>
              <div class="flex grow basis-0 flex-col items-stretch gap-2 sm:gap-4">
                <div class="flex h-16 sm:h-20 grow items-center justify-center rounded bg-white/10">
                  <p class="text-white text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.015em]" id="timer-minutes">${getText('timer_minutes', '59')}</p>
                </div>
                <div class="flex items-center justify-center"><p class="text-white/80 text-xs sm:text-sm font-normal leading-normal">Minutes</p></div>
              </div>
              <div class="flex grow basis-0 flex-col items-stretch gap-2 sm:gap-4">
                <div class="flex h-16 sm:h-20 grow items-center justify-center rounded bg-white/10">
                  <p class="text-white text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.015em]" id="timer-seconds">${getText('timer_seconds', '45')}</p>
                </div>
                <div class="flex items-center justify-center"><p class="text-white/80 text-xs sm:text-sm font-normal leading-normal">Seconds</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <script>
    // Countdown Timer
    let hours = parseInt(document.getElementById('timer-hours').textContent) || 23;
    let minutes = parseInt(document.getElementById('timer-minutes').textContent) || 59;
    let seconds = parseInt(document.getElementById('timer-seconds').textContent) || 45;
    
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
      document.getElementById('timer-minutes').textContent = minutes.toString().padStart(2, '0');
      document.getElementById('timer-seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    setInterval(updateTimer, 1000);
  </script>
</body>
</html>`;
};
