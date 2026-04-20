'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { submitLead } from '@/lib/services/lead-service';

interface EmailGateProps {
  projectId: string;
  heading: string;
  subheading: string;
  affiliateUrl: string;
  onComplete: () => void;
}

export default function EmailGate({
  projectId,
  heading,
  subheading,
  affiliateUrl,
  onComplete,
}: EmailGateProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Exit-intent state
  const [showExitPopup, setShowExitPopup] = useState(false);
  const exitFiredRef = useRef(false); // Only fire once per page session

  // Check if user already submitted for this project
  useEffect(() => {
    const submitted = localStorage.getItem(`lead_${projectId}`);
    if (submitted) {
      if (affiliateUrl) {
        window.location.href = affiliateUrl;
      } else {
        onComplete();
      }
    }
  }, [projectId, affiliateUrl, onComplete]);

  // Exit-intent: fires when mouse leaves viewport toward the top (browser bar / close button)
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (
        e.clientY <= 5 &&          // mouse near the very top edge
        !exitFiredRef.current &&   // only once
        !success                   // don't show after successful submit
      ) {
        exitFiredRef.current = true;
        setShowExitPopup(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [success]);

  const validateEmail = (val: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitLead(projectId, email.trim(), {
        userAgent: navigator.userAgent,
        referrer: document.referrer,
      });

      localStorage.setItem(`lead_${projectId}`, 'true');
      setSuccess(true);
      setShowExitPopup(false);

      // Auto-trigger advanced tracking pixels if they exist in the window scope
      try {
        if (typeof window !== 'undefined') {
          // Facebook Pixel
          // @ts-ignore
          if (typeof window.fbq === 'function') window.fbq('track', 'Lead');
          // Google Analytics
          // @ts-ignore
          if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead');
          // TikTok Pixel
          // @ts-ignore
          if (typeof window.ttq === 'object' && typeof window.ttq.track === 'function') window.ttq.track('SubmitForm');
        }
      } catch (evtErr) {
        console.error('Tracking pixel error:', evtErr);
      }

      setTimeout(() => {
        if (affiliateUrl) {
          window.location.href = affiliateUrl;
        } else {
          onComplete();
        }
      }, 1400);
    } catch (err) {
      console.error('[EmailGate] Lead submit failed:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [email, projectId, affiliateUrl, onComplete]);

  // ─── Email Form (shared between main gate + exit popup) ─────────────────────
  const EmailForm = ({ compact = false }: { compact?: boolean }) => (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '12px' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(''); }}
          placeholder="Enter your email address"
          autoFocus={compact}
          style={{
            width: '100%',
            padding: compact ? '10px 14px' : '12px 16px',
            fontSize: '15px',
            color: '#111827',
            backgroundColor: '#ffffff',
            border: error ? '1px solid #ef4444' : '1px solid #d1d5db',
            borderRadius: '8px',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.15s, box-shadow 0.15s',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#3b82f6';
            e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? '#ef4444' : '#d1d5db';
            e.target.style.boxShadow = 'none';
          }}
        />
        {error && (
          <p style={{ marginTop: '6px', fontSize: '13px', color: '#ef4444' }}>
            {error}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%',
          padding: compact ? '10px 16px' : '12px 16px',
          fontSize: '15px',
          fontWeight: 600,
          color: '#ffffff',
          backgroundColor: isSubmitting ? '#9ca3af' : '#111827',
          border: 'none',
          borderRadius: '8px',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.15s',
        }}
        onMouseEnter={(e) => {
          if (!isSubmitting) (e.target as HTMLButtonElement).style.backgroundColor = '#1f2937';
        }}
        onMouseLeave={(e) => {
          if (!isSubmitting) (e.target as HTMLButtonElement).style.backgroundColor = '#111827';
        }}
      >
        {isSubmitting ? (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              style={{ animation: 'eg-spin 1s linear infinite' }}>
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            Submitting
          </span>
        ) : (
          compact ? 'Yes, Give Me Access →' : 'Continue'
        )}
      </button>
    </form>
  );

  // ─── Success state ───────────────────────────────────────────────────────────
  const SuccessState = () => (
    <div style={{ textAlign: 'center', padding: '24px 0' }}>
      <div style={{
        width: '48px', height: '48px', margin: '0 auto 14px',
        borderRadius: '50%', background: '#ecfdf5',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <p style={{ fontSize: '16px', fontWeight: 500, color: '#059669' }}>
        {affiliateUrl ? 'Redirecting you now...' : 'Success! Loading content...'}
      </p>
    </div>
  );

  return (
    <>
      {/* ── Main Email Gate ───────────────────────────────────────────── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#f9fafb',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}>
        <div style={{
          width: '100%', maxWidth: '440px',
          margin: '0 20px', padding: '40px 32px',
          borderRadius: '12px', background: '#ffffff',
          border: '1px solid #e5e7eb',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
        }}>
          <h1 style={{
            textAlign: 'center', fontSize: '24px', fontWeight: 700,
            color: '#111827', marginBottom: '8px',
          }}>
            {heading}
          </h1>
          <p style={{
            textAlign: 'center', fontSize: '15px', color: '#4b5563',
            marginBottom: '32px', lineHeight: 1.5,
          }}>
            {subheading}
          </p>

          {success ? <SuccessState /> : <EmailForm />}
        </div>
      </div>

      {/* ── Exit-Intent Popup ─────────────────────────────────────────── */}
      {showExitPopup && !success && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.55)',
            backdropFilter: 'blur(3px)',
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            animation: 'eg-fade-in 0.2s ease',
          }}
          onClick={(e) => {
            // Close only if clicking the backdrop itself
            if (e.target === e.currentTarget) setShowExitPopup(false);
          }}
        >
          <div style={{
            width: '100%', maxWidth: '400px',
            margin: '0 20px', padding: '36px 32px',
            borderRadius: '14px', background: '#ffffff',
            border: '1px solid #e5e7eb',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            position: 'relative',
            animation: 'eg-slide-up 0.25s ease',
          }}>
            {/* Close button */}
            <button
              onClick={() => setShowExitPopup(false)}
              style={{
                position: 'absolute', top: '14px', right: '14px',
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#9ca3af', padding: '4px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '6px',
                transition: 'color 0.15s, background 0.15s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = '#374151';
                (e.currentTarget as HTMLButtonElement).style.background = '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = '#9ca3af';
                (e.currentTarget as HTMLButtonElement).style.background = 'none';
              }}
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Warning emoji */}
            <div style={{ textAlign: 'center', fontSize: '36px', marginBottom: '12px' }}>
              ✋
            </div>

            {/* Headline */}
            <h2 style={{
              textAlign: 'center', fontSize: '20px', fontWeight: 700,
              color: '#111827', marginBottom: '8px',
            }}>
              Wait! Don&apos;t go yet.
            </h2>

            {/* Sub-copy — classic urgency/loss-aversion angle */}
            <p style={{
              textAlign: 'center', fontSize: '14px', color: '#6b7280',
              marginBottom: '24px', lineHeight: 1.6,
            }}>
              You&apos;re one step away from getting access. Enter your email and we&apos;ll send it straight to your inbox — no spam, ever.
            </p>

            {/* Compact form */}
            <EmailForm compact />

            {/* Dismiss link */}
            <p style={{ textAlign: 'center', marginTop: '14px' }}>
              <button
                onClick={() => setShowExitPopup(false)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '13px', color: '#9ca3af',
                  textDecoration: 'underline',
                  padding: 0,
                }}
              >
                No thanks, I&apos;ll pass on this.
              </button>
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes eg-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes eg-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes eg-slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        input::placeholder {
          color: #9ca3af;
        }
      `}</style>
    </>
  );
}
