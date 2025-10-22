'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getTemplateById, type TemplateId } from '@/lib/templates';
import { getProject, getProjectByCustomUrl } from '@/lib/services/project-service';
import { trackPageView, trackButtonClick } from '@/lib/services/analytics-service';

export default function SharePage() {
  const params = useParams();
  const projectId = params.projectId as string;

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      if (projectId) {
        try {
          // Try to find by custom URL first, then by project ID
          let foundProject = await getProjectByCustomUrl(projectId);
          
          if (!foundProject) {
            foundProject = await getProject(projectId);
          }
          
          if (foundProject) {
            setProject(foundProject);
            
            // Track page view with metadata
            await trackPageView(foundProject.id, {
              userAgent: navigator.userAgent,
              referrer: document.referrer,
            });
          }
        } catch (error) {
          console.error('Failed to load project:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadProject();
  }, [projectId]);

  // Track button clicks
  useEffect(() => {
    if (!project) return;

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
  }, [project]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-slate-400 mb-6">This project may have been deleted or the link is invalid.</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const template = getTemplateById(project.template as TemplateId);
  if (!template) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Template Not Found</h1>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
          >
            Go to Homepage
          </Link>
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
