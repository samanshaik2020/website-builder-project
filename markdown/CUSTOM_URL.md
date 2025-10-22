# Custom URL Feature Documentation

## Overview

The Custom URL feature allows users to create memorable, branded URLs for their shared projects instead of using auto-generated project IDs.

## Features

### 1. Custom URL Management
- **Add Custom URL**: Users can set a custom URL slug for any project
- **Edit Custom URL**: Modify existing custom URLs at any time
- **Remove Custom URL**: Clear custom URL to revert to default project ID
- **Validation**: Ensures URLs are unique and follow proper format

### 2. URL Format Rules
- **Allowed Characters**: Letters (a-z, A-Z), numbers (0-9), hyphens (-), and underscores (_)
- **No Spaces**: Spaces are not allowed
- **Uniqueness**: Each custom URL must be unique across all projects
- **Case Sensitive**: URLs are case-sensitive

### 3. Visual Indicators
- **Dashboard Display**: Custom URLs are highlighted in purple with bold font
- **Default URLs**: Project IDs are shown in gray with truncation (first 8 chars + "...")

## User Interface

### Share Dialog

When clicking the "Share" button on any project, users see an enhanced dialog with:

1. **Custom URL Section** (top)
   - Shows current custom URL or project ID
   - "Add Custom URL" or "Edit" button
   - Edit mode with inline input field
   - Real-time validation feedback
   - Save/Cancel buttons

2. **Shareable Link Section** (bottom)
   - Full shareable link with custom URL or project ID
   - Copy button for quick clipboard access
   - Read-only text field

### Dashboard Project Cards

Each project card displays:
- **Purple text** if custom URL is set (e.g., `squpage.com/share/my-portfolio`)
- **Gray text** if using default ID (e.g., `squpage.com/share/abc12345...`)
- Quick copy button to share the link

## Technical Implementation

### Data Structure

```typescript
interface Project {
  id: string;
  name: string;
  template: string;
  data: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  views?: number;
  clicks?: number;
  lastViewedAt?: string;
  lastClickedAt?: string;
  customUrl?: string; // New field
}
```

### URL Resolution

The share page (`/share/[projectId]`) now handles both:
1. **Custom URLs**: `/share/my-awesome-website`
2. **Project IDs**: `/share/project_abc123def456`

Resolution order:
1. First, search for a project with matching `customUrl`
2. If not found, search for a project with matching `id`

### Validation Logic

```typescript
const validateCustomUrl = (url: string): boolean => {
  const urlRegex = /^[a-zA-Z0-9-_]+$/;
  return urlRegex.test(url);
};
```

Validation checks:
- ✅ Format validation (alphanumeric, hyphens, underscores only)
- ✅ Uniqueness check (no duplicate custom URLs)
- ✅ Empty string allowed (removes custom URL)

### Analytics Tracking

Analytics continue to work seamlessly with custom URLs:
- Page views tracked using actual project ID
- Button clicks tracked using actual project ID
- Custom URL is only used for routing, not tracking

## Usage Examples

### Example 1: Portfolio Website
- **Project Name**: "John Doe Portfolio"
- **Custom URL**: `john-doe-portfolio`
- **Share Link**: `https://yoursite.com/share/john-doe-portfolio`

### Example 2: Product Landing Page
- **Project Name**: "iPhone 15 Launch"
- **Custom URL**: `iphone-15-launch`
- **Share Link**: `https://yoursite.com/share/iphone-15-launch`

### Example 3: Agency Website
- **Project Name**: "Creative Agency"
- **Custom URL**: `creative_agency_2025`
- **Share Link**: `https://yoursite.com/share/creative_agency_2025`

## Error Handling

### Duplicate URL Error
**Message**: "This URL is already taken by another project"
**Solution**: Choose a different custom URL

### Invalid Format Error
**Message**: "Only letters, numbers, hyphens, and underscores are allowed"
**Solution**: Remove special characters, spaces, or invalid symbols

### Project Not Found
If a custom URL is deleted but someone has the old link:
- The share page shows "Project Not Found" error
- User is prompted to return to homepage

## Benefits

1. **Branding**: Create memorable, branded URLs for clients
2. **SEO**: Better URL structure for search engines
3. **Professionalism**: Clean URLs look more professional
4. **Easy Sharing**: Easier to communicate and remember
5. **Flexibility**: Change URLs without changing project ID

## Best Practices

### Recommended URL Formats
- ✅ `my-portfolio`
- ✅ `john-doe-2025`
- ✅ `creative_agency`
- ✅ `product-launch-page`

### Avoid
- ❌ `my portfolio` (spaces)
- ❌ `my@portfolio` (special characters)
- ❌ `my.portfolio` (dots)
- ❌ `my portfolio!` (exclamation marks)

### Tips
1. Keep URLs short and memorable
2. Use hyphens for readability (e.g., `my-awesome-site`)
3. Include relevant keywords for SEO
4. Avoid using dates unless necessary
5. Test the URL before sharing widely

## Future Enhancements

Potential improvements for future versions:
- [ ] Custom domain support (e.g., `mysite.com` instead of `yoursite.com/share/mysite`)
- [ ] URL history tracking
- [ ] Bulk URL management
- [ ] URL analytics (track which URLs get the most traffic)
- [ ] URL expiration dates
- [ ] Password-protected custom URLs
- [ ] QR code generation for custom URLs

## API Reference

### Functions

#### `handleSaveCustomUrl()`
Saves or updates the custom URL for a project.
- Validates format
- Checks uniqueness
- Updates localStorage
- Updates shareable link

#### `validateCustomUrl(url: string): boolean`
Validates custom URL format.
- Returns `true` if valid
- Returns `false` if invalid

#### `findProject(urlSlug: string): Project | undefined`
Finds a project by custom URL or project ID.
- First checks `customUrl` field
- Falls back to `id` field
- Returns project object or undefined

## Storage

Custom URLs are stored in localStorage:

```json
{
  "id": "project_123",
  "name": "My Website",
  "template": "portfolio",
  "customUrl": "my-awesome-portfolio",
  "data": { ... },
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

## Backward Compatibility

The feature is fully backward compatible:
- Existing projects without custom URLs continue to work
- Old share links with project IDs remain functional
- No migration required
- Custom URL is optional

---

**Last Updated**: October 2025
**Version**: 1.0.0
