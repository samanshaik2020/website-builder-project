"use client"

import { supabase } from './client'

const BUCKET_NAME = 'project-images'

/**
 * Upload an image file to Supabase Storage
 * Returns the public URL of the uploaded image
 */
export async function uploadImage(
  file: File,
  projectId: string,
  imageKey: string
): Promise<string> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Not authenticated')

  // Create unique file path: user_id/project_id/image_key.ext
  const fileExt = file.name.split('.').pop()
  const filePath = `${user.id}/${projectId}/${imageKey}.${fileExt}`

  // Upload file to storage
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true, // Replace if exists
    })

  if (error) throw error

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath)

  return publicUrl
}

/**
 * Delete an image from Supabase Storage
 */
export async function deleteImage(imageUrl: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Not authenticated')

  // Extract file path from URL
  const urlParts = imageUrl.split(`${BUCKET_NAME}/`)
  if (urlParts.length < 2) throw new Error('Invalid image URL')
  
  const filePath = urlParts[1]

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([filePath])

  if (error) throw error
}

/**
 * List all images for a project
 */
export async function listProjectImages(projectId: string): Promise<string[]> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list(`${user.id}/${projectId}`)

  if (error) throw error

  return data.map(file => {
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(`${user.id}/${projectId}/${file.name}`)
    
    return publicUrl
  })
}

/**
 * Delete all images for a project
 */
export async function deleteProjectImages(projectId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Not authenticated')

  const { data: files, error: listError } = await supabase.storage
    .from(BUCKET_NAME)
    .list(`${user.id}/${projectId}`)

  if (listError) throw listError

  if (files && files.length > 0) {
    const filePaths = files.map(file => `${user.id}/${projectId}/${file.name}`)
    
    const { error: deleteError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove(filePaths)

    if (deleteError) throw deleteError
  }
}

/**
 * Get storage usage for user
 */
export async function getStorageUsage(): Promise<number> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list(user.id)

  if (error) throw error

  // Calculate total size in bytes
  let totalSize = 0
  for (const file of data) {
    totalSize += file.metadata?.size || 0
  }

  return totalSize
}
