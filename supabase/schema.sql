-- =====================================================
-- Website Builder Database Schema
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. PROFILES TABLE (User metadata)
-- =====================================================
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  email text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- =====================================================
-- 2. PROJECTS TABLE (Main project storage)
-- =====================================================
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  template text NOT NULL,
  theme text,
  data jsonb NOT NULL DEFAULT '{}',
  custom_url text UNIQUE,
  campaign_enabled boolean DEFAULT false,
  campaign_heading text,
  campaign_subheading text,
  affiliate_url text,
  head_scripts text DEFAULT '',
  body_scripts text DEFAULT '',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policies: Users can only access their own projects
CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);

-- Public access for shareable links (read-only)
CREATE POLICY "Anyone can view shared projects" ON projects
  FOR SELECT USING (custom_url IS NOT NULL);

-- Indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_custom_url ON projects(custom_url);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);

-- =====================================================
-- 3. PROJECT_IMAGES TABLE (Account-level image library)
-- =====================================================
CREATE TABLE IF NOT EXISTS project_images (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  -- Saved images belong to the user account; project_id is optional for legacy associations.
  project_id uuid REFERENCES projects(id) ON DELETE SET NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  url text NOT NULL,
  alt_text text DEFAULT '',
  width text DEFAULT 'auto',
  height text DEFAULT 'auto',
  alignment text DEFAULT 'center' CHECK (alignment IN ('left', 'center', 'right')),
  storage_path text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own project images" ON project_images
  FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can create own project images" ON project_images
  FOR INSERT
  TO authenticated
  WITH CHECK (
    (SELECT auth.uid()) = user_id
    AND (
      project_id IS NULL
      OR EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_images.project_id
      AND projects.user_id = (SELECT auth.uid())
      )
    )
  );

CREATE POLICY "Users can update own project images" ON project_images
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK (
    (SELECT auth.uid()) = user_id
    AND (
      project_id IS NULL
      OR EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_images.project_id
      AND projects.user_id = (SELECT auth.uid())
      )
    )
  );

CREATE POLICY "Users can delete own project images" ON project_images
  FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON project_images TO authenticated;

CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_project_images_user_id ON project_images(user_id);
CREATE INDEX IF NOT EXISTS idx_project_images_created_at ON project_images(created_at DESC);

-- Public bucket for image URLs copied into published pages.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-images',
  'project-images',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

CREATE POLICY "Users can upload own project image objects" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'project-images'
    AND (storage.foldername(name))[1] = (SELECT auth.uid()::text)
  );

CREATE POLICY "Users can delete own project image objects" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'project-images'
    AND owner_id = (SELECT auth.uid()::text)
  );

-- =====================================================
-- 4. PROJECT_ANALYTICS TABLE (Analytics tracking)
-- =====================================================
CREATE TABLE IF NOT EXISTS project_analytics (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL UNIQUE,
  views integer DEFAULT 0,
  clicks integer DEFAULT 0,
  last_viewed_at timestamp with time zone,
  last_clicked_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE project_analytics ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view analytics for their own projects
CREATE POLICY "Users can view own project analytics" ON project_analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_analytics.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Policy: Anyone can increment analytics for shared projects
CREATE POLICY "Anyone can update analytics for shared projects" ON project_analytics
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_analytics.project_id 
      AND projects.custom_url IS NOT NULL
    )
  );

-- Policy: System can insert analytics
CREATE POLICY "System can insert analytics" ON project_analytics
  FOR INSERT WITH CHECK (true);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_analytics_project_id ON project_analytics(project_id);

-- =====================================================
-- 4. PAGE_VIEWS TABLE (Detailed view tracking)
-- =====================================================
CREATE TABLE IF NOT EXISTS page_views (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  viewed_at timestamp with time zone DEFAULT now(),
  ip_address text,
  user_agent text,
  referrer text
);

-- Enable RLS
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert page views
CREATE POLICY "Anyone can insert page views" ON page_views
  FOR INSERT WITH CHECK (true);

-- Policy: Users can view their own project analytics
CREATE POLICY "Users can view own project page views" ON page_views
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = page_views.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_page_views_project_id ON page_views(project_id);
CREATE INDEX IF NOT EXISTS idx_page_views_viewed_at ON page_views(viewed_at DESC);

-- =====================================================
-- 5. BUTTON_CLICKS TABLE (Detailed click tracking)
-- =====================================================
CREATE TABLE IF NOT EXISTS button_clicks (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  button_id text,
  clicked_at timestamp with time zone DEFAULT now(),
  ip_address text,
  user_agent text
);

-- Enable RLS
ALTER TABLE button_clicks ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert button clicks
CREATE POLICY "Anyone can insert button clicks" ON button_clicks
  FOR INSERT WITH CHECK (true);

-- Policy: Users can view their own project clicks
CREATE POLICY "Users can view own project button clicks" ON button_clicks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = button_clicks.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_button_clicks_project_id ON button_clicks(project_id);
CREATE INDEX IF NOT EXISTS idx_button_clicks_clicked_at ON button_clicks(clicked_at DESC);

-- =====================================================
-- 6. FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for profiles
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for projects
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for project_images
DROP TRIGGER IF EXISTS update_project_images_updated_at ON project_images;
CREATE TRIGGER update_project_images_updated_at
  BEFORE UPDATE ON project_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for project_analytics
DROP TRIGGER IF EXISTS update_analytics_updated_at ON project_analytics;
CREATE TRIGGER update_analytics_updated_at
  BEFORE UPDATE ON project_analytics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to auto-create analytics record when project is created
CREATE OR REPLACE FUNCTION public.handle_new_project()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.project_analytics (project_id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create analytics on project creation
DROP TRIGGER IF EXISTS on_project_created ON projects;
CREATE TRIGGER on_project_created
  AFTER INSERT ON projects
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_project();
