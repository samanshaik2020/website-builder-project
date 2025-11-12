# Testing Social Media Previews - Step by Step

## Issue Fixed

The share page was converted to a **server component** with async params handling for Next.js 15 compatibility. The template should now render correctly with proper Open Graph meta tags.

## Quick Test Steps

### 1. Create/Edit a Project

1. Go to http://localhost:3000
2. Click "Get Started" or "Sign In"
3. Create a new project or edit an existing one
4. Make sure your project has:
   - ✅ A hero title (e.g., "My Awesome Website")
   - ✅ A hero description (e.g., "This is the best website ever")
   - ✅ A hero image (upload one or use the default)

### 2. Get the Share Link

1. Go to Dashboard
2. Find your project
3. Click the "Share" button
4. Copy the share link (e.g., `http://localhost:3000/share/your-project-id`)

### 3. Test the Link Directly

1. Open the share link in your browser
2. You should see:
   - ✅ Your template rendering correctly
   - ✅ All your edited content showing
   - ✅ "Built with Squpage" badge in bottom-right

### 4. Check the Meta Tags

**Method 1: View Page Source**
1. Right-click on the share page
2. Select "View Page Source"
3. Look for these meta tags in the `<head>`:

```html
<meta property="og:title" content="Your Project Title">
<meta property="og:description" content="Your project description...">
<meta property="og:image" content="https://...">
<meta property="og:url" content="http://localhost:3000/share/...">
<meta name="twitter:card" content="summary_large_image">
```

**Method 2: Browser DevTools**
1. Press F12 to open DevTools
2. Go to "Elements" tab
3. Expand the `<head>` section
4. Look for `<meta property="og:...">` tags

### 5. Test with Social Media Debuggers

**Facebook Debugger** (Best for testing)
1. Go to: https://developers.facebook.com/tools/debug/
2. Paste your share link
3. Click "Debug"
4. You should see:
   - Title: Your project's hero title
   - Description: Your project's hero description
   - Image: Your hero image (or default Squpage image)

**Important for localhost testing:**
- Facebook debugger **cannot access localhost URLs**
- You need to deploy to a public URL first OR
- Use a tunneling service like ngrok (see below)

**Twitter Card Validator**
1. Go to: https://cards-dev.twitter.com/validator
2. Paste your share link
3. Same limitation: needs public URL

**Open Graph Preview Tool**
1. Go to: https://www.opengraph.xyz/
2. Paste your share link
3. Same limitation: needs public URL

## Testing Localhost with ngrok

To test social media previews with localhost:

### 1. Install ngrok
```bash
# Download from https://ngrok.com/download
# Or use chocolatey on Windows:
choco install ngrok
```

### 2. Start ngrok tunnel
```bash
ngrok http 3000
```

### 3. Use the ngrok URL
- ngrok will give you a public URL like: `https://abc123.ngrok.io`
- Your share link becomes: `https://abc123.ngrok.io/share/your-project-id`
- Now you can test with Facebook Debugger!

### 4. Update .env.local
```env
NEXT_PUBLIC_BASE_URL=https://abc123.ngrok.io
```

### 5. Restart your dev server
```bash
npm run dev
```

Now test with the ngrok URL in Facebook Debugger!

## Common Issues & Solutions

### Issue 1: Template Not Rendering

**Symptoms:**
- Share page shows "Project Not Found" or "Template Not Found"
- Blank page

**Solutions:**
1. Check browser console for errors (F12 → Console tab)
2. Verify the project exists in your database/localStorage
3. Check that the template ID is valid
4. Look at the server logs in your terminal

### Issue 2: Meta Tags Not Showing

**Symptoms:**
- View source shows no `<meta property="og:...">` tags
- Social media shows generic preview

**Solutions:**
1. Make sure you're viewing the **share page** (`/share/...`), not the editor
2. Clear your browser cache (Ctrl+Shift+Delete)
3. Check that `generateMetadata` function is running (add console.log)
4. Verify `NEXT_PUBLIC_BASE_URL` is set in .env.local

### Issue 3: Wrong Content in Preview

**Symptoms:**
- Old title/description showing
- Wrong image

**Solutions:**
1. Edit your project and save again
2. Refresh the share page
3. Clear Facebook's cache using "Scrape Again" button
4. Check that you're using the correct field names (hero_title, hero_description, etc.)

### Issue 4: Image Not Loading

**Symptoms:**
- Preview shows broken image icon
- Default image not showing

**Solutions:**
1. Generate the default OG image:
   - Open `public/og-image-generator.html` in browser
   - Download the generated image
   - Save as `public/og-default.png`
2. Check that hero image URL is valid and accessible
3. Verify image is not too large (>8MB)
4. Use absolute URLs for images (https://...)

## Debugging Checklist

Run through this checklist if things aren't working:

- [ ] Dev server is running (`npm run dev`)
- [ ] No errors in terminal
- [ ] No errors in browser console (F12)
- [ ] Project exists and has data
- [ ] Share link opens and shows template
- [ ] `NEXT_PUBLIC_BASE_URL` is set in .env.local
- [ ] Meta tags visible in page source
- [ ] Default OG image exists at `public/og-default.png`
- [ ] Using public URL (not localhost) for social media testing

## Expected Results

When everything is working correctly:

✅ **Share page loads:**
- Template renders with your content
- No errors in console
- "Built with Squpage" badge visible

✅ **Meta tags present:**
- `og:title` = your hero title
- `og:description` = your hero description
- `og:image` = your hero image or default
- `og:url` = share link
- `twitter:card` = summary_large_image

✅ **Social media preview:**
- Facebook shows rich preview card
- Twitter shows large image card
- LinkedIn shows preview with image
- WhatsApp shows preview (when using public URL)

## Next Steps

Once you've verified everything works:

1. **Deploy to production** (Vercel, Netlify, etc.)
2. **Update .env.local** with production URL
3. **Test with real social media** platforms
4. **Share your projects!** 🎉

## Need Help?

If you're still having issues:

1. Check the full documentation: `markdown/SOCIAL_MEDIA_PREVIEWS.md`
2. Look at the browser console for errors
3. Check the terminal for server errors
4. Verify all files are saved and server is restarted
5. Try creating a fresh project to test

The system should work automatically - no complex configuration needed!
