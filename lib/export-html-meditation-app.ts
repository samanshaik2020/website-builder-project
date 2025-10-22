export function generateMeditationAppHTML(data: Record<string, any>): string {
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
  <title>${getText('hero_brand', 'Calm')} - Meditation & Sleep App</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; }
    @keyframes twinkle {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 1; }
    }
  </style>
</head>
<body class="min-h-screen bg-white">
  <!-- Hero Section -->
  <section class="relative bg-gradient-to-b from-indigo-900 via-indigo-800 to-blue-600 text-white py-20 overflow-hidden">
    <!-- Stars background -->
    <div class="absolute inset-0 opacity-30">
      ${[...Array(50)].map(() => `
        <div class="absolute w-1 h-1 bg-white rounded-full" style="top: ${Math.random() * 100}%; left: ${Math.random() * 100}%; animation: twinkle ${2 + Math.random() * 3}s infinite;"></div>
      `).join('')}
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="flex items-center justify-between">
        <div class="w-1/2">
          <div class="text-3xl font-light mb-8">${getText('hero_brand', 'Calm')}</div>
          <h1 class="text-5xl font-light mb-6 leading-tight">${getText('hero_title', 'Meet Calm, the #1 app for sleep and meditation')}</h1>
          <p class="text-lg mb-8 opacity-90 max-w-md">${getText('hero_description', 'Join millions around the globe who are experiencing better sleep, lower stress and less anxiety.')}</p>
          <a href="${getButton('hero_cta', 'GET STARTED', '#').url}" class="inline-block bg-white text-indigo-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            ${getButton('hero_cta', 'GET STARTED', '#').text}
          </a>
        </div>
        <div class="w-1/2 flex justify-end">
          <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=700&fit=crop" alt="App Preview" class="w-64 h-auto rounded-3xl shadow-2xl">
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="py-20 bg-white">
    <div class="container mx-auto px-6">
      <div class="flex items-start gap-16">
        <div class="w-1/3">
          <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=600&fit=crop" alt="App Features" class="w-full rounded-3xl shadow-xl">
        </div>
        <div class="w-2/3">
          <h2 class="text-4xl font-light mb-12 text-gray-800">${getText('features_title', 'What do you get?')}</h2>

          <div class="space-y-8">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span class="text-2xl">😴</span>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2 text-gray-800">${getText('feature1_title', 'Sleep Stories')}</h3>
                <p class="text-gray-600">${getText('feature1_description', 'Drift off with a library of Sleep Stories designed to lull you into a deep and restful slumber.')}</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <span class="text-2xl">🧘</span>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2 text-gray-800">${getText('feature2_title', 'Guided Meditations')}</h3>
                <p class="text-gray-600">${getText('feature2_description', 'Find peace with guided meditations for stress, anxiety, and relaxation.')}</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                <span class="text-2xl">🎵</span>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2 text-gray-800">${getText('feature3_title', 'Calm Music')}</h3>
                <p class="text-gray-600">${getText('feature3_description', 'Exclusive music for sleep, relaxation, or doing, plus lullabies & Nature Sounds.')}</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <span class="text-2xl">💪</span>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2 text-gray-800">${getText('feature4_title', 'Mindfulness')}</h3>
                <p class="text-gray-600">${getText('feature4_description', 'Build your practice, including programs, tips, and techniques to help build a life.')}</p>
              </div>
            </div>
          </div>

          <div class="mt-12">
            <a href="${getButton('features_cta', 'TRY CALM FOR FREE', '#').url}" class="inline-block text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-colors" style="background-color: #8BC34A;">
              ${getButton('features_cta', 'TRY CALM FOR FREE', '#').text}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Sleep Stories Showcase -->
  <section class="py-20 bg-gradient-to-b from-white to-gray-50">
    <div class="container mx-auto px-6">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-light mb-4 text-gray-800">${getText('stories_title', 'Drift off with Sleep Stories')}</h2>
        <p class="text-xl text-gray-600">${getText('stories_subtitle', 'narrated by iconic voices')}</p>
      </div>

      <div class="flex items-center justify-center gap-12">
        <button class="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center hover:bg-purple-600 transition-colors">←</button>

        <div class="max-w-2xl">
          <div class="flex items-start gap-8">
            <img src="${getImage('story_image', 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=300&h=400&fit=crop')}" alt="Sleep Story" class="w-48 h-64 object-cover rounded-2xl shadow-xl">
            <div class="flex-1">
              <div class="text-sm text-purple-600 font-semibold mb-4">${getText('story_category', 'SLEEP STORY')}</div>
              <h3 class="text-3xl font-light mb-4 text-gray-800">${getText('story_author', 'Serene Me Sleepy Train')}</h3>
              <p class="text-gray-600 mb-6 leading-relaxed">${getText('story_description', 'Join bestselling author and beloved comedian David Walliams for a sleepy adventure through the mountains of Switzerland.')}</p>
              <div class="flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop" alt="Narrator" class="w-12 h-12 rounded-full">
                <div class="text-gray-700 font-medium">${getText('story_narrator', 'David Walliams')}</div>
              </div>
            </div>
          </div>
        </div>

        <button class="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center hover:bg-purple-600 transition-colors">→</button>
      </div>

      <div class="flex justify-center gap-2 mt-12">
        <div class="w-2 h-2 rounded-full bg-gray-400"></div>
        <div class="w-2 h-2 rounded-full bg-purple-500"></div>
        <div class="w-2 h-2 rounded-full bg-gray-400"></div>
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="py-20 bg-white">
    <div class="container mx-auto px-6">
      <h2 class="text-4xl font-light text-center mb-16 text-gray-800">${getText('testimonials_title', 'What others say')}</h2>

      <div class="grid grid-cols-3 gap-12">
        <div class="text-center">
          <div class="text-2xl font-bold mb-6 text-gray-800">${getText('testimonial1_logo', 'WIRED')}</div>
          <p class="text-gray-600 leading-relaxed">${getText('testimonial1_text', '"Calm has app-based meditation for every mood, from anxiety to work stress to sleep. It\'s like having a personal meditation coach in your pocket."')}</p>
        </div>

        <div class="text-center">
          <div class="text-2xl font-bold mb-6 text-gray-800">${getText('testimonial2_logo', 'Los Angeles Times')}</div>
          <p class="text-gray-600 leading-relaxed">${getText('testimonial2_text', '"Today, the magic of the Calm App is that it not only can help you fall asleep, but it also can help you feel more relaxed and less anxious during the day."')}</p>
        </div>

        <div class="text-center">
          <div class="text-2xl font-bold mb-6 text-gray-800">${getText('testimonial3_logo', 'REFINERY29')}</div>
          <p class="text-gray-600 leading-relaxed">${getText('testimonial3_text', '"The only sounds Calm app is as if you\'re lounging in the Bahamas (if there is such a place) and you get guided meditations, along with music and other programs."')}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Final CTA Section -->
  <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
    <div class="container mx-auto px-6 text-center">
      <a href="${getButton('cta_button', 'GET STARTED', '#').url}" class="inline-block text-white px-12 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-colors" style="background-color: #8BC34A;">
        ${getButton('cta_button', 'GET STARTED', '#').text}
      </a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-800 text-white py-12">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-4 gap-8">
        <div>
          <h3 class="font-semibold mb-4">${getText('footer_col1_title', 'Company')}</h3>
          <div class="space-y-2">
            <div class="text-gray-400 hover:text-white cursor-pointer">${getText('footer_col1_link1', 'About')}</div>
            <div class="text-gray-400 hover:text-white cursor-pointer">${getText('footer_col1_link2', 'Careers')}</div>
            <div class="text-gray-400 hover:text-white cursor-pointer">${getText('footer_col1_link3', 'Press')}</div>
            <div class="text-gray-400 hover:text-white cursor-pointer">${getText('footer_col1_link4', 'Meditation 101')}</div>
          </div>
        </div>

        <div>
          <h3 class="font-semibold mb-4">${getText('footer_col2_title', 'Get the App')}</h3>
          <div class="space-y-2">
            <div class="text-gray-400 hover:text-white cursor-pointer">${getText('footer_col2_link1', 'iOS App')}</div>
            <div class="text-gray-400 hover:text-white cursor-pointer">${getText('footer_col2_link2', 'Android App')}</div>
            <div class="text-gray-400 hover:text-white cursor-pointer">${getText('footer_col2_link3', 'Kindle Fire')}</div>
            <div class="text-gray-400 hover:text-white cursor-pointer">${getText('footer_col2_link4', 'Learn More')}</div>
          </div>
        </div>

        <div>
          <h3 class="font-semibold mb-4">${getText('footer_col3_title', 'Help')}</h3>
          <div class="space-y-2">
            <div class="text-gray-400 hover:text-white cursor-pointer">${getText('footer_col3_link1', 'FAQ')}</div>
            <div class="text-gray-400 hover:text-white cursor-pointer">${getText('footer_col3_link2', 'Contact Us')}</div>
            <div class="text-gray-400 hover:text-white cursor-pointer">${getText('footer_col3_link3', 'Terms')}</div>
          </div>
        </div>

        <div>
          <div class="flex gap-4">
            <a href="#" class="text-gray-400 hover:text-white">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-white">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-gray-700 text-center">
        <p class="text-gray-400 text-sm">${getText('footer_copyright', '© Calm.com Inc. All rights reserved.')}</p>
      </div>
    </div>
  </footer>
</body>
</html>`;
}
