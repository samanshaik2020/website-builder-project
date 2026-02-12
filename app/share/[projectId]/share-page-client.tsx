'use client';

import { useEffect } from 'react';
import { trackPageView, trackButtonClick } from '@/lib/services/analytics-service';
import { getTemplateById, type TemplateId } from '@/lib/templates';

interface SharePageClientProps {
  project: any;
  templateId: string;
}

export default function SharePageClient({ project, templateId }: SharePageClientProps) {
  // Client component for shared page rendering
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

  // Resolve the template on the client side using the templateId string
  const template = getTemplateById(templateId as TemplateId);

  if (!template) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Template Not Found</h1>
        </div>
      </div>
    );
  }

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
