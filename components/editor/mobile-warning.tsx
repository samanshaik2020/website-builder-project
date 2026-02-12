'use client';

import { useEffect, useState } from 'react';

export function MobileWarning() {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    // Check if user is on mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    // Also check screen width as additional confirmation
    const isSmallScreen = window.innerWidth < 768;

    // Check if user has already dismissed the warning in this session
    const hasSeenWarning = sessionStorage.getItem('mobile-warning-dismissed');

    if ((isMobile || isSmallScreen) && !hasSeenWarning) {
      setShowWarning(true);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('mobile-warning-dismissed', 'true');
    setShowWarning(false);
  };

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">
          Mobile Device Detected
        </h2>

        {/* Message */}
        <div className="text-slate-600 mb-6 space-y-3">
          <p className="text-center">
            For the best editing experience, we recommend using a <strong className="text-slate-900">PC or laptop</strong>.
          </p>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-sm text-orange-800">
              <strong>⚠️ Note:</strong> The editor may have limited functionality on mobile devices. Some features like drag-and-drop, precise text selection, and multi-element editing work best on desktop.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleDismiss}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            I Understand, Continue Anyway
          </button>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="w-full px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-lg font-semibold transition-colors"
          >
            Go Back to Dashboard
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-slate-400 text-center mt-4">
          This message will not appear again during this session
        </p>
      </div>
    </div>
  );
}
