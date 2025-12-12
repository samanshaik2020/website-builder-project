'use client';

import React, { useState } from 'react';
import { BaseTemplateProps } from '@/types/template';
import { EditableButton } from '@/components/editor/editable-button';
import { EditableImage } from '@/components/editor/editable-image';

export default function PhotoFolio({ editable = false, data = {}, onContentChange }: BaseTemplateProps) {
    const [view, setView] = useState<'home' | 'quiz' | 'result'>('home');
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [answers, setAnswers] = useState<Record<number, number>>({});

    const getText = (id: string, defaultValue: string) => {
        return data[id]?.text || defaultValue;
    };

    const getButton = (id: string, defaultText: string, defaultUrl: string) => {
        return {
            text: data[id]?.button?.text || defaultText,
            url: data[id]?.button?.url || defaultUrl,
        };
    };



    const handleStartQuiz = () => {
        setView('quiz');
        setCurrentQuestion(1);
        setAnswers({});
    };

    const handleOptionSelect = (optionIndex: number) => {
        if (editable) return;
        setAnswers(prev => ({ ...prev, [currentQuestion]: optionIndex }));
    };

    const handleNextQuestion = () => {
        if (currentQuestion < 5) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setView('result');
        }
    };

    const handleRestart = () => {
        if (!editable) {
            setView('home');
            setCurrentQuestion(1);
            setAnswers({});
        }
    };

    // Safe navigation in editor
    const EditorNav = () => {
        if (!editable) return null;
        return (
            <div className="fixed bottom-4 right-4 z-50 flex gap-2 bg-black/80 p-2 rounded-lg text-white text-xs">
                <button onClick={() => setView('home')} className={`px-2 py-1 rounded ${view === 'home' ? 'bg-primary' : 'hover:bg-white/20'}`}>Home</button>
                <button onClick={() => setView('quiz')} className={`px-2 py-1 rounded ${view === 'quiz' ? 'bg-primary' : 'hover:bg-white/20'}`}>Quiz</button>
                <button onClick={() => setView('result')} className={`px-2 py-1 rounded ${view === 'result' ? 'bg-primary' : 'hover:bg-white/20'}`}>Result</button>
            </div>
        );
    };

    return (
        <div className="font-display bg-[#f6f8f8] text-[#101f22] min-h-screen flex flex-col relative group/design-root overflow-x-hidden">

            {/* Editor Helper Navigation */}
            <EditorNav />

            {/* Header */}
            {view === 'home' && (
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200/80 px-4 sm:px-10 py-3">
                    <div className="flex items-center gap-4 text-[#101f22]">
                        <div className="size-6 text-[#13c8ec]">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <h2
                            data-eid="nav_logo"
                            contentEditable={editable}
                            suppressContentEditableWarning
                            className="text-lg font-bold leading-tight tracking-[-0.015em] whitespace-pre-wrap break-words"
                        >
                            {getText('nav_logo', 'PhotoFolio')}
                        </h2>
                    </div>
                    <div className="hidden md:flex flex-1 justify-end gap-8">
                        <div className="flex items-center gap-9">
                            <span
                                data-eid="nav_link_1"
                                contentEditable={editable}
                                suppressContentEditableWarning
                                className="text-sm font-medium leading-normal hover:text-[#13c8ec] transition-colors cursor-pointer"
                            >
                                {getText('nav_link_1', 'Home')}
                            </span>
                            <span
                                data-eid="nav_link_2"
                                contentEditable={editable}
                                suppressContentEditableWarning
                                className="text-sm font-medium leading-normal hover:text-[#13c8ec] transition-colors cursor-pointer"
                            >
                                {getText('nav_link_2', 'Gallery')}
                            </span>
                            <span
                                data-eid="nav_link_3"
                                contentEditable={editable}
                                suppressContentEditableWarning
                                className="text-sm font-medium leading-normal hover:text-[#13c8ec] transition-colors cursor-pointer"
                            >
                                {getText('nav_link_3', 'About')}
                            </span>
                            <span
                                data-eid="nav_link_4"
                                contentEditable={editable}
                                suppressContentEditableWarning
                                className="text-sm font-medium leading-normal hover:text-[#13c8ec] transition-colors cursor-pointer"
                            >
                                {getText('nav_link_4', 'Contact')}
                            </span>
                        </div>
                        <EditableButton
                            eid="nav_cta"
                            defaultText={getButton('nav_cta', 'Get in Touch', '#').text}
                            defaultUrl="#"
                            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#13c8ec] text-black text-sm font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors"
                            editable={editable}
                            onChange={onContentChange}
                        />
                    </div>
                </header>
            )}

            {/* HOME VIEW */}
            {view === 'home' && (
                <main className="flex-grow flex flex-col">
                    <section className="py-10 sm:py-16 px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-[960px] mx-auto">
                            <div className="flex flex-col gap-6">
                                <h1
                                    data-eid="hero_title"
                                    contentEditable={editable}
                                    suppressContentEditableWarning
                                    className="text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] whitespace-pre-wrap break-words"
                                >
                                    {getText('hero_title', 'Capturing Moments, Creating Memories')}
                                </h1>
                                <p
                                    data-eid="hero_description"
                                    contentEditable={editable}
                                    suppressContentEditableWarning
                                    className="text-base font-normal leading-normal text-gray-600 whitespace-pre-wrap break-words"
                                >
                                    {getText('hero_description', "Our passion is to frame the world's beauty through our lenses. This gallery represents a curated collection of our finest work, showcasing diverse subjects and stunning landscapes from across the globe. Each photograph tells a unique story.")}
                                </p>
                                <div className="flex pt-2">
                                    <button
                                        onClick={handleStartQuiz}
                                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-[#13c8ec] text-black text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors"
                                    >
                                        {getButton('hero_cta', 'Take Our Quiz', '#').text}
                                    </button>
                                </div>
                            </div>
                            <div className="w-full">
                                <EditableImage
                                    eid="hero_image"
                                    defaultSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuD1KN39_GDhKQWgQeWM0NYgnkwOa8fwWLB-Pu2HnHvVC8z07JHd4GvRWhAQxTzmoKBxbSHjao4ktyTm8it_v-HNnY_0xc7fmy92YezymxClB2oGVmtahOinzEQfaji9_tF1QcV0dDskPsbxtqvX2rXtHfLVQrH_-GMFw6KnSezJqmdDc1fP4o7BI5nQJJxupI9HXDXbfpIfjBgACt7oN8ukhiWjjsyMVSRLW4mnNL7frfVJsnRpC_c_agCxyVAPmDfqJ7391Jfumyw"
                                    className="w-full bg-center bg-no-repeat aspect-square sm:aspect-[4/3] bg-cover rounded-xl"
                                    editable={editable}
                                    onChange={(eid, data) => onContentChange?.(eid, data)}
                                />
                            </div>
                        </div>
                    </section>
                    <section className="px-4 py-8 sm:py-12">
                        <div className="max-w-4xl mx-auto space-y-6 text-gray-700">
                            <p
                                data-eid="about_text_1"
                                contentEditable={editable}
                                suppressContentEditableWarning
                                className="text-lg leading-relaxed whitespace-pre-wrap break-words"
                            >
                                {getText('about_text_1', "Below, you'll find a more in-depth look into the techniques and stories behind our photography. We believe that a great photo is more than just a picture; it's a moment frozen in time, an emotion captured, and a story told without words. Our approach combines technical expertise with a keen artistic eye, ensuring that every image is not only visually stunning but also deeply meaningful.")}
                            </p>
                            <p
                                data-eid="about_text_2"
                                contentEditable={editable}
                                suppressContentEditableWarning
                                className="text-base leading-relaxed text-gray-600 whitespace-pre-wrap break-words"
                            >
                                {getText('about_text_2', "We travel extensively to find unique perspectives, from the bustling streets of urban jungles to the serene solitude of untouched nature. Each location offers new challenges and opportunities, pushing us to constantly evolve our craft. We utilize state-of-the-art equipment and post-processing techniques to bring out the vibrant colors and intricate details of our subjects. This dedication to quality is evident in every piece we produce. Whether it's a breathtaking landscape, an intimate portrait, or a dynamic abstract shot, our goal is to evoke a sense of wonder and connection with the viewer. Thank you for exploring our portfolio.")}
                            </p>
                        </div>
                    </section>
                </main>
            )}

            {/* QUIZ VIEW */}
            {view === 'quiz' && (
                <main className="flex-grow flex flex-col items-center justify-center py-20 px-4 min-h-[600px]">
                    <div className="max-w-2xl w-full">
                        <div className="mb-8">
                            <h2
                                data-eid="quiz_heading"
                                contentEditable={editable}
                                suppressContentEditableWarning
                                className="text-2xl font-bold mb-2 text-[#13c8ec] whitespace-pre-wrap break-words"
                            >
                                {getText('quiz_heading', 'Photography Knowledge Check')}
                            </h2>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map(step => (
                                    <div key={step} className={`h-2 flex-1 rounded-full ${step <= currentQuestion ? 'bg-[#13c8ec]' : 'bg-gray-200'}`} />
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                            <h3 className="text-xl font-bold mb-6">
                                <span className="text-[#13c8ec] mr-2">Q{currentQuestion}.</span>
                                <span
                                    data-eid={`question_${currentQuestion}`}
                                    contentEditable={editable}
                                    suppressContentEditableWarning
                                >
                                    {getText(`question_${currentQuestion}`, `Question ${currentQuestion} placeholder text?`)}
                                </span>
                            </h3>

                            <div className="space-y-3">
                                {[1, 2, 3, 4].map(optIdx => (
                                    <div
                                        key={optIdx}
                                        onClick={() => handleOptionSelect(optIdx)}
                                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${answers[currentQuestion] === optIdx
                                            ? 'border-[#13c8ec] bg-[#13c8ec]/10'
                                            : 'border-gray-200 hover:border-[#13c8ec]/50'
                                            }`}
                                    >
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${answers[currentQuestion] === optIdx ? 'border-[#13c8ec] bg-[#13c8ec]' : 'border-gray-400'
                                            }`}>
                                            {answers[currentQuestion] === optIdx && <div className="w-2 h-2 bg-black rounded-full" />}
                                        </div>
                                        <span
                                            data-eid={`q${currentQuestion}_opt${optIdx}`}
                                            contentEditable={editable}
                                            suppressContentEditableWarning
                                            className="flex-1"
                                        >
                                            {getText(`q${currentQuestion}_opt${optIdx}`, `Option ${optIdx}`)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button
                                    onClick={handleNextQuestion}
                                    className="px-8 py-3 bg-[#13c8ec] hover:bg-[#13c8ec]/90 text-black font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={!editable && !answers[currentQuestion]}
                                >
                                    {currentQuestion === 5 ? 'Submit Answers' : 'Next Question'}
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            )}

            {/* RESULT VIEW */}
            {view === 'result' && (
                <main className="flex-grow flex flex-col relative transition-colors duration-300">
                    <div className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center">
                        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center py-12">
                            <div className="bg-white/60 p-2 rounded-full shadow-lg backdrop-blur-sm mb-6">
                                <div className="bg-[#13c8ec]/20 p-4 rounded-full flex items-center justify-center">
                                    <svg className="w-12 h-12 text-[#13c8ec] font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <h1
                                data-eid="result_title"
                                contentEditable={editable}
                                suppressContentEditableWarning
                                className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight drop-shadow-sm whitespace-pre-wrap break-words"
                            >
                                {getText('result_title', 'Congratulations!')}
                            </h1>
                            <div className="space-y-4 mb-6 max-w-2xl">
                                <p
                                    data-eid="result_text"
                                    contentEditable={editable}
                                    suppressContentEditableWarning
                                    className="text-gray-600 text-lg md:text-xl leading-relaxed whitespace-pre-wrap break-words"
                                >
                                    {getText('result_text', "You've successfully completed the quiz.")}
                                </p>
                                <p
                                    data-eid="result_subtext"
                                    contentEditable={editable}
                                    suppressContentEditableWarning
                                    className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md mx-auto whitespace-pre-wrap break-words"
                                >
                                    {getText('result_subtext', 'We hope you enjoyed exploring our portfolio and learning more about our work. Feel free to reach out to us for any photography needs!')}
                                </p>
                            </div>
                            <div className="mb-8">
                                <EditableImage
                                    eid="result_image"
                                    defaultSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBAWpT6ohLIiewnUnTYmZXUgMQAD66hCisgMKJk1lmE0ISp6JMCVqXLz_vix2NxzVIBPNBLcPRj3LBZEBHcS8i73o-3ONV019ilI7_gFBSiC8oT0DLF2dXUKWJhlGHJeMvrcbYntV7Mk4Pz5ubzJWczsrpXGqJwpXeWoCUG5OkT-K5OsJaC4674D9vdLWyVnH5K29LEX8IWWcIbU0BZnbdgymn6a9rGou8JPrVEB6nk0EvcQ_CoTHmzACSiNyizzEblnDDtorL7c_I"
                                    className="w-full max-w-2xl aspect-video object-cover rounded-xl shadow-2xl border-2 border-white/20 transform hover:scale-105 transition-transform duration-300"
                                    editable={editable}
                                    onChange={(eid, data) => onContentChange?.(eid, data)}
                                />
                            </div>
                            <div className="group relative w-full sm:w-auto flex justify-center" onClickCapture={(e) => {
                                // Only handle restart if we are not editing (or if we want to allow navigation even then?)
                                // For editable button, clicking it in edit mode usually opens the editor.
                                // We'll let the event propagate unless we specifically want to stop it.
                                // However, to trigger 'handleRestart', we need to intercept.
                                // But if we intercept, we might block the editor popover.
                                // Strategy: Use a wrapper for the click, but only if not interacting with editor controls?
                                // Actually, 'handleRestart' switches the VIEW. Changing view while editing might be annoying.
                                // Let's simplify: In editor mode (editable=true), we MIGHT NOT want to restart quiz when clicking this button, 
                                // so the user can edit it.
                                if (!editable) {
                                    e.preventDefault();
                                    handleRestart();
                                }
                            }}>
                                <EditableButton
                                    eid="result_btn"
                                    defaultText={getButton('result_btn', 'Back to Home', '#').text}
                                    defaultUrl="#"
                                    className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-gray-900 transition-all duration-200 bg-[#13c8ec] rounded-xl hover:bg-[#0ebacb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#13c8ec] focus:ring-offset-gray-900 shadow-lg shadow-[#13c8ec]/30 hover:shadow-[#13c8ec]/50 hover:-translate-y-0.5"
                                    editable={editable}
                                    onChange={onContentChange}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            )}

            {/* Footer */}
            {view === 'home' && (
                <footer className="flex flex-col gap-8 px-5 py-10 text-center border-t border-solid border-gray-200/80 mt-16">
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                        <a className="text-gray-600 text-sm font-normal leading-normal hover:text-[#13c8ec] transition-colors" href="#">Privacy Policy</a>
                        <a className="text-gray-600 text-sm font-normal leading-normal hover:text-[#13c8ec] transition-colors" href="#">Terms of Service</a>
                        <a className="text-gray-600 text-sm font-normal leading-normal hover:text-[#13c8ec] transition-colors" href="#">Contact Us</a>
                    </div>
                    <p className="text-gray-500 text-sm font-normal leading-normal">
                        <span
                            data-eid="footer_copyright"
                            contentEditable={editable}
                            suppressContentEditableWarning
                        >
                            {getText('footer_copyright', '© 2024 PhotoFolio, Inc. All rights reserved.')}
                        </span>
                    </p>
                </footer>
            )}
        </div>
    );
}
