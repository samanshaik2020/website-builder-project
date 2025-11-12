# Social Media Link Previews

This document explains how social media link previews work for shared Squpage projects.

## Overview

When you share a Squpage project link on social media platforms (Facebook, Twitter, LinkedIn, WhatsApp, etc.), the platform will display a rich preview card with:
- **Title**: Extracted from your project's hero title or project name
- **Description**: Extracted from your project's hero description or subtitle
- **Image**: Extracted from your project's hero image or a default Squpage image

## How It Works

### 1. Dynamic Metadata Generation

The share page (`app/share/[projectId]/page.tsx`) uses Next.js's `generateMetadata` function to create dynamic Open Graph (OG) and Twitter Card meta tags for each project.

### 2. Content Extraction

The system automatically extracts preview content from your project data:

**Title Priority:**
1. `hero_title`
2. `hero_headline`
3. `title`
4. `headline`
5. `nav_brand`
6. `brand_name`
7. Falls back to project name

**Description Priority:**
1. `hero_description`
2. `hero_subtitle`
3. `description`
4. `subtitle`
5. `tagline`
6. `hero_tagline`
7. `about_description`
8. Falls back to generic description

**Image Priority:**
1. `hero_image`
2. `hero_app_preview`
3. `product_image`
4. `featured_image`
5. `main_image`
6. `cover_image`
7. Falls back to `/og-default.png`

### 3. Meta Tags Generated

For each shared project, the following meta tags are generated:

```html
<!-- Open Graph (Facebook, LinkedIn, WhatsApp) -->
<meta property="og:title" content="Your Project Title" />
<meta property="og:description" content="Your project description..." />
<meta property="og:image" content="https://yoursite.com/image.jpg" />
<meta property="og:url" content="https://yoursite.com/share/project-id" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Squpage" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Your Project Title" />
<meta name="twitter:description" content="Your project description..." />
<meta name="twitter:image" content="https://yoursite.com/image.jpg" />
```

## Setup Requirements

### 1. Environment Variable

Add your production URL to `.env.local`:

```env
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

For local testing, it defaults to `http://localhost:3000`.

### 2. Default OG Image

Generate the default Open Graph image:

1. Open `public/og-image-generator.html` in your browser
2. The image will auto-download as `og-default.png`
3. Ensure it's in the `public/` folder (should already be there)

The default image is a 1200x630px image with:
- Purple to pink gradient background
- White "S" logo
- "Squpage" branding
- "Create Beautiful Websites" tagline

## Testing Social Media Previews

### Facebook & LinkedIn

Use the Facebook Sharing Debugger:
1. Go to https://developers.facebook.com/tools/debug/
2. Enter your share URL: `https://yourdomain.com/share/your-project-id`
3. Click "Debug" to see the preview
4. Click "Scrape Again" to refresh the cache

### Twitter

Use the Twitter Card Validator:
1. Go to https://cards-dev.twitter.com/validator
2. Enter your share URL
3. Click "Preview card" to see how it looks

### WhatsApp

WhatsApp doesn't have a testing tool, but you can:
1. Send the link to yourself in a chat
2. The preview should appear automatically

### General Testing

Use the Open Graph Preview tool:
1. Go to https://www.opengraph.xyz/
2. Enter your share URL
3. See how it looks across different platforms

## Best Practices

### 1. Use High-Quality Images

For best results, use hero images that are:
- **Dimensions**: At least 1200x630px (OG standard)
- **Format**: JPG or PNG
- **File size**: Under 8MB
- **Content**: Clear, professional, relevant to your project

### 2. Write Compelling Titles

- Keep titles under 60 characters
- Make them descriptive and engaging
- Include your brand or product name

### 3. Optimize Descriptions

- Keep descriptions under 160 characters
- Clearly explain what your project is about
- Include a call-to-action if relevant

### 4. Test Before Sharing

Always test your share links before posting:
1. Create/edit your project
2. Save and get the share link
3. Test with Facebook Debugger or Twitter Validator
4. Verify the preview looks correct
5. Share on social media

## Troubleshooting

### Preview Not Showing

**Problem**: Social media shows no preview or generic preview

**Solutions**:
1. Ensure `NEXT_PUBLIC_BASE_URL` is set correctly
2. Check that your project has a hero title and description
3. Verify the share URL is publicly accessible
4. Clear the social media cache using their debugging tools

### Wrong Image Showing

**Problem**: Old or incorrect image appears in preview

**Solutions**:
1. Update the hero image in your project
2. Save the project
3. Use Facebook Debugger to "Scrape Again"
4. Wait a few minutes for cache to clear

### Image Not Loading

**Problem**: Preview shows broken image icon

**Solutions**:
1. Ensure the image URL is publicly accessible
2. Check that the image is not too large (>8MB)
3. Verify the image format is supported (JPG, PNG)
4. Use an absolute URL (https://) not relative path

### Description Too Long

**Problem**: Description gets cut off in preview

**Solutions**:
1. Keep descriptions under 160 characters
2. Put the most important info first
3. Edit the hero_description field in your project

## Platform-Specific Notes

### Facebook
- Caches previews aggressively
- Use Sharing Debugger to force refresh
- Supports 1200x630px images (1.91:1 ratio)

### Twitter
- Uses Twitter Card format
- Supports "summary_large_image" card type
- Image should be at least 300x157px

### LinkedIn
- Uses Open Graph tags
- Prefers 1200x627px images
- Caches for about 7 days

### WhatsApp
- Uses Open Graph tags
- Shows image, title, and description
- No official testing tool available

### Discord
- Uses Open Graph tags
- Shows large image embeds
- Supports video previews too

## Custom Share URLs

If you're using custom share URLs (e.g., `/share/my-project` instead of `/share/uuid`), the system automatically detects and handles both formats:

- **UUID format**: `/share/550e8400-e29b-41d4-a716-446655440000`
- **Custom slug**: `/share/my-awesome-project`

Both formats generate proper meta tags with the same content.

## Advanced: Custom OG Images

If you want to generate custom OG images for each project (instead of using hero images), you can:

1. Create an API route at `/api/og/[projectId]/route.tsx`
2. Use `@vercel/og` library to generate dynamic images
3. Update the `getProjectImage()` function to return the API route URL

Example:
```typescript
// In generateMetadata function
const ogImageUrl = `${baseUrl}/api/og/${projectId}`;
```

This allows you to create custom-designed OG images with project-specific branding, colors, and layouts.

## Summary

The social media preview system:
1. ✅ Automatically extracts title, description, and image from your project
2. ✅ Generates proper Open Graph and Twitter Card meta tags
3. ✅ Works with all major social media platforms
4. ✅ Supports both UUID and custom share URLs
5. ✅ Provides fallback default image for projects without hero images
6. ✅ Optimizes for SEO and social sharing

No additional configuration needed - it works automatically for all shared projects!
