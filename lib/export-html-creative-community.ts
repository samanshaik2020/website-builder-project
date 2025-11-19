export function generateCreativeCommunityHTML(data: Record<string, any>): string {

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

  const navBrand = getText('nav_brand', 'IgniteCreatives');
  const navLoginLink = getText('nav_login_link', 'Curator Login');
  const navCta = getButton('nav_cta', 'Join the Spark', '#');
  
  const heroTitle = getText('hero_title', 'Unleash Your Passion, Connect with Fellow Creators.');
  const heroDescription = getText('hero_description', 'Dive into a vibrant community where artistic expression thrives. Share your unique creations, collaborate on inspiring projects, and turn your creative energy into rewarding experiences.');
  const heroCta1 = getButton('hero_cta_primary', 'Start Your Creative Journey', '#');
  const heroCta2 = getButton('hero_cta_secondary', 'Explore Collaborations', '#');
  
  const feature1Title = getText('feature1_title', 'Inspiring Spaces');
  const feature1Desc = getText('feature1_description', 'Discover a curated feed of diverse artistic projects and find your next inspiration.');
  const feature2Title = getText('feature2_title', 'Collaborate & Grow');
  const feature2Desc = getText('feature2_description', 'Connect with like-minded individuals, share feedback, and build amazing things together.');
  const feature3Title = getText('feature3_title', 'Passion-Driven Earnings');
  const feature3Desc = getText('feature3_description', 'Monetize your talents through creative commissions and community-supported projects.');
  const feature4Title = getText('feature4_title', 'Supportive Network');
  const feature4Desc = getText('feature4_description', 'Our team and fellow creators are here to champion your artistic journey.');
  
  const heroImage = getImage('hero_image', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop');
  const testimonialAvatar = getImage('testimonial_avatar', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop');
  const testimonialQuote = getText('testimonial_quote', '"This community is a game-changer! I\'ve found my tribe, pushed my artistic boundaries, and even earned from my passion. Truly inspiring!"');
  const testimonialAuthor = getText('testimonial_author', '- Anya Sharma, Digital Artist & Collaborator');
  const statsText = getText('stats_text', 'Join over 10,000+ vibrant creators igniting their potential!');

  return `<!DOCTYPE html>
<html class="light" lang="en">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>${navBrand} - Creative Community Hub</title>
  <meta name="description" content="${heroDescription.substring(0, 160)}"/>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap" rel="stylesheet"/>
  <style>
    :root {
      --primary-start: #ff8c42;
      --primary-end: #a16bfe;
      --secondary-start: #fecaca;
      --secondary-end: #a78bfa;
    }
    body {
      font-family: 'Comfortaa', sans-serif;
    }
    .bg-gradient-to-br-primary {
      background-image: linear-gradient(to bottom right, var(--primary-start), var(--primary-end));
    }
    .bg-gradient-to-br-secondary {
      background-image: linear-gradient(to bottom right, var(--secondary-start), var(--secondary-end));
    }
    .shadow-playful {
      box-shadow: 8px 8px 0px 0px rgba(0,0,0,0.1);
    }
    .dark .shadow-playful {
      box-shadow: 8px 8px 0px 0px rgba(255,255,255,0.1);
    }
    @keyframes blob {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
    }
    .animate-blob {
      animation: blob 7s infinite;
    }
  </style>
</head>
<body class="bg-[#fdf8f4] dark:bg-[#2d233c] text-[#333] dark:text-gray-100 antialiased">
  <div class="relative flex min-h-screen w-full flex-col overflow-hidden">
    <!-- Animated Background Blobs -->
    <div class="absolute inset-0 z-0 opacity-20 dark:opacity-10 pointer-events-none">
      <div class="h-64 w-64 rounded-full bg-gradient-to-br from-[#ff8c42] to-[#a16bfe] absolute top-10 left-10 filter blur-3xl mix-blend-multiply animate-blob"></div>
      <div class="h-64 w-64 rounded-full bg-gradient-to-br from-[#fecaca] to-[#a78bfa] absolute bottom-20 right-20 filter blur-3xl mix-blend-multiply animate-blob" style="animation-delay: 2s;"></div>
    </div>

    <div class="layout-container flex h-full grow flex-col">
      <div class="flex flex-1 w-full z-10">
        <div class="flex flex-col lg:flex-row w-full min-h-screen relative p-4 lg:p-12">
          <!-- Left Content Section -->
          <div class="w-full lg:w-[60%] flex flex-col justify-center p-6 md:p-12 lg:pr-20 relative bg-white dark:bg-[#2d233c] rounded-xl shadow-playful lg:mr-[-5rem] lg:mb-12 z-20">
            <div class="layout-content-container flex flex-col w-full max-w-2xl mx-auto flex-1 justify-center py-10 lg:py-0">
              <!-- Header -->
              <div class="flex items-center justify-between mb-8">
                <div class="flex items-center gap-2">
                  <span class="text-[#a16bfe] text-4xl">💡</span>
                  <span class="text-xl font-bold text-gray-800 dark:text-gray-100">${navBrand}</span>
                </div>
                <div class="flex items-center gap-4">
                  <a href="#" class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#a16bfe] transition-colors">${navLoginLink}</a>
                  <a href="${navCta.url}" class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gradient-to-br-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 shadow-lg transition-all duration-300 ease-out transform hover:scale-105">
                    <span class="truncate">${navCta.text}</span>
                  </a>
                </div>
              </div>

              <!-- Hero Section -->
              <div class="flex flex-col gap-6 text-left py-10">
                <h1 class="text-[#111418] dark:text-white text-4xl font-extrabold leading-tight tracking-[-0.033em] md:text-5xl lg:text-6xl">
                  ${heroTitle}
                </h1>
                <p class="text-gray-600 dark:text-gray-300 text-lg font-normal leading-relaxed md:text-xl">
                  ${heroDescription}
                </p>
                <div class="flex flex-wrap gap-4 mt-4">
                  <a href="${heroCta1.url}" class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-gradient-to-br-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90 shadow-lg transition-all duration-300 ease-out transform hover:scale-105">
                    <span class="truncate">${heroCta1.text}</span>
                  </a>
                  <a href="${heroCta2.url}" class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#fdf8f4] dark:bg-gray-800 text-[#111418] dark:text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-gray-200 dark:hover:bg-gray-700 shadow-md transition-all duration-300 ease-out">
                    <span class="truncate">${heroCta2.text}</span>
                  </a>
                </div>
              </div>

              <!-- Features Grid -->
              <div class="flex flex-col gap-8 py-10">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <!-- Feature 1 -->
                  <div class="flex gap-4">
                    <span class="text-[#a16bfe] text-3xl mt-1">🎨</span>
                    <div class="flex flex-col gap-1">
                      <h2 class="text-[#111418] dark:text-white text-lg font-bold leading-tight">${feature1Title}</h2>
                      <p class="text-gray-600 dark:text-gray-300 text-sm font-normal leading-normal">${feature1Desc}</p>
                    </div>
                  </div>

                  <!-- Feature 2 -->
                  <div class="flex gap-4">
                    <span class="text-[#a16bfe] text-3xl mt-1">💬</span>
                    <div class="flex flex-col gap-1">
                      <h2 class="text-[#111418] dark:text-white text-lg font-bold leading-tight">${feature2Title}</h2>
                      <p class="text-gray-600 dark:text-gray-300 text-sm font-normal leading-normal">${feature2Desc}</p>
                    </div>
                  </div>

                  <!-- Feature 3 -->
                  <div class="flex gap-4">
                    <span class="text-[#a16bfe] text-3xl mt-1">💰</span>
                    <div class="flex flex-col gap-1">
                      <h2 class="text-[#111418] dark:text-white text-lg font-bold leading-tight">${feature3Title}</h2>
                      <p class="text-gray-600 dark:text-gray-300 text-sm font-normal leading-normal">${feature3Desc}</p>
                    </div>
                  </div>

                  <!-- Feature 4 -->
                  <div class="flex gap-4">
                    <span class="text-[#a16bfe] text-3xl mt-1">🤝</span>
                    <div class="flex flex-col gap-1">
                      <h2 class="text-[#111418] dark:text-white text-lg font-bold leading-tight">${feature4Title}</h2>
                      <p class="text-gray-600 dark:text-gray-300 text-sm font-normal leading-normal">${feature4Desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Visual Section -->
          <div class="w-full lg:w-[45%] flex flex-col justify-center items-center p-6 md:p-12 lg:pl-10 relative mt-8 lg:mt-0 lg:ml-[-5rem] z-10">
            <div class="layout-content-container flex flex-col w-full max-w-2xl mx-auto flex-1 justify-center py-10 lg:py-0">
              <!-- Main Image -->
              <div class="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-12 shadow-playful transform rotate-[-3deg] lg:rotate-[-5deg] scale-105 z-20">
                <img alt="Diverse creators collaborating" class="absolute inset-0 w-full h-full object-cover rounded-xl" src="${heroImage}"/>
              </div>

              <!-- Testimonial Card -->
              <div class="relative flex flex-col gap-6 p-8 rounded-xl bg-gradient-to-br-secondary dark:from-gray-700 dark:to-gray-900 text-white dark:text-gray-100 shadow-playful transform rotate-[2deg] lg:rotate-[3deg] ml-auto mr-auto lg:mr-0 max-w-md w-[90%] lg:w-full z-30 lg:mt-[-5rem] xl:mt-[-8rem]">
                <div class="flex flex-col items-center text-center gap-4">
                  <img alt="Creator testimonial" class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" src="${testimonialAvatar}"/>
                  <p class="text-lg font-semibold leading-relaxed">${testimonialQuote}</p>
                  <p class="text-sm mt-1 font-medium">${testimonialAuthor}</p>
                </div>
              </div>

              <!-- Stats -->
              <div class="text-center mt-12 transform rotate-[-2deg] lg:rotate-[-1deg] text-gray-700 dark:text-gray-300">
                <p class="text-base font-normal leading-normal">${statsText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}
