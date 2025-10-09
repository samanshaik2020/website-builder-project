-- ============================================
-- COMPLETE DATABASE RESET FOR SHAREABLE LINKS
-- ============================================
-- WARNING: This will DELETE ALL DATA!
-- Run this in Supabase SQL Editor

-- ============================================
-- STEP 1: DROP EVERYTHING
-- ============================================

-- Drop all triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users CASCADE;
DROP TRIGGER IF EXISTS set_users_updated_at ON public.users CASCADE;
DROP TRIGGER IF EXISTS set_projects_updated_at ON public.projects CASCADE;
DROP TRIGGER IF EXISTS set_shareable_links_updated_at ON public.shareable_links CASCADE;

-- Drop all functions
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.handle_updated_at() CASCADE;

-- Drop all tables
DROP TABLE IF EXISTS public.template_stats CASCADE;
DROP TABLE IF EXISTS public.shareable_links CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- Drop enum type
DROP TYPE IF EXISTS plan_type CASCADE;

-- ============================================
-- STEP 2: CREATE FRESH TABLES
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for plan types
CREATE TYPE plan_type AS ENUM ('free', 'starter', 'professional', 'unlimited');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  plan plan_type DEFAULT 'free' NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Projects table
CREATE TABLE public.projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  template TEXT NOT NULL,
  theme TEXT,
  data JSONB NOT NULL DEFAULT '{"texts": {}, "images": {}, "buttons": {}}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Shareable links table
CREATE TABLE public.shareable_links (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  custom_slug TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ,
  max_views INTEGER,
  views INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Template statistics table
CREATE TABLE public.template_stats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  template TEXT NOT NULL,
  theme TEXT,
  usage_count INTEGER DEFAULT 1 NOT NULL,
  last_used_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, template, theme)
);

-- ============================================
-- STEP 3: CREATE INDEXES
-- ============================================

CREATE INDEX idx_projects_user_id ON public.projects(user_id);
CREATE INDEX idx_projects_updated_at ON public.projects(updated_at DESC);
CREATE INDEX idx_shareable_links_user_id ON public.shareable_links(user_id);
CREATE INDEX idx_shareable_links_project_id ON public.shareable_links(project_id);
CREATE INDEX idx_shareable_links_custom_slug ON public.shareable_links(custom_slug);
CREATE INDEX idx_template_stats_user_id ON public.template_stats(user_id);

-- ============================================
-- STEP 4: ENABLE ROW LEVEL SECURITY
-- ============================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shareable_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.template_stats ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 5: CREATE RLS POLICIES
-- ============================================

-- Users table policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Projects table policies
CREATE POLICY "Users can view own projects" ON public.projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own projects" ON public.projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON public.projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON public.projects
  FOR DELETE USING (auth.uid() = user_id);

-- CRITICAL: Public can view projects via shareable links
CREATE POLICY "Anyone can view projects via shareable links" ON public.projects
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.shareable_links
      WHERE shareable_links.project_id = projects.id
      AND (shareable_links.expires_at IS NULL OR shareable_links.expires_at > NOW())
      AND (shareable_links.max_views IS NULL OR shareable_links.views < shareable_links.max_views)
    )
  );

-- Shareable links table policies
CREATE POLICY "Users can view own shareable links" ON public.shareable_links
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own shareable links" ON public.shareable_links
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own shareable links" ON public.shareable_links
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own shareable links" ON public.shareable_links
  FOR DELETE USING (auth.uid() = user_id);

-- CRITICAL: Public can view shareable links by slug
CREATE POLICY "Anyone can view shareable links by slug" ON public.shareable_links
  FOR SELECT USING (true);

-- Template stats table policies
CREATE POLICY "Users can view own template stats" ON public.template_stats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own template stats" ON public.template_stats
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own template stats" ON public.template_stats
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- STEP 6: CREATE FUNCTIONS
-- ============================================

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    -- User already exists, ignore
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- STEP 7: CREATE TRIGGERS
-- ============================================

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Triggers for updated_at
CREATE TRIGGER set_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_shareable_links_updated_at
  BEFORE UPDATE ON public.shareable_links
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- STEP 8: INSERT EXISTING AUTH USERS
-- ============================================
-- This will create profiles for users who are already signed up

INSERT INTO public.users (id, email, full_name, avatar_url)
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'full_name', ''),
  COALESCE(raw_user_meta_data->>'avatar_url', '')
FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- DONE! 
-- ============================================
-- Your database is now ready for shareable links!
-- 
-- Next steps:
-- 1. Refresh your app
-- 2. Create a new project
-- 3. Create a shareable link
-- 4. Test it in a different browser
-- ============================================
