# AI Content Generation Integration

This document explains how the AI content generation feature works in the website builder.

## Overview

The AI integration allows users to automatically generate professional content for their templates using Google's Gemini AI. Users simply describe what they want, and the AI generates appropriate text for all template sections.

## Architecture

### Components

1. **API Route** (`app/api/generate-template/route.ts`)
   - Handles AI generation requests
   - Calls Google Gemini API
   - Validates and parses AI responses
   - Returns structured JSON data

2. **AiButton Component** (`components/editor/ai-button.tsx`)
   - Beautiful modal interface for AI generation
   - Input field for user prompts
   - Loading states and error handling
   - Success feedback

3. **Editor Integration** (`app/editor/page.tsx`)
   - AI button in toolbar
   - Backup/revert functionality
   - Real-time DOM updates
   - Data persistence

## Setup

### 1. Get Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
GOOGLE_API_KEY=your_api_key_here
```

**Important:** Never commit your `.env.local` file to version control!

### 3. Restart Development Server

After adding the API key, restart your dev server:

```bash
npm run dev
```

## Usage

### For End Users

1. **Open the Editor**
   - Select a template from the templates page
   - Click "Edit" or "Create New"

2. **Click AI Generate Button**
   - Look for the purple "AI Generate" button in the toolbar
   - Click it to open the AI modal

3. **Describe Your Content**
   - Enter a detailed description of what you want
   - Example: "iPhone product page highlighting camera, battery, and premium design"
   - Be specific about your product, service, or content

4. **Generate Content**
   - Click "Generate Content" or press Ctrl+Enter
   - Wait for the AI to generate content (usually 3-5 seconds)
   - Content will be automatically applied to your template

5. **Review and Edit**
   - Review the generated content
   - Make manual edits if needed
   - Click "Revert" if you want to undo the AI generation

6. **Save Your Project**
   - Click "Save & Publish" to save your changes

### Example Prompts

**SaaS Landing Page:**
```
Modern project management tool for remote teams. Focus on collaboration, 
time tracking, and productivity features. Professional tone.
```

**Portfolio:**
```
UX/UI designer specializing in mobile apps and web design. Highlight 
creativity, user-centered design, and 5+ years experience.
```

**Agency:**
```
Digital marketing agency focused on SEO, content marketing, and social 
media management. Results-driven, professional tone.
```

## Features

### ✨ Smart Content Generation
- Context-aware content based on template type
- Professional, engaging copy
- Appropriate tone and style

### 🔄 Backup & Revert
- Automatic backup before AI generation
- One-click revert to previous content
- No data loss

### 🎨 Template-Specific
- Different prompts for different templates
- Optimized for each template's structure
- Maintains template design integrity

### ⚡ Real-Time Updates
- Instant content application
- Live preview
- No page refresh needed

## Technical Details

### Data Flow

1. User enters prompt in AI modal
2. Frontend sends POST request to `/api/generate-template`
3. API constructs template-specific prompt
4. Google Gemini generates content
5. API validates and parses JSON response
6. Frontend receives structured data
7. Content is applied to template
8. DOM is updated in real-time

### API Request Format

```typescript
POST /api/generate-template
Content-Type: application/json

{
  "templateSlug": "saas-landing",
  "seedText": "iPhone product page...",
  "theme": "modern-gradient" // optional
}
```

### API Response Format

```typescript
{
  "data": {
    "hero_title": "iPhone — Capture Tomorrow",
    "hero_subtitle": "Experience the ultimate camera...",
    "hero_cta_primary": "Pre-order Now",
    "feature_1_title": "Pro Camera System",
    "feature_1_description": "Capture stunning photos...",
    // ... more fields
  }
}
```

### Supported Templates

Currently supported templates:
- ✅ SaaS Landing
- ✅ Portfolio
- ✅ Agency

More templates coming soon!

## Customization

### Adding New Templates

To add AI support for a new template:

1. **Update API Route** (`app/api/generate-template/route.ts`)
   ```typescript
   const templateSpecificInstructions: Record<string, string> = {
     'your-template': `
       Create content for your template that:
       - Specific instruction 1
       - Specific instruction 2
     `
   };
   ```

2. **Define Data Structure**
   - Ensure your template uses `data-eid` attributes
   - Match field names in AI response

3. **Test Generation**
   - Test with various prompts
   - Verify content quality
   - Adjust prompt if needed

### Customizing Prompts

Edit the `buildPromptForTemplate` function in `app/api/generate-template/route.ts`:

```typescript
function buildPromptForTemplate(templateSlug: string, seedText: string, theme?: string) {
  // Customize base instructions
  const baseInstructions = `...`;
  
  // Add template-specific instructions
  const templateSpecificInstructions = {
    'your-template': `Your custom instructions...`
  };
  
  return `${baseInstructions}\n\n${specificInstructions}`;
}
```

## Troubleshooting

### "API key not configured" Error

**Solution:** Add your Google API key to `.env.local`:
```env
GOOGLE_API_KEY=your_actual_api_key
```

### "Could not parse JSON" Error

**Cause:** AI returned invalid JSON or included markdown formatting

**Solution:** The API automatically tries to extract JSON from markdown code blocks. If this persists, check the API response in browser console.

### Content Not Applying

**Cause:** Template elements missing `data-eid` attributes

**Solution:** Ensure all editable elements in your template have unique `data-eid` attributes that match the AI response keys.

### Rate Limiting

**Cause:** Too many requests to Google API

**Solution:** 
- Wait a few seconds between requests
- Consider implementing request throttling
- Check your API quota in Google AI Studio

## Best Practices

### For Users

1. **Be Specific:** Provide detailed descriptions for better results
2. **Include Context:** Mention industry, target audience, tone
3. **Review Content:** Always review and edit generated content
4. **Save Backups:** Use the revert feature if needed

### For Developers

1. **Validate Input:** Always validate user prompts
2. **Handle Errors:** Provide clear error messages
3. **Rate Limiting:** Implement request throttling
4. **Cost Control:** Monitor API usage
5. **Security:** Never expose API keys in frontend code

## API Costs

Google Gemini API pricing (as of 2025):
- **Free Tier:** 60 requests per minute
- **Paid Tier:** Pay-as-you-go pricing

Check current pricing: [Google AI Pricing](https://ai.google.dev/pricing)

## Future Enhancements

Planned features:
- [ ] Multiple AI providers (OpenAI, Anthropic)
- [ ] Image generation integration
- [ ] Content variations (generate multiple options)
- [ ] Tone selection (professional, casual, playful)
- [ ] Language selection
- [ ] SEO optimization suggestions
- [ ] A/B testing content variants

## Support

For issues or questions:
1. Check this documentation
2. Review console logs for errors
3. Verify API key configuration
4. Check Google AI Studio status

## License

This AI integration is part of the website builder project and follows the same MIT license.

---

**Last Updated:** January 2025
