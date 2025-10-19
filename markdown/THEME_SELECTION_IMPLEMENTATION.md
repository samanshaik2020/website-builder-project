# Theme Selection Implementation Guide

## Overview
This document explains the implementation of the theme selection feature that allows users to choose from multiple theme variations when selecting a template.

## Architecture

### 1. Folder Structure

#### **Before (Old Structure)**
```
components/templates/normal/
├── portfolio-template.tsx
├── saas-landing-template.tsx
├── personal-profile-template.tsx
└── ... (all templates as flat files)
```

#### **After (New Structure)**
```
components/templates/normal/
├── portfolio/
│   ├── index.ts              # Exports and theme config
│   ├── default.tsx            # Default theme component
│   └── themes/                # Future theme variants
│       ├── modern.tsx
│       ├── minimal.tsx
│       └── creative.tsx
├── saas-landing/
│   ├── index.ts
│   ├── default.tsx
│   └── themes/
├── personal-profile/
│   ├── index.ts
│   ├── default.tsx
│   └── themes/
└── ... (other templates)
```

### 2. New Files Created

#### **`lib/template-themes.ts`**
Central configuration file that defines:
- Theme metadata for all templates
- Color schemes for each theme
- Preview images
- Pro/Free status
- Helper functions to query theme data

**Key Interfaces:**
```typescript
interface ThemeMetadata {
  id: string
  name: string
  description: string
  previewImage: string
  colors: { primary, secondary, accent }
  isPro?: boolean
}

interface TemplateThemeConfig {
  templateId: string
  templateName: string
  hasMultipleThemes: boolean
  defaultTheme: string
  themes: Record<string, ThemeMetadata>
  category: string
}
```

#### **`components/theme-selection-modal.tsx`**
Contains two main components:

1. **`ThemeSelectionModal`**: Full-screen modal showing all available themes in a grid
   - Displays theme preview images
   - Shows color palette
   - Pro badges for premium themes
   - Select button for each theme

2. **`ThemeHoverPopup`**: Overlay that appears on template card hover
   - Shows quick preview of first 3 themes
   - "View All Themes" button
   - Quick select for visible themes

### 3. Integration Points

#### **In `app/editor/page.tsx`**

You need to make the following changes:

1. **Import the new components and utilities:**
```typescript
import { ThemeSelectionModal, ThemeHoverPopup } from "@/components/theme-selection-modal"
import { getTemplateThemes, hasMultipleThemes } from "@/lib/template-themes"
```

2. **Add state for theme selection:**
```typescript
const [themeModalOpen, setThemeModalOpen] = useState(false)
const [selectedTemplateForTheme, setSelectedTemplateForTheme] = useState<string | null>(null)
```

3. **Update the template card rendering** (around line 520-566):

Replace the existing card div with:
```typescript
<div 
  key={c.id} 
  className={cn(
    "group relative flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm",
    (c as any).comingSoon && "opacity-75 relative"
  )}
>
  {/* Existing card content */}
  <img src={c.imgSrc} alt={c.imgAlt} className="h-48 w-full object-cover" />
  
  {/* NEW: Theme hover popup for templates with multiple themes */}
  {hasMultipleThemes(c.id) && (
    <ThemeHoverPopup
      templateConfig={getTemplateThemes(c.id)!}
      onViewAll={() => {
        setSelectedTemplateForTheme(c.id)
        setThemeModalOpen(true)
      }}
      onSelectTheme={(themeId) => {
        onSelect(c.id, themeId) // Modified to accept themeId
      }}
    />
  )}
  
  {/* Rest of card content */}
  <div className="flex flex-1 flex-col p-4">
    {/* ... existing content ... */}
  </div>
</div>
```

4. **Add the Theme Selection Modal** (before the closing div of TemplateSelectionPanel):
```typescript
{/* Theme Selection Modal */}
<ThemeSelectionModal
  open={themeModalOpen}
  onClose={() => {
    setThemeModalOpen(false)
    setSelectedTemplateForTheme(null)
  }}
  templateConfig={
    selectedTemplateForTheme 
      ? getTemplateThemes(selectedTemplateForTheme) 
      : null
  }
  onSelectTheme={(templateId, themeId) => {
    setThemeModalOpen(false)
    onSelect(templateId, themeId)
  }}
/>
```

5. **Update the `onSelect` function signature**:
```typescript
// Change from:
onSelect: (id: TemplateId) => void

// To:
onSelect: (id: TemplateId, themeId?: string) => void
```

6. **Update template initialization logic** to use the selected theme:
```typescript
const handleSelectTemplate = (templateId: TemplateId, themeId?: string) => {
  // Get theme config
  const themeConfig = getTemplateThemes(templateId)
  const selectedTheme = themeId || themeConfig?.defaultTheme || "default"
  
  // Store theme selection
  setSelectedTemplate(templateId)
  setSelectedTheme(selectedTheme)
  
  // Initialize template with theme
  // ... rest of initialization logic
}
```

## How to Add New Themes to Existing Templates

### For Normal Templates (Free)

1. **Create the theme component:**
```typescript
// components/templates/normal/portfolio/themes/modern.tsx
export function PortfolioModernTheme({ isPreview }: { isPreview?: boolean }) {
  return (
    <div className="portfolio-modern">
      {/* Your themed template JSX */}
    </div>
  )
}
```

2. **Update the index.ts:**
```typescript
// components/templates/normal/portfolio/index.ts
import { PortfolioTemplate } from "./default"
import { PortfolioModernTheme } from "./themes/modern"

export const PORTFOLIO_THEMES = {
  "default": {
    id: "default",
    name: "Default",
    component: PortfolioTemplate,
    // ... metadata
  },
  "modern": {
    id: "modern",
    name: "Modern",
    component: PortfolioModernTheme,
    // ... metadata
  }
}
```

3. **Update `lib/template-themes.ts`:**
```typescript
"portfolio": {
  templateId: "portfolio",
  templateName: "Portfolio Website",
  hasMultipleThemes: true, // Change to true
  defaultTheme: "default",
  category: "Portfolio",
  themes: {
    "default": { /* ... */ },
    "modern": {
      id: "modern",
      name: "Modern Portfolio",
      description: "Sleek modern design",
      previewImage: "/portfolio-modern.png",
      colors: { primary: "#000", secondary: "#fff", accent: "#3b82f6" }
    }
  }
}
```

### For Pro Templates

Pro templates already follow this structure. Just add new theme files in their respective folders:

```
components/templates/pro/saas-pro/
├── index.ts
├── saas-pro-template.tsx (default)
├── vibrant-playful.tsx
├── modern-minimal.tsx
└── new-theme.tsx  // Add your new theme here
```

Then update the `index.ts` and `lib/template-themes.ts` accordingly.

## Migration Steps

### Step 1: Move Existing Template Files

For each template in `components/templates/normal/`:

1. Create a folder with the template name (e.g., `portfolio/`)
2. Move the template file into the folder and rename to `default.tsx`
3. Create an `index.ts` file with theme configuration
4. Update imports in `app/editor/page.tsx`

**Example:**
```bash
# Before
components/templates/normal/portfolio-template.tsx

# After
components/templates/normal/portfolio/default.tsx
components/templates/normal/portfolio/index.ts
```

### Step 2: Update Imports

In `app/editor/page.tsx`, change:
```typescript
// Before
import { PortfolioTemplate } from "@/components/templates/normal/portfolio-template"

// After
import { PortfolioTemplate } from "@/components/templates/normal/portfolio"
```

### Step 3: Add Theme Metadata

For each template, add its configuration to `lib/template-themes.ts`.

### Step 4: Test

1. Start the dev server
2. Navigate to the editor
3. Hover over templates with multiple themes
4. Click "View All Themes"
5. Select different themes
6. Verify the correct theme loads

## UI/UX Flow

1. **Template Selection Page**
   - User sees all templates in a grid
   - Templates with multiple themes show a hover overlay
   - Hover shows quick preview of 3 themes + "View All" button

2. **Theme Selection Modal**
   - Opens when user clicks "View All Themes"
   - Shows all available themes in a grid (3 columns)
   - Each theme card shows:
     - Preview image
     - Theme name and description
     - Color palette (3 circles)
     - Pro badge (if applicable)
     - "Select Theme" button

3. **Direct Selection**
   - User can click on quick preview themes to select immediately
   - Or click "Start Editing" for default theme

## Benefits

1. **Scalability**: Easy to add new themes to any template
2. **Organization**: Clean folder structure for each template
3. **Flexibility**: Users can choose themes that match their brand
4. **Consistency**: All themes follow the same pattern
5. **Discoverability**: Hover popup makes themes visible without cluttering UI

## Future Enhancements

1. **Theme Customization**: Allow users to customize colors within a theme
2. **Theme Preview**: Live preview before selecting
3. **Theme Switching**: Switch themes after template is loaded
4. **Custom Themes**: Let users create and save custom themes
5. **Theme Marketplace**: Share and download community themes

## Notes

- All Pro templates already have multiple themes implemented
- Normal templates currently have single themes but are structured for expansion
- Preview images should be added to `/public/` folder
- Theme colors should follow Tailwind CSS color palette for consistency
