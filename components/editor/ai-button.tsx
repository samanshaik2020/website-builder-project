'use client';

import { useState } from 'react';
import { TemplateData } from '@/types/template';

type Props = {
  templateSlug: string;
  theme?: string;
  onGenerated: (generatedData: TemplateData) => void;
  className?: string;
};

export default function AiButton({ templateSlug, theme, onGenerated, className = '' }: Props) {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Check if portfolio template (both themes don't support AI)
  const isPortfolio = templateSlug === 'portfolio' || templateSlug === 'portfolio-modern-dark';

  async function generate() {
    setError(null);
    setSuccess(false);

    if (!prompt.trim()) {
      setError('Please describe what you want to generate');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/generate-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateSlug,
          seedText: prompt,
          theme
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Generation failed');
      }

      // Call the callback with generated data
      onGenerated(data.data);
      setSuccess(true);

      // Close modal after a brief success message
      setTimeout(() => {
        setOpen(false);
        setPrompt('');
        setSuccess(false);
      }, 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      generate();
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl ${className}`}
        title="Generate content with AI"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <span>AI Generate</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl mx-4 animate-in zoom-in-95 duration-300 overflow-hidden border border-slate-200">
            {/* Portfolio Not Supported Message */}
            {isPortfolio ? (
              <>
                {/* Header */}
                <div className="relative bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 text-white px-8 py-6">
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                        <svg
                          className="w-7 h-7"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold tracking-tight">AI Not Available</h3>
                        <p className="text-sm text-white/90 font-medium mt-0.5">Portfolio Template</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setOpen(false)}
                      className="p-2 rounded-xl hover:bg-white/20 transition-all duration-200"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="p-8">
                  <div className="text-center py-8">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-slate-500 to-slate-700 rounded-full flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Message */}
                    <h4 className="text-2xl font-bold text-slate-900 mb-4">
                      Portfolio Does Not Support AI
                    </h4>
                    <p className="text-slate-600 mb-6 max-w-md mx-auto leading-relaxed">
                      The Portfolio template is designed for manual customization and does not support AI content generation. Please edit the content directly by clicking on any text element.
                    </p>

                    {/* Info Box */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-8 max-w-md mx-auto">
                      <p className="text-sm text-slate-700">
                        <strong>💡 Tip:</strong> AI generation is available for other templates like SaaS Landing, Agency, E-commerce, and more!
                      </p>
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={() => setOpen(false)}
                      className="px-8 py-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
                    >
                      Got It
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Header */}
                <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white px-8 py-6">
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                        <svg
                          className="w-7 h-7"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold tracking-tight">AI Content Generator</h3>
                        <p className="text-sm text-white/90 font-medium mt-0.5">Powered by Google Gemini</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setOpen(false)}
                      className="p-2 rounded-xl hover:bg-white/20 transition-all duration-200"
                      disabled={loading}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>
                </div>

                {/* Loading Overlay */}
                {loading && (
                  <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                      {/* AI Brain Animation */}
                      <div className="relative w-32 h-32 mx-auto mb-6">
                        {/* Outer rotating ring */}
                        <div className="absolute inset-0 border-4 border-indigo-200 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>

                        {/* Middle pulsing ring */}
                        <div className="absolute inset-2 border-4 border-purple-300 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>

                        {/* Inner rotating ring (opposite direction) */}
                        <div className="absolute inset-4 border-4 border-pink-400 rounded-full animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>

                        {/* Center AI icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="p-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full animate-pulse">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                        </div>

                        {/* Orbiting dots */}
                        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s' }}>
                          <div className="absolute top-0 left-1/2 w-3 h-3 bg-indigo-500 rounded-full -translate-x-1/2"></div>
                        </div>
                        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                          <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-purple-500 rounded-full -translate-x-1/2"></div>
                        </div>
                        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s', animationDelay: '2s' }}>
                          <div className="absolute left-0 top-1/2 w-3 h-3 bg-pink-500 rounded-full -translate-y-1/2"></div>
                        </div>
                      </div>

                      {/* Loading text with gradient */}
                      <h4 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                        Generating Content
                      </h4>
                      <p className="text-slate-600 font-medium">AI is crafting your content...</p>

                      {/* Progress dots */}
                      <div className="flex justify-center gap-2 mt-6">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Body */}
                <div className="p-8">
                  <div className="mb-6">
                    <label className="block text-base font-bold text-slate-800 mb-3">
                      Describe what you want to create
                    </label>
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                      Be specific about your product, service, or content. For example: "iPhone product page highlighting camera, battery, and premium design" or "SaaS tool for project management teams"
                    </p>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyDown={handleKeyPress}
                      rows={6}
                      className="w-full border-2 border-slate-300 rounded-2xl p-5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none text-base shadow-sm hover:border-slate-400"
                      placeholder="Example: Modern fitness app that helps users track workouts, nutrition, and progress with AI-powered insights..."
                      disabled={loading}
                      autoFocus
                    />
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">💡</span>
                      </div>
                      <p className="text-sm text-slate-500 font-medium">
                        Tip: Press <kbd className="px-2 py-1 bg-slate-100 border border-slate-300 rounded text-xs font-mono">Ctrl+Enter</kbd> to generate
                      </p>
                    </div>
                  </div>

                  {/* Template & Theme Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200 shadow-sm">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Template</p>
                      <p className="text-base font-bold text-slate-900 capitalize">
                        {templateSlug.replace(/-/g, ' ')}
                      </p>
                    </div>
                    {theme && (
                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200 shadow-sm">
                        <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-2">Theme</p>
                        <p className="text-base font-bold text-indigo-900 capitalize">
                          {theme.replace(/-/g, ' ')}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl animate-in slide-in-from-top-2 duration-200 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-red-900 mb-1">Generation Failed</p>
                          <p className="text-sm text-red-700">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Success Message */}
                  {success && (
                    <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl animate-in slide-in-from-top-2 duration-200 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-sm font-bold text-green-900">
                          Content generated successfully! Applying to template...
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => setOpen(false)}
                      className="flex-1 px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md text-base"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={generate}
                      disabled={loading || !prompt.trim()}
                      className="flex-1 px-6 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-base"
                    >
                      Generate Content
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
