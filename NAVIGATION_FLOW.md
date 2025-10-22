# Navigation Flow Documentation

## Complete User Journey

### 1. Landing Page (`/`)
**Purpose:** Marketing homepage to attract new users

**CTA Buttons:**
- **"Get Started Free"** → Redirects to `/signup`
- **"Sign In"** (navbar & hero) → Redirects to `/signin`

**Features:**
- Hero section with animated elements
- Feature showcase
- Stats section
- Pricing/CTA section
- No authentication required

---

### 2. Sign Up Page (`/signup`)
**Purpose:** New user registration

**Features:**
- Split-screen modern design
- Left panel: Feature highlights
- Right panel: Registration form
  - Full Name
  - Email
  - Password
  - Confirm Password
  - Terms & Conditions checkbox
- Google Sign-In option
- Link to Sign In page

**On Success:**
- Stores user in localStorage
- Redirects to `/dashboard`

---

### 3. Sign In Page (`/signin`)
**Purpose:** Existing user authentication

**Features:**
- Split-screen modern design
- Left panel: Feature highlights
- Right panel: Login form
  - Email
  - Password
  - Remember me checkbox
  - Forgot password link
- Google Sign-In option
- Link to Sign Up page

**On Success:**
- Stores user session in localStorage
- Redirects to `/dashboard`

---

### 4. Dashboard (`/dashboard`)
**Purpose:** User's project management hub

**Authentication:** ✅ **REQUIRED** - Redirects to `/signin` if not authenticated

**Features:**
- Analytics overview (Total Websites, Views, Clicks, Conversion)
- Monthly statistics
- Project list with actions:
  - **Edit** → `/editor?template={id}&projectId={id}`
  - **Preview** → `/preview/{projectId}`
  - **Share** → `/share/{projectId}`
  - **Export** → Downloads HTML file
  - **Delete** → Removes project
- Quick actions panel
- User profile menu with Sign Out option

**Navigation:**
- **"New Website"** button → `/templates`
- **"Browse Templates"** button → `/templates`
- **User Menu → Sign Out** → `/signin`

---

### 5. Templates Page (`/templates`)
**Purpose:** Template selection for new projects

**Authentication:** ✅ **REQUIRED** - Redirects to `/signin` if not authenticated

**Features:**
- Category filters (All, Portfolio, Free, Pro)
- Template grid with previews
- Template cards showing:
  - Template name
  - Category badge
  - Description
  - "Use Template" button

**Navigation:**
- **"Back to Dashboard"** → `/dashboard`
- **"Use Template"** → `/editor?template={templateId}`

---

### 6. Editor Page (`/editor`)
**Purpose:** Live website editing interface

**Authentication:** ✅ **REQUIRED** - Redirects to `/signin` if not authenticated

**URL Parameters:**
- `template` - Template ID to use
- `projectId` - (Optional) Existing project ID for editing

**Features:**
- Live inline editing with contentEditable
- AI content generation
- Floating text toolbar
- Image editing sidebar
- Save/Export functionality
- Revert changes option

**Navigation:**
- **"Back to Dashboard"** → `/dashboard`
- **"Save"** → Saves to localStorage, stays on page
- **"Save & Exit"** → Saves and redirects to `/dashboard`

---

### 7. Preview Page (`/preview/{projectId}`)
**Purpose:** Read-only preview of project

**Authentication:** ❌ Not required (public preview)

**Features:**
- Full-screen preview
- No editing capabilities
- "Back to Dashboard" button

---

### 8. Share Page (`/share/{projectId}`)
**Purpose:** Public shareable link for projects

**Authentication:** ❌ Not required (public sharing)

**Features:**
- Renders complete HTML in iframe or dangerouslySetInnerHTML
- Analytics tracking:
  - Page views (auto-tracked on load)
  - Button clicks (tracked via event listeners)
- No editing capabilities
- Fully standalone

---

## Authentication Flow

### Protected Routes
The following routes require authentication:
- `/dashboard`
- `/templates`
- `/editor`

### Public Routes
The following routes are accessible without authentication:
- `/` (Landing page)
- `/signin`
- `/signup`
- `/preview/{projectId}`
- `/share/{projectId}`

### Authentication Check
Each protected route includes a `useEffect` hook that:
1. Calls `getCurrentUser()` from `lib/auth.ts`
2. Checks if user exists and `loggedIn === true`
3. Redirects to `/signin` if not authenticated

### Session Management
- User data stored in `localStorage` with key `'user'`
- Format: `{ fullName?: string, email: string, loggedIn: boolean }`
- Sign out clears localStorage and redirects to `/signin`

---

## Complete User Journey Example

### New User Flow
1. Visit landing page (`/`)
2. Click "Get Started Free"
3. Fill out sign-up form (`/signup`)
4. Redirected to dashboard (`/dashboard`)
5. Click "New Website"
6. Browse templates (`/templates`)
7. Select template
8. Edit in editor (`/editor?template={id}`)
9. Save project
10. Return to dashboard
11. Share, preview, or export project

### Returning User Flow
1. Visit landing page (`/`)
2. Click "Sign In"
3. Enter credentials (`/signin`)
4. Redirected to dashboard (`/dashboard`)
5. Edit existing project or create new one

---

## Data Storage

### Projects
- Stored in `localStorage` with key `'projects'`
- Array of project objects:
```json
{
  "id": "project_123",
  "name": "My Website",
  "template": "portfolio",
  "data": { "hero_title": { "text": "..." } },
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z",
  "views": 0,
  "clicks": 0,
  "lastViewedAt": null,
  "lastClickedAt": null
}
```

### User Session
- Stored in `localStorage` with key `'user'`
- Format: `{ fullName?: string, email: string, loggedIn: boolean }`

---

## Summary

✅ **Landing page** redirects to sign-in/sign-up (not directly to templates)
✅ **Dashboard** requires authentication
✅ **Templates** requires authentication  
✅ **Editor** requires authentication
✅ **Sign-in/Sign-up** redirects to dashboard on success
✅ **Preview/Share** pages are public (no auth required)

The navigation flow now follows a proper authentication pattern where users must sign in before accessing the main application features.
