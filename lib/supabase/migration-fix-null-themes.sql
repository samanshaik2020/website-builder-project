-- Migration: Fix NULL themes for existing projects
-- This sets default themes for projects that were created before theme support was added
-- Run this AFTER running migration-add-theme-column.sql

-- Update existing portfolio projects with NULL theme to use 'default' theme
UPDATE public.projects
SET theme = 'default'
WHERE template = 'portfolio'
  AND theme IS NULL;

-- Update existing saas-landing projects with NULL theme to use 'default' theme  
UPDATE public.projects
SET theme = 'default'
WHERE template = 'saas-landing'
  AND theme IS NULL;

-- Pro templates already had themes from the start, but just in case:
-- Update existing saas-pro projects with NULL theme to use 'modern-minimal' theme
UPDATE public.projects
SET theme = 'modern-minimal'
WHERE template = 'saas-pro'
  AND theme IS NULL;

-- Update existing agency-pro projects with NULL theme to use 'modern-minimal' theme
UPDATE public.projects
SET theme = 'modern-minimal'
WHERE template = 'agency-pro'
  AND theme IS NULL;

-- Update existing portfolio-pro projects with NULL theme to use 'default' theme
UPDATE public.projects
SET theme = 'default'
WHERE template = 'portfolio-pro'
  AND theme IS NULL;

-- Update existing iphone-pro projects with NULL theme to use 'dark-gradient' theme
UPDATE public.projects
SET theme = 'dark-gradient'
WHERE template = 'iphone-pro'
  AND theme IS NULL;

-- Verify the updates
SELECT 
  template,
  theme,
  COUNT(*) as project_count
FROM public.projects
WHERE template IN ('portfolio', 'saas-landing', 'saas-pro', 'agency-pro', 'portfolio-pro', 'iphone-pro')
GROUP BY template, theme
ORDER BY template, theme;
