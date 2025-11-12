# Complete Guide: Fix Open Graph Image Preview

## Current Status

Your meta tags are being generated correctly with:
- ✅ Title: "Full Stack Developer"
- ✅ Description: Working correctly
- ❌ Image: Showing opengraph.b-cdn.net placeholder instead of your image

## The Issue

The image URL in your meta tags needs to be a **publicly accessible URL** pointing to either:
1. Your project's hero image (if it exists)
2. Your default OG image at `https://www.squpage.com/og-default.png`

## Complete Fix (Step by Step)

### Step 1: Generate the Default OG Image

1. **Open the generator in your browser:**
   - Navigate to: `http://localhost:3000/og-image-generator.html`
   - OR open the file directly: `public/og-image-generator.html`

2. **Download the image:**
   - The image will auto-generate on the canvas
   - Click the "Download Image" button
   - Save as `og-default.png`

3. **Replace the empty file:**
   ```bash
   # The current og-default.png is 0 bytes (empty)
   # Replace it with your downloaded file
   # Location: public/og-default.png
   ```

### Step 2: Set Environment Variable for Production

**Option A: Using Vercel**

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name**: `NEXT_PUBLIC_BASE_URL`
   - **Value**: `https://www.squpage.com`
   - **Environments**: Check all (Production, Preview, Development)
5. Click **Save**

**Option B: Using Netlify**

1. Go to your Netlify dashboard
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Click **Add a variable**
5. Add:
   - **Key**: `NEXT_PUBLIC_BASE_URL`
   - **Value**: `https://www.squpage.com`
6. Click **Save**

**Option C: Other Hosting**

Add to your hosting platform's environment variables:
```env
NEXT_PUBLIC_BASE_URL=https://www.squpage.com
```

### Step 3: Deploy to Production

```bash
# 1. Commit the new og-default.png
git add public/og-default.png
git commit -m "Add Open Graph default image"

# 2. Push to your repository
git push origin main

# 3. Deploy (if not auto-deployed)
# For Vercel:
vercel --prod

# For Netlify:
netlify deploy --prod
```

### Step 4: Verify the Fix

**A. Check the Image File**

Visit directly in browser:
```
https://www.squpage.com/og-default.png
```

You should see the purple-pink gradient image with "S" logo.

**B. Check Meta Tags**

1. Visit your share page: `https://www.squpage.com/share/jryjjsrj`
2. Right-click → **View Page Source**
3. Look for these meta tags in the `<head>`:

```html
<meta property="og:image" content="https://www.squpage.com/og-default.png">
<meta name="twitter:image" content="https://www.squpage.com/og-default.png">
```

**Should NOT see:**
- ❌ `http://localhost:3000/og-default.png`
- ❌ `https://opengraph.b-cdn.net/...`

**C. Test with Social Media Debuggers**

**Facebook Debugger:**
1. Go to: https://developers.facebook.com/tools/debug/
2. Enter: `https://www.squpage.com/share/jryjjsrj`
3. Click **Debug**
4. Click **Scrape Again** (to clear cache)
5. You should see:
   - ✅ Title: "Full Stack Developer"
   - ✅ Description: Your description
   - ✅ Image: Your og-default.png or hero image

**Twitter Card Validator:**
1. Go to: https://cards-dev.twitter.com/validator
2. Enter: `https://www.squpage.com/share/jryjjsrj`
3. Click **Preview card**
4. Image should appear!

## Using Project Hero Images

If you want to use your project's hero image instead of the default:

### 1. Ensure Hero Image is Publicly Accessible

Your hero image URL must be:
- ✅ Full URL starting with `https://`
- ✅ Publicly accessible (not localhost)
- ✅ At least 1200x630px (recommended)
- ✅ Under 8MB

Example good URLs:
```
https://images.unsplash.com/photo-123456789
https://your-cdn.com/images/hero.jpg
https://www.squpage.com/uploads/project-hero.png
```

Example bad URLs:
```
❌ /images/hero.jpg (relative path)
❌ http://localhost:3000/hero.jpg (localhost)
❌ C:\Users\...\hero.jpg (local file path)
```

### 2. Upload Hero Image in Editor

When editing your project:
1. Click on the hero image
2. Upload a new image OR paste a public URL
3. Save the project
4. The meta tags will automatically use this image

## Troubleshooting

### Problem 1: Still Seeing Localhost URL

**Cause:** Environment variable not set in production

**Solution:**
1. Check your hosting dashboard environment variables
2. Ensure `NEXT_PUBLIC_BASE_URL=https://www.squpage.com`
3. Redeploy your application
4. Clear browser cache (Ctrl+Shift+Delete)

### Problem 2: Image Shows Broken Icon

**Cause:** Image file doesn't exist or isn't accessible

**Solution:**
1. Visit `https://www.squpage.com/og-default.png` directly
2. If 404 error, the file isn't deployed
3. Check that `public/og-default.png` exists and is not 0 bytes
4. Commit and push the file
5. Redeploy

### Problem 3: Old Image Cached

**Cause:** Social media platforms cache meta tags

**Solution:**
1. Use Facebook Debugger: https://developers.facebook.com/tools/debug/
2. Click **Scrape Again** button
3. Wait 5-10 minutes
4. Try sharing again

### Problem 4: Wrong Image Showing

**Cause:** Project data has incorrect image URL

**Solution:**
1. Edit your project in Squpage
2. Update the hero image with a valid public URL
3. Save the project
4. Refresh the share page
5. Clear social media cache

## Expected Final Result

After completing all steps, your meta tags should look like:

```html
<!-- HTML Meta Tags -->
<title>Full Stack Developer | Squpage</title>
<meta name="description" content="I build exceptional digital experiences...">

<!-- Facebook Meta Tags -->
<meta property="og:url" content="https://www.squpage.com/share/jryjjsrj">
<meta property="og:type" content="website">
<meta property="og:title" content="Full Stack Developer">
<meta property="og:description" content="I build exceptional digital experiences...">
<meta property="og:image" content="https://www.squpage.com/og-default.png">

<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta property="twitter:domain" content="squpage.com">
<meta property="twitter:url" content="https://www.squpage.com/share/jryjjsrj">
<meta name="twitter:title" content="Full Stack Developer">
<meta name="twitter:description" content="I build exceptional digital experiences...">
<meta name="twitter:image" content="https://www.squpage.com/og-default.png">
```

## Quick Checklist

Before sharing on social media:

- [ ] `og-default.png` generated and not empty (should be ~50KB+)
- [ ] `NEXT_PUBLIC_BASE_URL` set in production environment
- [ ] Application deployed to production
- [ ] Image accessible at `https://www.squpage.com/og-default.png`
- [ ] Meta tags show production URL (not localhost)
- [ ] Tested with Facebook Debugger
- [ ] Tested with Twitter Card Validator
- [ ] Cache cleared on social platforms

## Summary

The key points:
1. ✅ Generate og-default.png (not 0 bytes)
2. ✅ Set `NEXT_PUBLIC_BASE_URL=https://www.squpage.com` in production
3. ✅ Deploy to production
4. ✅ Test with social media debuggers
5. ✅ Clear cache if needed

Once these steps are complete, your social media previews will work perfectly! 🎉
