# Squpage Project Memory

## 🏗️ Architecture & Tech Stack
- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript & React 19
- **Styling**: Tailwind CSS with Shadcn UI (Radix primitives)
- **Backend & Auth**: Supabase (using `@supabase/ssr` and `@supabase/supabase-js`)
- **AI Integration**: Google Generative AI (Gemini) for AI-powered content generation
- **Rich Text Editor**: Tiptap (with extensions like Bubble Menu, Highlight, Link, etc.)
- **Animations**: Framer Motion & Tailwind Animate

## 📁 Key Directories
- `app/`: Next.js App Router setup with routes for `dashboard`, `editor`, `preview`, `share`, `templates`, and authentication (`signin`, `signup`).
- `components/`: Contains reusable UI components (`ui/`), builder components (`editor/`), and pre-built templates (`templates/`).
- `lib/` & `hooks/`: Utility functions and custom React hooks.
- `supabase/`: Database configuration and migration scripts (indicated by `supabase db *` package.json scripts).
- `markdown/`: Documentation for specific features (`AI_INTEGRATION.md`, `AUTHENTICATION.md`, `HYDRATION_FIX.md`, etc.).

## 🚀 Core Features
1. **Visual Editor**: Real-time drag and drop website builder with rich text editing capabilities.
2. **AI Content Generation**: Generates copy tailored to a brand using Gemini.
3. **Template System**: 17+ premium templates to start building fast.
4. **Export & Sharing**: Ability to export to standalone HTML and share via custom preview links.

## 📝 Scripts
- `npm run dev`: Starts the Next.js dev server with Turbopack.
- `npm run db:push / pull / reset`: Supabase database commands.
- `npm run lint`: ESLint checking.
- `npm run test`: Jest testing suite.
