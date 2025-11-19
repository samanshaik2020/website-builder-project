export function generateLegalCenterHTML(data: Record<string, any>): string {
  const getText = (eid: string, defaultText: string) => {
    return data[eid]?.text || defaultText;
  };

  const getButton = (eid: string, defaultText: string, defaultUrl: string) => {
    return data[eid]?.button || { text: defaultText, url: defaultUrl };
  };

  return `<!DOCTYPE html>
<html class="light" lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>${getText('hero_title', 'Legal Center')} - ${getText('nav_brand', 'squpage.com')}</title>
<meta name="description" content="${getText('hero_description', 'Terms of Service and Privacy Policy')}">
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
<script>
    tailwind.config = {
        darkMode: "class",
        theme: {
            extend: {
                colors: {
                    primary: "#2B6CB0",
                    secondary: "#F7FAFC",
                    accent: "#4FD1C5",
                    "text-main": "#2D3748",
                    "background-light": "#ffffff",
                    "background-dark": "#101922",
                    "dark-secondary": "#1A202C",
                    "dark-text-main": "#E2E8F0",
                },
                fontFamily: {
                    display: ["Inter", "sans-serif"],
                },
                borderRadius: {
                    DEFAULT: "0.25rem",
                    lg: "0.5rem",
                    xl: "0.75rem",
                    full: "9999px"
                },
            },
        },
    };
</script>
<style>
    .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        font-size: 24px;
    }
</style>
</head>
<body class="bg-background-light dark:bg-background-dark font-display text-text-main dark:text-dark-text-main">
<div class="relative flex min-h-screen w-full flex-col">
<!-- Header -->
<header class="sticky top-0 z-10 w-full border-b border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark/80 backdrop-blur-sm">
<div class="container mx-auto flex items-center justify-between whitespace-nowrap px-4 sm:px-6 lg:px-8 py-3">
<div class="flex items-center gap-4 text-text-main dark:text-dark-text-main">
<svg class="text-primary size-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
<path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
</svg>
<h2 class="text-lg font-bold">${getText('nav_brand', 'squpage.com')}</h2>
</div>
<div class="hidden md:flex items-center gap-8">
<div class="flex items-center gap-6">
<a class="text-sm font-medium hover:text-primary dark:hover:text-primary" href="#">${getText('nav_link_1', 'Home')}</a>
<a class="text-sm font-medium hover:text-primary dark:hover:text-primary" href="#">${getText('nav_link_2', 'Features')}</a>
<a class="text-sm font-medium hover:text-primary dark:hover:text-primary" href="#">${getText('nav_link_3', 'Pricing')}</a>
<a class="text-sm font-medium hover:text-primary dark:hover:text-primary" href="#">${getText('nav_link_4', 'About Us')}</a>
</div>
</div>
<div class="flex gap-2">
<a href="${getButton('nav_login_btn', 'Log In', '#').url}" class="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-sm font-bold bg-primary/20 dark:bg-primary/30 text-primary hover:bg-primary/30 dark:hover:bg-primary/40">
<span class="truncate">${getButton('nav_login_btn', 'Log In', '#').text}</span>
</a>
<a href="${getButton('nav_signup_btn', 'Sign Up', '#').url}" class="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90">
<span class="truncate">${getButton('nav_signup_btn', 'Sign Up', '#').text}</span>
</a>
</div>
</div>
</header>

<!-- Main Content -->
<main class="flex-1 w-full">
<!-- Hero Section -->
<div class="border-b border-gray-200 dark:border-gray-700">
<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
<div class="flex flex-col gap-3">
<h1 class="text-4xl font-black tracking-tighter text-text-main dark:text-dark-text-main">${getText('hero_title', 'Legal Center')}</h1>
<p class="text-base text-gray-500 dark:text-gray-400 max-w-2xl">
${getText('hero_description', "Here you'll find our Terms of Service and Privacy Policy. These documents outline your rights and responsibilities when using our services and how we handle your data.")}
</p>
</div>
<p class="text-sm text-gray-400 dark:text-gray-500 pt-6">${getText('hero_last_updated', 'Last updated: October 26, 2023')}</p>
</div>
</div>

<!-- Two Column Legal Content -->
<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
<!-- Terms of Service Column -->
<div class="flex flex-col gap-8">
<div class="sticky top-24 self-start">
<h2 class="text-2xl font-bold tracking-tight text-text-main dark:text-dark-text-main">${getText('tos_title', 'Terms of Service')}</h2>
<p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${getText('tos_subtitle', 'Rules and guidelines for using squpage.com.')}</p>
</div>
<div class="space-y-12">
<!-- Section 1 -->
<section id="user-agreement">
<h3 class="text-xl font-bold text-text-main dark:text-dark-text-main mb-4">${getText('tos_section1_title', '1. User Agreement')}</h3>
<div class="space-y-4 text-gray-600 dark:text-gray-300">
<p>${getText('tos_section1_content', 'By accessing or using squpage.com, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to all the terms and conditions, then you may not access the website or use any services.')}</p>
</div>
</section>

<!-- Section 2 -->
<section id="user-conduct">
<h3 class="text-xl font-bold text-text-main dark:text-dark-text-main mb-4">${getText('tos_section2_title', '2. User Conduct')}</h3>
<div class="space-y-4 text-gray-600 dark:text-gray-300">
<p>${getText('tos_section2_content', 'You agree not to use the service for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the service in any way that could damage the website, services, or general business of squpage.com.')}</p>
<ul class="list-disc list-inside space-y-2 pl-2">
<li>${getText('tos_section2_bullet1', 'You will not harass, abuse, or threaten others.')}</li>
<li>${getText('tos_section2_bullet2', 'You will not violate any intellectual property rights.')}</li>
<li>${getText('tos_section2_bullet3', 'You will not upload any computer viruses or malicious code.')}</li>
</ul>
</div>
</section>

<!-- Section 3 -->
<section id="termination">
<h3 class="text-xl font-bold text-text-main dark:text-dark-text-main mb-4">${getText('tos_section3_title', '3. Termination of Use')}</h3>
<div class="space-y-4 text-gray-600 dark:text-gray-300">
<p>${getText('tos_section3_content', 'We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including but not limited to a breach of the Terms.')}</p>
</div>
</section>
</div>
</div>

<!-- Privacy Policy Column -->
<div class="flex flex-col gap-8">
<div class="sticky top-24 self-start">
<h2 class="text-2xl font-bold tracking-tight text-text-main dark:text-dark-text-main">${getText('privacy_title', 'Privacy Policy')}</h2>
<p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${getText('privacy_subtitle', 'How we collect, use, and protect your data.')}</p>
</div>
<div class="space-y-12">
<!-- Section 1 -->
<section id="info-collect">
<h3 class="text-xl font-bold text-text-main dark:text-dark-text-main mb-4">${getText('privacy_section1_title', '1. Information We Collect')}</h3>
<div class="space-y-4 text-gray-600 dark:text-gray-300">
<p>${getText('privacy_section1_content1', 'To provide and improve our services, we collect certain information when you use squpage.com. This information falls into three categories: information you provide to us, information collected automatically, and information from third parties.')}</p>
<p><strong>Personal Data:</strong> ${getText('privacy_section1_content2', 'This includes your name, email address, and payment information when you sign up for an account or make a purchase.')}</p>
</div>
</section>

<!-- Section 2 -->
<section id="info-use">
<h3 class="text-xl font-bold text-text-main dark:text-dark-text-main mb-4">${getText('privacy_section2_title', '2. How We Use Information')}</h3>
<div class="space-y-4 text-gray-600 dark:text-gray-300">
<p>${getText('privacy_section2_content', 'We use the information we collect to operate, maintain, and enhance our services. This includes personalizing your experience, communicating with you, processing transactions, and for security and fraud prevention purposes.')}</p>
</div>
</section>

<!-- Section 3 -->
<section id="info-share">
<h3 class="text-xl font-bold text-text-main dark:text-dark-text-main mb-4">${getText('privacy_section3_title', '3. How We Share Information')}</h3>
<div class="space-y-4 text-gray-600 dark:text-gray-300">
<p>${getText('privacy_section3_content', 'We do not sell your personal information. We may share your information with trusted third-party service providers who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.')}</p>
</div>
</section>

<!-- CTA Box -->
<section id="info-contact">
<div class="bg-secondary dark:bg-dark-secondary rounded-xl p-6 lg:p-8">
<h3 class="text-xl font-bold text-text-main dark:text-dark-text-main">${getText('cta_title', 'Have questions about your data?')}</h3>
<p class="mt-2 text-gray-600 dark:text-gray-300">${getText('cta_description', "If you have any questions or concerns about our privacy practices, please don't hesitate to reach out to our privacy team.")}</p>
<a href="${getButton('cta_button', 'Contact Privacy Team', '#').url}" class="mt-4 flex items-center gap-2 min-w-[84px] cursor-pointer justify-center overflow-hidden rounded-lg h-10 px-4 bg-accent text-white text-sm font-bold hover:bg-accent/90">
<span class="material-symbols-outlined text-base">email</span>
<span>${getButton('cta_button', 'Contact Privacy Team', '#').text}</span>
</a>
</div>
</section>
</div>
</div>
</div>
</div>
</main>

<!-- Footer -->
<footer class="bg-secondary dark:bg-dark-secondary mt-auto">
<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
<div class="flex flex-col sm:flex-row justify-between items-center gap-4">
<p class="text-sm text-gray-500 dark:text-gray-400">${getText('footer_copyright', '© 2024 squpage.com. All rights reserved.')}</p>
<div class="flex gap-4">
<a class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary" href="#">${getText('footer_link_1', 'Terms of Service')}</a>
<a class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary" href="#">${getText('footer_link_2', 'Privacy Policy')}</a>
</div>
</div>
</div>
</footer>
</div>
</body>
</html>`;
}
