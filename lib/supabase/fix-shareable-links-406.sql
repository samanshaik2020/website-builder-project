-- ============================================
-- FIX FOR 406 ERROR ON SHAREABLE LINKS
-- ============================================
-- This script fixes the "406 Not Acceptable" error when checking slug availability
-- Run this in your Supabase SQL Editor

-- Step 1: Enable RLS on shareable_links table (if not already enabled)
ALTER TABLE public.shareable_links ENABLE ROW LEVEL SECURITY;

-- Step 2: Drop existing policies (if any) to avoid conflicts
DROP POLICY IF EXISTS "Anyone can view shareable links by slug" ON public.shareable_links;
DROP POLICY IF EXISTS "Users can view their own shareable links" ON public.shareable_links;
DROP POLICY IF EXISTS "Users can insert their own shareable links" ON public.shareable_links;
DROP POLICY IF EXISTS "Users can update their own shareable links" ON public.shareable_links;
DROP POLICY IF EXISTS "Users can delete their own shareable links" ON public.shareable_links;

-- Step 3: Create public SELECT policy (CRITICAL for fixing 406 error)
-- This allows anyone (including unauthenticated users) to check if a slug exists
CREATE POLICY "Anyone can view shareable links by slug" 
ON public.shareable_links
FOR SELECT 
USING (true);

-- Step 4: Create authenticated user policies
-- Users can view their own shareable links
CREATE POLICY "Users can view their own shareable links" 
ON public.shareable_links
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Users can insert their own shareable links
CREATE POLICY "Users can insert their own shareable links" 
ON public.shareable_links
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can update their own shareable links
CREATE POLICY "Users can update their own shareable links" 
ON public.shareable_links
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own shareable links
CREATE POLICY "Users can delete their own shareable links" 
ON public.shareable_links
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Step 5: Allow public access to projects via valid shareable links
DROP POLICY IF EXISTS "Anyone can view projects via shareable links" ON public.projects;

CREATE POLICY "Anyone can view projects via shareable links" 
ON public.projects
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.shareable_links
    WHERE shareable_links.project_id = projects.id
    AND (shareable_links.expires_at IS NULL OR shareable_links.expires_at > NOW())
    AND (shareable_links.max_views IS NULL OR shareable_links.views < shareable_links.max_views)
  )
);

-- Step 6: Create or replace the increment_link_views function
CREATE OR REPLACE FUNCTION public.increment_link_views(link_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.shareable_links
  SET views = views + 1,
      updated_at = NOW()
  WHERE id = link_id;
END;
$$;

-- Step 7: Grant execute permission on the function
GRANT EXECUTE ON FUNCTION public.increment_link_views(UUID) TO anon, authenticated;

-- Step 8: Verify the setup
-- Run these queries to check if everything is working:

-- Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'shareable_links';

-- List all policies on shareable_links
SELECT policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public' 
AND tablename = 'shareable_links';

-- Test query (should work without authentication)
-- SELECT id FROM shareable_links WHERE custom_slug = 'test' LIMIT 1;

-- ============================================
-- DONE! The 406 error should now be fixed.
-- ============================================
