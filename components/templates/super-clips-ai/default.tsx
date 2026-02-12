'use client';

import { EditableImage } from '@/components/editor/editable-image';
import { EditableButton } from '@/components/editor/editable-button';
import { TiptapEditableText } from '@/components/editor/tiptap-editable-text';
import { BaseTemplateProps } from '@/types/template';

interface SuperClipsAIProps extends BaseTemplateProps {
    onContentChange?: (eid: string, value: unknown) => void;
}

export default function SuperClipsAI({ editable = false, data = {}, onContentChange }: SuperClipsAIProps) {
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
    const handleTextChange = (eid: string, content: string) => {
        if (onContentChange) onContentChange(eid, { text: content });
    };
    const handleImageChange = (eid: string, imgData: { image: string; linkUrl?: string | undefined }) => {
        if (onContentChange) onContentChange(eid, imgData);
    };

    return (
        <div className="w-full overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
            <link href="https://fonts.googleapis.com" rel="preconnect" />
            <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

            {/* Navbar */}
            <header className="w-full z-40" style={{ backgroundColor: 'rgba(16,22,34,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between" style={{ height: '80px' }}>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center rounded-lg" style={{ width: '32px', height: '32px', backgroundColor: 'rgba(19,91,236,0.2)' }}>
                                <span className="material-symbols-outlined" style={{ color: '#135bec' }}>movie_edit</span>
                            </div>
                            <TiptapEditableText eid="nav_brand" defaultText={getText('nav_brand', 'SuperClipsAI')} className="text-xl font-bold tracking-tight text-white" editable={editable} onChange={handleTextChange} as="span" />
                        </div>
                        <nav className="hidden md:flex items-center gap-8">
                            <a className="text-sm font-medium transition-colors" style={{ color: '#cbd5e1' }} href="#features">Features</a>
                            <a className="text-sm font-medium transition-colors" style={{ color: '#cbd5e1' }} href="#how-it-works">How it Works</a>
                            <a className="text-sm font-medium transition-colors" style={{ color: '#cbd5e1' }} href="#pricing">Pricing</a>
                            <a className="text-sm font-medium transition-colors" style={{ color: '#cbd5e1' }} href="#faq">FAQ</a>
                        </nav>
                        <div className="flex items-center gap-4">
                            <a className="hidden md:block text-sm font-semibold text-white" href="#">Login</a>
                            <EditableButton eid="nav_cta" defaultText={getButton('nav_cta', 'Get Started', '#').text} defaultUrl={getButton('nav_cta', 'Get Started', '#').url} className="text-white text-sm font-bold py-2.5 px-5 rounded-lg transition-all" style={{ backgroundColor: '#135bec', boxShadow: '0 0 20px -5px rgba(19,91,236,0.5)' }} editable={editable} onChange={onContentChange} />
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-16 pb-20 lg:pt-28 lg:pb-32 overflow-hidden" style={{ backgroundColor: '#101622' }}>
                <div className="absolute top-0 left-1/2 w-full h-full max-w-7xl pointer-events-none" style={{ transform: 'translateX(-50%)', background: 'radial-gradient(circle at 50% 50%, rgba(19,91,236,0.15) 0%, rgba(16,22,34,0) 50%)', zIndex: 0 }} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 1 }}>
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="flex flex-col gap-8 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full w-fit" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <span className="flex h-2 w-2 rounded-full" style={{ backgroundColor: '#135bec' }} />
                                <TiptapEditableText eid="hero_badge" defaultText={getText('hero_badge', 'New AI Model v2.0 Released')} className="text-xs font-medium" style={{ color: '#cbd5e1' }} editable={editable} onChange={handleTextChange} as="span" />
                            </div>
                            <TiptapEditableText eid="hero_headline" defaultText={getText('hero_headline', 'Turn Long Videos into Viral Clips in Seconds.')} className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white" style={{ lineHeight: '1.1' }} editable={editable} onChange={handleTextChange} as="h1" />
                            <TiptapEditableText eid="hero_description" defaultText={getText('hero_description', 'AI-driven editing for creators who value speed. Stop wasting hours scrubbing through timelines. Get 10x more content with 0x the effort.')} className="text-lg leading-relaxed max-w-lg" style={{ color: '#94a3b8' }} editable={editable} onChange={handleTextChange} as="p" />
                            <div className="flex flex-col sm:flex-row gap-4">
                                <EditableButton eid="hero_cta_primary" defaultText={getButton('hero_cta_primary', 'Start Free Trial', '#').text} defaultUrl={getButton('hero_cta_primary', 'Start Free Trial', '#').url} className="flex items-center justify-center gap-2 text-white text-base font-bold rounded-xl transition-all" style={{ height: '56px', padding: '0 32px', backgroundColor: '#135bec', boxShadow: '0 4px 20px -4px rgba(19,91,236,0.6)' }} editable={editable} onChange={onContentChange} />
                                <EditableButton eid="hero_cta_secondary" defaultText={getButton('hero_cta_secondary', 'Watch Demo', '#').text} defaultUrl={getButton('hero_cta_secondary', 'Watch Demo', '#').url} className="flex items-center justify-center gap-2 text-white text-base font-bold rounded-xl transition-all" style={{ height: '56px', padding: '0 32px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} editable={editable} onChange={onContentChange} />
                            </div>
                            <div className="flex items-center gap-4 text-sm" style={{ color: '#64748b' }}>
                                <div className="flex" style={{ marginLeft: '0' }}>
                                    <img alt="User avatar 1" className="w-8 h-8 rounded-full object-cover" style={{ border: '2px solid #101622' }} src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgvJTTyocm0CgI0oWmzLPwU6lEYzOD6f72y3ALZo2q8pHvWEOujbhVeaVldPBBnk0k4od39TofvMD3thaCazoTvAUrNZOIdhGw_VSmVTuRtqvBNfcaexzfLzdaHDjd6KwGBqA4RlrRFhmC_RKCLegLJF0nCJP-VFw7opmyOfSFgNEkARHGZwkfPp21Eqzmwk4UvIinXvVuAEVjNpwBRK__IKBqmsf0XR1wtWcpqJ71s9IvTVv75KwJKQEQ-ivVwdpj78NHC4kGTVc" />
                                    <img alt="User avatar 2" className="w-8 h-8 rounded-full object-cover" style={{ border: '2px solid #101622', marginLeft: '-8px' }} src="https://lh3.googleusercontent.com/aida-public/AB6AXuDafIcW2rhRDEZXYEWGr2tbHDFwRRvACyAiqnFbhoTs4-eTpAoCAHMw-LfLvSRwycqCARvl2F6kdla-t5wY5iHijZIVnNpMyrn6epG0Z9TNeeNRfdzFOCldSFy8Kyu_loOp7uLsK3Ugg3AfwJVXnKkQLk3PmLIvk5tDj4YumZ4b8rjN0AYrEs8SgDEJ1BxcOyXy6aTNqQ5us9VUQfayYp7ko6Q1z_-kEeKD3QzzIWwuaSLCBNWQdpdw7W3StAIoBOW645qs-Q7e81Y" />
                                    <img alt="User avatar 3" className="w-8 h-8 rounded-full object-cover" style={{ border: '2px solid #101622', marginLeft: '-8px' }} src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHfwveRYkie9gffeumXeNMRhc8__xWivN1CXMCI5hrtIihbyZbwmFTnl8FYuvXrjMLsQFQwy4iNrabRaa_fKsaKRFnbaZmyMtX4bmC0P70GFKnk1SE2QhDS6hNVh1GBxMaKqkDxhTH8KWDlAfPYiniTjvNiJXYXRGJkydI6F4TfniY1qdZLhwOYfGvFNnKheWYdayk0X1fkdbKMhzP_H24cTgX46rzgYiISZejqi7bN_M69EIft_hudtjKHtxs25uohHSF7KUG2HQ" />
                                </div>
                                <TiptapEditableText eid="hero_social_proof" defaultText={getText('hero_social_proof', 'Trusted by 10,000+ creators')} className="text-sm" style={{ color: '#64748b' }} editable={editable} onChange={handleTextChange} as="span" />
                            </div>
                        </div>
                        {/* Hero Visual */}
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full" style={{ backgroundColor: 'rgba(19,91,236,0.2)', filter: 'blur(100px)', zIndex: -1 }} />
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#1e293b' }}>
                                <div className="flex items-center px-4 gap-2" style={{ height: '32px', backgroundColor: '#0f172a', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'rgba(239,68,68,0.5)' }} />
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'rgba(234,179,8,0.5)' }} />
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'rgba(34,197,94,0.5)' }} />
                                </div>
                                <div className="relative" style={{ aspectRatio: '16/9', backgroundColor: '#0f172a' }}>
                                    <EditableImage eid="hero_image" defaultSrc={getImage('hero_image', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCt7H428w_2ldK7CwsAFo56A5dfqblQEn_hENDaKTKnO3A6g3WIj6A2gSfuAgAhlDBwNLcEsl7M6B-O-tabMQ_YXkF5AQINFqXGQn2tfUFBOhmbskBTXlK8t2xyDW-CotA4bvW9PRAgQEhW7ldKEgrN2Uv93GG70OxMcj529ZrqHEMefiRyMK9vkWzjdJ98OZEam_x-0WRk3I4p1-ktOGCsrWNUOMjCVHg11vrNRyI194pH77ulLSXzVsga3MEGwIubEciPaqTuNEY')} alt="Dashboard interface screenshot" className="w-full h-full object-cover" style={{ opacity: 0.8 }} editable={editable} onChange={handleImageChange} />
                                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0f172a, transparent, transparent)' }} />
                                    <div className="absolute bottom-8 right-8 p-4 rounded-xl shadow-xl" style={{ backgroundColor: 'rgba(16,22,34,0.9)', backdropFilter: 'blur(8px)', border: '1px solid rgba(19,91,236,0.3)' }}>
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined" style={{ color: '#135bec' }}>auto_awesome</span>
                                            <div>
                                                <p className="text-xs" style={{ color: '#94a3b8' }}>Processing</p>
                                                <p className="text-sm font-bold text-white">Generating 10 Clips...</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof Strip */}
            <section className="py-10" style={{ backgroundColor: 'rgba(2,6,23,0.5)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <TiptapEditableText eid="social_strip_heading" defaultText={getText('social_strip_heading', 'Powering next-gen creators from')} className="text-sm font-medium mb-6 uppercase tracking-wider" style={{ color: '#64748b' }} editable={editable} onChange={handleTextChange} as="p" />
                    <div className="flex flex-wrap justify-center gap-x-12 gap-y-8" style={{ filter: 'grayscale(1)', opacity: 0.5 }}>
                        <div className="flex items-center gap-2 text-xl font-bold text-white"><span className="material-symbols-outlined">smart_display</span> YouTube</div>
                        <div className="flex items-center gap-2 text-xl font-bold text-white"><span className="material-symbols-outlined">podcasts</span> Spotify</div>
                        <div className="flex items-center gap-2 text-xl font-bold text-white"><span className="material-symbols-outlined">videocam</span> Twitch</div>
                        <div className="flex items-center gap-2 text-xl font-bold text-white"><span className="material-symbols-outlined">play_arrow</span> TikTok</div>
                    </div>
                </div>
            </section>

            {/* Pain vs Gain Section */}
            <section className="py-24 relative" id="features" style={{ backgroundColor: '#101622' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <TiptapEditableText eid="features_heading" defaultText={getText('features_heading', 'The Old Way vs. The SuperClips Way')} className="text-3xl md:text-5xl font-bold text-white mb-6" editable={editable} onChange={handleTextChange} as="h2" />
                        <TiptapEditableText eid="features_description" defaultText={getText('features_description', "Don't let manual editing hold you back. See why creators are switching.")} className="text-lg max-w-2xl mx-auto" style={{ color: '#94a3b8' }} editable={editable} onChange={handleTextChange} as="p" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Pain Card */}
                        <div className="rounded-2xl p-8 lg:p-12 relative overflow-hidden" style={{ backgroundColor: '#1e1515', border: '1px solid rgba(239,68,68,0.1)' }}>
                            <div className="absolute top-0 right-0 p-4" style={{ opacity: 0.1 }}>
                                <span className="material-symbols-outlined" style={{ color: '#ef4444', fontSize: '144px' }}>block</span>
                            </div>
                            <div className="relative" style={{ zIndex: 1 }}>
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(239,68,68,0.2)' }}>
                                    <span className="material-symbols-outlined" style={{ color: '#ef4444' }}>history_toggle_off</span>
                                </div>
                                <TiptapEditableText eid="pain_title" defaultText={getText('pain_title', 'Manual Editing')} className="text-2xl font-bold text-white mb-4" editable={editable} onChange={handleTextChange} as="h3" />
                                <ul className="flex flex-col gap-4">
                                    {[
                                        { eid: 'pain_1', text: 'Hours spent scrubbing timelines' },
                                        { eid: 'pain_2', text: 'Complex software learning curve' },
                                        { eid: 'pain_3', text: 'Creative burnout & fatigue' },
                                        { eid: 'pain_4', text: 'Missed viral opportunities' },
                                    ].map((item) => (
                                        <li key={item.eid} className="flex items-start gap-3" style={{ color: '#94a3b8' }}>
                                            <span className="material-symbols-outlined shrink-0 mt-0.5 text-lg" style={{ color: '#ef4444' }}>close</span>
                                            <TiptapEditableText eid={item.eid} defaultText={getText(item.eid, item.text)} className="" style={{ color: '#94a3b8' }} editable={editable} onChange={handleTextChange} as="span" />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        {/* Gain Card */}
                        <div className="rounded-2xl p-8 lg:p-12 relative overflow-hidden shadow-xl" style={{ background: 'linear-gradient(to bottom right, #1e293b, rgba(19,91,236,0.1))', border: '1px solid rgba(19,91,236,0.2)', boxShadow: '0 25px 50px -12px rgba(19,91,236,0.05)' }}>
                            <div className="absolute top-0 right-0 p-4" style={{ opacity: 0.1 }}>
                                <span className="material-symbols-outlined" style={{ color: '#135bec', fontSize: '144px' }}>check_circle</span>
                            </div>
                            <div className="relative" style={{ zIndex: 1 }}>
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 shadow-lg" style={{ backgroundColor: '#135bec', boxShadow: '0 10px 15px -3px rgba(19,91,236,0.3)' }}>
                                    <span className="material-symbols-outlined text-white">auto_awesome</span>
                                </div>
                                <TiptapEditableText eid="gain_title" defaultText={getText('gain_title', 'AI Precision')} className="text-2xl font-bold text-white mb-4" editable={editable} onChange={handleTextChange} as="h3" />
                                <ul className="flex flex-col gap-4">
                                    {[
                                        { eid: 'gain_1', text: 'Instant highlight extraction' },
                                        { eid: 'gain_2', text: 'Auto-framing & captions' },
                                        { eid: 'gain_3', text: 'Export 10 clips in 1 click' },
                                        { eid: 'gain_4', text: 'Focus on creating, not editing' },
                                    ].map((item) => (
                                        <li key={item.eid} className="flex items-start gap-3 text-white">
                                            <span className="material-symbols-outlined shrink-0 mt-0.5 text-lg" style={{ color: '#135bec' }}>check</span>
                                            <TiptapEditableText eid={item.eid} defaultText={getText(item.eid, item.text)} className="font-medium text-white" editable={editable} onChange={handleTextChange} as="span" />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 relative" id="how-it-works" style={{ backgroundColor: '#020617' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="font-bold tracking-wider uppercase text-sm" style={{ color: '#135bec' }}>Workflow</span>
                        <TiptapEditableText eid="hiw_heading" defaultText={getText('hiw_heading', 'From URL to Viral in 3 Steps')} className="text-3xl md:text-5xl font-bold text-white mt-2 mb-6" editable={editable} onChange={handleTextChange} as="h2" />
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 relative">
                        <div className="hidden md:block absolute top-12 h-0.5" style={{ left: '16%', right: '16%', background: 'linear-gradient(to right, #1e293b, rgba(19,91,236,0.5), #1e293b)', zIndex: 0 }} />
                        {[
                            { eid_t: 'hiw_step_1_title', eid_d: 'hiw_step_1_desc', title: '1. Paste URL', desc: 'Simply copy your YouTube or Twitch link. No large file uploads required.', icon: 'link', iconColor: '#fff' },
                            { eid_t: 'hiw_step_2_title', eid_d: 'hiw_step_2_desc', title: '2. AI Analysis', desc: 'Our AI watches the video, identifies hooks, funny moments, and engaging segments.', icon: 'psychology', iconColor: '#135bec' },
                            { eid_t: 'hiw_step_3_title', eid_d: 'hiw_step_3_desc', title: '3. Export & Post', desc: 'Download your viral-ready clips with captions, reformatted for TikTok & Reels.', icon: 'rocket_launch', iconColor: '#4ade80' },
                        ].map((step) => (
                            <div key={step.eid_t} className="relative" style={{ zIndex: 1 }}>
                                <div className="p-8 rounded-2xl h-full transition-colors" style={{ backgroundColor: '#101622', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto shadow-lg transition-transform" style={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <span className="material-symbols-outlined text-3xl" style={{ color: step.iconColor }}>{step.icon}</span>
                                    </div>
                                    <TiptapEditableText eid={step.eid_t} defaultText={getText(step.eid_t, step.title)} className="text-xl font-bold text-white text-center mb-3" editable={editable} onChange={handleTextChange} as="h3" />
                                    <TiptapEditableText eid={step.eid_d} defaultText={getText(step.eid_d, step.desc)} className="text-center text-sm leading-relaxed" style={{ color: '#94a3b8' }} editable={editable} onChange={handleTextChange} as="p" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases Grid */}
            <section className="py-24" style={{ backgroundColor: '#101622' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <TiptapEditableText eid="use_cases_heading" defaultText={getText('use_cases_heading', 'Built for every creator')} className="text-3xl font-bold text-white mb-12" editable={editable} onChange={handleTextChange} as="h2" />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { eid_t: 'use_case_1_title', eid_d: 'use_case_1_desc', eid_i: 'use_case_1_image', title: 'Podcasters', desc: "Turn hour-long episodes into a week's worth of shorts to grow your audience.", img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvDXb76IIoIGeaix4HsETRdDxWNcJrp8oO9uzMI-OTCqZaHYiRBo7wRUBjEBH_g8km412FG2YcZY4WGPLEE2Q6QOugabWAxr9c6qNO6rEikV4xRaFdOLryNMH1fjWxODqToo37t7vB1Y9JwuImXbf01e_AV-IeiKVhgqffU3OjCOc-2VjVErUNOkRbbpto1aunCpt3VJLoSU_3y9DcSzCET97sLuu6D8F1eEJcpYE-SswWtiErAvSJC9FcetjOQ1Hrk3PYNjKGV7M' },
                            { eid_t: 'use_case_2_title', eid_d: 'use_case_2_desc', eid_i: 'use_case_2_image', title: 'Streamers', desc: 'Capture your best plays and funny moments instantly without leaving the game.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_GNJb5nFFq5BnqlmdGifXmNGhWfFpQBUby30v6Guc2Xl09ME1j0MlYvWJ4jVj6T-ugAAU5HgX4EoJua7hAGnXkt2cj5Cny7Tjv7hLeENoFaznHva46c9-JRG5Hqb__TOmi15kZgT6xC0lcOTCqa1TGSLGmv7wGYCZbXLWgzNrjbMCkgeW9YF5iTU-4ThUx_-BQEhcWGNKIW7ApGAuxmjuw2lgkQKcOOtQulrKdan75xLd7YovxeEesofEMopfZXT8OXtxYUYb8rs' },
                            { eid_t: 'use_case_3_title', eid_d: 'use_case_3_desc', eid_i: 'use_case_3_image', title: 'Agencies', desc: "Scale your client's output by 10x. Manage multiple brands with ease.", img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoxaQ22_T3u-icfL1_GrIhn7DFTu21moZz6QptK8dziMOzrzLxd61PQMNf6Yop-P9Y8Clpz5y5402IT95RVdhHuHW68_m8aT9QlZSDzBAZYde6SN7kSivz4DYiPjV5y862nG_95EtWwIUZ_uEjDQU4WgkCD4mKBMWqa-gYZwxnTqljgci-cn0qOjbH0xamxNm3n1LtyKdC3oz8zBKO7RRys8Fmet0LwUgGYiSCJQsOVyGqjka2HkVbvABfdjOQyMwR7_VgrLaFhH0' },
                        ].map((uc) => (
                            <div key={uc.eid_t} className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: '4/3' }}>
                                <EditableImage eid={uc.eid_i} defaultSrc={getImage(uc.eid_i, uc.img)} alt={uc.title} className="absolute inset-0 w-full h-full object-cover transition-transform" style={{ opacity: 0.6 }} editable={editable} onChange={handleImageChange} />
                                <div className="absolute inset-0 p-8 flex flex-col justify-end" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4), transparent)' }}>
                                    <TiptapEditableText eid={uc.eid_t} defaultText={getText(uc.eid_t, uc.title)} className="text-xl font-bold text-white mb-1" editable={editable} onChange={handleTextChange} as="h3" />
                                    <TiptapEditableText eid={uc.eid_d} defaultText={getText(uc.eid_d, uc.desc)} className="text-sm" style={{ color: '#cbd5e1' }} editable={editable} onChange={handleTextChange} as="p" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24" style={{ backgroundColor: '#020617' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <TiptapEditableText eid="testimonials_heading" defaultText={getText('testimonials_heading', 'Loved by the community')} className="text-3xl font-bold text-white text-center mb-12" editable={editable} onChange={handleTextChange} as="h2" />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { eid_n: 'testimonial_1_name', eid_h: 'testimonial_1_handle', eid_t: 'testimonial_1_text', eid_p: 'testimonial_1_photo', name: 'Mark D.', handle: '@marktech', text: 'SuperClipsAI literally saved my channel. I was spending 4 hours editing shorts, now it takes 5 minutes.', photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABm3MqLI3UfRdN_jLUyMZMlEjpyxVo8CpRrWxKGAKxhFXbB4RhvF8CmOlYy6oa7IvQbr7XKlOyJjjE7l6qUeZJMBthqI2v81MHyhjnVET_hPf9IT_UZnHlHQOBSfdjxKBXnoA6JWd3cxrwA-qHz6vlDsqrwAbAQKc4HLDmtfNjkrQb8SfXOl8x0iCJDOND_2jI95rRt1X0zyXRJAuDNDnibiMovDpbGwZ2Ak3zNo7aTne9N4CM1lWRk3IQECSChxqEWMEEv8hFr_I' },
                            { eid_n: 'testimonial_2_name', eid_h: 'testimonial_2_handle', eid_t: 'testimonial_2_text', eid_p: 'testimonial_2_photo', name: 'Sarah J.', handle: 'Podcast Host', text: 'The AI is surprisingly good at finding the "hook". My engagement on TikTok has doubled since I started using this.', photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0xErDyy2r7DuDOeC9E-64Nxvv67fVVvGqceTL69xKItUjjxnKZnOB2HdmxUV7huQV8YnYLpyMIl7gNc3D7NBVdP1uW9H31xNr8GXNTyB70FCAmsXnN5PFI7gEsZEgjWUP57wcbTerMMUNpeqK1Nv95oeMf8CJLHn2y6hcOFK3ALb3Ab1alQ3AwGKETtcBKzwZ4zjUb84YUsM6MAq4yuy9kl1B91hKFXUicpSI2WoLUcmTYgdE6m62CqnVqWuOFF6TcPBkv4WUGyg' },
                            { eid_n: 'testimonial_3_name', eid_h: 'testimonial_3_handle', eid_t: 'testimonial_3_text', eid_p: 'testimonial_3_photo', name: 'Alex R.', handle: 'Streamer', text: 'Best tool for streamers. Period. I finish my stream and the clips are ready before I even go to bed.', photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIPtlcjkuSIQa69njYsvspGZi8sb4nfZ3vN8K-VQXta0qZY_GN585-7983UhN_l7erEZC1aLsIz6h7-8kBKkAo16xnaqUJhCw--zHya1a64mS2UaPccU7BMKuiYGl1wmVoB5C4CBqRigWYZFG5W-o5o8CJedMCDvK_36qpzAzWHiHpB2gtMLBM2Hq1KdkgtG-bfSy6P_eS5_bw1SEGOGnkOD1QGRiVNug6Bvh4Y3hLnDPFnIpCyCvvTTmC-LJRXCHqIrPv5dYX374' },
                            { eid_n: 'testimonial_4_name', eid_h: 'testimonial_4_handle', eid_t: 'testimonial_4_text', eid_p: 'testimonial_4_photo', name: 'David K.', handle: 'Agency Owner', text: "We use this for 5 of our clients. It's a game changer for agency workflows.", photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmKDh0iEvpt7gki0p-TcFsWfxbD5dXQt6efyp0q2Xw9o4XtCkWRlRmw5lJXQzqtAt-9ZKb0747bDOl1_8R69xJ85x1BUowOWuAMqCQeiR0EvDQZVMVBfb0VzKG55EyUkwCfQDB-nAd0lDZN8ts1ircqqkk3A8vw4vSoElspzhPm7n1FL32dXHsZmhMDOPBquwBErRhgnJ2_0qbhTZfQEN7zU4C_ZzIvVum1DLqvmvg6-_re4RrHkUwJBO2PKBBxg-2Xs2P2lKdZWE' },
                        ].map((t) => (
                            <div key={t.eid_n} className="p-6 rounded-2xl shadow-sm" style={{ backgroundColor: '#101622', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div className="flex items-center gap-3 mb-4">
                                    <EditableImage eid={t.eid_p} defaultSrc={getImage(t.eid_p, t.photo)} alt={`Headshot of ${t.name}`} className="w-10 h-10 rounded-full object-cover" editable={editable} onChange={handleImageChange} />
                                    <div>
                                        <TiptapEditableText eid={t.eid_n} defaultText={getText(t.eid_n, t.name)} className="text-white font-bold text-sm" editable={editable} onChange={handleTextChange} as="p" />
                                        <TiptapEditableText eid={t.eid_h} defaultText={getText(t.eid_h, t.handle)} className="text-xs" style={{ color: '#64748b' }} editable={editable} onChange={handleTextChange} as="p" />
                                    </div>
                                </div>
                                <TiptapEditableText eid={t.eid_t} defaultText={getText(t.eid_t, t.text)} className="text-sm" style={{ color: '#cbd5e1' }} editable={editable} onChange={handleTextChange} as="p" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="py-24" id="pricing" style={{ backgroundColor: '#101622' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <TiptapEditableText eid="pricing_heading" defaultText={getText('pricing_heading', 'Simple Pricing')} className="text-3xl font-bold text-white mb-6" editable={editable} onChange={handleTextChange} as="h2" />
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <span className="text-sm font-medium" style={{ color: '#94a3b8' }}>Monthly</span>
                            <div className="relative cursor-pointer" style={{ width: '56px', height: '32px', backgroundColor: '#135bec', borderRadius: '9999px' }}>
                                <div className="absolute shadow-sm" style={{ right: '4px', top: '4px', width: '24px', height: '24px', backgroundColor: '#fff', borderRadius: '9999px' }} />
                            </div>
                            <span className="text-white text-sm font-medium">Yearly <span className="text-xs ml-1 font-bold" style={{ color: '#4ade80' }}>-20%</span></span>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 items-start">
                        {/* Starter */}
                        <div className="p-8 rounded-2xl transition-colors" style={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <TiptapEditableText eid="starter_name" defaultText={getText('starter_name', 'Starter')} className="text-xl font-bold text-white mb-2" editable={editable} onChange={handleTextChange} as="h3" />
                            <TiptapEditableText eid="starter_price" defaultText={getText('starter_price', '$0/mo')} className="text-3xl font-bold text-white mb-6" editable={editable} onChange={handleTextChange} as="div" />
                            <TiptapEditableText eid="starter_desc" defaultText={getText('starter_desc', 'Perfect for testing the waters.')} className="text-sm mb-6" style={{ color: '#94a3b8' }} editable={editable} onChange={handleTextChange} as="p" />
                            <EditableButton eid="starter_cta" defaultText={getButton('starter_cta', 'Try Free', '#').text} defaultUrl={getButton('starter_cta', 'Try Free', '#').url} className="w-full py-3 rounded-xl text-white font-bold transition-colors mb-8" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }} editable={editable} onChange={onContentChange} />
                            <ul className="flex flex-col gap-3 text-sm" style={{ color: '#cbd5e1' }}>
                                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-lg" style={{ color: '#64748b' }}>check</span> 60 mins of upload/mo</li>
                                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-lg" style={{ color: '#64748b' }}>check</span> 720p export</li>
                                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-lg" style={{ color: '#64748b' }}>check</span> Watermarked</li>
                            </ul>
                        </div>
                        {/* Pro */}
                        <div className="p-8 rounded-2xl relative shadow-2xl" style={{ backgroundColor: '#172033', border: '2px solid #135bec', boxShadow: '0 25px 50px -12px rgba(19,91,236,0.1)', transform: 'translateY(-16px)' }}>
                            <div className="absolute top-0 left-1/2 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg" style={{ transform: 'translate(-50%, -50%)', backgroundColor: '#135bec' }}>Most Popular</div>
                            <TiptapEditableText eid="pro_name" defaultText={getText('pro_name', 'Creator Pro')} className="text-xl font-bold text-white mb-2" editable={editable} onChange={handleTextChange} as="h3" />
                            <TiptapEditableText eid="pro_price" defaultText={getText('pro_price', '$29/mo')} className="text-3xl font-bold text-white mb-6" editable={editable} onChange={handleTextChange} as="div" />
                            <TiptapEditableText eid="pro_desc" defaultText={getText('pro_desc', 'For serious content creators.')} className="text-sm mb-6" style={{ color: '#94a3b8' }} editable={editable} onChange={handleTextChange} as="p" />
                            <EditableButton eid="pro_cta" defaultText={getButton('pro_cta', 'Get Started', '#').text} defaultUrl={getButton('pro_cta', 'Get Started', '#').url} className="w-full py-3 rounded-xl text-white font-bold transition-colors mb-8 shadow-lg" style={{ backgroundColor: '#135bec', boxShadow: '0 10px 15px -3px rgba(19,91,236,0.25)' }} editable={editable} onChange={onContentChange} />
                            <ul className="flex flex-col gap-3 text-sm text-white">
                                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-lg" style={{ color: '#135bec' }}>check</span> 10 hours of upload/mo</li>
                                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-lg" style={{ color: '#135bec' }}>check</span> 4K export quality</li>
                                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-lg" style={{ color: '#135bec' }}>check</span> No watermark</li>
                                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-lg" style={{ color: '#135bec' }}>check</span> Auto-captions</li>
                            </ul>
                        </div>
                        {/* Agency */}
                        <div className="p-8 rounded-2xl transition-colors" style={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <TiptapEditableText eid="agency_name" defaultText={getText('agency_name', 'Agency')} className="text-xl font-bold text-white mb-2" editable={editable} onChange={handleTextChange} as="h3" />
                            <TiptapEditableText eid="agency_price" defaultText={getText('agency_price', '$99/mo')} className="text-3xl font-bold text-white mb-6" editable={editable} onChange={handleTextChange} as="div" />
                            <TiptapEditableText eid="agency_desc" defaultText={getText('agency_desc', 'Power for teams and high volume.')} className="text-sm mb-6" style={{ color: '#94a3b8' }} editable={editable} onChange={handleTextChange} as="p" />
                            <EditableButton eid="agency_cta" defaultText={getButton('agency_cta', 'Contact Sales', '#').text} defaultUrl={getButton('agency_cta', 'Contact Sales', '#').url} className="w-full py-3 rounded-xl text-white font-bold transition-colors mb-8" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }} editable={editable} onChange={onContentChange} />
                            <ul className="flex flex-col gap-3 text-sm" style={{ color: '#cbd5e1' }}>
                                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-lg" style={{ color: '#64748b' }}>check</span> Unlimited uploads</li>
                                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-lg" style={{ color: '#64748b' }}>check</span> Multi-user seats</li>
                                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-lg" style={{ color: '#64748b' }}>check</span> Priority support</li>
                                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-lg" style={{ color: '#64748b' }}>check</span> API Access</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24" id="faq" style={{ backgroundColor: '#020617', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <TiptapEditableText eid="faq_heading" defaultText={getText('faq_heading', 'Frequently Asked Questions')} className="text-3xl font-bold text-white text-center mb-12" editable={editable} onChange={handleTextChange} as="h2" />
                    <div className="flex flex-col gap-4">
                        {[
                            { eid_q: 'faq_1_question', eid_a: 'faq_1_answer', q: 'Does it work with any video platform?', a: 'Yes! We support direct links from YouTube, Twitch, and direct file uploads (MP4, MOV).' },
                            { eid_q: 'faq_2_question', eid_a: 'faq_2_answer', q: 'Can I edit the clips manually after AI?', a: 'Absolutely. The AI gives you a starting point, but you have a full timeline editor to tweak trim points, change captions, and add music.' },
                            { eid_q: 'faq_3_question', eid_a: 'faq_3_answer', q: 'What languages are supported?', a: 'We currently support over 30 languages including English, Spanish, French, German, and Portuguese.' },
                        ].map((faq) => (
                            <div key={faq.eid_q} className="p-6 rounded-xl" style={{ backgroundColor: '#101622', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <TiptapEditableText eid={faq.eid_q} defaultText={getText(faq.eid_q, faq.q)} className="text-lg font-bold text-white mb-2" editable={editable} onChange={handleTextChange} as="h3" />
                                <TiptapEditableText eid={faq.eid_a} defaultText={getText(faq.eid_a, faq.a)} className="text-sm" style={{ color: '#94a3b8' }} editable={editable} onChange={handleTextChange} as="p" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0" style={{ backgroundColor: 'rgba(19,91,236,0.1)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #101622, rgba(16,22,34,0.8), transparent)' }} />
                <div className="relative max-w-4xl mx-auto px-4 text-center" style={{ zIndex: 1 }}>
                    <TiptapEditableText eid="footer_cta_heading" defaultText={getText('footer_cta_heading', 'Ready to go viral?')} className="text-4xl md:text-5xl font-black text-white mb-6" editable={editable} onChange={handleTextChange} as="h2" />
                    <TiptapEditableText eid="footer_cta_desc" defaultText={getText('footer_cta_desc', 'Join thousands of creators saving hours every week. No credit card required.')} className="text-xl mb-10" style={{ color: '#cbd5e1' }} editable={editable} onChange={handleTextChange} as="p" />
                    <EditableButton eid="footer_cta_button" defaultText={getButton('footer_cta_button', 'Start Your Free Trial', '#').text} defaultUrl={getButton('footer_cta_button', 'Start Your Free Trial', '#').url} className="text-white text-lg font-bold rounded-xl transition-all shadow-xl" style={{ height: '56px', padding: '0 40px', backgroundColor: '#135bec' }} editable={editable} onChange={onContentChange} />
                    <TiptapEditableText eid="footer_cta_note" defaultText={getText('footer_cta_note', 'Free 7-day trial. Cancel anytime.')} className="mt-6 text-sm" style={{ color: '#64748b' }} editable={editable} onChange={handleTextChange} as="p" />
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12" style={{ backgroundColor: '#101622', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined" style={{ color: '#135bec' }}>movie_edit</span>
                        <TiptapEditableText eid="footer_brand" defaultText={getText('footer_brand', 'SuperClipsAI')} className="text-white font-bold" editable={editable} onChange={handleTextChange} as="span" />
                    </div>
                    <div className="flex gap-6 text-sm" style={{ color: '#94a3b8' }}>
                        <a className="transition-colors hover:text-white" href="#">Privacy</a>
                        <a className="transition-colors hover:text-white" href="#">Terms</a>
                        <a className="transition-colors hover:text-white" href="#">Twitter</a>
                    </div>
                    <TiptapEditableText eid="footer_copyright" defaultText={getText('footer_copyright', '© 2023 SuperClipsAI. All rights reserved.')} className="text-sm" style={{ color: '#4b5563' }} editable={editable} onChange={handleTextChange} as="div" />
                </div>
            </footer>
        </div>
    );
}
