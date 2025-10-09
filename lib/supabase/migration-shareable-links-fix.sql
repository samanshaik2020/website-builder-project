-- Migration to fix shareable links
-- This adds public RLS policies to allow viewing projects and shareable links

-- Add public policy for viewing projects via shareable links
CREATE POLICY "Anyone can view projects via shareable links" ON public.projects
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.shareable_links
      WHERE shareable_links.project_id = projects.id
      AND (shareable_links.expires_at IS NULL OR shareable_links.expires_at > NOW())
      AND (shareable_links.max_views IS NULL OR shareable_links.views < shareable_links.max_views)
    )
  );

-- Add public policy for viewing shareable links by slug (CRITICAL FIX for 406 error)
CREATE POLICY "Anyone can view shareable links by slug" ON public.shareable_links
  FOR SELECT USING (true);
