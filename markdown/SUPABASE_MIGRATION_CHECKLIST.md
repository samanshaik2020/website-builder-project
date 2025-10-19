# Supabase Migration Checklist

This checklist helps you migrate from localStorage to Supabase across your entire application.

## ✅ Setup Tasks

- [ ] Install Supabase packages (`@supabase/supabase-js`, `@supabase/auth-helpers-nextjs`)
- [ ] Add Supabase credentials to `.env.local`
- [ ] Run database schema SQL in Supabase
- [ ] Configure Google OAuth in Supabase
- [ ] Set up Google Cloud Console OAuth credentials

## 📝 File Updates Required

### 1. Authentication Pages

- [x] ✅ `app/auth/signin/page.tsx` - Updated with Supabase auth
- [ ] ⚠️ `app/auth/signup/page.tsx` - **ACTION REQUIRED**: Replace with `page-new.tsx`
  ```bash
  rm app/auth/signup/page.tsx
  mv app/auth/signup/page-new.tsx app/auth/signup/page.tsx
  ```

### 2. Layout & Providers

- [ ] `app/layout.tsx` - Add AuthProvider wrapper
  ```tsx
  import { AuthProvider } from '@/contexts/auth-context'
  
  export default function RootLayout({ children }) {
    return (
      <html>
        <body>
          <AuthProvider>
            {children}
          </AuthProvider>
        </body>
      </html>
    )
  }
  ```

### 3. Dashboard Page

- [ ] `app/dashboard/page.tsx` - Replace hooks:
  ```tsx
  // Replace this:
  import { useProjects } from '@/hooks/use-projects'
  import { useSubscription } from '@/hooks/use-subscription'
  
  // With this:
  import { useSupabaseProjects } from '@/hooks/use-supabase-projects'
  import { useSupabaseSubscription } from '@/hooks/use-supabase-subscription'
  import { useAuth } from '@/contexts/auth-context'
  ```

### 4. Editor Page

- [ ] `app/editor/page.tsx` - Update imports and logic:
  ```tsx
  // Add auth check
  import { useAuth } from '@/contexts/auth-context'
  
  // Replace projects import
  import { useSupabaseProjects } from '@/hooks/use-supabase-projects'
  
  // In component:
  const { user } = useAuth()
  const { save } = useSupabaseProjects()
  
  // Add auth guard
  if (!user) {
    router.push('/auth/signin')
    return null
  }
  ```

### 5. Share Page

- [ ] `app/share/[slug]/page.tsx` - Update to use Supabase:
  ```tsx
  import { getShareableLinkBySlug } from '@/lib/supabase/shareable-links'
  import { getProjectById } from '@/lib/supabase/projects'
  import { incrementLinkViews } from '@/lib/supabase/shareable-links'
  ```

### 6. Pricing Page

- [ ] `app/pricing/page.tsx` - Update subscription hook:
  ```tsx
  import { useSupabaseSubscription } from '@/hooks/use-supabase-subscription'
  ```

## 🔄 Component Updates

### ShareLinkDialog Component

- [ ] `components/share-link-dialog.tsx` - Update to use Supabase:
  ```tsx
  import { 
    createShareableLink, 
    getShareableLinksByProjectId,
    deleteShareableLink,
    getActiveLinkCount 
  } from '@/lib/supabase/shareable-links'
  import { useAuth } from '@/contexts/auth-context'
  ```

## 🗑️ Files to Remove (After Migration)

Once you've migrated everything to Supabase, you can remove these old localStorage files:

- [ ] `lib/user-subscription-store.ts` (replaced by Supabase)
- [ ] `components/lib/projects-store.ts` (replaced by Supabase)
- [ ] `lib/shareable-links-store.ts` (replaced by Supabase)
- [ ] `hooks/use-projects.ts` (replaced by `use-supabase-projects.ts`)
- [ ] `hooks/use-subscription.ts` (replaced by `use-supabase-subscription.ts`)

## 🔐 Authentication Guards

Add authentication guards to protected routes:

### Dashboard
```tsx
// app/dashboard/page.tsx
const { user, loading } = useAuth()

if (loading) return <LoadingSpinner />
if (!user) {
  router.push('/auth/signin')
  return null
}
```

### Editor
```tsx
// app/editor/page.tsx
const { user, loading } = useAuth()

if (loading) return <LoadingSpinner />
if (!user) {
  router.push('/auth/signin')
  return null
}
```

### Pricing (for plan updates)
```tsx
// app/pricing/page.tsx
const { user } = useAuth()
const { updatePlan } = useSupabaseSubscription()

const handleUpgrade = async (plan) => {
  if (!user) {
    router.push('/auth/signin')
    return
  }
  await updatePlan(plan)
}
```

## 📊 Data Migration (Optional)

If you have existing localStorage data you want to migrate:

### Export localStorage data:
```tsx
// Run this in browser console on old version
const projects = JSON.parse(localStorage.getItem('sitebuilder.projects') || '[]')
const subscription = JSON.parse(localStorage.getItem('sitebuilder.user.subscription') || '{}')
const links = JSON.parse(localStorage.getItem('sitebuilder.shareable-links') || '[]')

console.log('Projects:', projects)
console.log('Subscription:', subscription)
console.log('Links:', links)
```

### Import to Supabase:
```tsx
// Create a migration script or manually import via Supabase dashboard
import { saveProject } from '@/lib/supabase/projects'
import { createShareableLink } from '@/lib/supabase/shareable-links'

// Import projects
for (const project of oldProjects) {
  await saveProject({
    name: project.name,
    template: project.template,
    theme: project.theme,
    data: project.data
  })
}
```

## 🧪 Testing Checklist

### Authentication
- [ ] Sign up with email works
- [ ] Email verification works
- [ ] Sign in with email works
- [ ] Sign in with Google works
- [ ] Sign out works
- [ ] Session persists on refresh

### Projects
- [ ] Create new project saves to Supabase
- [ ] Edit existing project updates in Supabase
- [ ] Delete project removes from Supabase
- [ ] Projects list loads from Supabase
- [ ] Template usage is tracked

### Shareable Links
- [ ] Create shareable link works
- [ ] Custom slug validation works
- [ ] Link expiry works correctly
- [ ] View count increments
- [ ] Max views limit works
- [ ] Delete link works

### Subscription/Plans
- [ ] Free plan limits work
- [ ] Upgrade plan updates in database
- [ ] Plan limits are enforced
- [ ] Plan features are accessible

### Security
- [ ] Users can only see their own projects
- [ ] Users can only edit their own projects
- [ ] Users can only create links for their projects
- [ ] RLS policies are working

## 🚨 Common Issues & Solutions

### Issue: "Invalid API key"
**Solution**: Check `.env.local` has correct keys and restart dev server

### Issue: "User not found in database"
**Solution**: Check if `handle_new_user()` trigger is working in Supabase

### Issue: "Cannot read properties of null"
**Solution**: Add loading states and null checks for auth

### Issue: Projects not saving
**Solution**: Check RLS policies and user authentication

### Issue: Google OAuth redirect fails
**Solution**: Verify redirect URI in Google Console matches Supabase

## 📈 Performance Optimization

After migration, consider:

- [ ] Add database indexes for frequently queried fields
- [ ] Implement pagination for large project lists
- [ ] Add caching for template stats
- [ ] Optimize RLS policies for performance
- [ ] Use Supabase Realtime for live updates (optional)

## 🎯 Migration Priority

### Phase 1: Core Setup (Do First)
1. ✅ Install packages
2. ✅ Set up database schema
3. ✅ Configure OAuth
4. Update auth pages
5. Add AuthProvider

### Phase 2: Main Features
1. Update dashboard
2. Update editor
3. Update share functionality
4. Update pricing

### Phase 3: Cleanup
1. Remove old localStorage files
2. Test all features
3. Update documentation
4. Deploy to production

## ✨ New Features Enabled

After migration, you can add:

- [ ] Real-time collaboration
- [ ] Team workspaces
- [ ] Project sharing with permissions
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Webhook integrations
- [ ] API access for projects

---

**Need Help?** Check `SUPABASE_SETUP_GUIDE.md` for detailed setup instructions.
