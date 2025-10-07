# Quick Supabase Setup Script

Follow these steps in order to get Supabase running:

## Step 1: Replace Signup Page

```bash
# Windows PowerShell
Remove-Item app\auth\signup\page.tsx
Rename-Item app\auth\signup\page-new.tsx page.tsx

# Or manually:
# 1. Delete: app/auth/signup/page.tsx
# 2. Rename: app/auth/signup/page-new.tsx → page.tsx
```

## Step 2: Verify Environment Variables

Your `.env.local` should have:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

## Step 3: Run Database Schema

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Navigate to: **SQL Editor** → **New Query**
4. Copy entire contents of: `lib/supabase/schema.sql`
5. Paste and click **Run**
6. Verify in **Table Editor**: You should see `users`, `projects`, `shareable_links`, `template_stats`

## Step 4: Configure Google OAuth

### A. Google Cloud Console
1. Go to: https://console.cloud.google.com
2. Create/select project
3. Enable **Google+ API**
4. Create **OAuth 2.0 Client ID**
5. Add redirect URI: `https://[your-project-ref].supabase.co/auth/v1/callback`
6. Copy **Client ID** and **Client Secret**

### B. Supabase Dashboard
1. Go to: **Authentication** → **Providers**
2. Enable **Google**
3. Paste **Client ID** and **Client Secret**
4. Save

## Step 5: Test Authentication

```bash
npm run dev
```

1. Visit: http://localhost:3000/auth/signup
2. Sign up with email or Google
3. Check Supabase **Table Editor** → `users` table
4. Verify your user was created

## Step 6: Verify Everything Works

- [ ] Sign up with email works
- [ ] Sign in with email works
- [ ] Sign in with Google works
- [ ] User appears in Supabase `users` table
- [ ] Dashboard loads without errors
- [ ] Can create a project
- [ ] Project appears in Supabase `projects` table

## Troubleshooting

**Error: "Invalid API key"**
→ Restart dev server: `npm run dev`

**Error: "relation does not exist"**
→ Run the schema.sql in Supabase

**Google OAuth doesn't work**
→ Check redirect URI matches exactly

**User not created in database**
→ Check if trigger `on_auth_user_created` exists in Supabase

## Next Steps

Once setup is complete:
1. Update dashboard to use `useSupabaseProjects`
2. Update editor to use `useSupabaseProjects`
3. Update share dialog to use Supabase shareable links
4. Remove old localStorage files

See `SUPABASE_MIGRATION_CHECKLIST.md` for detailed migration steps.
