# 🖼️ Supabase Storage Setup for Images

## Current Status

✅ **Database is ready** - The `projects.data.images` field stores image URLs
✅ **Storage service created** - `lib/supabase/storage.ts` handles file uploads

## Setup Supabase Storage (2 minutes)

### Step 1: Create Storage Bucket

1. Go to Supabase Dashboard → **Storage**
2. Click **"New bucket"**
3. Bucket name: `project-images`
4. **Public bucket**: ✅ Enable (so images are publicly accessible)
5. Click **"Create bucket"**

### Step 2: Set Storage Policies

1. Click on `project-images` bucket
2. Go to **"Policies"** tab
3. Click **"New policy"**

#### Policy 1: Allow authenticated users to upload
```sql
CREATE POLICY "Users can upload own images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'project-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

#### Policy 2: Allow public read access
```sql
CREATE POLICY "Public can view images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'project-images');
```

#### Policy 3: Allow users to delete own images
```sql
CREATE POLICY "Users can delete own images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'project-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

### Step 3: Configure File Size Limits (Optional)

In Supabase Dashboard → **Storage** → **Settings**:
- Max file size: `50 MB` (adjust as needed)
- Allowed MIME types: `image/*`

## Usage in Your App

### Upload Image

```tsx
import { uploadImage } from '@/lib/supabase/storage'

async function handleImageUpload(file: File, projectId: string, imageKey: string) {
  try {
    const imageUrl = await uploadImage(file, projectId, imageKey)
    
    // Save URL to project data
    await saveProject({
      id: projectId,
      data: {
        ...projectData,
        images: {
          ...projectData.images,
          [imageKey]: imageUrl
        }
      }
    })
    
    console.log('Image uploaded:', imageUrl)
  } catch (error) {
    console.error('Upload failed:', error)
  }
}
```

### Delete Image

```tsx
import { deleteImage } from '@/lib/supabase/storage'

async function handleImageDelete(imageUrl: string, imageKey: string) {
  try {
    await deleteImage(imageUrl)
    
    // Remove from project data
    const updatedImages = { ...projectData.images }
    delete updatedImages[imageKey]
    
    await saveProject({
      id: projectId,
      data: {
        ...projectData,
        images: updatedImages
      }
    })
  } catch (error) {
    console.error('Delete failed:', error)
  }
}
```

### Image Upload Component Example

```tsx
'use client'

import { useState } from 'react'
import { uploadImage } from '@/lib/supabase/storage'
import { Button } from '@/components/ui/button'

export function ImageUploader({ 
  projectId, 
  imageKey, 
  onUpload 
}: { 
  projectId: string
  imageKey: string
  onUpload: (url: string) => void 
}) {
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB')
      return
    }

    setUploading(true)
    try {
      const url = await uploadImage(file, projectId, imageKey)
      onUpload(url)
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="hidden"
        id={`upload-${imageKey}`}
      />
      <label htmlFor={`upload-${imageKey}`}>
        <Button as="span" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Image'}
        </Button>
      </label>
    </div>
  )
}
```

## Storage Structure

Images are organized by user and project:
```
project-images/
├── {user_id}/
│   ├── {project_id}/
│   │   ├── hero-img.jpg
│   │   ├── logo.png
│   │   └── background.webp
│   └── {another_project_id}/
│       └── banner.jpg
└── {another_user_id}/
    └── ...
```

## Features Available

✅ **Upload images** - `uploadImage(file, projectId, imageKey)`
✅ **Delete images** - `deleteImage(imageUrl)`
✅ **List project images** - `listProjectImages(projectId)`
✅ **Delete all project images** - `deleteProjectImages(projectId)`
✅ **Check storage usage** - `getStorageUsage()`

## Storage Limits

**Free Tier:**
- 1 GB storage
- 2 GB bandwidth/month

**Pro Tier:**
- 100 GB storage
- 200 GB bandwidth/month

## Best Practices

1. **Optimize images before upload**
   - Compress images
   - Use WebP format when possible
   - Resize to appropriate dimensions

2. **Clean up unused images**
   - Delete images when project is deleted
   - Implement cleanup for replaced images

3. **Use CDN URLs**
   - Supabase Storage URLs are CDN-backed
   - Images load fast globally

4. **Implement progress tracking**
   - Show upload progress to users
   - Handle upload errors gracefully

## Alternative: External Image URLs

If you don't want to use Supabase Storage, you can still store external URLs:

```tsx
// Store Unsplash/Pexels/etc URLs directly
const projectData = {
  images: {
    'hero-img': 'https://images.unsplash.com/photo-xxx',
    'logo': 'https://example.com/logo.png'
  }
}
```

This works with the current schema without any changes!

## Summary

✅ **Database ready** - Stores image URLs in `projects.data.images`
✅ **Storage service ready** - `lib/supabase/storage.ts` created
⚠️ **Setup required** - Create bucket and policies in Supabase Dashboard

**Next Steps:**
1. Create `project-images` bucket in Supabase
2. Add storage policies
3. Use `uploadImage()` in your components
4. Store returned URLs in project data
