-- Migration: Add theme column to projects and template_stats tables
-- Run this in Supabase SQL Editor if your database was created before theme support was added

-- Add theme column to projects table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'projects' 
    AND column_name = 'theme'
  ) THEN
    ALTER TABLE public.projects ADD COLUMN theme TEXT;
    RAISE NOTICE 'Added theme column to projects table';
  ELSE
    RAISE NOTICE 'Theme column already exists in projects table';
  END IF;
END $$;

-- Add theme column to template_stats table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'template_stats' 
    AND column_name = 'theme'
  ) THEN
    ALTER TABLE public.template_stats ADD COLUMN theme TEXT;
    RAISE NOTICE 'Added theme column to template_stats table';
  ELSE
    RAISE NOTICE 'Theme column already exists in template_stats table';
  END IF;
END $$;

-- Update the unique constraint on template_stats to include theme
DO $$
BEGIN
  -- Drop old constraint if it exists
  IF EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'template_stats_user_id_template_key'
  ) THEN
    ALTER TABLE public.template_stats DROP CONSTRAINT template_stats_user_id_template_key;
    RAISE NOTICE 'Dropped old unique constraint';
  END IF;
  
  -- Add new constraint with theme
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'template_stats_user_id_template_theme_key'
  ) THEN
    ALTER TABLE public.template_stats ADD CONSTRAINT template_stats_user_id_template_theme_key 
      UNIQUE(user_id, template, theme);
    RAISE NOTICE 'Added new unique constraint with theme';
  ELSE
    RAISE NOTICE 'New unique constraint already exists';
  END IF;
END $$;

-- Verify the changes
SELECT 
  'projects' as table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'projects'
  AND column_name = 'theme'
UNION ALL
SELECT 
  'template_stats' as table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'template_stats'
  AND column_name = 'theme';
