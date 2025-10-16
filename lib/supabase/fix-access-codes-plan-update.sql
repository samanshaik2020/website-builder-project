-- Fix for access code redemption not updating user plan
-- Run this in Supabase SQL Editor

-- First, verify the plan_type enum exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'plan_type') THEN
        CREATE TYPE plan_type AS ENUM ('free', 'starter', 'professional', 'unlimited');
    END IF;
END $$;

-- Drop and recreate the function with better error handling
CREATE OR REPLACE FUNCTION public.redeem_access_code(
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
    user_id = p_user_id
  WHERE code = p_code;

  -- Update user's plan - cast the plan_type to match the enum
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

-- Test query to check if a user exists and their current plan
-- Replace 'YOUR_USER_ID' with your actual user ID
-- SELECT id, email, plan, subscribed_at FROM public.users WHERE id = 'YOUR_USER_ID';
