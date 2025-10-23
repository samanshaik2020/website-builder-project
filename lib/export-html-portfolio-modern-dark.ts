export const generatePortfolioModernDarkHTML = (data: Record<string, any>): string => {
  const getText = (id: string, defaultValue: string) => {
    return data[id]?.text || defaultValue;
  };

  const getImage = (id: string, defaultValue: string) => {
    return data[id]?.image || defaultValue;
  };

  const getButton = (id: string, defaultText: string, defaultUrl: string) => {
    return {
      text: data[id]?.button?.text || defaultText,
      url: data[id]?.button?.url || defaultUrl,
    };
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${getText('hero_name', 'John Doe')} - Portfolio</title>
  <meta name="description" content="Website created with Squpage">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    html {
      scroll-behavior: smooth;
    }
  </style>
</head>
<body class="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
  <!-- Fixed Navigation -->
  <nav class="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          ${getText('nav_logo', 'JD')}
        </div>
        <div class="hidden md:flex gap-8">
          <a href="#home" class="text-sm font-medium transition-colors hover:text-cyan-400 text-slate-300">Home</a>
          <a href="#about" class="text-sm font-medium transition-colors hover:text-cyan-400 text-slate-300">About</a>
          <a href="#projects" class="text-sm font-medium transition-colors hover:text-cyan-400 text-slate-300">Projects</a>
          <a href="#skills" class="text-sm font-medium transition-colors hover:text-cyan-400 text-slate-300">Skills</a>
          <a href="#contact" class="text-sm font-medium transition-colors hover:text-cyan-400 text-slate-300">Contact</a>
        </div>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section id="home" class="min-h-screen flex items-center justify-center pt-20 px-6">
    <div class="container mx-auto">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="space-y-6">
          <div class="text-cyan-400 text-lg font-medium">
            ${getText('hero_greeting', 'Hi, my name is')}
          </div>
          <h1 class="text-6xl md:text-7xl font-bold">
            ${getText('hero_name', 'John Doe')}
          </h1>
          <h2 class="text-4xl md:text-5xl font-bold text-slate-400">
            ${getText('hero_title', 'Full Stack Developer')}
          </h2>
          <p class="text-lg text-slate-400 max-w-xl">
            ${getText('hero_description', 'I build exceptional digital experiences that live on the web. Specialized in creating responsive, user-friendly applications with modern technologies.')}
          </p>
          <div class="flex gap-4">
            <a href="${getButton('hero_cta_primary', 'View My Work', '#projects').url}" class="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
              ${getButton('hero_cta_primary', 'View My Work', '#projects').text}
            </a>
            <a href="${getButton('hero_cta_secondary', 'Contact Me', '#contact').url}" class="px-8 py-4 border-2 border-cyan-500 rounded-lg font-semibold hover:bg-cyan-500/10 transition-all">
              ${getButton('hero_cta_secondary', 'Contact Me', '#contact').text}
            </a>
          </div>
        </div>
        <div class="relative">
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl opacity-20"></div>
          <img src="${getImage('hero_image', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop')}" alt="Profile" class="relative rounded-2xl w-full h-auto shadow-2xl">
        </div>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section id="about" class="py-24 px-6">
    <div class="container mx-auto max-w-6xl">
      <h2 class="text-4xl md:text-5xl font-bold mb-12 text-center">
        ${getText('about_title', 'About Me')}
      </h2>
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="space-y-6">
          <p class="text-slate-300 text-lg leading-relaxed">
            ${getText('about_description', 'Hello! I\'m John, a passionate full-stack developer based in San Francisco. I enjoy creating things that live on the internet, whether that be websites, applications, or anything in between. My focus is on building accessible, inclusive products and digital experiences for a variety of clients.')}
          </p>
        </div>
        <div class="relative">
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-2xl opacity-20"></div>
          <img src="${getImage('about_image', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop')}" alt="About" class="relative rounded-2xl w-full h-auto shadow-2xl">
        </div>
      </div>
    </div>
  </section>

  <!-- Projects Section -->
  <section id="projects" class="py-24 px-6 bg-slate-900/50">
    <div class="container mx-auto max-w-6xl">
      <h2 class="text-4xl md:text-5xl font-bold mb-12 text-center">
        ${getText('projects_title', 'Featured Projects')}
      </h2>
      <div class="grid md:grid-cols-2 gap-8">
        ${[1, 2, 3, 4].map(num => `
        <div class="group relative bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-500 transition-all">
          <img src="${getImage(`project${num}_image`, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop')}" alt="Project ${num}" class="w-full h-64 object-cover">
          <div class="p-6 space-y-4">
            <h3 class="text-2xl font-bold">
              ${getText(`project${num}_title`, `Project ${num}`)}
            </h3>
            <p class="text-slate-400">
              ${getText(`project${num}_description`, 'A full-stack project with modern technologies.')}
            </p>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Skills Section -->
  <section id="skills" class="py-24 px-6">
    <div class="container mx-auto max-w-6xl">
      <h2 class="text-4xl md:text-5xl font-bold mb-12 text-center">
        ${getText('skills_title', 'Skills & Technologies')}
      </h2>
      <div class="grid md:grid-cols-3 gap-8">
        ${[1, 2, 3].map(num => `
        <div class="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
          <h3 class="text-2xl font-bold mb-4">
            ${getText(`skill${num}_title`, `Skill ${num}`)}
          </h3>
          <p class="text-slate-400">
            ${getText(`skill${num}_description`, 'Technologies and tools')}
          </p>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="py-24 px-6 bg-slate-900/50">
    <div class="container mx-auto max-w-2xl text-center">
      <h2 class="text-4xl md:text-5xl font-bold mb-6">
        ${getText('contact_title', 'Get In Touch')}
      </h2>
      <p class="text-slate-400 text-lg mb-8">
        ${getText('contact_description', 'I\'m currently looking for new opportunities. Whether you have a question or just want to say hi, I\'ll try my best to get back to you!')}
      </p>
      <a href="${getButton('contact_cta', 'Say Hello', 'mailto:hello@example.com').url}" class="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
        ${getButton('contact_cta', 'Say Hello', 'mailto:hello@example.com').text}
      </a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-12 px-6 border-t border-slate-800">
    <div class="container mx-auto text-center">
      <p class="text-slate-400">
        ${getText('footer_text', '© 2025 John Doe. All rights reserved.')}
      </p>
    </div>
  </footer>
</body>
</html>`;
};
