
import { TemplateData } from '@/types/template';

const getMetaTags = (projectName: string) => `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <meta name="description" content="Interactive Quiz">
  <link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&family=Noto+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
`;

const getTailwindCDN = () => `<script src="https://cdn.tailwindcss.com"></script>`;

export const generateQuizNewHTML = (data: TemplateData, projectName: string): string => {
    const getText = (id: string, defaultValue: string) => {
        return data[id]?.text || defaultValue;
    };

    const getImage = (id: string, defaultValue: string) => {
        return data[id]?.image || defaultValue;
    };

    const getButton = (id: string, defaultText: string, defaultUrl: string) => {
        return data[id]?.button || { text: defaultText, url: defaultUrl };
    };

    // Prepare data for the script
    const quizData = {
        questions: [
            {
                id: 1,
                question: getText('q1_question', "What architectural style is primarily characterized by the use of glass, steel, and reinforced concrete in simple geometric forms?"),
                options: [
                    { id: 'A', text: getText('q1_optA', 'Art Deco') },
                    { id: 'B', text: getText('q1_optB', 'Modernism'), correct: true },
                    { id: 'C', text: getText('q1_optC', 'Gothic Revival') },
                    { id: 'D', text: getText('q1_optD', 'Baroque') }
                ]
            },
            {
                id: 2,
                question: getText('q2_question', "Which architectural style is famous for flying buttresses, pointed arches, and stained glass?"),
                options: [
                    { id: 'A', text: getText('q2_optA', 'Romanesque') },
                    { id: 'B', text: getText('q2_optB', 'Gothic'), correct: true },
                    { id: 'C', text: getText('q2_optC', 'Baroque') },
                    { id: 'D', text: getText('q2_optD', 'Renaissance') }
                ]
            },
            {
                id: 3,
                question: getText('q3_question', "Which style emerged in the 1920s featuring geometric shapes, streamlined forms, and decorative motifs?"),
                options: [
                    { id: 'A', text: getText('q3_optA', 'Art Nouveau') },
                    { id: 'B', text: getText('q3_optB', 'Art Deco'), correct: true },
                    { id: 'C', text: getText('q3_optC', 'Brutalism') },
                    { id: 'D', text: getText('q3_optD', 'Bauhaus') }
                ]
            },
            {
                id: 4,
                question: getText('q4_question', "Which famous architect designed the Guggenheim Museum in New York City with its unique spiral ramp?"),
                options: [
                    { id: 'A', text: getText('q4_optA', 'Le Corbusier') },
                    { id: 'B', text: getText('q4_optB', 'Mies van der Rohe') },
                    { id: 'C', text: getText('q4_optC', 'Frank Lloyd Wright'), correct: true },
                    { id: 'D', text: getText('q4_optD', 'Zaha Hadid') }
                ]
            },
            {
                id: 5,
                question: getText('q5_question', "The Parthenon in Athens is a prime example of which classical architectural order?"),
                options: [
                    { id: 'A', text: getText('q5_optA', 'Doric'), correct: true },
                    { id: 'B', text: getText('q5_optB', 'Ionic') },
                    { id: 'C', text: getText('q5_optC', 'Corinthian') },
                    { id: 'D', text: getText('q5_optD', 'Composite') }
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
    .font-display { font-family: 'Spline Sans', 'Noto Sans', sans-serif; }
    /* Basic reset for better consistency */
    button:disabled { cursor: not-allowed; opacity: 0.5; }
  </style>
</head>
<body class="bg-[#f8f8f5] font-display text-[#181811] flex flex-col min-h-screen">

  <!-- App Container -->
  <div id="app" class="flex flex-col min-h-screen">
    
    <!-- Header -->
    <header class="sticky top-0 z-50 w-full border-b border-[#e5e5e0] bg-[#f8f8f5]/80 backdrop-blur-md">
        <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div class="flex items-center gap-2">
                <div class="flex size-8 items-center justify-center rounded-full bg-[#f9f506] text-[#181811]">
                    <span class="material-symbols-outlined text-xl font-bold">photo_camera</span>
                </div>
                <span class="text-lg font-bold tracking-tight">
                    ${getText('brand_name', 'LensLife')}
                </span>
            </div>
            <nav class="hidden md:flex items-center gap-8">
                <a href="#" class="text-sm font-medium hover:text-[#f9f506] transition-colors">${getText('nav_link1', 'Stories')}</a>
                <a href="#" class="text-sm font-medium hover:text-[#f9f506] transition-colors">${getText('nav_link2', 'Gallery')}</a>
                <a href="#" class="text-sm font-medium hover:text-[#f9f506] transition-colors">${getText('nav_link3', 'Artists')}</a>
            </nav>
            <div class="flex items-center gap-4">
                <div class="hidden sm:flex items-center justify-center rounded-full bg-[#f9f506] px-5 py-2 text-sm font-bold text-[#181811] hover:bg-[#f9f506]/90 transition-colors cursor-pointer">
                    ${getText('nav_cta', 'Subscribe')}
                </div>
            </div>
        </div>
    </header>

    <main class="flex-1 w-full">
        <div class="mx-auto max-w-[960px] px-4 py-12 md:px-8 md:py-16 lg:px-0">
            
            <div class="mb-10 text-center">
                <span class="mb-3 inline-block rounded-full bg-[#f9f506]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">
                    Quiz Time
                </span>
                <div class="text-4xl font-black leading-tight tracking-tight text-[#181811] sm:text-5xl md:text-6xl lg:text-[4rem]">
                    ${getText('quiz_title', 'Test Your Knowledge')}
                </div>
                <div class="mt-4 text-lg font-medium text-[#6b6b5f]">
                    ${getText('quiz_subtitle', 'How much do you really know about urban architecture? Take the challenge.')}
                </div>
            </div>

            <!-- Instructions / Hero Area -->
            <div class="mb-12 grid gap-8 md:grid-cols-2 items-stretch">
                <div class="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 h-64 md:h-auto">
                    <img
                        src="${getImage('quiz_hero_image', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCDv8MLJBouY4P_gvjQWA0AiOGslvmAUYR9XcfuZChwCWTVTVizzYBhUx2BgGkJixbOVtO2v-pLSNxV0BzTNTMQHFrpdMEhKFwlsMyojks0IFageTW0PXEHG1RhRcEqDjt7MMLlxEzFLMVYBccJKuRLfp7lABvgWeGjdlPQoAKEMHX5YJalkJ3e6RDi1CiiEmaf_IlJcpW2SoMqOoetAL0x7DURU007p4TU9t4GZZpBs82KC1Feo55h2ZYgQj1qMd9yntpwS0g0DO-')}"
                        alt="Architecture Building"
                        class="h-full w-full object-cover"
                    />
                    <div class="absolute bottom-4 left-4 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                        Architecture 101
                    </div>
                </div>
                <div class="rounded-2xl border border-[#e5e5e0] bg-white p-6 md:p-8 shadow-sm flex flex-col justify-center">
                    <h3 class="mb-4 text-xl font-bold text-[#181811] flex items-center gap-2">
                        <span class="material-symbols-outlined text-[#f9f506]">info</span>
                        ${getText('quiz_intro_title', 'Instructions')}
                    </h3>
                    <div class="mb-6 text-[#6b6b5f]">
                        ${getText('quiz_intro_desc', 'Welcome to the Urban Photography quiz. This short test assesses your understanding of architectural styles and photography techniques.')}
                    </div>
                    <ul class="space-y-4 text-sm font-medium text-[#181811]">
                        <li class="flex items-start gap-3">
                            <div class="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#f0f0eb] text-[#f9f506]">
                                <span class="material-symbols-outlined text-[16px]">format_list_numbered</span>
                            </div>
                            <span class="pt-0.5">${getText('quiz_intro_item1', 'There are 5 multiple-choice questions.')}</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <div class="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#f0f0eb] text-[#f9f506]">
                                <span class="material-symbols-outlined text-[16px]">timer</span>
                            </div>
                            <span class="pt-0.5">${getText('quiz_intro_item2', 'There is no time limit, so take your time.')}</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <div class="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#f0f0eb] text-[#f9f506]">
                                <span class="material-symbols-outlined text-[16px]">star</span>
                            </div>
                            <span class="pt-0.5">${getText('quiz_intro_item3', 'Score at least 4/5 to earn the Urban Expert badge.')}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Quiz/Result Container -->
            <div id="quiz-container">
                <!-- Injected via JS -->
            </div>

        </div>
    </main>

    <footer class="mt-auto border-t border-[#e5e5e0] bg-white py-12">
        <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-8">
            <div class="flex items-center gap-2">
                <div class="size-6 rounded-full bg-[#f9f506]"></div>
                <span class="text-sm font-semibold">© 2023 ContentApp Inc.</span>
            </div>
        </div>
    </footer>
  </div>

  <script>
    const CONFIG = ${JSON.stringify(quizData)};
    const QUESTIONS = CONFIG.questions;
    const TOTAL_QUESTIONS = QUESTIONS.length;
    
    let currentQuestionIndex = 0;
    let selectedAnswers = {}; // { questionId: optionId }
    let showResult = false;

    // DOM Elements
    const quizContainer = document.getElementById('quiz-container');

    function render() {
        if (showResult) {
            renderResult();
        } else {
            renderQuestion();
        }
    }

    function renderQuestion() {
        const currentQuestion = QUESTIONS[currentQuestionIndex];
        const hasSelectedAnswer = !!selectedAnswers[currentQuestion.id];
        const progress = ((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100;

        // Generate options HTML
        let optionsHtml = '';
        currentQuestion.options.forEach(option => {
            const isSelected = selectedAnswers[currentQuestion.id] === option.id;
            
            const containerClass = isSelected 
                ? 'border-[#f9f506] bg-[#f9f506]/5 shadow-md' 
                : 'border-[#e5e5e0] bg-white hover:border-[#f9f506] hover:shadow-md';
                
            const circleClass = isSelected 
                ? 'bg-[#f9f506] text-[#181811]' 
                : 'bg-[#f0f0eb] text-[#181811] group-hover:bg-[#f9f506]';

            const checkMark = isSelected 
                ? '<div class="ml-auto"><span class="material-symbols-outlined text-[#f9f506] text-2xl">check_circle</span></div>' 
                : '';

            optionsHtml += \`
                <div 
                    role="button"
                    onclick="handleOptionSelect('\${option.id}')"
                    class="group flex w-full items-center gap-4 rounded-xl border-2 p-5 text-left transition-all cursor-pointer select-none \${containerClass}"
                >
                    <span class="flex size-8 shrink-0 items-center justify-center rounded-full font-bold transition-colors \${circleClass}">
                        \${option.id}
                    </span>
                    <div class="font-medium text-[#181811] flex-1">
                        \${option.text}
                    </div>
                    \${checkMark}
                </div>
            \`;
        });

        // Generate navigation buttons HTML
        const prevButton = \`
            <button
                onclick="handlePrevious()"
                \${currentQuestionIndex === 0 ? 'disabled' : ''}
                class="flex items-center gap-2 rounded-lg px-6 py-3 font-bold text-[#6b6b5f] transition-colors hover:bg-transparent \${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:text-[#181811] cursor-pointer'}"
            >
                <span class="material-symbols-outlined">arrow_back</span>
                Previous
            </button>
        \`;

        const nextButtonClass = !hasSelectedAnswer
                ? 'bg-[#e5e5e0] cursor-not-allowed opacity-50'
                : 'bg-[#f9f506] hover:bg-[#f9f506]/90 shadow-lg shadow-[#f9f506]/20 hover:shadow-[#f9f506]/30 active:scale-95';

        const nextButtonText = currentQuestionIndex === TOTAL_QUESTIONS - 1 ? 'Finish' : 'Next';

        const nextButton = \`
            <button
                onclick="handleNext()"
                \${!hasSelectedAnswer ? 'disabled' : ''}
                class="flex items-center gap-2 rounded-full px-8 py-3 font-bold text-[#181811] transition-colors \${nextButtonClass}"
            >
                \${nextButtonText}
                <span class="material-symbols-outlined">arrow_forward</span>
            </button>
        \`;
        
        const html = \`
            <div class="mb-8">
                <!-- Progress Bar -->
                <div class="mb-8 h-2 w-full overflow-hidden rounded-full bg-[#e5e5e0]">
                    <div class="h-full rounded-full bg-[#f9f506] transition-all duration-500 ease-out" style="width: \${progress}%"></div>
                </div>

                <!-- Question -->
                <h2 class="mb-8 text-2xl font-bold leading-snug text-[#181811] md:text-3xl">
                    <span class="mr-2">\${currentQuestion.id}.</span>
                    <span class="inline">\${currentQuestion.question}</span>
                </h2>

                <!-- Options -->
                <div class="grid gap-4 md:grid-cols-2">
                    \${optionsHtml}
                </div>

                <!-- Navigation -->
                <div class="flex items-center justify-between border-t border-[#e5e5e0] pt-8 mt-8">
                    \${prevButton}
                    <div class="hidden sm:block text-sm font-bold uppercase tracking-wider text-[#6b6b5f]">
                        Question \${currentQuestionIndex + 1} of \${TOTAL_QUESTIONS}
                    </div>
                    \${nextButton}
                </div>
                <div class="mt-4 text-center sm:hidden text-sm font-bold uppercase tracking-wider text-[#6b6b5f]">
                    Question \${currentQuestionIndex + 1} of \${TOTAL_QUESTIONS}
                </div>
            </div>
        \`;

        quizContainer.innerHTML = html;
    }

    function renderResult() {
        // Calculate score
        let score = 0;
        QUESTIONS.forEach(q => {
            const selected = selectedAnswers[q.id];
            const correct = q.options.find(o => o.correct)?.id;
            if (selected === correct) score++;
        });

        // Use dynamic Result content where applicable
        const resultTitle = "${getText('result_title', 'Congratulations!')}";
        const resultDesc = "${getText('result_text', 'You have successfully completed the Urban Photography Quiz. We hope you learned something new about architecture!')}";
        const resultImage = "${getImage('result_image', 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80')}";
        
        // Button data
        const resultCtaText = "${getButton('result_cta', 'Visit Website', '#').text}";
        const resultCtaUrl = "${getButton('result_cta', 'Visit Website', '#').url}";

        const html = \`
            <div class="mb-8 rounded-2xl bg-white p-8 border border-[#e5e5e0] text-center shadow-xl">
                <span class="material-symbols-outlined text-6xl text-[#f9f506] mb-4">emoji_events</span>
                <div class="text-3xl font-black mb-6 text-[#181811]">\${resultTitle}</div>

                <div class="relative mx-auto mb-8 w-full max-w-md aspect-video overflow-hidden rounded-xl border border-[#e5e5e0]">
                    <img src="\${resultImage}" alt="Result Image" class="h-full w-full object-cover">
                </div>

                <div class="text-xl text-[#6b6b5f] mb-8 max-w-lg mx-auto">
                    \${resultDesc}
                </div>

                <div>
                    <div class="text-xl font-bold mb-8 text-[#181811]">
                        You scored \${score} out of \${TOTAL_QUESTIONS}
                    </div>
                    <div class="flex flex-col items-center gap-4">
                        <a href="\${resultCtaUrl}" target="_blank" class="inline-flex items-center gap-2 rounded-full bg-[#f9f506] px-8 py-3 font-bold text-[#181811] transition-colors hover:bg-[#f9f506]/90 shadow-lg">
                            \${resultCtaText}
                        </a>
                        <button
                            onclick="resetQuiz()"
                            class="text-[#6b6b5f] font-semibold hover:text-[#181811] underline decoration-2 underline-offset-4 transition-colors"
                        >
                            Retake Quiz
                        </button>
                    </div>
                </div>
            </div>
        \`;
        
        quizContainer.innerHTML = html;
    }

    // --- Actions ---

    window.handleOptionSelect = function(optionId) {
        // Need currentQuestion from closure or global
        const currentQ = QUESTIONS[currentQuestionIndex];
        selectedAnswers[currentQ.id] = optionId;
        renderQuestion();
    };

    window.handlePrevious = function() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            renderQuestion();
        }
    };

    window.handleNext = function() {
        if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
            currentQuestionIndex++;
            renderQuestion();
        } else {
            showResult = true;
            renderResult();
        }
    };
    
    window.resetQuiz = function() {
        currentQuestionIndex = 0;
        selectedAnswers = {};
        showResult = false;
        renderQuestion();
    };

    // --- Init ---
    render();

  </script>
</body>
</html>`;
};
