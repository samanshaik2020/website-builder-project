import { type TemplateId } from './templates';
import { TemplateData } from '@/types/template';
import { generateLoanLandingHTML } from './export-html-loan-landing';
import { generateSamsungProductHTML } from './export-html-samsung-product';
import { generateFurnitureStoreHTML } from './export-html-furniture-store';
import { generateMeditationAppHTML } from './export-html-meditation-app';
import { generatePortfolioModernDarkHTML } from './export-html-portfolio-modern-dark';
import { generateSaasVibrantGradientHTML } from './export-html-saas-vibrant-gradient';
import { generatePhoneFunHTML } from './export-html-phone-fun';
import { generateCreativeCommunityHTML } from './export-html-creative-community';
import { generateGeneralContentHTML } from './export-html-general-content';
import { generateSqupagePromoHTML } from './export-html-squpage-promo';
import { generateLegalCenterHTML } from './export-html-legal-center';
import { generateFlashSaleHTML } from './export-html-flash-sale';
import { generateMegaDiscountHTML } from './export-html-mega-discount';
import { generateFestivalSaleHTML } from './export-html-festival-sale';
import { generateMobileShopHTML } from './export-html-mobile-shop';
import { generateGadgetDealsHTML } from './export-html-gadget-deals';
import { generateGalaxyPhoneHTML } from './export-html-galaxy-phone';
import { generateGlassmorphismProductHTML } from './export-html-glassmorphism-product';
import { generatePhotofolioHTML } from './export-html-photofolio';
import { generateQuizNewHTML } from './export-html-quiz-new';

interface ExportData {
  template: TemplateId;
  data: TemplateData;
  projectName: string;
}

const getTailwindCDN = () => `<script src="https://cdn.tailwindcss.com"></script>`;

const getSmoothScrollScript = () => `
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
    
    // Handle external links (open in new tab)
    document.querySelectorAll('a[href^="http"]').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        window.open(this.getAttribute('href'), '_blank', 'noopener,noreferrer');
      });
    });
  });
</script>
`;

const getMetaTags = (projectName: string) => `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <meta name="description" content="Website created with Squpage">
`;

const escapeHtml = (text: string) => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

// Helper to generate image HTML with optional link wrapper
export const generateImageWithLink = (
  src: string,
  alt: string,
  className: string,
  linkUrl?: string
): string => {
  const imgTag = `<img src="${src}" alt="${alt}" class="${className}">`;
  if (linkUrl) {
    return `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${imgTag}</a>`;
  }
  return imgTag;
};

// Helper to get image data (src and linkUrl) from template data
export const getImageData = (data: TemplateData, key: string, defaultSrc: string): { src: string; linkUrl: string | undefined } => {
  const imageData = data[key];
  if (imageData?.image) {
    return { src: imageData.image, linkUrl: imageData.linkUrl };
  }
  return { src: defaultSrc, linkUrl: undefined };
};

export const generatePortfolioHTML = (data: TemplateData, projectName: string): string => {
  const getText = (id: string, defaultValue: string) => {
    return escapeHtml(data[id]?.text || defaultValue);
  };

  const getButtonText = (id: string, defaultText: string) => {
    return escapeHtml(data[id]?.button?.text || defaultText);
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  ${getMetaTags(projectName)}
  ${getTailwindCDN()}
</head>
<body>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-6">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-6xl md:text-8xl font-bold mb-4">${getText('hero_name', 'John Doe')}</h1>
        <p class="text-2xl md:text-3xl text-purple-300 mb-6">${getText('hero_title', 'Full Stack Developer & Designer')}</p>
        <p class="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">${getText('hero_description', 'I create beautiful, functional websites and applications that help businesses grow.')}</p>
        <button class="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-lg font-semibold transition-colors">${getButtonText('hero_cta', 'View My Work')}</button>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-24 px-6 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-5xl md:text-6xl font-bold text-slate-900 mb-4">${getText('about_heading', 'About Me')}</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto"></div>
        </div>
        <div class="mb-16">
          <h3 class="text-3xl font-bold text-slate-900 mb-6">${getText('about_story_title', 'My Professional Story')}</h3>
          <p class="text-lg text-slate-600 leading-relaxed mb-4">${getText('about_story_p1', 'With over 5 years of experience in web development, I\'ve had the privilege of working with startups and established companies to bring their digital visions to life.')}</p>
          <p class="text-lg text-slate-600 leading-relaxed mb-4">${getText('about_story_p2', 'My journey began with a fascination for how things work on the web. Today, I specialize in creating modern, responsive websites and applications that not only look great but deliver exceptional user experiences.')}</p>
          <p class="text-lg text-slate-600 leading-relaxed">${getText('about_story_p3', 'I believe in writing clean, maintainable code and staying current with the latest technologies. When I\'m not coding, you\'ll find me contributing to open-source projects or mentoring aspiring developers.')}</p>
        </div>
        <div>
          <h3 class="text-3xl font-bold text-slate-900 mb-10 text-center">${getText('skills_section_title', 'Core Skills & Expertise')}</h3>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="p-8 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-2xl">
              <div class="text-4xl mb-4">⚡</div>
              <h4 class="text-xl font-bold text-slate-900 mb-3">${getText('skill_1_title', 'Frontend Development')}</h4>
              <p class="text-slate-600">${getText('skill_1_description', 'React, Next.js, TypeScript, Tailwind CSS, Vue.js')}</p>
            </div>
            <div class="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl">
              <div class="text-4xl mb-4">🚀</div>
              <h4 class="text-xl font-bold text-slate-900 mb-3">${getText('skill_2_title', 'Backend Development')}</h4>
              <p class="text-slate-600">${getText('skill_2_description', 'Node.js, Python, PostgreSQL, MongoDB, REST APIs')}</p>
            </div>
            <div class="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl">
              <div class="text-4xl mb-4">🎨</div>
              <h4 class="text-xl font-bold text-slate-900 mb-3">${getText('skill_3_title', 'UI/UX Design')}</h4>
              <p class="text-slate-600">${getText('skill_3_description', 'Figma, Adobe XD, Responsive Design, User Research')}</p>
            </div>
            <div class="p-8 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 rounded-2xl">
              <div class="text-4xl mb-4">☁️</div>
              <h4 class="text-xl font-bold text-slate-900 mb-3">${getText('skill_4_title', 'Cloud & DevOps')}</h4>
              <p class="text-slate-600">${getText('skill_4_description', 'AWS, Docker, CI/CD, Git, Vercel, Netlify')}</p>
            </div>
            <div class="p-8 bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-100 rounded-2xl">
              <div class="text-4xl mb-4">📱</div>
              <h4 class="text-xl font-bold text-slate-900 mb-3">${getText('skill_5_title', 'Mobile Development')}</h4>
              <p class="text-slate-600">${getText('skill_5_description', 'React Native, Flutter, Progressive Web Apps')}</p>
            </div>
            <div class="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl">
              <div class="text-4xl mb-4">🔧</div>
              <h4 class="text-xl font-bold text-slate-900 mb-3">${getText('skill_6_title', 'Testing & Quality')}</h4>
              <p class="text-slate-600">${getText('skill_6_description', 'Jest, Cypress, Testing Library, Code Reviews')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="py-24 px-6 bg-slate-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-5xl md:text-6xl font-bold text-slate-900 mb-4">${getText('projects_section_title', 'Featured Projects')}</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-6"></div>
          <p class="text-xl text-slate-600 max-w-3xl mx-auto">${getText('projects_section_subtitle', 'Curated case studies of my best work that demonstrate my skills and the results I achieved')}</p>
        </div>
        <div class="space-y-16">
          <!-- Project 1 -->
          <div class="bg-white rounded-3xl overflow-hidden shadow-xl">
            <div class="grid md:grid-cols-2 gap-0">
              <div class="h-full min-h-[400px] bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span class="text-white text-6xl">🎨</span>
              </div>
              <div class="p-12">
                <div class="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">${getText('project_1_category', 'Web Application')}</div>
                <h3 class="text-4xl font-bold text-slate-900 mb-4">${getText('project_1_title', 'E-commerce Platform')}</h3>
                <p class="text-lg text-slate-600 mb-6">${getText('project_1_description', 'A modern e-commerce solution with seamless checkout experience, real-time inventory management, and personalized product recommendations.')}</p>
                <div class="space-y-3 mb-6">
                  <div class="flex items-center gap-2"><span class="text-purple-600">✓</span><span class="text-slate-600">${getText('project_1_result_1', '40% increase in conversion rate')}</span></div>
                  <div class="flex items-center gap-2"><span class="text-purple-600">✓</span><span class="text-slate-600">${getText('project_1_result_2', '10,000+ active users')}</span></div>
                  <div class="flex items-center gap-2"><span class="text-purple-600">✓</span><span class="text-slate-600">${getText('project_1_result_3', 'Featured in TechCrunch')}</span></div>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">${getText('project_1_tech_1', 'React')}</span>
                  <span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">${getText('project_1_tech_2', 'Node.js')}</span>
                  <span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">${getText('project_1_tech_3', 'PostgreSQL')}</span>
                  <span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">${getText('project_1_tech_4', 'Stripe')}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Project 2 -->
          <div class="bg-white rounded-3xl overflow-hidden shadow-xl">
            <div class="grid md:grid-cols-2 gap-0">
              <div class="p-12 order-2 md:order-1">
                <div class="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">${getText('project_2_category', 'Mobile App')}</div>
                <h3 class="text-4xl font-bold text-slate-900 mb-4">${getText('project_2_title', 'Fitness Tracking App')}</h3>
                <p class="text-lg text-slate-600 mb-6">${getText('project_2_description', 'Intuitive mobile app design for a fitness tracking platform with AI-powered workout recommendations and social features.')}</p>
                <div class="space-y-3 mb-6">
                  <div class="flex items-center gap-2"><span class="text-blue-600">✓</span><span class="text-slate-600">${getText('project_2_result_1', '50,000+ downloads in first month')}</span></div>
                  <div class="flex items-center gap-2"><span class="text-blue-600">✓</span><span class="text-slate-600">${getText('project_2_result_2', '4.8 star rating on App Store')}</span></div>
                  <div class="flex items-center gap-2"><span class="text-blue-600">✓</span><span class="text-slate-600">${getText('project_2_result_3', 'Winner of Best Health App 2023')}</span></div>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">${getText('project_2_tech_1', 'React Native')}</span>
                  <span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">${getText('project_2_tech_2', 'Firebase')}</span>
                  <span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">${getText('project_2_tech_3', 'TensorFlow')}</span>
                  <span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">${getText('project_2_tech_4', 'Redux')}</span>
                </div>
              </div>
              <div class="h-full min-h-[400px] bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center order-1 md:order-2">
                <span class="text-white text-6xl">📱</span>
              </div>
            </div>
          </div>
          <!-- Project 3 -->
          <div class="bg-white rounded-3xl overflow-hidden shadow-xl">
            <div class="grid md:grid-cols-2 gap-0">
              <div class="h-full min-h-[400px] bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <span class="text-white text-6xl">🚀</span>
              </div>
              <div class="p-12">
                <div class="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">${getText('project_3_category', 'SaaS Platform')}</div>
                <h3 class="text-4xl font-bold text-slate-900 mb-4">${getText('project_3_title', 'Analytics Dashboard')}</h3>
                <p class="text-lg text-slate-600 mb-6">${getText('project_3_description', 'Comprehensive analytics dashboard for a B2B SaaS platform with real-time data visualization and custom reporting.')}</p>
                <div class="space-y-3 mb-6">
                  <div class="flex items-center gap-2"><span class="text-green-600">✓</span><span class="text-slate-600">${getText('project_3_result_1', '200+ enterprise clients')}</span></div>
                  <div class="flex items-center gap-2"><span class="text-green-600">✓</span><span class="text-slate-600">${getText('project_3_result_2', '99.9% uptime SLA')}</span></div>
                  <div class="flex items-center gap-2"><span class="text-green-600">✓</span><span class="text-slate-600">${getText('project_3_result_3', '$2M ARR in year one')}</span></div>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">${getText('project_3_tech_1', 'Next.js')}</span>
                  <span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">${getText('project_3_tech_2', 'D3.js')}</span>
                  <span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">${getText('project_3_tech_3', 'AWS')}</span>
                  <span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">${getText('project_3_tech_4', 'MongoDB')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Resume Section -->
    <section class="py-24 px-6 bg-gradient-to-br from-purple-900 via-slate-900 to-slate-900 text-white">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-5xl md:text-6xl font-bold mb-6">${getText('resume_section_title', 'Resume')}</h2>
        <div class="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-8"></div>
        <p class="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">${getText('resume_description', 'Download my complete resume to learn more about my experience, education, and professional achievements.')}</p>
        <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-12 mb-8">
          <div class="flex flex-col md:flex-row items-center justify-between gap-8">
            <div class="flex items-center gap-6">
              <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-4xl">📄</div>
              <div class="text-left">
                <h3 class="text-2xl font-bold mb-2">${getText('resume_file_name', 'John_Doe_Resume.pdf')}</h3>
                <p class="text-slate-300">${getText('resume_file_size', '2.4 MB')} • ${getText('resume_file_updated', 'Updated Jan 2024')}</p>
              </div>
            </div>
            <button class="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-lg font-semibold transition-all">${getButtonText('resume_download_button', 'Download Resume')}</button>
          </div>
        </div>
        <div class="grid md:grid-cols-3 gap-6 text-left">
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div class="text-3xl mb-3">🎓</div>
            <h4 class="text-lg font-semibold mb-2">${getText('resume_education_title', 'Education')}</h4>
            <p class="text-slate-300 text-sm">${getText('resume_education', 'BS in Computer Science\\nStanford University')}</p>
          </div>
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div class="text-3xl mb-3">💼</div>
            <h4 class="text-lg font-semibold mb-2">${getText('resume_experience_title', 'Experience')}</h4>
            <p class="text-slate-300 text-sm">${getText('resume_experience', '5+ Years\\nSenior Developer')}</p>
          </div>
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div class="text-3xl mb-3">🏆</div>
            <h4 class="text-lg font-semibold mb-2">${getText('resume_certifications_title', 'Certifications')}</h4>
            <p class="text-slate-300 text-sm">${getText('resume_certifications', 'AWS Certified\\nGoogle Cloud Pro')}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-24 px-6 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-5xl md:text-6xl font-bold text-slate-900 mb-4">${getText('testimonials_section_title', 'Testimonials')}</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-6"></div>
          <p class="text-xl text-slate-600 max-w-3xl mx-auto">${getText('testimonials_section_subtitle', 'What colleagues and clients say about working with me')}</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Testimonial 1 -->
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-2xl">👤</div>
              <div>
                <h4 class="font-bold text-slate-900">${getText('testimonial_1_name', 'Sarah Johnson')}</h4>
                <p class="text-sm text-slate-600">${getText('testimonial_1_role', 'CEO, TechStart Inc.')}</p>
              </div>
            </div>
            <div class="text-purple-600 text-3xl mb-4">"</div>
            <p class="text-slate-700 leading-relaxed">${getText('testimonial_1_quote', 'Working with John was an absolute pleasure. His technical expertise and attention to detail helped us launch our product ahead of schedule. Highly recommended!')}</p>
          </div>
          <!-- Testimonial 2 -->
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white text-2xl">👤</div>
              <div>
                <h4 class="font-bold text-slate-900">${getText('testimonial_2_name', 'Michael Chen')}</h4>
                <p class="text-sm text-slate-600">${getText('testimonial_2_role', 'Product Manager, InnovateCo')}</p>
              </div>
            </div>
            <div class="text-blue-600 text-3xl mb-4">"</div>
            <p class="text-slate-700 leading-relaxed">${getText('testimonial_2_quote', 'John\'s ability to translate complex requirements into elegant solutions is remarkable. He\'s a true professional who delivers exceptional results every time.')}</p>
          </div>
          <!-- Testimonial 3 -->
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center text-white text-2xl">👤</div>
              <div>
                <h4 class="font-bold text-slate-900">${getText('testimonial_3_name', 'Emily Rodriguez')}</h4>
                <p class="text-sm text-slate-600">${getText('testimonial_3_role', 'CTO, Digital Solutions')}</p>
              </div>
            </div>
            <div class="text-green-600 text-3xl mb-4">"</div>
            <p class="text-slate-700 leading-relaxed">${getText('testimonial_3_quote', 'An outstanding developer with excellent communication skills. John not only built our platform but also mentored our junior developers. A valuable asset to any team.')}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-24 px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-5xl md:text-6xl font-bold mb-6">${getText('contact_section_title', "Let's Work Together")}</h2>
        <div class="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-8"></div>
        <p class="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">${getText('contact_description', 'I\'m always interested in hearing about new projects and opportunities. Feel free to reach out!')}</p>
        <div class="grid md:grid-cols-2 gap-6 mb-12">
          <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-left">
            <div class="text-4xl mb-4">📧</div>
            <h3 class="text-xl font-semibold mb-2">${getText('contact_email_label', 'Email')}</h3>
            <p class="text-purple-300">${getText('contact_email', 'hello@johndoe.com')}</p>
          </div>
          <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-left">
            <div class="text-4xl mb-4">📱</div>
            <h3 class="text-xl font-semibold mb-2">${getText('contact_phone_label', 'Phone')}</h3>
            <p class="text-purple-300">${getText('contact_phone', '+1 (555) 123-4567')}</p>
          </div>
        </div>
        <div class="mb-12">
          <h3 class="text-2xl font-semibold mb-6">${getText('contact_social_label', 'Connect With Me')}</h3>
          <div class="flex justify-center gap-6">
            <a href="#" class="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"><span class="text-2xl">💼</span></a>
            <a href="#" class="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"><span class="text-2xl">🐙</span></a>
            <a href="#" class="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"><span class="text-2xl">🐦</span></a>
            <a href="#" class="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"><span class="text-2xl">📷</span></a>
          </div>
          <div class="flex justify-center gap-6 mt-4 text-sm text-slate-400">
            <span>${getText('contact_linkedin', 'LinkedIn')}</span>
            <span>${getText('contact_github', 'GitHub')}</span>
            <span>${getText('contact_twitter', 'Twitter')}</span>
            <span>${getText('contact_instagram', 'Instagram')}</span>
          </div>
        </div>
        <button class="px-12 py-5 bg-purple-600 hover:bg-purple-700 rounded-lg text-xl font-semibold transition-all">${getButtonText('contact_cta', 'Get In Touch')}</button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 px-6 bg-slate-950 text-slate-400 text-center">
      <p>${getText('footer_text', '© 2024 John Doe. All rights reserved.')}</p>
    </footer>
  </div>
  ${getSmoothScrollScript()}
</body>
</html>`;
};

export const generateSaasLandingHTML = (data: TemplateData, projectName: string): string => {
  const getText = (id: string, defaultValue: string) => {
    return escapeHtml(data[id]?.text || defaultValue);
  };

  const getButtonText = (id: string, defaultText: string) => {
    return escapeHtml(data[id]?.button?.text || defaultText);
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  ${getMetaTags(projectName)}
  ${getTailwindCDN()}
</head>
<body>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white px-6">
      <div class="max-w-5xl mx-auto text-center">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight">${getText('hero_headline', 'Build Your SaaS Product Faster')}</h1>
        <p class="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">${getText('hero_subheadline', 'The all-in-one platform to launch, grow, and scale your business with powerful tools and integrations.')}</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="px-8 py-4 bg-white text-purple-600 hover:bg-blue-50 rounded-lg text-lg font-semibold transition-colors shadow-lg">${getButtonText('hero_cta_primary', 'Start Free Trial')}</button>
          <button class="px-8 py-4 bg-transparent border-2 border-white hover:bg-white/10 rounded-lg text-lg font-semibold transition-colors">${getButtonText('hero_cta_secondary', 'Watch Demo')}</button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 px-6 bg-white">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold text-slate-900 mb-16 text-center">${getText('features_heading', 'Everything You Need to Succeed')}</h2>
        <div class="grid md:grid-cols-3 gap-12">
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span class="text-3xl">⚡</span>
            </div>
            <h3 class="text-2xl font-bold text-slate-900 mb-4">${getText('feature_1_title', 'Lightning Fast')}</h3>
            <p class="text-slate-600 leading-relaxed">${getText('feature_1_description', 'Optimized performance ensures your application runs smoothly at scale.')}</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span class="text-3xl">🔒</span>
            </div>
            <h3 class="text-2xl font-bold text-slate-900 mb-4">${getText('feature_2_title', 'Secure by Default')}</h3>
            <p class="text-slate-600 leading-relaxed">${getText('feature_2_description', 'Enterprise-grade security with encryption and compliance built-in.')}</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span class="text-3xl">🎨</span>
            </div>
            <h3 class="text-2xl font-bold text-slate-900 mb-4">${getText('feature_3_title', 'Beautiful Design')}</h3>
            <p class="text-slate-600 leading-relaxed">${getText('feature_3_description', 'Stunning UI components that delight users and boost conversions.')}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="py-20 px-6 bg-slate-50">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold text-slate-900 mb-16 text-center">${getText('pricing_heading', 'Simple, Transparent Pricing')}</h2>
        <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-4 border-purple-500">
          <div class="text-center">
            <h3 class="text-3xl font-bold text-slate-900 mb-4">${getText('pricing_plan_name', 'Pro Plan')}</h3>
            <div class="mb-8">
              <span class="text-6xl font-bold text-purple-600">${getText('pricing_plan_price', '$49')}</span>
              <span class="text-2xl text-slate-600">/month</span>
            </div>
            <button class="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg text-lg font-semibold transition-colors shadow-lg">${getButtonText('pricing_plan_cta', 'Get Started Now')}</button>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-6 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-8">${getText('cta_heading', 'Ready to Get Started?')}</h2>
        <button class="px-10 py-5 bg-white text-purple-600 hover:bg-blue-50 rounded-lg text-xl font-semibold transition-colors shadow-xl">${getButtonText('cta_button', 'Start Your Free Trial')}</button>
      </div>
    </section>
  </div>
  ${getSmoothScrollScript()}
</body>
</html>`;
};

export const generateAgencyHTML = (data: TemplateData, projectName: string): string => {
  const getText = (id: string, defaultValue: string) => {
    return escapeHtml(data[id]?.text || defaultValue);
  };

  const getButtonText = (id: string, defaultText: string) => {
    return escapeHtml(data[id]?.button?.text || defaultText);
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  ${getMetaTags(projectName)}
  ${getTailwindCDN()}
</head>
<body>
  <div class="min-h-screen bg-slate-900">
    <!-- Hero Section -->
    <section class="min-h-screen flex items-center justify-center bg-slate-900 text-white px-6 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-purple-500/20"></div>
      <div class="max-w-6xl mx-auto text-center relative z-10">
        <h1 class="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">${getText('hero_headline', 'Creative Agency')}</h1>
        <p class="text-2xl md:text-3xl text-slate-300 mb-10 max-w-3xl mx-auto">${getText('hero_tagline', 'We craft digital experiences that inspire and engage')}</p>
        <button class="px-10 py-5 bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 rounded-full text-xl font-semibold transition-all shadow-2xl hover:shadow-orange-500/50">${getButtonText('hero_cta', 'Start Your Project')}</button>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-20 px-6 bg-white">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold text-slate-900 mb-16 text-center">${getText('services_heading', 'Our Services')}</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="group p-8 bg-gradient-to-br from-orange-50 to-purple-50 rounded-2xl hover:shadow-xl transition-all">
            <div class="w-14 h-14 bg-gradient-to-br from-orange-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span class="text-2xl">🎨</span>
            </div>
            <h3 class="text-2xl font-bold text-slate-900 mb-4">${getText('service_1_title', 'Brand Identity')}</h3>
            <p class="text-slate-600 leading-relaxed">${getText('service_1_description', 'Create a memorable brand that stands out with custom logos, color palettes, and visual guidelines.')}</p>
          </div>

          <div class="group p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl hover:shadow-xl transition-all">
            <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span class="text-2xl">💻</span>
            </div>
            <h3 class="text-2xl font-bold text-slate-900 mb-4">${getText('service_2_title', 'Web Development')}</h3>
            <p class="text-slate-600 leading-relaxed">${getText('service_2_description', 'Build fast, responsive websites with modern technologies and best practices for optimal performance.')}</p>
          </div>

          <div class="group p-8 bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl hover:shadow-xl transition-all">
            <div class="w-14 h-14 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span class="text-2xl">📱</span>
            </div>
            <h3 class="text-2xl font-bold text-slate-900 mb-4">${getText('service_3_title', 'Mobile Apps')}</h3>
            <p class="text-slate-600 leading-relaxed">${getText('service_3_description', 'Design and develop native and cross-platform mobile applications that users love.')}</p>
          </div>

          <div class="group p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl hover:shadow-xl transition-all">
            <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span class="text-2xl">📊</span>
            </div>
            <h3 class="text-2xl font-bold text-slate-900 mb-4">${getText('service_4_title', 'Digital Marketing')}</h3>
            <p class="text-slate-600 leading-relaxed">${getText('service_4_description', 'Grow your business with data-driven marketing strategies and campaigns that deliver results.')}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Portfolio Section -->
    <section class="py-20 px-6 bg-slate-900 text-white">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold mb-16 text-center">${getText('portfolio_heading', 'Featured Work')}</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="group relative h-80 bg-gradient-to-br from-orange-500 to-purple-500 rounded-2xl overflow-hidden cursor-pointer">
            <div class="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <h3 class="text-3xl font-bold text-white">${getText('portfolio_1_title', 'Brand Redesign')}</h3>
            </div>
          </div>

          <div class="group relative h-80 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl overflow-hidden cursor-pointer">
            <div class="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <h3 class="text-3xl font-bold text-white">${getText('portfolio_2_title', 'E-commerce Site')}</h3>
            </div>
          </div>

          <div class="group relative h-80 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl overflow-hidden cursor-pointer">
            <div class="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <h3 class="text-3xl font-bold text-white">${getText('portfolio_3_title', 'Mobile App')}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-24 px-6 bg-slate-50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-5xl md:text-6xl font-bold text-slate-900 mb-4">${getText('team_heading', 'Meet Our Team')}</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-orange-500 to-purple-500 mx-auto mb-4"></div>
          <p class="text-xl text-slate-600 max-w-3xl mx-auto">${getText('team_description', 'Talented individuals working together to create exceptional digital experiences')}</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Team Member 1 -->
          <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
            <div class="h-80 bg-gradient-to-br from-orange-500 to-purple-500 flex items-center justify-center">
              <span class="text-slate-400 text-6xl">👤</span>
            </div>
            <div class="p-6 text-center">
              <h3 class="text-2xl font-bold text-slate-900 mb-2">${getText('team_1_name', 'Sarah Johnson')}</h3>
              <p class="text-orange-500 font-semibold mb-3">${getText('team_1_role', 'Creative Director')}</p>
              <p class="text-slate-600 text-sm">${getText('team_1_bio', '10+ years of experience in brand strategy and visual design')}</p>
            </div>
          </div>

          <!-- Team Member 2 -->
          <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
            <div class="h-80 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span class="text-slate-400 text-6xl">👤</span>
            </div>
            <div class="p-6 text-center">
              <h3 class="text-2xl font-bold text-slate-900 mb-2">${getText('team_2_name', 'Michael Chen')}</h3>
              <p class="text-purple-500 font-semibold mb-3">${getText('team_2_role', 'Lead Developer')}</p>
              <p class="text-slate-600 text-sm">${getText('team_2_bio', 'Full-stack expert specializing in modern web technologies')}</p>
            </div>
          </div>

          <!-- Team Member 3 -->
          <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
            <div class="h-80 bg-gradient-to-br from-pink-500 to-blue-500 flex items-center justify-center">
              <span class="text-slate-400 text-6xl">👤</span>
            </div>
            <div class="p-6 text-center">
              <h3 class="text-2xl font-bold text-slate-900 mb-2">${getText('team_3_name', 'Emily Rodriguez')}</h3>
              <p class="text-pink-500 font-semibold mb-3">${getText('team_3_role', 'Marketing Strategist')}</p>
              <p class="text-slate-600 text-sm">${getText('team_3_bio', 'Data-driven marketing expert with proven track record')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-24 px-6 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-5xl md:text-6xl font-bold text-slate-900 mb-4">${getText('testimonials_heading', 'What Clients Say')}</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-orange-500 to-purple-500 mx-auto"></div>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Testimonial 1 -->
          <div class="bg-gradient-to-br from-orange-50 to-purple-50 p-8 rounded-2xl shadow-lg">
            <div class="flex items-center mb-4">
              <span class="text-yellow-400 text-xl">⭐⭐⭐⭐⭐</span>
            </div>
            <p class="text-slate-700 mb-6 leading-relaxed italic">${getText('testimonial_1_text', '"Working with this agency transformed our brand. Their creativity and professionalism exceeded all expectations."')}</p>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">JD</div>
              <div>
                <h4 class="font-bold text-slate-900">${getText('testimonial_1_name', 'John Davis')}</h4>
                <p class="text-sm text-slate-600">${getText('testimonial_1_company', 'CEO, TechStart Inc.')}</p>
              </div>
            </div>
          </div>

          <!-- Testimonial 2 -->
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg">
            <div class="flex items-center mb-4">
              <span class="text-yellow-400 text-xl">⭐⭐⭐⭐⭐</span>
            </div>
            <p class="text-slate-700 mb-6 leading-relaxed italic">${getText('testimonial_2_text', '"Incredible attention to detail and amazing results. Our website traffic increased by 300% in just 3 months!"')}</p>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">SM</div>
              <div>
                <h4 class="font-bold text-slate-900">${getText('testimonial_2_name', 'Sarah Martinez')}</h4>
                <p class="text-sm text-slate-600">${getText('testimonial_2_company', 'Founder, StyleHub')}</p>
              </div>
            </div>
          </div>

          <!-- Testimonial 3 -->
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-lg">
            <div class="flex items-center mb-4">
              <span class="text-yellow-400 text-xl">⭐⭐⭐⭐⭐</span>
            </div>
            <p class="text-slate-700 mb-6 leading-relaxed italic">${getText('testimonial_3_text', '"Best decision we made for our business. The team is responsive, talented, and truly cares about results."')}</p>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">RK</div>
              <div>
                <h4 class="font-bold text-slate-900">${getText('testimonial_3_name', 'Robert Kim')}</h4>
                <p class="text-sm text-slate-600">${getText('testimonial_3_company', 'Director, GrowthLab')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-24 px-6 bg-slate-900 text-white">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-5xl md:text-6xl font-bold mb-4">${getText('contact_heading', "Let's Create Something Amazing")}</h2>
        <div class="w-24 h-1 bg-gradient-to-r from-orange-500 to-purple-500 mx-auto mb-6"></div>
        <p class="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">${getText('contact_subheading', 'Ready to bring your vision to life? Get in touch with our team today and start your journey to digital excellence.')}</p>
        <div class="flex gap-4 justify-center mb-12">
          <button class="px-10 py-5 bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 text-white rounded-full text-xl font-semibold transition-all shadow-xl">${getButtonText('contact_cta_primary', 'Contact Us')}</button>
          <button class="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-xl font-semibold transition-all">${getButtonText('contact_cta_secondary', 'Schedule Call')}</button>
        </div>
        <div class="grid md:grid-cols-3 gap-8 text-center">
          <div class="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <div class="text-4xl mb-3">📧</div>
            <h3 class="font-semibold mb-2">${getText('contact_email_label', 'Email Us')}</h3>
            <p class="text-slate-300">${getText('contact_email', 'hello@agency.com')}</p>
          </div>
          <div class="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <div class="text-4xl mb-3">📱</div>
            <h3 class="font-semibold mb-2">${getText('contact_phone_label', 'Call Us')}</h3>
            <p class="text-slate-300">${getText('contact_phone', '+1 (555) 123-4567')}</p>
          </div>
          <div class="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <div class="text-4xl mb-3">📍</div>
            <h3 class="font-semibold mb-2">${getText('contact_location_label', 'Visit Us')}</h3>
            <p class="text-slate-300">${getText('contact_location', 'San Francisco, CA')}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-slate-950 text-white py-12 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 class="text-2xl font-bold bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent mb-4">${getText('footer_brand', 'Creative Agency')}</h3>
            <p class="text-slate-400 text-sm">${getText('footer_tagline', 'Crafting digital experiences that inspire and engage.')}</p>
          </div>
          <div>
            <h4 class="font-bold mb-4">${getText('footer_services_title', 'Services')}</h4>
            <ul class="space-y-2 text-slate-400 text-sm">
              <li>${getText('footer_service_1', 'Brand Identity')}</li>
              <li>${getText('footer_service_2', 'Web Development')}</li>
              <li>${getText('footer_service_3', 'Mobile Apps')}</li>
              <li>${getText('footer_service_4', 'Digital Marketing')}</li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold mb-4">${getText('footer_company_title', 'Company')}</h4>
            <ul class="space-y-2 text-slate-400 text-sm">
              <li>${getText('footer_link_1', 'About Us')}</li>
              <li>${getText('footer_link_2', 'Careers')}</li>
              <li>${getText('footer_link_3', 'Blog')}</li>
              <li>${getText('footer_link_4', 'Contact')}</li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold mb-4">${getText('footer_social_title', 'Follow Us')}</h4>
            <div class="flex gap-3">
              <div class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                <span>📘</span>
              </div>
              <div class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                <span>🐦</span>
              </div>
              <div class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                <span>📷</span>
              </div>
              <div class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                <span>💼</span>
              </div>
            </div>
          </div>
        </div>
        <div class="border-t border-slate-800 pt-8 text-center">
          <p class="text-slate-400 text-sm">${getText('footer_copyright', '© 2024 Creative Agency. All rights reserved.')}</p>
        </div>
      </div>
    </footer>
  </div>
  ${getSmoothScrollScript()}
</body>
</html>`;
};

export const generateAIPhotoStudioHTML = (data: TemplateData, projectName: string): string => {
  const getText = (key: string, defaultValue: string) => {
    return data[key]?.text || defaultValue;
  };

  const getButton = (key: string, defaultText: string) => {
    return data[key]?.button?.text || defaultText;
  };

  const getImage = (key: string, defaultSrc: string) => {
    return data[key]?.image || defaultSrc;
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  ${getMetaTags(projectName)}
  ${getTailwindCDN()}
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
  </style>
</head>
<body class="bg-white">
  <div class="min-h-screen">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span class="text-xl font-semibold text-gray-900">${getText('nav_logo', 'Deep agency')}</span>
          </div>
          <div class="flex items-center gap-8">
            <span class="text-gray-600 hover:text-gray-900 cursor-pointer">${getText('nav_link_1', 'Pricing')}</span>
            <a href="#" class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">${getButton('nav_cta', 'Get credits')}</a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="pt-32 pb-20 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div class="inline-block mb-4">
              <span class="text-xs font-semibold text-orange-500 tracking-wider">${getText('hero_badge', 'TRUSTED BY 1M+ USERS')}</span>
            </div>
            <h1 class="text-6xl font-bold mb-6 leading-tight">
              <span class="text-gray-900">${getText('hero_title_1', 'AI Photo Studio')}</span>
              <span class="text-orange-500"> & </span>
              <br>
              <span class="text-gray-900">${getText('hero_title_2', 'Modelling Agency')}</span>
            </h1>
            <p class="text-lg text-gray-600 mb-8 leading-relaxed">${getText('hero_description', 'Transform your photos with AI technology. Create professional headshots, generate AI models, and produce stunning visuals without a physical photo studio. Perfect for your digital goals and say goodbye to high-priced photo shoots.')}</p>
            <div class="flex items-center gap-4 mb-6">
              <span class="text-sm text-gray-600">${getText('hero_rating_text', 'Loved by 1M+ creators')}</span>
              <div class="flex gap-1">
                <span class="text-orange-500">★</span>
                <span class="text-orange-500">★</span>
                <span class="text-orange-500">★</span>
                <span class="text-orange-500">★</span>
                <span class="text-orange-500">★</span>
              </div>
              <span class="text-sm font-semibold text-gray-900">${getText('hero_rating_score', '4.9/5')}</span>
            </div>
            <div class="flex items-center gap-4">
              <a href="#" class="px-8 py-4 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30">${getButton('hero_cta_primary', 'Get started')}</a>
              <a href="#" class="px-8 py-4 text-gray-700 hover:text-gray-900 font-semibold transition-colors">${getButton('hero_cta_secondary', 'See pricing')}</a>
            </div>
          </div>
          <div class="relative">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src="${getImage('hero_image', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=1000&fit=crop')}" alt="AI Photo Studio Models" class="w-full h-[600px] object-cover">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 px-6 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">${getText('features_title', 'Create a virtual twin of yourself or use AI-models')}</h2>
        </div>
        <div class="grid md:grid-cols-2 gap-12">
          <!-- Virtual Twin -->
          <div class="bg-white rounded-2xl p-8 shadow-lg">
            <div class="mb-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">${getText('feature_1_title', 'Virtual Twin')}</h3>
              <p class="text-gray-600 leading-relaxed">${getText('feature_1_description', 'Upload 15-20 photos of yourself and create your AI twin. You can use this version to create great new photos of yourself.')}</p>
            </div>
            <div class="relative rounded-xl overflow-hidden">
              <img src="${getImage('feature_1_image', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop')}" alt="Virtual Twin Feature" class="w-full h-64 object-cover">
            </div>
          </div>

          <!-- Hire AI Models -->
          <div class="bg-white rounded-2xl p-8 shadow-lg">
            <div class="mb-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">${getText('feature_2_title', 'Hire AI-models')}</h3>
              <p class="text-gray-600 leading-relaxed">${getText('feature_2_description', 'Use one of our AI models to create great photos. Just describe what you want and let our AI create professional, lifelike photos of our AI models for you.')}</p>
            </div>
            <div class="relative rounded-xl overflow-hidden">
              <img src="${getImage('feature_2_image', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=400&fit=crop')}" alt="AI Models Feature" class="w-full h-64 object-cover">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Photo Studio Section -->
    <section class="py-20 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">${getText('studio_title', 'Your virtual photo studio, instantly available.')}</h2>
          <p class="text-xl text-gray-600">${getText('studio_subtitle', 'Create professional photos in seconds with AI')}</p>
        </div>
        <div class="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-12">
          <div class="grid grid-cols-4 gap-4">
            ${[1, 2, 3, 4, 5, 6, 7, 8].map(i => `
              <div class="relative rounded-xl overflow-hidden aspect-square">
                <img src="${getImage(`gallery_image_${i}`, `https://images.unsplash.com/photo-${1500000000000 + i * 100000000}?w=400&h=400&fit=crop`)}" alt="Gallery ${i}" class="w-full h-full object-cover">
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 px-6 bg-gray-50">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">${getText('faq_title', 'Frequently asked questions')}</h2>
          <p class="text-lg text-gray-600">${getText('faq_subtitle', 'Have more questions? Feel free to reach out to our support team.')}</p>
        </div>
        <div class="space-y-6">
          ${[1, 2, 3, 4, 5, 6].map(i => `
            <div class="bg-white rounded-xl p-6 shadow-sm">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">${getText(`faq_question_${i}`, 'What do you do with my photos after creating?')}</h3>
              <p class="text-gray-600 leading-relaxed">${getText(`faq_answer_${i}`, 'Your privacy is our priority. All photos are securely stored and only used to train your personal AI model. We never share your images with third parties.')}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-6">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-5xl font-bold text-gray-900 mb-6">${getText('cta_title', 'Ready to transform your photos?')}</h2>
        <p class="text-xl text-gray-600 mb-8">${getText('cta_description', 'Join over 1 million creators using AI Photo Studio')}</p>
        <a href="#" class="px-12 py-5 bg-orange-500 text-white rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors shadow-xl shadow-orange-500/30 inline-block">${getButton('cta_button', 'Get started now')}</a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-black text-white py-16 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div class="flex items-center gap-2 mb-4">
              <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span class="text-xl font-semibold">${getText('footer_logo', 'Deep agency')}</span>
            </div>
            <p class="text-gray-400 text-sm leading-relaxed">${getText('footer_description', 'AI-powered photo studio and modelling agency. Create professional photos instantly.')}</p>
          </div>
          <div>
            <h3 class="font-semibold mb-4">${getText('footer_col_1_title', 'Studio')}</h3>
            <div class="space-y-2">
              <span class="block text-gray-400 hover:text-white text-sm cursor-pointer">${getText('footer_col_1_link_1', 'Link')}</span>
              <span class="block text-gray-400 hover:text-white text-sm cursor-pointer">${getText('footer_col_1_link_2', 'Link')}</span>
              <span class="block text-gray-400 hover:text-white text-sm cursor-pointer">${getText('footer_col_1_link_3', 'Link')}</span>
            </div>
          </div>
          <div>
            <h3 class="font-semibold mb-4">${getText('footer_col_2_title', 'Legal')}</h3>
            <div class="space-y-2">
              <span class="block text-gray-400 hover:text-white text-sm cursor-pointer">${getText('footer_col_2_link_1', 'Link')}</span>
              <span class="block text-gray-400 hover:text-white text-sm cursor-pointer">${getText('footer_col_2_link_2', 'Link')}</span>
              <span class="block text-gray-400 hover:text-white text-sm cursor-pointer">${getText('footer_col_2_link_3', 'Link')}</span>
            </div>
          </div>
          <div>
            <h3 class="font-semibold mb-4">${getText('footer_col_3_title', 'Support')}</h3>
            <div class="space-y-2">
              <span class="block text-gray-400 hover:text-white text-sm cursor-pointer">${getText('footer_col_3_link_1', 'Link')}</span>
              <span class="block text-gray-400 hover:text-white text-sm cursor-pointer">${getText('footer_col_3_link_2', 'Link')}</span>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-800 pt-8 text-center">
          <p class="text-gray-400 text-sm">${getText('footer_copyright', '© 2024 Deep Agency. All rights reserved.')}</p>
        </div>
      </div>
    </footer>
  </div>
  ${getSmoothScrollScript()}
</body>
</html>`;
};

export const generateCatFoodHTML = (data: TemplateData, projectName: string): string => {
  const getText = (key: string, defaultValue: string) => {
    return data[key]?.text || defaultValue;
  };

  const getButton = (key: string, defaultText: string) => {
    return data[key]?.button?.text || defaultText;
  };

  const getImage = (key: string, defaultSrc: string) => {
    return data[key]?.image || defaultSrc;
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  ${getMetaTags(projectName)}
  ${getTailwindCDN()}
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
  </style>
</head>
<body class="bg-white">
  <!-- Header -->
  <header class="bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-5 py-5">
      <div class="flex justify-between items-center">
        <div class="text-2xl font-bold tracking-[0.2em]">${getText('logo', 'SMALLS')}</div>
        <a href="#" class="bg-black text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors">${getButton('header_cta', 'Get Started')}</a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="bg-gray-100 py-20 text-center">
    <div class="max-w-7xl mx-auto px-5">
      <h1 class="text-5xl md:text-6xl font-bold mb-5 tracking-wide">${getText('hero_title', 'FOR THE CURIOUS CAT.')}</h1>
      <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">${getText('hero_subtitle', 'Healthy, human-grade food custom-made for your cat and delivered right to your door.')}</p>
      <a href="#" class="bg-black text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors inline-block">${getButton('hero_cta', 'Get Started')}</a>
      <div class="mt-10 max-w-4xl mx-auto">
        <img src="${getImage('hero_image', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=400&fit=crop')}" alt="Cat with food" class="w-full h-auto rounded-lg">
      </div>
    </div>
  </section>

  <!-- Press Section -->
  <section class="bg-orange-400 py-8">
    <div class="max-w-7xl mx-auto px-5">
      <div class="flex justify-around items-center flex-wrap gap-8">
        ${[1, 2, 3, 4, 5].map(i => `<span class="text-lg font-semibold text-black">${getText(`press_logo_${i}`, 'PRESS LOGO')}</span>`).join('')}
      </div>
    </div>
  </section>

  <!-- How It Works -->
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-5">
      <h2 class="text-4xl font-bold text-center mb-16">${getText('how_it_works_title', 'HOW IT WORKS')}</h2>
      <div class="grid md:grid-cols-3 gap-10">
        ${[1, 2, 3].map(i => `
          <div class="text-center">
            <div class="text-6xl mb-5">${getText(`step_${i}_icon`, '🎯')}</div>
            <h3 class="text-xl font-semibold mb-4">${getText(`step_${i}_title`, 'Step Title')}</h3>
            <p class="text-gray-600 text-sm leading-relaxed">${getText(`step_${i}_description`, 'Step description goes here.')}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Health Section -->
  <section class="py-20 bg-yellow-300">
    <div class="max-w-7xl mx-auto px-5">
      <div class="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <img src="${getImage('health_image', 'https://images.unsplash.com/photo-1573865526739-10c1dd7aa5a0?w=500&h=500&fit=crop')}" alt="Person with cat" class="w-full h-auto rounded-lg">
        </div>
        <div>
          <h2 class="text-5xl font-bold mb-5">${getText('health_title', 'Cat health starts with you.')}</h2>
          <p class="text-base text-gray-800 mb-8 leading-relaxed">${getText('health_description', 'Cats need a diet that helps you feel balanced about the food you eat. At Smalls we believe that starts with gentle, human-grade ingredients cooked with care.')}</p>
          <a href="#" class="bg-black text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors inline-block">${getButton('health_cta', 'See the proof')}</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Fresh Food Section -->
  <section class="py-20" style="background: linear-gradient(to bottom, #87ceeb 50%, #f9a26c 50%);">
    <div class="max-w-7xl mx-auto px-5">
      <div class="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 class="text-6xl md:text-7xl font-black uppercase mb-8 tracking-wider">${getText('fresh_title', 'FRESH KILLS')}</h2>
          <div class="bg-white p-8 rounded-lg">
            <p class="text-sm leading-relaxed">${getText('fresh_description', 'Our beloved entry kit made fresh with real meat for cats who love wet food. Every recipe is gently cooked in small batches to lock in freshness.')}</p>
          </div>
        </div>
        <div class="text-center">
          <img src="${getImage('fresh_image', 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=400&h=400&fit=crop')}" alt="Cat with fresh food" class="max-w-full h-auto">
        </div>
      </div>
    </div>
  </section>

  <!-- Dry Food Section -->
  <section class="py-20 bg-orange-400">
    <div class="max-w-7xl mx-auto px-5">
      <div class="grid md:grid-cols-2 gap-16 items-center">
        <div class="text-center">
          <img src="${getImage('dry_image', 'https://images.unsplash.com/photo-1529257414772-1960b7bea4eb?w=400&h=400&fit=crop')}" alt="Cat with dry food" class="max-w-full h-auto">
        </div>
        <div>
          <h2 class="text-6xl md:text-7xl font-black uppercase mb-8 tracking-wider">${getText('dry_title', 'DRY KILLS')}</h2>
          <div class="bg-white p-8 rounded-lg">
            <p class="text-sm leading-relaxed">${getText('dry_description', 'High-protein, low-carb kibble for cats who prefer crunchy food. Made with real meat and no fillers.')}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Benefits Section -->
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-5">
      <h2 class="text-4xl font-bold text-center mb-16">${getText('benefits_title', 'BENEFITS')}</h2>
      <div class="grid md:grid-cols-2 gap-16">
        <div class="space-y-8">
          ${[1, 2, 3].map(i => `
            <div class="flex gap-5 bg-gray-50 p-8 rounded-lg">
              <div class="text-4xl flex-shrink-0">${getText(`benefit_${i}_icon`, '🦷')}</div>
              <div>
                <h3 class="text-xl font-semibold mb-3">${getText(`benefit_${i}_title`, 'Benefit Title')}</h3>
                <p class="text-gray-600 text-sm leading-relaxed">${getText(`benefit_${i}_description`, 'Benefit description goes here.')}</p>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="text-center">
          <img src="${getImage('benefit_image', 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&h=600&fit=crop')}" alt="Cat benefit" class="max-w-full h-auto rounded-lg">
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="py-20 bg-gray-100">
    <div class="max-w-7xl mx-auto px-5">
      <h2 class="text-4xl font-bold text-center mb-16">${getText('testimonials_title', 'CATS LOVE SMALLS')}</h2>
      <div class="grid md:grid-cols-3 gap-10">
        ${[1, 2, 3].map(i => `
          <div class="text-center">
            <div class="w-20 h-20 rounded-full bg-gray-300 mx-auto mb-5 overflow-hidden">
              <img src="${getImage(`testimonial_${i}_avatar`, 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=80&h=80&fit=crop')}" alt="Cat" class="w-full h-full object-cover">
            </div>
            <p class="text-sm text-gray-600 leading-relaxed mb-3">${getText(`testimonial_${i}_quote`, '"My cat absolutely loves Smalls! The quality of the ingredients really shows."')}</p>
            <div class="font-semibold text-gray-800 text-sm">${getText(`testimonial_${i}_name`, '- Maya K.')}</div>
          </div>
        `).join('')}
      </div>
      <div class="text-center mt-10">
        <a href="#" class="bg-black text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors inline-block">${getButton('testimonials_cta', 'See Reviews')}</a>
      </div>
    </div>
  </section>

  <!-- Guarantee -->
  <section class="py-16 bg-white text-center">
    <div class="max-w-7xl mx-auto px-5">
      <div class="flex justify-center items-center gap-8 flex-wrap">
        <div class="w-20 h-20 bg-yellow-300 rounded-full flex items-center justify-center text-2xl font-bold">✓</div>
        <div class="text-left max-w-lg">
          <h3 class="text-2xl font-semibold mb-3">${getText('guarantee_title', 'MONEY BACK GUARANTEE')}</h3>
          <p class="text-gray-600 text-sm">${getText('guarantee_description', "We know your cat will love Smalls! If not, we'll make it right with our 100% satisfaction guarantee.")}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-50 border-t border-gray-200 py-10">
    <div class="max-w-7xl mx-auto px-5">
      <div class="grid md:grid-cols-4 gap-10">
        <div>
          <h4 class="text-base font-semibold mb-4">${getText('footer_col_1_title', 'Company')}</h4>
          <ul class="space-y-3">
            ${[1, 2, 3].map(i => `<li><span class="text-gray-600 text-sm hover:text-black cursor-pointer">${getText(`footer_col_1_link_${i}`, 'Link')}</span></li>`).join('')}
          </ul>
        </div>
        <div>
          <h4 class="text-base font-semibold mb-4">${getText('footer_col_2_title', 'Support')}</h4>
          <ul class="space-y-3">
            ${[1, 2, 3].map(i => `<li><span class="text-gray-600 text-sm hover:text-black cursor-pointer">${getText(`footer_col_2_link_${i}`, 'Link')}</span></li>`).join('')}
          </ul>
        </div>
        <div>
          <h4 class="text-base font-semibold mb-4">${getText('footer_col_3_title', 'Legal')}</h4>
          <ul class="space-y-3">
            ${[1, 2].map(i => `<li><span class="text-gray-600 text-sm hover:text-black cursor-pointer">${getText(`footer_col_3_link_${i}`, 'Link')}</span></li>`).join('')}
          </ul>
        </div>
        <div>
          <h4 class="text-base font-semibold mb-4">${getText('footer_col_4_title', 'Follow Us')}</h4>
          <div class="flex gap-4">
            <a href="${data['social_facebook']?.button?.url || 'https://facebook.com'}" target="_blank" rel="noopener noreferrer" class="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm hover:bg-gray-800 transition-colors">${getButton('social_facebook', 'f')}</a>
            <a href="${data['social_twitter']?.button?.url || 'https://twitter.com'}" target="_blank" rel="noopener noreferrer" class="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm hover:bg-gray-800 transition-colors">${getButton('social_twitter', 't')}</a>
            <a href="${data['social_instagram']?.button?.url || 'https://instagram.com'}" target="_blank" rel="noopener noreferrer" class="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm hover:bg-gray-800 transition-colors">${getButton('social_instagram', 'i')}</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
  ${getSmoothScrollScript()}
</body>
</html>`;
};

export const generateGroceryDeliveryHTML = (data: TemplateData, projectName: string): string => {
  const getText = (key: string, defaultValue: string) => {
    return data[key]?.text || defaultValue;
  };

  const getButton = (key: string, defaultText: string) => {
    return data[key]?.button?.text || defaultText;
  };

  const getImage = (key: string, defaultSrc: string) => {
    return data[key]?.image || defaultSrc;
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  ${getMetaTags(projectName)}
  ${getTailwindCDN()}
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
  </style>
</head>
<body class="bg-white">
  <!-- Hero Section -->
  <section class="relative bg-gray-300 min-h-[600px] flex items-center">
    <div class="absolute inset-0">
      <img src="${getImage('hero_background', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&h=600&fit=crop')}" alt="Hero background" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-black/20"></div>
    </div>
    
    <div class="relative max-w-7xl mx-auto px-6 py-20">
      <div class="max-w-xl">
        <div class="mb-8">
          <img src="${getImage('logo', 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop')}" alt="Logo" class="h-16 w-auto">
        </div>
        
        <h1 class="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">${getText('hero_title', 'Get $20 off Harmless Harvest coconut water.')}</h1>
        
        <a href="#" class="inline-block bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">${getButton('hero_cta', 'Claim Your Coconut Water')}</a>
        
        <p class="text-white/90 text-sm mt-4">${getText('hero_subtitle', 'One valid $20 new Good Eggs customers only.')}</p>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid md:grid-cols-3 gap-8">
        ${[1, 2, 3].map(i => `
          <div class="bg-white">
            <div class="mb-6 aspect-square overflow-hidden rounded-lg">
              <img src="${getImage(`feature_${i}_image`, `https://images.unsplash.com/photo-${1500000000000 + i * 100000000}?w=400&h=400&fit=crop`)}" alt="Feature ${i}" class="w-full h-full object-cover">
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">${getText(`feature_${i}_title`, 'Everything you need, delivered to your door.')}</h3>
            <p class="text-gray-600 text-sm leading-relaxed">${getText(`feature_${i}_description`, 'Good Eggs carries everything you can find at the grocery store, and more.')}</p>
          </div>
        `).join('')}
      </div>
      
      <div class="text-center mt-12">
        <a href="#" class="inline-block border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-colors">${getButton('features_cta', 'Get Your Free Coconut Water')}</a>
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6">
      <h2 class="text-center text-sm font-semibold tracking-widest text-gray-900 mb-16 uppercase">${getText('testimonials_title', 'WHAT CUSTOMERS ARE SAYING')}</h2>
      
      <div class="grid md:grid-cols-3 gap-12">
        ${[1, 2, 3].map(i => `
          <div class="bg-white p-8 rounded-lg">
            <p class="text-gray-700 italic text-base leading-relaxed mb-6">${getText(`testimonial_${i}_quote`, 'Good Eggs has been an absolute life changer.')}</p>
            <div class="font-bold text-gray-900 text-sm uppercase tracking-wide">${getText(`testimonial_${i}_name`, 'JULIA T.')}</div>
            <div class="text-gray-500 text-sm">${getText(`testimonial_${i}_location`, 'San Francisco')}</div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-800 text-white py-12">
    <div class="max-w-7xl mx-auto px-6 text-center">
      <div class="mb-6">
        <img src="${getImage('footer_logo', 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop')}" alt="Footer logo" class="h-12 w-auto mx-auto">
      </div>
      
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        ${[1, 2, 3, 4].map(col => `
          <div>
            <h4 class="font-semibold mb-4 text-sm uppercase tracking-wide">${getText(`footer_col_${col}_title`, 'Column')}</h4>
            <ul class="space-y-2">
              ${[1, 2, 3].map(link => `<li><span class="text-gray-300 text-sm hover:text-white cursor-pointer">${getText(`footer_col_${col}_link_${link}`, 'Link')}</span></li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
      
      <div class="border-t border-gray-700 pt-8">
        <p class="text-gray-400 text-sm">${getText('footer_copyright', '© 2024 Good Eggs. All rights reserved.')}</p>
      </div>
    </div>
  </footer>
  ${getSmoothScrollScript()}
</body>
</html>`;
};


export const generatePhotoFolioHTML = (data: TemplateData): string => {
  const getText = (id: string, defaultValue: string) => {
    return escapeHtml(data[id]?.text || defaultValue);
  };

  const getButton = (id: string, defaultText: string, defaultUrl: string) => {
    return {
      text: escapeHtml(data[id]?.button?.text || defaultText),
      url: data[id]?.button?.url || defaultUrl,
    };
  };

  const getImage = (id: string, defaultSrc: string) => {
    return data[id]?.image || defaultSrc;
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${getText('nav_logo', 'PhotoFolio')}</title>
  ${getTailwindCDN()}
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            primary: '#13c8ec',
          }
        }
      }
    }
  </script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; }
    .hidden { display: none !important; }
  </style>
</head>
<body class="bg-[#f6f8f8] dark:bg-[#101f22] text-[#101f22] dark:text-white min-h-screen flex flex-col relative overflow-x-hidden">

  <!-- Header -->
  <header id="header-section" class="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200/80 dark:border-white/10 px-4 sm:px-10 py-3">
    <div class="flex items-center gap-4 text-[#101f22] dark:text-white">
      <div class="size-6 text-[#13c8ec]">
        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
        </svg>
      </div>
      <h2 class="text-lg font-bold leading-tight tracking-[-0.015em]">
        ${getText('nav_logo', 'PhotoFolio')}
      </h2>
    </div>
    <div class="hidden md:flex flex-1 justify-end gap-8">
      <div class="flex items-center gap-9">
        <span class="text-sm font-medium leading-normal hover:text-[#13c8ec] transition-colors cursor-pointer">Home</span>
        <span class="text-sm font-medium leading-normal hover:text-[#13c8ec] transition-colors cursor-pointer">Gallery</span>
        <span class="text-sm font-medium leading-normal hover:text-[#13c8ec] transition-colors cursor-pointer">About</span>
        <span class="text-sm font-medium leading-normal hover:text-[#13c8ec] transition-colors cursor-pointer">Contact</span>
      </div>
      <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#13c8ec] text-black text-sm font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors">
        <span class="truncate">Get in Touch</span>
      </button>
    </div>
  </header>

  <!-- HOME VIEW -->
  <main id="home-view" class="flex-grow flex flex-col">
    <section class="py-10 sm:py-16 px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-[960px] mx-auto">
        <div class="flex flex-col gap-6">
          <h1 class="text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
            ${getText('hero_title', 'Capturing Moments, Creating Memories')}
          </h1>
          <p class="text-base font-normal leading-normal text-gray-600 dark:text-gray-400">
            ${getText('hero_description', "Our passion is to frame the world's beauty through our lenses. This gallery represents a curated collection of our finest work, showcasing diverse subjects and stunning landscapes from across the globe. Each photograph tells a unique story.")}
          </p>
          <div class="flex pt-2">
            <button
                onclick="startQuiz()"
                class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-[#13c8ec] text-black text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors"
            >
                ${getButton('hero_cta', 'Take Our Quiz', '#').text}
            </button>
          </div>
        </div>
        <div class="w-full">
            <img
                src="${getImage('hero_image', 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1KN39_GDhKQWgQeWM0NYgnkwOa8fwWLB-Pu2HnHvVC8z07JHd4GvRWhAQxTzmoKBxbSHjao4ktyTm8it_v-HNnY_0xc7fmy92YezymxClB2oGVmtahOinzEQfaji9_tF1QcV0dDskPsbxtqvX2rXtHfLVQrH_-GMFw6KnSezJqmdDc1fP4o7BI5nQJJxupI9HXDXbfpIfjBgACt7oN8ukhiWjjsyMVSRLW4mnNL7frfVJsnRpC_c_agCxyVAPmDfqJ7391Jfumyw')}"
                class="w-full bg-center bg-no-repeat aspect-square sm:aspect-[4/3] bg-cover rounded-xl"
            />
        </div>
      </div>
    </section>
    <section class="px-4 py-8 sm:py-12">
      <div class="max-w-4xl mx-auto space-y-6 text-gray-700 dark:text-gray-300">
        <p class="text-lg leading-relaxed">
            ${getText('about_text_1', "Below, you'll find a more in-depth look into the techniques and stories behind our photography. We believe that a great photo is more than just a picture; it's a moment frozen in time, an emotion captured, and a story told without words. Our approach combines technical expertise with a keen artistic eye, ensuring that every image is not only visually stunning but also deeply meaningful.")}
        </p>
        <p class="text-base leading-relaxed text-gray-600 dark:text-gray-400">
            ${getText('about_text_2', "We travel extensively to find unique perspectives, from the bustling streets of urban jungles to the serene solitude of untouched nature. Each location offers new challenges and opportunities, pushing us to constantly evolve our craft. We utilize state-of-the-art equipment and post-processing techniques to bring out the vibrant colors and intricate details of our subjects. This dedication to quality is evident in every piece we produce. Whether it's a breathtaking landscape, an intimate portrait, or a dynamic abstract shot, our goal is to evoke a sense of wonder and connection with the viewer. Thank you for exploring our portfolio.")}
        </p>
      </div>
    </section>
  </main>

  <!-- QUIZ VIEW -->
  <main id="quiz-view" class="hidden flex-grow flex flex-col items-center justify-center py-20 px-4 min-h-[600px]">
      <div class="max-w-2xl w-full">
          <div class="mb-8">
              <h2 class="text-2xl font-bold mb-2 text-[#13c8ec]">
                  ${getText('quiz_heading', 'Photography Knowledge Check')}
              </h2>
              <div class="flex gap-2" id="progress-bar">
                 <!-- Progress steps injected by JS -->
              </div>
          </div>

          <div class="bg-white dark:bg-white/5 rounded-2xl p-8 border border-gray-200 dark:border-white/10 shadow-lg" id="question-container">
              <!-- Question content injected by JS -->
          </div>
      </div>
  </main>

  <!-- RESULT VIEW -->
  <main id="result-view" class="hidden flex-grow flex flex-col relative transition-colors duration-300">
      <div class="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center">
          <div class="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center py-12">
              <div class="bg-white/60 dark:bg-slate-800/60 p-2 rounded-full shadow-lg backdrop-blur-sm mb-6">
                  <div class="bg-[#13c8ec]/20 p-4 rounded-full flex items-center justify-center">
                      <svg class="w-12 h-12 text-[#13c8ec] font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                      </svg>
                  </div>
              </div>
              <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight drop-shadow-sm">
                  ${getText('result_title', 'Congratulations!')}
              </h1>
              <div class="space-y-4 mb-6 max-w-2xl">
                  <p class="text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
                      ${getText('result_text', "You've successfully completed the quiz.")}
                  </p>
                  <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed max-w-md mx-auto">
                      ${getText('result_subtext', 'We hope you enjoyed exploring our portfolio and learning more about our work. Feel free to reach out to us for any photography needs!')}
                  </p>
              </div>
              <div class="mb-8">
                  <img
                      src="${getImage('result_image', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAWpT6ohLIiewnUnTYmZXUgMQAD66hCisgMKJk1lmE0ISp6JMCVqXLz_vix2NxzVIBPNBLcPRj3LBZEBHcS8i73o-3ONV019ilI7_gFBSiC8oT0DLF2dXUKWJhlGHJeMvrcbYntV7Mk4Pz5ubzJWczsrpXGqJwpXeWoCUG5OkT-K5OsJaC4674D9vdLWyVnH5K29LEX8IWWcIbU0BZnbdgymn6a9rGou8JPrVEB6nk0EvcQ_CoTHmzACSiNyizzEblnDDtorL7c_I')}"
                      class="w-full max-w-2xl aspect-video object-cover rounded-xl shadow-2xl border-2 border-white/20 dark:border-white/10 transform hover:scale-105 transition-transform duration-300"
                  />
              </div>
              <div class="group relative w-full sm:w-auto">
                  <button
                      onclick="restartQuiz()"
                      class="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-gray-900 transition-all duration-200 bg-[#13c8ec] rounded-xl hover:bg-[#0ebacb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#13c8ec] focus:ring-offset-gray-900 shadow-lg shadow-[#13c8ec]/30 hover:shadow-[#13c8ec]/50 hover:-translate-y-0.5"
                  >
                      <span>${getButton('result_btn', 'Back to Home', '#').text}</span>
                  </button>
              </div>
          </div>
      </div>
  </main>

  <!-- Footer -->
  <footer class="flex flex-col gap-8 px-5 py-10 text-center border-t border-solid border-gray-200/80 dark:border-white/10 mt-16">
    <div class="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
      <a class="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal hover:text-[#13c8ec] transition-colors" href="#">Privacy Policy</a>
      <a class="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal hover:text-[#13c8ec] transition-colors" href="#">Terms of Service</a>
      <a class="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal hover:text-[#13c8ec] transition-colors" href="#">Contact Us</a>
    </div>
    <p class="text-gray-500 dark:text-gray-500 text-sm font-normal leading-normal">
        <span>
            ${getText('footer_copyright', '© 2024 PhotoFolio, Inc. All rights reserved.')}
        </span>
    </p>
  </footer>

  <script>
    // Quiz Data from Template
    const quizData = [
        {
            q: "${getText('question_1', 'Question 1?')}",
            options: [
                "${getText('q1_opt1', 'Option 1')}",
                "${getText('q1_opt2', 'Option 2')}",
                "${getText('q1_opt3', 'Option 3')}",
                "${getText('q1_opt4', 'Option 4')}"
            ]
        },
        {
            q: "${getText('question_2', 'Question 2?')}",
            options: [
                "${getText('q2_opt1', 'Option 1')}",
                "${getText('q2_opt2', 'Option 2')}",
                "${getText('q2_opt3', 'Option 3')}",
                "${getText('q2_opt4', 'Option 4')}"
            ]
        },
        {
            q: "${getText('question_3', 'Question 3?')}",
            options: [
                "${getText('q3_opt1', 'Option 1')}",
                "${getText('q3_opt2', 'Option 2')}",
                "${getText('q3_opt3', 'Option 3')}",
                "${getText('q3_opt4', 'Option 4')}"
            ]
        },
        {
            q: "${getText('question_4', 'Question 4?')}",
            options: [
                "${getText('q4_opt1', 'Option 1')}",
                "${getText('q4_opt2', 'Option 2')}",
                "${getText('q4_opt3', 'Option 3')}",
                "${getText('q4_opt4', 'Option 4')}"
            ]
        },
        {
            q: "${getText('question_5', 'Question 5?')}",
            options: [
                "${getText('q5_opt1', 'Option 1')}",
                "${getText('q5_opt2', 'Option 2')}",
                "${getText('q5_opt3', 'Option 3')}",
                "${getText('q5_opt4', 'Option 4')}"
            ]
        }
    ];

    let currentQuestion = 1;
    let answers = {};

    function startQuiz() {
        document.getElementById('home-view').classList.add('hidden');
        document.getElementById('quiz-view').classList.remove('hidden');
        currentQuestion = 1;
        answers = {};
        renderQuestion();
    }

    function restartQuiz() {
        document.getElementById('result-view').classList.add('hidden');
        document.getElementById('home-view').classList.remove('hidden');
        currentQuestion = 1;
        answers = {};
    }

    function handleOptionSelect(optionIdx) {
        answers[currentQuestion] = optionIdx;
        renderQuestion(); // Re-render to show selection
    }

    function handleNext() {
        if (currentQuestion < 5) {
            currentQuestion++;
            renderQuestion();
        } else {
            document.getElementById('quiz-view').classList.add('hidden');
            document.getElementById('result-view').classList.remove('hidden');
        }
    }

    function renderQuestion() {
        const questionIdx = currentQuestion - 1;
        const qData = quizData[questionIdx];

        // Update Progress
        const progressContainer = document.getElementById('progress-bar');
        progressContainer.innerHTML = [1,2,3,4,5].map(step => 
            \`<div class="h-2 flex-1 rounded-full \${step <= currentQuestion ? 'bg-[#13c8ec]' : 'bg-gray-200 dark:bg-gray-700'}"></div>\`
        ).join('');

        // Update Question UI
        const container = document.getElementById('question-container');
        container.innerHTML = \`
            <h3 class="text-xl font-bold mb-6">
                <span class="text-[#13c8ec] mr-2">Q\${currentQuestion}.</span>
                <span>\${qData.q}</span>
            </h3>

            <div class="space-y-3">
                \${qData.options.map((opt, idx) => {
                    const optNum = idx + 1;
                    const isSelected = answers[currentQuestion] === optNum;
                    return \`
                        <div 
                            onclick="handleOptionSelect(\${optNum})"
                            class="p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 \${
                                isSelected 
                                ? 'border-[#13c8ec] bg-[#13c8ec]/10' 
                                : 'border-gray-200 dark:border-white/10 hover:border-[#13c8ec]/50'
                            }"
                        >
                            <div class="w-5 h-5 rounded-full border flex items-center justify-center \${
                                isSelected ? 'border-[#13c8ec] bg-[#13c8ec]' : 'border-gray-400'
                            }">
                                \${isSelected ? '<div class="w-2 h-2 bg-black rounded-full"></div>' : ''}
                            </div>
                            <span class="flex-1">\${opt}</span>
                        </div>
                    \`;
                }).join('')}
            </div>

            <div class="mt-8 flex justify-end">
                <button 
                    onclick="handleNext()"
                    class="px-8 py-3 bg-[#13c8ec] hover:bg-[#13c8ec]/90 text-black font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    \${!answers[currentQuestion] ? 'disabled' : ''}
                >
                    \${currentQuestion === 5 ? 'Submit Answers' : 'Next Question'}
                </button>
            </div>
        \`;
    }
  </script>
</body>
</html>`;
};

export const exportToHTML = ({ template, data, projectName }: ExportData): string => {

  switch (template) {
    case 'portfolio':
      return generatePortfolioHTML(data, projectName);
    case 'portfolio-modern-dark':
      return generatePortfolioModernDarkHTML(data);
    case 'saas-landing':
      return generateSaasLandingHTML(data, projectName);
    case 'saas-vibrant-gradient':
      return generateSaasVibrantGradientHTML(data);
    case 'agency':
      return generateAgencyHTML(data, projectName);
    case 'ai-photo-studio':
      return generateAIPhotoStudioHTML(data, projectName);
    case 'cat-food':
      return generateCatFoodHTML(data, projectName);
    case 'grocery-delivery':
      return generateGroceryDeliveryHTML(data, projectName);
    case 'loan-landing':
      return generateLoanLandingHTML(data);
    case 'samsung-product':
      return generateSamsungProductHTML(data);
    case 'furniture-store':
      return generateFurnitureStoreHTML(data);
    case 'meditation-app':
      return generateMeditationAppHTML(data);
    case 'phone-fun':
      return generatePhoneFunHTML(data);
    case 'creative-community':
      return generateCreativeCommunityHTML(data);
    case 'general-content':
      return generateGeneralContentHTML(data);
    case 'squpage-promo':
      return generateSqupagePromoHTML(data);
    case 'legal-center':
      return generateLegalCenterHTML(data);
    case 'flash-sale':
      return generateFlashSaleHTML(data);
    case 'mega-discount':
      return generateMegaDiscountHTML(data);
    case 'festival-sale':
      return generateFestivalSaleHTML(data);
    case 'mobile-shop':
      return generateMobileShopHTML(data, projectName);
    case 'gadget-deals':
      return generateGadgetDealsHTML(data, projectName);
    case 'galaxy-phone':
      return generateGalaxyPhoneHTML(data);
    case 'glassmorphism-product':
      return generateGlassmorphismProductHTML(data);
    case 'photofolio':
      return generatePhotofolioHTML(data, projectName);
    case 'quiz-new':
      return generateQuizNewHTML(data, projectName);

    default:
      return generatePortfolioHTML(data, projectName);
  }
};

export const downloadHTML = (html: string, filename: string) => {
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
