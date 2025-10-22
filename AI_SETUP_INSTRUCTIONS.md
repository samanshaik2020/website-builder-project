# 🚀 Quick Start: AI Content Generation

## Step 1: Get Your Google Gemini API Key

1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the generated API key

## Step 2: Add API Key to Your Project

1. Create a file named `.env.local` in your project root
2. Add this line (replace with your actual key):

```env
GOOGLE_API_KEY=your_api_key_here
```

## Step 3: Restart Your Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 4: Test It Out!

1. Go to http://localhost:3000
2. Click **"Create New Website"**
3. Select **"SaaS Landing"** template
4. Click the **"AI Generate"** button in the toolbar (purple button with lightning icon)
5. Enter a description like:
   ```
   Modern fitness app that helps users track workouts, nutrition, 
   and progress with AI-powered insights
   ```
6. Click **"Generate Content"**
7. Watch the magic happen! ✨

## Features You'll Get

✅ **Smart Content Generation** - AI creates professional copy for all sections
✅ **One-Click Revert** - Don't like it? Revert instantly
✅ **Real-Time Updates** - See changes immediately
✅ **Template-Aware** - Content matches your template style

## Example Prompts to Try

**For SaaS Landing:**
- "Project management tool for remote teams"
- "AI-powered email marketing platform"
- "Customer support chatbot software"

**For Portfolio:**
- "UX/UI designer specializing in mobile apps"
- "Full-stack developer with React expertise"
- "Graphic designer focused on branding"

**For Agency:**
- "Digital marketing agency for e-commerce"
- "Web design studio for startups"
- "SEO and content marketing agency"

## Troubleshooting

**"API key not configured" error?**
- Make sure you created `.env.local` (not `.env`)
- Restart your dev server after adding the key

**Content not generating?**
- Check browser console for errors
- Verify your API key is valid
- Ensure you have internet connection

## Need Help?

Check the full documentation: `markdown/AI_INTEGRATION.md`

---

**That's it! You're ready to generate amazing content with AI! 🎉**
