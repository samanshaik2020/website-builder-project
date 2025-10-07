# Supabase Integration

This directory contains all Supabase-related code for the website builder.

## 📁 Files Overview

### Configuration
- **`client.ts`** - Client-side Supabase client for use in React components
- **`server.ts`** - Server-side Supabase client for use in Server Components
- **`database.types.ts`** - TypeScript types generated from database schema

### Database
- **`schema.sql`** - Complete database schema with RLS policies (run this in Supabase)

### Services
- **`auth.ts`** - Authentication functions (signup, signin, OAuth, etc.)
- **`projects.ts`** - Project CRUD operations
- **`shareable-links.ts`** - Shareable links management
- **`template-stats.ts`** - Template usage tracking

## 🚀 Quick Start

### 1. Setup Supabase Project
```bash
# Add credentials to .env.local
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### 2. Run Database Schema
Copy `schema.sql` contents and run in Supabase SQL Editor

### 3. Use in Components

#### Authentication
```tsx
import { useAuth } from '@/contexts/auth-context'
import { signInWithGoogle, signOut } from '@/lib/supabase/auth'

function MyComponent() {
  const { user, profile, loading } = useAuth()
  
  if (loading) return <div>Loading...</div>
  if (!user) return <button onClick={signInWithGoogle}>Sign In</button>
  
  return (
    <div>
      <p>Welcome {profile?.fullName}</p>
      <p>Plan: {profile?.plan}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
```

#### Projects
```tsx
import { useSupabaseProjects } from '@/hooks/use-supabase-projects'

function ProjectsList() {
  const { projects, loading, save, remove } = useSupabaseProjects()
  
  const handleSave = async () => {
    await save({
      name: 'My Project',
      template: 'portfolio',
      data: { texts: {}, images: {}, buttons: {} }
    })
  }
  
  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>
          <h3>{project.name}</h3>
          <button onClick={() => remove(project.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
```

#### Shareable Links
```tsx
import { 
  createShareableLink, 
  getShareableLinksByProjectId 
} from '@/lib/supabase/shareable-links'

async function createLink(projectId: string) {
  const link = await createShareableLink(
    projectId,
    'my-custom-slug',
    7, // expires in 7 days
    100 // max 100 views
  )
  
  console.log(`Share at: /share/${link.custom_slug}`)
}
```

#### Subscription
```tsx
import { useSupabaseSubscription } from '@/hooks/use-supabase-subscription'

function PricingPage() {
  const { subscription, updatePlan } = useSupabaseSubscription()
  
  const handleUpgrade = async () => {
    await updatePlan('professional')
  }
  
  return (
    <div>
      <p>Current plan: {subscription.plan}</p>
      <button onClick={handleUpgrade}>Upgrade</button>
    </div>
  )
}
```

## 🔐 Security

### Row Level Security (RLS)
All tables have RLS enabled. Users can only:
- View their own data
- Create data for themselves
- Update their own data
- Delete their own data

Exception: Shareable links have public read access for sharing.

### Authentication
- Email/password authentication
- Google OAuth
- Session management
- Automatic token refresh

## 📊 Database Schema

### users
- Extends Supabase auth.users
- Stores user profile and subscription info
- Auto-created on signup via trigger

### projects
- Stores user projects
- JSONB data field for flexibility
- Tracks template and theme

### shareable_links
- Custom slugs for sharing
- Expiry dates and view limits
- View tracking

### template_stats
- Tracks template usage
- Helps with analytics
- Per-user statistics

## 🛠️ Development

### Adding New Features

1. **Add to schema.sql**:
```sql
CREATE TABLE new_table (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  -- your fields
);

-- Enable RLS
ALTER TABLE new_table ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "Users can view own data" ON new_table
  FOR SELECT USING (auth.uid() = user_id);
```

2. **Update database.types.ts**:
```typescript
export interface Database {
  public: {
    Tables: {
      new_table: {
        Row: { /* ... */ }
        Insert: { /* ... */ }
        Update: { /* ... */ }
      }
    }
  }
}
```

3. **Create service file**:
```typescript
// lib/supabase/new-feature.ts
import { supabase } from './client'

export async function getNewData() {
  const { data, error } = await supabase
    .from('new_table')
    .select('*')
  
  if (error) throw error
  return data
}
```

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Next.js Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
