-- Complete Access Codes Setup - Run this entire script in Supabase SQL Editor
-- This will drop existing tables/functions and recreate everything correctly

-- ============================================
-- STEP 1: DROP EXISTING OBJECTS
-- ============================================

-- Drop function first (it depends on the table)
DROP FUNCTION IF EXISTS public.redeem_access_code(text, uuid);

-- Drop table and its dependencies
DROP TABLE IF EXISTS public.access_codes CASCADE;

-- ============================================
-- STEP 2: ENSURE PLAN_TYPE ENUM EXISTS
-- ============================================

-- Create plan_type enum if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'plan_type') THEN
        CREATE TYPE plan_type AS ENUM ('free', 'starter', 'professional', 'unlimited');
    END IF;
END $$;

-- ============================================
-- STEP 3: CREATE ACCESS_CODES TABLE
-- ============================================

-- Access codes table for Pro plan unlocking
CREATE TABLE public.access_codes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  plan_type plan_type NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  is_redeemed BOOLEAN DEFAULT FALSE NOT NULL,
  redeemed_at TIMESTAMPTZ,
  created_by TEXT, -- Email or identifier of who generated the code
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes
CREATE INDEX idx_access_codes_code ON public.access_codes(code);
CREATE INDEX idx_access_codes_user_id ON public.access_codes(user_id);
CREATE INDEX idx_access_codes_is_redeemed ON public.access_codes(is_redeemed);

-- ============================================
-- STEP 4: ENABLE RLS AND CREATE POLICIES
-- ============================================

-- Enable RLS
ALTER TABLE public.access_codes ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view codes they've redeemed
CREATE POLICY "Users can view own redeemed codes" ON public.access_codes
  FOR SELECT USING (auth.uid() = user_id);

-- Anyone can check if a code is valid (for redemption)
CREATE POLICY "Anyone can check code validity" ON public.access_codes
  FOR SELECT USING (is_redeemed = FALSE);

-- Users can redeem codes
CREATE POLICY "Users can redeem codes" ON public.access_codes
  FOR UPDATE USING (is_redeemed = FALSE);

-- ============================================
-- STEP 5: CREATE UPDATED_AT TRIGGER
-- ============================================

-- Trigger for updated_at (assumes handle_updated_at function exists)
CREATE TRIGGER set_access_codes_updated_at
  BEFORE UPDATE ON public.access_codes
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- STEP 6: CREATE REDEEM FUNCTION (FIXED VERSION)
-- ============================================

-- Function to redeem access code with proper type casting
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
-- STEP 7: INSERT TEST CODE (OPTIONAL)
-- ============================================

-- Uncomment to insert a test code
-- INSERT INTO public.access_codes (code, plan_type, created_by, expires_at)
-- VALUES ('PRO-TEST99-WXYZ1234', 'professional', 'admin', '2025-12-31 23:59:59');

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check if table was created
-- SELECT * FROM public.access_codes;

-- Check if function exists
-- SELECT proname FROM pg_proc WHERE proname = 'redeem_access_code';

-- ============================================
-- SETUP COMPLETE! ✅
-- ============================================
