'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getTemplateById, type TemplateId } from '@/lib/templates';
import AiButton from '@/components/editor/ai-button';
import { MobileWarning } from '@/components/editor/mobile-warning';
import { getCurrentUser } from '@/lib/services/auth-service';
import { getProject, createProject, updateProject } from '@/lib/services/project-service';

function EditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template') as TemplateId;
  const projectId = searchParams.get('projectId');

  const [projectName, setProjectName] = useState('Untitled Project');
  const [projectData, setProjectData] = useState<Record<string, any>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [backupData, setBackupData] = useState<Record<string, any> | null>(null);
  const [showRevertButton, setShowRevertButton] = useState(false);

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.push('/signin');
        return;
      }
    };
    checkAuth();
  }, [router]);

  const handleContentChange = (eid: string, value: any) => {
    setProjectData(prev => ({
      ...prev,
      [eid]: value
    }));
  };

  const handleAiGenerated = (generatedData: Record<string, any>) => {
    // Backup current data for revert functionality
    setBackupData(projectData);
    setShowRevertButton(true);

    // Apply generated data to project
    setProjectData(prev => ({
      ...prev,
      ...Object.entries(generatedData).reduce((acc, [key, value]) => {
        // Convert AI response to the format expected by templates
        acc[key] = { text: value };
        return acc;
      }, {} as Record<string, any>)
    }));

    // Update DOM elements immediately
    setTimeout(() => {
      Object.entries(generatedData).forEach(([key, value]) => {
        const element = document.querySelector(`[data-eid="${key}"]`);
        if (element && element.textContent !== value) {
          element.textContent = value;
        }
      });
    }, 100);
  };

  const handleRevert = () => {
    if (backupData) {
      setProjectData(backupData);
      setBackupData(null);
      setShowRevertButton(false);

      // Update DOM elements
      setTimeout(() => {
        Object.entries(backupData).forEach(([key, value]) => {
          const element = document.querySelector(`[data-eid="${key}"]`);
          if (element && value?.text) {
            element.textContent = value.text;
          }
        });
      }, 100);
    }
  };

  useEffect(() => {
    // Load project data if editing existing project
    const loadProject = async () => {
      if (projectId) {
        try {
          const project = await getProject(projectId);
          if (project) {
            setProjectName(project.name);
            setProjectData(project.data as Record<string, any> || {});
          }
        } catch (error) {
          console.error('Failed to load project:', error);
        }
      }
    };
    loadProject();
  }, [projectId]);

  // Hover-to-edit functionality for text elements
  // Force rebuild after type checking fixes
  useEffect(() => {
    const handleMouseEnter = (e: Event) => {
      const target = e.target;
      
      // Check if target is an HTMLElement (not a text node or other node type)
      if (!(target instanceof HTMLElement)) return;
      
      const eid = target.getAttribute('data-eid');
      
      // Only apply to contentEditable text elements (not buttons or images)
      if (eid && target.contentEditable === 'true' && !target.closest('button') && target.tagName !== 'BUTTON') {
        // Add visual hover indicator
        target.style.outline = '2px dashed rgba(147, 51, 234, 0.3)';
        target.style.outlineOffset = '4px';
        target.style.cursor = 'text';
        target.style.transition = 'outline 0.2s ease';
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target;
      
      // Check if target is an HTMLElement (not a text node or other node type)
      if (!(target instanceof HTMLElement)) return;
      
      const eid = target.getAttribute('data-eid');
      
      // Remove hover indicator if element is not focused
      if (eid && target.contentEditable === 'true' && document.activeElement !== target) {
        target.style.outline = '';
        target.style.outlineOffset = '';
      }
    };

    const handleFocus = (e: Event) => {
      const target = e.target;
      
      // Check if target is an HTMLElement (not a text node or other node type)
      if (!(target instanceof HTMLElement)) return;
      
      const eid = target.getAttribute('data-eid');
      
      // Change to solid outline when focused
      if (eid && target.contentEditable === 'true') {
        target.style.outline = '2px solid rgba(147, 51, 234, 0.6)';
        target.style.outlineOffset = '4px';
      }
    };

    const handleBlur = (e: Event) => {
      const target = e.target;
      
      // Check if target is an HTMLElement (not a text node or other node type)
      if (!(target instanceof HTMLElement)) return;
      
      const eid = target.getAttribute('data-eid');
      
      // Remove outline when focus is lost
      if (eid && target.contentEditable === 'true') {
        target.style.outline = '';
        target.style.outlineOffset = '';
      }
    };

    // Add event listeners to all editable elements
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('focus', handleFocus, true);
    document.addEventListener('blur', handleBlur, true);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('focus', handleFocus, true);
      document.removeEventListener('blur', handleBlur, true);
    };
  }, []);

  // Legacy contentEditable support for buttons and other non-Slate elements
  useEffect(() => {
    const handleInput = (e: Event) => {
      const target = e.target;
      
      // Check if target is an HTMLElement (not a text node or other node type)
      if (!(target instanceof HTMLElement)) return;
      
      const eid = target.getAttribute('data-eid');
      
      if (eid && target.tagName === 'BUTTON') {
        setProjectData(prev => ({
          ...prev,
          [eid]: { button: { text: target.textContent || '', url: '#' } }
        }));
      }
    };

    document.addEventListener('input', handleInput);
    return () => document.removeEventListener('input', handleInput);
  }, []);


  const handleSave = async () => {
    setIsSaving(true);

    try {
      // Merge projectData (which has button URLs) with DOM content
      const elements = document.querySelectorAll('[data-eid]');
      const data: Record<string, any> = { ...projectData };

      elements.forEach((element) => {
        const eid = element.getAttribute('data-eid');
        if (eid) {
          const isButton = element.tagName === 'BUTTON';
          if (isButton) {
            // Preserve existing button data (URL) and only update text if needed
            if (!data[eid]?.button) {
              data[eid] = { button: { text: element.textContent || '', url: '#' } };
            } else {
              // Keep existing URL, update text from DOM
              data[eid] = { 
                button: { 
                  text: element.textContent || data[eid].button.text, 
                  url: data[eid].button.url 
                } 
              };
            }
          } else {
            // For non-button elements, update text from DOM
            data[eid] = { text: element.textContent || '' };
          }
        }
      });

      // Save to Supabase
      if (projectId) {
        // Update existing project
        await updateProject(projectId, {
          name: projectName,
          data,
        });
      } else {
        // Create new project
        await createProject({
          name: projectName,
          template: templateId,
          data,
        });
      }

      setTimeout(() => {
        setIsSaving(false);
        setShowSaveDialog(false);
        router.push('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Failed to save project:', error);
      setIsSaving(false);
      alert('Failed to save project. Please try again.');
    }
  };

  if (!templateId) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">No Template Selected</h1>
          <button
            onClick={() => router.push('/templates')}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold"
          >
            Select a Template
          </button>
        </div>
      </div>
    );
  }

  const template = getTemplateById(templateId);
  if (!template) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Template Not Found</h1>
          <button
            onClick={() => router.push('/templates')}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold"
          >
            Back to Templates
          </button>
        </div>
      </div>
    );
  }

  const TemplateComponent = template.component;

  return (
    <div className="min-h-screen bg-slate-100 relative">
      {/* Mobile Warning Popup */}
      <MobileWarning />

      {/* Editor Toolbar */}
      <div className="fixed top-0 left-0 right-0 bg-slate-900 border-b border-slate-700 z-[100]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
            >
              ← Back
            </button>
            <div className="border-l border-slate-700 pl-4">
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="bg-slate-800 text-white px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Project Name"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-sm">
              Template: <span className="text-white font-medium">{template.config.name}</span>
            </span>
            <AiButton
              templateSlug={templateId}
              onGenerated={handleAiGenerated}
            />
            {showRevertButton && (
              <button
                onClick={handleRevert}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                title="Revert to previous content"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                Revert
              </button>
            )}
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition-colors"
            >
              Save & Publish
            </button>
          </div>
        </div>
      </div>

      {/* Template Preview */}
      <div className="pt-[72px]">
        <TemplateComponent editable={true} data={projectData} onContentChange={handleContentChange} />
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {isSaving ? 'Saving...' : 'Save Project'}
            </h2>
            {isSaving ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
              </div>
            ) : (
              <>
                <p className="text-slate-600 mb-6">
                  Your project "{projectName}" will be saved and published to your dashboard.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSaveDialog(false)}
                    className="flex-1 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}


      {/* Editing Hint */}
      <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-6 py-4 rounded-lg shadow-xl border border-slate-700">
        <p className="text-sm font-medium">💡 Click on any text to edit</p>
      </div>
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading editor...</div>
      </div>
    }>
      <EditorContent />
    </Suspense>
  );
}
