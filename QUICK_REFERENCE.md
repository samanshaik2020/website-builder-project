# Quick Reference - Save & Export

## 🚀 Quick Start

### To Save a Project
1. Edit your template
2. Click **"Save & Publish"** (top-right)
3. Done! ✅

### To Export a Project
1. Go to **Dashboard** (`/dashboard`)
2. Find your project
3. Click **"Export HTML"**
4. File downloads automatically 📥

### To Preview Export
1. Go to **Dashboard**
2. Click **"Preview"** button
3. Opens in new tab 🔍

---

## 📁 Files Overview

| File | Purpose |
|------|---------|
| `lib/export-html.ts` | Export utility (generates HTML) |
| `app/page.tsx` | Editor with save functionality |
| `app/dashboard/page.tsx` | Dashboard with export buttons |
| `components/lib/projects-store.ts` | Data storage (localStorage) |

---

## 🔑 Key Functions

### Save
```typescript
// In app/page.tsx
const onSavePublish = async () => {
  // Collects all content
  // Saves to localStorage
  // Shows success message
}
```

### Export
```typescript
// In app/dashboard/page.tsx
const handleExport = (project) => {
  const html = generateHTMLExport(project)
  downloadHTML(html, filename)
}
```

### Preview
```typescript
const handlePreview = (project) => {
  const html = generateHTMLExport(project)
  window.open(blobURL, '_blank')
}
```

---

## 📊 Data Structure

```typescript
ProjectRecord {
  id: string
  name: string
  template: string
  theme?: string        // For Pro templates
  updatedAt: number
  data: {
    texts: {}
    images: {}
    buttons: {}
  }
}
```

---

## ✅ Supported Templates

- Portfolio Website
- SaaS Landing Page
- Project Overview
- Personal Profile
- Event Landing Page
- SaaS Pro (6 themes)

---

## 🎯 User Flow

```
Create → Edit → Save → Dashboard → Export/Preview
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Export fails | Check browser console |
| No projects showing | Save a project first |
| Preview blank | Check localStorage enabled |
| Download blocked | Allow downloads in browser |

---

## 📱 Quick Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 🔗 Important URLs

- Editor: `http://localhost:3000/`
- Dashboard: `http://localhost:3000/dashboard`

---

## 💡 Pro Tips

1. **Save often** - Click "Save & Publish" regularly
2. **Preview first** - Always preview before exporting
3. **Name wisely** - First heading becomes project name
4. **Test exports** - Open HTML files in different browsers
5. **Backup files** - Keep copies of exported HTML

---

**Need Help?** Check `SAVE_EXPORT_GUIDE.md` for detailed documentation.
