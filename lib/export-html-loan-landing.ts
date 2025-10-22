export function generateLoanLandingHTML(data: Record<string, any>): string {
  const getText = (id: string, defaultValue: string) => {
    return data[id]?.text || defaultValue;
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
  <title>${getText('nav_brand', 'HOMELOANGURUS')} - Loan Services</title>
  <meta name="description" content="Website created with Squpage">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  </style>
</head>
<body>
  <!-- Navigation -->
  <nav class="bg-[#4a6b7c] text-white py-4 px-6">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-white rounded flex items-center justify-center">
          <span class="text-[#4a6b7c] font-bold text-lg">H</span>
        </div>
        <span class="text-xl font-semibold">${getText('nav_brand', 'HOMELOANGURUS')}</span>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="relative bg-gradient-to-br from-[#7a9ca8] to-[#5a7c88] text-white py-20 px-6">
    <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          ${getText('hero_headline', 'Poor credit score?')}
        </h1>
        <p class="text-lg mb-8 text-white/90">
          ${getText('hero_description', 'We help when the bank says no. Our lenders welcome all credit scores, and provide an instant pre-qualification for a loan program.')}
        </p>
        <a href="${getButton('hero_cta', 'PRE-QUALIFY NOW', '#').url}" class="inline-block bg-[#dc3545] hover:bg-[#c82333] text-white px-8 py-4 rounded font-semibold text-lg transition-all duration-300">
          ${getButton('hero_cta', 'PRE-QUALIFY NOW', '#').text}
        </a>
      </div>
      <div class="relative">
        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop" alt="Happy customer" class="rounded-lg shadow-2xl">
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="py-20 px-6 bg-white">
    <div class="max-w-7xl mx-auto">
      <div class="grid md:grid-cols-3 gap-12">
        <!-- Feature 1 -->
        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <svg class="w-12 h-12 text-[#4a6b7c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-3 text-[#2c3e50]">
            ${getText('feature1_title', 'Low down payment')}
          </h3>
          <p class="text-gray-600">
            ${getText('feature1_description', 'Mortgages with low down payments exist, and our lenders can help you find them.')}
          </p>
        </div>

        <!-- Feature 2 -->
        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <svg class="w-12 h-12 text-[#4a6b7c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-3 text-[#2c3e50]">
            ${getText('feature2_title', 'Get fast response')}
          </h3>
          <p class="text-gray-600">
            ${getText('feature2_description', 'In just a few minutes, a lender can inform you of your home purchasing capabilities.')}
          </p>
        </div>

        <!-- Feature 3 -->
        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <svg class="w-12 h-12 text-[#4a6b7c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-3 text-[#2c3e50]">
            ${getText('feature3_title', 'No cost of applying')}
          </h3>
          <p class="text-gray-600">
            ${getText('feature3_description', 'Our offers are 100% free. We can help find a loan. We never charge you a fee.')}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- How It Works Section -->
  <section class="py-20 px-6 bg-gray-50">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-4xl font-bold text-center mb-16 text-[#2c3e50]">
        ${getText('how_it_works_title', 'This is how it works')}
      </h2>

      <div class="relative">
        <!-- Progress Line -->
        <div class="hidden md:block absolute top-12 h-1 bg-gradient-to-r from-[#f59e0b] via-[#f59e0b] to-[#f59e0b]" style="width: calc(100% - 200px); left: 100px;"></div>

        <div class="grid md:grid-cols-3 gap-12 relative">
          <!-- Step 1 -->
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-6 bg-[#f59e0b] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg relative z-10">
              1
            </div>
            <h3 class="text-xl font-bold mb-3 text-[#2c3e50]">
              ${getText('step1_title', 'Apply online')}
            </h3>
            <p class="text-gray-600">
              ${getText('step1_description', 'Take a few minutes to answer some questions about yourself, and how much you would like to borrow.')}
            </p>
          </div>

          <!-- Step 2 -->
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-6 bg-[#f59e0b] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg relative z-10">
              2
            </div>
            <h3 class="text-xl font-bold mb-3 text-[#2c3e50]">
              ${getText('step2_title', 'Connect with a lender')}
            </h3>
            <p class="text-gray-600">
              ${getText('step2_description', 'Within minutes, a lender can review your application and reach out to you with options.')}
            </p>
          </div>

          <!-- Step 3 -->
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-6 bg-[#f59e0b] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg relative z-10">
              3
            </div>
            <h3 class="text-xl font-bold mb-3 text-[#2c3e50]">
              ${getText('step3_title', 'Become pre-approved')}
            </h3>
            <p class="text-gray-600">
              ${getText('step3_description', 'Work with the lender to become pre-approved and start home shopping.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-20 px-6 bg-gradient-to-br from-[#a8c5d1] to-[#8aa8b4]">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-4xl font-bold mb-6 text-[#2c3e50]">
        ${getText('cta_title', 'Find the right loan for you')}
      </h2>
      <p class="text-lg mb-8 text-[#2c3e50]/80">
        ${getText('cta_description', "In today's world, banks and lenders from all over the US can compete for your business. We help make that happen.")}
      </p>
      <a href="${getButton('cta_button', 'PRE-QUALIFY NOW', '#').url}" class="inline-block bg-[#dc3545] hover:bg-[#c82333] text-white px-10 py-4 rounded font-semibold text-lg transition-all duration-300">
        ${getButton('cta_button', 'PRE-QUALIFY NOW', '#').text}
      </a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-white py-12 px-6 border-t border-gray-200">
    <div class="max-w-7xl mx-auto">
      <div class="grid md:grid-cols-3 gap-12">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 bg-[#4a6b7c] rounded flex items-center justify-center">
              <span class="text-white font-bold text-lg">H</span>
            </div>
            <span class="text-xl font-semibold text-[#2c3e50]">
              ${getText('footer_brand', 'HOMELOANGURUS')}
            </span>
          </div>
          <p class="text-gray-600 text-sm whitespace-pre-line">
            ${getText('footer_address', '401 N. Carroll Ave, Suite 116\nSouthaven, TX 76092\nUnited States')}
          </p>
        </div>

        <!-- Privacy -->
        <div>
          <h4 class="font-bold text-[#2c3e50] mb-4">
            ${getText('footer_privacy_title', 'PRIVACY')}
          </h4>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-600 hover:text-[#4a6b7c] text-sm">Terms and Conditions</a></li>
            <li><a href="#" class="text-gray-600 hover:text-[#4a6b7c] text-sm">Privacy Policy</a></li>
            <li><a href="#" class="text-gray-600 hover:text-[#4a6b7c] text-sm">Unsubscribe</a></li>
          </ul>
        </div>

        <!-- About -->
        <div>
          <h4 class="font-bold text-[#2c3e50] mb-4">
            ${getText('footer_about_title', 'ABOUT US')}
          </h4>
          <p class="text-gray-600 text-sm">
            ${getText('footer_about_text', 'HomeLoanGurus.com is not a mortgage lender or mortgage broker and does not directly offer any consumer credit products or services. We connect you with lenders who may be able to help.')}
          </p>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-gray-200 text-center">
        <p class="text-gray-600 text-sm">
          ${getText('footer_copyright', '© 2025 HomeLoanGurus.com All rights reserved')}
        </p>
      </div>
    </div>
  </footer>

  <script>
    // Track button clicks for analytics
    document.querySelectorAll('a[href], button').forEach(element => {
      element.addEventListener('click', () => {
        if (typeof trackButtonClick === 'function') {
          trackButtonClick();
        }
      });
    });
  </script>
</body>
</html>`;
}
