# iPhone Pro Template Export & Preview Fix

## Issue Summary
The iPhone Pro template was not exporting or previewing correctly because:
1. Missing export function in `export-html.ts`
2. Theme parameter not being saved for iPhone Pro templates

## Changes Made

### 1. Added iPhone Pro Export Function (`lib/export-html.ts`)

**Added new case in switch statement (line 46-48):**
```typescript
case "iphone-pro":
  html = generateIPhoneProHTML(getText, getImage, getButton, theme)
  break
```

**Added new export function `generateIPhoneProHTML` (lines 890-1057):**
- Detects dark/light themes based on theme ID
- Generates complete HTML structure matching the iPhone Pro template
- Includes all sections: Navigation, Hero, Product Showcase, Features, Camera, Tech Specs, Colors, CTA, Footer
- Supports theme-specific styling (dark gradients for neon/cyberpunk themes, light for elegant themes)
- Uses all `iphone_pro_*` element IDs for content mapping

### 2. Updated Save Functionality (`app/page.tsx`)

**Modified project save logic (line 672):**
```typescript
// Before:
theme: template === "saas-pro" ? selectedThemeId || undefined : undefined,

// After:
theme: (template === "saas-pro" || template === "portfolio-pro" || template === "iphone-pro") 
  ? selectedThemeId || undefined 
  : undefined,
```

This ensures the selected theme is saved for iPhone Pro templates, enabling proper export with the correct theme styling.

## How It Works

### Export Process
1. User saves an iPhone Pro project with a selected theme (e.g., "neon-cyberpunk", "dark-gradient")
2. Theme ID is stored in the project record
3. When exporting, `generateIPhoneProHTML` receives the theme parameter
4. Function detects if theme is dark/light based on theme name
5. Generates HTML with appropriate styling classes and gradients

### Theme Detection Logic
```typescript
const isDark = theme?.includes('dark') || theme?.includes('neon') || theme?.includes('cyberpunk')
```

Dark themes include:
- `dark-gradient`
- `neon-cyberpunk`
- Any theme with "dark", "neon", or "cyberpunk" in the name

Light themes include:
- `light-elegant`
- `minimalist-tech`
- `vibrant-gradient`
- `luxury-gold`

### Preview Functionality
- Dashboard uses the same `generateHTMLExport` function
- Creates a blob URL from the generated HTML
- Opens in new tab for instant preview
- Automatically cleans up blob URL after 10 seconds

## Testing

### To Test Export:
1. Select iPhone Pro template from template picker
2. Choose a theme in AI generation modal (e.g., "Neon Cyberpunk")
3. Generate content or manually edit
4. Click "Save & Publish"
5. Go to Dashboard
6. Click "Export HTML" on the iPhone Pro project
7. Verify downloaded HTML file opens correctly with theme styling

### To Test Preview:
1. Follow steps 1-5 above
2. Click "Preview" button on the iPhone Pro project
3. Verify new tab opens with correct theme styling
4. Check all sections render properly

## Element IDs Used

The export function maps these element IDs:
- `iphone_pro_brand` - Brand name in header
- `iphone_pro_nav_{0-3}` - Navigation items
- `iphone_pro_nav_preorder` - Pre-order button
- `iphone_pro_hero_badge` - Hero badge text
- `iphone_pro_hero_title` - Main hero title
- `iphone_pro_hero_subtitle` - Hero subtitle
- `iphone_pro_hero_cta_primary/secondary` - Hero CTA buttons
- `iphone_pro_hero_price/trade` - Pricing info
- `iphone_pro_showcase_image` - Main product image
- `iphone_pro_features_*` - Feature section content
- `iphone_pro_camera_*` - Camera section content
- `iphone_pro_spec_{0-3}_*` - Tech specs
- `iphone_pro_color_{0-3}` - Color options
- `iphone_pro_cta_*` - Final CTA section
- `iphone_pro_footer_*` - Footer content

## Files Modified

1. **`lib/export-html.ts`**
   - Added `generateIPhoneProHTML` function
   - Added case for "iphone-pro" in switch statement

2. **`app/page.tsx`**
   - Updated theme save logic to include iPhone Pro

## Status
✅ **FIXED** - iPhone Pro template now fully supports export and preview with all themes.
