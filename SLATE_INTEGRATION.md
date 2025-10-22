# Slate.js Integration Guide

## 🎨 Overview

The website builder now uses **Slate.js** for rich text editing with a floating toolbar and a dedicated **Image Sidebar** for image management.

## 📦 Components

### 1. **SlateEditableText** (`components/editor/slate-editable-text.tsx`)

Rich text editor component with formatting capabilities.

**Features:**
- Bold, Italic, Underline formatting
- Text alignment (Left, Center, Right)
- Keyboard shortcuts (Ctrl+B, Ctrl+I, Ctrl+U)
- Floating toolbar on text selection
- Real-time content updates

**Usage:**
```tsx
<SlateEditableText
  eid="hero_title"
  defaultText={getText('hero_title', 'Default Text')}
  className="text-4xl font-bold"
  editable={true}
  onChange={(eid, value) => handleTextChange(eid, value)}
/>
```

**Props:**
- `eid`: Unique element ID for data tracking
- `defaultText`: Initial text content
- `className`: Tailwind CSS classes
- `editable`: Enable/disable editing mode
- `onChange`: Callback when content changes

### 2. **FloatingToolbar** (`components/editor/floating-toolbar.tsx`)

Contextual toolbar that appears when text is selected.

**Features:**
- Appears above selected text
- Bold, Italic, Underline buttons
- Text alignment controls
- Dark theme with purple accents
- Keyboard shortcut hints

**Toolbar Actions:**
- **Bold** (Ctrl+B): Makes text bold
- **Italic** (Ctrl+I): Makes text italic
- **Underline** (Ctrl+U): Underlines text
- **Align Left**: Left-aligns text
- **Align Center**: Centers text
- **Align Right**: Right-aligns text

### 3. **EditableImage** (`components/editor/editable-image.tsx`)

Image component with click-to-edit functionality.

**Features:**
- Click to open image sidebar
- Hover overlay with edit icon
- Placeholder support
- Error handling for broken images
- Custom placeholder icons

**Usage:**
```tsx
<EditableImage
  eid="project_1_image"
  defaultSrc={getImage('project_1_image', '')}
  alt="Project 1"
  className="h-48 w-full"
  editable={true}
  onChange={(eid, imageUrl) => handleImageChange(eid, imageUrl)}
  placeholderIcon={<span className="text-4xl">🎨</span>}
/>
```

**Props:**
- `eid`: Unique element ID
- `defaultSrc`: Initial image URL
- `alt`: Alt text for accessibility
- `className`: Tailwind CSS classes
- `editable`: Enable/disable editing
- `onChange`: Callback when image changes
- `placeholderIcon`: Custom placeholder (optional)

### 4. **ImageSidebar** (`components/editor/image-sidebar.tsx`)

Sidebar panel for image upload and URL input.

**Features:**
- Two tabs: URL and Upload
- Drag-and-drop file upload
- Image preview
- Base64 encoding for uploads
- Current image display
- Remove image option

**Tabs:**

#### **URL Tab**
- Input field for image URLs
- "Apply Image" button
- Supports any public image URL

#### **Upload Tab**
- Click to upload interface
- Accepts: PNG, JPG, GIF, WebP
- Max size: 10MB (client-side)
- Converts to base64 for storage
- Instant preview

**Tips Section:**
- High-quality image recommendations
- Recommended size: 1200x800px
- Supported formats
- Storage method info

## 🔧 Implementation in Templates

### Step 1: Import Components

```tsx
import { SlateEditableText } from '@/components/editor/slate-editable-text';
import { EditableImage } from '@/components/editor/editable-image';
```

### Step 2: Add Props Interface

```tsx
interface TemplateProps {
  editable?: boolean;
  data?: Record<string, any>;
  onContentChange?: (eid: string, value: any) => void;
}
```

### Step 3: Create Change Handlers

```tsx
const handleTextChange = (eid: string, value: string) => {
  if (onContentChange) {
    onContentChange(eid, { text: value });
  }
};

const handleImageChange = (eid: string, imageUrl: string) => {
  if (onContentChange) {
    onContentChange(eid, { image: imageUrl });
  }
};
```

### Step 4: Replace Elements

**Before (contentEditable):**
```tsx
<h1
  data-eid="hero_title"
  contentEditable={editable}
  suppressContentEditableWarning
  className="text-4xl font-bold"
>
  {getText('hero_title', 'Default Title')}
</h1>
```

**After (Slate):**
```tsx
<SlateEditableText
  eid="hero_title"
  defaultText={getText('hero_title', 'Default Title')}
  className="text-4xl font-bold"
  editable={editable}
  onChange={handleTextChange}
/>
```

**Before (Image):**
```tsx
<img
  data-eid="project_image"
  src={getImage('project_image', '')}
  alt="Project"
  className="w-full h-48"
/>
```

**After (EditableImage):**
```tsx
<EditableImage
  eid="project_image"
  defaultSrc={getImage('project_image', '')}
  alt="Project"
  className="w-full h-48"
  editable={editable}
  onChange={handleImageChange}
/>
```

## 📊 Data Structure

### Text Data
```json
{
  "hero_title": {
    "text": "Welcome to My Site"
  }
}
```

### Image Data
```json
{
  "project_1_image": {
    "image": "https://example.com/image.jpg"
  }
}
```

Or with base64:
```json
{
  "project_1_image": {
    "image": "data:image/png;base64,iVBORw0KG..."
  }
}
```

### Button Data (Legacy contentEditable)
```json
{
  "hero_cta": {
    "button": {
      "text": "Get Started",
      "url": "#"
    }
  }
}
```

## 🎯 Editor Integration

The editor page (`app/editor/page.tsx`) handles content changes:

```tsx
const handleContentChange = (eid: string, value: any) => {
  setProjectData(prev => ({
    ...prev,
    [eid]: value
  }));
};

// Pass to template
<TemplateComponent 
  editable={true} 
  data={projectData} 
  onContentChange={handleContentChange} 
/>
```

## 🎨 Styling

### Floating Toolbar
- Background: `bg-slate-900`
- Border: `border-slate-700`
- Active state: `bg-purple-600`
- Hover: `hover:bg-slate-800`

### Image Sidebar
- Width: `w-96` (384px)
- Background: `bg-slate-900`
- Tabs: Purple gradient for active
- Upload area: Dashed border with hover effect

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+B` / `Cmd+B` | Toggle Bold |
| `Ctrl+I` / `Cmd+I` | Toggle Italic |
| `Ctrl+U` / `Cmd+U` | Toggle Underline |

## 🔄 Migration Guide

### Converting Existing Templates

1. **Import new components** at the top
2. **Add `onContentChange` prop** to interface
3. **Create change handlers** for text and images
4. **Replace all text elements** with `SlateEditableText`
5. **Replace all images** with `EditableImage`
6. **Keep buttons** as contentEditable (for now)

### Example Migration

**Portfolio Template** (`components/templates/portfolio/default.tsx`):
- ✅ Hero section: 3 text elements → SlateEditableText
- ✅ About section: 2 text elements → SlateEditableText
- ✅ Projects: 3 images → EditableImage
- ✅ Projects: 6 text elements → SlateEditableText
- ⏳ Buttons: Keep as contentEditable

## 🐛 Troubleshooting

### Toolbar Not Appearing
- Ensure text is selected (not just clicked)
- Check that `editable={true}` is set
- Verify `FloatingToolbar` is rendered inside `Slate` context

### Images Not Saving
- Check `onChange` callback is connected
- Verify `handleImageChange` updates state
- Ensure `projectData` includes image data on save

### TypeScript Errors
- Custom Slate types defined in `types/slate.d.ts`
- Extends `BaseEditor`, `ReactEditor`, `HistoryEditor`
- Adds `bold`, `italic`, `underline`, `align` properties

### Formatting Not Persisting
- Slate stores plain text only (by design)
- Formatting is visual, not saved to data
- Use CSS classes for persistent styling

## 🚀 Future Enhancements

- [ ] Link insertion/editing
- [ ] Heading level selection (H1-H6)
- [ ] Text color picker
- [ ] Font size controls
- [ ] Image crop/resize tools
- [ ] Unsplash integration
- [ ] Image filters/effects
- [ ] Undo/Redo buttons in toolbar
- [ ] Markdown support
- [ ] Copy/paste formatting

## 📝 Notes

- **Slate.js** handles rich text editing
- **Images** stored as URLs or base64
- **Buttons** still use legacy contentEditable
- **Toolbar** auto-positions above selection
- **Sidebar** opens on image click
- **Data** flows through `onContentChange` callback

---

**Built with Slate.js v0.118+ and React 19**
