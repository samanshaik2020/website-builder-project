# Shareable Links Fix - Complete Guide

## Problem
Shareable links were showing empty templates when opened in a new browser or after some time because the data was stored in **localStorage** (browser-specific) instead of the **Supabase database**.

## Solution
Updated the shareable links system to use Supabase database for persistent storage across browsers and sessions.

## Changes Made

### 1. Database Schema Update
- Added RLS policy to allow public access to projects via valid shareable links
- File: `lib/supabase/schema.sql`

### 2. New Function for Public Project Access
- Added `getProjectByShareableLink()` function to fetch projects via shareable links
- File: `lib/supabase/projects.ts`

### 3. Updated Share Page
- Changed from localStorage to Supabase database
- File: `app/share/[slug]/page.tsx`

## How to Apply the Fix

### Step 1: Update Supabase Database

You need to run the migration SQL in your Supabase dashboard:

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Create a new query
4. Copy and paste the contents from: `lib/supabase/migration-shareable-links-fix.sql`
5. Click **Run** to execute the migration

**OR** run this SQL directly:

```sql
-- Add public policy for viewing projects via shareable links
CREATE POLICY "Anyone can view projects via shareable links" ON public.projects
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.shareable_links
      WHERE shareable_links.project_id = projects.id
      AND (shareable_links.expires_at IS NULL OR shareable_links.expires_at > NOW())
      AND (shareable_links.max_views IS NULL OR shareable_links.views < shareable_links.max_views)
    )
  );
```

### Step 2: Verify the Code Changes

The following files have been updated automatically:
- ✅ `lib/supabase/schema.sql` - Updated with new RLS policy
- ✅ `lib/supabase/projects.ts` - Added `getProjectByShareableLink()` function
- ✅ `app/share/[slug]/page.tsx` - Now uses Supabase instead of localStorage

### Step 3: Test the Fix

1. **Create a shareable link:**
   - Open your website builder
   - Create or edit a project
   - Generate a shareable link

2. **Test in same browser:**
   - Open the shareable link in a new tab
   - Verify the template displays correctly

3. **Test in different browser:**
   - Copy the shareable link
   - Open it in a different browser (Chrome, Firefox, Edge, etc.)
   - Verify the template displays correctly

4. **Test after clearing cache:**
   - Clear your browser cache/localStorage
   - Open the shareable link again
   - Verify the template still displays correctly

## Important Notes

### Data Migration
- **Old shareable links (created before this fix)** were stored in localStorage and won't work anymore
- **New shareable links** will be stored in Supabase and work across all browsers
- Users need to **recreate their shareable links** after this update

### How It Works Now

1. **When creating a shareable link:**
   - Link data is saved to Supabase `shareable_links` table
   - Project data is already in Supabase `projects` table

2. **When accessing a shareable link:**
   - Fetches link from Supabase (works in any browser)
   - Fetches project from Supabase (works in any browser)
   - Generates and displays the HTML

3. **Security:**
   - RLS policy ensures only valid shareable links can access projects
   - Expired links and view-limited links are automatically filtered
   - Users can only manage their own shareable links

## Troubleshooting

### Issue: "This link has expired or doesn't exist"
**Cause:** The shareable link was created before the fix (stored in localStorage)
**Solution:** Create a new shareable link

### Issue: "Project not found"
**Cause:** The project might not be saved to Supabase
**Solution:** 
1. Make sure you're signed in
2. Edit and save the project again
3. Create a new shareable link

### Issue: Migration SQL fails
**Cause:** The policy might already exist
**Solution:** 
1. Check if the policy exists in Supabase dashboard (Database > Policies)
2. If it exists, you're good to go
3. If not, try dropping and recreating it:

```sql
-- Drop existing policy if needed
DROP POLICY IF EXISTS "Anyone can view projects via shareable links" ON public.projects;

-- Create new policy
CREATE POLICY "Anyone can view projects via shareable links" ON public.projects
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.shareable_links
      WHERE shareable_links.project_id = projects.id
      AND (shareable_links.expires_at IS NULL OR shareable_links.expires_at > NOW())
      AND (shareable_links.max_views IS NULL OR shareable_links.views < shareable_links.max_views)
    )
  );
```

## Next Steps

1. ✅ Apply the database migration (Step 1 above)
2. ✅ Deploy the updated code to production
3. ✅ Test shareable links in multiple browsers
4. 📢 Notify users to recreate their shareable links if they had any old ones

## Summary

The shareable links now use **Supabase database** instead of **localStorage**, which means:
- ✅ Links work across all browsers
- ✅ Links persist even after clearing cache
- ✅ Links work when shared with others
- ✅ Proper view counting and expiration tracking
- ✅ Better security with RLS policies
