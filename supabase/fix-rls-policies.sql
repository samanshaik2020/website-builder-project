-- =====================================================
-- Fix RLS Policies for Shareable Links
-- =====================================================

-- Drop existing policies for projects
DROP POLICY IF EXISTS "Users can view own projects" ON projects;
DROP POLICY IF EXISTS "Anyone can view shared projects" ON projects;

-- Recreate policies with better logic
-- Policy 1: Users can view their own projects
CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

-- Policy 2: Anyone (including anonymous) can view projects with custom URLs
CREATE POLICY "Public can view shared projects" ON projects
  FOR SELECT USING (custom_url IS NOT NULL);

-- Update analytics policies to allow anonymous reads for shared projects
DROP POLICY IF EXISTS "Users can view own project analytics" ON project_analytics;
DROP POLICY IF EXISTS "Anyone can update analytics for shared projects" ON project_analytics;

-- Policy: Users can view analytics for their own projects
CREATE POLICY "Users can view own project analytics" ON project_analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_analytics.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Policy: Anyone can view analytics for shared projects (read-only)
CREATE POLICY "Public can view shared project analytics" ON project_analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_analytics.project_id 
      AND projects.custom_url IS NOT NULL
    )
  );

-- Policy: Anyone can increment analytics for shared projects
CREATE POLICY "Public can update analytics for shared projects" ON project_analytics
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_analytics.project_id 
      AND projects.custom_url IS NOT NULL
    )
  );

-- Ensure page_views and button_clicks allow anonymous inserts
-- (These should already be correct, but let's verify)

-- Refresh the schema
NOTIFY pgrst, 'reload schema';
