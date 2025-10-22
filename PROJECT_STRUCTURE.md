# Website Builder - Project Structure

## 📁 Complete Architecture

### **Template System**
```
components/templates/
├── portfolio/
│   ├── default.tsx       # Portfolio template component
│   ├── config.ts         # Template metadata & editable fields
│   └── index.ts          # Exports
├── saas-landing/
│   ├── default.tsx       # SaaS landing template component
│   ├── config.ts         # Template metadata & editable fields
│   └── index.ts          # Exports
└── agency/
    ├── default.tsx       # Agency template component
    ├── config.ts         # Template metadata & editable fields
    └── index.ts          # Exports
```

**Key Features:**
- Each template has `data-eid` attributes on editable elements
- `contentEditable={editable}` enables live editing in editor mode
- `data` prop populates saved content
- Config defines all editable fields with IDs, types, and sections

### **Application Pages**

#### **1. Homepage** (`app/page.tsx`)
- Landing page with hero section
- "Create New Website" → `/templates`
- "View Dashboard" → `/dashboard`
- Feature highlights

#### **2. Template Selection** (`app/templates/page.tsx`)
- Grid of available templates
- Template cards with:
  - Preview thumbnail
  - Name, category, description
  - "Select Template" button → `/editor?template={id}`

#### **3. Editor** (`app/editor/page.tsx`)
- **URL**: `/editor?template={templateId}&projectId={id}`
- Live editing interface with:
  - Top toolbar (Back, Project Name input, Save & Publish)
  - Live template preview with `editable={true}`
  - Auto-capture of content changes via `data-eid`
  - Save dialog with confirmation
  - Saves to localStorage as JSON

**Editor Features:**
- Click any text to edit inline
- Button text is editable
- Auto-saves data structure: `{ [eid]: { text: "..." } }` or `{ [eid]: { button: { text: "...", url: "..." } } }`
- Project metadata: name, template, data, timestamps

#### **4. Dashboard** (`app/dashboard/page.tsx`)
- Grid of saved projects
- Each project card shows:
  - Template icon/preview
  - Project name
  - Template type badge
  - Last updated date
- **Action Buttons:**
  - ✏️ **Edit**: Reopens in editor
  - 👁️ **Preview**: Opens read-only preview
  - 🔗 **Share**: Generates shareable link
  - 💾 **Export**: Downloads standalone HTML
  - 🗑️ **Delete**: Removes project

#### **5. Preview** (`app/preview/[projectId]/page.tsx`)
- Read-only view of project
- Top toolbar with "Back to Dashboard" and "Edit Project"
- Renders template with `editable={false}` and saved data

#### **6. Shareable Link** (`app/share/[projectId]/page.tsx`)
- Public URL: `/share/{projectId}`
- Clean presentation without editor UI
- "Powered by Website Builder" badge
- Loads project from localStorage
- Perfect for sharing with clients/public

### **Core Libraries**

#### **Template Registry** (`lib/templates.ts`)
```typescript
export const templates = {
  portfolio: { component: PortfolioTemplate, config: portfolioConfig },
  'saas-landing': { component: SaasLandingTemplate, config: saasLandingConfig },
  agency: { component: AgencyTemplate, config: agencyConfig },
};

export const getAllTemplates = () => [...]; // Returns all template configs
export const getTemplateById = (id) => templates[id]; // Get specific template
```

#### **HTML Export** (`lib/export-html.ts`)
- `exportToHTML({ template, data, projectName })` - Generates complete HTML
- `downloadHTML(html, filename)` - Triggers browser download
- Each template has dedicated export function:
  - `generatePortfolioHTML()`
  - `generateSaasLandingHTML()`
  - `generateAgencyHTML()`
- Exports include:
  - `<!DOCTYPE html>` declaration
  - Tailwind CSS CDN
  - Meta tags (title, description, viewport)
  - Populated content from saved data
  - Standalone, ready-to-host HTML

### **Data Flow**

#### **Creating a New Project:**
1. User clicks "Create New Website" on homepage
2. Selects template from `/templates` page
3. Redirected to `/editor?template={id}`
4. Editor loads template with default content
5. User edits text inline (contentEditable)
6. Clicks "Save & Publish"
7. Data saved to localStorage with structure:
```json
{
  "id": "project_1234567890",
  "name": "My Portfolio",
  "template": "portfolio",
  "data": {
    "hero_name": { "text": "John Doe" },
    "hero_title": { "text": "Developer" },
    "hero_cta": { "button": { "text": "Contact Me", "url": "#" } }
  },
  "createdAt": "2025-01-20T10:00:00.000Z",
  "updatedAt": "2025-01-20T10:30:00.000Z"
}
```
8. Redirected to `/dashboard`

#### **Editing Existing Project:**
1. User clicks "Edit" on project card in dashboard
2. Redirected to `/editor?template={id}&projectId={projectId}`
3. Editor loads saved data and populates template
4. User makes changes
5. Saves updates existing project in localStorage

#### **Sharing Project:**
1. User clicks "Share" on project card
2. Dialog shows link: `{origin}/share/{projectId}`
3. User copies link and shares
4. Recipients visit link → see published website

#### **Exporting Project:**
1. User clicks "Export" on project card
2. System generates complete HTML with:
   - All saved content populated
   - Tailwind CSS included
   - Responsive design
   - No dependencies on builder
3. Browser downloads `{projectName}.html`
4. User can host anywhere (Netlify, Vercel, GitHub Pages, etc.)

### **Storage System**

**LocalStorage Structure:**
```javascript
localStorage.setItem('projects', JSON.stringify([
  {
    id: 'project_123',
    name: 'My Portfolio',
    template: 'portfolio',
    data: { /* all editable content */ },
    createdAt: '2025-01-20T10:00:00.000Z',
    updatedAt: '2025-01-20T10:30:00.000Z'
  },
  // ... more projects
]));
```

**Benefits:**
- No backend required
- Instant saves
- Works offline
- Easy to migrate to database later

### **Adding New Templates**

To add a new template:

1. **Create template folder:**
```
components/templates/your-template/
├── default.tsx
├── config.ts
└── index.ts
```

2. **Define config** (`config.ts`):
```typescript
export const yourTemplateConfig = {
  id: 'your-template',
  name: 'Your Template',
  category: 'Business',
  description: 'Description here',
  thumbnail: '/your-template-preview.png',
  editableFields: [
    { id: 'hero_title', type: 'text', label: 'Title', section: 'Hero' },
    // ... more fields
  ],
};
```

3. **Create component** (`default.tsx`):
```typescript
export default function YourTemplate({ editable = false, data = {} }) {
  const getText = (id: string, defaultValue: string) => {
    return data[id]?.text || defaultValue;
  };

  return (
    <div>
      <h1 data-eid="hero_title" contentEditable={editable}>
        {getText('hero_title', 'Default Title')}
      </h1>
    </div>
  );
}
```

4. **Export** (`index.ts`):
```typescript
export { default as YourTemplate } from './default';
export { yourTemplateConfig } from './config';
```

5. **Register in `lib/templates.ts`:**
```typescript
import { YourTemplate, yourTemplateConfig } from '@/components/templates/your-template';

export const templates = {
  // ... existing templates
  'your-template': {
    component: YourTemplate,
    config: yourTemplateConfig,
  },
};
```

6. **Add export function in `lib/export-html.ts`:**
```typescript
export const generateYourTemplateHTML = (data, projectName) => {
  // Generate HTML string
};

export const exportToHTML = ({ template, data, projectName }) => {
  switch (template) {
    // ... existing cases
    case 'your-template':
      return generateYourTemplateHTML(data, projectName);
  }
};
```

### **Tech Stack**

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React useState/useEffect
- **Storage**: localStorage (easily upgradeable to Supabase/Firebase)
- **Routing**: Next.js file-based routing

### **Key Design Decisions**

1. **No Database Initially**: Using localStorage for rapid prototyping
2. **Modular Templates**: Each template is self-contained
3. **Config-Driven**: Template metadata separate from component
4. **Export-First**: Generate clean, standalone HTML
5. **Live Editing**: Direct contentEditable for simplicity
6. **Type-Safe**: Full TypeScript support

### **Future Enhancements**

- [ ] Add Supabase for cloud storage
- [ ] User authentication
- [ ] Image upload functionality
- [ ] More templates (E-commerce, Blog, Restaurant, etc.)
- [ ] Theme variants per template
- [ ] Custom domain mapping
- [ ] Analytics integration
- [ ] SEO optimization tools
- [ ] Collaboration features

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📝 User Journey

1. **Homepage** → Click "Create New Website"
2. **Templates** → Select a template
3. **Editor** → Edit content inline, click "Save & Publish"
4. **Dashboard** → View all projects
5. **Actions**: Edit, Preview, Share, Export, Delete

---

**Built with ❤️ using Next.js 15 & Tailwind CSS**
