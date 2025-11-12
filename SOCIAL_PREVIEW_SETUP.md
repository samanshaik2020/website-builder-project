# Social Media Preview Setup Guide

## Quick Start (3 Steps)

### 1. Generate Default OG Image

Open `public/og-image-generator.html` in your browser:
- The image will automatically download
- It should save as `og-default.png` in your Downloads folder
- The file is already created in `public/og-default.png` (you can replace it with the downloaded one)

### 2. Set Your Base URL

Add to your `.env.local` file:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

For production, change to your actual domain:
```env
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### 3. Test It!

1. Create or edit a project in Squpage
2. Make sure it has:
   - A hero title (will be the preview title)
   - A hero description (will be the preview description)
   - A hero image (will be the preview image)
3. Save and get the share link
4. Test the preview:
   - Facebook: https://developers.facebook.com/tools/debug/
   - Twitter: https://cards-dev.twitter.com/validator
   - General: https://www.opengraph.xyz/

## What You Get

When someone shares your project link on social media, they'll see:

✅ **Title**: Your project's hero title  
✅ **Description**: Your project's hero description  
✅ **Image**: Your project's hero image (or default Squpage branding)  
✅ **URL**: Clean share link  

## Supported Platforms

- Facebook
- Twitter
- LinkedIn
- WhatsApp
- Discord
- Telegram
- Slack
- And more!

## How It Works

The system automatically:
1. Extracts content from your project data
2. Generates Open Graph meta tags
3. Serves them when social media crawlers visit the link
4. Falls back to defaults if content is missing

## No Configuration Needed

The system works automatically for all shared projects. Just make sure:
- Your project has a hero title and description
- You've set `NEXT_PUBLIC_BASE_URL` in production
- The default OG image exists in `public/og-default.png`

## Need Help?

See the full documentation in `markdown/SOCIAL_MEDIA_PREVIEWS.md` for:
- Detailed technical explanation
- Troubleshooting guide
- Platform-specific notes
- Advanced customization options
