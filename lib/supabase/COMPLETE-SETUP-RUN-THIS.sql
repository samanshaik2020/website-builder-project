-- COMPLETE SETUP SCRIPT - Run this entire file in Supabase SQL Editor
-- This fixes all issues: new user creation, access codes, and plan updates

-- ============================================
-- PART 1: USERS TABLE & AUTO-CREATE TRIGGER
-- ============================================

-- Ensure plan_type enum exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'plan_type') THEN
        CREATE TYPE plan_type AS ENUM ('free', 'starter', 'professional', 'unlimited');
    END IF;
END $$;

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  plan plan_type DEFAULT 'free' NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop and recreate RLS policies for users
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;

CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Create function to auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url, plan)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.raw_user_meta_data->>'avatar_url',
    'free'::plan_type
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create updated_at function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create updated_at trigger for users
DROP TRIGGER IF EXISTS set_users_updated_at ON public.users;

CREATE TRIGGER set_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Backfill existing auth users who don't have profiles
INSERT INTO public.users (id, email, full_name, avatar_url, plan)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', ''),
  au.raw_user_meta_data->>'avatar_url',
  'free'::plan_type
FROM auth.users au
WHERE NOT EXISTS (
  SELECT 1 FROM public.users pu WHERE pu.id = au.id
);

-- ============================================
-- PART 2: ACCESS CODES TABLE & FUNCTION
-- ============================================

-- Drop existing objects
DROP FUNCTION IF EXISTS public.redeem_access_code(text, uuid);
DROP TABLE IF EXISTS public.access_codes CASCADE;

-- Create access_codes table
CREATE TABLE public.access_codes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  plan_type plan_type NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  is_redeemed BOOLEAN DEFAULT FALSE NOT NULL,
  redeemed_at TIMESTAMPTZ,
  created_by TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes
CREATE INDEX idx_access_codes_code ON public.access_codes(code);
CREATE INDEX idx_access_codes_user_id ON public.access_codes(user_id);
CREATE INDEX idx_access_codes_is_redeemed ON public.access_codes(is_redeemed);

-- Enable RLS
ALTER TABLE public.access_codes ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own redeemed codes" ON public.access_codes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can check code validity" ON public.access_codes
  FOR SELECT USING (is_redeemed = FALSE);

CREATE POLICY "Users can redeem codes" ON public.access_codes
  FOR UPDATE USING (is_redeemed = FALSE);

-- Create updated_at trigger for access_codes
DROP TRIGGER IF EXISTS set_access_codes_updated_at ON public.access_codes;

CREATE TRIGGER set_access_codes_updated_at
  BEFORE UPDATE ON public.access_codes
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create redeem function with proper type casting
CREATE FUNCTION public.redeem_access_code(
  p_code TEXT,
  p_user_id UUID
)
RETURNS TABLE(success BOOLEAN, plan_type TEXT, message TEXT) AS $$
DECLARE
  v_code_record RECORD;
  v_user_exists BOOLEAN;
BEGIN
  -- Check if user exists in users table
  SELECT EXISTS(SELECT 1 FROM public.users WHERE id = p_user_id) INTO v_user_exists;
  
  IF NOT v_user_exists THEN
    RETURN QUERY SELECT FALSE, 'free'::TEXT, 'User not found in database'::TEXT;
    RETURN;
  END IF;

  -- Find the code
  SELECT * INTO v_code_record
  FROM public.access_codes
  WHERE code = p_code
  AND is_redeemed = FALSE
  AND (expires_at IS NULL OR expires_at > NOW());

  -- Check if code exists and is valid
  IF NOT FOUND THEN
    RETURN QUERY SELECT FALSE, 'free'::TEXT, 'Invalid or expired access code'::TEXT;
    RETURN;
  END IF;

  -- Redeem the code
  UPDATE public.access_codes
  SET 
    is_redeemed = TRUE,
    redeemed_at = NOW(),
    user_id = p_user_id,
    updated_at = NOW()
  WHERE code = p_code;

  -- Update user's plan with proper type casting
  UPDATE public.users
  SET 
    plan = v_code_record.plan_type::plan_type,
    subscribed_at = NOW(),
    updated_at = NOW()
  WHERE id = p_user_id;

  -- Verify the update worked
  IF NOT FOUND THEN
    RETURN QUERY SELECT FALSE, 'free'::TEXT, 'Failed to update user plan'::TEXT;
    RETURN;
  END IF;

  RETURN QUERY SELECT TRUE, v_code_record.plan_type::TEXT, 'Access code redeemed successfully'::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- VERIFICATION QUERIES (uncomment to test)
-- ============================================

-- Check if trigger exists
-- SELECT tgname FROM pg_trigger WHERE tgname = 'on_auth_user_created';

-- Check all users
-- SELECT id, email, plan, created_at FROM public.users;

-- Check access codes
-- SELECT * FROM public.access_codes;

-- ============================================
-- COMPLETE! ✅
-- ============================================
-- Next steps:
-- 1. Generate an access code using scripts/code-generator.html
-- 2. Insert it: INSERT INTO public.access_codes (code, plan_type, created_by, expires_at)
--    VALUES ('PRO-TEST99-WXYZ1234', 'professional', 'admin', '2025-12-31 23:59:59');
-- 3. Test redemption in your app
