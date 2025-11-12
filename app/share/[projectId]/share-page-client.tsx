'use client';

import React, { useEffect } from 'react';
import { trackPageView, trackButtonClick } from '@/lib/services/analytics-service';

interface SharePageClientProps {
  project: any;
  template: any;
}

export default function SharePageClient({ project, template }: SharePageClientProps) {
  useEffect(() => {
    // Track page view
    const trackView = async () => {
      await trackPageView(project.id, {
        userAgent: navigator.userAgent,
        referrer: document.referrer,
      });
    };
    
    trackView();
  }, [project.id]);

  // Track button clicks
  useEffect(() => {
    const handleClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button') || target.closest('a');
      
      // Track clicks on buttons and links
      if (button) {
        const buttonId = button.getAttribute('data-eid') || undefined;
        
        await trackButtonClick(project.id, buttonId, {
          userAgent: navigator.userAgent,
        });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [project.id]);

  const TemplateComponent = template.component;

  return (
    <div className="min-h-screen bg-white">
      {/* Render the template with saved data (read-only) */}
      <TemplateComponent editable={false} data={project.data} />

      {/* Powered by badge */}
      <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-xl text-sm">
        <span className="opacity-70">Built with</span> <span className="font-bold">Squpage</span>
      </div>
    </div>
  );
}
