# Supabase Integration Setup Guide

## ✅ Completed Steps

### 1. **Supabase Client Configuration**
- ✅ Created `lib/supabase/client.ts` - Browser client
- ✅ Created `lib/supabase/server.ts` - Server client  
- ✅ Created `lib/supabase/middleware.ts` - Auth middleware
- ✅ Created `lib/supabase/types.ts` - TypeScript types

### 2. **Database Schema**
- ✅ Created `supabase/schema.sql` with all tables:
  - `profiles` - User metadata
  - `projects` - Project storage
  - `project_analytics` - Analytics aggregates
  - `page_views` - Detailed view tracking
  - `button_clicks` - Detailed click tracking
- ✅ Row Level Security (RLS) policies configured
- ✅ Automatic triggers for profile creation and analytics

### 3. **Service Layer**
- ✅ Created `lib/services/auth-service.ts` - Authentication
- ✅ Created `lib/services/project-service.ts` - Project CRUD
- ✅ Created `lib/services/analytics-service.ts` - Analytics tracking

### 4. **Authentication Pages**
- ✅ Updated `app/signin/page.tsx` - Uses Supabase auth
- ✅ Updated `app/signup/page.tsx` - Uses Supabase auth
- ✅ Created `app/auth/callback/route.ts` - OAuth callback handler

### 5. **Middleware**
- ✅ Updated `middleware.ts` - Supabase session management
- ✅ Protected routes: `/dashboard`, `/editor`
- ✅ Auth routes redirect if logged in

### 6. **Dashboard**
- ✅ Updated `app/dashboard/page.tsx`:
  - Fetches projects from Supabase
  - Delete projects via Supabase
  - Update custom URLs via Supabase
  - Sign out via Supabase

---

## ✅ **All Implementation Complete!**

### 7. **Editor Page** ✅
- ✅ Updated `app/editor/page.tsx` to save projects to Supabase
- ✅ Uses `createProject` and `updateProject` services
- ✅ Loads existing projects for editing

### 8. **Share Page** ✅
- ✅ Updated `app/share/[projectId]/page.tsx`:
  - Fetches project from Supabase by ID or custom URL
  - Tracks page views using `trackPageView`
  - Tracks button clicks using `trackButtonClick`
  - Includes user agent and referrer metadata

### 9. **Preview Page** ✅
- ✅ Updated `app/preview/[projectId]/page.tsx` to fetch from Supabase

### 10. **Code Cleanup** ✅
- ✅ Deprecated old `lib/auth.ts` with backward compatibility
- ✅ Deprecated old `components/lib/projects-store.ts`
- ✅ Removed unused localStorage code
- ✅ All files now use Supabase services

---

## 📋 Database Setup Instructions

### Step 1: Run the Schema SQL

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Create a new query
4. Copy the entire contents of `supabase/schema.sql`
5. Paste and run the SQL
6. Verify all tables were created in the **Table Editor**

### Step 2: Verify Tables

Check that these tables exist:
- ✅ `profiles`
- ✅ `projects`
- ✅ `project_analytics`
- ✅ `page_views`
- ✅ `button_clicks`

### Step 3: Test Authentication

1. Try signing up a new user
2. Check the `auth.users` table
3. Verify a profile was auto-created in `profiles` table

---

## 🔑 Environment Variables

Make sure your `.env.local` has:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Get these from: **Supabase Dashboard → Settings → API**

---

## 🧪 Testing Checklist

### Authentication
- [ ] Sign up new user
- [ ] Sign in existing user
- [ ] Sign out
- [ ] Google OAuth (requires Google provider setup in Supabase)
- [ ] Protected routes redirect to `/signin`
- [ ] Auth routes redirect to `/dashboard` when logged in

### Projects
- [ ] Create new project (from editor)
- [ ] View projects in dashboard
- [ ] Edit project
- [ ] Delete project
- [ ] Set custom URL for shareable link
- [ ] Export project to HTML

### Analytics
- [ ] Page views tracked on share page
- [ ] Button clicks tracked on share page
- [ ] Analytics displayed in dashboard
- [ ] Monthly stats calculated correctly

---

## 🔄 Migration from localStorage

### Option 1: Manual Migration
Users will need to recreate their projects (recommended for clean start)

### Option 2: Data Migration Script
Create a migration script to copy localStorage data to Supabase:

```typescript
// migration-script.ts (to be created if needed)
async function migrateLocalStorageToSupabase() {
  const projects = JSON.parse(localStorage.getItem('projects') || '[]');
  
  for (const project of projects) {
    await createProject({
      name: project.name,
      template: project.template,
      data: project.data,
      customUrl: project.customUrl,
    });
  }
  
  console.log(`Migrated ${projects.length} projects`);
}
```

---

## 📚 API Reference

### Auth Service
```typescript
import { signUp, signIn, signOut, getCurrentUser } from '@/lib/services/auth-service'

// Sign up
await signUp(email, password, fullName)

// Sign in
await signIn(email, password)

// Get current user
const user = await getCurrentUser()

// Sign out
await signOut()
```

### Project Service
```typescript
import { getUserProjects, createProject, updateProject, deleteProject } from '@/lib/services/project-service'

// Get all user projects
const projects = await getUserProjects()

// Create project
await createProject({ name, template, data, customUrl })

// Update project
await updateProject(projectId, { name, data, customUrl })

// Delete project
await deleteProject(projectId)
```

### Analytics Service
```typescript
import { trackPageView, trackButtonClick, getUserAnalyticsSummary } from '@/lib/services/analytics-service'

// Track page view
await trackPageView(projectId, { userAgent, referrer })

// Track button click
await trackButtonClick(projectId, buttonId, { userAgent })

// Get analytics summary
const summary = await getUserAnalyticsSummary()
```

---

## 🐛 Troubleshooting

### "User not authenticated" errors
- Check if Supabase URL and keys are correct
- Verify middleware is running
- Check browser cookies for Supabase session

### RLS Policy errors
- Verify policies are created correctly
- Check if user is authenticated
- Test policies in Supabase SQL Editor

### Projects not loading
- Check browser console for errors
- Verify projects table has data
- Check RLS policies allow user to read their projects

---

## 🎯 Next Actions

1. **Run the database schema** in Supabase SQL Editor
2. **Test authentication** - Sign up and sign in
3. **Continue implementation** - Editor and Share pages
4. **Test end-to-end** - Create, edit, share, and view projects

---

**Status**: ✅ 100% Complete - Ready for Testing!
**Last Updated**: All implementation finished - Database setup required
