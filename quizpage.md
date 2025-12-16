this is quiz landing page


<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Content Page with Photo</title>
<link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&amp;family=Noto+Sans:wght@400;500;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#f9f506",
                        "background-light": "#f8f8f5",
                        "background-dark": "#23220f",
                    },
                    fontFamily: {
                        "display": ["Spline Sans", "Noto Sans", "sans-serif"]
                    },
                    borderRadius: { "DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px" },
                },
            },
        }
    </script>
</head>
<body class="bg-background-light dark:bg-background-dark font-display text-[#181811] dark:text-white transition-colors duration-200">
<div class="relative flex min-h-screen w-full flex-col overflow-x-hidden">
<!-- Header Section -->
<header class="sticky top-0 z-50 w-full border-b border-[#e5e5e0] dark:border-[#3a3a30] bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
<div class="flex items-center gap-2">
<div class="flex size-8 items-center justify-center rounded-full bg-primary text-[#181811]">
<span class="material-symbols-outlined text-xl font-bold">photo_camera</span>
</div>
<span class="text-lg font-bold tracking-tight">LensLife</span>
</div>
<nav class="hidden md:flex items-center gap-8">
<a class="text-sm font-medium hover:text-primary transition-colors" href="#">Stories</a>
<a class="text-sm font-medium hover:text-primary transition-colors" href="#">Gallery</a>
<a class="text-sm font-medium hover:text-primary transition-colors" href="#">Artists</a>
</nav>
<div class="flex items-center gap-4">
<button class="hidden sm:flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-bold text-[#181811] hover:bg-primary/90 transition-colors">
                        Subscribe
                    </button>
<button class="flex md:hidden p-2 text-[#181811] dark:text-white">
<span class="material-symbols-outlined">menu</span>
</button>
</div>
</div>
</header>
<!-- Main Content Area -->
<main class="flex-1">
<div class="mx-auto max-w-[960px] px-4 py-12 md:px-8 md:py-16 lg:px-0">
<!-- Hero Headline -->
<div class="mb-10 text-center">
<span class="mb-3 inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-black dark:text-primary">
                        Featured Story
                    </span>
<h1 class="text-4xl font-black leading-tight tracking-tight text-[#181811] dark:text-white sm:text-5xl md:text-6xl lg:text-[4rem]">
                        Capturing the Urban Silence
                    </h1>
<p class="mt-4 text-lg font-medium text-[#6b6b5f] dark:text-[#a1a190]">
                        Exploring the quiet moments in a bustling city before the world wakes up.
                    </p>
</div>
<!-- Feature Image Container -->
<div class="relative mb-12 overflow-hidden rounded-xl shadow-xl ring-1 ring-black/5 dark:ring-white/10">
<div class="aspect-[16/10] w-full bg-gray-200 dark:bg-gray-800">
<!-- Image with Overlay for Depth -->
<div class="h-full w-full bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-[1.02]" data-alt="Modern minimalist architecture building in city" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBCDv8MLJBouY4P_gvjQWA0AiOGslvmAUYR9XcfuZChwCWTVTVizzYBhUx2BgGkJixbOVtO2v-pLSNxV0BzTNTMQHFrpdMEhKFwlsMyojks0IFageTW0PXEHG1RhRcEqDjt7MMLlxEzFLMVYBccJKuRLfp7lABvgWeGjdlPQoAKEMHX5YJalkJ3e6RDi1CiiEmaf_IlJcpW2SoMqOoetAL0x7DURU007p4TU9t4GZZpBs82KC1Feo55h2ZYgQj1qMd9yntpwS0g0DO-");'>
</div>
</div>
<!-- Caption Overlay -->
<div class="absolute bottom-4 right-4 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold text-black backdrop-blur-sm dark:bg-black/70 dark:text-white">
<span class="flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">location_on</span>
                            New York, NY
                        </span>
</div>
</div>
<!-- Content Block -->
<div class="mx-auto max-w-prose">
<!-- Meta Data Chips -->
<div class="mb-8 flex flex-wrap gap-3">
<div class="flex items-center gap-2 rounded-full bg-[#f0f0eb] dark:bg-[#33332a] px-4 py-1.5 transition-colors hover:bg-primary hover:text-black">
<span class="material-symbols-outlined text-[18px]">calendar_today</span>
<span class="text-sm font-medium">Oct 24, 2023</span>
</div>
<div class="flex items-center gap-2 rounded-full bg-[#f0f0eb] dark:bg-[#33332a] px-4 py-1.5 transition-colors hover:bg-primary hover:text-black">
<span class="material-symbols-outlined text-[18px]">person</span>
<span class="text-sm font-medium">By Alex Chen</span>
</div>
<div class="flex items-center gap-2 rounded-full bg-[#f0f0eb] dark:bg-[#33332a] px-4 py-1.5 transition-colors hover:bg-primary hover:text-black">
<span class="material-symbols-outlined text-[18px]">shutter_speed</span>
<span class="text-sm font-medium">f/8.0 • 1/200s</span>
</div>
</div>
<!-- Body Text -->
<div class="prose prose-lg prose-stone dark:prose-invert text-[#181811] dark:text-[#e0e0d0] leading-relaxed">
<p class="first-letter:float-left first-letter:mr-3 first-letter:text-5xl first-letter:font-bold first-letter:text-primary">
                            In the heart of the metropolis, silence is a rare commodity. This series explores the fleeting moments of calm found in the early hours of the morning, where the architecture stands stark against the pale sky. The interplay of light and shadow reveals a different character of the city, one that is often missed in the daily rush. 
                        </p>
<p class="mt-6">
                            This photograph captures the essence of that stillness, freezing a moment of tranquility amidst the potential for urban chaos. The sharp lines of the building contrast with the soft, diffused morning light, creating a visual harmony that speaks to the duality of city life. It invites the viewer to pause, breathe, and find their own quiet corner in the concrete jungle.
                        </p>
</div>
<!-- Tags -->
<div class="mt-12 flex flex-wrap gap-2 border-t border-[#e5e5e0] dark:border-[#3a3a30] pt-8">
<span class="rounded-full border border-[#e5e5e0] dark:border-[#3a3a30] px-4 py-1 text-sm font-medium hover:bg-primary hover:border-primary hover:text-black cursor-pointer transition-colors">#Architecture</span>
<span class="rounded-full border border-[#e5e5e0] dark:border-[#3a3a30] px-4 py-1 text-sm font-medium hover:bg-primary hover:border-primary hover:text-black cursor-pointer transition-colors">#Minimalism</span>
<span class="rounded-full border border-[#e5e5e0] dark:border-[#3a3a30] px-4 py-1 text-sm font-medium hover:bg-primary hover:border-primary hover:text-black cursor-pointer transition-colors">#UrbanPhotography</span>
</div>
</div>
</div>
</main>
<!-- Footer -->
<footer class="mt-auto border-t border-[#e5e5e0] dark:border-[#3a3a30] bg-white dark:bg-[#1a1a15] py-12">
<div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-8">
<div class="flex items-center gap-2">
<div class="size-6 rounded-full bg-primary"></div>
<span class="text-sm font-semibold">© 2023 ContentApp Inc.</span>
</div>
<div class="flex gap-6">
<a class="text-[#6b6b5f] hover:text-primary dark:text-[#a1a190] transition-colors" href="#">
<span class="sr-only">Twitter</span>
<svg aria-hidden="true" class="h-5 w-5" fill="currentColor" viewbox="0 0 24 24">
<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
</svg>
</a>
<a class="text-[#6b6b5f] hover:text-primary dark:text-[#a1a190] transition-colors" href="#">
<span class="sr-only">Instagram</span>
<svg aria-hidden="true" class="h-5 w-5" fill="currentColor" viewbox="0 0 24 24">
<path clip-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.373c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" fill-rule="evenodd"></path>
</svg>
</a>
</div>
</div>
</footer>
</div>
</body></html>




this is quiz page


<!DOCTYPE html>
<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Content Page with Quiz</title>
<link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&amp;family=Noto+Sans:wght@400;500;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#f9f506",
                        "background-light": "#f8f8f5",
                        "background-dark": "#23220f",
                    },
                    fontFamily: {
                        "display": ["Spline Sans", "Noto Sans", "sans-serif"]
                    },
                    borderRadius: { "DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px" },
                },
            },
        }
    </script>
</head>
<body class="bg-background-light dark:bg-background-dark font-display text-[#181811] dark:text-white transition-colors duration-200">
<div class="relative flex min-h-screen w-full flex-col overflow-x-hidden">
<header class="sticky top-0 z-50 w-full border-b border-[#e5e5e0] dark:border-[#3a3a30] bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
<div class="flex items-center gap-2">
<div class="flex size-8 items-center justify-center rounded-full bg-primary text-[#181811]">
<span class="material-symbols-outlined text-xl font-bold">photo_camera</span>
</div>
<span class="text-lg font-bold tracking-tight">LensLife</span>
</div>
<nav class="hidden md:flex items-center gap-8">
<a class="text-sm font-medium hover:text-primary transition-colors" href="#">Stories</a>
<a class="text-sm font-medium hover:text-primary transition-colors" href="#">Gallery</a>
<a class="text-sm font-medium hover:text-primary transition-colors" href="#">Artists</a>
</nav>
<div class="flex items-center gap-4">
<button class="hidden sm:flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-bold text-[#181811] hover:bg-primary/90 transition-colors">
                        Subscribe
                    </button>
<button class="flex md:hidden p-2 text-[#181811] dark:text-white">
<span class="material-symbols-outlined">menu</span>
</button>
</div>
</div>
</header>
<main class="flex-1">
<div class="mx-auto max-w-[960px] px-4 py-12 md:px-8 md:py-16 lg:px-0">
<div class="mb-10 text-center">
<span class="mb-3 inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-black dark:text-primary">
                        Quiz Time
                    </span>
<h1 class="text-4xl font-black leading-tight tracking-tight text-[#181811] dark:text-white sm:text-5xl md:text-6xl lg:text-[4rem]">
                        Test Your Knowledge
                    </h1>
<p class="mt-4 text-lg font-medium text-[#6b6b5f] dark:text-[#a1a190]">
                        How much do you really know about urban architecture? Take the challenge.
                    </p>
</div>
<div class="mb-12 grid gap-8 md:grid-cols-2 items-stretch">
<div class="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 h-64 md:h-auto">
<div class="h-full w-full bg-cover bg-center" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBCDv8MLJBouY4P_gvjQWA0AiOGslvmAUYR9XcfuZChwCWTVTVizzYBhUx2BgGkJixbOVtO2v-pLSNxV0BzTNTMQHFrpdMEhKFwlsMyojks0IFageTW0PXEHG1RhRcEqDjt7MMLlxEzFLMVYBccJKuRLfp7lABvgWeGjdlPQoAKEMHX5YJalkJ3e6RDi1CiiEmaf_IlJcpW2SoMqOoetAL0x7DURU007p4TU9t4GZZpBs82KC1Feo55h2ZYgQj1qMd9yntpwS0g0DO-");'></div>
<div class="absolute bottom-4 left-4 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                            Architecture 101
                        </div>
</div>
<div class="rounded-2xl border border-[#e5e5e0] bg-white p-6 md:p-8 shadow-sm dark:border-[#3a3a30] dark:bg-[#1a1a15] flex flex-col justify-center">
<h3 class="mb-4 text-xl font-bold text-[#181811] dark:text-white flex items-center gap-2">
<span class="material-symbols-outlined text-primary">info</span>
                            Instructions
                        </h3>
<p class="mb-6 text-[#6b6b5f] dark:text-[#a1a190]">
                            Welcome to the Urban Photography quiz. This short test assesses your understanding of architectural styles and photography techniques.
                        </p>
<ul class="space-y-4 text-sm font-medium text-[#181811] dark:text-white">
<li class="flex items-start gap-3">
<div class="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#f0f0eb] dark:bg-[#33332a] text-primary">
<span class="material-symbols-outlined text-[16px]">format_list_numbered</span>
</div>
<span class="pt-0.5">There are 5 multiple-choice questions.</span>
</li>
<li class="flex items-start gap-3">
<div class="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#f0f0eb] dark:bg-[#33332a] text-primary">
<span class="material-symbols-outlined text-[16px]">timer</span>
</div>
<span class="pt-0.5">There is no time limit, so take your time.</span>
</li>
<li class="flex items-start gap-3">
<div class="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#f0f0eb] dark:bg-[#33332a] text-primary">
<span class="material-symbols-outlined text-[16px]">star</span>
</div>
<span class="pt-0.5">Score at least 4/5 to earn the Urban Expert badge.</span>
</li>
</ul>
</div>
</div>
<div class="mb-8">
<div class="mb-8 h-2 w-full overflow-hidden rounded-full bg-[#e5e5e0] dark:bg-[#3a3a30]">
<div class="h-full w-1/5 rounded-full bg-primary transition-all duration-500 ease-out"></div>
</div>
<h2 class="mb-8 text-2xl font-bold leading-snug text-[#181811] dark:text-white md:text-3xl">
                        1. What architectural style is primarily characterized by the use of glass, steel, and reinforced concrete in simple geometric forms?
                    </h2>
<div class="grid gap-4 md:grid-cols-2">
<button class="group flex w-full items-center gap-4 rounded-xl border-2 border-[#e5e5e0] bg-white p-5 text-left transition-all hover:border-primary hover:shadow-md active:scale-[0.99] dark:border-[#3a3a30] dark:bg-[#1a1a15] dark:hover:border-primary">
<span class="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f0f0eb] font-bold text-[#181811] transition-colors group-hover:bg-primary dark:bg-[#33332a] dark:text-white dark:group-hover:text-black">A</span>
<span class="font-medium text-[#181811] dark:text-white">Art Deco</span>
</button>
<button class="group relative flex w-full items-center gap-4 rounded-xl border-2 border-primary bg-primary/5 p-5 text-left shadow-md transition-all dark:bg-primary/10">
<span class="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-[#181811]">B</span>
<span class="font-medium text-[#181811] dark:text-white">Modernism</span>
<div class="absolute right-4 top-1/2 -translate-y-1/2">
<span class="material-symbols-outlined text-primary text-2xl">check_circle</span>
</div>
</button>
<button class="group flex w-full items-center gap-4 rounded-xl border-2 border-[#e5e5e0] bg-white p-5 text-left transition-all hover:border-primary hover:shadow-md active:scale-[0.99] dark:border-[#3a3a30] dark:bg-[#1a1a15] dark:hover:border-primary">
<span class="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f0f0eb] font-bold text-[#181811] transition-colors group-hover:bg-primary dark:bg-[#33332a] dark:text-white dark:group-hover:text-black">C</span>
<span class="font-medium text-[#181811] dark:text-white">Gothic Revival</span>
</button>
<button class="group flex w-full items-center gap-4 rounded-xl border-2 border-[#e5e5e0] bg-white p-5 text-left transition-all hover:border-primary hover:shadow-md active:scale-[0.99] dark:border-[#3a3a30] dark:bg-[#1a1a15] dark:hover:border-primary">
<span class="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f0f0eb] font-bold text-[#181811] transition-colors group-hover:bg-primary dark:bg-[#33332a] dark:text-white dark:group-hover:text-black">D</span>
<span class="font-medium text-[#181811] dark:text-white">Baroque</span>
</button>
</div>
</div>
<div class="flex items-center justify-between border-t border-[#e5e5e0] pt-8 dark:border-[#3a3a30]">
<button class="flex items-center gap-2 rounded-lg px-6 py-3 font-bold text-[#6b6b5f] opacity-50 transition-colors cursor-not-allowed hover:bg-transparent dark:text-[#a1a190]" disabled="">
<span class="material-symbols-outlined">arrow_back</span>
                        Previous
                    </button>
<div class="hidden sm:block text-sm font-bold uppercase tracking-wider text-[#6b6b5f] dark:text-[#a1a190]">
                        Question 1 of 5
                    </div>
<button class="flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-bold text-[#181811] transition-colors hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95">
                        Next
                        <span class="material-symbols-outlined">arrow_forward</span>
</button>
</div>
<div class="mt-4 text-center sm:hidden text-sm font-bold uppercase tracking-wider text-[#6b6b5f] dark:text-[#a1a190]">
                    Question 1 of 5
                </div>
</div>
</main>
<footer class="mt-auto border-t border-[#e5e5e0] dark:border-[#3a3a30] bg-white dark:bg-[#1a1a15] py-12">
<div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-8">
<div class="flex items-center gap-2">
<div class="size-6 rounded-full bg-primary"></div>
<span class="text-sm font-semibold">© 2023 ContentApp Inc.</span>
</div>
<div class="flex gap-6">
<a class="text-[#6b6b5f] hover:text-primary dark:text-[#a1a190] transition-colors" href="#">
<span class="sr-only">Twitter</span>
<svg aria-hidden="true" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
</svg>
</a>
<a class="text-[#6b6b5f] hover:text-primary dark:text-[#a1a190] transition-colors" href="#">
<span class="sr-only">Instagram</span>
<svg aria-hidden="true" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
<path clip-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.373c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" fill-rule="evenodd"></path>
</svg>
</a>
</div>
</div>
</footer>
</div>

</body></html>