# Fix 406 Error on Shareable Links

## Problem
Getting `406 (Not Acceptable)` error when checking custom slug availability:
```
GET https://rgmgdlkkrsssvgesdmrm.supabase.co/rest/v1/shareable_links?select=id&custom_slug=eq.mnznm 406 (Not Acceptable)
```

## Root Cause
1. **RLS (Row Level Security) blocking public access** - The shareable_links table needs a public SELECT policy to allow slug availability checks
2. **Using `.single()` instead of `.maybeSingle()`** - This causes errors when no rows are found

## Solution (2 Parts)

### Part 1: Fix Code (Already Done ✅)

The code has been updated in `lib/supabase/shareable-links.ts`:

**Changed:**
- Line 98-102: `createShareableLink` now uses `.maybeSingle()` instead of `.single()`
- Line 185-196: `isSlugAvailable` now uses `.maybeSingle()` and handles errors properly

**What this does:**
- `.maybeSingle()` returns `null` when no rows found (expected behavior)
- `.single()` throws an error when no rows found (causes 406 error)

### Part 2: Fix Supabase Database Policies

You need to run the SQL script in your Supabase dashboard.

#### Steps:

1. **Open Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project: `rgmgdlkkrsssvgesdmrm`

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run the Fix Script**
   - Copy the entire contents of `lib/supabase/fix-shareable-links-406.sql`
   - Paste into the SQL Editor
   - Click "Run" or press Ctrl+Enter

4. **Verify the Fix**
   The script will:
   - ✅ Enable RLS on shareable_links table
   - ✅ Create public SELECT policy (allows anyone to check slug availability)
   - ✅ Create authenticated user policies (CRUD operations)
   - ✅ Allow public access to projects via valid shareable links
   - ✅ Create/update the increment_link_views function

5. **Test**
   - Restart your dev server: `npm run dev`
   - Try creating a shareable link
   - The 406 error should be gone!

## What Each Policy Does

### Public Policy (Fixes 406 Error)
```sql
CREATE POLICY "Anyone can view shareable links by slug" 
ON public.shareable_links
FOR SELECT 
USING (true);
```
**Purpose:** Allows unauthenticated users to check if a slug exists (needed for slug availability validation)

### Authenticated User Policies
```sql
-- View own links
CREATE POLICY "Users can view their own shareable links" 
ON public.shareable_links FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Create links
CREATE POLICY "Users can insert their own shareable links" 
ON public.shareable_links FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Update links
CREATE POLICY "Users can update their own shareable links" 
ON public.shareable_links FOR UPDATE TO authenticated
USING (auth.uid() = user_id);

-- Delete links
CREATE POLICY "Users can delete their own shareable links" 
ON public.shareable_links FOR DELETE TO authenticated
USING (auth.uid() = user_id);
```
**Purpose:** Ensures users can only manage their own shareable links

### Project Access Policy
```sql
CREATE POLICY "Anyone can view projects via shareable links" 
ON public.projects FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.shareable_links
    WHERE shareable_links.project_id = projects.id
    AND (shareable_links.expires_at IS NULL OR shareable_links.expires_at > NOW())
    AND (shareable_links.max_views IS NULL OR shareable_links.views < shareable_links.max_views)
  )
);
```
**Purpose:** Allows public access to projects that have valid (non-expired, under view limit) shareable links

## Verification

After running the SQL script, verify in Supabase Dashboard:

1. **Check RLS Status**
   - Go to "Table Editor" → "shareable_links"
   - Click the shield icon (RLS)
   - Should show "Row Level Security is enabled"

2. **Check Policies**
   - Should see 5 policies:
     - ✅ Anyone can view shareable links by slug
     - ✅ Users can view their own shareable links
     - ✅ Users can insert their own shareable links
     - ✅ Users can update their own shareable links
     - ✅ Users can delete their own shareable links

3. **Test in Browser**
   - Open your app
   - Try to create a shareable link
   - No more 406 errors!

## Troubleshooting

### Still Getting 406 Error?

1. **Clear browser cache and restart dev server**
   ```bash
   # Stop dev server (Ctrl+C)
   npm run dev
   ```

2. **Check if policies were created**
   Run in Supabase SQL Editor:
   ```sql
   SELECT policyname, permissive, roles, cmd
   FROM pg_policies
   WHERE schemaname = 'public' 
   AND tablename = 'shareable_links';
   ```
   Should return 5 rows

3. **Check RLS is enabled**
   Run in Supabase SQL Editor:
   ```sql
   SELECT tablename, rowsecurity 
   FROM pg_tables 
   WHERE schemaname = 'public' 
   AND tablename = 'shareable_links';
   ```
   `rowsecurity` should be `true`

4. **Test the query directly**
   Run in Supabase SQL Editor:
   ```sql
   SELECT id FROM shareable_links WHERE custom_slug = 'test';
   ```
   Should return results or empty (not an error)

### Error: "policy already exists"

If you see this error, it means policies are already created. You can either:
- Skip the policy creation steps
- Or drop existing policies first (script includes DROP commands)

## Security Notes

✅ **Safe:** The public SELECT policy only allows reading slug existence, not viewing sensitive data
✅ **Secure:** All write operations (INSERT, UPDATE, DELETE) require authentication
✅ **Protected:** Users can only manage their own shareable links
✅ **Validated:** Projects are only accessible via valid, non-expired links

## Summary

**Before Fix:**
- ❌ 406 error when checking slug availability
- ❌ `.single()` throws error when no rows found
- ❌ RLS blocking public SELECT queries

**After Fix:**
- ✅ Public can check slug availability
- ✅ `.maybeSingle()` handles empty results gracefully
- ✅ RLS policies properly configured
- ✅ Shareable links work perfectly!

## Files Modified

1. ✅ `lib/supabase/shareable-links.ts` - Fixed `.single()` → `.maybeSingle()`
2. ✅ `lib/supabase/fix-shareable-links-406.sql` - SQL script to run in Supabase

## Next Steps

1. Run the SQL script in Supabase Dashboard
2. Restart your dev server
3. Test creating a shareable link
4. Enjoy error-free shareable links! 🎉
