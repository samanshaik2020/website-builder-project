# Domain Setup Guide

## Setting Up Your Custom Domain (squpage.com)

The shareable links feature now uses a configurable domain instead of localhost.

### Configuration Steps

1. **Add the domain to your `.env.local` file:**

```bash
NEXT_PUBLIC_APP_URL=https://squpage.com
```

2. **For local development**, you can temporarily use:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. **For production deployment**, ensure your `.env.local` or environment variables on your hosting platform include:

```bash
NEXT_PUBLIC_APP_URL=https://squpage.com
```

### How It Works

- When creating shareable links, the system will use `NEXT_PUBLIC_APP_URL` as the base URL
- If `NEXT_PUBLIC_APP_URL` is not set, it falls back to `window.location.origin` (current domain)
- Shareable links will be formatted as: `https://squpage.com/share/your-custom-slug`

### Files Modified

- `env.example` - Added `NEXT_PUBLIC_APP_URL` configuration
- `components/share-link-dialog.tsx` - Updated to use the environment variable for shareable links
- `lib/supabase/auth.ts` - Updated OAuth redirect URL to use the environment variable

### Testing

1. Set the environment variable in your `.env.local`
2. Restart your development server
3. Create a new shareable link
4. Verify the generated URL uses `squpage.com` instead of `localhost`

### Deployment Checklist

- [ ] Add `NEXT_PUBLIC_APP_URL=https://squpage.com` to your production environment variables
- [ ] Ensure your domain is properly configured and pointing to your hosting
- [ ] **Configure Supabase Redirect URLs** (Important for OAuth):
  - Go to your Supabase project dashboard
  - Navigate to Authentication > URL Configuration
  - Add `https://squpage.com/auth/callback` to the "Redirect URLs" list
  - Add `https://squpage.com` to the "Site URL"
- [ ] Test shareable links in production to verify they work correctly
- [ ] Test Google OAuth sign-in to ensure redirects work properly

### Troubleshooting

**Sign-in not redirecting to dashboard?**
1. Ensure `NEXT_PUBLIC_APP_URL` is set correctly in your environment variables
2. Check that Supabase redirect URLs include your domain
3. Clear browser cache and cookies
4. Restart your development server after changing environment variables
