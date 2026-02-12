'use client';

import { EditableImage } from '@/components/editor/editable-image';
import { EditableButton } from '@/components/editor/editable-button';
import { TiptapEditableText } from '@/components/editor/tiptap-editable-text';
import { BaseTemplateProps } from '@/types/template';

interface EnergyRevolutionProps extends BaseTemplateProps {
    onContentChange?: (eid: string, value: unknown) => void;
}

export default function EnergyRevolution({ editable = false, data = {}, onContentChange }: EnergyRevolutionProps) {
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
        if (onContentChange) {
            onContentChange(eid, { text: content });
        }
    };

    const handleImageChange = (eid: string, imgData: { image: string; linkUrl?: string | undefined }) => {
        if (onContentChange) {
            onContentChange(eid, imgData);
        }
    };

    return (
        <div className="w-full overflow-x-hidden" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {/* Google Fonts & Material Symbols Preconnect */}
            <link href="https://fonts.googleapis.com" rel="preconnect" />
            <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
            <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Noto+Sans:wght@300..700&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

            {/* Utility Trust Bar */}
            <div className="w-full py-3 px-4 border-b" style={{ backgroundColor: '#140c1d', borderColor: '#374151' }}>
                <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 md:gap-12 text-sm font-medium tracking-wide uppercase text-white">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px]" style={{ color: '#7b00ff' }}>savings</span>
                        <TiptapEditableText
                            eid="trust_1"
                            defaultText={getText('trust_1', 'Low Cost Setup')}
                            className="text-sm font-medium tracking-wide uppercase text-white"
                            editable={editable}
                            onChange={handleTextChange}
                            as="span"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px]" style={{ color: '#7b00ff' }}>build</span>
                        <TiptapEditableText
                            eid="trust_2"
                            defaultText={getText('trust_2', 'Beginner Friendly')}
                            className="text-sm font-medium tracking-wide uppercase text-white"
                            editable={editable}
                            onChange={handleTextChange}
                            as="span"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px]" style={{ color: '#7b00ff' }}>backpack</span>
                        <TiptapEditableText
                            eid="trust_3"
                            defaultText={getText('trust_3', 'Portable Design')}
                            className="text-sm font-medium tracking-wide uppercase text-white"
                            editable={editable}
                            onChange={handleTextChange}
                            as="span"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px]" style={{ color: '#7b00ff' }}>verified_user</span>
                        <TiptapEditableText
                            eid="trust_4"
                            defaultText={getText('trust_4', '60-Day Guarantee')}
                            className="text-sm font-medium tracking-wide uppercase text-white"
                            editable={editable}
                            onChange={handleTextChange}
                            as="span"
                        />
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <header className="relative w-full min-h-[600px] flex flex-col justify-center items-center overflow-hidden" style={{ backgroundColor: '#1e293b' }}>
                {/* Technical Grid Background */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundSize: '40px 40px',
                        backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                    }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(30,41,59,0.8), rgba(30,41,59,0.5), #1e293b)' }} />

                <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center text-center gap-8 max-w-4xl">
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                        style={{ backgroundColor: 'rgba(123,0,255,0.2)', border: '1px solid rgba(123,0,255,0.3)' }}
                    >
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#7b00ff' }} />
                        <TiptapEditableText
                            eid="hero_badge"
                            defaultText={getText('hero_badge', 'New Variant 2.0 Available')}
                            className="text-xs font-bold uppercase tracking-wider text-white"
                            editable={editable}
                            onChange={handleTextChange}
                            as="span"
                        />
                    </div>

                    <TiptapEditableText
                        eid="hero_headline"
                        defaultText={getText('hero_headline', 'TAKE CONTROL OF YOUR POWER')}
                        className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight"
                        editable={editable}
                        onChange={handleTextChange}
                        as="h1"
                    />

                    <TiptapEditableText
                        eid="hero_description"
                        defaultText={getText('hero_description', 'Stop relying on the grid. Build your own independent energy source this weekend with our simple, industrial-grade DIY system.')}
                        className="text-lg md:text-xl max-w-2xl font-light"
                        style={{ color: '#d1d5db' }}
                        editable={editable}
                        onChange={handleTextChange}
                        as="p"
                    />

                    <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
                        <EditableButton
                            eid="hero_cta_primary"
                            defaultText={getButton('hero_cta_primary', 'Watch Free Presentation', '#').text}
                            defaultUrl={getButton('hero_cta_primary', 'Watch Free Presentation', '#').url}
                            className="text-white text-lg font-bold py-4 px-10 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3"
                            style={{ backgroundColor: '#7b00ff', boxShadow: '0 0 20px rgba(123,0,255,0.5)' }}
                            editable={editable}
                            onChange={onContentChange}
                        />
                        <EditableButton
                            eid="hero_cta_secondary"
                            defaultText={getButton('hero_cta_secondary', 'How it Works', '#').text}
                            defaultUrl={getButton('hero_cta_secondary', 'How it Works', '#').url}
                            className="bg-transparent text-white text-lg font-medium py-4 px-10 rounded-lg transition-colors flex items-center justify-center gap-3"
                            style={{ border: '1px solid #6b7280' }}
                            editable={editable}
                            onChange={onContentChange}
                        />
                    </div>

                    <div className="mt-8 pt-8 w-full max-w-lg flex justify-between text-xs sm:text-sm" style={{ borderTop: '1px solid #374151', color: '#9ca3af' }}>
                        <TiptapEditableText
                            eid="hero_stat_1"
                            defaultText={getText('hero_stat_1', 'Over 5,000+ Downloads')}
                            className="text-xs sm:text-sm"
                            style={{ color: '#9ca3af' }}
                            editable={editable}
                            onChange={handleTextChange}
                            as="span"
                        />
                        <span>•</span>
                        <TiptapEditableText
                            eid="hero_stat_2"
                            defaultText={getText('hero_stat_2', 'Instant Access')}
                            className="text-xs sm:text-sm"
                            style={{ color: '#9ca3af' }}
                            editable={editable}
                            onChange={handleTextChange}
                            as="span"
                        />
                        <span>•</span>
                        <TiptapEditableText
                            eid="hero_stat_3"
                            defaultText={getText('hero_stat_3', 'Lifetime Updates')}
                            className="text-xs sm:text-sm"
                            style={{ color: '#9ca3af' }}
                            editable={editable}
                            onChange={handleTextChange}
                            as="span"
                        />
                    </div>
                </div>
            </header>

            {/* The Solution Section (Z-Pattern) */}
            <section className="py-24 px-4 overflow-hidden" style={{ backgroundColor: '#f7f5f8' }}>
                <div className="container mx-auto max-w-6xl flex flex-col gap-24">
                    {/* Row 1: Text Left, Graphic Right */}
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="flex-1 flex flex-col gap-6">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(123,0,255,0.1)', color: '#7b00ff' }}>
                                <span className="material-symbols-outlined text-3xl">architecture</span>
                            </div>
                            <TiptapEditableText
                                eid="solution_1_title"
                                defaultText={getText('solution_1_title', 'Detailed Blueprints Anyone Can Follow')}
                                className="text-3xl md:text-4xl font-bold leading-tight"
                                style={{ color: '#140c1d' }}
                                editable={editable}
                                onChange={handleTextChange}
                                as="h2"
                            />
                            <TiptapEditableText
                                eid="solution_1_description"
                                defaultText={getText('solution_1_description', 'Crystal clear schematics designed for absolute beginners. No engineering degree required. We break down every connection, wire, and bolt so you can build with total confidence in a single afternoon.')}
                                className="text-lg leading-relaxed"
                                style={{ color: '#4b5563' }}
                                editable={editable}
                                onChange={handleTextChange}
                                as="p"
                            />
                            <ul className="flex flex-col gap-3 mt-2">
                                <li className="flex items-center gap-3" style={{ color: '#374151' }}>
                                    <span className="material-symbols-outlined text-sm" style={{ color: '#7b00ff' }}>check_circle</span>
                                    <TiptapEditableText
                                        eid="solution_1_check_1"
                                        defaultText={getText('solution_1_check_1', 'High-resolution PDF schematics')}
                                        className=""
                                        style={{ color: '#374151' }}
                                        editable={editable}
                                        onChange={handleTextChange}
                                        as="span"
                                    />
                                </li>
                                <li className="flex items-center gap-3" style={{ color: '#374151' }}>
                                    <span className="material-symbols-outlined text-sm" style={{ color: '#7b00ff' }}>check_circle</span>
                                    <TiptapEditableText
                                        eid="solution_1_check_2"
                                        defaultText={getText('solution_1_check_2', 'Printable oversized layouts')}
                                        className=""
                                        style={{ color: '#374151' }}
                                        editable={editable}
                                        onChange={handleTextChange}
                                        as="span"
                                    />
                                </li>
                            </ul>
                        </div>
                        <div className="flex-1 w-full">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl p-2 group" style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}>
                                <div className="absolute inset-0 group-hover:bg-transparent transition-colors z-10 pointer-events-none" style={{ backgroundColor: 'rgba(123,0,255,0.05)' }} />
                                <EditableImage
                                    eid="solution_1_image"
                                    defaultSrc={getImage('solution_1_image', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeZfLV31aSiAYRZiqIzqXOIOlN7nQ1Jka-2Bclz5YkUJastfxfjgBuSbf-jSCEfix6MxhxDtXENgxDrP5zLFVz2KioW2zj9u5-W--tdqwmFV8AvnQmcpCUJxx9h4WwtsEd1wWHSltAJRE2Hm4xxECUZSF9EEIjrEYxQv__wwxSDTCCnFCZo7YbjjD3YGZY3lxHj5M56v9RICURz74cSaGBFBaxsJ9chBytQFYqCasY8UcR2UOCbHTTTM9BuZLP3wJEJabxREMt9__w')}
                                    alt="Close up of technical blueprints and schematics on a table"
                                    className="w-full h-auto rounded-xl object-cover"
                                    style={{ aspectRatio: '4/3' }}
                                    editable={editable}
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Graphic Left, Text Right */}
                    <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="flex-1 w-full">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl p-2 group" style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}>
                                <div className="absolute inset-0 flex items-center justify-center z-20">
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform" style={{ backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)' }}>
                                        <span className="material-symbols-outlined text-4xl ml-1" style={{ color: '#7b00ff' }}>play_arrow</span>
                                    </div>
                                </div>
                                <EditableImage
                                    eid="solution_2_image"
                                    defaultSrc={getImage('solution_2_image', 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_bNRZDM0fy8MH603VPK8cTy53FTZFlj2jszDqU_Z56PfKX2OVUc6iC4pPr6bxupDnZR1Tb1703Hvy7BjvfqmTb6je18vOsgQ4Q5NW3ut6tRMVnErVAEpdy43jLGf90yi8z-GwJnEnj-HZpPp1e1_6lM2HHIwnpRwbqE5_w1oixyguivGz2PSH6egUv_eZvALIAKjht5In2qC1adoiUP_2FhR7qNhDU7zbmkd20A4bcorAyPFRVlg9gwCXX5dElxyrSCeGBKI1DAkF')}
                                    alt="Hands assembling electronic components on a workbench"
                                    className="w-full h-auto rounded-xl object-cover opacity-90"
                                    style={{ aspectRatio: '4/3' }}
                                    editable={editable}
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col gap-6">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(123,0,255,0.1)', color: '#7b00ff' }}>
                                <span className="material-symbols-outlined text-3xl">smart_display</span>
                            </div>
                            <TiptapEditableText
                                eid="solution_2_title"
                                defaultText={getText('solution_2_title', 'Step-by-Step Video Guide')}
                                className="text-3xl md:text-4xl font-bold leading-tight"
                                style={{ color: '#140c1d' }}
                                editable={editable}
                                onChange={handleTextChange}
                                as="h2"
                            />
                            <TiptapEditableText
                                eid="solution_2_description"
                                defaultText={getText('solution_2_description', "Don't just read about it, watch it done. Our HD video library walks you through the entire build process from start to finish. It's like having a master electrician looking over your shoulder.")}
                                className="text-lg leading-relaxed"
                                style={{ color: '#4b5563' }}
                                editable={editable}
                                onChange={handleTextChange}
                                as="p"
                            />
                            <ul className="flex flex-col gap-3 mt-2">
                                <li className="flex items-center gap-3" style={{ color: '#374151' }}>
                                    <span className="material-symbols-outlined text-sm" style={{ color: '#7b00ff' }}>check_circle</span>
                                    <TiptapEditableText
                                        eid="solution_2_check_1"
                                        defaultText={getText('solution_2_check_1', '4K Quality streaming')}
                                        className=""
                                        style={{ color: '#374151' }}
                                        editable={editable}
                                        onChange={handleTextChange}
                                        as="span"
                                    />
                                </li>
                                <li className="flex items-center gap-3" style={{ color: '#374151' }}>
                                    <span className="material-symbols-outlined text-sm" style={{ color: '#7b00ff' }}>check_circle</span>
                                    <TiptapEditableText
                                        eid="solution_2_check_2"
                                        defaultText={getText('solution_2_check_2', 'Mobile-friendly for the garage')}
                                        className=""
                                        style={{ color: '#374151' }}
                                        editable={editable}
                                        onChange={handleTextChange}
                                        as="span"
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Row 3: Text Left, Graphic Right */}
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="flex-1 flex flex-col gap-6">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(123,0,255,0.1)', color: '#7b00ff' }}>
                                <span className="material-symbols-outlined text-3xl">list_alt</span>
                            </div>
                            <TiptapEditableText
                                eid="solution_3_title"
                                defaultText={getText('solution_3_title', 'Smart Component List & Sourcing Guide')}
                                className="text-3xl md:text-4xl font-bold leading-tight"
                                style={{ color: '#140c1d' }}
                                editable={editable}
                                onChange={handleTextChange}
                                as="h2"
                            />
                            <TiptapEditableText
                                eid="solution_3_description"
                                defaultText={getText('solution_3_description', 'Stop guessing what to buy. We provide a complete shopping list with links to the best deals. We prioritize parts you can find at any local hardware store or easily order online for cheap.')}
                                className="text-lg leading-relaxed"
                                style={{ color: '#4b5563' }}
                                editable={editable}
                                onChange={handleTextChange}
                                as="p"
                            />
                            <ul className="flex flex-col gap-3 mt-2">
                                <li className="flex items-center gap-3" style={{ color: '#374151' }}>
                                    <span className="material-symbols-outlined text-sm" style={{ color: '#7b00ff' }}>check_circle</span>
                                    <TiptapEditableText
                                        eid="solution_3_check_1"
                                        defaultText={getText('solution_3_check_1', 'Direct links to verified sellers')}
                                        className=""
                                        style={{ color: '#374151' }}
                                        editable={editable}
                                        onChange={handleTextChange}
                                        as="span"
                                    />
                                </li>
                                <li className="flex items-center gap-3" style={{ color: '#374151' }}>
                                    <span className="material-symbols-outlined text-sm" style={{ color: '#7b00ff' }}>check_circle</span>
                                    <TiptapEditableText
                                        eid="solution_3_check_2"
                                        defaultText={getText('solution_3_check_2', 'Alternative parts for budget builds')}
                                        className=""
                                        style={{ color: '#374151' }}
                                        editable={editable}
                                        onChange={handleTextChange}
                                        as="span"
                                    />
                                </li>
                            </ul>
                        </div>
                        <div className="flex-1 w-full">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl p-2 group" style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}>
                                <EditableImage
                                    eid="solution_3_image"
                                    defaultSrc={getImage('solution_3_image', 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6Td71jk5IktDvk3K2AUK974R1v-ZinIdRFoV_zaP0LY7bQqyhWkm8kzb0KU8QXmqaRXjBJO8MsBWu7PTikMMVYjZRUrPtPeHSv-ZfHZLrLevXknFHggwcwvpqWCTRTYqY-mkkmkAVSoNj90xIijh_pk2ddAULIDRoENdXtecciObJXJ1yqHVXsd11lMAKtCMy5sQj2qHk9kkvtwM349OkdozUDks79Sk3ezyXcHiY3Hjs3W5vAY21Eh31J5zkGa_MhsDB-g4kwAY6')}
                                    alt="Organized layout of tools and electrical components"
                                    className="w-full h-auto rounded-xl object-cover"
                                    style={{ aspectRatio: '4/3' }}
                                    editable={editable}
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof Section */}
            <section className="py-24 px-4" style={{ backgroundColor: '#f3f4f6', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-16">
                        <TiptapEditableText
                            eid="social_heading"
                            defaultText={getText('social_heading', 'Join 5,000+ Energy Revolutionaries')}
                            className="text-3xl md:text-4xl font-bold mb-4"
                            style={{ color: '#140c1d' }}
                            editable={editable}
                            onChange={handleTextChange}
                            as="h2"
                        />
                        <TiptapEditableText
                            eid="social_subheading"
                            defaultText={getText('social_subheading', 'Real people taking back control of their power bills.')}
                            className=""
                            style={{ color: '#4b5563' }}
                            editable={editable}
                            onChange={handleTextChange}
                            as="p"
                        />
                    </div>

                    {/* Testimonial Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="p-8 rounded-xl shadow-sm flex flex-col gap-6" style={{ backgroundColor: '#ffffff', border: '1px solid #f3f4f6' }}>
                            <div className="flex gap-1" style={{ color: '#facc15' }}>
                                <span className="material-symbols-outlined text-xl">star</span>
                                <span className="material-symbols-outlined text-xl">star</span>
                                <span className="material-symbols-outlined text-xl">star</span>
                                <span className="material-symbols-outlined text-xl">star</span>
                                <span className="material-symbols-outlined text-xl">star</span>
                            </div>
                            <TiptapEditableText
                                eid="testimonial_1_text"
                                defaultText={getText('testimonial_1_text', '"I built this in my garage in two days and cut my bill in half. The instructions were surprisingly easy to follow, even for someone who isn\'t \'handy\'."')}
                                className="leading-relaxed italic"
                                style={{ color: '#374151' }}
                                editable={editable}
                                onChange={handleTextChange}
                                as="p"
                            />
                            <div className="flex items-center gap-4 mt-auto">
                                <EditableImage
                                    eid="testimonial_1_photo"
                                    defaultSrc={getImage('testimonial_1_photo', 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7C_ImUyHStKVeP3r-fbAQPFYy50hdQkS7OXeQ11xXlw81_6OWg5ueQ-DHgZ-g8mPiZ6ZD8CI_BFjkFnmbhP9pDYBuN9sewUXITNKrMZdo0eShql99WwwidvVn118w5WkFgpVag6etoecBxt1nb8D9HoNtzkAwovJMBQLQ_667mOA-iQQIinOChNtTWGjEvdzJfHJ0y8vYmxnOJJ6r7xYb5CPG7miLp-L98jJsFZBO_MEmfg10k_z8yyk74HuaxdG4ciLGr7PxAtxC')}
                                    alt="Portrait of smiling man"
                                    className="w-12 h-12 rounded-full object-cover"
                                    style={{ backgroundColor: '#e5e7eb' }}
                                    editable={editable}
                                    onChange={handleImageChange}
                                />
                                <div>
                                    <TiptapEditableText
                                        eid="testimonial_1_name"
                                        defaultText={getText('testimonial_1_name', 'Mark Thompson')}
                                        className="font-bold text-sm"
                                        style={{ color: '#140c1d' }}
                                        editable={editable}
                                        onChange={handleTextChange}
                                        as="h4"
                                    />
                                    <TiptapEditableText
                                        eid="testimonial_1_location"
                                        defaultText={getText('testimonial_1_location', 'Arizona, USA')}
                                        className="text-xs"
                                        style={{ color: '#6b7280' }}
                                        editable={editable}
                                        onChange={handleTextChange}
                                        as="p"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="p-8 rounded-xl shadow-sm flex flex-col gap-6" style={{ backgroundColor: '#ffffff', border: '1px solid #f3f4f6' }}>
                            <div className="flex gap-1" style={{ color: '#facc15' }}>
                                <span className="material-symbols-outlined text-xl">star</span>
                                <span className="material-symbols-outlined text-xl">star</span>
                                <span className="material-symbols-outlined text-xl">star</span>
                                <span className="material-symbols-outlined text-xl">star</span>
                                <span className="material-symbols-outlined text-xl">star</span>
                            </div>
                            <TiptapEditableText
                                eid="testimonial_2_text"
                                defaultText={getText('testimonial_2_text', '"Finally, a system that actually makes sense. I was quoted $15k for a professional install. Did this myself for a fraction of the cost."')}
                                className="leading-relaxed italic"
                                style={{ color: '#374151' }}
                                editable={editable}
                                onChange={handleTextChange}
                                as="p"
                            />
                            <div className="flex items-center gap-4 mt-auto">
                                <EditableImage
                                    eid="testimonial_2_photo"
                                    defaultSrc={getImage('testimonial_2_photo', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtyKeZxkqpsdKnYSmEmLTQ71Pk1ISDDwwiiYWg7UPWyffYner9K3j6p7SAZFxoNTLNRXWpYGVXIxsvzCNuNgOIW4B-YLDtmqCDFme1KQ6SRxZsNd3QalhqpW38GX7TsO4QXfD3cu4VQkahDcsTKhPfUTNxAjO_1xTuEqjSF0jGlXN4zx2VnYDLuNbzUNbdGk44JkIDk0bajoaN-3tvOwLMQrAEIWaVTxWUt1FLzVM06NdL1QrHMX2i71eWTFojj1DizsPhCQXL6hwz')}
                                    alt="Portrait of woman looking confident"
                                    className="w-12 h-12 rounded-full object-cover"
                                    style={{ backgroundColor: '#e5e7eb' }}
                                    editable={editable}
                                    onChange={handleImageChange}
                                />
                                <div>
                                    <TiptapEditableText
                                        eid="testimonial_2_name"
                                        defaultText={getText('testimonial_2_name', 'Sarah Jenkins')}
                                        className="font-bold text-sm"
                                        style={{ color: '#140c1d' }}
                                        editable={editable}
                                        onChange={handleTextChange}
                                        as="h4"
                                    />
                                    <TiptapEditableText
                                        eid="testimonial_2_location"
                                        defaultText={getText('testimonial_2_location', 'Texas, USA')}
                                        className="text-xs"
                                        style={{ color: '#6b7280' }}
                                        editable={editable}
                                        onChange={handleTextChange}
                                        as="p"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="p-8 rounded-xl shadow-sm flex flex-col gap-6 hidden lg:flex" style={{ backgroundColor: '#ffffff', border: '1px solid #f3f4f6' }}>
                            <div className="flex gap-1" style={{ color: '#facc15' }}>
                                <span className="material-symbols-outlined text-xl">star</span>
                                <span className="material-symbols-outlined text-xl">star</span>
                                <span className="material-symbols-outlined text-xl">star</span>
                                <span className="material-symbols-outlined text-xl">star</span>
                                <span className="material-symbols-outlined text-xl">star</span>
                            </div>
                            <TiptapEditableText
                                eid="testimonial_3_text"
                                defaultText={getText('testimonial_3_text', '"The video guides were the game changer for me. Being able to see exactly where each wire goes gave me the confidence to start."')}
                                className="leading-relaxed italic"
                                style={{ color: '#374151' }}
                                editable={editable}
                                onChange={handleTextChange}
                                as="p"
                            />
                            <div className="flex items-center gap-4 mt-auto">
                                <EditableImage
                                    eid="testimonial_3_photo"
                                    defaultSrc={getImage('testimonial_3_photo', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAtQ1LM8S2BM-aVAMlnek0VcYJxOYY0AcibIILaxTMg4MQie4DI9U2-N2GpysOrLzXkK45DuVhES_m-yJYw1hGNVcmyGYTRM_PCh2QgjtdeXu8zrFPtS2kmCbgn3r-Addg1mL-px8RMkgm-C1Rxj1Xlhpc1WeSRiJjGm6Sy5u76PFui_FCHYaopCcUWTd1KIYxwrf_C1FpLZrTpCb_-SgTtJSDFBI8QT2d4TRO70PbXciwauEZbebA6CDqIVchoU2L4xkRc0SwwgRa')}
                                    alt="Portrait of older man with glasses"
                                    className="w-12 h-12 rounded-full object-cover"
                                    style={{ backgroundColor: '#e5e7eb' }}
                                    editable={editable}
                                    onChange={handleImageChange}
                                />
                                <div>
                                    <TiptapEditableText
                                        eid="testimonial_3_name"
                                        defaultText={getText('testimonial_3_name', 'Robert Alistair')}
                                        className="font-bold text-sm"
                                        style={{ color: '#140c1d' }}
                                        editable={editable}
                                        onChange={handleTextChange}
                                        as="h4"
                                    />
                                    <TiptapEditableText
                                        eid="testimonial_3_location"
                                        defaultText={getText('testimonial_3_location', 'Nevada, USA')}
                                        className="text-xs"
                                        style={{ color: '#6b7280' }}
                                        editable={editable}
                                        onChange={handleTextChange}
                                        as="p"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <footer className="text-white pt-20 pb-10 px-4" style={{ backgroundColor: '#1e293b' }}>
                <div className="container mx-auto max-w-4xl flex flex-col items-center">
                    {/* CTA Box */}
                    <div className="w-full rounded-2xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden mb-16" style={{ background: 'linear-gradient(to bottom right, #7b00ff, #5e00c4)' }}>
                        {/* Decorative circles */}
                        <div className="absolute top-0 left-0 w-32 h-32 opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2" style={{ backgroundColor: '#ffffff' }} />
                        <div className="absolute bottom-0 right-0 w-48 h-48 opacity-10 rounded-full translate-x-1/3 translate-y-1/3" style={{ backgroundColor: '#000000' }} />

                        <div className="relative z-10 flex flex-col items-center gap-6">
                            <TiptapEditableText
                                eid="footer_cta_heading"
                                defaultText={getText('footer_cta_heading', 'Ready to build your future?')}
                                className="text-3xl md:text-4xl font-bold tracking-tight text-white"
                                editable={editable}
                                onChange={handleTextChange}
                                as="h2"
                            />
                            <TiptapEditableText
                                eid="footer_cta_description"
                                defaultText={getText('footer_cta_description', 'Get instant access to the blueprints, video guides, and component lists today.')}
                                className="max-w-xl text-lg"
                                style={{ color: '#e9d5ff' }}
                                editable={editable}
                                onChange={handleTextChange}
                                as="p"
                            />
                            <EditableButton
                                eid="footer_cta_button"
                                defaultText={getButton('footer_cta_button', 'Access the Blueprints Now', '#').text}
                                defaultUrl={getButton('footer_cta_button', 'Access the Blueprints Now', '#').url}
                                className="text-lg font-bold py-4 px-12 rounded-lg shadow-lg transition-all transform hover:scale-105 mt-2"
                                style={{ backgroundColor: '#ffffff', color: '#7b00ff' }}
                                editable={editable}
                                onChange={onContentChange}
                            />
                            <TiptapEditableText
                                eid="footer_cta_secure"
                                defaultText={getText('footer_cta_secure', '100% Secure Checkout • 60-Day Money Back Guarantee')}
                                className="text-xs mt-2 opacity-80"
                                style={{ color: '#e9d5ff' }}
                                editable={editable}
                                onChange={handleTextChange}
                                as="p"
                            />
                        </div>
                    </div>

                    {/* Footer Links */}
                    <div className="flex flex-col md:flex-row justify-between w-full pt-8 gap-8" style={{ borderTop: '1px solid #374151' }}>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2 text-white">
                                <div className="w-6 h-6">
                                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                        <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd" />
                                    </svg>
                                </div>
                                <TiptapEditableText
                                    eid="footer_brand"
                                    defaultText={getText('footer_brand', 'Energy Revolution System')}
                                    className="font-bold text-lg tracking-tight text-white"
                                    editable={editable}
                                    onChange={handleTextChange}
                                    as="span"
                                />
                            </div>
                            <TiptapEditableText
                                eid="footer_description"
                                defaultText={getText('footer_description', 'Empowering individuals to achieve energy independence through education and actionable DIY plans.')}
                                className="text-sm max-w-xs"
                                style={{ color: '#9ca3af' }}
                                editable={editable}
                                onChange={handleTextChange}
                                as="p"
                            />
                        </div>
                        <div className="flex flex-wrap gap-12">
                            <div className="flex flex-col gap-3">
                                <h5 className="font-bold text-sm uppercase tracking-wider" style={{ color: '#d1d5db' }}>Product</h5>
                                <a className="text-sm transition-colors hover:opacity-80" href="#" style={{ color: '#9ca3af' }}>Blueprints</a>
                                <a className="text-sm transition-colors hover:opacity-80" href="#" style={{ color: '#9ca3af' }}>Video Guides</a>
                                <a className="text-sm transition-colors hover:opacity-80" href="#" style={{ color: '#9ca3af' }}>Component List</a>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h5 className="font-bold text-sm uppercase tracking-wider" style={{ color: '#d1d5db' }}>Support</h5>
                                <a className="text-sm transition-colors hover:opacity-80" href="#" style={{ color: '#9ca3af' }}>FAQ</a>
                                <a className="text-sm transition-colors hover:opacity-80" href="#" style={{ color: '#9ca3af' }}>Contact Us</a>
                                <a className="text-sm transition-colors hover:opacity-80" href="#" style={{ color: '#9ca3af' }}>Login</a>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h5 className="font-bold text-sm uppercase tracking-wider" style={{ color: '#d1d5db' }}>Legal</h5>
                                <a className="text-sm transition-colors hover:opacity-80" href="#" style={{ color: '#9ca3af' }}>Privacy Policy</a>
                                <a className="text-sm transition-colors hover:opacity-80" href="#" style={{ color: '#9ca3af' }}>Terms of Service</a>
                                <a className="text-sm transition-colors hover:opacity-80" href="#" style={{ color: '#9ca3af' }}>Disclaimer</a>
                            </div>
                        </div>
                    </div>

                    <div className="w-full text-center mt-12 text-xs" style={{ color: '#4b5563' }}>
                        <TiptapEditableText
                            eid="footer_copyright"
                            defaultText={getText('footer_copyright', '© 2023 Energy Revolution System. All rights reserved.')}
                            className="text-xs"
                            style={{ color: '#4b5563' }}
                            editable={editable}
                            onChange={handleTextChange}
                            as="p"
                        />
                    </div>
                </div>
            </footer>
        </div>
    );
}
