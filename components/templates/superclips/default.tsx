'use client';

import React from 'react';
import { EditableButton } from '@/components/editor/editable-button';
import { BaseTemplateProps } from '@/types/template';

interface SuperClipsProps extends BaseTemplateProps {
    onContentChange?: (eid: string, value: unknown) => void;
}

export default function SuperClips({ editable = false, data = {}, onContentChange }: SuperClipsProps) {
    const getText = (id: string, defaultValue: string) => {
        return data[id]?.text || defaultValue;
    };

    const getButton = (id: string, defaultText: string, defaultUrl: string) => {
        return {
            text: data[id]?.button?.text || defaultText,
            url: data[id]?.button?.url || defaultUrl,
        };
    };

    return (
        <div className="bg-[#0a1518] text-white font-sans antialiased selection:bg-[#0dccf2] selection:text-[#0a1518] pb-28 min-h-screen relative">
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            <style jsx global>{`
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
        .safe-area-bottom {
            padding-bottom: env(safe-area-inset-bottom, 20px);
        }
      `}</style>

            {/* Navbar */}
            <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#0a1518]/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#0dccf2]" style={{ fontSize: '28px' }}>auto_videocam</span>
                        <h2
                            data-eid="nav_logo"
                            contentEditable={editable}
                            suppressContentEditableWarning
                            onBlur={(e) => onContentChange?.('nav_logo', { text: e.currentTarget.innerHTML })}
                            className="text-white text-lg font-bold leading-tight tracking-tight"
                        >
                            {getText('nav_logo', 'SuperClips')}
                        </h2>
                    </div>
                    <div className="flex items-center justify-end gap-4">
                        <a
                            className="text-gray-400 text-sm font-semibold hover:text-white transition-colors"
                            href="#"
                        >
                            <span
                                data-eid="nav_login"
                                contentEditable={editable}
                                suppressContentEditableWarning
                                onBlur={(e) => onContentChange?.('nav_login', { text: e.currentTarget.innerHTML })}
                            >
                                {getText('nav_login', 'Log in')}
                            </span>
                        </a>
                        <EditableButton
                            eid="nav_signup"
                            defaultText={getButton('nav_signup', 'Sign Up', '#').text}
                            defaultUrl={getButton('nav_signup', 'Sign Up', '#').url}
                            className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors"
                            editable={editable}
                            onChange={onContentChange}
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto pt-16 bg-[#0a1518] overflow-hidden px-4 sm:px-6 lg:px-8">
                {/* Hero */}
                <div className="relative pt-12 pb-16 px-4 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#0dccf2]/10 rounded-full blur-[120px] pointer-events-none"></div>
                    <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#0dccf2]/5 to-transparent pointer-events-none"></div>
                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#192e33] border border-white/10 shadow-lg shadow-black/20">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0dccf2] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0dccf2]"></span>
                                </span>
                                <span
                                    data-eid="hero_badge"
                                    contentEditable={editable}
                                    suppressContentEditableWarning
                                    onBlur={(e) => onContentChange?.('hero_badge', { text: e.currentTarget.innerHTML })}
                                    className="text-[11px] font-bold text-gray-300 uppercase tracking-wider"
                                >
                                    {getText('hero_badge', 'AI Engine 2.0 Live')}
                                </span>
                            </div>
                            <h1 className="text-4xl/[1.1] font-black tracking-tight text-white sm:text-5xl">
                                <span
                                    data-eid="hero_headline"
                                    contentEditable={editable}
                                    suppressContentEditableWarning
                                    onBlur={(e) => onContentChange?.('hero_headline', { text: e.currentTarget.innerHTML })}
                                >
                                    {getText('hero_headline', '1 Long Video.')}
                                </span>
                                <br />
                                <span
                                    data-eid="hero_subheadline"
                                    contentEditable={editable}
                                    suppressContentEditableWarning
                                    onBlur={(e) => onContentChange?.('hero_subheadline', { text: e.currentTarget.innerHTML })}
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#0dccf2] to-cyan-300"
                                >
                                    {getText('hero_subheadline', '10 Viral Shorts.')}
                                </span>
                            </h1>
                            <p className="text-gray-400 text-base font-medium leading-relaxed max-w-xs mx-auto">
                                Stop editing manually. Our AI identifies viral moments, adds captions, and reframes clips for TikTok & Reels in seconds.
                            </p>
                            <div className="flex flex-col gap-3 w-full max-w-xs mt-2">
                                <EditableButton
                                    eid="hero_cta"
                                    defaultText={getButton('hero_cta', 'Create Clips for Free', '#').text}
                                    defaultUrl={getButton('hero_cta', 'Create Clips for Free', '#').url}
                                    className="flex w-full cursor-pointer items-center justify-center rounded-xl h-14 bg-[#0dccf2] hover:bg-[#0bbbd6] transition-all text-[#0a1518] text-lg font-bold shadow-[0_0_25px_rgba(13,204,242,0.25)] hover:shadow-[0_0_35px_rgba(13,204,242,0.4)] hover:-translate-y-0.5"
                                    editable={editable}
                                    onChange={onContentChange}
                                />
                                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 font-medium">
                                    <span className="material-symbols-outlined text-sm">check</span> No credit card required
                                    <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                                    <span className="material-symbols-outlined text-sm">check</span> 3 free clips
                                </div>
                            </div>
                        </div>

                        {/* Virality Score Card */}
                        <div className="w-full max-w-md lg:max-w-none mx-auto relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#112024] group">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1518] via-transparent to-transparent z-10"></div>
                            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBdqd-C9gJsVq2XghU4m4QJCmDBZsxLypYFSN_FCAOhCjwZCUL8ZKIZPTiDEbfDcrcuB5y4l1xIpfFMSmeFdGWP-SSa6LtPiWydiazGwRCGmUcJpku_W2robbXPzWutKYZjobsI9UqKZ3qNN_dIcvmG-enK9u-YZlWoUFBEa2ZyzpS2plrH5-QPfWhM7A-dN9x0lQ2RX3ltwoVAc8OCZ4iKx-V1OpQJt4aRL81-M98D9aEAXQIHtTQHMx-lwg27Svyc4CbjDTsml0I")', opacity: 0.6 }}></div>
                            <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end">
                                <div className="bg-[#112024]/90 backdrop-blur border border-white/10 p-3 rounded-xl flex items-center gap-3 animate-bounce shadow-lg" style={{ animationDuration: '3s' }}>
                                    <span className="material-symbols-outlined text-green-400">trending_up</span>
                                    <div className="flex flex-col text-left">
                                        <span className="text-[10px] text-gray-400 uppercase font-bold">Virality Score</span>
                                        <span
                                            data-eid="hero_stats_virality"
                                            contentEditable={editable}
                                            suppressContentEditableWarning
                                            onBlur={(e) => onContentChange?.('hero_stats_virality', { text: e.currentTarget.innerHTML })}
                                            className="text-sm font-bold text-white"
                                        >
                                            {getText('hero_stats_virality', '98/100 High')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl">
                                    <span className="material-symbols-outlined text-4xl ml-1">play_arrow</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trusted By */}
                <div className="border-y border-white/5 bg-[#112024]/50 py-6 overflow-hidden">
                    <p
                        data-eid="trusted_text"
                        contentEditable={editable}
                        suppressContentEditableWarning
                        onBlur={(e) => onContentChange?.('trusted_text', { text: e.currentTarget.innerHTML })}
                        className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-5"
                    >
                        {getText('trusted_text', 'Trusted by 12,000+ Creators')}
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 px-6 items-center opacity-40 grayscale">
                        <div className="shrink-0 flex items-center gap-2">
                            <span className="material-symbols-outlined text-2xl">diamond</span>
                            <span className="font-bold text-base">Gemini</span>
                        </div>
                        <div className="shrink-0 flex items-center gap-2">
                            <span className="material-symbols-outlined text-2xl">bolt</span>
                            <span className="font-bold text-base">Flash</span>
                        </div>
                        <div className="shrink-0 flex items-center gap-2">
                            <span className="material-symbols-outlined text-2xl">auto_awesome</span>
                            <span className="font-bold text-base">Spark</span>
                        </div>
                        <div className="shrink-0 flex items-center gap-2">
                            <span className="material-symbols-outlined text-2xl">rocket_launch</span>
                            <span className="font-bold text-base">Rocket</span>
                        </div>
                    </div>
                </div>

                {/* The Struggle */}
                <div className="py-16">
                    <div className="flex flex-col gap-3 mb-10">
                        <span className="text-red-400 font-bold tracking-wider text-xs uppercase">The Struggle</span>
                        <h2
                            data-eid="struggle_title"
                            contentEditable={editable}
                            suppressContentEditableWarning
                            onBlur={(e) => onContentChange?.('struggle_title', { text: e.currentTarget.innerHTML })}
                            className="text-3xl font-bold text-white leading-tight"
                        >
                            {getText('struggle_title', 'Video editing is killing your growth.')}
                        </h2>
                        <p
                            data-eid="struggle_desc"
                            contentEditable={editable}
                            suppressContentEditableWarning
                            onBlur={(e) => onContentChange?.('struggle_desc', { text: e.currentTarget.innerHTML })}
                            className="text-gray-400 text-sm leading-relaxed"
                        >
                            {getText('struggle_desc', 'You spend hours recording, but the editing process drains your soul. Manual clipping is slow, expensive, and complicated.')}
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="glass-panel p-5 rounded-xl flex items-start gap-4 hover:border-red-500/30 transition-colors group">
                            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0 group-hover:bg-red-500/20 transition-colors">
                                <span className="material-symbols-outlined text-red-400">schedule</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-1">It takes too much time</h3>
                                <p className="text-sm text-gray-400">Finding the right clips and subtitling them takes 4+ hours per video.</p>
                            </div>
                        </div>
                        <div className="glass-panel p-5 rounded-xl flex items-start gap-4 hover:border-red-500/30 transition-colors group">
                            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0 group-hover:bg-red-500/20 transition-colors">
                                <span className="material-symbols-outlined text-red-400">payments</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-1">Editors are expensive</h3>
                                <p className="text-sm text-gray-400">Hiring a pro editor costs $50-$100 per short. It adds up fast.</p>
                            </div>
                        </div>
                        <div className="glass-panel p-5 rounded-xl flex items-start gap-4 hover:border-red-500/30 transition-colors group">
                            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0 group-hover:bg-red-500/20 transition-colors">
                                <span className="material-symbols-outlined text-red-400">sentiment_dissatisfied</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-1">Complex tools</h3>
                                <p className="text-sm text-gray-400">Premiere Pro has a steep learning curve you don't have time for.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* The Smart Way */}
                <div className="bg-[#112024] py-16 px-5 border-t border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://placeholder.pics/svg/100/112024/192e33/grid-pattern')] opacity-20 bg-fixed"></div>
                    <div className="relative z-10">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-[#0dccf2] to-blue-600 shadow-lg shadow-[#0dccf2]/20 mb-4">
                                <span className="material-symbols-outlined text-[#0a1518] text-3xl">auto_fix_high</span>
                            </div>
                            <h2
                                data-eid="smart_title"
                                contentEditable={editable}
                                suppressContentEditableWarning
                                onBlur={(e) => onContentChange?.('smart_title', { text: e.currentTarget.innerHTML })}
                                className="text-3xl font-black text-white mb-4"
                            >
                                {getText('smart_title', 'The Smart Way to Create Content')}
                            </h2>
                            <p className="text-gray-400 text-sm">SuperClips handles the boring stuff so you can focus on creating.</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-[#0a1518] p-4 rounded-xl border border-white/5 flex flex-col items-center text-center gap-3 hover:border-[#0dccf2]/50 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-[#0dccf2]/10 flex items-center justify-center text-[#0dccf2]">
                                    <span className="material-symbols-outlined">smart_toy</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">AI Curation</h4>
                                    <p className="text-xs text-gray-500 mt-1">Finds funny & engaging moments auto-magically.</p>
                                </div>
                            </div>
                            <div className="bg-[#0a1518] p-4 rounded-xl border border-white/5 flex flex-col items-center text-center gap-3 hover:border-[#0dccf2]/50 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-[#0dccf2]/10 flex items-center justify-center text-[#0dccf2]">
                                    <span className="material-symbols-outlined">subtitles</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">Active Captions</h4>
                                    <p className="text-xs text-gray-500 mt-1">98% accurate subtitles animated like the pros.</p>
                                </div>
                            </div>
                            <div className="bg-[#0a1518] p-4 rounded-xl border border-white/5 flex flex-col items-center text-center gap-3 hover:border-[#0dccf2]/50 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-[#0dccf2]/10 flex items-center justify-center text-[#0dccf2]">
                                    <span className="material-symbols-outlined">crop_portrait</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">Face Tracking</h4>
                                    <p className="text-xs text-gray-500 mt-1">Keeps the speaker centered in vertical format.</p>
                                </div>
                            </div>
                            <div className="bg-[#0a1518] p-4 rounded-xl border border-white/5 flex flex-col items-center text-center gap-3 hover:border-[#0dccf2]/50 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-[#0dccf2]/10 flex items-center justify-center text-[#0dccf2]">
                                    <span className="material-symbols-outlined">trending_up</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">Virality Score</h4>
                                    <p className="text-xs text-gray-500 mt-1">AI predicts which clips will go viral.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3 Step Process */}
                <div className="py-16">
                    <h2
                        data-eid="steps_title"
                        contentEditable={editable}
                        suppressContentEditableWarning
                        onBlur={(e) => onContentChange?.('steps_title', { text: e.currentTarget.innerHTML })}
                        className="text-2xl font-bold text-white text-center mb-12"
                    >
                        {getText('steps_title', 'From YouTube to TikTok in 3 Steps')}
                    </h2>
                    <div className="relative grid md:grid-cols-3 gap-10 md:gap-6">
                        <div className="absolute left-[23px] top-5 bottom-5 w-0.5 bg-gradient-to-b from-[#0dccf2] via-[#192e33] to-transparent md:hidden"></div>
                        <div className="relative flex gap-5 group">
                            <div className="w-12 h-12 rounded-full bg-[#0a1518] border-2 border-[#0dccf2] flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(13,204,242,0.3)]">
                                <span className="text-[#0dccf2] font-bold text-lg">1</span>
                            </div>
                            <div className="pt-1">
                                <h3 className="text-lg font-bold text-white group-hover:text-[#0dccf2] transition-colors">Paste Link</h3>
                                <p className="text-sm text-gray-400 mt-1">Drop a YouTube link or upload a file. We support up to 4 hour videos.</p>
                            </div>
                        </div>
                        <div className="relative flex gap-5 group">
                            <div className="w-12 h-12 rounded-full bg-[#112024] border border-white/10 flex items-center justify-center shrink-0 z-10 group-hover:border-[#0dccf2] transition-colors">
                                <span className="text-gray-300 font-bold text-lg group-hover:text-[#0dccf2]">2</span>
                            </div>
                            <div className="pt-1">
                                <h3 className="text-lg font-bold text-white group-hover:text-[#0dccf2] transition-colors">AI Processing</h3>
                                <p className="text-sm text-gray-400 mt-1">Our engine scans for hooks, laughter, and high-energy moments.</p>
                            </div>
                        </div>
                        <div className="relative flex gap-5 group">
                            <div className="w-12 h-12 rounded-full bg-[#112024] border border-white/10 flex items-center justify-center shrink-0 z-10 group-hover:border-[#0dccf2] transition-colors">
                                <span className="text-gray-300 font-bold text-lg group-hover:text-[#0dccf2]">3</span>
                            </div>
                            <div className="pt-1">
                                <h3 className="text-lg font-bold text-white group-hover:text-[#0dccf2] transition-colors">Export & Viral</h3>
                                <p className="text-sm text-gray-400 mt-1">Review the clips, tweak captions if needed, and export in 1080p.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Who uses SuperClips */}
                <div className="bg-[#112024]/50 py-16 px-5 border-y border-white/5 rounded-3xl my-16">
                    <h2 className="text-2xl font-bold text-white mb-8 text-center">Who uses SuperClips?</h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            { icon: 'mic', text: 'Podcasters' },
                            { icon: 'videogame_asset', text: 'Streamers' },
                            { icon: 'school', text: 'Coaches' },
                            { icon: 'storefront', text: 'Agencies' },
                            { icon: 'movie', text: 'YouTubers' }
                        ].map((item) => (
                            <span key={item.text} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-200 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#0dccf2] text-lg">{item.icon}</span> {item.text}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Loved by Creators */}
                <div className="py-16 overflow-hidden">
                    <div className="px-5 mb-8 flex justify-between items-end">
                        <h2 className="text-2xl font-bold text-white max-w-[200px]">Loved by creators</h2>
                        <div className="flex gap-1">
                            <span className="w-2 h-2 rounded-full bg-[#0dccf2]"></span>
                            <span className="w-2 h-2 rounded-full bg-white/20"></span>
                            <span className="w-2 h-2 rounded-full bg-white/20"></span>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 pb-8">
                        {/* Testimonials */}
                        {[
                            { name: 'Sarah Jenkins', role: 'Podcast Host', quote: '"My clipping time went from 5 hours to 15 minutes. The AI just knows what parts are actually funny."', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBW043MHKoMTwCpucALbbiK2aVyfcU8y-SPzmRF-wM6qN1CA-YLxdAkYm2dt88pyWhYjmX-zG1_Twa8Sj-GW-RmzPOXLdzSbBFz9djN1Fueu1_lM-_CJ5cRSE8DBQxWzuawRRDmrgvDSaEQIspd1px7UnZJrBfaIuICSNMBsp0-NxraS5uBfscQGe2B-Afi4k11KuQ8y6lXypb5NNEftgIFjckswaYrszPCixpL5ziJArFxcTQs4LGqwOJrH_q3-cwkBqNPnY9Ccew' },
                            { name: 'Mike Chen', role: 'Tech Reviewer', quote: '"The face tracking feature is a lifesaver for multi-person podcasts. Saves me so much manual keyframing."', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3y9tDPxnFzNpO962olxsXSx2G5BhSLydPaETQth16vpy4wctvyLIiEdZCHDCfosT2gHU_rkNN8w6SPFnzNp5MO3oOuMMHQHe57SgbYfZcIRX6e713TTHOW--M9P6pPko4-CDiACuOhWC0pz9crEOGqGamcodC_DC_p1CoB07f9gF03lFIhG3XwRzerNYdsHu1WPD774-gaPJgfbGj_FJE9yPJSuzfqX7QLkoa_Ha063uVKQnD2uPTfE2SQjjnfcUXflk2biZIZbw' },
                            { name: 'Alex Rivera', role: 'Content Agency', quote: '"I tried 5 other AI tools. This is the only one that gets the captions accurate enough to use."', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrbxIg6Xdol76P_b3rH_u6OoqUwIE4sXa7bisF6-r6l3AEGn483BOV7RVr2xVgBI-CT42A8-CT983X2ZmPNss5IHTHFNHcyGeGNXbgKfRlYP0bFNLhkpz5Pjp2pofTQ8fBR2HMffqWqhHJjRdCz1B1fk1rOMCtqyvuovF3F0HH_lE2OC0HW_skIsMATmnuQi3wLId9MssN51MjdZnXeHS-MTMFZI-4qQvy16WbFiPHMU2EKA7-zyHdLl8nrmqlEwHgttLlcPfmHWE' }
                        ].map((t, i) => (
                            <div key={i} className="w-full bg-gradient-to-b from-[#112024] to-[#0a1518] border border-white/10 rounded-2xl p-6 flex flex-col gap-4 relative">
                                <div className="absolute top-4 right-4 text-white/5">
                                    <span className="material-symbols-outlined text-4xl">format_quote</span>
                                </div>
                                <div className="flex gap-0.5 text-yellow-400">
                                    {[1, 2, 3, 4, 5].map(x => <span key={x} className="material-symbols-outlined text-sm fill-current">star</span>)}
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed z-10">{t.quote}</p>
                                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
                                    <div className="w-8 h-8 rounded-full bg-gray-700 bg-cover" style={{ backgroundImage: `url('${t.img}')` }}></div>
                                    <div>
                                        <p className="text-white text-xs font-bold">{t.name}</p>
                                        <p className="text-gray-500 text-[10px]">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Guarantee */}
                <div className="mb-32 p-6 rounded-2xl bg-[#112024] border border-white/5 text-center relative overflow-hidden max-w-3xl mx-auto">
                    <div className="absolute top-0 right-0 p-10 bg-[#0dccf2]/5 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-green-400 text-2xl">verified_user</span>
                    </div>
                    <h3
                        data-eid="guarantee_title"
                        contentEditable={editable}
                        suppressContentEditableWarning
                        onBlur={(e) => onContentChange?.('guarantee_title', { text: e.currentTarget.innerHTML })}
                        className="text-white font-bold text-lg mb-2"
                    >
                        {getText('guarantee_title', '30-Day Money-Back Guarantee')}
                    </h3>
                    <p
                        data-eid="guarantee_text"
                        contentEditable={editable}
                        suppressContentEditableWarning
                        onBlur={(e) => onContentChange?.('guarantee_text', { text: e.currentTarget.innerHTML })}
                        className="text-gray-400 text-sm mb-6 leading-relaxed"
                    >
                        {getText('guarantee_text', "If you don't save at least 10 hours of editing time in your first month, we'll refund your subscription in full. No questions asked.")}
                    </p>
                    <div className="inline-block bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-3 py-1.5">
                        <p className="text-yellow-500 text-[11px] font-bold uppercase tracking-wide">⚠️ Beta pricing ends in 48 hours</p>
                    </div>
                </div>
            </div>

            {/* Fixed Bottom CTA */}
            <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#0a1518]/90 backdrop-blur-xl border-t border-white/10 safe-area-bottom">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-4 items-center">
                    <div className="flex flex-col">
                        <span className="text-white font-bold text-sm">Start for free</span>
                        <div className="flex items-center gap-1">
                            <div className="flex -space-x-1.5">
                                <div className="w-4 h-4 rounded-full bg-gray-400 border border-[#0a1518]"></div>
                                <div className="w-4 h-4 rounded-full bg-gray-500 border border-[#0a1518]"></div>
                                <div className="w-4 h-4 rounded-full bg-gray-600 border border-[#0a1518]"></div>
                            </div>
                            <span className="text-[10px] text-gray-400 ml-1">+12k joined</span>
                        </div>
                    </div>
                    <EditableButton
                        eid="sticky_cta"
                        defaultText={getButton('sticky_cta', 'Get Started', '#').text}
                        defaultUrl={getButton('sticky_cta', 'Get Started', '#').url}
                        className="flex-1 h-12 rounded-xl bg-[#0dccf2] hover:bg-[#0bbbd6] text-[#0a1518] font-bold text-base flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(13,204,242,0.3)] transition-all active:scale-[0.98]"
                        editable={editable}
                        onChange={onContentChange}
                    />
                </div>
            </div>
        </div>
    );
}
