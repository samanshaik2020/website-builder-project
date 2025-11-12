# Fix: Open Graph Image Not Showing

## Problem

Your Open Graph meta tags are showing:
```html
<meta property="og:image" content="http://localhost:3000/og-default.png">
```

Social media platforms **cannot access localhost URLs**. They need a publicly accessible URL like:
```html
<meta property="og:image" content="https://www.squpage.com/og-default.png">
```

## Quick Fix (3 Steps)

### Step 1: Update Environment Variable

Edit your `.env.local` file and change:

**FROM:**
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**TO:**
```env
NEXT_PUBLIC_BASE_URL=https://www.squpage.com
```

### Step 2: Restart Your Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 3: Deploy to Production

If you haven't deployed yet, you need to:

1. **Deploy your app** to Vercel, Netlify, or your hosting provider
2. **Ensure the OG image is uploaded** to your production server
3. **Set the environment variable** in your hosting platform's dashboard

## For Vercel Deployment

### 1. Deploy to Vercel

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy
vercel
```

### 2. Set Environment Variable in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - **Name**: `NEXT_PUBLIC_BASE_URL`
   - **Value**: `https://your-project.vercel.app` (or your custom domain)
   - **Environment**: Production, Preview, Development

### 3. Redeploy

```bash
vercel --prod
```

## Generate and Upload OG Image

### Option 1: Use the Generator

1. Open `public/og-image-generator.html` in your browser
2. It will auto-download `og-default.png`
3. Ensure this file is in your `public/` folder
4. Commit and push to deploy

### Option 2: Create Custom OG Image

Create a 1200x630px image with:
- Your branding/logo
- Tagline or description
- Professional design

Save as `public/og-default.png`

## Verify the Fix

### 1. Check Your Deployed Site

Visit your share link:
```
https://www.squpage.com/share/jryjjsrj
```

View page source (Right-click → View Page Source) and verify:
```html
<meta property="og:image" content="https://www.squpage.com/og-default.png">
```

### 2. Test with Facebook Debugger

1. Go to: https://developers.facebook.com/tools/debug/
2. Enter your share URL: `https://www.squpage.com/share/jryjjsrj`
3. Click **Debug**
4. You should see your image preview!
5. If it shows old cached data, click **Scrape Again**

### 3. Test with Twitter Card Validator

1. Go to: https://cards-dev.twitter.com/validator
2. Enter your share URL
3. Click **Preview card**
4. Image should appear!

## Common Issues

### Issue 1: Image Still Not Showing

**Cause**: Social media cached the old meta tags

**Solution**:
1. Use Facebook Debugger and click **Scrape Again**
2. Wait 5-10 minutes for cache to clear
3. Try sharing again

### Issue 2: Image Shows Broken Icon

**Cause**: Image file doesn't exist or isn't accessible

**Solution**:
1. Verify `public/og-default.png` exists
2. Check file size (should be under 8MB)
3. Ensure it's deployed to production
4. Test direct URL: `https://www.squpage.com/og-default.png`

### Issue 3: Wrong Domain in Meta Tags

**Cause**: Environment variable not set correctly

**Solution**:
1. Check `.env.local` has correct URL
2. Restart dev server
3. For production, set in hosting dashboard
4. Redeploy

## For Projects WITH Hero Images

If your project has a hero image, it should use that instead of the default. The system automatically extracts images from these fields:

- `hero_image`
- `hero_app_preview`
- `product_image`
- `featured_image`
- `main_image`
- `cover_image`

Make sure your hero images are:
- ✅ Publicly accessible URLs (not localhost)
- ✅ At least 1200x630px
- ✅ Under 8MB
- ✅ JPG or PNG format

## Testing Checklist

Before sharing on social media:

- [ ] `NEXT_PUBLIC_BASE_URL` set to production domain
- [ ] App deployed to production
- [ ] `og-default.png` exists in `public/` folder
- [ ] Image accessible at `https://yourdomain.com/og-default.png`
- [ ] Meta tags show production URL (not localhost)
- [ ] Tested with Facebook Debugger
- [ ] Tested with Twitter Card Validator
- [ ] Image preview appears correctly

## Expected Result

After fixing, your meta tags should look like:

```html
<!-- Facebook Meta Tags -->
<meta property="og:image" content="https://www.squpage.com/og-default.png">

<!-- Twitter Meta Tags -->
<meta name="twitter:image" content="https://www.squpage.com/og-default.png">
```

And social media platforms will display your image preview! 🎉

## Need Help?

If you're still having issues:

1. Verify the image URL is accessible in your browser
2. Check browser console for errors
3. Ensure environment variable is set in production
4. Clear social media cache using their debugging tools
5. Wait a few minutes and try again

The key is: **Social media needs publicly accessible URLs, not localhost!**
