import { TemplateData } from '@/types/template';

const getMetaTags = (projectName: string) => `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <meta name="description" content="Photography Portfolio Quiz">
`;

const getTailwindCDN = () => `<script src="https://cdn.tailwindcss.com"></script>`;

export const generatePhotofolioHTML = (data: TemplateData, projectName: string): string => {
    const getText = (id: string, defaultValue: string) => {
        return data[id]?.text || defaultValue;
    };

    const getButton = (id: string, defaultText: string) => {
        return data[id]?.button?.text || defaultText;
    };

    const getImage = (id: string, defaultSrc: string) => {
        return data[id]?.image || defaultSrc;
    };

    // Pre-calculate all dynamic values to inject into the HTML/JS
    // We need to inject the text for questions and options into the JS logic so the quiz works.

    const quizData = {
        heading: getText('quiz_heading', 'Photography Knowledge Check'),
        questions: [
            {
                q: getText('question_1', 'Question 1 placeholder text?'),
                options: [
                    getText('q1_opt1', 'Option 1'),
                    getText('q1_opt2', 'Option 2'),
                    getText('q1_opt3', 'Option 3'),
                    getText('q1_opt4', 'Option 4')
                ]
            },
            {
                q: getText('question_2', 'Question 2?'),
                options: [
                    getText('q2_opt1', 'Option 1'),
                    getText('q2_opt2', 'Option 2'),
                    getText('q2_opt3', 'Option 3'),
                    getText('q2_opt4', 'Option 4')
                ]
            },
            {
                q: getText('question_3', 'Question 3?'),
                options: [
                    getText('q3_opt1', 'Option 1'),
                    getText('q3_opt2', 'Option 2'),
                    getText('q3_opt3', 'Option 3'),
                    getText('q3_opt4', 'Option 4')
                ]
            },
            {
                q: getText('question_4', 'Question 4?'),
                options: [
                    getText('q4_opt1', 'Option 1'),
                    getText('q4_opt2', 'Option 2'),
                    getText('q4_opt3', 'Option 3'),
                    getText('q4_opt4', 'Option 4')
                ]
            },
            {
                q: getText('question_5', 'Question 5?'),
                options: [
                    getText('q5_opt1', 'Option 1'),
                    getText('q5_opt2', 'Option 2'),
                    getText('q5_opt3', 'Option 3'),
                    getText('q5_opt4', 'Option 4')
                ]
            }
        ]
    };

    return `<!DOCTYPE html>
<html lang="en">
<head>
  ${getMetaTags(projectName)}
  ${getTailwindCDN()}
  <style>
    /* Custom styles to match the React components */
    body {
        font-family: system-ui, -apple-system, sans-serif;
    }
  </style>
</head>
<body class="bg-[#f6f8f8] text-[#101f22]">
  
  <!-- App Container -->
  <div id="app" class="min-h-screen flex flex-col relative overflow-x-hidden">
    
    <!-- Header -->
    <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200/80 px-4 sm:px-10 py-3 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div class="flex items-center gap-4 text-[#101f22]">
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
                <span class="text-sm font-medium leading-normal hover:text-[#13c8ec] transition-colors cursor-pointer" onclick="navigateTo('home')">${getText('nav_link_1', 'Home')}</span>
                <span class="text-sm font-medium leading-normal hover:text-[#13c8ec] transition-colors cursor-pointer" onclick="navigateTo('home')">${getText('nav_link_2', 'Gallery')}</span>
                <span class="text-sm font-medium leading-normal hover:text-[#13c8ec] transition-colors cursor-pointer" onclick="navigateTo('home')">${getText('nav_link_3', 'About')}</span>
                <span class="text-sm font-medium leading-normal hover:text-[#13c8ec] transition-colors cursor-pointer" onclick="navigateTo('home')">${getText('nav_link_4', 'Contact')}</span>
            </div>
            <button onclick="window.location.href='#'" class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#13c8ec] text-black text-sm font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors">
                <span class="truncate">${getButton('nav_cta', 'Get in Touch')}</span>
            </button>
        </div>
    </header>

    <!-- Views Container -->
    <main id="main-content" class="flex-grow flex flex-col">
        <!-- Content injected by JS -->
    </main>

    <!-- Footer -->
    <footer id="footer" class="flex flex-col gap-8 px-5 py-10 text-center border-t border-solid border-gray-200/80 mt-16">
        <div class="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <a class="text-gray-600 text-sm font-normal leading-normal hover:text-[#13c8ec] transition-colors" href="#">Privacy Policy</a>
            <a class="text-gray-600 text-sm font-normal leading-normal hover:text-[#13c8ec] transition-colors" href="#">Terms of Service</a>
            <a class="text-gray-600 text-sm font-normal leading-normal hover:text-[#13c8ec] transition-colors" href="#">Contact Us</a>
        </div>
        <p class="text-gray-500 text-sm font-normal leading-normal">
            ${getText('footer_copyright', '© 2024 PhotoFolio, Inc. All rights reserved.')}
        </p>
    </footer>

  </div>

  <script>
    // --- Data ---
    const CONFIG = ${JSON.stringify(quizData)};
    
    // --- State ---
    let currentView = 'home';
    let currentQuestion = 1;
    let answers = {};
    const totalQuestions = 5;

    // --- DOM Elements ---
    const mainContent = document.getElementById('main-content');
    const footer = document.getElementById('footer');

    // --- Render Functions ---

    function renderHome() {
        footer.style.display = 'flex';
        return \`
            <section class="py-10 sm:py-16 px-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-[960px] mx-auto">
                    <div class="flex flex-col gap-6">
                        <h1 class="text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                            ${getText('hero_title', 'Capturing Moments, Creating Memories')}
                        </h1>
                        <p class="text-base font-normal leading-normal text-gray-600">
                            ${getText('hero_description', "Our passion is to frame the world's beauty through our lenses. This gallery represents a curated collection of our finest work, showcasing diverse subjects and stunning landscapes from across the globe. Each photograph tells a unique story.")}
                        </p>
                        <div class="flex pt-2">
                            <button
                                onclick="startQuiz()"
                                class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-[#13c8ec] text-black text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors"
                            >
                                ${getButton('hero_cta', 'Take Our Quiz')}
                            </button>
                        </div>
                    </div>
                    <div class="w-full">
                         <img 
                            src="${getImage('hero_image', 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1KN39_GDhKQWgQeWM0NYgnkwOa8fwWLB-Pu2HnHvVC8z07JHd4GvRWhAQxTzmoKBxbSHjao4ktyTm8it_v-HNnY_0xc7fmy92YezymxClB2oGVmtahOinzEQfaji9_tF1QcV0dDskPsbxtqvX2rXtHfLVQrH_-GMFw6KnSezJqmdDc1fP4o7BI5nQJJxupI9HXDXbfpIfjBgACt7oN8ukhiWjjsyMVSRLW4mnNL7frfVJsnRpC_c_agCxyVAPmDfqJ7391Jfumyw')}"
                            alt="Hero Image"
                            class="w-full bg-center bg-no-repeat aspect-square sm:aspect-[4/3] bg-cover rounded-xl object-cover"
                         />
                    </div>
                </div>
            </section>
            <section class="px-4 py-8 sm:py-12">
                <div class="max-w-4xl mx-auto space-y-6 text-gray-700">
                    <p class="text-lg leading-relaxed">
                        ${getText('about_text_1', "Below, you'll find a more in-depth look into the techniques and stories behind our photography. We believe that a great photo is more than just a picture; it's a moment frozen in time, an emotion captured, and a story told without words. Our approach combines technical expertise with a keen artistic eye, ensuring that every image is not only visually stunning but also deeply meaningful.")}
                    </p>
                    <p class="text-base leading-relaxed text-gray-600">
                        ${getText('about_text_2', "We travel extensively to find unique perspectives, from the bustling streets of urban jungles to the serene solitude of untouched nature. Each location offers new challenges and opportunities, pushing us to constantly evolve our craft. We utilize state-of-the-art equipment and post-processing techniques to bring out the vibrant colors and intricate details of our subjects. This dedication to quality is evident in every piece we produce. Whether it's a breathtaking landscape, an intimate portrait, or a dynamic abstract shot, our goal is to evoke a sense of wonder and connection with the viewer. Thank you for exploring our portfolio.")}
                    </p>
                </div>
            </section>
        \`;
    }

    function renderQuiz() {
        footer.style.display = 'none'; // Hide footer in quiz
        
        const questionData = CONFIG.questions[currentQuestion - 1];
        
        // Progress bars
        let progressHtml = '<div class="flex gap-2">';
        for(let i=1; i<=5; i++) {
            const bgClass = i <= currentQuestion ? 'bg-[#13c8ec]' : 'bg-gray-200';
            progressHtml += \`<div class="h-2 flex-1 rounded-full \${bgClass}"></div>\`;
        }
        progressHtml += '</div>';

        // Options
        let optionsHtml = '<div class="space-y-3">';
        questionData.options.forEach((opt, idx) => {
            const optIdx = idx + 1;
            const isSelected = answers[currentQuestion] === optIdx;
            const borderClass = isSelected ? 'border-[#13c8ec] bg-[#13c8ec]/10' : 'border-gray-200 hover:border-[#13c8ec]/50';
            const circleBorder = isSelected ? 'border-[#13c8ec] bg-[#13c8ec]' : 'border-gray-400';
            const dot = isSelected ? '<div class="w-2 h-2 bg-black rounded-full"></div>' : '';

            optionsHtml += \`
                <div onclick="handleOptionSelect(\${optIdx})" 
                     class="p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 \${borderClass}">
                    <div class="w-5 h-5 rounded-full border flex items-center justify-center \${circleBorder}">
                        \${dot}
                    </div>
                    <span class="flex-1">\${opt}</span>
                </div>
            \`;
        });
        optionsHtml += '</div>';

        const btnText = currentQuestion === totalQuestions ? 'Submit Answers' : 'Next Question';
        const btnDisabled = !answers[currentQuestion] ? 'opacity-50 cursor-not-allowed' : '';
        const btnAction = !answers[currentQuestion] ? '' : 'onclick="handleNextQuestion()"';

        return \`
            <div class="flex-grow flex flex-col items-center justify-center py-20 px-4 min-h-[600px]">
                <div class="max-w-2xl w-full">
                    <div class="mb-8">
                        <h2 class="text-2xl font-bold mb-2 text-[#13c8ec]">
                            \${CONFIG.heading}
                        </h2>
                        \${progressHtml}
                    </div>

                    <div class="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                        <h3 class="text-xl font-bold mb-6">
                            <span class="text-[#13c8ec] mr-2">Q\${currentQuestion}.</span>
                            <span>\${questionData.q}</span>
                        </h3>

                        \${optionsHtml}

                        <div class="mt-8 flex justify-end">
                            <button
                                \${btnAction}
                                class="px-8 py-3 bg-[#13c8ec] hover:bg-[#13c8ec]/90 text-black font-bold rounded-xl transition-colors \${btnDisabled}"
                            >
                                \${btnText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        \`;
    }

    function renderResult() {
        footer.style.display = 'none';
        return \`
             <div class="flex-grow flex flex-col relative transition-colors duration-300">
                <div class="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center">
                    <div class="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center py-12">
                        <div class="bg-white/60 p-2 rounded-full shadow-lg backdrop-blur-sm mb-6">
                            <div class="bg-[#13c8ec]/20 p-4 rounded-full flex items-center justify-center">
                                <svg class="w-12 h-12 text-[#13c8ec] font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight drop-shadow-sm">
                            ${getText('result_title', 'Congratulations!')}
                        </h1>
                        <div class="space-y-4 mb-6 max-w-2xl">
                            <p class="text-gray-600 text-lg md:text-xl leading-relaxed">
                                ${getText('result_text', "You've successfully completed the quiz.")}
                            </p>
                            <p class="text-gray-500 text-sm md:text-base leading-relaxed max-w-md mx-auto">
                                ${getText('result_subtext', 'We hope you enjoyed exploring our portfolio and learning more about our work. Feel free to reach out to us for any photography needs!')}
                            </p>
                        </div>
                        <div class="mb-8">
                             <img 
                                src="${getImage('result_image', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAWpT6ohLIiewnUnTYmZXUgMQAD66hCisgMKJk1lmE0ISp6JMCVqXLz_vix2NxzVIBPNBLcPRj3LBZEBHcS8i73o-3ONV019ilI7_gFBSiC8oT0DLF2dXUKWJhlGHJeMvrcbYntV7Mk4Pz5ubzJWczsrpXGqJwpXeWoCUG5OkT-K5OsJaC4674D9vdLWyVnH5K29LEX8IWWcIbU0BZnbdgymn6a9rGou8JPrVEB6nk0EvcQ_CoTHmzACSiNyizzEblnDDtorL7c_I')}"
                                class="w-full max-w-2xl aspect-video object-cover rounded-xl shadow-2xl border-2 border-white/20 transform hover:scale-105 transition-transform duration-300"
                             />
                        </div>
                        <div class="group relative w-full sm:w-auto flex justify-center">
                            <button
                                onclick="navigateTo('home')"
                                class="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-gray-900 transition-all duration-200 bg-[#13c8ec] rounded-xl hover:bg-[#0ebacb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#13c8ec] focus:ring-offset-gray-900 shadow-lg shadow-[#13c8ec]/30 hover:shadow-[#13c8ec]/50 hover:-translate-y-0.5"
                            >
                               ${getButton('result_btn', 'Back to Home')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        \`;
    }

    function render() {
        if(currentView === 'home') mainContent.innerHTML = renderHome();
        else if(currentView === 'quiz') mainContent.innerHTML = renderQuiz();
        else if(currentView === 'result') mainContent.innerHTML = renderResult();
        
        // Scroll to top on view change
        window.scrollTo(0, 0);
    }

    // --- Actions ---

    window.navigateTo = function(view) {
        currentView = view;
        render();
    };

    window.startQuiz = function() {
        currentView = 'quiz';
        currentQuestion = 1;
        answers = {};
        render();
    };

    window.handleOptionSelect = function(optIdx) {
        answers[currentQuestion] = optIdx;
        render(); // Re-render to show selection
    };

    window.handleNextQuestion = function() {
        if(currentQuestion < totalQuestions) {
            currentQuestion++;
            render();
        } else {
            currentView = 'result';
            render();
        }
    };

    // --- Init ---
    render();

  </script>
</body>
</html>`;
};
