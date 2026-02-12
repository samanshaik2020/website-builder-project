'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getTemplateById, type TemplateId } from '@/lib/templates';
import { getProject } from '@/lib/services/project-service';

export default function PreviewPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.projectId as string;

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      if (projectId) {
        try {
          const foundProject = await getProject(projectId);

          if (foundProject) {
            setProject(foundProject);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading preview...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Project Not Found</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold"
          >
            Back to Dashboard
          </button>
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
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const TemplateComponent = template.component;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Preview Toolbar */}
      <div className="fixed top-0 left-0 right-0 bg-slate-900 border-b border-slate-700 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
            >
              ← Back to Dashboard
            </button>
            <div className="border-l border-slate-700 pl-4">
              <span className="text-white font-medium">{project.name}</span>
              <span className="text-slate-400 text-sm ml-3">Preview Mode</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push(`/editor?template=${project.template}&projectId=${projectId}`)}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
            >
              Edit Project
            </button>
          </div>
        </div>
      </div>

      {/* Template Preview (Read-only) */}
      <div className="pt-20">
        <TemplateComponent editable={false} data={project.data} />
      </div>
    </div>
  );
}
