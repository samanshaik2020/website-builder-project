# Supabase Integration Setup Guide

This guide will help you set up Supabase with Google OAuth authentication for your website builder project.

## 📋 Prerequisites

- Supabase account (sign up at https://supabase.com)
- Google Cloud Console account for OAuth setup

## 🚀 Step 1: Create Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in project details:
   - **Name**: v0-website-builder (or your preferred name)
   - **Database Password**: Create a strong password (save it securely)
   - **Region**: Choose closest to your users
4. Click "Create new project" and wait for setup to complete

## 🔑 Step 2: Get Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

3. Add these to your `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 🗄️ Step 3: Set Up Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the entire contents of `lib/supabase/schema.sql`
4. Click "Run" to execute the SQL
5. Verify tables are created in **Table Editor**

You should see these tables:
- `users`
- `projects`
- `shareable_links`
- `template_stats`

## 🔐 Step 4: Configure Google OAuth

### A. Set up Google Cloud Console

1. Go to https://console.cloud.google.com
2. Create a new project or select existing one
3. Enable **Google+ API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. Create OAuth 2.0 Credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     ```
     https://your-project-ref.supabase.co/auth/v1/callback
     ```
     (Replace `your-project-ref` with your actual Supabase project reference)
   
5. Copy the **Client ID** and **Client Secret**

### B. Configure in Supabase

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Google** and click to expand
3. Enable Google provider
4. Paste your Google **Client ID** and **Client Secret**
5. Click "Save"

## 🔄 Step 5: Update Your Application

### Replace the old signup page:

```bash
# Delete old file and rename new one
rm app/auth/signup/page.tsx
mv app/auth/signup/page-new.tsx app/auth/signup/page.tsx
```

### Wrap your app with AuthProvider:

Update `app/layout.tsx`:

```tsx
import { AuthProvider } from '@/contexts/auth-context'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
```

## 📝 Step 6: Migration Guide

### Update Components to Use Supabase

Replace the old localStorage hooks with new Supabase hooks:

#### Projects:
```tsx
// Old way
import { useProjects } from '@/hooks/use-projects'

// New way
import { useSupabaseProjects } from '@/hooks/use-supabase-projects'
```

#### Subscription:
```tsx
// Old way
import { useSubscription } from '@/hooks/use-subscription'

// New way
import { useSupabaseSubscription } from '@/hooks/use-supabase-subscription'
```

#### Authentication:
```tsx
// Old way
// No auth before

// New way
import { useAuth } from '@/contexts/auth-context'

function MyComponent() {
  const { user, profile, loading } = useAuth()
  
  if (loading) return <div>Loading...</div>
  if (!user) return <div>Please sign in</div>
  
  return <div>Welcome {profile?.fullName}</div>
}
```

## 🧪 Step 7: Test Your Setup

### Test Authentication:

1. **Sign Up with Email**:
   - Go to `/auth/signup`
   - Fill in the form
   - Check your email for verification link
   - Click the link to verify

2. **Sign In with Google**:
   - Go to `/auth/signin`
   - Click "Continue with Google"
   - Authorize the app
   - Should redirect to dashboard

3. **Check Database**:
   - Go to Supabase Table Editor
   - Check `users` table for your new user
   - Verify `plan` is set to 'free'

### Test Projects:

1. Create a new project in the editor
2. Save it
3. Check Supabase `projects` table
4. Verify data is saved correctly

### Test Shareable Links:

1. Create a shareable link for a project
2. Check `shareable_links` table
3. Visit the link at `/share/[slug]`
4. Verify views increment

## 🔒 Security Checklist

- ✅ Row Level Security (RLS) is enabled on all tables
- ✅ Users can only access their own data
- ✅ API keys are in `.env.local` (not committed to git)
- ✅ Google OAuth redirect URI is whitelisted
- ✅ Email verification is enabled (optional but recommended)

## 🐛 Troubleshooting

### "Invalid API key" error:
- Double-check your `.env.local` file
- Restart your dev server: `npm run dev`

### Google OAuth not working:
- Verify redirect URI matches exactly in Google Console
- Check that Google+ API is enabled
- Ensure Client ID and Secret are correct in Supabase

### Database errors:
- Check if schema.sql ran successfully
- Verify RLS policies are created
- Check Supabase logs in dashboard

### Users not being created:
- Check if trigger `on_auth_user_created` exists
- Verify function `handle_new_user()` is created
- Check Supabase logs for errors

## 📊 Features Enabled

With this Supabase integration, you now have:

✅ **Authentication**:
- Email/Password sign up and sign in
- Google OAuth sign in
- Automatic user profile creation
- Session management

✅ **Data Persistence**:
- Projects stored in cloud database
- Shareable links with expiry and view limits
- User subscription/plan management
- Template usage statistics

✅ **Security**:
- Row Level Security (RLS)
- User data isolation
- Secure API access

✅ **Analytics**:
- Track template usage
- Monitor shareable link views
- User activity tracking

## 🎉 Next Steps

1. **Test all features** thoroughly
2. **Set up email templates** in Supabase (optional)
3. **Configure custom domain** for auth (optional)
4. **Set up Stripe** for payment processing (future)
5. **Add more OAuth providers** (GitHub, etc.)

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Google OAuth Setup](https://support.google.com/cloud/answer/6158849)
