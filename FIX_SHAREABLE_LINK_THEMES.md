# Fix: Shareable Links Showing Default Theme Instead of Selected Theme

## Problem
When you save a project with a themed template (e.g., Portfolio - Minimal Light), the dashboard preview shows the correct theme, but the generated shareable link displays the default theme.

## Root Cause
1. **Old projects** were created before the `theme` column existed in the database
2. When editing these projects, the editor doesn't know which theme to use (theme is `NULL`)
3. When saving, the theme stays `NULL` because `selectedThemeId` is not set
4. Shareable links read from the database and get `theme: NULL` → Shows default theme

## Solution Steps

### Step 1: Add Theme Column (if not already done)
Run in **Supabase SQL Editor**:

```sql
-- This is in: lib/supabase/migration-add-theme-column.sql
-- Copy and paste the entire file contents into Supabase SQL Editor
```

Expected output:
- ✅ "Added theme column to projects table"
- ✅ "Added theme column to template_stats table"

### Step 2: Fix Existing Projects with NULL Themes
Run in **Supabase SQL Editor**:

```sql
-- This is in: lib/supabase/migration-fix-null-themes.sql
-- Copy and paste the entire file contents into Supabase SQL Editor
```

This will:
- Set `theme = 'default'` for all portfolio projects with NULL theme
- Set `theme = 'default'` for all saas-landing projects with NULL theme
- Set appropriate default themes for all Pro templates

Expected output:
- You'll see a table showing updated project counts by template and theme

### Step 3: Verify Database Changes

Run this query in Supabase SQL Editor:

```sql
-- Check that theme column exists and has values
SELECT 
  id,
  name,
  template,
  theme,
  updated_at
FROM public.projects
WHERE template IN ('portfolio', 'saas-landing')
ORDER BY updated_at DESC
LIMIT 10;
```

You should see your projects with `theme` values instead of `NULL`.

### Step 4: Clear Browser Cache and Test

1. **Hard refresh your dashboard page**: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Click on your portfolio project
3. You should now see it has a theme badge or indicator
4. Click "Edit" - it should load with the correct theme
5. Make any small edit (or just click Save)
6. Click **"Save & Publish"**

### Step 5: Test Shareable Link

1. Go to your dashboard
2. Find your themed portfolio project
3. Click "Share" and generate/copy the link
4. Open the link in a **new incognito/private window**
5. The link should now show your selected theme (e.g., Minimal Light)

## Debugging

### Check Console Logs
When viewing the shareable link, open browser DevTools (F12) → Console tab.

You should see detailed step-by-step logs:

```
🔗 [SHAREABLE LINK] Starting to load project for slug: my-portfolio-link
🔍 [SHAREABLE LINK] Step 1: Fetching shareable link from database...
✅ [SHAREABLE LINK] Step 1 Complete: Link found { linkId: "...", projectId: "...", views: 5 }
📊 [SHAREABLE LINK] Step 2: Incrementing view count...
🔍 [SHAREABLE LINK] Step 3: Fetching project data from database...
✅ [SHAREABLE LINK] Step 3 Complete: Project fetched from database {
  projectName: "My Portfolio",
  template: "portfolio",
  theme: "minimal-light",  // ← Should NOT be null
  themeIsNull: false,      // ← Should be false
  themeIsUndefined: false  // ← Should be false
}
🎨 [SHAREABLE LINK] Step 4: Project data prepared for export: {
  template: "portfolio",
  theme: "minimal-light",
  hasTheme: true,          // ← Should be true
  willUseDefaultTheme: false
}
🔨 [SHAREABLE LINK] Step 5: Generating HTML export...
📄 Export HTML - Generating: { template: "portfolio", theme: "minimal-light", hasTheme: true }
🎨 Portfolio Export - Theme routing: {
  receivedTheme: "minimal-light",
  selectedTheme: "minimal-light",
  willUse: "Minimal Light"  // ← Should show the correct theme name
}
✅ [SHAREABLE LINK] Step 5 Complete: HTML generated { htmlLength: 45231 }
🎉 [SHAREABLE LINK] SUCCESS: Project loaded and rendered!
```

### What to Look For

**✅ Good Signs:**
- `theme: "minimal-light"` (or your selected theme)
- `themeIsNull: false`
- `hasTheme: true`
- `willUse: "Minimal Light"` (correct theme name)

**❌ Problem Signs:**
- `theme: null` → Database has NULL theme, run migrations
- `theme: undefined` → Database has NULL theme, run migrations
- `themeIsNull: true` → Database has NULL theme, run migrations
- `willUseDefaultTheme: true` → Will show default theme instead

### Error Logs

If something fails, you'll see:
```
❌ [SHAREABLE LINK] ERROR: Failed to load project: Error message here
❌ [SHAREABLE LINK] Error details: { errorMessage: "...", errorStack: "..." }
```

If you see `theme: null` or `theme: undefined`, the database still has NULL values.

### Verify Database Directly

Run in Supabase SQL Editor:
```sql
SELECT id, name, template, theme 
FROM public.projects 
WHERE template = 'portfolio';
```

All portfolio projects should have a `theme` value.

### If Theme is Still NULL After Migration

This means the project was created after the column was added but before the editor fix. To fix:

1. Open the project in the editor
2. The editor will now auto-detect and set the default theme
3. Click "Save & Publish"
4. The theme will now be saved to the database

## Technical Changes Made

### 1. Database Migration
- Added `theme` column to `projects` table
- Added `theme` column to `template_stats` table
- Updated unique constraints to include theme

### 2. Dashboard Fix (`app/dashboard/page.tsx`)
- Modified `handleEdit` function to detect and set default themes for old projects
- When editing a project with `theme: NULL`, it now defaults to:
  - Portfolio → `'default'`
  - SaaS Landing → `'default'`
  - SaaS Pro → `'modern-minimal'`
  - Agency Pro → `'modern-minimal'`
  - Portfolio Pro → `'default'`
  - iPhone Pro → `'dark-gradient'`

### 3. Theme Export Already Working
- `lib/export-html-portfolio.ts` correctly routes themes
- `app/share/[slug]/page.tsx` correctly passes theme to export function
- The only issue was NULL theme values in database

## Default Themes Reference

| Template | Default Theme ID | Theme Name |
|----------|-----------------|------------|
| portfolio | `default` | Default Portfolio |
| portfolio | `creative-dark` | Creative Dark |
| portfolio | `minimal-light` | Minimal Light |
| portfolio | `vibrant-magazine` | Vibrant Magazine |
| saas-landing | `default` | Default SaaS |
| saas-landing | `modern-gradient` | Modern Gradient |
| saas-landing | `minimal-clean` | Minimal Clean |
| saas-landing | `bold-dynamic` | Bold Dynamic |
| saas-pro | `modern-minimal` | Modern Minimal |
| agency-pro | `modern-minimal` | Modern Minimal |
| portfolio-pro | `default` | Default |
| iphone-pro | `dark-gradient` | Dark Gradient |

## Testing Checklist

- [ ] Run `migration-add-theme-column.sql` in Supabase
- [ ] Run `migration-fix-null-themes.sql` in Supabase
- [ ] Verify theme column exists with query
- [ ] Verify projects have theme values (not NULL)
- [ ] Hard refresh dashboard
- [ ] Edit a themed project
- [ ] Save the project
- [ ] Generate shareable link
- [ ] Open shareable link in incognito
- [ ] Verify correct theme displays
- [ ] Check console logs for theme routing

## Success Indicators

✅ **Dashboard shows theme badges/names on project cards**
✅ **Editing loads the correct theme in editor**
✅ **Saving preserves the theme selection**
✅ **Shareable links display the selected theme**
✅ **Console logs show theme being passed through correctly**

## If It Still Doesn't Work

1. Check if you ran BOTH SQL migrations
2. Verify the database has the theme column: `\d projects` in Supabase SQL
3. Check the actual theme value for your project in the database
4. Clear localStorage: DevTools → Application → Local Storage → Clear
5. Try creating a NEW project with a theme and share it
6. Check browser console for errors

## Files Modified

- ✅ `app/dashboard/page.tsx` - Added default theme detection
- ✅ `lib/supabase/migration-add-theme-column.sql` - Existing migration
- ✅ `lib/supabase/migration-fix-null-themes.sql` - New migration to fix old projects

## Files Already Working Correctly

- ✅ `lib/export-html-portfolio.ts` - Theme routing works
- ✅ `lib/export-html-saas-landing.ts` - Theme routing works
- ✅ `app/share/[slug]/page.tsx` - Passes theme to export
- ✅ `lib/supabase/projects.ts` - Saves theme correctly
- ✅ `app/editor/page.tsx` - Saves theme when selectedThemeId is set

---

**After completing all steps, your shareable links should display the correct themed templates!**
