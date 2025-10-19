# Editor Page Changes - Detailed Guide

## File: `app/editor/page.tsx`

This document shows exactly what changes to make in the editor page to integrate theme selection.

---

## Change 1: Add New Imports

**Location:** After line 55 (after existing imports)

**Add these imports:**
```typescript
import { ThemeSelectionModal, ThemeHoverPopup } from "@/components/theme-selection-modal"
import { getTemplateThemes, hasMultipleThemes } from "@/lib/template-themes"
```

---

## Change 2: Update Template Imports

**Location:** Lines 23-45 (template imports)

**Change from:**
```typescript
import { PortfolioTemplate } from "@/components/templates/normal/portfolio-template"
import { SaaSTemplate } from "@/components/templates/normal/saas-landing-template"
// ... other imports
```

**Change to:**
```typescript
import { PortfolioTemplate } from "@/components/templates/normal/portfolio"
import { SaaSTemplate } from "@/components/templates/normal/saas-landing"
// ... update all other imports similarly
```

**Note:** Only do this AFTER you've migrated the template folders!

---

## Change 3: Add State Variables

**Location:** Inside `EditorPage` component, after existing state declarations

**Find this section (around line 800-850):**
```typescript
export default function EditorPage() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId | null>(null)
  // ... other state variables
```

**Add these new state variables:**
```typescript
  const [themeModalOpen, setThemeModalOpen] = useState(false)
  const [selectedTemplateForTheme, setSelectedTemplateForTheme] = useState<string | null>(null)
  const [selectedTheme, setSelectedTheme] = useState<string>("default")
```

---

## Change 4: Update TemplateSelectionPanel Props

**Location:** Line 165 (TemplateSelectionPanel function signature)

**Change from:**
```typescript
function TemplateSelectionPanel({ 
  open, 
  onSelect 
}: { 
  open: boolean
  onSelect: (id: TemplateId) => void
}) {
```

**Change to:**
```typescript
function TemplateSelectionPanel({ 
  open, 
  onSelect 
}: { 
  open: boolean
  onSelect: (id: TemplateId, themeId?: string) => void
}) {
```

---

## Change 5: Update Template Card Rendering

**Location:** Lines 520-566 (inside the map function)

**Find this code:**
```typescript
<div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {filtered.map((c) => (
    <div key={c.id} className={cn(
      "flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm",
      (c as any).comingSoon && "opacity-75 relative"
    )}>
      {(c as any).comingSoon && (
        <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          Coming Soon
        </div>
      )}
      <img src={c.imgSrc} alt={c.imgAlt} className="h-48 w-full object-cover" />
      <div className="flex flex-1 flex-col p-4">
        {/* ... rest of card content ... */}
      </div>
    </div>
  ))}
</div>
```

**Change to:**
```typescript
<div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {filtered.map((c) => (
    <div key={c.id} className={cn(
      "group relative flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm",
      (c as any).comingSoon && "opacity-75 relative"
    )}>
      {(c as any).comingSoon && (
        <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          Coming Soon
        </div>
      )}
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
            onSelect(c.id, themeId)
          }}
        />
      )}
      
      <div className="flex flex-1 flex-col p-4">
        {/* ... rest of card content ... */}
      </div>
    </div>
  ))}
</div>
```

**Key changes:**
1. Added `group` class to the card div
2. Added `ThemeHoverPopup` component after the image

---

## Change 6: Add Theme Selection Modal

**Location:** Inside `TemplateSelectionPanel`, before the closing `</div>` (around line 568)

**Add this code before the closing div:**
```typescript
      </div>

      {/* NEW: Theme Selection Modal */}
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
    </div>
  )
}
```

---

## Change 7: Update handleSelectTemplate Function

**Location:** Find where templates are selected (around line 900-1000)

**Find code similar to:**
```typescript
const handleSelectTemplate = (templateId: TemplateId) => {
  setSelectedTemplate(templateId)
  setTemplateSelectionOpen(false)
  // ... initialization logic
}
```

**Change to:**
```typescript
const handleSelectTemplate = (templateId: TemplateId, themeId?: string) => {
  // Get theme configuration
  const themeConfig = getTemplateThemes(templateId)
  const selectedTheme = themeId || themeConfig?.defaultTheme || "default"
  
  // Store selections
  setSelectedTemplate(templateId)
  setSelectedTheme(selectedTheme)
  setTemplateSelectionOpen(false)
  
  // ... rest of initialization logic
}
```

---

## Change 8: Update Template Rendering Logic

**Location:** Where templates are rendered based on selectedTemplate

**Find code like:**
```typescript
{selectedTemplate === "saas-pro" && (
  <SaaSProTemplate isPreview={isPreview} />
)}
```

**For Pro templates, update to use theme:**
```typescript
{selectedTemplate === "saas-pro" && (() => {
  const ThemeComponent = SAAS_PRO_THEMES[selectedTheme as SaaSProThemeId] || SAAS_PRO_THEMES["vibrant-playful"]
  return <ThemeComponent isPreview={isPreview} />
})()}
```

**For normal templates:**
```typescript
{selectedTemplate === "portfolio" && (
  <PortfolioTemplate isPreview={isPreview} />
)}
```

---

## Summary of Changes

1. ✅ Import new components and utilities
2. ✅ Update template imports (after folder migration)
3. ✅ Add state for theme selection
4. ✅ Update TemplateSelectionPanel props
5. ✅ Add ThemeHoverPopup to template cards
6. ✅ Add ThemeSelectionModal component
7. ✅ Update handleSelectTemplate to accept themeId
8. ✅ Update template rendering to use selected theme

---

## Testing Checklist

After making these changes:

- [ ] Code compiles without errors
- [ ] Template selection page loads
- [ ] Hovering over Pro templates shows theme popup
- [ ] Clicking "View All Themes" opens modal
- [ ] Selecting a theme loads the correct template
- [ ] Normal templates still work as before
- [ ] No console errors

---

## Rollback Plan

If something breaks:

1. Keep a backup of the original `app/editor/page.tsx`
2. You can revert by:
   - Removing the new imports
   - Removing the new state variables
   - Removing ThemeHoverPopup and ThemeSelectionModal
   - Reverting template imports to old paths
   - Restoring original onSelect signature

---

## Need Help?

If you encounter issues:

1. Check browser console for errors
2. Verify all imports are correct
3. Ensure template folders are created
4. Check that `lib/template-themes.ts` is properly configured
5. Make sure `components/theme-selection-modal.tsx` exists
