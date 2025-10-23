# Shareable Links Fix Guide

## Issues Identified

1. **UUID Validation Error**: The share page was trying to query "iphone" as a UUID instead of recognizing it as a custom URL slug
2. **406 Not Acceptable Error**: RLS policies may not be properly configured for anonymous access
3. **Links Expiring**: Projects with custom URLs should be publicly accessible indefinitely

## Fixes Applied

### 1. Share Page Logic (`app/share/[projectId]/page.tsx`)

**Problem**: The page was trying both queries (custom URL and UUID) without distinguishing between them, causing UUID validation errors.

**Solution**: Added UUID detection logic to determine whether to query by ID or custom URL:

```typescript
// Check if projectId is a UUID (contains hyphens and is 36 chars)
const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(projectId);

if (isUUID) {
  // Try to find by project ID (UUID)
  foundProject = await getProject(projectId);
} else {
  // Try to find by custom URL slug
  foundProject = await getProjectByCustomUrl(projectId);
}
```

### 2. Project Service Improvements (`lib/services/project-service.ts`)

**Changes**:
- Changed `.single()` to `.maybeSingle()` to avoid errors when no results found
- Added console logging for debugging
- Better error handling

### 3. Database RLS Policies (`supabase/fix-rls-policies.sql`)

**Problem**: RLS policies may not allow anonymous users to read shared projects.

**Solution**: Run the SQL script to update policies:

```sql
-- Allow anonymous users to view projects with custom URLs
CREATE POLICY "Public can view shared projects" ON projects
  FOR SELECT USING (custom_url IS NOT NULL);

-- Allow anonymous users to view analytics for shared projects
CREATE POLICY "Public can view shared project analytics" ON project_analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_analytics.project_id 
      AND projects.custom_url IS NOT NULL
    )
  );
```

## How to Apply the Fix

### Step 1: Run the SQL Script

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Open the file `supabase/fix-rls-policies.sql`
4. Copy and paste the contents into the SQL Editor
5. Click **Run** to execute the script

### Step 2: Test the Shareable Links

1. Create a new project in the dashboard
2. Set a custom URL (e.g., "my-awesome-site")
3. Click the "Share" button to get the shareable link
4. Open the link in an **incognito/private browser window** (to test anonymous access)
5. Verify the project loads correctly

### Step 3: Check Browser Console

If issues persist:

1. Open browser DevTools (F12)
2. Go to the **Console** tab
3. Look for log messages starting with `[getProject]` or `[getProjectByCustomUrl]`
4. Check for any error messages

## Common Issues and Solutions

### Issue: "Failed to load project" Error

**Possible Causes**:
- RLS policies not updated
- Custom URL not set on the project
- Project deleted

**Solution**:
1. Verify the SQL script was run successfully
2. Check that the project has a `custom_url` value in the database
3. Try creating a new project with a custom URL

### Issue: 406 Not Acceptable Error

**Possible Causes**:
- RLS policy blocking anonymous access
- Analytics join failing due to permissions

**Solution**:
1. Run the `fix-rls-policies.sql` script
2. Verify the policies were created:
   ```sql
   SELECT * FROM pg_policies WHERE tablename IN ('projects', 'project_analytics');
   ```

### Issue: Links Work Initially Then Stop Working

**Possible Causes**:
- Session expiration (shouldn't happen for public links)
- Database connection issues

**Solution**:
1. Check Supabase project status
2. Verify RLS policies allow anonymous access
3. Test with a fresh incognito window

## Testing Checklist

- [ ] UUID-based share links work (e.g., `/share/123e4567-e89b-12d3-a456-426614174000`)
- [ ] Custom URL share links work (e.g., `/share/my-site`)
- [ ] Links work in incognito/private browsing mode
- [ ] Analytics tracking works (views increment)
- [ ] Button click tracking works
- [ ] No console errors in browser DevTools
- [ ] Links work after 24+ hours

## URL Format Examples

### UUID Format (Direct Project ID)
```
https://yoursite.com/share/123e4567-e89b-12d3-a456-426614174000
```

### Custom URL Format (Friendly Slug)
```
https://yoursite.com/share/my-awesome-website
https://yoursite.com/share/iphone
https://yoursite.com/share/portfolio-2024
```

## Debugging Tips

1. **Check the URL**: Ensure it matches one of the formats above
2. **Check the Database**: Verify the project exists and has a `custom_url` value
3. **Check RLS Policies**: Run the SQL script to ensure policies are correct
4. **Check Console Logs**: Look for detailed error messages in browser console
5. **Test Anonymous Access**: Always test in incognito mode to simulate public access

## Additional Notes

- Shareable links should **never expire** as long as the project exists
- The `custom_url` field must be unique across all projects
- Anonymous users can view and interact with shared projects but cannot edit them
- Analytics (views/clicks) are tracked for all visitors, including anonymous users
