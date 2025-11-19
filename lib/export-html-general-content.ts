export function generateGeneralContentHTML(data: Record<string, any>): string {
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

  const headline = getText('headline', 'A short, impactful headline summarizing the core message');
  const paragraph1 = getText('paragraph1', 'Two to three short paragraphs explaining the concept, benefit, or story in more detail. This content should be clear, concise, and easy to read, engaging the user and providing valuable context to the accompanying visual.');
  const paragraph2 = getText('paragraph2', 'Elaborate further on the key points, focusing on user benefits or the unique value proposition. Keep sentences direct and paragraphs focused to maintain reader engagement.');
  const ctaButton = getButton('cta_button', 'Get Started', '#');
  const heroImage = getImage('hero_image', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&h=800&fit=crop');

  return `<!DOCTYPE html>
<html class="light" lang="en">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>General Content Page</title>
  <meta name="description" content="${headline.substring(0, 160)}"/>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link href="https://fonts.googleapis.com" rel="preconnect"/>
  <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet"/>
  <script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "primary": "#197fe6",
            "background-light": "#f6f7f8",
            "background-dark": "#111921",
            "text-light": "#111418",
            "text-dark": "#f6f7f8",
          },
          fontFamily: {
            "display": ["Inter", "sans-serif"]
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
    body {
      font-family: 'Inter', sans-serif;
    }
  </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-display">
  <main class="relative flex min-h-screen w-full flex-col overflow-hidden group/design-root">
    <div class="flex flex-1 flex-col lg:flex-row">
      <!-- Image Column -->
      <div class="w-full lg:w-2/5 xl:w-1/2">
        <div class="h-64 lg:h-screen w-full bg-center bg-no-repeat bg-cover" style="background-image: url('${heroImage}');"></div>
      </div>
      
      <!-- Content Column -->
      <div class="w-full lg:w-3/5 xl:w-1/2 flex items-center justify-center">
        <div class="flex flex-col gap-6 p-8 sm:p-12 md:p-16 lg:p-20 max-w-2xl w-full">
          <div class="flex flex-col gap-4 text-left">
            <h1 class="text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl">
              ${headline}
            </h1>
            <p class="text-base font-normal leading-relaxed text-text-light/80 dark:text-text-dark/80 sm:text-lg">
              ${paragraph1}
            </p>
            <p class="text-base font-normal leading-relaxed text-text-light/80 dark:text-text-dark/80 sm:text-lg">
              ${paragraph2}
            </p>
          </div>
          <a href="${ctaButton.url}" class="flex min-w-[84px] max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/30 transition-colors">
            <span class="truncate">${ctaButton.text}</span>
          </a>
        </div>
      </div>
    </div>
  </main>
</body>
</html>`;
}
