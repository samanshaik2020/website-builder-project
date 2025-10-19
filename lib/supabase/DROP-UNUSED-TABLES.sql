-- ============================================
-- DROP UNUSED TABLES
-- ============================================
-- This script removes tables and functions that are not being used
-- Run this in Supabase SQL Editor to clean up your database

-- Drop access_codes table and related objects
DROP TRIGGER IF EXISTS set_access_codes_updated_at ON public.access_codes CASCADE;
DROP FUNCTION IF EXISTS public.redeem_access_code(text, uuid) CASCADE;
DROP TABLE IF EXISTS public.access_codes CASCADE;

-- Drop indexes (if they still exist)
DROP INDEX IF EXISTS public.idx_access_codes_code;
DROP INDEX IF EXISTS public.idx_access_codes_user_id;
DROP INDEX IF EXISTS public.idx_access_codes_is_redeemed;

-- Verify cleanup
SELECT 'Cleanup complete! Access codes table and related objects removed.' as status;

-- Check remaining tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
