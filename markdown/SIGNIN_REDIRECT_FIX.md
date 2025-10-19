# Sign-In Redirect Fix

## Problem
After signing in (both email/password and Google OAuth), users were not being redirected to the dashboard.

## Root Causes

1. **Router.push() not waiting for session**: Using Next.js `router.push()` didn't wait for the Supabase session to be fully established
2. **OAuth redirect URL mismatch**: When using custom domain (squpage.com), OAuth callbacks need to match the configured redirect URLs in Supabase
3. **Missing domain configuration**: The app was using `window.location.origin` which would be localhost in development

## Solutions Implemented

### 1. Updated Sign-In Pages
**Files Modified:**
- `app/auth/signin/page.tsx`
- `app/auth/signup/page.tsx`

**Changes:**
- Replaced `router.push("/dashboard")` with `window.location.href = "/dashboard"`
- This ensures a full page reload, allowing the session to be properly established before navigation
- Removed `setLoading(false)` from finally block since page will reload

### 2. Updated OAuth Callback
**File Modified:** `app/auth/callback/route.ts`

**Changes:**
- Added support for `NEXT_PUBLIC_APP_URL` environment variable
- Uses custom domain for redirects when configured
- Falls back to `requestUrl.origin` if environment variable not set

```typescript
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || requestUrl.origin
return NextResponse.redirect(new URL(next, baseUrl))
```

### 3. Updated OAuth Configuration
**File Modified:** `lib/supabase/auth.ts`

**Changes:**
- Google OAuth now uses `NEXT_PUBLIC_APP_URL` for redirect URL
- Ensures OAuth callbacks work with custom domain

```typescript
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin
redirectTo: `${baseUrl}/auth/callback`
```

## Configuration Required

### 1. Environment Variables
Add to your `.env.local`:
```bash
NEXT_PUBLIC_APP_URL=https://squpage.com
```

For local development:
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Supabase Configuration
**Critical:** Configure redirect URLs in Supabase dashboard

1. Go to your Supabase project
2. Navigate to **Authentication > URL Configuration**
3. Add these URLs:

**Redirect URLs:**
- `https://squpage.com/auth/callback`
- `http://localhost:3000/auth/callback` (for development)

**Site URL:**
- `https://squpage.com` (production)
- `http://localhost:3000` (development)

## Testing Steps

### Email/Password Sign-In
1. Go to `/auth/signin`
2. Enter credentials
3. Click "Sign In"
4. Should redirect to `/dashboard` after successful authentication

### Google OAuth Sign-In
1. Go to `/auth/signin`
2. Click "Continue with Google"
3. Complete Google authentication
4. Should redirect back to `/dashboard`

### Sign-Up
1. Go to `/auth/signup`
2. Fill in registration form
3. Click "Sign Up"
4. Should redirect to `/dashboard` after account creation

## Troubleshooting

### Still not redirecting?

1. **Check environment variables:**
   ```bash
   # Verify in your .env.local
   NEXT_PUBLIC_APP_URL=https://squpage.com
   ```

2. **Restart development server:**
   ```bash
   npm run dev
   ```

3. **Clear browser data:**
   - Clear cookies for your domain
   - Clear localStorage
   - Try in incognito/private mode

4. **Verify Supabase configuration:**
   - Check that redirect URLs are correctly set
   - Ensure Site URL matches your domain
   - Verify OAuth provider is enabled

5. **Check browser console:**
   - Look for authentication errors
   - Check network tab for failed requests
   - Verify session is being set in cookies

### Common Errors

**"Invalid redirect URL"**
- Add your domain to Supabase redirect URLs list

**"Session not found"**
- Clear cookies and try again
- Ensure environment variables are set correctly

**OAuth popup closes without redirect**
- Check Supabase OAuth provider configuration
- Verify redirect URL matches exactly

## Files Changed Summary

1. ✅ `app/auth/signin/page.tsx` - Use window.location.href for redirect
2. ✅ `app/auth/signup/page.tsx` - Use window.location.href for redirect
3. ✅ `app/auth/callback/route.ts` - Support custom domain in redirects
4. ✅ `lib/supabase/auth.ts` - Use custom domain for OAuth redirects
5. ✅ `env.example` - Added NEXT_PUBLIC_APP_URL configuration
6. ✅ `components/share-link-dialog.tsx` - Use custom domain for shareable links
