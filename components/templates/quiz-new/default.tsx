'use client';

import React, { useState } from 'react';
import { SlateEditableText } from '@/components/editor/slate-editable-text';
import { EditableButton } from '@/components/editor/editable-button';
import { EditableImage } from '@/components/editor/editable-image';

interface QuizNewTemplateProps {
    data?: Record<string, any>;
    editable?: boolean;
    onContentChange?: (eid: string, content: any) => void;
}

export default function QuizNewTemplate({
    data = {},
    editable = false,
    onContentChange = () => { },
}: QuizNewTemplateProps) {
    const getText = (eid: string, defaultValue: string) => data[eid]?.text || defaultValue;
    const getImage = (eid: string, defaultValue: string) => data[eid]?.image || defaultValue;
    const getButton = (eid: string, defaultText: string, defaultUrl: string) =>
        data[eid]?.button || { text: defaultText, url: defaultUrl };

    const handleSlateTextChange = (eid: string, value: string) => onContentChange(eid, { text: value });
    const handleImageChange = (eid: string, data: { image: string; linkUrl?: string | undefined }) => onContentChange(eid, data);
    const handleButtonChange = (eid: string, content: { button: { text: string; url: string } }) =>
        onContentChange(eid, content);

    const questions = [
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
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
    const [showResult, setShowResult] = useState(false);

    // Helper to check if current question has an answer selected
    const currentQuestion = questions[currentQuestionIndex];
    const hasSelectedAnswer = currentQuestion ? !!selectedAnswers[currentQuestion.id] : false;

    const handleOptionSelect = (optionId: string) => {
        if (!currentQuestion) return; // Allow interaction in edit mode for testing flow
        setSelectedAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: optionId
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const calculateScore = () => {
        let score = 0;
        questions.forEach(q => {
            const selected = selectedAnswers[q.id];
            const correct = q.options.find(o => o.correct)?.id;
            if (selected === correct) score++;
        });
        return score;
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setShowResult(false);
    };

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&family=Noto+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

            <style>{`
        .font-display { font-family: 'Spline Sans', 'Noto Sans', sans-serif; }
      `}</style>

            <div className="min-h-screen w-full bg-[#f8f8f5] font-display text-[#181811] transition-colors duration-200 flex flex-col">
                {/* Header Section */}
                <header className="sticky top-0 z-50 w-full border-b border-[#e5e5e0] bg-[#f8f8f5]/80 backdrop-blur-md">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2">
                            <div className="flex size-8 items-center justify-center rounded-full bg-[#f9f506] text-[#181811]">
                                <span className="material-symbols-outlined text-xl font-bold">photo_camera</span>
                            </div>
                            <span className="text-lg font-bold tracking-tight">
                                <SlateEditableText
                                    eid="brand_name"
                                    defaultText={getText('brand_name', 'LensLife')}
                                    editable={editable}
                                    onChange={handleSlateTextChange}
                                />
                            </span>
                        </div>
                        <nav className="hidden md:flex items-center gap-8">
                            <SlateEditableText
                                eid="nav_link1"
                                defaultText={getText('nav_link1', 'Stories')}
                                className="text-sm font-medium hover:text-[#f9f506] transition-colors cursor-pointer"
                                editable={editable}
                                onChange={handleSlateTextChange}
                            />
                            <SlateEditableText
                                eid="nav_link2"
                                defaultText={getText('nav_link2', 'Gallery')}
                                className="text-sm font-medium hover:text-[#f9f506] transition-colors cursor-pointer"
                                editable={editable}
                                onChange={handleSlateTextChange}
                            />
                            <SlateEditableText
                                eid="nav_link3"
                                defaultText={getText('nav_link3', 'Artists')}
                                className="text-sm font-medium hover:text-[#f9f506] transition-colors cursor-pointer"
                                editable={editable}
                                onChange={handleSlateTextChange}
                            />
                        </nav>
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center justify-center rounded-full bg-[#f9f506] px-5 py-2 text-sm font-bold text-[#181811] hover:bg-[#f9f506]/90 transition-colors cursor-pointer">
                                <SlateEditableText
                                    eid="nav_cta"
                                    defaultText={getText('nav_cta', 'Subscribe')}
                                    editable={editable}
                                    onChange={handleSlateTextChange}
                                />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 w-full">
                    <div className="mx-auto max-w-[960px] px-4 py-12 md:px-8 md:py-16 lg:px-0">


                        <div className="mb-10 text-center">
                            <span className="mb-3 inline-block rounded-full bg-[#f9f506]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">
                                Quiz Time
                            </span>
                            <div className="text-4xl font-black leading-tight tracking-tight text-[#181811] sm:text-5xl md:text-6xl lg:text-[4rem]">
                                <SlateEditableText
                                    eid="quiz_title"
                                    defaultText={getText('quiz_title', 'Test Your Knowledge')}
                                    editable={editable}
                                    onChange={handleSlateTextChange}
                                />
                            </div>
                            <div className="mt-4 text-lg font-medium text-[#6b6b5f]">
                                <SlateEditableText
                                    eid="quiz_subtitle"
                                    defaultText={getText('quiz_subtitle', 'How much do you really know about urban architecture? Take the challenge.')}
                                    editable={editable}
                                    onChange={handleSlateTextChange}
                                />
                            </div>
                        </div>

                        {/* Instructions / Hero Area */}
                        <div className="mb-12 grid gap-8 md:grid-cols-2 items-stretch">
                            <div className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 h-64 md:h-auto">
                                <EditableImage
                                    eid="quiz_hero_image"
                                    defaultSrc={getImage('quiz_hero_image', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCDv8MLJBouY4P_gvjQWA0AiOGslvmAUYR9XcfuZChwCWTVTVizzYBhUx2BgGkJixbOVtO2v-pLSNxV0BzTNTMQHFrpdMEhKFwlsMyojks0IFageTW0PXEHG1RhRcEqDjt7MMLlxEzFLMVYBccJKuRLfp7lABvgWeGjdlPQoAKEMHX5YJalkJ3e6RDi1CiiEmaf_IlJcpW2SoMqOoetAL0x7DURU007p4TU9t4GZZpBs82KC1Feo55h2ZYgQj1qMd9yntpwS0g0DO-')}
                                    alt="Architecture Building"
                                    className="h-full w-full object-cover"
                                    editable={editable}
                                    onChange={handleImageChange}
                                />
                                <div className="absolute bottom-4 left-4 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                                    Architecture 101
                                </div>
                            </div>
                            <div className="rounded-2xl border border-[#e5e5e0] bg-white p-6 md:p-8 shadow-sm flex flex-col justify-center">
                                <h3 className="mb-4 text-xl font-bold text-[#181811] flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[#f9f506]">info</span>
                                    <SlateEditableText
                                        eid="quiz_intro_title"
                                        defaultText={getText('quiz_intro_title', 'Instructions')}
                                        editable={editable}
                                        onChange={handleSlateTextChange}
                                    />
                                </h3>
                                <div className="mb-6 text-[#6b6b5f]">
                                    <SlateEditableText
                                        eid="quiz_intro_desc"
                                        defaultText={getText('quiz_intro_desc', 'Welcome to the Urban Photography quiz. This short test assesses your understanding of architectural styles and photography techniques.')}
                                        editable={editable}
                                        onChange={handleSlateTextChange}
                                    />
                                </div>
                                <ul className="space-y-4 text-sm font-medium text-[#181811]">
                                    <li className="flex items-start gap-3">
                                        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#f0f0eb] text-[#f9f506]">
                                            <span className="material-symbols-outlined text-[16px]">format_list_numbered</span>
                                        </div>
                                        <span className="pt-0.5">
                                            <SlateEditableText
                                                eid="quiz_intro_item1"
                                                defaultText={getText('quiz_intro_item1', 'There are 5 multiple-choice questions.')}
                                                editable={editable}
                                                onChange={handleSlateTextChange}
                                            />
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#f0f0eb] text-[#f9f506]">
                                            <span className="material-symbols-outlined text-[16px]">timer</span>
                                        </div>
                                        <span className="pt-0.5">
                                            <SlateEditableText
                                                eid="quiz_intro_item2"
                                                defaultText={getText('quiz_intro_item2', 'There is no time limit, so take your time.')}
                                                editable={editable}
                                                onChange={handleSlateTextChange}
                                            />
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#f0f0eb] text-[#f9f506]">
                                            <span className="material-symbols-outlined text-[16px]">star</span>
                                        </div>
                                        <span className="pt-0.5">
                                            <SlateEditableText
                                                eid="quiz_intro_item3"
                                                defaultText={getText('quiz_intro_item3', 'Score at least 4/5 to earn the Urban Expert badge.')}
                                                editable={editable}
                                                onChange={handleSlateTextChange}
                                            />
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {!showResult ? (
                            <div className="mb-8">
                                {/* Progress Bar */}
                                <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-[#e5e5e0]">
                                    <div
                                        className="h-full rounded-full bg-[#f9f506] transition-all duration-500 ease-out"
                                        style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                                    ></div>
                                </div>

                                {/* Question */}
                                <h2 className="mb-8 text-2xl font-bold leading-snug text-[#181811] md:text-3xl">
                                    <span className="mr-2">{currentQuestion?.id}.</span>
                                    <SlateEditableText
                                        eid={`q${currentQuestion?.id}_question`}
                                        defaultText={currentQuestion?.question}
                                        editable={editable}
                                        onChange={handleSlateTextChange}
                                        className="inline"
                                    />
                                </h2>

                                {/* Options */}
                                <div className="grid gap-4 md:grid-cols-2">
                                    {currentQuestion?.options.map((option) => {
                                        const isSelected = selectedAnswers[currentQuestion.id] === option.id;
                                        return (
                                            <div
                                                key={option.id}
                                                role="button"
                                                tabIndex={0}
                                                onClick={() => handleOptionSelect(option.id)}
                                                className={`group flex w-full items-center gap-4 rounded-xl border-2 p-5 text-left transition-all cursor-pointer select-none
                                            ${isSelected
                                                        ? 'border-[#f9f506] bg-[#f9f506]/5 shadow-md'
                                                        : 'border-[#e5e5e0] bg-white hover:border-[#f9f506] hover:shadow-md'
                                                    }
                                        `}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        handleOptionSelect(option.id);
                                                    }
                                                }}
                                            >
                                                <span className={`flex size-8 shrink-0 items-center justify-center rounded-full font-bold transition-colors
                                            ${isSelected
                                                        ? 'bg-[#f9f506] text-[#181811]'
                                                        : 'bg-[#f0f0eb] text-[#181811] group-hover:bg-[#f9f506]'
                                                    }
                                        `}>
                                                    {option.id}
                                                </span>
                                                <div className="font-medium text-[#181811] flex-1">
                                                    <SlateEditableText
                                                        eid={`q${currentQuestion.id}_opt${option.id}`}
                                                        defaultText={option.text}
                                                        editable={editable}
                                                        onChange={handleSlateTextChange}
                                                    />
                                                </div>
                                                {isSelected && (
                                                    <div className="ml-auto">
                                                        <span className="material-symbols-outlined text-[#f9f506] text-2xl">check_circle</span>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Navigation */}
                                <div className="flex items-center justify-between border-t border-[#e5e5e0] pt-8 mt-8">
                                    <button
                                        onClick={handlePrevious}
                                        disabled={currentQuestionIndex === 0}
                                        className={`flex items-center gap-2 rounded-lg px-6 py-3 font-bold text-[#6b6b5f] transition-colors hover:bg-transparent
                                    ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:text-[#181811] cursor-pointer'}
                                `}
                                    >
                                        <span className="material-symbols-outlined">arrow_back</span>
                                        Previous
                                    </button>
                                    <div className="hidden sm:block text-sm font-bold uppercase tracking-wider text-[#6b6b5f]">
                                        Question {currentQuestionIndex + 1} of {questions.length}
                                    </div>
                                    <button
                                        onClick={handleNext}
                                        disabled={!hasSelectedAnswer}
                                        className={`flex items-center gap-2 rounded-full px-8 py-3 font-bold text-[#181811] transition-colors
                                    ${!hasSelectedAnswer
                                                ? 'bg-[#e5e5e0] cursor-not-allowed opacity-50'
                                                : 'bg-[#f9f506] hover:bg-[#f9f506]/90 shadow-lg shadow-[#f9f506]/20 hover:shadow-[#f9f506]/30 active:scale-95'
                                            }
                                `}
                                    >
                                        {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                </div>
                                <div className="mt-4 text-center sm:hidden text-sm font-bold uppercase tracking-wider text-[#6b6b5f]">
                                    Question {currentQuestionIndex + 1} of {questions.length}
                                </div>
                            </div>
                        ) : (
                            // Results Section
                            // Results Section
                            <div className="mb-8 rounded-2xl bg-white p-8 border border-[#e5e5e0] text-center shadow-xl">
                                <span className="material-symbols-outlined text-6xl text-[#f9f506] mb-4">emoji_events</span>
                                <div className="text-3xl font-black mb-6 text-[#181811]">
                                    <SlateEditableText
                                        eid="result_title"
                                        defaultText={getText('result_title', 'Congratulations!')}
                                        editable={editable}
                                        onChange={handleSlateTextChange}
                                    />
                                </div>

                                <div className="relative mx-auto mb-8 w-full max-w-md aspect-video overflow-hidden rounded-xl border border-[#e5e5e0]">
                                    <EditableImage
                                        eid="result_image"
                                        defaultSrc={getImage('result_image', 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80')}
                                        alt="Result Image"
                                        className="h-full w-full object-cover"
                                        editable={editable}
                                        onChange={handleImageChange}
                                    />
                                </div>

                                <div className="text-xl text-[#6b6b5f] mb-8 max-w-lg mx-auto">
                                    <SlateEditableText
                                        eid="result_text"
                                        defaultText={getText('result_text', 'You have successfully completed the Urban Photography Quiz. We hope you learned something new about architecture!')}
                                        editable={editable}
                                        onChange={handleSlateTextChange}
                                    />
                                </div>

                                <div>
                                    <div className="text-xl font-bold mb-8 text-[#181811]">
                                        You scored {calculateScore()} out of {questions.length}
                                    </div>
                                    <div className="flex flex-col items-center gap-4">
                                        <EditableButton
                                            eid="result_cta"
                                            defaultText={getButton('result_cta', 'Visit Website', '#').text}
                                            defaultUrl={getButton('result_cta', 'Visit Website', '#').url}
                                            className="inline-flex items-center gap-2 rounded-full bg-[#f9f506] px-8 py-3 font-bold text-[#181811] transition-colors hover:bg-[#f9f506]/90 shadow-lg"
                                            editable={editable}
                                            onChange={handleButtonChange}
                                        />

                                        <button
                                            onClick={resetQuiz}
                                            className="text-[#6b6b5f] font-semibold hover:text-[#181811] underline decoration-2 underline-offset-4 transition-colors"
                                        >
                                            Retake Quiz
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}


                    </div>
                </main>

                <footer className="mt-auto border-t border-[#e5e5e0] bg-white py-12">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-8">
                        <div className="flex items-center gap-2">
                            <div className="size-6 rounded-full bg-[#f9f506]"></div>
                            <span className="text-sm font-semibold">© 2023 ContentApp Inc.</span>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
