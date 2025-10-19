# Science Landing Template Added

## Overview
A new **Science Landing Page** template has been successfully added to the normal templates collection. This template is designed for educational and informational content, featuring a clean layout with sections for brain science imagery, bullet points, and informative content.

## Template Details

### Template ID
- `science-landing`

### Category
- **SaaS** (Educational/Informational)

### Tags
- Educational
- Science
- Informative

### Features
- Top header banner for announcements
- Hero section with main title and subtitle
- Large featured image section (ideal for infographics or scientific imagery)
- Call-to-action buttons
- Long-form description sections
- Bullet point lists for key information
- Footer with multiple link sections

## Files Modified/Created

### 1. Template Component
**File:** `components/templates/normal/science-landing-template.tsx`
- Created new template component with EditableText, EditableImage, and EditableButton components
- Implements all standard template props (editable, selectedId, onSelect, onChange, openInspector)
- Uses clean, minimal styling with gray color scheme

### 2. Template Export
**File:** `components/templates/normal/index.ts`
- Added export for `ScienceLandingTemplate`

### 3. Editor Integration
**File:** `app/editor/page.tsx`
- Added import for `ScienceLandingTemplate`
- Added `science-landing` to `TemplateId` type union
- Added template card to template selection modal with preview image and description
- Added case in `TemplateView` switch statement to render the template
- Updated `onSavePublish` to include template's hero title for project name suggestion

### 4. HTML Export
**File:** `lib/export-html-science-landing.ts`
- Created dedicated export function following modular export pattern
- Implements `generateScienceLandingHTML()` function
- Includes proper HTML escaping and Tailwind CSS classes
- Supports all editable elements (texts, images, buttons)

**File:** `lib/export-html.ts`
- Added import for `generateScienceLandingHTML`
- Added case for `science-landing` template in export switch statement

## Template Structure

### Editable Elements

#### Text Elements
- `sl-top-heading` - Top banner heading
- `sl-hero-title` - Main hero title
- `sl-hero-subtitle` - Hero subtitle
- `sl-hero-description` - Hero description paragraph
- `sl-description` - Main content description
- `sl-content-heading` - Content section heading
- `sl-content-description` - Content section description
- `sl-bullet-1`, `sl-bullet-2`, `sl-bullet-3` - Bullet point items
- `sl-bottom-heading` - Bottom section heading
- `sl-footer-1`, `sl-footer-2`, `sl-footer-3`, `sl-footer-4` - Footer links

#### Image Elements
- `sl-main-image` - Main featured image (brain science, infographic, etc.)

#### Button Elements
- `sl-cta-1` - Primary call-to-action button
- `sl-cta-2` - Secondary call-to-action button

## Usage

### For Users
1. Navigate to the editor page
2. Click "Choose Your Template"
3. Select "Science Landing Page" from the template grid
4. Customize all text, images, and buttons using the inline editor
5. Save and publish your project

### For Developers
```typescript
import { ScienceLandingTemplate } from "@/components/templates/normal/science-landing-template"

// Use in editor
<ScienceLandingTemplate 
  editable={true}
  selectedId={selectedId}
  onSelect={handleSelect}
  onChange={handleChange}
  openInspector={openInspector}
/>
```

## Design Characteristics
- Clean, professional layout
- Gray color scheme (gray-50, gray-600, gray-700)
- Responsive design with mobile-first approach
- Large featured image section for visual impact
- Structured content sections with clear hierarchy
- Simple footer with multiple link sections

## Pricing Tier
- **Free Template** - Available to all users including free plan

## Export Support
- ✅ HTML export fully supported
- Generates standalone HTML file with embedded Tailwind CSS
- All customizations preserved in export

## Testing Checklist
- [x] Template renders correctly in editor
- [x] All editable elements are functional
- [x] Template appears in template selection modal
- [x] Template can be saved and loaded
- [x] HTML export generates valid output
- [x] Responsive design works on mobile and desktop
- [x] Preview mode works correctly
- [x] Floating text toolbar works with all text elements

## Notes
- Template follows the established pattern of using data-eid attributes for element identification
- Compatible with existing editor features (text toolbar, image upload, button editing)
- Follows modular export pattern for maintainability
- Template preview image uses placeholder - should be replaced with actual screenshot

## Future Enhancements
- Add actual template preview image
- Consider adding more sections (testimonials, FAQ, etc.)
- Add color theme variations
- Consider adding animation effects for better engagement
