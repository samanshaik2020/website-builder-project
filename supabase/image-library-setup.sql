-- =====================================================
-- Image Library setup (safe to run in the Supabase SQL editor)
--
-- This creates the account-level image library without removing
-- existing image records or files.
-- =====================================================

CREATE TABLE IF NOT EXISTS public.project_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL,
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

-- Make the setup compatible with older versions of the table.
ALTER TABLE public.project_images
  ADD COLUMN IF NOT EXISTS project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS name text,
  ADD COLUMN IF NOT EXISTS url text,
  ADD COLUMN IF NOT EXISTS alt_text text DEFAULT '',
  ADD COLUMN IF NOT EXISTS width text DEFAULT 'auto',
  ADD COLUMN IF NOT EXISTS height text DEFAULT 'auto',
  ADD COLUMN IF NOT EXISTS alignment text DEFAULT 'center',
  ADD COLUMN IF NOT EXISTS storage_path text,
  ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now(),
  ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now();

ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own project images" ON public.project_images;
CREATE POLICY "Users can view own project images" ON public.project_images
  FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can create own project images" ON public.project_images;
CREATE POLICY "Users can create own project images" ON public.project_images
  FOR INSERT
  TO authenticated
  WITH CHECK (
    (SELECT auth.uid()) = user_id
    AND (
      project_id IS NULL
      OR EXISTS (
        SELECT 1
        FROM public.projects
        WHERE projects.id = project_images.project_id
          AND projects.user_id = (SELECT auth.uid())
      )
    )
  );

DROP POLICY IF EXISTS "Users can update own project images" ON public.project_images;
CREATE POLICY "Users can update own project images" ON public.project_images
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK (
    (SELECT auth.uid()) = user_id
    AND (
      project_id IS NULL
      OR EXISTS (
        SELECT 1
        FROM public.projects
        WHERE projects.id = project_images.project_id
          AND projects.user_id = (SELECT auth.uid())
      )
    )
  );

DROP POLICY IF EXISTS "Users can delete own project images" ON public.project_images;
CREATE POLICY "Users can delete own project images" ON public.project_images
  FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_images TO authenticated;

CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON public.project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_project_images_user_id ON public.project_images(user_id);
CREATE INDEX IF NOT EXISTS idx_project_images_created_at ON public.project_images(created_at DESC);

-- Use the same timestamp trigger as the rest of the application schema.
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_project_images_updated_at ON public.project_images;
CREATE TRIGGER update_project_images_updated_at
  BEFORE UPDATE ON public.project_images
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Public URLs are intentional: users copy these URLs into published pages.
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

DROP POLICY IF EXISTS "Users can upload own project image objects" ON storage.objects;
CREATE POLICY "Users can upload own project image objects" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'project-images'
    AND (storage.foldername(name))[1] = (SELECT auth.uid()::text)
  );

DROP POLICY IF EXISTS "Users can delete own project image objects" ON storage.objects;
CREATE POLICY "Users can delete own project image objects" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'project-images'
    AND owner_id = (SELECT auth.uid()::text)
  );

NOTIFY pgrst, 'reload schema';
