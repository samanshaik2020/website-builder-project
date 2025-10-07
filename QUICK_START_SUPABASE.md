# 🚀 Quick Start: Supabase Setup (5 Minutes)

## Step 1: Replace Signup Page (30 seconds)

```powershell
# Run in PowerShell:
cd "C:\Users\saman\OneDrive\Desktop\Project Files\webstie builder\v0-website-builder-project"
Remove-Item app\auth\signup\page.tsx
Rename-Item app\auth\signup\page-new.tsx page.tsx
```

✅ Done!

## Step 2: Verify Environment Variables (30 seconds)

Your `.env.local` should already have:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

✅ Already configured!

## Step 3: Run Database Schema (2 minutes)

1. Open: https://supabase.com/dashboard
2. Select your project
3. Go to: **SQL Editor** → **New Query**
4. Open file: `lib/supabase/schema.sql`
5. Copy ALL contents (Ctrl+A, Ctrl+C)
6. Paste in Supabase SQL Editor
7. Click **Run** (or F5)
8. Wait for "Success" message

✅ Database ready!

## Step 4: Configure Google OAuth (2 minutes)

### A. Get Google Credentials
1. Go to: https://console.cloud.google.com
2. Select/Create project
3. **APIs & Services** → **Credentials**
4. **Create Credentials** → **OAuth client ID**
5. Type: **Web application**
6. Add redirect URI:
   ```
   https://[your-supabase-project-ref].supabase.co/auth/v1/callback
   ```
   (Get your project ref from Supabase dashboard URL)
7. Copy **Client ID** and **Client Secret**

### B. Add to Supabase
1. Supabase Dashboard → **Authentication** → **Providers**
2. Find **Google** → Toggle ON
3. Paste **Client ID**
4. Paste **Client Secret**
5. Click **Save**

✅ OAuth configured!

## Step 5: Test It! (30 seconds)

```bash
npm run dev
```

1. Visit: http://localhost:3000/auth/signup
2. Click **"Continue with Google"**
3. Sign in with Google
4. Should redirect to dashboard

✅ Working!

## Verify Database

1. Go to Supabase → **Table Editor**
2. Click **users** table
3. You should see your user!

## 🎉 You're Done!

Supabase is now fully integrated with:
- ✅ Google OAuth authentication
- ✅ Cloud database storage
- ✅ User profiles
- ✅ Protected routes

## Next: Update Your Components

Now update your app to use Supabase instead of localStorage:

### Dashboard
```tsx
// app/dashboard/page.tsx
import { useSupabaseProjects } from '@/hooks/use-supabase-projects'
import { useSupabaseSubscription } from '@/hooks/use-supabase-subscription'
import { useAuth } from '@/contexts/auth-context'

const { user } = useAuth()
const { projects, save, remove } = useSupabaseProjects()
const { subscription, updatePlan } = useSupabaseSubscription()
```

### Editor
```tsx
// app/editor/page.tsx
import { useAuth } from '@/contexts/auth-context'
import { useSupabaseProjects } from '@/hooks/use-supabase-projects'

const { user, loading } = useAuth()
const { save } = useSupabaseProjects()

// Add auth guard
if (loading) return <LoadingSpinner />
if (!user) {
  router.push('/auth/signin')
  return null
}
```

## 📚 Full Documentation

- **Setup Guide**: `SUPABASE_SETUP_GUIDE.md`
- **Migration Checklist**: `SUPABASE_MIGRATION_CHECKLIST.md`
- **API Reference**: `lib/supabase/README.md`
- **Complete Summary**: `SUPABASE_COMPLETE.md`

## 🆘 Troubleshooting

**"Invalid API key"**
→ Restart dev server: `npm run dev`

**Google OAuth fails**
→ Check redirect URI matches exactly

**No tables in Supabase**
→ Run schema.sql again

**Build errors**
→ Slate editor errors are pre-existing, not Supabase related
