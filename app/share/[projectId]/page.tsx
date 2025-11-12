import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getTemplateById, type TemplateId } from '@/lib/templates';
import { getProjectServer, getProjectByCustomUrlServer } from '@/lib/services/project-service-server';
import SharePageClient from './share-page-client';

interface SharePageProps {
  params: Promise<{
    projectId: string;
  }>;
}

// Helper function to extract text from project data
function getProjectDescription(data: any, template: string): string {
  // Try to find a description or subtitle in the project data
  const commonDescFields = [
    'hero_description', 'hero_subtitle', 'description', 'subtitle',
    'tagline', 'hero_tagline', 'about_description'
  ];
  
  for (const field of commonDescFields) {
    if (data[field]?.text) {
      return data[field].text.substring(0, 160); // Limit to 160 chars for meta description
    }
  }
  
  return `Beautiful ${template} website created with Squpage`;
}

// Helper function to extract title from project data
function getProjectTitle(data: any, projectName: string): string {
  const commonTitleFields = [
    'hero_title', 'hero_headline', 'title', 'headline',
    'nav_brand', 'brand_name'
  ];
  
  for (const field of commonTitleFields) {
    if (data[field]?.text) {
      return data[field].text;
    }
  }
  
  return projectName;
}

// Helper function to extract image from project data
function getProjectImage(data: any): string | null {
  const commonImageFields = [
    'hero_image', 'hero_app_preview', 'product_image', 'featured_image',
    'main_image', 'cover_image'
  ];
  
  for (const field of commonImageFields) {
    if (data[field]?.image) {
      return data[field].image;
    }
  }
  
  return null;
}

export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  const { projectId } = await params;
  
  try {
    // Check if projectId is a UUID
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(projectId);
    
    let project = null;
    if (isUUID) {
      project = await getProjectServer(projectId);
    } else {
      project = await getProjectByCustomUrlServer(projectId);
    }
    
    if (!project) {
      return {
        title: 'Project Not Found | Squpage',
        description: 'This project may have been deleted or the link is invalid.',
      };
    }
    
    const template = getTemplateById(project.template as TemplateId);
    const title = getProjectTitle(project.data, project.name);
    const description = getProjectDescription(project.data, template?.config?.name || 'website');
    const image = getProjectImage(project.data);
    
    // Construct the full URL for the share page
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const shareUrl = `${baseUrl}/share/${projectId}`;
    
    return {
      title: `${title} | Squpage`,
      description,
      openGraph: {
        title,
        description,
        url: shareUrl,
        siteName: 'Squpage',
        images: image ? [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          }
        ] : [
          {
            url: `${baseUrl}/og-default.png`,
            width: 1200,
            height: 630,
            alt: 'Squpage - Create Beautiful Websites',
          }
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: image ? [image] : [`${baseUrl}/og-default.png`],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Squpage',
      description: 'Create beautiful websites with Squpage',
    };
  }
}

export default async function SharePage({ params }: SharePageProps) {
  const { projectId } = await params;
  
  try {
    // Check if projectId is a UUID
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(projectId);
    
    let project = null;
    if (isUUID) {
      project = await getProjectServer(projectId);
    } else {
      project = await getProjectByCustomUrlServer(projectId);
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
    
    return <SharePageClient project={project} template={template} />;
  } catch (error) {
    console.error('Error loading project:', error);
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Error Loading Project</h1>
          <p className="text-slate-400 mb-6">An error occurred while loading this project.</p>
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
}
