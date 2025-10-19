# SaaS Landing Template - Theme Implementation Guide

## ✅ What's Been Done

1. ✅ Created folder structure: `components/templates/normal/saas-landing/`
2. ✅ Moved default template to `saas-landing/default.tsx`
3. ✅ Fixed import paths (../ → ../../)
4. ✅ Added `openInspector` prop
5. ✅ Updated `index.ts` with 3 new themes

## 📋 What Needs to Be Created

You need to create 3 theme files in `components/templates/normal/saas-landing/themes/`:

### **1. modern-gradient.tsx**
### **2. minimal-clean.tsx**
### **3. bold-dynamic.tsx**

---

## 🎨 Theme 1: Modern Gradient

**File:** `components/templates/normal/saas-landing/themes/modern-gradient.tsx`

**Design Concept:**
- Blue to purple gradient backgrounds
- Glassmorphism effects
- Smooth slide and fade animations
- Floating elements
- Modern card designs

**Key Features:**
- Gradient hero section (blue → purple)
- Glassmorphic navigation
- Animated feature cards
- Smooth transitions (0.5s)
- Floating CTA buttons
- Testimonial carousel

**Colors:**
- Primary: `#3b82f6` (Blue)
- Secondary: `#8b5cf6` (Purple)
- Accent: `#06b6d4` (Cyan)
- Background: Gradient from blue to purple

**Element IDs:** Use `saas_grad_*` prefix
- `saas_grad_brand`
- `saas_grad_hero_title`
- `saas_grad_hero_desc`
- `saas_grad_cta_1`
- etc.

**Animations:**
```css
@keyframes slide-in-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

---

## 🎨 Theme 2: Minimal Clean

**File:** `components/templates/normal/saas-landing/themes/minimal-clean.tsx`

**Design Concept:**
- Ultra-clean white background
- Generous whitespace
- Subtle shadows
- Elegant typography
- Minimalist aesthetic

**Key Features:**
- Clean white header
- Centered hero content
- Simple feature grid
- Minimal borders
- Subtle hover effects
- Clean testimonial cards

**Colors:**
- Primary: `#000000` (Black)
- Secondary: `#ffffff` (White)
- Accent: `#3b82f6` (Blue)
- Background: White with gray accents

**Element IDs:** Use `saas_clean_*` prefix
- `saas_clean_brand`
- `saas_clean_hero_title`
- `saas_clean_hero_desc`
- `saas_clean_cta_1`
- etc.

**Animations:**
```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
```

---

## 🎨 Theme 3: Bold Dynamic

**File:** `components/templates/normal/saas-landing/themes/bold-dynamic.tsx`

**Design Concept:**
- Bold orange/pink/purple colors
- Dynamic animations
- Energetic vibe
- Large typography
- Vibrant gradients

**Key Features:**
- Bold gradient header
- Large hero text
- Animated stats section
- Colorful feature cards
- Dynamic hover effects
- Bold CTA buttons

**Colors:**
- Primary: `#f59e0b` (Orange)
- Secondary: `#ec4899` (Pink)
- Accent: `#8b5cf6` (Purple)
- Background: Gradient overlays

**Element IDs:** Use `saas_bold_*` prefix
- `saas_bold_brand`
- `saas_bold_hero_title`
- `saas_bold_hero_desc`
- `saas_bold_cta_1`
- etc.

**Animations:**
```css
@keyframes bounce-in {
  0% { opacity: 0; transform: scale(0.5); }
  50% { transform: scale(1.1); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

---

## 📝 Template Structure for Each Theme

Each theme file should follow this structure:

```typescript
"use client"
import type { TemplateProps } from "../../../types"
import { EditableButton, EditableImage, EditableText } from "../../../shared/editable"

export function SaaS[ThemeName](props: TemplateProps) {
  const { editable, openInspector } = props
  
  return (
    <main className="[theme-specific-classes]">
      {/* Header/Navigation */}
      <header className="[header-classes]">
        <EditableText id="saas_[prefix]_brand" ... />
        <nav>...</nav>
      </header>

      {/* Hero Section */}
      <section className="[hero-classes]">
        <EditableText id="saas_[prefix]_hero_title" ... />
        <EditableText id="saas_[prefix]_hero_desc" ... />
        <EditableButton id="saas_[prefix]_cta_1" ... />
        <EditableImage id="saas_[prefix]_hero_img" ... />
      </section>

      {/* Features Section */}
      <section className="[features-classes]">
        {[1, 2, 3].map(n => (
          <div key={n}>
            <EditableText id={`saas_[prefix]_feature_${n}_title`} ... />
            <EditableText id={`saas_[prefix]_feature_${n}_desc`} ... />
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section className="[testimonials-classes]">
        {[1, 2].map(n => (
          <div key={n}>
            <EditableText id={`saas_[prefix]_test_${n}_quote`} ... />
            <EditableText id={`saas_[prefix]_test_${n}_name`} ... />
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="[cta-classes]">
        <EditableText id="saas_[prefix]_cta_title" ... />
        <EditableButton id="saas_[prefix]_cta_final" ... />
      </section>

      {/* Footer */}
      <footer className="[footer-classes]">
        <EditableText id="saas_[prefix]_footer_copy" ... />
      </footer>

      {/* Animations */}
      <style jsx global>{`
        @keyframes [animation-name] { ... }
        .animate-[name] { animation: ...; }
      `}</style>
    </main>
  )
}
```

---

## 🔧 Additional Updates Needed

### **1. Update `lib/template-themes.ts`**

Add SaaS Landing themes:

```typescript
"saas-landing": {
  templateId: "saas-landing",
  templateName: "SaaS Landing Page",
  hasMultipleThemes: true,  // Change from false to true
  defaultTheme: "default",
  category: "SaaS",
  themes: {
    "default": {
      id: "default",
      name: "Default",
      description: "Modern SaaS landing page design",
      previewImage: "/saas landing page.png",
      colors: { primary: "#3b82f6", secondary: "#1e40af", accent: "#60a5fa" }
    },
    "modern-gradient": {
      id: "modern-gradient",
      name: "Modern Gradient",
      description: "Sleek design with blue/purple gradients",
      previewImage: "/saas-modern-gradient.png",
      colors: { primary: "#3b82f6", secondary: "#8b5cf6", accent: "#06b6d4" }
    },
    "minimal-clean": {
      id: "minimal-clean",
      name: "Minimal Clean",
      description: "Ultra-clean white design",
      previewImage: "/saas-minimal-clean.png",
      colors: { primary: "#000000", secondary: "#ffffff", accent: "#3b82f6" }
    },
    "bold-dynamic": {
      id: "bold-dynamic",
      name: "Bold Dynamic",
      description: "Energetic design with bold colors",
      previewImage: "/saas-bold-dynamic.png",
      colors: { primary: "#f59e0b", secondary: "#ec4899", accent: "#8b5cf6" }
    }
  }
}
```

### **2. Update `app/editor/page.tsx`**

Add SaaS Landing theme support:

```typescript
// Add import
import { SAAS_LANDING_THEMES, type SaaSLandingThemeId } from "@/components/templates/normal/saas-landing"

// Update template rendering (around line 1203)
case "saas-landing": {
  if (selectedThemeId && SAAS_LANDING_THEMES[selectedThemeId as SaaSLandingThemeId]) {
    const ThemeComponent = SAAS_LANDING_THEMES[selectedThemeId as SaaSLandingThemeId].component
    return <ThemeComponent editable={!preview} openInspector={openInspector} />
  }
  return <SaaSTemplate editable={!preview} openInspector={openInspector} />
}
```

### **3. Create Export File**

Create `lib/export-html-saas-landing.ts` with theme support (similar to portfolio export).

### **4. Update Main Export**

In `lib/export-html.ts`:

```typescript
import { generateSaaSLandingHTML } from "./export-html-saas-landing"

case "saas-landing":
  html = generateSaaSLandingHTML(getText, getImage, getButton, theme)
  break
```

---

## 🧪 Testing Checklist

After creating the themes:

- [ ] All 3 theme files created
- [ ] Imports work without errors
- [ ] `lib/template-themes.ts` updated
- [ ] Editor page updated with theme rendering
- [ ] Export file created
- [ ] Main export updated
- [ ] Run `npm run dev`
- [ ] Select SaaS Landing template
- [ ] See "View Themes" button
- [ ] Click and see 4 themes in modal
- [ ] Select each theme and verify it loads
- [ ] Test editable elements
- [ ] Test preview mode
- [ ] Test save & publish

---

## 📚 Reference

Use the portfolio themes as reference:
- `components/templates/normal/portfolio/themes/creative-dark.tsx`
- `components/templates/normal/portfolio/themes/minimal-light.tsx`
- `components/templates/normal/portfolio/themes/vibrant-magazine.tsx`

Follow the same pattern but adapt for SaaS landing page content!

---

## 🎯 Summary

To complete the SaaS Landing theme system:

1. ✅ Folder structure created
2. ✅ Default template moved and fixed
3. ✅ Index.ts configured
4. ⏳ Create 3 theme files (modern-gradient, minimal-clean, bold-dynamic)
5. ⏳ Update lib/template-themes.ts
6. ⏳ Update app/editor/page.tsx
7. ⏳ Create export file
8. ⏳ Test everything

The structure is ready - just need to create the 3 theme component files following the patterns from the portfolio themes!
