
import { TemplateData } from '@/types/template';

export const generateSuperClipsHTML = (data: TemplateData, projectName: string): string => {
    const getText = (id: string, defaultValue: string) => {
        return data[id]?.text || defaultValue;
    };

    const getButton = (id: string, defaultText: string, defaultUrl: string) => {
        return {
            text: data[id]?.button?.text || defaultText,
            url: data[id]?.button?.url || defaultUrl,
        };
    };

    const navLogo = getText('nav_logo', 'SuperClips');
    const navLogin = getText('nav_login', 'Log in');
    const navSignup = getButton('nav_signup', 'Sign Up', '#');
    const heroBadge = getText('hero_badge', 'AI Engine 2.0 Live');
    const heroHeadline = getText('hero_headline', '1 Long Video.');
    const heroSubheadline = getText('hero_subheadline', '10 Viral Shorts.');
    const heroCta = getButton('hero_cta', 'Create Clips for Free', '#');
    const heroVirality = getText('hero_stats_virality', '98/100 High');
    const trustedText = getText('trusted_text', 'Trusted by 12,000+ Creators');
    const struggleTitle = getText('struggle_title', 'Video editing is killing your growth.');
    const struggleDesc = getText('struggle_desc', 'You spend hours recording, but the editing process drains your soul. Manual clipping is slow, expensive, and complicated.');
    const smartTitle = getText('smart_title', 'The Smart Way to Create Content');
    const stepsTitle = getText('steps_title', 'From YouTube to TikTok in 3 Steps');
    const guaranteeTitle = getText('guarantee_title', '30-Day Money-Back Guarantee');
    const guaranteeText = getText('guarantee_text', "If you don't save at least 10 hours of editing time in your first month, we'll refund your subscription in full. No questions asked.");
    const stickyCta = getButton('sticky_cta', 'Get Started', '#');

    return `<!DOCTYPE html>
<html class="dark" lang="en">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>${projectName} - SuperClips AI</title>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com" rel="preconnect"/>
    <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&amp;display=swap" rel="stylesheet"/>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <script>
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#0dccf2",
                        "primary-hover": "#0bbbd6",
                        "background-light": "#f5f8f8",
                        "background-dark": "#0a1518",
                        "surface-dark": "#112024",
                        "surface-highlight": "#192e33",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"],
                        "sans": ["Inter", "sans-serif"]
                    },
                    borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "2xl": "1rem", "full": "9999px"},
                },
            },
        }
    </script>
    <style>
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .glass-panel {
            background: rgba(17, 32, 36, 0.7);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        body {
            min-height: max(884px, 100dvh);
        }
        .safe-area-bottom {
            padding-bottom: env(safe-area-inset-bottom, 20px);
        }
    </style>
</head>
<body class="bg-background-dark text-white font-display antialiased selection:bg-primary selection:text-background-dark pb-28">
    <div class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background-dark/80 backdrop-blur-md border-b border-white/5">
        <div class="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary" style="font-size: 28px;">auto_videocam</span>
                <h2 class="text-white text-lg font-bold leading-tight tracking-tight">${navLogo}</h2>
            </div>
            <div class="flex items-center justify-end gap-4">
                <a class="text-gray-400 text-sm font-semibold hover:text-white transition-colors" href="#">${navLogin}</a>
                <a class="bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors" href="${navSignup.url}">${navSignup.text}</a>
            </div>
        </div>
    </div>
    <div class="max-w-md mx-auto pt-16 bg-background-dark overflow-hidden">
        <div class="relative pt-12 pb-16 px-4 overflow-hidden">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div class="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
            <div class="relative z-10 flex flex-col items-center text-center gap-6">
                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-highlight border border-white/10 shadow-lg shadow-black/20">
                    <span class="relative flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span class="text-[11px] font-bold text-gray-300 uppercase tracking-wider">${heroBadge}</span>
                </div>
                <h1 class="text-4xl/[1.1] font-black tracking-tight text-white sm:text-5xl">
                    ${heroHeadline}<br/>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-cyan-300">${heroSubheadline}</span>
                </h1>
                <p class="text-gray-400 text-base font-medium leading-relaxed max-w-xs mx-auto">
                    Stop editing manually. Our AI identifies viral moments, adds captions, and reframes clips for TikTok &amp; Reels in seconds.
                </p>
                <div class="flex flex-col gap-3 w-full max-w-xs mt-2">
                    <a href="${heroCta.url}" class="flex w-full cursor-pointer items-center justify-center rounded-xl h-14 bg-primary hover:bg-primary-hover transition-all text-background-dark text-lg font-bold shadow-[0_0_25px_rgba(13,204,242,0.25)] hover:shadow-[0_0_35px_rgba(13,204,242,0.4)] hover:-translate-y-0.5">
                        ${heroCta.text}
                    </a>
                    <div class="flex items-center justify-center gap-2 text-xs text-gray-500 font-medium">
                        <span class="material-symbols-outlined text-sm">check</span> No credit card required
                        <span class="w-1 h-1 bg-gray-700 rounded-full"></span>
                        <span class="material-symbols-outlined text-sm">check</span> 3 free clips
                    </div>
                </div>
                <div class="mt-8 relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-surface-dark group">
                    <div class="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-10"></div>
                    <div class="w-full h-full bg-cover bg-center" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBdqd-C9gJsVq2XghU4m4QJCmDBZsxLypYFSN_FCAOhCjwZCUL8ZKIZPTiDEbfDcrcuB5y4l1xIpfFMSmeFdGWP-SSa6LtPiWydiazGwRCGmUcJpku_W2robbXPzWutKYZjobsI9UqKZ3qNN_dIcvmG-enK9u-YZlWoUFBEa2ZyzpS2plrH5-QPfWhM7A-dN9x0lQ2RX3ltwoVAc8OCZ4iKx-V1OpQJt4aRL81-M98D9aEAXQIHtTQHMx-lwg27Svyc4CbjDTsml0I"); opacity: 0.6;'></div>
                    <div class="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end">
                        <div class="bg-surface-dark/90 backdrop-blur border border-white/10 p-3 rounded-xl flex items-center gap-3 animate-bounce shadow-lg" style="animation-duration: 3s;">
                            <span class="material-symbols-outlined text-green-400">trending_up</span>
                            <div class="flex flex-col text-left">
                                <span class="text-[10px] text-gray-400 uppercase font-bold">Virality Score</span>
                                <span class="text-sm font-bold text-white">${heroVirality}</span>
                            </div>
                        </div>
                    </div>
                    <div class="absolute inset-0 flex items-center justify-center z-20">
                        <div class="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl">
                            <span class="material-symbols-outlined text-4xl ml-1">play_arrow</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="border-y border-white/5 bg-surface-dark/50 py-6 overflow-hidden">
            <p class="text-center text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-5">${trustedText}</p>
            <div class="flex overflow-x-auto no-scrollbar gap-8 px-6 items-center opacity-40 grayscale">
                <div class="shrink-0 flex items-center gap-2">
                    <span class="material-symbols-outlined text-2xl">diamond</span>
                    <span class="font-bold text-base">Gemini</span>
                </div>
                <div class="shrink-0 flex items-center gap-2">
                    <span class="material-symbols-outlined text-2xl">bolt</span>
                    <span class="font-bold text-base">Flash</span>
                </div>
                <div class="shrink-0 flex items-center gap-2">
                    <span class="material-symbols-outlined text-2xl">auto_awesome</span>
                    <span class="font-bold text-base">Spark</span>
                </div>
                <div class="shrink-0 flex items-center gap-2">
                    <span class="material-symbols-outlined text-2xl">rocket_launch</span>
                    <span class="font-bold text-base">Rocket</span>
                </div>
            </div>
        </div>
        <div class="px-5 py-16">
            <div class="flex flex-col gap-3 mb-10">
                <span class="text-red-400 font-bold tracking-wider text-xs uppercase">The Struggle</span>
                <h2 class="text-3xl font-bold text-white leading-tight">${struggleTitle}</h2>
                <p class="text-gray-400 text-sm leading-relaxed">
                    ${struggleDesc}
                </p>
            </div>
            <div class="space-y-4">
                <div class="glass-panel p-5 rounded-xl flex items-start gap-4 hover:border-red-500/30 transition-colors group">
                    <div class="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0 group-hover:bg-red-500/20 transition-colors">
                        <span class="material-symbols-outlined text-red-400">schedule</span>
                    </div>
                    <div>
                        <h3 class="font-bold text-white mb-1">It takes too much time</h3>
                        <p class="text-sm text-gray-400">Finding the right clips and subtitling them takes 4+ hours per video.</p>
                    </div>
                </div>
                <div class="glass-panel p-5 rounded-xl flex items-start gap-4 hover:border-red-500/30 transition-colors group">
                    <div class="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0 group-hover:bg-red-500/20 transition-colors">
                        <span class="material-symbols-outlined text-red-400">payments</span>
                    </div>
                    <div>
                        <h3 class="font-bold text-white mb-1">Editors are expensive</h3>
                        <p class="text-sm text-gray-400">Hiring a pro editor costs $50-$100 per short. It adds up fast.</p>
                    </div>
                </div>
                <div class="glass-panel p-5 rounded-xl flex items-start gap-4 hover:border-red-500/30 transition-colors group">
                    <div class="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0 group-hover:bg-red-500/20 transition-colors">
                        <span class="material-symbols-outlined text-red-400">sentiment_dissatisfied</span>
                    </div>
                    <div>
                        <h3 class="font-bold text-white mb-1">Complex tools</h3>
                        <p class="text-sm text-gray-400">Premiere Pro has a steep learning curve you don't have time for.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-surface-dark py-16 px-5 border-t border-white/5 relative overflow-hidden">
            <div class="absolute inset-0 bg-[url('https://placeholder.pics/svg/100/112024/192e33/grid-pattern')] opacity-20 bg-fixed"></div>
            <div class="relative z-10">
                <div class="text-center mb-10">
                    <div class="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-primary to-blue-600 shadow-lg shadow-primary/20 mb-4">
                        <span class="material-symbols-outlined text-background-dark text-3xl">auto_fix_high</span>
                    </div>
                    <h2 class="text-3xl font-black text-white mb-4">
                        ${smartTitle}
                    </h2>
                    <p class="text-gray-400 text-sm">SuperClips handles the boring stuff so you can focus on creating.</p>
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div class="bg-background-dark p-4 rounded-xl border border-white/5 flex flex-col items-center text-center gap-3 hover:border-primary/50 transition-colors">
                        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <span class="material-symbols-outlined">smart_toy</span>
                        </div>
                        <div>
                            <h4 class="font-bold text-white text-sm">AI Curation</h4>
                            <p class="text-xs text-gray-500 mt-1">Finds funny &amp; engaging moments auto-magically.</p>
                        </div>
                    </div>
                    <div class="bg-background-dark p-4 rounded-xl border border-white/5 flex flex-col items-center text-center gap-3 hover:border-primary/50 transition-colors">
                        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <span class="material-symbols-outlined">subtitles</span>
                        </div>
                        <div>
                            <h4 class="font-bold text-white text-sm">Active Captions</h4>
                            <p class="text-xs text-gray-500 mt-1">98% accurate subtitles animated like the pros.</p>
                        </div>
                    </div>
                    <div class="bg-background-dark p-4 rounded-xl border border-white/5 flex flex-col items-center text-center gap-3 hover:border-primary/50 transition-colors">
                        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <span class="material-symbols-outlined">crop_portrait</span>
                        </div>
                        <div>
                            <h4 class="font-bold text-white text-sm">Face Tracking</h4>
                            <p class="text-xs text-gray-500 mt-1">Keeps the speaker centered in vertical format.</p>
                        </div>
                    </div>
                    <div class="bg-background-dark p-4 rounded-xl border border-white/5 flex flex-col items-center text-center gap-3 hover:border-primary/50 transition-colors">
                        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <span class="material-symbols-outlined">trending_up</span>
                        </div>
                        <div>
                            <h4 class="font-bold text-white text-sm">Virality Score</h4>
                            <p class="text-xs text-gray-500 mt-1">AI predicts which clips will go viral.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="py-16 px-5">
            <h2 class="text-2xl font-bold text-white text-center mb-12">${stepsTitle}</h2>
            <div class="relative flex flex-col gap-10 pl-2">
                <div class="absolute left-[23px] top-5 bottom-5 w-0.5 bg-gradient-to-b from-primary via-surface-highlight to-transparent"></div>
                <div class="relative flex gap-5 group">
                    <div class="w-12 h-12 rounded-full bg-background-dark border-2 border-primary flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(13,204,242,0.3)]">
                        <span class="text-primary font-bold text-lg">1</span>
                    </div>
                    <div class="pt-1">
                        <h3 class="text-lg font-bold text-white group-hover:text-primary transition-colors">Paste Link</h3>
                        <p class="text-sm text-gray-400 mt-1">Drop a YouTube link or upload a file. We support up to 4 hour videos.</p>
                    </div>
                </div>
                <div class="relative flex gap-5 group">
                    <div class="w-12 h-12 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center shrink-0 z-10 group-hover:border-primary transition-colors">
                        <span class="text-gray-300 font-bold text-lg group-hover:text-primary">2</span>
                    </div>
                    <div class="pt-1">
                        <h3 class="text-lg font-bold text-white group-hover:text-primary transition-colors">AI Processing</h3>
                        <p class="text-sm text-gray-400 mt-1">Our engine scans for hooks, laughter, and high-energy moments.</p>
                    </div>
                </div>
                <div class="relative flex gap-5 group">
                    <div class="w-12 h-12 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center shrink-0 z-10 group-hover:border-primary transition-colors">
                        <span class="text-gray-300 font-bold text-lg group-hover:text-primary">3</span>
                    </div>
                    <div class="pt-1">
                        <h3 class="text-lg font-bold text-white group-hover:text-primary transition-colors">Export &amp; Viral</h3>
                        <p class="text-sm text-gray-400 mt-1">Review the clips, tweak captions if needed, and export in 1080p.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-surface-dark/50 py-16 px-5 border-y border-white/5">
            <h2 class="text-2xl font-bold text-white mb-8 text-center">Who uses SuperClips?</h2>
            <div class="flex flex-wrap justify-center gap-3">
                <span class="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-200 flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-lg">mic</span> Podcasters
                </span>
                <span class="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-200 flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-lg">videogame_asset</span> Streamers
                </span>
                <span class="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-200 flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-lg">school</span> Coaches
                </span>
                <span class="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-200 flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-lg">storefront</span> Agencies
                </span>
                <span class="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-200 flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-lg">movie</span> YouTubers
                </span>
            </div>
        </div>
        <div class="py-16 overflow-hidden">
            <div class="px-5 mb-8 flex justify-between items-end">
                <h2 class="text-2xl font-bold text-white max-w-[200px]">Loved by creators</h2>
                <div class="flex gap-1">
                    <span class="w-2 h-2 rounded-full bg-primary"></span>
                    <span class="w-2 h-2 rounded-full bg-white/20"></span>
                    <span class="w-2 h-2 rounded-full bg-white/20"></span>
                </div>
            </div>
            <div class="flex overflow-x-auto gap-4 px-5 pb-8 no-scrollbar snap-x snap-mandatory">
                <div class="snap-center shrink-0 w-[280px] bg-gradient-to-b from-surface-dark to-background-dark border border-white/10 rounded-2xl p-6 flex flex-col gap-4 relative">
                    <div class="absolute top-4 right-4 text-white/5">
                        <span class="material-symbols-outlined text-4xl">format_quote</span>
                    </div>
                    <div class="flex gap-0.5 text-yellow-400">
                        <span class="material-symbols-outlined text-sm fill-current">star</span>
                        <span class="material-symbols-outlined text-sm fill-current">star</span>
                        <span class="material-symbols-outlined text-sm fill-current">star</span>
                        <span class="material-symbols-outlined text-sm fill-current">star</span>
                        <span class="material-symbols-outlined text-sm fill-current">star</span>
                    </div>
                    <p class="text-gray-300 text-sm leading-relaxed z-10">"My clipping time went from 5 hours to 15 minutes. The AI just knows what parts are actually funny."</p>
                    <div class="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
                        <div class="w-8 h-8 rounded-full bg-gray-700 bg-cover" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBW043MHKoMTwCpucALbbiK2aVyfcU8y-SPzmRF-wM6qN1CA-YLxdAkYm2dt88pyWhYjmX-zG1_Twa8Sj-GW-RmzPOXLdzSbBFz9djN1Fueu1_lM-_CJ5cRSE8DBQxWzuawRRDmrgvDSaEQIspd1px7UnZJrBfaIuICSNMBsp0-NxraS5uBfscQGe2B-Afi4k11KuQ8y6lXypb5NNEftgIFjckswaYrszPCixpL5ziJArFxcTQs4LGqwOJrH_q3-cwkBqNPnY9Ccew');"></div>
                        <div>
                            <p class="text-white text-xs font-bold">Sarah Jenkins</p>
                            <p class="text-gray-500 text-[10px]">Podcast Host</p>
                        </div>
                    </div>
                </div>
                <div class="snap-center shrink-0 w-[280px] bg-gradient-to-b from-surface-dark to-background-dark border border-white/10 rounded-2xl p-6 flex flex-col gap-4 relative">
                    <div class="absolute top-4 right-4 text-white/5">
                        <span class="material-symbols-outlined text-4xl">format_quote</span>
                    </div>
                    <div class="flex gap-0.5 text-yellow-400">
                        <span class="material-symbols-outlined text-sm fill-current">star</span>
                        <span class="material-symbols-outlined text-sm fill-current">star</span>
                        <span class="material-symbols-outlined text-sm fill-current">star</span>
                        <span class="material-symbols-outlined text-sm fill-current">star</span>
                        <span class="material-symbols-outlined text-sm fill-current">star</span>
                    </div>
                    <p class="text-gray-300 text-sm leading-relaxed z-10">"The face tracking feature is a lifesaver for multi-person podcasts. Saves me so much manual keyframing."</p>
                    <div class="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
                        <div class="w-8 h-8 rounded-full bg-gray-700 bg-cover" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3y9tDPxnFzNpO962olxsXSx2G5BhSLydPaETQth16vpy4wctvyLIiEdZCHDCfosT2gHU_rkNN8w6SPFnzNp5MO3oOuMMHQHe57SgbYfZcIRX6e713TTHOW--M9P6pPko4-CDiACuOhWC0pz9crEOGqGamcodC_DC_p1CoB07f9gF03lFIhG3XwRzerNYdsHu1WPD774-gaPJgfbGj_FJE9yPJSuzfqX7QLkoa_Ha063uVKQnD2uPTfE2SQjjnfcUXflk2biZIZbw');"></div>
                        <div>
                            <p class="text-white text-xs font-bold">Mike Chen</p>
                            <p class="text-gray-500 text-[10px]">Tech Reviewer</p>
                        </div>
                    </div>
                </div>
                <div class="snap-center shrink-0 w-[280px] bg-gradient-to-b from-surface-dark to-background-dark border border-white/10 rounded-2xl p-6 flex flex-col gap-4 relative">
                    <div class="absolute top-4 right-4 text-white/5">
                        <span class="material-symbols-outlined text-4xl">format_quote</span>
                    </div>
                    <div class="flex gap-0.5 text-yellow-400">
                        <span class="material-symbols-outlined text-sm fill-current">star</span>
                        <span class="material-symbols-outlined text-sm fill-current">star</span>
                        <span class="material-symbols-outlined text-sm fill-current">star</span>
                        <span class="material-symbols-outlined text-sm fill-current">star</span>
                        <span class="material-symbols-outlined text-sm fill-current">star</span>
                    </div>
                    <p class="text-gray-300 text-sm leading-relaxed z-10">"I tried 5 other AI tools. This is the only one that gets the captions accurate enough to use."</p>
                    <div class="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
                        <div class="w-8 h-8 rounded-full bg-gray-700 bg-cover" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDrbxIg6Xdol76P_b3rH_u6OoqUwIE4sXa7bisF6-r6l3AEGn483BOV7RVr2xVgBI-CT42A8-CT983X2ZmPNss5IHTHFNHcyGeGNXbgKfRlYP0bFNLhkpz5Pjp2pofTQ8fBR2HMffqWqhHJjRdCz1B1fk1rOMCtqyvuovF3F0HH_lE2OC0HW_skIsMATmnuQi3wLId9MssN51MjdZnXeHS-MTMFZI-4qQvy16WbFiPHMU2EKA7-zyHdLl8nrmqlEwHgttLlcPfmHWE');"></div>
                        <div>
                            <p class="text-white text-xs font-bold">Alex Rivera</p>
                            <p class="text-gray-500 text-[10px]">Content Agency</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mx-5 mb-32 p-6 rounded-2xl bg-surface-dark border border-white/5 text-center relative overflow-hidden">
            <div class="absolute top-0 right-0 p-10 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
            <div class="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="material-symbols-outlined text-green-400 text-2xl">verified_user</span>
            </div>
            <h3 class="text-white font-bold text-lg mb-2">${guaranteeTitle}</h3>
            <p class="text-gray-400 text-sm mb-6 leading-relaxed">${guaranteeText}</p>
            <div class="inline-block bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-3 py-1.5">
                <p class="text-yellow-500 text-[11px] font-bold uppercase tracking-wide">⚠️ Beta pricing ends in 48 hours</p>
            </div>
        </div>
    </div>
    <div class="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background-dark/90 backdrop-blur-xl border-t border-white/10 safe-area-bottom">
        <div class="max-w-md mx-auto flex gap-4 items-center">
            <div class="flex flex-col">
                <span class="text-white font-bold text-sm">Start for free</span>
                <div class="flex items-center gap-1">
                    <div class="flex -space-x-1.5">
                        <div class="w-4 h-4 rounded-full bg-gray-400 border border-background-dark"></div>
                        <div class="w-4 h-4 rounded-full bg-gray-500 border border-background-dark"></div>
                        <div class="w-4 h-4 rounded-full bg-gray-600 border border-background-dark"></div>
                    </div>
                    <span class="text-[10px] text-gray-400 ml-1">+12k joined</span>
                </div>
            </div>
            <a href="${stickyCta.url}" class="flex-1 h-12 rounded-xl bg-primary hover:bg-primary-hover text-background-dark font-bold text-base flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(13,204,242,0.3)] transition-all active:scale-[0.98]">
                <span>${stickyCta.text}</span>
                <span class="material-symbols-outlined text-xl">arrow_forward</span>
            </a>
        </div>
    </div>
</body>
</html>`;
};
