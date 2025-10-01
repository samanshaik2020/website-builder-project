# Save & Export Functionality Guide

## Overview
The website builder now includes comprehensive save and export functionality for all templates. You can save your work to the dashboard and export it as standalone HTML files.

## Features Implemented

### 1. **Save Functionality** ✅
- **Location**: Editor page (`/`)
- **Button**: "Save & Publish" in the top-right header
- **What it does**:
  - Saves all text content from editable elements
  - Saves all image sources
  - Saves all button links and text
  - Stores template type and theme (for Pro templates)
  - Automatically generates project name from main heading
  - Saves to browser's localStorage

### 2. **Dashboard Display** ✅
- **Location**: Dashboard page (`/dashboard`)
- **Features**:
  - Lists all saved projects
  - Shows project name, template type, theme (if applicable), and last updated date
  - Displays project preview placeholder

### 3. **Export to HTML** ✅
- **Location**: Dashboard page (`/dashboard`)
- **Button**: "Export HTML" button on each project card
- **What it does**:
  - Generates a standalone HTML file with all your content
  - Includes Tailwind CSS via CDN
  - Includes all custom styles
  - Downloads automatically to your computer
  - Shows success notification
- **File naming**: `project-name-timestamp.html`

### 4. **Preview Exported Site** ✅
- **Location**: Dashboard page (`/dashboard`)
- **Button**: "Preview" button on each project card
- **What it does**:
  - Opens the exported HTML in a new browser tab
  - Allows you to see exactly how the exported site will look
  - No download required for quick preview

## How to Use

### Saving a Project

1. **Select a Template**
   - Go to the home page (`/`)
   - Choose any template (Portfolio, SaaS Landing, Personal Profile, Event, SaaS Pro, etc.)

2. **Edit Your Content**
   - Click on any text to edit it
   - Click on images to change them
   - Click on buttons to edit text and links
   - Use the floating toolbar for text formatting

3. **Save Your Work**
   - Click "Save & Publish" button in the top-right corner
   - Wait for the "Saved & Published!" confirmation
   - Your project is now saved to the dashboard

### Exporting a Project

1. **Go to Dashboard**
   - Navigate to `/dashboard`
   - Or click "Back to Dashboard" from the template selector

2. **Find Your Project**
   - All saved projects are displayed in the "My Projects" section

3. **Export Options**:
   
   **Option A: Preview First**
   - Click the "Preview" button
   - A new tab opens with your exported site
   - Review the content and layout
   
   **Option B: Direct Export**
   - Click the "Export HTML" button
   - The HTML file downloads automatically
   - Success notification appears in bottom-right corner

4. **Use the Exported File**
   - Open the downloaded `.html` file in any browser
   - Upload to any web hosting service
   - Share with clients or team members
   - The file is completely standalone and self-contained

## Supported Templates

All templates support save and export:

### Free Templates
- ✅ Portfolio Website
- ✅ SaaS Landing Page
- ✅ Project Overview
- ✅ Personal Profile
- ✅ Event Landing Page

### Pro Templates
- ✅ SaaS Pro (all 6 themes)
  - Modern Minimal
  - Corporate Blue
  - Elegant Dark
  - Creative Bold
  - Nature Calm
  - Vibrant Playful
- ⏳ Agency Pro (coming soon)
- ⏳ Ecommerce Pro (coming soon)

## Technical Details

### What Gets Saved
```typescript
{
  id: string              // Unique project ID
  name: string            // Project name (auto-generated from main heading)
  template: string        // Template type (e.g., "portfolio", "saas-pro")
  theme?: string          // Theme ID for Pro templates (e.g., "modern-minimal")
  updatedAt: number       // Timestamp of last update
  data: {
    texts: Record<string, string>                    // All text content
    images: Record<string, string>                   // All image sources
    buttons: Record<string, { href, text }>          // All button data
  }
}
```

### Export Format
- **File Type**: HTML5
- **CSS Framework**: Tailwind CSS (via CDN)
- **Browser Support**: All modern browsers
- **Mobile Responsive**: Yes
- **Dependencies**: None (fully standalone)

### Storage
- **Method**: Browser localStorage
- **Key**: `sitebuilder.projects`
- **Capacity**: ~5-10MB (browser dependent)
- **Persistence**: Permanent until cleared

## Troubleshooting

### "Failed to export project"
- **Cause**: Browser blocked the download or JavaScript error
- **Solution**: Check browser console for errors, ensure pop-ups are allowed

### "No projects yet"
- **Cause**: No projects have been saved
- **Solution**: Create and save a project first from the template editor

### Project not showing after save
- **Cause**: localStorage might be full or disabled
- **Solution**: Clear some old projects or check browser settings

### Exported HTML looks different
- **Cause**: Some dynamic features may not work in static HTML
- **Solution**: The export is a static snapshot of your design

## Best Practices

1. **Save Frequently**: Click "Save & Publish" regularly while editing
2. **Preview Before Export**: Always preview to ensure everything looks correct
3. **Organize Projects**: Use descriptive names for your projects
4. **Backup Exports**: Keep copies of exported HTML files
5. **Test Exported Files**: Open exported HTML in different browsers to verify

## Future Enhancements

Planned features:
- [ ] Edit existing projects from dashboard
- [ ] Duplicate projects
- [ ] Export with custom domain setup
- [ ] Batch export multiple projects
- [ ] Export as ZIP with assets folder
- [ ] Cloud sync for projects

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Ensure you're using a modern browser (Chrome, Firefox, Safari, Edge)
3. Clear browser cache and try again
4. Check that localStorage is enabled in browser settings

---

**Last Updated**: January 2025
**Version**: 1.0.0
